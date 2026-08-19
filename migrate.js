require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function migrate() {
    console.log('Starting migrations...');

    // 1. First, connect without a database to ensure it exists
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'madrassa_db'}\``);
    await connection.end();

    const db = require('./db');
    
    // Create schema history table if it doesn't exist
    await db.execute(`
        CREATE TABLE IF NOT EXISTS schema_history (
            version INT PRIMARY KEY,
            script_name VARCHAR(255),
            applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    const sqlDir = path.join(__dirname, 'sql');
    const files = fs.readdirSync(sqlDir).filter(f => f.endsWith('.sql')).sort();

    for (const file of files) {
        const versionMatch = file.match(/^V(\d+)__/);
        if (!versionMatch) continue;
        
        const version = parseInt(versionMatch[1]);
        
        // Check if migration already applied
        const [rows] = await db.execute('SELECT * FROM schema_history WHERE version = ?', [version]);
        if (rows.length === 0) {
            console.log(`Applying migration: ${file}`);
            const sql = fs.readFileSync(path.join(sqlDir, file), 'utf8');
            
            // Split by semicolon to run multiple statements
            // Note: This is a basic split and might fail with complex triggers/procs
            const statements = sql.split(';').filter(s => s.trim() !== '');
            
            for (let statement of statements) {
                console.log(`Executing statement: ${statement.trim().substring(0, 50)}...`);
                try {
                    await db.query(statement);
                } catch (statementErr) {
                    const isIgnorable = 
                        statementErr.code === 'ER_DUP_FIELDNAME' || 
                        statementErr.code === 'ER_DUP_KEYNAME' || 
                        statementErr.code === 'ER_CANT_DROP_FIELD_OR_KEY' ||
                        statementErr.message.includes('Duplicate column') ||
                        statementErr.message.includes('Duplicate key') ||
                        statementErr.message.includes('already exists');
                    
                    if (isIgnorable) {
                        console.log(`[Warning] Ignored statement (already applied): ${statementErr.message}`);
                    } else {
                        throw statementErr;
                    }
                }
            }
            
            await db.execute('INSERT INTO schema_history (version, script_name) VALUES (?, ?)', [version, file]);
            console.log(`Successfully applied: ${file}`);
        } else {
            console.log(`Skipping already applied: ${file}`);
        }
    }
    
    // One-time backfill (not a Vxx SQL file since it needs a JS loop): the
    // choice-group model (V20) only groups questions created through the new
    // UI. Papers built before V20 still have their questions as a flat,
    // ungrouped list, so they'd now render as N separate mandatory questions
    // instead of the N/2 "answer part A or B" pairs teachers actually set up.
    // Retroactively pair up consecutive questions (oldest id first) into real
    // 1-of-2 choice groups, replicating the old index-based pairing display.
    // Only touches papers with zero existing groups, so once a teacher has
    // organized a paper with the new grouping UI this never re-touches it -
    // and a paper that's already been backfilled naturally has groups too, so
    // this step is safe to leave content-gated rather than only version-gated.
    // The version number is well outside the normal Vxx sequence so it can
    // never collide with a future migration file reusing that number.
    const LEGACY_CHOICE_GROUP_BACKFILL_VERSION = 90000020;
    const [backfillApplied] = await db.execute('SELECT * FROM schema_history WHERE version = ?', [LEGACY_CHOICE_GROUP_BACKFILL_VERSION]);
    if (backfillApplied.length === 0) {
        try {
            const [hasTable] = await db.execute("SHOW TABLES LIKE 'question_choice_groups'");
            if (hasTable.length > 0) {
                console.log('Running one-time backfill: grouping legacy question pairs into choice groups...');
                const { recomputePaperTotal } = require('./lib/examMarks');
                const [papers] = await db.execute(`
                    SELECT paper_id, tenant_id FROM questions
                    GROUP BY paper_id, tenant_id
                    HAVING SUM(CASE WHEN choice_group_id IS NOT NULL THEN 1 ELSE 0 END) = 0
                `);
                for (const { paper_id, tenant_id } of papers) {
                    const [qs] = await db.execute('SELECT id FROM questions WHERE paper_id = ? AND tenant_id = ? ORDER BY id ASC', [paper_id, tenant_id]);
                    for (let i = 0; i + 1 < qs.length; i += 2) {
                        const [group] = await db.execute('INSERT INTO question_choice_groups (tenant_id, paper_id, required_count) VALUES (?, ?, 1)', [tenant_id, paper_id]);
                        await db.execute('UPDATE questions SET choice_group_id = ? WHERE id IN (?, ?)', [group.insertId, qs[i].id, qs[i + 1].id]);
                    }
                    // Recompute regardless of whether pairing happened - a lone leftover
                    // question's max_marks may still be stale from before this feature existed.
                    if (qs.length > 0) await recomputePaperTotal(paper_id, tenant_id);
                }
                await db.execute('INSERT INTO schema_history (version, script_name) VALUES (?, ?)', [LEGACY_CHOICE_GROUP_BACKFILL_VERSION, 'JS_BACKFILL_legacy_choice_group_pairing']);
                console.log(`Backfill complete: examined ${papers.length} paper(s).`);
            }
        } catch (backfillErr) {
            console.error('Error running legacy choice-group backfill:', backfillErr.message);
        }
    }

    // Safe column check for book_progress updated_at
    try {
        const [columns] = await db.execute('SHOW COLUMNS FROM book_progress LIKE "updated_at"');
        if (columns.length === 0) {
            console.log('Adding missing column updated_at to book_progress...');
            await db.execute('ALTER TABLE book_progress ADD COLUMN updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
            console.log('Column updated_at added successfully.');
        }
    } catch (columnErr) {
        console.error('Error checking/adding updated_at column:', columnErr.message);
    }
    
    console.log('Migrations completed.');
    if (require.main === module) {
        process.exit(0);
    }
}

if (require.main === module) {
    migrate().catch(err => {
        console.error('Migration failed:', err);
        process.exit(1);
    });
} else {
    module.exports = migrate;
}

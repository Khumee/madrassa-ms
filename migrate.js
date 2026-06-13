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
                await db.query(statement);
            }
            
            await db.execute('INSERT INTO schema_history (version, script_name) VALUES (?, ?)', [version, file]);
            console.log(`Successfully applied: ${file}`);
        } else {
            console.log(`Skipping already applied: ${file}`);
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
    process.exit(0);
}

migrate().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});

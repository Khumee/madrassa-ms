const db = require('../config/db');

async function main() {
    // Verify علم الصيغة assignments across all classes
    const [all] = await db.execute(`
        SELECT tb.id, tb.class_id, b.title as book_title, t.name as teacher_name, s.is_active
        FROM teacher_books tb
        JOIN books b ON tb.book_id = b.id
        JOIN teachers t ON tb.teacher_id = t.id
        JOIN sessions s ON tb.session_id = s.id
        WHERE b.title LIKE '%صيغ%'
        ORDER BY tb.class_id
    `);
    console.log('All علم الصيغة assignments:');
    console.table(all);

    // Delete the wrong entry: id=134 (علم الصيغة in الخامسة class_id=10)
    const [result] = await db.execute('DELETE FROM teacher_books WHERE id = 134');
    console.log(`\nDeleted teacher_books id=134: affectedRows=${result.affectedRows}`);

    // Confirm deletion
    const [after] = await db.execute(`
        SELECT tb.id, tb.class_id, b.title, t.name FROM teacher_books tb
        JOIN books b ON tb.book_id = b.id JOIN teachers t ON tb.teacher_id = t.id
        WHERE b.title LIKE '%صيغ%'
    `);
    console.log('\nAfter deletion:');
    console.table(after);

    process.exit(0);
}
main().catch(e => { console.error(e); process.exit(1); });

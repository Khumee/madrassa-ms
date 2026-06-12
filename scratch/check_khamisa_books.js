const db = require('../config/db');

async function main() {
    // Check all teacher_books for الخامسة (class_id=10) in active session
    const [rows] = await db.execute(`
        SELECT tb.id, tb.book_id, tb.teacher_id, tb.class_id, tb.session_id,
               b.title as book_title, t.name as teacher_name,
               s.name as session_name, s.is_active
        FROM teacher_books tb
        JOIN books b ON tb.book_id = b.id
        JOIN teachers t ON tb.teacher_id = t.id
        JOIN sessions s ON tb.session_id = s.id
        WHERE tb.class_id = 10
        ORDER BY s.is_active DESC, b.title
    `);
    console.log('teacher_books for الخامسة (class_id=10):');
    console.table(rows);

    // Also check الثانية (class_id=4) for علم الصيغة
    const [sania] = await db.execute(`
        SELECT tb.id, tb.book_id, tb.teacher_id, tb.class_id,
               b.title as book_title, t.name as teacher_name,
               s.name as session_name, s.is_active
        FROM teacher_books tb
        JOIN books b ON tb.book_id = b.id
        JOIN teachers t ON tb.teacher_id = t.id
        JOIN sessions s ON tb.session_id = s.id
        WHERE b.title LIKE '%صيغ%' OR b.title LIKE '%منطق%'
        ORDER BY tb.class_id, s.is_active DESC
    `);
    console.log('\nAll entries for صيغة / منطق books across classes:');
    console.table(sania);

    process.exit(0);
}
main().catch(e => { console.error(e); process.exit(1); });

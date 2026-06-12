const db = require('../config/db');

async function main() {
    try {
        const [assignments] = await db.execute(`
            SELECT tb.id, tb.start_page, tb.end_page, tb.current_page, b.title as book_title, c.name_ar as class_name
            FROM teacher_books tb
            JOIN books b ON tb.book_id = b.id
            JOIN teachers t ON tb.teacher_id = t.id
            LEFT JOIN classes c ON tb.class_id = c.id
            WHERE t.name LIKE '%قمر%'
        `);
        console.log('--- ALL BOOK ASSIGNMENTS FOR MAULANA QAMAR ---');
        console.log(assignments);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();

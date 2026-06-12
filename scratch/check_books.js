const db = require('../config/db');

async function main() {
    try {
        const [assignments] = await db.execute(`
            SELECT tb.id, tb.start_page, tb.end_page, tb.current_page, b.title as book_title, t.name as teacher_name
            FROM teacher_books tb
            JOIN books b ON tb.book_id = b.id
            JOIN teachers t ON tb.teacher_id = t.id
            WHERE tb.class_id = (
                SELECT class_id FROM students WHERE user_id = (
                    SELECT id FROM users WHERE username = 'areeb' OR username = 'عريب' OR role = 'عريب' LIMIT 1
                ) LIMIT 1
            )
        `);
        console.log('--- BOOK ASSIGNMENTS FOR AREEB CLASS ---');
        console.log(assignments);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();

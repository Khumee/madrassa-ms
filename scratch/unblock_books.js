const db = require('../config/db');

async function main() {
    try {
        // Update all book assignments in Areeb's class that have a limit of 100 to 500 pages
        const [result] = await db.execute(`
            UPDATE teacher_books 
            SET end_page = 500 
            WHERE end_page = 100 AND class_id = (
                SELECT class_id FROM students WHERE user_id = (
                    SELECT id FROM users WHERE username = 'areeb' OR username = 'عريب' OR role = 'عريب' LIMIT 1
                ) LIMIT 1
            )
        `);
        console.log(`✅ Success! Updated ${result.affectedRows} book assignments to a maximum of 500 pages.`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();

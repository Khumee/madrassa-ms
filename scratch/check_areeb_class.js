const db = require('../config/db');

async function main() {
    try {
        const [student] = await db.execute(`
            SELECT s.name, s.class_id, c.name_ar as class_name
            FROM students s
            JOIN classes c ON s.class_id = c.id
            WHERE s.user_id = (SELECT id FROM users WHERE role = 'عريب' LIMIT 1)
        `);
        console.log('--- AREEB CLASS REGISTRATION ---');
        console.log(student);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();

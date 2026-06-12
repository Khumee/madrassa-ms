const db = require('../config/db');

async function main() {
    try {
        const [columns] = await db.execute('DESCRIBE attendance_teachers');
        console.log('--- COLUMNS IN attendance_teachers ---');
        console.log(columns);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();

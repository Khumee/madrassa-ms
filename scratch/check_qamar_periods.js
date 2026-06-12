const db = require('../config/db');

async function main() {
    try {
        const [periods] = await db.execute(`
            SELECT id, period_number, teacher_id, assignment_id, day_of_week
            FROM periods
            WHERE class_id = 12 AND teacher_id = 216
        `);
        console.log('--- PERIODS FOR MAULANA QAMAR IN CLASS 6 ---');
        console.log(periods);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();

const db = require('../config/db');

async function main() {
    const tId = 216; // Maulana Qamar Ijaz
    const date = '2026-05-11';
    const classesTaken = 1;
    const teacherStatus = 'present';
    const userId = 22; // Areeb

    try {
        console.log('Testing SQL execute with valid teacher ID...');
        const [res] = await db.execute(
            `INSERT INTO attendance_teachers (teacher_id, date, classes_taken, status, marked_by) 
             VALUES (?, ?, ?, ?, ?) 
             ON DUPLICATE KEY UPDATE classes_taken = ?, status = ?, marked_by = ?`,
            [tId, date, classesTaken, teacherStatus, userId, classesTaken, teacherStatus, userId]
        );
        console.log('✅ Query Succeeded! Result:', res);
        process.exit(0);
    } catch (err) {
        console.error('❌ Query Failed! Error detail:');
        console.error(err);
        process.exit(1);
    }
}

main();

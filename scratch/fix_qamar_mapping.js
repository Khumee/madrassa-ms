const db = require('../config/db');

async function main() {
    try {
        console.log('--- 1. UPDATING BOOK ASSIGNMENT TO التوضيح (2) ---');
        // Update assignment 41 to point to book ID 39, set start to 240, end to 480, and current to 240
        const [assignResult] = await db.execute(`
            UPDATE teacher_books 
            SET book_id = 39, start_page = 240, end_page = 480, current_page = 240 
            WHERE id = 41
        `);
        console.log('Book Assignment Update Result:', assignResult);

        console.log('--- 2. MAPPING TIMETABLE PERIODS TO THIS ASSIGNMENT ---');
        // Link all periods for Maulana Qamar Ijaz (216) in Class 6 (12) to assignment 41
        const [periodResult] = await db.execute(`
            UPDATE periods 
            SET assignment_id = 41 
            WHERE class_id = 12 AND teacher_id = 216
        `);
        console.log('Timetable Periods Update Result:', periodResult);

        process.exit(0);
    } catch (err) {
        console.error('❌ Migration failed:', err);
        process.exit(1);
    }
}

main();

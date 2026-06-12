require('dotenv').config();
const db = require('../../config/db');

async function syncTimetable() {
    try {
        console.log("Starting Timetable Subject Synchronization...\n");

        // 1. Sync all periods that are linked to active book assignments
        console.log("Step 1: Syncing periods linked to active book assignments...");
        const [syncResult] = await db.execute(`
            UPDATE periods p
            JOIN teacher_books tb ON p.assignment_id = tb.id
            JOIN books b ON tb.book_id = b.id
            SET p.subject = b.title
            WHERE p.subject != b.title OR p.subject IS NULL
        `);
        console.log(`Successfully updated ${syncResult.affectedRows} linked timetable periods to match their active book titles.`);

        // 2. Fix unlinked static names from 'صحيح مسلم' back to 'صحيح مسلم وجامع الترمذي'
        console.log("\nStep 2: Syncing unlinked static names ('صحيح مسلم' -> 'صحيح مسلم وجامع الترمذي')...");
        const [staticResult] = await db.execute(`
            UPDATE periods
            SET subject = 'صحيح مسلم وجامع الترمذي'
            WHERE subject = 'صحيح مسلم'
        `);
        console.log(`Successfully updated ${staticResult.affectedRows} unlinked periods from the old name to 'صحيح مسلم وجامع الترمذي'.`);

        console.log("\nTimetable Synchronization Completed Successfully!");
    } catch (err) {
        console.error("Error during synchronization:", err);
    }
    process.exit(0);
}

syncTimetable();

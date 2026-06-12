const db = require('../config/db');

async function main() {
    try {
        console.log('--- 1. CHECKING FOR STALE CURRENT_PAGE VALUES ---');
        const [rows] = await db.execute(`
            SELECT tb.id, tb.start_page, tb.end_page, tb.current_page, b.title
            FROM teacher_books tb
            JOIN books b ON tb.book_id = b.id
            WHERE tb.current_page < tb.start_page
        `);
        console.log('Stale assignments found:', rows.length);
        console.log(rows);

        if (rows.length > 0) {
            console.log('--- 2. CORRECTING STALE ASSIGNMENTS ---');
            for (const r of rows) {
                const [result] = await db.execute(
                    'UPDATE teacher_books SET current_page = ? WHERE id = ?',
                    [r.start_page, r.id]
                );
                console.log(`Updated assignment ID ${r.id} (${r.title}) current_page to ${r.start_page}`);
            }
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();

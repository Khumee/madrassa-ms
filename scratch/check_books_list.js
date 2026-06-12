const db = require('../config/db');

async function main() {
    try {
        const [books] = await db.execute("SELECT * FROM books WHERE title LIKE '%التوضيح%'");
        console.log('--- BOOKS MATCHING "التوضيح" ---');
        console.log(books);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();

require('dotenv').config();
const db = require('./db');

async function check() {
    try {
        const [columns] = await db.execute('SHOW COLUMNS FROM book_progress');
        console.log('Columns in book_progress:');
        console.log(columns);
        
        const [tbColumns] = await db.execute('SHOW COLUMNS FROM teacher_books');
        console.log('Columns in teacher_books:');
        console.log(tbColumns);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
check();

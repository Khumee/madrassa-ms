const db = require('../db');

async function check() {
    try {
        const [periods] = await db.execute('SELECT * FROM periods LIMIT 5');
        console.log('Periods:', periods);
        
        const [classes] = await db.execute('SELECT * FROM classes LIMIT 5');
        console.log('Classes:', classes);
        
        const [books] = await db.execute('SELECT * FROM books LIMIT 5');
        console.log('Books:', books);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
check();

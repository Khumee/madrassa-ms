require('dotenv').config();
const db = require('./db');

async function fix() {
    console.log('Updating teachers with ID numbers...');
    try {
        await db.execute('ALTER TABLE teachers ADD COLUMN id_number VARCHAR(20) UNIQUE');
    } catch (e) {
        console.log('Column already exists or error adding.');
    }
    
    const year = new Date().getFullYear().toString().slice(-2); // 26
    await db.execute('UPDATE teachers SET id_number = CONCAT("T-", ?, "-", 1000 + id)', [year]);
    
    console.log('Done.');
    process.exit(0);
}
fix();

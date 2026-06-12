require('dotenv').config();
const db = require('../config/db');
async function query() {
    try {
        const [columns] = await db.execute(`DESCRIBE periods`);
        console.log("COLUMNS IN PERIODS:");
        console.log(columns);
    } catch (err) {
        console.error(err);
    }
    process.exit(0);
}
query();

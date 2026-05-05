require('dotenv').config();
const db = require('./db');
async function query() {
    const [rows] = await db.execute('SELECT id, username, role FROM users WHERE username = "مدیر"');
    console.log(rows);
    process.exit(0);
}
query();

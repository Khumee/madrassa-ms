require('dotenv').config();
const db = require('./db');
const bcrypt = require('bcryptjs');

async function fix() {
    const hashed = await bcrypt.hash('1981', 10);
    await db.execute('UPDATE users SET password = ? WHERE role = "مدير"', [hashed]);
    console.log('Mudeer password updated to 1981');
    process.exit(0);
}
fix();

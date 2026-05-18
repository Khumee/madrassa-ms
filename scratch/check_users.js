const db = require('../config/db');

async function checkUsers() {
    try {
        const [rows] = await db.execute('SELECT id, username, role, password FROM users');
        console.log('--- ALL USERS ---');
        console.log(JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkUsers();

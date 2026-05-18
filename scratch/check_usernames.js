const db = require('../config/db');

async function checkUsernames() {
    try {
        const [rows] = await db.execute("SELECT id, username, role FROM users WHERE username LIKE '%1%'");
        console.log('🔍 Found users containing "1" in username:', rows);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkUsernames();

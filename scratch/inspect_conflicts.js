const db = require('../config/db');

async function inspect() {
    try {
        const [rows] = await db.execute("SELECT id, username, role FROM users WHERE username IN ('زبیر', 'زبیر1', 'قمر', 'قمر1', 'کمال', 'کمال1')");
        console.log('🔍 Conflicting users:', rows);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

inspect();

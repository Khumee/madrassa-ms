const db = require('../config/db');

async function inspectNames() {
    try {
        const [rows] = await db.execute(`
            SELECT u.id, u.username, u.role, 
            COALESCE(t.name, s.name, 'Admin') as full_name
            FROM users u
            LEFT JOIN students s ON u.id = s.user_id
            LEFT JOIN teachers t ON u.id = t.user_id
            WHERE u.username IN ('زبیر', 'زبیر1', 'قمر', 'قمر1', 'کمال', 'کمال1')
        `);
        console.log('🔍 Full Names of conflicting users:', rows);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

inspectNames();

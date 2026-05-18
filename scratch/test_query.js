const mysql = require('mysql2/promise');
require('dotenv').config();

async function test() {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'kui_ms'
    });

    try {
        const startDate = '2026-05-01';
        const endDate = '2026-05-31';

        const [sessionRows] = await db.execute('SELECT id FROM sessions WHERE is_active = TRUE LIMIT 1');
        const activeSessionId = sessionRows.length > 0 ? sessionRows[0].id : null;
        console.log('Active Session ID:', activeSessionId);

        const [users] = await db.execute('SELECT id, username, role FROM users');
        console.log('--- ALL USERS IN DB ---');
        users.forEach(u => {
            console.log(`ID: ${u.id}, Username: ${u.username}, Role: ${u.role}, Hex: ${Buffer.from(u.role || '').toString('hex')}`);
        });
    } catch (err) {
        console.error('Query Failed with error:', err.message);
    } finally {
        await db.end();
    }
}

test();

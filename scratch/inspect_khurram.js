const db = require('../config/db');

async function inspect() {
    try {
        const [rows] = await db.execute('SELECT username FROM users WHERE id = 22');
        if (rows.length > 0) {
            const username = rows[0].username;
            console.log('Database Username:', username);
            console.log('Length:', username.length);
            for (let i = 0; i < username.length; i++) {
                console.log(`Char at ${i}: ${username[i]} (U+0${username.charCodeAt(i).toString(16).toUpperCase()})`);
            }
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

inspect();

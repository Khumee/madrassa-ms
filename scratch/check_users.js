const db = require('../config/db');

async function main() {
    try {
        const [users] = await db.execute('SELECT id, username, role FROM users');
        console.log('--- ALL SYSTEM USERS ---');
        for (const user of users) {
            let cpStr = '';
            for (let i = 0; i < user.username.length; i++) {
                cpStr += `${user.username[i]}(U+0${user.username.charCodeAt(i).toString(16).toUpperCase()}) `;
            }
            console.log(`ID: ${user.id} | Role: ${user.role} | Username: "${user.username}" | Codepoints: ${cpStr}`);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();

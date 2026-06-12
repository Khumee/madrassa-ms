const db = require('../config/db');

async function main() {
    try {
        const [rows] = await db.execute("SELECT id, username, role FROM users WHERE id = 22");
        if (rows.length > 0) {
            const user = rows[0];
            let cpStr = '';
            for (let i = 0; i < user.role.length; i++) {
                cpStr += `${user.role[i]}(U+0${user.role.charCodeAt(i).toString(16).toUpperCase()}) `;
            }
            console.log(`User ID: ${user.id} | Username: "${user.username}" | Role: "${user.role}" | Codepoints: ${cpStr}`);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();

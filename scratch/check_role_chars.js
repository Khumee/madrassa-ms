const db = require('../config/db');

async function main() {
    try {
        const [rows] = await db.execute('SELECT DISTINCT role FROM role_permissions');
        console.log('--- UNIQUE ROLES IN role_permissions ---');
        for (const row of rows) {
            let cpStr = '';
            for (let i = 0; i < row.role.length; i++) {
                cpStr += `${row.role[i]}(U+0${row.role.charCodeAt(i).toString(16).toUpperCase()}) `;
            }
            console.log(`Role: "${row.role}" | Codepoints: ${cpStr}`);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();

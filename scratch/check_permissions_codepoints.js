const db = require('../config/db');

async function main() {
    try {
        const [perms] = await db.execute("SELECT * FROM role_permissions");
        console.log('--- ALL PERMISSIONS ---');
        for (const p of perms) {
            let cpStr = '';
            for (let i = 0; i < p.role.length; i++) {
                cpStr += `${p.role[i]}(U+0${p.role.charCodeAt(i).toString(16).toUpperCase()}) `;
            }
            console.log(`ID: ${p.id} | Allowed: ${p.allowed} | Func: ${p.function_name} | Role: "${p.role}" | Codepoints: ${cpStr}`);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();

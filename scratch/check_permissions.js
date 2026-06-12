const db = require('../config/db');

async function main() {
    try {
        const [perms] = await db.execute("SELECT * FROM role_permissions WHERE role = 'عريب'");
        console.log('--- PERMISSIONS FOR ROLE "عريب" ---');
        console.log(perms);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();

const db = require('../db');
async function check() {
    try {
        const [users] = await db.execute('SELECT id, username, role FROM users WHERE role = ?', ['ناظم']);
        console.log('Nazim Users:', JSON.stringify(users, null, 2));
        
        const [teachers] = await db.execute('SELECT id, name, user_id FROM teachers');
        console.log('All Teachers:', JSON.stringify(teachers, null, 2));
    } catch (err) {
        console.error(err);
    }
    process.exit(0);
}
check();

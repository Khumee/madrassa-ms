const db = require('../config/db');
const bcrypt = require('bcryptjs');

async function updatePasswords() {
    try {
        console.log('🔄 Hashing "1234"...');
        const hash = await bcrypt.hash('1234', 10);
        console.log(`✅ Hash generated: ${hash}`);

        // Update all users except where role is 'مدير' or username is 'مدیر'
        const [res] = await db.execute(
            "UPDATE users SET password = ? WHERE id != 2 AND username != 'مدیر'",
            [hash]
        );
        console.log(`✅ Passwords updated: ${res.affectedRows} users modified.`);
        
        process.exit(0);
    } catch (err) {
        console.error('❌ Error updating passwords:', err);
        process.exit(1);
    }
}

updatePasswords();

const db = require('../db');
const bcrypt = require('bcryptjs');

async function seedMaster() {
    try {
        const hash = await bcrypt.hash('adminpassword', 10);
        await db.pool.execute(
            'INSERT INTO master_admins (username, password, email) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE password = ?',
            ['superadmin', hash, 'admin@mms.nukrim.com', hash]
        );
        console.log('✅ Master admin seeded successfully.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Failed to seed master admin:', err);
        process.exit(1);
    }
}

seedMaster();

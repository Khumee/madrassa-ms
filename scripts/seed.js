const bcrypt = require('bcryptjs');
const db = require('../db');

async function seed() {
    console.log('Seeding default administrator...');
    const username = 'مدیر';
    const password = '1234';
    try {
        const hash = await bcrypt.hash(password, 10);
        // Insert admin user (role: مدير)
        await db.execute(
            `INSERT INTO users (username, password, role) 
             VALUES (?, ?, ?) 
             ON DUPLICATE KEY UPDATE password = VALUES(password), role = VALUES(role)`,
            [username, hash, 'مدير']
        );
        console.log(`✅ Default admin created successfully!`);
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
    } catch (err) {
        console.error('❌ Error seeding admin:', err.message);
    }
    process.exit(0);
}

seed();

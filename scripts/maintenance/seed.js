const bcrypt = require('bcryptjs');
const db = require('../../db');

async function seed() {
    const username = 'مدیر';
    const password = 'مدیر';
    const hash = await bcrypt.hash(password, 10);
    try {
        await db.execute('INSERT IGNORE INTO users (username, password, role) VALUES (?, ?, ?)', [username, hash, 'admin']);
        console.log('Admin check completed (مدیر / مدیر)');
    } catch (err) {
        console.error('Error seeding admin:', err.message);
    }
    process.exit();
}

seed();

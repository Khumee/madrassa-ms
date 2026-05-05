require('dotenv').config();
const db = require('./db');

async function fix() {
    console.log('Fixing roles...');
    // Update existing users
    await db.execute('UPDATE users SET role = ? WHERE role = ?', ['طالب_علم', 'طالب علم']);
    await db.execute('UPDATE users SET role = ? WHERE role = ?', ['مسؤول_الصف', 'مسؤول الصف']);
    
    // Update any that were set as default
    await db.execute('ALTER TABLE users MODIFY role VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT "طالب_علم"');
    
    console.log('Roles fixed.');
    process.exit(0);
}
fix();

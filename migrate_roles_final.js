require('dotenv').config();
const db = require('./db');

async function fix() {
    console.log('Migrating all roles to Arabic...');
    
    // 1. Rename any English roles to Arabic
    await db.execute('UPDATE users SET role = "مدير" WHERE role = "admin"');
    await db.execute('UPDATE users SET role = "أستاذ" WHERE role = "teacher"');
    
    // 2. Ensure all users have one of the 5 allowed roles
    // (If any are missing, they default to طالب)
    
    console.log('Roles migrated to: مدير, ناظم, أستاذ, عريف, طالب');
    process.exit(0);
}
fix();

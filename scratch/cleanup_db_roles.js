const db = require('../config/db');

async function cleanupRoles() {
    try {
        console.log('🔄 Starting database roles cleanup...');
        
        // 1. Update Areeb (Class Representative) roles to standard 'عريب'
        const [areebRes] = await db.execute(`
            UPDATE users 
            SET role = 'عريب' 
            WHERE role IN ('مسؤول_الصف', 'مسؤول الصف', 'عریب')
        `);
        console.log(`✅ Areeb roles updated: ${areebRes.affectedRows} rows modified.`);

        // 2. Update Student roles to standard 'طالب'
        const [studentRes] = await db.execute(`
            UPDATE users 
            SET role = 'طالب' 
            WHERE role IN ('طالب_علم')
        `);
        console.log(`✅ Student roles updated: ${studentRes.affectedRows} rows modified.`);

        // 3. Verify clean state
        const [rows] = await db.execute('SELECT DISTINCT role FROM users');
        console.log('📊 Distinct roles currently in DB:', rows.map(r => r.role));
        
        process.exit(0);
    } catch (err) {
        console.error('❌ Error during role cleanup:', err);
        process.exit(1);
    }
}

cleanupRoles();

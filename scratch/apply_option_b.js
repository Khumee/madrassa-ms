const db = require('../config/db');

async function applyOptionB() {
    try {
        console.log('🔄 Applying Option B renames to database...');
        
        // 1. Rename 'زبیر1' to 'أستاذ_زبیر'
        const [res1] = await db.execute("UPDATE users SET username = 'أستاذ_زبیر' WHERE id = 51 AND username = 'زبیر1'");
        console.log(`✅ Renamed user ID 51 to "أستاذ_زبیر": ${res1.affectedRows} rows modified.`);

        // 2. Rename 'قمر1' to 'ناظم_قمر'
        const [res2] = await db.execute("UPDATE users SET username = 'ناظم_قمر' WHERE id = 48 AND username = 'قمر1'");
        console.log(`✅ Renamed user ID 48 to "ناظم_قمر": ${res2.affectedRows} rows modified.`);

        // 3. Rename 'کمال1' to 'أستاذ_کمال'
        const [res3] = await db.execute("UPDATE users SET username = 'أستاذ_کمال' WHERE id = 41 AND username = 'کمال1'");
        console.log(`✅ Renamed user ID 41 to "أستاذ_کمال": ${res3.affectedRows} rows modified.`);

        // Verification query
        const [rows] = await db.execute("SELECT id, username, role FROM users WHERE id IN (51, 48, 41)");
        console.log('📊 Verification of updated users:', rows);

        process.exit(0);
    } catch (err) {
        console.error('❌ Error during Option B rename:', err);
        process.exit(1);
    }
}

applyOptionB();

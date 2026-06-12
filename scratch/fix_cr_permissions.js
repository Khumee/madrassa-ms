const db = require('../config/db');

async function run() {
    try {
        console.log('Starting CR permissions cleanup...');
        const crRoles = ['عريب', 'عریب'];
        
        for (const role of crRoles) {
            // Revoke admin management & reports permissions
            const adminFunctions = ['reports', 'books_manage', 'students_manage', 'teachers_manage', 'teacher_books_manage'];
            for (const func of adminFunctions) {
                await db.execute(
                    'INSERT INTO role_permissions (role, function_name, allowed) VALUES (?, ?, FALSE) ON DUPLICATE KEY UPDATE allowed = FALSE',
                    [role, func]
                );
                console.log(`Setting ${role} -> ${func} to FALSE`);
            }

            // Ensure core dashboard operations remain ALLOWED
            const coreFunctions = ['student_attendance', 'teacher_attendance'];
            for (const func of coreFunctions) {
                await db.execute(
                    'INSERT INTO role_permissions (role, function_name, allowed) VALUES (?, ?, TRUE) ON DUPLICATE KEY UPDATE allowed = TRUE',
                    [role, func]
                );
                console.log(`Setting ${role} -> ${func} to TRUE`);
            }
        }
        
        console.log('✅ Class Representative permissions successfully synchronized!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error fixing CR permissions:', err);
        process.exit(1);
    }
}

run();

const db = require('../db');

async function fixIndex() {
    try {
        console.log('Fixing unique index on role_permissions...');
        await db.pool.execute('ALTER TABLE role_permissions DROP INDEX role_function');
        await db.pool.execute('ALTER TABLE role_permissions ADD UNIQUE KEY unique_role_function_per_tenant (tenant_id, role, function_name)');
        console.log('Successfully updated unique index on role_permissions.');
    } catch (err) {
        console.error('Error updating index:', err.message);
    }
    process.exit(0);
}

fixIndex();

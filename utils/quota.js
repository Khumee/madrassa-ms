const db = require('../config/db');

/**
 * Checks if a tenant has reached their quota limit for a given resource.
 * @param {number} tenantId 
 * @param {'students' | 'teachers'} resourceType 
 * @returns {Promise<{allowed: boolean, current: number, limit: number}>}
 */
async function checkQuota(tenantId, resourceType) {
    const [tenants] = await db.execute(
        'SELECT max_students, max_teachers FROM tenants WHERE id = ?',
        [tenantId]
    );

    if (tenants.length === 0) {
        throw new Error(`Tenant with ID ${tenantId} not found.`);
    }

    const tenant = tenants[0];
    let count = 0;
    let limit = 0;

    if (resourceType === 'students') {
        const [rows] = await db.execute('SELECT COUNT(*) as count FROM students WHERE tenant_id = ?', [tenantId]);
        count = rows[0].count;
        limit = tenant.max_students;
    } else if (resourceType === 'teachers') {
        const [rows] = await db.execute('SELECT COUNT(*) as count FROM teachers WHERE tenant_id = ?', [tenantId]);
        count = rows[0].count;
        limit = tenant.max_teachers;
    } else {
        throw new Error(`Unknown resource type for quota checks: ${resourceType}`);
    }

    return {
        allowed: count < limit,
        current: count,
        limit: limit
    };
}

module.exports = { checkQuota };

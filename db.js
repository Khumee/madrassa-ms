const mysql = require('mysql2/promise');
const { AsyncLocalStorage } = require('async_hooks');
require('dotenv').config();

// Create the connection pool targeting our single database
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'madrassa_db',
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0
});

// AsyncLocalStorage to bind the active tenantId to the request execution context
const tenantContext = new AsyncLocalStorage();

// List of tenant-scoped tables that MUST be filtered by tenant_id in queries
const tenantScopedTables = [
    'users',
    'classes',
    'students',
    'teachers',
    'attendance_students',
    'attendance_teachers',
    'books',
    'teacher_books',
    'book_progress',
    'periods',
    'sessions',
    'student_enrollments',
    'role_permissions'
];

/**
 * Validates that any query affecting tenant-scoped tables contains 'tenant_id'
 * when running inside a tenant context. Helps prevent developer leaks.
 */
function validateTenantQuery(sql, tenantId) {
    const lowerSql = sql.toLowerCase();
    
    // Check if the query targets any tenant-scoped table
    const targetsTenantTable = tenantScopedTables.some(table => {
        // Match table name with word boundaries to avoid false positives (e.g. matching 'books_manage' for 'books')
        const regex = new RegExp(`\\b${table}\\b`);
        return regex.test(lowerSql);
    });

    if (targetsTenantTable) {
        // Enforce that the query contains 'tenant_id'
        if (!lowerSql.includes('tenant_id')) {
            throw new Error(
                `Security Violation: Query on tenant-scoped table missing 'tenant_id' filter. SQL: "${sql}"`
            );
        }
    }
}

module.exports = {
    tenantContext,
    pool,
    
    // Proxy execute
    execute: async function (sql, params = []) {
        const store = tenantContext.getStore();
        if (store && store.tenantId) {
            // Validate query safety in non-production environments
            if (process.env.NODE_ENV !== 'production') {
                validateTenantQuery(sql, store.tenantId);
            }
        }
        return pool.execute(sql, params);
    },

    // Proxy query
    query: async function (sql, params = []) {
        const store = tenantContext.getStore();
        if (store && store.tenantId) {
            if (process.env.NODE_ENV !== 'production') {
                validateTenantQuery(sql, store.tenantId);
            }
        }
        return pool.query(sql, params);
    },

    // Proxy connection getter
    getConnection: async function () {
        const conn = await pool.getConnection();
        
        // Wrap the connection's execute and query to ensure safety checks
        const originalExecute = conn.execute;
        const originalQuery = conn.query;
        
        conn.execute = async function (sql, params = []) {
            const store = tenantContext.getStore();
            if (store && store.tenantId && process.env.NODE_ENV !== 'production') {
                validateTenantQuery(sql, store.tenantId);
            }
            return originalExecute.call(conn, sql, params);
        };
        
        conn.query = async function (sql, params = []) {
            const store = tenantContext.getStore();
            if (store && store.tenantId && process.env.NODE_ENV !== 'production') {
                validateTenantQuery(sql, store.tenantId);
            }
            return originalQuery.call(conn, sql, params);
        };
        
        return conn;
    }
};

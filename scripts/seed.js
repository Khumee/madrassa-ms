const bcrypt = require('bcryptjs');
const db = require('../db');

// Default Dars-e-Nizami Classes
const defaultClasses = [
    { name_ar: 'الأولى', name_en: 'Aula' },
    { name_ar: 'الثانية', name_en: 'Sania' },
    { name_ar: 'الثالثة', name_en: 'Salisa' },
    { name_ar: 'الرابعة', name_en: 'Rabia' },
    { name_ar: 'الخامسة', name_en: 'Khamisa' },
    { name_ar: 'السادسة', name_en: 'Sadisa' },
    { name_ar: 'السابعة', name_en: 'Sabiya' },
    { name_ar: 'دورة حديث', name_en: 'Daura Hadith' }
];

// Default Role Permissions
const defaultPermissions = [
    { function_name: 'reports', role: 'مدير', allowed: true },
    { function_name: 'reports', role: 'ناظم', allowed: true },
    { function_name: 'reports', role: 'عریف', allowed: false },
    { function_name: 'reports', role: 'أستاذ', allowed: false },
    { function_name: 'reports', role: 'طالب', allowed: false },

    { function_name: 'books_manage', role: 'مدير', allowed: true },
    { function_name: 'books_manage', role: 'ناظم', allowed: true },
    { function_name: 'books_manage', role: 'عریف', allowed: false },
    { function_name: 'books_manage', role: 'أستاذ', allowed: false },
    { function_name: 'books_manage', role: 'طالب', allowed: false },

    { function_name: 'users_manage', role: 'مدير', allowed: true },
    { function_name: 'users_manage', role: 'ناظم', allowed: true },
    { function_name: 'users_manage', role: 'عریف', allowed: false },
    { function_name: 'users_manage', role: 'أستاذ', allowed: false },
    { function_name: 'users_manage', role: 'طالب', allowed: false },

    { function_name: 'students_manage', role: 'مدير', allowed: true },
    { function_name: 'students_manage', role: 'ناظم', allowed: true },
    { function_name: 'students_manage', role: 'عریف', allowed: false },
    { function_name: 'students_manage', role: 'أستاذ', allowed: false },
    { function_name: 'students_manage', role: 'طالب', allowed: false },

    { function_name: 'student_attendance', role: 'مدير', allowed: true },
    { function_name: 'student_attendance', role: 'ناظم', allowed: true },
    { function_name: 'student_attendance', role: 'عریف', allowed: true },
    { function_name: 'student_attendance', role: 'أستاذ', allowed: false },
    { function_name: 'student_attendance', role: 'طالب', allowed: false },

    { function_name: 'teachers_manage', role: 'مدير', allowed: true },
    { function_name: 'teachers_manage', role: 'ناظم', allowed: true },
    { function_name: 'teachers_manage', role: 'عریف', allowed: false },
    { function_name: 'teachers_manage', role: 'أستاذ', allowed: false },
    { function_name: 'teachers_manage', role: 'طالب', allowed: false },

    { function_name: 'teacher_attendance', role: 'مدير', allowed: true },
    { function_name: 'teacher_attendance', role: 'ناظم', allowed: true },
    { function_name: 'teacher_attendance', role: 'عریف', allowed: true },
    { function_name: 'teacher_attendance', role: 'أستاذ', allowed: false },
    { function_name: 'teacher_attendance', role: 'طالب', allowed: false },

    { function_name: 'teacher_books_manage', role: 'مدير', allowed: true },
    { function_name: 'teacher_books_manage', role: 'ناظم', allowed: true },
    { function_name: 'teacher_books_manage', role: 'عریف', allowed: false },
    { function_name: 'teacher_books_manage', role: 'أستاذ', allowed: false },
    { function_name: 'teacher_books_manage', role: 'طالب', allowed: false },

    { function_name: 'periods_manage', role: 'مدير', allowed: true },
    { function_name: 'periods_manage', role: 'ناظم', allowed: true },
    { function_name: 'periods_manage', role: 'عریف', allowed: false },
    { function_name: 'periods_manage', role: 'أستاذ', allowed: false },
    { function_name: 'periods_manage', role: 'طالب', allowed: false }
];

async function seed() {
    console.log('🏁 Starting baseline multi-tenant seeding...');
    const conn = await db.pool.getConnection();
    try {
        await conn.beginTransaction();

        // 1. Seed Master Admin
        console.log('Seeding master administrator...');
        const masterPassHash = await bcrypt.hash('admin123', 10);
        await conn.execute(
            `INSERT INTO master_admins (id, username, password, email) 
             VALUES (1, 'superadmin', ?, 'admin@mms.nukrim.com') 
             ON DUPLICATE KEY UPDATE password = VALUES(password)`,
            [masterPassHash]
        );
        const isProduction = process.env.NODE_ENV === 'production';
        const tenants = [1];

        // Seed Tenant 1 (Primary Demo) - always seeded
        console.log('Seeding primary demo tenant (madrassa-ms)...');
        await conn.execute(
            `INSERT INTO tenants (id, name, subdomain, custom_domain, status, plan_tier, school_name, logo_url) 
             VALUES (1, 'Jamia Habibullah Islamabad (Demo Account)', 'madrassa-ms', 'madrassa-ms.nukrim.com', 'active', 'free', 'Jamia Habibullah Islamabad (Farzi Naam / Demo Account)', '/logo_demo.png')
             ON DUPLICATE KEY UPDATE name = VALUES(name), subdomain = VALUES(subdomain), custom_domain = VALUES(custom_domain), school_name = VALUES(school_name)`
        );

        if (!isProduction) {
            // Seed Tenant 2 (Demo 2) - dev only
            console.log('Seeding secondary demo tenant (mmsdemo2) for development...');
            await conn.execute(
                `INSERT INTO tenants (id, name, subdomain, custom_domain, status, plan_tier, school_name, logo_url, max_students, max_teachers, max_classes, enable_custom_branding, enable_mobile_app, enable_advanced_reports, primary_color, secondary_color) 
                 VALUES (2, 'Jamia Dar-ul-Huda (Demo Account)', 'mmsdemo2', 'mmsdemo2.nukrim.com', 'active', 'pro', 'Jamia Dar-ul-Huda (Farzi Naam / Demo Account)', '/logo_demo2.png', 100, 15, 10, 1, 0, 1, '#10b981', '#047857')
                 ON DUPLICATE KEY UPDATE name = VALUES(name), subdomain = VALUES(subdomain), custom_domain = VALUES(custom_domain), school_name = VALUES(school_name)`
            );
            tenants.push(2);
        }

        const adminHash = await bcrypt.hash('1234', 10);

        for (const tId of tenants) {
            console.log(`Setting up structures and credentials for Tenant ${tId}...`);

            // Seed Session
            const [sessionRows] = await conn.execute('SELECT id FROM sessions WHERE tenant_id = ? LIMIT 1', [tId]);
            let sessionId;
            if (sessionRows.length === 0) {
                const [sessionRes] = await conn.execute(
                    'INSERT INTO sessions (name, is_active, tenant_id) VALUES (?, ?, ?)',
                    ['2026-2027', 1, tId]
                );
                sessionId = sessionRes.insertId;
            } else {
                sessionId = sessionRows[0].id;
            }

            // Seed Classes
            const [classRows] = await conn.execute('SELECT id FROM classes WHERE tenant_id = ? LIMIT 1', [tId]);
            if (classRows.length === 0) {
                for (const cls of defaultClasses) {
                    await conn.execute(
                        'INSERT INTO classes (name_ar, name_en, tenant_id) VALUES (?, ?, ?)',
                        [cls.name_ar, cls.name_en, tId]
                    );
                }
            }

            // Seed Role Permissions
            await conn.execute('DELETE FROM role_permissions WHERE tenant_id = ?', [tId]);
            for (const perm of defaultPermissions) {
                await conn.execute(
                    'INSERT INTO role_permissions (role, function_name, allowed, tenant_id) VALUES (?, ?, ?, ?)',
                    [perm.role, perm.function_name, perm.allowed, tId]
                );
            }

            // Seed Default Admin User
            await conn.execute(
                `INSERT INTO users (username, password, role, tenant_id) 
                 VALUES ('مدیر', ?, 'مدير', ?) 
                 ON DUPLICATE KEY UPDATE password = VALUES(password)`,
                [adminHash, tId]
            );
        }        await conn.commit();
        console.log('✅ Baseline multi-tenant seeding completed successfully!');
    } catch (err) {
        await conn.rollback();
        console.error('❌ Error seeding database:', err.message, err.stack);
        process.exit(1);
    } finally {
        conn.release();
    }
    process.exit(0);
}

seed();

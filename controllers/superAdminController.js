const db = require('../db');
const bcrypt = require('bcryptjs');

// Helper to seed default role permissions for a newly created tenant
async function seedDefaultPermissions(tenantId) {
    const defaultPermissions = [
        { function_name: 'reports', role: 'مدير', allowed: true },
        { function_name: 'reports', role: 'ناظم', allowed: true },
        { function_name: 'reports', role: 'عريف', allowed: false },
        { function_name: 'reports', role: 'أستاذ', allowed: false },
        { function_name: 'reports', role: 'طالب', allowed: false },

        { function_name: 'books_manage', role: 'مدير', allowed: true },
        { function_name: 'books_manage', role: 'ناظم', allowed: true },
        { function_name: 'books_manage', role: 'عريف', allowed: false },
        { function_name: 'books_manage', role: 'أستاذ', allowed: false },
        { function_name: 'books_manage', role: 'طالب', allowed: false },

        { function_name: 'users_manage', role: 'مدير', allowed: true },
        { function_name: 'users_manage', role: 'ناظم', allowed: true },
        { function_name: 'users_manage', role: 'عريف', allowed: false },
        { function_name: 'users_manage', role: 'أستاذ', allowed: false },
        { function_name: 'users_manage', role: 'طالب', allowed: false },

        { function_name: 'students_manage', role: 'مدير', allowed: true },
        { function_name: 'students_manage', role: 'ناظم', allowed: true },
        { function_name: 'students_manage', role: 'عريف', allowed: false },
        { function_name: 'students_manage', role: 'أستاذ', allowed: false },
        { function_name: 'students_manage', role: 'طالب', allowed: false },

        { function_name: 'student_attendance', role: 'مدير', allowed: true },
        { function_name: 'student_attendance', role: 'ناظم', allowed: true },
        { function_name: 'student_attendance', role: 'عريف', allowed: true },
        { function_name: 'student_attendance', role: 'أستاذ', allowed: false },
        { function_name: 'student_attendance', role: 'طالب', allowed: false },

        { function_name: 'teachers_manage', role: 'مدير', allowed: true },
        { function_name: 'teachers_manage', role: 'ناظم', allowed: true },
        { function_name: 'teachers_manage', role: 'عريف', allowed: false },
        { function_name: 'teachers_manage', role: 'أستاذ', allowed: false },
        { function_name: 'teachers_manage', role: 'طالب', allowed: false },

        { function_name: 'teacher_attendance', role: 'مدير', allowed: true },
        { function_name: 'teacher_attendance', role: 'ناظم', allowed: true },
        { function_name: 'teacher_attendance', role: 'عريف', allowed: true },
        { function_name: 'teacher_attendance', role: 'أستاذ', allowed: false },
        { function_name: 'teacher_attendance', role: 'طالب', allowed: false },

        { function_name: 'teacher_books_manage', role: 'مدير', allowed: true },
        { function_name: 'teacher_books_manage', role: 'ناظم', allowed: true },
        { function_name: 'teacher_books_manage', role: 'عريف', allowed: false },
        { function_name: 'teacher_books_manage', role: 'أستاذ', allowed: false },
        { function_name: 'teacher_books_manage', role: 'طالب', allowed: false },

        { function_name: 'periods_manage', role: 'مدير', allowed: true },
        { function_name: 'periods_manage', role: 'ناظم', allowed: true },
        { function_name: 'periods_manage', role: 'عريف', allowed: false },
        { function_name: 'periods_manage', role: 'أستاذ', allowed: false },
        { function_name: 'periods_manage', role: 'طالب', allowed: false }
    ];

    for (const perm of defaultPermissions) {
        await db.pool.execute(
            'INSERT INTO role_permissions (role, function_name, allowed, tenant_id) VALUES (?, ?, ?, ?)',
            [perm.role, perm.function_name, perm.allowed, tenantId]
        );
    }
}

exports.showLogin = (req, res) => {
    if (req.session.isMasterAdmin) {
        return res.redirect('/admin/dashboard');
    }
    res.render('super_admin/login', { error: null });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.pool.execute('SELECT * FROM master_admins WHERE username = ? LIMIT 1', [username]);
        if (rows.length === 0) {
            return res.render('super_admin/login', { error: 'اسم المستخدم أو كلمة المرور غير صحيحة.' });
        }

        const match = await bcrypt.compare(password, rows[0].password);
        if (!match) {
            return res.render('super_admin/login', { error: 'اسم المستخدم أو كلمة المرور غير صحيحة.' });
        }

        req.session.isMasterAdmin = true;
        req.session.masterAdminId = rows[0].id;
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.render('super_admin/login', { error: 'حدث خطأ في النظام.' });
    }
};

exports.logout = (req, res) => {
    req.session.isMasterAdmin = false;
    delete req.session.masterAdminId;
    res.redirect('/admin/login');
};

exports.showDashboard = async (req, res) => {
    try {
        // Fetch stats
        const [tenants] = await db.pool.execute('SELECT * FROM tenants ORDER BY id DESC');
        
        // Count totals across all tenants
        const [studentCount] = await db.pool.execute('SELECT COUNT(*) as total FROM students');
        const [teacherCount] = await db.pool.execute('SELECT COUNT(*) as total FROM teachers');
        const [classCount] = await db.pool.execute('SELECT COUNT(*) as total FROM classes');

        const stats = {
            totalTenants: tenants.length,
            activeTenants: tenants.filter(t => t.status === 'active').length,
            suspendedTenants: tenants.filter(t => t.status === 'suspended').length,
            totalStudents: studentCount[0].total,
            totalTeachers: teacherCount[0].total,
            totalClasses: classCount[0].total
        };

        res.render('super_admin/dashboard', { tenants, stats });
    } catch (err) {
        console.error(err);
        res.status(500).send('Super Admin Dashboard Error');
    }
};

exports.createTenant = async (req, res) => {
    const { name, subdomain, customDomain, schoolName, planTier, maxStudents, maxTeachers, maxClasses } = req.body;
    try {
        // Enforce validations
        if (!name || !subdomain || !schoolName) {
            return res.status(400).send('Missing required tenant fields.');
        }

        // Insert
        const [result] = await db.pool.execute(
            `INSERT INTO tenants (name, subdomain, custom_domain, school_name, plan_tier, max_students, max_teachers, max_classes) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name, 
                subdomain.toLowerCase().trim(), 
                customDomain ? customDomain.toLowerCase().trim() : null, 
                schoolName, 
                planTier || 'free', 
                maxStudents || 50, 
                maxTeachers || 5, 
                maxClasses || 5
            ]
        );

        const newTenantId = result.insertId;

        // Seed default role permissions for the new tenant
        await seedDefaultPermissions(newTenantId);

        res.redirect('/admin/dashboard?created=true');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error provisioning tenant: ' + err.message);
    }
};

exports.editTenant = async (req, res) => {
    const { id } = req.params;
    const { name, subdomain, customDomain, schoolName, planTier, maxStudents, maxTeachers, maxClasses, status, primaryColor, secondaryColor } = req.body;
    try {
        await db.pool.execute(
            `UPDATE tenants 
             SET name = ?, subdomain = ?, custom_domain = ?, school_name = ?, plan_tier = ?, 
                 max_students = ?, max_teachers = ?, max_classes = ?, status = ?, 
                 primary_color = ?, secondary_color = ? 
             WHERE id = ?`,
            [
                name, 
                subdomain.toLowerCase().trim(), 
                customDomain ? customDomain.toLowerCase().trim() : null, 
                schoolName, 
                planTier, 
                maxStudents, 
                maxTeachers, 
                maxClasses, 
                status, 
                primaryColor || '#3b82f6', 
                secondaryColor || '#1d4ed8',
                id
            ]
        );
        res.redirect('/admin/dashboard?updated=true');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating tenant: ' + err.message);
    }
};

exports.toggleTenantStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // active, suspended
    try {
        await db.pool.execute('UPDATE tenants SET status = ? WHERE id = ?', [status, id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

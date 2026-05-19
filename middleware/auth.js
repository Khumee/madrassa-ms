const db = require('../config/db');

const hasRole = (allowed) => {
    return (req, res, next) => {
        if (!req.session.role) {
            return res.redirect('/login');
        }
        
        const normalize = (str) => {
            if (!str) return '';
            return str.replace(/\u06CC/g, '\u064A').trim();
        };

        const userRole = normalize(req.session.role);
        const normalizedAllowed = allowed.map(normalize);

        // Areeb (عريب) has student (طالب) rights
        if (normalizedAllowed.includes('طالب')) {
            if (userRole === 'طالب' || userRole === 'عريب') {
                return next();
            }
        }
        
        // Areeb (عريب) has teacher (أستاذ) rights
        if (normalizedAllowed.includes('أستاذ')) {
            if (userRole === 'أستاذ' || userRole === 'عريب') {
                return next();
            }
        }
        
        if (normalizedAllowed.includes(userRole)) {
            return next();
        }
        res.status(403).send('Unauthorized');
    };
};

const hasPermission = (functionName) => {
    return async (req, res, next) => {
        if (!req.session.userId) {
            return res.redirect('/login');
        }
        if (!req.session.role) {
            return res.status(403).send('Unauthorized: Role not specified in session');
        }

        const normalize = (str) => {
            if (!str) return '';
            return str.replace(/\u06CC/g, '\u064A').trim();
        };

        const userRole = normalize(req.session.role);

        try {
            // Mudeer (مدير) can always access everything
            if (userRole === 'مدير') {
                return next();
            }

            // We check the role_permissions table in the database
            const [rows] = await db.execute(
                'SELECT allowed FROM role_permissions WHERE role = ? AND function_name = ?',
                [userRole, functionName]
            );

            if (rows.length > 0) {
                if (rows[0].allowed === 1 || rows[0].allowed === true) {
                    return next();
                }
            } else {
                // Fallback to hardcoded defaults if database entry does not exist
                const defaultPermissions = {
                    'reports': ['مدير', 'ناظم'],
                    'books_manage': ['مدير', 'ناظم'],
                    'users_manage': ['مدير', 'ناظم'],
                    'students_manage': ['مدير', 'ناظم'],
                    'student_attendance': ['مدير', 'ناظم', 'عريب'],
                    'teachers_manage': ['مدير', 'ناظم'],
                    'teacher_attendance': ['مدير', 'ناظم', 'عريب'],
                    'teacher_books_manage': ['مدير', 'ناظم'],
                    'periods_manage': ['مدير', 'ناظم']
                };

                const allowedRoles = defaultPermissions[functionName] || [];
                const normalizedAllowed = allowedRoles.map(normalize);
                if (normalizedAllowed.includes(userRole)) {
                    return next();
                }
            }

            // Render custom unauthorized page
            res.status(403).render('error_unauthorized', { 
                message: 'عذراً، ليس لديك الصلاحية الكافية للوصول إلى هذه الصفحة أو الميزة. يرجى مراجعة إدارة المدرسة (المدير).',
                lang: req.session.lang || 'ar'
            });
        } catch (err) {
            console.error('Error checking permission:', err);
            res.status(503).send('Error checking permission in database');
        }
    };
};

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) return next();
    res.redirect('/login');
};

const getCRClassId = async (userId) => {
    const [student] = await db.execute('SELECT class_id FROM students WHERE user_id = ?', [userId]);
    return student.length ? student[0].class_id : null;
};

module.exports = {
    isAuthenticated,
    hasRole,
    hasPermission,
    getCRClassId
};

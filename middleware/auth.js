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
    getCRClassId
};

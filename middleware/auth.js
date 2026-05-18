const db = require('../config/db');

const hasRole = (allowed) => {
    return (req, res, next) => {
        if (!req.session.role) {
            return res.redirect('/login');
        }
        
        // Areeb (عريب) has student (طالب) rights
        if (allowed.includes('طالب')) {
            if (req.session.role === 'طالب' || req.session.role === 'عريب' || req.session.role === 'عریب') {
                return next();
            }
        }
        
        // Areeb (عريب) has teacher (أستاذ) rights
        if (allowed.includes('أستاذ')) {
            if (req.session.role === 'أستاذ' || req.session.role === 'عريب' || req.session.role === 'عریب') {
                return next();
            }
        }
        
        if (allowed.includes(req.session.role)) {
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

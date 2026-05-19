const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { DateTime } = require('luxon');

exports.showLogin = (req, res) => {
    res.render('login', { error: null });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const cleanUsername = username ? username.trim() : '';
        console.log('--- LOGIN ATTEMPT ---');
        console.log('Submitted Username:', cleanUsername);
        
        // Define robust Arabic/Urdu/Persian username normalization
        const normalizeUsername = (str) => {
            if (!str) return '';
            return str
                .trim()
                // Strip all Arabic/Urdu diacritics (harakat, tashkeel, shaddah, fatha, damma, kasra, sukoon, etc.)
                .replace(/[\u064B-\u065F\u0670\u0656-\u065C]/g, '')
                // Normalize Persian/Urdu Yeh (ی / U+06CC) to Arabic Yeh (ي / U+064A)
                .replace(/\u06CC/g, '\u064A')
                // Normalize Persian/Urdu Keheh (ک / U+06A9) to Arabic Kaf (ك / U+0643)
                .replace(/\u06A9/g, '\u0643')
                // Normalize Heh Goal (ہ / U+06C1) and Te Marbuta (ة / U+0629)
                .replace(/\u06C1/g, '\u0647')
                .replace(/\u0629/g, '\u0647');
        };

        const [rows] = await db.execute('SELECT * FROM users');
        const user = rows.find(u => normalizeUsername(u.username) === normalizeUsername(cleanUsername));
        
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            console.log('Bcrypt password match:', match);
            if (match) {
                const normalizeRole = (role) => {
                    if (!role) return '';
                    let normalized = role.replace(/\u06CC/g, '\u064A').replace(/_/g, ' ').trim();
                    if (normalized === 'مسؤول الصف' || normalized === 'عريب' || normalized === 'عریب') {
                        return 'عريب';
                    }
                    if (normalized === 'طالب علم' || normalized === 'طالب') {
                        return 'طالب';
                    }
                    return normalized;
                };

                req.session.userId = user.id;
                req.session.role = normalizeRole(user.role);

                return req.session.save((err) => {
                    if (err) {
                        console.error('Session save error:', err);
                        return res.render('login', { error: req.__('Session_Error') });
                    }
                    const normRole = req.session.role;
                    if (normRole === 'طالب') return res.redirect('/dashboard/student');
                    if (normRole === 'عريب') return res.redirect('/dashboard/cr');
                    if (normRole === 'أستاذ') return res.redirect('/dashboard/teacher');

                    return res.redirect('/');
                });
            }
        }
        res.render('login', { error: req.__('Invalid_Credentials') });
    } catch (err) {
        console.error(err);
        res.render('login', { error: req.__('Internal_Server_Error') });
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};

exports.showChangePassword = (req, res) => {
    res.render('change_password', { error: null, success: null });
};

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    try {
        const [user] = await db.execute('SELECT password FROM users WHERE id = ?', [req.session.userId]);
        const match = await bcrypt.compare(currentPassword, user[0].password);
        if (!match) return res.render('change_password', { error: 'Current password incorrect', success: null });
        if (newPassword !== confirmPassword) return res.render('change_password', { error: 'Passwords do not match', success: null });

        const hashed = await bcrypt.hash(newPassword, 10);
        await db.execute('UPDATE users SET password = ? WHERE id = ?', [hashed, req.session.userId]);
        res.render('change_password', { error: null, success: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating password');
    }
};

exports.showDashboard = async (req, res) => {
    try {
        const role = req.session.role;

        if (role === 'طالب') {
            return res.redirect('/dashboard/student');
        } else if (role === 'عريب' || role === 'عریب') {
            return res.redirect('/dashboard/cr');
        } else if (role === 'أستاذ') {
            return res.redirect('/dashboard/teacher');
        } else if (role === 'ناظم' || role === 'مدير') {
            const [allClasses] = await db.execute('SELECT * FROM classes');
            const hiddenNames = ['الأولى', 'الثالثة', 'الرابعة', 'السابعة'];
            const classes = allClasses.filter(c => !hiddenNames.includes(c.name_ar));
            const today = DateTime.now().setLocale('ar').toFormat('cccc, dd MMMM yyyy');
            return res.render('dashboard', { classes, today, role });
        }

        res.redirect('/logout');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading dashboard');
    }
};

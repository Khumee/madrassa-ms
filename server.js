// KUI Management System - Production Entrypoint
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const { Settings } = require('luxon');
const i18n = require('i18n');

Settings.defaultZone = 'Asia/Karachi';
require('dotenv').config();

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/logo.jpg', (req, res) => res.sendFile(path.join(__dirname, 'logo.jpg')));
app.get('/mobile', (req, res) => res.redirect('/kui.apk'));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// i18n Translation setup
i18n.configure({
    locales: ['ar', 'ur'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'ar',
    cookie: 'lang',
    updateFiles: false
});
app.use(i18n.init);
app.use((req, res, next) => {
    if (req.session.lang && ['ar', 'ur'].includes(req.session.lang)) {
        req.setLocale(req.session.lang);
    } else {
        req.session.lang = 'ar';
        req.setLocale('ar');
    }
    res.locals.lang = req.getLocale();
    res.locals.__ = res.__;
    res.locals.session = req.session;
    next();
});

// Set Language Route
app.get('/set-lang/:lang', (req, res) => {
    const lang = req.params.lang;
    if (['ar', 'ur'].includes(lang)) {
        req.session.lang = lang;
        res.cookie('lang', lang, { maxAge: 900000, httpOnly: true });
    }
    const backURL = req.header('Referer') || '/';
    res.redirect(backURL);
});

// Import Modular Entity Routers
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const periodRoutes = require('./routes/periodRoutes');
const reportRoutes = require('./routes/reportRoutes');

// TEMPORARY LOGS ROUTE
app.get('/logs-debug', (req, res) => {
    try {
        const execSync = require('child_process').execSync;
        let logs = '';
        try {
            logs += "=== PM2 STATUS ===\n" + execSync('pm2 status').toString() + "\n";
        } catch (e) {
            logs += "PM2 Status Error: " + e.message + "\n";
        }
        try {
            logs += "=== PM2 ERROR LOGS ===\n" + execSync('pm2 logs "kui-ms" --lines 100 --err --raw --nostream').toString() + "\n";
        } catch (e) {
            logs += "PM2 Error Logs Error: " + e.message + "\n";
        }
        res.setHeader('Content-Type', 'text/plain');
        res.send(logs);
    } catch (err) {
        res.status(500).send(err.stack);
    }
});

// Register Routers
app.use(authRoutes);
app.use(studentRoutes);
app.use(teacherRoutes);
app.use(periodRoutes);
app.use(reportRoutes);

// Start Server
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    try {
        const db = require('./config/db');
        
        // 0. Permissions Schema & Initial Seeding
        await db.execute(`
            CREATE TABLE IF NOT EXISTS role_permissions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                role VARCHAR(50) NOT NULL,
                function_name VARCHAR(100) NOT NULL,
                allowed BOOLEAN DEFAULT FALSE,
                UNIQUE KEY role_function (role, function_name)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        const [permCount] = await db.execute('SELECT COUNT(*) as count FROM role_permissions');
        if (permCount[0].count === 0) {
            console.log('Seeding default role permissions...');
            const defaultPermissions = [
                { function_name: 'reports', role: 'مدير', allowed: true },
                { function_name: 'reports', role: 'ناظم', allowed: true },
                { function_name: 'reports', role: 'عريب', allowed: false },
                { function_name: 'reports', role: 'أستاذ', allowed: false },
                { function_name: 'reports', role: 'طالب', allowed: false },

                { function_name: 'books_manage', role: 'مدير', allowed: true },
                { function_name: 'books_manage', role: 'ناظم', allowed: true },
                { function_name: 'books_manage', role: 'عريب', allowed: false },
                { function_name: 'books_manage', role: 'أستاذ', allowed: false },
                { function_name: 'books_manage', role: 'طالب', allowed: false },

                { function_name: 'users_manage', role: 'مدير', allowed: true },
                { function_name: 'users_manage', role: 'ناظم', allowed: true },
                { function_name: 'users_manage', role: 'عريب', allowed: false },
                { function_name: 'users_manage', role: 'أستاذ', allowed: false },
                { function_name: 'users_manage', role: 'طالب', allowed: false },

                { function_name: 'students_manage', role: 'مدير', allowed: true },
                { function_name: 'students_manage', role: 'ناظم', allowed: true },
                { function_name: 'students_manage', role: 'عريب', allowed: false },
                { function_name: 'students_manage', role: 'أستاذ', allowed: false },
                { function_name: 'students_manage', role: 'طالب', allowed: false },

                { function_name: 'student_attendance', role: 'مدير', allowed: true },
                { function_name: 'student_attendance', role: 'ناظم', allowed: true },
                { function_name: 'student_attendance', role: 'عريب', allowed: true },
                { function_name: 'student_attendance', role: 'أستاذ', allowed: false },
                { function_name: 'student_attendance', role: 'طالب', allowed: false },

                { function_name: 'teachers_manage', role: 'مدير', allowed: true },
                { function_name: 'teachers_manage', role: 'ناظم', allowed: true },
                { function_name: 'teachers_manage', role: 'عريب', allowed: false },
                { function_name: 'teachers_manage', role: 'أستاذ', allowed: false },
                { function_name: 'teachers_manage', role: 'طالب', allowed: false },

                { function_name: 'teacher_attendance', role: 'مدير', allowed: true },
                { function_name: 'teacher_attendance', role: 'ناظم', allowed: true },
                { function_name: 'teacher_attendance', role: 'عريب', allowed: true },
                { function_name: 'teacher_attendance', role: 'أستاذ', allowed: false },
                { function_name: 'teacher_attendance', role: 'طالب', allowed: false },

                { function_name: 'teacher_books_manage', role: 'مدير', allowed: true },
                { function_name: 'teacher_books_manage', role: 'ناظم', allowed: true },
                { function_name: 'teacher_books_manage', role: 'عريب', allowed: false },
                { function_name: 'teacher_books_manage', role: 'أستاذ', allowed: false },
                { function_name: 'teacher_books_manage', role: 'طالب', allowed: false },

                { function_name: 'periods_manage', role: 'مدير', allowed: true },
                { function_name: 'periods_manage', role: 'ناظم', allowed: true },
                { function_name: 'periods_manage', role: 'عريب', allowed: false },
                { function_name: 'periods_manage', role: 'أستاذ', allowed: false },
                { function_name: 'periods_manage', role: 'طالب', allowed: false }
            ];

            for (const perm of defaultPermissions) {
                await db.execute(
                    'INSERT IGNORE INTO role_permissions (role, function_name, allowed) VALUES (?, ?, ?)',
                    [perm.role, perm.function_name, perm.allowed]
                );
            }
            console.log('✅ Default role permissions seeded.');
        }

        // 1. Roles Normalization
        await db.execute(`
            UPDATE users 
            SET role = 'عريب' 
            WHERE role IN ('مسؤول_الصف', 'مسؤول الصف', 'عریب')
        `);
        await db.execute(`
            UPDATE users 
            SET role = 'طالب' 
            WHERE role IN ('طالب_علم')
        `);
        
        // Force critical permissions for Areeb (عريب) to be allowed on every startup
        const criticalAreebPerms = ['student_attendance', 'teacher_attendance'];
        for (const func of criticalAreebPerms) {
            await db.execute(
                `INSERT INTO role_permissions (role, function_name, allowed) 
                 VALUES ('عريب', ?, 1) 
                 ON DUPLICATE KEY UPDATE allowed = 1`,
                [func]
            );
            await db.execute(
                `INSERT INTO role_permissions (role, function_name, allowed) 
                 VALUES ('عریب', ?, 1) 
                 ON DUPLICATE KEY UPDATE allowed = 1`,
                [func]
            );
        }
        
        // 2. Safe trailing '1' removal for all MySQL versions
        await db.execute(`
            UPDATE users 
            SET username = SUBSTRING(username, 1, LENGTH(username) - 1) 
            WHERE username LIKE '%1' AND role != 'مدير' AND username != 'مدیر'
        `);

        // 3. Reset passwords to '1234' for everyone except mudeer
        const defaultHash = '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW'; // Hash for '1234'
        await db.execute(`
            UPDATE users 
            SET password = ? 
            WHERE id != 2 AND username != 'مدير' AND username != 'مدیر'
        `, [defaultHash]);

        // 4. Alter day_of_week enum in periods table to include Sunday
        await db.execute(`
            ALTER TABLE periods 
            MODIFY COLUMN day_of_week enum('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') 
            CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
        `);

        console.log('✅ Startup database roles, usernames, passwords, and day_of_week ENUM normalization complete.');
    } catch (err) {
        console.error('❌ Failed to run startup DB normalization:', err);
    }
});

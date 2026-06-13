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
app.get('/api/app-version', (req, res) => {
    try {
        const fs = require('fs');
        const path = require('path');
        const gradlePath = path.join(__dirname, 'mobile', 'app', 'build.gradle');
        if (fs.existsSync(gradlePath)) {
            const content = fs.readFileSync(gradlePath, 'utf8');
            const matchCode = content.match(/versionCode\s+(\d+)/);
            const matchName = content.match(/versionName\s+"([^"]+)"/);
            const versionCode = matchCode ? parseInt(matchCode[1], 10) : 1;
            const versionName = matchName ? matchName[1] : "1.0";
            return res.json({ versionCode, versionName });
        }
        res.json({ versionCode: 1, versionName: "1.0" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read app version' });
    }
});

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
    locales: ['ar', 'ur', 'en'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'ar',
    cookie: 'lang',
    updateFiles: false
});
app.use(i18n.init);
app.use((req, res, next) => {
    if (req.session.lang && ['ar', 'ur', 'en'].includes(req.session.lang)) {
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
    if (['ar', 'ur', 'en'].includes(lang)) {
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
                await db.execute(
                    'INSERT IGNORE INTO role_permissions (role, function_name, allowed) VALUES (?, ?, ?)',
                    [perm.role, perm.function_name, perm.allowed]
                );
            }
            console.log('✅ Default role permissions seeded.');
        }


        console.log('✅ Startup database roles and permissions check complete.');
    } catch (err) {
        console.error('❌ Failed to run startup DB checks:', err);
    }
});

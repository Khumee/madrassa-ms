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

// Register Routers
app.use(authRoutes);
app.use(studentRoutes);
app.use(teacherRoutes);
app.use(periodRoutes);
app.use(reportRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

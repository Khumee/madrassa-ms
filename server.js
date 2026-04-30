// KUI Management System - Production Trigger
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('./db');
const { DateTime } = require('luxon');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/logo.jpg', (req, res) => res.sendFile(path.join(__dirname, 'logo.jpg')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Auth Middleware
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) return next();
    res.redirect('/login');
};

// Routes
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length > 0) {
            const user = rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                req.session.userId = user.id;
                req.session.role = user.role;
                return res.redirect('/');
            }
        }
        res.render('login', { error: 'Invalid username or password' });
    } catch (err) {
        console.error(err);
        res.render('login', { error: 'Internal Server Error' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Dashboard
app.get('/', isAuthenticated, async (req, res) => {
    try {
        const [allClasses] = await db.execute('SELECT * FROM classes');
        // Hide classes 1, 3, 4, 7 (Aula, Salisa, Rabia, Sabiya)
        const hiddenIds = [1, 3, 4, 7];
        const classes = allClasses.filter(c => !hiddenIds.includes(c.id));
        const today = DateTime.now().toISODate();
        res.render('dashboard', { classes, today });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading dashboard');
    }
});

app.get('/attendance/students/:classId', isAuthenticated, async (req, res) => {
    const { classId } = req.params;
    const date = req.query.date || DateTime.now().toISODate();
    try {
        const [students] = await db.execute(
            `SELECT s.*, a.status 
             FROM students s 
             LEFT JOIN attendance_students a ON s.id = a.student_id AND a.date = ?
             WHERE s.class_id = ?`, 
            [date, classId]
        );
        // Get weekly history (last 7 days)
        const [history] = await db.execute(
            `SELECT DATE_FORMAT(date, '%Y-%m-%d') as date_str, 
             SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present,
             SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent,
             SUM(CASE WHEN status = 'leave' THEN 1 ELSE 0 END) as leave_count,
             SUM(CASE WHEN status = 'online' THEN 1 ELSE 0 END) as online
             FROM attendance_students 
             WHERE student_id IN (SELECT id FROM students WHERE class_id = ?)
             GROUP BY date 
             ORDER BY date DESC LIMIT 7`,
            [classId]
        );

        const [classInfo] = await db.execute('SELECT * FROM classes WHERE id = ?', [classId]);
        res.render('attendance_students', { students, classInfo: classInfo[0], date, history });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading attendance');
    }
});

app.get('/attendance/delete-day/:classId/:date', isAuthenticated, async (req, res) => {
    const { classId, date } = req.params;
    try {
        await db.execute(
            `DELETE FROM attendance_students 
             WHERE date = ? AND student_id IN (SELECT id FROM students WHERE class_id = ?)`,
            [date, classId]
        );
        res.redirect(`/attendance/students/${classId}?date=${date}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting attendance records');
    }
});

app.post('/attendance/students/save', isAuthenticated, async (req, res) => {
    const { date, attendance } = req.body; // attendance: { studentId: status }
    try {
        for (const [studentId, status] of Object.entries(attendance)) {
            await db.execute(
                `INSERT INTO attendance_students (student_id, date, status, marked_by) 
                 VALUES (?, ?, ?, ?) 
                 ON DUPLICATE KEY UPDATE status = ?`,
                [studentId, date, status, req.session.userId, status]
            );
        }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

// Teacher Attendance
app.get('/teachers', isAuthenticated, async (req, res) => {
    const date = req.query.date || DateTime.now().toISODate();
    try {
        const [teachers] = await db.execute(
            `SELECT t.*, a.classes_taken 
             FROM teachers t 
             LEFT JOIN attendance_teachers a ON t.id = a.teacher_id AND a.date = ?`, 
            [date]
        );
        res.render('attendance_teachers', { teachers, date });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading teachers');
    }
});

app.post('/attendance/teachers/save', isAuthenticated, async (req, res) => {
    const { date, attendance } = req.body; // attendance: { teacherId: classesTaken }
    try {
        for (const [teacherId, count] of Object.entries(attendance)) {
            await db.execute(
                `INSERT INTO attendance_teachers (teacher_id, date, classes_taken, marked_by) 
                 VALUES (?, ?, ?, ?) 
                 ON DUPLICATE KEY UPDATE classes_taken = ?`,
                [teacherId, date, count, req.session.userId, count]
            );
        }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

// Student Management
app.get('/students/manage', isAuthenticated, async (req, res) => {
    try {
        const [students] = await db.execute('SELECT s.*, c.name_ar as class_name FROM students s JOIN classes c ON s.class_id = c.id ORDER BY s.class_id, s.name');
        const [allClasses] = await db.execute('SELECT * FROM classes');
        const hiddenIds = [1, 3, 4, 7];
        const classes = allClasses.filter(c => !hiddenIds.includes(parseInt(c.id)));
        res.render('students_manage', { students, classes });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading management page');
    }
});

app.post('/students/edit/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { name, classId, rollNumber } = req.body;
    try {
        await db.execute('UPDATE students SET name = ?, class_id = ?, roll_number = ? WHERE id = ?', [name, classId, rollNumber, id]);
        res.redirect('/students/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating student');
    }
});

app.get('/students/delete/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM students WHERE id = ?', [id]);
        res.redirect('/students/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting student');
    }
});

app.get('/students/add', isAuthenticated, async (req, res) => {
    const [classes] = await db.execute('SELECT * FROM classes');
    res.render('student_add', { classes });
});

app.post('/students/add', isAuthenticated, async (req, res) => {
    const { name, classId, rollNumber } = req.body;
    try {
        await db.execute('INSERT INTO students (name, class_id, roll_number) VALUES (?, ?, ?)', [name, classId, rollNumber]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding student');
    }
});

// Teacher Management
app.get('/teachers/manage', isAuthenticated, async (req, res) => {
    try {
        const [teachers] = await db.execute('SELECT * FROM teachers');
        res.render('teachers_manage', { teachers });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading management page');
    }
});

app.post('/teachers/edit/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { name, subject } = req.body;
    try {
        await db.execute('UPDATE teachers SET name = ?, subject = ? WHERE id = ?', [name, subject, id]);
        res.redirect('/teachers/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating teacher');
    }
});

app.get('/teachers/delete/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM teachers WHERE id = ?', [id]);
        res.redirect('/teachers/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting teacher');
    }
});

app.get('/teachers/add', isAuthenticated, (req, res) => {
    res.render('teacher_add');
});

app.post('/teachers/add', isAuthenticated, async (req, res) => {
    const { name, subject } = req.body;
    try {
        await db.execute('INSERT INTO teachers (name, subject) VALUES (?, ?)', [name, subject]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding teacher');
    }
});

// Reports
app.get('/reports', isAuthenticated, async (req, res) => {
    try {
        // Simple report: overall attendance percentage per student for the last 30 days
        const [rows] = await db.execute(`
            SELECT s.name, c.name_ar as class_name,
            COUNT(a.id) as total_days,
            SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) as present_days,
            ROUND(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) * 100 / NULLIF(COUNT(a.id), 0), 2) as percentage
            FROM students s
            JOIN classes c ON s.class_id = c.id
            LEFT JOIN attendance_students a ON s.id = a.student_id
            GROUP BY s.id, c.name_ar
        `);

        // Group rows by class_name, filtering out hidden classes
        const hiddenNames = ['الأولى', 'الثالثة', 'الرابعة', 'السابعة'];
        const groupedReport = rows.reduce((acc, student) => {
            if (hiddenNames.includes(student.class_name)) return acc;
            if (!acc[student.class_name]) acc[student.class_name] = [];
            acc[student.class_name].push(student);
            return acc;
        }, {});

        res.render('reports', { groupedReport });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading reports');
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

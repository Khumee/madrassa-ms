// KUI Management System - Production Trigger
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('./db');
const { DateTime, Settings } = require('luxon');
Settings.defaultZone = 'Asia/Karachi';
require('dotenv').config();

const app = express();
app.set('trust proxy', 1);
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

const hasRole = (roles) => {
    return (req, res, next) => {
        if (!req.session.userId) return res.redirect('/login');
        if (roles.includes(req.session.role)) return next();
        res.status(403).send('Unauthorized');
    };
};

const getCRClassId = async (userId) => {
    const [student] = await db.execute('SELECT class_id FROM students WHERE user_id = ?', [userId]);
    return student.length ? student[0].class_id : null;
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
                
                return req.session.save((err) => {
                    if (err) {
                        console.error('Session save error:', err);
                        return res.render('login', { error: 'Session Error' });
                    }
                    // Unified Redirection
                    if (user.role === 'طالب_علم') return res.redirect('/dashboard/student');
                    if (user.role === 'مسؤول_الصف') return res.redirect('/dashboard/cr');
                    if (user.role === 'أستاذ') return res.redirect('/dashboard/teacher');
                    
                    return res.redirect('/');
                });
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

app.get('/profile/change-password', isAuthenticated, (req, res) => {
    res.render('change_password', { error: null, success: null });
});

app.post('/profile/change-password', isAuthenticated, async (req, res) => {
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
});

// Dashboard
app.get('/', isAuthenticated, async (req, res) => {
    try {
        const role = req.session.role;
        
        if (role === 'طالب_علم') {
            return res.redirect('/dashboard/student');
        } else if (role === 'مسؤول_الصف') {
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
});

// Role-Specific Dashboards
app.get('/dashboard/student', hasRole(['طالب_علم']), async (req, res) => {
    try {
        const [student] = await db.execute('SELECT * FROM students WHERE user_id = ?', [req.session.userId]);
        if (!student[0]) return res.status(404).send('Student record not found');
        
        const classId = student[0].class_id;
        const dayName = DateTime.now().setLocale('en').toFormat('cccc');

        // Get Today's Periods for this class
        const [periods] = await db.execute(
            `SELECT p.*, t.name as teacher_name 
             FROM periods p 
             JOIN teachers t ON p.teacher_id = t.id 
             WHERE p.class_id = ? AND p.day_of_week = ?
             ORDER BY p.period_number`,
            [classId, dayName]
        );

        // Get Book Progress for this class
        const [books] = await db.execute(`
            SELECT tb.*, b.title as book_title, t.name as teacher_name
            FROM teacher_books tb
            JOIN books b ON tb.book_id = b.id
            JOIN teachers t ON tb.teacher_id = t.id
            JOIN sessions s ON tb.session_id = s.id
            WHERE tb.class_id = ? AND s.is_active = TRUE
        `, [classId]);

        const [attendance] = await db.execute(
            'SELECT * FROM attendance_students WHERE student_id = ? ORDER BY date DESC LIMIT 30',
            [student[0].id]
        );
        res.render('dashboard_student', { 
            student: student[0], 
            attendance, 
            periods, 
            books,
            today: DateTime.now().setLocale('ar').toFormat('cccc, dd MMMM yyyy')
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/dashboard/cr', hasRole(['مسؤول_الصف']), async (req, res) => {
    // CR can see class attendance
    try {
        const [student] = await db.execute('SELECT * FROM students WHERE user_id = ?', [req.session.userId]);
        if (!student[0]) return res.status(404).send('Record not found');
        
        const classId = student[0].class_id;
        const [students] = await db.execute(
            'SELECT s.*, a.status FROM students s LEFT JOIN attendance_students a ON s.id = a.student_id AND a.date = CURDATE() WHERE s.class_id = ?',
            [classId]
        );
        const [classInfo] = await db.execute('SELECT * FROM classes WHERE id = ?', [classId]);
        res.render('dashboard_cr', { students, classInfo: classInfo[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/dashboard/teacher', hasRole(['أستاذ']), async (req, res) => {
    try {
        const [teacher] = await db.execute('SELECT * FROM teachers WHERE user_id = ?', [req.session.userId]);
        if (!teacher[0]) return res.status(404).send('Teacher record not found');
        
        const teacherId = teacher[0].id;
        const dayName = DateTime.now().setLocale('en').toFormat('cccc');
        
        const [periods] = await db.execute(
            `SELECT p.*, c.name_ar as class_name 
             FROM periods p 
             JOIN classes c ON p.class_id = c.id 
             WHERE p.teacher_id = ? AND p.day_of_week = ?`,
            [teacherId, dayName]
        );

        const [assignedBooks] = await db.execute(`
            SELECT tb.*, b.title as book_title, c.name_ar as class_name,
                   (SELECT COUNT(*) FROM periods p 
                    WHERE p.assignment_id = tb.id AND p.day_of_week = ?) as has_period_today,
                   (SELECT MIN(p.period_number) FROM periods p 
                    WHERE p.assignment_id = tb.id AND p.day_of_week = ?) as first_period_today
            FROM teacher_books tb
            JOIN books b ON tb.book_id = b.id
            JOIN sessions s ON tb.session_id = s.id
            LEFT JOIN classes c ON tb.class_id = c.id
            WHERE tb.teacher_id = ? AND s.is_active = TRUE
            ORDER BY has_period_today DESC, first_period_today ASC, tb.id DESC
        `, [dayName, dayName, teacherId]);

        res.render('dashboard_teacher', { 
            teacher: teacher[0], 
            periods, 
            assignedBooks,
            today: DateTime.now().setLocale('ar').toFormat('cccc, dd MMMM yyyy') 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading teacher dashboard');
    }
});

app.get('/attendance/students/:classId', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { classId } = req.params;
    if (req.session.role === 'مسؤول_الصف') {
        const crClassId = await getCRClassId(req.session.userId);
        if (crClassId != classId) return res.status(403).send('Unauthorized');
    }
    const date = req.query.date || DateTime.now().toISODate();
    try {
        console.log(`🔍 Loading attendance for ClassID: ${classId}, Date: ${date}`);
        const [students] = await db.execute(
            `SELECT s.*, a.status 
             FROM students s 
             LEFT JOIN attendance_students a ON s.id = a.student_id AND a.date = ?
             WHERE s.class_id = ?`, 
            [date, classId]
        );
        console.log(`✅ Found ${students.length} students for this class.`);

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
             ORDER BY date DESC LIMIT 14`,
            [classId]
        );
        console.log(`📊 Weekly history rows found: ${history.length}`);

        const [classInfo] = await db.execute('SELECT * FROM classes WHERE id = ?', [classId]);
        res.render('attendance_students', { students, classInfo: classInfo[0], date, history });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading attendance');
    }
});

app.get('/attendance/delete-day/:classId/:date', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { classId, date } = req.params;
    if (req.session.role === 'مسؤول_الصف') {
        const crClassId = await getCRClassId(req.session.userId);
        if (crClassId != classId) return res.status(403).send('Unauthorized');
    }
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

app.post('/attendance/students/save', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { date, attendance, classId } = req.body; // attendance: { studentId: status }
    if (req.session.role === 'مسؤول_الصف') {
        const crClassId = await getCRClassId(req.session.userId);
        if (crClassId != classId) return res.status(403).send('Unauthorized');
    }
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
app.get('/teachers', hasRole(['ناظم', 'مدير']), async (req, res) => {
    const date = req.query.date || DateTime.now().toISODate();
    const dayName = DateTime.fromISO(date).setLocale('en').toFormat('cccc');
    try {
        const [teachers] = await db.execute(
            `SELECT t.*, a.classes_taken,
             (SELECT COUNT(*) FROM periods WHERE teacher_id = t.id AND day_of_week = ?) as scheduled_count
             FROM teachers t 
             LEFT JOIN attendance_teachers a ON t.id = a.teacher_id AND a.date = ?`, 
            [dayName, date]
        );
        res.render('attendance_teachers', { teachers, date });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading teacher attendance');
    }
});

app.post('/attendance/teachers/save', hasRole(['ناظم', 'مدير']), async (req, res) => {
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
app.get('/students/manage', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    try {
        let studentsQuery = 'SELECT s.*, c.name_ar as class_name FROM students s JOIN classes c ON s.class_id = c.id';
        let queryParams = [];
        let crClassId = null;

        if (req.session.role === 'مسؤول_الصف') {
            crClassId = await getCRClassId(req.session.userId);
            if (!crClassId) return res.status(403).send('CR class not found');
            studentsQuery += ' WHERE s.class_id = ?';
            queryParams.push(crClassId);
        }
        studentsQuery += ' ORDER BY s.class_id, s.name';

        const [students] = await db.execute(studentsQuery, queryParams);
        
        let classesQuery = 'SELECT * FROM classes';
        let classParams = [];
        if (crClassId) {
            classesQuery += ' WHERE id = ?';
            classParams.push(crClassId);
        }
        const [allClasses] = await db.execute(classesQuery, classParams);
        const hiddenIds = [1, 3, 4, 7];
        const classes = allClasses.filter(c => !hiddenIds.includes(parseInt(c.id)));
        
        res.render('students_manage', { students, classes, role: req.session.role, crClassId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading management page');
    }
});

app.post('/students/edit/:id', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { id } = req.params;
    const { name, classId } = req.body;
    try {
        if (req.session.role === 'مسؤول_الصف') {
            const crClassId = await getCRClassId(req.session.userId);
            const [student] = await db.execute('SELECT class_id FROM students WHERE id = ?', [id]);
            if (!student.length || student[0].class_id !== crClassId || crClassId != classId) {
                return res.status(403).send('Unauthorized to edit this student or change to this class');
            }
        }
        await db.execute('UPDATE students SET name = ?, class_id = ? WHERE id = ?', [name, classId, id]);
        res.redirect('/students/manage?success=true');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating student');
    }
});

app.get('/students/delete/:id', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { id } = req.params;
    try {
        if (req.session.role === 'مسؤول_الصف') {
            const crClassId = await getCRClassId(req.session.userId);
            const [student] = await db.execute('SELECT class_id FROM students WHERE id = ?', [id]);
            if (!student.length || student[0].class_id !== crClassId) {
                return res.status(403).send('Unauthorized to delete this student');
            }
        }
        await db.execute('DELETE FROM students WHERE id = ?', [id]);
        res.redirect('/students/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting student');
    }
});

app.get('/students/add', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    let classesQuery = 'SELECT * FROM classes';
    let params = [];
    if (req.session.role === 'مسؤول_الصف') {
        const crClassId = await getCRClassId(req.session.userId);
        classesQuery += ' WHERE id = ?';
        params.push(crClassId);
    }
    const [classes] = await db.execute(classesQuery, params);
    res.render('student_add', { classes, role: req.session.role });
});

app.post('/students/add', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { name, classId } = req.body;
    try {
        if (req.session.role === 'مسؤول_الصف') {
            const crClassId = await getCRClassId(req.session.userId);
            if (crClassId != classId) return res.status(403).send('Unauthorized to add to this class');
        }
        
        // 1. Create User account first
        const username = name.split(' ')[0] + Math.floor(Math.random() * 1000); // Temporary unique username
        const password = await bcrypt.hash('1234', 10);
        const [userResult] = await db.execute('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, 'طالب_علم']);
        const userId = userResult.insertId;

        // 2. Insert Student and use the generated ID to create a Roll Number
        const [studentResult] = await db.execute('INSERT INTO students (name, class_id, user_id) VALUES (?, ?, ?)', [name, classId, userId]);
        const studentId = studentResult.insertId;
        const year = new Date().getFullYear().toString().slice(-2);
        const rollNumber = `S-${year}-${1000 + studentId}`;
        
        await db.execute('UPDATE students SET roll_number = ? WHERE id = ?', [rollNumber, studentId]);
        
        // 3. Update username to be the real first name (as per previous logic)
        let finalUsername = name.split(' ')[0];
        const [existing] = await db.execute('SELECT id FROM users WHERE username = ?', [finalUsername]);
        if (existing.length > 0) finalUsername += studentId;
        await db.execute('UPDATE users SET username = ? WHERE id = ?', [finalUsername, userId]);

        res.redirect('/students/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding student');
    }
});

// Teacher Management
app.get('/teachers/manage', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    try {
        const [teachers] = await db.execute('SELECT * FROM teachers');
        res.render('teachers_manage', { teachers, role: req.session.role });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading management page');
    }
});

app.post('/teachers/edit/:id', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { id } = req.params;
    const { name, subject } = req.body;
    try {
        await db.execute('UPDATE teachers SET name = ?, subject = ? WHERE id = ?', [name, subject, id]);
        res.redirect('/teachers/manage?success=true');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating teacher');
    }
});

app.get('/teachers/delete/:id', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM teachers WHERE id = ?', [id]);
        res.redirect('/teachers/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting teacher');
    }
});

app.get('/teachers/add', hasRole(['مدير']), (req, res) => {
    res.render('teacher_add');
});

app.post('/teachers/add', hasRole(['مدير']), async (req, res) => {
    const { name, subject } = req.body;
    try {
        // 1. Create User account first
        const username = name.split(' ')[0] + Math.floor(Math.random() * 1000); // Temporary unique username
        const password = await bcrypt.hash('1234', 10);
        const [userResult] = await db.execute('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, 'أستاذ']);
        const userId = userResult.insertId;

        // 2. Insert Teacher and use the generated ID to create an ID Number
        const [teacherResult] = await db.execute('INSERT INTO teachers (name, subject, user_id) VALUES (?, ?, ?)', [name, subject, userId]);
        const teacherId = teacherResult.insertId;
        const year = new Date().getFullYear();
        const idNumber = `${year}-${1000 + teacherId}`;
        
        await db.execute('UPDATE teachers SET id_number = ? WHERE id = ?', [idNumber, teacherId]);
        
        // 3. Finalize Username
        let finalUsername = name.split(' ')[0];
        const [existing] = await db.execute('SELECT id FROM users WHERE username = ?', [finalUsername]);
        if (existing.length > 0) finalUsername += userResult.insertId;
        await db.execute('UPDATE users SET username = ? WHERE id = ?', [finalUsername, userId]);

        res.redirect('/teachers/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding teacher');
    }
});

// Reports
app.get('/reports', hasRole(['ناظم', 'مدير']), async (req, res) => {
    try {
        // Simple report: overall attendance percentage per student for the last 30 days
        const [rows] = await db.execute(`
            SELECT s.name, c.name_ar as class_name,
            COUNT(a.id) as total_days,
            SUM(CASE WHEN a.status = 'present' OR a.status = 'online' THEN 1 ELSE 0 END) as present_days,
            IFNULL(ROUND(SUM(CASE WHEN a.status = 'present' OR a.status = 'online' THEN 1 ELSE 0 END) * 100 / NULLIF(COUNT(a.id), 0), 2), 0) as percentage
            FROM students s
            JOIN classes c ON s.class_id = c.id
            LEFT JOIN attendance_students a ON s.id = a.student_id
            GROUP BY s.id, c.id, s.name, c.name_ar
        `);

        const groupedReport = {};
        rows.forEach(row => {
            if (!groupedReport[row.class_name]) groupedReport[row.class_name] = [];
            row.percentage = row.total_days > 0 ? Math.round((row.present_days / row.total_days) * 100) : 0;
            groupedReport[row.class_name].push(row);
        });

        // Get Teacher Book Progress for active session
        const [teacherProgress] = await db.execute(`
            SELECT t.name as teacher_name, b.title as book_title, tb.start_page, tb.end_page, tb.current_page
            FROM teacher_books tb
            JOIN teachers t ON tb.teacher_id = t.id
            JOIN books b ON tb.book_id = b.id
            JOIN sessions s ON tb.session_id = s.id
            WHERE s.is_active = TRUE
        `);

        teacherProgress.forEach(tp => {
            const total = tp.end_page - tp.start_page;
            const completed = tp.current_page - tp.start_page;
            tp.percentage = total > 0 ? Math.min(100, Math.max(0, Math.round((completed / total) * 100))) : 0;
        });

        const [teachers] = await db.execute(`
            SELECT t.*, 
            (SELECT COUNT(*) FROM periods WHERE teacher_id = t.id) as period_count,
            (SELECT COUNT(*) FROM teacher_books WHERE teacher_id = t.id AND session_id = (SELECT id FROM sessions WHERE is_active = TRUE)) as book_count
            FROM teachers t
        `);
        res.render('reports', { groupedReport, teachers, teacherProgress });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error generating reports');
    }
});

// Books Management
app.get('/books/manage', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    try {
        const [books] = await db.execute('SELECT * FROM books ORDER BY title');
        res.render('books_manage', { books });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading books');
    }
});

app.post('/books/add', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { title } = req.body;
    try {
        await db.execute('INSERT INTO books (title) VALUES (?)', [title]);
        res.redirect('/books/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding book');
    }
});

app.post('/books/edit/:id', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        await db.execute('UPDATE books SET title = ? WHERE id = ?', [title, id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/books/delete/:id', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM books WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Teacher-Book Assignments
app.get('/teacher-books/manage', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    try {
        const [assignments] = await db.execute(`
            SELECT tb.*, t.name as teacher_name, b.title as book_title, s.name as session_name, c.name_ar as class_name
            FROM teacher_books tb
            JOIN teachers t ON tb.teacher_id = t.id
            JOIN books b ON tb.book_id = b.id
            JOIN sessions s ON tb.session_id = s.id
            LEFT JOIN classes c ON tb.class_id = c.id
            ORDER BY s.name DESC, t.name
        `);
        const [teachers] = await db.execute('SELECT id, name FROM teachers');
        const [books] = await db.execute('SELECT id, title FROM books');
        const [sessions] = await db.execute('SELECT id, name, is_active FROM sessions ORDER BY name DESC');
        const [classes] = await db.execute('SELECT id, name_ar as name FROM classes');
        res.render('teacher_books_manage', { assignments, teachers, books, sessions, classes });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading assignments');
    }
});

app.post('/teacher-books/assign', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { teacherId, bookId, sessionId, startPage, endPage, classId } = req.body;
    try {
        await db.execute(
            `INSERT INTO teacher_books (teacher_id, book_id, session_id, start_page, end_page, current_page, class_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [teacherId, bookId, sessionId, startPage, endPage, startPage, classId]
        );
        res.redirect('/teacher-books/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error assigning book');
    }
});

app.post('/teacher-books/edit/:id', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { id } = req.params;
    const { startPage, endPage, sessionId, classId } = req.body;
    try {
        await db.execute(
            'UPDATE teacher_books SET start_page = ?, end_page = ?, session_id = ?, class_id = ? WHERE id = ?',
            [startPage, endPage, sessionId, classId, id]
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/teacher-books/delete/:id', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM teacher_books WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/book/update-progress', hasRole(['أستاذ', 'ناظم', 'مدير']), async (req, res) => {
    const { assignmentId, pageNumber } = req.body;
    const date = DateTime.now().toISODate();
    
    if (!assignmentId || !pageNumber) {
        return res.status(400).json({ success: false, error: 'بيانات غير مكتملة' });
    }

    try {
        // 0. Fetch assignment limits to validate
        const [assignment] = await db.execute('SELECT start_page, end_page FROM teacher_books WHERE id = ?', [assignmentId]);
        if (!assignment.length) {
            return res.json({ success: false, error: 'سجل التوزيع غير موجود' });
        }
        
        const { start_page, end_page } = assignment[0];
        const numPage = parseInt(pageNumber);
        
        if (numPage < start_page || numPage > end_page) {
            return res.json({ success: false, error: `رقم الصفحة يجب أن يكون بين ${start_page} و ${end_page}` });
        }

        // 1. Log the progress in history
        await db.execute(
            `INSERT INTO book_progress (assignment_id, date, page_number, marked_by) 
             VALUES (?, ?, ?, ?) 
             ON DUPLICATE KEY UPDATE page_number = ?`,
            [assignmentId, date, pageNumber, req.session.userId, pageNumber]
        );
        
        // 2. Update current_page in the assignment record
        const [result] = await db.execute('UPDATE teacher_books SET current_page = ? WHERE id = ?', [pageNumber, assignmentId]);
        
        if (result.affectedRows === 0) {
            return res.json({ success: false, error: 'لم يتم العثور على سجل التوزيع' });
        }

        res.json({ success: true });
    } catch (err) {
        console.error('Error updating book progress:', err);
        res.status(500).json({ success: false, error: 'حدث خطأ في السيرفر أثناء التحديث' });
    }
});

// Teacher Progress Report (Graph)
app.get('/reports/teacher/:teacherId', hasRole(['ناظم', 'مدير', 'أستاذ']), async (req, res) => {
    const { teacherId } = req.params;
    try {
        const [teacher] = await db.execute('SELECT * FROM teachers WHERE id = ?', [teacherId]);
        const [progress] = await db.execute(
            `SELECT bp.*, b.title as book_title, tb.start_page, tb.end_page 
             FROM book_progress bp 
             JOIN teacher_books tb ON bp.assignment_id = tb.id
             JOIN books b ON tb.book_id = b.id 
             WHERE tb.teacher_id = ? 
             ORDER BY bp.date ASC`,
            [teacherId]
        );
        res.render('report_teacher_progress', { teacher: teacher[0], progress });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading teacher report');
    }
});

// Emergency Import Route (Full Sync)
app.get('/admin/import-data', hasRole(['مدير']), async (req, res) => {
    try {
        console.log('Starting Complete Live Sync...');
        
        // 1. Get active session
        const [sessions] = await db.execute('SELECT id FROM sessions WHERE is_active = TRUE LIMIT 1');
        if (sessions.length === 0) return res.status(400).send('No active session found!');
        const sessionId = sessions[0].id;

        // 2. Clear existing mappings
        await db.execute('DELETE FROM periods');

        // 3. Ensure Zubair Teacher exists
        const [zCheck] = await db.execute('SELECT id FROM teachers WHERE name LIKE ?', ['%زبیر%']);
        let zubairId;
        if (zCheck.length === 0) {
            const [resZ] = await db.execute('INSERT INTO teachers (name, subject) VALUES (?, ?)', ['زبیر صاحب', 'هداية النحو']);
            zubairId = resZ.insertId;
        } else { zubairId = zCheck[0].id; }

        // 4. Map Teacher names to IDs (Using Flexible Search)
        const getT = async (name) => {
            const [rows] = await db.execute('SELECT id FROM teachers WHERE name LIKE ?', [`%${name}%`]);
            return rows.length > 0 ? rows[0].id : null;
        };

        const t = {
            musharraf: await getT('مشرف'), habib: await getT('حبيب'), kamaal: await getT('کمال') || await getT('كمال'),
            hasan: await getT('حسن'), usman: await getT('عبد القادر'), fahad: await getT('فہد'),
            hamza: await getT('حمزه'), q_ejaz: await getT('قمر اعجاز'), baron: await getT('بارون'),
            q_ali: await getT('قمر علی شاہ'), zubair: zubairId
        };

        // 5. Get Classes
        const getC = async (name) => {
            const [rows] = await db.execute('SELECT id FROM classes WHERE name_ar = ?', [name]);
            return rows.length > 0 ? rows[0].id : null;
        };

        const c = {
            oola: await getC('الأولى'), sania: await getC('الثانية'), khamisa: await getC('الخامسة'),
            sadisa: await getC('السادسة'), daura: await getC('دورة حديث')
        };

        const times = {
            1: { s: '18:00', e: '18:40' }, 2: { s: '18:40', e: '19:20' },
            3: { s: '19:40', e: '20:20' }, 4: { s: '20:20', e: '21:00' },
            5: { s: '21:00', e: '21:40' }
        };

        // 6. Data Matrix (From your images)
        const data = [
            { cid: c.oola, d: 'Monday', p: 1, tid: t.hamza, s: 'اللغة العربية وحفظ الأحاديث والمحادثة العربية' },
            { cid: c.oola, d: 'Monday', p: 2, tid: t.musharraf, s: 'اللغة الفارسية' },
            { cid: c.oola, d: 'Monday', p: 3, tid: t.habib, s: 'التجويد والسيرة وحفظ القرآن والأدعية' },
            { cid: c.oola, d: 'Monday', p: 4, tid: t.kamaal, s: 'گردانوں کا اجرا' },
            { cid: c.oola, d: 'Tuesday', p: 1, tid: t.musharraf, s: 'اللغة الفارسية' },
            { cid: c.oola, d: 'Tuesday', p: 2, tid: t.hasan, s: 'الصرف وتمرين الصرف' },
            { cid: c.oola, d: 'Tuesday', p: 3, tid: t.habib, s: 'التجويد والسيرة وحفظ القرآن والأدعية' },
            { cid: c.oola, d: 'Tuesday', p: 4, tid: t.kamaal, s: 'گردانوں کا اجرا' },
            { cid: c.oola, d: 'Wednesday', p: 1, tid: t.hamza, s: 'اللغة العربية وحفظ الأحاديث والمحادثة العربية' },
            { cid: c.oola, d: 'Wednesday', p: 2, tid: t.hasan, s: 'الصرف وتمرين الصرف' },
            { cid: c.oola, d: 'Wednesday', p: 3, tid: t.hasan, s: 'الصرف وتمرين الصرف' },
            { cid: c.oola, d: 'Wednesday', p: 4, tid: t.musharraf, s: 'اللغة الفارسية' },
            { cid: c.oola, d: 'Thursday', p: 1, tid: t.hamza, s: 'اللغة العربية وحفظ الأحاديث والمحادثة العربية' },
            { cid: c.oola, d: 'Thursday', p: 2, tid: t.kamaal, s: 'گردانوں کا اجرا' },
            { cid: c.oola, d: 'Thursday', p: 3, tid: t.hasan, s: 'الصرف وتمرين الصرف' },
            { cid: c.oola, d: 'Thursday', p: 4, tid: t.usman, s: 'النحو وتمرين النحو' },
            { cid: c.oola, d: 'Friday', p: 1, tid: t.habib, s: 'التجويد والسيرة وحفظ القرآن والأدعية' },
            { cid: c.oola, d: 'Friday', p: 2, tid: t.habib, s: 'التجويد والسيرة وحفظ القرآن والأدعية' },
            { cid: c.oola, d: 'Friday', p: 3, tid: t.usman, s: 'النحو وتمرين النحو' },
            { cid: c.oola, d: 'Friday', p: 4, tid: t.usman, s: 'النحو وتمرين النحو' },

            { cid: c.sania, d: 'Monday', p: 1, tid: t.kamaal, s: 'تفسير عم' },
            { cid: c.sania, d: 'Monday', p: 2, tid: t.kamaal, s: 'الأدب والحديث' },
            { cid: c.sania, d: 'Monday', p: 3, tid: t.zubair, s: 'هداية النحو' },
            { cid: c.sania, d: 'Monday', p: 4, tid: t.usman, s: 'القدوري الأول' },
            { cid: c.sania, d: 'Tuesday', p: 1, tid: t.kamaal, s: 'تفسير عم' },
            { cid: c.sania, d: 'Tuesday', p: 2, tid: t.fahad, s: 'المنطق' },
            { cid: c.sania, d: 'Tuesday', p: 3, tid: t.usman, s: 'القدوري الأول' },
            { cid: c.sania, d: 'Tuesday', p: 4, tid: t.usman, s: 'القدوري الأول' },
            { cid: c.sania, d: 'Wednesday', p: 1, tid: t.kamaal, s: 'تفسير عم' },
            { cid: c.sania, d: 'Wednesday', p: 2, tid: t.zubair, s: 'هداية النحو' },
            { cid: c.sania, d: 'Wednesday', p: 3, tid: t.usman, s: 'القدوري الأول' },
            { cid: c.sania, d: 'Wednesday', p: 4, tid: t.baron, s: 'علم الصيغة' },
            { cid: c.sania, d: 'Thursday', p: 1, tid: t.zubair, s: 'هداية النحو' },
            { cid: c.sania, d: 'Thursday', p: 2, tid: t.fahad, s: 'المنطق' },
            { cid: c.sania, d: 'Thursday', p: 3, tid: t.kamaal, s: 'الأدب والحديث' },
            { cid: c.sania, d: 'Thursday', p: 4, tid: t.baron, s: 'علم الصيغة' },
            { cid: c.sania, d: 'Friday', p: 1, tid: t.fahad, s: 'المنطق' },
            { cid: c.sania, d: 'Friday', p: 2, tid: t.kamaal, s: 'الأدب والحديث' },
            { cid: c.sania, d: 'Friday', p: 3, tid: t.baron, s: 'علم الصيغة' },
            { cid: c.sania, d: 'Friday', p: 4, tid: t.baron, s: 'علم الصيغة' },

            { cid: c.khamisa, d: 'Monday', p: 1, tid: t.fahad, s: 'شرح العقيدة الطحاوية' },
            { cid: c.khamisa, d: 'Monday', p: 2, tid: t.hasan, s: 'أصول الفقه' },
            { cid: c.khamisa, d: 'Monday', p: 4, tid: t.hamza, s: 'الهداية (الأول)' },
            { cid: c.khamisa, d: 'Monday', p: 5, tid: t.kamaal, s: 'ديوان المتنبي والمعلقات' },
            { cid: c.khamisa, d: 'Tuesday', p: 1, tid: t.fahad, s: 'شرح العقيدة الطحاوية' },
            { cid: c.khamisa, d: 'Tuesday', p: 2, tid: t.hamza, s: 'الهداية (الأول)' },
            { cid: c.khamisa, d: 'Tuesday', p: 3, tid: t.kamaal, s: 'ديوان المتنبي والمعلقات' },
            { cid: c.khamisa, d: 'Tuesday', p: 4, tid: t.q_ali, s: 'الحديث وحفظ الحديث' },
            { cid: c.khamisa, d: 'Tuesday', p: 5, tid: t.usman, s: 'مختصر المعاني' },
            { cid: c.khamisa, d: 'Wednesday', p: 1, tid: t.hasan, s: 'أصول الفقه' },
            { cid: c.khamisa, d: 'Wednesday', p: 3, tid: t.musharraf, s: 'معين الفلسفة والانتباهات' },
            { cid: c.khamisa, d: 'Wednesday', p: 4, tid: t.kamaal, s: 'التفسير' },
            { cid: c.khamisa, d: 'Wednesday', p: 5, tid: t.kamaal, s: 'التفسير' },
            { cid: c.khamisa, d: 'Thursday', p: 2, tid: t.usman, s: 'مختصر المعاني' },
            { cid: c.khamisa, d: 'Thursday', p: 3, tid: t.musharraf, s: 'معين الفلسفة والانتباهات' },
            { cid: c.khamisa, d: 'Thursday', p: 4, tid: t.hamza, s: 'الهداية (الأول)' },
            { cid: c.khamisa, d: 'Thursday', p: 5, tid: t.hasan, s: 'أصول الفقه' },
            { cid: c.khamisa, d: 'Friday', p: 1, tid: t.hasan, s: 'أصول الفقه' },
            { cid: c.khamisa, d: 'Friday', p: 2, tid: t.usman, s: 'مختصر المعاني' },
            { cid: c.khamisa, d: 'Friday', p: 3, tid: t.kamaal, s: 'التفسير' },
            { cid: c.khamisa, d: 'Friday', p: 4, tid: t.hamza, s: 'الهداية (الأول)' },
            { cid: c.khamisa, d: 'Friday', p: 5, tid: t.hasan, s: 'أصول الفقه' },

            { cid: c.sadisa, d: 'Monday', p: 1, tid: t.habib, s: 'الهداية (الجزء الثاني)' },
            { cid: c.sadisa, d: 'Monday', p: 2, tid: t.q_ejaz, s: 'التوضيح (1)' },
            { cid: c.sadisa, d: 'Monday', p: 3, tid: t.hamza, s: 'كتاب الآثار وخير الأصول' },
            { cid: c.sadisa, d: 'Monday', p: 4, tid: t.habib, s: 'السراجي والفلکیات' },
            { cid: c.sadisa, d: 'Monday', p: 5, tid: t.musharraf, s: 'التوضيح (2)' },
            { cid: c.sadisa, d: 'Tuesday', p: 1, tid: t.habib, s: 'الهداية (الجزء الثاني)' },
            { cid: c.sadisa, d: 'Tuesday', p: 2, tid: t.q_ejaz, s: 'التوضيح (1)' },
            { cid: c.sadisa, d: 'Tuesday', p: 3, tid: t.hasan, s: 'تفسير الجلالين والفوز الكبير' },
            { cid: c.sadisa, d: 'Tuesday', p: 4, tid: t.habib, s: 'السراجي والفلکیات' },
            { cid: c.sadisa, d: 'Tuesday', p: 5, tid: t.hasan, s: 'تفسير الجلالين والفوز الكبير' },
            { cid: c.sadisa, d: 'Wednesday', p: 1, tid: t.usman, s: 'اللغة العربية والعروض' },
            { cid: c.sadisa, d: 'Wednesday', p: 2, tid: t.q_ejaz, s: 'التوضيح (1)' },
            { cid: c.sadisa, d: 'Wednesday', p: 3, tid: t.hamza, s: 'كتاب الآثار وخير الأصول' },
            { cid: c.sadisa, d: 'Wednesday', p: 4, tid: t.hasan, s: 'تفسير الجلالين والفوز الكبير' },
            { cid: c.sadisa, d: 'Wednesday', p: 5, tid: t.musharraf, s: 'التوضيح (2)' },
            { cid: c.sadisa, d: 'Thursday', p: 1, tid: t.fahad, s: 'شرح العقائد' },
            { cid: c.sadisa, d: 'Thursday', p: 2, tid: t.musharraf, s: 'التوضيح (2)' },
            { cid: c.sadisa, d: 'Thursday', p: 3, tid: t.fahad, s: 'شرح العقائد' },
            { cid: c.sadisa, d: 'Thursday', p: 4, tid: t.musharraf, s: 'التوضيح (2)' },
            { cid: c.sadisa, d: 'Thursday', p: 5, tid: t.usman, s: 'اللغة العربية والعروض' },
            { cid: c.sadisa, d: 'Friday', p: 1, tid: t.usman, s: 'اللغة العربية والعروض' },
            { cid: c.sadisa, d: 'Friday', p: 2, tid: t.fahad, s: 'شرح العقائد' },
            { cid: c.sadisa, d: 'Friday', p: 3, tid: t.hamza, s: 'كتاب الآثار وخير الأصول' },
            { cid: c.sadisa, d: 'Friday', p: 4, tid: t.fahad, s: 'شرح العقائد' },
            { cid: c.sadisa, d: 'Friday', p: 5, tid: t.habib, s: 'الهداية (الجزء الثاني)' },

            { cid: c.daura, d: 'Monday', p: 1, tid: t.q_ejaz, s: 'صحيح مسلم وجامع الترمذي' },
            { cid: c.daura, d: 'Monday', p: 2, tid: t.hamza, s: 'الترمذي (1)' },
            { cid: c.daura, d: 'Monday', p: 3, tid: t.usman, s: 'سنن النسائي' },
            { cid: c.daura, d: 'Monday', p: 4, tid: t.fahad, s: 'صحيح البخاري (1)' },
            { cid: c.daura, d: 'Monday', p: 5, tid: t.q_ali, s: 'شمائل الترمذي' },
            { cid: c.daura, d: 'Tuesday', p: 1, tid: t.q_ejaz, s: 'صحيح مسلم وجامع الترمذي' },
            { cid: c.daura, d: 'Tuesday', p: 2, tid: t.usman, s: 'سنن النسائي' },
            { cid: c.daura, d: 'Tuesday', p: 3, tid: t.hamza, s: 'الترمذي (1)' },
            { cid: c.daura, d: 'Tuesday', p: 4, tid: t.fahad, s: 'صحيح البخاري (1)' },
            { cid: c.daura, d: 'Tuesday', p: 5, tid: t.q_ali, s: 'شمائل الترمذي' },
            { cid: c.daura, d: 'Wednesday', p: 1, tid: t.q_ejaz, s: 'صحيح مسلم وجامع الترمذي' },
            { cid: c.daura, d: 'Wednesday', p: 2, tid: t.hamza, s: 'الترمذي (1)' },
            { cid: c.daura, d: 'Wednesday', p: 3, tid: t.habib, s: 'سنن أبي داود (1) وموطأ مالك' },
            { cid: c.daura, d: 'Wednesday', p: 4, tid: t.fahad, s: 'صحيح البخاري (1)' },
            { cid: c.daura, d: 'Wednesday', p: 5, tid: t.usman, s: 'سنن النسائي' },
            { cid: c.daura, d: 'Thursday', p: 1, tid: t.hasan, s: 'الطحاوي' },
            { cid: c.daura, d: 'Thursday', p: 2, tid: t.hasan, s: 'الطحاوي' },
            { cid: c.daura, d: 'Thursday', p: 3, tid: t.habib, s: 'سنن أبي داود (1) وموطأ مالك' },
            { cid: c.daura, d: 'Thursday', p: 4, tid: t.fahad, s: 'صحيح البخاري (1)' },
            { cid: c.daura, d: 'Thursday', p: 5, tid: t.baron, s: 'سنن أبي داود (2) وموطأ محمد' },
            { cid: c.daura, d: 'Friday', p: 1, tid: t.hamza, s: 'الترمذي (1)' },
            { cid: c.daura, d: 'Friday', p: 2, tid: t.hasan, s: 'الطحاوي' },
            { cid: c.daura, d: 'Friday', p: 3, tid: t.habib, s: 'سنن أبي داود (1) وموطأ مالك' },
            { cid: c.daura, d: 'Friday', p: 4, tid: t.habib, s: 'سنن أبي داود (1) وموطأ مالك' },
            { cid: c.daura, d: 'Friday', p: 5, tid: t.baron, s: 'سنن أبي داود (2) وموطأ محمد' },
            { cid: c.daura, d: 'Saturday', p: 1, tid: t.fahad, s: 'صحيح البخاري (1)' },
            { cid: c.daura, d: 'Saturday', p: 2, tid: t.hasan, s: 'الطحاوي' },
            { cid: c.daura, d: 'Saturday', p: 3, tid: t.baron, s: 'سنن أبي داود (2) وموطأ محمد' },
            { cid: c.daura, d: 'Saturday', p: 4, tid: t.baron, s: 'سنن أبي داود (2) وموطأ محمد' },
            { cid: c.daura, d: 'Saturday', p: 5, tid: t.baron, s: 'سنن أبي داود (2) وموطأ محمد' }
        ];

        let count = 0;
        for (const item of data) {
            if (!item.cid || !item.tid) continue;
            
            // Sync Book & Assignment
            let [books] = await db.execute('SELECT id FROM books WHERE title = ?', [item.s]);
            let bookId = books.length > 0 ? books[0].id : (await db.execute('INSERT INTO books (title) VALUES (?)', [item.s]))[0].insertId;

            let [ass] = await db.execute('SELECT id FROM teacher_books WHERE teacher_id = ? AND book_id = ? AND class_id = ? AND session_id = ?', [item.tid, bookId, item.cid, sessionId]);
            let assId = ass.length > 0 ? ass[0].id : (await db.execute('INSERT INTO teacher_books (teacher_id, book_id, class_id, session_id) VALUES (?, ?, ?, ?)', [item.tid, bookId, item.cid, sessionId]))[0].insertId;

            await db.execute(
                'INSERT INTO periods (day_of_week, period_number, teacher_id, class_id, subject, start_time, end_time, assignment_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [item.d, item.p, item.tid, item.cid, item.s, times[item.p].s, times[item.p].e, assId]
            );
            count++;
        }

        res.send(`Successfully synchronized ${count} periods and created all necessary books/assignments. You can now go back to /periods/manage`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Sync failed: ' + err.message);
    }
});

// Period Management (Nazim/Mudeer)
app.get('/periods/manage', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const groupBy = req.query.groupBy || 'day'; // Default to day
    let orderBy = 'FIELD(p.day_of_week, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"), p.start_time';
    
    if (groupBy === 'teacher') {
        orderBy = 't.name, FIELD(p.day_of_week, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"), p.start_time';
    }

    try {
        const [periods] = await db.execute(
            `SELECT p.*, t.name as teacher_name, c.name_ar as class_name, b.title as book_title
             FROM periods p 
             JOIN teachers t ON p.teacher_id = t.id 
             JOIN classes c ON p.class_id = c.id
             LEFT JOIN teacher_books tb ON p.assignment_id = tb.id
             LEFT JOIN books b ON tb.book_id = b.id
             ORDER BY ${orderBy}`
        );
        const [teachers] = await db.execute('SELECT * FROM teachers');
        const [classes] = await db.execute('SELECT * FROM classes');
        const [assignments] = await db.execute(`
            SELECT tb.id, t.name as teacher_name, b.title as book_title, c.name_ar as class_name
            FROM teacher_books tb
            JOIN teachers t ON tb.teacher_id = t.id
            JOIN books b ON tb.book_id = b.id
            JOIN classes c ON tb.class_id = c.id
            JOIN sessions s ON tb.session_id = s.id
            WHERE s.is_active = TRUE
        `);
        res.render('periods_manage', { periods, teachers, classes, assignments, groupBy });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading periods');
    }
});

// User Management (Nazim/Mudeer)
app.get('/users/manage', hasRole(['ناظم', 'مدير']), async (req, res) => {
    try {
        const [users] = await db.execute(`
            SELECT u.id, u.username, 
            COALESCE(t.name, s.name, 'Admin') as full_name, 
            u.role, u.created_at,
            s.roll_number as student_id, t.id_number as teacher_id
            FROM users u
            LEFT JOIN students s ON u.id = s.user_id
            LEFT JOIN teachers t ON u.id = t.user_id
            ORDER BY u.role, u.username
        `);
        res.render('users_manage', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading users');
    }
});

app.post('/users/update', hasRole(['ناظم', 'مدير']), async (req, res) => {
    const { userId, username, fullName, password, role } = req.body;
    try {
        if (password && password.trim() !== '') {
            const hashed = await bcrypt.hash(password, 10);
            await db.execute('UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?', [username, hashed, role, userId]);
        } else {
            await db.execute('UPDATE users SET username = ?, role = ? WHERE id = ?', [username, role, userId]);
        }
        
        // Also update name in linked tables if applicable
        await db.execute('UPDATE teachers SET name = ? WHERE user_id = ?', [fullName, userId]);
        await db.execute('UPDATE students SET name = ? WHERE user_id = ?', [fullName, userId]);

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/users/update-role', hasRole(['ناظم', 'مدير']), async (req, res) => {
    const { userId, newRole } = req.body;
    try {
        await db.execute('UPDATE users SET role = ? WHERE id = ?', [newRole, userId]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

app.post('/users/reset-password', hasRole(['ناظم', 'مدير']), async (req, res) => {
    const { userId } = req.body;
    const defaultPassword = await bcrypt.hash('1234', 10);
    try {
        await db.execute('UPDATE users SET password = ? WHERE id = ?', [defaultPassword, userId]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

app.get('/periods/full', isAuthenticated, async (req, res) => {
    try {
        const [periods] = await db.execute(
            `SELECT p.*, t.name as teacher_name, c.name_ar as class_name, b.title as book_title
             FROM periods p 
             JOIN teachers t ON p.teacher_id = t.id 
             JOIN classes c ON p.class_id = c.id
             LEFT JOIN teacher_books tb ON p.assignment_id = tb.id
             LEFT JOIN books b ON tb.book_id = b.id
             WHERE p.day_of_week NOT IN ('Sunday')`
        );
        const [classes] = await db.execute('SELECT * FROM classes');
        res.render('timetable_full', { periods, classes });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading full timetable');
    }
});

app.post('/periods/add', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { teacherId, classId, dayOfWeek, startTime, endTime, subject, assignmentId, periodNumber } = req.body;
    try {
        await db.execute(
            'INSERT INTO periods (teacher_id, class_id, day_of_week, start_time, end_time, subject, assignment_id, period_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [teacherId, classId, dayOfWeek, startTime, endTime, subject || null, assignmentId || null, periodNumber || null]
        );
        res.redirect('/periods/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding period');
    }
});

app.post('/periods/edit/:id', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    const { assignmentId, periodNumber, startTime, endTime } = req.body;
    try {
        // Fetch teacher_id and class_id from the assignment
        const [assignment] = await db.execute('SELECT teacher_id, class_id FROM teacher_books WHERE id = ?', [assignmentId]);
        if (assignment.length > 0) {
            await db.execute(
                'UPDATE periods SET assignment_id = ?, period_number = ?, start_time = ?, end_time = ?, teacher_id = ?, class_id = ? WHERE id = ?',
                [assignmentId, periodNumber, startTime, endTime, assignment[0].teacher_id, assignment[0].class_id, req.params.id]
            );
        }
        res.redirect('/periods/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating period');
    }
});

app.post('/periods/delete/:id', hasRole(['ناظم', 'مدير', 'مسؤول_الصف']), async (req, res) => {
    try {
        await db.execute('DELETE FROM periods WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { DateTime } = require('luxon');

exports.showTeacherDashboard = async (req, res) => {
    try {
        const [teacher] = await db.execute('SELECT * FROM teachers WHERE user_id = ?', [req.session.userId]);
        if (!teacher[0]) return res.status(404).send('Teacher record not found');

        const teacherId = teacher[0].id;
        const selectedDate = (req.query.date || DateTime.now().toISODate()).trim();
        let dt = DateTime.fromISO(selectedDate);
        if (!dt.isValid) {
            dt = DateTime.now();
        }
        const dayName = dt.setLocale('en').toFormat('cccc');

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
            todayDate: selectedDate,
            today: dt.setLocale('ar').toFormat('cccc, dd MMMM yyyy')
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading teacher dashboard');
    }
};

exports.showTeachersManage = async (req, res) => {
    try {
        const [teachers] = await db.execute('SELECT * FROM teachers');
        res.render('teachers_manage', { teachers, role: req.session.role });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading management page');
    }
};

exports.showTeachersAdd = (req, res) => {
    res.render('teacher_add');
};

exports.addTeacher = async (req, res) => {
    const { name, subject } = req.body;
    try {
        const username = name.split(' ')[0] + Math.floor(Math.random() * 1000);
        const password = await bcrypt.hash('1234', 10);
        const [userResult] = await db.execute('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, 'أستاذ']);
        const userId = userResult.insertId;

        const [teacherResult] = await db.execute('INSERT INTO teachers (name, subject, user_id) VALUES (?, ?, ?)', [name, subject, userId]);
        const teacherId = teacherResult.insertId;
        const year = new Date().getFullYear();
        const idNumber = `${year}-${1000 + teacherId}`;

        await db.execute('UPDATE teachers SET id_number = ? WHERE id = ?', [idNumber, teacherId]);

        let finalUsername = name.split(' ')[0];
        const [existing] = await db.execute('SELECT id FROM users WHERE username = ?', [finalUsername]);
        if (existing.length > 0) finalUsername += userResult.insertId;
        await db.execute('UPDATE users SET username = ? WHERE id = ?', [finalUsername, userId]);

        res.redirect('/teachers/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding teacher');
    }
};

exports.editTeacher = async (req, res) => {
    const { id } = req.params;
    const { name, subject } = req.body;
    try {
        await db.execute('UPDATE teachers SET name = ?, subject = ? WHERE id = ?', [name, subject, id]);
        res.redirect('/teachers/manage?success=true');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating teacher');
    }
};

exports.deleteTeacher = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM teachers WHERE id = ?', [id]);
        res.redirect('/teachers/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting teacher');
    }
};

exports.showWeeklyAttendance = async (req, res) => {
    const selectedDate = (req.query.date || DateTime.now().toISODate()).trim();
    let dt = DateTime.fromISO(selectedDate);
    if (!dt.isValid) {
        dt = DateTime.now();
    }
    
    let offset = dt.weekday - 6; 
    if (offset < 0) offset += 7; 
    const startOfWeek = dt.minus({ days: offset });

    const days = [];
    for (let i = 0; i < 6; i++) {
        days.push(startOfWeek.plus({ days: i }));
    }

    try {
        const [teachers] = await db.execute('SELECT id, name, subject FROM teachers ORDER BY name');
        
        const dayStrings = days.map(d => d.toISODate());
        const placeholders = dayStrings.map(() => '?').join(',');
        
        const [attendanceRows] = await db.execute(
            `SELECT * FROM attendance_teachers WHERE date IN (${placeholders})`,
            dayStrings
        );

        const attendanceMap = {};
        teachers.forEach(t => {
            attendanceMap[t.id] = {};
            dayStrings.forEach(d => {
                attendanceMap[t.id][d] = { status: '', period: '' };
            });
        });

        attendanceRows.forEach(row => {
            const dateStr = DateTime.fromJSDate(row.date).toISODate();
            if (attendanceMap[row.teacher_id]) {
                attendanceMap[row.teacher_id][dateStr] = {
                    status: row.status,
                    period: row.period_number
                };
            }
        });

        res.render('attendance_teachers', {
            teachers,
            days,
            attendanceMap,
            date: selectedDate
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading teacher attendance');
    }
};

exports.saveWeeklyAttendance = async (req, res) => {
    const { date, teacherId, status, period } = req.body;
    try {
        await db.execute(
            `INSERT INTO attendance_teachers (teacher_id, date, status, period_number, marked_by) 
             VALUES (?, ?, ?, ?, ?) 
             ON DUPLICATE KEY UPDATE status = ?, period_number = ?`,
            [teacherId, date, status, period || null, req.session.userId, status, period || null]
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
};

exports.showAssignmentsManage = async (req, res) => {
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
};

exports.assignBook = async (req, res) => {
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
};

exports.editAssignment = async (req, res) => {
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
};

exports.deleteAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM teacher_books WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.updateBookProgress = async (req, res) => {
    const { assignmentId, pageNumber } = req.body;
    const date = DateTime.now().toISODate();

    if (!assignmentId || !pageNumber) {
        return res.status(400).json({ success: false, error: 'بيانات غير مكتملة' });
    }

    try {
        const [assignment] = await db.execute('SELECT start_page, end_page, current_page FROM teacher_books WHERE id = ?', [assignmentId]);
        if (!assignment.length) {
            return res.json({ success: false, error: 'سجل التوزيع غير موجود' });
        }

        const { start_page, end_page, current_page } = assignment[0];
        const numPage = parseInt(pageNumber);

        if (numPage < current_page) {
            return res.json({ success: false, error: `لا يمكن تعيين صفحة أقل من الصفحة الحالية (${current_page})` });
        }

        if (numPage < start_page || numPage > end_page) {
            return res.json({ success: false, error: `رقم الصفحة يجب أن يكون بين ${start_page} و ${end_page}` });
        }

        await db.execute(
            `INSERT INTO book_progress (assignment_id, date, page_number, marked_by) 
             VALUES (?, ?, ?, ?) 
             ON DUPLICATE KEY UPDATE page_number = ?`,
            [assignmentId, date, pageNumber, req.session.userId, pageNumber]
        );

        const [result] = await db.execute('UPDATE teacher_books SET current_page = ? WHERE id = ?', [pageNumber, assignmentId]);

        if (result.affectedRows === 0) {
            return res.json({ success: false, error: 'لم يتم العثور على سجل التوزيع' });
        }

        res.json({ success: true });
    } catch (err) {
        console.error('Error updating book progress:', err);
        res.status(500).json({ success: false, error: 'حدث خطأ في السيرفر أثناء التحديث' });
    }
};

const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { DateTime } = require('luxon');
const { getCRClassId } = require('../middleware/auth');

exports.showStudentDashboard = async (req, res) => {
    try {
        const [student] = await db.execute('SELECT * FROM students WHERE user_id = ?', [req.session.userId]);
        if (!student[0]) return res.status(404).send('Student record not found');

        const classId = student[0].class_id;
        const dayName = DateTime.now().setLocale('en').toFormat('cccc');

        const [periods] = await db.execute(
            `SELECT p.*, t.name as teacher_name 
             FROM periods p 
             JOIN teachers t ON p.teacher_id = t.id 
             WHERE p.class_id = ? AND p.day_of_week = ?
             ORDER BY p.period_number`,
            [classId, dayName]
        );

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
};

exports.showCRDashboard = async (req, res) => {
    try {
        const [student] = await db.execute('SELECT * FROM students WHERE user_id = ?', [req.session.userId]);
        if (!student[0]) return res.status(404).send('Record not found');

        const classId = student[0].class_id;
        const selectedDate = (req.query.date || DateTime.now().toISODate()).trim();
        let dt = DateTime.fromISO(selectedDate);
        if (!dt.isValid) {
            dt = DateTime.now();
        }
        const dayName = dt.setLocale('en').toFormat('cccc');

        const [students] = await db.execute(
            `SELECT s.*, a.status 
             FROM students s 
             LEFT JOIN attendance_students a ON s.id = a.student_id AND a.date = ? 
             WHERE s.class_id = ?`,
            [selectedDate, classId]
        );

        const [classInfo] = await db.execute('SELECT * FROM classes WHERE id = ?', [classId]);

        const [todayPeriods] = await db.execute(`
            SELECT p.*, t.name as teacher_name, b.title as book_title, tb.id as assignment_id, tb.start_page, tb.end_page, tb.current_page,
            (SELECT bp.updated_at FROM book_progress bp WHERE bp.assignment_id = tb.id ORDER BY bp.id DESC LIMIT 1) as last_updated_at
            FROM periods p
            JOIN teachers t ON p.teacher_id = t.id
            JOIN classes c ON p.class_id = c.id
            LEFT JOIN teacher_books tb ON p.assignment_id = tb.id
            LEFT JOIN books b ON tb.book_id = b.id
            WHERE p.class_id = ? AND p.day_of_week = ?
            ORDER BY p.period_number
        `, [classId, dayName]);

        for (const p of todayPeriods) {
            if (p.assignment_id) {
                // Fetch the previous page number before selectedDate
                const [prevProgress] = await db.execute(
                    'SELECT page_number FROM book_progress WHERE assignment_id = ? AND date < ? ORDER BY date DESC, id DESC LIMIT 1',
                    [p.assignment_id, selectedDate]
                );
                p.previous_page = prevProgress.length > 0 ? prevProgress[0].page_number : p.start_page;

                // Fetch recent progress history for graph
                const [progHistory] = await db.execute(
                    'SELECT date, page_number FROM book_progress WHERE assignment_id = ? ORDER BY date ASC LIMIT 15',
                    [p.assignment_id]
                );
                p.progress_history = progHistory.map(ph => ({
                    date: ph.date instanceof Date ? ph.date.toISOString().split('T')[0] : String(ph.date).split('T')[0],
                    page_number: ph.page_number
                }));
                
                // Get the last progress date
                const [lastProgress] = await db.execute(
                    'SELECT date FROM book_progress WHERE assignment_id = ? ORDER BY date DESC, id DESC LIMIT 1',
                    [p.assignment_id]
                );
                if (lastProgress.length > 0) {
                    p.last_progress_date = DateTime.fromJSDate(new Date(lastProgress[0].date)).setLocale('ar').toFormat('dd MMMM yyyy');
                } else {
                    p.last_progress_date = 'لا يوجد سجل سابق';
                }
            } else {
                p.previous_page = p.start_page || 1;
                p.progress_history = [];
                p.last_progress_date = 'لا يوجد سجل سابق';
            }

            if (p.last_updated_at) {
                p.lastUpdatedStr = DateTime.fromJSDate(new Date(p.last_updated_at)).setLocale('ar').toFormat('dd MMMM, hh:mm a');
            } else {
                p.lastUpdatedStr = null;
            }
        }

        const [teacherAttendance] = await db.execute(
            'SELECT * FROM attendance_teachers WHERE date = ?',
            [selectedDate]
        );

        res.render('dashboard_cr', {
            students,
            classInfo: classInfo[0],
            todayPeriods,
            teacherAttendance,
            date: selectedDate,
            todayDate: selectedDate,
            dayName,
            classId
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading dashboard');
    }
};

exports.showStudentsManage = async (req, res) => {
    try {
        let studentsQuery = 'SELECT s.*, c.name_ar as class_name FROM students s JOIN classes c ON s.class_id = c.id';
        let queryParams = [];
        let crClassId = null;

        if (req.session.role === 'عريب' || req.session.role === 'عریب') {
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
};

exports.showStudentsAdd = async (req, res) => {
    let classesQuery = 'SELECT * FROM classes';
    let params = [];
    if (req.session.role === 'عريب' || req.session.role === 'عریب') {
        const crClassId = await getCRClassId(req.session.userId);
        classesQuery += ' WHERE id = ?';
        params.push(crClassId);
    }
    const [classes] = await db.execute(classesQuery, params);
    res.render('student_add', { classes, role: req.session.role });
};

exports.addStudent = async (req, res) => {
    const { name, classId } = req.body;
    try {
        if (req.session.role === 'عريب' || req.session.role === 'عریب') {
            const crClassId = await getCRClassId(req.session.userId);
            if (crClassId != classId) return res.status(403).send('Unauthorized to add to this class');
        }

        const username = name.split(' ')[0] + Math.floor(Math.random() * 1000);
        const password = await bcrypt.hash('1234', 10);
        const [userResult] = await db.execute('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, 'طالب']);
        const userId = userResult.insertId;

        const [studentResult] = await db.execute('INSERT INTO students (name, class_id, user_id) VALUES (?, ?, ?)', [name, classId, userId]);
        const studentId = studentResult.insertId;
        const year = new Date().getFullYear().toString().slice(-2);
        const rollNumber = `S-${year}-${1000 + studentId}`;

        await db.execute('UPDATE students SET roll_number = ? WHERE id = ?', [rollNumber, studentId]);

        const [activeSessions] = await db.execute('SELECT id FROM sessions WHERE is_active = TRUE LIMIT 1');
        if (activeSessions.length > 0) {
            await db.execute(
                'INSERT INTO student_enrollments (student_id, class_id, session_id) VALUES (?, ?, ?)',
                [studentId, classId, activeSessions[0].id]
            );
        }

        let finalUsername = name.split(' ')[0];
        const [existing] = await db.execute('SELECT id FROM users WHERE username = ?', [finalUsername]);
        if (existing.length > 0) finalUsername += studentId;
        await db.execute('UPDATE users SET username = ? WHERE id = ?', [finalUsername, userId]);

        res.redirect('/students/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding student');
    }
};

exports.editStudent = async (req, res) => {
    const { id } = req.params;
    const { name, classId } = req.body;
    try {
        if (req.session.role === 'عريب' || req.session.role === 'عریب') {
            const crClassId = await getCRClassId(req.session.userId);
            const [student] = await db.execute('SELECT class_id FROM students WHERE id = ?', [id]);
            if (!student.length || student[0].class_id !== crClassId || crClassId != classId) {
                return res.status(403).send('Unauthorized to edit this student or change to this class');
            }
        }
        await db.execute('UPDATE students SET name = ?, class_id = ? WHERE id = ?', [name, classId, id]);
        
        const [activeSessions] = await db.execute('SELECT id FROM sessions WHERE is_active = TRUE LIMIT 1');
        if (activeSessions.length > 0) {
            await db.execute(`
                INSERT INTO student_enrollments (student_id, class_id, session_id) 
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE class_id = VALUES(class_id)
            `, [id, classId, activeSessions[0].id]);
        }
        res.redirect('/students/manage?success=true');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating student');
    }
};

exports.deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        if (req.session.role === 'عريب' || req.session.role === 'عریب') {
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
};

exports.showAttendance = async (req, res) => {
    const { classId } = req.params;
    if (req.session.role === 'عريب' || req.session.role === 'عریب') {
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
};

exports.saveAttendance = async (req, res) => {
    const { date, attendance, classId } = req.body;
    if (req.session.role === 'عريب' || req.session.role === 'عریب') {
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
};

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
    
    // Get Saturday of the week containing selectedDate
    let offset = dt.weekday - 6; 
    if (offset < 0) offset += 7; // Adjust for Sunday (7) -> offset is 1
    const startOfWeek = dt.minus({ days: offset });

    // Construct 6 schooling days (Saturday to Thursday)
    const days = [];
    for (let i = 0; i < 6; i++) {
        const d = startOfWeek.plus({ days: i });
        days.push({
            dateStr: d.toISODate(),
            dayNameEn: d.setLocale('en').toFormat('cccc'),
            dayNameAr: d.setLocale('ar').toFormat('cccc'),
            formattedDate: d.setLocale('ar').toFormat('dd MMM')
        });
    }

    const prevWeekDate = startOfWeek.minus({ days: 7 }).toISODate();
    const nextWeekDate = startOfWeek.plus({ days: 7 }).toISODate();

    try {
        // Fetch all teachers sorted by name
        const [teachers] = await db.execute('SELECT * FROM teachers WHERE id IN (SELECT DISTINCT teacher_id FROM periods) ORDER BY name');

        // Fetch all periods count per teacher & day_of_week
        const [periodsCount] = await db.execute(`
            SELECT teacher_id, day_of_week, COUNT(*) as count 
            FROM periods 
            GROUP BY teacher_id, day_of_week
        `);

        // Fetch all marked attendance for the dates of the week (sum across all classes for each teacher/day)
        const [attendanceList] = await db.execute(`
            SELECT teacher_id, DATE_FORMAT(date, '%Y-%m-%d') as date_str, SUM(classes_taken) as classes_taken
            FROM attendance_teachers
            WHERE date BETWEEN ? AND ?
            GROUP BY teacher_id, date
        `, [days[0].dateStr, days[5].dateStr]);

        // Map it all together
        const reportData = teachers.map(teacher => {
            const teacherDays = days.map(day => {
                const sched = periodsCount.find(p => p.teacher_id === teacher.id && p.day_of_week.toLowerCase() === day.dayNameEn.toLowerCase());
                const att = attendanceList.find(a => a.teacher_id === teacher.id && a.date_str === day.dateStr);

                const scheduledCount = sched ? sched.count : 0;
                const takenCount = att ? att.classes_taken : null;

                return {
                    dateStr: day.dateStr,
                    dayNameAr: day.dayNameAr,
                    formattedDate: day.formattedDate,
                    scheduled: scheduledCount,
                    taken: takenCount
                };
            });

            return {
                id: teacher.id,
                name: teacher.name,
                days: teacherDays
            };
        });

        res.render('attendance_teachers', {
            reportData,
            days,
            selectedDate,
            startOfWeek: startOfWeek.setLocale('ar').toFormat('dd MMMM yyyy'),
            prevWeekDate,
            nextWeekDate,
            role: req.session.role
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading teacher weekly report');
    }
};

exports.saveWeeklyAttendance = async (req, res) => {
    const { date, teacherId, status, period, attendance } = req.body;
    try {
        if (req.body.deleteRecord) {
            // Delete a teacher's attendance record (back to "درج نہیں")
            const classId = req.body.classId || null;
            await db.execute(
                'DELETE FROM attendance_teachers WHERE teacher_id = ? AND class_id = ? AND date = ?',
                [req.body.teacherId, classId, date]
            );
            return res.json({ success: true });
        }

        if (attendance) {
            // Case 1: Toggling/saving teacher attendance from CR Dashboard
            const classId = req.body.classId || null;
            for (const [tId, checkedCount] of Object.entries(attendance)) {
                const classesTaken = parseInt(checkedCount) || 0;
                const teacherStatus = classesTaken > 0 ? 'present' : 'absent';

                await db.execute(
                    `INSERT INTO attendance_teachers (teacher_id, class_id, date, classes_taken, status, marked_by)
                     VALUES (?, ?, ?, ?, ?, ?)
                     ON DUPLICATE KEY UPDATE classes_taken = ?, status = ?, marked_by = ?`,
                    [tId, classId, date, classesTaken, teacherStatus, req.session.userId, classesTaken, teacherStatus, req.session.userId]
                );
            }
            return res.json({ success: true });
        }
        
        // Case 2: Saving from older legacy forms (if any)
        const classesTaken = (status === 'present') ? 1 : 0;
        await db.execute(
            `INSERT INTO attendance_teachers (teacher_id, date, classes_taken, status, marked_by) 
             VALUES (?, ?, ?, ?, ?) 
             ON DUPLICATE KEY UPDATE classes_taken = ?, status = ?, marked_by = ?`,
            [teacherId, date, classesTaken, status || 'present', req.session.userId, classesTaken, status || 'present', req.session.userId]
        );
        res.json({ success: true });
    } catch (err) {
        console.error('Error saving teacher attendance:', err);
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
        const [teachers] = await db.execute('SELECT id, name FROM teachers ORDER BY name');
        const [books] = await db.execute('SELECT id, title FROM books ORDER BY title');
        const [sessions] = await db.execute('SELECT id, name, is_active FROM sessions ORDER BY name DESC');
        const [classes] = await db.execute('SELECT id, name_ar as name FROM classes ORDER BY name_ar ASC');
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
    const { teacherId, bookId, startPage, endPage, sessionId, classId } = req.body;
    try {
        await db.execute(
            'UPDATE teacher_books SET teacher_id = ?, book_id = ?, start_page = ?, end_page = ?, session_id = ?, class_id = ? WHERE id = ?',
            [teacherId, bookId, startPage, endPage, sessionId, classId, id]
        );

        // Instantly synchronize the static subject column for any timetable periods linked to this assignment
        const [bookRows] = await db.execute('SELECT title FROM books WHERE id = ?', [bookId]);
        if (bookRows.length > 0) {
            await db.execute('UPDATE periods SET subject = ? WHERE assignment_id = ?', [bookRows[0].title, id]);
        }

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.checkAssignmentPeriods = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT COUNT(*) as count FROM periods WHERE assignment_id = ?', [id]);
        res.json({ success: true, count: rows[0].count });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.deleteAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        // Explicitly clean up any periods associated with this assignment
        await db.execute('DELETE FROM periods WHERE assignment_id = ?', [id]);
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

        if (numPage < start_page || numPage > end_page) {
            return res.json({ success: false, error: `رقم الصفحة يجب أن يكون بين ${start_page} و ${end_page}` });
        }

        // If correcting a mistake backwards, delete any progress records higher than the new page
        await db.execute(
            'DELETE FROM book_progress WHERE assignment_id = ? AND page_number > ?',
            [assignmentId, numPage]
        );

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
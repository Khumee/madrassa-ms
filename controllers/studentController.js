const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { DateTime } = require('luxon');
const { getCRClassId } = require('../middleware/auth');
const { getDateFilterParams } = require('../utils/dateHelper');

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

        for (let b of books) {
            try {
                // Fetch ALL progress history for this book assignment, ordered chronologically with updater details
                const [progHistory] = await db.execute(`
                    SELECT bp.id, bp.date, bp.page_number, u.username as updater_name, u.role as updater_role
                    FROM book_progress bp
                    LEFT JOIN users u ON bp.marked_by = u.id
                    WHERE bp.assignment_id = ? 
                    ORDER BY bp.date ASC, bp.id ASC
                `, [b.id]);

                // Build detailed step-by-step update records showing where it started and ended!
                let lastPage = b.start_page;
                b.detailed_history = [];

                progHistory.forEach(ph => {
                    const startedAt = lastPage;
                    const endedAt = ph.page_number;
                    const pagesCompleted = endedAt - startedAt;

                    b.detailed_history.push({
                        date: DateTime.fromJSDate(new Date(ph.date)).setLocale('ar').toFormat('dd MMMM yyyy'),
                        startedAt,
                        endedAt,
                        pagesCompleted,
                        updaterName: ph.updater_name || 'غير معروف',
                        updaterRole: ph.updater_role || 'مستخدم'
                    });

                    // Update lastPage for the next iteration
                    lastPage = ph.page_number;
                });

                // Reverse the detailed history for display so the most recent updates are at the top!
                b.detailed_history.reverse();
            } catch (err) {
                console.error('Error fetching progress history for assignment ' + b.id, err);
                b.detailed_history = [];
            }
        }

        // Pagination and Date range setup
        const currentPage = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (currentPage - 1) * limit;

        const dateParams = getDateFilterParams(req.query);
        const { startDate, endDate } = dateParams;

        // Fetch total matching attendance records count for pagination calculations
        const [countRows] = await db.execute(
            'SELECT COUNT(*) as count FROM attendance_students WHERE student_id = ? AND date >= ? AND date <= ?',
            [student[0].id, startDate, endDate]
        );
        const totalRecords = countRows[0].count;
        const totalPages = Math.ceil(totalRecords / limit) || 1;

        // Fetch the paginated attendance records
        const [attendance] = await db.execute(
            `SELECT * FROM attendance_students 
             WHERE student_id = ? AND date >= ? AND date <= ? 
             ORDER BY date DESC LIMIT ${limit} OFFSET ${offset}`,
            [student[0].id, startDate, endDate]
        );

        // Calculate Attendance Stats (For Visual Progress Ring)
        const [stats] = await db.execute(
            `SELECT 
                SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present,
                SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent,
                SUM(CASE WHEN status = 'leave' THEN 1 ELSE 0 END) as leave_count,
                SUM(CASE WHEN status = 'online' THEN 1 ELSE 0 END) as online,
                COUNT(*) as total
             FROM attendance_students 
             WHERE student_id = ?`,
            [student[0].id]
        );
        const presentCount = stats[0] ? Number(stats[0].present || 0) : 0;
        const onlineCount = stats[0] ? Number(stats[0].online || 0) : 0;
        const totalAttendanceCount = stats[0] ? Number(stats[0].total || 0) : 0;
        const attendancePercentage = totalAttendanceCount > 0 ? Math.round(((presentCount + onlineCount) / totalAttendanceCount) * 100) : 100;

        // Calculate Present Streak (Consecutive Present/Online days)
        const [allAttendance] = await db.execute(
            'SELECT status FROM attendance_students WHERE student_id = ? ORDER BY date DESC',
            [student[0].id]
        );
        let streak = 0;
        for (const record of allAttendance) {
            if (record.status === 'present' || record.status === 'online') {
                streak++;
            } else {
                break;
            }
        }

        // Live / Next Class Tracking for Today
        const [periodsToday] = await db.execute(
            `SELECT p.*, t.name as teacher_name 
             FROM periods p 
             JOIN teachers t ON p.teacher_id = t.id 
             WHERE p.class_id = ? AND p.day_of_week = ?
             ORDER BY p.period_number`,
            [classId, dayName]
        );

        const now = DateTime.now();
        let activePeriod = null;
        let nextPeriod = null;
        let nextPeriodCountdownSeconds = null;

        for (const p of periodsToday) {
            if (!p.start_time || !p.end_time) continue;
            // Parse period start/end time today
            const startTimeStr = String(p.start_time).substring(0, 5); 
            const endTimeStr = String(p.end_time).substring(0, 5); 
            const startTime = DateTime.fromFormat(startTimeStr, 'HH:mm');
            const endTime = DateTime.fromFormat(endTimeStr, 'HH:mm');

            const periodStart = now.set({ hour: startTime.hour, minute: startTime.minute, second: 0, millisecond: 0 });
            const periodEnd = now.set({ hour: endTime.hour, minute: endTime.minute, second: 0, millisecond: 0 });

            if (now >= periodStart && now <= periodEnd) {
                activePeriod = p;
                break;
            } else if (now < periodStart) {
                nextPeriod = p;
                nextPeriodCountdownSeconds = Math.round(periodStart.diff(now, 'seconds').seconds);
                break;
            }
        }

        res.render('dashboard_student', { 
            student: student[0], 
            attendance, 
            periods, 
            books,
            ...dateParams,
            currentPage,
            totalPages,
            attendancePercentage,
            streak,
            activePeriod,
            nextPeriod,
            nextPeriodCountdownSeconds,
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

const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { DateTime } = require('luxon');
const { getCRClassId } = require('../middleware/auth');
const { getDateFilterParams } = require('../utils/dateHelper');

exports.showStudentDashboard = async (req, res) => {
    try {
        const [student] = await db.execute('SELECT * FROM students WHERE user_id = ? AND tenant_id = ?', [req.session.userId, req.tenant.id]);
        if (!student[0]) return res.status(404).send('Student record not found');

        const classId = student[0].class_id;
        const dayName = DateTime.now().setLocale('en').toFormat('cccc');

        const [periods] = await db.execute(
            `SELECT p.*, t.name as teacher_name 
             FROM periods p 
             JOIN teachers t ON p.teacher_id = t.id AND t.tenant_id = p.tenant_id
             WHERE p.class_id = ? AND p.day_of_week = ? AND p.tenant_id = ?
             ORDER BY p.period_number`,
            [classId, dayName, req.tenant.id]
        );

        const [books] = await db.execute(`
            SELECT tb.*, b.title as book_title, t.name as teacher_name
            FROM teacher_books tb
            JOIN books b ON tb.book_id = b.id AND b.tenant_id = tb.tenant_id
            JOIN teachers t ON tb.teacher_id = t.id AND t.tenant_id = tb.tenant_id
            JOIN sessions s ON tb.session_id = s.id AND s.tenant_id = tb.tenant_id
            WHERE tb.class_id = ? AND s.is_active = TRUE AND tb.tenant_id = ?
        `, [classId, req.tenant.id]);

        const dateParams = getDateFilterParams(req.query);
        const { startDate, endDate } = dateParams;

        for (let b of books) {
            try {
                // Fetch progress just before filtered startDate
                const [beforeRange] = await db.execute(
                    'SELECT page_number FROM book_progress WHERE assignment_id = ? AND date < ? AND tenant_id = ? ORDER BY date DESC, id DESC LIMIT 1',
                    [b.id, startDate, req.tenant.id]
                );
                const startPageRange = beforeRange.length > 0 ? beforeRange[0].page_number : b.start_page;

                // Fetch progress up to filtered endDate
                const [endOfRange] = await db.execute(
                    'SELECT page_number FROM book_progress WHERE assignment_id = ? AND date <= ? AND tenant_id = ? ORDER BY date DESC, id DESC LIMIT 1',
                    [b.id, endDate, req.tenant.id]
                );
                const endPageRange = endOfRange.length > 0 ? endOfRange[0].page_number : b.start_page;

                b.last_week_started = startPageRange;
                b.last_week_ended = endPageRange;
                b.last_week_completed = Math.max(0, endPageRange - startPageRange);

                // Fetch progress history for this book assignment within selected date range
                const [progHistory] = await db.execute(`
                    SELECT bp.id, bp.date, bp.page_number, u.username as updater_name, u.role as updater_role
                    FROM book_progress bp
                    LEFT JOIN users u ON bp.marked_by = u.id AND u.tenant_id = bp.tenant_id
                    WHERE bp.assignment_id = ? AND bp.date >= ? AND bp.date <= ? AND bp.tenant_id = ?
                    ORDER BY bp.date ASC, bp.id ASC
                `, [b.id, startDate, endDate, req.tenant.id]);

                // Build detailed step-by-step update records showing where it started and ended!
                let lastPage = startPageRange;
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
                b.last_week_completed = 0;
            }
        }

        // Pagination setup
        const currentPage = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (currentPage - 1) * limit;

        // Fetch total matching attendance records count for pagination calculations
        const [countRows] = await db.execute(
            'SELECT COUNT(*) as count FROM attendance_students WHERE student_id = ? AND date >= ? AND date <= ? AND tenant_id = ?',
            [student[0].id, startDate, endDate, req.tenant.id]
        );
        const totalRecords = countRows[0].count;
        const totalPages = Math.ceil(totalRecords / limit) || 1;

        // Fetch the paginated attendance records
        const [attendance] = await db.execute(
            `SELECT * FROM attendance_students 
             WHERE student_id = ? AND date >= ? AND date <= ? AND tenant_id = ?
             ORDER BY date DESC LIMIT ${limit} OFFSET ${offset}`,
            [student[0].id, startDate, endDate, req.tenant.id]
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
             WHERE student_id = ? AND tenant_id = ?`,
            [student[0].id, req.tenant.id]
        );
        const presentCount = stats[0] ? Number(stats[0].present || 0) : 0;
        const onlineCount = stats[0] ? Number(stats[0].online || 0) : 0;
        const totalAttendanceCount = stats[0] ? Number(stats[0].total || 0) : 0;
        const attendancePercentage = totalAttendanceCount > 0 ? Math.round(((presentCount + onlineCount) / totalAttendanceCount) * 100) : 100;

        // Calculate Present Streak (Consecutive Present/Online days)
        const [allAttendance] = await db.execute(
            'SELECT status FROM attendance_students WHERE student_id = ? AND tenant_id = ? ORDER BY date DESC',
            [student[0].id, req.tenant.id]
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
             JOIN teachers t ON p.teacher_id = t.id AND t.tenant_id = p.tenant_id
             WHERE p.class_id = ? AND p.day_of_week = ? AND p.tenant_id = ?
             ORDER BY p.period_number`,
            [classId, dayName, req.tenant.id]
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
        const [student] = await db.execute('SELECT * FROM students WHERE user_id = ? AND tenant_id = ?', [req.session.userId, req.tenant.id]);
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
             LEFT JOIN attendance_students a ON s.id = a.student_id AND a.date = ? AND a.tenant_id = s.tenant_id
             WHERE s.class_id = ? AND s.tenant_id = ?`,
            [selectedDate, classId, req.tenant.id]
        );

        const [classInfo] = await db.execute('SELECT * FROM classes WHERE id = ? AND tenant_id = ?', [classId, req.tenant.id]);

        const [todayPeriods] = await db.execute(`
            SELECT p.*, t.name as teacher_name
            FROM periods p
            JOIN teachers t ON p.teacher_id = t.id AND t.tenant_id = p.tenant_id
            JOIN classes c ON p.class_id = c.id AND c.tenant_id = p.tenant_id
            WHERE p.class_id = ? AND p.day_of_week = ? AND p.tenant_id = ?
            ORDER BY p.period_number
        `, [classId, dayName, req.tenant.id]);

        const [classBooks] = await db.execute(`
            SELECT tb.id as assignment_id, tb.start_page, tb.end_page, tb.current_page, 
            b.title as book_title, t.name as teacher_name,
            (SELECT bp.updated_at FROM book_progress bp WHERE bp.assignment_id = tb.id AND bp.tenant_id = tb.tenant_id ORDER BY bp.id DESC LIMIT 1) as last_updated_at
            FROM teacher_books tb
            JOIN books b ON tb.book_id = b.id AND b.tenant_id = tb.tenant_id
            JOIN teachers t ON tb.teacher_id = t.id AND t.tenant_id = tb.tenant_id
            JOIN sessions s ON tb.session_id = s.id AND s.tenant_id = tb.tenant_id
            WHERE tb.class_id = ? AND s.is_active = TRUE AND tb.tenant_id = ?
        `, [classId, req.tenant.id]);

        for (const b of classBooks) {
            // Fetch the last page number logged in book_progress (no date dependency)
            const [lastProgress] = await db.execute(
                'SELECT page_number, date FROM book_progress WHERE assignment_id = ? AND tenant_id = ? ORDER BY date DESC, id DESC LIMIT 1',
                [b.assignment_id, req.tenant.id]
            );
            b.previous_page = lastProgress.length > 0 ? lastProgress[0].page_number : b.start_page;

            // Fetch recent progress history for graph
            const [progHistory] = await db.execute(
                'SELECT date, page_number FROM book_progress WHERE assignment_id = ? AND tenant_id = ? ORDER BY date ASC LIMIT 15',
                [b.assignment_id, req.tenant.id]
            );
            b.progress_history = progHistory.map(ph => ({
                date: ph.date instanceof Date ? ph.date.toISOString().split('T')[0] : String(ph.date).split('T')[0],
                page_number: ph.page_number
            }));
            
            // Get the last progress date
            if (lastProgress.length > 0) {
                b.last_progress_date = DateTime.fromJSDate(new Date(lastProgress[0].date)).setLocale('ar').toFormat('dd MMMM yyyy');
            } else {
                b.last_progress_date = 'لا يوجد سجل سابق';
            }

            if (b.last_updated_at) {
                b.lastUpdatedStr = DateTime.fromJSDate(new Date(b.last_updated_at)).setLocale('ar').toFormat('dd MMMM, hh:mm a');
            } else {
                b.lastUpdatedStr = null;
            }
        }

        const [teacherAttendance] = await db.execute(
            'SELECT * FROM attendance_teachers WHERE date = ? AND class_id = ? AND tenant_id = ?',
            [selectedDate, classId, req.tenant.id]
        );

        // --- Areeb Personal Student Queries ---
        const [personalBooks] = await db.execute(`
            SELECT tb.*, b.title as book_title, t.name as teacher_name
            FROM teacher_books tb
            JOIN books b ON tb.book_id = b.id AND b.tenant_id = tb.tenant_id
            JOIN teachers t ON tb.teacher_id = t.id AND t.tenant_id = tb.tenant_id
            JOIN sessions s ON tb.session_id = s.id AND s.tenant_id = tb.tenant_id
            WHERE tb.class_id = ? AND s.is_active = TRUE AND tb.tenant_id = ?
        `, [classId, req.tenant.id]);

        const dateParams = getDateFilterParams(req.query);
        const { startDate, endDate } = dateParams;

        for (let b of personalBooks) {
            try {
                // Fetch progress just before filtered startDate
                const [beforeRange] = await db.execute(
                    'SELECT page_number FROM book_progress WHERE assignment_id = ? AND date < ? AND tenant_id = ? ORDER BY date DESC, id DESC LIMIT 1',
                    [b.id, startDate, req.tenant.id]
                );
                const startPageRange = beforeRange.length > 0 ? beforeRange[0].page_number : b.start_page;

                // Fetch progress up to filtered endDate
                const [endOfRange] = await db.execute(
                    'SELECT page_number FROM book_progress WHERE assignment_id = ? AND date <= ? AND tenant_id = ? ORDER BY date DESC, id DESC LIMIT 1',
                    [b.id, endDate, req.tenant.id]
                );
                const endPageRange = endOfRange.length > 0 ? endOfRange[0].page_number : b.start_page;

                b.last_week_started = startPageRange;
                b.last_week_ended = endPageRange;
                b.last_week_completed = Math.max(0, endPageRange - startPageRange);

                // Fetch progress history for this book assignment within selected date range
                const [progHistory] = await db.execute(`
                    SELECT bp.id, bp.date, bp.page_number, u.username as updater_name, u.role as updater_role
                    FROM book_progress bp
                    LEFT JOIN users u ON bp.marked_by = u.id AND u.tenant_id = bp.tenant_id
                    WHERE bp.assignment_id = ? AND bp.date >= ? AND bp.date <= ? AND bp.tenant_id = ?
                    ORDER BY bp.date ASC, bp.id ASC
                `, [b.id, startDate, endDate, req.tenant.id]);

                let lastPage = startPageRange;
                b.detailed_history = [];

                progHistory.forEach(ph => {
                    b.detailed_history.push({
                        date: DateTime.fromJSDate(new Date(ph.date)).setLocale('ar').toFormat('dd MMMM yyyy'),
                        startedAt: lastPage,
                        endedAt: ph.page_number,
                        pagesCompleted: ph.page_number - lastPage,
                        updaterName: ph.updater_name || 'غير معروف',
                        updaterRole: ph.updater_role || 'مستخدم'
                    });
                    lastPage = ph.page_number;
                });
                b.detailed_history.reverse();
            } catch (err) {
                console.error('Error fetching student book logs for CR:', err);
                b.detailed_history = [];
                b.last_week_completed = 0;
            }
        }

        // Calculate Attendance Stats for Areeb himself
        const [personalStats] = await db.execute(
            `SELECT 
                SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present,
                SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent,
                SUM(CASE WHEN status = 'leave' THEN 1 ELSE 0 END) as leave_count,
                SUM(CASE WHEN status = 'online' THEN 1 ELSE 0 END) as online,
                COUNT(*) as total
             FROM attendance_students 
             WHERE student_id = ? AND tenant_id = ?`,
            [student[0].id, req.tenant.id]
        );
        const presentCount = personalStats[0] ? Number(personalStats[0].present || 0) : 0;
        const onlineCount = personalStats[0] ? Number(personalStats[0].online || 0) : 0;
        const totalAttendanceCount = personalStats[0] ? Number(personalStats[0].total || 0) : 0;
        const attendancePercentage = totalAttendanceCount > 0 ? Math.round(((presentCount + onlineCount) / totalAttendanceCount) * 100) : 100;

        // Calculate present streak
        const [personalAllAttendance] = await db.execute(
            'SELECT status FROM attendance_students WHERE student_id = ? AND tenant_id = ? ORDER BY date DESC',
            [student[0].id, req.tenant.id]
        );
        let streak = 0;
        for (const record of personalAllAttendance) {
            if (record.status === 'present' || record.status === 'online') {
                streak++;
            } else {
                break;
            }
        }

        // Paginated attendance list
        const [personalAttendanceList] = await db.execute(
            `SELECT * FROM attendance_students 
             WHERE student_id = ? AND date >= ? AND date <= ? AND tenant_id = ?
             ORDER BY date DESC LIMIT 10`,
            [student[0].id, startDate, endDate, req.tenant.id]
        );

        res.render('dashboard_cr', {
            // CR management data
            students,
            classInfo: classInfo[0],
            todayPeriods,
            classBooks,
            teacherAttendance,
            date: selectedDate,
            todayDate: selectedDate,
            dayName,
            classId,

            // CR personal student data
            personalStudent: student[0],
            personalBooks,
            personalAttendanceList,
            attendancePercentage,
            streak,
            ...dateParams,
            today: DateTime.now().setLocale('ar').toFormat('cccc, dd MMMM yyyy')
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading dashboard');
    }
};

exports.showStudentsManage = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;
        const search = (req.query.search || '').trim();
        const filterClassId = req.query.classId || '';

        let crClassId = null;
        if (['عريف', 'عریف'].includes(req.session.role)) {
            crClassId = await getCRClassId(req.session.userId, req.tenant.id);
            if (!crClassId) return res.status(403).send('CR class not found');
        }

        let studentsQuery = `
            SELECT s.*, c.name_ar as class_name 
            FROM students s 
            JOIN classes c ON s.class_id = c.id AND c.tenant_id = s.tenant_id 
            WHERE s.tenant_id = ?
        `;
        let queryParams = [req.tenant.id];

        if (crClassId) {
            studentsQuery += ' AND s.class_id = ?';
            queryParams.push(crClassId);
        } else if (filterClassId) {
            studentsQuery += ' AND s.class_id = ?';
            queryParams.push(filterClassId);
        }

        if (search) {
            studentsQuery += ' AND (s.name LIKE ? OR s.roll_number LIKE ? OR s.cnic LIKE ?)';
            queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        // Count total records for pagination
        const countQuery = `SELECT COUNT(*) as count FROM (${studentsQuery}) as temp`;
        const [countResult] = await db.execute(countQuery, queryParams);
        const totalRecords = countResult[0].count;
        const totalPages = Math.ceil(totalRecords / limit) || 1;

        // Apply order, limit & offset
        studentsQuery += ' ORDER BY s.class_id, s.name LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);

        const [students] = await db.query(studentsQuery, queryParams);

        // Fetch classes list for filter/dropdown
        let classesQuery = 'SELECT * FROM classes WHERE tenant_id = ?';
        let classParams = [req.tenant.id];
        if (crClassId) {
            classesQuery = 'SELECT * FROM classes WHERE id = ? AND tenant_id = ?';
            classParams = [crClassId, req.tenant.id];
        }
        const [classes] = await db.execute(classesQuery, classParams);

        res.render('students_manage', { 
            students, 
            classes, 
            role: req.session.role, 
            crClassId,
            currentPage: page,
            totalPages,
            search,
            filterClassId
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading management page');
    }
};

exports.showStudentsAdd = async (req, res) => {
    let classesQuery = 'SELECT * FROM classes WHERE tenant_id = ?';
    let params = [req.tenant.id];
    if (['عريف', 'عریف'].includes(req.session.role)) {
        const crClassId = await getCRClassId(req.session.userId, req.tenant.id);
        classesQuery = 'SELECT * FROM classes WHERE id = ? AND tenant_id = ?';
        params = [crClassId, req.tenant.id];
    }
    const [classes] = await db.execute(classesQuery, params);
    res.render('student_add', { classes, role: req.session.role });
};

const { checkQuota } = require('../utils/quota');

exports.addStudent = async (req, res) => {
    const { 
        name, classId, admissionYear, dob, fatherName, currentAddress, permanentAddress, cnic, 
        identificationMark, phone, mobile, email, guardianName, guardianFatherName, 
        relationshipToGuardian, guardianCnic, guardianPhone, guardianMobile, 
        religiousEducation, religiousInstitution, contemporaryEducation, contemporaryBoard,
        wifaqRegistration, wifaqRegNumber, previousMadrasa, referralSource 
    } = req.body;

    try {
        const quota = await checkQuota(req.tenant.id, 'students');
        if (!quota.allowed) {
            return res.status(403).send(`خطأ: لقد تجاوزت الحد الأقصى المسموح به للطلاب وهو ${quota.limit} طالب. يرجى ترقية الباقة لزيادة الحد.`);
        }

        if (['عريف', 'عریف'].includes(req.session.role)) {
            const crClassId = await getCRClassId(req.session.userId, req.tenant.id);
            if (crClassId != classId) return res.status(403).send('Unauthorized to add to this class');
        }

        const username = name.split(' ')[0] + Math.floor(Math.random() * 1000);
        const password = await bcrypt.hash('1234', 10);
        const [userResult] = await db.execute('INSERT INTO users (username, password, role, tenant_id) VALUES (?, ?, ?, ?)', [username, password, 'طالب', req.tenant.id]);
        const userId = userResult.insertId;

        let photoUrl = '/images/default_student.png';
        if (req.file) {
            photoUrl = '/uploads/students/' + req.file.filename;
        }

        const [studentResult] = await db.execute(
            `INSERT INTO students (
                name, class_id, user_id, tenant_id, admission_year, dob, father_name, 
                current_address, permanent_address, cnic, identification_mark, phone, mobile, email, 
                guardian_name, guardian_father_name, guardian_relationship, guardian_cnic, 
                guardian_phone, guardian_mobile, religious_education, religious_institution, 
                contemporary_education, contemporary_board, photo_url, is_wifaq_registered, 
                wifaq_reg_number, previous_madrasa_details, referral_source
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name, classId, userId, req.tenant.id,
                admissionYear ? parseInt(admissionYear) : null,
                dob || null,
                fatherName || null,
                currentAddress || null,
                permanentAddress || null,
                cnic || null,
                identificationMark || null,
                phone || null,
                mobile || null,
                email || null,
                guardianName || null,
                guardianFatherName || null,
                relationshipToGuardian || null,
                guardianCnic || null,
                guardianPhone || null,
                guardianMobile || null,
                religiousEducation || null,
                religiousInstitution || null,
                contemporaryEducation || null,
                contemporaryBoard || null,
                photoUrl,
                wifaqRegistration === 'yes' ? 1 : 0,
                wifaqRegNumber || null,
                previousMadrasa || null,
                referralSource || null
            ]
        );

        const studentId = studentResult.insertId;
        const year = new Date().getFullYear().toString().slice(-2);
        const rollNumber = `S-${year}-${1000 + studentId}`;

        await db.execute('UPDATE students SET roll_number = ? WHERE id = ? AND tenant_id = ?', [rollNumber, studentId, req.tenant.id]);

        const [activeSessions] = await db.execute('SELECT id FROM sessions WHERE is_active = TRUE AND tenant_id = ? LIMIT 1', [req.tenant.id]);
        if (activeSessions.length > 0) {
            await db.execute(
                'INSERT INTO student_enrollments (student_id, class_id, session_id, tenant_id) VALUES (?, ?, ?, ?)',
                [studentId, classId, activeSessions[0].id, req.tenant.id]
            );
        }

        let finalUsername = name.split(' ')[0];
        const [existing] = await db.execute('SELECT id FROM users WHERE username = ? AND tenant_id = ?', [finalUsername, req.tenant.id]);
        if (existing.length > 0) finalUsername += studentId;
        await db.execute('UPDATE users SET username = ? WHERE id = ? AND tenant_id = ?', [finalUsername, userId, req.tenant.id]);

        res.redirect('/students/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding student');
    }
};

exports.editStudent = async (req, res) => {
    const { id } = req.params;
    const { 
        name, classId, admissionYear, dob, fatherName, currentAddress, permanentAddress, cnic, 
        identificationMark, phone, mobile, email, guardianName, guardianFatherName, 
        relationshipToGuardian, guardianCnic, guardianPhone, guardianMobile, 
        religiousEducation, religiousInstitution, contemporaryEducation, contemporaryBoard,
        wifaqRegistration, wifaqRegNumber, previousMadrasa, referralSource 
    } = req.body;

    try {
        if (['عريف', 'عریف'].includes(req.session.role)) {
            const crClassId = await getCRClassId(req.session.userId, req.tenant.id);
            const [student] = await db.execute('SELECT class_id FROM students WHERE id = ? AND tenant_id = ?', [id, req.tenant.id]);
            if (!student.length || student[0].class_id !== crClassId || crClassId != classId) {
                return res.status(403).send('Unauthorized to edit this student or change to this class');
            }
        }

        let photoQuery = '';
        let queryParams = [
            name, classId, 
            admissionYear ? parseInt(admissionYear) : null,
            dob || null,
            fatherName || null,
            currentAddress || null,
            permanentAddress || null,
            cnic || null,
            identificationMark || null,
            phone || null,
            mobile || null,
            email || null,
            guardianName || null,
            guardianFatherName || null,
            relationshipToGuardian || null,
            guardianCnic || null,
            guardianPhone || null,
            guardianMobile || null,
            religiousEducation || null,
            religiousInstitution || null,
            contemporaryEducation || null,
            contemporaryBoard || null,
            wifaqRegistration === 'yes' ? 1 : 0,
            wifaqRegNumber || null,
            previousMadrasa || null,
            referralSource || null
        ];

        if (req.file) {
            photoQuery = ', photo_url = ?';
            queryParams.push('/uploads/students/' + req.file.filename);
        }

        queryParams.push(id, req.tenant.id);

        await db.execute(
            `UPDATE students SET 
                name = ?, class_id = ?, admission_year = ?, dob = ?, father_name = ?, 
                current_address = ?, permanent_address = ?, cnic = ?, identification_mark = ?, phone = ?, mobile = ?, email = ?, 
                guardian_name = ?, guardian_father_name = ?, guardian_relationship = ?, guardian_cnic = ?, 
                guardian_phone = ?, guardian_mobile = ?, religious_education = ?, religious_institution = ?, 
                contemporary_education = ?, contemporary_board = ?, is_wifaq_registered = ?, 
                wifaq_reg_number = ?, previous_madrasa_details = ?, referral_source = ?
                ${photoQuery}
             WHERE id = ? AND tenant_id = ?`,
            queryParams
        );
        
        const [activeSessions] = await db.execute('SELECT id FROM sessions WHERE is_active = TRUE AND tenant_id = ? LIMIT 1', [req.tenant.id]);
        if (activeSessions.length > 0) {
            await db.execute(`
                INSERT INTO student_enrollments (student_id, class_id, session_id, tenant_id) 
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE class_id = VALUES(class_id)
            `, [id, classId, activeSessions[0].id, req.tenant.id]);
        }
        res.redirect('/students/manage?success=true');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating student: ' + err.message);
    }
};

exports.deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        if (['عريف', 'عریف'].includes(req.session.role)) {
            const crClassId = await getCRClassId(req.session.userId, req.tenant.id);
            const [student] = await db.execute('SELECT class_id FROM students WHERE id = ? AND tenant_id = ?', [id, req.tenant.id]);
            if (!student.length || student[0].class_id !== crClassId) {
                return res.status(403).send('Unauthorized to delete this student');
            }
        }
        await db.execute('DELETE FROM students WHERE id = ? AND tenant_id = ?', [id, req.tenant.id]);
        res.redirect('/students/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting student');
    }
};

exports.showAttendance = async (req, res) => {
    const { classId } = req.params;
    if (['عريف', 'عریف'].includes(req.session.role)) {
        const crClassId = await getCRClassId(req.session.userId, req.tenant.id);
        if (crClassId != classId) return res.status(403).send('Unauthorized');
    }
    const date = req.query.date || DateTime.now().toISODate();
    try {
        console.log(`🔍 Loading attendance for ClassID: ${classId}, Date: ${date}`);
        const [students] = await db.execute(
            `SELECT s.*, a.status 
             FROM students s 
             LEFT JOIN attendance_students a ON s.id = a.student_id AND a.date = ? AND a.tenant_id = s.tenant_id
             WHERE s.class_id = ? AND s.tenant_id = ?`,
            [date, classId, req.tenant.id]
        );
        console.log(`✅ Found ${students.length} students for this class.`);

        const [history] = await db.execute(
            `SELECT DATE_FORMAT(date, '%Y-%m-%d') as date_str, 
             SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present,
             SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent,
             SUM(CASE WHEN status = 'leave' THEN 1 ELSE 0 END) as leave_count,
             SUM(CASE WHEN status = 'online' THEN 1 ELSE 0 END) as online
             FROM attendance_students 
             WHERE student_id IN (SELECT id FROM students WHERE class_id = ? AND tenant_id = ?) AND tenant_id = ?
             GROUP BY date 
             ORDER BY date DESC LIMIT 14`,
            [classId, req.tenant.id, req.tenant.id]
        );
        console.log(`📊 Weekly history rows found: ${history.length}`);

        const [classInfo] = await db.execute('SELECT * FROM classes WHERE id = ? AND tenant_id = ?', [classId, req.tenant.id]);
        res.render('attendance_students', { students, classInfo: classInfo[0], date, history });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading attendance');
    }
};

exports.saveAttendance = async (req, res) => {
    const { date, attendance, classId } = req.body;
    if (['عريف', 'عریف'].includes(req.session.role)) {
        const crClassId = await getCRClassId(req.session.userId, req.tenant.id);
        if (crClassId != classId) return res.status(403).send('Unauthorized');
    }
    try {
        for (const [studentId, status] of Object.entries(attendance)) {
            await db.execute(
                `INSERT INTO attendance_students (student_id, date, status, marked_by, tenant_id) 
                 VALUES (?, ?, ?, ?, ?) 
                 ON DUPLICATE KEY UPDATE status = ?`,
                [studentId, date, status, req.session.userId, req.tenant.id, status]
            );
        }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
};

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

exports.showStudentView = async (req, res) => {
    const { id } = req.params;
    try {
        const [student] = await db.execute(
            `SELECT s.*, c.name_ar as class_name 
             FROM students s 
             JOIN classes c ON s.class_id = c.id AND c.tenant_id = s.tenant_id 
             WHERE s.id = ? AND s.tenant_id = ?`,
            [id, req.tenant.id]
        );
        if (!student.length) {
            return res.status(404).send('Student not found');
        }
        res.render('student_view', { student: student[0], lang: req.getLocale ? req.getLocale() : 'ur' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading student profile');
    }
};

exports.exportStudentPdf = async (req, res) => {
    const { id } = req.params;
    try {
        const [student] = await db.execute(
            `SELECT s.*, c.name_ar as class_name 
             FROM students s 
             JOIN classes c ON s.class_id = c.id AND c.tenant_id = s.tenant_id 
             WHERE s.id = ? AND s.tenant_id = ?`,
            [id, req.tenant.id]
        );
        if (!student.length) {
            return res.status(404).send('Student not found');
        }

        const templatePath = path.join(__dirname, '../views/student_view.ejs');
        const lang = req.getLocale ? req.getLocale() : 'ur';
        
        // Render EJS to HTML string
        const html = await ejs.renderFile(templatePath, {
            student: student[0],
            tenant: req.tenant,
            lang: lang,
            __: res.__ || (key => key)
        });

        // Ensure scratch directory exists
        const scratchDir = path.join(__dirname, '../scratch');
        if (!fs.existsSync(scratchDir)) {
            fs.mkdirSync(scratchDir, { recursive: true });
        }

        const tempHtmlPath = path.join(scratchDir, `student_${id}.html`);
        const tempPdfPath = path.join(scratchDir, `student_${id}.pdf`);

        fs.writeFileSync(tempHtmlPath, html, 'utf8');

        // Compile PDF using the python playwright script
        const scriptPath = process.env.PDF_SCRIPT_PATH || path.join(__dirname, '../utils/html_to_pdf.py');
        const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
        const cmd = `${pythonCmd} "${scriptPath}" -i "${tempHtmlPath}" -o "${tempPdfPath}" -w 2000`;

        console.log(`[PDF Generator] Compiling HTML to PDF: ${cmd}`);
        
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`[PDF Generator] Execution failed: ${error.message}`);
                console.error(`stderr: ${stderr}`);
                // Fallback to client-side print
                return res.send(`
                    <script>
                        alert('On-the-fly PDF generation is configuring on server. Printing locally instead.');
                        window.location.href = '/students/view/${id}';
                    </script>
                `);
            }
            console.log(`[PDF Generator] Success: ${stdout}`);
            res.download(tempPdfPath, `student-${student[0].roll_number || 'profile'}.pdf`, (err) => {
                // Clean up temp files
                try {
                    if (fs.existsSync(tempHtmlPath)) fs.unlinkSync(tempHtmlPath);
                    if (fs.existsSync(tempPdfPath)) fs.unlinkSync(tempPdfPath);
                } catch (cleanErr) {
                    console.error('Temp cleanup failed:', cleanErr);
                }
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error compiling PDF');
    }
};
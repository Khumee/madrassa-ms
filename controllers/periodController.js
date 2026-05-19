const db = require('../config/db');

exports.showPeriodsManage = async (req, res) => {
    const groupBy = req.query.groupBy || 'day';
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
        const [teachers] = await db.execute('SELECT * FROM teachers ORDER BY name ASC');
        const [classes] = await db.execute('SELECT * FROM classes ORDER BY name_ar ASC');
        const [books] = await db.execute('SELECT * FROM books ORDER BY title ASC');
        const [assignments] = await db.execute(`
            SELECT tb.id, t.name as teacher_name, b.title as book_title, c.name_ar as class_name, tb.teacher_id, tb.class_id, tb.book_id
            FROM teacher_books tb
            JOIN teachers t ON tb.teacher_id = t.id
            JOIN books b ON tb.book_id = b.id
            JOIN classes c ON tb.class_id = c.id
            JOIN sessions s ON tb.session_id = s.id
            WHERE s.is_active = TRUE
        `);
        res.render('periods_manage', { periods, teachers, classes, assignments, books, groupBy, generateSuccess: req.query.generateSuccess });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading periods');
    }
};

exports.generateAuto = async (req, res) => {
    try {
        const [classes] = await db.execute('SELECT * FROM classes');
        const [assignments] = await db.execute(`
            SELECT tb.id, tb.teacher_id, tb.class_id, tb.book_id, b.title as book_title
            FROM teacher_books tb
            JOIN books b ON tb.book_id = b.id
            JOIN sessions s ON tb.session_id = s.id
            WHERE s.is_active = TRUE
        `);

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const periodsPerDay = 5;

        const times = {
            1: { start: '08:00:00', end: '08:45:00' },
            2: { start: '08:45:00', end: '09:30:00' },
            3: { start: '09:45:00', end: '10:30:00' },
            4: { start: '10:30:00', end: '11:15:00' },
            5: { start: '11:15:00', end: '12:00:00' }
        };

        await db.execute('DELETE FROM periods');

        const teacherBusy = new Set();
        const classBusy = new Set();
        const generatedPeriods = [];

        for (const cls of classes) {
            const classAssignments = assignments.filter(a => a.class_id === cls.id);
            if (classAssignments.length === 0) continue;

            let assignmentIndex = 0;

            for (const day of days) {
                for (let pNum = 1; pNum <= periodsPerDay; pNum++) {
                    let attempts = 0;
                    let scheduled = false;

                    while (attempts < classAssignments.length && !scheduled) {
                        const candidate = classAssignments[(assignmentIndex + attempts) % classAssignments.length];
                        const teacherKey = `${day}_${pNum}_${candidate.teacher_id}`;
                        const classKey = `${day}_${pNum}_${cls.id}`;

                        if (!teacherBusy.has(teacherKey) && !classBusy.has(classKey)) {
                            teacherBusy.add(teacherKey);
                            classBusy.add(classKey);

                            generatedPeriods.push({
                                assignment_id: candidate.id,
                                day_of_week: day,
                                period_number: pNum,
                                start_time: times[pNum].start,
                                end_time: times[pNum].end,
                                teacher_id: candidate.teacher_id,
                                class_id: cls.id,
                                subject: candidate.book_title
                            });

                            assignmentIndex = (assignmentIndex + attempts + 1) % classAssignments.length;
                            scheduled = true;
                        } else {
                            attempts++;
                        }
                    }
                }
            }
        }

        if (generatedPeriods.length > 0) {
            for (const p of generatedPeriods) {
                await db.execute(
                    'INSERT INTO periods (assignment_id, day_of_week, period_number, start_time, end_time, teacher_id, class_id, subject) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [p.assignment_id, p.day_of_week, p.period_number, p.start_time, p.end_time, p.teacher_id, p.class_id, p.subject]
                );
            }
        }

        res.redirect('/periods/manage?generateSuccess=true');
    } catch (err) {
        console.error('Error generating timetable:', err);
        res.status(500).send('Error generating timetable');
    }
};

exports.showFullTimetable = async (req, res) => {
    try {
        const groupBy = req.query.groupBy || 'class';
        const [periods] = await db.execute(
            `SELECT p.*, t.name as teacher_name, c.name_ar as class_name, b.title as book_title
             FROM periods p 
             JOIN teachers t ON p.teacher_id = t.id 
             JOIN classes c ON p.class_id = c.id
             LEFT JOIN teacher_books tb ON p.assignment_id = tb.id
             LEFT JOIN books b ON tb.book_id = b.id`
        );
        const [classes] = await db.execute('SELECT * FROM classes');
        const [teachers] = await db.execute('SELECT * FROM teachers ORDER BY name');
        res.render('timetable_full', { periods, classes, teachers, groupBy });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading full timetable');
    }
};

exports.addPeriod = async (req, res) => {
    const { teacherId, classId, days, periods, subject, assignmentId, bookId } = req.body;
    try {
        const daysArray = Array.isArray(days) ? days : [days];
        const periodsArray = Array.isArray(periods) ? periods : [periods];

        const standardTimes = {
            1: { start: '18:00:00', end: '18:40:00' },
            2: { start: '18:40:00', end: '19:20:00' },
            3: { start: '19:40:00', end: '20:20:00' },
            4: { start: '20:20:00', end: '21:00:00' },
            5: { start: '21:00:00', end: '21:40:00' },
            6: { start: '21:40:00', end: '22:20:00' },
            7: { start: '22:20:00', end: '23:00:00' }
        };

        for (const day of daysArray) {
            for (const pNum of periodsArray) {
                const [teacherConflicts] = await db.execute(`
                    SELECT p.*, c.name_ar as class_name, t.name as teacher_name
                    FROM periods p 
                    JOIN classes c ON p.class_id = c.id
                    JOIN teachers t ON p.teacher_id = t.id
                    WHERE p.teacher_id = ? AND p.day_of_week = ? AND p.period_number = ?
                `, [teacherId, day, pNum]);

                if (teacherConflicts.length > 0) {
                    return res.json({ 
                        success: false, 
                        conflict: true,
                        type: 'teacher',
                        day: day,
                        periodNumber: pNum,
                        teacherName: teacherConflicts[0].teacher_name,
                        className: teacherConflicts[0].class_name,
                        message: `Conflict: Teacher ${teacherConflicts[0].teacher_name} is already assigned this period for class ${teacherConflicts[0].class_name}`
                    });
                }

                const [classConflicts] = await db.execute(`
                    SELECT p.*, c.name_ar as class_name, t.name as teacher_name
                    FROM periods p 
                    JOIN classes c ON p.class_id = c.id
                    JOIN teachers t ON p.teacher_id = t.id
                    WHERE p.class_id = ? AND p.day_of_week = ? AND p.period_number = ?
                `, [classId, day, pNum]);

                if (classConflicts.length > 0) {
                    return res.json({ 
                        success: false, 
                        conflict: true,
                        type: 'class',
                        day: day,
                        periodNumber: pNum,
                        teacherName: classConflicts[0].teacher_name,
                        className: classConflicts[0].class_name,
                        message: `Conflict: Class ${classConflicts[0].class_name} already has a period assigned with teacher ${classConflicts[0].teacher_name}`
                    });
                }
            }
        }

        let finalSubject = subject;
        if ((!assignmentId || assignmentId === '') && bookId) {
            const [bookRows] = await db.execute('SELECT title FROM books WHERE id = ?', [bookId]);
            if (bookRows.length > 0) {
                finalSubject = bookRows[0].title;
            }
        }

        for (const day of daysArray) {
            for (const pNum of periodsArray) {
                const timeMapping = standardTimes[pNum] || { start: null, end: null };
                await db.execute(
                    'INSERT INTO periods (teacher_id, class_id, day_of_week, start_time, end_time, subject, assignment_id, period_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [teacherId, classId, day, timeMapping.start, timeMapping.end, finalSubject || null, (assignmentId && assignmentId !== '') ? assignmentId : null, pNum]
                );
            }
        }

        return res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.editPeriod = async (req, res) => {
    const { teacherId, classId, dayOfWeek, startTime, endTime, assignmentId, periodNumber, bookId } = req.body;
    try {
        const [teacherConflicts] = await db.execute(`
            SELECT p.*, c.name_ar as class_name, t.name as teacher_name
            FROM periods p 
            JOIN classes c ON p.class_id = c.id
            JOIN teachers t ON p.teacher_id = t.id
            WHERE p.teacher_id = ? AND p.day_of_week = ? AND p.period_number = ? AND p.id != ?
        `, [teacherId, dayOfWeek, periodNumber, req.params.id]);

        if (teacherConflicts.length > 0) {
            return res.json({ 
                success: false, 
                conflict: true,
                type: 'teacher',
                teacherName: teacherConflicts[0].teacher_name,
                className: teacherConflicts[0].class_name,
                message: `Conflict: Teacher ${teacherConflicts[0].teacher_name} is already assigned this period for class ${teacherConflicts[0].class_name}`
            });
        }

        const [classConflicts] = await db.execute(`
            SELECT p.*, c.name_ar as class_name, t.name as teacher_name
            FROM periods p 
            JOIN classes c ON p.class_id = c.id
            JOIN teachers t ON p.teacher_id = t.id
            WHERE p.class_id = ? AND p.day_of_week = ? AND p.period_number = ? AND p.id != ?
        `, [classId, dayOfWeek, periodNumber, req.params.id]);

        if (classConflicts.length > 0) {
            return res.json({ 
                success: false, 
                conflict: true,
                type: 'class',
                teacherName: classConflicts[0].teacher_name,
                className: classConflicts[0].class_name,
                message: `Conflict: Class ${classConflicts[0].class_name} already has a period assigned with teacher ${classConflicts[0].teacher_name}`
            });
        }

        let finalSubject = null;
        if ((!assignmentId || assignmentId === '') && bookId) {
            const [bookRows] = await db.execute('SELECT title FROM books WHERE id = ?', [bookId]);
            if (bookRows.length > 0) {
                finalSubject = bookRows[0].title;
            }
        } else if (assignmentId) {
            const [assRows] = await db.execute(`
                SELECT b.title 
                FROM teacher_books tb 
                JOIN books b ON tb.book_id = b.id 
                WHERE tb.id = ?
            `, [assignmentId]);
            if (assRows.length > 0) {
                finalSubject = assRows[0].title;
            }
        }

        await db.execute(
            'UPDATE periods SET teacher_id = ?, class_id = ?, day_of_week = ?, start_time = ?, end_time = ?, subject = ?, assignment_id = ?, period_number = ? WHERE id = ?',
            [teacherId, classId, dayOfWeek, startTime, endTime, finalSubject, (assignmentId && assignmentId !== '') ? assignmentId : null, periodNumber, req.params.id]
        );

        return res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.deletePeriod = async (req, res) => {
    try {
        await db.execute('DELETE FROM periods WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
};

exports.swapPeriods = async (req, res) => {
    const { periodIdA, periodIdB } = req.body;
    
    if (!periodIdA || !periodIdB || periodIdA === periodIdB) {
        return res.status(400).json({ success: false, error: 'يرجى تحديد حصتين مختلفتين للتبادل.' });
    }

    try {
        // 1. Fetch details of both periods
        const [rowsA] = await db.execute(`
            SELECT p.*, t.name as teacher_name, c.name_ar as class_name 
            FROM periods p
            JOIN teachers t ON p.teacher_id = t.id
            JOIN classes c ON p.class_id = c.id
            WHERE p.id = ?
        `, [periodIdA]);
        
        const [rowsB] = await db.execute(`
            SELECT p.*, t.name as teacher_name, c.name_ar as class_name 
            FROM periods p
            JOIN teachers t ON p.teacher_id = t.id
            JOIN classes c ON p.class_id = c.id
            WHERE p.id = ?
        `, [periodIdB]);

        if (rowsA.length === 0 || rowsB.length === 0) {
            return res.status(404).json({ success: false, error: 'إحدى الحصتين المفتوحتين غير موجودة.' });
        }

        const A = rowsA[0];
        const B = rowsB[0];

        // Target slots
        const dayOfWeekA = A.day_of_week;
        const periodNumberA = A.period_number;
        const startTimeA = A.start_time;
        const endTimeA = A.end_time;

        const dayOfWeekB = B.day_of_week;
        const periodNumberB = B.period_number;
        const startTimeB = B.start_time;
        const endTimeB = B.end_time;

        // Helper translation maps for days of the week in conflict messages
        const dayLabels = {
            'ur': { 'Monday': 'پیر', 'Tuesday': 'منگل', 'Wednesday': 'بدھ', 'Thursday': 'جمعرات', 'Friday': 'جمعہ', 'Saturday': 'ہفتہ', 'Sunday': 'اتوار' },
            'ar': { 'Monday': 'الإثنين', 'Tuesday': 'الثلاثاء', 'Wednesday': 'الأربعاء', 'Thursday': 'الخميس', 'Friday': 'الجمعة', 'Saturday': 'السبت', 'Sunday': 'الأحد' }
        };
        const lang = req.session.lang || 'ar';
        const getDayLabel = (d) => (dayLabels[lang] && dayLabels[lang][d]) ? dayLabels[lang][d] : d;

        // 2. Validate conflicts for Period A moving to B's slot (dayOfWeekB, periodNumberB)
        // Check Teacher A conflict
        const [teacherAConflicts] = await db.execute(`
            SELECT p.*, c.name_ar as class_name, t.name as teacher_name
            FROM periods p 
            JOIN classes c ON p.class_id = c.id
            JOIN teachers t ON p.teacher_id = t.id
            WHERE p.teacher_id = ? AND p.day_of_week = ? AND p.period_number = ? AND p.id NOT IN (?, ?)
        `, [A.teacher_id, dayOfWeekB, periodNumberB, A.id, B.id]);

        if (teacherAConflicts.length > 0) {
            const label = getDayLabel(dayOfWeekB);
            const errMsg = lang === 'ur' 
                ? `تبادلہ ناممکن: استاد "${A.teacher_name}" پہلے ہی ${label} کو پیریڈ ${periodNumberB} میں کلاس "${teacherAConflicts[0].class_name}" کے لیے مقرر ہیں۔`
                : `تعذر التبادل: الأستاذ "${A.teacher_name}" لديه بالفعل حصة يوم ${label} في الحصة ${periodNumberB} مع صف "${teacherAConflicts[0].class_name}".`;
            return res.json({ success: false, error: errMsg });
        }

        // Check Class A conflict
        const [classAConflicts] = await db.execute(`
            SELECT p.*, c.name_ar as class_name, t.name as teacher_name
            FROM periods p 
            JOIN classes c ON p.class_id = c.id
            JOIN teachers t ON p.teacher_id = t.id
            WHERE p.class_id = ? AND p.day_of_week = ? AND p.period_number = ? AND p.id NOT IN (?, ?)
        `, [A.class_id, dayOfWeekB, periodNumberB, A.id, B.id]);

        if (classAConflicts.length > 0) {
            const label = getDayLabel(dayOfWeekB);
            const errMsg = lang === 'ur'
                ? `تبادلہ ناممکن: کلاس "${A.class_name}" کے لیے پہلے ہی ${label} کو پیریڈ ${periodNumberB} میں استاد "${classAConflicts[0].teacher_name}" کے ساتھ پیریڈ مقرر ہو چکا ہے۔`
                : `تعذر التبادل: الصف "${A.class_name}" لديه بالفعل حصة يوم ${label} في الحصة ${periodNumberB} مع الأستاذ "${classAConflicts[0].teacher_name}".`;
            return res.json({ success: false, error: errMsg });
        }

        // 3. Validate conflicts for Period B moving to A's slot (dayOfWeekA, periodNumberA)
        // Check Teacher B conflict
        const [teacherBConflicts] = await db.execute(`
            SELECT p.*, c.name_ar as class_name, t.name as teacher_name
            FROM periods p 
            JOIN classes c ON p.class_id = c.id
            JOIN teachers t ON p.teacher_id = t.id
            WHERE p.teacher_id = ? AND p.day_of_week = ? AND p.period_number = ? AND p.id NOT IN (?, ?)
        `, [B.teacher_id, dayOfWeekA, periodNumberA, A.id, B.id]);

        if (teacherBConflicts.length > 0) {
            const label = getDayLabel(dayOfWeekA);
            const errMsg = lang === 'ur'
                ? `تبادلہ ناممکن: استاد "${B.teacher_name}" پہلے ہی ${label} کو پیریڈ ${periodNumberA} میں کلاس "${teacherBConflicts[0].class_name}" کے لیے مقرر ہیں۔`
                : `تعذر التبادل: الأستاذ "${B.teacher_name}" لديه بالفعل حصة يوم ${label} في الحصة ${periodNumberA} مع صف "${teacherBConflicts[0].class_name}".`;
            return res.json({ success: false, error: errMsg });
        }

        // Check Class B conflict
        const [classBConflicts] = await db.execute(`
            SELECT p.*, c.name_ar as class_name, t.name as teacher_name
            FROM periods p 
            JOIN classes c ON p.class_id = c.id
            JOIN teachers t ON p.teacher_id = t.id
            WHERE p.class_id = ? AND p.day_of_week = ? AND p.period_number = ? AND p.id NOT IN (?, ?)
        `, [B.class_id, dayOfWeekA, periodNumberA, A.id, B.id]);

        if (classBConflicts.length > 0) {
            const label = getDayLabel(dayOfWeekA);
            const errMsg = lang === 'ur'
                ? `تبادلہ ناممکن: کلاس "${B.class_name}" کے لیے پہلے ہی ${label} کو پیریڈ ${periodNumberA} میں استاد "${classBConflicts[0].teacher_name}" کے ساتھ پیریڈ مقرر ہو چکا ہے۔`
                : `تعذر التبادل: الصف "${B.class_name}" لديه بالفعل حصة يوم ${label} في الحصة ${periodNumberA} مع الأستاذ "${classBConflicts[0].teacher_name}".`;
            return res.json({ success: false, error: errMsg });
        }

        // 4. Perform the Swap inside a transaction!
        await db.query('START TRANSACTION');
        
        await db.execute(`
            UPDATE periods 
            SET day_of_week = ?, period_number = ?, start_time = ?, end_time = ? 
            WHERE id = ?
        `, [dayOfWeekB, periodNumberB, startTimeB, endTimeB, A.id]);

        await db.execute(`
            UPDATE periods 
            SET day_of_week = ?, period_number = ?, start_time = ?, end_time = ? 
            WHERE id = ?
        `, [dayOfWeekA, periodNumberA, startTimeA, endTimeA, B.id]);

        await db.query('COMMIT');

        res.json({ success: true });
    } catch (err) {
        try { await db.query('ROLLBACK'); } catch(e) {}
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

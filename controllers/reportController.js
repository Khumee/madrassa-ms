const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { DateTime } = require('luxon');

exports.showReports = async (req, res) => {
    try {
        const now = DateTime.now().setZone('Asia/Karachi');
        const lastMonday = now.startOf('week').minus({ weeks: 1 });
        const lastSaturday = lastMonday.plus({ days: 5 });
        const defaultStartDate = lastMonday.toISODate();
        const defaultEndDate = lastSaturday.toISODate();

        const startDate = req.query.startDate || defaultStartDate;
        const endDate = req.query.endDate || defaultEndDate;

        // Get active session ID to scope report
        const [sessionRows] = await db.execute('SELECT id FROM sessions WHERE is_active = TRUE LIMIT 1');
        const activeSessionId = sessionRows.length > 0 ? sessionRows[0].id : null;

        // Fetch student attendance filtered by the selected date range and session
        const [rows] = await db.execute(`
            SELECT s.name, c.name_ar as class_name,
            COUNT(a.id) as total_days,
            SUM(CASE WHEN a.status = 'present' OR a.status = 'online' THEN 1 ELSE 0 END) as present_days
            FROM students s
            JOIN student_enrollments se ON s.id = se.student_id
            JOIN classes c ON se.class_id = c.id
            LEFT JOIN attendance_students a ON s.id = a.student_id 
                AND a.date BETWEEN ? AND ?
            WHERE se.session_id = ? AND se.class_id IN (4, 10, 12, 16)
            GROUP BY s.id, c.id, s.name, c.name_ar
        `, [startDate, endDate, activeSessionId]);

        const groupedReport = {};
        rows.forEach(row => {
            if (!groupedReport[row.class_name]) groupedReport[row.class_name] = [];
            row.percentage = row.total_days > 0 ? Math.round((row.present_days / row.total_days) * 100) : 0;
            groupedReport[row.class_name].push(row);
        });

        // Get Teacher Book Progress for active session
        const [teacherProgress] = await db.execute(`
            SELECT tb.id as assignment_id, t.id as teacher_id, t.name as teacher_name, b.title as book_title, tb.start_page, tb.end_page, tb.current_page, c.name_ar as class_name,
            (SELECT bp.updated_at FROM book_progress bp WHERE bp.assignment_id = tb.id ORDER BY bp.id DESC LIMIT 1) as last_updated_at,
            (SELECT bp.page_number FROM book_progress bp WHERE bp.assignment_id = tb.id ORDER BY bp.id DESC LIMIT 1) as last_page_number
            FROM teacher_books tb
            JOIN teachers t ON tb.teacher_id = t.id
            JOIN books b ON tb.book_id = b.id
            JOIN sessions s ON tb.session_id = s.id
            LEFT JOIN classes c ON tb.class_id = c.id
            WHERE s.is_active = TRUE AND tb.class_id IN (4, 10, 12, 16)
        `);

        teacherProgress.forEach(tp => {
            const total = tp.end_page - tp.start_page;
            const completed = tp.current_page - tp.start_page;
            tp.percentage = total > 0 ? Math.min(100, Math.max(0, Math.round((completed / total) * 100))) : 0;

            if (tp.last_updated_at) {
                tp.lastUpdatedStr = DateTime.fromJSDate(new Date(tp.last_updated_at)).setLocale('ar').toFormat('dd MMMM yyyy, hh:mm a');
            } else {
                tp.lastUpdatedStr = 'لا يوجد تحديث بعد';
            }
        });

        // Helper to count occurrences of days between two dates
        const countDayOccurrences = (startStr, endStr) => {
            const start = DateTime.fromISO(startStr);
            const end = DateTime.fromISO(endStr);
            const counts = {
                'Monday': 0, 'Tuesday': 0, 'Wednesday': 0, 'Thursday': 0, 'Friday': 0, 'Saturday': 0, 'Sunday': 0
            };
            if (start > end) return counts;

            let current = start;
            while (current <= end) {
                const dayName = current.setLocale('en').toFormat('cccc');
                if (counts[dayName] !== undefined) {
                    counts[dayName]++;
                }
                current = current.plus({ days: 1 });
            }
            return counts;
        };

        const dayOccurrences = countDayOccurrences(startDate, endDate);

        // Fetch count of scheduled periods grouped by teacher and day_of_week
        const [teacherPeriods] = await db.execute(`
            SELECT teacher_id, day_of_week, COUNT(*) as p_count
            FROM periods
            WHERE class_id IN (4, 10, 12, 16)
            GROUP BY teacher_id, day_of_week
        `);

        // Fetch sum of classes_taken in attendance_teachers for the period
        const [teacherAttendance] = await db.execute(`
            SELECT teacher_id, SUM(classes_taken) as taken_count
            FROM attendance_teachers
            WHERE date BETWEEN ? AND ?
            GROUP BY teacher_id
        `, [startDate, endDate]);

        // Get the list of all teachers to construct reports
        const [teachers] = await db.execute(`
            SELECT t.*, 
            (SELECT COUNT(*) FROM periods WHERE teacher_id = t.id AND class_id IN (4, 10, 12, 16)) as period_count,
            (SELECT COUNT(*) FROM teacher_books WHERE teacher_id = t.id AND class_id IN (4, 10, 12, 16) AND session_id = (SELECT id FROM sessions WHERE is_active = TRUE)) as book_count
            FROM teachers t
            WHERE t.id IN (SELECT DISTINCT teacher_id FROM teacher_books WHERE class_id IN (4, 10, 12, 16))
        `);

        const teachersReport = teachers.map(t => {
            const scheduled = teacherPeriods.filter(tp => tp.teacher_id === t.id);
            let required = 0;
            scheduled.forEach(sp => {
                const occ = dayOccurrences[sp.day_of_week] || 0;
                required += sp.p_count * occ;
            });

            const att = teacherAttendance.find(ta => ta.teacher_id === t.id);
            const taken = att ? parseInt(att.taken_count) || 0 : 0;

            const difference = taken - required;

            return {
                id: t.id,
                name: t.name,
                required,
                taken,
                difference
            };
        });

        res.render('reports', { groupedReport, teachers, teacherProgress, startDate, endDate, teachersReport });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error generating reports');
    }
};

exports.showTeacherProgressReport = async (req, res) => {
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
};

exports.showBooksManage = async (req, res) => {
    try {
        const [books] = await db.execute(`
            SELECT b.*, c.name_ar as class_name 
            FROM books b 
            LEFT JOIN classes c ON b.class_id = c.id 
            WHERE b.class_id IN (4, 10, 12, 16) OR b.class_id IS NULL
            ORDER BY b.title
        `);
        const [classes] = await db.execute('SELECT * FROM classes WHERE id IN (4, 10, 12, 16) ORDER BY name_ar ASC');
        res.render('books_manage', { books, classes });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading books');
    }
};

exports.addBook = async (req, res) => {
    const { title, classId } = req.body;
    try {
        await db.execute('INSERT INTO books (title, class_id) VALUES (?, ?)', [title, classId || null]);
        res.redirect('/books/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding book');
    }
};

exports.editBook = async (req, res) => {
    const { id } = req.params;
    const { title, classId } = req.body;
    try {
        // 1. Retrieve the old title of the book before editing
        const [oldBookRows] = await db.execute('SELECT title FROM books WHERE id = ?', [id]);
        const oldTitle = oldBookRows.length > 0 ? oldBookRows[0].title : null;

        // 2. Perform the update on the books table
        await db.execute('UPDATE books SET title = ?, class_id = ? WHERE id = ?', [title, classId || null, id]);

        // 3. Instantly synchronize all timetable periods matching this book or its old name
        if (oldTitle && oldTitle !== title) {
            // Sync periods linked via assignments
            await db.execute(`
                UPDATE periods p
                JOIN teacher_books tb ON p.assignment_id = tb.id
                SET p.subject = ?
                WHERE tb.book_id = ?
            `, [title, id]);

            // Sync static/unlinked periods that matched the old title exactly
            await db.execute(`
                UPDATE periods
                SET subject = ?
                WHERE subject = ?
            `, [title, oldTitle]);
        }

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        // Enforce integrity check: cannot remove a book if it is assigned to teacher
        const [assignments] = await db.execute('SELECT COUNT(*) as count FROM teacher_books WHERE book_id = ?', [id]);
        if (assignments[0].count > 0) {
            return res.json({ 
                success: false, 
                error: 'لا يمكن حذف هذا الكتاب لأنه مسند لمعلم بالفعل. يرجى إلغاء إسناد الكتاب من قائمة توزيع الكتب أولاً.' 
            });
        }

        await db.execute('DELETE FROM books WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.showUsersManage = async (req, res) => {
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
        const normalizeRole = (role) => {
            if (!role) return '';
            let normalized = role.replace(/\u06CC/g, '\u064A').replace(/_/g, ' ').trim();
            if (normalized === 'عريف' || normalized === 'عریف') {
                return 'عريف';
            }
            if (normalized === 'طالب علم' || normalized === 'طالب') {
                return 'طالب';
            }
            return normalized;
        };

        users.forEach(u => {
            if (u.role) {
                u.role = normalizeRole(u.role);
            }
        });
        res.render('users_manage', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading users');
    }
};

exports.updateUser = async (req, res) => {
    const { userId, username, fullName, password, role } = req.body;
    try {
        if (password && password.trim() !== '') {
            const hashed = await bcrypt.hash(password, 10);
            await db.execute('UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?', [username, hashed, role, userId]);
        } else {
            await db.execute('UPDATE users SET username = ?, role = ? WHERE id = ?', [username, role, userId]);
        }

        await db.execute('UPDATE teachers SET name = ? WHERE user_id = ?', [fullName, userId]);
        await db.execute('UPDATE students SET name = ? WHERE user_id = ?', [fullName, userId]);

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.updateUserRole = async (req, res) => {
    const { userId, newRole } = req.body;
    try {
        await db.execute('UPDATE users SET role = ? WHERE id = ?', [newRole, userId]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { userId } = req.body;
    try {
        const hashed = await bcrypt.hash('1234', 10);
        await db.execute('UPDATE users SET password = ? WHERE id = ?', [hashed, userId]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.adminImportData = async (req, res) => {
    try {
        console.log('Starting Complete Live Sync...');
        const [sessions] = await db.execute('SELECT id FROM sessions WHERE is_active = TRUE LIMIT 1');
        if (sessions.length === 0) return res.status(400).send('No active session found!');
        const sessionId = sessions[0].id;

        await db.execute('DELETE FROM periods');

        const [zCheck] = await db.execute('SELECT id FROM teachers WHERE name LIKE ?', ['%زبیر%']);
        let zubairId = zCheck.length > 0 ? zCheck[0].id : null;
        if (!zubairId) {
            const zPass = await bcrypt.hash('1234', 10);
            const [zUser] = await db.execute('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', ['زبیر', zPass, 'أستاذ']);
            const [zTeacher] = await db.execute('INSERT INTO teachers (name, subject, user_id) VALUES (?, ?, ?)', ['مولانا زبیر', 'تجوید', zUser.insertId]);
            zubairId = zTeacher.insertId;
        }

        const rawTimetable = [
            { class: 'السادسة', day: 'Saturday', period: 1, subject: 'شرح العقائد', teacher: 'مولانا قمر اعجاز' },
            { class: 'السادسة', day: 'Saturday', period: 2, subject: 'شرح العقائد', teacher: 'مولانا قمر اعجاز' },
            { class: 'السادسة', day: 'Saturday', period: 3, subject: 'الھدایۃ الثالثہ', teacher: 'مولانا حبيب محبوب' },
            { class: 'السادسة', day: 'Saturday', period: 4, subject: 'الھدایۃ الثالثہ', teacher: 'مولانا حبيب محبوب' },
            { class: 'السادسة', day: 'Saturday', period: 5, subject: 'تفسیر بیضاوی', teacher: 'مفتی فرحان انور' },
            
            { class: 'السادسة', day: 'Sunday', period: 1, subject: 'تفسیر بیضاوی', teacher: 'مفتی فرحان انور' },
            { class: 'السادسة', day: 'Sunday', period: 2, subject: 'تفسیر بیضاوی', teacher: 'مفتی فرحان انور' },
            { class: 'السادسة', day: 'Sunday', period: 3, subject: 'نخبۃ الفکر', teacher: 'مولانا کمال' },
            { class: 'السادسة', day: 'Sunday', period: 4, subject: 'نخبۃ الفکر', teacher: 'مولانا کمال' },
            { class: 'السادسة', day: 'Sunday', period: 5, subject: 'تفسیر بیضاوی', teacher: 'مفتی فرحان انور' },

            { class: 'السادسة', day: 'Monday', period: 1, subject: 'نخبۃ الفکر', teacher: 'مولانا کمال' },
            { class: 'السادسة', day: 'Monday', period: 2, subject: 'تفسیر بیضاوی', teacher: 'مفتی فرحان انور' },
            { class: 'السادسة', day: 'Monday', period: 3, subject: 'شرح العقائد', teacher: 'مولانا قمر اعجاز' },
            { class: 'السادسة', day: 'Monday', period: 4, subject: 'الھدایۃ الثالثہ', teacher: 'مولانا حبيب محبوب' },
            { class: 'السادسة', day: 'Monday', period: 5, subject: 'تفسیر بیضاوی', teacher: 'مفتی فرحان انور' },

            { class: 'السادسة', day: 'Tuesday', period: 1, subject: 'نخبۃ الفکر', teacher: 'مولانا کمال' },
            { class: 'السادسة', day: 'Tuesday', period: 2, subject: 'تفسیر بیضاوی', teacher: 'مفتی فرحان انور' },
            { class: 'السادسة', day: 'Tuesday', period: 3, subject: 'شرح العقائد', teacher: 'مولانا قمر اعجاز' },
            { class: 'السادسة', day: 'Tuesday', period: 4, subject: 'الھدایۃ الثالثہ', teacher: 'مولانا حبيب محبوب' },
            { class: 'السادسة', day: 'Tuesday', period: 5, subject: 'تفسیر بیضاوی', teacher: 'مفتی فرحان انور' },

            { class: 'السادسة', day: 'Wednesday', period: 1, subject: 'شرح العقائد', teacher: 'مولانا قمر اعجاز' },
            { class: 'السادسة', day: 'Wednesday', period: 2, subject: 'شرح العقائد', teacher: 'مولانا قمر اعجاز' },
            { class: 'السادسة', day: 'Wednesday', period: 3, subject: 'الھدایۃ الثالثہ', teacher: 'مولانا حبيب محبوب' },
            { class: 'السادسة', day: 'Wednesday', period: 4, subject: 'الھدایۃ الثالثہ', teacher: 'مولانا حبيب محبوب' },
            { class: 'السادسة', day: 'Wednesday', period: 5, subject: 'تفسیر بیضاوی', teacher: 'مفتی فرحان انور' },

            { class: 'السادسة', day: 'Thursday', period: 1, subject: 'الھدایۃ الثالثہ', teacher: 'مولانا حبيب محبوب' },
            { class: 'السادسة', day: 'Thursday', period: 2, subject: 'الھدایۃ الثالثہ', teacher: 'مولانا حبيب محبوب' },
            { class: 'السادسة', day: 'Thursday', period: 3, subject: 'تفسیر بیضاوی', teacher: 'مفتی فرحان انور' },
            { class: 'السادسة', day: 'Thursday', period: 4, subject: 'تفسیر بیضاوی', teacher: 'مفتی فرحان انور' },
            { class: 'السادسة', day: 'Thursday', period: 5, subject: 'تفسیر بیضاوی', teacher: 'مفتی فرحان انور' },

            { class: 'الخامسة', day: 'Saturday', period: 1, subject: 'تفسیر نسفی', teacher: 'مولانا حسن' },
            { class: 'الخامسة', day: 'Saturday', period: 2, subject: 'تفسیر نسفی', teacher: 'مولانا حسن' },
            { class: 'الخامسة', day: 'Saturday', period: 3, subject: 'اصول الشاشی', teacher: 'مولانا زبیر' },
            { class: 'الخامسة', day: 'Saturday', period: 4, subject: 'الھدایۃ الاولی', teacher: 'مولانا عبد القادر عثمان' },
            { class: 'الخامسة', day: 'Saturday', period: 5, subject: 'الھدایۃ الاولی', teacher: 'مولانا عبد القادر عثمان' },

            { class: 'الخامسة', day: 'Sunday', period: 1, subject: 'اصول الشاشی', teacher: 'مولانا زبیر' },
            { class: 'الخامسة', day: 'Sunday', period: 2, subject: 'تفسیر نسفی', teacher: 'مولانا حسن' },
            { class: 'الخامسة', day: 'Sunday', period: 3, subject: 'تفسیر نسفی', teacher: 'مولانا حسن' },
            { class: 'الخامسة', day: 'Sunday', period: 4, subject: 'الھدایۃ الاولی', teacher: 'مولانا عبد القادر عثمان' },
            { class: 'الخامسة', day: 'Sunday', period: 5, subject: 'الھدایۃ الاولی', teacher: 'مولانا عبد القادر عثمان' },

            { class: 'الخامسة', day: 'Monday', period: 1, subject: 'تفسیر نسفی', teacher: 'مولانا حسن' },
            { class: 'الخامسة', day: 'Monday', period: 2, subject: 'تفسیر نسفی', teacher: 'مولانا حسن' },
            { class: 'الخامسة', day: 'Monday', period: 3, subject: 'اصول الشاشی', teacher: 'مولانا زبیر' },
            { class: 'الخامسة', day: 'Monday', period: 4, subject: 'الھدایۃ الاولی', teacher: 'مولانا عبد القادر عثمان' },
            { class: 'الخامسة', day: 'Monday', period: 5, subject: 'الھدایۃ الاولی', teacher: 'مولانا عبد القادر عثمان' },

            { class: 'الخامسة', day: 'Tuesday', period: 1, subject: 'تفسیر نسفی', teacher: 'مولانا حسن' },
            { class: 'الخامسة', day: 'Tuesday', period: 2, subject: 'تفسیر نسفی', teacher: 'مولانا حسن' },
            { class: 'الخامسة', day: 'Tuesday', period: 3, subject: 'اصول الشاشی', teacher: 'مولانا زبیر' },
            { class: 'الخامسة', day: 'Tuesday', period: 4, subject: 'الھدایۃ الاولی', teacher: 'مولانا عبد القادر عثمان' },
            { class: 'الخامسة', day: 'Tuesday', period: 5, subject: 'الھدایۃ الاولی', teacher: 'مولانا عبد القادر عثمان' },

            { class: 'الخامسة', day: 'Wednesday', period: 1, subject: 'تفسیر نسفی', teacher: 'مولانا حسن' },
            { class: 'الخامسة', day: 'Wednesday', period: 2, subject: 'تفسیر نسفی', teacher: 'مولانا حسن' },
            { class: 'الخامسة', day: 'Wednesday', period: 3, subject: 'اصول الشاشی', teacher: 'مولانا زبیر' },
            { class: 'الخامسة', day: 'Wednesday', period: 4, subject: 'الھدایۃ الاولی', teacher: 'مولانا عبد القادر عثمان' },
            { class: 'الخامسة', day: 'Wednesday', period: 5, subject: 'الھدایۃ الاولی', teacher: 'مولانا عبد القادر عثمان' },

            { class: 'الخامسة', day: 'Thursday', period: 1, subject: 'تفسیر نسفی', teacher: 'مولانا حسن' },
            { class: 'الخامسة', day: 'Thursday', period: 2, subject: 'تفسیر نسفی', teacher: 'مولانا حسن' },
            { class: 'الخامسة', day: 'Thursday', period: 3, subject: 'اصول الشاشی', teacher: 'مولانا زبیر' },
            { class: 'الخامسة', day: 'Thursday', period: 4, subject: 'الھدایۃ الاولی', teacher: 'مولانا عبد القادر عثمان' },
            { class: 'الخامسة', day: 'Thursday', period: 5, subject: 'الھدایۃ الاولی', teacher: 'مولانا عبد القادر عثمان' },

            { class: 'الثانية', day: 'Saturday', period: 1, subject: 'تجديد النحو', teacher: 'مولانا بارون خليل' },
            { class: 'الثانية', day: 'Saturday', period: 2, subject: 'تجديد النحو', teacher: 'مولانا بارون خليل' },
            { class: 'الثانية', day: 'Saturday', period: 3, subject: 'الإنشاء السھل', teacher: 'مولانا حبيب محبوب' },
            { class: 'الثانية', day: 'Saturday', period: 4, subject: 'ترجمة القرآن', teacher: 'مفتی مشرف بیگ اشرف' },
            { class: 'الثانية', day: 'Saturday', period: 5, subject: 'القرآن الکريم', teacher: 'مفتی مشرف بیگ اشرف' },

            { class: 'الثانية', day: 'Sunday', period: 1, subject: 'الإنشاء السھل', teacher: 'مولانا حبيب محبوب' },
            { class: 'الثانية', day: 'Sunday', period: 2, subject: 'تجديد النحو', teacher: 'مولانا بارون خليل' },
            { class: 'الثانية', day: 'Sunday', period: 3, subject: 'تجديد النحو', teacher: 'مولانا بارون خليل' },
            { class: 'الثانية', day: 'Sunday', period: 4, subject: 'ترجمة القرآن', teacher: 'مفتی مشرف بیگ اشرف' },
            { class: 'الثانية', day: 'Sunday', period: 5, subject: 'القرآن الکريم', teacher: 'مفتی مشرف بیگ اشرف' },

            { class: 'الثانية', day: 'Monday', period: 1, subject: 'تجديد النحو', teacher: 'مولانا بارون خليل' },
            { class: 'الثانية', day: 'Monday', period: 2, subject: 'تجديد النحو', teacher: 'مولانا بارون خليل' },
            { class: 'الثانية', day: 'Monday', period: 3, subject: 'الإنشاء السھل', teacher: 'مولانا حبيب محبوب' },
            { class: 'الثانية', day: 'Monday', period: 4, subject: 'ترجمة القرآن', teacher: 'مفتی مشرف بیگ اشرف' },
            { class: 'الثانية', day: 'Monday', period: 5, subject: 'القرآن الکريم', teacher: 'مفتی مشرف بیگ اشرف' },

            { class: 'الثانية', day: 'Tuesday', period: 1, subject: 'تجديد النحو', teacher: 'مولانا بارون خليل' },
            { class: 'الثانية', day: 'Tuesday', period: 2, subject: 'تجديد النحو', teacher: 'مولانا baroon' },
            { class: 'الثانية', day: 'Tuesday', period: 3, subject: 'الإنشاء السھل', teacher: 'مولانا حبيب محبوب' },
            { class: 'الثانية', day: 'Tuesday', period: 4, subject: 'ترجمة القرآن', teacher: 'مفتی مشرف بیگ اشرف' },
            { class: 'الثانية', day: 'Tuesday', period: 5, subject: 'القرآن الکريم', teacher: 'مفتی مشرف بیگ اشرف' },

            { class: 'الثانية', day: 'Wednesday', period: 1, subject: 'تجديد النحو', teacher: 'مولانا baroon' },
            { class: 'الثانية', day: 'Wednesday', period: 2, subject: 'تجديد النحو', teacher: 'مولانا baroon' },
            { class: 'الثانية', day: 'Wednesday', period: 3, subject: 'الإنشاء السھل', teacher: 'مولانا حبيب محبوب' },
            { class: 'الثانية', day: 'Wednesday', period: 4, subject: 'ترجمة القرآن', teacher: 'مفتی مشرف بیگ اشرف' },
            { class: 'الثانية', day: 'Wednesday', period: 5, subject: 'القرآن الکريم', teacher: 'مفتی مشرف بیگ اشرف' },

            { class: 'الثانية', day: 'Thursday', period: 1, subject: 'تجديد النحو', teacher: 'مولانا baroon' },
            { class: 'الثانية', day: 'Thursday', period: 2, subject: 'تجديد النحو', teacher: 'مولانا baroon' },
            { class: 'الثانية', day: 'Thursday', period: 3, subject: 'الإنشاء السھل', teacher: 'مولانا حبيب محبوب' },
            { class: 'الثانية', day: 'Thursday', period: 4, subject: 'ترجمة القرآن', teacher: 'مفتی مشرف بیگ اشرف' },
            { class: 'الثانية', day: 'Thursday', period: 5, subject: 'القرآن الکريم', teacher: 'مفتی مشرف بیگ اشرف' }
        ];

        let count = 0;
        for (const item of rawTimetable) {
            if (item.day === 'Sunday') continue;

            const [classRows] = await db.execute('SELECT id FROM classes WHERE name_ar = ?', [item.class]);
            if (classRows.length === 0) continue;
            const classId = classRows[0].id;

            const searchName = item.teacher.replace('مولانا ', '').replace('مفتی ', '').trim();
            const [teacherRows] = await db.execute('SELECT id FROM teachers WHERE name LIKE ?', [`%${searchName}%`]);
            if (teacherRows.length === 0) continue;
            const teacherId = teacherRows[0].id;

            let [bookRows] = await db.execute('SELECT id FROM books WHERE title = ?', [item.subject]);
            if (bookRows.length === 0) {
                const [insBook] = await db.execute('INSERT INTO books (title) VALUES (?)', [item.subject]);
                bookRows = [{ id: insBook.insertId }];
            }
            const bookId = bookRows[0].id;

            let [tbRows] = await db.execute(
                'SELECT id FROM teacher_books WHERE teacher_id = ? AND book_id = ? AND class_id = ? AND session_id = ?',
                [teacherId, bookId, classId, sessionId]
            );
            if (tbRows.length === 0) {
                const [insTb] = await db.execute(
                    'INSERT INTO teacher_books (teacher_id, book_id, class_id, session_id, start_page, end_page, current_page) VALUES (?, ?, ?, ?, 1, 100, 1)',
                    [teacherId, bookId, classId, sessionId]
                );
                tbRows = [{ id: insTb.insertId }];
            }
            const assignmentId = tbRows[0].id;

            const startTimes = { 1: '08:00:00', 2: '08:45:00', 3: '09:45:00', 4: '10:30:00', 5: '11:15:00' };
            const endTimes = { 1: '08:45:00', 2: '09:30:00', 3: '10:30:00', 4: '11:15:00', 5: '12:00:00' };

            await db.execute(
                'INSERT INTO periods (teacher_id, class_id, day_of_week, period_number, start_time, end_time, subject, assignment_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [teacherId, classId, item.day, item.period, startTimes[item.period], endTimes[item.period], item.subject, assignmentId]
            );
            count++;
        }

        res.send(`Successfully synchronized ${count} periods and created all necessary books/assignments. You can now go back to /periods/manage`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error importing data');
    }
};

exports.showPermissionsManage = async (req, res) => {
    try {
        // Fetch all permissions from database
        const [permissions] = await db.execute('SELECT * FROM role_permissions');

        // Grid functions and list of roles
        const functions = [
            { id: 'reports', name: 'التقارير العامة وتقارير الحضور' },
            { id: 'books_manage', name: 'إدارة الكتب والمناهج' },
            { id: 'users_manage', name: 'إدارة حسابات المستخدمين والأدوار' },
            { id: 'students_manage', name: 'إدارة بيانات الطلاب' },
            { id: 'student_attendance', name: 'تسجيل حضور الطلاب' },
            { id: 'teachers_manage', name: 'إدارة بيانات المعلمين' },
            { id: 'teacher_attendance', name: 'تسجيل حضور المعلمين' },
            { id: 'teacher_books_manage', name: 'توزيع وإسناد الكتب للمعلمين' },
            { id: 'periods_manage', name: 'إدارة الحصص وجدول التوقيت' }
        ];

        const rolesList = ['مدير', 'ناظم', 'أستاذ', 'عريف', 'طالب'];

        // Build a grid structure: function_name -> { role -> allowed }
        const grid = {};
        functions.forEach(f => {
            grid[f.id] = {};
            rolesList.forEach(r => {
                const match = permissions.find(p => p.function_name === f.id && p.role === r);
                grid[f.id][r] = match ? !!match.allowed : false;
            });
        });

        res.render('permissions_manage', { functions, rolesList, grid });
    } catch (err) {
        console.error('Error showing permissions:', err);
        res.status(500).send('Error loading permissions page');
    }
};

exports.togglePermission = async (req, res) => {
    const { role, functionName, allowed } = req.body;
    try {
        // Upsert permission
        await db.execute(`
            INSERT INTO role_permissions (role, function_name, allowed) 
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE allowed = VALUES(allowed)
        `, [role, functionName, allowed ? 1 : 0]);

        res.json({ success: true });
    } catch (err) {
        console.error('Error toggling permission:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};
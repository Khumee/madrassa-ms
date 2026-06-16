const db = require('../db');
const bcrypt = require('bcryptjs');
const { DateTime } = require('luxon');

const teacherNames = [
    'مفتی مشرف بیگ اشرف',
    'مولانا حبيب محبوب',
    'مولانا کمال احمد',
    'مولانا حسن قادری',
    'مولانا عبد القادر عثمان',
    'مفتی محمد حمید اللہ',
    'مولانا عاصم اقبال',
    'مولانا حافظ ذو الفقار',
    'قاری محمد طیب',
    'مولانا ساجد حمید'
];

const subjects = [
    'اللغة الفارسية / التوضيح',
    'التجويد والسيرة / الهداية',
    'تفسير / الأدب',
    'الصرف / أصول الفقه',
    'النحو / القدوري / النسائي',
    'المنطق / شرح العقائد / البخاري',
    'الهداية / الترمذي',
    'التوضيح / الترمذي',
    'علم الصيغة / سنن أبي داود',
    'شمائل الترمذي'
];

const firstNames = ['محمد', 'احمد', 'علی', 'عمر', 'عثمان', 'ابو بکر', 'حمزہ', 'بلال', 'سعد', 'طلحہ', 'اسامہ', 'انس', 'عبد الرحمن', 'عبد اللہ', 'خالد', 'طارق', 'ساجد', 'یاسر', 'زبیر', 'عاصم', 'حسن', 'حسین', 'مصطفی', 'نعمان', 'وقاص'];
const lastNames = ['خان', 'احمد', 'علی', 'رضا', 'صدیقی', 'قادری', 'فاروقی', 'علوی', 'سید', 'بشیر', 'محمود', 'اقبال', 'شریف', 'زبیر', 'ساجد', 'بلال', 'طارق', 'حمید', 'انصاری', 'مغل', 'عباسی', 'ہاشمی', 'جمیل', 'نعیم', 'ظفر'];

// Standard Dars-e-Nizami Classes
const defaultClasses = [
    { name_ar: 'الأولى', name_en: 'Aula' },
    { name_ar: 'الثانية', name_en: 'Sania' },
    { name_ar: 'الثالثة', name_en: 'Salisa' },
    { name_ar: 'الرابعة', name_en: 'Rabia' },
    { name_ar: 'الخامسة', name_en: 'Khamisa' },
    { name_ar: 'السادسة', name_en: 'Sadisa' },
    { name_ar: 'السابعة', name_en: 'Sabiya' },
    { name_ar: 'دورة حديث', name_en: 'Daura Hadith' }
];

// Standard Dars-e-Nizami Books per class order
const booksByClassIndex = {
    0: ['صرف بہائی', 'نحو میر', 'جمال القرآن', 'طریقہ جدیدہ'], // الأولى
    1: ['علم الصيغة', 'علم النحو', 'القدوري الأول', 'خلاصۃ النحو'], // الثانية
    2: ['اصول الشاشی', 'شرح مائۃ عامل', 'نور الایضاح', 'نفحۃ الیمن'], // الثالثة
    3: ['کنز الدقائق', 'شرح جامی', 'تلخیص المفتاح', 'القدوري الثاني'], // الرابعة
    4: ['ہدایہ اول', 'عقیدۃ الطحاویہ', 'تفسير الجلالين الأول', 'دیوان المتنبي'], // الخامسة
    5: ['ہدایہ ثالث', 'نور الانوار', 'تفسير الجلالين الثاني', 'مختصر المعاني'], // السادسة
    6: ['مشکوۃ المصابیح', 'ہدایہ اخیرین', 'شرح العقائد النسفیہ', 'السراجی فی المیراث'], // السابعة
    7: ['صحيح البخاري', 'صحيح مسلم', 'جامع الترمذي', 'سنن أبي داود', 'سنن النسائي', 'سنن ابن ماجہ'] // دورة حديث
};

function generateUniqueName(index, offset) {
    const fn = firstNames[(offset * 7 + index * 3) % firstNames.length];
    const ln = lastNames[(offset * 5 + index * 7) % lastNames.length];
    return `${fn} ${ln}`;
}

async function seedDemoForTenant(tenantId = 1) {
    console.log(`Seeding clean, realistic Urdu/Arabic demo data for Tenant ${tenantId}...`);
    try {
        console.log('Clearing old records for Tenant 1...');
        await db.execute('DELETE FROM attendance_students WHERE tenant_id = ?', [tenantId]);
        await db.execute('DELETE FROM attendance_teachers WHERE tenant_id = ?', [tenantId]);
        await db.execute('DELETE FROM book_progress WHERE tenant_id = ?', [tenantId]);
        await db.execute('DELETE FROM periods WHERE tenant_id = ?', [tenantId]);
        await db.execute('DELETE FROM teacher_books WHERE tenant_id = ?', [tenantId]);
        await db.execute('DELETE FROM student_enrollments WHERE tenant_id = ?', [tenantId]);
        await db.execute('DELETE FROM books WHERE tenant_id = ?', [tenantId]);
        await db.execute('DELETE FROM students WHERE tenant_id = ?', [tenantId]);
        await db.execute('DELETE FROM teachers WHERE tenant_id = ?', [tenantId]);
        await db.execute('DELETE FROM users WHERE tenant_id = ?', [tenantId]);
        await db.execute('DELETE FROM classes WHERE tenant_id = ?', [tenantId]);
        await db.execute('DELETE FROM sessions WHERE tenant_id = ?', [tenantId]);
        await db.execute('DELETE FROM role_permissions WHERE tenant_id = ?', [tenantId]);

        // Seed Default Session
        console.log('Seeding default session...');
        const [sessionRes] = await db.execute(
            'INSERT INTO sessions (name, is_active, tenant_id) VALUES (?, ?, ?)',
            ['2026-2027', 1, tenantId]
        );
        const activeSessionId = sessionRes.insertId;

        // Seed Director (مدير)
        console.log('Seeding director (مدير)...');
        const directorHash = await bcrypt.hash('1234', 10);
        await db.execute(
            'INSERT INTO users (username, password, role, tenant_id) VALUES (?, ?, ?, ?)',
            ['مدیر', directorHash, 'مدير', tenantId]
        );

        // Seed Supervisor (ناظم)
        console.log('Seeding supervisor (ناظم)...');
        const supervisorHash = await bcrypt.hash('1234', 10);
        await db.execute(
            'INSERT INTO users (username, password, role, tenant_id) VALUES (?, ?, ?, ?)',
            ['ناظم', supervisorHash, 'ناظم', tenantId]
        );

        // Seed default role permissions
        console.log('Seeding default role permissions for Tenant 1...');
        const defaultPermissions = [
            { function_name: 'reports', role: 'مدير', allowed: true },
            { function_name: 'reports', role: 'ناظم', allowed: true },
            { function_name: 'reports', role: 'عریف', allowed: false },
            { function_name: 'reports', role: 'أستاذ', allowed: false },
            { function_name: 'reports', role: 'طالب', allowed: false },

            { function_name: 'books_manage', role: 'مدير', allowed: true },
            { function_name: 'books_manage', role: 'ناظم', allowed: true },
            { function_name: 'books_manage', role: 'عریف', allowed: false },
            { function_name: 'books_manage', role: 'أستاذ', allowed: false },
            { function_name: 'books_manage', role: 'طالب', allowed: false },

            { function_name: 'users_manage', role: 'مدير', allowed: true },
            { function_name: 'users_manage', role: 'ناظم', allowed: true },
            { function_name: 'users_manage', role: 'عریف', allowed: false },
            { function_name: 'users_manage', role: 'أستاذ', allowed: false },
            { function_name: 'users_manage', role: 'طالب', allowed: false },

            { function_name: 'students_manage', role: 'مدير', allowed: true },
            { function_name: 'students_manage', role: 'ناظم', allowed: true },
            { function_name: 'students_manage', role: 'عریف', allowed: false },
            { function_name: 'students_manage', role: 'أستاذ', allowed: false },
            { function_name: 'students_manage', role: 'طالب', allowed: false },

            { function_name: 'student_attendance', role: 'مدير', allowed: true },
            { function_name: 'student_attendance', role: 'ناظم', allowed: true },
            { function_name: 'student_attendance', role: 'عریف', allowed: true },
            { function_name: 'student_attendance', role: 'أستاذ', allowed: false },
            { function_name: 'student_attendance', role: 'طالب', allowed: false },

            { function_name: 'teachers_manage', role: 'مدير', allowed: true },
            { function_name: 'teachers_manage', role: 'ناظم', allowed: true },
            { function_name: 'teachers_manage', role: 'عریف', allowed: false },
            { function_name: 'teachers_manage', role: 'أستاذ', allowed: false },
            { function_name: 'teachers_manage', role: 'طالب', allowed: false },

            { function_name: 'teacher_attendance', role: 'مدير', allowed: true },
            { function_name: 'teacher_attendance', role: 'ناظم', allowed: true },
            { function_name: 'teacher_attendance', role: 'عریف', allowed: true },
            { function_name: 'teacher_attendance', role: 'أستاذ', allowed: false },
            { function_name: 'teacher_attendance', role: 'طالب', allowed: false },

            { function_name: 'teacher_books_manage', role: 'مدير', allowed: true },
            { function_name: 'teacher_books_manage', role: 'ناظم', allowed: true },
            { function_name: 'teacher_books_manage', role: 'عریف', allowed: false },
            { function_name: 'teacher_books_manage', role: 'أستاذ', allowed: false },
            { function_name: 'teacher_books_manage', role: 'طالب', allowed: false },

            { function_name: 'periods_manage', role: 'مدير', allowed: true },
            { function_name: 'periods_manage', role: 'ناظم', allowed: true },
            { function_name: 'periods_manage', role: 'عریف', allowed: false },
            { function_name: 'periods_manage', role: 'أستاذ', allowed: false },
            { function_name: 'periods_manage', role: 'طالب', allowed: false }
        ];
        for (const perm of defaultPermissions) {
            await db.execute(
                'INSERT INTO role_permissions (role, function_name, allowed, tenant_id) VALUES (?, ?, ?, ?)',
                [perm.role, perm.function_name, perm.allowed, tenantId]
            );
        }


        // Seed Classes for Tenant 1
        console.log('Seeding 8 classes...');
        const classes = [];
        for (const cls of defaultClasses) {
            const [cRes] = await db.execute(
                'INSERT INTO classes (name_ar, name_en, tenant_id) VALUES (?, ?, ?)',
                [cls.name_ar, cls.name_en, tenantId]
            );
            classes.push({ id: cRes.insertId, name_ar: cls.name_ar, name_en: cls.name_en });
        }

        // Seed Teachers
        console.log('Seeding 10 teachers...');
        const teacherIds = [];
        for (let i = 0; i < teacherNames.length; i++) {
            const name = teacherNames[i];
            const subject = subjects[i % subjects.length];
            const username = (i === 0) ? 'استاذ' : `teacher_${i + 1}`;
            const hash = await bcrypt.hash('1234', 10);
            
            const [uRes] = await db.execute(
                'INSERT INTO users (username, password, role, tenant_id) VALUES (?, ?, ?, ?)',
                [username, hash, 'أستاذ', tenantId]
            );
            
            const [tRes] = await db.execute(
                'INSERT INTO teachers (name, subject, user_id, id_number, tenant_id) VALUES (?, ?, ?, ?, ?)',
                [name, subject, uRes.insertId, `T-26-${100 + i}`, tenantId]
            );
            teacherIds.push(tRes.insertId);
        }

        // Seed 10 Students per Class (80 Students Total)
        console.log('Seeding 80 students (10 per class)...');
        const studentsByClass = {};
        
        for (let cIdx = 0; cIdx < classes.length; cIdx++) {
            const cls = classes[cIdx];
            studentsByClass[cls.id] = [];
            for (let i = 0; i < 10; i++) {
                const name = generateUniqueName(i, cIdx);
                let username = `student_${cls.id}_${i + 1}`;
                if (cIdx === 0 && i === 0) {
                    username = 'عریف';
                } else if (cIdx === 5 && i === 0) {
                    username = 'طالب';
                }
                const hash = await bcrypt.hash('1234', 10);
                const role = (cIdx === 0 && i === 0) ? 'عریف' : 'طالب'; // Translate representation to 'عریف' matching setup

                const [uRes] = await db.execute(
                    'INSERT INTO users (username, password, role, tenant_id) VALUES (?, ?, ?, ?)',
                    [username, hash, role, tenantId]
                );

                const [sRes] = await db.execute(
                    'INSERT INTO students (name, class_id, roll_number, user_id, tenant_id) VALUES (?, ?, ?, ?, ?)',
                    [name, cls.id, `S-26-${cls.id}${10 + i}`, uRes.insertId, tenantId]
                );

                studentsByClass[cls.id].push(sRes.insertId);

                // Enroll student in active session
                await db.execute(
                    'INSERT INTO student_enrollments (student_id, class_id, session_id, tenant_id) VALUES (?, ?, ?, ?)',
                    [sRes.insertId, cls.id, activeSessionId, tenantId]
                );
            }
        }

        // Seed Books & Assign to Teachers
        console.log('Seeding books and assigning to teachers...');
        const assignmentIds = [];
        const assignmentsByClass = {};

        for (let cIdx = 0; cIdx < classes.length; cIdx++) {
            const cls = classes[cIdx];
            assignmentsByClass[cls.id] = [];
            const bookTitles = booksByClassIndex[cIdx] || ['كتاب عام'];
            for (let idx = 0; idx < bookTitles.length; idx++) {
                const title = bookTitles[idx];
                
                const [bRes] = await db.execute(
                    'INSERT INTO books (title, class_id, tenant_id) VALUES (?, ?, ?)',
                    [title, cls.id, tenantId]
                );
                
                const teacherId = teacherIds[(cIdx * 3 + idx) % teacherIds.length];
                const [tbRes] = await db.execute(
                    'INSERT INTO teacher_books (teacher_id, book_id, session_id, start_page, end_page, current_page, class_id, tenant_id) VALUES (?, ?, ?, 1, 300, 1, ?, ?)',
                    [teacherId, bRes.insertId, activeSessionId, cls.id, tenantId]
                );
                
                assignmentIds.push(tbRes.insertId);
                assignmentsByClass[cls.id].push({
                    id: tbRes.insertId,
                    teacherId,
                    subject: title
                });
            }
        }

        // Seed Timetable Periods (5 periods per day, Monday to Saturday)
        console.log('Seeding timetable periods...');
        const days = ['Saturday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const startTimes = { 1: '08:00:00', 2: '08:45:00', 3: '09:45:00', 4: '10:30:00', 5: '11:15:00' };
        const endTimes = { 1: '08:45:00', 2: '09:30:00', 3: '10:30:00', 4: '11:15:00', 5: '12:00:00' };

        for (const cls of classes) {
            const classAssignments = assignmentsByClass[cls.id] || [];
            if (classAssignments.length === 0) continue;

            for (const day of days) {
                for (let pNum = 1; pNum <= 5; pNum++) {
                    const assign = classAssignments[(pNum + day.length) % classAssignments.length];
                    await db.execute(
                        'INSERT INTO periods (teacher_id, class_id, day_of_week, start_time, end_time, subject, assignment_id, period_number, session_id, tenant_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [assign.teacherId, cls.id, day, startTimes[pNum], endTimes[pNum], assign.subject, assign.id, pNum, activeSessionId, tenantId]
                    );
                }
            }
        }

        // Seed Student Attendance (Last 14 Days)
        console.log('Seeding 14 days of student attendance records...');
        const statuses = ['present', 'present', 'present', 'present', 'present', 'present', 'online', 'absent', 'leave'];
        const now = DateTime.now();

        for (let dayOffset = 13; dayOffset >= 0; dayOffset--) {
            const date = now.minus({ days: dayOffset });
            const dayName = date.setLocale('en').toFormat('cccc');
            if (dayName === 'Sunday') continue;

            const dateStr = date.toISODate();

            for (const cls of classes) {
                const studentList = studentsByClass[cls.id] || [];
                const [crUserList] = await db.execute('SELECT u.id FROM users u JOIN students s ON s.user_id = u.id WHERE s.class_id = ? AND u.role = "عریف" AND u.tenant_id = ? LIMIT 1', [cls.id, tenantId]);
                const markedBy = crUserList.length > 0 ? crUserList[0].id : 2;

                for (const studentId of studentList) {
                    const status = statuses[(studentId * 3 + dayOffset) % statuses.length];
                    await db.execute(
                        'INSERT IGNORE INTO attendance_students (student_id, date, status, marked_by, tenant_id) VALUES (?, ?, ?, ?, ?)',
                        [studentId, dateStr, status, markedBy, tenantId]
                    );
                }
            }
        }

        // Seed Teacher Attendance (Last 14 Days)
        console.log('Seeding 14 days of teacher attendance records...');
        const [periodCounts] = await db.execute(
            'SELECT teacher_id, class_id, day_of_week, COUNT(*) as p_count FROM periods WHERE tenant_id = ? GROUP BY teacher_id, class_id, day_of_week',
            [tenantId]
        );
        
        const scheduleMap = {};
        for (const row of periodCounts) {
            const key = `${row.teacher_id}_${row.class_id}_${row.day_of_week}`;
            scheduleMap[key] = row.p_count;
        }

        const highlyAbsentTeacher = teacherIds[8 % teacherIds.length];
        const occasionallyAbsentTeachers = [teacherIds[1 % teacherIds.length], teacherIds[2 % teacherIds.length]];

        for (let dayOffset = 13; dayOffset >= 0; dayOffset--) {
            const date = now.minus({ days: dayOffset });
            const dayName = date.setLocale('en').toFormat('cccc');
            if (dayName === 'Sunday') continue;

            const dateStr = date.toISODate();

            for (const cls of classes) {
                const classAssignments = assignmentsByClass[cls.id] || [];
                for (const assign of classAssignments) {
                    const schedKey = `${assign.teacherId}_${cls.id}_${dayName}`;
                    const scheduledPeriods = scheduleMap[schedKey] || 0;

                    if (scheduledPeriods === 0) continue;

                    let classesTaken = scheduledPeriods;
                    let status = 'present';

                    if (assign.teacherId === highlyAbsentTeacher) {
                        if ([1, 4, 7, 10, 12].includes(dayOffset)) {
                            classesTaken = 0;
                            status = 'absent';
                        }
                    } else if (occasionallyAbsentTeachers.includes(assign.teacherId)) {
                        if (dayOffset === 3) {
                            classesTaken = Math.max(0, scheduledPeriods - 1);
                            status = classesTaken > 0 ? 'present' : 'absent';
                        } else if (dayOffset === 9) {
                            classesTaken = 0;
                            status = 'absent';
                        }
                    }

                    await db.execute(
                        'INSERT IGNORE INTO attendance_teachers (teacher_id, class_id, date, classes_taken, status, marked_by, tenant_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                        [assign.teacherId, cls.id, dateStr, classesTaken, status, 2, tenantId]
                    );
                }
            }
        }

        // Seed Book Progress Slope (Last 14 Days)
        console.log('Seeding daily book progress records (slopes)...');
        for (const assignmentId of assignmentIds) {
            const startPage = Math.floor(15 + (assignmentId * 19) % 180);
            const dailyRate = 2 + (assignmentId % 4) * 2;
            let page = startPage;
            for (let dayOffset = 13; dayOffset >= 0; dayOffset--) {
                const date = now.minus({ days: dayOffset });
                const dayName = date.setLocale('en').toFormat('cccc');
                if (dayName === 'Sunday') continue;

                const dailyVar = (dayOffset % 2 === 0) ? 1 : 0;
                page += (dailyRate + dailyVar);

                await db.execute(
                    'INSERT IGNORE INTO book_progress (assignment_id, date, page_number, marked_by, tenant_id) VALUES (?, ?, ?, ?, ?)',
                    [assignmentId, date.toISODate(), page, 2, tenantId]
                );
            }
            await db.execute(
                'UPDATE teacher_books SET current_page = ? WHERE id = ? AND tenant_id = ?',
                [page, assignmentId, tenantId]
            );
        }

        console.log(`✅ Comprehensive demo data seeded successfully for Tenant ${tenantId}!`);
    } catch (err) {
        console.error('❌ Error seeding demo data:', err.message, err.stack);
        throw err;
    }
}

module.exports = { seedDemoForTenant };

if (require.main === module) {
    const isProduction = process.env.NODE_ENV === 'production';
    const jobs = [seedDemoForTenant(1)];
    if (!isProduction) {
        jobs.push(seedDemoForTenant(2));
    }
    
    Promise.all(jobs)
        .then(() => {
            console.log(`Demo seeding CLI script completed for ${isProduction ? 'production (Tenant 1 only)' : 'development (both tenants)'}.`);
            process.exit(0);
        })
        .catch(err => {
            console.error('Demo seeding CLI script failed:', err);
            process.exit(1);
        });
}

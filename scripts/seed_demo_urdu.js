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

// Standard Dars-e-Nizami Books per class
const booksByClass = {
    2: ['صرف بہائی', 'نحو میر', 'جمال القرآن', 'طریقہ جدیدہ'], // الأولى
    4: ['علم الصيغة', 'علم النحو', 'القدوري الأول', 'خلاصۃ النحو'], // الثانية
    6: ['اصول الشاشی', 'شرح مائۃ عامل', 'نور الایضاح', 'نفحۃ الیمن'], // الثالثة
    8: ['کنز الدقائق', 'شرح جامی', 'تلخیص المفتاح', 'القدوري الثاني'], // الرابعة
    10: ['ہدایہ اول', 'عقیدۃ الطحاویہ', 'تفسير الجلالين الأول', 'دیوان المتنبي'], // الخامسة
    12: ['ہدایہ ثالث', 'نور الانوار', 'تفسير الجلالين الثاني', 'مختصر المعاني'], // السادسة
    14: ['مشکوۃ المصابیح', 'ہدایہ اخیرین', 'شرح العقائد النسفیہ', 'السراجی فی المیراث'], // السابعة
    16: ['صحيح البخاري', 'صحيح مسلم', 'جامع الترمذي', 'سنن أبي داود', 'سنن النسائي', 'سنن ابن ماجہ'] // دورة حديث
};

function generateUniqueName(classId, index) {
    const fn = firstNames[(classId * 7 + index * 3) % firstNames.length];
    const ln = lastNames[(classId * 5 + index * 7) % lastNames.length];
    return `${fn} ${ln}`;
}

async function seedDemo() {
    console.log('Seeding clean, realistic Urdu/Arabic demo data for all 8 classes...');
    try {
        console.log('Clearing old records...');
        await db.execute('DELETE FROM attendance_students');
        await db.execute('DELETE FROM attendance_teachers');
        await db.execute('DELETE FROM book_progress');
        await db.execute('DELETE FROM periods');
        await db.execute('DELETE FROM teacher_books');
        await db.execute('DELETE FROM student_enrollments');
        await db.execute('DELETE FROM books');
        await db.execute('DELETE FROM students');
        await db.execute('DELETE FROM teachers');
        await db.execute('DELETE FROM users WHERE username != "مدیر"');

        // Seed Supervisor (ناظم)
        console.log('Seeding supervisor (ناظم)...');
        const supervisorHash = await bcrypt.hash('1234', 10);
        await db.execute(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            ['ناظم', supervisorHash, 'ناظم']
        );

        const activeSessionId = 1;

        // 1. Fetch Classes (ensure we have 8 classes)
        const [classes] = await db.execute('SELECT * FROM classes ORDER BY id ASC');
        if (classes.length === 0) {
            console.error('No classes found in classes table. Run migrations first.');
            process.exit(1);
        }
        console.log(`Found ${classes.length} classes.`);

        // 2. Seed Teachers
        console.log('Seeding 10 teachers...');
        const teacherIds = [];
        for (let i = 0; i < teacherNames.length; i++) {
            const name = teacherNames[i];
            const subject = subjects[i % subjects.length];
            // Use Urdu username 'استاذ' for the first teacher for the demo
            const username = (i === 0) ? 'استاذ' : `teacher_${i + 1}`;
            const hash = await bcrypt.hash('1234', 10);
            
            const [uRes] = await db.execute(
                'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                [username, hash, 'أستاذ']
            );
            
            const [tRes] = await db.execute(
                'INSERT INTO teachers (name, subject, user_id, id_number) VALUES (?, ?, ?, ?)',
                [name, subject, uRes.insertId, `T-26-${100 + i}`]
            );
            teacherIds.push(tRes.insertId);
        }

        // 3. Seed 10 Students per Class (80 Students Total)
        console.log('Seeding 80 students (10 per class)...');
        const studentIds = [];
        const studentsByClass = {};
        
        for (const cls of classes) {
            studentsByClass[cls.id] = [];
            for (let i = 0; i < 10; i++) {
                const name = generateUniqueName(cls.id, i);
                // Assign Urdu username 'عریف' to the first class's CR, and 'طالب' to the second student
                let username = `student_${cls.id}_${i + 1}`;
                if (cls.id === 2) {
                    if (i === 0) username = 'عریف';
                    else if (i === 1) username = 'طالب';
                }
                const hash = await bcrypt.hash('1234', 10);
                
                // Select every 10th student as class CR (عريف)
                const role = (i === 0) ? 'عريف' : 'طالب';

                const [uRes] = await db.execute(
                    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                    [username, hash, role]
                );

                const [sRes] = await db.execute(
                    'INSERT INTO students (name, class_id, roll_number, user_id) VALUES (?, ?, ?, ?)',
                    [name, cls.id, `S-26-${cls.id}${10 + i}`, uRes.insertId]
                );

                studentIds.push(sRes.insertId);
                studentsByClass[cls.id].push(sRes.insertId);

                // Enroll student in active session
                await db.execute(
                    'INSERT INTO student_enrollments (student_id, class_id, session_id) VALUES (?, ?, ?)',
                    [sRes.insertId, cls.id, activeSessionId]
                );
            }
        }

        // 4. Seed Dars-e-Nizami Books & Assign to Teachers
        console.log('Seeding Dars-e-Nizami books and assigning to teachers...');
        const assignmentIds = [];
        const assignmentsByClass = {};

        for (const cls of classes) {
            assignmentsByClass[cls.id] = [];
            const bookTitles = booksByClass[cls.id] || ['كتاب عام'];
            for (let idx = 0; idx < bookTitles.length; idx++) {
                const title = bookTitles[idx];
                
                // Insert book
                const [bRes] = await db.execute(
                    'INSERT INTO books (title, class_id) VALUES (?, ?)',
                    [title, cls.id]
                );
                
                // Assign to a teacher round-robin
                const teacherId = teacherIds[(cls.id * 3 + idx) % teacherIds.length];
                const [tbRes] = await db.execute(
                    'INSERT INTO teacher_books (teacher_id, book_id, session_id, start_page, end_page, current_page, class_id) VALUES (?, ?, ?, 1, 300, 1, ?)',
                    [teacherId, bRes.insertId, activeSessionId, cls.id]
                );
                
                assignmentIds.push(tbRes.insertId);
                assignmentsByClass[cls.id].push({
                    id: tbRes.insertId,
                    teacherId,
                    subject: title
                });
            }
        }

        // 5. Seed Timetable Periods (5 periods per day, Monday to Saturday)
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
                        'INSERT INTO periods (teacher_id, class_id, day_of_week, start_time, end_time, subject, assignment_id, period_number, session_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [assign.teacherId, cls.id, day, startTimes[pNum], endTimes[pNum], assign.subject, assign.id, pNum, activeSessionId]
                    );
                }
            }
        }

        // 6. Seed Student Attendance (Last 14 Days)
        console.log('Seeding 14 days of student attendance records...');
        const statuses = ['present', 'present', 'present', 'present', 'present', 'present', 'online', 'absent', 'leave']; // ~80% attendance rate
        const now = DateTime.now();

        for (let dayOffset = 13; dayOffset >= 0; dayOffset--) {
            const date = now.minus({ days: dayOffset });
            const dayName = date.setLocale('en').toFormat('cccc');
            if (dayName === 'Sunday') continue; // Skip Sundays

            const dateStr = date.toISODate();

            for (const cls of classes) {
                const studentList = studentsByClass[cls.id] || [];
                const crUserList = await db.execute('SELECT u.id FROM users u JOIN students s ON s.user_id = u.id WHERE s.class_id = ? AND u.role = "عريف" LIMIT 1', [cls.id]);
                const markedBy = crUserList[0].length > 0 ? crUserList[0][0].id : 2; // Marked by CR or default Admin

                for (const studentId of studentList) {
                    const status = statuses[(studentId * 3 + dayOffset) % statuses.length];
                    await db.execute(
                        'INSERT IGNORE INTO attendance_students (student_id, date, status, marked_by) VALUES (?, ?, ?, ?)',
                        [studentId, dateStr, status, markedBy]
                    );
                }
            }
        }

        // 7. Seed Teacher Attendance (Last 14 Days)
        console.log('Seeding 14 days of realistic teacher attendance records...');
        // Query the timetable to map exactly how many periods each teacher has per class per day_of_week
        const [periodCounts] = await db.execute(
            'SELECT teacher_id, class_id, day_of_week, COUNT(*) as p_count FROM periods GROUP BY teacher_id, class_id, day_of_week'
        );
        
        // Build a lookup map: teacher_class_day -> count
        const scheduleMap = {};
        for (const row of periodCounts) {
            const key = `${row.teacher_id}_${row.class_id}_${row.day_of_week}`;
            scheduleMap[key] = row.p_count;
        }

        // Identify specific teachers for demo cases
        const highlyAbsentTeacher = teacherIds[8 % teacherIds.length]; // Teacher 9
        const occasionallyAbsentTeachers = [teacherIds[1 % teacherIds.length], teacherIds[2 % teacherIds.length]]; // Teachers 2 and 3

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

                    // If teacher is not scheduled to teach this class today, skip
                    if (scheduledPeriods === 0) continue;

                    let classesTaken = scheduledPeriods;
                    let status = 'present';

                    // Apply mock absenteeism rules
                    if (assign.teacherId === highlyAbsentTeacher) {
                        // Highly absent teacher: absent on 5 of the 14 days
                        if ([1, 4, 7, 10, 12].includes(dayOffset)) {
                            classesTaken = 0;
                            status = 'absent';
                        }
                    } else if (occasionallyAbsentTeachers.includes(assign.teacherId)) {
                        // Occasionally absent teachers: miss 1-2 classes total across the 14 days
                        if (dayOffset === 3) {
                            classesTaken = Math.max(0, scheduledPeriods - 1);
                            status = classesTaken > 0 ? 'present' : 'absent';
                        } else if (dayOffset === 9) {
                            classesTaken = 0;
                            status = 'absent';
                        }
                    }

                    await db.execute(
                        'INSERT IGNORE INTO attendance_teachers (teacher_id, class_id, date, classes_taken, status, marked_by) VALUES (?, ?, ?, ?, ?, ?)',
                        [assign.teacherId, cls.id, dateStr, classesTaken, status, 2]
                    );
                }
            }
        }

        // 8. Seed Book Progress Slope (Last 14 Days)
        console.log('Seeding daily book progress records (slopes)...');
        for (const assignmentId of assignmentIds) {
            // Distinct starting pages and progress rates for different books/teachers
            const startPage = Math.floor(15 + (assignmentId * 19) % 180);
            const dailyRate = 2 + (assignmentId % 4) * 2; // increments of 2, 4, 6, 8 pages
            let page = startPage;
            for (let dayOffset = 13; dayOffset >= 0; dayOffset--) {
                const date = now.minus({ days: dayOffset });
                const dayName = date.setLocale('en').toFormat('cccc');
                if (dayName === 'Sunday') continue;

                // Add random small variation to pace
                const dailyVar = (dayOffset % 2 === 0) ? 1 : 0;
                page += (dailyRate + dailyVar);

                await db.execute(
                    'INSERT IGNORE INTO book_progress (assignment_id, date, page_number, marked_by) VALUES (?, ?, ?, ?)',
                    [assignmentId, date.toISODate(), page, 2]
                );
            }
            // Update current page on the assignment
            await db.execute(
                'UPDATE teacher_books SET current_page = ? WHERE id = ?',
                [page, assignmentId]
            );
        }

        console.log('✅ Comprehensive demo data seeded successfully with Urdu/Arabic records for all 8 classes!');
    } catch (err) {
        console.error('❌ Error seeding demo data:', err.message, err.stack);
    }
    process.exit(0);
}

seedDemo();

SET FOREIGN_KEY_CHECKS=0;
BEGIN;

-- 1. Delete Demo Attendance & Progress
DELETE FROM attendance_students WHERE student_id IN (SELECT id FROM students WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'student_%' OR username IN ('عریف', 'طالب')));
DELETE FROM attendance_teachers WHERE teacher_id IN (SELECT id FROM teachers WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'teacher_%' OR username = 'استاذ'));
DELETE FROM book_progress WHERE assignment_id IN (SELECT id FROM teacher_books WHERE teacher_id IN (SELECT id FROM teachers WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'teacher_%' OR username = 'استاذ')));

-- 2. Delete Demo Periods & Enrollments
DELETE FROM periods WHERE subject IN ('اللغة الفارسية / التوضيح', 'التجويد والسيرة / الهداية', 'تفسير / الأدب', 'الصرف / أصول الفقه', 'النحو / القدوري / النسائي', 'المنطق / شرح العقائد / البخاري', 'الهداية / الترمذي', 'التوضيح / الترمذي', 'علم الصيغة / سنن أبي داود', 'شمائل الترمذي', 'كتاب عام');
DELETE FROM student_enrollments WHERE student_id IN (SELECT id FROM students WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'student_%' OR username IN ('عریف', 'طالب')));
DELETE FROM teacher_books WHERE teacher_id IN (SELECT id FROM teachers WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'teacher_%' OR username = 'استاذ'));

-- 3. Delete Demo Books
DELETE FROM books WHERE title IN ('صرف بہائی', 'نحو میر', 'جمال القرآن', 'طریقہ جدیدہ', 'علم الصيغة', 'علم النحو', 'القدوري الأول', 'خلاصۃ النحو', 'اصول الشاشی', 'شرح مائۃ عامل', 'نور الایضاح', 'نفحۃ الیمن', 'کنز الدقائق', 'شرح جامی', 'تلخیص المفتاح', 'القدوري الثاني', 'ہدایہ اول', 'عقیدۃ الطحاویہ', 'تفسير الجلالين الأول', 'دیوان المتنبي', 'ہدایہ ثالث', 'نور الانوار', 'تفسير الجلالين الثاني', 'مختصر المعاني', 'مشکوۃ المصابیح', 'ہدایہ اخیرین', 'شرح العقائد النسفیہ', 'السراجی فی المیراث', 'صحيح البخاري', 'صحيح مسلم', 'جامع الترمذي', 'سنن أبي داود', 'سنن النسائي', 'سنن ابن ماجہ', 'كتاب عام');

-- 4. Delete Demo Students & Teachers
DELETE FROM students WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'student_%' OR username IN ('عریف', 'طالب'));
DELETE FROM teachers WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'teacher_%' OR username = 'استاذ');

-- 5. Delete Demo Classes & Sessions
DELETE FROM classes WHERE name_en IN ('Aula', 'Sania', 'Salisa', 'Rabia', 'Khamisa', 'Sadisa', 'Sabiya', 'Daura Hadith');
DELETE FROM sessions WHERE name = '2026-2027';

-- 6. Delete Demo Users
DELETE FROM users WHERE username LIKE 'student_%' OR username LIKE 'teacher_%' OR username IN ('مدیر', 'ناظم', 'استاذ', 'عریف', 'طالب');

-- 7. Delete Demo Role Permissions
DELETE FROM role_permissions WHERE role IN ('مدير', 'ناظم', 'عریف', 'أستاذ', 'طالب');

COMMIT;
SET FOREIGN_KEY_CHECKS=1;

SET FOREIGN_KEY_CHECKS=0;
BEGIN;

-- Only delete the fake demo users, students, and teachers. Leave classes and books alone!
DELETE FROM attendance_students WHERE student_id IN (SELECT id FROM students WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'student_%' OR username IN ('عریف', 'طالب')));
DELETE FROM attendance_teachers WHERE teacher_id IN (SELECT id FROM teachers WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'teacher_%' OR username = 'استاذ'));
DELETE FROM book_progress WHERE assignment_id IN (SELECT id FROM teacher_books WHERE teacher_id IN (SELECT id FROM teachers WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'teacher_%' OR username = 'استاذ')));
DELETE FROM periods WHERE teacher_id IN (SELECT id FROM teachers WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'teacher_%' OR username = 'استاذ'));
DELETE FROM student_enrollments WHERE student_id IN (SELECT id FROM students WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'student_%' OR username IN ('عریف', 'طالب')));
DELETE FROM teacher_books WHERE teacher_id IN (SELECT id FROM teachers WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'teacher_%' OR username = 'استاذ'));

DELETE FROM students WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'student_%' OR username IN ('عریف', 'طالب'));
DELETE FROM teachers WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'teacher_%' OR username = 'استاذ');

DELETE FROM users WHERE username LIKE 'student_%' OR username LIKE 'teacher_%' OR username IN ('مدیر', 'ناظم', 'استاذ', 'عریف', 'طالب');
DELETE FROM role_permissions WHERE role IN ('مدير', 'ناظم', 'عریف', 'أستاذ', 'طالب');

COMMIT;
SET FOREIGN_KEY_CHECKS=1;

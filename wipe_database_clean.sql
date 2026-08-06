SET FOREIGN_KEY_CHECKS=0;

-- Wipe all transactional and relation tables
DELETE FROM attendance_students;
DELETE FROM attendance_teachers;
DELETE FROM book_progress;
DELETE FROM periods;
DELETE FROM student_enrollments;
DELETE FROM teacher_books;
DELETE FROM student_results;
DELETE FROM exam_papers;
DELETE FROM questions;
DELETE FROM exams;

-- Wipe all entity tables
DELETE FROM books;
DELETE FROM students;
DELETE FROM teachers;
DELETE FROM classes;
DELETE FROM sessions;

-- Wipe all users except the Admin (mudeer) so you can still log in
DELETE FROM users WHERE username NOT IN ('mudeer', 'مدیر', 'admin');
DELETE FROM role_permissions WHERE role NOT IN ('مدير', 'admin');

SET FOREIGN_KEY_CHECKS=1;

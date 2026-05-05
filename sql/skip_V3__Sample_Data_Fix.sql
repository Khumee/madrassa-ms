-- Delete existing sample data to avoid conflicts
DELETE FROM `attendance_students` WHERE student_id <= 5;
DELETE FROM `students` WHERE id <= 5;

-- Re-insert clean sample data for Class 6
INSERT INTO `students` (id, name, class_id, roll_number) VALUES (1, 'خرم شہزاد', 6, '۱');
INSERT INTO `students` (id, name, class_id, roll_number) VALUES (2, 'کمال محمر', 6, '۲');
INSERT INTO `students` (id, name, class_id, roll_number) VALUES (3, 'محمد عبداللہ', 6, '۳');
INSERT INTO `students` (id, name, class_id, roll_number) VALUES (4, 'بسام ارشاد', 6, '۴');
INSERT INTO `students` (id, name, class_id, roll_number) VALUES (5, 'خالد رشید کاظمی', 6, '۵');

-- Attendance for Class 6 (April 27, 28, 29)
INSERT INTO `attendance_students` (student_id, date, status) VALUES (1, '2026-04-27', 'present');
INSERT INTO `attendance_students` (student_id, date, status) VALUES (2, '2026-04-27', 'present');
INSERT INTO `attendance_students` (student_id, date, status) VALUES (3, '2026-04-27', 'present');
INSERT INTO `attendance_students` (student_id, date, status) VALUES (4, '2026-04-27', 'present');
INSERT INTO `attendance_students` (student_id, date, status) VALUES (5, '2026-04-27', 'present');

INSERT INTO `attendance_students` (student_id, date, status) VALUES (1, '2026-04-28', 'present');
INSERT INTO `attendance_students` (student_id, date, status) VALUES (2, '2026-04-28', 'present');
INSERT INTO `attendance_students` (student_id, date, status) VALUES (3, '2026-04-28', 'present');
INSERT INTO `attendance_students` (student_id, date, status) VALUES (4, '2026-04-28', 'present');
INSERT INTO `attendance_students` (student_id, date, status) VALUES (5, '2026-04-28', 'online');

INSERT INTO `attendance_students` (student_id, date, status) VALUES (1, '2026-04-29', 'present');
INSERT INTO `attendance_students` (student_id, date, status) VALUES (2, '2026-04-29', 'present');
INSERT INTO `attendance_students` (student_id, date, status) VALUES (3, '2026-04-29', 'present');
INSERT INTO `attendance_students` (student_id, date, status) VALUES (4, '2026-04-29', 'present');
INSERT INTO `attendance_students` (student_id, date, status) VALUES (5, '2026-04-29', 'present');

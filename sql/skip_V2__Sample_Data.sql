-- Sample Students for Sadisa (Class 6)
INSERT IGNORE INTO `students` (id, name, class_id, roll_number) VALUES (1, 'خرم شہزاد', 6, '۱');
INSERT IGNORE INTO `students` (id, name, class_id, roll_number) VALUES (2, 'کمال محمر', 6, '۲');
INSERT IGNORE INTO `students` (id, name, class_id, roll_number) VALUES (3, 'محمد عبداللہ', 6, '۳');
INSERT IGNORE INTO `students` (id, name, class_id, roll_number) VALUES (4, 'بسام ارشاد', 6, '۴');
INSERT IGNORE INTO `students` (id, name, class_id, roll_number) VALUES (5, 'خالد رشید کاظمی', 6, '۵');

-- Sample Attendance
INSERT IGNORE INTO `attendance_students` (id, student_id, date, status) VALUES (11, 1, '2026-04-28', 'present');
INSERT IGNORE INTO `attendance_students` (id, student_id, date, status) VALUES (12, 2, '2026-04-28', 'present');
INSERT IGNORE INTO `attendance_students` (id, student_id, date, status) VALUES (13, 3, '2026-04-28', 'present');
INSERT IGNORE INTO `attendance_students` (id, student_id, date, status) VALUES (14, 4, '2026-04-28', 'present');
INSERT IGNORE INTO `attendance_students` (id, student_id, date, status) VALUES (15, 5, '2026-04-28', 'online');

INSERT IGNORE INTO `attendance_students` (id, student_id, date, status) VALUES (16, 1, '2026-04-27', 'present');
INSERT IGNORE INTO `attendance_students` (id, student_id, date, status) VALUES (17, 2, '2026-04-27', 'present');
INSERT IGNORE INTO `attendance_students` (id, student_id, date, status) VALUES (18, 3, '2026-04-27', 'present');
INSERT IGNORE INTO `attendance_students` (id, student_id, date, status) VALUES (19, 4, '2026-04-27', 'present');
INSERT IGNORE INTO `attendance_students` (id, student_id, date, status) VALUES (20, 5, '2026-04-27', 'present');

INSERT IGNORE INTO `attendance_students` (id, student_id, date, status) VALUES (26, 1, '2026-04-29', 'present');
INSERT IGNORE INTO `attendance_students` (id, student_id, date, status) VALUES (27, 2, '2026-04-29', 'present');
INSERT IGNORE INTO `attendance_students` (id, student_id, date, status) VALUES (28, 3, '2026-04-29', 'present');
INSERT IGNORE INTO `attendance_students` (id, student_id, date, status) VALUES (29, 4, '2026-04-29', 'present');
INSERT IGNORE INTO `attendance_students` (id, student_id, date, status) VALUES (30, 5, '2026-04-29', 'present');

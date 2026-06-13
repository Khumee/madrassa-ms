SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Records of role_permissions
-- ----------------------------
INSERT INTO `role_permissions` VALUES (2, 'مدير', 'reports', 1);
INSERT INTO `role_permissions` VALUES (4, 'ناظم', 'reports', 1);
INSERT INTO `role_permissions` VALUES (6, 'عريف', 'reports', 1);
INSERT INTO `role_permissions` VALUES (8, 'أستاذ', 'reports', 0);
INSERT INTO `role_permissions` VALUES (10, 'طالب', 'reports', 0);
INSERT INTO `role_permissions` VALUES (12, 'مدير', 'books_manage', 1);
INSERT INTO `role_permissions` VALUES (14, 'ناظم', 'books_manage', 0);
INSERT INTO `role_permissions` VALUES (16, 'عريف', 'books_manage', 0);
INSERT INTO `role_permissions` VALUES (18, 'أستاذ', 'books_manage', 0);
INSERT INTO `role_permissions` VALUES (20, 'طالب', 'books_manage', 0);
INSERT INTO `role_permissions` VALUES (22, 'مدير', 'users_manage', 1);
INSERT INTO `role_permissions` VALUES (24, 'ناظم', 'users_manage', 0);
INSERT INTO `role_permissions` VALUES (26, 'عريف', 'users_manage', 0);
INSERT INTO `role_permissions` VALUES (28, 'أستاذ', 'users_manage', 0);
INSERT INTO `role_permissions` VALUES (30, 'طالب', 'users_manage', 0);
INSERT INTO `role_permissions` VALUES (32, 'مدير', 'students_manage', 1);
INSERT INTO `role_permissions` VALUES (34, 'ناظم', 'students_manage', 1);
INSERT INTO `role_permissions` VALUES (36, 'عريف', 'students_manage', 1);
INSERT INTO `role_permissions` VALUES (38, 'أستاذ', 'students_manage', 0);
INSERT INTO `role_permissions` VALUES (40, 'طالب', 'students_manage', 0);
INSERT INTO `role_permissions` VALUES (42, 'مدير', 'student_attendance', 1);
INSERT INTO `role_permissions` VALUES (44, 'ناظم', 'student_attendance', 1);
INSERT INTO `role_permissions` VALUES (46, 'عريف', 'student_attendance', 1);
INSERT INTO `role_permissions` VALUES (48, 'أستاذ', 'student_attendance', 0);
INSERT INTO `role_permissions` VALUES (50, 'طالب', 'student_attendance', 0);
INSERT INTO `role_permissions` VALUES (52, 'مدير', 'teachers_manage', 1);
INSERT INTO `role_permissions` VALUES (54, 'ناظم', 'teachers_manage', 1);
INSERT INTO `role_permissions` VALUES (56, 'عريف', 'teachers_manage', 0);
INSERT INTO `role_permissions` VALUES (58, 'أستاذ', 'teachers_manage', 0);
INSERT INTO `role_permissions` VALUES (60, 'طالب', 'teachers_manage', 0);
INSERT INTO `role_permissions` VALUES (62, 'مدير', 'teacher_attendance', 1);
INSERT INTO `role_permissions` VALUES (64, 'ناظم', 'teacher_attendance', 1);
INSERT INTO `role_permissions` VALUES (66, 'عريف', 'teacher_attendance', 1);
INSERT INTO `role_permissions` VALUES (68, 'أستاذ', 'teacher_attendance', 0);
INSERT INTO `role_permissions` VALUES (70, 'طالب', 'teacher_attendance', 0);
INSERT INTO `role_permissions` VALUES (72, 'مدير', 'teacher_books_manage', 1);
INSERT INTO `role_permissions` VALUES (74, 'ناظم', 'teacher_books_manage', 0);
INSERT INTO `role_permissions` VALUES (76, 'عريف', 'teacher_books_manage', 0);
INSERT INTO `role_permissions` VALUES (78, 'أستاذ', 'teacher_books_manage', 0);
INSERT INTO `role_permissions` VALUES (80, 'طالب', 'teacher_books_manage', 0);
INSERT INTO `role_permissions` VALUES (82, 'مدير', 'periods_manage', 1);
INSERT INTO `role_permissions` VALUES (84, 'ناظم', 'periods_manage', 0);
INSERT INTO `role_permissions` VALUES (86, 'عريف', 'periods_manage', 0);
INSERT INTO `role_permissions` VALUES (88, 'أستاذ', 'periods_manage', 0);
INSERT INTO `role_permissions` VALUES (90, 'طالب', 'periods_manage', 0);

-- ----------------------------
-- Records of classes
-- ----------------------------
INSERT INTO `classes` VALUES (2, 'الأولى', 'Aula');
INSERT INTO `classes` VALUES (4, 'الثانية', 'Sania');
INSERT INTO `classes` VALUES (6, 'الثالثة', 'Salisa');
INSERT INTO `classes` VALUES (8, 'الرابعة', 'Rabia');
INSERT INTO `classes` VALUES (10, 'الخامسة', 'Khamisa');
INSERT INTO `classes` VALUES (12, 'السادسة', 'Sadisa');
INSERT INTO `classes` VALUES (14, 'السابعة', 'Sabiya');
INSERT INTO `classes` VALUES (16, 'دورة حديث', 'Daura Hadith');

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES (1, '2026-2027', 1);

-- ----------------------------
-- Records of users (Default Administrator: مدیر / 1234)
-- ----------------------------
INSERT INTO `users` VALUES (2, 'مدیر', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'مدير', CURRENT_TIMESTAMP);

SET FOREIGN_KEY_CHECKS = 1;
/*
 Navicat Premium Data Transfer

 Source Server         : local-mysql
 Source Server Type    : MySQL
 Source Server Version : 80406
 Source Host           : localhost:3306
 Source Schema         : kui

 Target Server Type    : MySQL
 Target Server Version : 80406
 File Encoding         : 65001

 Date: 30/04/2026 14:48:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for attendance_students
-- ----------------------------
DROP TABLE IF EXISTS `attendance_students`;
CREATE TABLE `attendance_students`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NULL DEFAULT NULL,
  `date` date NOT NULL,
  `status` enum('present','absent','leave','online') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'present',
  `marked_by` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `student_date`(`student_id` ASC, `date` ASC) USING BTREE,
  INDEX `marked_by`(`marked_by` ASC) USING BTREE,
  CONSTRAINT `attendance_students_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `attendance_students_ibfk_2` FOREIGN KEY (`marked_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attendance_students
-- ----------------------------
INSERT INTO `attendance_students` VALUES (11, 1, '2026-04-28', 'present', 4);
INSERT INTO `attendance_students` VALUES (12, 2, '2026-04-28', 'present', 4);
INSERT INTO `attendance_students` VALUES (13, 3, '2026-04-28', 'present', 4);
INSERT INTO `attendance_students` VALUES (14, 4, '2026-04-28', 'present', 4);
INSERT INTO `attendance_students` VALUES (15, 5, '2026-04-28', 'online', 4);
INSERT INTO `attendance_students` VALUES (16, 1, '2026-04-27', 'present', 4);
INSERT INTO `attendance_students` VALUES (17, 2, '2026-04-27', 'present', 4);
INSERT INTO `attendance_students` VALUES (18, 3, '2026-04-27', 'present', 4);
INSERT INTO `attendance_students` VALUES (19, 4, '2026-04-27', 'present', 4);
INSERT INTO `attendance_students` VALUES (20, 5, '2026-04-27', 'present', 4);
INSERT INTO `attendance_students` VALUES (26, 1, '2026-04-29', 'present', 4);
INSERT INTO `attendance_students` VALUES (27, 2, '2026-04-29', 'present', 4);
INSERT INTO `attendance_students` VALUES (28, 3, '2026-04-29', 'present', 4);
INSERT INTO `attendance_students` VALUES (29, 4, '2026-04-29', 'present', 4);
INSERT INTO `attendance_students` VALUES (30, 5, '2026-04-29', 'present', 4);

-- ----------------------------
-- Table structure for attendance_teachers
-- ----------------------------
DROP TABLE IF EXISTS `attendance_teachers`;
CREATE TABLE `attendance_teachers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacher_id` int NULL DEFAULT NULL,
  `date` date NOT NULL,
  `classes_taken` int NULL DEFAULT 0,
  `marked_by` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `teacher_date`(`teacher_id` ASC, `date` ASC) USING BTREE,
  INDEX `marked_by`(`marked_by` ASC) USING BTREE,
  CONSTRAINT `attendance_teachers_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `attendance_teachers_ibfk_2` FOREIGN KEY (`marked_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attendance_teachers
-- ----------------------------

-- ----------------------------
-- Table structure for classes
-- ----------------------------
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_ar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name_en` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classes
-- ----------------------------
INSERT INTO `classes` VALUES (1, 'الأولى', 'Aula');
INSERT INTO `classes` VALUES (2, 'الثانية', 'Sania');
INSERT INTO `classes` VALUES (3, 'الثالثة', 'Salisa');
INSERT INTO `classes` VALUES (4, 'الرابعة', 'Rabia');
INSERT INTO `classes` VALUES (5, 'الخامسة', 'Khamisa');
INSERT INTO `classes` VALUES (6, 'السادسة', 'Sadisa');
INSERT INTO `classes` VALUES (7, 'السابعة', 'Sabiya');
INSERT INTO `classes` VALUES (8, 'دورة حديث', 'Daura Hadith');

-- ----------------------------
-- Table structure for schema_history
-- ----------------------------
DROP TABLE IF EXISTS `schema_history`;
CREATE TABLE `schema_history`  (
  `version` int NOT NULL,
  `script_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `applied_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`version`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of schema_history
-- ----------------------------
INSERT INTO `schema_history` VALUES (1, 'V1__Initial_Schema.sql', '2026-04-30 12:49:25');

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `class_id` int NULL DEFAULT NULL,
  `roll_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `class_id`(`class_id` ASC) USING BTREE,
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES (1, 'خرم شہزاد', 6, '۱');
INSERT INTO `students` VALUES (2, 'کمال محمر', 6, '۲');
INSERT INTO `students` VALUES (3, 'محمد عبداللہ', 6, '۳');
INSERT INTO `students` VALUES (4, 'بسام ارشاد', 6, '۴');
INSERT INTO `students` VALUES (5, 'خالد رشید کاظمی', 6, '۵');

-- ----------------------------
-- Table structure for teachers
-- ----------------------------
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `subject` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 81 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teachers
-- ----------------------------
INSERT INTO `teachers` VALUES (71, 'مفتی مشرف بیگ اشرف', 'اللغة الفارسية / التوضيح');
INSERT INTO `teachers` VALUES (72, 'مولانا حبيب محبوب', 'التجويد والسيرة / الهداية');
INSERT INTO `teachers` VALUES (73, 'مولانا کمال', 'تفسير / الأدب');
INSERT INTO `teachers` VALUES (74, 'مولانا حسن', 'الصرف / أصول الفقه');
INSERT INTO `teachers` VALUES (75, 'مولانا عبد القادر عثمان', 'النحو / القدوري / النسائي');
INSERT INTO `teachers` VALUES (76, 'مفتی فرحان انور', 'المنطق / شرح العقائد / البخاري');
INSERT INTO `teachers` VALUES (77, 'مولانا حمزه', 'الهداية / الترمذي');
INSERT INTO `teachers` VALUES (78, 'مولانا قمر اعجاز', 'التوضيح / الترمذي');
INSERT INTO `teachers` VALUES (79, 'مولانا بارون خليل', 'علم الصيغة / سنن أبي داود');
INSERT INTO `teachers` VALUES (80, 'مولانا قمر علی شاہ', 'شمائل الترمذي');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` enum('admin','teacher') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'teacher',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '$2b$10$crd8jF6h7UsYzHCHQ8sEseLwspinNdOubzOs/jEge5tm0oFE9VJVe', 'admin', '2026-04-30 12:49:26');
INSERT INTO `users` VALUES (4, 'مدیر', '$2b$10$30qDoJ6wI9U9nPaIO3MfHu.0di6AB.3U11YKM/oKauEsT38ADASpi', 'admin', '2026-04-30 13:39:58');

SET FOREIGN_KEY_CHECKS = 1;

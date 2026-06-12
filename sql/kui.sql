/*
 Navicat Premium Data Transfer

 Source Server         : Nukrim
 Source Server Type    : MySQL
 Source Server Version : 80045
 Source Host           : localhost:3306
 Source Schema         : kui

 Target Server Type    : MySQL
 Target Server Version : 80045
 File Encoding         : 65001

 Date: 25/05/2026 11:20:58
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
  `status` enum('present','absent','leave','online') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'present',
  `marked_by` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `student_date`(`student_id` ASC, `date` ASC) USING BTREE,
  INDEX `marked_by`(`marked_by` ASC) USING BTREE,
  CONSTRAINT `attendance_students_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `attendance_students_ibfk_2` FOREIGN KEY (`marked_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 626 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attendance_students
-- ----------------------------
INSERT INTO `attendance_students` VALUES (32, 1, '2026-04-27', 'present', NULL);
INSERT INTO `attendance_students` VALUES (34, 2, '2026-04-27', 'present', NULL);
INSERT INTO `attendance_students` VALUES (36, 3, '2026-04-27', 'present', NULL);
INSERT INTO `attendance_students` VALUES (38, 4, '2026-04-27', 'present', NULL);
INSERT INTO `attendance_students` VALUES (40, 5, '2026-04-27', 'present', NULL);
INSERT INTO `attendance_students` VALUES (42, 1, '2026-04-28', 'present', NULL);
INSERT INTO `attendance_students` VALUES (44, 2, '2026-04-28', 'present', NULL);
INSERT INTO `attendance_students` VALUES (46, 3, '2026-04-28', 'present', NULL);
INSERT INTO `attendance_students` VALUES (48, 4, '2026-04-28', 'present', NULL);
INSERT INTO `attendance_students` VALUES (50, 5, '2026-04-28', 'online', NULL);
INSERT INTO `attendance_students` VALUES (52, 1, '2026-04-29', 'present', NULL);
INSERT INTO `attendance_students` VALUES (54, 2, '2026-04-29', 'present', NULL);
INSERT INTO `attendance_students` VALUES (56, 3, '2026-04-29', 'present', NULL);
INSERT INTO `attendance_students` VALUES (58, 4, '2026-04-29', 'present', NULL);
INSERT INTO `attendance_students` VALUES (60, 5, '2026-04-29', 'present', NULL);
INSERT INTO `attendance_students` VALUES (62, 6, '2026-04-30', 'present', 2);
INSERT INTO `attendance_students` VALUES (64, 8, '2026-04-30', 'online', 2);
INSERT INTO `attendance_students` VALUES (70, 10, '2026-04-30', 'present', 2);
INSERT INTO `attendance_students` VALUES (74, 16, '2026-04-30', 'present', 2);
INSERT INTO `attendance_students` VALUES (76, 18, '2026-04-30', 'leave', 2);
INSERT INTO `attendance_students` VALUES (78, 20, '2026-04-30', 'present', 2);
INSERT INTO `attendance_students` VALUES (80, 1, '2026-04-30', 'present', 2);
INSERT INTO `attendance_students` VALUES (82, 2, '2026-04-30', 'online', 2);
INSERT INTO `attendance_students` VALUES (84, 3, '2026-04-30', 'present', 2);
INSERT INTO `attendance_students` VALUES (86, 4, '2026-04-30', 'present', 2);
INSERT INTO `attendance_students` VALUES (88, 5, '2026-04-30', 'present', 2);
INSERT INTO `attendance_students` VALUES (90, 22, '2026-04-30', 'present', 2);
INSERT INTO `attendance_students` VALUES (92, 24, '2026-04-30', 'present', 2);
INSERT INTO `attendance_students` VALUES (94, 26, '2026-04-30', 'present', 2);
INSERT INTO `attendance_students` VALUES (96, 28, '2026-04-30', 'absent', 2);
INSERT INTO `attendance_students` VALUES (98, 30, '2026-04-30', 'absent', 2);
INSERT INTO `attendance_students` VALUES (100, 22, '2026-05-01', 'present', 2);
INSERT INTO `attendance_students` VALUES (102, 24, '2026-05-01', 'present', 2);
INSERT INTO `attendance_students` VALUES (104, 26, '2026-05-01', 'present', 2);
INSERT INTO `attendance_students` VALUES (106, 28, '2026-05-01', 'absent', 2);
INSERT INTO `attendance_students` VALUES (108, 30, '2026-05-01', 'absent', 2);
INSERT INTO `attendance_students` VALUES (110, 10, '2026-05-04', 'present', 2);
INSERT INTO `attendance_students` VALUES (114, 16, '2026-05-04', 'present', 2);
INSERT INTO `attendance_students` VALUES (116, 18, '2026-05-04', 'present', 2);
INSERT INTO `attendance_students` VALUES (118, 20, '2026-05-04', 'present', 2);
INSERT INTO `attendance_students` VALUES (130, 22, '2026-05-04', 'present', 2);
INSERT INTO `attendance_students` VALUES (132, 24, '2026-05-04', 'present', 2);
INSERT INTO `attendance_students` VALUES (134, 26, '2026-05-04', 'present', 2);
INSERT INTO `attendance_students` VALUES (136, 28, '2026-05-04', 'present', 2);
INSERT INTO `attendance_students` VALUES (138, 30, '2026-05-04', 'present', 2);
INSERT INTO `attendance_students` VALUES (140, 1, '2026-05-04', 'present', 2);
INSERT INTO `attendance_students` VALUES (142, 2, '2026-05-04', 'present', 2);
INSERT INTO `attendance_students` VALUES (144, 3, '2026-05-04', 'present', 2);
INSERT INTO `attendance_students` VALUES (146, 4, '2026-05-04', 'present', 2);
INSERT INTO `attendance_students` VALUES (148, 5, '2026-05-04', 'present', 2);
INSERT INTO `attendance_students` VALUES (150, 10, '2026-05-05', 'present', 44);
INSERT INTO `attendance_students` VALUES (152, 16, '2026-05-05', 'present', 44);
INSERT INTO `attendance_students` VALUES (154, 18, '2026-05-05', 'present', 44);
INSERT INTO `attendance_students` VALUES (156, 20, '2026-05-05', 'absent', 44);
INSERT INTO `attendance_students` VALUES (158, 22, '2026-05-06', 'present', 54);
INSERT INTO `attendance_students` VALUES (160, 24, '2026-05-06', 'present', 54);
INSERT INTO `attendance_students` VALUES (162, 26, '2026-05-06', 'present', 54);
INSERT INTO `attendance_students` VALUES (164, 28, '2026-05-06', 'present', 54);
INSERT INTO `attendance_students` VALUES (166, 30, '2026-05-06', 'present', 54);
INSERT INTO `attendance_students` VALUES (168, 10, '2026-05-06', 'present', 44);
INSERT INTO `attendance_students` VALUES (170, 16, '2026-05-06', 'present', 44);
INSERT INTO `attendance_students` VALUES (172, 18, '2026-05-06', 'present', 44);
INSERT INTO `attendance_students` VALUES (174, 20, '2026-05-06', 'present', 44);
INSERT INTO `attendance_students` VALUES (176, 22, '2026-05-05', 'present', 54);
INSERT INTO `attendance_students` VALUES (178, 24, '2026-05-05', 'present', 54);
INSERT INTO `attendance_students` VALUES (180, 26, '2026-05-05', 'present', 54);
INSERT INTO `attendance_students` VALUES (182, 28, '2026-05-05', 'present', 54);
INSERT INTO `attendance_students` VALUES (184, 30, '2026-05-05', 'present', 54);
INSERT INTO `attendance_students` VALUES (186, 6, '2026-05-04', 'present', 40);
INSERT INTO `attendance_students` VALUES (188, 8, '2026-05-04', 'online', 40);
INSERT INTO `attendance_students` VALUES (190, 6, '2026-05-05', 'present', 40);
INSERT INTO `attendance_students` VALUES (192, 8, '2026-05-05', 'online', 40);
INSERT INTO `attendance_students` VALUES (194, 6, '2026-05-06', 'present', 40);
INSERT INTO `attendance_students` VALUES (196, 8, '2026-05-06', 'online', 40);
INSERT INTO `attendance_students` VALUES (214, 10, '2026-05-07', 'present', 44);
INSERT INTO `attendance_students` VALUES (216, 16, '2026-05-07', 'present', 44);
INSERT INTO `attendance_students` VALUES (218, 18, '2026-05-07', 'present', 44);
INSERT INTO `attendance_students` VALUES (220, 20, '2026-05-07', 'present', 44);
INSERT INTO `attendance_students` VALUES (222, 22, '2026-05-07', 'present', 54);
INSERT INTO `attendance_students` VALUES (224, 24, '2026-05-07', 'present', 54);
INSERT INTO `attendance_students` VALUES (226, 26, '2026-05-07', 'present', 54);
INSERT INTO `attendance_students` VALUES (228, 28, '2026-05-07', 'present', 54);
INSERT INTO `attendance_students` VALUES (230, 30, '2026-05-07', 'present', 54);
INSERT INTO `attendance_students` VALUES (250, 32, '2026-05-07', 'present', 44);
INSERT INTO `attendance_students` VALUES (270, 32, '2026-05-06', 'present', 44);
INSERT INTO `attendance_students` VALUES (292, 6, '2026-05-07', 'present', 40);
INSERT INTO `attendance_students` VALUES (294, 8, '2026-05-07', 'online', 40);
INSERT INTO `attendance_students` VALUES (296, 22, '2026-05-08', 'present', 54);
INSERT INTO `attendance_students` VALUES (298, 24, '2026-05-08', 'present', 54);
INSERT INTO `attendance_students` VALUES (300, 26, '2026-05-08', 'present', 54);
INSERT INTO `attendance_students` VALUES (302, 28, '2026-05-08', 'present', 54);
INSERT INTO `attendance_students` VALUES (304, 30, '2026-05-08', 'present', 54);
INSERT INTO `attendance_students` VALUES (306, 1, '2026-05-08', 'present', 2);
INSERT INTO `attendance_students` VALUES (308, 2, '2026-05-08', 'present', 2);
INSERT INTO `attendance_students` VALUES (310, 3, '2026-05-08', 'present', 2);
INSERT INTO `attendance_students` VALUES (312, 4, '2026-05-08', 'present', 2);
INSERT INTO `attendance_students` VALUES (314, 5, '2026-05-08', 'present', 2);
INSERT INTO `attendance_students` VALUES (316, 1, '2026-05-07', 'present', 2);
INSERT INTO `attendance_students` VALUES (318, 2, '2026-05-07', 'online', 2);
INSERT INTO `attendance_students` VALUES (320, 3, '2026-05-07', 'present', 2);
INSERT INTO `attendance_students` VALUES (322, 4, '2026-05-07', 'present', 2);
INSERT INTO `attendance_students` VALUES (324, 5, '2026-05-07', 'present', 2);
INSERT INTO `attendance_students` VALUES (326, 1, '2026-05-06', 'present', 2);
INSERT INTO `attendance_students` VALUES (328, 2, '2026-05-06', 'present', 2);
INSERT INTO `attendance_students` VALUES (330, 3, '2026-05-06', 'present', 2);
INSERT INTO `attendance_students` VALUES (332, 4, '2026-05-06', 'present', 2);
INSERT INTO `attendance_students` VALUES (334, 5, '2026-05-06', 'present', 2);
INSERT INTO `attendance_students` VALUES (336, 1, '2026-05-05', 'present', 2);
INSERT INTO `attendance_students` VALUES (338, 2, '2026-05-05', 'absent', 2);
INSERT INTO `attendance_students` VALUES (340, 3, '2026-05-05', 'present', 2);
INSERT INTO `attendance_students` VALUES (342, 4, '2026-05-05', 'present', 2);
INSERT INTO `attendance_students` VALUES (344, 5, '2026-05-05', 'present', 2);
INSERT INTO `attendance_students` VALUES (346, 6, '2026-05-08', 'present', 40);
INSERT INTO `attendance_students` VALUES (348, 8, '2026-05-08', 'online', 40);
INSERT INTO `attendance_students` VALUES (350, 22, '2026-05-11', 'present', 54);
INSERT INTO `attendance_students` VALUES (352, 24, '2026-05-11', 'present', 54);
INSERT INTO `attendance_students` VALUES (354, 26, '2026-05-11', 'present', 54);
INSERT INTO `attendance_students` VALUES (356, 28, '2026-05-11', 'present', 54);
INSERT INTO `attendance_students` VALUES (358, 30, '2026-05-11', 'present', 54);
INSERT INTO `attendance_students` VALUES (360, 10, '2026-05-08', 'present', 44);
INSERT INTO `attendance_students` VALUES (362, 16, '2026-05-08', 'present', 44);
INSERT INTO `attendance_students` VALUES (364, 18, '2026-05-08', 'present', 44);
INSERT INTO `attendance_students` VALUES (366, 20, '2026-05-08', 'present', 44);
INSERT INTO `attendance_students` VALUES (368, 32, '2026-05-08', 'present', 44);
INSERT INTO `attendance_students` VALUES (370, 10, '2026-05-11', 'present', 44);
INSERT INTO `attendance_students` VALUES (372, 16, '2026-05-11', 'present', 44);
INSERT INTO `attendance_students` VALUES (374, 18, '2026-05-11', 'present', 44);
INSERT INTO `attendance_students` VALUES (376, 20, '2026-05-11', 'present', 44);
INSERT INTO `attendance_students` VALUES (378, 32, '2026-05-11', 'present', 44);
INSERT INTO `attendance_students` VALUES (380, 6, '2026-05-12', 'present', 40);
INSERT INTO `attendance_students` VALUES (382, 8, '2026-05-12', 'online', 40);
INSERT INTO `attendance_students` VALUES (384, 6, '2026-05-11', 'present', 40);
INSERT INTO `attendance_students` VALUES (386, 8, '2026-05-11', 'online', 40);
INSERT INTO `attendance_students` VALUES (388, 22, '2026-05-12', 'present', 54);
INSERT INTO `attendance_students` VALUES (390, 24, '2026-05-12', 'present', 54);
INSERT INTO `attendance_students` VALUES (392, 26, '2026-05-12', 'present', 54);
INSERT INTO `attendance_students` VALUES (394, 28, '2026-05-12', 'present', 54);
INSERT INTO `attendance_students` VALUES (396, 30, '2026-05-12', 'present', 54);
INSERT INTO `attendance_students` VALUES (398, 10, '2026-05-12', 'present', 44);
INSERT INTO `attendance_students` VALUES (400, 16, '2026-05-12', 'present', 44);
INSERT INTO `attendance_students` VALUES (402, 18, '2026-05-12', 'present', 44);
INSERT INTO `attendance_students` VALUES (404, 20, '2026-05-12', 'present', 44);
INSERT INTO `attendance_students` VALUES (406, 32, '2026-05-12', 'leave', 44);
INSERT INTO `attendance_students` VALUES (408, 10, '2026-05-13', 'present', 44);
INSERT INTO `attendance_students` VALUES (410, 16, '2026-05-13', 'present', 44);
INSERT INTO `attendance_students` VALUES (412, 18, '2026-05-13', 'present', 44);
INSERT INTO `attendance_students` VALUES (414, 20, '2026-05-13', 'absent', 44);
INSERT INTO `attendance_students` VALUES (416, 32, '2026-05-13', 'present', 44);
INSERT INTO `attendance_students` VALUES (448, 1, '2026-05-13', 'present', 30);
INSERT INTO `attendance_students` VALUES (450, 2, '2026-05-13', 'online', 30);
INSERT INTO `attendance_students` VALUES (452, 3, '2026-05-13', 'present', 30);
INSERT INTO `attendance_students` VALUES (454, 4, '2026-05-13', 'present', 30);
INSERT INTO `attendance_students` VALUES (456, 5, '2026-05-13', 'present', 30);
INSERT INTO `attendance_students` VALUES (458, 1, '2026-05-12', 'present', 30);
INSERT INTO `attendance_students` VALUES (460, 2, '2026-05-12', 'online', 30);
INSERT INTO `attendance_students` VALUES (462, 3, '2026-05-12', 'present', 30);
INSERT INTO `attendance_students` VALUES (464, 4, '2026-05-12', 'present', 30);
INSERT INTO `attendance_students` VALUES (466, 5, '2026-05-12', 'present', 30);
INSERT INTO `attendance_students` VALUES (468, 1, '2026-05-11', 'present', 30);
INSERT INTO `attendance_students` VALUES (470, 2, '2026-05-11', 'present', 30);
INSERT INTO `attendance_students` VALUES (472, 3, '2026-05-11', 'present', 30);
INSERT INTO `attendance_students` VALUES (474, 4, '2026-05-11', 'present', 30);
INSERT INTO `attendance_students` VALUES (476, 5, '2026-05-11', 'present', 30);
INSERT INTO `attendance_students` VALUES (478, 22, '2026-05-14', 'present', 54);
INSERT INTO `attendance_students` VALUES (480, 24, '2026-05-14', 'present', 54);
INSERT INTO `attendance_students` VALUES (482, 26, '2026-05-14', 'present', 54);
INSERT INTO `attendance_students` VALUES (484, 28, '2026-05-14', 'leave', 54);
INSERT INTO `attendance_students` VALUES (486, 30, '2026-05-14', 'present', 54);
INSERT INTO `attendance_students` VALUES (498, 22, '2026-05-13', 'present', 54);
INSERT INTO `attendance_students` VALUES (500, 24, '2026-05-13', 'present', 54);
INSERT INTO `attendance_students` VALUES (502, 26, '2026-05-13', 'present', 54);
INSERT INTO `attendance_students` VALUES (504, 28, '2026-05-13', 'present', 54);
INSERT INTO `attendance_students` VALUES (506, 30, '2026-05-13', 'present', 54);
INSERT INTO `attendance_students` VALUES (508, 1, '2026-05-15', 'present', 30);
INSERT INTO `attendance_students` VALUES (510, 2, '2026-05-15', 'leave', 30);
INSERT INTO `attendance_students` VALUES (512, 3, '2026-05-15', 'present', 30);
INSERT INTO `attendance_students` VALUES (514, 4, '2026-05-15', 'present', 30);
INSERT INTO `attendance_students` VALUES (516, 5, '2026-05-15', 'present', 30);
INSERT INTO `attendance_students` VALUES (518, 1, '2026-05-14', 'present', 30);
INSERT INTO `attendance_students` VALUES (520, 2, '2026-05-14', 'present', 30);
INSERT INTO `attendance_students` VALUES (522, 3, '2026-05-14', 'present', 30);
INSERT INTO `attendance_students` VALUES (524, 4, '2026-05-14', 'present', 30);
INSERT INTO `attendance_students` VALUES (526, 5, '2026-05-14', 'present', 30);
INSERT INTO `attendance_students` VALUES (528, 6, '2026-05-15', 'present', 40);
INSERT INTO `attendance_students` VALUES (530, 8, '2026-05-15', 'online', 40);
INSERT INTO `attendance_students` VALUES (536, 6, '2026-05-14', 'present', 40);
INSERT INTO `attendance_students` VALUES (538, 8, '2026-05-14', 'online', 40);
INSERT INTO `attendance_students` VALUES (540, 6, '2026-05-13', 'present', 40);
INSERT INTO `attendance_students` VALUES (542, 8, '2026-05-13', 'online', 40);
INSERT INTO `attendance_students` VALUES (548, 6, '2026-05-18', 'present', 2);
INSERT INTO `attendance_students` VALUES (550, 8, '2026-05-18', 'online', 2);
INSERT INTO `attendance_students` VALUES (552, 6, '2026-05-19', 'present', 2);
INSERT INTO `attendance_students` VALUES (554, 8, '2026-05-19', 'online', 2);
INSERT INTO `attendance_students` VALUES (556, 1, '2026-05-19', 'present', 30);
INSERT INTO `attendance_students` VALUES (558, 2, '2026-05-19', 'present', 30);
INSERT INTO `attendance_students` VALUES (560, 3, '2026-05-19', 'present', 30);
INSERT INTO `attendance_students` VALUES (562, 4, '2026-05-19', 'present', 30);
INSERT INTO `attendance_students` VALUES (564, 5, '2026-05-19', 'present', 30);
INSERT INTO `attendance_students` VALUES (566, 1, '2026-05-18', 'present', 30);
INSERT INTO `attendance_students` VALUES (568, 2, '2026-05-18', 'present', 30);
INSERT INTO `attendance_students` VALUES (570, 3, '2026-05-18', 'present', 30);
INSERT INTO `attendance_students` VALUES (572, 4, '2026-05-18', 'present', 30);
INSERT INTO `attendance_students` VALUES (574, 5, '2026-05-18', 'present', 30);
INSERT INTO `attendance_students` VALUES (576, 6, '2026-05-20', 'present', 2);
INSERT INTO `attendance_students` VALUES (578, 8, '2026-05-20', 'online', 2);
INSERT INTO `attendance_students` VALUES (584, 1, '2026-05-20', 'present', 36);
INSERT INTO `attendance_students` VALUES (586, 2, '2026-05-20', 'present', 36);
INSERT INTO `attendance_students` VALUES (588, 3, '2026-05-20', 'present', 36);
INSERT INTO `attendance_students` VALUES (590, 4, '2026-05-20', 'present', 36);
INSERT INTO `attendance_students` VALUES (592, 5, '2026-05-20', 'present', 36);
INSERT INTO `attendance_students` VALUES (594, 22, '2026-05-21', 'present', 54);
INSERT INTO `attendance_students` VALUES (596, 24, '2026-05-21', 'present', 54);
INSERT INTO `attendance_students` VALUES (598, 26, '2026-05-21', 'present', 54);
INSERT INTO `attendance_students` VALUES (600, 28, '2026-05-21', 'present', 54);
INSERT INTO `attendance_students` VALUES (602, 30, '2026-05-21', 'present', 54);
INSERT INTO `attendance_students` VALUES (604, 6, '2026-05-21', 'present', 2);
INSERT INTO `attendance_students` VALUES (606, 8, '2026-05-21', 'online', 2);
INSERT INTO `attendance_students` VALUES (616, 1, '2026-05-21', 'present', 36);
INSERT INTO `attendance_students` VALUES (618, 2, '2026-05-21', 'absent', 36);
INSERT INTO `attendance_students` VALUES (620, 3, '2026-05-21', 'present', 36);
INSERT INTO `attendance_students` VALUES (622, 4, '2026-05-21', 'present', 36);
INSERT INTO `attendance_students` VALUES (624, 5, '2026-05-21', 'present', 36);

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
  `status` enum('present','absent','leave') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'present',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `teacher_date`(`teacher_id` ASC, `date` ASC) USING BTREE,
  INDEX `marked_by`(`marked_by` ASC) USING BTREE,
  CONSTRAINT `attendance_teachers_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `attendance_teachers_ibfk_2` FOREIGN KEY (`marked_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 66 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attendance_teachers
-- ----------------------------
INSERT INTO `attendance_teachers` VALUES (2, 282, '2026-05-05', 0, 2, 'present');
INSERT INTO `attendance_teachers` VALUES (4, 284, '2026-05-05', 0, 2, 'present');
INSERT INTO `attendance_teachers` VALUES (6, 286, '2026-05-05', 0, 2, 'present');
INSERT INTO `attendance_teachers` VALUES (8, 288, '2026-05-05', 2, 2, 'present');
INSERT INTO `attendance_teachers` VALUES (10, 290, '2026-05-05', 0, 2, 'present');
INSERT INTO `attendance_teachers` VALUES (12, 292, '2026-05-05', 0, 2, 'present');
INSERT INTO `attendance_teachers` VALUES (14, 294, '2026-05-05', 0, 2, 'present');
INSERT INTO `attendance_teachers` VALUES (16, 296, '2026-05-05', 0, 2, 'present');
INSERT INTO `attendance_teachers` VALUES (18, 298, '2026-05-05', 0, 2, 'present');
INSERT INTO `attendance_teachers` VALUES (20, 300, '2026-05-05', 0, 2, 'present');
INSERT INTO `attendance_teachers` VALUES (22, 288, '2026-05-19', 2, 30, 'present');
INSERT INTO `attendance_teachers` VALUES (24, 296, '2026-05-19', 1, 30, 'present');
INSERT INTO `attendance_teachers` VALUES (26, 282, '2026-05-18', 1, 30, 'present');
INSERT INTO `attendance_teachers` VALUES (28, 296, '2026-05-18', 1, 30, 'present');
INSERT INTO `attendance_teachers` VALUES (30, 284, '2026-05-18', 2, 30, 'present');
INSERT INTO `attendance_teachers` VALUES (36, 284, '2026-05-19', 2, 30, 'present');
INSERT INTO `attendance_teachers` VALUES (42, 296, '2026-05-11', 1, 54, 'present');
INSERT INTO `attendance_teachers` VALUES (44, 296, '2026-05-13', 1, 54, 'present');
INSERT INTO `attendance_teachers` VALUES (48, 296, '2026-05-12', 1, 54, 'present');
INSERT INTO `attendance_teachers` VALUES (52, 296, '2026-05-20', 1, 36, 'present');
INSERT INTO `attendance_teachers` VALUES (54, 288, '2026-05-20', 1, 36, 'present');
INSERT INTO `attendance_teachers` VALUES (56, 282, '2026-05-20', 1, 36, 'present');
INSERT INTO `attendance_teachers` VALUES (58, 290, '2026-05-21', 0, 36, 'absent');
INSERT INTO `attendance_teachers` VALUES (60, 292, '2026-05-21', 2, 36, 'present');

-- ----------------------------
-- Table structure for book_progress
-- ----------------------------
DROP TABLE IF EXISTS `book_progress`;
CREATE TABLE `book_progress`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `assignment_id` int NOT NULL,
  `date` date NOT NULL,
  `page_number` int NOT NULL,
  `marked_by` int NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `assignment_id`(`assignment_id` ASC, `date` ASC) USING BTREE,
  INDEX `marked_by`(`marked_by` ASC) USING BTREE,
  CONSTRAINT `book_progress_ibfk_1` FOREIGN KEY (`assignment_id`) REFERENCES `teacher_books` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `book_progress_ibfk_2` FOREIGN KEY (`marked_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 94 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book_progress
-- ----------------------------
INSERT INTO `book_progress` VALUES (20, 110, '2026-05-06', 265, 2, '2026-05-18 11:03:44');
INSERT INTO `book_progress` VALUES (22, 76, '2026-05-07', 33, 2, '2026-05-18 11:03:44');
INSERT INTO `book_progress` VALUES (24, 16, '2026-05-07', 339, 2, '2026-05-18 11:03:44');
INSERT INTO `book_progress` VALUES (26, 68, '2026-05-07', 49, 2, '2026-05-18 11:03:44');
INSERT INTO `book_progress` VALUES (28, 74, '2026-05-07', 6, 2, '2026-05-18 11:03:44');
INSERT INTO `book_progress` VALUES (30, 60, '2026-05-07', 28, 2, '2026-05-18 11:03:44');
INSERT INTO `book_progress` VALUES (32, 10, '2026-05-07', 590, 2, '2026-05-18 11:03:44');
INSERT INTO `book_progress` VALUES (34, 12, '2026-05-07', 14, 2, '2026-05-18 11:03:44');
INSERT INTO `book_progress` VALUES (36, 58, '2026-05-07', 43, 2, '2026-05-18 11:03:44');
INSERT INTO `book_progress` VALUES (42, 26, '2026-05-11', 240, 2, '2026-05-18 11:03:44');
INSERT INTO `book_progress` VALUES (44, 88, '2026-05-11', 34, 2, '2026-05-18 11:03:44');
INSERT INTO `book_progress` VALUES (46, 90, '2026-05-11', 35, 2, '2026-05-18 11:03:44');
INSERT INTO `book_progress` VALUES (48, 84, '2026-05-11', 15, 2, '2026-05-18 11:03:44');
INSERT INTO `book_progress` VALUES (50, 92, '2026-05-11', 38, 2, '2026-05-18 11:03:44');
INSERT INTO `book_progress` VALUES (52, 110, '2026-05-18', 277, 2, '2026-05-18 16:40:06');
INSERT INTO `book_progress` VALUES (64, 84, '2026-05-20', 16, 30, '2026-05-19 22:45:28');
INSERT INTO `book_progress` VALUES (66, 88, '2026-05-20', 36, 30, '2026-05-19 22:45:48');
INSERT INTO `book_progress` VALUES (70, 92, '2026-05-20', 39, 30, '2026-05-19 22:46:03');
INSERT INTO `book_progress` VALUES (72, 110, '2026-05-20', 281, 30, '2026-05-20 09:34:39');
INSERT INTO `book_progress` VALUES (76, 90, '2026-05-20', 37, 30, '2026-05-19 22:46:21');
INSERT INTO `book_progress` VALUES (82, 98, '2026-05-20', 1, 54, '2026-05-20 09:32:20');
INSERT INTO `book_progress` VALUES (88, 80, '2026-05-20', 575, 36, '2026-05-20 16:35:59');
INSERT INTO `book_progress` VALUES (90, 26, '2026-05-21', 258, 30, '2026-05-21 16:17:31');
INSERT INTO `book_progress` VALUES (92, 114, '2026-05-21', 1206, 2, '2026-05-21 17:07:01');

-- ----------------------------
-- Table structure for books
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `class_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `title`(`title` ASC) USING BTREE,
  INDEX `fk_books_class`(`class_id` ASC) USING BTREE,
  CONSTRAINT `fk_books_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 102 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of books
-- ----------------------------
INSERT INTO `books` VALUES (2, 'اللغة الفارسية', 2);
INSERT INTO `books` VALUES (6, 'التجويد والسيرة', 2);
INSERT INTO `books` VALUES (10, 'تفسير(30)', 4);
INSERT INTO `books` VALUES (12, 'الأدب', 4);
INSERT INTO `books` VALUES (14, 'الصرف', 2);
INSERT INTO `books` VALUES (16, 'نورالانوار (قیاس)', 10);
INSERT INTO `books` VALUES (18, 'النحو', 2);
INSERT INTO `books` VALUES (24, 'المنطق', 4);
INSERT INTO `books` VALUES (26, 'شرح العقائد', 12);
INSERT INTO `books` VALUES (28, 'صحيح البخاري  (2)', 16);
INSERT INTO `books` VALUES (30, 'الترمذي (2)', 16);
INSERT INTO `books` VALUES (32, 'علم الصيغة', 4);
INSERT INTO `books` VALUES (36, 'شمائل الترمذي', 16);
INSERT INTO `books` VALUES (38, 'اللغة العربية وحفظ الأحاديث والمحادثة العربية', NULL);
INSERT INTO `books` VALUES (42, 'گردانوں کا اجرا', 4);
INSERT INTO `books` VALUES (44, 'الصرف وتمرين الصرف', NULL);
INSERT INTO `books` VALUES (46, 'النحو وتمرين النحو', NULL);
INSERT INTO `books` VALUES (50, 'الأدب والحديث', 4);
INSERT INTO `books` VALUES (52, 'هداية النحو', 4);
INSERT INTO `books` VALUES (54, 'القدوري الأول', 4);
INSERT INTO `books` VALUES (56, 'شرح العقيدة الطحاوية', 10);
INSERT INTO `books` VALUES (58, 'الهداية ( الجزء الأول)', 10);
INSERT INTO `books` VALUES (60, 'ديوان المتنبي والمعلقات', 10);
INSERT INTO `books` VALUES (62, 'آثار السنن وحفظ الحديث', 10);
INSERT INTO `books` VALUES (64, 'مختصر المعاني', 10);
INSERT INTO `books` VALUES (66, 'معين الفلسفة والانتباهات', 10);
INSERT INTO `books` VALUES (68, 'التفسير(10-1)', 10);
INSERT INTO `books` VALUES (70, 'الهداية (الجزء الثاني)', 12);
INSERT INTO `books` VALUES (72, 'التوضيح (1)', 12);
INSERT INTO `books` VALUES (74, 'كتاب الآثار وخير الأصول', 12);
INSERT INTO `books` VALUES (76, 'السراجي والفلکیات', 12);
INSERT INTO `books` VALUES (78, 'التوضيح (2)', 12);
INSERT INTO `books` VALUES (80, 'تفسير الجلالين والفوز الكبير', 12);
INSERT INTO `books` VALUES (82, 'اللغة العربية والعروض', 12);
INSERT INTO `books` VALUES (86, 'الترمذي (1)', 16);
INSERT INTO `books` VALUES (88, 'سنن النسائي', 16);
INSERT INTO `books` VALUES (90, 'صحيح البخاري (1)', 16);
INSERT INTO `books` VALUES (92, 'سنن أبي داود (1) وموطأ مالك', 16);
INSERT INTO `books` VALUES (94, 'الطحاوي', 16);
INSERT INTO `books` VALUES (96, 'سنن أبي داود (2) وموطأ محمد', 16);
INSERT INTO `books` VALUES (98, 'التجويد واللغة العربية', 4);
INSERT INTO `books` VALUES (100, 'صحيح مسلم وجامع الترمذي 2', 16);

-- ----------------------------
-- Table structure for classes
-- ----------------------------
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_ar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name_en` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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
-- Table structure for periods
-- ----------------------------
DROP TABLE IF EXISTS `periods`;
CREATE TABLE `periods`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacher_id` int NULL DEFAULT NULL,
  `class_id` int NULL DEFAULT NULL,
  `day_of_week` enum('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `start_time` time NULL DEFAULT NULL,
  `end_time` time NULL DEFAULT NULL,
  `subject` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `assignment_id` int NULL DEFAULT NULL,
  `period_number` int NULL DEFAULT NULL,
  `session_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `teacher_id`(`teacher_id` ASC) USING BTREE,
  INDEX `class_id`(`class_id` ASC) USING BTREE,
  INDEX `assignment_id`(`assignment_id` ASC) USING BTREE,
  INDEX `fk_periods_session`(`session_id` ASC) USING BTREE,
  CONSTRAINT `fk_periods_session` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `periods_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `periods_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `periods_ibfk_3` FOREIGN KEY (`assignment_id`) REFERENCES `teacher_books` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1202 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of periods
-- ----------------------------
INSERT INTO `periods` VALUES (990, 286, 4, 'Monday', '18:00:00', '18:40:00', 'تفسير عم', NULL, 1, 2);
INSERT INTO `periods` VALUES (994, 302, 4, 'Monday', '19:40:00', '20:20:00', 'هداية النحو', 58, 3, 2);
INSERT INTO `periods` VALUES (996, 290, 4, 'Monday', '20:20:00', '21:00:00', 'القدوري الأول', 60, 4, 2);
INSERT INTO `periods` VALUES (998, 286, 4, 'Tuesday', '18:00:00', '18:40:00', 'تفسير عم', NULL, 1, 2);
INSERT INTO `periods` VALUES (1002, 290, 4, 'Tuesday', '19:40:00', '20:20:00', 'القدوري الأول', 60, 3, 2);
INSERT INTO `periods` VALUES (1004, 290, 4, 'Tuesday', '20:20:00', '21:00:00', 'القدوري الأول', 60, 4, 2);
INSERT INTO `periods` VALUES (1006, 286, 4, 'Wednesday', '18:00:00', '18:40:00', 'تفسير عم', NULL, 1, 2);
INSERT INTO `periods` VALUES (1008, 302, 4, 'Wednesday', '18:40:00', '19:20:00', 'هداية النحو', 58, 2, 2);
INSERT INTO `periods` VALUES (1010, 290, 4, 'Wednesday', '19:40:00', '20:20:00', 'القدوري الأول', 60, 3, 2);
INSERT INTO `periods` VALUES (1012, 298, 4, 'Wednesday', '20:20:00', '21:00:00', 'علم الصيغة', NULL, 4, 2);
INSERT INTO `periods` VALUES (1014, 302, 4, 'Thursday', '18:00:00', '18:40:00', 'هداية النحو', 58, 1, 2);
INSERT INTO `periods` VALUES (1018, 286, 4, 'Thursday', '19:40:00', '20:20:00', 'الأدب والحديث', 56, 3, 2);
INSERT INTO `periods` VALUES (1020, 298, 4, 'Thursday', '20:20:00', '21:00:00', 'علم الصيغة', NULL, 4, 2);
INSERT INTO `periods` VALUES (1024, 286, 4, 'Friday', '18:40:00', '19:20:00', 'الأدب والحديث', 56, 2, 2);
INSERT INTO `periods` VALUES (1026, 298, 4, 'Friday', '19:40:00', '20:20:00', 'علم الصيغة', NULL, 3, 2);
INSERT INTO `periods` VALUES (1028, 298, 4, 'Friday', '20:20:00', '21:00:00', 'علم الصيغة', NULL, 4, 2);
INSERT INTO `periods` VALUES (1030, 292, 10, 'Monday', '18:00:00', '18:40:00', 'شرح العقيدة الطحاوية', 66, 1, 2);
INSERT INTO `periods` VALUES (1032, 288, 10, 'Monday', '18:40:00', '19:20:00', 'نورالانوار (قیاس)', 16, 2, 2);
INSERT INTO `periods` VALUES (1034, 294, 10, 'Monday', '20:20:00', '21:00:00', 'الهداية ( الجزء الأول)', 68, 4, 2);
INSERT INTO `periods` VALUES (1038, 292, 10, 'Tuesday', '18:00:00', '18:40:00', 'شرح العقيدة الطحاوية', 66, 1, 2);
INSERT INTO `periods` VALUES (1040, 294, 10, 'Tuesday', '18:40:00', '19:20:00', 'الهداية ( الجزء الأول)', 68, 2, 2);
INSERT INTO `periods` VALUES (1046, 290, 10, 'Tuesday', '21:00:00', '21:40:00', 'مختصر المعاني', 74, 5, 2);
INSERT INTO `periods` VALUES (1048, 288, 10, 'Wednesday', '18:00:00', '18:40:00', 'نورالانوار (قیاس)', 16, 1, 2);
INSERT INTO `periods` VALUES (1050, 282, 10, 'Wednesday', '20:20:00', '21:00:00', 'معين الفلسفة والانتباهات', 76, 4, 2);
INSERT INTO `periods` VALUES (1052, 286, 10, 'Wednesday', '19:40:00', '20:20:00', 'التفسير(10-1)', 78, 3, 2);
INSERT INTO `periods` VALUES (1054, 286, 10, 'Wednesday', '21:00:00', '21:40:00', 'التفسير(10-1)', 78, 5, 2);
INSERT INTO `periods` VALUES (1056, 290, 10, 'Thursday', '18:40:00', '19:20:00', 'مختصر المعاني', 74, 2, 2);
INSERT INTO `periods` VALUES (1058, 282, 10, 'Thursday', '19:40:00', '20:20:00', 'معين الفلسفة والانتباهات', 76, 3, 2);
INSERT INTO `periods` VALUES (1060, 294, 10, 'Thursday', '20:20:00', '21:00:00', 'الهداية ( الجزء الأول)', 68, 4, 2);
INSERT INTO `periods` VALUES (1062, 288, 10, 'Thursday', '21:00:00', '21:40:00', 'نورالانوار (قیاس)', 16, 5, 2);
INSERT INTO `periods` VALUES (1064, 288, 10, 'Friday', '18:00:00', '18:40:00', 'نورالانوار (قیاس)', 16, 1, 2);
INSERT INTO `periods` VALUES (1066, 290, 10, 'Friday', '18:40:00', '19:20:00', 'مختصر المعاني', 74, 2, 2);
INSERT INTO `periods` VALUES (1068, 286, 10, 'Friday', '19:40:00', '20:20:00', 'التفسير(10-1)', 78, 3, 2);
INSERT INTO `periods` VALUES (1070, 294, 10, 'Friday', '20:20:00', '21:00:00', 'الهداية ( الجزء الأول)', 68, 4, 2);
INSERT INTO `periods` VALUES (1072, 288, 10, 'Friday', '21:00:00', '21:40:00', 'نورالانوار (قیاس)', 16, 5, 2);
INSERT INTO `periods` VALUES (1076, 296, 12, 'Monday', '18:40:00', '19:20:00', 'التوضيح (2)', 110, 2, 2);
INSERT INTO `periods` VALUES (1078, 294, 12, 'Monday', '19:40:00', '20:20:00', 'كتاب الآثار وخير الأصول', 84, 3, 2);
INSERT INTO `periods` VALUES (1080, 284, 12, 'Monday', '20:20:00', '21:00:00', 'السراجي والفلکیات', 86, 4, 2);
INSERT INTO `periods` VALUES (1084, 284, 12, 'Tuesday', '21:00:00', '21:40:00', 'الهداية (الجزء الثاني)', 80, 5, 2);
INSERT INTO `periods` VALUES (1086, 296, 12, 'Tuesday', '18:40:00', '19:20:00', 'التوضيح (2)', 110, 2, 2);
INSERT INTO `periods` VALUES (1088, 288, 12, 'Tuesday', '18:00:00', '18:40:00', 'تفسير الجلالين والفوز الكبير', 90, 1, 2);
INSERT INTO `periods` VALUES (1090, 284, 12, 'Tuesday', '20:20:00', '21:00:00', 'السراجي والفلکیات', 86, 4, 2);
INSERT INTO `periods` VALUES (1092, 288, 12, 'Tuesday', '19:40:00', '20:20:00', 'تفسير الجلالين والفوز الكبير', 90, 3, 2);
INSERT INTO `periods` VALUES (1094, 290, 12, 'Wednesday', '18:00:00', '18:40:00', 'اللغة العربية والعروض', 92, 1, 2);
INSERT INTO `periods` VALUES (1096, 296, 12, 'Wednesday', '18:40:00', '19:20:00', 'التوضيح (2)', 110, 2, 2);
INSERT INTO `periods` VALUES (1098, 294, 12, 'Wednesday', '19:40:00', '20:20:00', 'كتاب الآثار وخير الأصول', 84, 3, 2);
INSERT INTO `periods` VALUES (1100, 288, 12, 'Wednesday', '20:20:00', '21:00:00', 'تفسير الجلالين والفوز الكبير', 90, 4, 2);
INSERT INTO `periods` VALUES (1102, 282, 12, 'Wednesday', '21:00:00', '21:40:00', 'التوضيح (1)', 88, 5, 2);
INSERT INTO `periods` VALUES (1104, 292, 12, 'Thursday', '18:00:00', '18:40:00', 'شرح العقائد', 26, 1, 2);
INSERT INTO `periods` VALUES (1106, 282, 12, 'Thursday', '18:40:00', '19:20:00', 'التوضيح (1)', 88, 2, 2);
INSERT INTO `periods` VALUES (1108, 292, 12, 'Thursday', '19:40:00', '20:20:00', 'شرح العقائد', 26, 3, 2);
INSERT INTO `periods` VALUES (1110, 282, 12, 'Thursday', '20:20:00', '21:00:00', 'التوضيح (1)', 88, 4, 2);
INSERT INTO `periods` VALUES (1112, 290, 12, 'Thursday', '21:00:00', '21:40:00', 'اللغة العربية والعروض', 92, 5, 2);
INSERT INTO `periods` VALUES (1114, 290, 12, 'Friday', '18:00:00', '18:40:00', 'اللغة العربية والعروض', 92, 1, 2);
INSERT INTO `periods` VALUES (1116, 292, 12, 'Friday', '18:40:00', '19:20:00', 'شرح العقائد', 26, 2, 2);
INSERT INTO `periods` VALUES (1118, 294, 12, 'Friday', '19:40:00', '20:20:00', 'كتاب الآثار وخير الأصول', 84, 3, 2);
INSERT INTO `periods` VALUES (1120, 292, 12, 'Friday', '20:20:00', '21:00:00', 'شرح العقائد', 26, 4, 2);
INSERT INTO `periods` VALUES (1122, 284, 12, 'Friday', '21:00:00', '21:40:00', 'الهداية (الجزء الثاني)', 80, 5, 2);
INSERT INTO `periods` VALUES (1124, 296, 16, 'Monday', '18:00:00', '18:40:00', 'صحيح مسلم وجامع الترمذي 2', NULL, 1, 2);
INSERT INTO `periods` VALUES (1126, 294, 16, 'Monday', '18:40:00', '19:20:00', 'الترمذي (1)', 96, 2, 2);
INSERT INTO `periods` VALUES (1128, 290, 16, 'Monday', '19:40:00', '20:20:00', 'سنن النسائي', 98, 3, 2);
INSERT INTO `periods` VALUES (1130, 292, 16, 'Monday', '20:20:00', '21:00:00', 'صحيح البخاري (1)', 100, 4, 2);
INSERT INTO `periods` VALUES (1132, 300, 16, 'Monday', '21:00:00', '21:40:00', 'شمائل الترمذي', 42, 5, 2);
INSERT INTO `periods` VALUES (1134, 296, 16, 'Tuesday', '18:00:00', '18:40:00', 'صحيح مسلم وجامع الترمذي 2', NULL, 1, 2);
INSERT INTO `periods` VALUES (1136, 290, 16, 'Tuesday', '18:40:00', '19:20:00', 'سنن النسائي', 98, 2, 2);
INSERT INTO `periods` VALUES (1138, 294, 16, 'Tuesday', '19:40:00', '20:20:00', 'الترمذي (1)', 96, 3, 2);
INSERT INTO `periods` VALUES (1140, 292, 16, 'Tuesday', '20:20:00', '21:00:00', 'صحيح البخاري (1)', 100, 4, 2);
INSERT INTO `periods` VALUES (1142, 300, 16, 'Tuesday', '21:00:00', '21:40:00', 'شمائل الترمذي', 42, 5, 2);
INSERT INTO `periods` VALUES (1144, 296, 16, 'Wednesday', '18:00:00', '18:40:00', 'صحيح مسلم وجامع الترمذي 2', NULL, 1, 2);
INSERT INTO `periods` VALUES (1146, 294, 16, 'Wednesday', '18:40:00', '19:20:00', 'الترمذي (1)', 96, 2, 2);
INSERT INTO `periods` VALUES (1148, 284, 16, 'Wednesday', '19:40:00', '20:20:00', 'سنن أبي داود (1) وموطأ مالك', 102, 3, 2);
INSERT INTO `periods` VALUES (1150, 292, 16, 'Wednesday', '20:20:00', '21:00:00', 'صحيح البخاري (1)', 100, 4, 2);
INSERT INTO `periods` VALUES (1152, 290, 16, 'Wednesday', '21:00:00', '21:40:00', 'سنن النسائي', 98, 5, 2);
INSERT INTO `periods` VALUES (1154, 288, 16, 'Thursday', '18:00:00', '18:40:00', 'الطحاوي', 104, 1, 2);
INSERT INTO `periods` VALUES (1156, 288, 16, 'Thursday', '18:40:00', '19:20:00', 'الطحاوي', 104, 2, 2);
INSERT INTO `periods` VALUES (1158, 284, 16, 'Thursday', '19:40:00', '20:20:00', 'سنن أبي داود (1) وموطأ مالك', 102, 3, 2);
INSERT INTO `periods` VALUES (1160, 292, 16, 'Thursday', '20:20:00', '21:00:00', 'صحيح البخاري (1)', 100, 4, 2);
INSERT INTO `periods` VALUES (1162, 298, 16, 'Thursday', '21:00:00', '21:40:00', 'سنن أبي داود (2) وموطأ محمد', 106, 5, 2);
INSERT INTO `periods` VALUES (1164, 294, 16, 'Friday', '18:00:00', '18:40:00', 'الترمذي (1)', 96, 1, 2);
INSERT INTO `periods` VALUES (1166, 288, 16, 'Friday', '18:40:00', '19:20:00', 'الطحاوي', 104, 2, 2);
INSERT INTO `periods` VALUES (1168, 284, 16, 'Friday', '19:40:00', '20:20:00', 'سنن أبي داود (1) وموطأ مالك', 102, 3, 2);
INSERT INTO `periods` VALUES (1170, 284, 16, 'Friday', '20:20:00', '21:00:00', 'سنن أبي داود (1) وموطأ مالك', 102, 4, 2);
INSERT INTO `periods` VALUES (1172, 298, 16, 'Friday', '21:00:00', '21:40:00', 'سنن أبي داود (2) وموطأ محمد', 106, 5, 2);
INSERT INTO `periods` VALUES (1174, 292, 16, 'Saturday', '18:40:00', '19:20:00', 'صحيح البخاري (1)', 100, 2, 2);
INSERT INTO `periods` VALUES (1176, 288, 16, 'Saturday', '19:40:00', '20:20:00', 'الطحاوي', 104, 3, 2);
INSERT INTO `periods` VALUES (1180, 298, 16, 'Saturday', '20:20:00', '21:00:00', 'سنن أبي داود (2) وموطأ محمد', 106, 4, 2);
INSERT INTO `periods` VALUES (1182, 298, 16, 'Saturday', '21:00:00', '21:40:00', 'سنن أبي داود (2) وموطأ محمد', 106, 5, 2);
INSERT INTO `periods` VALUES (1184, 282, 12, 'Monday', '18:00:00', '18:40:00', 'التوضيح (1)', 88, 1, NULL);
INSERT INTO `periods` VALUES (1186, 284, 12, 'Monday', '21:00:00', '21:40:00', 'الهداية (الجزء الثاني)', 80, 5, NULL);
INSERT INTO `periods` VALUES (1188, 282, 16, 'Saturday', '18:00:00', '18:40:00', 'صحيح البخاري  (2)', 114, 1, NULL);
INSERT INTO `periods` VALUES (1190, 284, 4, 'Monday', '18:40:00', '19:20:00', 'التجويد واللغة العربية', 124, 2, NULL);
INSERT INTO `periods` VALUES (1192, 290, 10, 'Thursday', '18:00:00', '18:40:00', 'آثار السنن وحفظ الحديث', 72, 1, NULL);
INSERT INTO `periods` VALUES (1194, 290, 10, 'Wednesday', '18:40:00', '19:20:00', 'آثار السنن وحفظ الحديث', 72, 2, NULL);
INSERT INTO `periods` VALUES (1196, 286, 10, 'Tuesday', '19:40:00', '20:20:00', 'ديوان المتنبي والمعلقات', 70, 3, NULL);
INSERT INTO `periods` VALUES (1198, 286, 10, 'Monday', '19:40:00', '20:20:00', 'ديوان المتنبي والمعلقات', 70, 3, NULL);
INSERT INTO `periods` VALUES (1200, 290, 10, 'Monday', '21:00:00', '21:40:00', 'آثار السنن وحفظ الحديث', 72, 5, NULL);

-- ----------------------------
-- Table structure for role_permissions
-- ----------------------------
DROP TABLE IF EXISTS `role_permissions`;
CREATE TABLE `role_permissions`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `function_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `allowed` tinyint(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `role_function`(`role` ASC, `function_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 228 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `role_permissions` VALUES (222, 'عریف', 'student_attendance', 1);
INSERT INTO `role_permissions` VALUES (226, 'عریف', 'teacher_attendance', 1);

-- ----------------------------
-- Table structure for schema_history
-- ----------------------------
DROP TABLE IF EXISTS `schema_history`;
CREATE TABLE `schema_history`  (
  `version` int NOT NULL,
  `script_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `applied_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`version`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of schema_history
-- ----------------------------
INSERT INTO `schema_history` VALUES (1, 'V1__Initial_Schema.sql', '2026-04-30 11:46:41');
INSERT INTO `schema_history` VALUES (2, 'V2__Sample_Data.sql', '2026-04-30 11:52:31');
INSERT INTO `schema_history` VALUES (3, 'V3__Sample_Data_Fix.sql', '2026-04-30 12:37:42');
INSERT INTO `schema_history` VALUES (4, 'V4__Roles_Periods_Books.sql', '2026-05-05 12:07:16');
INSERT INTO `schema_history` VALUES (5, 'V5__Books_Sessions_Assignments.sql', '2026-05-05 12:07:16');
INSERT INTO `schema_history` VALUES (6, 'V6__Assignments_Class_Days.sql', '2026-05-05 12:07:16');
INSERT INTO `schema_history` VALUES (7, 'V7__Add_Teacher_ID_Number.sql', '2026-05-05 20:03:10');
INSERT INTO `schema_history` VALUES (8, 'V8__Fix_Student_Roll_Numbers.sql', '2026-05-05 20:08:37');
INSERT INTO `schema_history` VALUES (9, 'V9__Link_Periods_To_Books.sql', '2026-05-06 11:00:15');
INSERT INTO `schema_history` VALUES (10, 'V10__MultiSession_Update.sql', '2026-05-18 11:20:13');
INSERT INTO `schema_history` VALUES (11, 'V11__Add_Book_Class_Relation.sql', '2026-05-19 09:37:30');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_active` tinyint(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES (2, '2026-2027', 1);

-- ----------------------------
-- Table structure for student_enrollments
-- ----------------------------
DROP TABLE IF EXISTS `student_enrollments`;
CREATE TABLE `student_enrollments`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `class_id` int NOT NULL,
  `session_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `student_session`(`student_id` ASC, `session_id` ASC) USING BTREE,
  INDEX `fk_enrollments_class`(`class_id` ASC) USING BTREE,
  INDEX `fk_enrollments_session`(`session_id` ASC) USING BTREE,
  CONSTRAINT `fk_enrollments_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_enrollments_session` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_enrollments_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 64 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student_enrollments
-- ----------------------------
INSERT INTO `student_enrollments` VALUES (2, 10, 4, 2);
INSERT INTO `student_enrollments` VALUES (4, 16, 4, 2);
INSERT INTO `student_enrollments` VALUES (6, 18, 4, 2);
INSERT INTO `student_enrollments` VALUES (8, 20, 4, 2);
INSERT INTO `student_enrollments` VALUES (10, 32, 4, 2);
INSERT INTO `student_enrollments` VALUES (12, 6, 10, 2);
INSERT INTO `student_enrollments` VALUES (14, 8, 10, 2);
INSERT INTO `student_enrollments` VALUES (16, 1, 12, 2);
INSERT INTO `student_enrollments` VALUES (18, 2, 12, 2);
INSERT INTO `student_enrollments` VALUES (20, 3, 12, 2);
INSERT INTO `student_enrollments` VALUES (22, 4, 12, 2);
INSERT INTO `student_enrollments` VALUES (24, 5, 12, 2);
INSERT INTO `student_enrollments` VALUES (26, 22, 16, 2);
INSERT INTO `student_enrollments` VALUES (28, 24, 16, 2);
INSERT INTO `student_enrollments` VALUES (30, 26, 16, 2);
INSERT INTO `student_enrollments` VALUES (32, 28, 16, 2);
INSERT INTO `student_enrollments` VALUES (34, 30, 16, 2);

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `class_id` int NULL DEFAULT NULL,
  `roll_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `class_id`(`class_id` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `students_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES (1, 'خرم شہزاد', 12, 'S-26-1001', 30);
INSERT INTO `students` VALUES (2, 'کمال محمر', 12, 'S-26-1002', 32);
INSERT INTO `students` VALUES (3, 'محمد عبداللہ', 12, 'S-26-1003', 34);
INSERT INTO `students` VALUES (4, 'بسام ارشاد', 12, 'S-26-1004', 36);
INSERT INTO `students` VALUES (5, 'خالد رشید کاظمی', 12, 'S-26-1005', 38);
INSERT INTO `students` VALUES (6, 'زبیر اسلام', 10, 'S-26-1006', 40);
INSERT INTO `students` VALUES (8, 'محمد عمران انصاری', 10, 'S-26-1008', 42);
INSERT INTO `students` VALUES (10, 'عبدالله جليل', 4, 'S-26-1010', 44);
INSERT INTO `students` VALUES (16, 'ظفر اقبال مغل', 4, 'S-26-1016', 48);
INSERT INTO `students` VALUES (18, 'عطاء الرحمن', 4, 'S-26-1018', 50);
INSERT INTO `students` VALUES (20, 'محمد عبيد الله ', 4, 'S-26-1020', 52);
INSERT INTO `students` VALUES (22, 'عمر فاروق', 16, 'S-26-1022', 54);
INSERT INTO `students` VALUES (24, 'مشتاق احمد', 16, 'S-26-1024', 56);
INSERT INTO `students` VALUES (26, 'عارف احمد', 16, 'S-26-1026', 58);
INSERT INTO `students` VALUES (28, 'محمد عثمان', 16, 'S-26-1028', 60);
INSERT INTO `students` VALUES (30, 'کاشف الرحمن', 16, 'S-26-1030', 62);
INSERT INTO `students` VALUES (32, 'محمد عبداللہ ', 4, 'S-26-1032', 192);

-- ----------------------------
-- Table structure for teacher_books
-- ----------------------------
DROP TABLE IF EXISTS `teacher_books`;
CREATE TABLE `teacher_books`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacher_id` int NOT NULL,
  `book_id` int NOT NULL,
  `session_id` int NOT NULL,
  `start_page` int NULL DEFAULT 1,
  `end_page` int NULL DEFAULT 100,
  `current_page` int NULL DEFAULT 1,
  `class_id` int NULL DEFAULT NULL,
  `days` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `teacher_id`(`teacher_id` ASC) USING BTREE,
  INDEX `book_id`(`book_id` ASC) USING BTREE,
  INDEX `session_id`(`session_id` ASC) USING BTREE,
  INDEX `class_id`(`class_id` ASC) USING BTREE,
  CONSTRAINT `teacher_books_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `teacher_books_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `teacher_books_ibfk_3` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `teacher_books_ibfk_4` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 136 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher_books
-- ----------------------------
INSERT INTO `teacher_books` VALUES (10, 286, 10, 2, 587, 611, 590, 4, NULL);
INSERT INTO `teacher_books` VALUES (12, 286, 12, 2, 1, 78, 14, 4, NULL);
INSERT INTO `teacher_books` VALUES (16, 288, 16, 2, 319, 430, 339, 10, NULL);
INSERT INTO `teacher_books` VALUES (26, 292, 26, 2, 206, 311, 258, 12, NULL);
INSERT INTO `teacher_books` VALUES (42, 300, 36, 2, 1, 500, 1, 16, NULL);
INSERT INTO `teacher_books` VALUES (56, 286, 50, 2, 1, 100, 1, 4, NULL);
INSERT INTO `teacher_books` VALUES (58, 302, 52, 2, 1, 187, 43, 4, NULL);
INSERT INTO `teacher_books` VALUES (60, 290, 54, 2, 1, 518, 28, 4, NULL);
INSERT INTO `teacher_books` VALUES (66, 292, 56, 2, 1, 100, 1, 10, NULL);
INSERT INTO `teacher_books` VALUES (68, 294, 58, 2, 1, 404, 49, 10, NULL);
INSERT INTO `teacher_books` VALUES (70, 286, 60, 2, 1, 100, 1, 10, NULL);
INSERT INTO `teacher_books` VALUES (72, 290, 62, 2, 1, 100, 1, 10, NULL);
INSERT INTO `teacher_books` VALUES (74, 290, 64, 2, 1, 322, 6, 10, NULL);
INSERT INTO `teacher_books` VALUES (76, 282, 66, 2, 1, 131, 33, 10, NULL);
INSERT INTO `teacher_books` VALUES (78, 286, 68, 2, 1, 100, 1, 10, NULL);
INSERT INTO `teacher_books` VALUES (80, 284, 70, 2, 520, 970, 575, 12, NULL);
INSERT INTO `teacher_books` VALUES (84, 294, 74, 2, 1, 145, 16, 12, NULL);
INSERT INTO `teacher_books` VALUES (86, 284, 76, 2, 1, 186, 1, 12, NULL);
INSERT INTO `teacher_books` VALUES (88, 282, 72, 2, 1, 240, 36, 12, NULL);
INSERT INTO `teacher_books` VALUES (90, 288, 80, 2, 1, 902, 37, 12, NULL);
INSERT INTO `teacher_books` VALUES (92, 290, 82, 2, 1, 247, 39, 12, NULL);
INSERT INTO `teacher_books` VALUES (96, 294, 86, 2, 624, 76, 1, 16, NULL);
INSERT INTO `teacher_books` VALUES (98, 290, 88, 2, 1152, 62, 1, 16, NULL);
INSERT INTO `teacher_books` VALUES (100, 292, 90, 2, 1104, 181, 1, 16, NULL);
INSERT INTO `teacher_books` VALUES (102, 284, 92, 2, 568, 103, 1, 16, NULL);
INSERT INTO `teacher_books` VALUES (104, 288, 94, 2, 494, 142, 1, 16, NULL);
INSERT INTO `teacher_books` VALUES (106, 298, 96, 2, 469, 27, 1, 16, NULL);
INSERT INTO `teacher_books` VALUES (110, 296, 78, 2, 240, 480, 281, 12, NULL);
INSERT INTO `teacher_books` VALUES (112, 298, 42, 2, 1, 44, 1, 4, NULL);
INSERT INTO `teacher_books` VALUES (114, 282, 28, 2, 1077, 129, 1206, 16, NULL);
INSERT INTO `teacher_books` VALUES (116, 282, 2, 2, 1, 500, 1, 2, NULL);
INSERT INTO `teacher_books` VALUES (118, 284, 6, 2, 1, 500, 1, 2, NULL);
INSERT INTO `teacher_books` VALUES (120, 288, 14, 2, 1, 500, 1, 2, NULL);
INSERT INTO `teacher_books` VALUES (122, 290, 18, 2, 1, 500, 1, 2, NULL);
INSERT INTO `teacher_books` VALUES (124, 284, 98, 2, 1, 200, 1, 4, NULL);
INSERT INTO `teacher_books` VALUES (130, 296, 100, 2, 488, 30, 1, 16, NULL);
INSERT INTO `teacher_books` VALUES (132, 292, 24, 2, 1, 500, 1, 4, NULL);
INSERT INTO `teacher_books` VALUES (134, 298, 32, 2, 1, 500, 1, 4, NULL);

-- ----------------------------
-- Table structure for teachers
-- ----------------------------
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `subject` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `id_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id_number`(`id_number` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 304 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teachers
-- ----------------------------
INSERT INTO `teachers` VALUES (282, 'مفتی مشرف بیگ اشرف', 'اللغة الفارسية / التوضيح', 64, 'T-26-1282');
INSERT INTO `teachers` VALUES (284, 'مولانا حبيب محبوب', 'التجويد والسيرة / الهداية', 66, 'T-26-1284');
INSERT INTO `teachers` VALUES (286, 'مولانا کمال', 'تفسير / الأدب', 68, 'T-26-1286');
INSERT INTO `teachers` VALUES (288, 'مولانا حسن', 'الصرف / أصول الفقه', 70, 'T-26-1288');
INSERT INTO `teachers` VALUES (290, 'مولانا عبد القادر عثمان', 'النحو / القدوري / النسائي', 72, 'T-26-1290');
INSERT INTO `teachers` VALUES (292, 'مفتی فہد انور', 'المنطق / شرح العقائد / البخاري', 74, 'T-26-1292');
INSERT INTO `teachers` VALUES (294, 'مولانا حمزه', 'الهداية / الترمذي', 76, 'T-26-1294');
INSERT INTO `teachers` VALUES (296, 'مولانا قمر اعجاز', 'التوضيح / الترمذي', 78, 'T-26-1296');
INSERT INTO `teachers` VALUES (298, 'مولانا بارون خليل', 'علم الصيغة / سنن أبي داود', 80, 'T-26-1298');
INSERT INTO `teachers` VALUES (300, 'مولانا قمر علی شاہ', 'شمائل الترمذي', 82, 'T-26-1300');
INSERT INTO `teachers` VALUES (302, 'زبیر صاحب', 'هداية النحو', 166, NULL);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'طالب',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 380 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (2, 'مدیر', '$2b$10$yxurfqsMguNXY6IfMil6WuHdMmqDf0a/pVDMK2lPlDlFkWq.bt/SS', 'مدير', '2026-04-30 11:46:41');
INSERT INTO `users` VALUES (30, 'خرم', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'عريف', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (32, 'کمال', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (34, 'محمد', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (36, 'بسام', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'عريف', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (38, 'خالد', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (40, 'زبیر', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'عريف', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (42, 'محمد_عمران', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (44, 'عبدالله', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'عريف', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (46, 'admin', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'مدير', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (48, 'ظفر', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (50, 'عطاء', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (52, 'محمد_عبيد', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (54, 'عمر', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'عريف', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (56, 'مشتاق', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (58, 'عارف', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (60, 'محمد_عثمان', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (62, 'کاشف', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (64, 'مشرف', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'ناظم', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (66, 'حبيب', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (68, 'أستاذ_کمال', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (70, 'حسن', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (72, 'عبد', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (74, 'فہد', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'ناظم', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (76, 'حمزه', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (78, 'قمر', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (80, 'بارون', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (82, 'قمر_علی', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'ناظم', '2026-05-05 19:17:30');
INSERT INTO `users` VALUES (166, 'زبیر_صاحب', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-06 11:48:15');
INSERT INTO `users` VALUES (192, 'محمد_عبداللہ', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-07 16:27:36');

SET FOREIGN_KEY_CHECKS = 1;

/*
 Navicat Premium Data Transfer

 Source Server         : Nukrim
 Source Server Type    : MySQL
 Source Server Version : 80046
 Source Host           : localhost:3306
 Source Schema         : mms

 Target Server Type    : MySQL
 Target Server Version : 80046
 File Encoding         : 65001

 Date: 16/07/2026 23:57:46
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
  `tenant_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `student_date`(`student_id` ASC, `date` ASC) USING BTREE,
  INDEX `marked_by`(`marked_by` ASC) USING BTREE,
  INDEX `fk_attendance_students_tenant`(`tenant_id` ASC) USING BTREE,
  CONSTRAINT `attendance_students_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `attendance_students_ibfk_2` FOREIGN KEY (`marked_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_attendance_students_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7476 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of attendance_students
-- ----------------------------
INSERT INTO `attendance_students` VALUES (32, 1, '2026-04-27', 'present', NULL, 2);
INSERT INTO `attendance_students` VALUES (34, 2, '2026-04-27', 'present', NULL, 2);
INSERT INTO `attendance_students` VALUES (36, 3, '2026-04-27', 'present', NULL, 2);
INSERT INTO `attendance_students` VALUES (38, 4, '2026-04-27', 'present', NULL, 2);
INSERT INTO `attendance_students` VALUES (40, 5, '2026-04-27', 'present', NULL, 2);
INSERT INTO `attendance_students` VALUES (42, 1, '2026-04-28', 'present', NULL, 2);
INSERT INTO `attendance_students` VALUES (44, 2, '2026-04-28', 'present', NULL, 2);
INSERT INTO `attendance_students` VALUES (46, 3, '2026-04-28', 'present', NULL, 2);
INSERT INTO `attendance_students` VALUES (48, 4, '2026-04-28', 'present', NULL, 2);
INSERT INTO `attendance_students` VALUES (50, 5, '2026-04-28', 'online', NULL, 2);
INSERT INTO `attendance_students` VALUES (52, 1, '2026-04-29', 'present', NULL, 2);
INSERT INTO `attendance_students` VALUES (54, 2, '2026-04-29', 'present', NULL, 2);
INSERT INTO `attendance_students` VALUES (56, 3, '2026-04-29', 'present', NULL, 2);
INSERT INTO `attendance_students` VALUES (58, 4, '2026-04-29', 'present', NULL, 2);
INSERT INTO `attendance_students` VALUES (60, 5, '2026-04-29', 'present', NULL, 2);
INSERT INTO `attendance_students` VALUES (62, 6, '2026-04-30', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (64, 8, '2026-04-30', 'online', 2, 2);
INSERT INTO `attendance_students` VALUES (70, 10, '2026-04-30', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (74, 16, '2026-04-30', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (76, 18, '2026-04-30', 'leave', 2, 2);
INSERT INTO `attendance_students` VALUES (78, 20, '2026-04-30', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (80, 1, '2026-04-30', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (82, 2, '2026-04-30', 'online', 2, 2);
INSERT INTO `attendance_students` VALUES (84, 3, '2026-04-30', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (86, 4, '2026-04-30', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (88, 5, '2026-04-30', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (90, 22, '2026-04-30', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (92, 24, '2026-04-30', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (94, 26, '2026-04-30', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (98, 30, '2026-04-30', 'absent', 2, 2);
INSERT INTO `attendance_students` VALUES (100, 22, '2026-05-01', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (102, 24, '2026-05-01', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (104, 26, '2026-05-01', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (108, 30, '2026-05-01', 'absent', 2, 2);
INSERT INTO `attendance_students` VALUES (110, 10, '2026-05-04', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (114, 16, '2026-05-04', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (116, 18, '2026-05-04', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (118, 20, '2026-05-04', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (130, 22, '2026-05-04', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (132, 24, '2026-05-04', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (134, 26, '2026-05-04', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (138, 30, '2026-05-04', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (140, 1, '2026-05-04', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (142, 2, '2026-05-04', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (144, 3, '2026-05-04', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (146, 4, '2026-05-04', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (148, 5, '2026-05-04', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (150, 10, '2026-05-05', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (152, 16, '2026-05-05', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (154, 18, '2026-05-05', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (156, 20, '2026-05-05', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (158, 22, '2026-05-06', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (160, 24, '2026-05-06', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (162, 26, '2026-05-06', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (166, 30, '2026-05-06', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (168, 10, '2026-05-06', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (170, 16, '2026-05-06', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (172, 18, '2026-05-06', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (174, 20, '2026-05-06', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (176, 22, '2026-05-05', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (178, 24, '2026-05-05', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (180, 26, '2026-05-05', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (184, 30, '2026-05-05', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (186, 6, '2026-05-04', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (188, 8, '2026-05-04', 'online', 40, 2);
INSERT INTO `attendance_students` VALUES (190, 6, '2026-05-05', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (192, 8, '2026-05-05', 'online', 40, 2);
INSERT INTO `attendance_students` VALUES (194, 6, '2026-05-06', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (196, 8, '2026-05-06', 'online', 40, 2);
INSERT INTO `attendance_students` VALUES (214, 10, '2026-05-07', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (216, 16, '2026-05-07', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (218, 18, '2026-05-07', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (220, 20, '2026-05-07', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (222, 22, '2026-05-07', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (224, 24, '2026-05-07', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (226, 26, '2026-05-07', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (230, 30, '2026-05-07', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (250, 32, '2026-05-07', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (270, 32, '2026-05-06', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (292, 6, '2026-05-07', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (294, 8, '2026-05-07', 'online', 40, 2);
INSERT INTO `attendance_students` VALUES (296, 22, '2026-05-08', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (298, 24, '2026-05-08', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (300, 26, '2026-05-08', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (304, 30, '2026-05-08', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (306, 1, '2026-05-08', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (308, 2, '2026-05-08', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (310, 3, '2026-05-08', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (312, 4, '2026-05-08', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (314, 5, '2026-05-08', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (316, 1, '2026-05-07', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (318, 2, '2026-05-07', 'online', 2, 2);
INSERT INTO `attendance_students` VALUES (320, 3, '2026-05-07', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (322, 4, '2026-05-07', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (324, 5, '2026-05-07', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (326, 1, '2026-05-06', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (328, 2, '2026-05-06', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (330, 3, '2026-05-06', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (332, 4, '2026-05-06', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (334, 5, '2026-05-06', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (336, 1, '2026-05-05', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (338, 2, '2026-05-05', 'absent', 2, 2);
INSERT INTO `attendance_students` VALUES (340, 3, '2026-05-05', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (342, 4, '2026-05-05', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (344, 5, '2026-05-05', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (346, 6, '2026-05-08', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (348, 8, '2026-05-08', 'online', 40, 2);
INSERT INTO `attendance_students` VALUES (350, 22, '2026-05-11', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (352, 24, '2026-05-11', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (354, 26, '2026-05-11', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (358, 30, '2026-05-11', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (360, 10, '2026-05-08', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (362, 16, '2026-05-08', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (364, 18, '2026-05-08', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (366, 20, '2026-05-08', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (368, 32, '2026-05-08', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (370, 10, '2026-05-11', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (372, 16, '2026-05-11', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (374, 18, '2026-05-11', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (376, 20, '2026-05-11', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (378, 32, '2026-05-11', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (380, 6, '2026-05-12', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (382, 8, '2026-05-12', 'online', 40, 2);
INSERT INTO `attendance_students` VALUES (384, 6, '2026-05-11', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (386, 8, '2026-05-11', 'online', 40, 2);
INSERT INTO `attendance_students` VALUES (388, 22, '2026-05-12', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (390, 24, '2026-05-12', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (392, 26, '2026-05-12', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (396, 30, '2026-05-12', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (398, 10, '2026-05-12', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (400, 16, '2026-05-12', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (402, 18, '2026-05-12', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (404, 20, '2026-05-12', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (406, 32, '2026-05-12', 'leave', 44, 2);
INSERT INTO `attendance_students` VALUES (408, 10, '2026-05-13', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (410, 16, '2026-05-13', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (412, 18, '2026-05-13', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (414, 20, '2026-05-13', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (416, 32, '2026-05-13', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (448, 1, '2026-05-13', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (450, 2, '2026-05-13', 'online', 30, 2);
INSERT INTO `attendance_students` VALUES (452, 3, '2026-05-13', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (454, 4, '2026-05-13', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (456, 5, '2026-05-13', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (458, 1, '2026-05-12', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (460, 2, '2026-05-12', 'online', 30, 2);
INSERT INTO `attendance_students` VALUES (462, 3, '2026-05-12', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (464, 4, '2026-05-12', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (466, 5, '2026-05-12', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (468, 1, '2026-05-11', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (470, 2, '2026-05-11', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (472, 3, '2026-05-11', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (474, 4, '2026-05-11', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (476, 5, '2026-05-11', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (478, 22, '2026-05-14', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (480, 24, '2026-05-14', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (482, 26, '2026-05-14', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (486, 30, '2026-05-14', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (498, 22, '2026-05-13', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (500, 24, '2026-05-13', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (502, 26, '2026-05-13', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (506, 30, '2026-05-13', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (508, 1, '2026-05-15', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (510, 2, '2026-05-15', 'leave', 30, 2);
INSERT INTO `attendance_students` VALUES (512, 3, '2026-05-15', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (514, 4, '2026-05-15', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (516, 5, '2026-05-15', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (518, 1, '2026-05-14', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (520, 2, '2026-05-14', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (522, 3, '2026-05-14', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (524, 4, '2026-05-14', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (526, 5, '2026-05-14', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (528, 6, '2026-05-15', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (530, 8, '2026-05-15', 'online', 40, 2);
INSERT INTO `attendance_students` VALUES (536, 6, '2026-05-14', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (538, 8, '2026-05-14', 'online', 40, 2);
INSERT INTO `attendance_students` VALUES (540, 6, '2026-05-13', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (542, 8, '2026-05-13', 'online', 40, 2);
INSERT INTO `attendance_students` VALUES (548, 6, '2026-05-18', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (550, 8, '2026-05-18', 'online', 2, 2);
INSERT INTO `attendance_students` VALUES (552, 6, '2026-05-19', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (554, 8, '2026-05-19', 'online', 2, 2);
INSERT INTO `attendance_students` VALUES (556, 1, '2026-05-19', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (558, 2, '2026-05-19', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (560, 3, '2026-05-19', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (562, 4, '2026-05-19', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (564, 5, '2026-05-19', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (566, 1, '2026-05-18', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (568, 2, '2026-05-18', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (570, 3, '2026-05-18', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (572, 4, '2026-05-18', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (574, 5, '2026-05-18', 'present', 30, 2);
INSERT INTO `attendance_students` VALUES (576, 6, '2026-05-20', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (578, 8, '2026-05-20', 'online', 2, 2);
INSERT INTO `attendance_students` VALUES (584, 1, '2026-05-20', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (586, 2, '2026-05-20', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (588, 3, '2026-05-20', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (590, 4, '2026-05-20', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (592, 5, '2026-05-20', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (594, 22, '2026-05-21', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (596, 24, '2026-05-21', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (598, 26, '2026-05-21', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (602, 30, '2026-05-21', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (604, 6, '2026-05-21', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (606, 8, '2026-05-21', 'online', 2, 2);
INSERT INTO `attendance_students` VALUES (616, 1, '2026-05-21', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (618, 2, '2026-05-21', 'absent', 36, 2);
INSERT INTO `attendance_students` VALUES (620, 3, '2026-05-21', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (622, 4, '2026-05-21', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (624, 5, '2026-05-21', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (626, 6, '2026-05-22', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (628, 8, '2026-05-22', 'online', 2, 2);
INSERT INTO `attendance_students` VALUES (634, 6, '2026-06-01', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (636, 8, '2026-06-01', 'online', 2, 2);
INSERT INTO `attendance_students` VALUES (642, 1, '2026-06-01', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (644, 2, '2026-06-01', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (646, 3, '2026-06-01', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (648, 4, '2026-06-01', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (650, 5, '2026-06-01', 'leave', 36, 2);
INSERT INTO `attendance_students` VALUES (652, 22, '2026-06-01', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (654, 24, '2026-06-01', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (656, 26, '2026-06-01', 'absent', 54, 2);
INSERT INTO `attendance_students` VALUES (660, 30, '2026-06-01', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (662, 6, '2026-06-02', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (664, 8, '2026-06-02', 'online', 2, 2);
INSERT INTO `attendance_students` VALUES (670, 22, '2026-06-02', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (672, 24, '2026-06-02', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (674, 26, '2026-06-02', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (676, 30, '2026-06-02', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (678, 6, '2026-06-03', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (680, 8, '2026-06-03', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (682, 22, '2026-05-22', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (684, 24, '2026-05-22', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (686, 26, '2026-05-22', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (688, 30, '2026-05-22', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (690, 22, '2026-05-20', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (692, 24, '2026-05-20', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (694, 26, '2026-05-20', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (696, 30, '2026-05-20', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (698, 22, '2026-05-19', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (700, 24, '2026-05-19', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (702, 26, '2026-05-19', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (704, 30, '2026-05-19', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (706, 22, '2026-05-18', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (708, 24, '2026-05-18', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (710, 26, '2026-05-18', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (712, 30, '2026-05-18', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (714, 22, '2026-05-16', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (716, 24, '2026-05-16', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (718, 26, '2026-05-16', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (720, 30, '2026-05-16', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (722, 22, '2026-05-15', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (724, 24, '2026-05-15', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (726, 26, '2026-05-15', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (728, 30, '2026-05-15', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (730, 22, '2026-05-09', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (732, 24, '2026-05-09', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (734, 26, '2026-05-09', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (736, 30, '2026-05-09', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (738, 22, '2026-06-03', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (740, 24, '2026-06-03', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (742, 26, '2026-06-03', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (744, 30, '2026-06-03', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (746, 6, '2026-06-04', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (748, 8, '2026-06-04', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (754, 1, '2026-06-04', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (756, 2, '2026-06-04', 'leave', 36, 2);
INSERT INTO `attendance_students` VALUES (758, 3, '2026-06-04', 'absent', 36, 2);
INSERT INTO `attendance_students` VALUES (760, 4, '2026-06-04', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (762, 5, '2026-06-04', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (764, 10, '2026-06-04', 'present', 52, 2);
INSERT INTO `attendance_students` VALUES (766, 16, '2026-06-04', 'present', 52, 2);
INSERT INTO `attendance_students` VALUES (768, 18, '2026-06-04', 'present', 52, 2);
INSERT INTO `attendance_students` VALUES (770, 20, '2026-06-04', 'present', 52, 2);
INSERT INTO `attendance_students` VALUES (772, 32, '2026-06-04', 'absent', 52, 2);
INSERT INTO `attendance_students` VALUES (774, 22, '2026-06-04', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (776, 24, '2026-06-04', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (778, 26, '2026-06-04', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (780, 30, '2026-06-04', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (782, 10, '2026-06-05', 'present', 52, 2);
INSERT INTO `attendance_students` VALUES (784, 16, '2026-06-05', 'present', 52, 2);
INSERT INTO `attendance_students` VALUES (786, 18, '2026-06-05', 'present', 52, 2);
INSERT INTO `attendance_students` VALUES (788, 20, '2026-06-05', 'present', 52, 2);
INSERT INTO `attendance_students` VALUES (790, 32, '2026-06-05', 'absent', 52, 2);
INSERT INTO `attendance_students` VALUES (792, 22, '2026-06-05', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (794, 24, '2026-06-05', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (796, 26, '2026-06-05', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (798, 30, '2026-06-05', 'leave', 54, 2);
INSERT INTO `attendance_students` VALUES (800, 6, '2026-06-05', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (802, 8, '2026-06-05', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (804, 22, '2026-06-06', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (806, 24, '2026-06-06', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (808, 26, '2026-06-06', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (810, 30, '2026-06-06', 'online', 54, 2);
INSERT INTO `attendance_students` VALUES (812, 10, '2026-06-03', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (814, 16, '2026-06-03', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (816, 18, '2026-06-03', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (818, 20, '2026-06-03', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (820, 32, '2026-06-03', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (822, 10, '2026-06-02', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (824, 16, '2026-06-02', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (826, 18, '2026-06-02', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (828, 20, '2026-06-02', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (830, 32, '2026-06-02', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (832, 10, '2026-06-01', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (834, 16, '2026-06-01', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (836, 18, '2026-06-01', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (838, 20, '2026-06-01', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (840, 32, '2026-06-01', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (842, 10, '2026-06-08', 'absent', 52, 2);
INSERT INTO `attendance_students` VALUES (844, 16, '2026-06-08', 'present', 52, 2);
INSERT INTO `attendance_students` VALUES (846, 18, '2026-06-08', 'present', 52, 2);
INSERT INTO `attendance_students` VALUES (848, 20, '2026-06-08', 'present', 52, 2);
INSERT INTO `attendance_students` VALUES (850, 32, '2026-06-08', 'absent', 52, 2);
INSERT INTO `attendance_students` VALUES (852, 6, '2026-06-08', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (854, 8, '2026-06-08', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (856, 22, '2026-06-08', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (858, 24, '2026-06-08', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (860, 26, '2026-06-08', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (862, 30, '2026-06-08', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (864, 1, '2026-06-09', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (866, 2, '2026-06-09', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (868, 3, '2026-06-09', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (870, 4, '2026-06-09', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (872, 5, '2026-06-09', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (874, 1, '2026-06-02', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (876, 2, '2026-06-02', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (878, 3, '2026-06-02', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (880, 4, '2026-06-02', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (882, 5, '2026-06-02', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (884, 1, '2026-06-03', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (886, 2, '2026-06-03', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (888, 3, '2026-06-03', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (890, 4, '2026-06-03', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (892, 5, '2026-06-03', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (894, 1, '2026-06-05', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (896, 2, '2026-06-05', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (898, 3, '2026-06-05', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (900, 4, '2026-06-05', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (902, 5, '2026-06-05', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (904, 1, '2026-06-08', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (906, 2, '2026-06-08', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (908, 3, '2026-06-08', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (910, 4, '2026-06-08', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (912, 5, '2026-06-08', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (914, 6, '2026-06-09', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (916, 8, '2026-06-09', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (918, 10, '2026-06-09', 'absent', 2, 2);
INSERT INTO `attendance_students` VALUES (920, 16, '2026-06-09', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (922, 18, '2026-06-09', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (924, 20, '2026-06-09', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (926, 32, '2026-06-09', 'absent', 2, 2);
INSERT INTO `attendance_students` VALUES (928, 10, '2026-06-10', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (930, 16, '2026-06-10', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (932, 18, '2026-06-10', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (934, 20, '2026-06-10', 'present', 2, 2);
INSERT INTO `attendance_students` VALUES (936, 32, '2026-06-10', 'absent', 2, 2);
INSERT INTO `attendance_students` VALUES (938, 1, '2026-06-10', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (940, 2, '2026-06-10', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (942, 3, '2026-06-10', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (944, 4, '2026-06-10', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (946, 5, '2026-06-10', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (948, 22, '2026-06-10', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (950, 24, '2026-06-10', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (952, 26, '2026-06-10', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (954, 30, '2026-06-10', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (956, 22, '2026-06-09', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (958, 24, '2026-06-09', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (960, 26, '2026-06-09', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (962, 30, '2026-06-09', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (964, 6, '2026-06-10', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (966, 8, '2026-06-10', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (968, 6, '2026-06-11', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (970, 8, '2026-06-11', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (972, 1, '2026-06-11', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (974, 2, '2026-06-11', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (976, 3, '2026-06-11', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (978, 4, '2026-06-11', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (980, 5, '2026-06-11', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (982, 22, '2026-06-12', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (984, 24, '2026-06-12', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (986, 26, '2026-06-12', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (988, 30, '2026-06-12', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (990, 22, '2026-06-13', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (992, 24, '2026-06-13', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (994, 26, '2026-06-13', 'absent', 54, 2);
INSERT INTO `attendance_students` VALUES (996, 30, '2026-06-13', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (2918, 194, '2026-06-02', 'present', 646, 1);
INSERT INTO `attendance_students` VALUES (2920, 196, '2026-06-02', 'absent', 646, 1);
INSERT INTO `attendance_students` VALUES (3078, 194, '2026-06-03', 'present', 646, 1);
INSERT INTO `attendance_students` VALUES (3080, 196, '2026-06-03', 'online', 646, 1);
INSERT INTO `attendance_students` VALUES (3238, 194, '2026-06-04', 'leave', 646, 1);
INSERT INTO `attendance_students` VALUES (3240, 196, '2026-06-04', 'present', 646, 1);
INSERT INTO `attendance_students` VALUES (3398, 194, '2026-06-05', 'absent', 646, 1);
INSERT INTO `attendance_students` VALUES (3400, 196, '2026-06-05', 'present', 646, 1);
INSERT INTO `attendance_students` VALUES (3558, 194, '2026-06-06', 'online', 646, 1);
INSERT INTO `attendance_students` VALUES (3560, 196, '2026-06-06', 'present', 646, 1);
INSERT INTO `attendance_students` VALUES (3718, 194, '2026-06-08', 'present', 646, 1);
INSERT INTO `attendance_students` VALUES (3720, 196, '2026-06-08', 'present', 646, 1);
INSERT INTO `attendance_students` VALUES (3878, 194, '2026-06-09', 'present', 646, 1);
INSERT INTO `attendance_students` VALUES (3880, 196, '2026-06-09', 'present', 646, 1);
INSERT INTO `attendance_students` VALUES (4038, 194, '2026-06-10', 'present', 646, 1);
INSERT INTO `attendance_students` VALUES (4040, 196, '2026-06-10', 'leave', 646, 1);
INSERT INTO `attendance_students` VALUES (4198, 194, '2026-06-11', 'present', 646, 1);
INSERT INTO `attendance_students` VALUES (4200, 196, '2026-06-11', 'absent', 646, 1);
INSERT INTO `attendance_students` VALUES (4358, 194, '2026-06-12', 'present', 646, 1);
INSERT INTO `attendance_students` VALUES (4360, 196, '2026-06-12', 'online', 646, 1);
INSERT INTO `attendance_students` VALUES (4518, 194, '2026-06-13', 'leave', 646, 1);
INSERT INTO `attendance_students` VALUES (4520, 196, '2026-06-13', 'present', 646, 1);
INSERT INTO `attendance_students` VALUES (4678, 194, '2026-06-15', 'online', 646, 1);
INSERT INTO `attendance_students` VALUES (4680, 196, '2026-06-15', 'present', 646, 1);
INSERT INTO `attendance_students` VALUES (4838, 10, '2026-06-12', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (4840, 16, '2026-06-12', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (4842, 18, '2026-06-12', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (4844, 20, '2026-06-12', 'leave', 44, 2);
INSERT INTO `attendance_students` VALUES (4846, 32, '2026-06-12', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (4848, 10, '2026-06-15', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (4850, 16, '2026-06-15', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (4852, 18, '2026-06-15', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (4854, 20, '2026-06-15', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (4856, 32, '2026-06-15', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (4858, 1, '2026-06-15', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (4860, 2, '2026-06-15', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (4862, 3, '2026-06-15', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (4864, 4, '2026-06-15', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (4866, 5, '2026-06-15', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (4868, 6, '2026-06-15', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (4870, 8, '2026-06-15', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (4872, 22, '2026-06-15', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (4874, 24, '2026-06-15', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (4876, 26, '2026-06-15', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (4878, 30, '2026-06-15', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (4880, 354, '2026-06-03', 'present', 832, 1);
INSERT INTO `attendance_students` VALUES (4980, 454, '2026-06-03', 'absent', 2, 1);
INSERT INTO `attendance_students` VALUES (5040, 354, '2026-06-04', 'present', 832, 1);
INSERT INTO `attendance_students` VALUES (5140, 454, '2026-06-04', 'online', 2, 1);
INSERT INTO `attendance_students` VALUES (5200, 354, '2026-06-05', 'present', 832, 1);
INSERT INTO `attendance_students` VALUES (5300, 454, '2026-06-05', 'present', 2, 1);
INSERT INTO `attendance_students` VALUES (5360, 354, '2026-06-06', 'present', 832, 1);
INSERT INTO `attendance_students` VALUES (5460, 454, '2026-06-06', 'present', 2, 1);
INSERT INTO `attendance_students` VALUES (5520, 354, '2026-06-08', 'leave', 832, 1);
INSERT INTO `attendance_students` VALUES (5620, 454, '2026-06-08', 'present', 2, 1);
INSERT INTO `attendance_students` VALUES (5680, 354, '2026-06-09', 'absent', 832, 1);
INSERT INTO `attendance_students` VALUES (5780, 454, '2026-06-09', 'present', 2, 1);
INSERT INTO `attendance_students` VALUES (5840, 354, '2026-06-10', 'online', 832, 1);
INSERT INTO `attendance_students` VALUES (5940, 454, '2026-06-10', 'present', 2, 1);
INSERT INTO `attendance_students` VALUES (6000, 354, '2026-06-11', 'present', 832, 1);
INSERT INTO `attendance_students` VALUES (6100, 454, '2026-06-11', 'leave', 2, 1);
INSERT INTO `attendance_students` VALUES (6160, 354, '2026-06-12', 'present', 832, 1);
INSERT INTO `attendance_students` VALUES (6260, 454, '2026-06-12', 'absent', 2, 1);
INSERT INTO `attendance_students` VALUES (6320, 354, '2026-06-13', 'present', 832, 1);
INSERT INTO `attendance_students` VALUES (6420, 454, '2026-06-13', 'online', 2, 1);
INSERT INTO `attendance_students` VALUES (6480, 354, '2026-06-15', 'present', 832, 1);
INSERT INTO `attendance_students` VALUES (6580, 454, '2026-06-15', 'present', 2, 1);
INSERT INTO `attendance_students` VALUES (6640, 354, '2026-06-16', 'present', 832, 1);
INSERT INTO `attendance_students` VALUES (6740, 454, '2026-06-16', 'present', 2, 1);
INSERT INTO `attendance_students` VALUES (6800, 6, '2026-06-16', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (6802, 8, '2026-06-16', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (6804, 10, '2026-06-16', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6806, 16, '2026-06-16', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6808, 18, '2026-06-16', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6810, 20, '2026-06-16', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6812, 32, '2026-06-16', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (6814, 22, '2026-06-16', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6816, 24, '2026-06-16', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6818, 26, '2026-06-16', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6820, 30, '2026-06-16', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6822, 6, '2026-06-17', 'online', 40, 2);
INSERT INTO `attendance_students` VALUES (6824, 8, '2026-06-17', 'online', 40, 2);
INSERT INTO `attendance_students` VALUES (6826, 6, '2026-06-18', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (6828, 8, '2026-06-18', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (6830, 22, '2026-06-18', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6832, 24, '2026-06-18', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6834, 26, '2026-06-18', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6836, 30, '2026-06-18', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6838, 10, '2026-06-18', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6840, 16, '2026-06-18', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6842, 18, '2026-06-18', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6844, 20, '2026-06-18', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6854, 32, '2026-06-18', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (6856, 10, '2026-06-17', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6858, 16, '2026-06-17', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6860, 18, '2026-06-17', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6862, 20, '2026-06-17', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (6864, 32, '2026-06-17', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (6866, 6, '2026-06-12', 'online', 40, 2);
INSERT INTO `attendance_students` VALUES (6868, 8, '2026-06-12', 'online', 40, 2);
INSERT INTO `attendance_students` VALUES (6870, 1, '2026-06-16', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6872, 2, '2026-06-16', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6874, 3, '2026-06-16', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6876, 4, '2026-06-16', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6878, 5, '2026-06-16', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6880, 1, '2026-06-17', 'absent', 36, 2);
INSERT INTO `attendance_students` VALUES (6882, 2, '2026-06-17', 'absent', 36, 2);
INSERT INTO `attendance_students` VALUES (6884, 3, '2026-06-17', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6886, 4, '2026-06-17', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6888, 5, '2026-06-17', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6890, 1, '2026-06-18', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6892, 2, '2026-06-18', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6894, 3, '2026-06-18', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6896, 4, '2026-06-18', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6898, 5, '2026-06-18', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6900, 22, '2026-06-19', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6902, 24, '2026-06-19', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6904, 26, '2026-06-19', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6906, 30, '2026-06-19', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6908, 1, '2026-06-19', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6910, 2, '2026-06-19', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6912, 3, '2026-06-19', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6914, 4, '2026-06-19', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6916, 5, '2026-06-19', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6918, 22, '2026-06-20', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6920, 24, '2026-06-20', 'online', 54, 2);
INSERT INTO `attendance_students` VALUES (6922, 26, '2026-06-20', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6924, 30, '2026-06-20', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6926, 10, '2026-06-22', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6928, 16, '2026-06-22', 'leave', 44, 2);
INSERT INTO `attendance_students` VALUES (6930, 18, '2026-06-22', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6932, 20, '2026-06-22', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6934, 32, '2026-06-22', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (6936, 10, '2026-06-19', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6938, 16, '2026-06-19', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6940, 18, '2026-06-19', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6942, 20, '2026-06-19', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6944, 32, '2026-06-19', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (6946, 6, '2026-06-22', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (6948, 8, '2026-06-22', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (6950, 22, '2026-06-22', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6952, 24, '2026-06-22', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6954, 26, '2026-06-22', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6956, 30, '2026-06-22', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6958, 1, '2026-06-22', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6960, 2, '2026-06-22', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6962, 3, '2026-06-22', 'leave', 36, 2);
INSERT INTO `attendance_students` VALUES (6964, 4, '2026-06-22', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6966, 5, '2026-06-22', 'absent', 36, 2);
INSERT INTO `attendance_students` VALUES (6968, 22, '2026-06-23', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6970, 24, '2026-06-23', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6972, 26, '2026-06-23', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6974, 30, '2026-06-23', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (6976, 10, '2026-06-23', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6978, 16, '2026-06-23', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6980, 18, '2026-06-23', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6982, 20, '2026-06-23', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (6984, 32, '2026-06-23', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (6986, 1, '2026-06-23', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6988, 2, '2026-06-23', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6990, 3, '2026-06-23', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6992, 4, '2026-06-23', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6994, 5, '2026-06-23', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (6996, 6, '2026-06-24', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (6998, 8, '2026-06-24', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (7000, 10, '2026-06-24', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7002, 16, '2026-06-24', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7004, 18, '2026-06-24', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7006, 20, '2026-06-24', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7008, 32, '2026-06-24', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7010, 22, '2026-06-24', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7012, 24, '2026-06-24', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7014, 26, '2026-06-24', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7016, 30, '2026-06-24', 'absent', 54, 2);
INSERT INTO `attendance_students` VALUES (7018, 22, '2026-06-29', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7020, 24, '2026-06-29', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7022, 26, '2026-06-29', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7024, 30, '2026-06-29', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7026, 6, '2026-06-29', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (7028, 8, '2026-06-29', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (7034, 1, '2026-06-29', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7036, 2, '2026-06-29', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7038, 3, '2026-06-29', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7040, 4, '2026-06-29', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7042, 5, '2026-06-29', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7044, 6, '2026-06-30', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (7046, 8, '2026-06-30', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (7048, 22, '2026-06-30', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7050, 24, '2026-06-30', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7052, 26, '2026-06-30', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7054, 30, '2026-06-30', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7056, 1, '2026-06-30', 'absent', 36, 2);
INSERT INTO `attendance_students` VALUES (7058, 2, '2026-06-30', 'leave', 36, 2);
INSERT INTO `attendance_students` VALUES (7060, 3, '2026-06-30', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7062, 4, '2026-06-30', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7064, 5, '2026-06-30', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7066, 6, '2026-07-01', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (7068, 8, '2026-07-01', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (7070, 22, '2026-07-01', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7072, 24, '2026-07-01', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7074, 26, '2026-07-01', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7076, 30, '2026-07-01', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7078, 1, '2026-07-01', 'absent', 36, 2);
INSERT INTO `attendance_students` VALUES (7080, 2, '2026-07-01', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7082, 3, '2026-07-01', 'absent', 36, 2);
INSERT INTO `attendance_students` VALUES (7084, 4, '2026-07-01', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7086, 5, '2026-07-01', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7088, 10, '2026-07-01', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7090, 16, '2026-07-01', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7092, 18, '2026-07-01', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7094, 20, '2026-07-01', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7096, 32, '2026-07-01', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7098, 514, '2026-07-01', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7100, 10, '2026-06-30', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7102, 16, '2026-06-30', 'leave', 44, 2);
INSERT INTO `attendance_students` VALUES (7104, 18, '2026-06-30', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7106, 20, '2026-06-30', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7108, 32, '2026-06-30', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7110, 514, '2026-06-30', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7112, 10, '2026-06-29', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7114, 16, '2026-06-29', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7116, 18, '2026-06-29', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7118, 20, '2026-06-29', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7120, 32, '2026-06-29', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7122, 514, '2026-06-29', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7124, 10, '2026-06-26', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7126, 16, '2026-06-26', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7128, 18, '2026-06-26', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7130, 20, '2026-06-26', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7132, 32, '2026-06-26', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7134, 514, '2026-06-26', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7136, 6, '2026-07-02', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (7138, 8, '2026-07-02', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (7140, 10, '2026-07-02', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7142, 16, '2026-07-02', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7144, 18, '2026-07-02', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7146, 20, '2026-07-02', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7148, 32, '2026-07-02', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7150, 514, '2026-07-02', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7152, 22, '2026-07-02', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7154, 24, '2026-07-02', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7156, 26, '2026-07-02', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7158, 30, '2026-07-02', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7160, 1, '2026-07-02', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7162, 2, '2026-07-02', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7164, 3, '2026-07-02', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7166, 4, '2026-07-02', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7168, 5, '2026-07-02', 'absent', 36, 2);
INSERT INTO `attendance_students` VALUES (7170, 6, '2026-07-03', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (7172, 8, '2026-07-03', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (7174, 22, '2026-07-03', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7176, 24, '2026-07-03', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7178, 26, '2026-07-03', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7180, 30, '2026-07-03', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7182, 22, '2026-07-04', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7184, 24, '2026-07-04', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7186, 26, '2026-07-04', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7188, 30, '2026-07-04', 'absent', 54, 2);
INSERT INTO `attendance_students` VALUES (7190, 22, '2026-07-06', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7192, 24, '2026-07-06', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7194, 26, '2026-07-06', 'online', 54, 2);
INSERT INTO `attendance_students` VALUES (7196, 30, '2026-07-06', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7198, 1, '2026-07-06', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7200, 2, '2026-07-06', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7202, 3, '2026-07-06', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7204, 4, '2026-07-06', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7206, 5, '2026-07-06', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7208, 1, '2026-07-03', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7210, 2, '2026-07-03', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7212, 3, '2026-07-03', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7214, 4, '2026-07-03', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7216, 5, '2026-07-03', 'absent', 36, 2);
INSERT INTO `attendance_students` VALUES (7228, 6, '2026-07-06', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (7230, 8, '2026-07-06', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (7236, 6, '2026-07-07', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (7238, 8, '2026-07-07', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (7244, 10, '2026-07-03', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7246, 16, '2026-07-03', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7248, 18, '2026-07-03', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7250, 20, '2026-07-03', 'leave', 44, 2);
INSERT INTO `attendance_students` VALUES (7252, 32, '2026-07-03', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7254, 514, '2026-07-03', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7256, 10, '2026-07-07', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7258, 16, '2026-07-07', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7260, 18, '2026-07-07', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7262, 20, '2026-07-07', 'leave', 44, 2);
INSERT INTO `attendance_students` VALUES (7264, 32, '2026-07-07', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7266, 514, '2026-07-07', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7268, 10, '2026-07-06', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7270, 16, '2026-07-06', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7272, 18, '2026-07-06', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7274, 20, '2026-07-06', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7276, 32, '2026-07-06', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7278, 514, '2026-07-06', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7284, 22, '2026-07-07', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7286, 24, '2026-07-07', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7288, 26, '2026-07-07', 'absent', 54, 2);
INSERT INTO `attendance_students` VALUES (7290, 30, '2026-07-07', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7292, 6, '2026-07-08', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (7294, 8, '2026-07-08', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (7296, 22, '2026-07-08', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7298, 24, '2026-07-08', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7300, 26, '2026-07-08', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7302, 30, '2026-07-08', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7304, 22, '2026-07-09', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7306, 24, '2026-07-09', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7308, 26, '2026-07-09', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7310, 30, '2026-07-09', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7312, 6, '2026-07-10', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (7314, 8, '2026-07-10', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (7316, 10, '2026-07-10', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7318, 16, '2026-07-10', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7320, 18, '2026-07-10', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7322, 20, '2026-07-10', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7324, 32, '2026-07-10', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7326, 514, '2026-07-10', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7328, 10, '2026-07-09', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7330, 16, '2026-07-09', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7332, 18, '2026-07-09', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7334, 20, '2026-07-09', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7336, 32, '2026-07-09', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7338, 514, '2026-07-09', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7340, 10, '2026-07-08', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7342, 16, '2026-07-08', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7344, 18, '2026-07-08', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7346, 20, '2026-07-08', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7348, 32, '2026-07-08', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7350, 514, '2026-07-08', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7352, 22, '2026-07-10', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7354, 24, '2026-07-10', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7356, 26, '2026-07-10', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7358, 30, '2026-07-10', 'absent', 54, 2);
INSERT INTO `attendance_students` VALUES (7360, 22, '2026-07-11', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7362, 24, '2026-07-11', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7364, 26, '2026-07-11', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7366, 30, '2026-07-11', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7368, 6, '2026-07-13', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (7370, 8, '2026-07-13', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (7372, 22, '2026-07-13', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7374, 24, '2026-07-13', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7376, 26, '2026-07-13', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7378, 30, '2026-07-13', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7380, 6, '2026-07-14', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (7382, 8, '2026-07-14', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (7384, 1, '2026-07-13', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7386, 2, '2026-07-13', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7388, 3, '2026-07-13', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7390, 4, '2026-07-13', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7392, 5, '2026-07-13', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7394, 22, '2026-07-14', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7396, 24, '2026-07-14', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7398, 26, '2026-07-14', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7400, 30, '2026-07-14', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7412, 1, '2026-07-14', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7414, 2, '2026-07-14', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7416, 3, '2026-07-14', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7418, 4, '2026-07-14', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7420, 5, '2026-07-14', 'present', 36, 2);
INSERT INTO `attendance_students` VALUES (7430, 6, '2026-07-15', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (7432, 8, '2026-07-15', 'leave', 40, 2);
INSERT INTO `attendance_students` VALUES (7434, 22, '2026-07-15', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7436, 24, '2026-07-15', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7438, 26, '2026-07-15', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7440, 30, '2026-07-15', 'present', 54, 2);
INSERT INTO `attendance_students` VALUES (7442, 10, '2026-07-15', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7444, 16, '2026-07-15', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7446, 18, '2026-07-15', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7448, 20, '2026-07-15', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7450, 32, '2026-07-15', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7452, 514, '2026-07-15', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7454, 10, '2026-07-14', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7456, 16, '2026-07-14', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7458, 18, '2026-07-14', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7460, 20, '2026-07-14', 'leave', 44, 2);
INSERT INTO `attendance_students` VALUES (7462, 514, '2026-07-14', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7464, 10, '2026-07-13', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7466, 16, '2026-07-13', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7468, 18, '2026-07-13', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7470, 20, '2026-07-13', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (7472, 32, '2026-07-13', 'absent', 44, 2);
INSERT INTO `attendance_students` VALUES (7474, 514, '2026-07-13', 'present', 44, 2);
INSERT INTO `attendance_students` VALUES (15156, 6, '2026-07-16', 'present', 40, 2);
INSERT INTO `attendance_students` VALUES (15158, 8, '2026-07-16', 'leave', 40, 2);

-- ----------------------------
-- Table structure for attendance_teachers
-- ----------------------------
DROP TABLE IF EXISTS `attendance_teachers`;
CREATE TABLE `attendance_teachers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacher_id` int NULL DEFAULT NULL,
  `class_id` int NULL DEFAULT NULL,
  `date` date NOT NULL,
  `classes_taken` int NULL DEFAULT 0,
  `marked_by` int NULL DEFAULT NULL,
  `status` enum('present','absent','leave') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'present',
  `tenant_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `teacher_class_date`(`teacher_id` ASC, `class_id` ASC, `date` ASC) USING BTREE,
  INDEX `marked_by`(`marked_by` ASC) USING BTREE,
  INDEX `attendance_teachers_ibfk_3`(`class_id` ASC) USING BTREE,
  INDEX `fk_attendance_teachers_tenant`(`tenant_id` ASC) USING BTREE,
  CONSTRAINT `attendance_teachers_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `attendance_teachers_ibfk_2` FOREIGN KEY (`marked_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `attendance_teachers_ibfk_3` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_attendance_teachers_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3504 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of attendance_teachers
-- ----------------------------
INSERT INTO `attendance_teachers` VALUES (2, 282, NULL, '2026-05-05', 0, 2, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (4, 284, NULL, '2026-05-05', 0, 2, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (6, 286, NULL, '2026-05-05', 0, 2, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (8, 288, NULL, '2026-05-05', 2, 2, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (10, 290, NULL, '2026-05-05', 0, 2, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (12, 292, NULL, '2026-05-05', 0, 2, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (14, 294, NULL, '2026-05-05', 0, 2, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (16, 296, NULL, '2026-05-05', 0, 2, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (18, 298, NULL, '2026-05-05', 0, 2, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (20, 300, NULL, '2026-05-05', 0, 2, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (22, 288, 12, '2026-05-19', 2, 30, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (24, 296, 12, '2026-05-19', 1, 30, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (26, 282, 12, '2026-05-18', 1, 30, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (28, 296, 12, '2026-05-18', 1, 30, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (30, 284, 12, '2026-05-18', 2, 30, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (36, 284, 12, '2026-05-19', 2, 30, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (42, 296, 16, '2026-05-11', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (44, 296, 16, '2026-05-13', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (48, 296, 16, '2026-05-12', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (52, 296, 12, '2026-05-20', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (54, 288, 12, '2026-05-20', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (56, 282, 12, '2026-05-20', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (58, 290, 12, '2026-05-21', 0, 36, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (60, 292, 12, '2026-05-21', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (66, 296, 12, '2026-06-01', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (68, 294, 12, '2026-06-01', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (70, 284, 12, '2026-06-01', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (74, 282, 12, '2026-06-01', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (76, 292, 16, '2026-06-01', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (78, 300, 16, '2026-06-01', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (80, 296, 16, '2026-06-02', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (82, 290, 16, '2026-06-02', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (84, 294, 16, '2026-06-02', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (86, 292, 16, '2026-06-02', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (88, 288, 10, '2026-06-03', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (90, 286, 10, '2026-06-03', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (92, 296, 16, '2026-06-03', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (94, 294, 16, '2026-06-03', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (96, 292, 16, '2026-06-03', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (98, 290, 16, '2026-06-03', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (100, 290, 10, '2026-06-04', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (102, 294, 10, '2026-06-04', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (104, 302, 4, '2026-06-04', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (106, 298, 4, '2026-06-04', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (108, 282, 12, '2026-06-04', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (110, 292, 12, '2026-06-04', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (116, 288, 16, '2026-06-04', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (120, 286, 4, '2026-06-05', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (122, 288, 16, '2026-06-05', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (124, 298, 16, '2026-06-05', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (126, 290, 10, '2026-06-05', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (128, 282, 16, '2026-06-06', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (130, 292, 16, '2026-06-06', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (132, 288, 16, '2026-06-06', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (134, 298, 16, '2026-06-06', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (138, 286, 4, '2026-06-08', 0, 52, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (142, 284, 4, '2026-06-08', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (144, 288, 10, '2026-06-08', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (146, 294, 10, '2026-06-08', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (148, 290, 4, '2026-06-08', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (150, 292, 16, '2026-06-08', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (152, 302, 4, '2026-06-08', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (156, 286, 10, '2026-06-09', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (158, 288, 12, '2026-06-09', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (160, 288, 12, '2026-06-02', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (164, 284, 12, '2026-06-02', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (168, 282, 12, '2026-06-03', 0, 36, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (172, 292, 12, '2026-06-05', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (174, 294, 12, '2026-06-05', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (178, 296, 12, '2026-06-08', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (180, 282, 12, '2026-06-08', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (184, 296, 12, '2026-06-09', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (188, 302, 4, '2026-06-03', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (190, 286, 4, '2026-06-02', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (192, 302, 4, '2026-06-01', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (194, 290, 4, '2026-06-01', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (196, 286, 4, '2026-06-01', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (198, 292, 10, '2026-06-09', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (200, 284, 12, '2026-06-09', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (204, 296, 16, '2026-05-19', 1, 30, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (206, 296, 16, '2026-05-18', 1, 30, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (208, 284, 4, '2026-05-18', 1, 30, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (210, 296, 12, '2026-05-11', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (212, 296, 12, '2026-05-13', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (214, 296, 12, '2026-05-12', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (216, 296, 16, '2026-05-20', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (218, 288, 10, '2026-05-20', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (220, 282, 10, '2026-05-20', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (222, 292, 4, '2026-05-21', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (224, 292, 16, '2026-05-21', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (226, 296, 16, '2026-06-01', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (228, 294, 10, '2026-06-01', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (230, 294, 16, '2026-06-01', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (232, 284, 4, '2026-06-01', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (234, 292, 10, '2026-06-01', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (236, 296, 12, '2026-06-02', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (238, 290, 4, '2026-06-02', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (240, 290, 10, '2026-06-02', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (242, 294, 10, '2026-06-02', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (244, 292, 4, '2026-06-02', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (246, 292, 10, '2026-06-02', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (248, 288, 12, '2026-06-03', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (250, 286, 4, '2026-06-03', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (252, 296, 12, '2026-06-03', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (254, 294, 12, '2026-06-03', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (256, 290, 4, '2026-06-03', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (258, 290, 10, '2026-06-03', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (260, 290, 12, '2026-06-03', 0, 36, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (262, 290, 12, '2026-06-04', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (264, 298, 16, '2026-06-04', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (266, 282, 10, '2026-06-04', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (268, 292, 4, '2026-06-04', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (270, 292, 16, '2026-06-04', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (272, 288, 10, '2026-06-04', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (274, 286, 10, '2026-06-05', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (276, 288, 10, '2026-06-05', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (278, 298, 4, '2026-06-05', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (280, 290, 12, '2026-06-05', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (282, 284, 12, '2026-06-08', 2, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (284, 294, 12, '2026-06-08', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (286, 294, 16, '2026-06-08', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (288, 290, 10, '2026-06-08', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (290, 290, 16, '2026-06-08', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (292, 292, 10, '2026-06-08', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (294, 286, 4, '2026-06-09', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (296, 292, 4, '2026-06-05', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (298, 294, 10, '2026-06-05', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (300, 294, 16, '2026-06-05', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (302, 296, 16, '2026-06-08', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (304, 296, 16, '2026-06-09', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (306, 286, 10, '2026-06-02', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (308, 290, 10, '2026-06-01', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (310, 290, 16, '2026-06-01', 1, 52, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (312, 292, 4, '2026-06-09', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (314, 292, 16, '2026-06-09', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (330, 284, 12, '2026-06-05', 0, 30, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (332, 290, 12, '2026-06-10', 0, 36, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (334, 296, 12, '2026-06-10', 0, 36, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (336, 294, 12, '2026-06-10', 0, 36, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (338, 288, 12, '2026-06-10', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (340, 282, 12, '2026-06-10', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (342, 296, 16, '2026-06-10', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (344, 294, 16, '2026-06-10', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (346, 292, 16, '2026-06-10', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (348, 290, 16, '2026-06-10', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (350, 290, 16, '2026-06-09', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (352, 294, 16, '2026-06-09', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (354, 300, 16, '2026-06-08', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (356, 300, 16, '2026-06-09', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (358, 300, 16, '2026-06-02', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (360, 284, 16, '2026-06-03', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (362, 284, 16, '2026-06-04', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (364, 284, 16, '2026-06-05', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (366, 288, 10, '2026-06-10', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (368, 282, 10, '2026-06-10', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (370, 290, 10, '2026-06-10', 0, 40, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (372, 286, 10, '2026-06-10', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (374, 290, 10, '2026-06-11', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (376, 282, 10, '2026-06-11', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (382, 290, 12, '2026-06-11', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (384, 282, 12, '2026-06-11', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (386, 292, 12, '2026-06-11', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (388, 288, 10, '2026-06-11', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (390, 294, 10, '2026-06-11', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (392, 288, 16, '2026-06-11', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (394, 284, 16, '2026-06-11', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (396, 292, 16, '2026-06-11', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (398, 298, 16, '2026-06-11', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (400, 284, 16, '2026-06-10', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (404, 294, 16, '2026-06-12', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (406, 288, 16, '2026-06-12', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (408, 284, 16, '2026-06-12', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (410, 298, 16, '2026-06-12', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (412, 282, 16, '2026-06-13', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (414, 288, 16, '2026-06-13', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (416, 292, 16, '2026-06-13', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (418, 298, 16, '2026-06-13', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (1212, 324, 34, '2026-06-02', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1214, 326, 34, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1216, 328, 34, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1218, 330, 34, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1220, 330, 36, '2026-06-02', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1222, 332, 36, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1224, 334, 36, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1226, 336, 36, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1228, 336, 38, '2026-06-02', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1230, 338, 38, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1232, 340, 38, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1234, 342, 38, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1236, 342, 40, '2026-06-02', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1238, 324, 40, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1240, 326, 40, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1242, 328, 40, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1244, 328, 42, '2026-06-02', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1246, 330, 42, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1248, 332, 42, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1250, 334, 42, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1252, 334, 44, '2026-06-02', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1254, 336, 44, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1256, 338, 44, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1258, 340, 44, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1260, 340, 46, '2026-06-02', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1262, 342, 46, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1264, 324, 46, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1266, 326, 46, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1268, 326, 48, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1270, 330, 48, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1272, 332, 48, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1274, 334, 48, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1276, 336, 48, '2026-06-02', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1278, 324, 34, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1280, 326, 34, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1282, 328, 34, '2026-06-03', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1284, 330, 34, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1286, 330, 36, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1288, 332, 36, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1290, 334, 36, '2026-06-03', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1292, 336, 36, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1294, 336, 38, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1296, 338, 38, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1298, 340, 38, '2026-06-03', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1300, 342, 38, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1302, 342, 40, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1304, 324, 40, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1306, 326, 40, '2026-06-03', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1308, 328, 40, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1310, 328, 42, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1312, 330, 42, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1314, 332, 42, '2026-06-03', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1316, 334, 42, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1318, 334, 44, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1320, 336, 44, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1322, 338, 44, '2026-06-03', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1324, 340, 44, '2026-06-03', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1326, 340, 46, '2026-06-03', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1328, 342, 46, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1330, 324, 46, '2026-06-03', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1332, 326, 46, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1334, 326, 48, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1336, 328, 48, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1338, 330, 48, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1340, 334, 48, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1342, 336, 48, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1344, 324, 34, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1346, 326, 34, '2026-06-04', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1348, 328, 34, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1350, 330, 34, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1352, 330, 36, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1354, 332, 36, '2026-06-04', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1356, 334, 36, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1358, 336, 36, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1360, 336, 38, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1362, 338, 38, '2026-06-04', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1364, 340, 38, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1366, 342, 38, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1368, 342, 40, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1370, 324, 40, '2026-06-04', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1372, 326, 40, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1374, 328, 40, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1376, 328, 42, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1378, 330, 42, '2026-06-04', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1380, 332, 42, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1382, 334, 42, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1384, 334, 44, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1386, 336, 44, '2026-06-04', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1388, 338, 44, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1390, 340, 44, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1392, 340, 46, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1394, 342, 46, '2026-06-04', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1396, 324, 46, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1398, 326, 46, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1400, 326, 48, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1402, 328, 48, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1404, 332, 48, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1406, 334, 48, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1408, 336, 48, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1410, 324, 34, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1412, 326, 34, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1414, 328, 34, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1416, 330, 34, '2026-06-05', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1418, 330, 36, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1420, 332, 36, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1422, 334, 36, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1424, 336, 36, '2026-06-05', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1426, 336, 38, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1428, 338, 38, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1430, 340, 38, '2026-06-05', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1432, 342, 38, '2026-06-05', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1434, 342, 40, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1436, 324, 40, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1438, 326, 40, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1440, 328, 40, '2026-06-05', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1442, 328, 42, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1444, 330, 42, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1446, 332, 42, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1448, 334, 42, '2026-06-05', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1450, 334, 44, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1452, 336, 44, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1454, 338, 44, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1456, 340, 44, '2026-06-05', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1458, 340, 46, '2026-06-05', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1460, 342, 46, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1462, 324, 46, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1464, 326, 46, '2026-06-05', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1466, 328, 48, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1468, 330, 48, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1470, 332, 48, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1472, 334, 48, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1474, 336, 48, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1476, 324, 34, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1478, 326, 34, '2026-06-06', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1480, 328, 34, '2026-06-06', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1482, 330, 34, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1484, 330, 36, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1486, 332, 36, '2026-06-06', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1488, 334, 36, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1490, 336, 36, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1492, 336, 38, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1494, 338, 38, '2026-06-06', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1496, 340, 38, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1498, 342, 38, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1500, 342, 40, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1502, 324, 40, '2026-06-06', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1504, 326, 40, '2026-06-06', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1506, 328, 40, '2026-06-06', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1508, 328, 42, '2026-06-06', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1510, 330, 42, '2026-06-06', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1512, 332, 42, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1514, 334, 42, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1516, 334, 44, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1518, 336, 44, '2026-06-06', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1520, 338, 44, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1522, 340, 44, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1524, 340, 46, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1526, 342, 46, '2026-06-06', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1528, 324, 46, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1530, 326, 46, '2026-06-06', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1532, 326, 48, '2026-06-06', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1534, 328, 48, '2026-06-06', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1536, 332, 48, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1538, 334, 48, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1540, 336, 48, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1542, 324, 34, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1544, 326, 34, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1546, 328, 34, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1548, 330, 34, '2026-06-08', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1550, 330, 36, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1552, 332, 36, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1554, 334, 36, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1556, 336, 36, '2026-06-08', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1558, 336, 38, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1560, 338, 38, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1562, 340, 38, '2026-06-08', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1564, 342, 38, '2026-06-08', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1566, 342, 40, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1568, 324, 40, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1570, 326, 40, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1572, 328, 40, '2026-06-08', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1574, 328, 42, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1576, 330, 42, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1578, 332, 42, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1580, 334, 42, '2026-06-08', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1582, 334, 44, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1584, 336, 44, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1586, 338, 44, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1588, 340, 44, '2026-06-08', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1590, 340, 46, '2026-06-08', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1592, 342, 46, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1594, 324, 46, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1596, 326, 46, '2026-06-08', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1598, 328, 48, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1600, 330, 48, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1602, 332, 48, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1604, 334, 48, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1606, 336, 48, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1608, 324, 34, '2026-06-09', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1610, 326, 34, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1612, 328, 34, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1614, 330, 34, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1616, 330, 36, '2026-06-09', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1618, 332, 36, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1620, 334, 36, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1622, 336, 36, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1624, 336, 38, '2026-06-09', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1626, 338, 38, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1628, 340, 38, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1630, 342, 38, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1632, 342, 40, '2026-06-09', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1634, 324, 40, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1636, 326, 40, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1638, 328, 40, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1640, 328, 42, '2026-06-09', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1642, 330, 42, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1644, 332, 42, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1646, 334, 42, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1648, 334, 44, '2026-06-09', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1650, 336, 44, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1652, 338, 44, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1654, 340, 44, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1656, 340, 46, '2026-06-09', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1658, 342, 46, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1660, 324, 46, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1662, 326, 46, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1664, 326, 48, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1666, 330, 48, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1668, 332, 48, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1670, 334, 48, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1672, 336, 48, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1674, 324, 34, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1676, 326, 34, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1678, 328, 34, '2026-06-10', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1680, 330, 34, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1682, 330, 36, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1684, 332, 36, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1686, 334, 36, '2026-06-10', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1688, 336, 36, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1690, 336, 38, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1692, 338, 38, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1694, 340, 38, '2026-06-10', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1696, 342, 38, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1698, 342, 40, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1700, 324, 40, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1702, 326, 40, '2026-06-10', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1704, 328, 40, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1706, 328, 42, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1708, 330, 42, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1710, 332, 42, '2026-06-10', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1712, 334, 42, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1714, 334, 44, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1716, 336, 44, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1718, 338, 44, '2026-06-10', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1720, 340, 44, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1722, 340, 46, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1724, 342, 46, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1726, 324, 46, '2026-06-10', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1728, 326, 46, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1730, 326, 48, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1732, 328, 48, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1734, 330, 48, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1736, 334, 48, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1738, 336, 48, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1740, 324, 34, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1742, 326, 34, '2026-06-11', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1744, 328, 34, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1746, 330, 34, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1748, 330, 36, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1750, 332, 36, '2026-06-11', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1752, 334, 36, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1754, 336, 36, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1756, 336, 38, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1758, 338, 38, '2026-06-11', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1760, 340, 38, '2026-06-11', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1762, 342, 38, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1764, 342, 40, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1766, 324, 40, '2026-06-11', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1768, 326, 40, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1770, 328, 40, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1772, 328, 42, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1774, 330, 42, '2026-06-11', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1776, 332, 42, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1778, 334, 42, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1780, 334, 44, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1782, 336, 44, '2026-06-11', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1784, 338, 44, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1786, 340, 44, '2026-06-11', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1788, 340, 46, '2026-06-11', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1790, 342, 46, '2026-06-11', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1792, 324, 46, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1794, 326, 46, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1796, 326, 48, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1798, 328, 48, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1800, 332, 48, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1802, 334, 48, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1804, 336, 48, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1806, 324, 34, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1808, 326, 34, '2026-06-12', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1810, 328, 34, '2026-06-12', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1812, 330, 34, '2026-06-12', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1814, 330, 36, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1816, 332, 36, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1818, 334, 36, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1820, 336, 36, '2026-06-12', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1822, 336, 38, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1824, 338, 38, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1826, 340, 38, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1828, 342, 38, '2026-06-12', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1830, 342, 40, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1832, 324, 40, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1834, 326, 40, '2026-06-12', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1836, 328, 40, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1838, 328, 42, '2026-06-12', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1840, 330, 42, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1842, 332, 42, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1844, 334, 42, '2026-06-12', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1846, 334, 44, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1848, 336, 44, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1850, 338, 44, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1852, 340, 44, '2026-06-12', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1854, 340, 46, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1856, 342, 46, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1858, 324, 46, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1860, 326, 46, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1862, 328, 48, '2026-06-12', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (1864, 330, 48, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1866, 332, 48, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1868, 334, 48, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1870, 336, 48, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1872, 324, 34, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1874, 326, 34, '2026-06-13', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1876, 328, 34, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1878, 330, 34, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1880, 330, 36, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1882, 332, 36, '2026-06-13', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1884, 334, 36, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1886, 336, 36, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1888, 336, 38, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1890, 338, 38, '2026-06-13', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1892, 340, 38, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1894, 342, 38, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1896, 342, 40, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1898, 324, 40, '2026-06-13', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1900, 326, 40, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1902, 328, 40, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1904, 328, 42, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1906, 330, 42, '2026-06-13', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1908, 332, 42, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1910, 334, 42, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1912, 334, 44, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1914, 336, 44, '2026-06-13', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1916, 338, 44, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1918, 340, 44, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1920, 340, 46, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1922, 342, 46, '2026-06-13', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1924, 324, 46, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1926, 326, 46, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1928, 326, 48, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1930, 328, 48, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1932, 332, 48, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1934, 334, 48, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1936, 336, 48, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1938, 324, 34, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1940, 326, 34, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1942, 328, 34, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1944, 330, 34, '2026-06-15', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1946, 330, 36, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1948, 332, 36, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1950, 334, 36, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1952, 336, 36, '2026-06-15', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1954, 336, 38, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1956, 338, 38, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1958, 340, 38, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1960, 342, 38, '2026-06-15', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1962, 342, 40, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1964, 324, 40, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1966, 326, 40, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1968, 328, 40, '2026-06-15', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1970, 328, 42, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1972, 330, 42, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1974, 332, 42, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1976, 334, 42, '2026-06-15', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1978, 334, 44, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1980, 336, 44, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1982, 338, 44, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1984, 340, 44, '2026-06-15', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1986, 340, 46, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1988, 342, 46, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1990, 324, 46, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1992, 326, 46, '2026-06-15', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1994, 328, 48, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1996, 330, 48, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (1998, 332, 48, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2000, 334, 48, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2002, 336, 48, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2004, 292, 4, '2026-06-12', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2006, 286, 4, '2026-06-12', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2008, 298, 4, '2026-06-12', 2, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2010, 286, 4, '2026-06-15', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2012, 296, 16, '2026-06-15', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2014, 294, 16, '2026-06-15', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (2016, 290, 16, '2026-06-15', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2018, 282, 12, '2026-06-15', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2020, 296, 12, '2026-06-15', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2022, 294, 12, '2026-06-15', 0, 36, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (2026, 284, 12, '2026-06-15', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2028, 292, 10, '2026-06-15', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2030, 288, 10, '2026-06-15', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2032, 294, 10, '2026-06-15', 0, 40, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (2034, 290, 10, '2026-06-15', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2036, 292, 16, '2026-06-15', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2038, 300, 16, '2026-06-15', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2040, 344, 50, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2042, 346, 50, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2044, 348, 50, '2026-06-03', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2046, 350, 50, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2048, 350, 52, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2050, 352, 52, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2052, 354, 52, '2026-06-03', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2054, 356, 52, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2056, 356, 54, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2058, 358, 54, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2060, 360, 54, '2026-06-03', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2062, 362, 54, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2064, 362, 56, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2066, 344, 56, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2068, 346, 56, '2026-06-03', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2070, 348, 56, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2072, 348, 58, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2074, 350, 58, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2076, 352, 58, '2026-06-03', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2078, 354, 58, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2080, 354, 60, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2082, 356, 60, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2084, 358, 60, '2026-06-03', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2086, 360, 60, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2088, 360, 62, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2090, 362, 62, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2092, 344, 62, '2026-06-03', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2094, 346, 62, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2096, 346, 64, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2098, 348, 64, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2100, 350, 64, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2102, 354, 64, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2104, 356, 64, '2026-06-03', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2106, 344, 50, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2108, 346, 50, '2026-06-04', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2110, 348, 50, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2112, 350, 50, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2114, 350, 52, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2116, 352, 52, '2026-06-04', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2118, 354, 52, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2120, 356, 52, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2122, 356, 54, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2124, 358, 54, '2026-06-04', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2126, 360, 54, '2026-06-04', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2128, 362, 54, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2130, 362, 56, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2132, 344, 56, '2026-06-04', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2134, 346, 56, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2136, 348, 56, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2138, 348, 58, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2140, 350, 58, '2026-06-04', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2142, 352, 58, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2144, 354, 58, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2146, 354, 60, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2148, 356, 60, '2026-06-04', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2150, 358, 60, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2152, 360, 60, '2026-06-04', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2154, 360, 62, '2026-06-04', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2156, 362, 62, '2026-06-04', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2158, 344, 62, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2160, 346, 62, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2162, 346, 64, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2164, 348, 64, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2166, 352, 64, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2168, 354, 64, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2170, 356, 64, '2026-06-04', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2172, 344, 50, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2174, 346, 50, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2176, 348, 50, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2178, 350, 50, '2026-06-05', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2180, 350, 52, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2182, 352, 52, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2184, 354, 52, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2186, 356, 52, '2026-06-05', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2188, 356, 54, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2190, 358, 54, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2192, 360, 54, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2194, 362, 54, '2026-06-05', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2196, 362, 56, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2198, 344, 56, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2200, 346, 56, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2202, 348, 56, '2026-06-05', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2204, 348, 58, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2206, 350, 58, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2208, 352, 58, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2210, 354, 58, '2026-06-05', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2212, 354, 60, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2214, 356, 60, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2216, 358, 60, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2218, 360, 60, '2026-06-05', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2220, 360, 62, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2222, 362, 62, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2224, 344, 62, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2226, 346, 62, '2026-06-05', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2228, 348, 64, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2230, 350, 64, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2232, 352, 64, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2234, 354, 64, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2236, 356, 64, '2026-06-05', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2238, 344, 50, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2240, 346, 50, '2026-06-06', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2242, 348, 50, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2244, 350, 50, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2246, 350, 52, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2248, 352, 52, '2026-06-06', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2250, 354, 52, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2252, 356, 52, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2254, 356, 54, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2256, 358, 54, '2026-06-06', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2258, 360, 54, '2026-06-06', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2260, 362, 54, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2262, 362, 56, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2264, 344, 56, '2026-06-06', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2266, 346, 56, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2268, 348, 56, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2270, 348, 58, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2272, 350, 58, '2026-06-06', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2274, 352, 58, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2276, 354, 58, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2278, 354, 60, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2280, 356, 60, '2026-06-06', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2282, 358, 60, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2284, 360, 60, '2026-06-06', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2286, 360, 62, '2026-06-06', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2288, 362, 62, '2026-06-06', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2290, 344, 62, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2292, 346, 62, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2294, 346, 64, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2296, 348, 64, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2298, 352, 64, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2300, 354, 64, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2302, 356, 64, '2026-06-06', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2304, 344, 50, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2306, 346, 50, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2308, 348, 50, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2310, 350, 50, '2026-06-08', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2312, 350, 52, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2314, 352, 52, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2316, 354, 52, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2318, 356, 52, '2026-06-08', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2320, 356, 54, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2322, 358, 54, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2324, 360, 54, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2326, 362, 54, '2026-06-08', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2328, 362, 56, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2330, 344, 56, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2332, 346, 56, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2334, 348, 56, '2026-06-08', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2336, 348, 58, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2338, 350, 58, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2340, 352, 58, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2342, 354, 58, '2026-06-08', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2344, 354, 60, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2346, 356, 60, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2348, 358, 60, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2350, 360, 60, '2026-06-08', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2352, 360, 62, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2354, 362, 62, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2356, 344, 62, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2358, 346, 62, '2026-06-08', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2360, 348, 64, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2362, 350, 64, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2364, 352, 64, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2366, 354, 64, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2368, 356, 64, '2026-06-08', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2370, 344, 50, '2026-06-09', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2372, 346, 50, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2374, 348, 50, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2376, 350, 50, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2378, 350, 52, '2026-06-09', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2380, 352, 52, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2382, 354, 52, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2384, 356, 52, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2386, 356, 54, '2026-06-09', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2388, 358, 54, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2390, 360, 54, '2026-06-09', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2392, 362, 54, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2394, 362, 56, '2026-06-09', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2396, 344, 56, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2398, 346, 56, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2400, 348, 56, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2402, 348, 58, '2026-06-09', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2404, 350, 58, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2406, 352, 58, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2408, 354, 58, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2410, 354, 60, '2026-06-09', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2412, 356, 60, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2414, 358, 60, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2416, 360, 60, '2026-06-09', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2418, 360, 62, '2026-06-09', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2420, 362, 62, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2422, 344, 62, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2424, 346, 62, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2426, 346, 64, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2428, 350, 64, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2430, 352, 64, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2432, 354, 64, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2434, 356, 64, '2026-06-09', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2436, 344, 50, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2438, 346, 50, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2440, 348, 50, '2026-06-10', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2442, 350, 50, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2444, 350, 52, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2446, 352, 52, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2448, 354, 52, '2026-06-10', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2450, 356, 52, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2452, 356, 54, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2454, 358, 54, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2456, 360, 54, '2026-06-10', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2458, 362, 54, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2460, 362, 56, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2462, 344, 56, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2464, 346, 56, '2026-06-10', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2466, 348, 56, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2468, 348, 58, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2470, 350, 58, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2472, 352, 58, '2026-06-10', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2474, 354, 58, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2476, 354, 60, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2478, 356, 60, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2480, 358, 60, '2026-06-10', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2482, 360, 60, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2484, 360, 62, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2486, 362, 62, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2488, 344, 62, '2026-06-10', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2490, 346, 62, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2492, 346, 64, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2494, 348, 64, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2496, 350, 64, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2498, 354, 64, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2500, 356, 64, '2026-06-10', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2502, 344, 50, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2504, 346, 50, '2026-06-11', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2506, 348, 50, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2508, 350, 50, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2510, 350, 52, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2512, 352, 52, '2026-06-11', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2514, 354, 52, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2516, 356, 52, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2518, 356, 54, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2520, 358, 54, '2026-06-11', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2522, 360, 54, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2524, 362, 54, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2526, 362, 56, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2528, 344, 56, '2026-06-11', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2530, 346, 56, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2532, 348, 56, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2534, 348, 58, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2536, 350, 58, '2026-06-11', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2538, 352, 58, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2540, 354, 58, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2542, 354, 60, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2544, 356, 60, '2026-06-11', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2546, 358, 60, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2548, 360, 60, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2550, 360, 62, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2552, 362, 62, '2026-06-11', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2554, 344, 62, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2556, 346, 62, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2558, 346, 64, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2560, 348, 64, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2562, 352, 64, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2564, 354, 64, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2566, 356, 64, '2026-06-11', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2568, 344, 50, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2570, 346, 50, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2572, 348, 50, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2574, 350, 50, '2026-06-12', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2576, 350, 52, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2578, 352, 52, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2580, 354, 52, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2582, 356, 52, '2026-06-12', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2584, 356, 54, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2586, 358, 54, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2588, 360, 54, '2026-06-12', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2590, 362, 54, '2026-06-12', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2592, 362, 56, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2594, 344, 56, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2596, 346, 56, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2598, 348, 56, '2026-06-12', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2600, 348, 58, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2602, 350, 58, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2604, 352, 58, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2606, 354, 58, '2026-06-12', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2608, 354, 60, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2610, 356, 60, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2612, 358, 60, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2614, 360, 60, '2026-06-12', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2616, 360, 62, '2026-06-12', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2618, 362, 62, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2620, 344, 62, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2622, 346, 62, '2026-06-12', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2624, 348, 64, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2626, 350, 64, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2628, 352, 64, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2630, 354, 64, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2632, 356, 64, '2026-06-12', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2634, 344, 50, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2636, 346, 50, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2638, 348, 50, '2026-06-13', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2640, 350, 50, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2642, 350, 52, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2644, 352, 52, '2026-06-13', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2646, 354, 52, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2648, 356, 52, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2650, 356, 54, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2652, 358, 54, '2026-06-13', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2654, 360, 54, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2656, 362, 54, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2658, 362, 56, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2660, 344, 56, '2026-06-13', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2662, 346, 56, '2026-06-13', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2664, 348, 56, '2026-06-13', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2666, 348, 58, '2026-06-13', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2668, 350, 58, '2026-06-13', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2670, 352, 58, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2672, 354, 58, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2674, 354, 60, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2676, 356, 60, '2026-06-13', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2678, 358, 60, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2680, 360, 60, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2682, 360, 62, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2684, 362, 62, '2026-06-13', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2686, 344, 62, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2688, 346, 62, '2026-06-13', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2690, 346, 64, '2026-06-13', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2692, 348, 64, '2026-06-13', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2694, 352, 64, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2696, 354, 64, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2698, 356, 64, '2026-06-13', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2700, 344, 50, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2702, 346, 50, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2704, 348, 50, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2706, 350, 50, '2026-06-15', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2708, 350, 52, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2710, 352, 52, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2712, 354, 52, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2714, 356, 52, '2026-06-15', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2716, 356, 54, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2718, 358, 54, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2720, 360, 54, '2026-06-15', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2722, 362, 54, '2026-06-15', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2724, 362, 56, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2726, 344, 56, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2728, 346, 56, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2730, 348, 56, '2026-06-15', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2732, 348, 58, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2734, 350, 58, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2736, 352, 58, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2738, 354, 58, '2026-06-15', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2740, 354, 60, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2742, 356, 60, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2744, 358, 60, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2746, 360, 60, '2026-06-15', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2748, 360, 62, '2026-06-15', 0, 2, 'absent', 1);
INSERT INTO `attendance_teachers` VALUES (2750, 362, 62, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2752, 344, 62, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2754, 346, 62, '2026-06-15', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2756, 348, 64, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2758, 350, 64, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2760, 352, 64, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2762, 354, 64, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2764, 356, 64, '2026-06-15', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2766, 344, 50, '2026-06-16', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2768, 346, 50, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2770, 348, 50, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2772, 350, 50, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2774, 350, 52, '2026-06-16', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2776, 352, 52, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2778, 354, 52, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2780, 356, 52, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2782, 356, 54, '2026-06-16', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2784, 358, 54, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2786, 360, 54, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2788, 362, 54, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2790, 362, 56, '2026-06-16', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2792, 344, 56, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2794, 346, 56, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2796, 348, 56, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2798, 348, 58, '2026-06-16', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2800, 350, 58, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2802, 352, 58, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2804, 354, 58, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2806, 354, 60, '2026-06-16', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2808, 356, 60, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2810, 358, 60, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2812, 360, 60, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2814, 360, 62, '2026-06-16', 2, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2816, 362, 62, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2818, 344, 62, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2820, 346, 62, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2822, 346, 64, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2824, 350, 64, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2826, 352, 64, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2828, 354, 64, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2830, 356, 64, '2026-06-16', 1, 2, 'present', 1);
INSERT INTO `attendance_teachers` VALUES (2832, 292, 10, '2026-06-16', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2834, 294, 10, '2026-06-16', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2836, 286, 10, '2026-06-16', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2838, 290, 10, '2026-06-16', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2840, 296, 16, '2026-06-16', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2842, 290, 16, '2026-06-16', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (2844, 294, 16, '2026-06-16', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2850, 290, 4, '2026-06-16', 0, 44, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (2854, 286, 4, '2026-06-16', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2858, 292, 4, '2026-06-16', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2860, 292, 16, '2026-06-16', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2862, 300, 16, '2026-06-16', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2864, 296, 16, '2026-06-17', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2866, 294, 16, '2026-06-17', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2868, 290, 10, '2026-06-17', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2870, 286, 10, '2026-06-17', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2872, 282, 10, '2026-06-17', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2874, 288, 10, '2026-06-17', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2876, 290, 10, '2026-06-18', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2878, 282, 10, '2026-06-18', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2880, 288, 10, '2026-06-18', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2882, 288, 16, '2026-06-18', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2884, 284, 16, '2026-06-18', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2886, 302, 4, '2026-06-18', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2888, 292, 4, '2026-06-18', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2890, 286, 4, '2026-06-18', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2892, 298, 4, '2026-06-18', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2894, 286, 4, '2026-06-17', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2896, 302, 4, '2026-06-17', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2898, 290, 4, '2026-06-17', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2900, 298, 4, '2026-06-17', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2902, 294, 10, '2026-06-18', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2904, 288, 10, '2026-06-12', 2, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2906, 290, 10, '2026-06-12', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2908, 286, 10, '2026-06-12', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2910, 294, 10, '2026-06-12', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2912, 292, 16, '2026-06-18', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2914, 298, 16, '2026-06-18', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2920, 296, 12, '2026-06-16', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2924, 284, 12, '2026-06-16', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2926, 288, 12, '2026-06-16', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2928, 290, 12, '2026-06-17', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2930, 296, 12, '2026-06-17', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2932, 294, 12, '2026-06-17', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2934, 288, 12, '2026-06-17', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2936, 282, 12, '2026-06-17', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2942, 282, 12, '2026-06-18', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2944, 290, 12, '2026-06-18', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2946, 292, 12, '2026-06-18', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2948, 290, 12, '2026-06-19', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2950, 288, 10, '2026-06-19', 2, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2952, 290, 10, '2026-06-19', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2954, 286, 10, '2026-06-19', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2956, 294, 10, '2026-06-19', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2958, 294, 16, '2026-06-19', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2960, 288, 16, '2026-06-19', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2962, 284, 16, '2026-06-19', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2964, 298, 16, '2026-06-19', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2968, 292, 12, '2026-06-19', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2970, 294, 12, '2026-06-19', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2972, 284, 12, '2026-06-19', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2974, 282, 16, '2026-06-20', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2976, 292, 16, '2026-06-20', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2978, 288, 16, '2026-06-20', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2980, 298, 16, '2026-06-20', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2982, 292, 4, '2026-06-19', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2984, 286, 4, '2026-06-19', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2986, 298, 4, '2026-06-19', 2, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2988, 292, 10, '2026-06-22', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2990, 288, 10, '2026-06-22', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2992, 296, 16, '2026-06-22', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2994, 294, 16, '2026-06-22', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2996, 290, 16, '2026-06-22', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (2998, 292, 16, '2026-06-22', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3000, 294, 10, '2026-06-22', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3002, 290, 10, '2026-06-22', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3004, 300, 16, '2026-06-22', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3006, 282, 12, '2026-06-22', 0, 36, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3008, 296, 12, '2026-06-22', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3010, 294, 12, '2026-06-22', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3014, 284, 12, '2026-06-22', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3016, 292, 10, '2026-06-23', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3018, 290, 10, '2026-06-23', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3020, 286, 10, '2026-06-23', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3022, 294, 10, '2026-06-23', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3024, 296, 16, '2026-06-23', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3026, 290, 16, '2026-06-23', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3028, 294, 16, '2026-06-23', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3030, 286, 4, '2026-06-22', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3032, 284, 4, '2026-06-22', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3034, 302, 4, '2026-06-22', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3036, 290, 4, '2026-06-22', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3038, 286, 4, '2026-06-23', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3040, 292, 4, '2026-06-23', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3042, 290, 4, '2026-06-23', 2, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3046, 296, 12, '2026-06-23', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3054, 288, 12, '2026-06-23', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3058, 284, 12, '2026-06-23', 0, 36, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3064, 292, 16, '2026-06-23', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3066, 300, 16, '2026-06-23', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3068, 290, 10, '2026-06-24', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3070, 286, 10, '2026-06-24', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3072, 302, 4, '2026-06-24', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3074, 290, 4, '2026-06-24', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3076, 298, 4, '2026-06-24', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3078, 296, 16, '2026-06-24', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3080, 294, 16, '2026-06-24', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3082, 292, 16, '2026-06-24', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3084, 284, 16, '2026-06-24', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3086, 288, 10, '2026-06-24', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3088, 282, 10, '2026-06-24', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3094, 290, 16, '2026-06-24', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3096, 296, 16, '2026-06-29', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3098, 294, 16, '2026-06-29', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3100, 288, 10, '2026-06-29', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3102, 294, 10, '2026-06-29', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3104, 290, 10, '2026-06-29', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3106, 290, 16, '2026-06-29', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3108, 292, 10, '2026-06-29', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3116, 282, 12, '2026-06-29', 0, 36, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3118, 296, 12, '2026-06-29', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3120, 294, 12, '2026-06-29', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3122, 284, 12, '2026-06-29', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3124, 292, 16, '2026-06-29', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3126, 300, 16, '2026-06-29', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3130, 292, 10, '2026-06-30', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3132, 286, 10, '2026-06-30', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3134, 290, 10, '2026-06-30', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3136, 296, 16, '2026-06-30', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3138, 290, 16, '2026-06-30', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3140, 288, 12, '2026-06-30', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3142, 296, 12, '2026-06-30', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3144, 284, 12, '2026-06-30', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3146, 294, 16, '2026-06-30', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3148, 292, 16, '2026-06-30', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3150, 300, 16, '2026-06-30', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3152, 294, 10, '2026-06-30', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3154, 290, 10, '2026-07-01', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3156, 286, 10, '2026-07-01', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3158, 296, 16, '2026-07-01', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3160, 290, 12, '2026-07-01', 0, 36, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3164, 296, 12, '2026-07-01', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3166, 294, 12, '2026-07-01', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3168, 288, 12, '2026-07-01', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3170, 282, 12, '2026-07-01', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3172, 282, 10, '2026-07-01', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3174, 286, 4, '2026-07-01', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3176, 302, 4, '2026-07-01', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3178, 290, 4, '2026-07-01', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3180, 298, 4, '2026-07-01', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3182, 286, 4, '2026-06-30', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3184, 292, 4, '2026-06-30', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3188, 290, 4, '2026-06-30', 2, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3190, 294, 16, '2026-07-01', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3192, 284, 16, '2026-07-01', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3194, 292, 16, '2026-07-01', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3196, 290, 10, '2026-07-02', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3198, 282, 10, '2026-07-02', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3200, 294, 10, '2026-07-02', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3202, 288, 10, '2026-07-02', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3204, 302, 4, '2026-07-02', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3206, 292, 4, '2026-07-02', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3208, 286, 4, '2026-07-02', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3210, 298, 4, '2026-07-02', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3212, 290, 16, '2026-07-01', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3214, 288, 16, '2026-07-02', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3216, 284, 16, '2026-07-02', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3218, 292, 16, '2026-07-02', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3220, 298, 16, '2026-07-02', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3222, 292, 12, '2026-07-02', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3224, 282, 12, '2026-07-02', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3226, 290, 12, '2026-07-02', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3228, 288, 10, '2026-07-03', 2, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3230, 290, 10, '2026-07-03', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3232, 286, 10, '2026-07-03', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3234, 294, 10, '2026-07-03', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3236, 294, 16, '2026-07-03', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3238, 288, 16, '2026-07-03', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3240, 284, 16, '2026-07-03', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3242, 298, 16, '2026-07-03', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3244, 282, 16, '2026-07-04', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3246, 292, 16, '2026-07-04', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3248, 288, 16, '2026-07-04', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3250, 298, 16, '2026-07-04', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3252, 296, 16, '2026-07-06', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3254, 294, 16, '2026-07-06', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3256, 292, 16, '2026-07-06', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3258, 290, 16, '2026-07-06', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3260, 282, 12, '2026-07-06', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3262, 296, 12, '2026-07-06', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3264, 294, 12, '2026-07-06', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3266, 284, 12, '2026-07-06', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3268, 290, 12, '2026-07-03', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3270, 292, 12, '2026-07-03', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3272, 294, 12, '2026-07-03', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3274, 284, 12, '2026-07-03', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3276, 300, 16, '2026-07-06', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3278, 292, 10, '2026-07-06', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3280, 288, 10, '2026-07-06', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3282, 294, 10, '2026-07-06', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3284, 290, 10, '2026-07-06', 0, 40, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3286, 294, 16, '2026-07-07', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3288, 286, 10, '2026-07-07', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3290, 292, 4, '2026-07-03', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3292, 286, 4, '2026-07-03', 0, 44, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3294, 298, 4, '2026-07-03', 2, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3296, 290, 16, '2026-07-07', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3298, 296, 16, '2026-07-07', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3300, 284, 4, '2026-07-06', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3302, 302, 4, '2026-07-06', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3304, 286, 4, '2026-07-06', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3306, 292, 10, '2026-07-07', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3308, 294, 10, '2026-07-07', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3310, 292, 16, '2026-07-07', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3312, 290, 10, '2026-07-07', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3314, 300, 16, '2026-07-07', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3316, 288, 10, '2026-07-08', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3318, 282, 10, '2026-07-08', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3320, 290, 10, '2026-07-08', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3322, 286, 10, '2026-07-08', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3324, 296, 16, '2026-07-08', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3326, 294, 16, '2026-07-08', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3328, 290, 16, '2026-07-08', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3330, 292, 16, '2026-07-08', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3332, 284, 16, '2026-07-08', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3334, 290, 10, '2026-07-09', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3336, 282, 10, '2026-07-09', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3338, 294, 10, '2026-07-09', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3340, 288, 10, '2026-07-09', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3342, 288, 16, '2026-07-09', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3344, 284, 16, '2026-07-09', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3346, 292, 16, '2026-07-09', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3348, 298, 16, '2026-07-09', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3350, 290, 10, '2026-07-10', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3352, 286, 10, '2026-07-10', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3354, 294, 10, '2026-07-10', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3356, 292, 4, '2026-07-10', 0, 44, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3360, 286, 4, '2026-07-10', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3362, 298, 4, '2026-07-10', 2, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3364, 302, 4, '2026-07-09', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3366, 292, 4, '2026-07-09', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3368, 286, 4, '2026-07-09', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3370, 298, 4, '2026-07-09', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3372, 286, 4, '2026-07-08', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3374, 302, 4, '2026-07-08', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3376, 290, 4, '2026-07-08', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3378, 298, 4, '2026-07-08', 0, 44, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3382, 294, 16, '2026-07-10', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3384, 288, 16, '2026-07-10', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3386, 284, 16, '2026-07-10', 2, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3388, 298, 16, '2026-07-10', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3390, 282, 16, '2026-07-11', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3392, 292, 16, '2026-07-11', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3394, 288, 16, '2026-07-11', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3396, 298, 16, '2026-07-11', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3398, 292, 10, '2026-07-13', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3400, 288, 10, '2026-07-13', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3402, 294, 10, '2026-07-13', 0, 40, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3404, 290, 10, '2026-07-13', 0, 40, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3406, 296, 16, '2026-07-13', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3408, 294, 16, '2026-07-13', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3410, 290, 16, '2026-07-13', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3412, 292, 16, '2026-07-13', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3414, 286, 10, '2026-07-14', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3416, 292, 10, '2026-07-14', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3418, 294, 10, '2026-07-14', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3422, 290, 10, '2026-07-14', 0, 40, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3424, 282, 12, '2026-07-13', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3426, 296, 12, '2026-07-13', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3428, 294, 12, '2026-07-13', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3430, 284, 12, '2026-07-13', 0, 36, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3434, 296, 16, '2026-07-14', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3436, 290, 16, '2026-07-14', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (3438, 294, 16, '2026-07-14', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3440, 288, 12, '2026-07-14', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3442, 296, 12, '2026-07-14', 1, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3446, 284, 12, '2026-07-14', 2, 36, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3460, 292, 16, '2026-07-14', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3462, 300, 16, '2026-07-14', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3464, 286, 10, '2026-07-15', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3466, 296, 16, '2026-07-15', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3468, 294, 16, '2026-07-15', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3470, 286, 4, '2026-07-15', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3472, 302, 4, '2026-07-15', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3474, 286, 4, '2026-07-14', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3476, 292, 4, '2026-07-14', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3478, 290, 4, '2026-07-14', 2, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3482, 286, 4, '2026-07-13', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3484, 284, 4, '2026-07-13', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3486, 302, 4, '2026-07-13', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3488, 290, 4, '2026-07-13', 1, 44, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3490, 284, 16, '2026-07-15', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3492, 288, 10, '2026-07-15', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3494, 282, 10, '2026-07-15', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3496, 290, 10, '2026-07-15', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3500, 292, 16, '2026-07-15', 1, 54, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (3502, 290, 16, '2026-07-15', 0, 54, 'absent', 2);
INSERT INTO `attendance_teachers` VALUES (6672, 282, 10, '2026-07-16', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (6674, 294, 10, '2026-07-16', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (6676, 288, 10, '2026-07-16', 1, 40, 'present', 2);
INSERT INTO `attendance_teachers` VALUES (6678, 290, 10, '2026-07-16', 0, 40, 'absent', 2);

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
  `tenant_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `assignment_id`(`assignment_id` ASC, `date` ASC) USING BTREE,
  INDEX `marked_by`(`marked_by` ASC) USING BTREE,
  INDEX `fk_book_progress_tenant`(`tenant_id` ASC) USING BTREE,
  CONSTRAINT `book_progress_ibfk_1` FOREIGN KEY (`assignment_id`) REFERENCES `teacher_books` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `book_progress_ibfk_2` FOREIGN KEY (`marked_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_book_progress_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3810 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of book_progress
-- ----------------------------
INSERT INTO `book_progress` VALUES (20, 110, '2026-05-06', 265, 2, '2026-05-18 11:03:44', 2);
INSERT INTO `book_progress` VALUES (22, 76, '2026-05-07', 33, 2, '2026-05-18 11:03:44', 2);
INSERT INTO `book_progress` VALUES (24, 16, '2026-05-07', 339, 2, '2026-05-18 11:03:44', 2);
INSERT INTO `book_progress` VALUES (26, 68, '2026-05-07', 49, 2, '2026-05-18 11:03:44', 2);
INSERT INTO `book_progress` VALUES (28, 74, '2026-05-07', 6, 2, '2026-05-18 11:03:44', 2);
INSERT INTO `book_progress` VALUES (30, 60, '2026-05-07', 28, 2, '2026-05-18 11:03:44', 2);
INSERT INTO `book_progress` VALUES (34, 12, '2026-05-07', 14, 2, '2026-05-18 11:03:44', 2);
INSERT INTO `book_progress` VALUES (36, 58, '2026-05-07', 43, 2, '2026-05-18 11:03:44', 2);
INSERT INTO `book_progress` VALUES (42, 26, '2026-05-11', 240, 2, '2026-05-18 11:03:44', 2);
INSERT INTO `book_progress` VALUES (44, 88, '2026-05-11', 34, 2, '2026-05-18 11:03:44', 2);
INSERT INTO `book_progress` VALUES (46, 90, '2026-05-11', 35, 2, '2026-05-18 11:03:44', 2);
INSERT INTO `book_progress` VALUES (48, 84, '2026-05-11', 15, 2, '2026-05-18 11:03:44', 2);
INSERT INTO `book_progress` VALUES (50, 92, '2026-05-11', 38, 2, '2026-05-18 11:03:44', 2);
INSERT INTO `book_progress` VALUES (52, 110, '2026-05-18', 277, 2, '2026-05-18 16:40:06', 2);
INSERT INTO `book_progress` VALUES (64, 84, '2026-05-20', 16, 30, '2026-05-19 22:45:28', 2);
INSERT INTO `book_progress` VALUES (66, 88, '2026-05-20', 36, 30, '2026-05-19 22:45:48', 2);
INSERT INTO `book_progress` VALUES (70, 92, '2026-05-20', 39, 30, '2026-05-19 22:46:03', 2);
INSERT INTO `book_progress` VALUES (72, 110, '2026-05-20', 281, 30, '2026-05-20 09:34:39', 2);
INSERT INTO `book_progress` VALUES (76, 90, '2026-05-20', 37, 30, '2026-05-19 22:46:21', 2);
INSERT INTO `book_progress` VALUES (82, 98, '2026-05-20', 1, 54, '2026-05-20 09:32:20', 2);
INSERT INTO `book_progress` VALUES (88, 80, '2026-05-20', 575, 36, '2026-05-20 16:35:59', 2);
INSERT INTO `book_progress` VALUES (90, 26, '2026-05-21', 258, 30, '2026-05-21 16:17:31', 2);
INSERT INTO `book_progress` VALUES (94, 96, '2026-06-02', 52, 54, '2026-06-02 18:26:37', 2);
INSERT INTO `book_progress` VALUES (96, 100, '2026-06-02', 145, 54, '2026-06-02 18:27:02', 2);
INSERT INTO `book_progress` VALUES (98, 114, '2026-06-02', 105, 54, '2026-06-02 18:27:43', 2);
INSERT INTO `book_progress` VALUES (100, 130, '2026-06-02', 235, 54, '2026-06-02 18:27:58', 2);
INSERT INTO `book_progress` VALUES (102, 98, '2026-06-03', 39, 54, '2026-06-03 17:03:17', 2);
INSERT INTO `book_progress` VALUES (104, 102, '2026-06-03', 32, 54, '2026-06-03 17:03:33', 2);
INSERT INTO `book_progress` VALUES (106, 104, '2026-06-03', 115, 54, '2026-06-03 17:03:47', 2);
INSERT INTO `book_progress` VALUES (108, 106, '2026-06-03', 39, 54, '2026-06-03 17:04:15', 2);
INSERT INTO `book_progress` VALUES (140, 56, '2026-06-04', 9, 52, '2026-06-04 18:28:19', 2);
INSERT INTO `book_progress` VALUES (142, 16, '2026-06-05', 352, 40, '2026-06-05 17:06:57', 2);
INSERT INTO `book_progress` VALUES (144, 68, '2026-06-05', 69, 40, '2026-06-05 17:08:09', 2);
INSERT INTO `book_progress` VALUES (146, 72, '2026-06-05', 2, 40, '2026-06-05 17:08:54', 2);
INSERT INTO `book_progress` VALUES (148, 74, '2026-06-05', 11, 40, '2026-06-05 17:09:07', 2);
INSERT INTO `book_progress` VALUES (150, 76, '2026-06-05', 35, 40, '2026-06-05 17:09:36', 2);
INSERT INTO `book_progress` VALUES (152, 78, '2026-06-05', 18, 40, '2026-06-05 17:10:09', 2);
INSERT INTO `book_progress` VALUES (154, 66, '2026-06-05', 20, 40, '2026-06-05 17:10:59', 2);
INSERT INTO `book_progress` VALUES (156, 70, '2026-06-05', 7, 40, '2026-06-05 17:13:34', 2);
INSERT INTO `book_progress` VALUES (160, 66, '2026-06-06', 35, 40, '2026-06-06 12:56:06', 2);
INSERT INTO `book_progress` VALUES (162, 70, '2026-06-06', 16, 40, '2026-06-06 12:56:29', 2);
INSERT INTO `book_progress` VALUES (164, 72, '2026-06-06', 4, 40, '2026-06-06 12:57:16', 2);
INSERT INTO `book_progress` VALUES (172, 10, '2026-06-08', 588, 52, '2026-06-08 15:45:12', 2);
INSERT INTO `book_progress` VALUES (176, 56, '2026-06-08', 14, 52, '2026-06-08 15:45:51', 2);
INSERT INTO `book_progress` VALUES (182, 58, '2026-06-08', 59, 52, '2026-06-08 15:46:50', 2);
INSERT INTO `book_progress` VALUES (184, 60, '2026-06-08', 62, 52, '2026-06-08 15:49:20', 2);
INSERT INTO `book_progress` VALUES (186, 124, '2026-06-08', 9, 52, '2026-06-08 15:49:40', 2);
INSERT INTO `book_progress` VALUES (188, 136, '2026-06-08', 47, 52, '2026-06-08 15:50:18', 2);
INSERT INTO `book_progress` VALUES (190, 78, '2026-06-09', 20, 40, '2026-06-09 15:09:38', 2);
INSERT INTO `book_progress` VALUES (192, 66, '2026-06-11', 37, 40, '2026-06-11 02:51:00', 2);
INSERT INTO `book_progress` VALUES (194, 68, '2026-06-11', 71, 40, '2026-06-11 18:32:34', 2);
INSERT INTO `book_progress` VALUES (196, 70, '2026-06-11', 17, 40, '2026-06-11 02:51:40', 2);
INSERT INTO `book_progress` VALUES (198, 76, '2026-06-11', 43, 40, '2026-06-11 17:18:24', 2);
INSERT INTO `book_progress` VALUES (200, 78, '2026-06-11', 21, 40, '2026-06-11 02:53:11', 2);
INSERT INTO `book_progress` VALUES (202, 16, '2026-06-11', 358, 40, '2026-06-11 17:52:47', 2);
INSERT INTO `book_progress` VALUES (208, 72, '2026-06-11', 6, 40, '2026-06-11 17:53:55', 2);
INSERT INTO `book_progress` VALUES (212, 130, '2026-06-12', 383, 54, '2026-06-12 18:06:30', 2);
INSERT INTO `book_progress` VALUES (214, 114, '2026-06-12', 171, 54, '2026-06-12 03:51:20', 2);
INSERT INTO `book_progress` VALUES (218, 96, '2026-06-12', 70, 54, '2026-06-12 15:46:57', 2);
INSERT INTO `book_progress` VALUES (220, 100, '2026-06-12', 194, 54, '2026-06-12 15:48:49', 2);
INSERT INTO `book_progress` VALUES (222, 104, '2026-06-12', 125, 54, '2026-06-12 16:21:30', 2);
INSERT INTO `book_progress` VALUES (224, 102, '2026-06-12', 35, 54, '2026-06-12 16:24:46', 2);
INSERT INTO `book_progress` VALUES (226, 106, '2026-06-12', 65, 54, '2026-06-12 16:27:51', 2);
INSERT INTO `book_progress` VALUES (228, 98, '2026-06-12', 46, 54, '2026-06-12 16:53:49', 2);
INSERT INTO `book_progress` VALUES (232, 104, '2026-06-13', 131, 54, '2026-06-13 16:21:21', 2);
INSERT INTO `book_progress` VALUES (276, 106, '2026-06-13', 83, 54, '2026-06-13 19:33:40', 2);
INSERT INTO `book_progress` VALUES (1094, 130, '2026-06-15', 398, 54, '2026-06-15 17:23:19', 2);
INSERT INTO `book_progress` VALUES (1116, 114, '2026-06-15', 180, 54, '2026-06-15 03:37:03', 2);
INSERT INTO `book_progress` VALUES (1134, 210, '2026-06-02', 51, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1136, 210, '2026-06-03', 58, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1138, 210, '2026-06-04', 64, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1140, 210, '2026-06-05', 71, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1142, 210, '2026-06-06', 77, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1144, 210, '2026-06-08', 83, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1146, 210, '2026-06-09', 90, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1148, 210, '2026-06-10', 96, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1150, 210, '2026-06-11', 103, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1152, 210, '2026-06-12', 109, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1154, 210, '2026-06-13', 116, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1156, 210, '2026-06-15', 123, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1158, 212, '2026-06-02', 85, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1160, 212, '2026-06-03', 88, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1162, 212, '2026-06-04', 90, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1164, 212, '2026-06-05', 93, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1166, 212, '2026-06-06', 95, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1168, 212, '2026-06-08', 97, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1170, 212, '2026-06-09', 100, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1172, 212, '2026-06-10', 102, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1174, 212, '2026-06-11', 105, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1176, 212, '2026-06-12', 107, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1178, 212, '2026-06-13', 110, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1180, 212, '2026-06-15', 113, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1182, 214, '2026-06-02', 127, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1184, 214, '2026-06-03', 134, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1186, 214, '2026-06-04', 140, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1188, 214, '2026-06-05', 147, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1190, 214, '2026-06-06', 153, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1192, 214, '2026-06-08', 159, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1194, 214, '2026-06-09', 166, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1196, 214, '2026-06-10', 172, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1198, 214, '2026-06-11', 179, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1200, 214, '2026-06-12', 185, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1202, 214, '2026-06-13', 192, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1204, 214, '2026-06-15', 199, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1206, 216, '2026-06-02', 161, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1208, 216, '2026-06-03', 164, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1210, 216, '2026-06-04', 166, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1212, 216, '2026-06-05', 169, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1214, 216, '2026-06-06', 171, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1216, 216, '2026-06-08', 173, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1218, 216, '2026-06-09', 176, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1220, 216, '2026-06-10', 178, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1222, 216, '2026-06-11', 181, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1224, 216, '2026-06-12', 183, 2, '2026-06-15 13:36:10', 1);
INSERT INTO `book_progress` VALUES (1226, 216, '2026-06-13', 186, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1228, 216, '2026-06-15', 189, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1230, 218, '2026-06-02', 23, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1232, 218, '2026-06-03', 30, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1234, 218, '2026-06-04', 36, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1236, 218, '2026-06-05', 43, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1238, 218, '2026-06-06', 49, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1240, 218, '2026-06-08', 55, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1242, 218, '2026-06-09', 62, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1244, 218, '2026-06-10', 68, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1246, 218, '2026-06-11', 75, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1248, 218, '2026-06-12', 81, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1250, 218, '2026-06-13', 88, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1252, 218, '2026-06-15', 95, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1254, 220, '2026-06-02', 57, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1256, 220, '2026-06-03', 60, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1258, 220, '2026-06-04', 62, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1260, 220, '2026-06-05', 65, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1262, 220, '2026-06-06', 67, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1264, 220, '2026-06-08', 69, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1266, 220, '2026-06-09', 72, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1268, 220, '2026-06-10', 74, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1270, 220, '2026-06-11', 77, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1272, 220, '2026-06-12', 79, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1274, 220, '2026-06-13', 82, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1276, 220, '2026-06-15', 85, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1278, 222, '2026-06-02', 99, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1280, 222, '2026-06-03', 106, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1282, 222, '2026-06-04', 112, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1284, 222, '2026-06-05', 119, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1286, 222, '2026-06-06', 125, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1288, 222, '2026-06-08', 131, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1290, 222, '2026-06-09', 138, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1292, 222, '2026-06-10', 144, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1294, 222, '2026-06-11', 151, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1296, 222, '2026-06-12', 157, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1298, 222, '2026-06-13', 164, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1300, 222, '2026-06-15', 171, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1302, 224, '2026-06-02', 133, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1304, 224, '2026-06-03', 136, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1306, 224, '2026-06-04', 138, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1308, 224, '2026-06-05', 141, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1310, 224, '2026-06-06', 143, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1312, 224, '2026-06-08', 145, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1314, 224, '2026-06-09', 148, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1316, 224, '2026-06-10', 150, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1318, 224, '2026-06-11', 153, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1320, 224, '2026-06-12', 155, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1322, 224, '2026-06-13', 158, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1324, 224, '2026-06-15', 161, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1326, 226, '2026-06-02', 175, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1328, 226, '2026-06-03', 182, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1330, 226, '2026-06-04', 188, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1332, 226, '2026-06-05', 195, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1334, 226, '2026-06-06', 201, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1336, 226, '2026-06-08', 207, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1338, 226, '2026-06-09', 214, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1340, 226, '2026-06-10', 220, 2, '2026-06-15 13:36:11', 1);
INSERT INTO `book_progress` VALUES (1342, 226, '2026-06-11', 227, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1344, 226, '2026-06-12', 233, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1346, 226, '2026-06-13', 240, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1348, 226, '2026-06-15', 247, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1350, 228, '2026-06-02', 29, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1352, 228, '2026-06-03', 32, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1354, 228, '2026-06-04', 34, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1356, 228, '2026-06-05', 37, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1358, 228, '2026-06-06', 39, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1360, 228, '2026-06-08', 41, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1362, 228, '2026-06-09', 44, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1364, 228, '2026-06-10', 46, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1366, 228, '2026-06-11', 49, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1368, 228, '2026-06-12', 51, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1370, 228, '2026-06-13', 54, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1372, 228, '2026-06-15', 57, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1374, 230, '2026-06-02', 71, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1376, 230, '2026-06-03', 78, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1378, 230, '2026-06-04', 84, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1380, 230, '2026-06-05', 91, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1382, 230, '2026-06-06', 97, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1384, 230, '2026-06-08', 103, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1386, 230, '2026-06-09', 110, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1388, 230, '2026-06-10', 116, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1390, 230, '2026-06-11', 123, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1392, 230, '2026-06-12', 129, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1394, 230, '2026-06-13', 136, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1396, 230, '2026-06-15', 143, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1398, 232, '2026-06-02', 105, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1400, 232, '2026-06-03', 108, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1402, 232, '2026-06-04', 110, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1404, 232, '2026-06-05', 113, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1406, 232, '2026-06-06', 115, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1408, 232, '2026-06-08', 117, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1410, 232, '2026-06-09', 120, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1412, 232, '2026-06-10', 122, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1414, 232, '2026-06-11', 125, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1416, 232, '2026-06-12', 127, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1418, 232, '2026-06-13', 130, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1420, 232, '2026-06-15', 133, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1422, 234, '2026-06-02', 147, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1424, 234, '2026-06-03', 154, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1426, 234, '2026-06-04', 160, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1428, 234, '2026-06-05', 167, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1430, 234, '2026-06-06', 173, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1432, 234, '2026-06-08', 179, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1434, 234, '2026-06-09', 186, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1436, 234, '2026-06-10', 192, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1438, 234, '2026-06-11', 199, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1440, 234, '2026-06-12', 205, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1442, 234, '2026-06-13', 212, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1444, 234, '2026-06-15', 219, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1446, 236, '2026-06-02', 181, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1448, 236, '2026-06-03', 184, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1450, 236, '2026-06-04', 186, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1452, 236, '2026-06-05', 189, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1454, 236, '2026-06-06', 191, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1456, 236, '2026-06-08', 193, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1458, 236, '2026-06-09', 196, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1460, 236, '2026-06-10', 198, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1462, 236, '2026-06-11', 201, 2, '2026-06-15 13:36:12', 1);
INSERT INTO `book_progress` VALUES (1464, 236, '2026-06-12', 203, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1466, 236, '2026-06-13', 206, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1468, 236, '2026-06-15', 209, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1470, 238, '2026-06-02', 43, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1472, 238, '2026-06-03', 50, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1474, 238, '2026-06-04', 56, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1476, 238, '2026-06-05', 63, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1478, 238, '2026-06-06', 69, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1480, 238, '2026-06-08', 75, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1482, 238, '2026-06-09', 82, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1484, 238, '2026-06-10', 88, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1486, 238, '2026-06-11', 95, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1488, 238, '2026-06-12', 101, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1490, 238, '2026-06-13', 108, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1492, 238, '2026-06-15', 115, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1494, 240, '2026-06-02', 77, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1496, 240, '2026-06-03', 80, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1498, 240, '2026-06-04', 82, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1500, 240, '2026-06-05', 85, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1502, 240, '2026-06-06', 87, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1504, 240, '2026-06-08', 89, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1506, 240, '2026-06-09', 92, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1508, 240, '2026-06-10', 94, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1510, 240, '2026-06-11', 97, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1512, 240, '2026-06-12', 99, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1514, 240, '2026-06-13', 102, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1516, 240, '2026-06-15', 105, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1518, 242, '2026-06-02', 119, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1520, 242, '2026-06-03', 126, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1522, 242, '2026-06-04', 132, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1524, 242, '2026-06-05', 139, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1526, 242, '2026-06-06', 145, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1528, 242, '2026-06-08', 151, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1530, 242, '2026-06-09', 158, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1532, 242, '2026-06-10', 164, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1534, 242, '2026-06-11', 171, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1536, 242, '2026-06-12', 177, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1538, 242, '2026-06-13', 184, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1540, 242, '2026-06-15', 191, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1542, 244, '2026-06-02', 153, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1544, 244, '2026-06-03', 156, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1546, 244, '2026-06-04', 158, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1548, 244, '2026-06-05', 161, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1550, 244, '2026-06-06', 163, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1552, 244, '2026-06-08', 165, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1554, 244, '2026-06-09', 168, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1556, 244, '2026-06-10', 170, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1558, 244, '2026-06-11', 173, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1560, 244, '2026-06-12', 175, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1562, 244, '2026-06-13', 178, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1564, 244, '2026-06-15', 181, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1566, 246, '2026-06-02', 195, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1568, 246, '2026-06-03', 202, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1570, 246, '2026-06-04', 208, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1572, 246, '2026-06-05', 215, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1574, 246, '2026-06-06', 221, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1576, 246, '2026-06-08', 227, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1578, 246, '2026-06-09', 234, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1580, 246, '2026-06-10', 240, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1582, 246, '2026-06-11', 247, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1584, 246, '2026-06-12', 253, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1586, 246, '2026-06-13', 260, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1588, 246, '2026-06-15', 267, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1590, 248, '2026-06-02', 49, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1592, 248, '2026-06-03', 52, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1594, 248, '2026-06-04', 54, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1596, 248, '2026-06-05', 57, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1598, 248, '2026-06-06', 59, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1600, 248, '2026-06-08', 61, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1602, 248, '2026-06-09', 64, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1604, 248, '2026-06-10', 66, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1606, 248, '2026-06-11', 69, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1608, 248, '2026-06-12', 71, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1610, 248, '2026-06-13', 74, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1612, 248, '2026-06-15', 77, 2, '2026-06-15 13:36:13', 1);
INSERT INTO `book_progress` VALUES (1614, 250, '2026-06-02', 91, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1616, 250, '2026-06-03', 98, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1618, 250, '2026-06-04', 104, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1620, 250, '2026-06-05', 111, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1622, 250, '2026-06-06', 117, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1624, 250, '2026-06-08', 123, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1626, 250, '2026-06-09', 130, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1628, 250, '2026-06-10', 136, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1630, 250, '2026-06-11', 143, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1632, 250, '2026-06-12', 149, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1634, 250, '2026-06-13', 156, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1636, 250, '2026-06-15', 163, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1638, 252, '2026-06-02', 125, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1640, 252, '2026-06-03', 128, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1642, 252, '2026-06-04', 130, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1644, 252, '2026-06-05', 133, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1646, 252, '2026-06-06', 135, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1648, 252, '2026-06-08', 137, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1650, 252, '2026-06-09', 140, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1652, 252, '2026-06-10', 142, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1654, 252, '2026-06-11', 145, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1656, 252, '2026-06-12', 147, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1658, 252, '2026-06-13', 150, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1660, 252, '2026-06-15', 153, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1662, 254, '2026-06-02', 167, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1664, 254, '2026-06-03', 174, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1666, 254, '2026-06-04', 180, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1668, 254, '2026-06-05', 187, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1670, 254, '2026-06-06', 193, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1672, 254, '2026-06-08', 199, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1674, 254, '2026-06-09', 206, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1676, 254, '2026-06-10', 212, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1678, 254, '2026-06-11', 219, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1680, 254, '2026-06-12', 225, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1682, 254, '2026-06-13', 232, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1684, 254, '2026-06-15', 239, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1686, 256, '2026-06-02', 21, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1688, 256, '2026-06-03', 24, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1690, 256, '2026-06-04', 26, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1692, 256, '2026-06-05', 29, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1694, 256, '2026-06-06', 31, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1696, 256, '2026-06-08', 33, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1698, 256, '2026-06-09', 36, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1700, 256, '2026-06-10', 38, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1702, 256, '2026-06-11', 41, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1704, 256, '2026-06-12', 43, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1706, 256, '2026-06-13', 46, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1708, 256, '2026-06-15', 49, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1710, 258, '2026-06-02', 63, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1712, 258, '2026-06-03', 70, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1714, 258, '2026-06-04', 76, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1716, 258, '2026-06-05', 83, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1718, 258, '2026-06-06', 89, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1720, 258, '2026-06-08', 95, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1722, 258, '2026-06-09', 102, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1724, 258, '2026-06-10', 108, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1726, 258, '2026-06-11', 115, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1728, 258, '2026-06-12', 121, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1730, 258, '2026-06-13', 128, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1732, 258, '2026-06-15', 135, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1734, 260, '2026-06-02', 97, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1736, 260, '2026-06-03', 100, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1738, 260, '2026-06-04', 102, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1740, 260, '2026-06-05', 105, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1742, 260, '2026-06-06', 107, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1744, 260, '2026-06-08', 109, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1746, 260, '2026-06-09', 112, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1748, 260, '2026-06-10', 114, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1750, 260, '2026-06-11', 117, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1752, 260, '2026-06-12', 119, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1754, 260, '2026-06-13', 122, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1756, 260, '2026-06-15', 125, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1758, 262, '2026-06-02', 139, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1760, 262, '2026-06-03', 146, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1762, 262, '2026-06-04', 152, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1764, 262, '2026-06-05', 159, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1766, 262, '2026-06-06', 165, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1768, 262, '2026-06-08', 171, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1770, 262, '2026-06-09', 178, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1772, 262, '2026-06-10', 184, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1774, 262, '2026-06-11', 191, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1776, 262, '2026-06-12', 197, 2, '2026-06-15 13:36:14', 1);
INSERT INTO `book_progress` VALUES (1778, 262, '2026-06-13', 204, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1780, 262, '2026-06-15', 211, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1782, 264, '2026-06-02', 173, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1784, 264, '2026-06-03', 176, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1786, 264, '2026-06-04', 178, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1788, 264, '2026-06-05', 181, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1790, 264, '2026-06-06', 183, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1792, 264, '2026-06-08', 185, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1794, 264, '2026-06-09', 188, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1796, 264, '2026-06-10', 190, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1798, 264, '2026-06-11', 193, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1800, 264, '2026-06-12', 195, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1802, 264, '2026-06-13', 198, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1804, 264, '2026-06-15', 201, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1806, 266, '2026-06-02', 35, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1808, 266, '2026-06-03', 42, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1810, 266, '2026-06-04', 48, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1812, 266, '2026-06-05', 55, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1814, 266, '2026-06-06', 61, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1816, 266, '2026-06-08', 67, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1818, 266, '2026-06-09', 74, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1820, 266, '2026-06-10', 80, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1822, 266, '2026-06-11', 87, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1824, 266, '2026-06-12', 93, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1826, 266, '2026-06-13', 100, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1828, 266, '2026-06-15', 107, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1830, 268, '2026-06-02', 69, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1832, 268, '2026-06-03', 72, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1834, 268, '2026-06-04', 74, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1836, 268, '2026-06-05', 77, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1838, 268, '2026-06-06', 79, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1840, 268, '2026-06-08', 81, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1842, 268, '2026-06-09', 84, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1844, 268, '2026-06-10', 86, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1846, 268, '2026-06-11', 89, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1848, 268, '2026-06-12', 91, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1850, 268, '2026-06-13', 94, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1852, 268, '2026-06-15', 97, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1854, 270, '2026-06-02', 111, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1856, 270, '2026-06-03', 118, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1858, 270, '2026-06-04', 124, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1860, 270, '2026-06-05', 131, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1862, 270, '2026-06-06', 137, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1864, 270, '2026-06-08', 143, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1866, 270, '2026-06-09', 150, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1868, 270, '2026-06-10', 156, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1870, 270, '2026-06-11', 163, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1872, 270, '2026-06-12', 169, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1874, 270, '2026-06-13', 176, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1876, 270, '2026-06-15', 183, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1878, 272, '2026-06-02', 145, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1880, 272, '2026-06-03', 148, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1882, 272, '2026-06-04', 150, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1884, 272, '2026-06-05', 153, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1886, 272, '2026-06-06', 155, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1888, 272, '2026-06-08', 157, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1890, 272, '2026-06-09', 160, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1892, 272, '2026-06-10', 162, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1894, 272, '2026-06-11', 165, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1896, 272, '2026-06-12', 167, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1898, 272, '2026-06-13', 170, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1900, 272, '2026-06-15', 173, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1902, 274, '2026-06-02', 187, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1904, 274, '2026-06-03', 194, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1906, 274, '2026-06-04', 200, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1908, 274, '2026-06-05', 207, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1910, 274, '2026-06-06', 213, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1912, 274, '2026-06-08', 219, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1914, 274, '2026-06-09', 226, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1916, 274, '2026-06-10', 232, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1918, 274, '2026-06-11', 239, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1920, 274, '2026-06-12', 245, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1922, 274, '2026-06-13', 252, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1924, 274, '2026-06-15', 259, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1926, 276, '2026-06-02', 41, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1928, 276, '2026-06-03', 44, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1930, 276, '2026-06-04', 46, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1932, 276, '2026-06-05', 49, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1934, 276, '2026-06-06', 51, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1936, 276, '2026-06-08', 53, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1938, 276, '2026-06-09', 56, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1940, 276, '2026-06-10', 58, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1942, 276, '2026-06-11', 61, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1944, 276, '2026-06-12', 63, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1946, 276, '2026-06-13', 66, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1948, 276, '2026-06-15', 69, 2, '2026-06-15 13:36:15', 1);
INSERT INTO `book_progress` VALUES (1950, 140, '2026-06-15', 88, 44, '2026-06-15 15:35:58', 2);
INSERT INTO `book_progress` VALUES (1954, 98, '2026-06-15', 51, 54, '2026-06-15 17:20:30', 2);
INSERT INTO `book_progress` VALUES (1972, 100, '2026-06-15', 200, 54, '2026-06-15 18:07:54', 2);
INSERT INTO `book_progress` VALUES (2014, 114, '2026-06-16', 205, 54, '2026-06-16 17:28:58', 2);
INSERT INTO `book_progress` VALUES (2026, 278, '2026-06-03', 83, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2028, 278, '2026-06-04', 90, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2030, 278, '2026-06-05', 96, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2032, 278, '2026-06-06', 103, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2034, 278, '2026-06-08', 110, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2036, 278, '2026-06-09', 116, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2038, 278, '2026-06-10', 123, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2040, 278, '2026-06-11', 129, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2042, 278, '2026-06-12', 136, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2044, 278, '2026-06-13', 142, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2046, 278, '2026-06-15', 148, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2048, 278, '2026-06-16', 155, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2050, 280, '2026-06-03', 117, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2052, 280, '2026-06-04', 120, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2054, 280, '2026-06-05', 122, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2056, 280, '2026-06-06', 125, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2058, 280, '2026-06-08', 128, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2060, 280, '2026-06-09', 130, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2062, 280, '2026-06-10', 133, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2064, 280, '2026-06-11', 135, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2066, 280, '2026-06-12', 138, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2068, 280, '2026-06-13', 140, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2070, 280, '2026-06-15', 142, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2072, 280, '2026-06-16', 145, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2074, 282, '2026-06-03', 159, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2076, 282, '2026-06-04', 166, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2078, 282, '2026-06-05', 172, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2080, 282, '2026-06-06', 179, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2082, 282, '2026-06-08', 186, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2084, 282, '2026-06-09', 192, 2, '2026-06-16 05:24:07', 1);
INSERT INTO `book_progress` VALUES (2086, 282, '2026-06-10', 199, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2088, 282, '2026-06-11', 205, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2090, 282, '2026-06-12', 212, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2092, 282, '2026-06-13', 218, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2094, 282, '2026-06-15', 224, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2096, 282, '2026-06-16', 231, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2098, 284, '2026-06-03', 193, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2100, 284, '2026-06-04', 196, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2102, 284, '2026-06-05', 198, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2104, 284, '2026-06-06', 201, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2106, 284, '2026-06-08', 204, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2108, 284, '2026-06-09', 206, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2110, 284, '2026-06-10', 209, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2112, 284, '2026-06-11', 211, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2114, 284, '2026-06-12', 214, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2116, 284, '2026-06-13', 216, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2118, 284, '2026-06-15', 218, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2120, 284, '2026-06-16', 221, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2122, 286, '2026-06-03', 55, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2124, 286, '2026-06-04', 62, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2126, 286, '2026-06-05', 68, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2128, 286, '2026-06-06', 75, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2130, 286, '2026-06-08', 82, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2132, 286, '2026-06-09', 88, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2134, 286, '2026-06-10', 95, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2136, 286, '2026-06-11', 101, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2138, 286, '2026-06-12', 108, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2140, 286, '2026-06-13', 114, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2142, 286, '2026-06-15', 120, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2144, 286, '2026-06-16', 127, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2146, 288, '2026-06-03', 89, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2148, 288, '2026-06-04', 92, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2150, 288, '2026-06-05', 94, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2152, 288, '2026-06-06', 97, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2154, 288, '2026-06-08', 100, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2156, 288, '2026-06-09', 102, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2158, 288, '2026-06-10', 105, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2160, 288, '2026-06-11', 107, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2162, 288, '2026-06-12', 110, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2164, 288, '2026-06-13', 112, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2166, 288, '2026-06-15', 114, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2168, 288, '2026-06-16', 117, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2170, 290, '2026-06-03', 131, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2172, 290, '2026-06-04', 138, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2174, 290, '2026-06-05', 144, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2176, 290, '2026-06-06', 151, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2178, 290, '2026-06-08', 158, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2180, 290, '2026-06-09', 164, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2182, 290, '2026-06-10', 171, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2184, 290, '2026-06-11', 177, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2186, 290, '2026-06-12', 184, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2188, 290, '2026-06-13', 190, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2190, 290, '2026-06-15', 196, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2192, 290, '2026-06-16', 203, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2194, 292, '2026-06-03', 165, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2196, 292, '2026-06-04', 168, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2198, 292, '2026-06-05', 170, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2200, 292, '2026-06-06', 173, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2202, 292, '2026-06-08', 176, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2204, 292, '2026-06-09', 178, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2206, 292, '2026-06-10', 181, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2208, 292, '2026-06-11', 183, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2210, 292, '2026-06-12', 186, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2212, 292, '2026-06-13', 188, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2214, 292, '2026-06-15', 190, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2216, 292, '2026-06-16', 193, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2218, 294, '2026-06-03', 27, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2220, 294, '2026-06-04', 34, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2222, 294, '2026-06-05', 40, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2224, 294, '2026-06-06', 47, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2226, 294, '2026-06-08', 54, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2228, 294, '2026-06-09', 60, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2230, 294, '2026-06-10', 67, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2232, 294, '2026-06-11', 73, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2234, 294, '2026-06-12', 80, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2236, 294, '2026-06-13', 86, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2238, 294, '2026-06-15', 92, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2240, 294, '2026-06-16', 99, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2242, 296, '2026-06-03', 61, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2244, 296, '2026-06-04', 64, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2246, 296, '2026-06-05', 66, 2, '2026-06-16 05:24:08', 1);
INSERT INTO `book_progress` VALUES (2248, 296, '2026-06-06', 69, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2250, 296, '2026-06-08', 72, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2252, 296, '2026-06-09', 74, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2254, 296, '2026-06-10', 77, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2256, 296, '2026-06-11', 79, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2258, 296, '2026-06-12', 82, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2260, 296, '2026-06-13', 84, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2262, 296, '2026-06-15', 86, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2264, 296, '2026-06-16', 89, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2266, 298, '2026-06-03', 103, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2268, 298, '2026-06-04', 110, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2270, 298, '2026-06-05', 116, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2272, 298, '2026-06-06', 123, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2274, 298, '2026-06-08', 130, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2276, 298, '2026-06-09', 136, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2278, 298, '2026-06-10', 143, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2280, 298, '2026-06-11', 149, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2282, 298, '2026-06-12', 156, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2284, 298, '2026-06-13', 162, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2286, 298, '2026-06-15', 168, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2288, 298, '2026-06-16', 175, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2290, 300, '2026-06-03', 137, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2292, 300, '2026-06-04', 140, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2294, 300, '2026-06-05', 142, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2296, 300, '2026-06-06', 145, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2298, 300, '2026-06-08', 148, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2300, 300, '2026-06-09', 150, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2302, 300, '2026-06-10', 153, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2304, 300, '2026-06-11', 155, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2306, 300, '2026-06-12', 158, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2308, 300, '2026-06-13', 160, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2310, 300, '2026-06-15', 162, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2312, 300, '2026-06-16', 165, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2314, 302, '2026-06-03', 179, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2316, 302, '2026-06-04', 186, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2318, 302, '2026-06-05', 192, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2320, 302, '2026-06-06', 199, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2322, 302, '2026-06-08', 206, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2324, 302, '2026-06-09', 212, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2326, 302, '2026-06-10', 219, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2328, 302, '2026-06-11', 225, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2330, 302, '2026-06-12', 232, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2332, 302, '2026-06-13', 238, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2334, 302, '2026-06-15', 244, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2336, 302, '2026-06-16', 251, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2338, 304, '2026-06-03', 33, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2340, 304, '2026-06-04', 36, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2342, 304, '2026-06-05', 38, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2344, 304, '2026-06-06', 41, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2346, 304, '2026-06-08', 44, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2348, 304, '2026-06-09', 46, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2350, 304, '2026-06-10', 49, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2352, 304, '2026-06-11', 51, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2354, 304, '2026-06-12', 54, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2356, 304, '2026-06-13', 56, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2358, 304, '2026-06-15', 58, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2360, 304, '2026-06-16', 61, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2362, 306, '2026-06-03', 75, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2364, 306, '2026-06-04', 82, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2366, 306, '2026-06-05', 88, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2368, 306, '2026-06-06', 95, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2370, 306, '2026-06-08', 102, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2372, 306, '2026-06-09', 108, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2374, 306, '2026-06-10', 115, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2376, 306, '2026-06-11', 121, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2378, 306, '2026-06-12', 128, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2380, 306, '2026-06-13', 134, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2382, 306, '2026-06-15', 140, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2384, 306, '2026-06-16', 147, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2386, 308, '2026-06-03', 109, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2388, 308, '2026-06-04', 112, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2390, 308, '2026-06-05', 114, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2392, 308, '2026-06-06', 117, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2394, 308, '2026-06-08', 120, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2396, 308, '2026-06-09', 122, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2398, 308, '2026-06-10', 125, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2400, 308, '2026-06-11', 127, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2402, 308, '2026-06-12', 130, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2404, 308, '2026-06-13', 132, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2406, 308, '2026-06-15', 134, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2408, 308, '2026-06-16', 137, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2410, 310, '2026-06-03', 151, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2412, 310, '2026-06-04', 158, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2414, 310, '2026-06-05', 164, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2416, 310, '2026-06-06', 171, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2418, 310, '2026-06-08', 178, 2, '2026-06-16 05:24:09', 1);
INSERT INTO `book_progress` VALUES (2420, 310, '2026-06-09', 184, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2422, 310, '2026-06-10', 191, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2424, 310, '2026-06-11', 197, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2426, 310, '2026-06-12', 204, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2428, 310, '2026-06-13', 210, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2430, 310, '2026-06-15', 216, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2432, 310, '2026-06-16', 223, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2434, 312, '2026-06-03', 185, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2436, 312, '2026-06-04', 188, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2438, 312, '2026-06-05', 190, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2440, 312, '2026-06-06', 193, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2442, 312, '2026-06-08', 196, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2444, 312, '2026-06-09', 198, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2446, 312, '2026-06-10', 201, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2448, 312, '2026-06-11', 203, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2450, 312, '2026-06-12', 206, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2452, 312, '2026-06-13', 208, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2454, 312, '2026-06-15', 210, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2456, 312, '2026-06-16', 213, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2458, 314, '2026-06-03', 47, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2460, 314, '2026-06-04', 54, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2462, 314, '2026-06-05', 60, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2464, 314, '2026-06-06', 67, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2466, 314, '2026-06-08', 74, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2468, 314, '2026-06-09', 80, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2470, 314, '2026-06-10', 87, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2472, 314, '2026-06-11', 93, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2474, 314, '2026-06-12', 100, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2476, 314, '2026-06-13', 106, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2478, 314, '2026-06-15', 112, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2480, 314, '2026-06-16', 119, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2482, 316, '2026-06-03', 81, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2484, 316, '2026-06-04', 84, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2486, 316, '2026-06-05', 86, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2488, 316, '2026-06-06', 89, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2490, 316, '2026-06-08', 92, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2492, 316, '2026-06-09', 94, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2494, 316, '2026-06-10', 97, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2496, 316, '2026-06-11', 99, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2498, 316, '2026-06-12', 102, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2500, 316, '2026-06-13', 104, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2502, 316, '2026-06-15', 106, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2504, 316, '2026-06-16', 109, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2506, 318, '2026-06-03', 123, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2508, 318, '2026-06-04', 130, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2510, 318, '2026-06-05', 136, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2512, 318, '2026-06-06', 143, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2514, 318, '2026-06-08', 150, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2516, 318, '2026-06-09', 156, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2518, 318, '2026-06-10', 163, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2520, 318, '2026-06-11', 169, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2522, 318, '2026-06-12', 176, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2524, 318, '2026-06-13', 182, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2526, 318, '2026-06-15', 188, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2528, 318, '2026-06-16', 195, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2530, 320, '2026-06-03', 157, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2532, 320, '2026-06-04', 160, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2534, 320, '2026-06-05', 162, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2536, 320, '2026-06-06', 165, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2538, 320, '2026-06-08', 168, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2540, 320, '2026-06-09', 170, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2542, 320, '2026-06-10', 173, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2544, 320, '2026-06-11', 175, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2546, 320, '2026-06-12', 178, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2548, 320, '2026-06-13', 180, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2550, 320, '2026-06-15', 182, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2552, 320, '2026-06-16', 185, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2554, 322, '2026-06-03', 199, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2556, 322, '2026-06-04', 206, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2558, 322, '2026-06-05', 212, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2560, 322, '2026-06-06', 219, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2562, 322, '2026-06-08', 226, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2564, 322, '2026-06-09', 232, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2566, 322, '2026-06-10', 239, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2568, 322, '2026-06-11', 245, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2570, 322, '2026-06-12', 252, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2572, 322, '2026-06-13', 258, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2574, 322, '2026-06-15', 264, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2576, 322, '2026-06-16', 271, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2578, 324, '2026-06-03', 53, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2580, 324, '2026-06-04', 56, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2582, 324, '2026-06-05', 58, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2584, 324, '2026-06-06', 61, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2586, 324, '2026-06-08', 64, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2588, 324, '2026-06-09', 66, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2590, 324, '2026-06-10', 69, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2592, 324, '2026-06-11', 71, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2594, 324, '2026-06-12', 74, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2596, 324, '2026-06-13', 76, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2598, 324, '2026-06-15', 78, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2600, 324, '2026-06-16', 81, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2602, 326, '2026-06-03', 95, 2, '2026-06-16 05:24:10', 1);
INSERT INTO `book_progress` VALUES (2604, 326, '2026-06-04', 102, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2606, 326, '2026-06-05', 108, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2608, 326, '2026-06-06', 115, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2610, 326, '2026-06-08', 122, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2612, 326, '2026-06-09', 128, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2614, 326, '2026-06-10', 135, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2616, 326, '2026-06-11', 141, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2618, 326, '2026-06-12', 148, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2620, 326, '2026-06-13', 154, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2622, 326, '2026-06-15', 160, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2624, 326, '2026-06-16', 167, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2626, 328, '2026-06-03', 129, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2628, 328, '2026-06-04', 132, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2630, 328, '2026-06-05', 134, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2632, 328, '2026-06-06', 137, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2634, 328, '2026-06-08', 140, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2636, 328, '2026-06-09', 142, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2638, 328, '2026-06-10', 145, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2640, 328, '2026-06-11', 147, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2642, 328, '2026-06-12', 150, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2644, 328, '2026-06-13', 152, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2646, 328, '2026-06-15', 154, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2648, 328, '2026-06-16', 157, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2650, 330, '2026-06-03', 171, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2652, 330, '2026-06-04', 178, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2654, 330, '2026-06-05', 184, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2656, 330, '2026-06-06', 191, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2658, 330, '2026-06-08', 198, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2660, 330, '2026-06-09', 204, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2662, 330, '2026-06-10', 211, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2664, 330, '2026-06-11', 217, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2666, 330, '2026-06-12', 224, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2668, 330, '2026-06-13', 230, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2670, 330, '2026-06-15', 236, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2672, 330, '2026-06-16', 243, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2674, 332, '2026-06-03', 25, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2676, 332, '2026-06-04', 28, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2678, 332, '2026-06-05', 30, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2680, 332, '2026-06-06', 33, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2682, 332, '2026-06-08', 36, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2684, 332, '2026-06-09', 38, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2686, 332, '2026-06-10', 41, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2688, 332, '2026-06-11', 43, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2690, 332, '2026-06-12', 46, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2692, 332, '2026-06-13', 48, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2694, 332, '2026-06-15', 50, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2696, 332, '2026-06-16', 53, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2698, 334, '2026-06-03', 67, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2700, 334, '2026-06-04', 74, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2702, 334, '2026-06-05', 80, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2704, 334, '2026-06-06', 87, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2706, 334, '2026-06-08', 94, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2708, 334, '2026-06-09', 100, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2710, 334, '2026-06-10', 107, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2712, 334, '2026-06-11', 113, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2714, 334, '2026-06-12', 120, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2716, 334, '2026-06-13', 126, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2718, 334, '2026-06-15', 132, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2720, 334, '2026-06-16', 139, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2722, 336, '2026-06-03', 101, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2724, 336, '2026-06-04', 104, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2726, 336, '2026-06-05', 106, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2728, 336, '2026-06-06', 109, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2730, 336, '2026-06-08', 112, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2732, 336, '2026-06-09', 114, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2734, 336, '2026-06-10', 117, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2736, 336, '2026-06-11', 119, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2738, 336, '2026-06-12', 122, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2740, 336, '2026-06-13', 124, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2742, 336, '2026-06-15', 126, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2744, 336, '2026-06-16', 129, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2746, 338, '2026-06-03', 143, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2748, 338, '2026-06-04', 150, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2750, 338, '2026-06-05', 156, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2752, 338, '2026-06-06', 163, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2754, 338, '2026-06-08', 170, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2756, 338, '2026-06-09', 176, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2758, 338, '2026-06-10', 183, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2760, 338, '2026-06-11', 189, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2762, 338, '2026-06-12', 196, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2764, 338, '2026-06-13', 202, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2766, 338, '2026-06-15', 208, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2768, 338, '2026-06-16', 215, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2770, 340, '2026-06-03', 177, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2772, 340, '2026-06-04', 180, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2774, 340, '2026-06-05', 182, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2776, 340, '2026-06-06', 185, 2, '2026-06-16 05:24:11', 1);
INSERT INTO `book_progress` VALUES (2778, 340, '2026-06-08', 188, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2780, 340, '2026-06-09', 190, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2782, 340, '2026-06-10', 193, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2784, 340, '2026-06-11', 195, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2786, 340, '2026-06-12', 198, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2788, 340, '2026-06-13', 200, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2790, 340, '2026-06-15', 202, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2792, 340, '2026-06-16', 205, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2794, 342, '2026-06-03', 39, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2796, 342, '2026-06-04', 46, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2798, 342, '2026-06-05', 52, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2800, 342, '2026-06-06', 59, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2802, 342, '2026-06-08', 66, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2804, 342, '2026-06-09', 72, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2806, 342, '2026-06-10', 79, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2808, 342, '2026-06-11', 85, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2810, 342, '2026-06-12', 92, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2812, 342, '2026-06-13', 98, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2814, 342, '2026-06-15', 104, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2816, 342, '2026-06-16', 111, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2818, 344, '2026-06-03', 73, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2820, 344, '2026-06-04', 76, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2822, 344, '2026-06-05', 78, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2824, 344, '2026-06-06', 81, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2826, 344, '2026-06-08', 84, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2828, 344, '2026-06-09', 86, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2830, 344, '2026-06-10', 89, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2832, 344, '2026-06-11', 91, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2834, 344, '2026-06-12', 94, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2836, 344, '2026-06-13', 96, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2838, 344, '2026-06-15', 98, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2840, 344, '2026-06-16', 101, 2, '2026-06-16 05:24:12', 1);
INSERT INTO `book_progress` VALUES (2842, 96, '2026-06-16', 76, 54, '2026-06-16 17:27:35', 2);
INSERT INTO `book_progress` VALUES (2862, 100, '2026-06-16', 206, 54, '2026-06-16 18:10:37', 2);
INSERT INTO `book_progress` VALUES (2874, 130, '2026-06-17', 408, 54, '2026-06-17 16:22:58', 2);
INSERT INTO `book_progress` VALUES (2884, 114, '2026-06-17', 209, 54, '2026-06-17 03:45:04', 2);
INSERT INTO `book_progress` VALUES (2892, 96, '2026-06-17', 82, 54, '2026-06-17 16:20:52', 2);
INSERT INTO `book_progress` VALUES (2914, 130, '2026-06-18', 419, 54, '2026-06-18 18:59:34', 2);
INSERT INTO `book_progress` VALUES (2916, 114, '2026-06-18', 215, 54, '2026-06-18 19:02:41', 2);
INSERT INTO `book_progress` VALUES (2920, 106, '2026-06-18', 91, 54, '2026-06-18 18:55:31', 2);
INSERT INTO `book_progress` VALUES (2922, 100, '2026-06-18', 211, 54, '2026-06-18 18:56:51', 2);
INSERT INTO `book_progress` VALUES (2932, 104, '2026-06-18', 135, 54, '2026-06-18 18:58:24', 2);
INSERT INTO `book_progress` VALUES (2958, 130, '2026-06-19', 430, 54, '2026-06-19 03:29:40', 2);
INSERT INTO `book_progress` VALUES (2960, 114, '2026-06-19', 219, 54, '2026-06-19 03:31:21', 2);
INSERT INTO `book_progress` VALUES (2962, 68, '2026-06-19', 77, 40, '2026-06-19 17:51:16', 2);
INSERT INTO `book_progress` VALUES (2964, 72, '2026-06-19', 18, 40, '2026-06-19 17:51:48', 2);
INSERT INTO `book_progress` VALUES (2966, 78, '2026-06-19', 25, 40, '2026-06-19 17:52:02', 2);
INSERT INTO `book_progress` VALUES (2968, 102, '2026-06-19', 43, 54, '2026-06-19 18:07:03', 2);
INSERT INTO `book_progress` VALUES (2984, 96, '2026-06-19', 87, 54, '2026-06-19 18:08:56', 2);
INSERT INTO `book_progress` VALUES (2994, 100, '2026-06-19', 214, 54, '2026-06-19 18:10:22', 2);
INSERT INTO `book_progress` VALUES (3000, 130, '2026-06-20', 439, 54, '2026-06-20 03:42:40', 2);
INSERT INTO `book_progress` VALUES (3002, 114, '2026-06-20', 243, 54, '2026-06-20 19:24:02', 2);
INSERT INTO `book_progress` VALUES (3018, 100, '2026-06-20', 218, 54, '2026-06-20 19:22:33', 2);
INSERT INTO `book_progress` VALUES (3028, 106, '2026-06-20', 102, 54, '2026-06-20 19:25:34', 2);
INSERT INTO `book_progress` VALUES (3050, 104, '2026-06-20', 137, 54, '2026-06-20 19:27:15', 2);
INSERT INTO `book_progress` VALUES (3054, 130, '2026-06-22', 449, 54, '2026-06-22 03:33:04', 2);
INSERT INTO `book_progress` VALUES (3056, 98, '2026-06-22', 55, 54, '2026-06-22 17:22:33', 2);
INSERT INTO `book_progress` VALUES (3058, 100, '2026-06-22', 223, 54, '2026-06-22 18:12:54', 2);
INSERT INTO `book_progress` VALUES (3068, 130, '2026-06-23', 467, 54, '2026-06-23 16:50:53', 2);
INSERT INTO `book_progress` VALUES (3072, 100, '2026-06-23', 234, 54, '2026-06-23 18:27:41', 2);
INSERT INTO `book_progress` VALUES (3074, 96, '2026-06-23', 94, 54, '2026-06-23 18:31:37', 2);
INSERT INTO `book_progress` VALUES (3076, 130, '2026-06-24', 484, 54, '2026-06-24 15:52:35', 2);
INSERT INTO `book_progress` VALUES (3078, 114, '2026-06-24', 255, 54, '2026-06-24 03:34:40', 2);
INSERT INTO `book_progress` VALUES (3080, 66, '2026-06-24', 44, 40, '2026-06-24 17:58:54', 2);
INSERT INTO `book_progress` VALUES (3082, 78, '2026-06-24', 27, 40, '2026-06-24 15:09:58', 2);
INSERT INTO `book_progress` VALUES (3084, 60, '2026-06-24', 84, 44, '2026-06-24 15:41:08', 2);
INSERT INTO `book_progress` VALUES (3098, 112, '2026-06-24', 1, 44, '2026-06-24 15:42:29', 2);
INSERT INTO `book_progress` VALUES (3100, 140, '2026-06-24', 106, 44, '2026-06-24 15:42:53', 2);
INSERT INTO `book_progress` VALUES (3102, 136, '2026-06-24', 55, 44, '2026-06-24 15:43:01', 2);
INSERT INTO `book_progress` VALUES (3104, 124, '2026-06-24', 24, 44, '2026-06-24 15:44:04', 2);
INSERT INTO `book_progress` VALUES (3106, 56, '2026-06-24', 20, 44, '2026-06-24 15:44:53', 2);
INSERT INTO `book_progress` VALUES (3110, 100, '2026-06-24', 239, 54, '2026-06-24 17:57:44', 2);
INSERT INTO `book_progress` VALUES (3112, 16, '2026-06-24', 365, 40, '2026-06-24 17:58:45', 2);
INSERT INTO `book_progress` VALUES (3116, 68, '2026-06-24', 78, 40, '2026-06-24 17:59:22', 2);
INSERT INTO `book_progress` VALUES (3118, 72, '2026-06-24', 23, 40, '2026-06-24 17:59:59', 2);
INSERT INTO `book_progress` VALUES (3120, 76, '2026-06-24', 50, 40, '2026-06-24 18:00:26', 2);
INSERT INTO `book_progress` VALUES (3122, 98, '2026-06-24', 66, 54, '2026-06-24 19:02:28', 2);
INSERT INTO `book_progress` VALUES (3124, 130, '2026-06-25', 494, 54, '2026-06-25 03:24:53', 2);
INSERT INTO `book_progress` VALUES (3126, 114, '2026-06-25', 257, 54, '2026-06-25 03:26:52', 2);
INSERT INTO `book_progress` VALUES (3130, 102, '2026-06-25', 46, 54, '2026-06-25 11:56:09', 2);
INSERT INTO `book_progress` VALUES (3136, 130, '2026-06-26', 504, 54, '2026-06-26 04:49:13', 2);
INSERT INTO `book_progress` VALUES (3156, 114, '2026-06-26', 262, 54, '2026-06-26 04:51:36', 2);
INSERT INTO `book_progress` VALUES (3166, 102, '2026-06-26', 50, 54, '2026-06-26 15:56:27', 2);
INSERT INTO `book_progress` VALUES (3174, 114, '2026-06-27', 273, 54, '2026-06-27 03:41:51', 2);
INSERT INTO `book_progress` VALUES (3176, 102, '2026-06-27', 53, 54, '2026-06-27 12:06:13', 2);
INSERT INTO `book_progress` VALUES (3182, 130, '2026-06-28', 516, 54, '2026-06-28 03:52:38', 2);
INSERT INTO `book_progress` VALUES (3184, 114, '2026-06-28', 276, 54, '2026-06-28 04:17:13', 2);
INSERT INTO `book_progress` VALUES (3192, 102, '2026-06-28', 56, 54, '2026-06-28 13:04:57', 2);
INSERT INTO `book_progress` VALUES (3196, 130, '2026-06-29', 532, 54, '2026-06-29 15:48:45', 2);
INSERT INTO `book_progress` VALUES (3208, 96, '2026-06-29', 105, 54, '2026-06-29 16:17:53', 2);
INSERT INTO `book_progress` VALUES (3210, 98, '2026-06-29', 71, 54, '2026-06-29 17:18:31', 2);
INSERT INTO `book_progress` VALUES (3220, 130, '2026-06-30', 545, 54, '2026-06-30 16:22:26', 2);
INSERT INTO `book_progress` VALUES (3238, 114, '2026-06-30', 282, 54, '2026-06-30 16:24:50', 2);
INSERT INTO `book_progress` VALUES (3246, 98, '2026-06-30', 76, 54, '2026-06-30 16:20:40', 2);
INSERT INTO `book_progress` VALUES (3268, 100, '2026-06-30', 248, 54, '2026-06-30 17:32:37', 2);
INSERT INTO `book_progress` VALUES (3270, 130, '2026-07-01', 552, 54, '2026-07-01 15:45:45', 2);
INSERT INTO `book_progress` VALUES (3284, 130, '2026-07-02', 559, 54, '2026-07-02 03:36:09', 2);
INSERT INTO `book_progress` VALUES (3286, 114, '2026-07-02', 289, 54, '2026-07-02 03:37:43', 2);
INSERT INTO `book_progress` VALUES (3288, 130, '2026-07-03', 565, 54, '2026-07-03 03:30:26', 2);
INSERT INTO `book_progress` VALUES (3290, 114, '2026-07-03', 296, 54, '2026-07-03 03:32:16', 2);
INSERT INTO `book_progress` VALUES (3292, 102, '2026-07-03', 67, 54, '2026-07-03 18:06:51', 2);
INSERT INTO `book_progress` VALUES (3294, 104, '2026-07-03', 143, 54, '2026-07-03 18:08:28', 2);
INSERT INTO `book_progress` VALUES (3296, 96, '2026-07-03', 108, 54, '2026-07-03 18:10:06', 2);
INSERT INTO `book_progress` VALUES (3302, 114, '2026-07-04', 303, 54, '2026-07-04 03:34:37', 2);
INSERT INTO `book_progress` VALUES (3316, 106, '2026-07-04', 126, 54, '2026-07-04 19:14:11', 2);
INSERT INTO `book_progress` VALUES (3334, 114, '2026-07-05', 333, 54, '2026-07-05 03:28:48', 2);
INSERT INTO `book_progress` VALUES (3338, 130, '2026-07-06', 582, 54, '2026-07-06 16:13:29', 2);
INSERT INTO `book_progress` VALUES (3340, 96, '2026-07-06', 115, 54, '2026-07-06 16:11:26', 2);
INSERT INTO `book_progress` VALUES (3352, 100, '2026-07-06', 257, 54, '2026-07-06 18:18:08', 2);
INSERT INTO `book_progress` VALUES (3354, 130, '2026-07-07', 592, 54, '2026-07-07 16:25:23', 2);
INSERT INTO `book_progress` VALUES (3356, 114, '2026-07-07', 337, 54, '2026-07-07 03:28:22', 2);
INSERT INTO `book_progress` VALUES (3364, 66, '2026-07-07', 53, 40, '2026-07-07 17:23:46', 2);
INSERT INTO `book_progress` VALUES (3366, 70, '2026-07-07', 21, 40, '2026-07-07 11:32:38', 2);
INSERT INTO `book_progress` VALUES (3368, 72, '2026-07-07', 33, 40, '2026-07-07 20:40:11', 2);
INSERT INTO `book_progress` VALUES (3370, 68, '2026-07-07', 79, 40, '2026-07-07 11:33:44', 2);
INSERT INTO `book_progress` VALUES (3372, 16, '2026-07-07', 370, 40, '2026-07-07 11:34:38', 2);
INSERT INTO `book_progress` VALUES (3374, 76, '2026-07-07', 58, 40, '2026-07-07 11:34:56', 2);
INSERT INTO `book_progress` VALUES (3376, 96, '2026-07-07', 121, 54, '2026-07-07 14:54:15', 2);
INSERT INTO `book_progress` VALUES (3388, 78, '2026-07-07', 29, 40, '2026-07-07 15:03:28', 2);
INSERT INTO `book_progress` VALUES (3390, 98, '2026-07-07', 87, 54, '2026-07-07 16:24:58', 2);
INSERT INTO `book_progress` VALUES (3400, 100, '2026-07-07', 267, 54, '2026-07-07 18:16:25', 2);
INSERT INTO `book_progress` VALUES (3404, 130, '2026-07-08', 604, 54, '2026-07-08 15:51:46', 2);
INSERT INTO `book_progress` VALUES (3420, 114, '2026-07-08', 345, 54, '2026-07-08 03:33:09', 2);
INSERT INTO `book_progress` VALUES (3422, 70, '2026-07-08', 22, 40, '2026-07-08 15:09:47', 2);
INSERT INTO `book_progress` VALUES (3424, 72, '2026-07-08', 35, 40, '2026-07-08 15:10:06', 2);
INSERT INTO `book_progress` VALUES (3434, 102, '2026-07-08', 73, 54, '2026-07-08 18:58:01', 2);
INSERT INTO `book_progress` VALUES (3446, 100, '2026-07-08', 270, 54, '2026-07-08 18:58:59', 2);
INSERT INTO `book_progress` VALUES (3452, 130, '2026-07-09', 610, 54, '2026-07-09 04:02:55', 2);
INSERT INTO `book_progress` VALUES (3464, 114, '2026-07-09', 351, 54, '2026-07-09 04:04:52', 2);
INSERT INTO `book_progress` VALUES (3476, 130, '2026-07-10', 617, 54, '2026-07-10 03:36:44', 2);
INSERT INTO `book_progress` VALUES (3478, 16, '2026-07-10', 374, 40, '2026-07-10 16:28:59', 2);
INSERT INTO `book_progress` VALUES (3480, 68, '2026-07-10', 99, 40, '2026-07-10 16:29:11', 2);
INSERT INTO `book_progress` VALUES (3482, 70, '2026-07-10', 23, 40, '2026-07-10 16:29:21', 2);
INSERT INTO `book_progress` VALUES (3484, 72, '2026-07-10', 36, 40, '2026-07-10 16:29:37', 2);
INSERT INTO `book_progress` VALUES (3486, 78, '2026-07-10', 30, 40, '2026-07-10 16:29:48', 2);
INSERT INTO `book_progress` VALUES (3488, 102, '2026-07-10', 81, 54, '2026-07-10 18:30:45', 2);
INSERT INTO `book_progress` VALUES (3510, 106, '2026-07-10', 137, 54, '2026-07-10 18:32:10', 2);
INSERT INTO `book_progress` VALUES (3526, 96, '2026-07-10', 124, 54, '2026-07-10 18:33:28', 2);
INSERT INTO `book_progress` VALUES (3532, 114, '2026-07-11', 373, 54, '2026-07-11 18:33:30', 2);
INSERT INTO `book_progress` VALUES (3552, 100, '2026-07-11', 289, 54, '2026-07-11 18:31:52', 2);
INSERT INTO `book_progress` VALUES (3614, 130, '2026-07-13', 630, 54, '2026-07-13 18:37:28', 2);
INSERT INTO `book_progress` VALUES (3630, 114, '2026-07-13', 383, 54, '2026-07-13 18:36:10', 2);
INSERT INTO `book_progress` VALUES (3642, 100, '2026-07-13', 302, 54, '2026-07-13 18:33:59', 2);
INSERT INTO `book_progress` VALUES (3686, 130, '2026-07-14', 635, 54, '2026-07-14 03:50:07', 2);
INSERT INTO `book_progress` VALUES (3696, 114, '2026-07-14', 390, 54, '2026-07-14 17:18:32', 2);
INSERT INTO `book_progress` VALUES (3702, 66, '2026-07-14', 57, 40, '2026-07-14 16:13:19', 2);
INSERT INTO `book_progress` VALUES (3704, 78, '2026-07-14', 31, 40, '2026-07-14 16:13:58', 2);
INSERT INTO `book_progress` VALUES (3706, 68, '2026-07-14', 102, 40, '2026-07-14 16:15:20', 2);
INSERT INTO `book_progress` VALUES (3708, 96, '2026-07-14', 128, 54, '2026-07-14 17:12:49', 2);
INSERT INTO `book_progress` VALUES (3724, 130, '2026-07-15', 647, 54, '2026-07-15 15:49:19', 2);
INSERT INTO `book_progress` VALUES (3748, 96, '2026-07-15', 132, 54, '2026-07-15 16:13:35', 2);
INSERT INTO `book_progress` VALUES (3756, 102, '2026-07-15', 84, 54, '2026-07-15 17:28:23', 2);
INSERT INTO `book_progress` VALUES (3762, 100, '2026-07-15', 314, 54, '2026-07-15 18:50:39', 2);
INSERT INTO `book_progress` VALUES (3786, 130, '2026-07-16', 653, 54, '2026-07-16 03:51:10', 2);
INSERT INTO `book_progress` VALUES (3798, 114, '2026-07-16', 396, 54, '2026-07-16 03:52:55', 2);

-- ----------------------------
-- Table structure for books
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `class_id` int NULL DEFAULT NULL,
  `tenant_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_book_title_per_tenant`(`tenant_id` ASC, `title` ASC) USING BTREE,
  INDEX `fk_books_class`(`class_id` ASC) USING BTREE,
  CONSTRAINT `fk_books_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_books_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 307 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of books
-- ----------------------------
INSERT INTO `books` VALUES (10, 'تفسير(30)', 4, 2);
INSERT INTO `books` VALUES (12, 'الأدب', 4, 2);
INSERT INTO `books` VALUES (16, 'نورالانوار (قیاس)', 10, 2);
INSERT INTO `books` VALUES (24, 'المنطق', 10, 2);
INSERT INTO `books` VALUES (26, 'شرح العقائد', 12, 2);
INSERT INTO `books` VALUES (28, 'صحيح البخاري  (2)', 16, 2);
INSERT INTO `books` VALUES (30, 'الترمذي (2)', 16, 2);
INSERT INTO `books` VALUES (36, 'شمائل الترمذي', 16, 2);
INSERT INTO `books` VALUES (42, 'گردانوں کا اجرا', 4, 2);
INSERT INTO `books` VALUES (50, 'الأدب والحديث', 4, 2);
INSERT INTO `books` VALUES (52, 'هداية النحو', 4, 2);
INSERT INTO `books` VALUES (56, 'شرح العقيدة الطحاوية', 10, 2);
INSERT INTO `books` VALUES (58, 'الهداية ( الجزء الأول)', 10, 2);
INSERT INTO `books` VALUES (60, 'ديوان المتنبي والمعلقات', 10, 2);
INSERT INTO `books` VALUES (62, 'آثار السنن وحفظ الحديث', 10, 2);
INSERT INTO `books` VALUES (66, 'معين الفلسفة والانتباهات', 10, 2);
INSERT INTO `books` VALUES (68, 'التفسير(10-1)', 10, 2);
INSERT INTO `books` VALUES (70, 'الهداية (الجزء الثاني)', 12, 2);
INSERT INTO `books` VALUES (72, 'التوضيح (1)', 12, 2);
INSERT INTO `books` VALUES (74, 'كتاب الآثار وخير الأصول', 12, 2);
INSERT INTO `books` VALUES (76, 'السراجي والفلکیات', 12, 2);
INSERT INTO `books` VALUES (78, 'التوضيح (2)', 12, 2);
INSERT INTO `books` VALUES (80, 'تفسير الجلالين والفوز الكبير', 12, 2);
INSERT INTO `books` VALUES (82, 'اللغة العربية والعروض', 12, 2);
INSERT INTO `books` VALUES (86, 'الترمذي (1)', 16, 2);
INSERT INTO `books` VALUES (90, 'صحيح البخاري (1)', 16, 2);
INSERT INTO `books` VALUES (92, 'سنن أبي داود (1) وموطأ مالك', 16, 2);
INSERT INTO `books` VALUES (94, 'الطحاوي/ ابن ماجہ', 16, 2);
INSERT INTO `books` VALUES (96, 'سنن أبي داود (2) وموطأ محمد', 16, 2);
INSERT INTO `books` VALUES (98, 'التجويد واللغة العربية', 4, 2);
INSERT INTO `books` VALUES (100, 'صحيح مسلم وجامع الترمذي 2', 16, 2);
INSERT INTO `books` VALUES (102, 'تفویض تدریس برائے ثانیہ', 10, 2);
INSERT INTO `books` VALUES (314, 'صرف بہائی', 68, 1);
INSERT INTO `books` VALUES (318, 'نحو میر', 68, 1);
INSERT INTO `books` VALUES (322, 'جمال القرآن', 68, 1);
INSERT INTO `books` VALUES (326, 'طریقہ جدیدہ', 68, 1);
INSERT INTO `books` VALUES (330, 'علم الصيغة', 72, 1);
INSERT INTO `books` VALUES (334, 'علم النحو', 72, 1);
INSERT INTO `books` VALUES (338, 'القدوري الأول', 72, 1);
INSERT INTO `books` VALUES (342, 'خلاصۃ النحو', 72, 1);
INSERT INTO `books` VALUES (346, 'اصول الشاشی', 76, 1);
INSERT INTO `books` VALUES (350, 'شرح مائۃ عامل', 76, 1);
INSERT INTO `books` VALUES (354, 'نور الایضاح', 76, 1);
INSERT INTO `books` VALUES (358, 'نفحۃ الیمن', 76, 1);
INSERT INTO `books` VALUES (362, 'کنز الدقائق', 80, 1);
INSERT INTO `books` VALUES (366, 'شرح جامی', 80, 1);
INSERT INTO `books` VALUES (370, 'تلخیص المفتاح', 80, 1);
INSERT INTO `books` VALUES (374, 'القدوري الثاني', 80, 1);
INSERT INTO `books` VALUES (378, 'ہدایہ اول', 84, 1);
INSERT INTO `books` VALUES (382, 'عقیدۃ الطحاویہ', 84, 1);
INSERT INTO `books` VALUES (386, 'تفسير الجلالين الأول', 84, 1);
INSERT INTO `books` VALUES (390, 'دیوان المتنبي', 84, 1);
INSERT INTO `books` VALUES (394, 'ہدایہ ثالث', 88, 1);
INSERT INTO `books` VALUES (398, 'نور الانوار', 88, 1);
INSERT INTO `books` VALUES (402, 'تفسير الجلالين الثاني', 88, 1);
INSERT INTO `books` VALUES (406, 'مختصر المعاني', 88, 1);
INSERT INTO `books` VALUES (410, 'مشکوۃ المصابیح', 92, 1);
INSERT INTO `books` VALUES (414, 'ہدایہ اخیرین', 92, 1);
INSERT INTO `books` VALUES (418, 'شرح العقائد النسفیہ', 92, 1);
INSERT INTO `books` VALUES (422, 'السراجی فی المیراث', 92, 1);
INSERT INTO `books` VALUES (426, 'صحيح البخاري', 96, 1);
INSERT INTO `books` VALUES (430, 'صحيح مسلم', 96, 1);
INSERT INTO `books` VALUES (434, 'جامع الترمذي', 96, 1);
INSERT INTO `books` VALUES (438, 'سنن أبي داود', 96, 1);
INSERT INTO `books` VALUES (440, 'سنن النسائي', 96, 1);
INSERT INTO `books` VALUES (442, 'سنن ابن ماجہ', 96, 1);

-- ----------------------------
-- Table structure for classes
-- ----------------------------
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_ar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name_en` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tenant_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_classes_tenant`(`tenant_id` ASC) USING BTREE,
  CONSTRAINT `fk_classes_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 65 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of classes
-- ----------------------------
INSERT INTO `classes` VALUES (4, 'الثانية', 'Sania', 2);
INSERT INTO `classes` VALUES (10, 'الخامسة', 'Khamisa', 2);
INSERT INTO `classes` VALUES (12, 'السادسة', 'Sadisa', 2);
INSERT INTO `classes` VALUES (16, 'دورة حديث', 'Daura Hadith', 2);
INSERT INTO `classes` VALUES (34, 'الأولى', 'Aula', 1);
INSERT INTO `classes` VALUES (36, 'الثانية', 'Sania', 1);
INSERT INTO `classes` VALUES (38, 'الثالثة', 'Salisa', 1);
INSERT INTO `classes` VALUES (40, 'الرابعة', 'Rabia', 1);
INSERT INTO `classes` VALUES (42, 'الخامسة', 'Khamisa', 1);
INSERT INTO `classes` VALUES (44, 'السادسة', 'Sadisa', 1);
INSERT INTO `classes` VALUES (46, 'السابعة', 'Sabiya', 1);
INSERT INTO `classes` VALUES (48, 'دورة حديث', 'Daura Hadith', 1);
INSERT INTO `classes` VALUES (50, 'الأولى', 'Aula', 1);
INSERT INTO `classes` VALUES (52, 'الثانية', 'Sania', 1);
INSERT INTO `classes` VALUES (54, 'الثالثة', 'Salisa', 1);
INSERT INTO `classes` VALUES (56, 'الرابعة', 'Rabia', 1);
INSERT INTO `classes` VALUES (58, 'الخامسة', 'Khamisa', 1);
INSERT INTO `classes` VALUES (60, 'السادسة', 'Sadisa', 1);
INSERT INTO `classes` VALUES (62, 'السابعة', 'Sabiya', 1);
INSERT INTO `classes` VALUES (64, 'دورة حديث', 'Daura Hadith', 1);
INSERT INTO `classes` VALUES (68, 'الأولى', 'Aula', 1);
INSERT INTO `classes` VALUES (72, 'الثانية', 'Sania', 1);
INSERT INTO `classes` VALUES (76, 'الثالثة', 'Salisa', 1);
INSERT INTO `classes` VALUES (80, 'الرابعة', 'Rabia', 1);
INSERT INTO `classes` VALUES (84, 'الخامسة', 'Khamisa', 1);
INSERT INTO `classes` VALUES (88, 'السادسة', 'Sadisa', 1);
INSERT INTO `classes` VALUES (92, 'السابعة', 'Sabiya', 1);
INSERT INTO `classes` VALUES (96, 'دورة حديث', 'Daura Hadith', 1);

-- ----------------------------
-- Table structure for exam_papers
-- ----------------------------
DROP TABLE IF EXISTS `exam_papers`;
CREATE TABLE `exam_papers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `exam_id` int NULL DEFAULT NULL,
  `class_id` int NULL DEFAULT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `teacher_id` int NULL DEFAULT NULL,
  `status` enum('assigned','draft','submitted','approved','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'assigned',
  `max_marks` int NULL DEFAULT 100,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tenant_id` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `exam_id`(`exam_id` ASC) USING BTREE,
  INDEX `class_id`(`class_id` ASC) USING BTREE,
  INDEX `teacher_id`(`teacher_id` ASC) USING BTREE,
  INDEX `exam_papers_tenant_fk`(`tenant_id` ASC) USING BTREE,
  CONSTRAINT `exam_papers_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `exam_papers_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `exam_papers_ibfk_3` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `exam_papers_tenant_fk` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exam_papers
-- ----------------------------
INSERT INTO `exam_papers` VALUES (4, 4, 98, 'صرف بہائی', 1370, 'approved', 100, '2026-07-16 04:56:02', 1);
INSERT INTO `exam_papers` VALUES (6, 6, 114, 'صرف بہائی', 1376, 'approved', 100, '2026-07-16 04:56:02', 1);
INSERT INTO `exam_papers` VALUES (8, 4, 100, 'علم الصيغة', 1378, 'approved', 100, '2026-07-16 04:56:02', 1);
INSERT INTO `exam_papers` VALUES (10, 6, 116, 'علم الصيغة', 1388, 'approved', 100, '2026-07-16 04:56:02', 1);
INSERT INTO `exam_papers` VALUES (12, 4, 102, 'اصول الشاشی', 1390, 'approved', 100, '2026-07-16 04:56:02', 1);
INSERT INTO `exam_papers` VALUES (14, 6, 118, 'اصول الشاشی', 1400, 'approved', 100, '2026-07-16 04:56:02', 1);
INSERT INTO `exam_papers` VALUES (16, 4, 104, 'کنز الدقائق', 1402, 'approved', 100, '2026-07-16 04:56:02', 1);
INSERT INTO `exam_papers` VALUES (18, 6, 120, 'کنز الدقائق', 1410, 'approved', 100, '2026-07-16 04:56:03', 1);
INSERT INTO `exam_papers` VALUES (20, 4, 106, 'ہدایہ اول', 1374, 'approved', 100, '2026-07-16 04:56:03', 1);
INSERT INTO `exam_papers` VALUES (22, 6, 122, 'ہدایہ اول', 1384, 'approved', 100, '2026-07-16 04:56:03', 1);
INSERT INTO `exam_papers` VALUES (24, 4, 108, 'ہدایہ ثالث', 1386, 'approved', 100, '2026-07-16 04:56:03', 1);
INSERT INTO `exam_papers` VALUES (26, 6, 124, 'ہدایہ ثالث', 1396, 'approved', 100, '2026-07-16 04:56:03', 1);
INSERT INTO `exam_papers` VALUES (28, 4, 110, 'مشکوۃ المصابیح', 1398, 'approved', 100, '2026-07-16 04:56:03', 1);
INSERT INTO `exam_papers` VALUES (30, 6, 126, 'مشکوۃ المصابیح', 1408, 'approved', 100, '2026-07-16 04:56:03', 1);
INSERT INTO `exam_papers` VALUES (32, 4, 112, 'صحيح البخاري', 1372, 'approved', 100, '2026-07-16 04:56:03', 1);
INSERT INTO `exam_papers` VALUES (34, 6, 128, 'صحيح البخاري', 1380, 'approved', 100, '2026-07-16 04:56:03', 1);
INSERT INTO `exam_papers` VALUES (36, 2, 114, 'صرف بہائی', 1376, 'assigned', 100, '2026-07-16 09:58:26', 1);

-- ----------------------------
-- Table structure for exams
-- ----------------------------
DROP TABLE IF EXISTS `exams`;
CREATE TABLE `exams`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('draft','published','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'draft',
  `created_by` int NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tenant_id` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `created_by`(`created_by` ASC) USING BTREE,
  INDEX `exams_tenant_fk`(`tenant_id` ASC) USING BTREE,
  CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `exams_tenant_fk` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exams
-- ----------------------------
INSERT INTO `exams` VALUES (2, 'امتحان ششماہی 2026', 'published', NULL, '2026-07-16 04:52:49', 1);
INSERT INTO `exams` VALUES (4, 'امتحان ششماہی 2026', 'published', 1364, '2026-07-16 04:56:02', 1);
INSERT INTO `exams` VALUES (6, 'امتحان ششماہی 2026', 'published', 1364, '2026-07-16 04:56:02', 1);

-- ----------------------------
-- Table structure for master_admins
-- ----------------------------
DROP TABLE IF EXISTS `master_admins`;
CREATE TABLE `master_admins`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of master_admins
-- ----------------------------
INSERT INTO `master_admins` VALUES (2, 'superadmin', '$2b$10$lwh1NoTqlIGAVGdPqYPsNOk3wzkJt11Oj63I1Oe7P6OA9MNkGNSBO', 'admin@mms.nukrim.com', '2026-06-14 13:40:56');

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
  `tenant_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `teacher_id`(`teacher_id` ASC) USING BTREE,
  INDEX `class_id`(`class_id` ASC) USING BTREE,
  INDEX `assignment_id`(`assignment_id` ASC) USING BTREE,
  INDEX `fk_periods_session`(`session_id` ASC) USING BTREE,
  INDEX `fk_periods_tenant`(`tenant_id` ASC) USING BTREE,
  CONSTRAINT `fk_periods_session` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_periods_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `periods_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `periods_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `periods_ibfk_3` FOREIGN KEY (`assignment_id`) REFERENCES `teacher_books` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2659 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of periods
-- ----------------------------
INSERT INTO `periods` VALUES (990, 286, 4, 'Monday', '18:00:00', '18:40:00', 'تفسير عم', NULL, 1, 2, 2);
INSERT INTO `periods` VALUES (994, 302, 4, 'Monday', '19:40:00', '20:20:00', 'هداية النحو', 58, 3, 2, 2);
INSERT INTO `periods` VALUES (996, 290, 4, 'Monday', '20:20:00', '21:00:00', 'القدوري الأول', 60, 4, 2, 2);
INSERT INTO `periods` VALUES (998, 286, 4, 'Tuesday', '18:00:00', '18:40:00', 'تفسير عم', NULL, 1, 2, 2);
INSERT INTO `periods` VALUES (1002, 290, 4, 'Tuesday', '19:40:00', '20:20:00', 'القدوري الأول', 60, 3, 2, 2);
INSERT INTO `periods` VALUES (1004, 290, 4, 'Tuesday', '20:20:00', '21:00:00', 'القدوري الأول', 60, 4, 2, 2);
INSERT INTO `periods` VALUES (1006, 286, 4, 'Wednesday', '18:00:00', '18:40:00', 'تفسير عم', NULL, 1, 2, 2);
INSERT INTO `periods` VALUES (1008, 302, 4, 'Wednesday', '18:40:00', '19:20:00', 'هداية النحو', 58, 2, 2, 2);
INSERT INTO `periods` VALUES (1010, 290, 4, 'Wednesday', '19:40:00', '20:20:00', 'القدوري الأول', 60, 3, 2, 2);
INSERT INTO `periods` VALUES (1012, 298, 4, 'Wednesday', '20:20:00', '21:00:00', 'علم الصيغة', NULL, 4, 2, 2);
INSERT INTO `periods` VALUES (1014, 302, 4, 'Thursday', '18:00:00', '18:40:00', 'هداية النحو', 58, 1, 2, 2);
INSERT INTO `periods` VALUES (1018, 286, 4, 'Thursday', '19:40:00', '20:20:00', 'الأدب والحديث', 56, 3, 2, 2);
INSERT INTO `periods` VALUES (1020, 298, 4, 'Thursday', '20:20:00', '21:00:00', 'علم الصيغة', NULL, 4, 2, 2);
INSERT INTO `periods` VALUES (1024, 286, 4, 'Friday', '18:40:00', '19:20:00', 'الأدب والحديث', 56, 2, 2, 2);
INSERT INTO `periods` VALUES (1026, 298, 4, 'Friday', '19:40:00', '20:20:00', 'علم الصيغة', NULL, 3, 2, 2);
INSERT INTO `periods` VALUES (1028, 298, 4, 'Friday', '20:20:00', '21:00:00', 'علم الصيغة', NULL, 4, 2, 2);
INSERT INTO `periods` VALUES (1030, 292, 10, 'Monday', '18:00:00', '18:40:00', 'شرح العقيدة الطحاوية', 66, 1, 2, 2);
INSERT INTO `periods` VALUES (1032, 288, 10, 'Monday', '18:40:00', '19:20:00', 'نورالانوار (قیاس)', 16, 2, 2, 2);
INSERT INTO `periods` VALUES (1034, 294, 10, 'Monday', '20:20:00', '21:00:00', 'الهداية ( الجزء الأول)', 68, 4, 2, 2);
INSERT INTO `periods` VALUES (1038, 292, 10, 'Tuesday', '18:00:00', '18:40:00', 'شرح العقيدة الطحاوية', 66, 1, 2, 2);
INSERT INTO `periods` VALUES (1040, 294, 10, 'Tuesday', '18:40:00', '19:20:00', 'الهداية ( الجزء الأول)', 68, 2, 2, 2);
INSERT INTO `periods` VALUES (1048, 288, 10, 'Wednesday', '18:00:00', '18:40:00', 'نورالانوار (قیاس)', 16, 1, 2, 2);
INSERT INTO `periods` VALUES (1050, 282, 10, 'Wednesday', '19:40:00', '20:20:00', 'معين الفلسفة والانتباهات', 76, 3, 2, 2);
INSERT INTO `periods` VALUES (1054, 286, 10, 'Wednesday', '21:00:00', '21:40:00', 'التفسير(10-1)', 78, 5, 2, 2);
INSERT INTO `periods` VALUES (1056, 290, 10, 'Thursday', '18:40:00', '19:20:00', 'مختصر المعاني', 74, 2, 2, 2);
INSERT INTO `periods` VALUES (1058, 282, 10, 'Thursday', '19:40:00', '20:20:00', 'معين الفلسفة والانتباهات', 76, 3, 2, 2);
INSERT INTO `periods` VALUES (1060, 294, 10, 'Thursday', '20:20:00', '21:00:00', 'الهداية ( الجزء الأول)', 68, 4, 2, 2);
INSERT INTO `periods` VALUES (1062, 288, 10, 'Thursday', '21:00:00', '21:40:00', 'نورالانوار (قیاس)', 16, 5, 2, 2);
INSERT INTO `periods` VALUES (1064, 288, 10, 'Friday', '18:00:00', '18:40:00', 'نورالانوار (قیاس)', 16, 1, 2, 2);
INSERT INTO `periods` VALUES (1066, 290, 10, 'Friday', '18:40:00', '19:20:00', 'مختصر المعاني', 74, 2, 2, 2);
INSERT INTO `periods` VALUES (1068, 286, 10, 'Friday', '19:40:00', '20:20:00', 'التفسير(10-1)', 78, 3, 2, 2);
INSERT INTO `periods` VALUES (1070, 294, 10, 'Friday', '20:20:00', '21:00:00', 'الهداية ( الجزء الأول)', 68, 4, 2, 2);
INSERT INTO `periods` VALUES (1072, 288, 10, 'Friday', '21:00:00', '21:40:00', 'نورالانوار (قیاس)', 16, 5, 2, 2);
INSERT INTO `periods` VALUES (1076, 296, 12, 'Monday', '18:40:00', '19:20:00', 'التوضيح (2)', 110, 2, 2, 2);
INSERT INTO `periods` VALUES (1078, 294, 12, 'Monday', '19:40:00', '20:20:00', 'كتاب الآثار وخير الأصول', 84, 3, 2, 2);
INSERT INTO `periods` VALUES (1080, 284, 12, 'Monday', '20:20:00', '21:00:00', 'السراجي والفلکیات', 86, 4, 2, 2);
INSERT INTO `periods` VALUES (1084, 284, 12, 'Tuesday', '21:00:00', '21:40:00', 'الهداية (الجزء الثاني)', 80, 5, 2, 2);
INSERT INTO `periods` VALUES (1086, 296, 12, 'Tuesday', '18:40:00', '19:20:00', 'التوضيح (2)', 110, 2, 2, 2);
INSERT INTO `periods` VALUES (1088, 288, 12, 'Tuesday', '18:00:00', '18:40:00', 'تفسير الجلالين والفوز الكبير', 90, 1, 2, 2);
INSERT INTO `periods` VALUES (1090, 284, 12, 'Tuesday', '20:20:00', '21:00:00', 'السراجي والفلکیات', 86, 4, 2, 2);
INSERT INTO `periods` VALUES (1092, 288, 12, 'Tuesday', '19:40:00', '20:20:00', 'تفسير الجلالين والفوز الكبير', 90, 3, 2, 2);
INSERT INTO `periods` VALUES (1094, 290, 12, 'Wednesday', '18:00:00', '18:40:00', 'اللغة العربية والعروض', 92, 1, 2, 2);
INSERT INTO `periods` VALUES (1096, 296, 12, 'Wednesday', '18:40:00', '19:20:00', 'التوضيح (2)', 110, 2, 2, 2);
INSERT INTO `periods` VALUES (1098, 294, 12, 'Wednesday', '19:40:00', '20:20:00', 'كتاب الآثار وخير الأصول', 84, 3, 2, 2);
INSERT INTO `periods` VALUES (1100, 288, 12, 'Wednesday', '20:20:00', '21:00:00', 'تفسير الجلالين والفوز الكبير', 90, 4, 2, 2);
INSERT INTO `periods` VALUES (1102, 282, 12, 'Wednesday', '21:00:00', '21:40:00', 'التوضيح (1)', 88, 5, 2, 2);
INSERT INTO `periods` VALUES (1104, 292, 12, 'Thursday', '18:00:00', '18:40:00', 'شرح العقائد', 26, 1, 2, 2);
INSERT INTO `periods` VALUES (1106, 282, 12, 'Thursday', '18:40:00', '19:20:00', 'التوضيح (1)', 88, 2, 2, 2);
INSERT INTO `periods` VALUES (1108, 292, 12, 'Thursday', '19:40:00', '20:20:00', 'شرح العقائد', 26, 3, 2, 2);
INSERT INTO `periods` VALUES (1110, 282, 12, 'Thursday', '20:20:00', '21:00:00', 'التوضيح (1)', 88, 4, 2, 2);
INSERT INTO `periods` VALUES (1112, 290, 12, 'Thursday', '21:00:00', '21:40:00', 'اللغة العربية والعروض', 92, 5, 2, 2);
INSERT INTO `periods` VALUES (1114, 290, 12, 'Friday', '18:00:00', '18:40:00', 'اللغة العربية والعروض', 92, 1, 2, 2);
INSERT INTO `periods` VALUES (1116, 292, 12, 'Friday', '18:40:00', '19:20:00', 'شرح العقائد', 26, 2, 2, 2);
INSERT INTO `periods` VALUES (1118, 294, 12, 'Friday', '19:40:00', '20:20:00', 'كتاب الآثار وخير الأصول', 84, 3, 2, 2);
INSERT INTO `periods` VALUES (1120, 292, 12, 'Friday', '20:20:00', '21:00:00', 'شرح العقائد', 26, 4, 2, 2);
INSERT INTO `periods` VALUES (1122, 284, 12, 'Friday', '21:00:00', '21:40:00', 'الهداية (الجزء الثاني)', 80, 5, 2, 2);
INSERT INTO `periods` VALUES (1124, 296, 16, 'Monday', '18:00:00', '18:40:00', 'صحيح مسلم وجامع الترمذي 2', NULL, 1, 2, 2);
INSERT INTO `periods` VALUES (1126, 294, 16, 'Monday', '18:40:00', '19:20:00', 'الترمذي (1)', 96, 2, 2, 2);
INSERT INTO `periods` VALUES (1128, 290, 16, 'Monday', '19:40:00', '20:20:00', 'سنن النسائي', 98, 3, 2, 2);
INSERT INTO `periods` VALUES (1130, 292, 16, 'Monday', '20:20:00', '21:00:00', 'صحيح البخاري (1)', 100, 4, 2, 2);
INSERT INTO `periods` VALUES (1132, 300, 16, 'Monday', '21:00:00', '21:40:00', 'شمائل الترمذي', 42, 5, 2, 2);
INSERT INTO `periods` VALUES (1134, 296, 16, 'Tuesday', '18:00:00', '18:40:00', 'صحيح مسلم وجامع الترمذي 2', NULL, 1, 2, 2);
INSERT INTO `periods` VALUES (1136, 290, 16, 'Tuesday', '18:40:00', '19:20:00', 'سنن النسائي', 98, 2, 2, 2);
INSERT INTO `periods` VALUES (1138, 294, 16, 'Tuesday', '19:40:00', '20:20:00', 'الترمذي (1)', 96, 3, 2, 2);
INSERT INTO `periods` VALUES (1140, 292, 16, 'Tuesday', '20:20:00', '21:00:00', 'صحيح البخاري (1)', 100, 4, 2, 2);
INSERT INTO `periods` VALUES (1142, 300, 16, 'Tuesday', '21:00:00', '21:40:00', 'شمائل الترمذي', 42, 5, 2, 2);
INSERT INTO `periods` VALUES (1144, 296, 16, 'Wednesday', '18:00:00', '18:40:00', 'صحيح مسلم وجامع الترمذي 2', NULL, 1, 2, 2);
INSERT INTO `periods` VALUES (1146, 294, 16, 'Wednesday', '18:40:00', '19:20:00', 'الترمذي (1)', 96, 2, 2, 2);
INSERT INTO `periods` VALUES (1148, 284, 16, 'Wednesday', '19:40:00', '20:20:00', 'سنن أبي داود (1) وموطأ مالك', 102, 3, 2, 2);
INSERT INTO `periods` VALUES (1150, 292, 16, 'Wednesday', '20:20:00', '21:00:00', 'صحيح البخاري (1)', 100, 4, 2, 2);
INSERT INTO `periods` VALUES (1152, 290, 16, 'Wednesday', '21:00:00', '21:40:00', 'سنن النسائي', 98, 5, 2, 2);
INSERT INTO `periods` VALUES (1154, 288, 16, 'Thursday', '18:00:00', '18:40:00', 'الطحاوي/ ابن ماجہ', 104, 1, 2, 2);
INSERT INTO `periods` VALUES (1156, 288, 16, 'Thursday', '18:40:00', '19:20:00', 'الطحاوي/ ابن ماجہ', 104, 2, 2, 2);
INSERT INTO `periods` VALUES (1158, 284, 16, 'Thursday', '19:40:00', '20:20:00', 'سنن أبي داود (1) وموطأ مالك', 102, 3, 2, 2);
INSERT INTO `periods` VALUES (1160, 292, 16, 'Thursday', '20:20:00', '21:00:00', 'صحيح البخاري (1)', 100, 4, 2, 2);
INSERT INTO `periods` VALUES (1162, 298, 16, 'Thursday', '21:00:00', '21:40:00', 'سنن أبي داود (2) وموطأ محمد', 106, 5, 2, 2);
INSERT INTO `periods` VALUES (1164, 294, 16, 'Friday', '18:00:00', '18:40:00', 'الترمذي (1)', 96, 1, 2, 2);
INSERT INTO `periods` VALUES (1166, 288, 16, 'Friday', '18:40:00', '19:20:00', 'الطحاوي/ ابن ماجہ', 104, 2, 2, 2);
INSERT INTO `periods` VALUES (1168, 284, 16, 'Friday', '19:40:00', '20:20:00', 'سنن أبي داود (1) وموطأ مالك', 102, 3, 2, 2);
INSERT INTO `periods` VALUES (1170, 284, 16, 'Friday', '20:20:00', '21:00:00', 'سنن أبي داود (1) وموطأ مالك', 102, 4, 2, 2);
INSERT INTO `periods` VALUES (1172, 298, 16, 'Friday', '21:00:00', '21:40:00', 'سنن أبي داود (2) وموطأ محمد', 106, 5, 2, 2);
INSERT INTO `periods` VALUES (1174, 292, 16, 'Saturday', '18:40:00', '19:20:00', 'صحيح البخاري (1)', 100, 2, 2, 2);
INSERT INTO `periods` VALUES (1176, 288, 16, 'Saturday', '19:40:00', '20:20:00', 'الطحاوي/ ابن ماجہ', 104, 3, 2, 2);
INSERT INTO `periods` VALUES (1180, 298, 16, 'Saturday', '20:20:00', '21:00:00', 'سنن أبي داود (2) وموطأ محمد', 106, 4, 2, 2);
INSERT INTO `periods` VALUES (1182, 298, 16, 'Saturday', '21:00:00', '21:40:00', 'سنن أبي داود (2) وموطأ محمد', 106, 5, 2, 2);
INSERT INTO `periods` VALUES (1184, 282, 12, 'Monday', '18:00:00', '18:40:00', 'التوضيح (1)', 88, 1, NULL, 2);
INSERT INTO `periods` VALUES (1186, 284, 12, 'Monday', '21:00:00', '21:40:00', 'الهداية (الجزء الثاني)', 80, 5, NULL, 2);
INSERT INTO `periods` VALUES (1188, 282, 16, 'Saturday', '18:00:00', '18:40:00', 'صحيح البخاري  (2)', 114, 1, NULL, 2);
INSERT INTO `periods` VALUES (1190, 284, 4, 'Monday', '18:40:00', '19:20:00', 'التجويد واللغة العربية', 124, 2, NULL, 2);
INSERT INTO `periods` VALUES (1196, 286, 10, 'Tuesday', '19:40:00', '20:20:00', 'ديوان المتنبي والمعلقات', 70, 3, NULL, 2);
INSERT INTO `periods` VALUES (1202, 292, 4, 'Tuesday', '18:40:00', '19:20:00', 'المنطق', 136, 2, NULL, 2);
INSERT INTO `periods` VALUES (1204, 292, 4, 'Thursday', '18:40:00', '19:20:00', 'المنطق', 136, 2, NULL, 2);
INSERT INTO `periods` VALUES (1206, 292, 4, 'Friday', '18:00:00', '18:40:00', 'المنطق', 136, 1, NULL, 2);
INSERT INTO `periods` VALUES (1214, 290, 10, 'Monday', '21:00:00', '21:40:00', 'آثار السنن وحفظ الحديث', 72, 5, NULL, 2);
INSERT INTO `periods` VALUES (1216, 290, 10, 'Tuesday', '21:00:00', '21:40:00', 'آثار السنن وحفظ الحديث', 72, 5, NULL, 2);
INSERT INTO `periods` VALUES (1218, 290, 10, 'Wednesday', '20:20:00', '21:00:00', 'آثار السنن وحفظ الحديث', 72, 4, NULL, 2);
INSERT INTO `periods` VALUES (1700, 326, 34, 'Saturday', '08:00:00', '08:45:00', 'نحو میر', 212, 1, 6, 1);
INSERT INTO `periods` VALUES (1702, 328, 34, 'Saturday', '08:45:00', '09:30:00', 'جمال القرآن', 214, 2, 6, 1);
INSERT INTO `periods` VALUES (1704, 330, 34, 'Saturday', '09:45:00', '10:30:00', 'طریقہ جدیدہ', 216, 3, 6, 1);
INSERT INTO `periods` VALUES (1706, 324, 34, 'Saturday', '10:30:00', '11:15:00', 'صرف بہائی', 210, 4, 6, 1);
INSERT INTO `periods` VALUES (1708, 326, 34, 'Saturday', '11:15:00', '12:00:00', 'نحو میر', 212, 5, 6, 1);
INSERT INTO `periods` VALUES (1710, 330, 34, 'Monday', '08:00:00', '08:45:00', 'طریقہ جدیدہ', 216, 1, 6, 1);
INSERT INTO `periods` VALUES (1712, 324, 34, 'Monday', '08:45:00', '09:30:00', 'صرف بہائی', 210, 2, 6, 1);
INSERT INTO `periods` VALUES (1714, 326, 34, 'Monday', '09:45:00', '10:30:00', 'نحو میر', 212, 3, 6, 1);
INSERT INTO `periods` VALUES (1716, 328, 34, 'Monday', '10:30:00', '11:15:00', 'جمال القرآن', 214, 4, 6, 1);
INSERT INTO `periods` VALUES (1718, 330, 34, 'Monday', '11:15:00', '12:00:00', 'طریقہ جدیدہ', 216, 5, 6, 1);
INSERT INTO `periods` VALUES (1720, 324, 34, 'Tuesday', '08:00:00', '08:45:00', 'صرف بہائی', 210, 1, 6, 1);
INSERT INTO `periods` VALUES (1722, 326, 34, 'Tuesday', '08:45:00', '09:30:00', 'نحو میر', 212, 2, 6, 1);
INSERT INTO `periods` VALUES (1724, 328, 34, 'Tuesday', '09:45:00', '10:30:00', 'جمال القرآن', 214, 3, 6, 1);
INSERT INTO `periods` VALUES (1726, 330, 34, 'Tuesday', '10:30:00', '11:15:00', 'طریقہ جدیدہ', 216, 4, 6, 1);
INSERT INTO `periods` VALUES (1728, 324, 34, 'Tuesday', '11:15:00', '12:00:00', 'صرف بہائی', 210, 5, 6, 1);
INSERT INTO `periods` VALUES (1730, 328, 34, 'Wednesday', '08:00:00', '08:45:00', 'جمال القرآن', 214, 1, 6, 1);
INSERT INTO `periods` VALUES (1732, 330, 34, 'Wednesday', '08:45:00', '09:30:00', 'طریقہ جدیدہ', 216, 2, 6, 1);
INSERT INTO `periods` VALUES (1734, 324, 34, 'Wednesday', '09:45:00', '10:30:00', 'صرف بہائی', 210, 3, 6, 1);
INSERT INTO `periods` VALUES (1736, 326, 34, 'Wednesday', '10:30:00', '11:15:00', 'نحو میر', 212, 4, 6, 1);
INSERT INTO `periods` VALUES (1738, 328, 34, 'Wednesday', '11:15:00', '12:00:00', 'جمال القرآن', 214, 5, 6, 1);
INSERT INTO `periods` VALUES (1740, 326, 34, 'Thursday', '08:00:00', '08:45:00', 'نحو میر', 212, 1, 6, 1);
INSERT INTO `periods` VALUES (1742, 328, 34, 'Thursday', '08:45:00', '09:30:00', 'جمال القرآن', 214, 2, 6, 1);
INSERT INTO `periods` VALUES (1744, 330, 34, 'Thursday', '09:45:00', '10:30:00', 'طریقہ جدیدہ', 216, 3, 6, 1);
INSERT INTO `periods` VALUES (1746, 324, 34, 'Thursday', '10:30:00', '11:15:00', 'صرف بہائی', 210, 4, 6, 1);
INSERT INTO `periods` VALUES (1748, 326, 34, 'Thursday', '11:15:00', '12:00:00', 'نحو میر', 212, 5, 6, 1);
INSERT INTO `periods` VALUES (1750, 330, 34, 'Friday', '08:00:00', '08:45:00', 'طریقہ جدیدہ', 216, 1, 6, 1);
INSERT INTO `periods` VALUES (1752, 324, 34, 'Friday', '08:45:00', '09:30:00', 'صرف بہائی', 210, 2, 6, 1);
INSERT INTO `periods` VALUES (1754, 326, 34, 'Friday', '09:45:00', '10:30:00', 'نحو میر', 212, 3, 6, 1);
INSERT INTO `periods` VALUES (1756, 328, 34, 'Friday', '10:30:00', '11:15:00', 'جمال القرآن', 214, 4, 6, 1);
INSERT INTO `periods` VALUES (1758, 330, 34, 'Friday', '11:15:00', '12:00:00', 'طریقہ جدیدہ', 216, 5, 6, 1);
INSERT INTO `periods` VALUES (1760, 332, 36, 'Saturday', '08:00:00', '08:45:00', 'علم النحو', 220, 1, 6, 1);
INSERT INTO `periods` VALUES (1762, 334, 36, 'Saturday', '08:45:00', '09:30:00', 'القدوري الأول', 222, 2, 6, 1);
INSERT INTO `periods` VALUES (1764, 336, 36, 'Saturday', '09:45:00', '10:30:00', 'خلاصۃ النحو', 224, 3, 6, 1);
INSERT INTO `periods` VALUES (1766, 330, 36, 'Saturday', '10:30:00', '11:15:00', 'علم الصيغة', 218, 4, 6, 1);
INSERT INTO `periods` VALUES (1768, 332, 36, 'Saturday', '11:15:00', '12:00:00', 'علم النحو', 220, 5, 6, 1);
INSERT INTO `periods` VALUES (1770, 336, 36, 'Monday', '08:00:00', '08:45:00', 'خلاصۃ النحو', 224, 1, 6, 1);
INSERT INTO `periods` VALUES (1772, 330, 36, 'Monday', '08:45:00', '09:30:00', 'علم الصيغة', 218, 2, 6, 1);
INSERT INTO `periods` VALUES (1774, 332, 36, 'Monday', '09:45:00', '10:30:00', 'علم النحو', 220, 3, 6, 1);
INSERT INTO `periods` VALUES (1776, 334, 36, 'Monday', '10:30:00', '11:15:00', 'القدوري الأول', 222, 4, 6, 1);
INSERT INTO `periods` VALUES (1778, 336, 36, 'Monday', '11:15:00', '12:00:00', 'خلاصۃ النحو', 224, 5, 6, 1);
INSERT INTO `periods` VALUES (1780, 330, 36, 'Tuesday', '08:00:00', '08:45:00', 'علم الصيغة', 218, 1, 6, 1);
INSERT INTO `periods` VALUES (1782, 332, 36, 'Tuesday', '08:45:00', '09:30:00', 'علم النحو', 220, 2, 6, 1);
INSERT INTO `periods` VALUES (1784, 334, 36, 'Tuesday', '09:45:00', '10:30:00', 'القدوري الأول', 222, 3, 6, 1);
INSERT INTO `periods` VALUES (1786, 336, 36, 'Tuesday', '10:30:00', '11:15:00', 'خلاصۃ النحو', 224, 4, 6, 1);
INSERT INTO `periods` VALUES (1788, 330, 36, 'Tuesday', '11:15:00', '12:00:00', 'علم الصيغة', 218, 5, 6, 1);
INSERT INTO `periods` VALUES (1790, 334, 36, 'Wednesday', '08:00:00', '08:45:00', 'القدوري الأول', 222, 1, 6, 1);
INSERT INTO `periods` VALUES (1792, 336, 36, 'Wednesday', '08:45:00', '09:30:00', 'خلاصۃ النحو', 224, 2, 6, 1);
INSERT INTO `periods` VALUES (1794, 330, 36, 'Wednesday', '09:45:00', '10:30:00', 'علم الصيغة', 218, 3, 6, 1);
INSERT INTO `periods` VALUES (1796, 332, 36, 'Wednesday', '10:30:00', '11:15:00', 'علم النحو', 220, 4, 6, 1);
INSERT INTO `periods` VALUES (1798, 334, 36, 'Wednesday', '11:15:00', '12:00:00', 'القدوري الأول', 222, 5, 6, 1);
INSERT INTO `periods` VALUES (1800, 332, 36, 'Thursday', '08:00:00', '08:45:00', 'علم النحو', 220, 1, 6, 1);
INSERT INTO `periods` VALUES (1802, 334, 36, 'Thursday', '08:45:00', '09:30:00', 'القدوري الأول', 222, 2, 6, 1);
INSERT INTO `periods` VALUES (1804, 336, 36, 'Thursday', '09:45:00', '10:30:00', 'خلاصۃ النحو', 224, 3, 6, 1);
INSERT INTO `periods` VALUES (1806, 330, 36, 'Thursday', '10:30:00', '11:15:00', 'علم الصيغة', 218, 4, 6, 1);
INSERT INTO `periods` VALUES (1808, 332, 36, 'Thursday', '11:15:00', '12:00:00', 'علم النحو', 220, 5, 6, 1);
INSERT INTO `periods` VALUES (1810, 336, 36, 'Friday', '08:00:00', '08:45:00', 'خلاصۃ النحو', 224, 1, 6, 1);
INSERT INTO `periods` VALUES (1812, 330, 36, 'Friday', '08:45:00', '09:30:00', 'علم الصيغة', 218, 2, 6, 1);
INSERT INTO `periods` VALUES (1814, 332, 36, 'Friday', '09:45:00', '10:30:00', 'علم النحو', 220, 3, 6, 1);
INSERT INTO `periods` VALUES (1816, 334, 36, 'Friday', '10:30:00', '11:15:00', 'القدوري الأول', 222, 4, 6, 1);
INSERT INTO `periods` VALUES (1818, 336, 36, 'Friday', '11:15:00', '12:00:00', 'خلاصۃ النحو', 224, 5, 6, 1);
INSERT INTO `periods` VALUES (1820, 338, 38, 'Saturday', '08:00:00', '08:45:00', 'شرح مائۃ عامل', 228, 1, 6, 1);
INSERT INTO `periods` VALUES (1822, 340, 38, 'Saturday', '08:45:00', '09:30:00', 'نور الایضاح', 230, 2, 6, 1);
INSERT INTO `periods` VALUES (1824, 342, 38, 'Saturday', '09:45:00', '10:30:00', 'نفحۃ الیمن', 232, 3, 6, 1);
INSERT INTO `periods` VALUES (1826, 336, 38, 'Saturday', '10:30:00', '11:15:00', 'اصول الشاشی', 226, 4, 6, 1);
INSERT INTO `periods` VALUES (1828, 338, 38, 'Saturday', '11:15:00', '12:00:00', 'شرح مائۃ عامل', 228, 5, 6, 1);
INSERT INTO `periods` VALUES (1830, 342, 38, 'Monday', '08:00:00', '08:45:00', 'نفحۃ الیمن', 232, 1, 6, 1);
INSERT INTO `periods` VALUES (1832, 336, 38, 'Monday', '08:45:00', '09:30:00', 'اصول الشاشی', 226, 2, 6, 1);
INSERT INTO `periods` VALUES (1834, 338, 38, 'Monday', '09:45:00', '10:30:00', 'شرح مائۃ عامل', 228, 3, 6, 1);
INSERT INTO `periods` VALUES (1836, 340, 38, 'Monday', '10:30:00', '11:15:00', 'نور الایضاح', 230, 4, 6, 1);
INSERT INTO `periods` VALUES (1838, 342, 38, 'Monday', '11:15:00', '12:00:00', 'نفحۃ الیمن', 232, 5, 6, 1);
INSERT INTO `periods` VALUES (1840, 336, 38, 'Tuesday', '08:00:00', '08:45:00', 'اصول الشاشی', 226, 1, 6, 1);
INSERT INTO `periods` VALUES (1842, 338, 38, 'Tuesday', '08:45:00', '09:30:00', 'شرح مائۃ عامل', 228, 2, 6, 1);
INSERT INTO `periods` VALUES (1844, 340, 38, 'Tuesday', '09:45:00', '10:30:00', 'نور الایضاح', 230, 3, 6, 1);
INSERT INTO `periods` VALUES (1846, 342, 38, 'Tuesday', '10:30:00', '11:15:00', 'نفحۃ الیمن', 232, 4, 6, 1);
INSERT INTO `periods` VALUES (1848, 336, 38, 'Tuesday', '11:15:00', '12:00:00', 'اصول الشاشی', 226, 5, 6, 1);
INSERT INTO `periods` VALUES (1850, 340, 38, 'Wednesday', '08:00:00', '08:45:00', 'نور الایضاح', 230, 1, 6, 1);
INSERT INTO `periods` VALUES (1852, 342, 38, 'Wednesday', '08:45:00', '09:30:00', 'نفحۃ الیمن', 232, 2, 6, 1);
INSERT INTO `periods` VALUES (1854, 336, 38, 'Wednesday', '09:45:00', '10:30:00', 'اصول الشاشی', 226, 3, 6, 1);
INSERT INTO `periods` VALUES (1856, 338, 38, 'Wednesday', '10:30:00', '11:15:00', 'شرح مائۃ عامل', 228, 4, 6, 1);
INSERT INTO `periods` VALUES (1858, 340, 38, 'Wednesday', '11:15:00', '12:00:00', 'نور الایضاح', 230, 5, 6, 1);
INSERT INTO `periods` VALUES (1860, 338, 38, 'Thursday', '08:00:00', '08:45:00', 'شرح مائۃ عامل', 228, 1, 6, 1);
INSERT INTO `periods` VALUES (1862, 340, 38, 'Thursday', '08:45:00', '09:30:00', 'نور الایضاح', 230, 2, 6, 1);
INSERT INTO `periods` VALUES (1864, 342, 38, 'Thursday', '09:45:00', '10:30:00', 'نفحۃ الیمن', 232, 3, 6, 1);
INSERT INTO `periods` VALUES (1866, 336, 38, 'Thursday', '10:30:00', '11:15:00', 'اصول الشاشی', 226, 4, 6, 1);
INSERT INTO `periods` VALUES (1868, 338, 38, 'Thursday', '11:15:00', '12:00:00', 'شرح مائۃ عامل', 228, 5, 6, 1);
INSERT INTO `periods` VALUES (1870, 342, 38, 'Friday', '08:00:00', '08:45:00', 'نفحۃ الیمن', 232, 1, 6, 1);
INSERT INTO `periods` VALUES (1872, 336, 38, 'Friday', '08:45:00', '09:30:00', 'اصول الشاشی', 226, 2, 6, 1);
INSERT INTO `periods` VALUES (1874, 338, 38, 'Friday', '09:45:00', '10:30:00', 'شرح مائۃ عامل', 228, 3, 6, 1);
INSERT INTO `periods` VALUES (1876, 340, 38, 'Friday', '10:30:00', '11:15:00', 'نور الایضاح', 230, 4, 6, 1);
INSERT INTO `periods` VALUES (1878, 342, 38, 'Friday', '11:15:00', '12:00:00', 'نفحۃ الیمن', 232, 5, 6, 1);
INSERT INTO `periods` VALUES (1880, 324, 40, 'Saturday', '08:00:00', '08:45:00', 'شرح جامی', 236, 1, 6, 1);
INSERT INTO `periods` VALUES (1882, 326, 40, 'Saturday', '08:45:00', '09:30:00', 'تلخیص المفتاح', 238, 2, 6, 1);
INSERT INTO `periods` VALUES (1884, 328, 40, 'Saturday', '09:45:00', '10:30:00', 'القدوري الثاني', 240, 3, 6, 1);
INSERT INTO `periods` VALUES (1886, 342, 40, 'Saturday', '10:30:00', '11:15:00', 'کنز الدقائق', 234, 4, 6, 1);
INSERT INTO `periods` VALUES (1888, 324, 40, 'Saturday', '11:15:00', '12:00:00', 'شرح جامی', 236, 5, 6, 1);
INSERT INTO `periods` VALUES (1890, 328, 40, 'Monday', '08:00:00', '08:45:00', 'القدوري الثاني', 240, 1, 6, 1);
INSERT INTO `periods` VALUES (1892, 342, 40, 'Monday', '08:45:00', '09:30:00', 'کنز الدقائق', 234, 2, 6, 1);
INSERT INTO `periods` VALUES (1894, 324, 40, 'Monday', '09:45:00', '10:30:00', 'شرح جامی', 236, 3, 6, 1);
INSERT INTO `periods` VALUES (1896, 326, 40, 'Monday', '10:30:00', '11:15:00', 'تلخیص المفتاح', 238, 4, 6, 1);
INSERT INTO `periods` VALUES (1898, 328, 40, 'Monday', '11:15:00', '12:00:00', 'القدوري الثاني', 240, 5, 6, 1);
INSERT INTO `periods` VALUES (1900, 342, 40, 'Tuesday', '08:00:00', '08:45:00', 'کنز الدقائق', 234, 1, 6, 1);
INSERT INTO `periods` VALUES (1902, 324, 40, 'Tuesday', '08:45:00', '09:30:00', 'شرح جامی', 236, 2, 6, 1);
INSERT INTO `periods` VALUES (1904, 326, 40, 'Tuesday', '09:45:00', '10:30:00', 'تلخیص المفتاح', 238, 3, 6, 1);
INSERT INTO `periods` VALUES (1906, 328, 40, 'Tuesday', '10:30:00', '11:15:00', 'القدوري الثاني', 240, 4, 6, 1);
INSERT INTO `periods` VALUES (1908, 342, 40, 'Tuesday', '11:15:00', '12:00:00', 'کنز الدقائق', 234, 5, 6, 1);
INSERT INTO `periods` VALUES (1910, 326, 40, 'Wednesday', '08:00:00', '08:45:00', 'تلخیص المفتاح', 238, 1, 6, 1);
INSERT INTO `periods` VALUES (1912, 328, 40, 'Wednesday', '08:45:00', '09:30:00', 'القدوري الثاني', 240, 2, 6, 1);
INSERT INTO `periods` VALUES (1914, 342, 40, 'Wednesday', '09:45:00', '10:30:00', 'کنز الدقائق', 234, 3, 6, 1);
INSERT INTO `periods` VALUES (1916, 324, 40, 'Wednesday', '10:30:00', '11:15:00', 'شرح جامی', 236, 4, 6, 1);
INSERT INTO `periods` VALUES (1918, 326, 40, 'Wednesday', '11:15:00', '12:00:00', 'تلخیص المفتاح', 238, 5, 6, 1);
INSERT INTO `periods` VALUES (1920, 324, 40, 'Thursday', '08:00:00', '08:45:00', 'شرح جامی', 236, 1, 6, 1);
INSERT INTO `periods` VALUES (1922, 326, 40, 'Thursday', '08:45:00', '09:30:00', 'تلخیص المفتاح', 238, 2, 6, 1);
INSERT INTO `periods` VALUES (1924, 328, 40, 'Thursday', '09:45:00', '10:30:00', 'القدوري الثاني', 240, 3, 6, 1);
INSERT INTO `periods` VALUES (1926, 342, 40, 'Thursday', '10:30:00', '11:15:00', 'کنز الدقائق', 234, 4, 6, 1);
INSERT INTO `periods` VALUES (1928, 324, 40, 'Thursday', '11:15:00', '12:00:00', 'شرح جامی', 236, 5, 6, 1);
INSERT INTO `periods` VALUES (1930, 328, 40, 'Friday', '08:00:00', '08:45:00', 'القدوري الثاني', 240, 1, 6, 1);
INSERT INTO `periods` VALUES (1932, 342, 40, 'Friday', '08:45:00', '09:30:00', 'کنز الدقائق', 234, 2, 6, 1);
INSERT INTO `periods` VALUES (1934, 324, 40, 'Friday', '09:45:00', '10:30:00', 'شرح جامی', 236, 3, 6, 1);
INSERT INTO `periods` VALUES (1936, 326, 40, 'Friday', '10:30:00', '11:15:00', 'تلخیص المفتاح', 238, 4, 6, 1);
INSERT INTO `periods` VALUES (1938, 328, 40, 'Friday', '11:15:00', '12:00:00', 'القدوري الثاني', 240, 5, 6, 1);
INSERT INTO `periods` VALUES (1940, 330, 42, 'Saturday', '08:00:00', '08:45:00', 'عقیدۃ الطحاویہ', 244, 1, 6, 1);
INSERT INTO `periods` VALUES (1942, 332, 42, 'Saturday', '08:45:00', '09:30:00', 'تفسير الجلالين الأول', 246, 2, 6, 1);
INSERT INTO `periods` VALUES (1944, 334, 42, 'Saturday', '09:45:00', '10:30:00', 'دیوان المتنبي', 248, 3, 6, 1);
INSERT INTO `periods` VALUES (1946, 328, 42, 'Saturday', '10:30:00', '11:15:00', 'ہدایہ اول', 242, 4, 6, 1);
INSERT INTO `periods` VALUES (1948, 330, 42, 'Saturday', '11:15:00', '12:00:00', 'عقیدۃ الطحاویہ', 244, 5, 6, 1);
INSERT INTO `periods` VALUES (1950, 334, 42, 'Monday', '08:00:00', '08:45:00', 'دیوان المتنبي', 248, 1, 6, 1);
INSERT INTO `periods` VALUES (1952, 328, 42, 'Monday', '08:45:00', '09:30:00', 'ہدایہ اول', 242, 2, 6, 1);
INSERT INTO `periods` VALUES (1954, 330, 42, 'Monday', '09:45:00', '10:30:00', 'عقیدۃ الطحاویہ', 244, 3, 6, 1);
INSERT INTO `periods` VALUES (1956, 332, 42, 'Monday', '10:30:00', '11:15:00', 'تفسير الجلالين الأول', 246, 4, 6, 1);
INSERT INTO `periods` VALUES (1958, 334, 42, 'Monday', '11:15:00', '12:00:00', 'دیوان المتنبي', 248, 5, 6, 1);
INSERT INTO `periods` VALUES (1960, 328, 42, 'Tuesday', '08:00:00', '08:45:00', 'ہدایہ اول', 242, 1, 6, 1);
INSERT INTO `periods` VALUES (1962, 330, 42, 'Tuesday', '08:45:00', '09:30:00', 'عقیدۃ الطحاویہ', 244, 2, 6, 1);
INSERT INTO `periods` VALUES (1964, 332, 42, 'Tuesday', '09:45:00', '10:30:00', 'تفسير الجلالين الأول', 246, 3, 6, 1);
INSERT INTO `periods` VALUES (1966, 334, 42, 'Tuesday', '10:30:00', '11:15:00', 'دیوان المتنبي', 248, 4, 6, 1);
INSERT INTO `periods` VALUES (1968, 328, 42, 'Tuesday', '11:15:00', '12:00:00', 'ہدایہ اول', 242, 5, 6, 1);
INSERT INTO `periods` VALUES (1970, 332, 42, 'Wednesday', '08:00:00', '08:45:00', 'تفسير الجلالين الأول', 246, 1, 6, 1);
INSERT INTO `periods` VALUES (1972, 334, 42, 'Wednesday', '08:45:00', '09:30:00', 'دیوان المتنبي', 248, 2, 6, 1);
INSERT INTO `periods` VALUES (1974, 328, 42, 'Wednesday', '09:45:00', '10:30:00', 'ہدایہ اول', 242, 3, 6, 1);
INSERT INTO `periods` VALUES (1976, 330, 42, 'Wednesday', '10:30:00', '11:15:00', 'عقیدۃ الطحاویہ', 244, 4, 6, 1);
INSERT INTO `periods` VALUES (1978, 332, 42, 'Wednesday', '11:15:00', '12:00:00', 'تفسير الجلالين الأول', 246, 5, 6, 1);
INSERT INTO `periods` VALUES (1980, 330, 42, 'Thursday', '08:00:00', '08:45:00', 'عقیدۃ الطحاویہ', 244, 1, 6, 1);
INSERT INTO `periods` VALUES (1982, 332, 42, 'Thursday', '08:45:00', '09:30:00', 'تفسير الجلالين الأول', 246, 2, 6, 1);
INSERT INTO `periods` VALUES (1984, 334, 42, 'Thursday', '09:45:00', '10:30:00', 'دیوان المتنبي', 248, 3, 6, 1);
INSERT INTO `periods` VALUES (1986, 328, 42, 'Thursday', '10:30:00', '11:15:00', 'ہدایہ اول', 242, 4, 6, 1);
INSERT INTO `periods` VALUES (1988, 330, 42, 'Thursday', '11:15:00', '12:00:00', 'عقیدۃ الطحاویہ', 244, 5, 6, 1);
INSERT INTO `periods` VALUES (1990, 334, 42, 'Friday', '08:00:00', '08:45:00', 'دیوان المتنبي', 248, 1, 6, 1);
INSERT INTO `periods` VALUES (1992, 328, 42, 'Friday', '08:45:00', '09:30:00', 'ہدایہ اول', 242, 2, 6, 1);
INSERT INTO `periods` VALUES (1994, 330, 42, 'Friday', '09:45:00', '10:30:00', 'عقیدۃ الطحاویہ', 244, 3, 6, 1);
INSERT INTO `periods` VALUES (1996, 332, 42, 'Friday', '10:30:00', '11:15:00', 'تفسير الجلالين الأول', 246, 4, 6, 1);
INSERT INTO `periods` VALUES (1998, 334, 42, 'Friday', '11:15:00', '12:00:00', 'دیوان المتنبي', 248, 5, 6, 1);
INSERT INTO `periods` VALUES (2000, 336, 44, 'Saturday', '08:00:00', '08:45:00', 'نور الانوار', 252, 1, 6, 1);
INSERT INTO `periods` VALUES (2002, 338, 44, 'Saturday', '08:45:00', '09:30:00', 'تفسير الجلالين الثاني', 254, 2, 6, 1);
INSERT INTO `periods` VALUES (2004, 340, 44, 'Saturday', '09:45:00', '10:30:00', 'مختصر المعاني', 256, 3, 6, 1);
INSERT INTO `periods` VALUES (2006, 334, 44, 'Saturday', '10:30:00', '11:15:00', 'ہدایہ ثالث', 250, 4, 6, 1);
INSERT INTO `periods` VALUES (2008, 336, 44, 'Saturday', '11:15:00', '12:00:00', 'نور الانوار', 252, 5, 6, 1);
INSERT INTO `periods` VALUES (2010, 340, 44, 'Monday', '08:00:00', '08:45:00', 'مختصر المعاني', 256, 1, 6, 1);
INSERT INTO `periods` VALUES (2012, 334, 44, 'Monday', '08:45:00', '09:30:00', 'ہدایہ ثالث', 250, 2, 6, 1);
INSERT INTO `periods` VALUES (2014, 336, 44, 'Monday', '09:45:00', '10:30:00', 'نور الانوار', 252, 3, 6, 1);
INSERT INTO `periods` VALUES (2016, 338, 44, 'Monday', '10:30:00', '11:15:00', 'تفسير الجلالين الثاني', 254, 4, 6, 1);
INSERT INTO `periods` VALUES (2018, 340, 44, 'Monday', '11:15:00', '12:00:00', 'مختصر المعاني', 256, 5, 6, 1);
INSERT INTO `periods` VALUES (2020, 334, 44, 'Tuesday', '08:00:00', '08:45:00', 'ہدایہ ثالث', 250, 1, 6, 1);
INSERT INTO `periods` VALUES (2022, 336, 44, 'Tuesday', '08:45:00', '09:30:00', 'نور الانوار', 252, 2, 6, 1);
INSERT INTO `periods` VALUES (2024, 338, 44, 'Tuesday', '09:45:00', '10:30:00', 'تفسير الجلالين الثاني', 254, 3, 6, 1);
INSERT INTO `periods` VALUES (2026, 340, 44, 'Tuesday', '10:30:00', '11:15:00', 'مختصر المعاني', 256, 4, 6, 1);
INSERT INTO `periods` VALUES (2028, 334, 44, 'Tuesday', '11:15:00', '12:00:00', 'ہدایہ ثالث', 250, 5, 6, 1);
INSERT INTO `periods` VALUES (2030, 338, 44, 'Wednesday', '08:00:00', '08:45:00', 'تفسير الجلالين الثاني', 254, 1, 6, 1);
INSERT INTO `periods` VALUES (2032, 340, 44, 'Wednesday', '08:45:00', '09:30:00', 'مختصر المعاني', 256, 2, 6, 1);
INSERT INTO `periods` VALUES (2034, 334, 44, 'Wednesday', '09:45:00', '10:30:00', 'ہدایہ ثالث', 250, 3, 6, 1);
INSERT INTO `periods` VALUES (2036, 336, 44, 'Wednesday', '10:30:00', '11:15:00', 'نور الانوار', 252, 4, 6, 1);
INSERT INTO `periods` VALUES (2038, 338, 44, 'Wednesday', '11:15:00', '12:00:00', 'تفسير الجلالين الثاني', 254, 5, 6, 1);
INSERT INTO `periods` VALUES (2040, 336, 44, 'Thursday', '08:00:00', '08:45:00', 'نور الانوار', 252, 1, 6, 1);
INSERT INTO `periods` VALUES (2042, 338, 44, 'Thursday', '08:45:00', '09:30:00', 'تفسير الجلالين الثاني', 254, 2, 6, 1);
INSERT INTO `periods` VALUES (2044, 340, 44, 'Thursday', '09:45:00', '10:30:00', 'مختصر المعاني', 256, 3, 6, 1);
INSERT INTO `periods` VALUES (2046, 334, 44, 'Thursday', '10:30:00', '11:15:00', 'ہدایہ ثالث', 250, 4, 6, 1);
INSERT INTO `periods` VALUES (2048, 336, 44, 'Thursday', '11:15:00', '12:00:00', 'نور الانوار', 252, 5, 6, 1);
INSERT INTO `periods` VALUES (2050, 340, 44, 'Friday', '08:00:00', '08:45:00', 'مختصر المعاني', 256, 1, 6, 1);
INSERT INTO `periods` VALUES (2052, 334, 44, 'Friday', '08:45:00', '09:30:00', 'ہدایہ ثالث', 250, 2, 6, 1);
INSERT INTO `periods` VALUES (2054, 336, 44, 'Friday', '09:45:00', '10:30:00', 'نور الانوار', 252, 3, 6, 1);
INSERT INTO `periods` VALUES (2056, 338, 44, 'Friday', '10:30:00', '11:15:00', 'تفسير الجلالين الثاني', 254, 4, 6, 1);
INSERT INTO `periods` VALUES (2058, 340, 44, 'Friday', '11:15:00', '12:00:00', 'مختصر المعاني', 256, 5, 6, 1);
INSERT INTO `periods` VALUES (2060, 342, 46, 'Saturday', '08:00:00', '08:45:00', 'ہدایہ اخیرین', 260, 1, 6, 1);
INSERT INTO `periods` VALUES (2062, 324, 46, 'Saturday', '08:45:00', '09:30:00', 'شرح العقائد النسفیہ', 262, 2, 6, 1);
INSERT INTO `periods` VALUES (2064, 326, 46, 'Saturday', '09:45:00', '10:30:00', 'السراجی فی المیراث', 264, 3, 6, 1);
INSERT INTO `periods` VALUES (2066, 340, 46, 'Saturday', '10:30:00', '11:15:00', 'مشکوۃ المصابیح', 258, 4, 6, 1);
INSERT INTO `periods` VALUES (2068, 342, 46, 'Saturday', '11:15:00', '12:00:00', 'ہدایہ اخیرین', 260, 5, 6, 1);
INSERT INTO `periods` VALUES (2070, 326, 46, 'Monday', '08:00:00', '08:45:00', 'السراجی فی المیراث', 264, 1, 6, 1);
INSERT INTO `periods` VALUES (2072, 340, 46, 'Monday', '08:45:00', '09:30:00', 'مشکوۃ المصابیح', 258, 2, 6, 1);
INSERT INTO `periods` VALUES (2074, 342, 46, 'Monday', '09:45:00', '10:30:00', 'ہدایہ اخیرین', 260, 3, 6, 1);
INSERT INTO `periods` VALUES (2076, 324, 46, 'Monday', '10:30:00', '11:15:00', 'شرح العقائد النسفیہ', 262, 4, 6, 1);
INSERT INTO `periods` VALUES (2078, 326, 46, 'Monday', '11:15:00', '12:00:00', 'السراجی فی المیراث', 264, 5, 6, 1);
INSERT INTO `periods` VALUES (2080, 340, 46, 'Tuesday', '08:00:00', '08:45:00', 'مشکوۃ المصابیح', 258, 1, 6, 1);
INSERT INTO `periods` VALUES (2082, 342, 46, 'Tuesday', '08:45:00', '09:30:00', 'ہدایہ اخیرین', 260, 2, 6, 1);
INSERT INTO `periods` VALUES (2084, 324, 46, 'Tuesday', '09:45:00', '10:30:00', 'شرح العقائد النسفیہ', 262, 3, 6, 1);
INSERT INTO `periods` VALUES (2086, 326, 46, 'Tuesday', '10:30:00', '11:15:00', 'السراجی فی المیراث', 264, 4, 6, 1);
INSERT INTO `periods` VALUES (2088, 340, 46, 'Tuesday', '11:15:00', '12:00:00', 'مشکوۃ المصابیح', 258, 5, 6, 1);
INSERT INTO `periods` VALUES (2090, 324, 46, 'Wednesday', '08:00:00', '08:45:00', 'شرح العقائد النسفیہ', 262, 1, 6, 1);
INSERT INTO `periods` VALUES (2092, 326, 46, 'Wednesday', '08:45:00', '09:30:00', 'السراجی فی المیراث', 264, 2, 6, 1);
INSERT INTO `periods` VALUES (2094, 340, 46, 'Wednesday', '09:45:00', '10:30:00', 'مشکوۃ المصابیح', 258, 3, 6, 1);
INSERT INTO `periods` VALUES (2096, 342, 46, 'Wednesday', '10:30:00', '11:15:00', 'ہدایہ اخیرین', 260, 4, 6, 1);
INSERT INTO `periods` VALUES (2098, 324, 46, 'Wednesday', '11:15:00', '12:00:00', 'شرح العقائد النسفیہ', 262, 5, 6, 1);
INSERT INTO `periods` VALUES (2100, 342, 46, 'Thursday', '08:00:00', '08:45:00', 'ہدایہ اخیرین', 260, 1, 6, 1);
INSERT INTO `periods` VALUES (2102, 324, 46, 'Thursday', '08:45:00', '09:30:00', 'شرح العقائد النسفیہ', 262, 2, 6, 1);
INSERT INTO `periods` VALUES (2104, 326, 46, 'Thursday', '09:45:00', '10:30:00', 'السراجی فی المیراث', 264, 3, 6, 1);
INSERT INTO `periods` VALUES (2106, 340, 46, 'Thursday', '10:30:00', '11:15:00', 'مشکوۃ المصابیح', 258, 4, 6, 1);
INSERT INTO `periods` VALUES (2108, 342, 46, 'Thursday', '11:15:00', '12:00:00', 'ہدایہ اخیرین', 260, 5, 6, 1);
INSERT INTO `periods` VALUES (2110, 326, 46, 'Friday', '08:00:00', '08:45:00', 'السراجی فی المیراث', 264, 1, 6, 1);
INSERT INTO `periods` VALUES (2112, 340, 46, 'Friday', '08:45:00', '09:30:00', 'مشکوۃ المصابیح', 258, 2, 6, 1);
INSERT INTO `periods` VALUES (2114, 342, 46, 'Friday', '09:45:00', '10:30:00', 'ہدایہ اخیرین', 260, 3, 6, 1);
INSERT INTO `periods` VALUES (2116, 324, 46, 'Friday', '10:30:00', '11:15:00', 'شرح العقائد النسفیہ', 262, 4, 6, 1);
INSERT INTO `periods` VALUES (2118, 326, 46, 'Friday', '11:15:00', '12:00:00', 'السراجی فی المیراث', 264, 5, 6, 1);
INSERT INTO `periods` VALUES (2120, 332, 48, 'Saturday', '08:00:00', '08:45:00', 'سنن أبي داود', 272, 1, 6, 1);
INSERT INTO `periods` VALUES (2122, 334, 48, 'Saturday', '08:45:00', '09:30:00', 'سنن النسائي', 274, 2, 6, 1);
INSERT INTO `periods` VALUES (2124, 336, 48, 'Saturday', '09:45:00', '10:30:00', 'سنن ابن ماجہ', 276, 3, 6, 1);
INSERT INTO `periods` VALUES (2126, 326, 48, 'Saturday', '10:30:00', '11:15:00', 'صحيح البخاري', 266, 4, 6, 1);
INSERT INTO `periods` VALUES (2128, 328, 48, 'Saturday', '11:15:00', '12:00:00', 'صحيح مسلم', 268, 5, 6, 1);
INSERT INTO `periods` VALUES (2130, 328, 48, 'Monday', '08:00:00', '08:45:00', 'صحيح مسلم', 268, 1, 6, 1);
INSERT INTO `periods` VALUES (2132, 330, 48, 'Monday', '08:45:00', '09:30:00', 'جامع الترمذي', 270, 2, 6, 1);
INSERT INTO `periods` VALUES (2134, 332, 48, 'Monday', '09:45:00', '10:30:00', 'سنن أبي داود', 272, 3, 6, 1);
INSERT INTO `periods` VALUES (2136, 334, 48, 'Monday', '10:30:00', '11:15:00', 'سنن النسائي', 274, 4, 6, 1);
INSERT INTO `periods` VALUES (2138, 336, 48, 'Monday', '11:15:00', '12:00:00', 'سنن ابن ماجہ', 276, 5, 6, 1);
INSERT INTO `periods` VALUES (2140, 330, 48, 'Tuesday', '08:00:00', '08:45:00', 'جامع الترمذي', 270, 1, 6, 1);
INSERT INTO `periods` VALUES (2142, 332, 48, 'Tuesday', '08:45:00', '09:30:00', 'سنن أبي داود', 272, 2, 6, 1);
INSERT INTO `periods` VALUES (2144, 334, 48, 'Tuesday', '09:45:00', '10:30:00', 'سنن النسائي', 274, 3, 6, 1);
INSERT INTO `periods` VALUES (2146, 336, 48, 'Tuesday', '10:30:00', '11:15:00', 'سنن ابن ماجہ', 276, 4, 6, 1);
INSERT INTO `periods` VALUES (2148, 326, 48, 'Tuesday', '11:15:00', '12:00:00', 'صحيح البخاري', 266, 5, 6, 1);
INSERT INTO `periods` VALUES (2150, 334, 48, 'Wednesday', '08:00:00', '08:45:00', 'سنن النسائي', 274, 1, 6, 1);
INSERT INTO `periods` VALUES (2152, 336, 48, 'Wednesday', '08:45:00', '09:30:00', 'سنن ابن ماجہ', 276, 2, 6, 1);
INSERT INTO `periods` VALUES (2154, 326, 48, 'Wednesday', '09:45:00', '10:30:00', 'صحيح البخاري', 266, 3, 6, 1);
INSERT INTO `periods` VALUES (2156, 328, 48, 'Wednesday', '10:30:00', '11:15:00', 'صحيح مسلم', 268, 4, 6, 1);
INSERT INTO `periods` VALUES (2158, 330, 48, 'Wednesday', '11:15:00', '12:00:00', 'جامع الترمذي', 270, 5, 6, 1);
INSERT INTO `periods` VALUES (2160, 332, 48, 'Thursday', '08:00:00', '08:45:00', 'سنن أبي داود', 272, 1, 6, 1);
INSERT INTO `periods` VALUES (2162, 334, 48, 'Thursday', '08:45:00', '09:30:00', 'سنن النسائي', 274, 2, 6, 1);
INSERT INTO `periods` VALUES (2164, 336, 48, 'Thursday', '09:45:00', '10:30:00', 'سنن ابن ماجہ', 276, 3, 6, 1);
INSERT INTO `periods` VALUES (2166, 326, 48, 'Thursday', '10:30:00', '11:15:00', 'صحيح البخاري', 266, 4, 6, 1);
INSERT INTO `periods` VALUES (2168, 328, 48, 'Thursday', '11:15:00', '12:00:00', 'صحيح مسلم', 268, 5, 6, 1);
INSERT INTO `periods` VALUES (2170, 328, 48, 'Friday', '08:00:00', '08:45:00', 'صحيح مسلم', 268, 1, 6, 1);
INSERT INTO `periods` VALUES (2172, 330, 48, 'Friday', '08:45:00', '09:30:00', 'جامع الترمذي', 270, 2, 6, 1);
INSERT INTO `periods` VALUES (2174, 332, 48, 'Friday', '09:45:00', '10:30:00', 'سنن أبي داود', 272, 3, 6, 1);
INSERT INTO `periods` VALUES (2176, 334, 48, 'Friday', '10:30:00', '11:15:00', 'سنن النسائي', 274, 4, 6, 1);
INSERT INTO `periods` VALUES (2178, 336, 48, 'Friday', '11:15:00', '12:00:00', 'سنن ابن ماجہ', 276, 5, 6, 1);
INSERT INTO `periods` VALUES (2180, 346, 50, 'Saturday', '08:00:00', '08:45:00', 'نحو میر', 280, 1, 8, 1);
INSERT INTO `periods` VALUES (2182, 348, 50, 'Saturday', '08:45:00', '09:30:00', 'جمال القرآن', 282, 2, 8, 1);
INSERT INTO `periods` VALUES (2184, 350, 50, 'Saturday', '09:45:00', '10:30:00', 'طریقہ جدیدہ', 284, 3, 8, 1);
INSERT INTO `periods` VALUES (2186, 344, 50, 'Saturday', '10:30:00', '11:15:00', 'صرف بہائی', 278, 4, 8, 1);
INSERT INTO `periods` VALUES (2188, 346, 50, 'Saturday', '11:15:00', '12:00:00', 'نحو میر', 280, 5, 8, 1);
INSERT INTO `periods` VALUES (2190, 350, 50, 'Monday', '08:00:00', '08:45:00', 'طریقہ جدیدہ', 284, 1, 8, 1);
INSERT INTO `periods` VALUES (2192, 344, 50, 'Monday', '08:45:00', '09:30:00', 'صرف بہائی', 278, 2, 8, 1);
INSERT INTO `periods` VALUES (2194, 346, 50, 'Monday', '09:45:00', '10:30:00', 'نحو میر', 280, 3, 8, 1);
INSERT INTO `periods` VALUES (2196, 348, 50, 'Monday', '10:30:00', '11:15:00', 'جمال القرآن', 282, 4, 8, 1);
INSERT INTO `periods` VALUES (2198, 350, 50, 'Monday', '11:15:00', '12:00:00', 'طریقہ جدیدہ', 284, 5, 8, 1);
INSERT INTO `periods` VALUES (2200, 344, 50, 'Tuesday', '08:00:00', '08:45:00', 'صرف بہائی', 278, 1, 8, 1);
INSERT INTO `periods` VALUES (2202, 346, 50, 'Tuesday', '08:45:00', '09:30:00', 'نحو میر', 280, 2, 8, 1);
INSERT INTO `periods` VALUES (2204, 348, 50, 'Tuesday', '09:45:00', '10:30:00', 'جمال القرآن', 282, 3, 8, 1);
INSERT INTO `periods` VALUES (2206, 350, 50, 'Tuesday', '10:30:00', '11:15:00', 'طریقہ جدیدہ', 284, 4, 8, 1);
INSERT INTO `periods` VALUES (2208, 344, 50, 'Tuesday', '11:15:00', '12:00:00', 'صرف بہائی', 278, 5, 8, 1);
INSERT INTO `periods` VALUES (2210, 348, 50, 'Wednesday', '08:00:00', '08:45:00', 'جمال القرآن', 282, 1, 8, 1);
INSERT INTO `periods` VALUES (2212, 350, 50, 'Wednesday', '08:45:00', '09:30:00', 'طریقہ جدیدہ', 284, 2, 8, 1);
INSERT INTO `periods` VALUES (2214, 344, 50, 'Wednesday', '09:45:00', '10:30:00', 'صرف بہائی', 278, 3, 8, 1);
INSERT INTO `periods` VALUES (2216, 346, 50, 'Wednesday', '10:30:00', '11:15:00', 'نحو میر', 280, 4, 8, 1);
INSERT INTO `periods` VALUES (2218, 348, 50, 'Wednesday', '11:15:00', '12:00:00', 'جمال القرآن', 282, 5, 8, 1);
INSERT INTO `periods` VALUES (2220, 346, 50, 'Thursday', '08:00:00', '08:45:00', 'نحو میر', 280, 1, 8, 1);
INSERT INTO `periods` VALUES (2222, 348, 50, 'Thursday', '08:45:00', '09:30:00', 'جمال القرآن', 282, 2, 8, 1);
INSERT INTO `periods` VALUES (2224, 350, 50, 'Thursday', '09:45:00', '10:30:00', 'طریقہ جدیدہ', 284, 3, 8, 1);
INSERT INTO `periods` VALUES (2226, 344, 50, 'Thursday', '10:30:00', '11:15:00', 'صرف بہائی', 278, 4, 8, 1);
INSERT INTO `periods` VALUES (2228, 346, 50, 'Thursday', '11:15:00', '12:00:00', 'نحو میر', 280, 5, 8, 1);
INSERT INTO `periods` VALUES (2230, 350, 50, 'Friday', '08:00:00', '08:45:00', 'طریقہ جدیدہ', 284, 1, 8, 1);
INSERT INTO `periods` VALUES (2232, 344, 50, 'Friday', '08:45:00', '09:30:00', 'صرف بہائی', 278, 2, 8, 1);
INSERT INTO `periods` VALUES (2234, 346, 50, 'Friday', '09:45:00', '10:30:00', 'نحو میر', 280, 3, 8, 1);
INSERT INTO `periods` VALUES (2236, 348, 50, 'Friday', '10:30:00', '11:15:00', 'جمال القرآن', 282, 4, 8, 1);
INSERT INTO `periods` VALUES (2238, 350, 50, 'Friday', '11:15:00', '12:00:00', 'طریقہ جدیدہ', 284, 5, 8, 1);
INSERT INTO `periods` VALUES (2240, 352, 52, 'Saturday', '08:00:00', '08:45:00', 'علم النحو', 288, 1, 8, 1);
INSERT INTO `periods` VALUES (2242, 354, 52, 'Saturday', '08:45:00', '09:30:00', 'القدوري الأول', 290, 2, 8, 1);
INSERT INTO `periods` VALUES (2244, 356, 52, 'Saturday', '09:45:00', '10:30:00', 'خلاصۃ النحو', 292, 3, 8, 1);
INSERT INTO `periods` VALUES (2246, 350, 52, 'Saturday', '10:30:00', '11:15:00', 'علم الصيغة', 286, 4, 8, 1);
INSERT INTO `periods` VALUES (2248, 352, 52, 'Saturday', '11:15:00', '12:00:00', 'علم النحو', 288, 5, 8, 1);
INSERT INTO `periods` VALUES (2250, 356, 52, 'Monday', '08:00:00', '08:45:00', 'خلاصۃ النحو', 292, 1, 8, 1);
INSERT INTO `periods` VALUES (2252, 350, 52, 'Monday', '08:45:00', '09:30:00', 'علم الصيغة', 286, 2, 8, 1);
INSERT INTO `periods` VALUES (2254, 352, 52, 'Monday', '09:45:00', '10:30:00', 'علم النحو', 288, 3, 8, 1);
INSERT INTO `periods` VALUES (2256, 354, 52, 'Monday', '10:30:00', '11:15:00', 'القدوري الأول', 290, 4, 8, 1);
INSERT INTO `periods` VALUES (2258, 356, 52, 'Monday', '11:15:00', '12:00:00', 'خلاصۃ النحو', 292, 5, 8, 1);
INSERT INTO `periods` VALUES (2260, 350, 52, 'Tuesday', '08:00:00', '08:45:00', 'علم الصيغة', 286, 1, 8, 1);
INSERT INTO `periods` VALUES (2262, 352, 52, 'Tuesday', '08:45:00', '09:30:00', 'علم النحو', 288, 2, 8, 1);
INSERT INTO `periods` VALUES (2264, 354, 52, 'Tuesday', '09:45:00', '10:30:00', 'القدوري الأول', 290, 3, 8, 1);
INSERT INTO `periods` VALUES (2266, 356, 52, 'Tuesday', '10:30:00', '11:15:00', 'خلاصۃ النحو', 292, 4, 8, 1);
INSERT INTO `periods` VALUES (2268, 350, 52, 'Tuesday', '11:15:00', '12:00:00', 'علم الصيغة', 286, 5, 8, 1);
INSERT INTO `periods` VALUES (2270, 354, 52, 'Wednesday', '08:00:00', '08:45:00', 'القدوري الأول', 290, 1, 8, 1);
INSERT INTO `periods` VALUES (2272, 356, 52, 'Wednesday', '08:45:00', '09:30:00', 'خلاصۃ النحو', 292, 2, 8, 1);
INSERT INTO `periods` VALUES (2274, 350, 52, 'Wednesday', '09:45:00', '10:30:00', 'علم الصيغة', 286, 3, 8, 1);
INSERT INTO `periods` VALUES (2276, 352, 52, 'Wednesday', '10:30:00', '11:15:00', 'علم النحو', 288, 4, 8, 1);
INSERT INTO `periods` VALUES (2278, 354, 52, 'Wednesday', '11:15:00', '12:00:00', 'القدوري الأول', 290, 5, 8, 1);
INSERT INTO `periods` VALUES (2280, 352, 52, 'Thursday', '08:00:00', '08:45:00', 'علم النحو', 288, 1, 8, 1);
INSERT INTO `periods` VALUES (2282, 354, 52, 'Thursday', '08:45:00', '09:30:00', 'القدوري الأول', 290, 2, 8, 1);
INSERT INTO `periods` VALUES (2284, 356, 52, 'Thursday', '09:45:00', '10:30:00', 'خلاصۃ النحو', 292, 3, 8, 1);
INSERT INTO `periods` VALUES (2286, 350, 52, 'Thursday', '10:30:00', '11:15:00', 'علم الصيغة', 286, 4, 8, 1);
INSERT INTO `periods` VALUES (2288, 352, 52, 'Thursday', '11:15:00', '12:00:00', 'علم النحو', 288, 5, 8, 1);
INSERT INTO `periods` VALUES (2290, 356, 52, 'Friday', '08:00:00', '08:45:00', 'خلاصۃ النحو', 292, 1, 8, 1);
INSERT INTO `periods` VALUES (2292, 350, 52, 'Friday', '08:45:00', '09:30:00', 'علم الصيغة', 286, 2, 8, 1);
INSERT INTO `periods` VALUES (2294, 352, 52, 'Friday', '09:45:00', '10:30:00', 'علم النحو', 288, 3, 8, 1);
INSERT INTO `periods` VALUES (2296, 354, 52, 'Friday', '10:30:00', '11:15:00', 'القدوري الأول', 290, 4, 8, 1);
INSERT INTO `periods` VALUES (2298, 356, 52, 'Friday', '11:15:00', '12:00:00', 'خلاصۃ النحو', 292, 5, 8, 1);
INSERT INTO `periods` VALUES (2300, 358, 54, 'Saturday', '08:00:00', '08:45:00', 'شرح مائۃ عامل', 296, 1, 8, 1);
INSERT INTO `periods` VALUES (2302, 360, 54, 'Saturday', '08:45:00', '09:30:00', 'نور الایضاح', 298, 2, 8, 1);
INSERT INTO `periods` VALUES (2304, 362, 54, 'Saturday', '09:45:00', '10:30:00', 'نفحۃ الیمن', 300, 3, 8, 1);
INSERT INTO `periods` VALUES (2306, 356, 54, 'Saturday', '10:30:00', '11:15:00', 'اصول الشاشی', 294, 4, 8, 1);
INSERT INTO `periods` VALUES (2308, 358, 54, 'Saturday', '11:15:00', '12:00:00', 'شرح مائۃ عامل', 296, 5, 8, 1);
INSERT INTO `periods` VALUES (2310, 362, 54, 'Monday', '08:00:00', '08:45:00', 'نفحۃ الیمن', 300, 1, 8, 1);
INSERT INTO `periods` VALUES (2312, 356, 54, 'Monday', '08:45:00', '09:30:00', 'اصول الشاشی', 294, 2, 8, 1);
INSERT INTO `periods` VALUES (2314, 358, 54, 'Monday', '09:45:00', '10:30:00', 'شرح مائۃ عامل', 296, 3, 8, 1);
INSERT INTO `periods` VALUES (2316, 360, 54, 'Monday', '10:30:00', '11:15:00', 'نور الایضاح', 298, 4, 8, 1);
INSERT INTO `periods` VALUES (2318, 362, 54, 'Monday', '11:15:00', '12:00:00', 'نفحۃ الیمن', 300, 5, 8, 1);
INSERT INTO `periods` VALUES (2320, 356, 54, 'Tuesday', '08:00:00', '08:45:00', 'اصول الشاشی', 294, 1, 8, 1);
INSERT INTO `periods` VALUES (2322, 358, 54, 'Tuesday', '08:45:00', '09:30:00', 'شرح مائۃ عامل', 296, 2, 8, 1);
INSERT INTO `periods` VALUES (2324, 360, 54, 'Tuesday', '09:45:00', '10:30:00', 'نور الایضاح', 298, 3, 8, 1);
INSERT INTO `periods` VALUES (2326, 362, 54, 'Tuesday', '10:30:00', '11:15:00', 'نفحۃ الیمن', 300, 4, 8, 1);
INSERT INTO `periods` VALUES (2328, 356, 54, 'Tuesday', '11:15:00', '12:00:00', 'اصول الشاشی', 294, 5, 8, 1);
INSERT INTO `periods` VALUES (2330, 360, 54, 'Wednesday', '08:00:00', '08:45:00', 'نور الایضاح', 298, 1, 8, 1);
INSERT INTO `periods` VALUES (2332, 362, 54, 'Wednesday', '08:45:00', '09:30:00', 'نفحۃ الیمن', 300, 2, 8, 1);
INSERT INTO `periods` VALUES (2334, 356, 54, 'Wednesday', '09:45:00', '10:30:00', 'اصول الشاشی', 294, 3, 8, 1);
INSERT INTO `periods` VALUES (2336, 358, 54, 'Wednesday', '10:30:00', '11:15:00', 'شرح مائۃ عامل', 296, 4, 8, 1);
INSERT INTO `periods` VALUES (2338, 360, 54, 'Wednesday', '11:15:00', '12:00:00', 'نور الایضاح', 298, 5, 8, 1);
INSERT INTO `periods` VALUES (2340, 358, 54, 'Thursday', '08:00:00', '08:45:00', 'شرح مائۃ عامل', 296, 1, 8, 1);
INSERT INTO `periods` VALUES (2342, 360, 54, 'Thursday', '08:45:00', '09:30:00', 'نور الایضاح', 298, 2, 8, 1);
INSERT INTO `periods` VALUES (2344, 362, 54, 'Thursday', '09:45:00', '10:30:00', 'نفحۃ الیمن', 300, 3, 8, 1);
INSERT INTO `periods` VALUES (2346, 356, 54, 'Thursday', '10:30:00', '11:15:00', 'اصول الشاشی', 294, 4, 8, 1);
INSERT INTO `periods` VALUES (2348, 358, 54, 'Thursday', '11:15:00', '12:00:00', 'شرح مائۃ عامل', 296, 5, 8, 1);
INSERT INTO `periods` VALUES (2350, 362, 54, 'Friday', '08:00:00', '08:45:00', 'نفحۃ الیمن', 300, 1, 8, 1);
INSERT INTO `periods` VALUES (2352, 356, 54, 'Friday', '08:45:00', '09:30:00', 'اصول الشاشی', 294, 2, 8, 1);
INSERT INTO `periods` VALUES (2354, 358, 54, 'Friday', '09:45:00', '10:30:00', 'شرح مائۃ عامل', 296, 3, 8, 1);
INSERT INTO `periods` VALUES (2356, 360, 54, 'Friday', '10:30:00', '11:15:00', 'نور الایضاح', 298, 4, 8, 1);
INSERT INTO `periods` VALUES (2358, 362, 54, 'Friday', '11:15:00', '12:00:00', 'نفحۃ الیمن', 300, 5, 8, 1);
INSERT INTO `periods` VALUES (2360, 344, 56, 'Saturday', '08:00:00', '08:45:00', 'شرح جامی', 304, 1, 8, 1);
INSERT INTO `periods` VALUES (2362, 346, 56, 'Saturday', '08:45:00', '09:30:00', 'تلخیص المفتاح', 306, 2, 8, 1);
INSERT INTO `periods` VALUES (2364, 348, 56, 'Saturday', '09:45:00', '10:30:00', 'القدوري الثاني', 308, 3, 8, 1);
INSERT INTO `periods` VALUES (2366, 362, 56, 'Saturday', '10:30:00', '11:15:00', 'کنز الدقائق', 302, 4, 8, 1);
INSERT INTO `periods` VALUES (2368, 344, 56, 'Saturday', '11:15:00', '12:00:00', 'شرح جامی', 304, 5, 8, 1);
INSERT INTO `periods` VALUES (2370, 348, 56, 'Monday', '08:00:00', '08:45:00', 'القدوري الثاني', 308, 1, 8, 1);
INSERT INTO `periods` VALUES (2372, 362, 56, 'Monday', '08:45:00', '09:30:00', 'کنز الدقائق', 302, 2, 8, 1);
INSERT INTO `periods` VALUES (2374, 344, 56, 'Monday', '09:45:00', '10:30:00', 'شرح جامی', 304, 3, 8, 1);
INSERT INTO `periods` VALUES (2376, 346, 56, 'Monday', '10:30:00', '11:15:00', 'تلخیص المفتاح', 306, 4, 8, 1);
INSERT INTO `periods` VALUES (2378, 348, 56, 'Monday', '11:15:00', '12:00:00', 'القدوري الثاني', 308, 5, 8, 1);
INSERT INTO `periods` VALUES (2380, 362, 56, 'Tuesday', '08:00:00', '08:45:00', 'کنز الدقائق', 302, 1, 8, 1);
INSERT INTO `periods` VALUES (2382, 344, 56, 'Tuesday', '08:45:00', '09:30:00', 'شرح جامی', 304, 2, 8, 1);
INSERT INTO `periods` VALUES (2384, 346, 56, 'Tuesday', '09:45:00', '10:30:00', 'تلخیص المفتاح', 306, 3, 8, 1);
INSERT INTO `periods` VALUES (2386, 348, 56, 'Tuesday', '10:30:00', '11:15:00', 'القدوري الثاني', 308, 4, 8, 1);
INSERT INTO `periods` VALUES (2388, 362, 56, 'Tuesday', '11:15:00', '12:00:00', 'کنز الدقائق', 302, 5, 8, 1);
INSERT INTO `periods` VALUES (2390, 346, 56, 'Wednesday', '08:00:00', '08:45:00', 'تلخیص المفتاح', 306, 1, 8, 1);
INSERT INTO `periods` VALUES (2392, 348, 56, 'Wednesday', '08:45:00', '09:30:00', 'القدوري الثاني', 308, 2, 8, 1);
INSERT INTO `periods` VALUES (2394, 362, 56, 'Wednesday', '09:45:00', '10:30:00', 'کنز الدقائق', 302, 3, 8, 1);
INSERT INTO `periods` VALUES (2396, 344, 56, 'Wednesday', '10:30:00', '11:15:00', 'شرح جامی', 304, 4, 8, 1);
INSERT INTO `periods` VALUES (2398, 346, 56, 'Wednesday', '11:15:00', '12:00:00', 'تلخیص المفتاح', 306, 5, 8, 1);
INSERT INTO `periods` VALUES (2400, 344, 56, 'Thursday', '08:00:00', '08:45:00', 'شرح جامی', 304, 1, 8, 1);
INSERT INTO `periods` VALUES (2402, 346, 56, 'Thursday', '08:45:00', '09:30:00', 'تلخیص المفتاح', 306, 2, 8, 1);
INSERT INTO `periods` VALUES (2404, 348, 56, 'Thursday', '09:45:00', '10:30:00', 'القدوري الثاني', 308, 3, 8, 1);
INSERT INTO `periods` VALUES (2406, 362, 56, 'Thursday', '10:30:00', '11:15:00', 'کنز الدقائق', 302, 4, 8, 1);
INSERT INTO `periods` VALUES (2408, 344, 56, 'Thursday', '11:15:00', '12:00:00', 'شرح جامی', 304, 5, 8, 1);
INSERT INTO `periods` VALUES (2410, 348, 56, 'Friday', '08:00:00', '08:45:00', 'القدوري الثاني', 308, 1, 8, 1);
INSERT INTO `periods` VALUES (2412, 362, 56, 'Friday', '08:45:00', '09:30:00', 'کنز الدقائق', 302, 2, 8, 1);
INSERT INTO `periods` VALUES (2414, 344, 56, 'Friday', '09:45:00', '10:30:00', 'شرح جامی', 304, 3, 8, 1);
INSERT INTO `periods` VALUES (2416, 346, 56, 'Friday', '10:30:00', '11:15:00', 'تلخیص المفتاح', 306, 4, 8, 1);
INSERT INTO `periods` VALUES (2418, 348, 56, 'Friday', '11:15:00', '12:00:00', 'القدوري الثاني', 308, 5, 8, 1);
INSERT INTO `periods` VALUES (2420, 350, 58, 'Saturday', '08:00:00', '08:45:00', 'عقیدۃ الطحاویہ', 312, 1, 8, 1);
INSERT INTO `periods` VALUES (2422, 352, 58, 'Saturday', '08:45:00', '09:30:00', 'تفسير الجلالين الأول', 314, 2, 8, 1);
INSERT INTO `periods` VALUES (2424, 354, 58, 'Saturday', '09:45:00', '10:30:00', 'دیوان المتنبي', 316, 3, 8, 1);
INSERT INTO `periods` VALUES (2426, 348, 58, 'Saturday', '10:30:00', '11:15:00', 'ہدایہ اول', 310, 4, 8, 1);
INSERT INTO `periods` VALUES (2428, 350, 58, 'Saturday', '11:15:00', '12:00:00', 'عقیدۃ الطحاویہ', 312, 5, 8, 1);
INSERT INTO `periods` VALUES (2430, 354, 58, 'Monday', '08:00:00', '08:45:00', 'دیوان المتنبي', 316, 1, 8, 1);
INSERT INTO `periods` VALUES (2432, 348, 58, 'Monday', '08:45:00', '09:30:00', 'ہدایہ اول', 310, 2, 8, 1);
INSERT INTO `periods` VALUES (2434, 350, 58, 'Monday', '09:45:00', '10:30:00', 'عقیدۃ الطحاویہ', 312, 3, 8, 1);
INSERT INTO `periods` VALUES (2436, 352, 58, 'Monday', '10:30:00', '11:15:00', 'تفسير الجلالين الأول', 314, 4, 8, 1);
INSERT INTO `periods` VALUES (2438, 354, 58, 'Monday', '11:15:00', '12:00:00', 'دیوان المتنبي', 316, 5, 8, 1);
INSERT INTO `periods` VALUES (2440, 348, 58, 'Tuesday', '08:00:00', '08:45:00', 'ہدایہ اول', 310, 1, 8, 1);
INSERT INTO `periods` VALUES (2442, 350, 58, 'Tuesday', '08:45:00', '09:30:00', 'عقیدۃ الطحاویہ', 312, 2, 8, 1);
INSERT INTO `periods` VALUES (2444, 352, 58, 'Tuesday', '09:45:00', '10:30:00', 'تفسير الجلالين الأول', 314, 3, 8, 1);
INSERT INTO `periods` VALUES (2446, 354, 58, 'Tuesday', '10:30:00', '11:15:00', 'دیوان المتنبي', 316, 4, 8, 1);
INSERT INTO `periods` VALUES (2448, 348, 58, 'Tuesday', '11:15:00', '12:00:00', 'ہدایہ اول', 310, 5, 8, 1);
INSERT INTO `periods` VALUES (2450, 352, 58, 'Wednesday', '08:00:00', '08:45:00', 'تفسير الجلالين الأول', 314, 1, 8, 1);
INSERT INTO `periods` VALUES (2452, 354, 58, 'Wednesday', '08:45:00', '09:30:00', 'دیوان المتنبي', 316, 2, 8, 1);
INSERT INTO `periods` VALUES (2454, 348, 58, 'Wednesday', '09:45:00', '10:30:00', 'ہدایہ اول', 310, 3, 8, 1);
INSERT INTO `periods` VALUES (2456, 350, 58, 'Wednesday', '10:30:00', '11:15:00', 'عقیدۃ الطحاویہ', 312, 4, 8, 1);
INSERT INTO `periods` VALUES (2458, 352, 58, 'Wednesday', '11:15:00', '12:00:00', 'تفسير الجلالين الأول', 314, 5, 8, 1);
INSERT INTO `periods` VALUES (2460, 350, 58, 'Thursday', '08:00:00', '08:45:00', 'عقیدۃ الطحاویہ', 312, 1, 8, 1);
INSERT INTO `periods` VALUES (2462, 352, 58, 'Thursday', '08:45:00', '09:30:00', 'تفسير الجلالين الأول', 314, 2, 8, 1);
INSERT INTO `periods` VALUES (2464, 354, 58, 'Thursday', '09:45:00', '10:30:00', 'دیوان المتنبي', 316, 3, 8, 1);
INSERT INTO `periods` VALUES (2466, 348, 58, 'Thursday', '10:30:00', '11:15:00', 'ہدایہ اول', 310, 4, 8, 1);
INSERT INTO `periods` VALUES (2468, 350, 58, 'Thursday', '11:15:00', '12:00:00', 'عقیدۃ الطحاویہ', 312, 5, 8, 1);
INSERT INTO `periods` VALUES (2470, 354, 58, 'Friday', '08:00:00', '08:45:00', 'دیوان المتنبي', 316, 1, 8, 1);
INSERT INTO `periods` VALUES (2472, 348, 58, 'Friday', '08:45:00', '09:30:00', 'ہدایہ اول', 310, 2, 8, 1);
INSERT INTO `periods` VALUES (2474, 350, 58, 'Friday', '09:45:00', '10:30:00', 'عقیدۃ الطحاویہ', 312, 3, 8, 1);
INSERT INTO `periods` VALUES (2476, 352, 58, 'Friday', '10:30:00', '11:15:00', 'تفسير الجلالين الأول', 314, 4, 8, 1);
INSERT INTO `periods` VALUES (2478, 354, 58, 'Friday', '11:15:00', '12:00:00', 'دیوان المتنبي', 316, 5, 8, 1);
INSERT INTO `periods` VALUES (2480, 356, 60, 'Saturday', '08:00:00', '08:45:00', 'نور الانوار', 320, 1, 8, 1);
INSERT INTO `periods` VALUES (2482, 358, 60, 'Saturday', '08:45:00', '09:30:00', 'تفسير الجلالين الثاني', 322, 2, 8, 1);
INSERT INTO `periods` VALUES (2484, 360, 60, 'Saturday', '09:45:00', '10:30:00', 'مختصر المعاني', 324, 3, 8, 1);
INSERT INTO `periods` VALUES (2486, 354, 60, 'Saturday', '10:30:00', '11:15:00', 'ہدایہ ثالث', 318, 4, 8, 1);
INSERT INTO `periods` VALUES (2488, 356, 60, 'Saturday', '11:15:00', '12:00:00', 'نور الانوار', 320, 5, 8, 1);
INSERT INTO `periods` VALUES (2490, 360, 60, 'Monday', '08:00:00', '08:45:00', 'مختصر المعاني', 324, 1, 8, 1);
INSERT INTO `periods` VALUES (2492, 354, 60, 'Monday', '08:45:00', '09:30:00', 'ہدایہ ثالث', 318, 2, 8, 1);
INSERT INTO `periods` VALUES (2494, 356, 60, 'Monday', '09:45:00', '10:30:00', 'نور الانوار', 320, 3, 8, 1);
INSERT INTO `periods` VALUES (2496, 358, 60, 'Monday', '10:30:00', '11:15:00', 'تفسير الجلالين الثاني', 322, 4, 8, 1);
INSERT INTO `periods` VALUES (2498, 360, 60, 'Monday', '11:15:00', '12:00:00', 'مختصر المعاني', 324, 5, 8, 1);
INSERT INTO `periods` VALUES (2500, 354, 60, 'Tuesday', '08:00:00', '08:45:00', 'ہدایہ ثالث', 318, 1, 8, 1);
INSERT INTO `periods` VALUES (2502, 356, 60, 'Tuesday', '08:45:00', '09:30:00', 'نور الانوار', 320, 2, 8, 1);
INSERT INTO `periods` VALUES (2504, 358, 60, 'Tuesday', '09:45:00', '10:30:00', 'تفسير الجلالين الثاني', 322, 3, 8, 1);
INSERT INTO `periods` VALUES (2506, 360, 60, 'Tuesday', '10:30:00', '11:15:00', 'مختصر المعاني', 324, 4, 8, 1);
INSERT INTO `periods` VALUES (2508, 354, 60, 'Tuesday', '11:15:00', '12:00:00', 'ہدایہ ثالث', 318, 5, 8, 1);
INSERT INTO `periods` VALUES (2510, 358, 60, 'Wednesday', '08:00:00', '08:45:00', 'تفسير الجلالين الثاني', 322, 1, 8, 1);
INSERT INTO `periods` VALUES (2512, 360, 60, 'Wednesday', '08:45:00', '09:30:00', 'مختصر المعاني', 324, 2, 8, 1);
INSERT INTO `periods` VALUES (2514, 354, 60, 'Wednesday', '09:45:00', '10:30:00', 'ہدایہ ثالث', 318, 3, 8, 1);
INSERT INTO `periods` VALUES (2516, 356, 60, 'Wednesday', '10:30:00', '11:15:00', 'نور الانوار', 320, 4, 8, 1);
INSERT INTO `periods` VALUES (2518, 358, 60, 'Wednesday', '11:15:00', '12:00:00', 'تفسير الجلالين الثاني', 322, 5, 8, 1);
INSERT INTO `periods` VALUES (2520, 356, 60, 'Thursday', '08:00:00', '08:45:00', 'نور الانوار', 320, 1, 8, 1);
INSERT INTO `periods` VALUES (2522, 358, 60, 'Thursday', '08:45:00', '09:30:00', 'تفسير الجلالين الثاني', 322, 2, 8, 1);
INSERT INTO `periods` VALUES (2524, 360, 60, 'Thursday', '09:45:00', '10:30:00', 'مختصر المعاني', 324, 3, 8, 1);
INSERT INTO `periods` VALUES (2526, 354, 60, 'Thursday', '10:30:00', '11:15:00', 'ہدایہ ثالث', 318, 4, 8, 1);
INSERT INTO `periods` VALUES (2528, 356, 60, 'Thursday', '11:15:00', '12:00:00', 'نور الانوار', 320, 5, 8, 1);
INSERT INTO `periods` VALUES (2530, 360, 60, 'Friday', '08:00:00', '08:45:00', 'مختصر المعاني', 324, 1, 8, 1);
INSERT INTO `periods` VALUES (2532, 354, 60, 'Friday', '08:45:00', '09:30:00', 'ہدایہ ثالث', 318, 2, 8, 1);
INSERT INTO `periods` VALUES (2534, 356, 60, 'Friday', '09:45:00', '10:30:00', 'نور الانوار', 320, 3, 8, 1);
INSERT INTO `periods` VALUES (2536, 358, 60, 'Friday', '10:30:00', '11:15:00', 'تفسير الجلالين الثاني', 322, 4, 8, 1);
INSERT INTO `periods` VALUES (2538, 360, 60, 'Friday', '11:15:00', '12:00:00', 'مختصر المعاني', 324, 5, 8, 1);
INSERT INTO `periods` VALUES (2540, 362, 62, 'Saturday', '08:00:00', '08:45:00', 'ہدایہ اخیرین', 328, 1, 8, 1);
INSERT INTO `periods` VALUES (2542, 344, 62, 'Saturday', '08:45:00', '09:30:00', 'شرح العقائد النسفیہ', 330, 2, 8, 1);
INSERT INTO `periods` VALUES (2544, 346, 62, 'Saturday', '09:45:00', '10:30:00', 'السراجی فی المیراث', 332, 3, 8, 1);
INSERT INTO `periods` VALUES (2546, 360, 62, 'Saturday', '10:30:00', '11:15:00', 'مشکوۃ المصابیح', 326, 4, 8, 1);
INSERT INTO `periods` VALUES (2548, 362, 62, 'Saturday', '11:15:00', '12:00:00', 'ہدایہ اخیرین', 328, 5, 8, 1);
INSERT INTO `periods` VALUES (2550, 346, 62, 'Monday', '08:00:00', '08:45:00', 'السراجی فی المیراث', 332, 1, 8, 1);
INSERT INTO `periods` VALUES (2552, 360, 62, 'Monday', '08:45:00', '09:30:00', 'مشکوۃ المصابیح', 326, 2, 8, 1);
INSERT INTO `periods` VALUES (2554, 362, 62, 'Monday', '09:45:00', '10:30:00', 'ہدایہ اخیرین', 328, 3, 8, 1);
INSERT INTO `periods` VALUES (2556, 344, 62, 'Monday', '10:30:00', '11:15:00', 'شرح العقائد النسفیہ', 330, 4, 8, 1);
INSERT INTO `periods` VALUES (2558, 346, 62, 'Monday', '11:15:00', '12:00:00', 'السراجی فی المیراث', 332, 5, 8, 1);
INSERT INTO `periods` VALUES (2560, 360, 62, 'Tuesday', '08:00:00', '08:45:00', 'مشکوۃ المصابیح', 326, 1, 8, 1);
INSERT INTO `periods` VALUES (2562, 362, 62, 'Tuesday', '08:45:00', '09:30:00', 'ہدایہ اخیرین', 328, 2, 8, 1);
INSERT INTO `periods` VALUES (2564, 344, 62, 'Tuesday', '09:45:00', '10:30:00', 'شرح العقائد النسفیہ', 330, 3, 8, 1);
INSERT INTO `periods` VALUES (2566, 346, 62, 'Tuesday', '10:30:00', '11:15:00', 'السراجی فی المیراث', 332, 4, 8, 1);
INSERT INTO `periods` VALUES (2568, 360, 62, 'Tuesday', '11:15:00', '12:00:00', 'مشکوۃ المصابیح', 326, 5, 8, 1);
INSERT INTO `periods` VALUES (2570, 344, 62, 'Wednesday', '08:00:00', '08:45:00', 'شرح العقائد النسفیہ', 330, 1, 8, 1);
INSERT INTO `periods` VALUES (2572, 346, 62, 'Wednesday', '08:45:00', '09:30:00', 'السراجی فی المیراث', 332, 2, 8, 1);
INSERT INTO `periods` VALUES (2574, 360, 62, 'Wednesday', '09:45:00', '10:30:00', 'مشکوۃ المصابیح', 326, 3, 8, 1);
INSERT INTO `periods` VALUES (2576, 362, 62, 'Wednesday', '10:30:00', '11:15:00', 'ہدایہ اخیرین', 328, 4, 8, 1);
INSERT INTO `periods` VALUES (2578, 344, 62, 'Wednesday', '11:15:00', '12:00:00', 'شرح العقائد النسفیہ', 330, 5, 8, 1);
INSERT INTO `periods` VALUES (2580, 362, 62, 'Thursday', '08:00:00', '08:45:00', 'ہدایہ اخیرین', 328, 1, 8, 1);
INSERT INTO `periods` VALUES (2582, 344, 62, 'Thursday', '08:45:00', '09:30:00', 'شرح العقائد النسفیہ', 330, 2, 8, 1);
INSERT INTO `periods` VALUES (2584, 346, 62, 'Thursday', '09:45:00', '10:30:00', 'السراجی فی المیراث', 332, 3, 8, 1);
INSERT INTO `periods` VALUES (2586, 360, 62, 'Thursday', '10:30:00', '11:15:00', 'مشکوۃ المصابیح', 326, 4, 8, 1);
INSERT INTO `periods` VALUES (2588, 362, 62, 'Thursday', '11:15:00', '12:00:00', 'ہدایہ اخیرین', 328, 5, 8, 1);
INSERT INTO `periods` VALUES (2590, 346, 62, 'Friday', '08:00:00', '08:45:00', 'السراجی فی المیراث', 332, 1, 8, 1);
INSERT INTO `periods` VALUES (2592, 360, 62, 'Friday', '08:45:00', '09:30:00', 'مشکوۃ المصابیح', 326, 2, 8, 1);
INSERT INTO `periods` VALUES (2594, 362, 62, 'Friday', '09:45:00', '10:30:00', 'ہدایہ اخیرین', 328, 3, 8, 1);
INSERT INTO `periods` VALUES (2596, 344, 62, 'Friday', '10:30:00', '11:15:00', 'شرح العقائد النسفیہ', 330, 4, 8, 1);
INSERT INTO `periods` VALUES (2598, 346, 62, 'Friday', '11:15:00', '12:00:00', 'السراجی فی المیراث', 332, 5, 8, 1);
INSERT INTO `periods` VALUES (2600, 352, 64, 'Saturday', '08:00:00', '08:45:00', 'سنن أبي داود', 340, 1, 8, 1);
INSERT INTO `periods` VALUES (2602, 354, 64, 'Saturday', '08:45:00', '09:30:00', 'سنن النسائي', 342, 2, 8, 1);
INSERT INTO `periods` VALUES (2604, 356, 64, 'Saturday', '09:45:00', '10:30:00', 'سنن ابن ماجہ', 344, 3, 8, 1);
INSERT INTO `periods` VALUES (2606, 346, 64, 'Saturday', '10:30:00', '11:15:00', 'صحيح البخاري', 334, 4, 8, 1);
INSERT INTO `periods` VALUES (2608, 348, 64, 'Saturday', '11:15:00', '12:00:00', 'صحيح مسلم', 336, 5, 8, 1);
INSERT INTO `periods` VALUES (2610, 348, 64, 'Monday', '08:00:00', '08:45:00', 'صحيح مسلم', 336, 1, 8, 1);
INSERT INTO `periods` VALUES (2612, 350, 64, 'Monday', '08:45:00', '09:30:00', 'جامع الترمذي', 338, 2, 8, 1);
INSERT INTO `periods` VALUES (2614, 352, 64, 'Monday', '09:45:00', '10:30:00', 'سنن أبي داود', 340, 3, 8, 1);
INSERT INTO `periods` VALUES (2616, 354, 64, 'Monday', '10:30:00', '11:15:00', 'سنن النسائي', 342, 4, 8, 1);
INSERT INTO `periods` VALUES (2618, 356, 64, 'Monday', '11:15:00', '12:00:00', 'سنن ابن ماجہ', 344, 5, 8, 1);
INSERT INTO `periods` VALUES (2620, 350, 64, 'Tuesday', '08:00:00', '08:45:00', 'جامع الترمذي', 338, 1, 8, 1);
INSERT INTO `periods` VALUES (2622, 352, 64, 'Tuesday', '08:45:00', '09:30:00', 'سنن أبي داود', 340, 2, 8, 1);
INSERT INTO `periods` VALUES (2624, 354, 64, 'Tuesday', '09:45:00', '10:30:00', 'سنن النسائي', 342, 3, 8, 1);
INSERT INTO `periods` VALUES (2626, 356, 64, 'Tuesday', '10:30:00', '11:15:00', 'سنن ابن ماجہ', 344, 4, 8, 1);
INSERT INTO `periods` VALUES (2628, 346, 64, 'Tuesday', '11:15:00', '12:00:00', 'صحيح البخاري', 334, 5, 8, 1);
INSERT INTO `periods` VALUES (2630, 354, 64, 'Wednesday', '08:00:00', '08:45:00', 'سنن النسائي', 342, 1, 8, 1);
INSERT INTO `periods` VALUES (2632, 356, 64, 'Wednesday', '08:45:00', '09:30:00', 'سنن ابن ماجہ', 344, 2, 8, 1);
INSERT INTO `periods` VALUES (2634, 346, 64, 'Wednesday', '09:45:00', '10:30:00', 'صحيح البخاري', 334, 3, 8, 1);
INSERT INTO `periods` VALUES (2636, 348, 64, 'Wednesday', '10:30:00', '11:15:00', 'صحيح مسلم', 336, 4, 8, 1);
INSERT INTO `periods` VALUES (2638, 350, 64, 'Wednesday', '11:15:00', '12:00:00', 'جامع الترمذي', 338, 5, 8, 1);
INSERT INTO `periods` VALUES (2640, 352, 64, 'Thursday', '08:00:00', '08:45:00', 'سنن أبي داود', 340, 1, 8, 1);
INSERT INTO `periods` VALUES (2642, 354, 64, 'Thursday', '08:45:00', '09:30:00', 'سنن النسائي', 342, 2, 8, 1);
INSERT INTO `periods` VALUES (2644, 356, 64, 'Thursday', '09:45:00', '10:30:00', 'سنن ابن ماجہ', 344, 3, 8, 1);
INSERT INTO `periods` VALUES (2646, 346, 64, 'Thursday', '10:30:00', '11:15:00', 'صحيح البخاري', 334, 4, 8, 1);
INSERT INTO `periods` VALUES (2648, 348, 64, 'Thursday', '11:15:00', '12:00:00', 'صحيح مسلم', 336, 5, 8, 1);
INSERT INTO `periods` VALUES (2650, 348, 64, 'Friday', '08:00:00', '08:45:00', 'صحيح مسلم', 336, 1, 8, 1);
INSERT INTO `periods` VALUES (2652, 350, 64, 'Friday', '08:45:00', '09:30:00', 'جامع الترمذي', 338, 2, 8, 1);
INSERT INTO `periods` VALUES (2654, 352, 64, 'Friday', '09:45:00', '10:30:00', 'سنن أبي داود', 340, 3, 8, 1);
INSERT INTO `periods` VALUES (2656, 354, 64, 'Friday', '10:30:00', '11:15:00', 'سنن النسائي', 342, 4, 8, 1);
INSERT INTO `periods` VALUES (2658, 356, 64, 'Friday', '11:15:00', '12:00:00', 'سنن ابن ماجہ', 344, 5, 8, 1);

-- ----------------------------
-- Table structure for questions
-- ----------------------------
DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `paper_id` int NULL DEFAULT NULL,
  `question_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `marks` int NOT NULL,
  `section` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'A',
  `tenant_id` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `paper_id`(`paper_id` ASC) USING BTREE,
  INDEX `questions_tenant_fk`(`tenant_id` ASC) USING BTREE,
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`paper_id`) REFERENCES `exam_papers` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `questions_tenant_fk` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 66 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of questions
-- ----------------------------
INSERT INTO `questions` VALUES (2, 4, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (4, 4, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);
INSERT INTO `questions` VALUES (6, 6, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (8, 8, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (10, 6, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);
INSERT INTO `questions` VALUES (12, 8, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);
INSERT INTO `questions` VALUES (14, 10, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (16, 12, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (18, 10, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);
INSERT INTO `questions` VALUES (20, 12, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);
INSERT INTO `questions` VALUES (22, 14, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (24, 16, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (26, 14, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);
INSERT INTO `questions` VALUES (28, 16, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);
INSERT INTO `questions` VALUES (30, 18, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (32, 18, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);
INSERT INTO `questions` VALUES (34, 20, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (36, 20, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);
INSERT INTO `questions` VALUES (38, 22, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (40, 22, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);
INSERT INTO `questions` VALUES (42, 24, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (44, 24, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);
INSERT INTO `questions` VALUES (46, 26, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (48, 28, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (50, 26, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);
INSERT INTO `questions` VALUES (52, 28, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);
INSERT INTO `questions` VALUES (54, 30, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (56, 30, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);
INSERT INTO `questions` VALUES (58, 32, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (60, 32, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);
INSERT INTO `questions` VALUES (62, 34, 'سوال 1: تفصیل سے بیان کریں', 40, 'الف', 1);
INSERT INTO `questions` VALUES (64, 34, 'سوال 2: مختصر جواب دیں', 60, 'ب', 1);

-- ----------------------------
-- Table structure for role_permissions
-- ----------------------------
DROP TABLE IF EXISTS `role_permissions`;
CREATE TABLE `role_permissions`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `function_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `allowed` tinyint(1) NULL DEFAULT 0,
  `tenant_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_role_function_per_tenant`(`tenant_id` ASC, `role` ASC, `function_name` ASC) USING BTREE,
  CONSTRAINT `fk_role_permissions_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 803 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role_permissions
-- ----------------------------
INSERT INTO `role_permissions` VALUES (6, 'عريف', 'reports', 1, 2);
INSERT INTO `role_permissions` VALUES (16, 'عريف', 'books_manage', 0, 2);
INSERT INTO `role_permissions` VALUES (26, 'عريف', 'users_manage', 0, 2);
INSERT INTO `role_permissions` VALUES (36, 'عريف', 'students_manage', 1, 2);
INSERT INTO `role_permissions` VALUES (46, 'عريف', 'student_attendance', 1, 2);
INSERT INTO `role_permissions` VALUES (56, 'عريف', 'teachers_manage', 0, 2);
INSERT INTO `role_permissions` VALUES (66, 'عريف', 'teacher_attendance', 1, 2);
INSERT INTO `role_permissions` VALUES (76, 'عريف', 'teacher_books_manage', 0, 2);
INSERT INTO `role_permissions` VALUES (86, 'عريف', 'periods_manage', 0, 2);
INSERT INTO `role_permissions` VALUES (1164, 'مدير', 'view_dashboard', 1, 2);
INSERT INTO `role_permissions` VALUES (1166, 'مدير', 'manage_classes', 1, 2);
INSERT INTO `role_permissions` VALUES (1168, 'مدير', 'manage_teachers', 1, 2);
INSERT INTO `role_permissions` VALUES (1170, 'مدير', 'manage_students', 1, 2);
INSERT INTO `role_permissions` VALUES (1172, 'مدير', 'manage_attendance', 1, 2);
INSERT INTO `role_permissions` VALUES (1174, 'مدير', 'manage_exams', 1, 2);
INSERT INTO `role_permissions` VALUES (1176, 'مدير', 'manage_users', 1, 2);
INSERT INTO `role_permissions` VALUES (1178, 'مدير', 'manage_system', 1, 2);

-- ----------------------------
-- Table structure for schema_history
-- ----------------------------
DROP TABLE IF EXISTS `schema_history`;
CREATE TABLE `schema_history`  (
  `version` int NOT NULL,
  `script_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `applied_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`version`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `schema_history` VALUES (12, 'V12__add_class_id_to_attendance_teachers.sql', '2026-06-14 13:39:55');
INSERT INTO `schema_history` VALUES (13, 'V13__multi_tenant_redesign.sql', '2026-06-14 13:39:59');
INSERT INTO `schema_history` VALUES (14, 'V14__Student_Detail_Fields.sql', '2026-06-16 14:14:29');
INSERT INTO `schema_history` VALUES (15, 'V15__Exams_and_Papers.sql', '2026-07-16 04:48:10');
INSERT INTO `schema_history` VALUES (16, 'V16__Add_Tenant_To_Exams.sql', '2026-07-16 05:04:06');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_active` tinyint(1) NULL DEFAULT 0,
  `tenant_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_sessions_tenant`(`tenant_id` ASC) USING BTREE,
  CONSTRAINT `fk_sessions_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES (2, '2026-2027', 1, 2);
INSERT INTO `sessions` VALUES (6, '2026-2027', 1, 1);
INSERT INTO `sessions` VALUES (8, '2026-2027', 1, 1);
INSERT INTO `sessions` VALUES (10, '2026-2027', 1, 2);
INSERT INTO `sessions` VALUES (12, '2026-2027', 1, 1);

-- ----------------------------
-- Table structure for student_enrollments
-- ----------------------------
DROP TABLE IF EXISTS `student_enrollments`;
CREATE TABLE `student_enrollments`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `class_id` int NOT NULL,
  `session_id` int NOT NULL,
  `tenant_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `student_session`(`student_id` ASC, `session_id` ASC) USING BTREE,
  INDEX `fk_enrollments_class`(`class_id` ASC) USING BTREE,
  INDEX `fk_enrollments_session`(`session_id` ASC) USING BTREE,
  INDEX `fk_student_enrollments_tenant`(`tenant_id` ASC) USING BTREE,
  CONSTRAINT `fk_enrollments_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_enrollments_session` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_enrollments_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_student_enrollments_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 520 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of student_enrollments
-- ----------------------------
INSERT INTO `student_enrollments` VALUES (2, 10, 4, 2, 2);
INSERT INTO `student_enrollments` VALUES (4, 16, 4, 2, 2);
INSERT INTO `student_enrollments` VALUES (6, 18, 4, 2, 2);
INSERT INTO `student_enrollments` VALUES (8, 20, 4, 2, 2);
INSERT INTO `student_enrollments` VALUES (10, 32, 4, 2, 2);
INSERT INTO `student_enrollments` VALUES (12, 6, 10, 2, 2);
INSERT INTO `student_enrollments` VALUES (14, 8, 10, 2, 2);
INSERT INTO `student_enrollments` VALUES (16, 1, 12, 2, 2);
INSERT INTO `student_enrollments` VALUES (18, 2, 12, 2, 2);
INSERT INTO `student_enrollments` VALUES (20, 3, 12, 2, 2);
INSERT INTO `student_enrollments` VALUES (22, 4, 12, 2, 2);
INSERT INTO `student_enrollments` VALUES (24, 5, 12, 2, 2);
INSERT INTO `student_enrollments` VALUES (26, 22, 16, 2, 2);
INSERT INTO `student_enrollments` VALUES (28, 24, 16, 2, 2);
INSERT INTO `student_enrollments` VALUES (30, 26, 16, 2, 2);
INSERT INTO `student_enrollments` VALUES (34, 30, 16, 2, 2);
INSERT INTO `student_enrollments` VALUES (196, 194, 34, 6, 1);
INSERT INTO `student_enrollments` VALUES (198, 196, 34, 6, 1);
INSERT INTO `student_enrollments` VALUES (356, 354, 50, 8, 1);
INSERT INTO `student_enrollments` VALUES (456, 454, 60, 8, 1);
INSERT INTO `student_enrollments` VALUES (518, 514, 4, 2, 2);

-- ----------------------------
-- Table structure for student_question_marks
-- ----------------------------
DROP TABLE IF EXISTS `student_question_marks`;
CREATE TABLE `student_question_marks`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `result_id` int NULL DEFAULT NULL,
  `question_id` int NULL DEFAULT NULL,
  `obtained_marks` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `result_question`(`result_id` ASC, `question_id` ASC) USING BTREE,
  INDEX `question_id`(`question_id` ASC) USING BTREE,
  CONSTRAINT `student_question_marks_ibfk_1` FOREIGN KEY (`result_id`) REFERENCES `student_results` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `student_question_marks_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student_question_marks
-- ----------------------------

-- ----------------------------
-- Table structure for student_results
-- ----------------------------
DROP TABLE IF EXISTS `student_results`;
CREATE TABLE `student_results`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `paper_id` int NULL DEFAULT NULL,
  `student_id` int NULL DEFAULT NULL,
  `total_marks` int NOT NULL DEFAULT 100,
  `obtained_marks` int NOT NULL,
  `status` enum('draft','final') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'draft',
  `marked_by` int NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tenant_id` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `student_paper`(`student_id` ASC, `paper_id` ASC) USING BTREE,
  INDEX `paper_id`(`paper_id` ASC) USING BTREE,
  INDEX `marked_by`(`marked_by` ASC) USING BTREE,
  INDEX `student_results_tenant_fk`(`tenant_id` ASC) USING BTREE,
  CONSTRAINT `student_results_ibfk_1` FOREIGN KEY (`paper_id`) REFERENCES `exam_papers` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `student_results_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `student_results_ibfk_3` FOREIGN KEY (`marked_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `student_results_tenant_fk` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 322 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student_results
-- ----------------------------
INSERT INTO `student_results` VALUES (2, 4, 836, 100, 76, 'final', 1370, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (4, 4, 838, 100, 44, 'final', 1370, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (6, 4, 842, 100, 82, 'final', 1370, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (8, 4, 844, 100, 42, 'final', 1370, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (10, 4, 850, 100, 46, 'final', 1370, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (12, 4, 854, 100, 100, 'final', 1370, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (14, 4, 856, 100, 62, 'final', 1370, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (16, 4, 860, 100, 70, 'final', 1370, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (18, 4, 864, 100, 78, 'final', 1370, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (20, 4, 868, 100, 41, 'final', 1370, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (22, 6, 840, 100, 60, 'final', 1376, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (24, 8, 872, 100, 64, 'final', 1378, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (26, 6, 846, 100, 54, 'final', 1376, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (28, 8, 876, 100, 80, 'final', 1378, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (30, 6, 848, 100, 84, 'final', 1376, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (32, 8, 880, 100, 96, 'final', 1378, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (34, 8, 884, 100, 82, 'final', 1378, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (36, 6, 852, 100, 85, 'final', 1376, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (38, 8, 888, 100, 61, 'final', 1378, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (40, 6, 858, 100, 85, 'final', 1376, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (42, 6, 862, 100, 64, 'final', 1376, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (44, 8, 892, 100, 76, 'final', 1378, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (46, 6, 866, 100, 71, 'final', 1376, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (48, 8, 896, 100, 72, 'final', 1378, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (50, 6, 870, 100, 44, 'final', 1376, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (52, 8, 900, 100, 81, 'final', 1378, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (54, 6, 874, 100, 94, 'final', 1376, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (56, 8, 904, 100, 62, 'final', 1378, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (58, 6, 878, 100, 49, 'final', 1376, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (60, 8, 908, 100, 90, 'final', 1378, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (62, 10, 882, 100, 84, 'final', 1388, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (64, 12, 912, 100, 42, 'final', 1390, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (66, 10, 886, 100, 73, 'final', 1388, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (68, 12, 916, 100, 53, 'final', 1390, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (70, 10, 890, 100, 54, 'final', 1388, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (72, 12, 920, 100, 70, 'final', 1390, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (74, 10, 894, 100, 35, 'final', 1388, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (76, 12, 924, 100, 88, 'final', 1390, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (78, 10, 898, 100, 82, 'final', 1388, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (80, 12, 928, 100, 38, 'final', 1390, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (82, 10, 902, 100, 91, 'final', 1388, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (84, 12, 932, 100, 65, 'final', 1390, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (86, 10, 906, 100, 74, 'final', 1388, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (88, 12, 936, 100, 55, 'final', 1390, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (90, 10, 910, 100, 45, 'final', 1388, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (92, 12, 940, 100, 86, 'final', 1390, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (94, 10, 914, 100, 37, 'final', 1388, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (96, 12, 944, 100, 88, 'final', 1390, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (98, 10, 918, 100, 51, 'final', 1388, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (100, 12, 948, 100, 97, 'final', 1390, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (102, 14, 922, 100, 60, 'final', 1400, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (104, 16, 952, 100, 40, 'final', 1402, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (106, 14, 926, 100, 52, 'final', 1400, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (108, 16, 956, 100, 73, 'final', 1402, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (110, 14, 930, 100, 96, 'final', 1400, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (112, 16, 960, 100, 41, 'final', 1402, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (114, 14, 934, 100, 61, 'final', 1400, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (116, 16, 964, 100, 40, 'final', 1402, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (118, 14, 938, 100, 65, 'final', 1400, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (120, 16, 968, 100, 81, 'final', 1402, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (122, 14, 942, 100, 91, 'final', 1400, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (124, 16, 972, 100, 100, 'final', 1402, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (126, 14, 946, 100, 88, 'final', 1400, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (128, 16, 976, 100, 96, 'final', 1402, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (130, 14, 950, 100, 40, 'final', 1400, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (132, 16, 980, 100, 82, 'final', 1402, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (134, 14, 954, 100, 66, 'final', 1400, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (136, 16, 984, 100, 44, 'final', 1402, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (138, 14, 958, 100, 38, 'final', 1400, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (140, 16, 988, 100, 57, 'final', 1402, '2026-07-16 04:56:02', 1);
INSERT INTO `student_results` VALUES (142, 18, 962, 100, 57, 'final', 1410, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (144, 18, 966, 100, 100, 'final', 1410, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (146, 20, 992, 100, 94, 'final', 1374, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (148, 18, 970, 100, 63, 'final', 1410, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (150, 20, 996, 100, 45, 'final', 1374, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (152, 18, 974, 100, 87, 'final', 1410, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (154, 20, 1000, 100, 92, 'final', 1374, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (156, 18, 978, 100, 62, 'final', 1410, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (158, 20, 1004, 100, 92, 'final', 1374, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (160, 18, 982, 100, 73, 'final', 1410, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (162, 20, 1008, 100, 40, 'final', 1374, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (164, 18, 986, 100, 99, 'final', 1410, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (166, 20, 1012, 100, 59, 'final', 1374, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (168, 18, 990, 100, 83, 'final', 1410, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (170, 20, 1016, 100, 76, 'final', 1374, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (172, 18, 994, 100, 72, 'final', 1410, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (174, 20, 1020, 100, 77, 'final', 1374, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (176, 18, 998, 100, 52, 'final', 1410, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (178, 20, 1024, 100, 95, 'final', 1374, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (180, 20, 1028, 100, 90, 'final', 1374, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (182, 22, 1002, 100, 50, 'final', 1384, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (184, 22, 1006, 100, 69, 'final', 1384, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (186, 24, 1034, 100, 99, 'final', 1386, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (188, 22, 1010, 100, 50, 'final', 1384, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (190, 24, 1038, 100, 76, 'final', 1386, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (192, 22, 1014, 100, 84, 'final', 1384, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (194, 24, 1042, 100, 39, 'final', 1386, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (196, 22, 1018, 100, 74, 'final', 1384, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (198, 24, 1046, 100, 75, 'final', 1386, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (200, 22, 1022, 100, 36, 'final', 1384, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (202, 24, 1050, 100, 67, 'final', 1386, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (204, 22, 1026, 100, 77, 'final', 1384, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (206, 24, 1054, 100, 59, 'final', 1386, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (208, 22, 1030, 100, 63, 'final', 1384, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (210, 24, 1058, 100, 86, 'final', 1386, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (212, 22, 1032, 100, 53, 'final', 1384, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (214, 24, 1062, 100, 75, 'final', 1386, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (216, 24, 1066, 100, 45, 'final', 1386, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (218, 22, 1036, 100, 46, 'final', 1384, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (220, 24, 1070, 100, 58, 'final', 1386, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (222, 26, 1040, 100, 95, 'final', 1396, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (224, 28, 1074, 100, 52, 'final', 1398, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (226, 26, 1044, 100, 97, 'final', 1396, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (228, 28, 1078, 100, 40, 'final', 1398, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (230, 26, 1048, 100, 77, 'final', 1396, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (232, 28, 1082, 100, 75, 'final', 1398, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (234, 26, 1052, 100, 99, 'final', 1396, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (236, 28, 1086, 100, 49, 'final', 1398, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (238, 26, 1056, 100, 62, 'final', 1396, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (240, 28, 1090, 100, 54, 'final', 1398, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (242, 26, 1060, 100, 76, 'final', 1396, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (244, 28, 1094, 100, 98, 'final', 1398, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (246, 26, 1064, 100, 64, 'final', 1396, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (248, 28, 1098, 100, 70, 'final', 1398, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (250, 26, 1068, 100, 47, 'final', 1396, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (252, 28, 1102, 100, 64, 'final', 1398, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (254, 26, 1072, 100, 98, 'final', 1396, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (256, 28, 1106, 100, 62, 'final', 1398, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (258, 26, 1076, 100, 54, 'final', 1396, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (260, 28, 1110, 100, 87, 'final', 1398, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (262, 30, 1080, 100, 89, 'final', 1408, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (264, 30, 1084, 100, 37, 'final', 1408, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (266, 32, 1114, 100, 57, 'final', 1372, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (268, 30, 1088, 100, 64, 'final', 1408, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (270, 32, 1118, 100, 62, 'final', 1372, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (272, 30, 1092, 100, 51, 'final', 1408, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (274, 32, 1122, 100, 90, 'final', 1372, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (276, 30, 1096, 100, 82, 'final', 1408, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (278, 32, 1126, 100, 36, 'final', 1372, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (280, 30, 1100, 100, 100, 'final', 1408, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (282, 32, 1130, 100, 67, 'final', 1372, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (284, 30, 1104, 100, 45, 'final', 1408, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (286, 32, 1134, 100, 86, 'final', 1372, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (288, 30, 1108, 100, 93, 'final', 1408, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (290, 32, 1138, 100, 37, 'final', 1372, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (292, 30, 1112, 100, 88, 'final', 1408, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (294, 32, 1142, 100, 39, 'final', 1372, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (296, 30, 1116, 100, 47, 'final', 1408, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (298, 32, 1146, 100, 75, 'final', 1372, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (300, 32, 1150, 100, 38, 'final', 1372, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (302, 34, 1120, 100, 57, 'final', 1380, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (304, 34, 1124, 100, 50, 'final', 1380, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (306, 34, 1128, 100, 56, 'final', 1380, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (308, 34, 1132, 100, 60, 'final', 1380, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (310, 34, 1136, 100, 44, 'final', 1380, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (312, 34, 1140, 100, 81, 'final', 1380, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (314, 34, 1144, 100, 43, 'final', 1380, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (316, 34, 1148, 100, 90, 'final', 1380, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (318, 34, 1152, 100, 42, 'final', 1380, '2026-07-16 04:56:03', 1);
INSERT INTO `student_results` VALUES (320, 34, 1154, 100, 99, 'final', 1380, '2026-07-16 04:56:03', 1);

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
  `tenant_id` int NOT NULL,
  `admission_year` int NULL DEFAULT NULL,
  `dob` date NULL DEFAULT NULL,
  `father_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `current_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `permanent_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `cnic` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `identification_mark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `guardian_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `guardian_father_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `guardian_relationship` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `guardian_cnic` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `guardian_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `guardian_mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `religious_education` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `religious_institution` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `contemporary_education` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `contemporary_board` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `photo_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '/images/default_student.png',
  `is_wifaq_registered` tinyint(1) NULL DEFAULT 0,
  `wifaq_reg_number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `previous_madrasa_details` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `referral_source` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_roll_number_per_tenant`(`tenant_id` ASC, `roll_number` ASC) USING BTREE,
  INDEX `class_id`(`class_id` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `fk_students_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `students_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 516 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES (1, 'خرم شہزاد', 12, 'S-26-1001', 30, 2, 2020, '1981-04-04', 'شوکت حسین', 'گھر نمبر 1442، گلی نمبر 18، سیکٹر I-10/1، اسلام آباد', 'گھر نمبر 1442، گلی نمبر 18، سیکٹر I-10/1، اسلام آباد', '37405-6213817-7', NULL, '033352920645', '033352920645', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ایم ایس کمپیوٹر سائنس', 'NUST', '/uploads/students/student-1781612276853-106184614.jpg', 0, NULL, NULL, 'Personal');
INSERT INTO `students` VALUES (2, 'کمال محمر', 12, 'S-26-1002', 32, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (3, 'محمد عبداللہ', 12, 'S-26-1003', 34, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (4, 'بسام ارشاد', 12, 'S-26-1004', 36, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (5, 'خالد رشید کاظمی', 12, 'S-26-1005', 38, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (6, 'زبیر اسلام', 10, 'S-26-1006', 40, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (8, 'محمد عمران انصاری', 10, 'S-26-1008', 42, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (10, 'عبدالله جليل', 4, 'S-26-1010', 44, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (16, 'ظفر اقبال مغل', 4, 'S-26-1016', 48, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (18, 'عطاء الرحمن', 4, 'S-26-1018', 50, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (20, 'محمد عبيد الله ', 4, 'S-26-1020', 52, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (22, 'عمر فاروق', 16, 'S-26-1022', 54, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (24, 'مشتاق احمد', 16, 'S-26-1024', 56, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (26, 'عارف احمد', 16, 'S-26-1026', 58, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (30, 'کاشف الرحمن', 16, 'S-26-1030', 62, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (32, 'محمد عبداللہ ', 4, 'S-26-1032', 192, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (194, 'محمد خان', 34, 'S-26-3410', 646, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (196, 'عمر علوی', 34, 'S-26-3411', 648, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (354, 'محمد خان', 50, 'S-26-5010', 832, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (454, 'اسامہ خان', 60, 'S-26-6010', 932, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);
INSERT INTO `students` VALUES (514, 'محمد نفيس', 4, 'S-26-1514', 992, 2, 2026, '2003-03-03', 'Tahseel janan', 'Gungal Rawalpindi ', 'Mel Hassan kheil dakhna khas warana Ahmed Abad tahseel takhte nasrate zilah karak', '1420375046705', NULL, NULL, '03488282911', NULL, 'Tahseel janan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/images/default_student.png', 0, NULL, NULL, NULL);

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
  `tenant_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `teacher_id`(`teacher_id` ASC) USING BTREE,
  INDEX `book_id`(`book_id` ASC) USING BTREE,
  INDEX `session_id`(`session_id` ASC) USING BTREE,
  INDEX `class_id`(`class_id` ASC) USING BTREE,
  INDEX `fk_teacher_books_tenant`(`tenant_id` ASC) USING BTREE,
  CONSTRAINT `fk_teacher_books_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `teacher_books_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `teacher_books_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `teacher_books_ibfk_3` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `teacher_books_ibfk_4` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 345 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of teacher_books
-- ----------------------------
INSERT INTO `teacher_books` VALUES (10, 286, 10, 2, 587, 611, 588, 4, NULL, 2);
INSERT INTO `teacher_books` VALUES (12, 286, 12, 2, 1, 78, 14, 4, NULL, 2);
INSERT INTO `teacher_books` VALUES (16, 288, 16, 2, 319, 430, 374, 10, NULL, 2);
INSERT INTO `teacher_books` VALUES (26, 292, 26, 2, 206, 311, 258, 12, NULL, 2);
INSERT INTO `teacher_books` VALUES (42, 300, 36, 2, 1, 500, 1, 16, NULL, 2);
INSERT INTO `teacher_books` VALUES (56, 286, 50, 2, 1, 100, 20, 4, NULL, 2);
INSERT INTO `teacher_books` VALUES (58, 302, 52, 2, 1, 187, 59, 4, NULL, 2);
INSERT INTO `teacher_books` VALUES (60, 290, 54, 2, 1, 518, 84, 4, NULL, 2);
INSERT INTO `teacher_books` VALUES (66, 292, 56, 2, 1, 100, 57, 10, NULL, 2);
INSERT INTO `teacher_books` VALUES (68, 294, 58, 2, 1, 404, 102, 10, NULL, 2);
INSERT INTO `teacher_books` VALUES (70, 286, 60, 2, 1, 100, 23, 10, NULL, 2);
INSERT INTO `teacher_books` VALUES (72, 290, 62, 2, 1, 100, 36, 10, NULL, 2);
INSERT INTO `teacher_books` VALUES (74, 290, 64, 2, 1, 322, 11, 10, NULL, 2);
INSERT INTO `teacher_books` VALUES (76, 282, 66, 2, 1, 131, 58, 10, NULL, 2);
INSERT INTO `teacher_books` VALUES (78, 286, 68, 2, 1, 100, 31, 10, NULL, 2);
INSERT INTO `teacher_books` VALUES (80, 284, 70, 2, 520, 970, 575, 12, NULL, 2);
INSERT INTO `teacher_books` VALUES (84, 294, 74, 2, 1, 145, 16, 12, NULL, 2);
INSERT INTO `teacher_books` VALUES (86, 284, 76, 2, 1, 186, 1, 12, NULL, 2);
INSERT INTO `teacher_books` VALUES (88, 282, 72, 2, 1, 240, 36, 12, NULL, 2);
INSERT INTO `teacher_books` VALUES (90, 288, 80, 2, 1, 902, 37, 12, NULL, 2);
INSERT INTO `teacher_books` VALUES (92, 290, 82, 2, 1, 247, 39, 12, NULL, 2);
INSERT INTO `teacher_books` VALUES (96, 294, 86, 2, 1, 557, 132, 16, NULL, 2);
INSERT INTO `teacher_books` VALUES (98, 290, 88, 2, 1, 1106, 87, 16, NULL, 2);
INSERT INTO `teacher_books` VALUES (100, 292, 90, 2, 1, 1040, 314, 16, NULL, 2);
INSERT INTO `teacher_books` VALUES (102, 284, 92, 2, 1, 1084, 84, 16, NULL, 2);
INSERT INTO `teacher_books` VALUES (104, 288, 94, 2, 1, 645, 143, 16, NULL, 2);
INSERT INTO `teacher_books` VALUES (106, 298, 96, 2, 1, 793, 137, 16, NULL, 2);
INSERT INTO `teacher_books` VALUES (110, 296, 78, 2, 240, 480, 281, 12, NULL, 2);
INSERT INTO `teacher_books` VALUES (112, 298, 42, 2, 1, 44, 1, 4, NULL, 2);
INSERT INTO `teacher_books` VALUES (114, 282, 28, 2, 1, 1041, 396, 16, NULL, 2);
INSERT INTO `teacher_books` VALUES (124, 284, 98, 2, 1, 200, 24, 4, NULL, 2);
INSERT INTO `teacher_books` VALUES (130, 296, 100, 2, 1, 1858, 653, 16, NULL, 2);
INSERT INTO `teacher_books` VALUES (136, 292, 24, 2, 1, 250, 55, 4, NULL, 2);
INSERT INTO `teacher_books` VALUES (140, 298, 32, 2, 1, 500, 106, 4, NULL, 2);
INSERT INTO `teacher_books` VALUES (210, 324, 172, 6, 1, 300, 123, 34, NULL, 1);
INSERT INTO `teacher_books` VALUES (212, 326, 174, 6, 1, 300, 113, 34, NULL, 1);
INSERT INTO `teacher_books` VALUES (214, 328, 176, 6, 1, 300, 199, 34, NULL, 1);
INSERT INTO `teacher_books` VALUES (216, 330, 178, 6, 1, 300, 189, 34, NULL, 1);
INSERT INTO `teacher_books` VALUES (218, 330, 180, 6, 1, 300, 95, 36, NULL, 1);
INSERT INTO `teacher_books` VALUES (220, 332, 182, 6, 1, 300, 85, 36, NULL, 1);
INSERT INTO `teacher_books` VALUES (222, 334, 184, 6, 1, 300, 171, 36, NULL, 1);
INSERT INTO `teacher_books` VALUES (224, 336, 186, 6, 1, 300, 161, 36, NULL, 1);
INSERT INTO `teacher_books` VALUES (226, 336, 188, 6, 1, 300, 247, 38, NULL, 1);
INSERT INTO `teacher_books` VALUES (228, 338, 190, 6, 1, 300, 57, 38, NULL, 1);
INSERT INTO `teacher_books` VALUES (230, 340, 192, 6, 1, 300, 143, 38, NULL, 1);
INSERT INTO `teacher_books` VALUES (232, 342, 194, 6, 1, 300, 133, 38, NULL, 1);
INSERT INTO `teacher_books` VALUES (234, 342, 196, 6, 1, 300, 219, 40, NULL, 1);
INSERT INTO `teacher_books` VALUES (236, 324, 198, 6, 1, 300, 209, 40, NULL, 1);
INSERT INTO `teacher_books` VALUES (238, 326, 200, 6, 1, 300, 115, 40, NULL, 1);
INSERT INTO `teacher_books` VALUES (240, 328, 202, 6, 1, 300, 105, 40, NULL, 1);
INSERT INTO `teacher_books` VALUES (242, 328, 204, 6, 1, 300, 191, 42, NULL, 1);
INSERT INTO `teacher_books` VALUES (244, 330, 206, 6, 1, 300, 181, 42, NULL, 1);
INSERT INTO `teacher_books` VALUES (246, 332, 208, 6, 1, 300, 267, 42, NULL, 1);
INSERT INTO `teacher_books` VALUES (248, 334, 210, 6, 1, 300, 77, 42, NULL, 1);
INSERT INTO `teacher_books` VALUES (250, 334, 212, 6, 1, 300, 163, 44, NULL, 1);
INSERT INTO `teacher_books` VALUES (252, 336, 214, 6, 1, 300, 153, 44, NULL, 1);
INSERT INTO `teacher_books` VALUES (254, 338, 216, 6, 1, 300, 239, 44, NULL, 1);
INSERT INTO `teacher_books` VALUES (256, 340, 218, 6, 1, 300, 49, 44, NULL, 1);
INSERT INTO `teacher_books` VALUES (258, 340, 220, 6, 1, 300, 135, 46, NULL, 1);
INSERT INTO `teacher_books` VALUES (260, 342, 222, 6, 1, 300, 125, 46, NULL, 1);
INSERT INTO `teacher_books` VALUES (262, 324, 224, 6, 1, 300, 211, 46, NULL, 1);
INSERT INTO `teacher_books` VALUES (264, 326, 226, 6, 1, 300, 201, 46, NULL, 1);
INSERT INTO `teacher_books` VALUES (266, 326, 228, 6, 1, 300, 107, 48, NULL, 1);
INSERT INTO `teacher_books` VALUES (268, 328, 230, 6, 1, 300, 97, 48, NULL, 1);
INSERT INTO `teacher_books` VALUES (270, 330, 232, 6, 1, 300, 183, 48, NULL, 1);
INSERT INTO `teacher_books` VALUES (272, 332, 234, 6, 1, 300, 173, 48, NULL, 1);
INSERT INTO `teacher_books` VALUES (274, 334, 236, 6, 1, 300, 259, 48, NULL, 1);
INSERT INTO `teacher_books` VALUES (276, 336, 238, 6, 1, 300, 69, 48, NULL, 1);
INSERT INTO `teacher_books` VALUES (278, 344, 240, 8, 1, 300, 155, 50, NULL, 1);
INSERT INTO `teacher_books` VALUES (280, 346, 242, 8, 1, 300, 145, 50, NULL, 1);
INSERT INTO `teacher_books` VALUES (282, 348, 244, 8, 1, 300, 231, 50, NULL, 1);
INSERT INTO `teacher_books` VALUES (284, 350, 246, 8, 1, 300, 221, 50, NULL, 1);
INSERT INTO `teacher_books` VALUES (286, 350, 248, 8, 1, 300, 127, 52, NULL, 1);
INSERT INTO `teacher_books` VALUES (288, 352, 250, 8, 1, 300, 117, 52, NULL, 1);
INSERT INTO `teacher_books` VALUES (290, 354, 252, 8, 1, 300, 203, 52, NULL, 1);
INSERT INTO `teacher_books` VALUES (292, 356, 254, 8, 1, 300, 193, 52, NULL, 1);
INSERT INTO `teacher_books` VALUES (294, 356, 256, 8, 1, 300, 99, 54, NULL, 1);
INSERT INTO `teacher_books` VALUES (296, 358, 258, 8, 1, 300, 89, 54, NULL, 1);
INSERT INTO `teacher_books` VALUES (298, 360, 260, 8, 1, 300, 175, 54, NULL, 1);
INSERT INTO `teacher_books` VALUES (300, 362, 262, 8, 1, 300, 165, 54, NULL, 1);
INSERT INTO `teacher_books` VALUES (302, 362, 264, 8, 1, 300, 251, 56, NULL, 1);
INSERT INTO `teacher_books` VALUES (304, 344, 266, 8, 1, 300, 61, 56, NULL, 1);
INSERT INTO `teacher_books` VALUES (306, 346, 268, 8, 1, 300, 147, 56, NULL, 1);
INSERT INTO `teacher_books` VALUES (308, 348, 270, 8, 1, 300, 137, 56, NULL, 1);
INSERT INTO `teacher_books` VALUES (310, 348, 272, 8, 1, 300, 223, 58, NULL, 1);
INSERT INTO `teacher_books` VALUES (312, 350, 274, 8, 1, 300, 213, 58, NULL, 1);
INSERT INTO `teacher_books` VALUES (314, 352, 276, 8, 1, 300, 119, 58, NULL, 1);
INSERT INTO `teacher_books` VALUES (316, 354, 278, 8, 1, 300, 109, 58, NULL, 1);
INSERT INTO `teacher_books` VALUES (318, 354, 280, 8, 1, 300, 195, 60, NULL, 1);
INSERT INTO `teacher_books` VALUES (320, 356, 282, 8, 1, 300, 185, 60, NULL, 1);
INSERT INTO `teacher_books` VALUES (322, 358, 284, 8, 1, 300, 271, 60, NULL, 1);
INSERT INTO `teacher_books` VALUES (324, 360, 286, 8, 1, 300, 81, 60, NULL, 1);
INSERT INTO `teacher_books` VALUES (326, 360, 288, 8, 1, 300, 167, 62, NULL, 1);
INSERT INTO `teacher_books` VALUES (328, 362, 290, 8, 1, 300, 157, 62, NULL, 1);
INSERT INTO `teacher_books` VALUES (330, 344, 292, 8, 1, 300, 243, 62, NULL, 1);
INSERT INTO `teacher_books` VALUES (332, 346, 294, 8, 1, 300, 53, 62, NULL, 1);
INSERT INTO `teacher_books` VALUES (334, 346, 296, 8, 1, 300, 139, 64, NULL, 1);
INSERT INTO `teacher_books` VALUES (336, 348, 298, 8, 1, 300, 129, 64, NULL, 1);
INSERT INTO `teacher_books` VALUES (338, 350, 300, 8, 1, 300, 215, 64, NULL, 1);
INSERT INTO `teacher_books` VALUES (340, 352, 302, 8, 1, 300, 205, 64, NULL, 1);
INSERT INTO `teacher_books` VALUES (342, 354, 304, 8, 1, 300, 111, 64, NULL, 1);
INSERT INTO `teacher_books` VALUES (344, 356, 306, 8, 1, 300, 101, 64, NULL, 1);

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
  `tenant_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_id_number_per_tenant`(`tenant_id` ASC, `id_number` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `fk_teacher_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_teachers_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 363 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of teachers
-- ----------------------------
INSERT INTO `teachers` VALUES (282, 'مفتی مشرف بیگ اشرف', 'اللغة الفارسية / التوضيح', 64, 'T-26-1282', 2);
INSERT INTO `teachers` VALUES (284, 'مولانا حبيب محبوب', 'التجويد والسيرة / الهداية', 66, 'T-26-1284', 2);
INSERT INTO `teachers` VALUES (286, 'مولانا کمال', 'تفسير / الأدب', 68, 'T-26-1286', 2);
INSERT INTO `teachers` VALUES (288, 'مولانا حسن', 'الصرف / أصول الفقه', 70, 'T-26-1288', 2);
INSERT INTO `teachers` VALUES (290, 'مولانا عبد القادر عثمان', 'النحو / القدوري / النسائي', 72, 'T-26-1290', 2);
INSERT INTO `teachers` VALUES (292, 'مفتی فہد انوار', 'المنطق / شرح العقائد / البخاري', 74, 'T-26-1292', 2);
INSERT INTO `teachers` VALUES (294, 'مولانا حمزه', 'الهداية / الترمذي', 76, 'T-26-1294', 2);
INSERT INTO `teachers` VALUES (296, 'مولانا قمر اعجاز', 'التوضيح / الترمذي', 78, 'T-26-1296', 2);
INSERT INTO `teachers` VALUES (298, 'مولانا بارون خليل', 'علم الصيغة / سنن أبي داود', 80, 'T-26-1298', 2);
INSERT INTO `teachers` VALUES (300, 'مولانا قمر علی شاہ', 'شمائل الترمذي', 82, 'T-26-1300', 2);
INSERT INTO `teachers` VALUES (302, 'زبیر صاحب', 'هداية النحو', 166, NULL, 2);

-- ----------------------------
-- Table structure for tenants
-- ----------------------------
DROP TABLE IF EXISTS `tenants`;
CREATE TABLE `tenants`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `subdomain` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `custom_domain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` enum('active','suspended','maintenance') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'active',
  `plan_tier` enum('free','pro','enterprise') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'free',
  `max_students` int NULL DEFAULT 50,
  `max_teachers` int NULL DEFAULT 5,
  `max_classes` int NULL DEFAULT 5,
  `enable_custom_branding` tinyint(1) NULL DEFAULT 0,
  `enable_mobile_app` tinyint(1) NULL DEFAULT 0,
  `enable_advanced_reports` tinyint(1) NULL DEFAULT 0,
  `logo_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '/images/default_logo.png',
  `school_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `primary_color` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '#3b82f6',
  `secondary_color` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '#1d4ed8',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `subdomain`(`subdomain` ASC) USING BTREE,
  UNIQUE INDEX `custom_domain`(`custom_domain` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tenants
-- ----------------------------
INSERT INTO `tenants` VALUES (1, 'Jamia Habibullah Islamabad (Demo Account)', 'madrassa-ms', 'madrassa-ms.nukrim.com', 'active', 'free', 50, 5, 5, 0, 0, 0, '/uploads/logos/logo-1781439529411-885754231.png', 'Jamia Habibullah Islamabad (Farzi Naam / Demo Account)', '#3b82f6', '#1d4ed8', '2026-06-14 13:39:55', '2026-06-15 13:56:56');
INSERT INTO `tenants` VALUES (2, 'Kulliyat-ul-Uloom Al-Islamia', 'kui', 'kui.nukrim.com', 'active', 'enterprise', 1000, 100, 50, 1, 1, 1, '/logo.jpg', 'Kulliyat-ul-Uloom Al-Islamia', '#3b82f6', '#1d4ed8', '2026-06-14 13:39:55', '2026-06-14 13:47:32');

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
  `tenant_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_username_per_tenant`(`tenant_id` ASC, `username` ASC) USING BTREE,
  CONSTRAINT `fk_users_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 994 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (30, 'خرم', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'عريف', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (32, 'کمال', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (34, 'محمد', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (36, 'بسام', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'عريف', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (38, 'خالد', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (40, 'زبیر', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'عريف', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (42, 'محمد_عمران', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (44, 'عبدالله', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'عريف', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (46, 'admin', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'مدير', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (48, 'ظفر', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (50, 'عطاء', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (52, 'محمد_عبيد', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'عريف', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (54, 'عمر', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'عريف', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (56, 'مشتاق', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (58, 'عارف', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (60, 'TEMP_60_0.8031036805390415', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (62, 'کاشف', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (64, 'مشرف_بیگ', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'ناظم', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (66, 'حبيب', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (68, 'أستاذ_کمال', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (70, 'حسن', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (72, 'عبد', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (74, 'فہد_انوار', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'ناظم', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (76, 'حمزه', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (78, 'قمر', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (80, 'بارون', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (82, 'ناظم_قمر', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'ناظم', '2026-05-05 19:17:30', 2);
INSERT INTO `users` VALUES (166, 'زبیر_صاحب', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'أستاذ', '2026-05-06 11:48:15', 2);
INSERT INTO `users` VALUES (192, 'محمد_عبداللہ', '$2b$10$/RPl6CLIP/jkSQXgvsNpNegmlz.Fdd0PX0xtsKZTrY9CtCEuFhWWW', 'طالب', '2026-05-07 16:27:36', 2);
INSERT INTO `users` VALUES (992, 'محمد514', '$2b$10$.y3M8.fFYyAV4rCxhWoDZe5khn.7JSNxJeK121f6b1Fl1zZebyhYi', 'طالب', '2026-06-29 18:13:20', 2);
INSERT INTO `users` VALUES (1730, 'مدیر', '$2b$10$1TtZ9DJ7lHHWNEc1cSyREuE2DZUJxGKlmJnRuH86cWwFchmIrG.Xe', 'مدير', '2026-07-16 20:45:24', 2);

SET FOREIGN_KEY_CHECKS = 1;

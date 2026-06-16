SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Tenants Table
DROP TABLE IF EXISTS `tenants`;
CREATE TABLE `tenants` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `subdomain` VARCHAR(100) NOT NULL UNIQUE,
  `custom_domain` VARCHAR(255) UNIQUE,
  `status` ENUM('active', 'suspended', 'maintenance') DEFAULT 'active',
  `plan_tier` ENUM('free', 'pro', 'enterprise') DEFAULT 'free',
  `max_students` INT DEFAULT 50,
  `max_teachers` INT DEFAULT 5,
  `max_classes` INT DEFAULT 5,
  `enable_custom_branding` TINYINT(1) DEFAULT 0,
  `enable_mobile_app` TINYINT(1) DEFAULT 0,
  `enable_advanced_reports` TINYINT(1) DEFAULT 0,
  `logo_url` VARCHAR(255) DEFAULT '/images/default_logo.png',
  `school_name` VARCHAR(255) NOT NULL,
  `primary_color` VARCHAR(7) DEFAULT '#3b82f6',
  `secondary_color` VARCHAR(7) DEFAULT '#1d4ed8',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 2. Master Admins Table
DROP TABLE IF EXISTS `master_admins`;
CREATE TABLE `master_admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 3. Sessions Table
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `is_active` TINYINT(1) DEFAULT 0,
  `tenant_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_sessions_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 4. Classes Table
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name_ar` VARCHAR(100) NOT NULL,
  `name_en` VARCHAR(100) DEFAULT NULL,
  `tenant_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_classes_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 5. Users Table
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'طالب',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `tenant_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_username_per_tenant` (`tenant_id`, `username`),
  CONSTRAINT `fk_users_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 6. Students Table
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `class_id` INT DEFAULT NULL,
  `roll_number` VARCHAR(20) DEFAULT NULL,
  `user_id` INT DEFAULT NULL,
  `tenant_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_roll_number_per_tenant` (`tenant_id`, `roll_number`),
  CONSTRAINT `fk_students_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL,
  CONSTRAINT `students_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 7. Teachers Table
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `subject` VARCHAR(100) DEFAULT NULL,
  `user_id` INT DEFAULT NULL,
  `id_number` VARCHAR(20) DEFAULT NULL,
  `tenant_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_id_number_per_tenant` (`tenant_id`, `id_number`),
  CONSTRAINT `fk_teachers_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 8. Attendance Students Table
DROP TABLE IF EXISTS `attendance_students`;
CREATE TABLE `attendance_students` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `student_id` INT DEFAULT NULL,
  `date` DATE NOT NULL,
  `status` ENUM('present','absent','leave','online') DEFAULT 'present',
  `marked_by` INT DEFAULT NULL,
  `tenant_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `student_date` (`student_id` ASC, `date` ASC),
  CONSTRAINT `fk_attendance_students_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `attendance_students_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  CONSTRAINT `attendance_students_ibfk_2` FOREIGN KEY (`marked_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 9. Attendance Teachers Table
DROP TABLE IF EXISTS `attendance_teachers`;
CREATE TABLE `attendance_teachers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `teacher_id` INT DEFAULT NULL,
  `class_id` INT DEFAULT NULL,
  `date` DATE NOT NULL,
  `classes_taken` INT DEFAULT 0,
  `marked_by` INT DEFAULT NULL,
  `status` ENUM('present','absent','leave') DEFAULT 'present',
  `tenant_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `teacher_class_date` (`teacher_id`, `class_id`, `date`),
  CONSTRAINT `fk_attendance_teachers_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `attendance_teachers_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `attendance_teachers_ibfk_2` FOREIGN KEY (`marked_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `attendance_teachers_ibfk_3` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 10. Books Table
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `class_id` INT DEFAULT NULL,
  `tenant_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_book_title_per_tenant` (`tenant_id`, `title`),
  CONSTRAINT `fk_books_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_books_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 11. Teacher Books Table
DROP TABLE IF EXISTS `teacher_books`;
CREATE TABLE `teacher_books` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `teacher_id` INT NOT NULL,
  `book_id` INT NOT NULL,
  `session_id` INT NOT NULL,
  `start_page` INT DEFAULT 1,
  `end_page` INT DEFAULT 100,
  `current_page` INT DEFAULT 1,
  `class_id` INT DEFAULT NULL,
  `days` VARCHAR(255) DEFAULT NULL,
  `tenant_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_teacher_books_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `teacher_books_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `teacher_books_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `teacher_books_ibfk_3` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `teacher_books_ibfk_4` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE SET NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 12. Book Progress Table
DROP TABLE IF EXISTS `book_progress`;
CREATE TABLE `book_progress` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `assignment_id` INT NOT NULL,
  `date` DATE NOT NULL,
  `page_number` INT NOT NULL,
  `marked_by` INT NOT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tenant_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `assignment_id` (`assignment_id` ASC, `date` ASC),
  CONSTRAINT `fk_book_progress_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `book_progress_ibfk_1` FOREIGN KEY (`assignment_id`) REFERENCES `teacher_books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `book_progress_ibfk_2` FOREIGN KEY (`marked_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 13. Periods Table
DROP TABLE IF EXISTS `periods`;
CREATE TABLE `periods` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `teacher_id` INT DEFAULT NULL,
  `class_id` INT DEFAULT NULL,
  `day_of_week` ENUM('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') NOT NULL,
  `start_time` TIME DEFAULT NULL,
  `end_time` TIME DEFAULT NULL,
  `subject` VARCHAR(100) DEFAULT NULL,
  `assignment_id` INT DEFAULT NULL,
  `period_number` INT DEFAULT NULL,
  `session_id` INT DEFAULT NULL,
  `tenant_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_periods_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `periods_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `periods_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `periods_ibfk_3` FOREIGN KEY (`assignment_id`) REFERENCES `teacher_books` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_periods_session` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`) ON DELETE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 14. Student Enrollments Table
DROP TABLE IF EXISTS `student_enrollments`;
CREATE TABLE `student_enrollments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `class_id` INT NOT NULL,
  `session_id` INT NOT NULL,
  `tenant_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `student_session` (`student_id` ASC, `session_id` ASC),
  CONSTRAINT `fk_student_enrollments_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_enrollments_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_enrollments_session` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_enrollments_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 15. Role Permissions Table
DROP TABLE IF EXISTS `role_permissions`;
CREATE TABLE `role_permissions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `function_name` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `allowed` TINYINT(1) DEFAULT 0,
  `tenant_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `unique_role_function_per_tenant` (`tenant_id`, `role`, `function_name`),
  CONSTRAINT `fk_role_permissions_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
-- Create student_enrollments table
CREATE TABLE IF NOT EXISTS `student_enrollments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `class_id` int NOT NULL,
  `session_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_session` (`student_id`, `session_id`),
  CONSTRAINT `fk_enrollments_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_enrollments_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `fk_enrollments_session` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Migrate existing student classes to enrollment history
INSERT IGNORE INTO student_enrollments (student_id, class_id, session_id)
SELECT s.id, s.class_id, (SELECT id FROM sessions WHERE is_active = TRUE LIMIT 1)
FROM students s
WHERE s.class_id IS NOT NULL AND (SELECT id FROM sessions WHERE is_active = TRUE LIMIT 1) IS NOT NULL;

-- Add session_id to periods table
ALTER TABLE `periods` ADD COLUMN `session_id` int NULL;

-- Add foreign key constraint to periods
ALTER TABLE `periods` ADD CONSTRAINT `fk_periods_session` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`);

-- Update existing periods to active session
UPDATE periods
SET session_id = (SELECT id FROM sessions WHERE is_active = TRUE LIMIT 1)
WHERE session_id IS NULL AND (SELECT id FROM sessions WHERE is_active = TRUE LIMIT 1) IS NOT NULL;

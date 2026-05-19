ALTER TABLE `books` ADD COLUMN `class_id` INT NULL;
ALTER TABLE `books` ADD CONSTRAINT `fk_books_class` FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE SET NULL;

-- Automatically map existing books to their classes using current teacher_books data
UPDATE `books` b 
SET b.class_id = (
  SELECT tb.class_id 
  FROM `teacher_books` tb 
  WHERE tb.book_id = b.id 
  ORDER BY tb.id DESC 
  LIMIT 1
);

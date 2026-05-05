-- V8: Standardize student roll numbers to S-YY-CLASS-ID format
UPDATE students 
SET roll_number = CONCAT('S-', DATE_FORMAT(CURDATE(), '%y'), '-', class_id, '-', 1000 + id);

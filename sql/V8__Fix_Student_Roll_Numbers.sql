-- V8: Standardize student roll numbers to S-YY-ID format
UPDATE students 
SET roll_number = CONCAT('S-', DATE_FORMAT(CURDATE(), '%y'), '-', 1000 + id);

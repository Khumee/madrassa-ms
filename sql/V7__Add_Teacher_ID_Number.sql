-- V7: Add id_number to teachers table
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS id_number VARCHAR(20) UNIQUE;

-- Generate ID numbers for existing teachers if they are null
UPDATE teachers 
SET id_number = CONCAT('T-', DATE_FORMAT(CURDATE(), '%y'), '-', 1000 + id)
WHERE id_number IS NULL;

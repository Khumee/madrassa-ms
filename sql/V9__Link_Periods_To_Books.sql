-- V9: Linking Periods to Book Assignments
-- This allows the system to know exactly which book is being taught in each period

ALTER TABLE periods 
ADD COLUMN assignment_id INT NULL,
ADD COLUMN period_number INT NULL,
ADD FOREIGN KEY (assignment_id) REFERENCES teacher_books(id) ON DELETE SET NULL;

-- Optionally, we can try to migrate some data if subject names match book titles
-- But it's safer to let the user re-assign them via the new UI.

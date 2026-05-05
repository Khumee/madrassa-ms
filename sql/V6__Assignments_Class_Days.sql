-- V6: Adding Class and Days to Teacher Assignments

ALTER TABLE teacher_books 
ADD COLUMN class_id INT,
ADD COLUMN days VARCHAR(255), -- e.g., 'Sat,Sun,Mon'
ADD FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL;

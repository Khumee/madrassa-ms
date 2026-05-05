-- V5: Sessions, Books, and Many-to-Many Teacher Assignments

-- 1. Sessions Table
CREATE TABLE IF NOT EXISTS sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL, -- e.g., '2026-2027'
    is_active BOOLEAN DEFAULT FALSE
);

-- 2. Insert Default Session
INSERT INTO sessions (name, is_active) VALUES ('2026-2027', TRUE);

-- 3. Update Books Table (Refined)
-- First, drop existing books if any to reset for the new many-to-many logic
DROP TABLE IF EXISTS book_progress;
DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE
);

-- 4. Teacher-Book Assignments (Junction Table)
CREATE TABLE teacher_books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT NOT NULL,
    book_id INT NOT NULL,
    session_id INT NOT NULL,
    start_page INT DEFAULT 1,
    end_page INT DEFAULT 100,
    current_page INT DEFAULT 1,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- 5. Progress History
CREATE TABLE book_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    assignment_id INT NOT NULL,
    date DATE NOT NULL,
    page_number INT NOT NULL,
    marked_by INT NOT NULL,
    FOREIGN KEY (assignment_id) REFERENCES teacher_books(id) ON DELETE CASCADE,
    FOREIGN KEY (marked_by) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY (assignment_id, date)
);

-- 6. Insert Initial Books
INSERT IGNORE INTO books (title) VALUES 
('اللغة الفارسية'),
('التوضيح'),
('التجويد والسيرة'),
('الهداية'),
('تفسير'),
('الأدب'),
('الصرف'),
('أصول الفقه'),
('النحو'),
('القدوري'),
('النسائي'),
('المنطق'),
('شرح العقائد'),
('البخاري'),
('الترمذي'),
('علم الصيغة'),
('سنن أبي داود'),
('شمائل الترمذي');

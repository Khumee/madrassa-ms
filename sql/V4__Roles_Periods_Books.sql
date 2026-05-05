-- Migration to V2: Roles, Periods, and Book Progress

-- 1. Update users table role type
ALTER TABLE users MODIFY role VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'طالب علم';

-- 2. Add user_id to students and teachers
ALTER TABLE students ADD COLUMN user_id INT, ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE teachers ADD COLUMN user_id INT, ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;

-- 3. Update attendance_teachers to include status
ALTER TABLE attendance_teachers ADD COLUMN status ENUM('present', 'absent', 'leave') DEFAULT 'present';

-- 4. Periods table
CREATE TABLE IF NOT EXISTS periods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT,
    class_id INT,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
    start_time TIME,
    end_time TIME,
    subject VARCHAR(100),
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);

-- 5. Books table
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT,
    class_id INT,
    title VARCHAR(255) NOT NULL,
    total_pages INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);

-- 6. Book Progress table
CREATE TABLE IF NOT EXISTS book_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    date DATE NOT NULL,
    page_number INT NOT NULL,
    marked_by INT,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (marked_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY book_date (book_id, date)
);

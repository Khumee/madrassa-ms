-- Madrasa Attendance System Schema

CREATE DATABASE IF NOT EXISTS madrassa_db;
USE madrassa_db;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'teacher',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_ar VARCHAR(100) NOT NULL,
    name_en VARCHAR(100)
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    class_id INT,
    roll_number VARCHAR(20),
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL
);

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    subject VARCHAR(100),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Student Attendance table
CREATE TABLE IF NOT EXISTS attendance_students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    date DATE NOT NULL,
    status ENUM('present', 'absent', 'leave', 'online') DEFAULT 'present',
    marked_by INT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (marked_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY student_date (student_id, date)
);

-- Teacher Attendance table
CREATE TABLE IF NOT EXISTS attendance_teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT,
    date DATE NOT NULL,
    classes_taken INT DEFAULT 0,
    marked_by INT,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (marked_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY teacher_date (teacher_id, date)
);

-- Insert initial classes
INSERT INTO classes (name_ar, name_en) VALUES 
('الأولى', 'Aula'),
('الثانية', 'Sania'),
('الثالثة', 'Salisa'),
('الرابعة', 'Rabia'),
('الخامسة', 'Khamisa'),
('السادسة', 'Sadisa'),
('السابعة', 'Sabiya'),
('دورة حديث', 'Daura Hadith');

-- Insert initial teachers (Generic Placeholders)
INSERT INTO teachers (name, subject) VALUES 
('أستاذ أول', 'مادة 1'),
('أستاذ ثان', 'مادة 2');

-- Exams table
CREATE TABLE IF NOT EXISTS exams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status ENUM('draft', 'published', 'completed') DEFAULT 'draft',
    created_by INT,
    tenant_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

-- Exam Papers
CREATE TABLE IF NOT EXISTS exam_papers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exam_id INT,
    class_id INT,
    subject VARCHAR(255),
    teacher_id INT,
    status ENUM('assigned', 'draft', 'submitted', 'approved', 'rejected') DEFAULT 'assigned',
    max_marks INT DEFAULT 100,
    tenant_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

-- Questions in a Paper
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paper_id INT,
    question_text TEXT NOT NULL,
    marks INT NOT NULL,
    section VARCHAR(50) DEFAULT 'A',
    tenant_id INT NOT NULL,
    FOREIGN KEY (paper_id) REFERENCES exam_papers(id) ON DELETE CASCADE,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

-- Student Results for a Paper
CREATE TABLE IF NOT EXISTS student_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paper_id INT,
    student_id INT,
    obtained_marks INT DEFAULT 0,
    marked_by INT,
    status ENUM('draft', 'final') DEFAULT 'draft',
    tenant_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paper_id) REFERENCES exam_papers(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (marked_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_paper (paper_id, student_id)
);

-- Question Level Marks
CREATE TABLE IF NOT EXISTS student_question_marks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    result_id INT,
    question_id INT,
    obtained_marks INT NOT NULL,
    FOREIGN KEY (result_id) REFERENCES student_results(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    UNIQUE KEY result_question (result_id, question_id)
);


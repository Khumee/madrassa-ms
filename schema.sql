-- Madrasa Attendance System Schema

CREATE DATABASE IF NOT EXISTS kui;
USE kui;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'teacher') DEFAULT 'teacher',
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
    subject VARCHAR(100)
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

-- Insert initial teachers
INSERT INTO teachers (name, subject) VALUES 
('مفتی مشرف بیگ اشرف', 'اللغة الفارسية / التوضيح'),
('مولانا حبيب محبوب', 'التجويد والسيرة / الهداية'),
('مولانا کمال', 'تفسير / الأدب'),
('مولانا حسن', 'الصرف / أصول الفقه'),
('مولانا عبد القادر عثمان', 'النحو / القدوري / النسائي'),
('مفتی فرحان انور', 'المنطق / شرح العقائد / البخاري'),
('مولانا حمزه', 'الهداية / الترمذي'),
('مولانا قمر اعجاز', 'التوضيح / الترمذي'),
('مولانا بارون خليل', 'علم الصيغة / سنن أبي داود'),
('مولانا قمر علی شاہ', 'شمائل الترمذي');

-- Migration for Exam and Paper Creation Module

-- Add user_id to teachers
ALTER TABLE teachers ADD COLUMN user_id INT;
ALTER TABLE teachers ADD CONSTRAINT fk_teacher_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;

-- Exams table
CREATE TABLE IF NOT EXISTS exams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status ENUM('draft', 'published', 'completed') DEFAULT 'draft',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Questions in a Paper
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paper_id INT,
    question_text TEXT NOT NULL,
    marks INT NOT NULL,
    section VARCHAR(50) DEFAULT 'A',
    FOREIGN KEY (paper_id) REFERENCES exam_papers(id) ON DELETE CASCADE
);

-- Student Results for a Paper
CREATE TABLE IF NOT EXISTS student_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paper_id INT,
    student_id INT,
    total_marks INT NOT NULL DEFAULT 100,
    obtained_marks INT NOT NULL,
    status ENUM('draft', 'final') DEFAULT 'draft',
    marked_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paper_id) REFERENCES exam_papers(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (marked_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY student_paper (student_id, paper_id)
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

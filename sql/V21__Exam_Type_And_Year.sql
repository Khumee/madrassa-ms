-- Exam type + year, so the exam's display name can be generated in whatever
-- language the viewer currently has active instead of frozen as free text.
ALTER TABLE exams ADD COLUMN exam_type VARCHAR(30) DEFAULT NULL;
ALTER TABLE exams ADD COLUMN exam_year INT DEFAULT NULL;

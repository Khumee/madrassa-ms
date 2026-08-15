-- Add paper_date to exam_papers
ALTER TABLE `exam_papers` ADD COLUMN `paper_date` DATE DEFAULT NULL;

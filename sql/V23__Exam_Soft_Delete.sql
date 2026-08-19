-- Deleting an exam now only hides it (soft delete) - it no longer cascades
-- into permanently destroying its papers, questions, and student results.
ALTER TABLE exams ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL;

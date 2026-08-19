-- Deleting an exam now also marks each of its papers deleted (soft delete,
-- mirroring exams.deleted_at from V23) instead of leaving them orphaned but
-- still "active" - their questions, choice groups, and results are untouched.
ALTER TABLE exam_papers ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL;

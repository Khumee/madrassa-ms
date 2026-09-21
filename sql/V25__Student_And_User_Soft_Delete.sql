-- Add deleted_at columns for soft deletion
ALTER TABLE students ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL;
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL;
ALTER TABLE teachers ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL;

-- Backfill: Mark orphaned students without active users or previously unlinked as soft-deleted
UPDATE students SET deleted_at = CURRENT_TIMESTAMP WHERE user_id IS NULL;

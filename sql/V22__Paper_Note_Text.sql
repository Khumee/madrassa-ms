-- Per-paper editable ملحوظة note. NULL/empty means "no custom note yet" -
-- the view falls back to the existing hardcoded default wording, so every
-- paper created before this column existed keeps rendering exactly as before.
ALTER TABLE exam_papers ADD COLUMN note_text TEXT DEFAULT NULL;

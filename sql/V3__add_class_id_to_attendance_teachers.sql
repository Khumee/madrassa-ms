-- Add class_id to attendance_teachers so each CR's marking is stored independently.
-- Without this, two CRs marking the same teacher on the same day overwrote each other.

ALTER TABLE attendance_teachers
    ADD COLUMN class_id INT NULL AFTER teacher_id,
    ADD CONSTRAINT attendance_teachers_ibfk_3
        FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE ON UPDATE RESTRICT;

ALTER TABLE attendance_teachers
    DROP INDEX teacher_date,
    ADD UNIQUE INDEX teacher_class_date (teacher_id, class_id, date);

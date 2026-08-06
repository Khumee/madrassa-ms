SET FOREIGN_KEY_CHECKS=0;
BEGIN;

DELETE FROM `mms`.`book_progress` WHERE `id` > 3798;
DELETE FROM `mms`.`attendance_students` WHERE `id` > 11086;
DELETE FROM `mms`.`attendance_teachers` WHERE `id` > 3502;
DELETE FROM `mms`.`periods` WHERE `id` > 3618;
DELETE FROM `mms`.`teacher_books` WHERE `id` > 480;
DELETE FROM `mms`.`student_enrollments` WHERE `id` > 838;
DELETE FROM `mms`.`books` WHERE `id` > 442;
DELETE FROM `mms`.`students` WHERE `id` > 834;
DELETE FROM `mms`.`teachers` WHERE `id` > 402;
DELETE FROM `mms`.`users` WHERE `id` > 1360;
DELETE FROM `mms`.`classes` WHERE `id` > 96;
DELETE FROM `mms`.`sessions` WHERE `id` > 12;
DELETE FROM `mms`.`role_permissions` WHERE `id` > 982;

COMMIT;
SET FOREIGN_KEY_CHECKS=1;

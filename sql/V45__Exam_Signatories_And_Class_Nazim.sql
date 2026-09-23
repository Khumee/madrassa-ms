-- V45: Add Exam Signatories Settings for Tenants and Classes

ALTER TABLE `tenants`
ADD COLUMN `mohtamim_name` VARCHAR(255) NULL DEFAULT '',
ADD COLUMN `nazim_taleemat_name` VARCHAR(255) NULL DEFAULT '',
ADD COLUMN `nazim_imtihanat_name` VARCHAR(255) NULL DEFAULT '',
ADD COLUMN `default_nazim_saff_name` VARCHAR(255) NULL DEFAULT '';

ALTER TABLE `classes`
ADD COLUMN `nazim_saff_name` VARCHAR(255) NULL DEFAULT NULL;

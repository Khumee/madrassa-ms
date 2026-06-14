-- Phase 2 Multi-Tenant Database Redesign

-- 1. Create the tenants table
CREATE TABLE IF NOT EXISTS tenants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    subdomain VARCHAR(100) NOT NULL UNIQUE,
    custom_domain VARCHAR(255) UNIQUE,
    status ENUM('active', 'suspended', 'maintenance') DEFAULT 'active',
    plan_tier ENUM('free', 'pro', 'enterprise') DEFAULT 'free',
    max_students INT DEFAULT 50,
    max_teachers INT DEFAULT 5,
    max_classes INT DEFAULT 5,
    enable_custom_branding TINYINT(1) DEFAULT 0,
    enable_mobile_app TINYINT(1) DEFAULT 0,
    enable_advanced_reports TINYINT(1) DEFAULT 0,
    logo_url VARCHAR(255) DEFAULT '/images/default_logo.png',
    school_name VARCHAR(255) NOT NULL,
    primary_color VARCHAR(7) DEFAULT '#3b82f6',
    secondary_color VARCHAR(7) DEFAULT '#1d4ed8',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 2. Create the master_admins table
CREATE TABLE IF NOT EXISTS master_admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- 3. Insert default tenants
-- Tenant 1: Jamia Habibullah Islamabad (Demo Account)
INSERT INTO tenants (id, name, subdomain, custom_domain, status, plan_tier, school_name) 
VALUES (1, 'Jamia Habibullah Islamabad (Demo Account)', 'mmsdemo', 'mmsdemo.nukrim.com', 'active', 'free', 'Jamia Habibullah Islamabad (Farzi Naam / Demo Account)');

-- Tenant 2: Kulliyat-ul-Uloom Al-Islamia (KUI Production)
INSERT INTO tenants (id, name, subdomain, custom_domain, status, plan_tier, school_name, max_students, max_teachers, max_classes, enable_custom_branding, enable_mobile_app, enable_advanced_reports) 
VALUES (2, 'Kulliyat-ul-Uloom Al-Islamia', 'kui', 'kui.nukrim.com', 'active', 'enterprise', 'Kulliyat-ul-Uloom Al-Islamia', 1000, 100, 50, 1, 1, 1);

-- 4. Add tenant_id column to operational tables and update existing rows to Tenant 2 (KUI Production)

-- Users Table
ALTER TABLE users ADD COLUMN tenant_id INT NOT NULL DEFAULT 2;
ALTER TABLE users ALTER COLUMN tenant_id DROP DEFAULT;

-- Classes Table
ALTER TABLE classes ADD COLUMN tenant_id INT NOT NULL DEFAULT 2;
ALTER TABLE classes ALTER COLUMN tenant_id DROP DEFAULT;

-- Students Table
ALTER TABLE students ADD COLUMN tenant_id INT NOT NULL DEFAULT 2;
ALTER TABLE students ALTER COLUMN tenant_id DROP DEFAULT;

-- Teachers Table
ALTER TABLE teachers ADD COLUMN tenant_id INT NOT NULL DEFAULT 2;
ALTER TABLE teachers ALTER COLUMN tenant_id DROP DEFAULT;

-- Attendance Students Table
ALTER TABLE attendance_students ADD COLUMN tenant_id INT NOT NULL DEFAULT 2;
ALTER TABLE attendance_students ALTER COLUMN tenant_id DROP DEFAULT;

-- Attendance Teachers Table
ALTER TABLE attendance_teachers ADD COLUMN tenant_id INT NOT NULL DEFAULT 2;
ALTER TABLE attendance_teachers ALTER COLUMN tenant_id DROP DEFAULT;

-- Books Table
ALTER TABLE books ADD COLUMN tenant_id INT NOT NULL DEFAULT 2;
ALTER TABLE books ALTER COLUMN tenant_id DROP DEFAULT;

-- Teacher Books Table
ALTER TABLE teacher_books ADD COLUMN tenant_id INT NOT NULL DEFAULT 2;
ALTER TABLE teacher_books ALTER COLUMN tenant_id DROP DEFAULT;

-- Book Progress Table
ALTER TABLE book_progress ADD COLUMN tenant_id INT NOT NULL DEFAULT 2;
ALTER TABLE book_progress ALTER COLUMN tenant_id DROP DEFAULT;

-- Periods Table
ALTER TABLE periods ADD COLUMN tenant_id INT NOT NULL DEFAULT 2;
ALTER TABLE periods ALTER COLUMN tenant_id DROP DEFAULT;

-- Sessions Table
ALTER TABLE sessions ADD COLUMN tenant_id INT NOT NULL DEFAULT 2;
ALTER TABLE sessions ALTER COLUMN tenant_id DROP DEFAULT;

-- Student Enrollments Table
ALTER TABLE student_enrollments ADD COLUMN tenant_id INT NOT NULL DEFAULT 2;
ALTER TABLE student_enrollments ALTER COLUMN tenant_id DROP DEFAULT;

-- Role Permissions Table
ALTER TABLE role_permissions ADD COLUMN tenant_id INT NOT NULL DEFAULT 2;
ALTER TABLE role_permissions ALTER COLUMN tenant_id DROP DEFAULT;

-- 5. Drop old single-column unique indexes and add composite indexes including tenant_id

-- Users Username Unique
ALTER TABLE users DROP INDEX username;
ALTER TABLE users ADD UNIQUE KEY unique_username_per_tenant (tenant_id, username);

-- Students Roll Number Unique (if index exists)
-- Since roll_number does not have a unique index in standard V1 schema but is VARCHAR, we add composite unique key
ALTER TABLE students ADD UNIQUE KEY unique_roll_number_per_tenant (tenant_id, roll_number);

-- Teachers ID Number Unique
ALTER TABLE teachers DROP INDEX id_number;
ALTER TABLE teachers ADD UNIQUE KEY unique_id_number_per_tenant (tenant_id, id_number);

-- Books Title Unique
ALTER TABLE books DROP INDEX title;
ALTER TABLE books ADD UNIQUE KEY unique_book_title_per_tenant (tenant_id, title);

-- Role Permissions Unique
ALTER TABLE role_permissions DROP INDEX role_function;
ALTER TABLE role_permissions ADD UNIQUE KEY unique_role_function_per_tenant (tenant_id, role, function_name);

-- Add ForeignKey constraints back to tenants
ALTER TABLE users ADD CONSTRAINT fk_users_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE classes ADD CONSTRAINT fk_classes_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE students ADD CONSTRAINT fk_students_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE teachers ADD CONSTRAINT fk_teachers_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE attendance_students ADD CONSTRAINT fk_attendance_students_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE attendance_teachers ADD CONSTRAINT fk_attendance_teachers_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE books ADD CONSTRAINT fk_books_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE teacher_books ADD CONSTRAINT fk_teacher_books_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE book_progress ADD CONSTRAINT fk_book_progress_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE periods ADD CONSTRAINT fk_periods_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE sessions ADD CONSTRAINT fk_sessions_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE student_enrollments ADD CONSTRAINT fk_student_enrollments_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE role_permissions ADD CONSTRAINT fk_role_permissions_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;

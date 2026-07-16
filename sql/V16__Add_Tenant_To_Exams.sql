ALTER TABLE exams ADD COLUMN tenant_id INT NOT NULL DEFAULT 1;
ALTER TABLE exam_papers ADD COLUMN tenant_id INT NOT NULL DEFAULT 1;
ALTER TABLE questions ADD COLUMN tenant_id INT NOT NULL DEFAULT 1;
ALTER TABLE student_results ADD COLUMN tenant_id INT NOT NULL DEFAULT 1;

ALTER TABLE exams ADD CONSTRAINT exams_tenant_fk FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE exam_papers ADD CONSTRAINT exam_papers_tenant_fk FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE questions ADD CONSTRAINT questions_tenant_fk FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;
ALTER TABLE student_results ADD CONSTRAINT student_results_tenant_fk FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE;

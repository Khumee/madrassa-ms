-- Choice groups: a set of questions where the student must answer only
-- required_count of them (e.g. 1-of-2 "either/or", or N-of-M overall choice).
CREATE TABLE IF NOT EXISTS question_choice_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL,
    paper_id INT NOT NULL,
    required_count INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (paper_id) REFERENCES exam_papers(id) ON DELETE CASCADE
);

ALTER TABLE questions ADD COLUMN choice_group_id INT DEFAULT NULL;
ALTER TABLE questions ADD CONSTRAINT fk_question_choice_group
    FOREIGN KEY (choice_group_id) REFERENCES question_choice_groups(id) ON DELETE SET NULL;

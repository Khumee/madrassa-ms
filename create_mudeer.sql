INSERT IGNORE INTO mms.users (username, password, role, tenant_id) VALUES ('مدیر', '$2b$10$1TtZ9DJ7lHHWNEc1cSyREuE2DZUJxGKlmJnRuH86cWwFchmIrG.Xe', 'مدير', 2);
INSERT IGNORE INTO mms.role_permissions (role, permissions, tenant_id) VALUES ('مدير', '["view_dashboard","manage_classes","manage_teachers","manage_students","manage_attendance","manage_exams","manage_users","manage_system"]', 2);

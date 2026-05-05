require('dotenv').config();
const db = require('./db');
const bcrypt = require('bcryptjs');

async function migrateUsers() {
    console.log('Starting user migration...');
    
    const defaultPassword = await bcrypt.hash('1234', 10);
    
    // 1. Migrate Students
    console.log('Migrating students...');
    const [students] = await db.execute('SELECT id, name FROM students WHERE user_id IS NULL');
    for (const student of students) {
        try {
            // Check if user already exists with this name (username must be unique)
            const [existing] = await db.execute('SELECT id FROM users WHERE username = ?', [student.name]);
            let userId;
            if (existing.length === 0) {
                const [result] = await db.execute(
                    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                    [student.name, defaultPassword, 'طالب علم']
                );
                userId = result.insertId;
            } else {
                userId = existing[0].id;
            }
            await db.execute('UPDATE students SET user_id = ? WHERE id = ?', [userId, student.id]);
            console.log(`User created for student: ${student.name}`);
        } catch (err) {
            console.error(`Failed to migrate student ${student.name}:`, err.message);
        }
    }
    
    // 2. Migrate Teachers
    console.log('Migrating teachers...');
    const [teachers] = await db.execute('SELECT id, name FROM teachers WHERE user_id IS NULL');
    for (const teacher of teachers) {
        try {
            const [existing] = await db.execute('SELECT id FROM users WHERE username = ?', [teacher.name]);
            let userId;
            if (existing.length === 0) {
                const [result] = await db.execute(
                    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                    [teacher.name, defaultPassword, 'أستاذ']
                );
                userId = result.insertId;
            } else {
                userId = existing[0].id;
            }
            await db.execute('UPDATE teachers SET user_id = ? WHERE id = ?', [userId, teacher.id]);
            console.log(`User created for teacher: ${teacher.name}`);
        } catch (err) {
            console.error(`Failed to migrate teacher ${teacher.name}:`, err.message);
        }
    }
    
    console.log('User migration completed.');
    process.exit(0);
}

migrateUsers().catch(err => {
    console.error(err);
    process.exit(1);
});

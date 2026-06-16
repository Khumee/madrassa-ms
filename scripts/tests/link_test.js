require('dotenv').config();
const db = require('../../db');

async function link() {
    const [s] = await db.execute('SELECT id FROM users WHERE username="Student1"');
    const [t] = await db.execute('SELECT id FROM users WHERE username="Teacher1"');
    const [c] = await db.execute('SELECT id FROM users WHERE username="CR1"');
    
    // Link Student1 to student with ID 1
    await db.execute('UPDATE students SET user_id = ? WHERE id = 1', [s[0].id]);
    // Link Teacher1 to teacher with ID 1
    await db.execute('UPDATE teachers SET user_id = ? WHERE id = 1', [t[0].id]);
    // Link CR1 to student with ID 2 (to test CR dashboard)
    await db.execute('UPDATE students SET user_id = ? WHERE id = 2', [c[0].id]);
    
    console.log('Linked.');
    process.exit(0);
}
link();

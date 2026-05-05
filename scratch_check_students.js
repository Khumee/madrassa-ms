require('dotenv').config();
const db = require('./db');

async function check() {
    const [students] = await db.execute('SELECT s.id, s.name, s.roll_number, c.name_ar FROM students s JOIN classes c ON s.class_id = c.id ORDER BY c.id, s.name');
    console.log(JSON.stringify(students, null, 2));
    process.exit(0);
}
check();

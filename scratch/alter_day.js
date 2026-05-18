const db = require('../config/db');

async function run() {
    try {
        await db.execute(`
            ALTER TABLE periods 
            MODIFY COLUMN day_of_week enum('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') 
            CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
        `);
        console.log('✅ ALTER TABLE succeeded!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

run();

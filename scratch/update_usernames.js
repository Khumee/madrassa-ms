const db = require('../config/db');

async function checkAndUpdate() {
    try {
        const [rows] = await db.execute("SELECT id, username FROM users WHERE username LIKE '%1%'");
        for (const row of rows) {
            const newUsername = row.username.replace(/1/g, '');
            // Check if this new username already exists in users table
            const [existing] = await db.execute("SELECT id FROM users WHERE username = ? AND id != ?", [newUsername, row.id]);
            if (existing.length > 0) {
                console.log(`⚠️ Conflict: Username "${newUsername}" already exists for user ID ${existing[0].id}. Cannot rename user ID ${row.id} from "${row.username}".`);
            } else {
                await db.execute("UPDATE users SET username = ? WHERE id = ?", [newUsername, row.id]);
                console.log(`✅ Success: Renamed user ID ${row.id} from "${row.username}" to "${newUsername}".`);
            }
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkAndUpdate();

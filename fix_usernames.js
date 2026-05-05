require('dotenv').config();
const db = require('./db');

async function fix() {
    console.log('Updating usernames to actual names (skipping titles)...');
    
    // 1. Rename ALL users with roles to TEMP to avoid ANY collision
    console.log('Clearing all role-based usernames...');
    await db.execute('UPDATE users SET username = CONCAT("TEMP_", id, "_", RAND()) WHERE role IN ("طالب_علم", "أستاذ", "مسؤول_الصف")');

    // 2. Fetch linked data
    const [students] = await db.execute('SELECT u.id, s.name FROM students s JOIN users u ON s.user_id = u.id');
    const [teachers] = await db.execute('SELECT u.id, t.name FROM teachers t JOIN users u ON t.user_id = u.id');
    
    const allPeople = [...students, ...teachers];
    const titles = ['مولانا', 'مفتی', 'حافظ', 'قاری', 'شیخ', 'سيد', 'سید'];
    
    const usedUsernames = new Set();
    const [protected] = await db.execute('SELECT username FROM users WHERE role NOT IN ("طالب_علم", "أستاذ", "مسؤول_الصف")');
    protected.forEach(p => usedUsernames.add(p.username));

    for (const person of allPeople) {
        const parts = person.name.trim().split(/\s+/);
        let nameToUse = parts[0];
        
        if (titles.includes(parts[0]) && parts.length > 1) {
            nameToUse = parts[1];
        }
        
        let newUsername = nameToUse;
        let counter = 1;
        while (usedUsernames.has(newUsername)) {
            newUsername = `${nameToUse}${counter}`;
            counter++;
        }
        
        await db.execute('UPDATE users SET username = ? WHERE id = ?', [newUsername, person.id]);
        usedUsernames.add(newUsername);
        console.log(`Updated: ${person.name} -> ${newUsername}`);
    }
    
    console.log('Usernames updated successfully.');
    process.exit(0);
}
fix().catch(err => { console.error(err); process.exit(1); });

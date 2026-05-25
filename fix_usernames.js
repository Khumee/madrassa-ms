require('dotenv').config();
const db = require('./db');

async function fix() {
    console.log('Updating usernames to actual names (skipping titles)...');
    
    // 1. Rename ALL users with roles to TEMP to avoid ANY collision
    console.log('Clearing all role-based usernames...');
    await db.execute('UPDATE users SET username = CONCAT("TEMP_", id, "_", RAND()) WHERE role IN ("طالب", "أستاذ", "عريف")');

    // 2. Fetch linked data
    const [students] = await db.execute('SELECT u.id, s.name FROM students s JOIN users u ON s.user_id = u.id');
    const [teachers] = await db.execute('SELECT u.id, t.name FROM teachers t JOIN users u ON t.user_id = u.id');
    
    const allPeople = [...students, ...teachers];
    const titles = ['مولانا', 'مفتی', 'حافظ', 'قاری', 'شیخ', 'سيد', 'سید', 'أستاذ', 'ناظم', 'عريف', 'مدير', 'مدیر'];
    
    const usedUsernames = new Set();
    const [protected] = await db.execute('SELECT username FROM users WHERE role NOT IN ("طالب", "أستاذ", "عريف")');
    protected.forEach(p => usedUsernames.add(p.username));

    for (const person of allPeople) {
        const [userRow] = await db.execute('SELECT role FROM users WHERE id = ?', [person.id]);
        const role = userRow.length > 0 ? userRow[0].role : 'طالب';

        const parts = person.name.trim().split(/\s+/);
        
        // Strip titles from the parts list
        const cleanParts = parts.filter(part => !titles.includes(part));
        
        let nameToUse = cleanParts[0] || parts[0];
        let newUsername = nameToUse;
        
        if (usedUsernames.has(newUsername)) {
            // First alternative: try using the second name if available
            if (cleanParts.length > 1) {
                newUsername = `${cleanParts[0]}_${cleanParts[1]}`;
            }
            
            // Second alternative: if still taken or no second name, apply role-based prefix
            if (usedUsernames.has(newUsername)) {
                if (role === 'أستاذ') {
                    newUsername = `أستاذ_${nameToUse}`;
                } else if (role === 'ناظم') {
                    newUsername = `ناظم_${nameToUse}`;
                } else if (role === 'عريف') {
                    newUsername = `عريف_${nameToUse}`;
                } else if (role === 'طالب') {
                    if (cleanParts.length > 1) {
                        newUsername = cleanParts.join('_');
                    } else {
                        newUsername = `طالب_${nameToUse}`;
                    }
                }
            }
            
            // Last resort: if still taken, append counter
            let counter = 1;
            let finalUsername = newUsername;
            while (usedUsernames.has(finalUsername)) {
                finalUsername = `${newUsername}${counter}`;
                counter++;
            }
            newUsername = finalUsername;
        }
        
        await db.execute('UPDATE users SET username = ? WHERE id = ?', [newUsername, person.id]);
        usedUsernames.add(newUsername);
        console.log(`Updated: ${person.name} -> ${newUsername}`);
    }
    
    console.log('Usernames updated successfully.');
    process.exit(0);
}
fix().catch(err => { console.error(err); process.exit(1); });

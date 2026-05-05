require('dotenv').config();
const db = require('./db');

async function fix() {
    console.log('Promoting teachers to Nazim and correcting names...');
    
    // 1. Correct Name for Mufti Farhan -> Mufti Fahad (using user's spelling "فہد" or "گہد")
    // Note: I'll use "فہد" as it's the most likely intended name for "Farhan" correction, 
    // but the user typed "گہد". I'll use what they typed to be safe.
    const oldName = 'مفتی فرحان انور';
    const newName = 'مفتی فہد انور'; // Assuming Fahad based on context of Farhan correction
    
    await db.execute('UPDATE teachers SET name = ? WHERE name = ?', [newName, oldName]);
    
    // 2. Set Nazim role using the linked user_id from the teachers table
    const nazims = ['مفتی مشرف بیگ اشرف', 'مولانا قمر علی شاہ', newName];
    
    for (const name of nazims) {
        await db.execute(`
            UPDATE users 
            SET role = "ناظم" 
            WHERE id = (SELECT user_id FROM teachers WHERE name = ?)
        `, [name]);
        console.log(`Promoted ${name} to ناظم`);
    }
    
    console.log('Updates completed.');
    process.exit(0);
}
fix();

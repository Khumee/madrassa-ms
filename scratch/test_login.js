const db = require('../config/db');
const bcrypt = require('bcryptjs');

async function test() {
    try {
        const usernameInput = 'خرم';
        const passwordInput = '1234';
        
        console.log('Username Input:', usernameInput);
        console.log('Code points of input:');
        for (let i = 0; i < usernameInput.length; i++) {
            console.log(`Char at ${i}: ${usernameInput[i]} (U+0${usernameInput.charCodeAt(i).toString(16).toUpperCase()})`);
        }
        
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [usernameInput]);
        console.log('Rows found:', rows.length);
        if (rows.length > 0) {
            const user = rows[0];
            const match = await bcrypt.compare(passwordInput, user.password);
            console.log('Password match:', match);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

test();

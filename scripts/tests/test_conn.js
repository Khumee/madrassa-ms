const db = require('../../config/db');

async function test() {
    try {
        console.log('Testing db.getConnection()...');
        const conn = await db.getConnection();
        console.log('Successfully acquired pool connection!');
        
        console.log('Testing connection transaction...');
        await conn.query('START TRANSACTION');
        console.log('Transaction started!');
        
        await conn.query('ROLLBACK');
        console.log('Transaction rolled back successfully!');
        
        conn.release();
        console.log('Connection released successfully!');
        
        process.exit(0);
    } catch (err) {
        console.error('Test Failed:', err);
        process.exit(1);
    }
}

test();

require('dotenv').config();
const mysql = require('mysql2/promise');
const { execSync } = require('child_process');

async function reset() {
    console.log('Connecting to MySQL to drop database...');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
    });

    const dbName = process.env.DB_NAME || 'kui';
    console.log(`Dropping database if exists: ${dbName}`);
    await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\``);
    await connection.end();
    console.log('Database dropped.');

    console.log('Running migrate.js to run new V1__Schema.sql and V2__Data.sql...');
    execSync('node migrate.js', { stdio: 'inherit' });
    console.log('Database rebase migration verification completed successfully!');
    process.exit(0);
}

reset().catch(err => {
    console.error('Reset database failed:', err);
    process.exit(1);
});

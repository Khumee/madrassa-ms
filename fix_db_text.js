const db = require('./db');

async function fix() {
    try {
        const pool = db.pool;
        await pool.execute("UPDATE questions SET question_text = REPLACE(question_text, 'سوال 1 حصہ A', '')");
        await pool.execute("UPDATE questions SET question_text = REPLACE(question_text, 'سوال 1 حصہ B', '')");
        await pool.execute("UPDATE questions SET question_text = REPLACE(question_text, 'سوال 2 حصہ B', '')");
        await pool.execute("UPDATE questions SET question_text = REPLACE(question_text, 'سوال 2 حصہ A', '')");
        await pool.execute("UPDATE questions SET question_text = REPLACE(question_text, 'السؤال 1: ', '')");
        await pool.execute("UPDATE questions SET question_text = TRIM(question_text)");
        console.log('Fixed DB text!');
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
}
fix();

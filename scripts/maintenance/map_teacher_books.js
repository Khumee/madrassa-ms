require('dotenv').config();
const db = require('../../db');

async function map() {
    console.log('Mapping teachers to books based on subject field...');
    
    const [teachers] = await db.execute('SELECT * FROM teachers');
    const [books] = await db.execute('SELECT * FROM books');
    const [sessions] = await db.execute('SELECT id FROM sessions WHERE is_active = TRUE LIMIT 1');
    
    if (!sessions[0]) {
        console.error('No active session found.');
        process.exit(1);
    }
    
    const sessionId = sessions[0].id;

    for (const teacher of teachers) {
        if (!teacher.subject) continue;
        
        // Split subject by " / "
        const bookTitles = teacher.subject.split(' / ').map(t => t.trim());
        
        for (const title of bookTitles) {
            // Find book by title
            const book = books.find(b => b.title === title);
            if (book) {
                // Check if assignment already exists
                const [existing] = await db.execute(
                    'SELECT id FROM teacher_books WHERE teacher_id = ? AND book_id = ? AND session_id = ?',
                    [teacher.id, book.id, sessionId]
                );
                
                if (existing.length === 0) {
                    await db.execute(
                        `INSERT INTO teacher_books (teacher_id, book_id, session_id, start_page, end_page, current_page) 
                         VALUES (?, ?, ?, 1, 500, 1)`,
                        [teacher.id, book.id, sessionId]
                    );
                    console.log(`Assigned "${title}" to ${teacher.name}`);
                }
            } else {
                console.warn(`Book "${title}" not found for teacher ${teacher.name}`);
            }
        }
    }
    
    console.log('Mapping completed.');
    process.exit(0);
}

map();

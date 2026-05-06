const db = require('./db');

async function productize() {
    try {
        console.log('Syncing subjects to books and assignments...');
        
        // 1. Get active session
        const [sessions] = await db.execute('SELECT id FROM sessions WHERE is_active = TRUE LIMIT 1');
        if (sessions.length === 0) {
            console.error('No active session found!');
            process.exit(1);
        }
        const sessionId = sessions[0].id;

        // 2. Get all periods that have a subject string but no assignment_id
        const [periods] = await db.execute('SELECT * FROM periods WHERE subject IS NOT NULL');

        for (const p of periods) {
            // A. Check/Create Book
            let [books] = await db.execute('SELECT id FROM books WHERE title = ?', [p.subject]);
            let bookId;
            if (books.length === 0) {
                const [res] = await db.execute('INSERT INTO books (title) VALUES (?)', [p.subject]);
                bookId = res.insertId;
                console.log(`Created book: ${p.subject}`);
            } else {
                bookId = books[0].id;
            }

            // B. Check/Create Teacher Assignment
            let [assignments] = await db.execute(
                'SELECT id FROM teacher_books WHERE teacher_id = ? AND book_id = ? AND class_id = ? AND session_id = ?',
                [p.teacher_id, bookId, p.class_id, sessionId]
            );
            let assignmentId;
            if (assignments.length === 0) {
                const [res] = await db.execute(
                    'INSERT INTO teacher_books (teacher_id, book_id, class_id, session_id) VALUES (?, ?, ?, ?)',
                    [p.teacher_id, bookId, p.class_id, sessionId]
                );
                assignmentId = res.insertId;
                console.log(`Assigned ${p.subject} to teacher ${p.teacher_id}`);
            } else {
                assignmentId = assignments[0].id;
            }

            // C. Update Period
            await db.execute('UPDATE periods SET assignment_id = ? WHERE id = ?', [assignmentId, p.id]);
        }

        console.log('Productization complete! All subjects are now official assignments.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

productize();

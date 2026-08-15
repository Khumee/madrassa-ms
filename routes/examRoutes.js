const express = require('express');
const router = express.Router();
const db = require('../db');

const isAdmin = (req, res, next) => { 
    if (!req.session.userId || !req.session.role) return res.redirect('/login');
    if (['admin', 'مدير', 'ناظم'].includes(req.session.role)) next(); 
    else res.status(403).send('Access Denied'); 
};
const isTeacher = (req, res, next) => { if (req.session.userId) next(); else res.redirect('/login'); };

// ADMIN: List Exams
router.get('/exams', isAdmin, async (req, res) => {
    const [exams] = await db.execute('SELECT * FROM exams WHERE tenant_id = ? ORDER BY created_at DESC', [req.tenant.id]);
    res.render('exams/list', { exams });
});

// ADMIN: View Results
router.get('/exams/:id/results', isAdmin, async (req, res) => {
    let query = `
        SELECT DISTINCT s.id, s.name, c.name_ar as class_name 
        FROM students s 
        JOIN classes c ON s.class_id = c.id 
        JOIN exam_papers ep ON ep.class_id = c.id 
        WHERE ep.exam_id = ? AND ep.tenant_id = ?
    `;
    const params = [req.params.id, req.tenant.id];
    
    if (req.query.classId) {
        query += ' AND s.class_id = ?';
        params.push(req.query.classId);
    }
    
    query += ' ORDER BY c.name_ar ASC, s.name ASC';

    const [students] = await db.execute(query, params);
    
    const [exam] = await db.execute('SELECT * FROM exams WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    const [classes] = await db.execute('SELECT DISTINCT c.id, c.name_ar FROM classes c JOIN exam_papers ep ON c.id = ep.class_id WHERE ep.exam_id = ? AND ep.tenant_id = ? ORDER BY c.name_ar ASC', [req.params.id, req.tenant.id]);

    res.render('exams/results', { 
        students, 
        exam: exam[0], 
        classes,
        selectedClassId: req.query.classId || ''
    });
});

// ADMIN: Create Exam
router.post('/exams', isAdmin, async (req, res) => {
    try {
        const [result] = await db.execute('INSERT INTO exams (name, created_by, tenant_id) VALUES (?, ?, ?)', [req.body.name, req.session.userId, req.tenant.id]);
        const examId = result.insertId;

        // Auto-assign papers based on active assignments
        const [assignments] = await db.execute(`
            SELECT tb.class_id, t.user_id as teacher_id, b.title as subject
            FROM teacher_books tb
            JOIN teachers t ON tb.teacher_id = t.id AND t.tenant_id = tb.tenant_id
            JOIN books b ON tb.book_id = b.id AND b.tenant_id = tb.tenant_id
            JOIN sessions s ON tb.session_id = s.id AND s.tenant_id = tb.tenant_id
            WHERE s.is_active = TRUE AND tb.tenant_id = ? AND t.user_id IS NOT NULL
        `, [req.tenant.id]);

        for (const a of assignments) {
            const [paperResult] = await db.execute(
                'INSERT INTO exam_papers (exam_id, class_id, subject, teacher_id, max_marks, tenant_id) VALUES (?, ?, ?, ?, ?, ?)', 
                [examId, a.class_id, a.subject, a.teacher_id, 100, req.tenant.id]
            );
            const paperId = paperResult.insertId;

            // Generate default template: 3 questions, 2 parts each (total 100 marks)
            const templateQuestions = [
                { text: '', marks: 17, section: 'الف' },
                { text: '', marks: 16, section: 'ب' },
                { text: '', marks: 17, section: 'الف' },
                { text: '', marks: 16, section: 'ب' },
                { text: '', marks: 17, section: 'الف' },
                { text: '', marks: 17, section: 'ب' }
            ];

            for (const tq of templateQuestions) {
                await db.execute(
                    'INSERT INTO questions (paper_id, question_text, marks, section, tenant_id) VALUES (?, ?, ?, ?, ?)', 
                    [paperId, tq.text, tq.marks, tq.section, req.tenant.id]
                );
            }
        }
        res.redirect('/exams');
    } catch (error) {
        console.error('Error creating exam:', error);
        res.status(500).send('Error creating exam and auto-assigning papers. Details: ' + error.message + '<br><pre>' + error.stack + '</pre>');
    }
});

// ADMIN: Delete Exam
router.post('/exams/:id/delete', isAdmin, async (req, res) => {
    try {
        // Manual cascade deletion for exams
        await db.execute('DELETE FROM student_results WHERE paper_id IN (SELECT id FROM exam_papers WHERE exam_id = ?) AND tenant_id = ?', [req.params.id, req.tenant.id]);
        await db.execute('DELETE FROM questions WHERE paper_id IN (SELECT id FROM exam_papers WHERE exam_id = ?) AND tenant_id = ?', [req.params.id, req.tenant.id]);
        await db.execute('DELETE FROM exam_papers WHERE exam_id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
        await db.execute('DELETE FROM exams WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
        res.redirect('/exams');
    } catch (error) {
        console.error('Error deleting exam:', error);
        res.status(500).send('Error deleting exam');
    }
});

// ADMIN: Assign Papers
// Route removed as it's now handled by modal in exam_papers

router.post('/exams/:id/assign', isAdmin, async (req, res) => {
    await db.execute('INSERT INTO exam_papers (exam_id, class_id, subject, teacher_id, max_marks, tenant_id) VALUES (?, ?, ?, ?, ?, ?)', [req.params.id, req.body.class_id, req.body.subject, req.body.teacher_id, req.body.max_marks || 100, req.tenant.id]);
    res.redirect(`/exams/${req.params.id}/papers`);
});

// ADMIN: Delete Paper
router.post('/papers/:id/delete', isAdmin, async (req, res) => {
    try {
        await db.execute('DELETE FROM student_results WHERE paper_id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
        await db.execute('DELETE FROM student_marks WHERE paper_id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
        await db.execute('DELETE FROM student_paper_results WHERE paper_id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
        await db.execute('DELETE FROM questions WHERE paper_id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
        await db.execute('DELETE FROM exam_papers WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
        const referer = req.get('Referer');
        res.redirect(referer ? referer : '/exams');
    } catch (err) {
        console.error('Error deleting paper:', err);
        res.status(500).send('Database error');
    }
});

// TEACHER: My Tasks
router.get('/papers/my-tasks', isTeacher, async (req, res) => {
    const [papers] = await db.execute(`SELECT ep.*, e.name as exam_name, c.name_ar as class_name FROM exam_papers ep JOIN exams e ON ep.exam_id = e.id JOIN classes c ON ep.class_id = c.id WHERE ep.teacher_id = ? AND ep.tenant_id = ?`, [req.session.userId, req.tenant.id]);
    res.render('exams/teacher_tasks', { papers });
});

// TEACHER: Paper Builder
router.get('/papers/:id/build', isTeacher, async (req, res) => {
    const [paper] = await db.execute('SELECT * FROM exam_papers WHERE id = ? AND teacher_id = ? AND tenant_id = ?', [req.params.id, req.session.userId, req.tenant.id]);
    if (!paper.length) return res.status(403).send('Not authorized');
    const [questions] = await db.execute('SELECT * FROM questions WHERE paper_id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    res.render('exams/paper_builder', { paper: paper[0], questions });
});

router.post('/papers/:id/questions', isTeacher, async (req, res) => {
    await db.execute('INSERT INTO questions (paper_id, question_text, marks, section, tenant_id) VALUES (?, ?, ?, ?, ?)', [req.params.id, req.body.question_text, req.body.marks, req.body.section || 'A', req.tenant.id]);
    res.redirect(`/papers/${req.params.id}/build`);
});

router.post('/questions/:id/edit', isTeacher, async (req, res) => {
    await db.execute('UPDATE questions SET question_text = ?, marks = ?, section = ? WHERE id = ? AND tenant_id = ?', [req.body.question_text, req.body.marks, req.body.section, req.params.id, req.tenant.id]);
    const referer = req.get('Referer');
    res.redirect(referer ? referer : '/exams');
});

router.post('/questions/:id/delete', isTeacher, async (req, res) => {
    await db.execute('DELETE FROM questions WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    const referer = req.get('Referer');
    res.redirect(referer ? referer : '/exams');
});
// ADMIN: All Papers for an Exam
router.get('/exams/:id/papers', isAdmin, async (req, res) => {
    let query = 'SELECT ep.*, e.name as exam_name, c.name_ar as class_name, COALESCE(t.name, u.username) as teacher_name FROM exam_papers ep JOIN exams e ON ep.exam_id = e.id JOIN classes c ON ep.class_id = c.id JOIN users u ON ep.teacher_id = u.id LEFT JOIN teachers t ON t.user_id = u.id AND t.tenant_id = ep.tenant_id WHERE ep.exam_id = ? AND ep.tenant_id = ?';
    const params = [req.params.id, req.tenant.id];

    if (req.query.classId) {
        query += ' AND ep.class_id = ?';
        params.push(req.query.classId);
    }
    if (req.query.teacherId) {
        query += ' AND ep.teacher_id = ?';
        params.push(req.query.teacherId);
    }
    query += ' ORDER BY c.name_ar ASC, teacher_name ASC';

    const [papers] = await db.execute(query, params);
    const [exam] = await db.execute('SELECT * FROM exams WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    
    // Fetch unique classes and teachers for filters (based on this exam's papers)
    const [classes] = await db.execute('SELECT DISTINCT c.id, c.name_ar FROM classes c JOIN exam_papers ep ON c.id = ep.class_id WHERE ep.exam_id = ? AND ep.tenant_id = ? ORDER BY c.name_ar ASC', [req.params.id, req.tenant.id]);
    const [teachers] = await db.execute('SELECT DISTINCT u.id, COALESCE(t.name, u.username) as name FROM users u JOIN exam_papers ep ON u.id = ep.teacher_id LEFT JOIN teachers t ON t.user_id = u.id AND t.tenant_id = ep.tenant_id WHERE ep.exam_id = ? AND ep.tenant_id = ? ORDER BY name ASC', [req.params.id, req.tenant.id]);

    // Fetch all for new paper assignment
    const [allClasses] = await db.execute('SELECT * FROM classes WHERE tenant_id = ?', [req.tenant.id]);
    const [allTeachers] = await db.execute('SELECT u.id, COALESCE(t.name, u.username) as username FROM users u LEFT JOIN teachers t ON t.user_id = u.id AND t.tenant_id = u.tenant_id WHERE u.role = "أستاذ" AND u.tenant_id = ? ORDER BY username ASC', [req.tenant.id]);
    const [books] = await db.execute('SELECT id, title, class_id FROM books WHERE tenant_id = ?', [req.tenant.id]);

    res.render('exams/exam_papers', { 
        papers, 
        exam: exam[0], 
        classes, 
        teachers, 
        allClasses,
        allTeachers,
        books,
        selectedClassId: req.query.classId || '', 
        selectedTeacherId: req.query.teacherId || '' 
    });
});
router.get('/papers/:id/view', isAdmin, async (req, res) => {
    const [paper] = await db.execute('SELECT ep.*, e.name as exam_name, c.name_ar as class_name, COALESCE(t.name, u.username) as teacher_name FROM exam_papers ep JOIN exams e ON ep.exam_id = e.id JOIN classes c ON ep.class_id = c.id JOIN users u ON ep.teacher_id = u.id LEFT JOIN teachers t ON t.user_id = u.id AND t.tenant_id = ep.tenant_id WHERE ep.id = ? AND ep.tenant_id = ?', [req.params.id, req.tenant.id]);
    if (!paper.length) return res.status(404).send('Paper not found');
    const [questions] = await db.execute('SELECT * FROM questions WHERE paper_id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    res.render('exams/view_paper', { paper: paper[0], questions });
});
// ENTER MARKS (Question level)
router.get('/papers/:id/enter-marks', isTeacher, async (req, res) => {
    // Both Admin and the assigned Teacher can enter marks
    const [paper] = await db.execute('SELECT ep.*, e.name as exam_name, c.name_ar as class_name FROM exam_papers ep JOIN exams e ON ep.exam_id = e.id JOIN classes c ON ep.class_id = c.id WHERE ep.id = ? AND ep.tenant_id = ?', [req.params.id, req.tenant.id]);
    if (!paper.length) return res.status(404).send('Paper not found');
    
    // Auth check: Must be Admin OR the teacher assigned to the paper
    const isAdminUser = ['admin', 'مدير', 'ناظم'].includes(req.session.role);
    if (!isAdminUser && paper[0].teacher_id !== req.session.userId) {
        return res.status(403).send('Not authorized to mark this paper');
    }

    // Get all students enrolled in this class
    const [students] = await db.execute(`
        SELECT s.id, s.name, s.roll_number 
        FROM students s
        WHERE s.class_id = ? AND s.tenant_id = ?
        ORDER BY s.roll_number ASC, s.name ASC
    `, [paper[0].class_id, req.tenant.id]);

    // Get all questions for this paper, ordered by id
    const [questions] = await db.execute('SELECT * FROM questions WHERE paper_id = ? AND tenant_id = ? ORDER BY id ASC', [req.params.id, req.tenant.id]);

    // Get existing marks per question
    const [marksRows] = await db.execute('SELECT * FROM student_marks WHERE paper_id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    const marksByStudent = {};
    marksRows.forEach(m => {
        if (!marksByStudent[m.student_id]) marksByStudent[m.student_id] = {};
        marksByStudent[m.student_id][m.question_id] = m.marks_obtained;
    });

    // Get existing paper results (totals and attendance)
    const [resultsRows] = await db.execute('SELECT * FROM student_paper_results WHERE paper_id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    const resultsByStudent = {};
    resultsRows.forEach(r => {
        resultsByStudent[r.student_id] = r;
    });

    res.render('exams/enter_marks', { 
        paper: paper[0], 
        students, 
        questions, 
        marksByStudent, 
        resultsByStudent,
        isAdmin: isAdminUser
    });
});

router.post('/papers/:id/save-marks-row', isTeacher, async (req, res) => {
    const paperId = req.params.id;
    const { student_id, is_absent, marks } = req.body;
    
    try {
        const [paper] = await db.execute('SELECT is_locked FROM exam_papers WHERE id = ? AND tenant_id = ?', [paperId, req.tenant.id]);
        if (paper.length > 0 && paper[0].is_locked) {
            return res.status(403).json({ success: false, message: 'Paper is locked. Marks cannot be modified.' });
        }

        let totalObtained = 0;
        const isAbsent = is_absent === 'true' || is_absent === true;

        if (!isAbsent && marks) {
            // Upsert each question mark
            for (const [questionId, marksObtained] of Object.entries(marks)) {
                const val = Number(marksObtained) || 0;
                totalObtained += val;
                
                await db.execute(`
                    INSERT INTO student_marks (tenant_id, paper_id, student_id, question_id, marks_obtained) 
                    VALUES (?, ?, ?, ?, ?) 
                    ON DUPLICATE KEY UPDATE marks_obtained = ?
                `, [req.tenant.id, paperId, student_id, questionId, val, val]);
            }
        }

        if (isAbsent) totalObtained = 0;

        // Upsert the total result
        await db.execute(`
            INSERT INTO student_paper_results (tenant_id, paper_id, student_id, total_marks_obtained, is_absent) 
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE total_marks_obtained = ?, is_absent = ?
        `, [req.tenant.id, paperId, student_id, totalObtained, isAbsent ? 1 : 0, totalObtained, isAbsent ? 1 : 0]);

        res.json({ success: true, totalObtained, isAbsent });
    } catch (err) {
        console.error('Error saving marks:', err);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

// ADMIN: Lock/Unlock Paper
router.post('/papers/:id/toggle-lock', isAdmin, async (req, res) => {
    try {
        const [paper] = await db.execute('SELECT is_locked FROM exam_papers WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
        if (!paper.length) return res.status(404).send('Paper not found');
        
        const newLockState = paper[0].is_locked ? 0 : 1;
        await db.execute('UPDATE exam_papers SET is_locked = ? WHERE id = ? AND tenant_id = ?', [newLockState, req.params.id, req.tenant.id]);
        
        res.redirect(`/papers/${req.params.id}/enter-marks`);
    } catch (err) {
        console.error('Error toggling lock:', err);
        res.status(500).send('Database error');
    }
});

// ADMIN: Update Paper Date
router.post('/papers/:id/update-date', isAdmin, async (req, res) => {
    try {
        let { paper_date } = req.body;
        if (!paper_date) {
            paper_date = null;
        }
        await db.execute('UPDATE exam_papers SET paper_date = ? WHERE id = ? AND tenant_id = ?', [paper_date, req.params.id, req.tenant.id]);
        const referer = req.get('Referer');
        res.redirect(referer ? referer : '/exams');
    } catch (err) {
        console.error('Error updating paper date:', err);
        res.status(500).send('Database error');
    }
});

// ADMIN/STUDENT: Report Card
router.get('/exams/:exam_id/student/:student_id/report-card', async (req, res) => {
    const [student] = await db.execute('SELECT * FROM students WHERE id = ? AND tenant_id = ?', [req.params.student_id, req.tenant.id]);
    
    if (!student || student.length === 0) {
        return res.status(404).send('Student not found');
    }

    const [exam] = await db.execute('SELECT name FROM exams WHERE id = ? AND tenant_id = ?', [req.params.exam_id, req.tenant.id]);

    const [results] = await db.execute(`
        SELECT 
            ep.id as paper_id, 
            ep.subject, 
            ep.max_marks,
            spr.marks_obtained,
            spr.is_absent
        FROM exam_papers ep
        LEFT JOIN student_paper_results spr ON ep.id = spr.paper_id AND spr.student_id = ?
        WHERE ep.exam_id = ? AND ep.class_id = ? AND ep.tenant_id = ?
        ORDER BY ep.subject ASC
    `, [req.params.student_id, req.params.exam_id, student[0].class_id, req.tenant.id]);
    
    let totalObtained = 0, totalMax = 0;
    let markedCount = 0;
    
    results.forEach(r => { 
        totalMax += r.max_marks;
        if (r.marks_obtained !== null) {
            totalObtained += r.marks_obtained; 
            markedCount++;
        }
    });
    
    const allPapersUnmarked = markedCount === 0;
    const percentage = totalMax > 0 && !allPapersUnmarked ? (totalObtained / totalMax) * 100 : 0;
    
    let grade = 'F (Rasib)', gradeClass = 'danger';
    if (!allPapersUnmarked) {
        if (percentage >= 80) { grade = 'A+ (Mumtaz)'; gradeClass = 'success'; }
        else if (percentage >= 60) { grade = 'A (Jaid Jiddan)'; gradeClass = 'primary'; }
        else if (percentage >= 50) { grade = 'B (Jaid)'; gradeClass = 'info'; }
        else if (percentage >= 40) { grade = 'C (Maqbool)'; gradeClass = 'warning'; }
    }

    res.render('exams/report_card', { 
        student: student[0], 
        exam: exam[0],
        results, 
        totalObtained, 
        totalMax, 
        percentage: percentage.toFixed(2), 
        grade, 
        gradeClass,
        allPapersUnmarked
    });
});

module.exports = router;

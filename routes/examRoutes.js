const express = require('express');
const router = express.Router();
const db = require('../db');

const isAdmin = (req, res, next) => { 
    if (req.session.role && ['admin', 'مدير', 'ناظم'].includes(req.session.role)) next(); 
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
    const [students] = await db.execute(`
        SELECT DISTINCT s.id, s.name, c.name_ar as class_name 
        FROM students s 
        JOIN classes c ON s.class_id = c.id 
        JOIN exam_papers ep ON ep.class_id = c.id 
        WHERE ep.exam_id = ? AND ep.tenant_id = ?
    `, [req.params.id, req.tenant.id]);
    res.render('exams/results', { students, exam_id: req.params.id });
});

// ADMIN: Create Exam
router.post('/exams', isAdmin, async (req, res) => {
    try {
        const [result] = await db.execute('INSERT INTO exams (name, created_by, tenant_id) VALUES (?, ?, ?)', [req.body.name, req.session.userId, req.tenant.id]);
        const examId = result.insertId;

        // Auto-assign papers based on active assignments
        const [assignments] = await db.execute(`
            SELECT tb.class_id, tb.teacher_id, b.title as subject
            FROM teacher_books tb
            JOIN books b ON tb.book_id = b.id AND b.tenant_id = tb.tenant_id
            JOIN sessions s ON tb.session_id = s.id AND s.tenant_id = tb.tenant_id
            WHERE s.is_active = TRUE AND tb.tenant_id = ?
        `, [req.tenant.id]);

        for (const a of assignments) {
            const [paperResult] = await db.execute(
                'INSERT INTO exam_papers (exam_id, class_id, subject, teacher_id, max_marks, tenant_id) VALUES (?, ?, ?, ?, ?, ?)', 
                [examId, a.class_id, a.subject, a.teacher_id, 100, req.tenant.id]
            );
            const paperId = paperResult.insertId;

            // Generate default template: 3 questions, 2 parts each (total 100 marks)
            const templateQuestions = [
                { text: 'Question 1 Part A', marks: 17, section: 'Q1' },
                { text: 'Question 1 Part B', marks: 16, section: 'Q1' },
                { text: 'Question 2 Part A', marks: 17, section: 'Q2' },
                { text: 'Question 2 Part B', marks: 16, section: 'Q2' },
                { text: 'Question 3 Part A', marks: 17, section: 'Q3' },
                { text: 'Question 3 Part B', marks: 17, section: 'Q3' }
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
        res.status(500).send('Error creating exam and auto-assigning papers.');
    }
});

// ADMIN: Delete Exam
router.post('/exams/:id/delete', isAdmin, async (req, res) => {
    try {
        // Due to foreign key constraints, related exam_papers and questions should cascade or be deleted.
        // Assuming ON DELETE CASCADE is set up for exam_papers. If not, we might need to delete them manually.
        await db.execute('DELETE FROM exams WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
        res.redirect('/exams');
    } catch (error) {
        console.error('Error deleting exam:', error);
        res.status(500).send('Error deleting exam');
    }
});

// ADMIN: Assign Papers
router.get('/exams/:id/assign', isAdmin, async (req, res) => {
    const [exam] = await db.execute('SELECT * FROM exams WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    const [classes] = await db.execute('SELECT * FROM classes WHERE tenant_id = ?', [req.tenant.id]);
    const [teachers] = await db.execute('SELECT * FROM users WHERE role = "أستاذ" AND tenant_id = ?', [req.tenant.id]);
    const [books] = await db.execute('SELECT id, title, class_id FROM books WHERE tenant_id = ?', [req.tenant.id]);
    const [assignedPapers] = await db.execute(`SELECT ep.*, c.name_ar as class_name, u.username as teacher_name FROM exam_papers ep JOIN classes c ON ep.class_id = c.id JOIN users u ON ep.teacher_id = u.id WHERE ep.exam_id = ? AND ep.tenant_id = ?`, [req.params.id, req.tenant.id]);
    res.render('exams/assign', { exam: exam[0], classes, teachers, assignedPapers, books });
});

router.post('/exams/:id/assign', isAdmin, async (req, res) => {
    await db.execute('INSERT INTO exam_papers (exam_id, class_id, subject, teacher_id, max_marks, tenant_id) VALUES (?, ?, ?, ?, ?, ?)', [req.params.id, req.body.class_id, req.body.subject, req.body.teacher_id, req.body.max_marks || 100, req.tenant.id]);
    res.redirect(`/exams/${req.params.id}/assign`);
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

router.post('/papers/:id/submit', isTeacher, async (req, res) => {
    await db.execute('UPDATE exam_papers SET status = "submitted" WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    res.redirect('/papers/my-tasks');
});

// ADMIN: All Papers
router.get('/papers/all', isAdmin, async (req, res) => {
    const [papers] = await db.execute('SELECT ep.*, e.name as exam_name, c.name_ar as class_name, u.username as teacher_name FROM exam_papers ep JOIN exams e ON ep.exam_id = e.id JOIN classes c ON ep.class_id = c.id JOIN users u ON ep.teacher_id = u.id WHERE ep.tenant_id = ? ORDER BY e.created_at DESC, ep.id DESC', [req.tenant.id]);
    res.render('exams/all_papers', { papers });
});

// ADMIN: Approvals
router.get('/papers/approvals', isAdmin, async (req, res) => {
    const [papers] = await db.execute('SELECT ep.*, e.name as exam_name, c.name_ar as class_name, u.username as teacher_name FROM exam_papers ep JOIN exams e ON ep.exam_id = e.id JOIN classes c ON ep.class_id = c.id JOIN users u ON ep.teacher_id = u.id WHERE ep.status IN ("submitted", "approved", "rejected") AND ep.tenant_id = ?', [req.tenant.id]);
    res.render('exams/approvals', { papers });
});

router.get('/papers/:id/view', isAdmin, async (req, res) => {
    const [paper] = await db.execute('SELECT ep.*, e.name as exam_name, c.name_ar as class_name, u.username as teacher_name FROM exam_papers ep JOIN exams e ON ep.exam_id = e.id JOIN classes c ON ep.class_id = c.id JOIN users u ON ep.teacher_id = u.id WHERE ep.id = ? AND ep.tenant_id = ?', [req.params.id, req.tenant.id]);
    if (!paper.length) return res.status(404).send('Paper not found');
    const [questions] = await db.execute('SELECT * FROM questions WHERE paper_id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    res.render('exams/view_paper', { paper: paper[0], questions });
});

router.post('/papers/:id/approve', isAdmin, async (req, res) => {
    await db.execute('UPDATE exam_papers SET status = ? WHERE id = ? AND tenant_id = ?', [req.body.status, req.params.id, req.tenant.id]);
    res.redirect('/papers/approvals');
});

// TEACHER: Mark Paper
router.get('/papers/:id/mark', isTeacher, async (req, res) => {
    const [paper] = await db.execute('SELECT * FROM exam_papers WHERE id = ? AND teacher_id = ? AND tenant_id = ?', [req.params.id, req.session.userId, req.tenant.id]);
    if (!paper.length) return res.status(403).send('Not authorized');
    const [students] = await db.execute('SELECT * FROM students WHERE class_id = ? AND tenant_id = ?', [paper[0].class_id, req.tenant.id]);
    res.render('exams/mark_paper', { paper: paper[0], students });
});

router.post('/papers/:id/mark', isTeacher, async (req, res) => {
    const { student_id, obtained_marks } = req.body;
    await db.execute('INSERT INTO student_results (paper_id, student_id, obtained_marks, marked_by, tenant_id) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE obtained_marks = ?', [req.params.id, student_id, obtained_marks, req.session.userId, req.tenant.id, obtained_marks]);
    res.redirect(`/papers/${req.params.id}/mark`);
});

// ADMIN/STUDENT: Report Card
router.get('/exams/:exam_id/student/:student_id/report-card', async (req, res) => {
    const [student] = await db.execute('SELECT * FROM students WHERE id = ? AND tenant_id = ?', [req.params.student_id, req.tenant.id]);
    
    if (!student || student.length === 0) {
        return res.status(404).send('Student not found');
    }

    const [results] = await db.execute('SELECT sr.*, ep.subject, ep.max_marks FROM student_results sr JOIN exam_papers ep ON sr.paper_id = ep.id WHERE sr.student_id = ? AND ep.exam_id = ? AND sr.tenant_id = ?', [req.params.student_id, req.params.exam_id, req.tenant.id]);
    
    let totalObtained = 0, totalMax = 0;
    results.forEach(r => { totalObtained += r.obtained_marks; totalMax += r.max_marks; });
    const percentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
    
    let grade = 'F (Rasib)', gradeClass = 'danger';
    if (percentage >= 80) { grade = 'A+ (Mumtaz)'; gradeClass = 'success'; }
    else if (percentage >= 60) { grade = 'A (Jaid Jiddan)'; gradeClass = 'primary'; }
    else if (percentage >= 50) { grade = 'B (Jaid)'; gradeClass = 'info'; }
    else if (percentage >= 40) { grade = 'C (Maqbool)'; gradeClass = 'warning'; }

    res.render('exams/report_card', { student: student[0], results, totalObtained, totalMax, percentage: percentage.toFixed(2), grade, gradeClass });
});

module.exports = router;

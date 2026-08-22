const express = require('express');
const router = express.Router();
const db = require('../db');
const puppeteer = require('puppeteer');
const multer = require('multer');
const { buildQuestionItems, recomputePaperTotal, sumMarks } = require('../lib/examMarks');
const { EXAM_TYPES, examDisplayName } = require('../lib/examNaming');

const isAdmin = (req, res, next) => {
    if (!req.session.userId || !req.session.role) return res.redirect('/login');
    if (['admin', 'مدير', 'ناظم'].includes(req.session.role)) next();
    else res.status(403).send('Access Denied');
};
const isTeacher = (req, res, next) => { if (req.session.userId) next(); else res.redirect('/login'); };
// Exam deletion is destructive-adjacent (it hides an exam and every paper
// under it) so it's restricted to مدير only, not ناظم - matching the same
// "most sensitive actions" pattern already used for permissions/data-import
// in reportRoutes.js.
const isMudeer = (req, res, next) => {
    if (!req.session.userId || !req.session.role) return res.redirect('/login');
    if (req.session.role === 'مدير') next();
    else res.status(403).send('Access Denied');
};

// JSON paper exports are small text files - keep them in memory rather than
// writing to disk, unlike the student-photo/document uploads elsewhere.
const paperImportUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 1 * 1024 * 1024 } });

// Default paper template: 3 plain single questions (no either/or choice
// groups) summing to 100. Teachers can still turn any of these into a choice
// group afterward from "Build Paper" or the Add Question dialog.
async function createDefaultQuestions(paperId, tenantId) {
    const questionMarks = [34, 33, 33];
    const sections = ['الف', 'ب', 'ج'];
    for (let i = 0; i < questionMarks.length; i++) {
        await db.execute('INSERT INTO questions (paper_id, question_text, marks, section, tenant_id) VALUES (?, ?, ?, ?, ?)', [paperId, '', questionMarks[i], sections[i], tenantId]);
    }
    await recomputePaperTotal(paperId, tenantId);
}

// ADMIN: List Exams
router.get('/exams', isAdmin, async (req, res) => {
    const [exams] = await db.execute('SELECT * FROM exams WHERE tenant_id = ? AND deleted_at IS NULL ORDER BY created_at DESC', [req.tenant.id]);
    exams.forEach(e => { e.name = examDisplayName(e, req.getLocale()); });
    res.render('exams/list', { exams });
});

// ADMIN: View Results
router.get('/exams/:id/results', isAdmin, async (req, res) => {
    let query = `
        SELECT DISTINCT s.id, s.name, c.name_ar as class_name 
        FROM students s 
        JOIN classes c ON s.class_id = c.id 
        JOIN exam_papers ep ON ep.class_id = c.id
        WHERE ep.exam_id = ? AND ep.tenant_id = ? AND ep.deleted_at IS NULL
    `;
    const params = [req.params.id, req.tenant.id];
    
    if (req.query.classId) {
        query += ' AND s.class_id = ?';
        params.push(req.query.classId);
    }
    
    query += ' ORDER BY c.name_ar ASC, s.name ASC';

    const [students] = await db.execute(query, params);
    
    const [exam] = await db.execute('SELECT * FROM exams WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    if (exam[0]) exam[0].name = examDisplayName(exam[0], req.getLocale());
    const [classes] = await db.execute('SELECT DISTINCT c.id, c.name_ar FROM classes c JOIN exam_papers ep ON c.id = ep.class_id WHERE ep.exam_id = ? AND ep.tenant_id = ? AND ep.deleted_at IS NULL ORDER BY c.name_ar ASC', [req.params.id, req.tenant.id]);

    res.render('exams/results', {
        students,
        exam: exam[0],
        classes,
        selectedClassId: req.query.classId || ''
    });
});

// ADMIN (مدير only): Create Exam - creating an exam auto-assigns a paper to
// every teacher with an active book assignment, so it's restricted the same
// way as exam delete rather than left open to ناظم.
router.post('/exams', isMudeer, async (req, res) => {
    try {
        if (!EXAM_TYPES.includes(req.body.exam_type)) {
            return res.status(400).send('Invalid exam type');
        }
        const examType = req.body.exam_type;
        const examYear = parseInt(req.body.exam_year, 10) || new Date().getFullYear();
        // Store a plain-text snapshot too (in the request's current locale) so the
        // exam still has a readable name even outside the type+year-aware routes;
        // examDisplayName() regenerates the locale-correct name from type+year
        // wherever an exam is actually displayed.
        const fallbackName = examDisplayName({ exam_type: examType, exam_year: examYear }, req.getLocale());
        const [result] = await db.execute(
            'INSERT INTO exams (name, exam_type, exam_year, created_by, tenant_id) VALUES (?, ?, ?, ?, ?)',
            [fallbackName, examType, examYear, req.session.userId, req.tenant.id]
        );
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
                [examId, a.class_id, a.subject, a.teacher_id, 0, req.tenant.id]
            );
            await createDefaultQuestions(paperResult.insertId, req.tenant.id);
        }
        res.redirect('/exams');
    } catch (error) {
        console.error('Error creating exam:', error);
        res.status(500).send('Error creating exam and auto-assigning papers. Details: ' + error.message + '<br><pre>' + error.stack + '</pre>');
    }
});

// ADMIN (مدير only): Delete Exam - soft delete. The exam AND each of its
// papers are marked deleted (hidden from every list), but questions, choice
// groups, and results underneath those papers are left in the database
// completely untouched. The request must repeat the exam's exact displayed
// name as a typed confirmation (checked here, not just client-side) before
// anything happens.
router.post('/exams/:id/delete', isMudeer, async (req, res) => {
    try {
        const [examRows] = await db.execute('SELECT * FROM exams WHERE id = ? AND tenant_id = ? AND deleted_at IS NULL', [req.params.id, req.tenant.id]);
        if (!examRows.length) return res.status(404).send('Exam not found');

        const expectedName = examDisplayName(examRows[0], req.getLocale());
        const confirmText = (req.body.confirm_text || '').trim();
        if (confirmText !== expectedName) {
            return res.status(400).send('Confirmation text did not match the exam name. Nothing was deleted.');
        }

        await db.execute('UPDATE exams SET deleted_at = NOW() WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
        await db.execute('UPDATE exam_papers SET deleted_at = NOW() WHERE exam_id = ? AND tenant_id = ? AND deleted_at IS NULL', [req.params.id, req.tenant.id]);
        res.redirect('/exams');
    } catch (error) {
        console.error('Error deleting exam:', error);
        res.status(500).send('Error deleting exam');
    }
});

// ADMIN: Assign Papers
// Route removed as it's now handled by modal in exam_papers

router.post('/exams/:id/assign', isAdmin, async (req, res) => {
    const [result] = await db.execute('INSERT INTO exam_papers (exam_id, class_id, subject, teacher_id, max_marks, tenant_id) VALUES (?, ?, ?, ?, ?, ?)', [req.params.id, req.body.class_id, req.body.subject, req.body.teacher_id, 0, req.tenant.id]);
    // Every new paper starts with the default 3-plain-questions template;
    // teachers can freely add/remove/group questions afterward from "Build Paper".
    await createDefaultQuestions(result.insertId, req.tenant.id);
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
    const [papers] = await db.execute(`SELECT ep.*, e.name as exam_name, e.exam_type, e.exam_year, c.name_ar as class_name FROM exam_papers ep JOIN exams e ON ep.exam_id = e.id JOIN classes c ON ep.class_id = c.id WHERE ep.teacher_id = ? AND ep.tenant_id = ? AND e.deleted_at IS NULL AND ep.deleted_at IS NULL`, [req.session.userId, req.tenant.id]);
    papers.forEach(p => { p.exam_name = examDisplayName({ name: p.exam_name, exam_type: p.exam_type, exam_year: p.exam_year }, req.getLocale()); });
    res.render('exams/teacher_tasks', { papers });
});

// TEACHER: Paper Builder
router.get('/papers/:id/build', isTeacher, async (req, res) => {
    const [paper] = await db.execute('SELECT * FROM exam_papers WHERE id = ? AND teacher_id = ? AND tenant_id = ?', [req.params.id, req.session.userId, req.tenant.id]);
    if (!paper.length) return res.status(403).send('Not authorized');
    const [questions] = await db.execute(
        `SELECT q.*, g.required_count
         FROM questions q LEFT JOIN question_choice_groups g ON g.id = q.choice_group_id
         WHERE q.paper_id = ? AND q.tenant_id = ? ORDER BY q.id ASC`,
        [req.params.id, req.tenant.id]
    );
    res.render('exams/paper_builder', { paper: paper[0], questions, items: buildQuestionItems(questions) });
});

router.post('/papers/:id/questions', isTeacher, async (req, res) => {
    await db.execute('INSERT INTO questions (paper_id, question_text, marks, section, tenant_id) VALUES (?, ?, ?, ?, ?)', [req.params.id, req.body.question_text, req.body.marks, req.body.section || 'A', req.tenant.id]);
    await recomputePaperTotal(req.params.id, req.tenant.id);
    const referer = req.get('Referer');
    res.redirect(referer ? referer : `/papers/${req.params.id}/build`);
});

// Add a question directly as a choice group from the "Add Question" dialog:
// one or more alternative parts, all sharing the same marks, optionally
// grouped into "answer required_count of these" if 2+ parts were given.
router.post('/papers/:id/questions/with-choice', isTeacher, async (req, res) => {
    const paperId = req.params.id;
    const referer = req.get('Referer') || `/papers/${paperId}/build`;

    let texts = req.body.question_text;
    if (!Array.isArray(texts)) texts = texts ? [texts] : [];
    texts = texts.map(t => (t || '').trim());
    while (texts.length > 1 && texts[texts.length - 1] === '') texts.pop();
    if (texts.length === 0) texts = [''];

    const marks = parseInt(req.body.marks, 10);
    if (!marks || marks < 1) return res.status(400).send('Invalid marks');

    // A single part keeps any custom section label the teacher typed; multiple
    // parts (a real choice group) get auto-labeled الف/ب/ج... since one free-text
    // field can't sensibly label N alternatives.
    const partLabels = texts.length === 1 && req.body.section
        ? [req.body.section]
        : ['الف', 'ب', 'ج', 'د', 'ه', 'و', 'ز', 'ح'];
    const insertedIds = [];
    for (let i = 0; i < texts.length; i++) {
        const [q] = await db.execute(
            'INSERT INTO questions (paper_id, question_text, marks, section, tenant_id) VALUES (?, ?, ?, ?, ?)',
            [paperId, texts[i], marks, partLabels[i] || String(i + 1), req.tenant.id]
        );
        insertedIds.push(q.insertId);
    }

    if (insertedIds.length >= 2) {
        const requiredCount = Math.min(Math.max(1, parseInt(req.body.required_count, 10) || 1), insertedIds.length);
        const [group] = await db.execute('INSERT INTO question_choice_groups (tenant_id, paper_id, required_count) VALUES (?, ?, ?)', [req.tenant.id, paperId, requiredCount]);
        const placeholders = insertedIds.map(() => '?').join(',');
        await db.execute(`UPDATE questions SET choice_group_id = ? WHERE id IN (${placeholders}) AND tenant_id = ?`, [group.insertId, ...insertedIds, req.tenant.id]);
    }

    await recomputePaperTotal(paperId, req.tenant.id);
    res.redirect(referer);
});

router.post('/questions/:id/edit', isTeacher, async (req, res) => {
    const [rows] = await db.execute('SELECT paper_id FROM questions WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    if (!rows.length) return res.status(404).send('Question not found');
    await db.execute('UPDATE questions SET question_text = ?, marks = ?, section = ? WHERE id = ? AND tenant_id = ?', [req.body.question_text, req.body.marks, req.body.section, req.params.id, req.tenant.id]);
    await recomputePaperTotal(rows[0].paper_id, req.tenant.id);
    const referer = req.get('Referer');
    res.redirect(referer ? referer : '/exams');
});

router.post('/questions/:id/delete', isTeacher, async (req, res) => {
    const [rows] = await db.execute('SELECT paper_id, choice_group_id FROM questions WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    if (!rows.length) return res.redirect(req.get('Referer') || '/exams');
    const { paper_id, choice_group_id } = rows[0];
    await db.execute('DELETE FROM questions WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    if (choice_group_id) {
        // A choice group with 0 or 1 remaining member no longer expresses a real choice - dissolve it.
        const [remaining] = await db.execute('SELECT id FROM questions WHERE choice_group_id = ? AND tenant_id = ?', [choice_group_id, req.tenant.id]);
        if (remaining.length <= 1) {
            await db.execute('UPDATE questions SET choice_group_id = NULL WHERE choice_group_id = ? AND tenant_id = ?', [choice_group_id, req.tenant.id]);
            await db.execute('DELETE FROM question_choice_groups WHERE id = ? AND tenant_id = ?', [choice_group_id, req.tenant.id]);
        }
    }
    await recomputePaperTotal(paper_id, req.tenant.id);
    const referer = req.get('Referer');
    res.redirect(referer ? referer : '/exams');
});

// Group 2+ ungrouped questions of this paper into a choice group ("answer required_count of these").
router.post('/papers/:id/choice-groups', isTeacher, async (req, res) => {
    const paperId = req.params.id;
    let questionIds = req.body.question_ids;
    if (!Array.isArray(questionIds)) questionIds = questionIds ? [questionIds] : [];
    questionIds = [...new Set(questionIds.map(Number).filter(n => Number.isInteger(n) && n > 0))];
    const requiredCount = Math.max(1, parseInt(req.body.required_count, 10) || 1);
    const referer = req.get('Referer') || `/papers/${paperId}/build`;

    if (questionIds.length < 2) {
        return res.status(400).send('Select at least 2 questions to group');
    }

    const placeholders = questionIds.map(() => '?').join(',');
    const [rows] = await db.execute(
        `SELECT id, marks, choice_group_id FROM questions WHERE id IN (${placeholders}) AND paper_id = ? AND tenant_id = ?`,
        [...questionIds, paperId, req.tenant.id]
    );
    if (rows.length !== questionIds.length || rows.some(r => r.choice_group_id)) {
        return res.status(400).send('Invalid selection: questions must belong to this paper and not already be grouped');
    }
    const finalRequiredCount = Math.min(requiredCount, questionIds.length);

    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const [group] = await conn.execute(
            'INSERT INTO question_choice_groups (tenant_id, paper_id, required_count) VALUES (?, ?, ?)',
            [req.tenant.id, paperId, finalRequiredCount]
        );
        await conn.execute(
            `UPDATE questions SET choice_group_id = ? WHERE id IN (${placeholders}) AND tenant_id = ?`,
            [group.insertId, ...questionIds, req.tenant.id]
        );
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        conn.release();
        console.error('Error creating choice group:', err);
        return res.status(500).send('Database error');
    }
    conn.release();

    await recomputePaperTotal(paperId, req.tenant.id);
    res.redirect(referer);
});

// Dissolve a choice group back into standalone questions.
router.post('/choice-groups/:id/ungroup', isTeacher, async (req, res) => {
    const [rows] = await db.execute('SELECT paper_id FROM question_choice_groups WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    if (!rows.length) return res.status(404).send('Group not found');
    const paperId = rows[0].paper_id;
    await db.execute('UPDATE questions SET choice_group_id = NULL WHERE choice_group_id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    await db.execute('DELETE FROM question_choice_groups WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    await recomputePaperTotal(paperId, req.tenant.id);
    res.redirect(req.get('Referer') || '/exams');
});

// Change how many members of a choice group the student must answer.
router.post('/choice-groups/:id/edit', isTeacher, async (req, res) => {
    const [rows] = await db.execute('SELECT paper_id FROM question_choice_groups WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    if (!rows.length) return res.status(404).send('Group not found');
    const paperId = rows[0].paper_id;
    const [members] = await db.execute('SELECT id FROM questions WHERE choice_group_id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    const requiredCount = Math.min(Math.max(1, parseInt(req.body.required_count, 10) || 1), members.length || 1);
    await db.execute('UPDATE question_choice_groups SET required_count = ? WHERE id = ? AND tenant_id = ?', [requiredCount, req.params.id, req.tenant.id]);
    await recomputePaperTotal(paperId, req.tenant.id);
    res.redirect(req.get('Referer') || '/exams');
});

// Recreate the default 3-question / 100-mark template for an empty paper.
router.post('/papers/:id/generate-default', isTeacher, async (req, res) => {
    const [paper] = await db.execute('SELECT id FROM exam_papers WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    if (!paper.length) return res.status(404).send('Paper not found');
    await createDefaultQuestions(req.params.id, req.tenant.id);
    res.redirect(`/papers/${req.params.id}/view`);
});

// Shared by the single-paper and bulk exam exports below: turn one paper's
// questions/choice-groups into the portable JSON shape used for export/import.
// Re-keys each choice_group_id to a small sequential ref - the real database
// id is meaningless once imported elsewhere (or back into this same paper
// after its rows have been recreated).
async function buildPaperExportQuestions(paperId, tenantId) {
    const [questions] = await db.execute(
        `SELECT q.question_text, q.marks, q.section, q.choice_group_id, g.required_count
         FROM questions q LEFT JOIN question_choice_groups g ON g.id = q.choice_group_id
         WHERE q.paper_id = ? AND q.tenant_id = ? ORDER BY q.id ASC`,
        [paperId, tenantId]
    );
    const groupRefs = {};
    let nextRef = 1;
    return questions.map(q => {
        let groupRef = null;
        if (q.choice_group_id) {
            if (!(q.choice_group_id in groupRefs)) groupRefs[q.choice_group_id] = nextRef++;
            groupRef = groupRefs[q.choice_group_id];
        }
        return {
            question_text: q.question_text,
            marks: q.marks,
            section: q.section,
            group_ref: groupRef,
            required_count: groupRef ? q.required_count : null
        };
    });
}

// Export a paper's questions/choice-groups/note as a portable JSON file, so a
// teacher can back up a paper before making risky changes and restore it via
// the import endpoint below if something goes wrong.
router.get('/papers/:id/export', isTeacher, async (req, res) => {
    const [paperRows] = await db.execute('SELECT * FROM exam_papers WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    if (!paperRows.length) return res.status(404).send('Paper not found');
    const paper = paperRows[0];

    const payload = {
        format: 'madrassa-exam-paper',
        version: 1,
        exported_at: new Date().toISOString(),
        subject: paper.subject,
        note_text: paper.note_text,
        questions: await buildPaperExportQuestions(paper.id, req.tenant.id)
    };

    const safeSubject = (paper.subject || 'paper').replace(/[^\w\-]+/g, '_');
    res.setHeader('Content-Disposition', `attachment; filename="paper-${paper.id}-${safeSubject}.json"`);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(JSON.stringify(payload, null, 2));
});

// Export every paper under an exam (including already soft-deleted ones) as
// a single JSON file - the bulk equivalent of the per-paper export above,
// meant as a full backup before deleting or otherwise touching an exam.
router.get('/exams/:id/export-papers', isAdmin, async (req, res) => {
    const [examRows] = await db.execute('SELECT * FROM exams WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    if (!examRows.length) return res.status(404).send('Exam not found');
    const exam = examRows[0];
    const examName = examDisplayName(exam, req.getLocale());

    const [papers] = await db.execute(
        `SELECT ep.*, c.name_ar as class_name, COALESCE(t.name, u.username) as teacher_name
         FROM exam_papers ep
         JOIN classes c ON ep.class_id = c.id
         JOIN users u ON ep.teacher_id = u.id
         LEFT JOIN teachers t ON t.user_id = u.id AND t.tenant_id = ep.tenant_id
         WHERE ep.exam_id = ? AND ep.tenant_id = ?
         ORDER BY c.name_ar ASC, ep.subject ASC`,
        [req.params.id, req.tenant.id]
    );

    const exportedPapers = [];
    for (const paper of papers) {
        exportedPapers.push({
            format: 'madrassa-exam-paper',
            version: 1,
            paper_id: paper.id,
            class_name: paper.class_name,
            teacher_name: paper.teacher_name,
            paper_date: paper.paper_date,
            deleted: !!paper.deleted_at,
            subject: paper.subject,
            note_text: paper.note_text,
            questions: await buildPaperExportQuestions(paper.id, req.tenant.id)
        });
    }

    const payload = {
        format: 'madrassa-exam-papers-bulk',
        version: 1,
        exported_at: new Date().toISOString(),
        exam_name: examName,
        papers: exportedPapers
    };

    const safeExamName = examName.replace(/[^\w\-]+/g, '_');
    res.setHeader('Content-Disposition', `attachment; filename="exam-${exam.id}-${safeExamName}-papers.json"`);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(JSON.stringify(payload, null, 2));
});

// Import a previously exported JSON file into this paper, replacing its
// current questions/choice-groups/note entirely - the standard way to
// restore a paper from a backup taken via the export endpoint above.
router.post('/papers/:id/import', isTeacher, paperImportUpload.single('file'), async (req, res) => {
    const [paperRows] = await db.execute('SELECT id FROM exam_papers WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    if (!paperRows.length) return res.status(404).send('Paper not found');
    if (!req.file) return res.status(400).send('No file uploaded');

    let payload;
    try {
        payload = JSON.parse(req.file.buffer.toString('utf8'));
    } catch (e) {
        return res.status(400).send('Invalid JSON file');
    }
    if (payload.format !== 'madrassa-exam-paper' || !Array.isArray(payload.questions)) {
        return res.status(400).send('Not a valid exam paper export file');
    }

    const paperId = req.params.id;
    const tenantId = req.tenant.id;

    // Deleting questions cascades to student_marks (fk_sm_question ON DELETE
    // CASCADE) and clears choice_group_id on any other row via fk_question_choice_group.
    await db.execute('DELETE FROM questions WHERE paper_id = ? AND tenant_id = ?', [paperId, tenantId]);
    await db.execute('DELETE FROM question_choice_groups WHERE paper_id = ? AND tenant_id = ?', [paperId, tenantId]);

    const groupIdByRef = {};
    for (const q of payload.questions) {
        let choiceGroupId = null;
        if (q.group_ref) {
            if (!(q.group_ref in groupIdByRef)) {
                const requiredCount = Math.max(1, parseInt(q.required_count, 10) || 1);
                const [group] = await db.execute('INSERT INTO question_choice_groups (tenant_id, paper_id, required_count) VALUES (?, ?, ?)', [tenantId, paperId, requiredCount]);
                groupIdByRef[q.group_ref] = group.insertId;
            }
            choiceGroupId = groupIdByRef[q.group_ref];
        }
        await db.execute(
            'INSERT INTO questions (paper_id, question_text, marks, section, choice_group_id, tenant_id) VALUES (?, ?, ?, ?, ?, ?)',
            [paperId, q.question_text || '', Number(q.marks) || 0, q.section || null, choiceGroupId, tenantId]
        );
    }

    if (typeof payload.note_text === 'string') {
        await db.execute('UPDATE exam_papers SET note_text = ? WHERE id = ? AND tenant_id = ?', [payload.note_text || null, paperId, tenantId]);
    }

    await recomputePaperTotal(paperId, tenantId);
    res.redirect(`/papers/${paperId}/view`);
});

// Update a paper's editable ملحوظة note. Empty text reverts to the default
// hardcoded wording (see view_paper.ejs) rather than storing a blank string.
router.post('/papers/:id/note', isTeacher, async (req, res) => {
    const [paper] = await db.execute('SELECT id FROM exam_papers WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    if (!paper.length) return res.status(404).send('Paper not found');
    const noteText = (req.body.note_text || '').trim();
    await db.execute('UPDATE exam_papers SET note_text = ? WHERE id = ? AND tenant_id = ?', [noteText || null, req.params.id, req.tenant.id]);
    res.redirect(`/papers/${req.params.id}/view`);
});
// ADMIN: All Papers for an Exam
router.get('/exams/:id/papers', isAdmin, async (req, res) => {
    // filled_question_count only counts rows with real question text - the
    // default template inserts 3 blank placeholder rows on every new paper
    // (see createDefaultQuestions above), so a raw COUNT(*) would show every
    // untouched paper as "already has 3 questions" even though the teacher
    // hasn't written anything yet.
    let query = `SELECT ep.*, e.name as exam_name, c.name_ar as class_name, COALESCE(t.name, u.username) as teacher_name,
        (SELECT COUNT(*) FROM questions q WHERE q.paper_id = ep.id AND q.tenant_id = ep.tenant_id) as question_count,
        (SELECT COUNT(*) FROM questions q WHERE q.paper_id = ep.id AND q.tenant_id = ep.tenant_id AND TRIM(q.question_text) <> '') as filled_question_count
        FROM exam_papers ep JOIN exams e ON ep.exam_id = e.id JOIN classes c ON ep.class_id = c.id JOIN users u ON ep.teacher_id = u.id LEFT JOIN teachers t ON t.user_id = u.id AND t.tenant_id = ep.tenant_id WHERE ep.exam_id = ? AND ep.tenant_id = ? AND ep.deleted_at IS NULL`;
    const params = [req.params.id, req.tenant.id];

    if (req.query.classId) {
        query += ' AND ep.class_id = ?';
        params.push(req.query.classId);
    }
    if (req.query.teacherId) {
        query += ' AND ep.teacher_id = ?';
        params.push(req.query.teacherId);
    }
    if (req.query.hasQuestions === 'yes') {
        query += ' HAVING filled_question_count > 0';
    } else if (req.query.hasQuestions === 'no') {
        query += ' HAVING filled_question_count = 0';
    }
    query += ' ORDER BY c.name_ar ASC, teacher_name ASC';

    const [papers] = await db.execute(query, params);

    // "کل نمبر" in the grid should reflect only questions the teacher has
    // actually written, not exam_papers.max_marks - that column is recomputed
    // from every question row including the blank placeholders createDefaultQuestions
    // inserts on a new paper, so an untouched paper would otherwise show 100.
    if (papers.length > 0) {
        const [filledQuestions] = await db.query(
            `SELECT q.paper_id, q.marks, q.choice_group_id, g.required_count
             FROM questions q
             LEFT JOIN question_choice_groups g ON g.id = q.choice_group_id
             WHERE q.paper_id IN (?) AND q.tenant_id = ? AND TRIM(q.question_text) <> ''`,
            [papers.map(p => p.id), req.tenant.id]
        );
        const byPaper = {};
        for (const q of filledQuestions) {
            (byPaper[q.paper_id] = byPaper[q.paper_id] || []).push(q);
        }
        papers.forEach(p => { p.filled_marks_total = sumMarks(byPaper[p.id] || []); });
    }

    const [exam] = await db.execute('SELECT * FROM exams WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    if (exam[0]) exam[0].name = examDisplayName(exam[0], req.getLocale());

    // Fetch unique classes and teachers for filters (based on this exam's papers)
    const [classes] = await db.execute('SELECT DISTINCT c.id, c.name_ar FROM classes c JOIN exam_papers ep ON c.id = ep.class_id WHERE ep.exam_id = ? AND ep.tenant_id = ? AND ep.deleted_at IS NULL ORDER BY c.name_ar ASC', [req.params.id, req.tenant.id]);
    const [teachers] = await db.execute('SELECT DISTINCT u.id, COALESCE(t.name, u.username) as name FROM users u JOIN exam_papers ep ON u.id = ep.teacher_id LEFT JOIN teachers t ON t.user_id = u.id AND t.tenant_id = ep.tenant_id WHERE ep.exam_id = ? AND ep.tenant_id = ? AND ep.deleted_at IS NULL ORDER BY name ASC', [req.params.id, req.tenant.id]);

    // Exam-wide stats (independent of the filters above) - how many of this
    // exam's papers actually have teacher-written questions, so the admin can
    // see at a glance how many teachers have started their paper.
    const [statsRows] = await db.execute(
        `SELECT COUNT(*) as total, SUM(CASE WHEN filled_count > 0 THEN 1 ELSE 0 END) as with_questions FROM (
            SELECT ep.id, (SELECT COUNT(*) FROM questions q WHERE q.paper_id = ep.id AND q.tenant_id = ep.tenant_id AND TRIM(q.question_text) <> '') as filled_count
            FROM exam_papers ep WHERE ep.exam_id = ? AND ep.tenant_id = ? AND ep.deleted_at IS NULL
        ) t`,
        [req.params.id, req.tenant.id]
    );
    const paperStats = { total: statsRows[0].total || 0, withQuestions: statsRows[0].with_questions || 0 };

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
        paperStats,
        selectedClassId: req.query.classId || '',
        selectedTeacherId: req.query.teacherId || '',
        selectedHasQuestions: req.query.hasQuestions || ''
    });
});

// ADMIN: Print every paper currently matching the grid's filters (same
// classId/teacherId/hasQuestions query params as /exams/:id/papers) as one
// document, one paper per page, so the admin can print a whole class/teacher
// slice at once instead of opening each paper individually.
router.get('/exams/:id/papers/print', isAdmin, async (req, res) => {
    let query = `SELECT ep.*, e.name as exam_name, c.name_ar as class_name, COALESCE(t.name, u.username) as teacher_name
        FROM exam_papers ep JOIN exams e ON ep.exam_id = e.id JOIN classes c ON ep.class_id = c.id JOIN users u ON ep.teacher_id = u.id LEFT JOIN teachers t ON t.user_id = u.id AND t.tenant_id = ep.tenant_id
        WHERE ep.exam_id = ? AND ep.tenant_id = ? AND ep.deleted_at IS NULL`;
    const params = [req.params.id, req.tenant.id];

    if (req.query.classId) {
        query += ' AND ep.class_id = ?';
        params.push(req.query.classId);
    }
    if (req.query.teacherId) {
        query += ' AND ep.teacher_id = ?';
        params.push(req.query.teacherId);
    }
    if (req.query.hasQuestions === 'yes') {
        query += ` AND EXISTS (SELECT 1 FROM questions q WHERE q.paper_id = ep.id AND q.tenant_id = ep.tenant_id AND TRIM(q.question_text) <> '')`;
    } else if (req.query.hasQuestions === 'no') {
        query += ` AND NOT EXISTS (SELECT 1 FROM questions q WHERE q.paper_id = ep.id AND q.tenant_id = ep.tenant_id AND TRIM(q.question_text) <> '')`;
    }
    query += ' ORDER BY c.name_ar ASC, teacher_name ASC';

    const [papers] = await db.execute(query, params);

    for (const p of papers) {
        const [questions] = await db.execute(
            `SELECT q.*, g.required_count
             FROM questions q LEFT JOIN question_choice_groups g ON g.id = q.choice_group_id
             WHERE q.paper_id = ? AND q.tenant_id = ? ORDER BY q.id ASC`,
            [p.id, req.tenant.id]
        );
        p.items = buildQuestionItems(questions);
    }

    const [exam] = await db.execute('SELECT * FROM exams WHERE id = ? AND tenant_id = ?', [req.params.id, req.tenant.id]);
    if (!exam.length) return res.status(404).send('Exam not found');
    exam[0].name = examDisplayName(exam[0], req.getLocale());

    res.render('exams/print_papers', { papers, exam: exam[0] });
});

router.get('/papers/:id/view', isAdmin, async (req, res) => {
    const [paper] = await db.execute('SELECT ep.*, e.name as exam_name, c.name_ar as class_name, COALESCE(t.name, u.username) as teacher_name FROM exam_papers ep JOIN exams e ON ep.exam_id = e.id JOIN classes c ON ep.class_id = c.id JOIN users u ON ep.teacher_id = u.id LEFT JOIN teachers t ON t.user_id = u.id AND t.tenant_id = ep.tenant_id WHERE ep.id = ? AND ep.tenant_id = ?', [req.params.id, req.tenant.id]);
    if (!paper.length) return res.status(404).send('Paper not found');
    const [questions] = await db.execute(
        `SELECT q.*, g.required_count
         FROM questions q LEFT JOIN question_choice_groups g ON g.id = q.choice_group_id
         WHERE q.paper_id = ? AND q.tenant_id = ? ORDER BY q.id ASC`,
        [req.params.id, req.tenant.id]
    );
    res.render('exams/view_paper', { paper: paper[0], questions, items: buildQuestionItems(questions) });
});
// ENTER MARKS (Question level)
router.get('/papers/:id/enter-marks', isTeacher, async (req, res) => {
    // Both Admin and the assigned Teacher can enter marks
    const [paper] = await db.execute('SELECT ep.*, e.name as exam_name, e.exam_type, e.exam_year, c.name_ar as class_name FROM exam_papers ep JOIN exams e ON ep.exam_id = e.id JOIN classes c ON ep.class_id = c.id WHERE ep.id = ? AND ep.tenant_id = ?', [req.params.id, req.tenant.id]);
    if (!paper.length) return res.status(404).send('Paper not found');
    paper[0].exam_name = examDisplayName({ name: paper[0].exam_name, exam_type: paper[0].exam_type, exam_year: paper[0].exam_year }, req.getLocale());

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

    // Get all questions for this paper (with their choice group, if any), ordered by id
    const [questions] = await db.execute(
        `SELECT q.*, g.required_count
         FROM questions q LEFT JOIN question_choice_groups g ON g.id = q.choice_group_id
         WHERE q.paper_id = ? AND q.tenant_id = ? ORDER BY q.id ASC`,
        [req.params.id, req.tenant.id]
    );
    const items = buildQuestionItems(questions);

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
        items,
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

// Shared data-fetching for the HTML and PDF date sheet routes
async function loadDatesheetData(examId, tenantId) {
    const [exam] = await db.execute('SELECT * FROM exams WHERE id = ? AND tenant_id = ?', [examId, tenantId]);
    if (!exam.length) return null;

    const [papers] = await db.execute(`
        SELECT ep.id, ep.subject, ep.paper_date, ep.max_marks, c.name_ar as class_name, COALESCE(t.name, u.username) as teacher_name
        FROM exam_papers ep
        JOIN classes c ON ep.class_id = c.id
        JOIN users u ON ep.teacher_id = u.id
        LEFT JOIN teachers t ON t.user_id = u.id AND t.tenant_id = ep.tenant_id
        WHERE ep.exam_id = ? AND ep.tenant_id = ?
        ORDER BY (ep.paper_date IS NULL) ASC, ep.paper_date ASC, c.name_ar ASC, ep.subject ASC
    `, [examId, tenantId]);

    // English day-name keys (index matches Date.getDay()) so the template can
    // translate them via __() into whatever locale the request is in, instead
    // of a language baked into the server-side array.
    const weekdayKeys = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // Use local date parts (not getUTCDay/toISOString) since mysql2 returns DATE
    // columns as local-midnight JS Date objects; converting to UTC can shift the
    // day backward for positive UTC-offset server timezones, mislabeling the weekday.
    const toLocalKey = (d) => {
        const dt = new Date(d);
        return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
    };
    const groups = [];
    const groupsByKey = {};
    for (const p of papers) {
        const key = p.paper_date ? toLocalKey(p.paper_date) : 'unset';
        if (!groupsByKey[key]) {
            const group = {
                date: p.paper_date,
                dayNameKey: p.paper_date ? weekdayKeys[new Date(p.paper_date).getDay()] : null,
                rowsByClass: {},
                rows: []
            };
            groupsByKey[key] = group;
            groups.push(group);
        }
        const group = groupsByKey[key];
        // Merge multiple papers for the same class on the same date into one row,
        // joining subjects (and teachers, if they differ) with "+".
        let row = group.rowsByClass[p.class_name];
        if (!row) {
            row = { class_name: p.class_name, subject: p.subject, teacher_name: p.teacher_name };
            group.rowsByClass[p.class_name] = row;
            group.rows.push(row);
        } else {
            if (!row.subject.split(' + ').includes(p.subject)) {
                row.subject += ' + ' + p.subject;
            }
            if (!row.teacher_name.split(' + ').includes(p.teacher_name)) {
                row.teacher_name += ' + ' + p.teacher_name;
            }
        }
    }
    groups.forEach(g => delete g.rowsByClass);

    return { exam: exam[0], groups };
}

// ALL USERS: Date Sheet (printable)
router.get('/exams/:id/datesheet', isTeacher, async (req, res) => {
    const data = await loadDatesheetData(req.params.id, req.tenant.id);
    if (!data) return res.status(404).send('Exam not found');
    data.exam.name = examDisplayName(data.exam, req.getLocale());
    res.render('exams/datesheet', data);
});

// ALL USERS: Date Sheet as a clean, server-rendered PDF (no browser print header/footer)
router.get('/exams/:id/datesheet/pdf', isTeacher, async (req, res) => {
    const data = await loadDatesheetData(req.params.id, req.tenant.id);
    if (!data) return res.status(404).send('Exam not found');
    data.exam.name = examDisplayName(data.exam, req.getLocale());

    res.render('exams/datesheet', data, async (err, html) => {
        if (err) {
            console.error('Error rendering date sheet for PDF:', err);
            return res.status(500).send('Error generating PDF');
        }

        const origin = `${req.protocol}://${req.get('host')}`;
        html = html.replace('<head>', `<head><base href="${origin}/">`);

        let browser;
        try {
            browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: 'networkidle0' });
            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true,
                displayHeaderFooter: false,
                margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
            });

            const rawName = `${data.exam.name} Date Sheet`.replace(/["\\]/g, '').trim();
            const asciiFallback = (rawName.replace(/[^\x20-\x7E]/g, '').trim().replace(/\s+/g, '_') || `datesheet-${data.exam.id}`) + '.pdf';
            const utf8Name = encodeURIComponent(`${rawName}.pdf`);
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${asciiFallback}"; filename*=UTF-8''${utf8Name}`
            });
            res.send(pdfBuffer);
        } catch (pdfErr) {
            console.error('Error generating date sheet PDF:', pdfErr);
            res.status(500).send('Error generating PDF');
        } finally {
            if (browser) await browser.close();
        }
    });
});

// ADMIN/STUDENT: Report Card
router.get('/exams/:exam_id/student/:student_id/report-card', async (req, res) => {
    const [student] = await db.execute('SELECT * FROM students WHERE id = ? AND tenant_id = ?', [req.params.student_id, req.tenant.id]);
    
    if (!student || student.length === 0) {
        return res.status(404).send('Student not found');
    }

    const [exam] = await db.execute('SELECT id, name, exam_type, exam_year FROM exams WHERE id = ? AND tenant_id = ?', [req.params.exam_id, req.tenant.id]);
    if (exam[0]) exam[0].name = examDisplayName(exam[0], req.getLocale());

    const [results] = await db.execute(`
        SELECT 
            ep.id as paper_id, 
            ep.subject, 
            ep.max_marks,
            sr.obtained_marks
        FROM exam_papers ep
        LEFT JOIN student_results sr ON ep.id = sr.paper_id AND sr.student_id = ?
        WHERE ep.exam_id = ? AND ep.class_id = ? AND ep.tenant_id = ?
        ORDER BY ep.subject ASC
    `, [req.params.student_id, req.params.exam_id, student[0].class_id, req.tenant.id]);
    
    let totalObtained = 0, totalMax = 0;
    let markedCount = 0;
    
    results.forEach(r => { 
        totalMax += r.max_marks;
        if (r.obtained_marks !== null) {
            totalObtained += r.obtained_marks; 
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

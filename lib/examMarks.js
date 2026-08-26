const db = require('../db');

// Group a flat question list (each row already carries choice_group_id and
// required_count from a LEFT JOIN with question_choice_groups) into an
// ordered list of paper "items": either a standalone question or a choice
// group ("answer required_count of these members") with its member questions.
function buildQuestionItems(questions) {
    const items = [];
    const groupIndex = {};
    for (const q of questions) {
        if (q.choice_group_id) {
            let item = groupIndex[q.choice_group_id];
            if (!item) {
                item = { type: 'group', groupId: q.choice_group_id, requiredCount: q.required_count || 1, members: [] };
                groupIndex[q.choice_group_id] = item;
                items.push(item);
            }
            item.members.push(q);
        } else {
            items.push({ type: 'single', question: q });
        }
    }
    return items;
}

// Total marks for a paper = sum of standalone question marks + sum over each
// choice group of the group's `required_count` highest-marked members - the
// most a student could score by optimally choosing which alternatives to
// answer. Group members are not required to carry equal marks (e.g. a legacy
// either/or pair where the two alternatives were historically weighted
// differently is handled the same as a fresh, evenly-weighted group).
// Persisted to exam_papers.max_marks so existing reads (report card, results,
// date sheet) stay simple flat column reads.
// Sum of standalone question marks + sum over each choice group of the
// group's `required_count` highest-marked members - shared by
// recomputePaperTotal (all questions, persisted to exam_papers.max_marks)
// and any caller that wants the total for a filtered subset of questions
// (e.g. only questions a teacher has actually written).
function sumMarks(questions) {
    let total = 0;
    const groupMarks = {};
    for (const q of questions) {
        if (q.choice_group_id) {
            if (!groupMarks[q.choice_group_id]) groupMarks[q.choice_group_id] = { requiredCount: q.required_count || 1, marks: [] };
            groupMarks[q.choice_group_id].marks.push(Number(q.marks || 0));
        } else {
            total += Number(q.marks || 0);
        }
    }
    for (const key of Object.keys(groupMarks)) {
        const { requiredCount, marks } = groupMarks[key];
        marks.sort((a, b) => b - a);
        total += marks.slice(0, requiredCount).reduce((sum, m) => sum + m, 0);
    }
    return total;
}

async function recomputePaperTotal(paperId, tenantId) {
    // Only count questions the teacher has actually written - a paper starts
    // with 3 blank placeholder rows (see createDefaultQuestions) that a
    // teacher may leave behind untouched after adding real questions
    // separately (via "Add Question" rather than editing the placeholders in
    // place). Counting those blanks would silently inflate max_marks beyond
    // what the paper's real questions add up to, so exam_papers.max_marks
    // stays wrong everywhere it's read (report card, results, date sheet,
    // mark entry cap) - matching the filter already used for the admin
    // papers grid's live "کل نمبر" column.
    const [questions] = await db.execute(
        `SELECT q.marks, q.choice_group_id, g.required_count
         FROM questions q
         LEFT JOIN question_choice_groups g ON g.id = q.choice_group_id
         WHERE q.paper_id = ? AND q.tenant_id = ? AND TRIM(q.question_text) <> ''`,
        [paperId, tenantId]
    );
    const total = sumMarks(questions);
    await db.execute('UPDATE exam_papers SET max_marks = ? WHERE id = ? AND tenant_id = ?', [total, paperId, tenantId]);
    return total;
}

module.exports = { buildQuestionItems, recomputePaperTotal, sumMarks };

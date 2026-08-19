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
async function recomputePaperTotal(paperId, tenantId) {
    const [questions] = await db.execute(
        `SELECT q.marks, q.choice_group_id, g.required_count
         FROM questions q
         LEFT JOIN question_choice_groups g ON g.id = q.choice_group_id
         WHERE q.paper_id = ? AND q.tenant_id = ?`,
        [paperId, tenantId]
    );
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
    await db.execute('UPDATE exam_papers SET max_marks = ? WHERE id = ? AND tenant_id = ?', [total, paperId, tenantId]);
    return total;
}

module.exports = { buildQuestionItems, recomputePaperTotal };

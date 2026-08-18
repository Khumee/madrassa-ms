/**
 * Injects res.locals.activeDatesheetExam with the exam whose date sheet
 * should be advertised in the top navbar: visible from 7 days before the
 * first scheduled paper until the last scheduled paper date. Recomputed on
 * every request, so the link appears/disappears automatically with the date.
 */
const db = require('../db');

module.exports = async (req, res, next) => {
    res.locals.activeDatesheetExam = null;
    try {
        if (req.tenant && req.session && req.session.userId) {
            const [rows] = await db.execute(`
                SELECT e.id, e.name, MIN(ep.paper_date) as start_date, MAX(ep.paper_date) as end_date
                FROM exams e
                JOIN exam_papers ep ON ep.exam_id = e.id AND ep.tenant_id = e.tenant_id
                WHERE e.tenant_id = ? AND ep.paper_date IS NOT NULL
                GROUP BY e.id, e.name
                HAVING CURDATE() >= DATE_SUB(MIN(ep.paper_date), INTERVAL 7 DAY)
                   AND CURDATE() <= MAX(ep.paper_date)
                ORDER BY start_date ASC
                LIMIT 1
            `, [req.tenant.id]);
            if (rows.length) {
                res.locals.activeDatesheetExam = rows[0];
            }
        }
    } catch (err) {
        console.error('Active datesheet lookup failed:', err);
    }
    next();
};

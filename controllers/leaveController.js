const db = require('../config/db');
const { DateTime } = require('luxon');

exports.showLeaveRequests = async (req, res) => {
    try {
        const [leaves] = await db.execute(`
            SELECT sl.*, s.name as student_name, c.name_ar as class_name 
            FROM student_leaves sl
            JOIN students s ON sl.student_id = s.id AND s.tenant_id = sl.tenant_id
            LEFT JOIN classes c ON s.class_id = c.id AND c.tenant_id = sl.tenant_id
            WHERE sl.tenant_id = ?
            ORDER BY sl.created_at DESC
        `, [req.tenant.id]);

        res.render('leave_requests', { leaves });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading leave requests');
    }
};

exports.approveLeave = async (req, res) => {
    const { id } = req.params;
    try {
        const [leaveRows] = await db.execute('SELECT * FROM student_leaves WHERE id = ? AND tenant_id = ?', [id, req.tenant.id]);
        if (!leaveRows[0]) return res.status(404).send('Leave request not found');
        const leave = leaveRows[0];

        // Update leave status
        await db.execute(
            'UPDATE student_leaves SET status = ?, approved_by = ? WHERE id = ? AND tenant_id = ?',
            ['approved', req.session.userId, id, req.tenant.id]
        );

        // Mark attendance as leave for each date in the range
        const startDate = DateTime.fromJSDate(new Date(leave.start_date));
        const endDate = DateTime.fromJSDate(new Date(leave.end_date));
        
        for (let dt = startDate; dt <= endDate; dt = dt.plus({ days: 1 })) {
            const dateStr = dt.toISODate();
            
            // Check if record exists
            const [existing] = await db.execute(
                'SELECT id FROM attendance_students WHERE student_id = ? AND date = ? AND tenant_id = ?',
                [leave.student_id, dateStr, req.tenant.id]
            );

            if (existing.length > 0) {
                // Update
                await db.execute(
                    'UPDATE attendance_students SET status = ?, marked_by = ? WHERE id = ? AND tenant_id = ?',
                    ['leave', req.session.userId, existing[0].id, req.tenant.id]
                );
            } else {
                // Insert
                await db.execute(
                    'INSERT INTO attendance_students (student_id, date, status, marked_by, tenant_id) VALUES (?, ?, ?, ?, ?)',
                    [leave.student_id, dateStr, 'leave', req.session.userId, req.tenant.id]
                );
            }
        }

        res.redirect('/leaves/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error approving leave');
    }
};

exports.rejectLeave = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute(
            'UPDATE student_leaves SET status = ?, approved_by = ? WHERE id = ? AND tenant_id = ?',
            ['rejected', req.session.userId, id, req.tenant.id]
        );
        res.redirect('/leaves/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error rejecting leave');
    }
};

exports.deleteLeave = async (req, res) => {
    const { id } = req.params;
    try {
        const [leaveRows] = await db.execute('SELECT * FROM student_leaves WHERE id = ? AND tenant_id = ?', [id, req.tenant.id]);
        if (!leaveRows[0]) return res.status(404).send('Leave request not found');
        const leave = leaveRows[0];

        // If it was approved, we should remove the 'leave' attendance records
        if (leave.status === 'approved') {
            const startDate = DateTime.fromJSDate(new Date(leave.start_date)).toISODate();
            const endDate = DateTime.fromJSDate(new Date(leave.end_date)).toISODate();
            await db.execute(
                "DELETE FROM attendance_students WHERE student_id = ? AND date >= ? AND date <= ? AND status = 'leave' AND tenant_id = ?",
                [leave.student_id, startDate, endDate, req.tenant.id]
            );
        }

        await db.execute('DELETE FROM student_leaves WHERE id = ? AND tenant_id = ?', [id, req.tenant.id]);
        res.redirect('/leaves/manage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting leave request');
    }
};

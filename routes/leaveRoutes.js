const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { hasRole, isAuthenticated } = require('../middleware/auth');

router.get('/leaves/manage', hasRole(['ناظم', 'مدير']), leaveController.showLeaveRequests);
router.post('/leaves/approve/:id', hasRole(['ناظم', 'مدير']), leaveController.approveLeave);
router.post('/leaves/reject/:id', hasRole(['ناظم', 'مدير']), leaveController.rejectLeave);

module.exports = router;

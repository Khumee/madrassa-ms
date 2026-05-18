const express = require('express');
const router = express.Router();
const periodController = require('../controllers/periodController');
const { hasRole, isAuthenticated } = require('../middleware/auth');

router.get('/periods/manage', hasRole(['ناظم', 'مدير']), periodController.showPeriodsManage);
router.post('/periods/generate-auto', hasRole(['ناظم', 'مدير']), periodController.generateAuto);
router.get('/periods/full', isAuthenticated, periodController.showFullTimetable);
router.post('/periods/add', hasRole(['ناظم', 'مدير', 'عريب']), periodController.addPeriod);
router.post('/periods/edit/:id', hasRole(['ناظم', 'مدير', 'عريب']), periodController.editPeriod);
router.post('/periods/delete/:id', hasRole(['ناظم', 'مدير', 'عريب']), periodController.deletePeriod);

module.exports = router;

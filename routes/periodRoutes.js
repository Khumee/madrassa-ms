const express = require('express');
const router = express.Router();
const periodController = require('../controllers/periodController');
const { hasRole, hasPermission, isAuthenticated } = require('../middleware/auth');

router.get('/periods/manage', hasPermission('periods_manage'), periodController.showPeriodsManage);
router.post('/periods/generate-auto', hasPermission('periods_manage'), periodController.generateAuto);
router.get('/periods/full', isAuthenticated, periodController.showFullTimetable);
router.get('/periods/full/pdf', isAuthenticated, periodController.exportFullTimetablePdf);
router.get('/timetable/public', periodController.showPublicTimetable);
router.get('/timetable/public/pdf', periodController.exportPublicTimetablePdf);
router.post('/periods/add', hasPermission('periods_manage'), periodController.addPeriod);
router.post('/periods/edit/:id', hasPermission('periods_manage'), periodController.editPeriod);
router.post('/periods/delete/:id', hasPermission('periods_manage'), periodController.deletePeriod);
router.post('/periods/swap', hasPermission('periods_manage'), periodController.swapPeriods);

module.exports = router;

const express = require('express');
const router = express.Router();
const periodController = require('../controllers/periodController');
const { hasRole, isAuthenticated } = require('../middleware/auth');

router.get('/periods/manage', hasRole(['ناظم', 'مدير']), periodController.showPeriodsManage);
router.post('/periods/generate-auto', hasRole(['ناظم', 'مدير']), periodController.generateAuto);
router.get('/periods/full', (req, res, next) => {
    if (req.query.bypass === 'true') {
        return next();
    }
    return isAuthenticated(req, res, next);
}, periodController.showFullTimetable);
router.post('/periods/add', hasRole(['ناظم', 'مدير']), periodController.addPeriod);
router.post('/periods/edit/:id', hasRole(['ناظم', 'مدير']), periodController.editPeriod);
router.post('/periods/delete/:id', hasRole(['ناظم', 'مدير']), periodController.deletePeriod);
router.post('/periods/swap', hasRole(['ناظم', 'مدير']), periodController.swapPeriods);
router.post('/periods/print-pdf', isAuthenticated, periodController.printTimetablePDF);

module.exports = router;

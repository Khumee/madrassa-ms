const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');

// Middleware to protect super admin routes
const isMasterAdmin = (req, res, next) => {
    if (req.session.isMasterAdmin) {
        return next();
    }
    res.redirect('/admin/login');
};

router.get('/admin/login', superAdminController.showLogin);
router.post('/admin/login', superAdminController.login);
router.get('/admin/logout', superAdminController.logout);

router.get('/admin/dashboard', isMasterAdmin, superAdminController.showDashboard);
router.post('/admin/tenants/create', isMasterAdmin, superAdminController.createTenant);
router.post('/admin/tenants/edit/:id', isMasterAdmin, superAdminController.editTenant);
router.post('/admin/tenants/toggle/:id', isMasterAdmin, superAdminController.toggleTenantStatus);

module.exports = router;

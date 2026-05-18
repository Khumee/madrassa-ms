const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/profile/change-password', isAuthenticated, authController.showChangePassword);
router.post('/profile/change-password', isAuthenticated, authController.changePassword);

router.get('/', isAuthenticated, authController.showDashboard);

module.exports = router;

const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure logo upload directory exists
const uploadDir = path.join(__dirname, '../public/uploads/logos');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Setup storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'logo-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

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
router.post('/admin/tenants/create', isMasterAdmin, upload.single('logo'), superAdminController.createTenant);
router.post('/admin/tenants/edit/:id', isMasterAdmin, upload.single('logo'), superAdminController.editTenant);
router.post('/admin/tenants/toggle/:id', isMasterAdmin, superAdminController.toggleTenantStatus);
router.post('/admin/tenants/seed/:id', isMasterAdmin, superAdminController.seedTenant);

// Multer error handler middleware
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).send('<h1>حجم الملف كبير جداً</h1><p>الحد الأقصى المسموح به للشعار هو 2 ميغابايت. يرجى اختيار صورة أصغر حجماً.</p><a href="/admin/dashboard">العودة إلى لوحة التحكم</a>');
        }
    }
    next(err);
});

module.exports = router;

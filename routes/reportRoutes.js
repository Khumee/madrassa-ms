const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { hasRole } = require('../middleware/auth');

router.get('/reports', hasRole(['ناظم', 'مدير', 'عريب']), reportController.showReports);
router.get('/reports/teacher/:teacherId', hasRole(['ناظم', 'مدير', 'أستاذ', 'عريب']), reportController.showTeacherProgressReport);

router.get('/books/manage', hasRole(['ناظم', 'مدير', 'عريب']), reportController.showBooksManage);
router.post('/books/add', hasRole(['ناظم', 'مدير', 'عريب']), reportController.addBook);
router.post('/books/edit/:id', hasRole(['ناظم', 'مدير', 'عريب']), reportController.editBook);
router.post('/books/delete/:id', hasRole(['ناظم', 'مدير', 'عريب']), reportController.deleteBook);

router.get('/users/manage', hasRole(['ناظم', 'مدير']), reportController.showUsersManage);
router.post('/users/update', hasRole(['ناظم', 'مدير']), reportController.updateUser);
router.post('/users/update-role', hasRole(['ناظم', 'مدير']), reportController.updateUserRole);
router.post('/users/reset-password', hasRole(['ناظم', 'مدير']), reportController.resetPassword);

router.get('/admin/import-data', hasRole(['مدير']), reportController.adminImportData);

module.exports = router;

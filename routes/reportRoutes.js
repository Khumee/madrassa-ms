const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { hasRole, hasPermission } = require('../middleware/auth');

router.get('/reports', hasPermission('reports'), reportController.showReports);
router.get('/reports/areef-standards', hasPermission('reports'), reportController.showAreefStandardsReport);
router.get('/reports/teacher/:teacherId', hasPermission('reports'), reportController.showTeacherProgressReport);

router.get('/books/manage', hasPermission('books_manage'), reportController.showBooksManage);
router.post('/books/add', hasPermission('books_manage'), reportController.addBook);
router.post('/books/edit/:id', hasPermission('books_manage'), reportController.editBook);
router.post('/books/delete/:id', hasPermission('books_manage'), reportController.deleteBook);

router.get('/users/manage', hasPermission('users_manage'), reportController.showUsersManage);
router.post('/users/update', hasPermission('users_manage'), reportController.updateUser);
router.post('/users/update-role', hasPermission('users_manage'), reportController.updateUserRole);
router.post('/users/reset-password', hasPermission('users_manage'), reportController.resetPassword);

router.get('/admin/import-data', hasRole(['مدير']), reportController.adminImportData);

// Permissions Management (Mudeer Only)
router.get('/permissions/manage', hasRole(['مدير']), reportController.showPermissionsManage);
router.post('/permissions/toggle', hasRole(['مدير']), reportController.togglePermission);

module.exports = router;

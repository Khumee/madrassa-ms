const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { hasRole } = require('../middleware/auth');

router.get('/dashboard/student', hasRole(['طالب']), studentController.showStudentDashboard);
router.get('/dashboard/cr', hasRole(['عريب']), studentController.showCRDashboard);

router.get('/students/manage', hasRole(['ناظم', 'مدير', 'عريب']), studentController.showStudentsManage);
router.get('/students/add', hasRole(['ناظم', 'مدير', 'عريب']), studentController.showStudentsAdd);
router.post('/students/add', hasRole(['ناظم', 'مدير', 'عريب']), studentController.addStudent);
router.post('/students/edit/:id', hasRole(['ناظم', 'مدير', 'عريب']), studentController.editStudent);
router.get('/students/delete/:id', hasRole(['ناظم', 'مدير', 'عريب']), studentController.deleteStudent);

router.get('/attendance/students/:classId', hasRole(['ناظم', 'مدير', 'عريب']), studentController.showAttendance);
router.post('/attendance/students/save', hasRole(['ناظم', 'مدير', 'عريب']), studentController.saveAttendance);

module.exports = router;

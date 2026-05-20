const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { hasRole, hasPermission } = require('../middleware/auth');

router.get('/dashboard/student', hasRole(['طالب']), studentController.showStudentDashboard);
router.get('/dashboard/cr', hasRole(['عريف']), studentController.showCRDashboard);

router.get('/students/manage', hasPermission('students_manage'), studentController.showStudentsManage);
router.get('/students/add', hasPermission('students_manage'), studentController.showStudentsAdd);
router.post('/students/add', hasPermission('students_manage'), studentController.addStudent);
router.post('/students/edit/:id', hasPermission('students_manage'), studentController.editStudent);
router.get('/students/delete/:id', hasPermission('students_manage'), studentController.deleteStudent);

router.get('/attendance/students/:classId', hasPermission('student_attendance'), studentController.showAttendance);
router.post('/attendance/students/save', hasPermission('student_attendance'), studentController.saveAttendance);

module.exports = router;

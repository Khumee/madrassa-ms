const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { hasRole } = require('../middleware/auth');

router.get('/dashboard/teacher', hasRole(['أستاذ']), teacherController.showTeacherDashboard);

router.get('/teachers/manage', hasRole(['ناظم', 'مدير', 'عريب']), teacherController.showTeachersManage);
router.post('/teachers/edit/:id', hasRole(['ناظم', 'مدير', 'عريب']), teacherController.editTeacher);
router.get('/teachers/delete/:id', hasRole(['ناظم', 'مدير', 'عريب']), teacherController.deleteTeacher);
router.get('/teachers/add', hasRole(['مدير']), teacherController.showTeachersAdd);
router.post('/teachers/add', hasRole(['مدير']), teacherController.addTeacher);

router.get('/teachers', hasRole(['ناظم', 'مدير', 'عريب']), teacherController.showWeeklyAttendance);
router.post('/attendance/teachers/save', hasRole(['ناظم', 'مدير', 'عريب']), teacherController.saveWeeklyAttendance);

router.get('/teacher-books/manage', hasRole(['ناظم', 'مدير', 'عريب']), teacherController.showAssignmentsManage);
router.post('/teacher-books/assign', hasRole(['ناظم', 'مدير', 'عريب']), teacherController.assignBook);
router.post('/teacher-books/edit/:id', hasRole(['ناظم', 'مدير', 'عريب']), teacherController.editAssignment);
router.post('/teacher-books/delete/:id', hasRole(['ناظم', 'مدير', 'عريب']), teacherController.deleteAssignment);
router.get('/teacher-books/check-periods/:id', hasRole(['ناظم', 'مدير', 'عريب']), teacherController.checkAssignmentPeriods);

router.post('/book/update-progress', hasRole(['أستاذ', 'ناظم', 'مدير', 'عريب']), teacherController.updateBookProgress);

module.exports = router;

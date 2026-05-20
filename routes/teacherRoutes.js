const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { hasRole, hasPermission } = require('../middleware/auth');

router.get('/dashboard/teacher', hasRole(['أستاذ']), teacherController.showTeacherDashboard);

router.get('/teachers/manage', hasPermission('teachers_manage'), teacherController.showTeachersManage);
router.post('/teachers/edit/:id', hasPermission('teachers_manage'), teacherController.editTeacher);
router.get('/teachers/delete/:id', hasPermission('teachers_manage'), teacherController.deleteTeacher);
router.get('/teachers/add', hasPermission('teachers_manage'), teacherController.showTeachersAdd);
router.post('/teachers/add', hasPermission('teachers_manage'), teacherController.addTeacher);

router.get('/teachers', hasPermission('teacher_attendance'), teacherController.showWeeklyAttendance);
router.post('/attendance/teachers/save', hasPermission('teacher_attendance'), teacherController.saveWeeklyAttendance);

router.get('/teacher-books/manage', hasPermission('teacher_books_manage'), teacherController.showAssignmentsManage);
router.post('/teacher-books/assign', hasPermission('teacher_books_manage'), teacherController.assignBook);
router.post('/teacher-books/edit/:id', hasPermission('teacher_books_manage'), teacherController.editAssignment);
router.post('/teacher-books/delete/:id', hasPermission('teacher_books_manage'), teacherController.deleteAssignment);
router.get('/teacher-books/check-periods/:id', hasPermission('teacher_books_manage'), teacherController.checkAssignmentPeriods);

router.post('/book/update-progress', hasRole(['أستاذ', 'ناظم', 'مدير', 'عريف']), teacherController.updateBookProgress);

module.exports = router;

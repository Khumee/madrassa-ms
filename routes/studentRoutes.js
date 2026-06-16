const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { hasRole, hasPermission } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../public/uploads/students');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'student-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images (jpeg, jpg, png, webp) are allowed'));
    }
});

router.get('/dashboard/student', hasRole(['طالب']), studentController.showStudentDashboard);
router.get('/dashboard/cr', hasRole(['عريف']), studentController.showCRDashboard);

router.get('/students/manage', hasPermission('students_manage'), studentController.showStudentsManage);
router.get('/students/add', hasPermission('students_manage'), studentController.showStudentsAdd);
router.post('/students/add', hasPermission('students_manage'), upload.single('photo'), studentController.addStudent);
router.post('/students/edit/:id', hasPermission('students_manage'), upload.single('photo'), studentController.editStudent);
router.get('/students/view/:id', hasPermission('students_manage'), studentController.showStudentView);
router.get('/students/pdf/:id', hasPermission('students_manage'), studentController.exportStudentPdf);
router.get('/students/delete/:id', hasPermission('students_manage'), studentController.deleteStudent);

router.get('/attendance/students/:classId', hasPermission('student_attendance'), studentController.showAttendance);
router.post('/attendance/students/save', hasPermission('student_attendance'), studentController.saveAttendance);

module.exports = router;

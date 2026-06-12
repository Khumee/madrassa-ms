const db = require('../config/db');
const { hasPermission } = require('../middleware/auth');
const { saveWeeklyAttendance } = require('../controllers/teacherController');

async function main() {
    // Create mock request and response objects
    const req = {
        session: {
            userId: 22, // Areeb
            role: 'عريب', // Arabic Yeh
            lang: 'ar'
        },
        body: {
            date: '2026-05-11',
            attendance: { "216": 1 }
        },
        // mock i18n translator
        __: (msg) => msg
    };

    let statusVal = 200;
    let sentData = null;

    const res = {
        status: (code) => {
            statusVal = code;
            return res;
        },
        json: (data) => {
            sentData = data;
            return res;
        },
        send: (text) => {
            sentData = text;
            return res;
        },
        redirect: (url) => {
            sentData = `Redirect to: ${url}`;
            return res;
        }
    };

    console.log('--- RUNNING MIDDLEWARE ---');
    const middleware = hasPermission('teacher_attendance');
    
    // Run hasPermission middleware
    await middleware(req, res, async (err) => {
        if (err) {
            console.error('Middleware passed error:', err);
            process.exit(1);
        }
        
        console.log('✅ Middleware Authorized! Proceeding to Controller...');
        try {
            await saveWeeklyAttendance(req, res);
            console.log('--- CONTROLLER RESPONSE ---');
            console.log('Status:', statusVal);
            console.log('Sent Data:', sentData);
            process.exit(0);
        } catch (controllerErr) {
            console.error('Controller crashed:', controllerErr);
            process.exit(1);
        }
    });

    // If middleware sends response (e.g. Unauthorized) instead of calling next()
    setTimeout(() => {
        if (sentData) {
            console.log('--- MIDDLEWARE REJECTED ---');
            console.log('Status:', statusVal);
            console.log('Sent Data:', sentData);
            process.exit(0);
        }
    }, 1000);
}

main();

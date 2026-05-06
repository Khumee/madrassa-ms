const db = require('./db');
const fs = require('fs');

async function importTimetable() {
    console.log('Importing timetable from text file...');
    
    // Clear existing empty state if any
    await db.execute('DELETE FROM periods');

    const [teachers] = await db.execute('SELECT * FROM teachers');
    const [classes] = await db.execute('SELECT * FROM classes');

    // Basic mapping of days
    const dayMap = {
        'الاثنين': 'Monday',
        'الثلاثاء': 'Tuesday',
        'الأربعاء': 'Wednesday',
        'الخميس': 'Thursday',
        'الجمعة': 'Friday',
        'السبت': 'Saturday',
        'الأحد': 'Sunday'
    };

    // This is a simplified parser based on the structure of timetable_text.txt
    // In a real scenario, we might need more complex regex
    const content = fs.readFileSync('timetable_text.txt', 'utf8');
    const lines = content.split('\n');

    let currentDay = 'Monday';
    let currentClassId = classes[0].id; // Use first available ID

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        // Check for Day
        for (let [ar, en] of Object.entries(dayMap)) {
            if (line.includes(ar)) {
                currentDay = en;
                break;
            }
        }

        // Check for Class
        for (let cls of classes) {
            if (line.includes(cls.name_ar)) {
                currentClassId = cls.id;
                console.log(`Switched to Class: ${cls.name_ar}`);
                break;
            }
        }

        // Try to match teacher and subject
        for (let teacher of teachers) {
            const names = teacher.name.split(' ');
            const shortName = names[names.length - 1]; // Last name
            const midName = names.length > 1 ? names[1] : names[0];

            if (line.includes(shortName) || line.includes(midName) || line.includes(teacher.name)) {
                // Found a teacher! 
                let subject = line.split(teacher.name)[0].split(shortName)[0].trim();
                if (!subject || subject.length < 3) subject = teacher.subject || 'مقرر دراسي';
                
                await db.execute(
                    'INSERT INTO periods (teacher_id, class_id, day_of_week, subject, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)',
                    [teacher.id, currentClassId, currentDay, subject.substring(0, 100), '08:00:00', '09:00:00']
                );
                console.log(`Imported: ${currentDay} - Class ${currentClassId} - ${teacher.name} - ${subject}`);
            }
        }
    }

    console.log('Import completed.');
    process.exit(0);
}

importTimetable().catch(err => {
    console.error(err);
    process.exit(1);
});

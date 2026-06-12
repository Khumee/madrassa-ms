const db = require('../../db');

async function sync() {
    try {
        // 1. Clear periods
        await db.execute('DELETE FROM periods');
        console.log('Periods cleared.');

        // 2. Check/Add Zubair
        const [teachers] = await db.execute('SELECT id FROM teachers WHERE name LIKE ?', ['%زبیر%']);
        let zubairId;
        if (teachers.length === 0) {
            const [res] = await db.execute('INSERT INTO teachers (name, subject) VALUES (?, ?)', ['زبیر صاحب', 'هداية النحو']);
            zubairId = res.insertId;
            console.log('Added teacher Zubair.');
        } else {
            zubairId = teachers[0].id;
        }

        // 3. Get other teachers
        const [kamaal] = await db.execute('SELECT id FROM teachers WHERE name LIKE ?', ['%كمال%']);
        const [fahad] = await db.execute('SELECT id FROM teachers WHERE name LIKE ?', ['%فہد%']);
        const [usman] = await db.execute('SELECT id FROM teachers WHERE name LIKE ?', ['%عبد القادر%']);
        const [baron] = await db.execute('SELECT id FROM teachers WHERE name LIKE ?', ['%بارون%']);

        // 4. Get Class Sania (الثانية)
        const [classes] = await db.execute('SELECT id FROM classes WHERE name_ar = ?', ['الثانية']);
        const saniaId = classes[0].id;

        // 5. Data from image
        const data = [
            // Mon
            { day: 'Monday', p: 1, t: kamaal[0].id, s: 'تفسير عم' },
            { day: 'Monday', p: 2, t: kamaal[0].id, s: 'الأدب والحديث' },
            { day: 'Monday', p: 3, t: zubairId, s: 'هداية النحو' },
            { day: 'Monday', p: 4, t: usman[0].id, s: 'القدوري الأول' },
            // Tue
            { day: 'Tuesday', p: 1, t: kamaal[0].id, s: 'تفسير عم' },
            { day: 'Tuesday', p: 2, t: fahad[0].id, s: 'المنطق' },
            { day: 'Tuesday', p: 3, t: usman[0].id, s: 'القدوري الأول' },
            { day: 'Tuesday', p: 4, t: usman[0].id, s: 'القدوري الأول' },
            // Wed
            { day: 'Wednesday', p: 1, t: kamaal[0].id, s: 'تفسير عم' },
            { day: 'Wednesday', p: 2, t: zubairId, s: 'هداية النحو' },
            { day: 'Wednesday', p: 3, t: usman[0].id, s: 'القدوري الأول' },
            { day: 'Wednesday', p: 4, t: baron[0].id, s: 'علم الصيغة' },
            // Thu
            { day: 'Thursday', p: 1, t: zubairId, s: 'هداية النحو' },
            { day: 'Thursday', p: 2, t: fahad[0].id, s: 'المنطق' },
            { day: 'Thursday', p: 3, t: kamaal[0].id, s: 'الأدب والحديث' },
            { day: 'Thursday', p: 4, t: baron[0].id, s: 'علم الصيغة' },
            // Fri
            { day: 'Friday', p: 1, t: fahad[0].id, s: 'المنطق' },
            { day: 'Friday', p: 2, t: kamaal[0].id, s: 'الأدب والحديث' },
            { day: 'Friday', p: 3, t: baron[0].id, s: 'علم الصيغة' },
            { day: 'Friday', p: 4, t: baron[0].id, s: 'علم الصيغة' }
        ];

        for (const item of data) {
            await db.execute(
                'INSERT INTO periods (day_of_week, period_number, teacher_id, class_id, subject, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [item.day, item.p, item.t, saniaId, item.s, '18:00:00', '19:00:00']
            );
        }

        console.log('Imported Sania data.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

sync();

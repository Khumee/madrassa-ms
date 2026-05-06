const db = require('./db');

async function sync() {
    try {
        await db.execute('DELETE FROM periods');
        console.log('Periods cleared.');

        const [zCheck] = await db.execute('SELECT id FROM teachers WHERE name LIKE ?', ['%زبیر%']);
        let zubairId;
        if (zCheck.length === 0) {
            const [res] = await db.execute('INSERT INTO teachers (name, subject) VALUES (?, ?)', ['زبیر صاحب', 'هداية النحو']);
            zubairId = res.insertId;
        } else {
            zubairId = zCheck[0].id;
        }

        const teachers = {
            musharraf: 202, habib: 204, kamaal: 206, hasan: 208, usman: 210,
            fahad: 212, hamza: 214, qamar_ejaz: 216, baron: 218, qamar_ali: 220,
            zubair: zubairId
        };

        const [saniaC] = await db.execute('SELECT id FROM classes WHERE name_ar = ?', ['الثانية']);
        const [khamisaC] = await db.execute('SELECT id FROM classes WHERE name_ar = ?', ['الخامسة']);
        const [sadisaC] = await db.execute('SELECT id FROM classes WHERE name_ar = ?', ['السادسة']);
        const [dauraC] = await db.execute('SELECT id FROM classes WHERE name_ar = ?', ['دورة حديث']);
        
        const saniaId = saniaC[0].id;
        const khamisaId = khamisaC[0].id;
        const sadisaId = sadisaC[0].id;
        const dauraId = dauraC[0].id;

        const times = {
            1: { s: '18:00', e: '18:40' },
            2: { s: '18:40', e: '19:20' },
            3: { s: '19:40', e: '20:20' },
            4: { s: '20:20', e: '21:00' },
            5: { s: '21:00', e: '21:40' }
        };

        const data = [
            // SANIA (الثانية)
            { c: saniaId, d: 'Monday', p: 1, t: teachers.kamaal, s: 'تفسير عم' },
            { c: saniaId, d: 'Monday', p: 2, t: teachers.kamaal, s: 'الأدب والحديث' },
            { c: saniaId, d: 'Monday', p: 3, t: teachers.zubair, s: 'هداية النحو' },
            { c: saniaId, d: 'Monday', p: 4, t: teachers.usman, s: 'القدوري الأول' },
            { c: saniaId, d: 'Tuesday', p: 1, t: teachers.kamaal, s: 'تفسير عم' },
            { c: saniaId, d: 'Tuesday', p: 2, t: teachers.fahad, s: 'المنطق' },
            { c: saniaId, d: 'Tuesday', p: 3, t: teachers.usman, s: 'القدوري الأول' },
            { c: saniaId, d: 'Tuesday', p: 4, t: teachers.usman, s: 'القدوري الأول' },
            { c: saniaId, d: 'Wednesday', p: 1, t: teachers.kamaal, s: 'تفسير عم' },
            { c: saniaId, d: 'Wednesday', p: 2, t: teachers.zubair, s: 'هداية النحو' },
            { c: saniaId, d: 'Wednesday', p: 3, t: teachers.usman, s: 'القدوري الأول' },
            { c: saniaId, d: 'Wednesday', p: 4, t: teachers.baron, s: 'علم الصيغة' },
            { c: saniaId, d: 'Thursday', p: 1, t: teachers.zubair, s: 'هداية النحو' },
            { c: saniaId, d: 'Thursday', p: 2, t: teachers.fahad, s: 'المنطق' },
            { c: saniaId, d: 'Thursday', p: 3, t: teachers.kamaal, s: 'الأدب والحديث' },
            { c: saniaId, d: 'Thursday', p: 4, t: teachers.baron, s: 'علم الصيغة' },
            { c: saniaId, d: 'Friday', p: 1, t: teachers.fahad, s: 'المنطق' },
            { c: saniaId, d: 'Friday', p: 2, t: teachers.kamaal, s: 'الأدب والحديث' },
            { c: saniaId, d: 'Friday', p: 3, t: teachers.baron, s: 'علم الصيغة' },
            { c: saniaId, d: 'Friday', p: 4, t: teachers.baron, s: 'علم الصيغة' },

            // KHAMISA (الخامسة)
            { c: khamisaId, d: 'Monday', p: 1, t: teachers.fahad, s: 'شرح العقيدة الطحاوية' },
            { c: khamisaId, d: 'Monday', p: 2, t: teachers.hasan, s: 'أصول الفقه' },
            { c: khamisaId, d: 'Monday', p: 4, t: teachers.hamza, s: 'الهداية (الأول)' },
            { c: khamisaId, d: 'Monday', p: 5, t: teachers.kamaal, s: 'ديوان المتنبي والمعلقات' },
            { c: khamisaId, d: 'Tuesday', p: 1, t: teachers.fahad, s: 'شرح العقيدة الطحاوية' },
            { c: khamisaId, d: 'Tuesday', p: 2, t: teachers.hamza, s: 'الهداية (الأول)' },
            { c: khamisaId, d: 'Tuesday', p: 3, t: teachers.kamaal, s: 'ديوان المتنبي والمعلقات' },
            { c: khamisaId, d: 'Tuesday', p: 4, t: teachers.qamar_ali, s: 'الحديث وحفظ الحديث' },
            { c: khamisaId, d: 'Tuesday', p: 5, t: teachers.usman, s: 'مختصر المعاني' },
            { c: khamisaId, d: 'Wednesday', p: 1, t: teachers.hasan, s: 'أصول الفقه' },
            { c: khamisaId, d: 'Wednesday', p: 3, t: teachers.musharraf, s: 'معين الفلسفة والانتباهات' },
            { c: khamisaId, d: 'Wednesday', p: 4, t: teachers.kamaal, s: 'التفسير' },
            { c: khamisaId, d: 'Wednesday', p: 5, t: teachers.kamaal, s: 'التفسير' },
            { c: khamisaId, d: 'Thursday', p: 2, t: teachers.usman, s: 'مختصر المعاني' },
            { c: khamisaId, d: 'Thursday', p: 3, t: teachers.musharraf, s: 'معين الفلسفة والانتباهات' },
            { c: khamisaId, d: 'Thursday', p: 4, t: teachers.hamza, s: 'الهداية (الأول)' },
            { c: khamisaId, d: 'Thursday', p: 5, t: teachers.hasan, s: 'أصول الفقه' },
            { c: khamisaId, d: 'Friday', p: 1, t: teachers.hasan, s: 'أصول الفقه' },
            { c: khamisaId, d: 'Friday', p: 2, t: teachers.usman, s: 'مختصر المعاني' },
            { c: khamisaId, d: 'Friday', p: 3, t: teachers.kamaal, s: 'التفسير' },
            { c: khamisaId, d: 'Friday', p: 4, t: teachers.hamza, s: 'الهداية (الأول)' },
            { c: khamisaId, d: 'Friday', p: 5, t: teachers.hasan, s: 'أصول الفقه' },

            // SADISA (السادسة)
            { c: sadisaId, d: 'Monday', p: 1, t: teachers.habib, s: 'الهداية (الجزء الثاني)' },
            { c: sadisaId, d: 'Monday', p: 2, t: teachers.qamar_ejaz, s: 'التوضيح (1)' },
            { c: sadisaId, d: 'Monday', p: 3, t: teachers.hamza, s: 'كتاب الآثار وخير الأصول' },
            { c: sadisaId, d: 'Monday', p: 4, t: teachers.habib, s: 'السراجي والفلکیات' },
            { c: sadisaId, d: 'Monday', p: 5, t: teachers.musharraf, s: 'التوضيح (2)' },
            { c: sadisaId, d: 'Tuesday', p: 1, t: teachers.habib, s: 'الهداية (الجزء الثاني)' },
            { c: sadisaId, d: 'Tuesday', p: 2, t: teachers.qamar_ejaz, s: 'التوضيح (1)' },
            { c: sadisaId, d: 'Tuesday', p: 3, t: teachers.hasan, s: 'تفسير الجلالين والفوز الكبير' },
            { c: sadisaId, d: 'Tuesday', p: 4, t: teachers.habib, s: 'السراجي والفلکیات' },
            { c: sadisaId, d: 'Tuesday', p: 5, t: teachers.hasan, s: 'تفسير الجلالين والفوز الكبير' },
            { c: sadisaId, d: 'Wednesday', p: 1, t: teachers.usman, s: 'اللغة العربية والعروض' },
            { c: sadisaId, d: 'Wednesday', p: 2, t: teachers.qamar_ejaz, s: 'التوضيح (1)' },
            { c: sadisaId, d: 'Wednesday', p: 3, t: teachers.hamza, s: 'كتاب الآثار وخير الأصول' },
            { c: sadisaId, d: 'Wednesday', p: 4, t: teachers.hasan, s: 'تفسير الجلالين والفوز الكبير' },
            { c: sadisaId, d: 'Wednesday', p: 5, t: teachers.musharraf, s: 'التوضيح (2)' },
            { c: sadisaId, d: 'Thursday', p: 1, t: teachers.fahad, s: 'شرح العقائد' },
            { c: sadisaId, d: 'Thursday', p: 2, t: teachers.musharraf, s: 'التوضيح (2)' },
            { c: sadisaId, d: 'Thursday', p: 3, t: teachers.fahad, s: 'شرح العقائد' },
            { c: sadisaId, d: 'Thursday', p: 4, t: teachers.musharraf, s: 'التوضيح (2)' },
            { c: sadisaId, d: 'Thursday', p: 5, t: teachers.usman, s: 'اللغة العربية والعروض' },
            { c: sadisaId, d: 'Friday', p: 1, t: teachers.usman, s: 'اللغة العربية والعروض' },
            { c: sadisaId, d: 'Friday', p: 2, t: teachers.fahad, s: 'شرح العقائد' },
            { c: sadisaId, d: 'Friday', p: 3, t: teachers.hamza, s: 'كتاب الآثار وخير الأصول' },
            { c: sadisaId, d: 'Friday', p: 4, t: teachers.fahad, s: 'شرح العقائد' },
            { c: sadisaId, d: 'Friday', p: 5, t: teachers.habib, s: 'الهداية (الجزء الثاني)' },

            // DAURA HADEES (دورة حديث)
            { c: dauraId, d: 'Monday', p: 1, t: teachers.qamar_ejaz, s: 'صحيح مسلم وجامع الترمذي' },
            { c: dauraId, d: 'Monday', p: 2, t: teachers.hamza, s: 'الترمذي (1)' },
            { c: dauraId, d: 'Monday', p: 3, t: teachers.usman, s: 'سنن النسائي' },
            { c: dauraId, d: 'Monday', p: 4, t: teachers.fahad, s: 'صحيح البخاري (1)' },
            { c: dauraId, d: 'Monday', p: 5, t: teachers.qamar_ali, s: 'شمائل الترمذي' },
            { c: dauraId, d: 'Tuesday', p: 1, t: teachers.qamar_ejaz, s: 'صحيح مسلم وجامع الترمذي' },
            { c: dauraId, d: 'Tuesday', p: 2, t: teachers.usman, s: 'سنن النسائي' },
            { c: dauraId, d: 'Tuesday', p: 3, t: teachers.hamza, s: 'الترمذي (1)' },
            { c: dauraId, d: 'Tuesday', p: 4, t: teachers.fahad, s: 'صحيح البخاري (1)' },
            { c: dauraId, d: 'Tuesday', p: 5, t: teachers.qamar_ali, s: 'شمائل الترمذي' },
            { c: dauraId, d: 'Wednesday', p: 1, t: teachers.qamar_ejaz, s: 'صحيح مسلم وجامع الترمذي' },
            { c: dauraId, d: 'Wednesday', p: 2, t: teachers.hamza, s: 'الترمذي (1)' },
            { c: dauraId, d: 'Wednesday', p: 3, t: teachers.habib, s: 'سنن أبي داود (1) وموطأ مالك' },
            { c: dauraId, d: 'Wednesday', p: 4, t: teachers.fahad, s: 'صحيح البخاري (1)' },
            { c: dauraId, d: 'Wednesday', p: 5, t: teachers.usman, s: 'سنن النسائي' },
            { c: dauraId, d: 'Thursday', p: 1, t: teachers.hasan, s: 'الطحاوي' },
            { c: dauraId, d: 'Thursday', p: 2, t: teachers.hasan, s: 'الطحاوي' },
            { c: dauraId, d: 'Thursday', p: 3, t: teachers.habib, s: 'سنن أبي داود (1) وموطأ مالك' },
            { c: dauraId, d: 'Thursday', p: 4, t: teachers.fahad, s: 'صحيح البخاري (1)' },
            { c: dauraId, d: 'Thursday', p: 5, t: teachers.baron, s: 'سنن أبي داود (2) وموطأ محمد' },
            { c: dauraId, d: 'Friday', p: 1, t: teachers.hamza, s: 'الترمذي (1)' },
            { c: dauraId, d: 'Friday', p: 2, t: teachers.hasan, s: 'الطحاوي' },
            { c: dauraId, d: 'Friday', p: 3, t: teachers.habib, s: 'سنن أبي داود (1) وموطأ مالك' },
            { c: dauraId, d: 'Friday', p: 4, t: teachers.habib, s: 'سنن أبي داود (1) وموطأ مالك' },
            { c: dauraId, d: 'Friday', p: 5, t: teachers.baron, s: 'سنن أبي داود (2) وموطأ محمد' }
        ];

        for (const item of data) {
            await db.execute(
                'INSERT INTO periods (day_of_week, period_number, teacher_id, class_id, subject, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [item.d, item.p, item.t, item.c, item.s, times[item.p].s, times[item.p].e]
            );
        }

        console.log('Imported all 4 classes.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

sync();

const db = require('./db');

const teachers = [
    { name: 'مفتی مشرف بیگ اشرف', subject: 'اللغة الفارسية / التوضيح' },
    { name: 'مولانا حبيب محبوب', subject: 'التجويد والسيرة / الهداية' },
    { name: 'مولانا کمال', subject: 'تفسير / الأدب' },
    { name: 'مولانا حسن', subject: 'الصرف / أصول الفقه' },
    { name: 'مولانا عبد القادر عثمان', subject: 'النحو / القدوري / النسائي' },
    { name: 'مفتی فرحان انور', subject: 'المنطق / شرح العقائد / البخاري' },
    { name: 'مولانا حمزه', subject: 'الهداية / الترمذي' },
    { name: 'مولانا قمر اعجاز', subject: 'التوضيح / الترمذي' },
    { name: 'مولانا بارون خليل', subject: 'علم الصيغة / سنن أبي داود' },
    { name: 'مولانا قمر علی شاہ', subject: 'شمائل الترمذي' }
];

async function seed() {
    try {
        // Clear existing teachers to avoid duplicates if re-running
        await db.execute('DELETE FROM teachers');
        for (const teacher of teachers) {
            await db.execute('INSERT INTO teachers (name, subject) VALUES (?, ?)', [teacher.name, teacher.subject]);
        }
        console.log('Teachers seeded successfully with correct titles!');
    } catch (err) {
        console.error('Error seeding teachers:', err.message);
    }
    process.exit();
}

seed();

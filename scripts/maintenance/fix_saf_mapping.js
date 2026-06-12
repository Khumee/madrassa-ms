require('dotenv').config();
const db = require('../../db');

async function fixSaf() {
    console.log('Mapping books to Saf (Classes) based on Timetable...');
    
    // Mapping: { TeacherNameKeyword: { BookTitle: ClassNameAR } }
    const mapping = {
        'مشرف': { 'اللغة الفارسية': 'الأولى', 'التوضيح': 'السادسة' },
        'حبيب': { 'التجويد والسيرة': 'الأولى', 'الهداية': 'السادسة', 'سنن أبي داود': 'دورة حديث' },
        'حسن': { 'الصرف': 'الأولى', 'أصول الفقه': 'الخامسة', 'الترمذي': 'السادسة' }, // Hassan has Tirmidhi/Tahawi
        'كمال': { 'تفسير': 'الخامسة', 'الأدب': 'الخامسة' },
        'عبد القادر': { 'النحو': 'الأولى', 'القدوري': 'الخامسة', 'النسائي': 'دورة حديث', 'اللغة العربية والعروض': 'السادسة' },
        'فہد': { 'المنطق': 'الثانية', 'شرح العقائد': 'السادسة', 'البخاري': 'دورة حديث' },
        'حمزه': { 'الهداية': 'الخامسة', 'الترمذي': 'دورة حديث' },
        'اعجاز': { 'التوضيح': 'السادسة', 'الترمذي': 'دورة حديث' },
        'بارون': { 'علم الصيغة': 'الثانية', 'سنن أبي داود': 'دورة حديث' },
        'قمر علی': { 'شمائل الترمذي': 'دورة حديث' }
    };

    const [teachers] = await db.execute('SELECT * FROM teachers');
    const [books] = await db.execute('SELECT * FROM books');
    const [classes] = await db.execute('SELECT * FROM classes');
    const [assignments] = await db.execute('SELECT * FROM teacher_books');

    for (const a of assignments) {
        const teacher = teachers.find(t => t.id === a.teacher_id);
        const book = books.find(b => b.id === a.book_id);
        
        if (!teacher || !book) continue;

        // Find teacher mapping
        let targetClassAR = null;
        for (const [key, booksMap] of Object.entries(mapping)) {
            if (teacher.name.includes(key)) {
                if (booksMap[book.title]) {
                    targetClassAR = booksMap[book.title];
                    break;
                }
            }
        }

        if (targetClassAR) {
            const cls = classes.find(c => c.name_ar === targetClassAR);
            if (cls) {
                await db.execute('UPDATE teacher_books SET class_id = ? WHERE id = ?', [cls.id, a.id]);
                console.log(`Updated: ${teacher.name} -> ${book.title} -> ${targetClassAR}`);
            }
        }
    }

    console.log('Saf mapping complete.');
    process.exit(0);
}

fixSaf();

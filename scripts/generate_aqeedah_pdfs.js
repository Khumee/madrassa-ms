const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const DOWNLOADS_DIR = path.join(__dirname, '..', 'lms', 'downloads');
const MASTER_PDF_PATH = path.join(DOWNLOADS_DIR, 'Aqeedah-Complete-Topic.pdf');
const NOTES_PDF_PATH = path.join(DOWNLOADS_DIR, 'Aqeedah-Lecture-Notes.pdf');
const SLIDES_PDF_PATH = path.join(DOWNLOADS_DIR, 'Aqeedah-Slides.pdf');

async function generateAqeedahPDFs() {
  if (!fs.existsSync(DOWNLOADS_DIR)) {
    fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
  }

  console.log('Launching Puppeteer for server-side Aqeedah PDF generation...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    /* ==============================================================
       1. GENERATE ALL-IN-ONE MASTER TOPIC PDF
       ============================================================== */
    console.log('Generating Aqeedah Complete Master Topic PDF...');
    const pageMaster = await browser.newPage();

    const masterHTML = `
<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>العقائد الإسلامية | حقيقة العقيدة والإيمان المفصل وأثرها في الحياة</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm 14mm 16mm 14mm;
      @top-center {
        content: "العقائد الإسلامية • حقيقة العقيدة والإيمان المفصل وأثرها في بناء الفرد والمجتمع";
        font-family: 'Noto Sans Arabic', sans-serif;
        font-size: 8pt;
        color: #94a3b8;
        border-bottom: 0.5px solid #e2e8f0;
        padding-bottom: 4px;
      }
      @bottom-center {
        content: "صفحہ " counter(page);
        font-family: 'Noto Sans Arabic', sans-serif;
        font-size: 8.5pt;
        color: #64748b;
      }
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: 'Noto Sans Arabic', 'Amiri', serif;
      direction: rtl;
      text-align: right;
      color: #1e293b;
      line-height: 1.8;
      font-size: 9.8pt;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .cover-header {
      text-align: center;
      border-bottom: 2.5px double #b48c28;
      padding-bottom: 10px;
      margin-bottom: 12px;
    }
    .badge {
      display: inline-block;
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fcd34d;
      padding: 3px 14px;
      border-radius: 14px;
      font-size: 8.5pt;
      font-weight: bold;
      margin-bottom: 4px;
    }
    h1 {
      font-family: 'Amiri', serif;
      font-size: 20pt;
      color: #78350f;
      margin: 2px 0;
      line-height: 1.25;
    }
    .subtitle {
      font-size: 10pt;
      color: #475569;
      margin-bottom: 2px;
    }
    .hero-card {
      background: linear-gradient(135deg, #fdfbf7 0%, #f7f3ea 100%);
      border: 1.5px solid #d4af37;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .hero-tag {
      display: inline-block;
      background: #b45309;
      color: #ffffff;
      padding: 2px 10px;
      border-radius: 4px;
      font-size: 8pt;
      font-weight: bold;
      margin-bottom: 6px;
    }
    .hero-title {
      font-family: 'Amiri', serif;
      font-size: 13.5pt;
      color: #78350f;
      margin: 0 0 4px 0;
    }
    .hero-desc {
      font-size: 9.2pt;
      line-height: 1.7;
      color: #334155;
      margin: 0;
    }
    .section-title-banner {
      background: #78350f;
      color: #ffffff;
      padding: 7px 12px;
      border-radius: 6px;
      font-size: 11pt;
      font-weight: bold;
      margin: 14px 0 8px 0;
      page-break-after: avoid;
    }
    .sub-section-title {
      font-size: 10pt;
      font-weight: bold;
      color: #0f172a;
      margin: 9px 0 5px 0;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 3px;
      page-break-after: avoid;
    }
    .matn-box {
      background: #fafaf9;
      border-right: 4px solid #b48c28;
      padding: 9px 12px;
      margin-bottom: 10px;
      border-radius: 0 6px 6px 0;
      page-break-inside: avoid;
    }
    .matn-ar {
      font-family: 'Amiri', serif;
      font-size: 13pt;
      line-height: 1.9;
      color: #78350f;
      font-weight: bold;
    }
    .matn-ur {
      font-family: 'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif;
      font-size: 9.8pt;
      line-height: 2.05;
      color: #14532d;
      margin-top: 5px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 10px;
      page-break-inside: avoid;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin-bottom: 10px;
      page-break-inside: avoid;
    }
    .card-item {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px 10px;
      font-size: 8.8pt;
    }
    .card-title {
      font-weight: bold;
      color: #0f172a;
      font-size: 9.5pt;
      margin-bottom: 4px;
      border-bottom: 1px dashed #cbd5e1;
      padding-bottom: 3px;
    }
    .hadith-quote {
      background: #f0fdf4;
      border-right: 3.5px solid #16a34a;
      padding: 7px 10px;
      border-radius: 0 5px 5px 0;
      margin: 6px 0;
      font-size: 8.8pt;
      line-height: 1.7;
    }
    .seerah-incident {
      background: #fffbeb;
      border-right: 3.5px solid #d97706;
      padding: 7px 10px;
      border-radius: 0 5px 5px 0;
      margin: 6px 0;
      font-size: 8.8pt;
      line-height: 1.7;
    }
    .warning-box {
      background: #fef2f2;
      border: 1px solid #fca5a5;
      border-right: 3.5px solid #dc2626;
      padding: 7px 10px;
      border-radius: 0 5px 5px 0;
      margin: 6px 0;
      font-size: 8.8pt;
      line-height: 1.7;
    }
    .impact-table {
      width: 100%;
      border-collapse: collapse;
      margin: 6px 0;
      font-size: 8.8pt;
    }
    .impact-table td {
      border: 1px solid #cbd5e1;
      padding: 6px 8px;
      vertical-align: top;
      background: #f8fafc;
    }
  </style>
</head>
<body>

  <!-- COVER / HEADER -->
  <div class="cover-header">
    <div class="badge">درسِ نظامی • دورۂ ایمانیات • نشست ۳ (صفحات ۱۲ تا ۱۷)</div>
    <h1>حقیقتِ عقیدہ اور ایمانِ مفصل</h1>
    <div class="subtitle">ساری ایمانیات کا جامع تعارف، ارکانِ ستہ اور ان کا انفرادی و اجتماعی زندگی پر اثر</div>
    <div style="font-size: 8.5pt; color: #64748b; margin-top: 2px;">
      التوحيد • الرسالة • اليوم الآخر • القضاء والقدر • البناء الروحي والاجتماعي
    </div>
  </div>

  <!-- HERO OVERVIEW -->
  <div class="hero-card">
    <span class="hero-tag">نشست ۳ کا مقصد و نچوڑ</span>
    <h2 class="hero-title">ایمانِ مفصل: دین و شریعت کی اساسی بنیاد</h2>
    <p class="hero-desc">
      عقیدہ محض چند زبانی کلمات یا فلسفیانہ موشگافیوں کا نام نہیں، بلکہ دل کی وہ پختہ گرہ ہے جو انسان کے فکر، عمل، اخلاق اور کردار کو یکسر بدل دیتی ہے۔ اسلامی نظامِ عقائد میں توحید (کس کی بندگی)، رسالت (کیسے بندگی)، آخرت (بندگی کا انجام)، اور تقدیر (بندگی کا حوصلہ) ایک دوسرے سے پیوست ستون ہیں۔
    </p>
  </div>

  <!-- SECTION 1: B1 IMAN-E-MUFASSAL & AQEEDAH DEFINITION -->
  <div class="section-title-banner">۱. ایمانِ مفصل: ساری ایمانیات کا جامع خلاصہ (B1)</div>

  <div class="matn-box">
    <div class="matn-ar">«آمَنْتُ بِاللّٰهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَالْقَدْرِ خَيْرِهِ وَشَرِّهِ مِنَ اللّٰهِ تَعَالَى وَالْبَعْثِ بَعْدَ الْمَوْتِ»</div>
    <div class="matn-ur"><strong>ترجمہ:</strong> «میں ایمان لایا اللہ پر، اس کے فرشتوں پر، اس کی کتابوں پر، اس کے رسولوں پر، آخرت کے دن پر، اور اس بات پر کہ اچھی اور بری تقدیر اللہ تعالیٰ ہی کی طرف سے ہے، اور موت کے بعد دوبارہ اٹھائے جانے پر۔»</div>
  </div>

  <div class="grid-3">
    <div class="card-item">
      <div class="card-title">لغوی معنی: پکی گرہ</div>
      عقیدہ <strong>"عقد"</strong> سے ہے، جس میں شدت، قوت، ثبات اور وثوق کا مفہوم پایا جاتا ہے؛ اسی سے ہے عقدِ بیع، عقدِ نکاح اور عقدِ بیعت۔
    </div>
    <div class="card-item">
      <div class="card-title">اصطلاحی تعریف</div>
      وہ واضح حقائق جنہیں عقل قبول کرے اور دل میں راسخ ہو کر <strong>انسان کے فکر و عمل کی قوتوں کو اپنی گرفت میں لے لیں</strong>۔
    </div>
    <div class="card-item">
      <div class="card-title">سچے عقیدے کے تقاضے</div>
      قبولِ مطلق، یقینِ راسخ، شک سے بالاتری، موافق کو اختیار اور مخالف کو ترک کرنا، اور اس کے لیے جان و مال کی قربانی کا جذبہ۔
    </div>
  </div>

  <div class="hadith-quote">
    <strong>سندِ نبوی: حدیثِ جبریل علیہ السلام (صحیح مسلم):</strong><br>
    «قَالَ: فَأَخْبِرْنِي عَنِ الْإِيمَانِ، قَالَ: أَنْ تُؤْمِنَ بِاللّٰهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ، وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ» — رسول اللہ ﷺ نے فرمایا: «یہ جبریلؑ تھے، تمہیں تمہارا دین سکھانے آئے تھے۔»
  </div>

  <div class="seerah-incident">
    <strong>طرزِ تعلیمِ صحابہ (سنن ابن ماجہ):</strong> حضرت جندب بن عبد اللہؓ فرماتے ہیں: «تَعَلَّمْنَا الْإِيمَانَ قَبْلَ أَنْ نَتَعَلَّمَ الْقُرْآنَ، ثُمَّ تَعَلَّمْنَا الْقُرْآنَ فَازْدَدْنَا بِهِ إِيمَانًا» (ہم نے قرآن سیکھنے سے پہلے ایمان سیکھا، پھر جب قرآن سیکھا تو ہمارا ایمان اور بڑھ گیا)۔
  </div>

  <!-- SECTION 2: B2 TAWHEED & REFUTATION OF SHIRK -->
  <div class="section-title-banner">۲. توحید اور اس کے اثرات (B2)</div>
  <div style="font-size: 8.8pt; margin-bottom: 6px;">
    توحید دین کی عمارت کا مرکزی ستون ہے جیسے جسم میں دل۔ توحید کے ۴ اساسی دائرے ہیں:
  </div>
  <div class="grid-2">
    <div class="card-item">
      <div class="card-title">۱. توحید فی الذات</div>
      اللہ تعالیٰ اپنی ذات میں احد اور صمد ہے؛ نہ کسی کی اولاد ہے اور نہ کوئی اس کی اولاد ہے۔
    </div>
    <div class="card-item">
      <div class="card-title">۲. توحید فی الصفات</div>
      اللہ کی صفات <strong>قدیم، ذاتی اور مطلق</strong> ہیں؛ جبکہ مخلوق کی صفات <strong>حادث، عطائی اور محدود</strong> ہیں۔
    </div>
    <div class="card-item">
      <div class="card-title">۳. توحید فی الاختیارات</div>
      فوق الفطری نفع و نقصان، حاجت روائی، مشکل کشائی، دعا سننا، قسمت بنانا، حلال و حرام مقرر کرنا فقط اللہ کا اختیار ہے۔
    </div>
    <div class="card-item">
      <div class="card-title">۴. توحید فی الحقوق</div>
      رکوع، سجود، نذر و نیاز، قربانی، منت، مصیبت میں پکارنا، غیر مشروط اطاعت اور سب سے بڑھ کر محبت صرف اللہ کا حق ہے۔
    </div>
  </div>

  <div class="warning-box">
    <strong>⚠️ معاشرے میں شرک کی عام صورتیں (غیر اسلامی عقائد):</strong><br>
    غیر اللہ سے غائبانہ دعائیں مانگنا (شرک فی الدعوۃ)؛ اللہ کی نافرمانی میں علماء و مشائخ کی اطاعت (شرک فی الطاعۃ — التوبہ: ۳۱)؛ کہانت و علمِ نجوم سے غیب کا دعویٰ؛ بدشگونی و توہمات؛ مزارات سے حاجت روائی سمجھنا؛ شرکِ خفی و ریاکاری۔
  </div>

  <div class="seerah-incident">
    <strong>سیرت کا عملی استقلال (حضرت بلال حبشیؓ):</strong> امیہ بن خلف تپتی ریت پر سینے پر وزنی چٹان رکھتا تاکہ وہ شرک کا ایک بول بول دیں، مگر ان کی زبان پر ایک ہی صدا تھی: «أَحَدٌ أَحَدٌ»۔
  </div>

  <table class="impact-table">
    <tr>
      <td style="width: 50%;">
        <strong>اثر بر نفسِ انسانی (انفرادی):</strong><br>
        • <em>خوف و حزن کا خاتمہ:</em> افسر کی ناراضگی پر جھوٹی رپورٹ پر دستخط نہیں کرتا۔<br>
        • <em>خودداری و آزادی:</em> چاپلوسی اور سفارش سے نجات (ایک سجدہ ہزار سجدوں سے نجات دیتا ہے)۔<br>
        • <em>توکل و قناعت:</em> حسد اور حرص سے حفاظت۔
      </td>
      <td style="width: 50%;">
        <strong>اثر بر نظامِ معاشرت (اجتماعی):</strong><br>
        • <em>مساوات و مواخات:</em> مسجد کی صف میں امیر اور غریب ایک ساتھ۔<br>
        • <em>نسلی تفاخر کی نفی:</em> رنگ، نسل اور زبان پر فخر کا بطلان۔<br>
        • <em>حاکمیتِ الٰہی:</em> قانون کسی بااثر طبقے کی ہوس کا محتاج نہیں رہتا۔
      </td>
    </tr>
  </table>

  <!-- SECTION 3: B3 INSTITUTION OF RISALAT & KHATM-E-NUBUWWAT -->
  <div class="section-title-banner">۳. ادارۂ رسالت اور ختمِ نبوت (B3)</div>
  <div class="grid-3">
    <div class="card-item">
      <div class="card-title">۱. فرشتہ (پیغام لانے والا)</div>
      فرشتے سراپا اطاعت مخلوق ہیں، نہ اللہ کی اولاد ہیں نہ معبود۔ حضرت جبرائیلؑ وحی لانے پر مامور ہیں۔
    </div>
    <div class="card-item">
      <div class="card-title">۲. کتابیں (ہدایت کا متن)</div>
      تمام آسمانی کتابوں پر ایمان فرض ہے۔ قرآن <strong>"مُهَيْمِن"</strong> ہے یعنی سابقہ کتب کا محافظ و ناسخ اور خود محفوظ۔
    </div>
    <div class="card-item">
      <div class="card-title">۳. رسول (زندہ نمونہ)</div>
      رسول صرف زبانی پیغام نہیں دیتے بلکہ خود عمل کر کے دکھاتے ہیں۔ صفات: بشریت، عبودیت، عصمت، امانت و صدق۔
    </div>
  </div>

  <div class="card-item" style="margin-bottom: 8px;">
    <strong>رسول اللہ ﷺ کی حیثیتیں اور ختمِ نبوت:</strong> آپ ﷺ محض "مرکزِ عقیدت" نہیں بلکہ <strong>"مرکزِ اطاعت"</strong> ہیں (کتاب کے مفسر، معلم، مربی، قاضی و حاکم)۔ ﴿مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ﴾ کے تحت دین مکمل ہو چکا ہے، قرآن و سنت محفوظ ہیں، اور قیامت تک کسی نئے نبی کی ضرورت باقی نہیں رہی۔
  </div>

  <div class="seerah-incident">
    <strong>سفیرِ قریش عروہ بن مسعود کا اعتراف (صلحِ حدیبیہ):</strong> «خدا کی قسم! میں قیصر، کسریٰ اور نجاشی کے درباروں میں گیا ہوں، مگر میں نے کسی بادشاہ کے ساتھیوں کو اپنے بادشاہ کی ایسی تعظیم و اطاعت کرتے نہیں دیکھا جیسی محمد ﷺ کے صحابہ محمد ﷺ کی کرتے ہیں» (بخاری)۔
  </div>

  <!-- SECTION 4: B4 AKHIRAH & STAGES OF ACCOUNTABILITY -->
  <div class="section-title-banner">۴. عالمِ آخرت اور مراحلِ جزا و سزا (B4)</div>
  <div class="card-item" style="margin-bottom: 8px;">
    <strong>سفرِ آخرت کے ۹ مراحل:</strong> موت و سکرات ← قبر و برزخ ← نفخات (فزع، صعق، قیام) ← بعث (قبروں سے اٹھنا) ← حشر (میدانِ حساب) ← شفاعتِ کبریٰ ← حساب کتاب و میزان ← پل صراط ← جنت یا جہنم۔
  </div>

  <div class="grid-2">
    <div class="card-item">
      <div class="card-title">عقلی دلائل بر وقوعِ آخرت</div>
      • پہلی بار بنانا ممکن تھا تو اعادہ کیوں محال ہوگا؟<br>
      • دنیا میں ظالم دندناتے پھرتے ہیں، پس عدلِ مطلق کا تقاضا ایک عدالتِ عظمیٰ ہے۔<br>
      • انسانی ضمیر (نفسِ لوامہ) ہر وقت اچھے برے کی شہادت دیتا ہے۔
    </div>
    <div class="card-item">
      <div class="card-title">سیرت کا عملی نمونہ: مصعب بن عمیرؓ</div>
      مکہ کے سب سے امیر اور خوش پوش نوجوان مصعب بن عمیرؓ نے آخرت کی خاطر سب کچھ قربان کیا۔ احد میں شہید ہوئے تو کفن کے لیے ایک چھوٹی چادر تھی—سر ڈھانپتے تو پاؤں کھل جاتے، پاؤں ڈھانپتے تو سر کھل جاتا!
    </div>
  </div>

  <!-- SECTION 5: B5 TAQDEER & FREE WILL -->
  <div class="section-title-banner">۵. تقدیر اور انسانی اختیار کا توازن (B5)</div>
  <div class="grid-2">
    <div class="card-item">
      <div class="card-title">مراتبِ تقدیر (۴ درجات)</div>
      ۱. <strong>علم:</strong> اللہ کا ہر شے کا ازلی علم۔<br>
      ۲. <strong>کتابت:</strong> تخلیق سے ۵۰ ہزار سال قبل لوحِ محفوظ پر اندراج۔<br>
      ۳. <strong>مشیئت:</strong> جو اللہ چاہے وہی واقع ہونا۔<br>
      ۴. <strong>خلق:</strong> تمام کائنات اور افعال کا اصل خالق فقط اللہ ہے۔
    </div>
    <div class="card-item">
      <div class="card-title">جبر و اختیار کا برحق توازن</div>
      انسان نہ تو مجبورِ محض ہے اور نہ خود مختارِ مطلق۔ انسان کو <strong>محدود ارادہ و اختیار</strong> دیا گیا ہے جس کا وہ مکلف ہے؛ ارادہ انسان کا اور تکمیل اللہ کی مشیئت سے ہے۔ سستی یا گناہ کا ملبہ تقدیر پر ڈالنا باطل ہے۔
    </div>
  </div>

  <div class="seerah-incident">
    <strong>طاعونِ عمواس پر حضرت عمر فاروقؓ کا فیصلہ:</strong> حضرت ابو عبیدہؓ نے پوچھا: کیا اللہ کی تقدیر سے بھاگ رہے ہیں؟ فرمایا: <strong>«نَعَمْ، نَفِرُّ مِنْ قَدَرِ اللّٰهِ إِلَى قَدَرِ اللّٰهِ»</strong> (ہاں، ہم اللہ کی ایک تقدیر سے اللہ ہی کی دوسری تقدیر کی طرف جا رہے ہیں—بخاری و مسلم)۔
  </div>

  <!-- SECTION 6: THE GRAND SYNTHESIS -->
  <div class="section-title-banner">۶. خلاصۂ کلام (The Grand Synthesis)</div>
  <div class="grid-2">
    <div class="card-item" style="border-right: 3.5px solid #b48c28;">
      <strong>۱. توحید:</strong> کس کی بندگی؟ (صرف اللہ وحدہ لا شریک لہ کی)
    </div>
    <div class="card-item" style="border-right: 3.5px solid #0284c7;">
      <strong>۲. رسالت:</strong> کیسے بندگی؟ (محمد رسول اللہ ﷺ کے سنت طریق پر)
    </div>
    <div class="card-item" style="border-right: 3.5px solid #dc2626;">
      <strong>۳. آخرت:</strong> بندگی کا انجام؟ (حساب کتاب، عدل، ابدی جنت)
    </div>
    <div class="card-item" style="border-right: 3.5px solid #16a34a;">
      <strong>۴. تقدیر:</strong> بندگی کا حوصلہ؟ (نفع و نقصان اور انجام رب کے ہاتھ میں ہے)
    </div>
  </div>

  <!-- FOOTER -->
  <div style="text-align: center; border-top: 1px solid #cbd5e1; padding-top: 8px; margin-top: 14px; font-size: 8pt; color: #64748b;">
    جامع درسی انسائیکلوپیڈیا • حقیقتِ عقیدہ و ایمانِ مفصل (نشست ۳) • مدرسہ آن لائن لرننگ مینجمنٹ سسٹم (KUI LMS)
  </div>

</body>
</html>
    `;

    await pageMaster.setContent(masterHTML, { waitUntil: 'networkidle0' });
    await pageMaster.pdf({
      path: MASTER_PDF_PATH,
      format: 'A4',
      printBackground: true,
      margin: { top: '15mm', bottom: '16mm', left: '14mm', right: '14mm' }
    });
    console.log('Aqeedah Master Topic PDF saved at:', MASTER_PDF_PATH);
    await pageMaster.close();

    /* ==============================================================
       2. GENERATE LECTURE NOTES PDF
       ============================================================== */
    console.log('Generating Aqeedah Lecture Notes PDF...');
    const pageNotes = await browser.newPage();

    const notesHTML = `
<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>العقائد الإسلامية | درسی نوٹس و خلاصۂ کلام</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm 14mm 16mm 14mm;
      @top-center {
        content: "العقائد الإسلامية • درسی نوٹس و تلخیص (نشست ۳: ایمانِ مفصل اور ارکانِ ستہ)";
        font-family: 'Noto Sans Arabic', sans-serif;
        font-size: 8pt;
        color: #94a3b8;
        border-bottom: 0.5px solid #e2e8f0;
        padding-bottom: 4px;
      }
      @bottom-center {
        content: "صفحہ " counter(page);
        font-family: 'Noto Sans Arabic', sans-serif;
        font-size: 8.5pt;
        color: #64748b;
      }
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: 'Noto Sans Arabic', 'Amiri', serif;
      direction: rtl;
      text-align: right;
      color: #1e293b;
      line-height: 1.85;
      font-size: 10pt;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .notes-header {
      text-align: center;
      border-bottom: 2px solid #b48c28;
      padding-bottom: 8px;
      margin-bottom: 12px;
    }
    .badge-notes {
      display: inline-block;
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fcd34d;
      padding: 2px 12px;
      border-radius: 12px;
      font-size: 8.5pt;
      font-weight: bold;
      margin-bottom: 4px;
    }
    h1 {
      font-family: 'Amiri', serif;
      font-size: 19pt;
      color: #78350f;
      margin: 2px 0;
    }
    .note-section-title {
      background: #f1f5f9;
      border-right: 4px solid #b48c28;
      color: #0f172a;
      padding: 6px 10px;
      font-weight: bold;
      font-size: 10.5pt;
      margin: 14px 0 8px 0;
      page-break-after: avoid;
    }
    .point-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px 10px;
      margin-bottom: 8px;
      page-break-inside: avoid;
      font-size: 9pt;
    }
    .point-title {
      font-weight: bold;
      color: #92400e;
      margin-bottom: 3px;
    }
  </style>
</head>
<body>

  <div class="notes-header">
    <div class="badge-notes">درسِ نظامی • درسی نوٹس و خلاصۂ مباحث</div>
    <h1>العقائد الإسلامية | درسی نوٹس و خلاصۂ کلام</h1>
    <div style="font-size: 9pt; color: #475569;">نشست ۳: ایمانِ مفصل، ارکانِ ستہ، اور ان کا انفرادی و معاشرتی زندگی پر اثر</div>
  </div>

  <div class="note-section-title">۱. ایمانِ مفصل اور عقیدہ کا مفہوم</div>
  <div class="point-card">
    <div class="point-title">• متنِ ایمانِ مفصل:</div>
    «آمَنْتُ بِاللّٰهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَالْقَدْرِ خَيْرِهِ وَشَرِّهِ مِنَ اللّٰهِ تَعَالَى وَالْبَعْثِ بَعْدَ الْمَوْتِ»
  </div>
  <div class="point-card">
    <div class="point-title">• لغوی و اصطلاحی تعریف:</div>
    عقیدہ "عقد" سے ہے (پکی گرہ)۔ اصطلاح میں ان حقائق کو کہتے ہیں جو عقل میں ثابت ہو کر دل میں راسخ ہو جائیں اور انسان کے فکر و عمل کو کنٹرول کر لیں۔
  </div>

  <div class="note-section-title">۲. توحید اور اس کے چار دائرے</div>
  <div class="point-card">
    <div class="point-title">• چار شعبے:</div>
    ۱. <strong>ذات:</strong> وہ احد اور صمد ہے۔<br>
    ۲. <strong>صفات:</strong> اللہ کی صفات قدیم، ذاتی، مطلق ہیں؛ مخلوق کی حادث، عطائی، محدود ہیں۔<br>
    ۳. <strong>اختیارات:</strong> حاکمیت، شریعت اور فوق الفطری نفع و نقصان صرف رب کا اختیار ہے۔<br>
    ۴. <strong>حقوق:</strong> تمام عبادات، رکوع، سجود، نذر و پکار فقط اللہ کا حق ہے۔
  </div>
  <div class="point-card">
    <div class="point-title">• فرد و معاشرے پر اثر:</div>
    خوف و حزن کا خاتمہ، جھوٹی رپورٹ پر دستخط سے انکار، خودداری، مساوات اور نسلی تفاخر کی نفی۔
  </div>

  <div class="note-section-title">۳. ادارۂ رسالت اور ختمِ نبوت</div>
  <div class="point-card">
    <div class="point-title">• تین باہم وابستہ اجزاء:</div>
    فرشتہ (وحی لانے والا)، کتاب (ہدایت کا متن، قرآن مہیمن ہے)، رسول (زندہ عملی نمونہ)۔
  </div>
  <div class="point-card">
    <div class="point-title">• رسول اللہ ﷺ کی حیثیت:</div>
    آپ ﷺ محض مرکزِ عقیدت نہیں بلکہ مرکزِ اطاعت ہیں؛ آپ کے بعد نبوت کا دروازہ ہمیشہ کے لیے بند ہے۔
  </div>

  <div class="note-section-title">۴. آخرت اور نظامِ جزا</div>
  <div class="point-card">
    <div class="point-title">• حقیقتِ آخرت:</div>
    موت خاتمہ نہیں بلکہ ابدی زندگی میں منتقلی ہے۔ عدلِ مطلق کا تقاضا ہے کہ مظلوم کو بدلہ اور ظالم کو سزا ملے۔
  </div>

  <div class="note-section-title">۵. تقدیر اور انسانی اختیار</div>
  <div class="point-card">
    <div class="point-title">• مراتب و توازن:</div>
    تقدیر کے ۴ مراتب ہیں: علم، کتابت، مشیئت، خلق۔ انسان مجبورِ محض نہیں بلکہ محدود اختیار رکھتا ہے؛ ارادہ انسان کا اور تکمیل رب کی مشیئت سے۔ حضرت عمرؓ نے فرمایا: «نَفِرُّ مِنْ قَدَرِ اللّٰهِ إِلَى قَدَرِ اللّٰهِ»۔
  </div>

</body>
</html>
    `;

    await pageNotes.setContent(notesHTML, { waitUntil: 'networkidle0' });
    await pageNotes.pdf({
      path: NOTES_PDF_PATH,
      format: 'A4',
      printBackground: true,
      margin: { top: '15mm', bottom: '16mm', left: '14mm', right: '14mm' }
    });
    console.log('Aqeedah Lecture Notes PDF saved at:', NOTES_PDF_PATH);
    await pageNotes.close();

    /* ==============================================================
       3. GENERATE SLIDES PDF (A4 Landscape)
       ============================================================== */
    console.log('Generating Aqeedah Presentation Slides PDF (6 Landscape Slides)...');
    const pageSlides = await browser.newPage();

    const slidesData = [
      {
        num: 1,
        tag: 'تعارف و تمہید',
        title: 'ایمانِ مفصل اور عقیدہ کا مفہوم (B1)',
        sub: 'نشست ۳ | العقائد الإسلامية',
        cards: [
          { title: 'متنِ ایمانِ مفصل', text: '«آمَنْتُ بِاللّٰهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَالْقَدْرِ خَيْرِهِ وَشَرِّهِ مِنَ اللّٰهِ تَعَالَى وَالْبَعْثِ بَعْدَ الْمَوْتِ»' },
          { title: 'عقیدہ کا لغوی معنی', text: 'عقیدہ "عقد" سے ہے یعنی پکی گرہ؛ جس میں ثبات، قوت اور وثوق پایا جائے۔' },
          { title: 'حدیثِ جبریلؑ', text: 'حضرت جبریلؑ نے ایمان کی حقیقت پوچھی تو آپ ﷺ نے یہی چھ ارکان بیان فرمائے۔' }
        ]
      },
      {
        num: 2,
        tag: 'توحیدِ خالص',
        title: 'توحید کے چار دائرے اور ردِ شرک (B2)',
        sub: 'توحید دین کی عمارت کا مرکزی دل ہے',
        cards: [
          { title: 'توحید فی الذات و الصفات', text: 'اللہ ذات میں یکتا ہے؛ اس کی صفات قدیم، ذاتی اور مطلق ہیں جبکہ مخلوق کی حادث اور عطائی ہیں۔' },
          { title: 'توحید فی الاختیار و الحقوق', text: 'فوق الفطری تصرف، حاکمیت، شریعت اور عبادات کا اکیلا مستحق فقط اللہ سبحانہ وتعالیٰ ہے۔' },
          { title: 'سیرت: حضرت بلالؓ', text: 'تپتی ریت پر سینے پر وزنی چٹان رکھنے کے باوجود پکار: «أَحَدٌ أَحَدٌ»۔' }
        ]
      },
      {
        num: 3,
        tag: 'ادارۂ رسالت',
        title: 'ادارۂ رسالت کے ۳ اجزاء اور ختمِ نبوت (B3)',
        sub: 'ہدایتِ الٰہی کا مستند اور کامل نظام',
        cards: [
          { title: 'تین مربوط ستون', text: 'فرشتہ (پیغام لانے والا)، کتاب (ہدایت کا متن، قرآن مہیمن)، اور رسول (زندہ عملی نمونہ)۔' },
          { title: 'مرکزِ اطاعت', text: 'رسول اللہ ﷺ محض مرکزِ عقیدت نہیں بلکہ مرکزِ اطاعت ہیں۔ آپ کے طریقے کے بغیر بندگی ممکن نہیں۔' },
          { title: 'ختمِ نبوت', text: '﴿وَخَاتَمَ النَّبِيِّينَ﴾ دین مکمل ہو گیا، وحی کا سلسلہ ختم ہوا، اور قیامت تک آپ ﷺ ہی ہادی ہیں۔' }
        ]
      },
      {
        num: 4,
        tag: 'عالمِ آخرت',
        title: 'عالمِ آخرت اور احتسابِ اعمال (B4)',
        sub: 'موت خاتمہ نہیں بلکہ ابدی زندگی کا آغاز ہے',
        cards: [
          { title: 'سفرِ آخرت کے مراحل', text: 'موت، قبر و برزخ، صور پھونکنا، بعث و حشر، شفاعتِ عظمیٰ، حساب و میزان، پل صراط، جنت یا جہنم۔' },
          { title: 'عقلی بنیاد', text: 'دنیا کی نامکمل عدالتوں کے مقابلے میں عدلِ مطلق کا تقاضا ہے کہ ہر مظلوم کو انصاف اور ظالم کو سزا ملے۔' },
          { title: 'سیرت: مصعب بن عمیرؓ', text: 'ناز و نعم کے شہزادے نے آخرت کی خاطر سب کچھ تیاگا، اور احد میں کفن کی چھوٹی چادر پر راضی رہے۔' }
        ]
      },
      {
        num: 5,
        tag: 'تقدیر و حکمت',
        title: 'تقدیر کے ۴ مراتب اور انسانی اختیار (B5)',
        sub: 'اہلِ سنت کا معتدل فہم: جبر و تفویض کے درمیان',
        cards: [
          { title: 'مراتبِ اربعہ', text: 'علمِ ازلی، لوحِ محفوظ پر کتابت، مشیئتِ نافذہ، اور خلقِ کائنات و افعال۔' },
          { title: 'اختیارِ انسانی', text: 'انسان پتھر کی طرح مجبور نہیں بلکہ محدود ارادہ رکھتا ہے؛ ارادہ انسان کا اور توفیق و خلق اللہ کی۔' },
          { title: 'ارشادِ عمر فاروقؓ', text: 'طاعون پر فرمایا: «نَفِرُّ مِنْ قَدَرِ اللّٰهِ إِلَى قَدَرِ اللّٰهِ» یعنی تدبیر تقدیر کے خلاف نہیں۔' }
        ]
      },
      {
        num: 6,
        tag: 'جامع خلاصہ',
        title: 'چاروں ستونوں کا باہمی ربط (The Grand Synthesis)',
        sub: 'پوری ایمانی زندگی کا عطر و نچوڑ',
        cards: [
          { title: 'توحید و رسالت', text: 'توحید بتاتی ہے: "کس کی بندگی؟" اور رسالت بتاتی ہے: "کیسے بندگی؟"' },
          { title: 'آخرت و تقدیر', text: 'آخرت بتاتی ہے: "بندگی کا انجام؟" اور تقدیر دیتی ہے: "بندگی کا حوصلہ اور استقامت!"' },
          { title: 'حتمی ثمرہ', text: 'خوف و حزن سے آزاد، باوقار، متقی فرد اور عدل و مساوات پر مبنی پرامن اسلامی معاشرہ۔' }
        ]
      }
    ];

    let slidesHTML = `
<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>العقائد الإسلامية | شرائح المحاضرات والمسائل الإيمانية</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 landscape;
      margin: 8mm 10mm 8mm 10mm;
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: 'Noto Sans Arabic', 'Amiri', serif;
      direction: rtl;
      text-align: right;
      color: #1e293b;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }
    .slide-page {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      padding: 12px 16px;
      border: 2px solid #b48c28;
      border-radius: 10px;
      box-sizing: border-box;
      background: #ffffff;
    }
    .slide-page:last-child {
      page-break-after: avoid;
    }
    .slide-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 6px;
    }
    .slide-tag {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fcd34d;
      padding: 3px 12px;
      border-radius: 12px;
      font-size: 8.5pt;
      font-weight: bold;
    }
    .slide-book-name {
      font-size: 8.5pt;
      color: #64748b;
      font-weight: 600;
    }
    .slide-title {
      font-family: 'Amiri', serif;
      font-size: 19pt;
      color: #78350f;
      margin: 8px 0 4px 0;
      line-height: 1.3;
    }
    .slide-sub {
      font-size: 9pt;
      color: #64748b;
      margin-bottom: 10px;
    }
    .slide-cards-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      flex-grow: 1;
      align-items: stretch;
      margin: 8px 0;
    }
    .slide-card-item {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-top: 4px solid #b48c28;
      border-radius: 8px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .card-item-title {
      font-weight: bold;
      font-size: 10.5pt;
      color: #0f172a;
      margin-bottom: 8px;
      border-bottom: 1px dashed #cbd5e1;
      padding-bottom: 4px;
    }
    .card-item-text {
      font-size: 9.5pt;
      line-height: 1.75;
      color: #334155;
    }
    .slide-footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
      font-size: 8.5pt;
      color: #94a3b8;
    }
  </style>
</head>
<body>
`;

    slidesData.forEach((s) => {
      slidesHTML += `
  <div class="slide-page">
    <div class="slide-top-bar">
      <span class="slide-tag">${s.tag}</span>
      <span class="slide-book-name">العقائد الإسلامية • نشست ۳ (ایمانِ مفصل و ارکانِ ستہ)</span>
      <span style="font-weight: bold; color: #b48c28; font-size: 9pt;">سلائیڈ ${s.num} / ${slidesData.length}</span>
    </div>

    <div>
      <h2 class="slide-title">${s.title}</h2>
      <div class="slide-sub">${s.sub}</div>
    </div>

    <div class="slide-cards-grid">
      ${s.cards.map(c => `
        <div class="slide-card-item">
          <div class="card-item-title">${c.title}</div>
          <div class="card-item-text">${c.text}</div>
        </div>
      `).join('')}
    </div>

    <div class="slide-footer-bar">
      <span>مدرسہ آن لائن لرننگ مینجمنٹ سسٹم (KUI LMS)</span>
      <span>صفحات ۱۲ تا ۱۷ • حقیقتِ عقیدہ و ایمانِ مفصل</span>
    </div>
  </div>
`;
    });

    slidesHTML += `
</body>
</html>
`;

    await pageSlides.setContent(slidesHTML, { waitUntil: 'networkidle0' });
    await pageSlides.pdf({
      path: SLIDES_PDF_PATH,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '8mm', bottom: '8mm', left: '10mm', right: '10mm' }
    });
    console.log('Aqeedah Presentation Slides PDF saved at:', SLIDES_PDF_PATH);
    await pageSlides.close();

    console.log('All Aqeedah PDFs generated successfully via Puppeteer!');
  } catch (err) {
    console.error('Error generating Aqeedah PDFs:', err);
    throw err;
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  generateAqeedahPDFs()
    .then(() => {
      console.log('PDF generation complete.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('PDF generation failed:', err);
      process.exit(1);
    });
}

module.exports = { generateAqeedahPDFs };

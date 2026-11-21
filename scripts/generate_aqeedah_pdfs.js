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
    console.log('Generating Aqeedah Complete Master Topic PDF (Comprehensive Full Guide)...');
    const pageMaster = await browser.newPage();

    const masterHTML = `
<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>العقائد الإسلامية | حقيقة العقيدة والإيمان المفصل وأثرها في بناء الفرد والمجتمع</title>
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
      line-height: 1.85;
      font-size: 9.6pt;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .cover-header {
      text-align: center;
      border-bottom: 2.5px double #b48c28;
      padding-bottom: 12px;
      margin-bottom: 14px;
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
      margin-bottom: 5px;
    }
    h1 {
      font-family: 'Amiri', serif;
      font-size: 21pt;
      color: #78350f;
      margin: 4px 0 2px 0;
      line-height: 1.25;
    }
    .subtitle {
      font-size: 10.2pt;
      color: #475569;
      margin-bottom: 3px;
    }
    .hero-card {
      background: linear-gradient(135deg, #fdfbf7 0%, #f7f3ea 100%);
      border: 1.5px solid #d4af37;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 14px;
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
      font-size: 14pt;
      color: #78350f;
      margin: 0 0 5px 0;
    }
    .hero-desc {
      font-size: 9.4pt;
      line-height: 1.75;
      color: #334155;
      margin: 0;
    }
    .section-title-banner {
      background: #78350f;
      color: #ffffff;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 11.5pt;
      font-weight: bold;
      margin: 16px 0 10px 0;
      page-break-after: avoid;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sub-section-title {
      font-size: 10.2pt;
      font-weight: bold;
      color: #0f172a;
      margin: 12px 0 6px 0;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 4px;
      page-break-after: avoid;
    }
    .matn-box {
      background: #fafaf9;
      border: 1px solid #e2e8f0;
      border-right: 4.5px solid #b48c28;
      padding: 10px 14px;
      margin-bottom: 12px;
      border-radius: 0 6px 6px 0;
      page-break-inside: avoid;
    }
    .matn-ar {
      font-family: 'Amiri', serif;
      font-size: 13.5pt;
      line-height: 2;
      color: #78350f;
      font-weight: bold;
      text-align: center;
    }
    .matn-ur {
      font-family: 'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif;
      font-size: 9.8pt;
      line-height: 2.1;
      color: #14532d;
      margin-top: 6px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .card-item {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 9px 12px;
      font-size: 9pt;
      line-height: 1.7;
    }
    .card-title {
      font-weight: bold;
      color: #0f172a;
      font-size: 9.8pt;
      margin-bottom: 5px;
      border-bottom: 1px dashed #cbd5e1;
      padding-bottom: 3px;
    }
    .quran-box {
      background: #fdfbf7;
      border: 1px solid #fed7aa;
      border-right: 4px solid #ea580c;
      padding: 9px 12px;
      border-radius: 0 6px 6px 0;
      margin: 8px 0;
      page-break-inside: avoid;
    }
    .quran-ar {
      font-family: 'Amiri', serif;
      font-size: 12pt;
      color: #9a3412;
      line-height: 1.9;
      font-weight: bold;
    }
    .hadith-quote {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-right: 4px solid #16a34a;
      padding: 9px 12px;
      border-radius: 0 6px 6px 0;
      margin: 8px 0;
      font-size: 9pt;
      line-height: 1.75;
      page-break-inside: avoid;
    }
    .seerah-incident {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-right: 4px solid #d97706;
      padding: 9px 12px;
      border-radius: 0 6px 6px 0;
      margin: 8px 0;
      font-size: 9pt;
      line-height: 1.75;
      page-break-inside: avoid;
    }
    .warning-box {
      background: #fef2f2;
      border: 1px solid #fca5a5;
      border-right: 4px solid #dc2626;
      padding: 9px 12px;
      border-radius: 0 6px 6px 0;
      margin: 8px 0;
      font-size: 9pt;
      line-height: 1.75;
      page-break-inside: avoid;
    }
    .metaphor-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-right: 4.5px solid #2563eb;
      padding: 10px 14px;
      border-radius: 0 8px 8px 0;
      margin: 10px 0;
      page-break-inside: avoid;
    }
    .metaphor-title {
      font-family: 'Amiri', serif;
      font-size: 12pt;
      font-weight: bold;
      color: #1e3a8a;
      margin-bottom: 4px;
    }
    .metaphor-tag {
      display: inline-block;
      background: #dbeafe;
      color: #1e40af;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 7.8pt;
      font-weight: bold;
      margin-bottom: 4px;
    }
    .impact-table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0;
      font-size: 9pt;
      page-break-inside: avoid;
    }
    .impact-table td {
      border: 1px solid #cbd5e1;
      padding: 8px 10px;
      vertical-align: top;
      background: #f8fafc;
    }
    .table-header {
      background: #e2e8f0;
      font-weight: bold;
      color: #0f172a;
    }
    .roadmap-table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-size: 8.8pt;
      page-break-inside: avoid;
    }
    .roadmap-table th, .roadmap-table td {
      border: 1px solid #cbd5e1;
      padding: 7px 10px;
      vertical-align: top;
    }
    .roadmap-table th {
      background: #78350f;
      color: #ffffff;
      font-size: 9.2pt;
    }
    .slide-summary-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px 10px;
      margin-bottom: 8px;
      page-break-inside: avoid;
    }
    .slide-num-pill {
      background: #b48c28;
      color: #ffffff;
      padding: 1px 7px;
      border-radius: 10px;
      font-size: 7.8pt;
      font-weight: bold;
      margin-left: 6px;
    }
  </style>
</head>
<body>

  <!-- COVER / HEADER -->
  <div class="cover-header">
    <div class="badge">درسِ نظامی • دورۂ ایمانیات • نشست ۳ (صفحات ۱۲ تا ۱۷) • ۱ سالہ جامع کورس پریویو</div>
    <h1>حقیقتِ عقیدہ، ایمانِ مفصل اور اس کے انفرادی و اجتماعی اثرات</h1>
    <div class="subtitle">ایمانِ مفصل کے ارکانِ ستہ (توحید، رسالت، کتب، ملائکہ، آخرت، تقدیر) اور روزمرہ زندگی میں عقیدے کی طاقت</div>
    <div style="font-size: 8.5pt; color: #64748b; margin-top: 4px;">
      جامعہ آن لائن لرننگ مینجمنٹ سسٹم (KUI LMS) • نصابِ علم العقائد الإسلامية
    </div>
  </div>

  <!-- HERO: COURSE PREVIEW & METHODOLOGY -->
  <div class="hero-card">
    <span class="hero-tag">۱ سالہ آن لائن اسلامی کورس کا ماڈل سبق و پریویو</span>
    <h2 class="hero-title">کیوں عمل سے پہلے عقیدہ ضروری ہے؟</h2>
    <p class="hero-desc">
      رسول اللہ ﷺ نے مکہ مکرمہ کے مشرک معاشرے میں پہلے ۱۳ سال نہ نماز کی جزئیات فرض کیں، نہ روزے، زکوٰۃ یا حج کے احکام؛ بلکہ پہلے دلوں میں خدا، رسول اور آخرت کے زندہ یقین کی بنیاد رکھی۔ 
      اگر گاڑی کا انجن نہ ہو تو شاندار باڈی اور بمپر اسٹیکر کسی کام کے نہیں۔ <strong>عقیدہ عمل کی روح اور انجن ہے</strong>۔ جب تک دل کی زمین میں عقیدے کی جڑ مضبوط نہ ہو، اعمال کی شاخیں پھل نہیں لا سکتیں۔
    </p>
  </div>

  <!-- THOUGHT EXPERIMENT BANNER -->
  <div class="matn-box" style="border-right-color: #ea580c; background: #fff7ed;">
    <span class="hero-tag" style="background: #ea580c;">ایک فکری چیلنج (Thought Experiment)</span>
    <div style="font-family: 'Amiri', serif; font-size: 12.5pt; color: #9a3412; font-weight: bold; margin: 4px 0;">
      تصور کریں: اگر اللہ تعالیٰ دنیا میں انبیاء نہ بھیجتا تو انسانیت کی حالت کیا ہوتی؟
    </div>
    <div style="font-size: 9.3pt; color: #431407; line-height: 1.8;">
      اگر وحی اور نبوت نہ ہوتی تو انسانی عقل مادیت کے اندھیروں میں بھٹکتی رہتی۔ طاقتور کا قانون راج کرتا، اخلاقیات محض کمزوروں کا وہم قرار پاتیں، اور انسان چاند، سورج، سانپ یا خود انسانوں ہی کو خدا بنا کر پوجتا رہتا۔ عقل اکیلی سائنسی آلات تو بنا سکتی ہے لیکن خیر و شر، عدلِ مطلق اور روح کے مقصد کا ابدی پیمانہ صرف وحیِ نبوت سے ملتا ہے۔
    </div>
  </div>

  <!-- MATN-E-IMAN-E-MUFASSAL -->
  <div class="matn-box">
    <span class="hero-tag" style="background: #b45309;">اساسی کلامی متن</span>
    <div class="matn-ar">
      «آمَنْتُ بِاللّٰهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَالْقَدْرِ خَيْرِهِ وَشَرِّهِ مِنَ اللّٰهِ تَعَالَى وَالْبَعْثِ بَعْدَ الْمَوْتِ»
    </div>
    <div class="matn-ur">
      <strong>اردو ترجمہ:</strong> «میں ایمان لایا اللہ پر، اس کے فرشتوں پر، اس کی کتابوں پر، اس کے رسولوں پر، آخرت کے دن پر، اور اس بات پر کہ اچھی اور بری تقدیر اللہ تعالیٰ ہی کی طرف سے ہے، اور موت کے بعد دوبارہ اٹھائے جانے پر۔»
    </div>
  </div>

  <!-- ==========================================
       SECTION 1: B1 IMAN-E-MUFASSAL & AQEEDAH
       ========================================== -->
  <div class="section-title-banner">
    <span>۱. الباب الأول (B1): حقيقة العقيدة والإيمان المفصل</span>
    <span style="font-size: 8.5pt; font-weight: normal;">صفحہ ۱۲</span>
  </div>

  <div class="grid-3">
    <div class="card-item">
      <div class="card-title">لغوی معنی: پکی گرہ</div>
      عقیدہ <strong>"عقد"</strong> سے ہے، جس میں شدت، قوت، ثبات اور وثوق کا مفہوم پایا جاتا ہے؛ اسی سے ہے عقدِ بیع، عقدِ نکاح اور عقدِ بیعت۔ یعنی ایسا پختہ یقین جس میں کوئی ڈھیل یا تزلزل نہ ہو۔
    </div>
    <div class="card-item">
      <div class="card-title">اصطلاحی تعریف</div>
      وہ واضح حقائق جنہیں عقل قبول کرے، اور جب وہ دل میں راسخ ہو کر <strong>انسان کے فکر و عمل کی قوتوں کو اپنی مضبوط گرفت میں لے لیں</strong> تو یہی حقائق عقیدہ بن جاتے ہیں۔
    </div>
    <div class="card-item">
      <div class="card-title">عقیدے کی خصوصیات</div>
      قبولِ مطلق، یقینِ راسخ، شک سے بالاتری، موافق کو اختیار کرنا اور مخالف کو ترک کرنا، اور اس کے لیے جان و مال قربان کرنے کی آمادگی۔
    </div>
  </div>

  <div class="card-item" style="margin-bottom: 8px;">
    <strong>ارکانِ ستہ (چھ اساسی ستون):</strong> ایمان باللہ + بالملائکہ + بالکتب + بالرسل + بالآخرۃ + بالقدر۔ یہی ارکانِ ستہ اسلام کے فرائض، احکام، اخلاق اور اوامر و نواہی کی اساس ہیں۔ باقی احکام کا مطالبہ ان کی قبولیت کے بعد ہے۔
    <br>• <strong>اللہ:</strong> ذات، صفات، اختیارات اور حقوق میں یکتا۔
    <br>• <strong>فرشتے:</strong> پیغام لانے والے اور کائناتی تدبیری حکم نافذ کرنے والے۔
    <br>• <strong>کتابیں:</strong> ہدایت کا محفوظ متن۔
    <br>• <strong>رسول:</strong> ہدایت کا زندہ عملی نمونہ۔
    <br>• <strong>آخرت:</strong> جواب دہی اور عدلِ مطلق و جزا و سزا۔
    <br>• <strong>تقدیر:</strong> سب کچھ اللہ کے علم، کتابت اور مشیئت کے تحت۔
    <br>• <strong>بعث بعد الموت:</strong> موت کے بعد دوبارہ اٹھایا جانا۔
  </div>

  <div class="hadith-quote">
    <strong>حدیثِ جبریل علیہ السلام (صحیح مسلم):</strong><br>
    «... قَالَ: فَأَخْبِرْنِي عَنِ الْإِيمَانِ، قَالَ: أَنْ تُؤْمِنَ بِاللّٰهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ، وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ... قَالَ: فَإِنَّهُ جِبْرِيلُ أَتَاكُمْ يُعَلِّمُكُمْ دِينَكُمْ»<br>
    <em>ترجمہ:</em> حضرت جبریلؑ نے سفید لباس میں آ کر سوال کیا: مجھے ایمان کے بارے میں بتائیے۔ آپ ﷺ نے فرمایا: یہ کہ تم اللہ پر، اس کے فرشتوں، اس کی کتابوں، اس کے رسولوں اور آخرت کے دن پر ایمان لاؤ، اور اچھی و بری تقدیر پر ایمان لاؤ۔ پھر فرمایا: یہ جبریلؑ تھے، تمہیں تمہارا دین سکھانے آئے تھے۔
  </div>

  <div class="seerah-incident">
    <strong>طرزِ تعلیمِ صحابہ (سنن ابن ماجہ — حضرت جندب بن عبداللہؓ):</strong><br>
    «تَعَلَّمْنَا الْإِيمَانَ قَبْلَ أَنْ نَتَعَلَّمَ الْقُرْآنَ، ثُمَّ تَعَلَّمْنَا الْقُرْآنَ فَازْدَدْنَا بِهِ إِيمَانًا»<br>
    <em>ترجمہ:</em> ہم نے قرآن سیکھنے سے پہلے دل میں ایمان اور عقیدہ سیکھا، پھر جب قرآن سیکھا تو اس سے ہمارا ایمان اور بڑھ گیا۔
  </div>

  <!-- ==========================================
       SECTION 2: B2 TAWHEED & REFUTATION OF SHIRK
       ========================================== -->
  <div class="section-title-banner">
    <span>۲. الباب الثاني (B2): الإيمان بالله وإثبات التوحيد وإبطال الشرك</span>
    <span style="font-size: 8.5pt; font-weight: normal;">صفحات ۱۲-۱۳</span>
  </div>

  <div style="font-size: 9.2pt; margin-bottom: 6px;">
    توحید دین کی عمارت کا مرکزی دل ہے جیسے جسم میں دل؛ اس کے بغیر کوئی عمل قبول نہیں۔ کلامی اعتبار سے توحید کے ۴ اساسی دائرے ہیں:
  </div>

  <div class="grid-2">
    <div class="card-item">
      <div class="card-title">۱. توحید فی الذات</div>
      اللہ تعالیٰ اپنی ذات میں احد ہے؛ نہ اس کا کوئی باپ ہے، نہ بیٹا، نہ کوئی اس کا ہمسر۔ (﴿قُلْ هُوَ اللَّهُ أَحَدٌ﴾)۔
    </div>
    <div class="card-item">
      <div class="card-title">۲. توحید فی الصفات</div>
      اللہ کی صفات <strong>قدیم، ذاتی اور مطلق</strong> ہیں؛ جبکہ مخلوق کی صفات <strong>حادث، عطائی اور محدود</strong> ہیں۔ یہ تین الفاظ یاد رہیں تو صفات کے شرک سے بچاؤ ہو جاتا ہے۔
    </div>
    <div class="card-item">
      <div class="card-title">۳. توحید فی الاختیارات</div>
      فوق الفطری طریقے سے نفع و نقصان، حاجت روائی، مشکل کشائی، دعا سننا، قسمت بنانا بگاڑنا؛ اور حلال و حرام اور قانون مقرر کرنا، یہ سب صرف اللہ کا اختیار ہے۔
    </div>
    <div class="card-item">
      <div class="card-title">۴. توحید فی الحقوق</div>
      رکوع و سجود، دست بستہ قیام، نذر و نیاز، قربانی، منت، مصیبت میں پکارنا، سب سے بڑھ کر محبت، تقویٰ اور غیر مشروط اطاعت صرف اللہ کا حق ہے۔
    </div>
  </div>

  <div class="warning-box">
    <strong>⚠️ معاشرے میں شرک کی عام صورتیں (غیر اسلامی عقائد کا ابطال):</strong><br>
    غیر اللہ سے دعا مانگنا (شرک فی الدعوۃ)؛ اللہ کی نافرمانی میں علماء و مشائخ کی اطاعت (شرک فی الطاعۃ — التوبہ: ۳۱)؛ غیر اللہ سے اللہ جیسی محبت؛ علمِ نجوم، فال، کہانت اور غیب دانی کا دعویٰ؛ بدشگونی یا کسی انسان کو منحوس قرار دینا؛ درخت، پتھر یا قبر سے حاجت روائی سمجھنا؛ جادو؛ اور شرکِ خفی جیسے ریاکاری اور غیر اللہ کی قسم کھانا۔
  </div>

  <div class="quran-box">
    <div class="quran-ar">﴿اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ لَهُ الْأَسْمَاءُ الْحُسْنَىٰ﴾ (طٰہٰ: ۸)</div>
    <div>وہ معبودِ برحق ہے کہ اس کے سوا کوئی معبود نہیں، اس کے سب نام اچھے ہیں۔</div>
    <div class="quran-ar" style="margin-top: 4px;">﴿اتَّخَذُوا أَحْبَارَهُمْ وَرُهْبَانَهُمْ أَرْبَابًا مِّن دُونِ اللَّهِ﴾ (التوبہ: ۳۱)</div>
    <div>انہوں نے اپنے علماء اور درویشوں کو اللہ کے سوا خدا بنا لیا (یعنی اللہ کے حلال کو حرام اور حرام کو حلال کرنے میں ان کی اندھی پیروی کی)۔</div>
  </div>

  <div class="hadith-quote">
    <strong>فرمانِ نبوی ﷺ (صحیح بخاری و مسلم — حضرت معاذ بن جبلؓ):</strong><br>
    «حَقُّ اللّٰهِ عَلَى الْعِبَادِ أَنْ يَعْبُدُوهُ وَلَا يُشْرِكُوا بِهِ شَيْئًا» — بندوں پر اللہ کا حق یہ ہے کہ وہ اسی کی عبادت کریں اور اس کے ساتھ کسی چیز کو شریک نہ ٹھہرائیں۔
    <br><strong>ارشادِ نبوی ﷺ (جامع ترمذی — حضرت عبداللہ بن عباسؓ):</strong><br>
    «إِذَا سَأَلْتَ فَاسْأَلِ اللّٰهَ، وَإِذَا اسْتَعَنْتَ فَاسْتَعِنْ بِاللّٰهِ» — جب مانگو تو صرف اللہ سے مانگو، اور جب مدد چاہو تو صرف اللہ سے مدد چاہو۔
  </div>

  <div class="seerah-incident">
    <strong>سیرت کا نمونہ: حضرت بلال حبشیؓ:</strong><br>
    امیہ بن خلف دوپہر کی تپتی ریت پر لٹا کر سینے پر وزنی پتھر رکھ دیتا تاکہ وہ شرک کا ایک بول بول دیں، مگر ان کی زبان پر یہی صدا جاری رہتی: <strong>«أَحَدٌ أَحَدٌ»</strong> (اللہ ایک ہے، اللہ ایک ہے)۔
  </div>

  <table class="impact-table">
    <tr class="table-header">
      <td style="width: 50%;">توحید کا اثر بر نفسِ انسانی (انفرادی)</td>
      <td style="width: 50%;">توحید کا اثر بر نظامِ معاشرت (اجتماعی)</td>
    </tr>
    <tr>
      <td>
        • <strong>خوف و حزن کا خاتمہ:</strong> نفع و نقصان صرف اللہ کے ہاتھ میں ہے، افسر کے ڈر سے جھوٹ پر دستخط نہیں کرتا۔<br>
        • <strong>خودداری و آزادی:</strong> کام کے لیے چاپلوسی اور سفارش کے پیچھے نہیں بھاگتا ("یہ ایک سجدہ جسے تو گراں سمجھتا ہے / ہزار سجدے سے دیتا ہے آدمی کو نجات")۔<br>
        • <strong>توکل و قناعت:</strong> پڑوسی کی نئی گاڑی دیکھ کر کڑھنے کے بجائے شکر؛ طمع، حرص اور حسد سے حفاظت۔
      </td>
      <td>
        • <strong>مساوات و مواخات:</strong> مسجد کی صف میں امیر، وزیر اور مزدور ایک ساتھ کھڑے ہوتے ہیں۔ رنگ اور زبان تفریق کا سبب نہیں بنتے۔<br>
        • <strong>حاکمیتِ الٰہی:</strong> قانون کسی مخصوص طبقے یا سرمایہ دار کی ہوس کا غلام نہیں رہتا، سب قانون کے سامنے جواب دہ ہیں۔
      </td>
    </tr>
  </table>

  <!-- ==========================================
       SECTION 3: B3 INSTITUTION OF RISALAT
       ========================================== -->
  <div class="section-title-banner">
    <span>۳. الباب الثالث (B3): ادارۂ رسالت اور ختمِ نبوت</span>
    <span style="font-size: 8.5pt; font-weight: normal;">صفحات ۱۳-۱۵</span>
  </div>

  <div style="font-size: 9.2pt; margin-bottom: 6px;">
    رسالت ایک مکمل ادارہ ہے جس کے ۳ مربوط اجزاء ہیں: <strong>فرشتہ</strong> (وحی لانے والا) ← <strong>کتاب</strong> (ہدایت کا متن) ← <strong>رسول</strong> (زندہ عملی نمونہ)۔
  </div>

  <div class="grid-3">
    <div class="card-item">
      <div class="card-title">۱. فرشتوں پر ایمان</div>
      فرشتے سراپا اطاعت مخلوق ہیں جن کا اپنا کوئی اختیار نہیں۔ یہ نہ اللہ کی اولاد ہیں نہ معبود نہ سفارشی۔ حضرت جبریلؑ وحی لاتے ہیں اور کاتبین اعمال لکھتے ہیں۔
    </div>
    <div class="card-item">
      <div class="card-title">۲. کتابوں پر ایمان</div>
      صحفِ ابراہیم و موسیٰ، تورات، زبور، انجیل اور قرآن سب برحق ہیں۔ قرآن <strong>"مُهَيْمِن"</strong> ہے یعنی سابقہ کتب کی سچائیوں کا محافظ و ناسخ اور خود ہمیشہ کے لیے محفوظ۔
    </div>
    <div class="card-item">
      <div class="card-title">۳. رسولوں پر ایمان</div>
      رسول سب سے پہلے خود عمل کرتے ہیں۔ ان کی صفات: بشریت، عبودیت، عصمت، امانت اور صدق۔ رسولوں کے درمیان تفریق کفر ہے۔
    </div>
  </div>

  <div class="card-item" style="margin-bottom: 8px;">
    <strong>رسول اللہ ﷺ کی متعدد حیثیتیں اور ختمِ نبوت:</strong> آپ ﷺ محض "مرکزِ عقیدت" نہیں بلکہ <strong>"مرکزِ اطاعت"</strong> ہیں: کتاب کی وضاحت کرنے والے، معلم و مربی، اسوۂ حسنہ، شریعت بتانے والے، قاضی و حاکم۔
    <br>
    <strong>حکمتِ ختمِ نبوت:</strong> دین مکمل ہو گیا، قرآن و سنت محفوظ ہیں، اور انسانیت فکری اعتبار سے بالغ ہو چکی ہے۔ آپ ﷺ کے بعد کسی نئے نبی کی ضرورت باقی نہیں رہی۔
  </div>

  <div class="quran-box">
    <div class="quran-ar">﴿مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ﴾ (الاحزاب: ۴۰)</div>
    <div>محمد ﷺ تمہارے مردوں میں سے کسی کے والد نہیں ہیں بلکہ اللہ کے پیغمبر اور نبیوں کے ختم کرنے والے ہیں۔</div>
    <div class="quran-ar" style="margin-top: 4px;">﴿قُل لَّا أَمْلِكُ لِنَفْسِي نَفْعًا وَلَا ضَرًّا إِلَّا مَا شَاءَ اللَّهُ ۚ وَلَوْ كُنتُ أَعْلَمُ الْغَيْبَ لَاسْتَكْثَرْتُ مِنَ الْخَيْرِ﴾ (الاعراف: ۱۸۸)</div>
    <div>کہہ دو کہ میں اپنی ذات کے نفع و نقصان کا بھی مالک نہیں مگر جو اللہ چاہے، اور اگر میں غیب جانتا ہوتا تو بہت سے فائدے جمع کر لیتا۔</div>
  </div>

  <div class="hadith-quote">
    <strong>فرموداتِ نبوی ﷺ:</strong><br>
    • «لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى أَكُونَ أَحَبَّ إِلَيْهِ مِنْ وَالِدِهِ وَوَلَدِهِ وَالنَّاسِ أَجْمَعِينَ» (متفق علیہ) — کوئی شخص اس وقت تک مومن نہیں ہو سکتا جب تک میں اسے اس کے والدین، اولاد اور تمام انسانوں سے بڑھ کر محبوب نہ ہو جاؤں۔<br>
    • «فَأَنَا اللَّبِنَةُ وَأَنَا خَاتَمُ النَّبِيِّينَ» (صحیح بخاری) — نبوت کی خوبصورت عمارت میں آخری اینٹ میں ہوں اور میں خاتم النبیین ہوں۔<br>
    • «وَقَدْ تَرَكْتُ فِيكُمْ مَا لَنْ تَضِلُّوا بَعْدَهُ إِنِ اعْتَصَمْتُم بِهِ: كِتَابَ اللّٰهِ» (صحیح مسلم) — میں تم میں ایسی چیز چھوڑے جا رہا ہوں کہ اگر تم نے اسے مضبوطی سے پکڑے رکھا تو کبھی گمراہ نہ ہوگے: اللہ کی کتاب۔
  </div>

  <div class="seerah-incident">
    <strong>صلحِ حدیبیہ میں سفیرِ قریش عروہ بن مسعود کا اعتراف:</strong><br>
    «خدا کی قسم! میں بادشاہوں کے دربار میں گیا ہوں — قیصر، کسریٰ اور نجاشی کے پاس — مگر خدا کی قسم! میں نے کوئی ایسا بادشاہ نہیں دیکھا جس کے ساتھی اس کی ایسی تعظیم کرتے ہوں جیسی محمد ﷺ کے ساتھی محمد ﷺ کی کرتے ہیں» (صحیح بخاری)۔
  </div>

  <table class="impact-table">
    <tr class="table-header">
      <td style="width: 50%;">رسالت کا اثر بر نفسِ انسانی (انفرادی)</td>
      <td style="width: 50%;">رسالت کا اثر بر نظامِ معاشرت (اجتماعی)</td>
    </tr>
    <tr>
      <td>
        • <strong>اطاعت کا جذبہ:</strong> "میرا دل نہیں مانتا" کے بجائے "سنت کیا کہتی ہے؟" کو معیار بنانا۔<br>
        • <strong>عملی نمونہ:</strong> زندگی کے ہر دائرے (باپ، تاجر، حاکم، پڑوسی) کے لیے رسول اللہ ﷺ کی صورت میں کامل ماڈل موجود ہے۔<br>
        • <strong>تقویٰ:</strong> فرشتے ہر بات لکھ رہے ہیں، لہٰذا تنہائی میں بھی موبائل پر غلط چیز نہ دیکھنا۔
      </td>
      <td>
        • <strong>وحدتِ فکر:</strong> ایک ہی معیار (قرآن و سنت) پر جمع ہونے سے گروہی اور فرقہ وارانہ ٹکراؤ ختم ہوتا ہے۔<br>
        • <strong>امت کی دعوتی ذمہ داری:</strong> ختمِ نبوت کی بنا پر اب دعوت و ابلاغ کی اجتماعی ذمہ داری امتِ محمدیہ ﷺ کے کندھوں پر ہے۔
      </td>
    </tr>
  </table>

  <!-- ==========================================
       SECTION 4: B4 AKHIRAH & ACCOUNTABILITY
       ========================================== -->
  <div class="section-title-banner">
    <span>۴. الباب الرابع (B4): عالمِ آخرت اور احتسابِ اعمال</span>
    <span style="font-size: 8.5pt; font-weight: normal;">صفحات ۱۵-۱۶</span>
  </div>

  <div style="font-size: 9.2pt; margin-bottom: 6px;">
    آخرت یعنی بعد میں آنے والی زندگی۔ موت زندگی کا خاتمہ نہیں بلکہ دوسری زندگی میں منتقلی ہے؛ جسم فنا ہوتا ہے مگر روح اور انسانی شخصیت باقی رہتی ہے۔ <em>«الدُّنْيَا مَزْرَعَةُ الْآخِرَةِ»</em> — یہاں بونا ہے اور وہاں کاٹنا ہے۔
  </div>

  <div class="card-item" style="margin-bottom: 8px;">
    <strong>سفرِ آخرت کے ۹ مراحل:</strong> موت و سکرات ← قبر و برزخ (پہلی منزل) ← نفخاتِ صور (فزع، صعق، قیام) ← بعث (قبروں سے جی اٹھنا) ← حشر (میدانِ حساب) ← شفاعتِ عظمیٰ ← حساب کتاب، گواہیاں، میزان و اعمال نامہ ← پل صراط ← ابدی جنت یا جہنم۔
  </div>

  <div class="grid-2">
    <div class="card-item">
      <div class="card-title">عقلی دلائل بر وقوعِ آخرت</div>
      • پہلی بار بنانا ممکن ہوا تو دوبارہ اٹھانا کیوں محال ہو گا؟<br>
      • دنیا میں ظالم دندناتے پھرتے ہیں اور مظلوم انصاف کے بغیر مر جاتے ہیں؛ پس عدلِ مطلق کا تقاضا ایک اور عدالت ہے۔<br>
      • ہر انسان کا ضمیر (نفسِ لوامہ) اس کے اخلاقی وجود اور جزا و سزا کی گواہی دیتا ہے۔
    </div>
    <div class="card-item">
      <div class="card-title">حساب و کتاب کا شفاف معیار</div>
      نجات کا دار و مدار صرف ایمان اور اعمالِ صالحہ پر ہے۔ نسل، قرابت، دولت اور دھونس وہاں کام نہ آئے گی۔ گواہوں میں فرشتے، زمین کے خطے، انسان کے اعضاء اور اللہ کا ازلی علم شامل ہوں گے۔ کامیابی کا معیار دنیا کی عارضی دولت نہیں بلکہ اللہ کا فیصلہ ہے۔
    </div>
  </div>

  <div class="quran-box">
    <div class="quran-ar">﴿فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ ۝ وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ﴾ (الزلزال: ۷-۸)</div>
    <div>پس جس نے ذرہ برابر نیکی کی ہوگی وہ اسے دیکھ لے گا، اور جس نے ذرہ برابر برائی کی ہوگی وہ اسے دیکھ لے گا۔</div>
    <div class="quran-ar" style="margin-top: 4px;">﴿يُثَبِّتُ اللَّهُ الَّذِينَ آمَنُوا بِالْقَوْلِ الثَّابِتِ فِي الْحَيَاةِ الدُّنْيَا وَفِي الْآخِرَةِ﴾ (ابراہیم: ۲۷)</div>
    <div>اللہ مومنوں کو پکی بات کے ذریعے دنیا کی زندگی میں بھی ثابت قدم رکھتا ہے اور آخرت (قبر و برزخ) میں بھی۔</div>
  </div>

  <div class="hadith-quote">
    <strong>فرمانِ نبوی ﷺ (صحیح بخاری — حضرت عبداللہ بن عمرؓ):</strong><br>
    «كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ» — دنیا میں ایسے رہو گویا تم پردیسی مسافر ہو یا راستہ چلتے رہگیر۔
  </div>

  <div class="seerah-incident">
    <strong>سیرت کا عملی نمونہ: حضرت مصعب بن عمیرؓ:</strong><br>
    مکہ کے سب سے ناز و نعم والے خوش پوش نوجوان حضرت مصعبؓ نے اسلام کی خاطر سب کچھ چھوڑا۔ جب غزوہ احد میں شہید ہوئے تو کفن کے لیے صرف ایک چھوٹی چادر تھی—سر ڈھانپتے تو پاؤں کھل جاتے، پاؤں ڈھانپتے تو سر کھل جاتا! رسول اللہ ﷺ نے فرمایا: سر ڈھانپ دو اور پاؤں پر اذخر گھاس ڈال دو۔ یہ آخرت کے یقین کی عملی طاقت تھی!
  </div>

  <table class="impact-table">
    <tr class="table-header">
      <td style="width: 50%;">آخرت کا اثر بر نفسِ انسانی (انفرادی)</td>
      <td style="width: 50%;">آخرت کا اثر بر نظامِ معاشرت (اجتماعی)</td>
    </tr>
    <tr>
      <td>
        • <strong>احساسِ جواب دہی:</strong> دکاندار ترازو میں کمی نہیں کرتا، چاہے گاہک کو خبر نہ ہو۔<br>
        • <strong>سکونِ قلب و صبر:</strong> رشوت نہ دینے پر فائل رکی رہے، پھر بھی دل مطمئن ہے کہ نیکی کا اجر اللہ کے پاس محفوظ ہے۔<br>
        • <strong>بے غرض انفاق:</strong> خفیہ صدقہ جس کی تصویر سوشل میڈیا پر نہ ڈالی جائے۔
      </td>
      <td>
        • <strong>کمزور کے حقوق کا تحفظ:</strong> طاقتور ظلم سے رکتا ہے کیونکہ وہ جانتا ہے کہ مظلوم کی بددعا اور آخرت کی گرفت اٹل ہے۔<br>
        • <strong>پائیدار اخلاقی اقدار:</strong> اخلاقی اقدار سیاسی مفادات کے ساتھ نہیں بدلتیں؛ بے لگام اور غیر ذمہ دار معاشرہ جنم نہیں لیتا۔
      </td>
    </tr>
  </table>

  <!-- ==========================================
       SECTION 5: B5 TAQDEER & FREE WILL
       ========================================== -->
  <div class="section-title-banner">
    <span>۵. الباب الخامس (B5): الإيمان بالقدر خيره وشره</span>
    <span style="font-size: 8.5pt; font-weight: normal;">صفحات ۱۶-۱۷</span>
  </div>

  <div style="font-size: 9.2pt; margin-bottom: 6px;">
    قدر کے معنی ہیں کسی چیز کی مقدار اور اس کے مقررہ حالات۔ اصطلاح میں تقدیر وہ قوانین ہیں جو اللہ نے کائنات کے لیے مقرر فرمائے۔ تقدیر کے ۴ مراتب ہیں:
  </div>

  <div class="grid-2">
    <div class="card-item">
      <div class="card-title">مراتبِ اربعہ (تقدیر کے ۴ درجات)</div>
      ۱. <strong>علم:</strong> اللہ کا ازلی و ابدی علم جو ہر شے کو گھیرے ہوئے ہے۔<br>
      ۲. <strong>کتابت:</strong> تخلیق سے ۵۰ ہزار سال قبل لوحِ محفوظ پر اندراج۔<br>
      ۳. <strong>مشیئت:</strong> جو اللہ چاہے وہی واقع ہونا، جو نہ چاہے نہیں ہو سکتا۔<br>
      ۴. <strong>خلق:</strong> تمام کائنات اور بندوں کے افعال کا حقیقی خالق اللہ ہے۔
    </div>
    <div class="card-item">
      <div class="card-title">تقدیر اور انسانی اختیار کا برحق توازن</div>
      اہلِ سنت کا مؤقف نہ جبرِ محض ہے (ورنہ انسان مشین ہوتا اور جزا و سزا بے معنی ہوتی) اور نہ تفویضِ مطلق ہے۔ انسان کو <strong>محدود ارادہ اور اختیار</strong> دیا گیا ہے جس کی بنیاد پر وہ مکلف ہے۔ ارادہ و قدم انسان کا، اور تکمیل اللہ کی مشیئت سے ہے۔ سستی کا ملبہ تقدیر پر ڈالنا باطل ہے۔
    </div>
  </div>

  <div class="quran-box">
    <div class="quran-ar">﴿مَا أَصَابَ مِن مُّصِيبَةٍ فِي الْأَرْضِ وَلَا فِي أَنفُسِكُمْ إِلَّا فِي كِتَابٍ مِّن قَبْلِ أَن نَّبْرَأَهَا ۚ إِنَّ ذَٰلِكَ عَلَى اللَّهِ يَسِيرٌ ۝ لِّكَيْلَا تَأْسَوْا عَلَىٰ مَا فَاتَكُمْ وَلَا تَفْرَحُوا بِمَا آتَاكُمْ﴾ (الحدید: ۲۲-۲۳)</div>
    <div>زمین میں یا خود تم پر کوئی مصیبت نہیں آتی مگر پیشتر اس کے کہ ہم اسے پیدا کریں وہ ایک کتاب میں لکھی ہوئی ہے؛ تاکہ جو تم سے فوت ہو جائے اس کا غم نہ کرو اور جو اللہ نے دیا ہو اس پر اتراؤ نہیں۔</div>
    <div class="quran-ar" style="margin-top: 4px;">﴿وَهَدَيْنَاهُ النَّجْدَيْنِ﴾ (البلد: ۱۰) • ﴿فَأَلْهَمَهَا فُجُورَهَا وَتَقْوَاهَا﴾ (الشمس: ۸)</div>
    <div>اور ہم نے انسان کو (خیر و شر کے) دونوں راستے دکھا دیے؛ اور اس کے دل میں نیکی اور برائی کی تمیز ڈال دی۔</div>
  </div>

  <div class="hadith-quote">
    <strong>احادیثِ مبارکہ (صحیح مسلم):</strong><br>
    • حضرت عبداللہ بن عمرو بن العاصؓ فرماتے ہیں: میں نے رسول اللہ ﷺ کو فرماتے سنا: «كَتَبَ اللّٰهُ مَقَادِيرَ الْخَلَائِقِ قَبْلَ أَنْ يَخْلُقَ السَّمَاوَاتِ وَالْأَرْضَ بِخَمْسِينَ أَلْفَ سَنَةٍ، وَعَرْشُهُ عَلَى الْمَاءِ» (اللہ نے زمین و آسمان بنانے سے پچاس ہزار سال قبل مخلوقات کی تقدیریں لکھ دیں اور اس کا عرش پانی پر تھا)۔<br>
    • «احْرِصْ عَلَى مَا يَنْفَعُكَ، وَاسْتَعِنْ بِاللّٰهِ وَلَا تَعْجَزْ، وَإِنْ أَصَابَكَ شَيْءٌ فَلَا تَقُلْ: لَوْ أَنِّي فَعَلْتُ كَانَ كَذَا وَكَذَا، وَلَٰكِنْ قُلْ: قَدَرُ اللّٰهِ وَمَا شَاءَ فَعَلَ» (جو چیز تمہیں نفع دے اس کی حرص کرو، اللہ سے مدد مانگو اور ہمت نہ ہارو؛ اور اگر کوئی تکلیف پہنچے تو یہ نہ کہو کہ "کاش میں یوں کرتا تو یوں ہوتا"، بلکہ کہو: یہ اللہ کی تقدیر ہے، اس نے جو چاہا کیا)۔
  </div>

  <div class="seerah-incident">
    <strong>طاعونِ عمواس پر سیدنا عمر فاروقؓ کا تاریخی فیصلہ:</strong><br>
    جب شام میں طاعون پھیلا تو حضرت عمرؓ نے لشکر واپس لے جانے کا فیصلہ فرمایا۔ حضرت ابو عبیدہؓ نے دریافت کیا: «أَفِرَارًا مِنْ قَدَرِ اللّٰهِ؟» (کیا اللہ کی تقدیر سے بھاگ رہے ہیں؟) حضرت عمرؓ نے فرمایا: <strong>«نَعَمْ، نَفِرُّ مِنْ قَدَرِ اللّٰهِ إِلَى قَدَرِ اللّٰهِ»</strong> (ہاں! ہم اللہ کی ایک تقدیر سے اللہ ہی کی دوسری تقدیر کی طرف جا رہے ہیں—بخاری و مسلم)۔ یعنی تقدیر پر ایمان تدبیر، احتیاط اور عقل استعمال کرنے کے منافی نہیں۔
  </div>

  <table class="impact-table">
    <tr class="table-header">
      <td style="width: 50%;">تقدیر کا اثر بر نفسِ انسانی (انفرادی)</td>
      <td style="width: 50%;">تقدیر کا اثر بر نظامِ معاشرت (اجتماعی)</td>
    </tr>
    <tr>
      <td>
        • <strong>صبر و شکر:</strong> امتحان یا کاروبار میں ناکامی پر ڈپریشن کے بجائے ازسرنو محنت؛ کامیابی پر تکبر کے بجائے عاجزی۔<br>
        • <strong>بے خوفی:</strong> سچی بات کہنے پر نوکری جانے کا خوف غالب نہیں آتا، کیونکہ نفع و نقصان کا مالک کوئی انسان نہیں۔<br>
        • <strong>حسد کا خاتمہ:</strong> دوسرے کا رزق اس کا مقدر ہے، لہٰذا جلن اور لالچ سے دل پاک ہو جاتا ہے۔
      </td>
      <td>
        • <strong>معاشی کشمکش میں کمی:</strong> جب رزق کی تقسیم پر یقین ہو تو نہ چھیننے کی ہوس رہتی ہے نہ ذخیرہ اندوزی کا جواز۔<br>
        • <strong>احساسِ ذمہ داری:</strong> چونکہ اختیار دیا گیا ہے، اس لیے "قسمت میں یہی تھا" کہہ کر نااہلی چھپانے کا کلچر ختم ہوتا ہے۔
      </td>
    </tr>
  </table>

  <!-- ==========================================
       SECTION 6: THE GRAND SYNTHESIS
       ========================================== -->
  <div class="section-title-banner">
    <span>۶. خلاصۂ کلام (The Grand Synthesis): چاروں ستونوں کا باہمی ربط</span>
    <span style="font-size: 8.5pt; font-weight: normal;">جامع فکری نچوڑ</span>
  </div>

  <div class="grid-2">
    <div class="card-item" style="border-right: 4px solid #b48c28;">
      <strong>۱. توحید: کس کی بندگی؟</strong><br>
      فقط اللہ وحدہ لا شریک لہ کی بندگی۔ ساری غلامیوں سے نجات اور ایک در کے ہو جانا۔
    </div>
    <div class="card-item" style="border-right: 4px solid #0284c7;">
      <strong>۲. رسالت: کیسے بندگی؟</strong><br>
      محمد رسول اللہ ﷺ کے بتائے ہوئے سنت طریق پر زندگی گزارنا۔ عقل کے وسوسوں سے آزادی۔
    </div>
    <div class="card-item" style="border-right: 4px solid #dc2626;">
      <strong>۳. آخرت: بندگی کا انجام؟</strong><br>
      حساب و کتاب، میزان، عدلِ مطلق اور ابدی جنت۔ محنت کبھی رائیگاں نہیں جاتی۔
    </div>
    <div class="card-item" style="border-right: 4px solid #16a34a;">
      <strong>۴. تقدیر: بندگی کا حوصلہ؟</strong><br>
      نفع و نقصان اور موت و حیات کا اختیار رب کے پاس ہے۔ ہر صدمے میں استقامت اور سکون۔
    </div>
  </div>

  <!-- ==========================================
       SECTION 7: YOUTH REAL-WORLD FAQ (7 QUESTIONS)
       ========================================== -->
  <div class="section-title-banner">
    <span>۷. نوجوان ذہن کے ۷ بنیادی سوالات اور روزمرہ استعارے</span>
    <span style="font-size: 8.5pt; font-weight: normal;">بغیر فلسفیانہ الجھنوں کے، روزمرہ زندگی کی مثالیں</span>
  </div>

  <!-- FAQ 1 -->
  <div class="metaphor-box">
    <span class="metaphor-tag">استعارہ ۱ • روحانی ضرورت کا احساس</span>
    <div class="metaphor-title">۱. بھوک اور روٹی: جب تک بھوک کا احساس نہ ہو دسترخوان کی قدر کیوں نہیں ہوتی؟</div>
    <div>
      اگر کسی شخص کا پیٹ بھرا ہو تو بہترین بریانی بھی اس کے سامنے بے وقعت لگتی ہے، مگر تین دن کا بھوکا خشک روٹی کو بھی غنیمت جانتا ہے۔ انسان ڈگریاں، پیسہ اور کیریئر بنا کر بھی اندر سے خالی اور بے چین کیوں ہے؟ کیونکہ روح کی ایک الگ بھوک ہے جو صرف اپنے خالق کی بندگی سے مٹتی ہے۔ جب تک انسان اپنی روحانی بھوک کو نہیں پہچانتا، دین اور وحی کا دسترخوان اسے سمجھ نہیں آتا۔
      <br><strong>حاصلِ کلام:</strong> جیسے جسم روٹی کا محتاج ہے، روح خدا کے تعلق کی محتاج ہے۔
    </div>
  </div>

  <!-- FAQ 2 -->
  <div class="metaphor-box">
    <span class="metaphor-tag">استعارہ ۲ • توحید اور منبعِ حیات</span>
    <div class="metaphor-title">۲. پیاس اور نلکا: اگر پانی پینا مقصد ہے تو نلکے کے کنکشن کی جانچ کیوں ضروری ہے؟</div>
    <div>
      دیوار میں سنہری نلکا لگا ہو مگر مین سپلائی کا پائپ کٹا ہو تو ٹونٹی گھمانے سے ایک بوند پانی نہیں آئے گا۔ شرک کی مثال کٹے ہوئے پائپ سے امید باندھنے کی ہے۔ تمام مخلوقات خود محتاج ہیں۔ نفع و نقصان کا منبع صرف اللہ ہے۔ جب تک دل کا تعلق براہِ راست رب سے نہ ہو، انسان توہمات اور خوف کے اندھیروں میں بھٹکتا رہے گا۔
      <br><strong>حاصلِ کلام:</strong> توحید کا مطلب ہے اپنے دل کے پائپ کو کائنات کے اکیلے مالک سے جوڑنا۔
    </div>
  </div>

  <!-- FAQ 3 -->
  <div class="metaphor-box">
    <span class="metaphor-tag">استعارہ ۳ • دار الامتحان بمقابلہ دار الجزاء</span>
    <div class="metaphor-title">۳. امتحان اور رزلٹ ڈے: امتحانی ہال میں ڈگری کا مطالبہ کیوں نہیں کیا جاتا؟</div>
    <div>
      طالب علم پرچہ حل کرتے ہی ممتحن سے ڈگری اور نوکری کا لیٹر نہیں مانگتا؛ وہ جانتا ہے کہ یہ امتحان گاہ ہے اور نتیجہ رزلٹ ڈے پر ملے گا۔ دنیا محض امتحانی مرکز ہے، یہاں مظلوم کو تکلیف پہنچ سکتی ہے اور ظالم ڈھیل پا سکتا ہے کیونکہ ابھی پرچہ چل رہا ہے۔ اگر آخرت کا رزلٹ ڈے نہ ہو تو دنیا کا پورا نظام ایک بے معنی مذاق بن جائے۔
      <br><strong>حاصلِ کلام:</strong> آخرت پر ایمان انسان کو ہر آزمائش میں محنت کرنے اور ناانصافی پر مایوس نہ ہونے کا حوصلہ دیتا ہے۔
    </div>
  </div>

  <!-- FAQ 4 -->
  <div class="metaphor-box">
    <span class="metaphor-tag">استعارہ ۴ • عقل کی حد اور ضرورتِ معالج</span>
    <div class="metaphor-title">۴. ڈاکٹر اور نسخہ: شدید بیمار خود دوائیں چننے کے بجائے معالج کے پاس کیوں جاتا ہے؟</div>
    <div>
      میڈیکل اسٹور پر ہزاروں دوائیں سجی ہوتی ہیں لیکن انسان خود گولیاں چننے کے بجائے ماہر ڈاکٹر کے پاس جاتا ہے اور اس کا لکھا ہوا نسخہ ہی لیتا ہے۔ انسان کی عقل خیر اور شر کے تمام نتائج کا احاطہ نہیں کر سکتی۔ اللہ کائنات کا سب سے بڑا خالق ہے اور انبیاء علیہم السلام وہ مستند طبیب ہیں جو ہماری روحانی بیماریوں کا محفوظ نسخہ لے کر آئے۔
      <br><strong>حاصلِ کلام:</strong> رسول کی ضرورت اس لیے ہے کہ عقل اکیلی اپنی بیماریوں کا علاج نہیں کر سکتی۔
    </div>
  </div>

  <!-- FAQ 5 -->
  <div class="metaphor-box">
    <span class="metaphor-tag">استعارہ ۵ • شریعت کے احکام تحفظ ہیں پابندی نہیں</span>
    <div class="metaphor-title">۵. نانبائی اور روٹی: بچے کو تندور میں ہاتھ ڈالنے سے روکنا پابندی ہے یا محبت؟</div>
    <div>
      تندور پر تازہ روٹی کی خوشبو دیکھ کر بچہ ہاتھ ڈالنا چاہتا ہے مگر ماں سختی سے ہاتھ جھٹک دیتی ہے۔ بچہ روتا ہے کہ آزادی چھن گئی، لیکن ماں جانتی ہے کہ یہ روکنا بچے کی حفاظت کے لیے ہے۔ شریعت میں سود، بے حیائی، شراب اور جھوٹ پر پابندیاں انسان کو اس کی اپنی تباہی اور جہنم سے بچانے کی حفاظتی دیوار ہیں۔
      <br><strong>حاصلِ کلام:</strong> اللہ کے احکام آزادی سلب کرنے کے لیے نہیں بلکہ ہلاکت سے بچانے کے لیے ہیں۔
    </div>
  </div>

  <!-- FAQ 6 -->
  <div class="metaphor-box">
    <span class="metaphor-tag">استعارہ ۶ • عقیدہ انجن ہے، محض نام کافی نہیں</span>
    <div class="metaphor-title">۶. گاڑی کی چابی اور بمپر اسٹیکر: کیا کار پر صرف 'مسلم' لکھوانے سے گاڑی چلے گی بغیر چابی کے؟</div>
    <div>
      کار پر دنیا کا خوبصورت ترین اسٹیکر لگا ہو مگر نہ چابی ہو اور نہ انجن میں ایندھن، تو وہ کار نہیں چل سکتی۔ نام کا مسلمان ہونا محض بمپر اسٹیکر ہے۔ دل کے اندر جب تک اللہ اور رسول ﷺ پر پختہ عقیدہ نہ ہو، زندگی کی گاڑی جہنم کی طرف لڑھکتی رہے گی اور کوئی عمل بارگاہِ الٰہی میں وزن نہیں پائے گا۔
      <br><strong>حاصلِ کلام:</strong> عقیدہ دل کی چابی اور انجن ہے؛ اس کے بغیر ظاہری اعمال بے جان ہیں۔
    </div>
  </div>

  <!-- FAQ 7 -->
  <div class="metaphor-box">
    <span class="metaphor-tag">استعارہ ۷ • قرآن اور سنتِ نبوی کا ناگزیر جوڑ</span>
    <div class="metaphor-title">۷. کار مینوئل اور استاد: کیا جدید گاڑی صرف مینوئل پڑھ کر چلائی جا سکتی ہے بغیر استاد کے؟</div>
    <div>
      جدید کار دے کر موٹی کتاب پکڑا دی جائے اور کبھی گاڑی نہ چلائی ہو، تو کتاب پڑھ کر سڑک پر نکلنے سے حادثہ یقینی ہے۔ ڈرائیونگ انسٹرکٹر کی ضرورت ہوتی ہے جو اسٹیرنگ سنبھالنا سکھائے۔ قرآن پاک زندگی کی عظیم ترین یوزر گائیڈ ہے، اور رسول اللہ ﷺ وہ ہادی اور معلم ہیں جنہوں نے عملاً جی کر دکھایا کہ قرآن پر کیسے عمل کیا جاتا ہے۔
      <br><strong>حاصلِ کلام:</strong> قرآن کو رسول اللہ ﷺ کی سنت سے الگ کر کے سمجھنے کی کوشش فکری حادثے کا سبب بنتی ہے۔
    </div>
  </div>

  <!-- ==========================================
       SECTION 8: SUFFERING & RESILIENCE
       ========================================== -->
  <div class="section-title-banner">
    <span>۸. دکھ، صدمات، غزہ اور اینگزائٹی کا مقابلہ: عقیدہ کیسے ڈھال بنتا ہے؟</span>
    <span style="font-size: 8.5pt; font-weight: normal;">نفسیاتی و روحانی استحکام</span>
  </div>

  <div class="matn-box" style="border-right-color: #8b5cf6; background: #f5f3ff;">
    <div class="matn-ar" style="color: #6d28d9;">
      «عَجَبًا لِأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ، وَلَيْسَ ذَاكَ لِأَحَدٍ إِلَّا لِلْمُؤْمِنِ، إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ، وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ»
    </div>
    <div class="matn-ur" style="color: #4c1d95; text-align: center;">
      (صحیح مسلم: ۲۹۹۹) — "مومن کا معاملہ بھی خوب ہے، اس کے ہر معاملے میں خیر ہے؛ اگر خوشی ملے تو شکر کرتا ہے جو خیر ہے، اور اگر تکلیف پہنچے تو صبر کرتا ہے جو اس کے لیے خیر ہے۔"
    </div>
  </div>

  <div class="grid-3">
    <div class="card-item">
      <div class="card-title">۱. "کاش" کے روگ کا خاتمہ</div>
      اکثر نفسیاتی الجھنیں ماضی کے پچھتاوے ("کاش میں ایسا کر لیتا") سے جنم لیتی ہیں۔ رسول اللہ ﷺ نے فرمایا کہ یہ لفظ شیطان کے وسوسوں کا دروازہ کھولتا ہے۔ تقدیر پر ایمان دل کو سکون بخشتا ہے کہ «قَدَرُ اللَّهِ وَمَا شَاءَ فَعَلَ»۔
    </div>
    <div class="card-item">
      <div class="card-title">۲. غزہ کے مظلومین کا عزم</div>
      دنیا دیکھ کر حیران رہ گئی کہ ملبے تلے دبے فلسطینی بچے اور مائیں «الحمد للّٰہ» اور «حسبنا اللّٰہ ونعم الوکیل» پکار رہے ہیں۔ یہ چٹان جیسی ہمت صرف آخرت اور تقدیر کے پختہ عقیدے سے پیدا ہوتی ہے!
    </div>
    <div class="card-item">
      <div class="card-title">۳. درد کبھی رائیگاں نہیں جاتا</div>
      مسلمان کا ایک کانٹا چبھنا بھی گناہوں کا کفارہ اور درجات کی بلندی ہے۔ آخرت کا یقین یہ طمانیت بخشتا ہے کہ دنیا کے ہر آنسو اور صبر کا حساب رب کے پاس محفوظ ہے اور جنت میں اس کا ابدی بدلہ ملے گا۔
    </div>
  </div>

  <!-- ==========================================
       SECTION 9: THE 8 SLIDES MATRIX
       ========================================== -->
  <div class="section-title-banner">
    <span>۹. درسی سلائیڈز کا تصویری و تصوری خلاصہ (۸ سلائیڈز میٹرکس)</span>
    <span style="font-size: 8.5pt; font-weight: normal;">درسی پریزنٹیشن کا فوری جائزہ</span>
  </div>

  <div class="grid-2">
    <div class="slide-summary-box">
      <strong><span class="slide-num-pill">سلائیڈ ۱</span> حقیقتِ عقیدہ و ایمان:</strong>
      <br>• <em>تصور:</em> دل کی پکی گرہ، حدیثِ جبریلؑ، اور صحابہ کا پہلے ایمان سیکھنے کا منہج۔
      <br>• <em>استعارہ:</em> طوفانی سمندر میں جہاز کا لنگر اور زمین پر برگد کی گہری جڑ۔
    </div>
    <div class="slide-summary-box">
      <strong><span class="slide-num-pill">سلائیڈ ۲</span> قادرِ مطلق خالق کا اثبات:</strong>
      <br>• <em>تصور:</em> امکان کا برہان، خود کار کوڈ کی نفی، اور توحید کے ۴ کلامی تقاضے۔
      <br>• <em>استعارہ:</em> سورج کی اصل روشنی بمقابلہ ہزاروں آئینوں کا مستعار عکس۔
    </div>
    <div class="slide-summary-box">
      <strong><span class="slide-num-pill">سلائیڈ ۳</span> اگر دنیا میں انبیاء نہ ہوتے؟:</strong>
      <br>• <em>تصور:</em> اخلاقی انارکی، طاقتور کا راج، اور وحی کے بغیر عقل کا فکری اندھیرا۔
      <br>• <em>استعارہ:</em> گھپ اندھیرے جنگل میں آسمانی مینارِ نور (Lighthouse)۔
    </div>
    <div class="slide-summary-box">
      <strong><span class="slide-num-pill">سلائیڈ ۴</span> ادارۂ رسالت اور اسوۂ حسنہ:</strong>
      <br>• <em>تصور:</em> صرف کتاب کافی کیوں نہیں؛ رسول اللہ ﷺ کا مرکزِ اطاعت ہونا۔
      <br>• <em>استعارہ:</em> کار کی کتاب (Manual) بمقابلہ ڈرائیونگ انسٹرکٹر کا عملی نمونہ۔
    </div>
    <div class="slide-summary-box">
      <strong><span class="slide-num-pill">سلائیڈ ۵</span> حکمتِ ختمِ نبوت و تحفظ:</strong>
      <br>• <em>تصور:</em> انسانیت کی فکری بلوغت، کامل شریعت، اور عروہ بن مسعود کا اعتراف۔
      <br>• <em>استعارہ:</em> نبوت کے عالیشان محل کی آخری اینٹ اور دین کا تاج محل۔
    </div>
    <div class="slide-summary-box">
      <strong><span class="slide-num-pill">سلائیڈ ۶</span> عالمِ آخرت اور عدلِ الٰہی:</strong>
      <br>• <em>تصور:</em> دنیا دار الامتحان ہے، رزلٹ ڈے قیامت کو ہوگا؛ سیدنا مصعبؓ کی قربانی۔
      <br>• <em>استعارہ:</em> امتحانی مرکز میں پرچہ دینا بمقابلہ تقسیمِ اسناد و انعامات کا دن۔
    </div>
    <div class="slide-summary-box">
      <strong><span class="slide-num-pill">سلائیڈ ۷</span> تقدیر اور دکھوں کا مقابلہ:</strong>
      <br>• <em>تصور:</em> طاعونِ عمواس میں حضرت عمرؓ کا استدلال؛ تدبیر اور توکل کا توازن۔
      <br>• <em>استعارہ:</em> اونٹ کا گھٹنا باندھنا اور نتائج رب کے سپرد کر کے پرسکون ہونا۔
    </div>
    <div class="slide-summary-box">
      <strong><span class="slide-num-pill">سلائیڈ ۸</span> ۱ سالہ تعلیمی سفر و داخلہ:</strong>
      <br>• <em>تصور:</em> شکوک سے یقین تک کا ۴ فکری مراحل پر مشتمل باقاعدہ روڈ میپ۔
      <br>• <em>استعارہ:</em> باوقار مسلم نوجوان کی شخصیت اور فکری تعمیر کا سفر۔
    </div>
  </div>

  <!-- ==========================================
       SECTION 10: 1-YEAR ROADMAP & ADMISSIONS
       ========================================== -->
  <div class="section-title-banner">
    <span>۱۰. ۱ سالہ جامع آن لائن اسلامی کورس کا روڈ میپ اور داخلہ گائیڈ</span>
    <span style="font-size: 8.5pt; font-weight: normal;">تعلیمی مراحل و مضامین</span>
  </div>

  <table class="roadmap-table">
    <thead>
      <tr>
        <th style="width: 25%;">سہ ماہی مرحلہ</th>
        <th style="width: 35%;">بنیادی عنوانات و نصاب</th>
        <th style="width: 40%;">فکری و عملی ثمرات</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>سہ ماہی ۱ (ماہ ۱-۳)</strong><br>علم العقائد و فکری چیلنجز</td>
        <td>• حقیقتِ عقیدہ و ارکانِ ستہ کی تفہیم<br>• الحاد، مادیت پرستی اور ماڈرن شبہات کے عقلی رد<br>• قرآنی دلائلِ توحید و امکان کا برہان<br>• ختمِ نبوت اور عصمتِ انبیاء کا تحفظ</td>
        <td>شکوک و شبہات کا مکمل ازالہ، عقلی و نقلی استدلال کی پختگی، اور لادینی فتنوں کے سامنے چٹان جیسا ثبات۔</td>
      </tr>
      <tr>
        <td><strong>سہ ماہی ۲ (ماہ ۴-۶)</strong><br>علوم القرآن و تفسیرِ منتخب</td>
        <td>• تاریخِ جمع و تدوینِ قرآن و حفظِ الٰہی<br>• سورتیں: الفاتحہ، یٰس، الحجرات، الملک<br>• قرآنی نفسیات: انسانی انا، تکبر و تزکیہ<br>• قرآن سے روزمرہ رہنمائی لینے کا طریقہ</td>
        <td>قرآن فہمی کا براہِ راست ذوق، تلاوت میں تدبر، اخلاقی تطہیر اور زندگی کے معاملات میں قرآنی شعور۔</td>
      </tr>
      <tr>
        <td><strong>سہ ماہی ۳ (ماہ ۷-۹)</strong><br>سیرتِ نبوی ﷺ و فہمِ حدیث</td>
        <td>• مکی و مدنی دور کی دعوتی و سیاسی حکمتِ عملی<br>• رسول اللہ ﷺ بحیثیت قائد، معلم اور سربراہ<br>• اصولِ حدیث: روایات کی حفاظت کا بے مثال نظام<br>• ۴۰ منتخب احادیث کا عملی انطباق</td>
        <td>رسول اللہ ﷺ سے حقیقی عشقی و فکری تعلق، سنتِ نبوی پر استقامت، اور معاصر دنیا میں قائدانہ صفات کا ظہور۔</td>
      </tr>
      <tr>
        <td><strong>سہ ماہی ۴ (ماہ ۱۰-۱۲)</strong><br>فقہِ زندگی، معاشرت و قیادت</td>
        <td>• عبادات کی فقہی روح (نماز، روزہ، زکوٰۃ)<br>• جدید مالی مسائل: سود سے پاک معیشت، کرپٹو<br>• خاندانی نظام، شادی اور ورک لائف بیلنس<br>• حتمی فکری پروجیکٹ اور اسناد کی تقسیم</td>
        <td>اپنے پیشے (انجینئرنگ، میڈیکل، بزنس وغیرہ) میں رہتے ہوئے ایک متقی، خوددار اور متحرک داعی بن کر ابھرنا۔</td>
      </tr>
    </tbody>
  </table>

  <!-- ==========================================
       SECTION 11: SELF-ASSESSMENT QUIZ & SOLUTIONS
       ========================================== -->
  <div class="section-title-banner">
    <span>۱۱. امتحانی خود آزمائی اور حل شدہ تفصیلی کلید</span>
    <span style="font-size: 8.5pt; font-weight: normal;">طلبہ و اساتذہ کے لیے</span>
  </div>

  <div class="card-item" style="margin-bottom: 8px;">
    <strong>سوال ۱: لفظ "عقیدہ" کا لغوی معنی کیا ہے اور یہ کس مادے سے ماخوذ ہے؟</strong><br>
    <em>جواب:</em> یہ "عقد" سے ہے جس کے معنی پکی گرہ، پختگی، استواری اور وثوق کے ہیں۔ جیسے عقدِ بیع اور عقدِ نکاح۔ اصطلاح میں دل کے اس پختہ یقین کو کہتے ہیں جو انسان کے فکر و عمل کو اپنی گرفت میں لے لے۔
  </div>

  <div class="card-item" style="margin-bottom: 8px;">
    <strong>سوال ۲: اگر دنیا میں انبیاء نہ آتے تو انسانیت کی حالت کیا ہوتی؟</strong><br>
    <em>جواب:</em> طاقتور کی حکومت (جنگل کا قانون) ہوتی، اخلاقی انارکی ہوتی اور انسان پتھروں و مخلوقات کو پوجتا رہتا۔ عقل اکیلی سائنسی آلات تو بنا سکتی ہے لیکن خیر و شر، عدلِ مطلق اور روح کے مقصد کا حتمی پیمانہ صرف وحیِ نبوت سے ملتا ہے۔
  </div>

  <div class="card-item" style="margin-bottom: 8px;">
    <strong>سوال ۳: توحید فی الصفات میں اللہ تعالیٰ اور مخلوق کی صفات کے درمیان بنیادی کلامی فرق کیا ہے؟</strong><br>
    <em>جواب:</em> اللہ کی صفات <strong>قدیم، ذاتی اور مطلق</strong> ہیں؛ جبکہ مخلوق کی صفات <strong>حادث، عطائی اور محدود</strong> ہیں۔ یہ ۳ کلیدی الفاظ صفات میں شرک سے بچاؤ کی اساس ہیں۔
  </div>

  <div class="card-item" style="margin-bottom: 8px;">
    <strong>سوال ۴: تقدیر اور انسانی اختیار کے باب میں "بھوک اور روٹی" کی مثال کیا واضح کرتی ہے؟</strong><br>
    <em>جواب:</em> تقدیر ہاتھ پر ہاتھ رکھ کر بیٹھنے کا نام نہیں، انسان کو محنت اور تدبیر کرنی پڑتی ہے پھر اللہ برکت دیتا ہے۔ جیسے نوالہ منہ میں ڈالنے سے پیٹ بھرتا ہے، ویسے ہی اللہ نے محنت، دعا اور تدبیر کو کامیابی کا ذریعہ مقدر فرمایا ہے۔
  </div>

  <div class="card-item" style="margin-bottom: 8px;">
    <strong>سوال ۵: طاعونِ عمواس کے موقع پر حضرت عمر فاروقؓ کا تاریخی فرمودہ کیا تھا؟</strong><br>
    <em>جواب:</em> <strong>«نَفِرُّ مِنْ قَدَرِ اللّٰهِ إِلَى قَدَرِ اللّٰهِ»</strong> (ہم اللہ کی ایک تقدیر سے اللہ ہی کی دوسری تقدیر کی طرف جا رہے ہیں)۔ یہ واضح کرتا ہے کہ تقدیر پر ایمان تدبیر، احتیاط اور علم و عقل سے کام لینے کے قطعی خلاف نہیں۔
  </div>

  <!-- FOOTER -->
  <div style="text-align: center; border-top: 1.5px double #cbd5e1; padding-top: 10px; margin-top: 16px; font-size: 8.5pt; color: #64748b;">
    جامع درسی انسائیکلوپیڈیا و مکمل درسی گائیڈ • حقیقتِ عقیدہ و ایمانِ مفصل (نشست ۳) • مدرسہ آن لائن لرننگ مینجمنٹ سسٹم (KUI LMS) • kui.nukrim.com
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
       3. GENERATE SLIDES PDF (A4 Landscape - Web Theme Schema & Layout)
       ============================================================== */
    console.log('Generating Aqeedah Presentation Slides PDF (8 Landscape Slides in Web Theme Layout)...');
    const pageSlides = await browser.newPage();

    const slidesData = [
      {
        num: 1,
        tag: 'سلائیڈ ۱ • بنیادی تعریف و حقیقت',
        title: 'حقیقتِ عقیدہ: دل کی پکی گرہ اور عمل کا انجن',
        sub: 'لفظی تحقیق، حدیثِ جبریلؑ اور صحابہ کرامؓ کا تدریجی طریقہ کار',
        bullets: [
          { icon: '🪢', title: 'لغوی معنی: گرہ اور وثوق', text: 'عقیدہ "عقد" سے ہے جس میں پختگی، استواری اور اٹوٹ رشتے کا مفہوم ہے۔ جیسے عقدِ بیع اور عقدِ نکاح، دل جب اللہ کی ذات و صفات پر بندھ جائے تو یہ عقیدہ ہے۔' },
          { icon: '✨', title: 'حدیثِ جبریلؑ: دین کے ۳ درجات', text: 'دین صرف احکام کا مجموعہ نہیں؛ اسلام (اعضاء کا عمل)، ایمان (دل کا پختہ عقیدہ) اور احسان (کامل یکسوئی و مشاہدۂ حق)۔ عقیدہ ایمان کی جان ہے۔' },
          { icon: '🌱', title: 'صحابہ کرامؓ کا اصول', text: 'حضرت جندب بن عبداللہؓ فرماتے ہیں: «تَعَلَّمْنَا الْإِيمَانَ قَبْلَ أَنْ نَتَعَلَّمَ الْقُرْآنَ» (ہم نے احکام سیکھنے سے پہلے دل میں ایمان اور عقیدہ راسخ کیا)۔' }
        ],
        visual: {
          icons: '🪢 ⚓ 💡',
          title: 'تصویری استعارہ: لنگر اور درخت کی جڑ',
          desc: 'طوفانی سمندر میں جہاز کو اس کا لنگر سنبھالتا ہے، اور زمین پر بڑے درخت کو اس کی گہری جڑ گرنے نہیں دیتی۔',
          boxHtml: `
            <div style="color: #4ade80; font-weight: bold;">✔ پکا عقیدہ:</div>
            شکوک و شبہات، مصائب اور فتنوں کے طوفان میں دل کو متزلزل نہیں ہونے دیتا۔
            <div style="color: #f87171; font-weight: bold; margin-top: 5px;">✖ کمزور عقیدہ:</div>
            معمولی اعتراض یا آزمائش پر انسان الحاد یا مایوسی کا شکار ہو جاتا ہے۔
          `
        }
      },
      {
        num: 2,
        tag: 'سلائیڈ ۲ • توحید فی الذات و الصفات',
        title: 'قادرِ مطلق خالق کا اثبات: کائنات کا وجود اتفاقی نہیں',
        sub: 'امکان کا برہان، سورج اور آئینے، اور توحید کے ۴ کلامی تقاضے',
        bullets: [
          { icon: '☀️', title: 'سورج اور آئینے کی مثال', text: 'ہزاروں آئینے چمک رہے ہیں مگر روشنی کسی کی ذاتی نہیں، سب سورج سے مستعار ہے۔ کائنات کی ہر مخلوق کا وجود مستعار (ممکن الوجود) ہے، اس کے پیچھے ایک حقیقی منبع (واجب الوجود) ناگزیر ہے۔' },
          { icon: '💻', title: 'کمپیوٹر کوڈ اور کائنات کا نظم', text: 'ایک چھوٹے سے سوفٹ ویئر میں کوڈ خود بخود ٹائپ نہیں ہوتا۔ اربوں کہکشاؤں، ڈی این اے اور گریویٹی کا حیرت انگیز ریاضیاتی نظم کیا خود بخود بن گیا؟ ﴿أَفِي اللَّهِ شَكٌّ﴾' },
          { icon: '☝️', title: 'توحید کے چار درجات', text: 'توحید فی الذات (خدا کا کوئی شریک نہیں)، الصفات (صفات ذاتی و قدیم ہیں)، الافعال (تنہا مدبر)، اور العبادة (اطاعت و بندگی کا تنہا حقدار)۔' }
        ],
        visual: {
          icons: '🌌 ☀️ 🪞',
          title: 'تصویری استعارہ: مستعار روشنی بمقابلہ حقیقی منبع',
          desc: 'آئینہ سورج کے بغیر تاریک ہے؛ کائنات اللہ کے فیضان کے بغیر معدوم ہے۔',
          boxHtml: `
            <div style="font-weight: bold; color: #fcd34d;">کائنات (آئینہ):</div>
            ہر لمحہ فنا ہونے والی، محتاج اور محدود۔
            <div style="font-weight: bold; color: #4ade80; margin-top: 5px;">اللہ تعالیٰ (حقیقی نور):</div>
            «اللهُ نُورُ السَّمَاوَاتِ وَالأَرْضِ» — حیّ و قیوم، بے نیاز اور دائمی۔
          `
        }
      },
      {
        num: 3,
        tag: 'سلائیڈ ۳ • فکری ضرورتِ نبوت',
        title: 'تصور کریں: اگر دنیا میں انبیاء نہ ہوتے؟',
        sub: 'A World Without Prophets: اخلاقی انارکی، جنگل کا قانون اور وحی کی برکت',
        bullets: [
          { icon: '🐾', title: 'جنگل کا قانون اور طاقت کی حکمرانی', text: 'اگر وحی نہ ہوتی تو اخلاق کا پیمانہ صرف طاقتور کی مرضی ہوتا۔ جو طاقتور ہوتا وہی حق دار ہوتا؛ کمزوروں، یتیموں اور مظلوموں کے لیے کوئی انصاف نہ ہوتا۔' },
          { icon: '🗿', title: 'فکری و روحانی اندھیرا', text: 'انسان اپنی عقل سے یہ تو جان لیتا کہ کوئی بنانے والا ہے، مگر وہ اس کی مرضی نہ جان پاتا۔ نتیجے میں پتھروں، درختوں، سورج یا انسانوں کے آگے سجدہ ریز ہو جاتا۔' },
          { icon: '🕯️', title: 'وحی: تاریکی میں آسمانی روشنی', text: 'انبیاء علیہم السلام نے انسان کو خود پرستی سے نکال کر خدا پرستی کی راہ دکھائی، عدلِ اجتماعی قائم کیا اور انسان کو جانور سے اٹھا کر اشرف المخلوقات بنایا۔' }
        ],
        visual: {
          icons: '🌑 ➡️ ☀️',
          title: 'تصویری تضاد: وحی سے پہلے اور وحی کے بعد',
          desc: 'عقل بغیر نبوت کے صحرا میں بھٹکنے والے مسافر کی طرح ہے۔',
          boxHtml: `
            <div style="color: #f87171; font-weight: bold;">بغیرِ وحی (جاہلیت):</div>
            بیٹیوں کو زندہ دفن کرنا، غلاموں پر ظلم، شرک اور مایوسی۔
            <div style="color: #4ade80; font-weight: bold; margin-top: 5px;">وحی کے بعد (نبوت کا فیض):</div>
            عدل، تقویٰ، مساوات (سیدنا بلالؓ اور ابوبکرؓ برابر بھائی)، اور ابدی امید!
          `
        }
      },
      {
        num: 4,
        tag: 'سلائیڈ ۴ • ادارۂ رسالت و اسوہ',
        title: 'ادارۂ رسالت: صرف کتاب کافی کیوں نہیں؟',
        sub: 'کار کا مینوئل بمقابلہ ڈرائیونگ انسٹرکٹر، اور رسول ﷺ کی عملی زندگی',
        bullets: [
          { icon: '🚘', title: 'مینوئل اور استاد کا فرق', text: 'اگر آپ کسی کو جہاز یا کار چلانے کی کتاب دے دیں اور کہیں کہ بغیر انسٹرکٹر کے سڑک پر نکل جاؤ تو حادثہ یقینی ہے۔ کتاب قانون ہے، رسول اس کا زندہ عملی ماڈل ہیں۔' },
          { icon: '📜', title: 'کتاب اور صاحبِ کتاب', text: 'قرآن نے فرمایا «أَقِيمُوا الصَّلَاةَ» (نماز قائم کرو)، مگر فجر کی دو رکعتیں اور رکوع و سجود رسول اللہ ﷺ نے کر کے دکھائے: «صَلُّوا كَمَا رَأَيْتُمُونِي أُصَلِّي»۔' },
          { icon: '❤️', title: 'مرکزِ محبت و مرکزِ اطاعت', text: 'رسول اللہ ﷺ محض پوسٹ مین نہیں تھے (معاذ اللہ)، بلکہ آپ ﷺ کی ذات مقتدا، مطاع اور ایمان کی روح ہے: «قُلْ إِن كُنتُمْ تُحِبُّونَ اللَّهَ فَاتَّبِعُونِي»۔' }
        ],
        visual: {
          icons: '📖 ➕ 👤 ➡️ 🎯',
          title: 'کتاب + رسول = زندہ دین',
          desc: 'صرف کتاب سے گمراہی کے دروازے کھلتے ہیں، جب تک اس کا حقیقی شارح سامنے نہ ہو۔',
          boxHtml: `
            <div style="color: #fcd34d; font-weight: bold;">ام المومنین عائشہ صدیقہؓ کا فرمان:</div>
            «كَانَ خُلُقُهُ الْقُرْآنَ»<br>
            (رسول اللہ ﷺ چلتا پھرتا زندہ قرآن تھے)۔
          `
        }
      },
      {
        num: 5,
        tag: 'سلائیڈ ۵ • عقیدہ ختمِ نبوت',
        title: 'حکمتِ ختمِ نبوت: انسانیت کی فکری بلوغت اور دین کی تکمیل',
        sub: '﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ﴾ اور امتِ مسلمہ کی ذمہ داری',
        bullets: [
          { icon: '🏛️', title: 'عمارت کی آخری اینٹ کا استعارہ', text: 'حدیثِ نبوی ہے کہ ایک خوبصورت محل بنایا گیا جس میں صرف ایک اینٹ کی جگہ خالی تھی، آپ ﷺ نے فرمایا: «فَأَنَا اللَّبِنَةُ وَأَنَا خَاتَمُ النَّبِيِّينَ»۔' },
          { icon: '🎓', title: 'فکری بلوغت کا مرحلہ', text: 'پچھلی کتابوں میں تحریف ہو جاتی تھی اس لیے نئے نبی آتے تھے۔ قرآن کو اللہ نے خود محفوظ فرما دیا: ﴿إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ﴾۔ جب کتاب محفوظ ہے تو نئے نبی کی ضرورت باقی نہیں۔' },
          { icon: '🌍', title: 'آفاقی شریعت قیامت تک کے لیے', text: 'سابقہ انبیاء مخصوص قوموں کے لیے آئے، لیکن رسول اللہ ﷺ ساری انسانیت کے لیے آئے: ﴿وَمَا أَرْسَلْنَاكَ إِلَّا كَافَّةً لِّلنَّاسِ﴾۔' }
        ],
        visual: {
          icons: '👑 🛡️ 📜',
          title: 'ختمِ نبوت: دین کا تاج محل',
          desc: 'رسول اللہ ﷺ کے بعد کسی مدعیِ نبوت کا دعویٰ صریح فتنہ اور باطل ہے۔',
          boxHtml: `
            <div style="font-weight: bold; color: #fcd34d;">صلحِ حدیبیہ میں عروہ بن مسعود کا اعتراف:</div>
            "میں نے قیصر و کسریٰ کے دربار دیکھے ہیں، مگر محمد ﷺ کے ساتھی ان کا جیسا ادب و اطاعت کرتے ہیں ویسی دنیا میں کہیں نہیں دیکھی!"
          `
        }
      },
      {
        num: 6,
        tag: 'سلائیڈ ۶ • آخرت و نظامِ جزا',
        title: 'عالمِ آخرت: دنیا امتحان ہال اور قیامت رزلٹ ڈے',
        sub: 'عدلِ مطلق کا تقاضا، موت سے جنت تک کے مراحل اور سیدنا مصعب بن عمیرؓ',
        bullets: [
          { icon: '🏫', title: 'امتحان گاہ میں فیصلہ نہیں ہوتا', text: 'دنیا امتحان کی جگہ ہے (دار الامتحان)، یہاں اچھے اور برے دونوں کو سانس اور رزق ملتا ہے۔ رزلٹ ہال (دار الجزاء) آخرت میں ہے جہاں ذرہ برابر عمل کا حساب ہو گا۔' },
          { icon: '⚖️', title: 'عقل کا تقاضا: عدلِ مطلق', text: 'ہٹلر نے لاکھوں انسان مارے اور خودکشی کر لی، کیا دنیا کی کوئی عدالت اسے انصاف کے مطابق سزا دے سکتی تھی؟ صرف آخرت کا میزان ہی حقیقی عدل قائم کر سکتا ہے۔' },
          { icon: '🌹', title: 'مصعب بن عمیرؓ کا سودا', text: 'مکہ کے سب سے امیر اور خوش لباس نوجوان نے دنیا کا آرام چھوڑ دیا اور غزوہ احد میں جب شہید ہوئے تو کفن کے لیے ایک چھوٹی چادر تھی۔ یہ آخرت پر یقین کی طاقت تھی!' }
        ],
        visual: {
          icons: '📝 ➡️ ⚖️ ➡️ 🏆',
          title: 'دنیا = بونے کی جگہ • آخرت = کاٹنے کی جگہ',
          desc: 'موت خاتمہ نہیں بلکہ ابدی زندگی کا آغاز ہے۔',
          boxHtml: `
            <div style="color: #4ade80; font-weight: bold;">«الدُّنْيَا مَزْرَعَةُ الْآخِرَةِ»</div>
            جو شخص سمجھتا ہے کہ موت کے بعد کچھ نہیں، وہ دنیا کو تفریح گاہ بناتا ہے۔ جو آخرت پر ایمان رکھتا ہے وہ ہر سانس کو نیکی اور عدل میں لگاتا ہے۔
          `
        }
      },
      {
        num: 7,
        tag: 'سلائیڈ ۷ • تقدیر اور ذہنی استقامت',
        title: 'تقدیر: طاعونِ عمواس اور دکھوں کا مقابلہ',
        sub: '«نَفِرُّ مِنْ قَدَرِ اللّٰهِ إِلَى قَدَرِ اللّٰهِ» — تدبیر بمقابلہ تقدیر',
        bullets: [
          { icon: '🛡️', title: 'طاعونِ عمواس میں حضرت عمر فاروقؓ', text: 'جب شام میں طاعون پھیلا تو سیدنا عمرؓ نے فوج کو واپس لے جانے کا فیصلہ کیا۔ حضرت ابو عبیدہؓ نے پوچھا: کیا اللہ کی تقدیر سے بھاگ رہے ہیں؟ فرمایا: "ہاں! ہم اللہ کی ایک تقدیر سے اللہ کی دوسری تقدیر کی طرف جا رہے ہیں!"' },
          { icon: '🩺', title: 'تدبیر اور توکل کا توازن', text: 'بیمار ہونے پر دوا کھانا تقدیر کے خلاف نہیں بلکہ شریعت کا حکم ہے۔ آگ میں ہاتھ نہ ڈالنا تدبیر ہے؛ نتائج اللہ کے ہاتھ میں سونپنا توکل ہے۔' },
          { icon: '🛑', title: 'لفظ "کاش" (What if) کا خاتمہ', text: 'رسول اللہ ﷺ نے فرمایا: اگر نقصان پہنچے تو یہ نہ کہو کہ "کاش میں یوں کرتا تو یوں ہوتا"، بلکہ کہو: «قَدَرُ اللَّهِ وَمَا شَاءَ فَعَلَ» کیونکہ "کاش" شیطان کے وسوسوں کا دروازہ کھولتا ہے۔' }
        ],
        visual: {
          icons: '🛡️ 🌿 🕊️',
          title: 'اینگزائٹی اور ڈپریشن کا روحانی علاج',
          desc: 'تقدیر دل سے خوف اور ماضی کے پچھتاوے مٹا دیتی ہے۔',
          boxHtml: `
            <div style="font-weight: bold; color: #38bdf8;">پوری کوشش کرو (تدبیر):</div>
            جیسے اونٹ کا گھٹنا باندھنا۔
            <div style="font-weight: bold; color: #4ade80; margin-top: 5px;">نتیجے پر راضی رہو (رضا بالقضاء):</div>
            «عَجَبًا لِأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ»
          `
        }
      },
      {
        num: 8,
        tag: 'سلائیڈ ۸ • ۱ سالہ تعلیمی سفر',
        title: '۱ سالہ جامع کورس کا روڈ میپ: شکوک سے یقین تک',
        sub: '۴ سہ ماہی مراحل، لائیو کلاسز اور شخصی و فکری تعمیر کی دعوت',
        bullets: [
          { icon: '📚', title: 'مرحلہ ۱: فکری استحکام (عقائد و چیلنجز)', text: 'الحاد، مادیت پرستی، شکوک و شبہات اور اسلام کے عقلی و نقلی دلائل کا جدید اسلوب میں مطالعہ۔' },
          { icon: '📖', title: 'مرحلہ ۲: فہمِ قرآن و حدیث', text: 'قرآن کی بنیادی سورتوں کی تفسیری روح، رسول اللہ ﷺ کی سیرتِ طیبہ اور احادیثِ مبارکہ کا عملی ادراک۔' },
          { icon: '🧭', title: 'مرحلہ ۳ و ۴: فقہِ زندگی و معاشرتی قیادت', text: 'حلال و حرام، جدید معاشی مسائل، خاندانی نظام اور مسلم نوجوان کا اپنے پیشے میں قائدانہ کردار۔' }
        ],
        visual: {
          icons: '🎓 🌟 🤝',
          title: 'آج ہی اپنے داخلے کو یقینی بنائیں!',
          desc: 'شکوک سے یقین اور روایتی سوچ سے بصیرت تک کا منظم سفر۔',
          boxHtml: `
            <div style="color: #fcd34d; font-weight: bold; font-size: 10pt;">پروگرام کی خصوصیات:</div>
            • ہفتہ وار انٹرایکٹو لائیو زوم سیشنز<br>
            • ایچ ڈی ریکارڈنگز اور پی ڈی ایف درسی خلاصے<br>
            • اساتذہ کے ساتھ سوال و جواب اور معتبر اسناد!
          `
        }
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
      margin: 6mm 8mm 6mm 8mm;
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: 'Noto Sans Arabic', 'Amiri', serif;
      direction: rtl;
      text-align: right;
      color: #f1f5f9;
      margin: 0;
      padding: 0;
      background: #0b1120;
    }
    .slide-page {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      padding: 14px 20px;
      border: 2px solid #b48c28;
      border-radius: 12px;
      box-sizing: border-box;
      background: #131d2e;
      box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.45);
    }
    .slide-page:last-child {
      page-break-after: avoid;
    }
    .slide-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #24354d;
      padding-bottom: 6px;
    }
    .slide-tag {
      background: rgba(212, 175, 55, 0.2);
      color: #fcd34d;
      border: 1px solid rgba(212, 175, 55, 0.4);
      padding: 2px 12px;
      border-radius: 12px;
      font-size: 8.5pt;
      font-weight: bold;
    }
    .slide-book-name {
      font-size: 8.5pt;
      color: #94a3b8;
      font-weight: 600;
    }
    .slide-counter {
      background: #b48c28;
      color: #0f172a;
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 8.5pt;
      font-weight: bold;
    }
    .slide-title-wrap {
      margin: 6px 0 8px 0;
    }
    .slide-title {
      font-family: 'Amiri', serif;
      font-size: 18.5pt;
      color: #fcd34d;
      margin: 0 0 2px 0;
      line-height: 1.25;
    }
    .slide-sub {
      font-size: 9pt;
      color: #94a3b8;
      margin: 0;
    }
    /* 2-Column Split Layout matching webpage */
    .slide-split-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 14px;
      flex-grow: 1;
      align-items: stretch;
      margin: 6px 0 8px 0;
    }
    .slide-bullets-col {
      display: flex;
      flex-direction: column;
      gap: 8px;
      justify-content: space-around;
    }
    .slide-bullet-item {
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-right: 4.5px solid #b48c28;
      border-radius: 8px;
      padding: 8px 12px;
    }
    .bullet-item-title {
      font-weight: bold;
      font-size: 10pt;
      color: #f8fafc;
      margin-bottom: 3px;
    }
    .bullet-item-text {
      font-size: 8.8pt;
      line-height: 1.65;
      color: #cbd5e1;
    }
    .slide-visual-col {
      background: linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8));
      border: 1.5px solid rgba(212, 175, 55, 0.35);
      border-radius: 10px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      box-shadow: inset 0 0 25px rgba(0,0,0,0.4);
    }
    .visual-icon-banner {
      font-size: 26pt;
      margin-bottom: 4px;
      line-height: 1;
    }
    .visual-title {
      font-weight: bold;
      font-size: 11pt;
      color: #fcd34d;
      margin-bottom: 4px;
      font-family: 'Amiri', serif;
    }
    .visual-desc {
      font-size: 8.5pt;
      color: #cbd5e1;
      line-height: 1.55;
      margin-bottom: 6px;
    }
    .visual-comparison-box {
      background: rgba(0, 0, 0, 0.45);
      border-radius: 8px;
      padding: 8px 10px;
      text-align: right;
      font-size: 8.5pt;
      line-height: 1.65;
      color: #e2e8f0;
      border: 1px dashed rgba(212, 175, 55, 0.3);
    }
    .slide-footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #24354d;
      padding-top: 6px;
      font-size: 8pt;
      color: #64748b;
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
      <span class="slide-book-name">العقائد الإسلامية • نشست ۳ (ایمانِ مفصل و ارکانِ ستہ) • ۱ سالہ کورس پریویو</span>
      <span class="slide-counter">سلائیڈ ${s.num} از ${slidesData.length}</span>
    </div>

    <div class="slide-title-wrap">
      <h2 class="slide-title">${s.title}</h2>
      <p class="slide-sub">${s.sub}</p>
    </div>

    <div class="slide-split-grid">
      <div class="slide-bullets-col">
        ${s.bullets.map(b => `
          <div class="slide-bullet-item">
            <div class="bullet-item-title">${b.icon} ${b.title}</div>
            <div class="bullet-item-text">${b.text}</div>
          </div>
        `).join('')}
      </div>

      <div class="slide-visual-col">
        <div class="visual-icon-banner">${s.visual.icons}</div>
        <div class="visual-title">${s.visual.title}</div>
        <div class="visual-desc">${s.visual.desc}</div>
        <div class="visual-comparison-box">
          ${s.visual.boxHtml}
        </div>
      </div>
    </div>

    <div class="slide-footer-bar">
      <span>مدرسہ آن لائن لرننگ مینجمنٹ سسٹم (KUI LMS) • kui.nukrim.com</span>
      <span>صفحات ۱۲ تا ۱۷ • حقیقتِ عقیدہ، ایمانِ مفصل اور اثرات فی الحیاۃ</span>
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

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const DOWNLOADS_DIR = path.join(__dirname, '..', 'lms', 'downloads');
const MASTER_PDF_PATH = path.join(DOWNLOADS_DIR, 'Burhan-Tatbiq-Complete-Topic.pdf');
const NOTES_PDF_PATH = path.join(DOWNLOADS_DIR, 'Burhan-Tatbiq-Lecture-Notes.pdf');
const SLIDES_PDF_PATH = path.join(DOWNLOADS_DIR, 'Burhan-Tatbiq-Slides.pdf');

async function generateBurhanTatbiqPDFs() {
  if (!fs.existsSync(DOWNLOADS_DIR)) {
    fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
  }

  console.log('Launching Puppeteer for server-side PDF generation...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    /* ==============================================================
       1. GENERATE ALL-IN-ONE MASTER PDF (FOLLOWING EXACT WEBPAGE ORDER)
       ============================================================== */
    console.log('Generating Burhan-Tatbiq Complete Master Topic PDF...');
    const pageMaster = await browser.newPage();

    const masterHTML = `
<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>شرح العقائد النسفية | إثبات الصانع وبرهان التطبيق</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm 14mm 16mm 14mm;
      @top-center {
        content: "شرح العقائد النسفية للإمام السعد التفتازاني • إثبات صانع العالم وبرهان التطبيق لإبطال التسلسل";
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
    .pillars-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .pillar-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 3.5px solid #b48c28;
      border-radius: 6px;
      padding: 8px 10px;
      font-size: 8.8pt;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .pillar-title {
      font-weight: bold;
      color: #0f172a;
      font-size: 9.5pt;
      margin-bottom: 4px;
      border-bottom: 1px dashed #cbd5e1;
      padding-bottom: 3px;
    }
    .pillar-rule {
      color: #92400e;
      font-weight: 600;
      font-size: 8.2pt;
      margin-bottom: 4px;
    }
    .pillar-desc {
      line-height: 1.6;
      color: #334155;
    }
    .pillar-ex {
      background: #eff6ff;
      border-right: 2px solid #3b82f6;
      padding: 4px 6px;
      border-radius: 3px;
      margin-top: 5px;
      font-size: 8.2pt;
      color: #1e3a8a;
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
    .terms-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px 10px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .term-row {
      display: flex;
      gap: 6px;
      margin-bottom: 4px;
      font-size: 8.8pt;
      line-height: 1.6;
    }
    .term-name {
      font-weight: bold;
      color: #92400e;
      min-width: 115px;
    }
    .matn-arabic-block {
      background: #fafaf9;
      border-right: 4px solid #b48c28;
      padding: 9px 12px;
      margin-bottom: 6px;
      border-radius: 0 6px 6px 0;
      font-family: 'Amiri', serif;
      font-size: 12pt;
      line-height: 1.95;
      color: #0f172a;
      page-break-inside: avoid;
    }
    .matn-highlight {
      color: #991b1b;
      font-weight: bold;
    }
    .urdu-block {
      background: #f0fdf4;
      border-right: 4px solid #16a34a;
      padding: 9px 12px;
      margin-bottom: 12px;
      border-radius: 0 6px 6px 0;
      font-family: 'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif;
      font-size: 9.8pt;
      line-height: 2.05;
      color: #14532d;
      page-break-inside: avoid;
    }
    .hashiya-item {
      background: #fffbeb;
      border-right: 2.5px solid #d97706;
      padding: 4px 8px;
      font-size: 8.5pt;
      margin-top: 4px;
      border-radius: 2px;
      color: #92400e;
    }
    .flowchart-table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0 12px 0;
      page-break-inside: avoid;
    }
    .flowchart-table td {
      border: 1px solid #cbd5e1;
      padding: 8px 10px;
      vertical-align: top;
      background: #f8fafc;
      font-size: 8.8pt;
    }
    .flow-badge {
      display: inline-block;
      background: #b48c28;
      color: #ffffff;
      padding: 1px 7px;
      border-radius: 3px;
      font-size: 7.5pt;
      font-weight: bold;
      margin-bottom: 4px;
    }
    .dilemma-box {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin: 8px 0;
      page-break-inside: avoid;
    }
    .dilemma-card {
      border-radius: 6px;
      padding: 8px 10px;
      font-size: 8.8pt;
    }
    .dilemma-card.warning {
      background: #fef2f2;
      border: 1.5px solid #f87171;
    }
    .dilemma-card.success {
      background: #f0fdf4;
      border: 1.5px solid #4ade80;
    }
    .dilemma-title {
      font-weight: bold;
      margin-bottom: 4px;
      font-size: 9.2pt;
    }
    .modern-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-right: 3.5px solid #0284c7;
      border-radius: 5px;
      padding: 7px 10px;
      margin-bottom: 8px;
      page-break-inside: avoid;
      font-size: 8.8pt;
    }
    .modern-title-row {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      margin-bottom: 3px;
      color: #0369a1;
    }
    .obj-card {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-right: 3.5px solid #d97706;
      border-radius: 5px;
      padding: 8px 10px;
      margin-bottom: 8px;
      page-break-inside: avoid;
      font-size: 8.8pt;
    }
    .obj-title {
      font-weight: bold;
      color: #92400e;
      margin-bottom: 4px;
      font-size: 9.2pt;
    }
    .ans-box {
      background: #ffffff;
      border-right: 2px solid #16a34a;
      padding: 5px 8px;
      margin-top: 5px;
      border-radius: 3px;
      color: #166534;
    }
    .quiz-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      padding: 7px 10px;
      margin-bottom: 7px;
      page-break-inside: avoid;
      font-size: 8.8pt;
    }
    .quiz-q {
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .quiz-ans {
      color: #15803d;
      background: #dcfce7;
      padding: 3px 6px;
      border-radius: 3px;
      display: inline-block;
      margin-top: 3px;
      font-weight: 600;
      font-size: 8.2pt;
    }
  </style>
</head>
<body>

  <!-- COVER / HEADER -->
  <div class="cover-header">
    <div class="badge">درسِ نظامی • علم الکلام • درجہ سادسہ (العالیہ)</div>
    <h1>شرح العقائد النسفية | إثبات الصانع وبرهان التطبيق</h1>
    <div class="subtitle">للإمام العلامة سعد الدين مسعود بن عمر التفتازانيؒ (صفحات ۱۰۲ تا ۱۰۵)</div>
    <div style="font-size: 8.5pt; color: #64748b; margin-top: 2px;">
      المُحْدِثُ للعالمِ هو الله تعالى • مفهوم واجب الوجود • بطلان التسلسل في العلل • البرهان العقلي والرياضي مع الربط المعاصر
    </div>
  </div>

  <!-- HERO OVERVIEW -->
  <div class="hero-card">
    <span class="hero-tag">صفحات ۱۰۲ تا ۱۰۵ کا عطر و نچوڑ</span>
    <h2 class="hero-title">کائنات کا بنانے والا اور غیر متناہی علتوں کا بطلان</h2>
    <p class="hero-desc">
      یہ صفحات علم الکلام کی اصل بنیاد ہیں۔ امام سعد الدین تفتازانیؒ نے نہایت اختصار مگر غیر معمولی جامعیت کے ساتھ ثابت کیا ہے کہ کائنات چونکہ حادث ہے اس لیے اس کا ایک صانع (محدث) ضروری ہے، اور وہ صانع کوئی ممکن چیز نہیں ہو سکتی ورنہ لامتناہی زنجیر (تسلسل) لازم آئے گی۔ اور تسلسل عقلاً باطل ہے جس کے رد کے لیے سب سے قوی دلیل <strong>«برہانِ تطبیق»</strong> قائم فرمائی ہے۔
    </p>
  </div>

  <!-- 3 PILLARS WITH REAL WORLD ANALOGIES -->
  <div class="sub-section-title">۳ بنیادی ستون: قدیم کلامی اصطلاح، جدید مفہوم اور روزمرہ زندگی کی مثالیں</div>
  <div class="pillars-grid">
    <div class="pillar-card">
      <div>
        <div class="pillar-title">۱. اثباتِ واجب الوجود</div>
        <div class="pillar-rule">The Self-Sufficient Source</div>
        <div class="pillar-desc">
          کائنات کی ہر شے "ممکن" (محتاج) ہے، اور ممکن کا خود بخود عدم سے وجود میں آنا محال ہے۔ پس اس کا مبدأ ایک ایسا خود مختار منبع ہونا چاہیے جو کسی کا محتاج نہ ہو۔
        </div>
      </div>
      <div class="pillar-ex">
        <strong>🔌 پاور گرڈ اور چارجر:</strong> موبائل چارجر سے، چارجر ایکسٹینشن سے، ایکسٹینشن دیوار سے جڑی ہے۔ اگر پیچھے پاور ہاؤس نہ ہو تو موبائل کبھی چارج نہیں ہو سکتا!
      </div>
    </div>

    <div class="pillar-card">
      <div>
        <div class="pillar-title">۲. بطلانِ تسلسل</div>
        <div class="pillar-rule">Infinite Dependency Loop</div>
        <div class="pillar-desc">
          اگر ہر سبب کے پیچھے دوسرا سبب ہو اور یہ زنجیر ماضی میں کبھی نہ رکے، تو کائنات کبھی وجود میں ہی نہیں آ سکتی تھی (Infinite Recursion without Base Case)۔
        </div>
      </div>
      <div class="pillar-ex">
        <strong>✍️ کیشئر اور دستخط:</strong> کیشئر کہے جب تک منیجر ۱ دستخط نہ کرے پیسے نہیں ملیں گے، منیجر ۱ منیجر ۲ پر ٹالے اور یہ شرط کبھی نہ رکے؛ تو رقم کبھی نہیں ملے گی!
      </div>
    </div>

    <div class="pillar-card">
      <div>
        <div class="pillar-title">۳. برہانِ تطبیق</div>
        <div class="pillar-rule">Mapping Paradox</div>
        <div class="pillar-desc">
          معلولات کے دو سلسلوں کا ایک دوسرے کے سامنے تقابل کر کے لامتناہی زنجیر کے عقلی و ریاضیاتی تضاد کو قاطع انداز میں ثابت کرنا۔
        </div>
      </div>
      <div class="pillar-ex">
        <strong>📚 دو الماریاں اور کتب:</strong> الماری الف میں تمام جلدیں ہیں، الماری ب میں سے پہلی جلد غائب ہے۔ ایک کے بدلے ایک ملائیں۔ ناقص کبھی زائد کے برابر نہیں ہو سکتا!
      </div>
    </div>
  </div>

  <!-- KEY TERMINOLOGY -->
  <div class="terms-box">
    <div style="font-weight: bold; color: #78350f; font-size: 9.2pt; margin-bottom: 4px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
      اہم اصطلاحی و کلامی مفاہیم:
    </div>
    <div class="term-row">
      <span class="term-name">• واجب الوجود:</span>
      <span>جس کا وجود اس کی اپنی ذات سے ہو اور وہ عدم کو قبول نہ کرے (خداوندِ قدوس)۔</span>
    </div>
    <div class="term-row">
      <span class="term-name">• ممکن / جائز الوجود:</span>
      <span>جس کا ہونا اور نہ ہونا عقل میں دونوں برابر ہوں، اپنے وجود کے لیے غیر کا محتاج ہو (ساری کائنات)۔</span>
    </div>
    <div class="term-row">
      <span class="term-name">• ترجح بلا مرجح:</span>
      <span>بغیر کسی سبب یا علت کے کسی ایک ممکن پہلو کا خود بخود غالب آ جانا (جو کہ بدیہۃً محال ہے)۔</span>
    </div>
    <div class="term-row">
      <span class="term-name">• تسلسل فی العلل:</span>
      <span>علتوں اور معلولات کی زنجیر کا ماضی کی جانب بغیر کسی آخری علت (واجب) کے لامتناہی چلتے رہنا۔</span>
    </div>
    <div class="term-row">
      <span class="term-name">• تطبیق:</span>
      <span>دو سلسلوں کے افراد کو ایک کے مقابلے میں ایک رکھ کر مقایسہ و موازنہ کرنا۔</span>
    </div>
  </div>

  <!-- SECTION 2: PARAGRAPH-BY-PARAGRAPH MATN & URDU TRANSLATION -->
  <div class="section-title-banner">
    عبارتِ شرح العقائد مع سلیس اردو ترجمہ و تشریح (صفحات ۱۰۲ تا ۱۰۵)
  </div>

  <!-- PAGE 102 -->
  <div class="sub-section-title">صفحہ ۱۰۲: اثباتِ صانعِ عالم اور مفہومِ واجب الوجود</div>

  <div class="matn-arabic-block">
    <strong>[المُحْدِثُ للعالمِ هو الله تعالى]</strong><br>
    «ولما ثبت أن العالم محدث، ومعلوم أن المحدث لا بد له من محدث، ضرورة امتناع ترجح أحد طرفي الممكن من غير مرجح، ثبت أن له محدثاً، <span class="matn-highlight">[والمحدث للعالم هو الله تعالى]</span>، أي الذات الواجب الوجود الذي يكون وجوده من ذاته، ولا يحتاج إلى شيء أصلاً؛ إذ لو كان جائز الوجود لكان من جملة العالم، فلم يصلح محدثاً للعالم ومبدأ له.»
    <div class="hashiya-item">
      📌 <strong>حاشیہ:</strong> قولہ «الواجب الوجود»: تفسیر بأخص الصفات (یعنی اللہ تعالیٰ کی سب سے خاص کلامی صفت واجب الوجود ہونا ہے)۔
    </div>
  </div>

  <div class="urdu-block">
    <strong>سلیس اردو ترجمہ و مفہوم:</strong><br>
    <strong>[جہان کا پیدا کرنے والا اللہ تعالیٰ ہے]</strong><br>
    اور جب یہ بات (پچھلی درسی بحثوں میں) قطعی طور پر ثابت ہو چکی کہ سارا عالم <strong>"مُحدَث"</strong> (نوپیدا، عدم کے بعد وجود میں آنے والا) ہے، اور ہر عقلِ سلیم کے نزدیک یہ بات بدیہی ہے کہ ہر محدَث کے لیے ایک <strong>"مُحدِث"</strong> (پیدا کرنے والا) ناگزیر ہے—کیونکہ ممکن کے دونوں پہلوؤں (وجود یا عدم) میں سے کسی ایک کا بغیر کسی ترجیح دینے والے کے خود بخود غالب آ جانا عقلاً محال ہے—تو یہ ثابت ہو گیا کہ اس کائنات کا ایک پیدا کرنے والا ہے۔<br>
    اور وہ پیدا کرنے والا <strong>اللہ تعالیٰ</strong> ہے، یعنی وہ ذات جو <strong>واجب الوجود</strong> ہے، جس کا وجود خود اس کی اپنی ذات سے ہے اور وہ کسی شے کی محتاج نہیں۔ کیونکہ اگر بالفرض وہ ذات خود ممکن الوجود ہوتی تو وہ اسی کائنات کا ایک فرد بن جاتی، اور جب وہ خود کائنات کا جزو ہوتی تو وہ پوری کائنات کی خالق اور اصل مبدأ بننے کی ہرگز اہل نہ ہو سکتی۔
  </div>

  <!-- PAGE 103 -->
  <div class="sub-section-title">صفحہ ۱۰۳: کیا اثباتِ صانع ابطالِ تسلسل کا محتاج ہے؟ (دفعِ وہم)</div>

  <div class="matn-arabic-block">
    «مع أن العالم اسم لجميع ما يصلح علماً على وجود مبدأ له، وقريب من هذا ما يقال: إن مبدأ الممكنات بأسرها لا بد أن يكون واجبا؛ إذ لو كان ممكنا لكان من جملة الممكنات، فلم يكن مبدأ لها، <span class="matn-highlight">وقد يتوهم أن هذا دليل على وجود الصانع من غير افتقار إلى إبطال التسلسل وليس كذلك</span>، بل هو إشارة إلى أحد أدلة بطلان التسلسل، وهو أنه لو ترتب سلسلة الممكنات لا إلى نهاية لاحتاجت إلى علة، وهي لا يجوز أن تكون نفسها ولا بعضها؛ لاستحالة كون الشيء علة لنفسه ولعلله، بل خارجا عنها فيكون واجباً فتنقطع السلسلة.»
    <div class="hashiya-item">
      📌 <strong>حاشیہ:</strong> قولہ «بأسرها»: أي بتمامها (تمام ممکنات بحیثیتِ مجموعی)۔
    </div>
  </div>

  <div class="urdu-block">
    <strong>سلیس اردو ترجمہ و مفہوم:</strong><br>
    علاوہ ازیں، لفظ "عالم" تو وضع ہی ہر اس موجود کے لیے ہوا ہے جو اپنے بنانے والے کے وجود پر علامت بن سکے۔ اور اسی کے قریب وہ دلیل ہے جو کہی جاتی ہے کہ: "تمام ممکنات کا سرچشمہ لازماً واجب الوجود ہوگا؛ کیونکہ اگر وہ ممکن ہوتا تو وہ خود ممکنات کا ایک فرد ہوتا، لہٰذا وہ ان کا مبدأ نہ بن سکتا"۔<br>
    <strong>علامہ تفتازانیؒ کی نفیس تنبیہ:</strong> اور بسا اوقات کسی کو یہ دھوکا یا وہم ہو سکتا ہے کہ یہ دلیل تسلسل (لامتناہی زنجیر) کو باطل کیے بغیر ہی وجودِ صانع کو تن تنہا ثابت کر دیتی ہے، حالانکہ حقیقت ایسی نہیں ہے! بلکہ یہ استدلال دراصل بطلانِ تسلسل کی دلیل کی طرف ہی اشارہ ہے؛ کیونکہ اگر ممکنات کی زنجیر ماضی کی جانب لامتناہی طور پر مرتب ہو جائے تو یہ پورا لامتناہی مجموعہ کسی علت کا محتاج ہوگا۔ اور وہ علت نہ تو یہ مجموعہ خود ہو سکتا ہے اور نہ اس کا کوئی جزو؛ کیونکہ کسی شے کا خود اپنی علت بننا یا اپنی علتوں کی علت بننا محال ہے۔ لہٰذا وہ علت خارج سے ہوگی تو واجب الوجود ہوگی اور یوں سلسلہ منقطع ہو جائے گا۔
  </div>

  <!-- PAGE 104 -->
  <div class="sub-section-title">صفحہ ۱۰۴: برہانِ تطبیق کا مکمل استدلال اور صیاغت</div>

  <div class="matn-arabic-block">
    «ومن مشهور الأدلة <strong>برهان التطبيق</strong>، وهو أن نفرض من المعلول الأخير إلى غير النهاية جملة، ومما قبله بواحد مثلا إلى غير النهاية جملة أخرى، ثم نطبق الجملتين، بأن نجعل الأول من الجملة الأولى بإزاء الأول من الجملة الثانية، والثاني بالثاني، وهلم جراً، <span class="matn-highlight">فإن كان بإزاء كل واحد من الأولى واحد من الثانية، كان الناقص كالزائد وهو محال</span>، وإن لم يكن فقد وجد في الأولى ما لا يوجد بإزائه شيء في الثانية، <span class="matn-highlight">فتنقطع الثانية وتتناهى، ويلزم منه تناهي الأولى</span>؛ لأنها لا تزيد على الثانية إلا بقدر متناه، والزائد على المتناهي بقدر متناه يكون متناهيا بالضرورة، وهذا التطبيق إنما يمكن فيما دخل تحت الوجود ...»
    <div class="hashiya-item">
      📌 <strong>حاشیہ:</strong> قولہ «بواحد مثلاً»: أي بمرتبة واحدة (یعنی ایک درجے یا معلول کے فاصلے سے)۔
    </div>
  </div>

  <div class="urdu-block">
    <strong>سلیس اردو ترجمہ و مفہوم (برہانِ تطبیق کی صورت):</strong><br>
    اور ابطالِ تسلسل کے مشہور ترین دلائل میں سے "برہانِ تطبیق" (آمنے سامنے جوڑ کر موازنہ کرنے کی دلیل) ہے۔ اور اس کا طریقہ یہ ہے کہ:<br>
    ہم حال میں موجود آخری معلول سے لے کر ماضی کی غیر متناہی جانب تک کے معلولات کا ایک مجموعہ فرض کریں (جسے <strong>الجملة الأولى</strong> کہا جائے گا)، اور اس سے ایک درجہ پہلے والے معلول سے لے کر ماضی کی غیر متناہی جانب تک دوسرا مجموعہ فرض کریں (جسے <strong>الجملة الثانية</strong> کہا جائے گا)۔ پھر ہم دونوں سلسلوں کے درمیان تطبیق دیں، یعنی پہلے کے سامنے پہلا، دوسرے کے سامنے دوسرا، اور اسی طرح پیچھے چلتے جائیں۔ اب عقل کے سامنے دو ہی راہیں ہیں:<br>
    <strong>۱. شق اول (محال):</strong> اگر پہلے سلسلے کے ہر فرد کے مقابلے میں دوسرے سلسلے کا ایک فرد رہے، تو ناقص (جس میں سے ایک کم کیا گیا تھا) بالکل زائد کے برابر ہو جائے گا، اور ناقص کا زائد کے برابر ہونا کھلا تضاد اور عقلاً محال ہے!<br>
    <strong>۲. شق دوم (ثبوتِ تناہی):</strong> اور اگر ہر ایک کے مقابلے میں دوسرا نہ رہے، تو دوسرے سلسلے کے افراد ختم ہو جائیں گے اور وہ متناہی ہو جائے گا۔ اور جب دوسرا متناہی ہو گیا تو پہلے کا متناہی ہونا بھی لازمی ٹھہرا؛ کیونکہ پہلا سلسلہ دوسرے سے صرف ایک متناہی مقدار (ایک معلول) زائد تھا، اور متناہی میں متناہی کا اضافہ بالضرورہ متناہی ہی ہوتا ہے!
  </div>

  <!-- PAGE 105 -->
  <div class="sub-section-title">صفحہ ۱۰۵: دو اعتراضات (نقوض) کا جواب اور توحیدِ باری تعالیٰ کا اثبات</div>

  <div class="matn-arabic-block">
    «دون ما هو وهمي محض، فإنه ينقطع بانقطاع الوهم، <span class="matn-highlight">فلا يرد النقض بمراتب العدد</span> بأن تطبق جملتان إحداهما من الواحد لا إلى نهاية، والثانية من الاثنين لا إلى نهاية، <span class="matn-highlight">ولا بمعلومات الله تعالى ومقدوراته</span>، فإن الأولى أكثر من الثانية، مع لا تناهيهما؛ وذلك لأن معنى لا تناهي الأعداد والمعلومات والمقدورات: أنها لا تنتهي إلى حد لا يتصور فوقه آخر، لا بمعنى: أن ما لا نهاية له يدخل في الوجود، فإنه محال، <strong>[الواحد يعني]</strong> أن صانع العالم واحد، ولا يمكن أن يصدق مفهوم واجب الوجود، إلا على ذات واحدة.»
    <div class="hashiya-item">
      📌 <strong>حاشیہ:</strong> قولہ «الأولى»: أي المعلومات، قولہ «الثانية»: أي المقدورات (کیونکہ علم واجب، ممکن، ممتنع سب سے متعلق ہے جبکہ قدرت فقط ممکنات سے)۔
    </div>
  </div>

  <div class="urdu-block">
    <strong>سلیس اردو ترجمہ و مفہوم:</strong><br>
    اور یہ تطبیق صرف ان چیزوں میں ممکن ہے جو حقیقت کے ساتھ عالمِ خارج میں داخلِ وجود ہوں، نہ کہ محض وہمی اور فرضی چیزوں میں؛ کیونکہ وہمی چیزیں تو وہم کے رکنے سے ہی منقطع ہو جاتی ہیں۔<br>
    لہٰذا برہانِ تطبیق پر نہ تو <strong>گنتی کے اعداد کا نقض</strong> آئے گا (کہ ۱ سے لامتناہی اور ۲ سے لامتناہی میں تطبیق دی جائے)، اور نہ ہی <strong>اللہ تعالیٰ کی معلومات اور مقدورات کا نقض</strong> آئے گا (کہ معلومات مقدورات سے زائد ہیں حالانکہ دونوں لامتناہی ہیں)؛ کیونکہ اعداد، معلومات اور مقدورات کے لامتناہی ہونے کا معنی یہ ہے کہ وہ کسی ایسی حد پر نہیں رکتے جس کے آگے مزید تصور نہ ہو سکے (عدم الوقوف عند حد)، نہ یہ کہ کوئی غیر متناہی مجموعہ خارج میں بالفعل وجود میں آ چکا ہو، کیونکہ یہ تو بالاتفاق محال ہے۔<br>
    <strong>[اور صانع کا ایک ہونا]:</strong> جہان کا پیدا کرنے والا ایک ہی ہے؛ کیونکہ "واجب الوجود" کا حقیقی مفہوم سوائے ایک ہی ذاتِ یکتا کے کسی اور پر صادق آ ہی نہیں سکتا۔
  </div>

  <!-- SECTION 3: LOGICAL ARCHITECTURE FLOWCHART -->
  <div class="section-title-banner">شجرۂ استدلالِ کلامی (Logical Deduction Architecture)</div>
  <table class="flowchart-table">
    <tr>
      <td style="width: 50%;">
        <span class="flow-badge">مقدمہ اولیٰ (العالم متغیر)</span><br>
        <strong>کائنات متغیر ہے اور ہر متغیر عدم کے بعد وجود میں آتا ہے:</strong><br>
        ساری کائنات زمان، مکان اور اجسام کے تغیر کی زد میں ہے، لہٰذا کائنات حادث (محدث) ہے۔
      </td>
      <td style="width: 50%;">
        <span class="flow-badge">مقدمہ ثانیہ (امتناع ترجح بلا مرجح)</span><br>
        <strong>ہر حادث کے لیے ایک محدث لازمی ہے:</strong><br>
        ممکن کے لیے وجود اور عدم دونوں برابر ہیں۔ عدم کے مقابلے میں وجود کا پلڑا کسی سبب (مرجح) کے بغیر خود بخود نہیں جھک سکتا۔
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <span class="flow-badge">تقسیم عقلی للمحدث (محدث کی نوعیت کیا ہے؟)</span>
        <div class="dilemma-box">
          <div class="dilemma-card warning">
            <div class="dilemma-title">الاحتمال الأول (باطل بالبرہان): محدث خود ممکن ہو</div>
            اگر بنانے والا ممکن ہوگا تو وہ خود کائنات کا فرد ہوگا اور اپنی علت کا محتاج ہوگا۔ اس سے دو راہیں نکلیں گی:
            <br>• <strong>دور (Circle):</strong> الف، ب کی علت بنے اور ب، الف کی۔ (باطل بالضرورہ)
            <br>• <strong>تسلسل (Infinite Regress):</strong> علتوں کی لامتناہی زنجیر۔ (باطل ببرہان التطبیق)
          </div>
          <div class="dilemma-card success">
            <div class="dilemma-title">الاحتمال الثاني (ثابت قطعی): محدث واجب الوجود ہو</div>
            جب علت تمام ممکنات کی زنجیر سے خارج ہوگی تو وہ بالضرورہ واجب الوجود ہوگی، جس کا وجود ذاتی ہے اور وہ کسی کی محتاج نہیں۔
            <br><strong>النتیجہ الحتمیہ:</strong> صانعِ عالم واجب الوجود ہے اور وہ اللہ سبحانہ وتعالیٰ ہے، اور علتوں کی زنجیر یہیں رک جاتی ہے۔
          </div>
        </div>
      </td>
    </tr>
  </table>

  <!-- SECTION 4: BURHAN AL-TATBIQ DETAILED PROOF & DILEMMA -->
  <div class="section-title-banner">برہانِ تطبیق کی تفصیلی و ریاضیاتی تفہیم (The Proof Mechanism)</div>
  <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; margin-bottom: 10px;">
    <strong>دو سلسلوں کی تفریق:</strong>
    <div style="margin: 6px 0; font-size: 9pt;">
      • <strong>الجملة الأولى (سلسلہ A):</strong> موجودہ معلول (آخری اثر) سے لے کر ماضی کی لامتناہی سمت تک: [معلول ۱، معلول ۲، معلول ۳، معلول ۴ ... ∞]<br>
      • <strong>الجملة الثانية (سلسلہ B):</strong> پہلے معلول سے ایک درجہ چھوڑ کر ماضی کی لامتناہی سمت تک: [معلول ۲، معلول ۳، معلول ۴ ... ∞]
    </div>
    <div class="dilemma-box mt-2">
      <div class="dilemma-card warning">
        <div class="dilemma-title">شقِ اول: تطبیق ہر ہر فرد کے سامنے ہو (محال)</div>
        «كان الناقص كالزائد وهو محال»<br>
        سلسلہ B میں سے ایک معلول کم کیا گیا تھا۔ اگر وہ پھر بھی سلسلہ A کے عین برابر رہے، تو (س - ۱) = س لازم آئے گا، یعنی جزو کل کے برابر ہو جائے گا جو کہ عقل اور ریاضی کا صریح تضاد ہے۔
      </div>
      <div class="dilemma-card success">
        <div class="dilemma-title">شقِ ثانی: سلسلہ B منقطع ہو جائے (ثبوتِ تناہی)</div>
        «فتنقطع الثانية وتتناهى، ويلزم منه تناهي الأولى»<br>
        اگر سلسلہ B منقطع ہو جائے تو وہ متناہی (محدود) ٹھہرا۔ اور چونکہ سلسلہ A اس سے صرف ایک متناہی عدد (۱ معلول) زیادہ ہے: [Finite + 1 = Finite]، لہٰذا سلسلہ اولیٰ بھی لازماً متناہی ہو گیا۔
      </div>
    </div>
  </div>

  <!-- SECTION 5: MODERN PHILOSOPHY & CONTEMPORARY SCIENCE BRIDGE -->
  <div class="section-title-banner">پل: روایتی علم الکلام اور جدید فلسفہ و سائنس (Modern Synthesis)</div>

  <div class="modern-card">
    <div class="modern-title-row">
      <span>۱. واجب الوجود بمقابلہ ممکن الوجود</span>
      <span>Necessary Being vs Contingent Being</span>
    </div>
    ماڈرن موڈل لاجک (Modal Logic) میں واجب الوجود وہ ہستی ہے جو تمام ممکنہ جہانوں میں موجود ہو (□∃x)۔ وہ کسی مادی اجزاء، فزیکل کنڈیشن یا خارجی علت کی محتاج نہیں، جبکہ تمام مادی کائنات اور طبعی قوانین "Contingent" (ممکن) ہیں جن کا نہ ہونا منطقی تضاد پیدا نہیں کرتا۔
  </div>

  <div class="modern-card">
    <div class="modern-title-row">
      <span>۲. امتناع ترجح بلا مرجح</span>
      <span>The Principle of Sufficient Reason (PSR)</span>
    </div>
    لیبنز اور جدید اینالیٹک فلاسفہ کا بنیادی اصول: "Nothing exists without a reason why it exists rather than not"۔ جیسے بالکل برابر ترازو بغیر کسی خارجی وزن یا جھکانے والے کے خود بخود کسی ایک طرف نہیں جھک سکتا، ویسے ہی کائنات عدم کے مقابلے میں خود بخود وجود پذیر نہیں ہو سکتی۔
  </div>

  <div class="modern-card">
    <div class="modern-title-row">
      <span>۳. کائنات کا آغاز (العالم محدث)</span>
      <span>Big Bang, BGV Theorem & Thermodynamics</span>
    </div>
    جدید فلکیات نے ارسطو کے نظریہ ازلیتِ مادہ کو رد کر کے ثابت کیا کہ وقت اور مادہ کا آغاز ہوا ہے۔ تھرموڈائنامکس کا دوسرا قانون (اینٹروپی) بتاتا ہے کہ اگر کائنات ازلی ہوتی تو لامتناہی وقت پہلے ہی ٹھنڈی ہو کر حرارتی موت کا شکار ہو چکی ہوتی۔ 2003 کا بورڈے-گوتھ-ولینکن تھیورم (BGV) ثابت کرتا ہے کہ پھیلنے والی ہر کائنات کا ایک مطلق آغاز لازمی ہے۔
  </div>

  <div class="modern-card">
    <div class="modern-title-row">
      <span>۴. بالفعل لامتناہیت کا محال ہونا (ڈیوڈ ہلبرٹ)</span>
      <span>Actual Infinite vs Potential Infinite</span>
    </div>
    عظیم جرمن ریاضی دان ڈیوڈ ہلبرٹ نے واضح کیا کہ خارجی حقیقی دنیا میں "بالفعل لامتناہی اشیاء کا جمع ہونا" تضاد سے خالی نہیں: <em>"The infinite is nowhere to be found in reality"</em>۔ ہلبرٹ کے لامتناہی ہوٹل کی تمثیل یہی ثابت کرتی ہے کہ تخیل اور وہم میں تو انفینٹی کا کھیل چل سکتا ہے مگر خارج میں نہیں!
  </div>

  <!-- 3 VISUAL METAPHORS SUMMARY -->
  <div class="sub-section-title">طلبہ کے لیے ۳ بصری استعارات:</div>
  <div style="font-size: 8.8pt; line-height: 1.7; margin-bottom: 10px;">
    <strong>۱. ٹرین کے ڈبے اور خود مختار انجن:</strong> ٹرین کے تمام ڈبے صرف قوت آگے منتقل کرتے ہیں مگر خود قوت پیدا نہیں کر سکتے۔ اگر لامتناہی ڈبے جوڑ دیے جائیں لیکن کوئی انجن (واجب الوجود) نہ ہو، تو ٹرین ایک انچ بھی آگے نہیں بڑھ سکتی۔<br>
    <strong>۲. ہلبرٹ کا لامتناہی ہوٹل:</strong> پورے لامتناہی مہمان نکالنے کے بعد بھی لامتناہی مہمان باقی رہتے ہیں؛ جو ثابت کرتا ہے کہ حقیقتِ خارجیہ میں ناقص کبھی زائد کے برابر نہیں ہو سکتا۔<br>
    <strong>۳. ڈومینو اثر اور موجودہ دن:</strong> گرتے ہوئے ڈومینو اگر لامتناہی ماضی سے گر رہے ہوتے تو وہ کبھی آج کے دن کے ڈومینو تک نہ پہنچ پاتے۔ چونکہ ہم آج موجود ہیں، اس کا ثبوت ہے کہ ماضی کا سلسلہ ایک معین نقطے سے شروع ہوا ہے۔
  </div>

  <!-- SECTION 6: REFUTATION OF OBJECTIONS & TAWHEED -->
  <div class="section-title-banner">برہانِ تطبیق پر شبہات (نقوض) کا رد اور توحیدِ باری تعالیٰ</div>

  <div class="obj-card">
    <div class="obj-title">نقض اول: مراتبِ عدد (گنتی کے اعداد کا اعتراض)</div>
    <strong>اعتراض:</strong> اگر عدد ۱ سے لامتناہی اور عدد ۲ سے لامتناہی کا موازنہ کریں تو تطبیق کے باوجود دونوں غیر متناہی رہتے ہیں۔ تو کیا تطبیق غلط ہو گئی؟<br>
    <div class="ans-box">
      <strong>علامہ تفتازانیؒ کا رد:</strong> اعداد امورِ وہمیہ ہیں، ان کا عالمِ خارج میں کوئی مادی اور حقیقی وجود نہیں ہے کہ اربوں اعداد بیک وقت خارج میں جمع ہو چکے ہوں۔ اور وہمی چیزیں جیسے ہی انسان سوچنا بند کرتا ہے ختم ہو جاتی ہیں («فإنه ينقطع بانقطاع الوهم»)، جبکہ تسلسل کا دعویٰ خارج میں موجود علتوں کے متعلق تھا۔
    </div>
  </div>

  <div class="obj-card">
    <div class="obj-title">نقض دوم: معلومات اور مقدوراتِ الٰہیہ کا اعتراض</div>
    <strong>اعتراض:</strong> اللہ کا علم قدرت سے وسیع تر ہے (کیونکہ علم واجب، ممکن، ممتنع سب کو گھیرے ہوئے ہے جبکہ قدرت صرف ممکنات سے متعلق ہے)۔ پھر بھی دونوں لامتناہی ہیں تو زائد و ناقص کیسے مساوی رہے؟<br>
    <div class="ans-box">
      <strong>علامہ تفتازانیؒ کا رد:</strong> معلومات اور مقدورات کے لامتناہی ہونے کا مطلب ہے «أنها لا تنتهي إلى حد لا يتصور فوقه آخر» یعنی ان کی کوئی ایسی آخری حد نہیں جس کے آگے مزید تصور نہ کیا جا سکے (عدم الوقوف عند حد)۔ اس کا یہ مطلب ہرگز نہیں کہ لامتناہی اشیاء بالفعل خارج میں داخلِ وجود ہو چکی ہیں!
    </div>
  </div>

  <div style="background: #f0fdf4; border: 1.5px solid #22c55e; border-radius: 6px; padding: 8px 12px; margin-bottom: 12px;">
    <strong style="color: #15803d; font-size: 10pt;">توحیدِ باری تعالیٰ کا ثبوت: [الواحد يعني أن صانع العالم واحد]</strong><br>
    <span style="font-size: 8.8pt; line-height: 1.7; color: #166534;">
      جب یہ ثابت ہو گیا کہ کائنات کی علت ایک واجب الوجود ہستی پر ختم ہوتی ہے، تو علامہ تفتازانیؒ فرماتے ہیں کہ "واجب الوجود" کا حقیقی مفہوم سوائے ایک ہی یکتا ذات کے دو ہستیوں پر صادق آ ہی نہیں سکتا؛ ورنہ ان میں امتیاز کے لیے کسی صفت یا شرط کی احتیاج لازم آئے گی، اور جو محتاج ہو وہ واجب الوجود نہیں رہ سکتا۔ پس کائنات کا خالق فقط اللہ وحدہ لا شریک لہ ہے۔
    </span>
  </div>

  <!-- SECTION 7: QUIZ & ASSESSMENT QUESTIONS WITH ANSWERS -->
  <div class="section-title-banner">امتحانی سوالات و خود آزمائی (Assessment Questions & Answers)</div>

  <div class="quiz-card">
    <div class="quiz-q">سوال ۱: امام تفتازانیؒ نے برہانِ تطبیق میں "الجملة الأولى" اور "الجملة الثانية" کس طرح فرض فرمائی ہیں؟</div>
    <div>جملہ اولیٰ کو حال میں موجود معلولِ اخیر سے لے کر ماضی کی لامتناہی جانب فرض کیا گیا، اور جملہ ثانیہ کو اس سے ایک درجہ پہلے والے معلول سے لے کر ماضی کی لامتناہی جانب فرض کیا گیا۔</div>
    <span class="quiz-ans">درست بنیاد: «نفرض من المعلول الأخير إلى غير النهاية جملة، ومما قبله بواحد مثلا إلى غير النهاية جملة أخرى»</span>
  </div>

  <div class="quiz-card">
    <div class="quiz-q">سوال ۲: برہانِ تطبیق کی شقِ ثانی میں اگر جملہ ثانیہ منقطع ہو جائے تو اس سے جملہ اولیٰ کا متناہی ہونا کیسے لازم آتا ہے؟</div>
    <div>کیونکہ جملہ اولیٰ دوسرے سلسلے سے صرف ایک متناہی مقدار (۱ معلول) زیادہ ہے، اور متناہی میں متناہی جمع کرنے سے حاصل ہونے والا مجموعہ بالضرورہ متناہی ہی ہوتا ہے۔</div>
    <span class="quiz-ans">منطقی قاعدہ: «والزائد على المتناهي بقدر متناه يكون متناهيا بالضرورة»</span>
  </div>

  <div class="quiz-card">
    <div class="quiz-q">سوال ۳: برہانِ تطبیق پر "مراتبِ عدد" (گنتی کے اعداد) کا نقض کیوں وارد نہیں ہوتا؟</div>
    <div>کیونکہ اعداد کا عالمِ خارج میں کوئی مادی و حقیقی وجود نہیں، وہ محض انسانی ذہن کے فرضی تصورات اور امورِ وہمیہ ہیں جو وہم کے رکنے سے منقطع ہو جاتے ہیں۔</div>
    <span class="quiz-ans">کلامی ضابطہ: «وهذا التطبيق إنما يمكن فيما دخل تحت الوجود دون ما هو وهمي محض»</span>
  </div>

  <div class="quiz-card">
    <div class="quiz-q">سوال ۴: کلامی اصطلاح "واجب الوجود" کا جدید اینالیٹک فلسفے میں درست متبادل کیا ہے؟</div>
    <div>"Ontologically Necessary Being" یا "Unconditioned Reality" یعنی وہ حقیقت جس کا نہ ہونا وجودی و منطقی طور پر ناممکن ہو اور وہ تمام ممکنہ جہانوں (Possible Worlds) میں بالذات موجود ہو۔</div>
    <span class="quiz-ans">جدید اصطلاح: Alvin Plantinga & Richard Swinburne کی اینالیٹک تھیالوجی کا لازمی مفہوم</span>
  </div>

  <!-- FOOTER -->
  <div style="text-align: center; border-top: 1px solid #cbd5e1; padding-top: 8px; margin-top: 14px; font-size: 8pt; color: #64748b;">
    جامع درسی انسائیکلوپیڈیا • شرح العقائد النسفية (صفحات ۱۰۲ تا ۱۰۵) • مدرسہ لرننگ مینجمنٹ سسٹم (KUI LMS)
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
    console.log('Burhan-Tatbiq Master Topic PDF saved at:', MASTER_PDF_PATH);
    await pageMaster.close();

    /* ==============================================================
       2. GENERATE LECTURE NOTES PDF (A4 Portrait - Paragraph-by-Paragraph)
       ============================================================== */
    console.log('Generating Burhan-Tatbiq Lecture Notes PDF...');
    const pageNotes = await browser.newPage();

    const notesHTML = `
<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>شرح العقائد النسفية | درسی نوٹس و خلاصۂ کلام</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm 14mm 16mm 14mm;
      @top-center {
        content: "شرح العقائد النسفية • درسی نوٹس و خلاصۂ کلام (إثبات الصانع وبرهان التطبيق)";
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
    .matn-ar {
      background: #fafaf9;
      border-right: 3.5px solid #b48c28;
      padding: 8px 10px;
      font-family: 'Amiri', serif;
      font-size: 12pt;
      line-height: 1.95;
      color: #0f172a;
      margin-bottom: 6px;
      page-break-inside: avoid;
    }
    .trans-ur {
      background: #f0fdf4;
      border-right: 3.5px solid #16a34a;
      padding: 8px 10px;
      font-family: 'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif;
      font-size: 9.8pt;
      line-height: 2.05;
      color: #14532d;
      margin-bottom: 10px;
      page-break-inside: avoid;
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
    <h1>شرح العقائد النسفية | درسی نوٹس و خلاصۂ کلام</h1>
    <div style="font-size: 9pt; color: #475569;">المُحْدِثُ للعالم هو الله تعالى • بطلان التسلسل • برهان التطبيق • رد النقوض والتوحيد</div>
  </div>

  <div class="note-section-title">۱. متنِ عقائد اور اثباتِ صانع (صفحہ ۱۰۲)</div>
  <div class="matn-ar">
    <strong>[المُحْدِثُ للعالمِ هو الله تعالى]</strong><br>
    «ولما ثبت أن العالم محدث، ومعلوم أن المحدث لا بد له من محدث، ضرورة امتناع ترجح أحد طرفي الممكن من غير مرجح، ثبت أن له محدثاً، [والمحدث للعالم هو الله تعالى]، أي الذات الواجب الوجود الذي يكون وجوده من ذاته، ولا يحتاج إلى شيء أصلاً؛ إذ لو كان جائز الوجود لكان من جملة العالم، فلم يصلح محدثاً للعالم ومبدأ له.»
  </div>
  <div class="trans-ur">
    <strong>خلاصۂ مفہوم:</strong> کائنات کا حادث ہونا پہلے ثابت ہو چکا۔ ممکن کے دونوں پہلو (ہونا یا نہ ہونا) عقل میں برابر ہیں، اور کسی جھکانے والے (مرجح) کے بغیر ایک کا غالب آنا محال ہے۔ لہٰذا کائنات کا صانع ہونا ضروری ہے اور وہ اللہ سبحانہ وتعالیٰ ہے جو "واجب الوجود" ہے (جس کا وجود ذاتی ہے اور وہ غیر کا محتاج نہیں)۔ اگر وہ ممکن ہوتا تو خود کائنات کا فرد ہوتا اور پوری کائنات کا خالق نہ بن سکتا۔
  </div>

  <div class="note-section-title">۲. تنبیہِ تفتازانیؒ: بطلانِ تسلسل کی ناگزیریت (صفحہ ۱۰۳)</div>
  <div class="matn-ar">
    «وقد يتوهم أن هذا دليل على وجود الصانع من غير افتقار إلى إبطال التسلسل وليس كذلك، بل هو إشارة إلى أحد أدلة بطلان التسلسل، وهو أنه لو ترتب سلسلة الممكنات لا إلى نهاية لاحتاجت إلى علة، وهي لا يجوز أن تكون نفسها ولا بعضها؛ لاستحالة كون الشيء علة لنفسه ولعلله، بل خارجا عنها فيكون واجباً فتنقطع السلسلة.»
  </div>
  <div class="trans-ur">
    <strong>درسی نکتہ:</strong> اگر کوئی یہ کہے کہ "ممکنات کا مجموعہ بہرحال ممکن ہے اس لیے اس کا مبدأ خارج میں واجب ہوگا اور تسلسل کے رد کی ضرورت نہیں"، تو یہ وہم ہے۔ کیونکہ اگر لامتناہی زنجیر خارج میں ممکن مان لی جائے تو ملحد یہ دعویٰ کر سکتا ہے کہ مجموعے کی علت اسی مجموعے کا کوئی ماضی کا فرد ہے۔ لہٰذا یہ ثابت کرنا ناگزیر ہے کہ کوئی ممکن اپنی ہی علت اور اپنے اسباب کی علت نہیں بن سکتا اور لامتناہی زنجیر محال ہے۔
  </div>

  <div class="note-section-title">۳. برہانِ تطبیق کی صیاغت اور دو شقیں (صفحہ ۱۰۴)</div>
  <div class="matn-ar">
    «ومن مشهور الأدلة برهان التطبيق، وهو أن نفرض من المعلول الأخير إلى غير النهاية جملة، ومما قبله بواحد مثلا إلى غير النهاية جملة أخرى، ثم نطبق الجملتين، بأن نجعل الأول من الجملة الأولى بإزاء الأول من الجملة الثانية، والثاني بالثاني، وهلم جراً، فإن كان بإزاء كل واحد من الأولى واحد من الثانية، كان الناقص كالزائد وهو محال، وإن لم يكن فقد وجد في الأولى ما لا يوجد بإزائه شيء في الثانية، فتنقطع الثانية وتتناهى، ويلزم منه تناهي الأولى؛ لأنها لا تزيد على الثانية إلا بقدر متناه، والزائد على المتناهي بقدر متناه يكون متناهيا بالضرورة.»
  </div>
  <div class="trans-ur">
    <strong>برہان کا خلاصہ:</strong> دو سلسلوں (A: معلولِ اخیر سے لامتناہی، اور B: ایک درجہ پیچھے سے لامتناہی) کی تطبیق دی جائے۔<br>
    • اگر B کا ہر فرد A کے برابر رہے تو <strong>الناقص كالزائد</strong> لازم آئے گا جو کہ باطل ہے۔<br>
    • اگر B ختم ہو جائے تو B متناہی ہوا، اور A چونکہ B سے صرف ۱ متناہی معلول زیادہ ہے، لہٰذا A بھی متناہی ہو جائے گا! پس تسلسل دونوں طرح باطل ہے۔
  </div>

  <div class="note-section-title">۴. دو شبہات اور ان کا حل (صفحہ ۱۰۵)</div>
  <div class="point-card">
    <div class="point-title">• شرطِ تطبیق (دخل تحت الوجود):</div>
    تطبیق صرف ان امور میں ممکن ہے جو خارج میں حقیقت کے ساتھ بیک وقت موجود ہوں، نہ کہ امورِ وہمیہ میں۔
  </div>
  <div class="point-card">
    <div class="point-title">• نقضِ اعداد کا جواب:</div>
    اعداد کا خارج میں کوئی مادی وجود نہیں، یہ ذہن کے فرضی تصورات ہیں جو سوچ بند کرنے سے منقطع ہو جاتے ہیں۔
  </div>
  <div class="point-card">
    <div class="point-title">• معلومات و مقدورات کے نقض کا جواب:</div>
    ان کے غیر متناہی ہونے کا معنی یہ ہے کہ ان کی کوئی ایسی آخری حد نہیں جس کے اوپر مزید تصور نہ ہو سکے (عدم الوقوف عند حد)، نہ یہ کہ لامتناہی اشیاء خارج میں داخلِ وجود ہو چکی ہوں۔
  </div>
  <div class="point-card">
    <div class="point-title">• توحیدِ باری تعالیٰ:</div>
    واجب الوجود کا مفہوم سوائے ایک یکتا ذات کے متعدد ہستیوں پر صادق نہیں آ سکتا، ورنہ امتیاز کے لیے احتیاج لازم آئے گی جو وجوبِ ذاتی کے تضاد میں ہے۔
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
    console.log('Burhan-Tatbiq Lecture Notes PDF saved at:', NOTES_PDF_PATH);
    await pageNotes.close();

    /* ==============================================================
       3. GENERATE SLIDES PDF (A4 Landscape - Structured Presentation)
       ============================================================== */
    console.log('Generating Burhan-Tatbiq Presentation Slides PDF (8 Landscape Slides)...');
    const pageSlides = await browser.newPage();

    const slidesData = [
      {
        num: 1,
        tag: 'تعارف و تمہید',
        title: 'شرح العقائد النسفية: إثبات الصانع ومفهوم واجب الوجود',
        sub: 'صفحات ۱۰۲ تا ۱۰۵ | درسِ نظامی علم الکلام',
        cards: [
          { title: 'العالم حادث', text: 'کائنات کی ہر چیز متغیر ہے، اور ہر متغیر عدم کے بعد وجود میں آتا ہے، پس عالم حادث ہے۔' },
          { title: 'امتناع ترجح بلا مرجح', text: 'ممکن کے لیے وجود اور عدم دونوں برابر ہیں، بغیر کسی سبب کے وجود کا پلڑا نہیں جھک سکتا۔' },
          { title: 'المحدث هو الله تعالى', text: 'کائنات کا خالق واجب الوجود ہے، جس کا وجود ذاتی ہے اور وہ کسی علت کا محتاج نہیں۔' }
        ]
      },
      {
        num: 2,
        tag: 'منطقی تقسیم',
        title: 'صانعِ عالم کے بارے میں دو بنیادی عقلی احتمالات',
        sub: 'کیوں صانع فقط واجب الوجود ہی ہو سکتا ہے؟',
        cards: [
          { title: 'الاحتمال الأول: صانع ممکن ہو (باطل)', text: 'اگر صانع ممکن ہوگا تو وہ کائنات کا جزو ہوگا اور علت کا محتاج ہوگا۔ اس سے دور یا تسلسل لازم آئے گا۔' },
          { title: 'دور کی خرابی (Vicious Circle)', text: 'کسی شے کا اپنے ہی سبب کا سبب بننا بالبدیہہ محال ہے۔' },
          { title: 'الاحتمال الثاني: صانع واجب ہو (ثابت)', text: 'جب صانع ممکنات سے خارج ہوگا تو واجب الوجود ہوگا اور علتوں کی زنجیر یہیں کٹ جائے گی۔' }
        ]
      },
      {
        num: 3,
        tag: 'بطلانِ تسلسل',
        title: 'تسلسل فی العلل کا عقلی بطلان (Infinite Regress)',
        sub: 'کیوں علتوں کی لامتناہی زنجیر ماضی میں ناممکن ہے؟',
        cards: [
          { title: 'روزمرہ مثال: کیشئر اور دستخط', text: 'اگر کیشئر رقم دینے کے لیے لامتناہی منیجروں کے دستخط کی شرط لگاتا جائے، تو رقم کبھی ادا نہیں ہو سکتی۔' },
          { title: 'ٹرین کے ڈبے اور انجن', text: 'ٹرین کے تمام بوگیاں صرف قوت منتقل کرتی ہیں، جب تک طاقتور خود مختار انجن نہ ہو ٹرین نہیں چل سکتی۔' },
          { title: 'ڈومینو اثر اور حال کا وجود', text: 'چونکہ ہم آج کے دن میں زندہ موجود ہیں، پس ماضی کا سلسلہ مکمل ہو چکا ہے اور جو مکمل ہو وہ متناہی ہے۔' }
        ]
      },
      {
        num: 4,
        tag: 'برہانِ تطبیق',
        title: 'برہانِ تطبیق کی صیاغت اور دونوں سلسلوں کا قیام',
        sub: 'امام تفتازانیؒ کی قاطع عقلی و ریاضیاتی دلیل',
        cards: [
          { title: 'الجملة الأولى (سلسلہ A)', text: 'حال میں موجود معلولِ اخیر سے لے کر ماضی کی لامتناہی جانب تمام معلولات کا مجموعہ۔' },
          { title: 'الجملة الثانية (سلسلہ B)', text: 'معلولِ اخیر سے ایک درجہ چھوڑ کر پیچھے کی لامتناہی جانب تمام معلولات کا مجموعہ۔' },
          { title: 'طریقۂ تطبیق', text: 'سلسلہ A کے پہلے کے بالمقابل سلسلہ B کا پہلا، دوسرے کے سامنے دوسرا، اور اسی ترتیب سے مقایسہ۔' }
        ]
      },
      {
        num: 5,
        tag: 'عقلی تردید',
        title: 'برہانِ تطبیق کی دو عقلی شقیں اور ریاضیاتی ثبوت',
        sub: 'الترديد العقلي: إما أن يوجد بإزاء كل واحد أو لا',
        cards: [
          { title: 'الشق الأول (محال): الناقص كالزائد', text: 'اگر B کا ہر فرد A کے برابر رہے، تو (س - ۱) = س لازم آئے گا، یعنی ناقص زائد کے برابر ہو جائے گا جو کہ باطل ہے۔' },
          { title: 'الشق الثاني (ثابت): سلسلہ B کا خاتمہ', text: 'اگر B منقطع ہو جائے تو وہ متناہی ہوا۔ اور متناہی میں متناہی جمع کرنے سے نتیجہ متناہی ہی ہوتا ہے۔' },
          { title: 'النتیجہ الحتمیہ', text: 'A = B + 1 = Finite + 1 = Finite! پس دونوں صورتوں میں لامتناہی سلسلہ محال ثابت ہوا۔' }
        ]
      },
      {
        num: 6,
        tag: 'جدید سائنس و فلسفہ',
        title: 'پل: کلامی دلائل اور جدید کاسمولوجی و میٹا فزکس',
        sub: 'Modern Analytical Philosophy & Cosmology',
        cards: [
          { title: 'BGV Theorem & Big Bang', text: '2003 کا بورڈے-گوتھ-ولینکن تھیورم ثابت کرتا ہے کہ پھیلنے والی کائنات کا ایک مطلق آغاز (محدث) لازمی ہے۔' },
          { title: 'Entropy (تھرموڈائنامکس)', text: 'اگر کائنات ازلی ہوتی تو لامتناہی وقت پہلے حرارتی موت کا شکار ہو چکی ہوتی۔ حرارت کا باقی رہنا آغاز کا ثبوت ہے۔' },
          { title: 'David Hilbert کا ہوٹل', text: 'ریاضی دان ہلبرٹ نے ثابت کیا کہ خارجی مادی دنیا میں بالفعل لامتناہی اشیاء کا وجود تضادات سے بھرپور ہے۔' }
        ]
      },
      {
        num: 7,
        tag: 'ردِ نقوض',
        title: 'برہانِ تطبیق پر وارد ہونے والے دو شبہات کا حل',
        sub: 'صفحہ ۱۰۵: مراتبِ عدد اور معلوماتِ الٰہیہ کا جواب',
        cards: [
          { title: 'شرطِ تطبیق', text: '«إنما يمكن فيما دخل تحت الوجود دون ما هو وهمي محض» تطبیق فقط خارج میں موجود امور میں ممکن ہے۔' },
          { title: 'جوابِ نقضِ اعداد', text: 'اعداد کا خارج میں کوئی مادی وجود نہیں، یہ محض ذہنی و وہمی گنتی ہے جو سوچ بند کرنے سے ختم ہو جاتی ہے۔' },
          { title: 'جوابِ نقضِ معلومات', text: 'عدمِ تناہی کا مطلب ہے کہ ان کے آگے کوئی آخری حد نہیں، نہ یہ کہ لامتناہی افراد خارج میں داخلِ وجود ہو چکے ہیں۔' }
        ]
      },
      {
        num: 8,
        tag: 'خاتمہ و توحید',
        title: 'صانع کا ایک ہونا اور خلاصۂ امتحانی نکات',
        sub: '«الواحد يعني أن صانع العالم واحد ولا يصدق مفهوم واجب الوجود إلا على ذات واحدة»',
        cards: [
          { title: 'توحیدِ باری تعالیٰ', text: 'واجب الوجود کا مفہوم سوائے ایک یکتا ذات کے کسی اور پر صادق نہیں آ سکتا، ورنہ امتیاز کے لیے احتیاج لازم آئے گی۔' },
          { title: 'امتحانی نکتہ: کیا بطلانِ تسلسل ضروری ہے؟', text: 'ہاں! تفتازانیؒ نے واضح کیا کہ تسلسل کو باطل کیے بغیر اثباتِ صانع مکمل نہیں ہو سکتا۔' },
          { title: 'حتمی نتیجہ', text: 'کائنات حادث ہے، اس کا بنانے والا اللہ تعالیٰ ہے جو واجب الوجود، یکتا، اور لامتناہی نقائص سے پاک ہے۔' }
        ]
      }
    ];

    let slidesHTML = `
<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>شرح العقائد النسفية | شرائح المحاضرات والمسائل الكلامية</title>
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
      <span class="slide-book-name">شرح العقائد النسفية • إثبات الصانع وبرهان التطبيق</span>
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
      <span>صفحات ۱۰۲ تا ۱۰۵ • إثبات واجب الوجود وبطلان التسلسل</span>
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
    console.log('Burhan-Tatbiq Presentation Slides PDF saved at:', SLIDES_PDF_PATH);
    await pageSlides.close();

    console.log('All Burhan-Tatbiq PDFs generated successfully via Puppeteer!');
  } catch (err) {
    console.error('Error generating PDFs:', err);
    throw err;
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  generateBurhanTatbiqPDFs()
    .then(() => {
      console.log('PDF generation complete.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('PDF generation failed:', err);
      process.exit(1);
    });
}

module.exports = { generateBurhanTatbiqPDFs };

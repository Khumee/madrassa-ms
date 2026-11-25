const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const DOWNLOADS_DIR = path.join(__dirname, '..', 'lms', 'downloads');

// Illah Tardiyah PDFs
const TARDIYAH_COMPLETE = path.join(DOWNLOADS_DIR, 'Tawzeeh-Tardiyah-Complete.pdf');
const TARDIYAH_NOTES = path.join(DOWNLOADS_DIR, 'Tawzeeh-Tardiyah-Lecture-Notes.pdf');
const TARDIYAH_SLIDES = path.join(DOWNLOADS_DIR, 'Tawzeeh-Tardiyah-Slides.pdf');

// Illah Muathira PDFs
const MUATHIRA_COMPLETE = path.join(DOWNLOADS_DIR, 'Tawzeeh-Muathira-Complete.pdf');
const MUATHIRA_NOTES = path.join(DOWNLOADS_DIR, 'Tawzeeh-Muathira-Lecture-Notes.pdf');
const MUATHIRA_SLIDES = path.join(DOWNLOADS_DIR, 'Tawzeeh-Muathira-Slides.pdf');

async function generateAllTopicPDFs() {
  if (!fs.existsSync(DOWNLOADS_DIR)) {
    fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
  }

  console.log('Launching Puppeteer for comprehensive topic PDF generation...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    /* ==============================================================
       1. GENERATE TARDIAH SLIDES PDF (Landscape)
       ============================================================== */
    console.log('Generating Tawzeeh Tardiyah Slides PDF...');
    const pageTardSlides = await browser.newPage();
    const tardSlidesHTML = `
<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>التوضيح | سلائیڈز: فصل في دفع العلل الطردية والانتقال والاستصحاب</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 landscape;
      margin: 10mm 12mm 10mm 12mm;
      @top-center {
        content: "التوضيح لصدر الشريعةؒ • پریزنٹیشن سلائیڈز: فصل في دفع العلل الطردية والانتقال والاستصحاب";
        font-family: 'Noto Sans Arabic', sans-serif;
        font-size: 8pt;
        color: #94a3b8;
      }
      @bottom-center {
        content: "سلائیڈ " counter(page);
        font-family: 'Noto Sans Arabic', sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: 'Noto Sans Arabic', 'Amiri', serif;
      direction: rtl;
      text-align: right;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .slide-page {
      page-break-after: always;
      height: 180mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1.5px solid #d4af37;
      border-radius: 10px;
      padding: 14mm 16mm;
      background: linear-gradient(135deg, #ffffff 0%, #fdfbf7 100%);
    }
    .slide-page:last-child { page-break-after: avoid; }
    .slide-header {
      border-bottom: 2px solid #b45309;
      padding-bottom: 8px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .slide-tag {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fcd34d;
      padding: 3px 12px;
      border-radius: 12px;
      font-size: 9pt;
      font-weight: bold;
    }
    .slide-title {
      font-family: 'Amiri', serif;
      font-size: 20pt;
      color: #78350f;
      margin: 4px 0 0 0;
    }
    .slide-content-grid {
      display: table;
      width: 100%;
      height: 100%;
    }
    .slide-col-text {
      display: table-cell;
      width: 60%;
      vertical-align: middle;
      padding-left: 20px;
    }
    .slide-col-visual {
      display: table-cell;
      width: 40%;
      vertical-align: middle;
      text-align: center;
    }
    .bullets {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .bullets li {
      font-size: 11pt;
      line-height: 1.9;
      margin-bottom: 10px;
      position: relative;
      padding-right: 24px;
    }
    .bullets li::before {
      content: '⚡';
      position: absolute;
      right: 0;
      top: 0;
      color: #d97706;
    }
    .formula-box {
      background: #fffbeb;
      border: 1.5px dashed #b45309;
      border-radius: 8px;
      padding: 8px 14px;
      font-size: 10.5pt;
      font-weight: bold;
      color: #92400e;
      margin-top: 14px;
      display: inline-block;
    }
    .visual-box {
      border: 1.5px solid #cbd5e1;
      border-radius: 10px;
      padding: 16px;
      background: #f8fafc;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .visual-icon { font-size: 42pt; margin-bottom: 8px; }
    .visual-title { font-family: 'Amiri', serif; font-size: 14pt; color: #1e293b; font-weight: bold; margin-bottom: 10px; }
    .mini-card-row { display: flex; justify-content: center; gap: 10px; margin-top: 8px; }
    .mini-card { padding: 8px 12px; border-radius: 6px; font-size: 9.5pt; font-weight: bold; }
    .card-red { background: #fee2e2; color: #991b1b; border: 1px solid #f87171; }
    .card-green { background: #dcfce7; color: #166534; border: 1px solid #4ade80; }
    .card-gold { background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; }
  </style>
</head>
<body>

  <!-- Slide 1 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">العلة الطردية کیا ہے؟ اور احناف کا موقف</h2>
      <span class="slide-tag">سلائیڈ ۱ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>تعریف:</strong> وہ علت جس کا ثبوت صرف دوران (ہمراہی) سے ہو، تاثیر کے بغیر۔</li>
          <li><strong>شوافع کا موقف:</strong> جب وصف اور حکم ہمیشہ ساتھ پائے جائیں تو علیت مان لیتے ہیں۔</li>
          <li><strong>احناف کا قطعی فیصلہ:</strong> «الطرد باطل عندنا»؛ بے اثر ہمراہی علت نہیں بنتی۔</li>
          <li><strong>بنیادی عیب:</strong> طردی وصف اور شرعی حکم کے مابین کوئی مناسبت یا مصلحت نہیں ہوتی۔</li>
        </ul>
        <div class="formula-box">الدوران المجرد (طرد) ≠ العلية الشرعية المؤثرة</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">🌀</div>
          <div class="visual-title">طرد بمقابلہ تاثیر</div>
          <div class="mini-card-row">
            <span class="mini-card card-red">طردی وصف (بے جان)</span>
            <span class="mini-card card-green">علتِ مؤثرہ (مصلحت)</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 2 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">تمثیلِ دوران بمقابلہ تاثیر (شراب کی حرمت)</h2>
      <span class="slide-tag">سلائیڈ ۲ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>طردی قیاس (باطل):</strong> «شراب اس لیے حرام ہے کہ اس کا رنگ لال ہے یا وہ مائع ہے»!</li>
          <li><strong>حقیقی مؤثر علت:</strong> شراب کی حرمت کی اصل علت «اسکار» (نشہ لانا) ہے۔</li>
          <li><strong>اصول:</strong> جب تک لال مائع رہے گا نشہ ہوگا، مگر لال رنگ کو علت کہنا جہالت ہے۔</li>
        </ul>
        <div class="formula-box">شراب کا لال رنگ = طرد | اسکار (نشہ) = علتِ مؤثرہ</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">🍷</div>
          <div class="visual-title">تصویری موازنہ</div>
          <div class="mini-card-row">
            <span class="mini-card card-red">سرخ رنگ (طرد ❌)</span>
            <span class="mini-card card-green">اسکار و نشہ (مؤثرہ ✔️)</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 3 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">منهج ۱: القول بموجب العلة (مسحِ سر کی تمثیل)</h2>
      <span class="slide-tag">سلائیڈ ۳ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>دعویٰ معلل:</strong> مسحِ سر رکن ہے لہٰذا چہرے کی طرح ۳ بار کا تکرار مسنون ہوگا۔</li>
          <li><strong>حنفی جواب:</strong> ہم بھی مسح میں تثلیث کو مسنون مانتے ہیں!</li>
          <li><strong>حل:</strong> فرض چوتھائی سر ہے، جب پورے سر کا مسح کیا تو تثلیث سے بھی زائد ہو گیا!</li>
        </ul>
        <div class="formula-box">ربع سر (فرض) + باقی تین چوتھائی = تثلیث و زیادہ</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">🛡️</div>
          <div class="visual-title">فنِ القول بموجب العلة</div>
          <div class="mini-card-row">
            <span class="mini-card card-gold">تقاضا مانا</span>
            <span class="mini-card card-green">مدعا بچا لیا!</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 4 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">منهج ۲: الممانعة (کفارہ صوم کا تنازع)</h2>
      <span class="slide-tag">سلائیڈ ۴ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>مسئلہ:</strong> رمضان میں کھانے پینے پر کفارہ واجب نہ ہونے کا شوافع کا قیاس۔</li>
          <li><strong>دعویٰ شوافع:</strong> کفارہ ایسی عقوبت ہے جو جماع پر موقوف ہے جیسے حدِ زنا۔</li>
          <li><strong>ممانعتِ احناف:</strong> ہم تسلیم نہیں کرتے کہ کفارہ جماع پر ہے، بلکہ فطر (روزہ توڑنے) پر ہے!</li>
        </ul>
        <div class="formula-box">کفارہ = جنایتِ فطر پر عقوبت (نہ کہ صرف جماع پر)</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">✋</div>
          <div class="visual-title">الممانعة فی الوصف</div>
          <div class="mini-card-row">
            <span class="mini-card card-red">جماع کے ساتھ خاص ❌</span>
            <span class="mini-card card-green">فطر و اکل و شرب ✔️</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 5 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">منهج ۳: فساد الوضع (اسلام نعمت ہے، فرقت نہیں)</h2>
      <span class="slide-tag">سلائیڈ ۵ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>قیاسِ شافعی:</strong> میاں بیوی میں سے ایک کے اسلام لانے پر فوری نکاح ٹوٹ جائے گا۔</li>
          <li><strong>فسادِ وضع:</strong> اسلام کو زوجین کے درمیان جدائی اور سلبِ نعمت کی علت بنا دیا!</li>
          <li><strong>اصولِ احناف:</strong> اسلام نعمت اور الفت ہے، وہ نکاح کی نعمت کو نہیں کاٹتا!</li>
        </ul>
        <div class="formula-box">الإسلام لا يصلح قاطعاً للنعمة والردة لا تصلح عفواً</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">🕊️</div>
          <div class="visual-title">فسادِ وضع کا بطلان</div>
          <div class="mini-card-row">
            <span class="mini-card card-gold">اسلام = نعمت و الفت</span>
            <span class="mini-card card-red">فرقت و طلاق ❌</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 6 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">منهج ۴: المناقضة (طرد کو مؤثرہ کی پناہ پر لانا)</h2>
      <span class="slide-tag">سلائیڈ ۶ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>قیاس:</strong> «وضوء اور تیمم دونوں طہارتیں ہیں لہٰذا نیت میں برابر ہوں گی»۔</li>
          <li><strong>مناقضہ:</strong> طہارتِ خبث (کپڑے سے نجاست دھونا) بھی طہارت ہے مگر نیت شرط نہیں۔</li>
          <li><strong>نتیجہ:</strong> معلل مجبور ہو کر طرد چھوڑ کر علتِ مؤثرہ کی طرف بھاگتا ہے۔</li>
        </ul>
        <div class="formula-box">مناقضہ بطہارتِ خبث ➡️ اضطرار الی العلة المؤثرة</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">💧</div>
          <div class="visual-title">مناقضہ کا عمل</div>
          <div class="mini-card-row">
            <span class="mini-card card-red">طہارتِ وضو (نیت)</span>
            <span class="mini-card card-green">طہارتِ خبث (نیت نہیں)</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 7 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">فنِ انتقال و مناظرۂ خلیل اللہ سیدنا ابراہیمؑ</h2>
      <span class="slide-tag">سلائیڈ ۷ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>پہلی دلیل:</strong> ﴿رَبِّيَ الَّذِي يُحْيِي وَيُمِيتُ﴾ قطعی اور ملزم تھی۔</li>
          <li><strong>نمرود کا مغالطہ:</strong> دو قیدی لا کر ایک کو چھوڑا اور دوسرے کو قتل کیا۔</li>
          <li><strong>ابراہیمؑ کا کمال:</strong> فورا مشرق و مغرب والی بدیہی دلیل لا کر نمرود کو ہکا بکا کیا!</li>
        </ul>
        <div class="formula-box">﴿فَأْتِ بِهَا مِنَ الْمَغْرِبِ فَبُهِتَ الَّذِي كَفَرَ﴾</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">☀️</div>
          <div class="visual-title">افحامِ خصم و دفعِ تلبيس</div>
          <div class="mini-card-row">
            <span class="mini-card card-gold">احیاء و اماتہ</span>
            <span class="mini-card card-green">طلوعِ شمس (قاطع)</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 8 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">«الاستصحاب حجة للدفع لا للإثبات»</h2>
      <span class="slide-tag">سلائیڈ ۸ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>شوافع:</strong> استصحاب اثبات اور دفع دونوں کی دلیل بنتا ہے۔</li>
          <li><strong>احناف:</strong> استصحاب صرف حق کے تحفظ (دفع) کی دلیل ہے، نیا حق پانے (اثبات) کی نہیں۔</li>
          <li><strong>مفقود الخبر:</strong> اپنے مال میں زندہ رہے گا (دفع)، دوسروں کی وراثت نہیں پا سکتا (اثبات)۔</li>
        </ul>
        <div class="formula-box">حفظ المال القديم = دفع (جائز) | أخذ الميراث الجديد = إثبات (ممتنع)</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">⚖️</div>
          <div class="visual-title">استصحاب کا حنفی میزان</div>
          <div class="mini-card-row">
            <span class="mini-card card-green">الدفع (حق بچانا ✔️)</span>
            <span class="mini-card card-red">الإثبات (نیا حق ❌)</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</body>
</html>
    `;

    await pageTardSlides.setContent(tardSlidesHTML, { waitUntil: 'networkidle0' });
    await pageTardSlides.pdf({
      path: TARDIYAH_SLIDES,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '8mm', bottom: '8mm', left: '10mm', right: '10mm' }
    });
    console.log('Tawzeeh Tardiyah Slides PDF saved at:', TARDIYAH_SLIDES);
    await pageTardSlides.close();

    /* ==============================================================
       2. GENERATE MUATHIRA COMPLETE TOPIC PDF
       ============================================================== */
    console.log('Generating Tawzeeh Muathira Complete Topic PDF...');
    const pageMuathiraMaster = await browser.newPage();
    const muathiraMasterHTML = `
<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>التوضيح لصدر الشريعة | فصل في دفع العلل المؤثرة والموانع الخمسة</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm 14mm 16mm 14mm;
      @top-center {
        content: "التوضيح في حل غوامض التنقيح • فصل في دفع العلل المؤثرة والموانع الخمسة (صفحات ۳۷۰ تا ۳۸۰)";
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
      font-size: 9.6pt;
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
      font-size: 9.8pt;
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
    .section-title-banner {
      background: #78350f;
      color: #ffffff;
      font-family: 'Amiri', serif;
      font-size: 11.5pt;
      font-weight: bold;
      padding: 5px 12px;
      border-radius: 4px;
      margin: 14px 0 8px 0;
      page-break-inside: avoid;
    }
    .sub-section-title {
      font-family: 'Amiri', serif;
      font-size: 11pt;
      color: #92400e;
      border-right: 3.5px solid #d4af37;
      padding-right: 8px;
      margin: 10px 0 6px 0;
      page-break-inside: avoid;
    }
    .parallel-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 8px 0;
      margin-bottom: 8px;
      page-break-inside: avoid;
    }
    .col-ar, .col-ur {
      width: 50%;
      vertical-align: top;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 9px 11px;
    }
    .col-ar { background: #fbfbf8; border-right: 3px solid #b48c28; }
    .col-ur { background: #f8fafc; border-right: 3px solid #0284c7; }
    .box-label {
      font-size: 8pt;
      font-weight: bold;
      color: #64748b;
      margin-bottom: 4px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }
    .ar-text {
      font-family: 'Amiri', serif;
      font-size: 10.4pt;
      line-height: 1.75;
      color: #0f172a;
    }
    .ur-text {
      font-family: 'Noto Sans Arabic', sans-serif;
      font-size: 9.1pt;
      line-height: 1.75;
      color: #1e293b;
    }
    .tafseel-pdf-block {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-right: 3.5px solid #d97706;
      border-radius: 6px;
      padding: 9px 12px;
      margin: 6px 0 14px 0;
      page-break-inside: avoid;
    }
    .tafseel-pdf-title {
      font-family: 'Amiri', serif;
      font-size: 10.5pt;
      font-weight: bold;
      color: #92400e;
      margin-bottom: 4px;
    }
    .tafseel-pdf-body {
      font-size: 9pt;
      line-height: 1.75;
      color: #451a03;
    }
    .rules-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.8pt;
      margin: 8px 0;
      page-break-inside: avoid;
    }
    .rules-table th {
      background: #f1f5f9;
      color: #1e293b;
      font-weight: bold;
      padding: 6px 8px;
      border: 1px solid #cbd5e1;
      text-align: right;
    }
    .rules-table td {
      padding: 6px 8px;
      border: 1px solid #e2e8f0;
      vertical-align: top;
      line-height: 1.6;
    }
    .page-break { page-break-before: always; }
  </style>
</head>
<body>

  <div class="cover-header">
    <div class="badge">جامعہ آن لائن لرننگ مینجمنٹ سسٹم • تخصص فی الفقہ والافتاء</div>
    <h1>التوضيح في حل غوامض التنقيح (مع التلويح)</h1>
    <div class="subtitle"><strong>للإمام صدر الشريعة عبيد الله بن مسعود المحبوبي الحنفيؒ (متوفى 747ھ)</strong></div>
    <div style="font-size: 9pt; color: #64748b; margin-top: 2px;">
      کتاب القياس • فصل في دفع العلل المؤثرة ومحاكمة تخصيص العلة بالموانع الخمسة • صفحات ۳۷۰ تا ۳۸۰
    </div>
  </div>

  <div class="hero-card">
    <span class="hero-tag">جامع درسی انسائیکلوپیڈیا</span>
    <h2 class="hero-title">فصل في دفع العلل المؤثرة والموانع الخمسة</h2>
    <p style="margin: 0; font-size: 9.3pt; color: #334155; line-height: 1.7;">
      علتِ مؤثرہ پر اعتراضاتِ ستہ، دفعِ نقض کے چار مناہج (منعِ وصف، منعِ معنی، دفع بالحکم، دفع بالغرض)، تیر اندازی کی نظائر اور خیاراتِ ثلاثہ سے موانعِ خمسہ کا فلسفہ، اور فنِ قلب و معارضہ کا مکمل متن، ترجمہ و مفصل اصولی تحقیق۔
    </p>
  </div>

  <!-- Paragraph 1 -->
  <div class="sub-section-title">پیراگراف ۱: صفحہ ۳۷۰ (تعريف النقض، منع الوصف، ومنع المعنى)</div>
  <table class="parallel-table">
    <tr>
      <td class="col-ar">
        <div class="box-label">القسم الأول: متن التوضيح</div>
        <div class="ar-text">
          «فصل في دفع العلل المؤثرة: أي الاعتراضات الواردة على العلل المؤثرة. منه: النقض: وهو وجود العلة في صورة مع تخلف الحكم. ودفعه بأربع طرق: الأول: منع وجود العلة في صورة النقض... فنوقض بالقليل، فيمنع الخروج فيه. وكذا ملك بدل المغصوب يوجب ملكه، فنوقض بالمدبر... والثاني: منع معنى العلة...»
        </div>
      </td>
      <td class="col-ur">
        <div class="box-label">القسم الثاني: سلیس اردو ترجمہ</div>
        <div class="ur-text">
          <strong>فصل: علتِ مؤثرہ پر اعتراضات کا دفع:</strong><br>
          پہلا اعتراض "النقض" ہے (علت پائی جائے مگر شرعی حکم نہ نکلے)۔ دفع کے ۴ راستے ہیں: ۱. منعِ وصف (قلیل خون میں خروج کا انکار کہ خروج نام ہے بہنے کا؛ اور مدبر کا تاوان بدلِ عین نہیں بدلِ ید ہے)، ۲. منعِ معنی العلہ (مسحِ سر میں تکرار کی نفی، اور استنجاء میں تطہیرِ حقیقی معقول بمقابلہ تعبدی کا فرق)۔
        </div>
      </td>
    </tr>
  </table>

  <!-- Paragraph 2 -->
  <div class="sub-section-title">پیراگراف ۲: صفحات ۳۷۱ - ۳۷۳ (الدفع بالحكم والدفع بالغرض)</div>
  <table class="parallel-table">
    <tr>
      <td class="col-ar">
        <div class="box-label">القسم الأول: متن التوضيح</div>
        <div class="ar-text">
          «والثالث: الدفع بالحكم: وهو أن يمنع تخلف الحكم عن العلة في صورة النقض... وأنا أورد للدفع بالحكم مثالاً: وهو أن القيام إلى الصلاة مع خروج النجاسة علة لوجوب الوضوء فيجب في غير السبيلين، فنوقض بالتيمم، فيمنع عدم وجوب الوضوء فيه، بل الوضوء واجب، لكن التيمم خلف عنه. والرابع: الدفع بالغرض...»
        </div>
      </td>
      <td class="col-ur">
        <div class="box-label">القسم الثاني: سلیس اردو ترجمہ</div>
        <div class="ur-text">
          <strong>۳. الدفع بالحکم:</strong> تخلفِ حکم کو ماننے سے انکار کرنا۔ صدر الشریعہؒ کی بے عیب مثال: خروجِ نجاست پر وجوبِ وضو کی علت؛ بے آب مسافر سے نقض کا رد کہ وضو کا وجوب ساقط نہیں ہوا بلکہ تیمم اس کا خلف بن کر وجوب کو قائم رکھتا ہے۔<br>
          <strong>۴. الدفع بالغرض:</strong> مستحاضہ میں سبیلین اور غیر سبیلین کی برابری کی غرض کا پورا ہونا مع عذرِ عفو۔
        </div>
      </td>
    </tr>
  </table>

  <div class="page-break"></div>

  <!-- Paragraph 3 -->
  <div class="sub-section-title">پیراگراف ۳: صفحات ۳۷۳ - ۳۷۵ (بطلان تخصيص العلة والموانع الخمسة)</div>
  <table class="parallel-table">
    <tr>
      <td class="col-ar">
        <div class="box-label">القسم الأول: متن التوضيح</div>
        <div class="ar-text">
          «ثم اعلم أنه إن لم يوجد في صورة النقض مانع فقد بطلت العلة... ونحن لا نقول بتخصيص العلة، بل نقول: إنما عدم الحكم لعدم ما هو العلة حقيقة، فنجعل عدم المانع جزءاً للعلة أو شرطاً لها. والموانع خمسة: مانع من انعقاد العلة كبيع الحر، أو من تمامها كبيع ما لا يملكه، أو من ابتداء الحكم كخيار الشرط، أو من تمامه كخيار الرؤية، أو من لزومه كخيار العيب.»
        </div>
      </td>
      <td class="col-ur">
        <div class="box-label">القسم الثاني: سلیس اردو ترجمہ</div>
        <div class="ur-text">
          <strong>تخصیصِ علت کا رد اور موانعِ خمسہ:</strong><br>
          احناف کے نزدیک شریعت میں علت کی تخصیص باطل ہے، کیونکہ عدمِ مانع خود علت کا جزو یا شرط ہے۔ موانعِ خمسہ: ۱. مانع انعقاد (تانت ٹوٹنا = بیعِ حر)، ۲. مانع تمام (رکاوٹ = بیعِ مالا یملک)، ۳. مانع ابتداء حکم (زرہ = خیارِ شرط)، ۴. مانع تمام حکم (مرہم = خیارِ رؤیت)، ۵. مانع لزوم حکم (ناسور = خیارِ عیب)۔
        </div>
      </td>
    </tr>
  </table>

  <!-- Paragraph 4 -->
  <div class="sub-section-title">پیراگراف ۴: صفحات ۳۷۵ - ۳۸۰ (الفرق والممانعة، والمعارضة والقلب)</div>
  <table class="parallel-table">
    <tr>
      <td class="col-ar">
        <div class="box-label">القسم الأول: متن التوضيح</div>
        <div class="ar-text">
          «ومنه: المعارضة: إما في الحكم وإما في المقدمة... فإن دل على نقيض الحكم بعينه فقلب، كقوله: صوم رمضان صوم فرض فلا يتأدى إلا بتعيين النية كالقضاء، فنقول: صوم رمضان صوم فرض، فيستغني عن التعيين بعد تعيينه... وكالتي نعي إليها زوجها فنكحت وولدت ثم جاء الأول فالأول أحق بالولد؛ لأنه صاحب فراش صحيح.»
        </div>
      </td>
      <td class="col-ur">
        <div class="box-label">القسم الثاني: سلیس اردو ترجمہ</div>
        <div class="ur-text">
          <strong>المعارضة اور فنِ قلب:</strong><br>
          مخالف کی دلیل سے اس کے دعوے کی عین نقیض ثابت کرنا "القلب" ہے۔ شوافع نے کہا: رمضان فرض ہے لہٰذا قضا کی طرح نیت کی تعیین شرط ہوگی؛ احناف نے قلب کیا: چونکہ فرض ہے اور وقت اللہ نے معین کیا لہٰذا تعیین کی شرط ساقط ہے! اور نسب میں صاحبِ فراشِ صحیح کو فاسد پر ترجیح ہے۔
        </div>
      </td>
    </tr>
  </table>

</body>
</html>
    `;

    await pageMuathiraMaster.setContent(muathiraMasterHTML, { waitUntil: 'networkidle0' });
    await pageMuathiraMaster.pdf({
      path: MUATHIRA_COMPLETE,
      format: 'A4',
      printBackground: true,
      margin: { top: '15mm', right: '14mm', bottom: '16mm', left: '14mm' }
    });
    console.log('Tawzeeh Muathira Master PDF saved at:', MUATHIRA_COMPLETE);
    await pageMuathiraMaster.close();

    /* ==============================================================
       3. GENERATE MUATHIRA LECTURE NOTES PDF
       ============================================================== */
    console.log('Generating Tawzeeh Muathira Lecture Notes PDF...');
    const pageMuathiraNotes = await browser.newPage();
    const muathiraNotesHTML = `
<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>التوضيح | درسی نوٹس: فصل في دفع العلل المؤثرة</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 12mm 15mm 12mm;
      @top-center {
        content: "درسی خلاصہ و لیکچر نوٹس • التوضيح: فصل في دفع العلل المؤثرة (ص ۳۷۰ - ۳۸۰)";
        font-family: 'Noto Sans Arabic', sans-serif;
        font-size: 8pt;
        color: #94a3b8;
        border-bottom: 0.5px solid #cbd5e1;
        padding-bottom: 4px;
      }
      @bottom-center {
        content: "صفحہ " counter(page);
        font-family: 'Noto Sans Arabic', sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: 'Noto Sans Arabic', 'Amiri', serif;
      direction: rtl;
      text-align: right;
      color: #0f172a;
      line-height: 1.8;
      font-size: 9.8pt;
      margin: 0;
      padding: 0;
    }
    .header-box {
      text-align: center;
      border: 1.5px solid #b45309;
      background: #fffbeb;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 14px;
    }
    .badge {
      display: inline-block;
      background: #d97706;
      color: #ffffff;
      padding: 2px 12px;
      border-radius: 12px;
      font-size: 8pt;
      font-weight: bold;
      margin-bottom: 4px;
    }
    h1 { font-family: 'Amiri', serif; font-size: 19pt; color: #78350f; margin: 2px 0; }
    .summary-card {
      border: 1px solid #e2e8f0;
      border-right: 4px solid #b45309;
      border-radius: 6px;
      padding: 10px 12px;
      margin-bottom: 10px;
      background: #fafaf9;
      page-break-inside: avoid;
    }
    .card-title {
      font-family: 'Amiri', serif;
      font-size: 11pt;
      font-weight: bold;
      color: #92400e;
      margin-bottom: 4px;
    }
  </style>
</head>
<body>

  <div class="header-box">
    <div class="badge">درسِ نظامی • دورۂ اصولِ فقہ (درجہ سابعہ)</div>
    <h1>التوضيح لصدر الشريعةؒ: درسی خلاصہ و کلیدی اصولی نوٹس</h1>
    <div style="font-size: 9pt; color: #451a03; margin-top: 2px;">
      بحث: دفعِ نقض کے ۴ مناہج، موانعِ خمسہ، بطلانِ تخصیصِ علت، اور فنِ قلب و معارضہ
    </div>
  </div>

  <div class="summary-card">
    <div class="card-title">۱. دفعِ نقض کے ۴ قلعے:</div>
    <p style="margin: 0; font-size: 9.2pt; line-height: 1.75;">
      • <strong>منع الوصف:</strong> قلیل خون میں خروج کا انکار کہ خروج نام ہے بہنے کا۔<br>
      • <strong>منع المعنى:</strong> استنجاء میں معقول تطہیر بمقابلہ مسحِ سر میں غیر معقول تعبدی تطہیر۔<br>
      • <strong>الدفع بالحكم:</strong> تیمم میں وضو کا وجوب ساقط نہیں ہوا بلکہ تیمم خلف بن کر وجوب کو قائم رکھتا ہے۔<br>
      • <strong>الدفع بالغرض:</strong> مستحاضہ میں تسویہ بین السبیلین کا اثبات مع عذرِ عفو۔
    </p>
  </div>

  <div class="summary-card">
    <div class="card-title">۲. بطلانِ تخصیصِ علت اور موانعِ خمسہ:</div>
    <p style="margin: 0; font-size: 9.2pt; line-height: 1.75;">
      شریعت میں علت کی تخصیص باطل ہے کیونکہ عدمِ مانع خود علت کا جزو یا شرط ہے۔<br>
      تیر اندازی اور فقہی احکام کی نظائر: ۱. مانع انعقاد (بیعِ حر)، ۲. مانع تمام (بیعِ مالا یملک)، ۳. مانع ابتداء (خیارِ شرط)، ۴. مانع تمام حکم (خیارِ رؤیت)، ۵. مانع لزوم حکم (خیارِ عیب)۔
    </p>
  </div>

  <div class="summary-card">
    <div class="card-title">۳. فنِ قلب اور معارضہ:</div>
    <p style="margin: 0; font-size: 9.2pt; line-height: 1.75;">
      مخالف کی دلیل سے ہی اس کے دعوے کی نقیض ثابت کرنا القلب ہے۔ جیسے رمضان کے فرض روزے میں شوافع کی فرضیت والی دلیل سے تعیینِ نیت کی نفی ثابت کرنا کیونکہ وقت اللہ نے خود معین فرمایا ہے۔
    </p>
  </div>

</body>
</html>
    `;

    await pageMuathiraNotes.setContent(muathiraNotesHTML, { waitUntil: 'networkidle0' });
    await pageMuathiraNotes.pdf({
      path: MUATHIRA_NOTES,
      format: 'A4',
      printBackground: true,
      margin: { top: '14mm', right: '12mm', bottom: '15mm', left: '12mm' }
    });
    console.log('Tawzeeh Muathira Notes PDF saved at:', MUATHIRA_NOTES);
    await pageMuathiraNotes.close();

    /* ==============================================================
       4. GENERATE MUATHIRA SLIDES PDF (Landscape)
       ============================================================== */
    console.log('Generating Tawzeeh Muathira Slides PDF...');
    const pageMuathiraSlides = await browser.newPage();
    const muathiraSlidesHTML = `
<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>التوضيح | سلائیڈز: فصل في دفع العلل المؤثرة والموانع الخمسة</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 landscape;
      margin: 10mm 12mm 10mm 12mm;
      @top-center {
        content: "التوضيح لصدر الشريعةؒ • پریزنٹیشن سلائیڈز: فصل في دفع العلل المؤثرة والموانع الخمسة";
        font-family: 'Noto Sans Arabic', sans-serif;
        font-size: 8pt;
        color: #94a3b8;
      }
      @bottom-center {
        content: "سلائیڈ " counter(page);
        font-family: 'Noto Sans Arabic', sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: 'Noto Sans Arabic', 'Amiri', serif;
      direction: rtl;
      text-align: right;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .slide-page {
      page-break-after: always;
      height: 180mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1.5px solid #d4af37;
      border-radius: 10px;
      padding: 14mm 16mm;
      background: linear-gradient(135deg, #ffffff 0%, #fdfbf7 100%);
    }
    .slide-page:last-child { page-break-after: avoid; }
    .slide-header {
      border-bottom: 2px solid #b45309;
      padding-bottom: 8px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .slide-tag {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fcd34d;
      padding: 3px 12px;
      border-radius: 12px;
      font-size: 9pt;
      font-weight: bold;
    }
    .slide-title { font-family: 'Amiri', serif; font-size: 20pt; color: #78350f; margin: 4px 0 0 0; }
    .slide-content-grid { display: table; width: 100%; height: 100%; }
    .slide-col-text { display: table-cell; width: 60%; vertical-align: middle; padding-left: 20px; }
    .slide-col-visual { display: table-cell; width: 40%; vertical-align: middle; text-align: center; }
    .bullets { list-style: none; padding: 0; margin: 0; }
    .bullets li { font-size: 11pt; line-height: 1.9; margin-bottom: 10px; position: relative; padding-right: 24px; }
    .bullets li::before { content: '⚡'; position: absolute; right: 0; top: 0; color: #d97706; }
    .formula-box {
      background: #fffbeb;
      border: 1.5px dashed #b45309;
      border-radius: 8px;
      padding: 8px 14px;
      font-size: 10.5pt;
      font-weight: bold;
      color: #92400e;
      margin-top: 14px;
      display: inline-block;
    }
    .visual-box {
      border: 1.5px solid #cbd5e1;
      border-radius: 10px;
      padding: 16px;
      background: #f8fafc;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .visual-icon { font-size: 42pt; margin-bottom: 8px; }
    .visual-title { font-family: 'Amiri', serif; font-size: 14pt; color: #1e293b; font-weight: bold; margin-bottom: 10px; }
    .mini-card-row { display: flex; justify-content: center; gap: 10px; margin-top: 8px; }
    .mini-card { padding: 8px 12px; border-radius: 6px; font-size: 9.5pt; font-weight: bold; }
    .card-red { background: #fee2e2; color: #991b1b; border: 1px solid #f87171; }
    .card-green { background: #dcfce7; color: #166534; border: 1px solid #4ade80; }
    .card-gold { background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; }
  </style>
</head>
<body>

  <!-- Slide 1 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">علتِ مؤثرہ کیا ہے؟ اور اعتراضاتِ ستہ</h2>
      <span class="slide-tag">سلائیڈ ۱ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>تعریف:</strong> وہ علت جس کی تاثیر شریعت کے نصوص یا اجماع سے ثابت ہو۔</li>
          <li><strong>احناف کا مذہب:</strong> صرف علتِ مؤثرہ ہی قیاسِ شرعی کے لیے معتبر ہے۔</li>
          <li><strong>اعتراضاتِ ستہ:</strong> النقض، فساد الوضع، عدم الانعكاس، الفرق، الممانعة، المعارضة۔</li>
        </ul>
        <div class="formula-box">علتِ مؤثرہ = نص یا اجماع سے ثابت شدہ شرعی مصلحت</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">🏛️</div>
          <div class="visual-title">علتِ مؤثرہ کا حصار</div>
          <div class="mini-card-row">
            <span class="mini-card card-gold">النقض 🛡️</span>
            <span class="mini-card card-green">المعارضة ⚔️</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 2 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">قلعہ ۱: منع الوصف (خونِ قلیل میں عدمِ سیلان)</h2>
      <span class="slide-tag">سلائیڈ ۲ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>اعتراض:</strong> نجاست کا نکلنا ناقض ہے تو نہ بہنے والے قطرے سے وضو کیوں نہیں ٹوٹا؟</li>
          <li><strong>منعِ وصف:</strong> شریعت میں "خروج" نام ہے نجاست کے <strong>بہہ جانے</strong> کا۔</li>
          <li><strong>نتیجہ:</strong> قلیل غیر سائل میں سرے سے "خروج" (علت) ہی مفقود ہے!</li>
        </ul>
        <div class="formula-box">الخروج الشرعي = السيلان إلى موضع يلحقه التطهير</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">🩸</div>
          <div class="visual-title">خروج بمقابلہ ظہور</div>
          <div class="mini-card-row">
            <span class="mini-card card-red">ظہور بغیر سیلان ❌</span>
            <span class="mini-card card-green">سیلان و بہنا ✔️</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 3 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">قلعہ ۲: منع المعنی (مسحِ سر اور استنجاء کا فرق)</h2>
      <span class="slide-tag">سلائیڈ ۳ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>اعتراض:</strong> مسح میں تکرار مسنون نہیں تو استنجاء کے ڈھیلوں میں ۳ بار کیوں ہے؟</li>
          <li><strong>معنی کا فرق:</strong> استنجاء میں معنی <em>ازالہ نجاست یعنی تطہیرِ حقیقی</em> ہے (معقول)۔</li>
          <li><strong>مسحِ سر:</strong> مسح میں معنی <em>تطہیرِ حکمی غیر معقول</em> اور تخفیف ہے، پس تکرار نہیں۔</li>
        </ul>
        <div class="formula-box">استنجاء = ازالہ حقیقی (تکرار مسنون) | مسحِ سر = تعبدی غیر معقول (تکرار نہیں)</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">🧼</div>
          <div class="visual-title">تطہیر معقول بمقابلہ غیر معقول</div>
          <div class="mini-card-row">
            <span class="mini-card card-gold">استنجاء (معقول)</span>
            <span class="mini-card card-green">مسحِ سر (غیر معقول)</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 4 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">قلعہ ۳: الدفع بالحکم (وضوء اور تیمم کا اصولی راز)</h2>
      <span class="slide-tag">سلائیڈ ۴ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>اعتراض:</strong> بے آب مسافر پر خروجِ نجاست کے باوجود وضو کا وجوب ساقط ہو گیا!</li>
          <li><strong>صدر الشریعہؒ کا رد:</strong> وضوء کا وجوب سرے سے ساقط ہی نہیں ہوا!</li>
          <li><strong>اصول:</strong> وضوء بدستور واجب ہے، البتہ تیمم اس کا <strong>«خلف»</strong> بن کر عاجزی دور کرتا ہے۔</li>
        </ul>
        <div class="formula-box">الوجوب باقٍ بالعلة الأصلية والتيمم خلفٌ عنه</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">🏜️</div>
          <div class="visual-title">اثباتِ وجوب خلفاً</div>
          <div class="mini-card-row">
            <span class="mini-card card-gold">وجوبِ وضو (اصل)</span>
            <span class="mini-card card-green">تیمم (خلفِ وجوب)</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 5 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">قلعہ ۴: الدفع بالغرض (عفوِ استحاضہ اور تسویہ)</h2>
      <span class="slide-tag">سلائیڈ ۵ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>غرض:</strong> سبیلین اور غیر سبیلین کے نجس خروج میں برابری قائم کرنا۔</li>
          <li><strong>اعتراض:</strong> مستحاضہ کا مسلسل خون نکلنے پر وضو قائم رہتا ہے تو علت ٹوٹی!</li>
          <li><strong>جواب:</strong> علت ناقض ہی ہے، مگر مسلسل عذر کی بنا پر <strong>عفوِ عارض</strong> آیا ہے۔</li>
        </ul>
        <div class="formula-box">الغرض التسوية بين السبيلين والعفو لضرورة الاستمرار</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">🌿</div>
          <div class="visual-title">حقیقتِ غرض و عفو</div>
          <div class="mini-card-row">
            <span class="mini-card card-gold">ناقضیتِ خروج (اصل)</span>
            <span class="mini-card card-green">عفوِ ضرورت (عارض)</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 6 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">تیر اندازی اور فقہی موانعِ خمسہ کا فلسفہ</h2>
      <span class="slide-tag">سلائیڈ ۶ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>۱. مانع انعقاد:</strong> تانت ٹوٹنا = آزاد انسان (حر) کی بیع۔</li>
          <li><strong>۲. مانع تمام:</strong> ہوا سے رکنا = غیر مملوک کی بیع۔</li>
          <li><strong>۳. مانع ابتداء حکم:</strong> زرہ سے رکنا = خیارِ شرط۔</li>
          <li><strong>۴. مانع تمام حکم:</strong> مرہم سے زخم بھرنا = خیارِ رؤیت۔</li>
          <li><strong>۵. مانع لزوم حکم:</strong> ناسور بننا = خیارِ عیب۔</li>
        </ul>
        <div class="formula-box">عدم المانع = جزء العلة أو شرطها فلا تخصيص في الشرع!</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">🏹</div>
          <div class="visual-title">نظائرِ تیر اندازی</div>
          <div class="mini-card-row">
            <span class="mini-card card-gold">کمان و تانت</span>
            <span class="mini-card card-green">مرہم و علاج</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 7 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">خیاراتِ ثلاثہ میں اصولی تمایز</h2>
      <span class="slide-tag">سلائیڈ ۷ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>خیارِ شرط (مانعِ ابتداء):</strong> شرط لگا کر ملکیت کے آغاز کو ہی روک دیا۔</li>
          <li><strong>خیارِ رؤیت (مانعِ تمام):</strong> ملکیت شروع ہوئی مگر دیکھنے تک تام نہ ہوئی۔</li>
          <li><strong>خیارِ عیب (مانعِ لزوم):</strong> عقد تام ہوا مگر عیب نے لزوم ختم کر کے فسخ کا حق دیا۔</li>
        </ul>
        <div class="formula-box">شرط (مانعِ ابتداء) ➡️ رؤیت (مانعِ تمام) ➡️ عیب (مانعِ لزوم)</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">📜</div>
          <div class="visual-title">خیارات کے درجات</div>
          <div class="mini-card-row">
            <span class="mini-card card-red">خیارِ شرط</span>
            <span class="mini-card card-gold">خیارِ رؤیت</span>
            <span class="mini-card card-green">خیارِ عیب</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Slide 8 -->
  <div class="slide-page">
    <div class="slide-header">
      <h2 class="slide-title">فنِ قلب و معارضہ (صومِ رمضان اور فراشِ صحیح)</h2>
      <span class="slide-tag">سلائیڈ ۸ / ۸</span>
    </div>
    <div class="slide-content-grid">
      <div class="slide-col-text">
        <ul class="bullets">
          <li><strong>شوافع:</strong> رمضان فرض ہے لہٰذا قضا کی طرح نیت کی تعیین شرط ہوگی۔</li>
          <li><strong>القلب المعين:</strong> رمضان فرض ہے اور وقت اللہ نے معین کیا لہٰذا تعیین ساقط!</li>
          <li><strong>فراشِ صحیح بمقابلہ فاسد:</strong> زندہ شوہر صاحب فراش صحیح ہے لہٰذا نسب اسی کا ہے!</li>
        </ul>
        <div class="formula-box">القلب: إثبات نقيض دعوى الخصم بنفس دليله</div>
      </div>
      <div class="slide-col-visual">
        <div class="visual-box">
          <div class="visual-icon">🔄</div>
          <div class="visual-title">القلب کا فقہی وار</div>
          <div class="mini-card-row">
            <span class="mini-card card-gold">مخالف کی دلیل مانی</span>
            <span class="mini-card card-green">اسی سے نقیض ماری!</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</body>
</html>
    `;

    await pageMuathiraSlides.setContent(muathiraSlidesHTML, { waitUntil: 'networkidle0' });
    await pageMuathiraSlides.pdf({
      path: MUATHIRA_SLIDES,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '8mm', bottom: '8mm', left: '10mm', right: '10mm' }
    });
    console.log('Tawzeeh Muathira Slides PDF saved at:', MUATHIRA_SLIDES);
    await pageMuathiraSlides.close();

    console.log('ALL TOPIC PDFS GENERATED SUCCESSFULLY!');
  } catch (err) {
    console.error('Error in generateAllTopicPDFs:', err);
  } finally {
    await browser.close();
    console.log('Browser closed cleanly.');
  }
}

generateAllTopicPDFs();

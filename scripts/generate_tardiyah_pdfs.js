const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const DOWNLOADS_DIR = path.join(__dirname, '..', 'lms', 'downloads');
const MASTER_PDF_PATH = path.join(DOWNLOADS_DIR, 'Tawzeeh-Tardiyah-Complete.pdf');
const NOTES_PDF_PATH = path.join(DOWNLOADS_DIR, 'Tawzeeh-Tardiyah-Lecture-Notes.pdf');

async function generateTardiyahPDFs() {
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
       1. GENERATE ALL-IN-ONE MASTER PDF (Tawzeeh-Tardiyah-Complete.pdf)
       ============================================================== */
    console.log('Generating Tawzeeh Tardiyah Complete Master Topic PDF...');
    const pageMaster = await browser.newPage();

    const masterHTML = `
<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>التوضيح لصدر الشريعة | فصل في دفع العلل الطردية والانتقال والاستصحاب</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm 14mm 16mm 14mm;
      @top-center {
        content: "التوضيح في حل غوامض التنقيح • فصل في دفع العلل الطردية والانتقال والاستصحاب (صفحات ۳۸۲ تا ۳۸۹)";
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
    .hero-desc {
      font-size: 9.3pt;
      color: #334155;
      line-height: 1.7;
      margin: 0;
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
    .col-ar {
      background: #fbfbf8;
      border-right: 3px solid #b48c28;
    }
    .col-ur {
      background: #f8fafc;
      border-right: 3px solid #0284c7;
    }
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
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .tafseel-pdf-body {
      font-size: 9pt;
      line-height: 1.75;
      color: #451a03;
    }
    .grid-2 {
      display: table;
      width: 100%;
      margin: 6px 0;
    }
    .grid-cell {
      display: table-cell;
      width: 50%;
      padding: 6px;
      vertical-align: top;
    }
    .card-box {
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px 10px;
      background: #ffffff;
      height: 100%;
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
    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>

  <!-- Cover Header -->
  <div class="cover-header">
    <div class="badge">جامعہ آن لائن لرننگ مینجمنٹ سسٹم • تخصص فی الفقہ والافتاء</div>
    <h1>التوضيح في حل غوامض التنقيح (مع التلويح)</h1>
    <div class="subtitle"><strong>للإمام صدر الشريعة عبيد الله بن مسعود المحبوبي الحنفيؒ (متوفى 747ھ)</strong></div>
    <div style="font-size: 9pt; color: #64748b; margin-top: 2px;">
      کتاب القياس • فصل في دفع العلل الطردية، وفصل في الانتقال، وفصل في الحجج الفاسدة (الاستصحاب) • صفحات ۳۸۲ تا ۳۸۹
    </div>
  </div>

  <!-- Hero Card -->
  <div class="hero-card">
    <span class="hero-tag">جامع درسی انسائیکلوپیڈیا</span>
    <h2 class="hero-title">فصل في دفع العلل الطردية وفن الانتقال وإبطال الاستصحاب</h2>
    <p class="hero-desc">
      یہ جامع دستاویز علتِ طردیہ اور دوران کی اصولی حقیقت، دفعِ طرد کے ۴ مناہج، مناظرے میں فنِ انتقال اور حضرت ابراہیم خلیل اللہؑ کے نمرود سے مناظرے کا قرآنی اعجاز، اور استصحاب کے حنفی قاعدے «الاستصحاب حجة للدفع لا للإثبات» کا مکمل متن، سلیس اردو ترجمہ اور تفصیلی علمی نوٹس کا احاطہ کرتی ہے۔
    </p>
  </div>

  <!-- SECTION: TAMHEED (WHAT IS ILLAH TARDIYYAH?) -->
  <div class="section-title-banner">
    تمہیدِ اصولی: العلة الطردية کیا ہے اور العلة المؤثرة سے کیوں جدا ہے؟
  </div>

  <div class="tafseel-pdf-block" style="border-right-color: #d97706; background: #fffdf5;">
    <div class="tafseel-pdf-title">۱. حقیقتِ دوران بمقابلہ تاثیر:</div>
    <div class="tafseel-pdf-body">
      • <strong>العلة المؤثرة (احناف کی معتبر علت):</strong> وہ علت ہے جس کا شرعی مصلحت میں مؤثر ہونا نصوص یا اجماع سے ثابت ہو۔ جیسے شراب میں «اسکار» (نشہ لانا)۔<br>
      • <strong>العلة الطردية (دوران والی علت):</strong> وہ بے جان وصف جو حکم کے ساتھ محض ہمیشہ پایا جائے (الدوران وجوداً وعدماً) مگر شریعت میں اس کی کوئی معقول تاثیر ثابت نہ ہو! جیسے شراب کو محض سرخ رنگ یا مائع ہونے کی بنا پر حرام کہنا۔<br>
      • <strong>صدر الشریعہؒ کا قطعی فیصلہ: «الطرد باطل عندنا»</strong>؛ احناف کے نزدیک طرد سے قیاس قائم کرنا سرے سے باطل ہے۔ جب مناظر علتِ طردیہ پیش کرے تو حنفی فقیہ ۴ مناہج سے اس کا دفع کرتا ہے۔
    </div>
  </div>

  <!-- SECTION: 3-TIER MATAN, TARJAMAH & TAFSEEL -->
  <div class="section-title-banner">
    الباب الأول: متن التوضيح، سلیس اردو ترجمہ اور تفصیلی علمی نوٹس (۳ درجات)
  </div>

  <!-- Paragraph 1: Pages 382-383 -->
  <div class="sub-section-title">پیراگراف ۱: صفحات ۳۸۲ - ۳۸۳ (تعريف الطرد، القول بموجب العلة، والممانعة)</div>
  <table class="parallel-table">
    <tr>
      <td class="col-ar">
        <div class="box-label">القسم الأول: متن التوضيح</div>
        <div class="ar-text">
          «فصل في دفع العلل الطردية: لما عرفت أن العلة نوعان: إما علة مؤثرة وهي المعتبرة عندنا، وإما علة ثبتت عليتها بالدوران دون التأثير، وهي المعتبرة عند البعض، وتسمى علة طردية. ففي هذا الفصل تذكر الاعتراضات الواردة على القياس بالعلة الطردية، وهو أربعة: الأول: القول بموجب العلة... كقوله: المسح ركن في الوضوء فيسن تثليثه كغسل الوجه. فنقول: يسن عندنا أيضاً، لكن الفرض البعض، فالاستيعاب تثليث وزيادة... والثاني: الممانعة...»
        </div>
      </td>
      <td class="col-ur">
        <div class="box-label">القسم الثاني: سلیس اردو ترجمہ</div>
        <div class="ur-text">
          <strong>فصل: علتِ طردیہ پر اعتراضات کے دفع کا بیان:</strong><br>
          علت کی دو قسمیں ہیں: علتِ مؤثرہ جو ہمارے نزدیک معتبر ہے، اور علتِ طردیہ جو محض دوران سے ثابت ہو بغیر تاثیر کے۔ اس پر اعتراضات کے ۴ طریقے ہیں: ۱. القول بموجب العلة (معلل کے کلام کے تقاضے کو تسلیم کرنا مگر اصل نزاع باقی رکھنا؛ جیسے مسحِ سر میں استیعاب کو تثلیث کے درجے میں تسلیم کرنا)، ۲. الممانعة (وصف یا حکم کا انکار کرنا جیسے کفارہ صوم کا تعلق جماع سے نہیں بلکہ فطر سے ہے)۔
        </div>
      </td>
    </tr>
  </table>

  <div class="tafseel-pdf-block">
    <div class="tafseel-pdf-title">القسم الثالث • تفصیلی علمی نوٹس: القول بموجب العلة کا فن</div>
    <div class="tafseel-pdf-body">
      اس طریقے میں معترض معلل کی دلیل کا انکار نہیں کرتا بلکہ کہتا ہے کہ آپ کی دلیل سے جو بات ثابت ہو رہی ہے وہ ہمارے ہاں بھی مسلم ہے مگر اس سے ہمارا اصل دعویٰ نہیں ٹوٹتا۔ مسحِ سر میں ۳ بار کے الگ تکرار کے بجائے جب پورا سر مسح کر لیا گیا تو چوتھائی فرض ادا ہوا اور باقی تین چوتھائی تکرار کے قائم مقام ہو گیا، پس قیاس بے اثر ہو گیا۔
    </div>
  </div>

  <!-- Paragraph 2: Pages 384-385 -->
  <div class="sub-section-title">پیراگراف ۲: صفحات ۳۸۴ - ۳۸۵ (فساد الوضع ومسألة إسلام أحد الزوجين)</div>
  <table class="parallel-table">
    <tr>
      <td class="col-ar">
        <div class="box-label">القسم الأول: متن التوضيح</div>
        <div class="ar-text">
          «والثالث: فساد الوضع: وقد مر تفسيره، وهو فوق المناقضة؛ إذ يمكن الاحتراز عنها بتغيير الكلام، أما هو فيبطل العلة أصلاً... كتعليله لإيجاب الفرقة بإسلام أحد الزوجين عند الشافعي رحمه الله... فقد جعل الإسلام علة لإيجاب الفرقة ولإبقاء النکاح مع ارتداد أحدهما! ثم في المتن يقيم الدليل على فساد الوضع بقوله: فإن الإسلام لا يصلح قاطعاً للنعمة، والردة لا تصلح عفواً.»
        </div>
      </td>
      <td class="col-ur">
        <div class="box-label">القسم الثاني: سلیس اردو ترجمہ</div>
        <div class="ur-text">
          <strong>۳. فساد الوضع:</strong> یہ مناقضہ سے بھی شدید ہے کیونکہ یہ علت کی جڑ کاٹ دیتا ہے۔ امام شافعیؒ نے ذمی میاں بیوی میں سے ایک کے اسلام لانے پر فوری تفریق کا قیاس کیا، تو انہوں نے اسلام کو فرقت کی علت بنا دیا۔ صدر الشریعہؒ نے فرمایا: یہ صریح فسادِ وضع ہے؛ کیونکہ <em>اسلام شریعت میں نعمت اور الفت کے لیے آیا ہے، وہ نکاح کی نعمت کو کاٹنے والا نہیں بن سکتا!</em> اور ارتداد جرم ہے وہ عفو کا سبب نہیں بن سکتا!
        </div>
      </td>
    </tr>
  </table>

  <div class="tafseel-pdf-block">
    <div class="tafseel-pdf-title">القسم الثالث • تفصیلی علمی نوٹس: اسلام کی شرعی وضع</div>
    <div class="tafseel-pdf-body">
      شریعت میں جو شے نعمت اور احسان ہو اس پر سزا اور جدائی مرتب کرنا فسادِ وضع ہے۔ احناف فرماتے ہیں کہ دوسرے فریق پر اسلام پیش کیا جائے گا، اگر وہ انکار کرے تو فرقت اس کے انکار کی سزا ہوگی نہ کہ پہلے کے اسلام لانے کی!
    </div>
  </div>

  <div class="page-break"></div>

  <!-- Paragraph 3: Pages 385-386 -->
  <div class="sub-section-title">پیراگراف ۳: صفحات ۳۸۵ - ۳۸۶ (المناقضة، والجمع بين البزدوي وصاحب الهداية)</div>
  <table class="parallel-table">
    <tr>
      <td class="col-ar">
        <div class="box-label">القسم الأول: متن التوضيح</div>
        <div class="ar-text">
          «الرابع: المناقضة: وهي تلجئ أصحاب الطرد إلى المؤثرة، كقوله: الوضوء والتيمم طهارتان فيستويان في النية، فينتقض بتطهير الخبث... والتوفيق بين كلام فخر الإسلام وصاحب الهداية: أن مراد فخر الإسلام بكونه غير معقول أنه لا يستقل العقل بدركه، ومراد صاحب الهداية بكونه معقولاً أنه إذا علم أن هذا الوصف قد وجد، وأن الشرع قد حكم بهذا الحكم، يحكم العقل بأن هذا الحكم إنما هو لأجل هذا الوصف.»
        </div>
      </td>
      <td class="col-ur">
        <div class="box-label">القسم الثاني: سلیس اردو ترجمہ</div>
        <div class="ur-text">
          <strong>۴. المناقضة:</strong> یہ طریقہ طرد والوں کو مجبور کر کے علتِ مؤثرہ کی طرف لاتا ہے۔ جیسے وضوء اور تیمم میں نیت کی شرط کو طہارتِ خبث سے توڑنا۔<br>
          <strong>بزدویؒ اور صاحبِ ہدایہؒ کی تطبیق:</strong> بزدویؒ کی مراد یہ ہے کہ عقل آزادانہ طور پر اس علت کو نہیں پا سکتی (المعقول الأخص)؛ جبکہ صاحبِ ہدایہؒ کی مراد یہ ہے کہ شریعت کے بتانے کے بعد عقل تسلیم کرتی ہے کہ پانی سے زوالِ نجاست معقول ہے (المعقول الأعم)۔
        </div>
      </td>
    </tr>
  </table>

  <!-- Paragraph 4: Pages 387-388 -->
  <div class="sub-section-title">پیراگراف ۴: صفحات ۳۸۷ - ۳۸۸ (فصل في الانتقال ومناظرة الخليل إبراهيم عليه السلام)</div>
  <table class="parallel-table">
    <tr>
      <td class="col-ar">
        <div class="box-label">القسم الأول: متن التوضيح</div>
        <div class="ar-text">
          «فصل في الانتقال: أي الانتقال من كلام إلى آخر قبل أن يتم إثبات الحكم الأول، والصور أربع... وأما قصة الخليل عليه السلام فإن الحجة الأولى وهي قوله تعالى: ﴿رَبِّيَ الَّذِي يُحْيِي وَيُمِيتُ﴾ كانت ملزمة، واللعين عارضه بأمر باطل وهو قوله: ﴿أَنَا أُحْيِي وَأُمِيتُ﴾، فالخليل عليه السلام لما خاف الاشتباه والتلبيس على القوم انتقل إلى العلة التي لا يكون فيها اشتباه أصلاً، وهو قوله: ﴿فَإِنَّ اللَّهَ يَأْتِي بِالشَّمْسِ مِنَ الْمَشْرِقِ فَأْتِ بِهَا مِنَ الْمَغْرِبِ فَبُهِتَ الَّذِي كَفَرَ﴾.»
        </div>
      </td>
      <td class="col-ur">
        <div class="box-label">القسم الثاني: سلیس اردو ترجمہ</div>
        <div class="ur-text">
          <strong>فصل: مناظرے میں انتقال کے احکام:</strong><br>
          حضرت ابراہیمؑ کی پہلی دلیل ﴿رَبِّيَ الَّذِي يُحْيِي وَيُمِيتُ﴾ بذاتِ خود قطعی اور ملزم تھی۔ مگر نمرود نے دو قیدیوں کو لا کر ایک کو چھوڑ دیا اور دوسرے کو مار کر عوام کے سامنے جھوٹا ناٹک کیا۔ حضرت ابراہیمؑ نے جب دیکھا کہ جاہل عوام اس مغالطے میں پڑ سکتی ہے تو آپ نے فوراً ایسی بدیہی دلیل پیش فرمائی جس میں مغالطے کی گنجائش ہی نہ تھی: ﴿فَإِنَّ اللَّهَ يَأْتِي بِالشَّمْسِ مِنَ الْمَشْرِقِ... فَبُهِتَ الَّذِي كَفَرَ﴾!
        </div>
      </td>
    </tr>
  </table>

  <div class="tafseel-pdf-block">
    <div class="tafseel-pdf-title">القسم الثالث • تفصیلی علمی نوٹس: انتقال بمقابلہ افحامِ خصم</div>
    <div class="tafseel-body">
      حضرت ابراہیمؑ کا مشرق و مغرب والی دلیل پر جانا مناظرے کا عاجزانہ انقطاع نہیں تھا بلکہ نمرود کے سستے عوامی مغالطے کا فوری منہ توڑ جواب اور خصم کو سرعام لاجواب و مبہوت کر دینا تھا («فَبُهِتَ الَّذِي كَفَرَ»)۔
    </div>
  </div>

  <!-- Paragraph 5: Pages 388-389 -->
  <div class="sub-section-title">پیراگراف ۵: صفحات ۳۸۸ - ۳۸۹ (فصل في الحجج الفاسدة: الاستصحاب حجة للدفع لا للإثبات)</div>
  <table class="parallel-table">
    <tr>
      <td class="col-ar">
        <div class="box-label">القسم الأول: متن التوضيح</div>
        <div class="ar-text">
          «فصل في الحجج الفاسدة: الاستصحاب عند الشافعي رحمه الله حجة في كل شيء ثبت وجوده بدليل ثم وقع الشك في بقائه. وعندنا: حجة للدفع لا للإثبات... وكلامنا فيما لا دليل على البقاء، كحياة المفقود؛ فيرث عنده لا عندنا؛ لأن الإرث من باب الإثبات فلا يثبت به، ولا يورث؛ لأن عدم الإرث من باب الدفع فيثبت به. والصلح على الإنكار يصح عندنا لا عنده.»
        </div>
      </td>
      <td class="col-ur">
        <div class="box-label">القسم الثاني: سلیس اردو ترجمہ</div>
        <div class="ur-text">
          <strong>فصل: حججِ فاسدہ اور استصحاب:</strong><br>
          امام شافعیؒ کے نزدیک استصحاب اثبات اور دفع دونوں میں حجت ہے۔ جبکہ احناف کے نزدیک: <strong>«الاستصحاب حجة للدفع لا للإثبات»</strong>۔<br>
          • <strong>مفقود الخبر شخص:</strong> اپنے مال میں زندہ رہے گا (لہٰذا اس کا مال ورثاء نہیں بانٹ سکتے کیونکہ یہ دفع ہے)، لیکن دوسروں کا مال وراثت میں نہیں پا سکتا (کیونکہ نیا حق حاصل کرنا اثبات ہے اور استصحاب سے اثبات باطل ہے)۔<br>
          • <strong>الصلح علی الإنکار:</strong> ہمارے نزدیک جائز اور شوافع کے نزدیک باطل ہے۔
        </div>
      </td>
    </tr>
  </table>

  <!-- SECTION: SUMMARY TABLE -->
  <div class="section-title-banner">
    الباب الثاني: تقابلی اصولی جدول (طرد، انتقال اور استصحاب)
  </div>

  <table class="rules-table">
    <tr>
      <th>اصولی باب</th>
      <th>موقفِ احناف (صدر الشریعہؒ)</th>
      <th>موقفِ مخالف (شوافع / معتزلہ)</th>
      <th>فقہی ثمرہ و نظیر</th>
    </tr>
    <tr>
      <td><strong>العلة الطردية</strong></td>
      <td>الطرد باطل؛ صرف علتِ مؤثرہ معتبر ہے۔</td>
      <td>دورانِ وصف سے علیت ثابت ہو جاتی ہے۔</td>
      <td>شراب کے رنگ یا مائعت پر حرمت کا قیاس باطل ہے۔</td>
    </tr>
    <tr>
      <td><strong>فنِ انتقال</strong></td>
      <td>دلیل چھوڑنا باطل ہے مگر افحامِ خصم اور دفعِ مغالطہ کے لیے جائز ہے۔</td>
      <td>ہر قسم کا انتقال مناظرے میں عجز ہے۔</td>
      <td>مناظرۂ ابراہیمؑ مع النمرود فی الاحیاء والاماتہ والشمس۔</td>
    </tr>
    <tr>
      <td><strong>استصحابِ حال</strong></td>
      <td>حجة للدفع لا للإثبات (صرف حق بچانے کی دلیل)۔</td>
      <td>حجة للإثبات والدفع معاً (نیا حق جمانے کی بھی دلیل)۔</td>
      <td>مفقود الخبر کا مال تقسیم نہیں ہوگا مگر وہ کسی کا وارث نہیں بنے گا۔</td>
    </tr>
  </table>

</body>
</html>
    `;

    await pageMaster.setContent(masterHTML, { waitUntil: 'networkidle0' });
    await pageMaster.pdf({
      path: MASTER_PDF_PATH,
      format: 'A4',
      printBackground: true,
      margin: { top: '15mm', right: '14mm', bottom: '16mm', left: '14mm' }
    });
    console.log('Master Topic PDF created at:', MASTER_PDF_PATH);
    await pageMaster.close();

    /* ==============================================================
       2. GENERATE LECTURE NOTES PDF (Tawzeeh-Tardiyah-Lecture-Notes.pdf)
       ============================================================== */
    console.log('Generating Tawzeeh Tardiyah Lecture Notes PDF...');
    const pageNotes = await browser.newPage();

    const notesHTML = `
<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>التوضيح لصدر الشريعة | درسی خلاصہ و نوٹس (فصل في دفع العلل الطردية والانتقال والاستصحاب)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 12mm 15mm 12mm;
      @top-center {
        content: "درسی خلاصہ و لیکچر نوٹس • التوضيح: فصل في دفع العلل الطردية والانتقال والاستصحاب (ص ۳۸۲ - ۳۸۹)";
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
    h1 {
      font-family: 'Amiri', serif;
      font-size: 19pt;
      color: #78350f;
      margin: 2px 0;
    }
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
      بحث: دفعِ عللِ طردیہ کے ۴ مناہج، طہارتِ وضوء کی معقولیت، فنِ انتقال و مناظرۂ ابراہیمیؑ، اور استصحابِ حال
    </div>
  </div>

  <div class="summary-card">
    <div class="card-title">۱. العلة الطردية اور العلة المؤثرة میں فرق:</div>
    <p style="margin: 0; font-size: 9.2pt; line-height: 1.75;">
      علتِ مؤثرہ وہ ہے جس کی تاثیر شریعت سے ثابت ہو (جیسے شراب میں اسکار)۔ علتِ طردیہ وہ ہے جو صرف اتفاقی ہمراہی (دوران) سے ثابت ہو تاثیر کے بغیر۔ احناف کے نزدیک «الطرد باطل» ہے اور محض دوران سے قیاس نہیں بنتا۔
    </p>
  </div>

  <div class="summary-card">
    <div class="card-title">۲. دفعِ طرد کے ۴ مناہجِ قاطع:</div>
    <p style="margin: 0; font-size: 9.2pt; line-height: 1.75;">
      • <strong>القول بموجب العلة:</strong> معلل کے تقاضے کو مان کر بھی اپنا دعویٰ محفوظ رکھنا (مسحِ سر میں استیعاب کو تثلیث کے درجے میں تسلیم کرنا)۔<br>
      • <strong>الممانعة:</strong> وصف یا حکم کا انکار (کفارہ صوم جماع پر نہیں فطر پر ہے)۔<br>
      • <strong>فساد الوضع:</strong> علت کو مصلحت کے الٹ بنانا (اسلام کو زوجین کی فرقت کا سبب بنانا باطل ہے)۔<br>
      • <strong>المناقضة:</strong> طردی علت کو کسی دوسری شرعی نظیر سے توڑ کر معلل کو مؤثرہ کی پناہ لینے پر مجبور کرنا (وضو میں نیت کی شرط کو طہارتِ خبث سے توڑنا)۔
    </p>
  </div>

  <div class="summary-card">
    <div class="card-title">۳. فنِ انتقال اور مناظرۂ سیدنا ابراہیم خلیل اللہ علیہ السلام:</div>
    <p style="margin: 0; font-size: 9.2pt; line-height: 1.75;">
      مناظرے میں بغیر دلیل مکمل کیے دوسری بات پر جانا عجز ہے، مگر حضرت ابراہیمؑ کا نمرود کے سامنے ﴿رَبِّيَ الَّذِي يُحْيِي وَيُمِيتُ﴾ سے ﴿فَإِنَّ اللَّهَ يَأْتِي بِالشَّمْسِ مِنَ الْمَشْرِقِ﴾ کی طرف جانا عجز نہیں تھا بلکہ نمرود کے سستے عوامی مغالطے کو کاٹ کر خصم کو سرعام ہکا بکا و لاجواب کرنا تھا («فَبُهِتَ الَّذِي كَفَرَ»)!
    </p>
  </div>

  <div class="summary-card">
    <div class="card-title">۴. قاعدہ: «الاستصحاب حجة للدفع لا للإثبات»:</div>
    <p style="margin: 0; font-size: 9.2pt; line-height: 1.75;">
      شوافع کے نزدیک استصحاب اثبات اور دفع دونوں کی حجت ہے۔ احناف کے نزدیک استصحاب صرف حق کے تحفظ اور دفع کی حجت بنتا ہے، کسی دوسرے پر نیا حق جمانے کی نہیں۔<br>
      • <strong>مفقود الخبر شخص:</strong> اپنے مال میں زندہ رہے گا (دفع)، دوسروں کی وراثت میں میت مانا جائے گا (اثبات کی نفی)۔<br>
      • <strong>الصلح علی الإنکار:</strong> ہمارے نزدیک صحیح ہے کیونکہ مدعا علیہ نے مال دے کر تہمت دفع کی ہے۔
    </p>
  </div>

</body>
</html>
    `;

    await pageNotes.setContent(notesHTML, { waitUntil: 'networkidle0' });
    await pageNotes.pdf({
      path: NOTES_PDF_PATH,
      format: 'A4',
      printBackground: true,
      margin: { top: '14mm', right: '12mm', bottom: '15mm', left: '12mm' }
    });
    console.log('Lecture Notes PDF created at:', NOTES_PDF_PATH);
    await pageNotes.close();

  } catch (err) {
    console.error('Error generating Tardiyah PDFs:', err);
  } finally {
    await browser.close();
    console.log('Browser closed. Tardiyah PDFs generation complete.');
  }
}

generateTardiyahPDFs();

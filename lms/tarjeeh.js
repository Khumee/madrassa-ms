/**
 * التوضيح في حل غوامض التنقيح - صدر الشريعة المحبوبي الحنفيؒ
 * باب المعارضة والترجيح
 * Interactive Application Engine: Navigation, View Filters, Visual Slides Player & Assessment Quiz
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initThemeToggle();
  initViewFilters();
  initSlidesPlayer();
  initQuiz();
});

/* ========================================================
   1. NAVIGATION & DEEP LINKING
======================================================== */
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  function switchTab(targetTabId) {
    navButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === targetTabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    tabPanes.forEach(pane => {
      if (pane.id === targetTabId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      if (tabId) switchTab(tabId);
    });
  });

  document.addEventListener('click', (e) => {
    const clickable = e.target.closest('[data-goto]');
    if (clickable) {
      e.preventDefault();
      const targetTabId = clickable.getAttribute('data-goto');
      if (targetTabId) {
        switchTab(targetTabId);
      }
    }
  });
}

/* ========================================================
   2. THEME SWITCHER
======================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('dars_theme') || 'theme-dars';
  if (currentTheme === 'theme-light') {
    document.body.classList.add('theme-light');
  }

  themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('theme-light');
    localStorage.setItem('dars_theme', isLight ? 'theme-light' : 'theme-dars');
  });
}

/* ========================================================
   3. ARABIC / URDU VIEW FILTERING
======================================================== */
function initViewFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const view = btn.getAttribute('data-view');
      document.body.classList.remove('view-arabic-only', 'view-urdu-only');

      if (view === 'ar') {
        document.body.classList.add('view-arabic-only');
      } else if (view === 'ur') {
        document.body.classList.add('view-urdu-only');
      }
    });
  });
}

/* ========================================================
   4. VISUAL PRESENTATION SLIDES PLAYER
======================================================== */
function initSlidesPlayer() {
  const slides = document.querySelectorAll('.lecture-slide');
  const prevBtn = document.getElementById('slidePrevBtn');
  const nextBtn = document.getElementById('slideNextBtn');
  const currentIndicator = document.getElementById('slideCurrentNum');
  const totalIndicator = document.getElementById('slideTotalNum');
  const progressBar = document.getElementById('slideProgressBar');

  if (!slides.length) return;

  let currentSlideIndex = 0;
  const totalSlides = slides.length;
  if (totalIndicator) totalIndicator.textContent = totalSlides;

  function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentSlideIndex = index;

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlideIndex);
    });

    if (currentIndicator) currentIndicator.textContent = currentSlideIndex + 1;
    if (progressBar) {
      const pct = ((currentSlideIndex + 1) / totalSlides) * 100;
      progressBar.style.width = `${pct}%`;
    }

    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => showSlide(currentSlideIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => showSlide(currentSlideIndex + 1));
  }

  // Keyboard navigation when slides tab is visible
  document.addEventListener('keydown', (e) => {
    const slidesTab = document.getElementById('tab-slides');
    if (slidesTab && slidesTab.classList.contains('active')) {
      if (e.key === 'ArrowLeft' || e.key === 'PageDown') {
        showSlide(currentSlideIndex + 1); // RTL Next
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        showSlide(currentSlideIndex - 1); // RTL Prev
      }
    }
  });

  showSlide(0);
}

/* ========================================================
   5. STUDENT ASSESSMENT QUIZ
======================================================== */
function initQuiz() {
  const quizData = [
    {
      q: '۱. التوضيح لصدر الشريعة کے مطابق دو دلیلوں میں "معارضہ" کے تحقق کی بنیادی شرط کیا ہے؟',
      options: [
        'دونوں دلیلیں تاریخی لحاظ سے منسوخ ہوں',
        'ایک ہی محل اور ایک ہی زمانے میں ایک دوسرے کی ضد کا تقاضا کریں اور قوت میں برابر ہوں یا وصفِ تابع سے قوی ہوں',
        'ایک دلیل قطعی قرآنی نص ہو اور دوسری قیاس ہو',
        'دونوں دلیلیں غیر متناہی معلولات کے سلسلے کا تقاضا کریں'
      ],
      correct: 1,
      exp: 'متن التنقيح وشرحه التوضيح: «إذا ورد دليلان يقتضي أحدهما عدم ما يقتضيه الآخر في محل واحد، في زمان واحد، فإن تساويا قوة أو يكون أحدهما أقوى بوصف هو تابع، فبينهما معارضة»۔'
    },
    {
      q: '۲. خریدا ہوا بھائی آزاد ہونے کے مسئلے میں امام شافعیؒ کے استدلال کو صدر الشريعةؒ نے کیا قرار دیا؟',
      options: [
        'ترجیح بکثرة الأدلة',
        'الترجيح بغلبة الأشباه (جو کہ فاسد اور باطل ہے)',
        'الترجيح بقوة التأثير',
        'الترجيح بقلة الأجزاء'
      ],
      correct: 1,
      exp: 'امام شافعیؒ نے فرمایا کہ بھائی چچا کے بیٹے کے مشابہ ۴ اوصاف میں ہے اور بیٹے کے مشابہ فقط ۱ وصف میں۔ صدر الشریعہؒ نے فرمایا یہ غلبۂ اشباہ ہے اور باطل ہے کیونکہ ایک موثر وصف ہزار غیر موثر اوصاف سے قوی ہے۔'
    },
    {
      q: '۳. التوضيح میں بیان کردہ کشتی اور وزن اٹھانے کی تمثیل کا بنیادی اصولی راز کیا ہے؟',
      options: [
        'کثرت صرف وہاں معتبر ہے جہاں "ہیئتِ اجتماعیہ" بنے (جیسے وزن اٹھانا)، اور جہاں حکم انفرادی ہو (جیسے کشتی اور دلائل) وہاں ۱ قوی دلیل ہزار کمزوروں پر غالب ہے',
        'کشتی میں کثرت ہمیشہ جیت جاتی ہے',
        'دونوں میں کثرت بالکل ایک جیسی ہوتی ہے',
        'اس کا تعلق صرف جسمانی طاقت سے ہے فقہ سے نہیں'
      ],
      correct: 0,
      exp: 'التوضيح ص ۴۰۳: «الكثرة معتبرة في كل موضع يحصل بها هيئة اجتماعية ويكون الحكم منوطاً بالمجموع (كحمل الأثقال)، وغير معتبرة في كل موضع لا يحصل به هيئة اجتماعية (كالمصارعة)»۔'
    },
    {
      q: '۴. دو متعارض نصوص اور دو متعارض قیاسات میں کیا بنیادی فرق ہے؟',
      options: [
        'نصوص میں جہلِ ناسخ کے وقت دونوں ساقط ہو جاتی ہیں، جبکہ دو قیاسات کبھی ساقط نہیں ہوتے بلکہ مجتہد کو دل کے اطمینان سے اختیار ہوتا ہے',
        'قیاس ساقط ہو جاتا ہے اور نصوص کبھی ساقط نہیں ہوتیں',
        'دونوں ہر صورت میں بیک وقت ساقط ہو جاتے ہیں',
        'دونوں میں قرعہ اندازی کی جاتی ہے'
      ],
      correct: 0,
      exp: 'التوضيح ص ۳۹۶-۳۹۷: نصوص میں تعارض پر تساقط ہوتا ہے کیونکہ ناسخ سے جہل ہے، جبکہ قیاس میں دونوں جانب دلیل موجود ہے لہٰذا «ولا يسقطان بالتعارض»۔'
    },
    {
      q: '۵. جب دو متعارض نصوص میں تاریخ معلوم نہ ہو تو حنفیہ کے نزدیک کیا اصولی ضابطہ جاری ہوتا ہے؟',
      options: [
        'دونوں کو ایک ساتھ فوری طور پر منسوخ مانا جائے گا',
        '«المحرِّم ناسخ للمبيح» (حرام کرنے والی نص مبیح کے لیے ناسخ ہوگی)',
        'مبیح نص کو ناسخ مانا جائے گا',
        'نص کو قیاس پر محمول کیا جائے گا'
      ],
      correct: 1,
      exp: 'التوضيح ص ۳۹۳: «يجعل المحرم ناسخاً؛ لأن قبل البعثة كان الأصل الإباحة، والمبيح ورد لإبقائه، ثم المحرم نسخه»۔'
    }
  ];

  const quizContainer = document.getElementById('quizCardsContainer');
  const quizScore = document.getElementById('quizScore');
  const resetBtn = document.getElementById('resetQuizBtn');

  if (!quizContainer) return;

  let answered = {};

  function renderQuiz() {
    quizContainer.innerHTML = '';
    quizData.forEach((item, qIdx) => {
      const card = document.createElement('div');
      card.className = 'quiz-card';
      card.id = `quizCard-${qIdx}`;

      let optionsHtml = '';
      item.options.forEach((opt, optIdx) => {
        optionsHtml += `
          <button class="quiz-option" data-q="${qIdx}" data-opt="${optIdx}">
            <span class="opt-indicator">${String.fromCharCode(0x0627 + optIdx)}</span>
            <span class="opt-text">${opt}</span>
          </button>
        `;
      });

      card.innerHTML = `
        <div class="quiz-q-title">${item.q}</div>
        <div class="quiz-options-grid">${optionsHtml}</div>
        <div class="quiz-feedback" id="quizFeedback-${qIdx}" style="display: none;"></div>
      `;

      quizContainer.appendChild(card);
    });

    quizContainer.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const qIdx = parseInt(btn.getAttribute('data-q'));
        const optIdx = parseInt(btn.getAttribute('data-opt'));
        selectAnswer(qIdx, optIdx);
      });
    });

    updateScore();
  }

  function selectAnswer(qIdx, optIdx) {
    if (answered[qIdx] !== undefined) return;
    answered[qIdx] = optIdx;

    const item = quizData[qIdx];
    const isCorrect = optIdx === item.correct;
    const card = document.getElementById(`quizCard-${qIdx}`);
    const feedback = document.getElementById(`quizFeedback-${qIdx}`);

    const options = card.querySelectorAll('.quiz-option');
    options.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === item.correct) {
        btn.classList.add('correct');
      } else if (idx === optIdx && !isCorrect) {
        btn.classList.add('incorrect');
      }
    });

    feedback.style.display = 'block';
    feedback.className = `quiz-feedback ${isCorrect ? 'fb-correct' : 'fb-incorrect'}`;
    feedback.innerHTML = `
      <strong>${isCorrect ? '✅ بالکل درست جواب۔ ماشاء اللہ!' : '❌ جواب درست نہیں۔'}</strong>
      <p class="mt-1">${item.exp}</p>
    `;

    updateScore();
  }

  function updateScore() {
    let score = 0;
    Object.keys(answered).forEach(qIdx => {
      if (answered[qIdx] === quizData[qIdx].correct) {
        score++;
      }
    });
    if (quizScore) {
      quizScore.textContent = `اسکور: ${score} / ${quizData.length}`;
    }
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      answered = {};
      renderQuiz();
    });
  }

  renderQuiz();
}

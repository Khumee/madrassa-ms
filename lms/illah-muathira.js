/**
 * التوضيح في حل غوامض التنقيح - صدر الشريعة المحبوبي الحنفيؒ
 * فصل في دفع العلل المؤثرة (صفحات ۳۷۰ تا ۳۸۰)
 * Interactive Application Engine: Tabs, Themes, Visual Logic & Assessment Quiz
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initThemeToggle();
  initAudioPill();
  initPagePills();
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
   3. AUDIO TOGGLE PILL
======================================================== */
function initAudioPill() {
  const audioBtn = document.getElementById('audioToggleBtn');
  if (!audioBtn) return;

  let isPlaying = false;
  audioBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      audioBtn.classList.add('playing');
      audioBtn.querySelector('.audio-text').textContent = 'تلاوت جاری ہے...';
    } else {
      audioBtn.classList.remove('playing');
      audioBtn.querySelector('.audio-text').textContent = 'صوتی مطالعہ';
    }
  });
}

/* ========================================================
   4. PAGE PILLS SMOOTH SCROLLING
======================================================== */
function initPagePills() {
  const pills = document.querySelectorAll('.page-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = pill.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ========================================================
   5. VISUAL SLIDES PLAYER
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

  document.addEventListener('keydown', (e) => {
    const slidesTab = document.getElementById('tab-slides');
    if (slidesTab && slidesTab.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        showSlide(currentSlideIndex + 1); // RTL Next
      } else if (e.key === 'ArrowRight') {
        showSlide(currentSlideIndex - 1); // RTL Prev
      }
    }
  });

  showSlide(0);
}

/* ========================================================
   6. STUDENT ASSESSMENT QUIZ
======================================================== */
function initQuiz() {
  const quizData = [
    {
      q: '۱. التوضیح کے مطابق "النقض" کی اصطلاحی تعریف کیا ہے؟',
      options: [
        'ایک حکم کی دو متضاد دلیلیں آنا',
        'کسی صورت میں علت کا پایا جانا مگر شرعی حکم کا مفقود اور متخلف ہونا',
        'اصل اور فرع کے درمیان وصف کا مفقود ہونا',
        'مخالف کی دلیل کو بعینہ تسلیم کرنا'
      ],
      correct: 1,
      exp: 'متنِ التوضیح: «النقض: وهو وجود العلة في صورة مع تخلف الحكم». یعنی علت تو موجود ہو مگر شرعی حکم نہ نکلے۔'
    },
    {
      q: '۲. خروجِ نجاست پر وضو نہ ٹوٹنے کے نقض (خونِ قلیل) کا حنفی معلل کیا جواب دیتا ہے؟',
      options: [
        'الدفع بالغرض',
        'منع وجود العلة (منع الوصف)؛ کیونکہ شریعت میں خروج نام ہے بہہ کر طہارت کے مقام تک پہنچنے کا، اور قلیل میں سیلان مفقود ہے',
        'تخصیص العلة',
        'عدم الانعکاس'
      ],
      correct: 1,
      exp: 'التوضیح ص ۳۷۰: «خروج النجاسة علة للانتقاض، فنوقض بالقليل، فيمنع الخروج فيه»؛ کیونکہ خون کا صرف ابھرنا خروج نہیں بلکہ بہنا شرط ہے۔'
    },
    {
      q: '۳. صدر الشریعہؒ کے نزدیک تیر اندازی میں زرہ سے تیر کا رک جانا فقہ میں کس مانع کے مشابہ ہے؟',
      options: [
        'خیارِ عیب کے',
        'خیارِ رؤیت کے',
        'خیارِ شرط کے (مانع من ابتداء الحكم)',
        'بیعِ حر کے'
      ],
      correct: 2,
      exp: 'التوضیح ص ۳۷۴: «أو من ابتداء الحكم: كما إذا أصاب السهم فدفعه الدرع، وكخيار الشرط»؛ کیونکہ خیارِ شرط بیع کے ابتدائی حکم (ملکیت) کو روک دیتا ہے۔'
    },
    {
      q: '۴. شوافع کے مقابلے میں احناف کا "تخصیصِ علت" کے بارے میں حتمی موقف کیا ہے؟',
      options: [
        'تخصیصِ علت شرعاً جائز ہے',
        'تخصیصِ علت سرے سے باطل ہے؛ حکم کا نہ ہونا حقیقت میں علت کے مفقود ہونے کی بنا پر ہے کیونکہ عدمِ مانع خود علت کا جزو یا شرط ہے',
        'تخصیصِ علت صرف مالی معاملات میں جائز ہے',
        'تخصیصِ علت کا فیصلہ قرعہ اندازی سے ہوتا ہے'
      ],
      correct: 1,
      exp: 'التوضیح ص ۳۷۳-۳۷۴: «ونحن لا نقول به، بل نقول: إنما عدم الحكم لعدم ما هو العلة حقيقة، فنجعل عدم المانع جزءاً للعلة أو شرطاً لها»۔'
    },
    {
      q: '۵. مناظرے میں مخالف کی دلیل سے ہی اس کے دعوے کی نقیض ثابت کرنے کو کیا کہتے ہیں؟',
      options: [
        'الفرق',
        'عدم الانعکاس',
        'القلب (جیسے صومِ رمضان میں فرضیت کے وصف سے نیت کی تعیین کی نفی کرنا)',
        'الممانعة فی الوصف'
      ],
      correct: 2,
      exp: 'التوضیح ص ۳۷۸: «فإن دل على نقيض الحكم بعينه فقلب، كقوله: صوم رمضان صوم فرض فلا يتأدى إلا بتعيين النية كالقضاء، فنقول: صوم رمضان صوم فرض، فيستغني عن التعيين...»۔'
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
      const qCard = document.createElement('div');
      qCard.className = 'card quiz-question-card mt-3';

      let optionsHtml = '';
      item.options.forEach((opt, optIdx) => {
        optionsHtml += `
          <button class="quiz-option-btn" data-q="${qIdx}" data-opt="${optIdx}">
            <span class="opt-indicator">${String.fromCharCode(65 + optIdx)}</span>
            <span class="opt-label">${opt}</span>
          </button>
        `;
      });

      qCard.innerHTML = `
        <div class="q-header">
          <span class="q-number">سوال ${qIdx + 1}</span>
          <h4 class="q-text">${item.q}</h4>
        </div>
        <div class="q-options-grid mt-2">
          ${optionsHtml}
        </div>
        <div class="q-explanation mt-3" id="qExp_${qIdx}" style="display: none;">
          <div class="exp-title">💡 اصولی وضاحت:</div>
          <p class="exp-text">${item.exp}</p>
        </div>
      `;

      quizContainer.appendChild(qCard);
    });

    attachOptionListeners();
    updateScore();
  }

  function attachOptionListeners() {
    const optButtons = quizContainer.querySelectorAll('.quiz-option-btn');
    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const qIdx = parseInt(btn.getAttribute('data-q'), 10);
        const optIdx = parseInt(btn.getAttribute('data-opt'), 10);

        if (answered[qIdx] !== undefined) return; // already answered

        answered[qIdx] = optIdx;

        const isCorrect = optIdx === quizData[qIdx].correct;
        const allQBtns = quizContainer.querySelectorAll(`[data-q="${qIdx}"]`);

        allQBtns.forEach(b => {
          const bOpt = parseInt(b.getAttribute('data-opt'), 10);
          if (bOpt === quizData[qIdx].correct) {
            b.classList.add('correct');
          } else if (bOpt === optIdx && !isCorrect) {
            b.classList.add('wrong');
          }
          b.disabled = true;
        });

        const expEl = document.getElementById(`qExp_${qIdx}`);
        if (expEl) expEl.style.display = 'block';

        updateScore();
      });
    });
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

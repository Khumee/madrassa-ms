/**
 * التوضيح في حل غوامض التنقيح - صدر الشريعة المحبوبي الحنفيؒ
 * فصل في دفع العلل الطردية والانتقال والاستصحاب (صفحات ۳۸۲ تا ۳۸۹)
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
      q: '۱. التوضیح کے مطابق "العلة الطردية" سے کیا مراد ہے؟',
      options: [
        'وہ علت جس کی تاثیر شریعت سے ثابت ہو',
        'وہ علت جس کی علیت محض دوران (ہمراہی) سے مانی جائے تاثیر کے بغیر',
        'وہ علت جو صرف مفقود الخبر شخص پر لاگو ہو',
        'وہ علت جو نصِ صریح سے منسوخ ہو چکی ہو'
      ],
      correct: 1,
      exp: 'التوضیح ص ۳۸۲: «وإما علة ثبتت عليتها بالدوران دون التأثير، وهي المعتبرة عند البعض، وتسمى علة طردية»۔'
    },
    {
      q: '۲. امام شافعیؒ نے ذمی میاں بیوی میں سے ایک کے اسلام لانے پر فوری فرقت کی جو علت بیان کی، صدر الشریعہؒ نے اسے کیا قرار دیا؟',
      options: [
        'الدفع بالحکم',
        'فساد الوضع؛ کیونکہ اسلام نعمت اور الفت ہے، وہ نکاح کی نعمت کو کاٹنے والا نہیں بن سکتا',
        'القول بموجب العلة',
        'استصحابِ حال'
      ],
      correct: 1,
      exp: 'التوضیح ص ۳۸۴-۳۸۵: «وأما فساد الوضع فإنه يبطل العلة بكليتها كتعليله لإيجاب الفرقة بإسلام أحد الزوجين... فإن الإسلام لا يصلح قاطعاً للنعمة»۔'
    },
    {
      q: '۳. وضوء اور تیمم میں نیت کی برابری کے دعوے پر احناف نے کس چیز سے مناقضہ کیا؟',
      options: [
        'طہارتِ خبث سے (کپڑے اور بدن سے نجاست کا دھونا)، کیونکہ وہاں نیت بالاتفاق شرط نہیں',
        'روزہ کی نیت سے',
        'اذان کے وقت سے',
        'حج کے احرام سے'
      ],
      correct: 0,
      exp: 'التوضیح ص ۳۸۵: «فينتقض بتطهير الخبث... فيضطر إلى أن يقول: الوضوء تطهير حكمي كالتيمم بخلاف تطهير الخبث»۔'
    },
    {
      q: '۴. مناظرے میں حضرت ابراہیم خلیل اللہؑ کا احیاء و اماتہ سے مشرق و مغرب کی طرف جانا اصولی لحاظ سے کیا تھا؟',
      options: [
        'عاجز ہو کر دلیل چھوڑنا اور باطل انتقال',
        'پہلی حجت کے قطعی ہونے کے باوجود نمرود کے سستے عوامی مغالطے کا منہ توڑ جواب اور خصم کو فورا لاجواب و ساکت کرنا (إلزام الخصم)',
        'ایک نیا قیاس ایجاد کرنا',
        'صلح علی الانکار'
      ],
      correct: 1,
      exp: 'التوضیح ص ۳۸۷: «فالخليل عليه السلام لما خاف الاشتباه والتلبيس على القوم انتقل إلى العلة التي لا يكون فيها اشتباه أصلاً... فبهت الذي كفر»۔'
    },
    {
      q: '۵. احناف کے نزدیک استصحابِ حال کا بنیادی ترین قاعدہ کیا ہے؟',
      options: [
        'الاستصحاب حجة للإثبات والدفع معاً',
        '«الاستصحاب حجة للدفع لا للإثبات»؛ یعنی اپنا حق بچانے کی دلیل تو بنتا ہے مگر کسی دوسرے پر نیا حق جمانے کی دلیل نہیں بنتا',
        'استصحاب قیاسِ جلی پر ہمیشہ راجح ہوتا ہے',
        'استصحاب صرف عبادات میں حجت ہے'
      ],
      correct: 1,
      exp: 'التوضیح ص ۳۸۸: «وعندنا: حجة للدفع لا للإثبات... كحياة المفقود؛ فيرث عنده لا عندنا؛ لأن الإرث من باب الإثبات فلا يثبت به، ولا يورث؛ لأن عدم الإرث من باب الدفع فيثبت به»۔'
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

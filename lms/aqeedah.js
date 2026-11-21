/**
 * حقيقة العقيدة والإيمان المفصل - LMS Interactive Script
 * Handles navigation, theme toggle, interactive 8-slide player, and quiz
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initThemeToggle();
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

  // Global [data-goto] handler
  document.addEventListener('click', (e) => {
    const clickable = e.target.closest('[data-goto]');
    if (clickable) {
      e.preventDefault();
      const targetTabId = clickable.getAttribute('data-goto');
      if (targetTabId) switchTab(targetTabId);
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
   3. INTERACTIVE 8-SLIDE DECK PLAYER
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

  // Keyboard navigation when slides tab is active
  document.addEventListener('keydown', (e) => {
    const slidesTab = document.getElementById('tab-slides');
    if (slidesTab && slidesTab.classList.contains('active')) {
      if (e.key === 'ArrowLeft' || e.key === 'PageDown') {
        showSlide(currentSlideIndex + 1); // Next in RTL
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        showSlide(currentSlideIndex - 1); // Prev in RTL
      }
    }
  });

  showSlide(0);
}

/* ========================================================
   4. INTERACTIVE QUIZ
======================================================== */
function initQuiz() {
  const container = document.getElementById('quizCardsContainer');
  const scoreDisplay = document.getElementById('quizScore');
  const resetBtn = document.getElementById('resetQuizBtn');

  if (!container) return;

  const questions = [
    {
      id: 1,
      q: 'لفظ "عقیدہ" کا لغوی معنی کیا ہے اور یہ کس مادے سے ماخوذ ہے؟',
      options: [
        { text: 'یہ "عقد" سے ہے جس کے معنی پکی گرہ، پختگی، استواری اور وثوق کے ہیں۔', correct: true },
        { text: 'یہ "عقد" سے ہے جس کے معنی محض دل کا وہم اور شک ہیں۔', correct: false },
        { text: 'یہ "عقل" سے ہے جس کے معنی سوچنے سمجھنے کے ہیں۔', correct: false },
        { text: 'یہ "عقیدہ" یونانی زبان کا لفظ ہے۔', correct: false }
      ],
      explanation: 'صحیح! عقیدہ "عقد" سے ہے، جس میں شدت، قوت، ثبات اور وثوق کا مفہوم پایا جاتا ہے؛ جیسے عقدِ بیع، عقدِ نکاح اور عقدِ بیعت۔'
    },
    {
      id: 2,
      q: 'اگر دنیا میں انبیاء نہ آتے تو انسانیت کی حالت کیا ہوتی؟',
      options: [
        { text: 'طاقتور کی حکومت (جنگل کا قانون) ہوتی، اخلاقی انارکی ہوتی اور انسان پتھروں و مخلوقات کو پوجتا رہتا۔', correct: true },
        { text: 'انسان خود بخود تمام حلال و حرام جان لیتا۔', correct: false },
        { text: 'سائنس انسان کو زندگی کا حقیقی مقصد اور موت کے بعد کا حال بتا دیتی۔', correct: false },
        { text: 'دنیا بغیر کسی قانون کے بالکل پرامن رہتی۔', correct: false }
      ],
      explanation: 'بالکل درست! عقل اکیلی سائنس کے آلات تو بنا سکتی ہے، مگر خیر و شر، عدلِ مطلق اور روح کے مقصد کا حتمی پیمانہ صرف وحیِ نبوت سے ملتا ہے۔'
    },
    {
      id: 3,
      q: 'توحید فی الصفات میں اللہ تعالیٰ اور مخلوق کی صفات کے درمیان بنیادی کلامی فرق کیا ہے؟',
      options: [
        { text: 'اللہ کی صفات قدیم، ذاتی اور مطلق ہیں؛ جبکہ مخلوق کی صفات حادث، عطائی اور محدود ہیں۔', correct: true },
        { text: 'اللہ اور مخلوق کی صفات میں کوئی فرق نہیں ہے۔', correct: false },
        { text: 'مخلوق کی صفات قدیم ہیں اور اللہ کی صفات حادث ہیں۔', correct: false },
        { text: 'دونوں صفات مطلق اور غیر محدود ہیں۔', correct: false }
      ],
      explanation: 'درست جواب! یہ تین کلیدی الفاظ (قدیم، ذاتی، مطلق بمقابلہ حادث، عطائی، محدود) صفات میں شرک سے بچاؤ کی اساس ہیں۔'
    },
    {
      id: 4,
      q: 'تقدیر اور انسانی اختیار کے باب میں "بھوک اور روٹی" کی مثال کیا واضح کرتی ہے؟',
      options: [
        { text: 'تقدیر ہاتھ پر ہاتھ رکھ کر بیٹھنے کا نام نہیں، انسان کو محنت اور تدبیر کرنی پڑتی ہے پھر اللہ برکت دیتا ہے۔', correct: true },
        { text: 'انسان کو روٹی کھانے کی کوشش نہیں کرنی چاہیے کیونکہ کھانا خود پیٹ میں آ جائے گا۔', correct: false },
        { text: 'انسان بالکل مجبورِ محض ہے اور اس کا کوئی ارادہ نہیں۔', correct: false },
        { text: 'تقدیر کا کوئی وجود نہیں، انسان ہی ہر چیز کا اکیلا خالق ہے۔', correct: false }
      ],
      explanation: 'شاباش! جیسے نوالہ منہ میں ڈالنے سے پیٹ بھرتا ہے، ویسے ہی اللہ نے محنت، دعا اور تدبیر کو کامیابی کا ذریعہ مقدر فرمایا ہے۔'
    },
    {
      id: 5,
      q: 'طاعونِ عمواس کے موقع پر حضرت عمر فاروقؓ کا تاریخی فرمودہ کیا تھا؟',
      options: [
        { text: '«نَفِرُّ مِنْ قَدَرِ اللّٰهِ إِلَى قَدَرِ اللّٰهِ» (ہم اللہ کی ایک تقدیر سے اللہ ہی کی دوسری تقدیر کی طرف جا رہے ہیں)۔', correct: true },
        { text: 'ہم موت سے ڈر کر بھاگ رہے ہیں۔', correct: false },
        { text: 'بیماری انسان کو خود بخود لگ جاتی ہے۔', correct: false },
        { text: 'تدبیر کرنا شرک ہے۔', correct: false }
      ],
      explanation: 'بالکل صحیح! حضرت عمر فاروقؓ کا یہ فرمودہ واضح کرتا ہے کہ تقدیر پر ایمان تدبیر، احتیاط اور علم و عقل سے کام لینے سے نہیں روکتا۔'
    }
  ];

  let userAnswers = {};

  function renderQuiz() {
    container.innerHTML = '';
    questions.forEach((q, idx) => {
      const card = document.createElement('div');
      card.className = 'quiz-card-box';
      card.style.cssText = 'background: var(--bg-card); border: 1.5px solid var(--border-color); border-radius: 10px; padding: 1.2rem; margin-bottom: 1.2rem;';

      let optionsHTML = '';
      q.options.forEach((opt, optIdx) => {
        optionsHTML += `
          <div class="quiz-option" data-qid="${q.id}" data-oidx="${optIdx}" style="padding: 0.75rem 1rem; border: 1px solid var(--border-color); border-radius: 8px; margin-top: 0.5rem; cursor: pointer; transition: all 0.2s ease;">
            <span>${opt.text}</span>
          </div>
        `;
      });

      card.innerHTML = `
        <div style="font-weight: bold; font-size: 1.05rem; color: var(--gold-primary); margin-bottom: 0.8rem;">
          سوال ${idx + 1}: ${q.q}
        </div>
        <div class="options-group">${optionsHTML}</div>
        <div class="feedback-area" id="fb-${q.id}" style="display: none; margin-top: 0.8rem; padding: 0.6rem 0.9rem; border-radius: 6px; font-size: 0.9rem;"></div>
      `;

      container.appendChild(card);
    });

    attachOptionEvents();
  }

  function attachOptionEvents() {
    const optionElements = container.querySelectorAll('.quiz-option');
    optionElements.forEach(el => {
      el.addEventListener('click', () => {
        const qid = parseInt(el.getAttribute('data-qid'));
        const oidx = parseInt(el.getAttribute('data-oidx'));
        const question = questions.find(q => q.id === qid);
        const selectedOpt = question.options[oidx];

        const parent = el.closest('.options-group');
        parent.querySelectorAll('.quiz-option').forEach(item => {
          item.style.borderColor = 'var(--border-color)';
          item.style.background = 'transparent';
        });

        const fb = document.getElementById(`fb-${qid}`);
        fb.style.display = 'block';

        if (selectedOpt.correct) {
          el.style.borderColor = '#22c55e';
          el.style.background = 'rgba(34, 197, 94, 0.15)';
          fb.style.background = 'rgba(34, 197, 94, 0.15)';
          fb.style.color = '#4ade80';
          fb.innerHTML = `✅ ${question.explanation}`;
          userAnswers[qid] = true;
        } else {
          el.style.borderColor = '#ef4444';
          el.style.background = 'rgba(239, 68, 68, 0.15)';
          fb.style.background = 'rgba(239, 68, 68, 0.15)';
          fb.style.color = '#f87171';
          fb.innerHTML = `❌ غلط جواب۔ صحیح مفہوم: ${question.explanation}`;
          userAnswers[qid] = false;
        }

        updateScore();
      });
    });
  }

  function updateScore() {
    const correctCount = Object.values(userAnswers).filter(Boolean).length;
    scoreDisplay.textContent = `اسکور: ${correctCount} / ${questions.length}`;

    const ctaBox = document.getElementById('quizCtaBox');
    if (ctaBox && Object.keys(userAnswers).length === questions.length) {
      ctaBox.style.display = 'block';
    }
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      userAnswers = {};
      renderQuiz();
      scoreDisplay.textContent = `اسکور: ۰ / ${questions.length}`;
      const ctaBox = document.getElementById('quizCtaBox');
      if (ctaBox) ctaBox.style.display = 'none';
    });
  }

  renderQuiz();
}

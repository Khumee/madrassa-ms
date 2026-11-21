/**
 * حقيقة العقيدة والإيمان المفصل - LMS Interactive Script
 * Handles navigation, theme toggle, and quiz interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initThemeToggle();
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
   3. INTERACTIVE QUIZ
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
      q: 'توحید فی الصفات میں اللہ تعالیٰ اور مخلوق کی صفات کے درمیان بنیادی کلامی فرق کیا ہے؟',
      options: [
        { text: 'اللہ کی صفات قدیم، ذاتی اور مطلق ہیں؛ جبکہ مخلوق کی صفات حادث، عطائی اور محدود ہیں۔', correct: true },
        { text: 'اللہ اور مخلوق کی صفات میں کوئی فرق نہیں ہے۔', correct: false },
        { text: 'مخلوق کی صفات قدیم ہیں اور اللہ کی صفات حادث ہیں۔', correct: false },
        { text: 'دونوں صفات مطلق اور غیر محدود ہیں۔', correct: false }
      ],
      explanation: 'بالکل درست! یہ تین کلیدی الفاظ (قدیم، ذاتی، مطلق بمقابلہ حادث، عطائی، محدود) صفات میں شرک سے بچاؤ کی اساس ہیں۔'
    },
    {
      id: 3,
      q: 'ادارۂ رسالت کے تین بنیادی باہمی وابستہ اجزاء کون سے ہیں؟',
      options: [
        { text: 'فرشتہ (پیغام لانے والا)، کتاب (ہدایت کا متن)، رسول (زندہ عملی نمونہ)۔', correct: true },
        { text: 'بادشاہ، وزیر اور رعایا۔', correct: false },
        { text: 'قیاس، اجماع اور فتویٰ۔', correct: false },
        { text: 'فلسفہ، تاریخ اور منطق۔', correct: false }
      ],
      explanation: 'درست جواب! رسالت ایک مربوط ادارہ ہے: فرشتہ وحی لاتا ہے، کتاب ہدایت کا مستند متن فراہم کرتی ہے، اور رسول اس کا زندہ عملی نمونہ بن کر سکھاتے ہیں۔'
    },
    {
      id: 4,
      q: 'تقدیر اور انسانی اختیار کے باب میں اہلِ سنت کا برحق معتدل مؤقف کیا ہے؟',
      options: [
        { text: 'انسان نہ جبرِ محض میں ہے اور نہ اختیارِ مطلق میں؛ بلکہ اسے محدود اختیار و ارادہ حاصل ہے جس پر وہ مکلف ہے۔', correct: true },
        { text: 'انسان مجبورِ محض (پتھر یا مشین کی طرح) ہے اور اس کا کوئی اختیار نہیں۔', correct: false },
        { text: 'انسان خود ہر چیز کا خود مختار خالق ہے اور اللہ کی مشیئت کا کوئی عمل دخل نہیں۔', correct: false },
        { text: 'تقدیر کا کوئی وجود نہیں ہے۔', correct: false }
      ],
      explanation: 'شاباش! انسان کے پاس محدود ارادہ اور قدم ہے جس کا وہ خود ذمہ دار ہے، جبکہ خلق اور تکمیل اللہ تعالیٰ کی قدرت و مشیئت سے ہے۔'
    },
    {
      id: 5,
      q: 'طاعونِ عمواس کے موقع پر جب حضرت عمرؓ نے شام سے واپسی کا فیصلہ کیا تو حضرت ابو عبیدہؓ کے سوال پر انہوں نے کیا تاریخی جواب دیا؟',
      options: [
        { text: '«نَفِرُّ مِنْ قَدَرِ اللّٰهِ إِلَى قَدَرِ اللّٰهِ» (ہم اللہ کی تقدیر سے اللہ ہی کی تقدیر کی طرف جا رہے ہیں)۔', correct: true },
        { text: 'ہم موت سے ڈر کر بھاگ رہے ہیں۔', correct: false },
        { text: 'ہمیں تقدیر پر بھروسہ نہیں ہے۔', correct: false },
        { text: 'بیماری انسان کو خود بخود لگ جاتی ہے۔', correct: false }
      ],
      explanation: 'بالکل صحیح! حضرت عمر فاروقؓ کا یہ فرمودہ واضح کرتا ہے کہ تقدیر پر ایمان تدبیر، احتیاط اور عقل سے کام لینے سے نہیں روکتا۔'
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

        // Highlight
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
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      userAnswers = {};
      renderQuiz();
      scoreDisplay.textContent = `اسکور: ۰ / ${questions.length}`;
    });
  }

  renderQuiz();
}

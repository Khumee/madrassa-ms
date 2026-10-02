/**
 * شرح العقائد النسفية - Interactive Application Engine
 * Handles navigation, simulators, animations, search filters, and quizzes
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initThemeToggle();
  initViewFilters();
  initBurhanSimulator();
  initModernBridge();
  initInteractiveDemos();
  initQuiz();
});

/* ========================================================
   1. NAVIGATION & DEEP LINKING
======================================================== */
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  function switchTab(targetTabId) {
    // Update nav buttons
    navButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === targetTabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update tab panes
    tabPanes.forEach(pane => {
      if (pane.id === targetTabId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Header Nav button clicks
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      if (tabId) switchTab(tabId);
    });
  });

  // Global Clickable elements with [data-goto] (Stat boxes, cards, links)
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
   2. THEME SWITCHER (Dark / Light Classical Scholar)
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
   4. INTERACTIVE BURHAN AL-TATBIQ SIMULATOR
======================================================== */
function initBurhanSimulator() {
  const trackA = document.getElementById('trackA');
  const trackB = document.getElementById('trackB');
  const simStepBtn = document.getElementById('simStepBtn');
  const simAutoBtn = document.getElementById('simAutoBtn');
  const simDilemmaBtn = document.getElementById('simDilemmaBtn');
  const simResetBtn = document.getElementById('simResetBtn');
  const simOutputTitle = document.getElementById('simOutputTitle');
  const simOutputText = document.getElementById('simOutputText');
  const simStatusPill = document.getElementById('simStatusPill');
  const fork1Card = document.getElementById('fork1Card');
  const fork2Card = document.getElementById('fork2Card');

  if (!trackA || !trackB) return;

  const totalNodes = 6;
  let currentStep = 0;
  let autoPlayInterval = null;

  function renderNodes() {
    trackA.innerHTML = '';
    trackB.innerHTML = '';

    // Series A: E0 (معلول اخیر) to E5...
    for (let i = 0; i < totalNodes; i++) {
      const node = document.createElement('div');
      node.className = 'node';
      node.id = `nodeA_${i}`;
      node.innerHTML = `
        <span class="node-id">معلول ${i}</span>
        <span>${i === 0 ? 'الأخير' : 'ع' + i}</span>
      `;
      trackA.appendChild(node);
    }
    const rayA = document.createElement('div');
    rayA.className = 'node infinite-ray';
    rayA.innerHTML = 'إلى غير النهاية ➔';
    trackA.appendChild(rayA);

    // Series B: Slot 0 empty (مما قبله بواحد), then E1 to E5...
    const emptySlot = document.createElement('div');
    emptySlot.className = 'node empty-slot';
    emptySlot.innerHTML = '<span class="node-id">فارغ</span><span>- ۱</span>';
    trackB.appendChild(emptySlot);

    for (let i = 1; i < totalNodes; i++) {
      const node = document.createElement('div');
      node.className = 'node';
      node.id = `nodeB_${i}`;
      node.innerHTML = `
        <span class="node-id">معلول ${i}</span>
        <span>ع${i}</span>
      `;
      trackB.appendChild(node);
    }
    const rayB = document.createElement('div');
    rayB.className = 'node infinite-ray';
    rayB.innerHTML = 'إلى غير النهاية ➔';
    trackB.appendChild(rayB);
  }

  function stepForward() {
    if (currentStep >= totalNodes - 1) {
      showDilemma();
      return;
    }

    currentStep++;
    const nodeA = document.getElementById(`nodeA_${currentStep - 1}`);
    const nodeB = document.getElementById(`nodeB_${currentStep}`);

    if (nodeA) nodeA.classList.add('matched');
    if (nodeB) nodeB.classList.add('matched');

    simStatusPill.textContent = `تطبیق مرحلہ ${currentStep}: جوڑا ${currentStep} مل گیا`;
    simOutputTitle.textContent = `جملہ اولیٰ کے معلول (${currentStep - 1}) کے سامنے جملہ ثانیہ کا معلول (${currentStep})`;
    simOutputText.textContent = `دونوں سلسلوں کے افراد کا آمنے سامنے تقابل کیا جا رہا ہے۔ اب تک ${currentStep} جوڑے باہم مل چکے ہیں۔`;
  }

  function showDilemma() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;

    // Highlight the surplus node in Series A
    const firstA = document.getElementById('nodeA_0');
    if (firstA) firstA.classList.add('surplus');

    simStatusPill.textContent = 'نتیجہ: عقلی تردید (The Logical Dilemma)';
    simOutputTitle.textContent = 'برہانِ تطبیق کا قاطع استدلال مکمل ہوا!';
    simOutputText.innerHTML = `
      دیکھیے! جملہ اولیٰ میں ایک فرد <strong>(معلولِ اخیر)</strong> ایسا موجود ہے جس کے مقابلے میں جملہ ثانیہ میں کچھ نہیں۔  
      اب اگر جملہ ثانیہ لامتناہی چلتا رہے، تو ناقص (۱ کم) زائد کے برابر ہو جائے گا جو کہ <strong>محال</strong> ہے۔  
      اور اگر جملہ ثانیہ کہیں ختم ہو جائے، تو اس کے متناہی ہونے سے جملہ اولیٰ بھی متناہی ہو جائے گا! <strong>پس تسلسل باطل ہے!</strong>
    `;

    fork1Card.classList.add('active-dilemma');
    fork2Card.classList.add('active-dilemma');
  }

  function resetSim() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
    currentStep = 0;
    fork1Card.classList.remove('active-dilemma');
    fork2Card.classList.remove('active-dilemma');
    simStatusPill.textContent = 'مرحلہ ۰: سلسلوں کی تشکیل';
    simOutputTitle.textContent = 'دونوں فرضی سلسلوں کا موازنہ';
    simOutputText.textContent = 'ہم نے معلولِ اخیر سے پیچھے کی طرف سلسلہ اولیٰ قائم کیا، اور اس سے ایک معلول چھوڑ کر سلسلہ ثانیہ قائم کیا۔ اب "اگلا جوڑا ملائیں" پر کلک کریں۔';
    renderNodes();
  }

  // Event Listeners
  simStepBtn.addEventListener('click', stepForward);
  simResetBtn.addEventListener('click', resetSim);
  simDilemmaBtn.addEventListener('click', showDilemma);

  simAutoBtn.addEventListener('click', () => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
      simAutoBtn.querySelector('span:last-child').textContent = 'خودکار تطبیق (Auto Run)';
    } else {
      resetSim();
      simAutoBtn.querySelector('span:last-child').textContent = 'روکیں (Pause)';
      autoPlayInterval = setInterval(() => {
        if (currentStep < totalNodes - 1) {
          stepForward();
        } else {
          showDilemma();
          simAutoBtn.querySelector('span:last-child').textContent = 'خودکار تطبیق (Auto Run)';
        }
      }, 700);
    }
  });

  // Initial render
  renderNodes();
}

/* ========================================================
   5. MODERN PHILOSOPHY & SCIENCE BRIDGE (Search & Filter)
======================================================== */
function initModernBridge() {
  const searchInput = document.getElementById('conceptSearchInput');
  const chips = document.querySelectorAll('#conceptFilterChips .chip');
  const cards = document.querySelectorAll('.modern-card');

  if (!searchInput) return;

  let activeFilter = 'all';
  let searchTerm = '';

  function filterCards() {
    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      const text = card.textContent.toLowerCase();

      const matchesFilter = (activeFilter === 'all' || category === activeFilter);
      const matchesSearch = (!searchTerm || text.includes(searchTerm.toLowerCase()));

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value.trim();
    filterCards();
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter');
      filterCards();
    });
  });
}

/* ========================================================
   6. THREE INTERACTIVE ANIMATED DEMONSTRATIONS
======================================================== */
function initInteractiveDemos() {
  /* --- Demo 1: Train & Locomotive Engine --- */
  const trainNoEngineBtn = document.getElementById('trainNoEngineBtn');
  const trainWithEngineBtn = document.getElementById('trainWithEngineBtn');
  const trainEngine = document.getElementById('trainEngine');
  const trainConsist = document.getElementById('trainConsist');
  const trainFeedbackText = document.getElementById('trainFeedbackText');

  if (trainNoEngineBtn && trainWithEngineBtn) {
    trainNoEngineBtn.addEventListener('click', () => {
      trainEngine.style.display = 'none';
      trainConsist.classList.remove('running');
      trainConsist.style.transform = 'translateX(0)';

      // Shake animation to show failure
      trainConsist.style.animation = 'shakeConsist 0.4s ease';
      setTimeout(() => { trainConsist.style.animation = ''; }, 400);

      trainFeedbackText.innerHTML = `
        <strong style="color: var(--red-alert);">ترین رکی ہوئی ہے!</strong>  
        ڈبوں کی تعداد اگر اربوں کھربوں یا لامتناہی بھی کر دی جائے، تب بھی وہ ایک انچ آگے نہیں بڑھ سکتے۔ کیونکہ ہر ڈبہ خود محتاج ہے، صرف پیچھے کھنچاؤ منتقل کرتا ہے۔ جب تک ایک <strong>خود مختار انجن (واجب الوجود)</strong> آگے نہ جڑے، حرکت پیدا ہی نہیں ہو سکتی!
      `;
    });

    trainWithEngineBtn.addEventListener('click', () => {
      trainEngine.style.display = 'flex';
      trainConsist.classList.add('running');

      trainFeedbackText.innerHTML = `
        <strong style="color: var(--green-success);">ترین حرکت میں آ گئی! 🚂💨</strong>  
        جیسے ہی حقیقی خود مختار قوت کا منبع (انجن) جڑا، تمام محتاج ڈبے (ممکنات و معلولات) حرکت میں آ گئے۔ یہ ثابت کرتا ہے کہ کائنات میں موجود حرکت اور زندگی ایک ایسے <strong>واجب الوجود مبدأ</strong> کا ثبوت ہے جو خود کسی دوسرے کا محتاج نہیں!
      `;
    });
  }

  /* --- Demo 2: Hilbert's Infinite Hotel --- */
  const hotelRoomsTrack = document.getElementById('hotelRoomsTrack');
  const hotelAddGuestBtn = document.getElementById('hotelAddGuestBtn');
  const hotelRemoveOddBtn = document.getElementById('hotelRemoveOddBtn');
  const hotelResetBtn = document.getElementById('hotelResetBtn');
  const hotelFeedbackText = document.getElementById('hotelFeedbackText');

  if (hotelRoomsTrack) {
    let guests = [1, 2, 3, 4, 5, 6];

    function renderHotel() {
      hotelRoomsTrack.innerHTML = '';
      guests.forEach((g, idx) => {
        const roomDiv = document.createElement('div');
        roomDiv.className = `hotel-room ${g === null ? 'vacant' : ''}`;
        roomDiv.innerHTML = `
          <span class="room-num">کمرہ ${idx + 1}</span>
          <span class="room-avatar">${g === null ? '🚪' : '👤'}</span>
          <span class="room-status">${g === null ? 'خالی' : 'مہمان ' + g}</span>
        `;
        hotelRoomsTrack.appendChild(roomDiv);
      });

      const infRoom = document.createElement('div');
      infRoom.className = 'hotel-room';
      infRoom.innerHTML = `
        <span class="room-num">کمرہ ∞</span>
        <span class="room-avatar">🏨</span>
        <span class="room-status">لامتناہی کمرے</span>
      `;
      hotelRoomsTrack.appendChild(infRoom);
    }

    hotelAddGuestBtn.addEventListener('click', () => {
      // Shift everyone +1
      guests.unshift(0); // new guest enters room 1
      guests.pop();
      renderHotel();

      hotelFeedbackText.innerHTML = `
        <strong>ہوٹل میں نیا مہمان داخل ہوا! (∞ + ۱ = ∞)</strong><br>
        کمرہ ۱ کے مہمان کو ۲ میں، ۲ کو ۳ میں، اور n کو n+1 میں بھیج کر نیا کمرہ بنا لیا گیا۔ ذہنی تخیل (ریاضیاتی سیٹ) میں تو یہ تضاد نہیں لگتا، مگر مادی و خارجی دنیا میں ایک مکمل بھری ہوئی جگہ پر مزید گنجائش ہونا کھلا تناقض ہے!
      `;
    });

    hotelRemoveOddBtn.addEventListener('click', () => {
      // Empty odd rooms
      guests = guests.map((g, idx) => (idx % 2 === 0 ? null : g));
      renderHotel();

      hotelFeedbackText.innerHTML = `
        <strong>تمام طاق کمروں کے لامتناہی مہمان چلے گئے! (∞ - ∞ = ∞)</strong><br>
        لامتناہی افراد نکال دینے کے بعد بھی اتنے ہی لامتناہی افراد باقی رہ گئے۔ ڈیوڈ ہلبرٹ اور امام تفتازانیؒ دونوں اس پر متفق ہیں کہ خارجی وجود میں یہ صریح محال ہے («كان الناقص كالزائد وهو محال»)!
      `;
    });

    hotelResetBtn.addEventListener('click', () => {
      guests = [1, 2, 3, 4, 5, 6];
      renderHotel();
      hotelFeedbackText.textContent = 'ہوٹل اپنی اصل حالت پر واپس آ گیا۔ اب اوپر دیے گئے بٹنوں سے ہلبرٹ کے تضادات آزمائیں۔';
    });

    renderHotel();
  }

  /* --- Demo 3: Cosmic Dominoes & Time's Beginning --- */
  const runDominoBtn = document.getElementById('runDominoBtn');
  const dominoTrack = document.getElementById('dominoTrack');
  const dominoFeedbackText = document.getElementById('dominoFeedbackText');

  if (dominoTrack && runDominoBtn) {
    const totalTiles = 7;

    function renderDominoes() {
      dominoTrack.innerHTML = '';
      for (let i = 1; i <= totalTiles; i++) {
        const tile = document.createElement('div');
        tile.className = `domino-tile ${i === totalTiles ? 'current-day' : ''}`;
        tile.id = `domino_${i}`;
        tile.innerHTML = `
          <span>${i === totalTiles ? 'آج' : 't' + i}</span>
        `;
        dominoTrack.appendChild(tile);
      }
    }

    runDominoBtn.addEventListener('click', () => {
      renderDominoes();
      let step = 1;
      const interval = setInterval(() => {
        const tile = document.getElementById(`domino_${step}`);
        if (tile) tile.classList.add('toppled');
        step++;

        if (step > totalTiles) {
          clearInterval(interval);
          dominoFeedbackText.innerHTML = `
            <strong style="color: var(--teal-accent);">آخری ڈومینو (آج کا لمحہ) گر گیا!</strong><br>
            اگر ماضی کے لمحے غیر متناہی ہوتے، تو یہ گرنے کا سفر کبھی مکمل ہو کر "آج" تک نہیں پہنچ سکتا تھا۔ چونکہ ہم آج یہاں موجود ہیں، اس کا مطلب یہ سلسلہ متناہی تھا اور اس کا ایک پہلا نقطۂ آغاز تھا!
          `;
        }
      }, 250);
    });

    renderDominoes();
  }
}

/* ========================================================
   7. STUDENT ASSESSMENT QUIZ ENGINE
======================================================== */
function initQuiz() {
  const container = document.getElementById('quizCardsContainer');
  const scoreDisplay = document.getElementById('quizScore');
  const resetBtn = document.getElementById('resetQuizBtn');

  if (!container) return;

  const questions = [
    {
      id: 1,
      q: 'امام تفتازانیؒ نے برہانِ تطبیق میں "الجملة الأولى" اور "الجملة الثانية" کس طرح فرض فرمائی ہیں؟',
      options: [
        { text: 'دونوں کو معلولِ اخیر سے شروع کیا گیا۔', correct: false },
        { text: 'پہلا سلسلہ معلولِ اخیر سے غیر نہایت تک، اور دوسرا اس سے ایک درجہ پہلے سے غیر نہایت تک۔', correct: true },
        { text: 'پہلا سلسلہ عالمِ مادہ ہے اور دوسرا عالمِ ارواح۔', correct: false },
        { text: 'پہلا سلسلہ عدد ۱ سے اور دوسرا عدد ۲ سے شروع کیا گیا۔', correct: false }
      ],
      explanation: 'صحیح! علامہ تفتازانیؒ نے فرمایا: «وهو أن نفرض من المعلول الأخير إلى غير النهاية جملة، ومما قبله بواحد مثلا إلى غير النهاية جملة أخرى»۔'
    },
    {
      id: 2,
      q: 'برہانِ تطبیق کی شقِ ثانی میں اگر جملہ ثانیہ ختم (منقطع) ہو جائے تو اس سے جملہ اولیٰ کا متناہی ہونا کیسے لازم آتا ہے؟',
      options: [
        { text: 'کیونکہ جملہ اولیٰ دوسرے سے صرف ایک متناہی مقدار (۱ معلول) زیادہ ہے، اور متناہی میں متناہی کا اضافہ بالضرورہ متناہی ہوتا ہے۔', correct: true },
        { text: 'کیونکہ دونوں سلسلے خود بخود عدم ہو جاتے ہیں۔', correct: false },
        { text: 'کیونکہ علامہ تفتازانیؒ نے اس کا کوئی ثبوت نہیں دیا۔', correct: false },
        { text: 'کیونکہ کائنات گول ہے اس لیے لامتناہی نہیں ہو سکتی۔', correct: false }
      ],
      explanation: 'درست جواب! منطقی قاعدہ ہے: «والزائد على المتناهي بقدر متناه يكون متناهيا بالضرورة»۔'
    },
    {
      id: 3,
      q: 'برہانِ تطبیق پر "مراتبِ عدد" (گنتی کے اعداد) کا نقض کیوں وارد نہیں ہوتا؟',
      options: [
        { text: 'کیونکہ اعداد کا شمار کبھی نہیں ہو سکتا۔', correct: false },
        { text: 'کیونکہ اعداد صرف ذہن کا وہم و تصور ہیں، ان کے تمام افراد خارج میں ایک ساتھ وجود نہیں رکھتے۔', correct: true },
        { text: 'کیونکہ اعداد گناہ کا کام ہیں۔', correct: false },
        { text: 'کیونکہ اعداد میں تطبیق محال نہیں ہے۔', correct: false }
      ],
      explanation: 'بالکل درست! علامہ فرماتے ہیں: «وهذا التطبيق إنما يمكن فيما دخل تحت الوجود دون ما هو وهمي محض، فإنه ينقطع بانقطاع الوهم»۔'
    },
    {
      id: 4,
      q: 'کلامی اصطلاح "واجب الوجود" کا جدید اینالیٹک فلسفے میں درست متبادل کیا ہے؟',
      options: [
        { text: 'The Ultimate Dependent Object (سب سے بڑا محتاج)', correct: false },
        { text: 'Ontologically Necessary Being (جس کا نہ ہونا منطقی و وجودی طور پر ناممکن ہو)', correct: true },
        { text: 'Spontaneous Quantum Fluctuation (کوانٹم کی بے ترتیب لہر)', correct: false },
        { text: 'Mathematical Set (محض ریاضی کا مجموعہ)', correct: false }
      ],
      explanation: 'شاباش! جدید اینالیٹک فلسفے میں واجب الوجود کو "Necessary Being" کہا جاتا ہے جو تمام ممکنہ جہانوں (Possible Worlds) میں بالذات موجود ہو۔'
    }
  ];

  let currentScore = 0;
  let answeredCount = 0;

  function renderQuiz() {
    container.innerHTML = '';
    currentScore = 0;
    answeredCount = 0;
    scoreDisplay.textContent = `اسکور: ۰ / ${questions.length}`;

    questions.forEach((qItem, idx) => {
      const qCard = document.createElement('div');
      qCard.className = 'quiz-card';
      qCard.id = `qCard_${qItem.id}`;

      let optionsHTML = '';
      qItem.options.forEach((opt, oIdx) => {
        optionsHTML += `
          <button class="quiz-opt-btn" data-qid="${qItem.id}" data-oidx="${oIdx}">
            ${opt.text}
          </button>
        `;
      });

      qCard.innerHTML = `
        <div class="q-header">
          <span class="q-num">سوال ${idx + 1} از ${questions.length}</span>
        </div>
        <h4>${qItem.q}</h4>
        <div class="quiz-options">
          ${optionsHTML}
        </div>
        <div class="q-feedback" id="feedback_${qItem.id}"></div>
      `;

      container.appendChild(qCard);
    });

    // Attach option click listeners
    const optButtons = container.querySelectorAll('.quiz-opt-btn');
    optButtons.forEach(btn => {
      btn.addEventListener('click', handleOptionClick);
    });
  }

  function handleOptionClick(e) {
    const btn = e.currentTarget;
    const qid = parseInt(btn.getAttribute('data-qid'));
    const oidx = parseInt(btn.getAttribute('data-oidx'));

    const qItem = questions.find(q => q.id === qid);
    if (!qItem) return;

    const parentCard = document.getElementById(`qCard_${qid}`);
    const feedbackBox = document.getElementById(`feedback_${qid}`);
    const allBtns = parentCard.querySelectorAll('.quiz-opt-btn');

    // Disable all options in this card
    allBtns.forEach(b => b.disabled = true);
    parentCard.classList.add('answered');

    const selectedOpt = qItem.options[oidx];
    if (selectedOpt.correct) {
      btn.classList.add('correct');
      feedbackBox.className = 'q-feedback show success';
      feedbackBox.innerHTML = `✅ <strong>شاباش! بالکل درست:</strong> ${qItem.explanation}`;
      currentScore++;
    } else {
      btn.classList.add('wrong');
      // Highlight the correct one
      const correctBtn = allBtns[qItem.options.findIndex(o => o.correct)];
      if (correctBtn) correctBtn.classList.add('correct');

      feedbackBox.className = 'q-feedback show fail';
      feedbackBox.innerHTML = `❌ <strong>غلط جواب!</strong> ${qItem.explanation}`;
    }

    answeredCount++;
    scoreDisplay.textContent = `اسکور: ${currentScore} / ${questions.length}`;
  }

  resetBtn.addEventListener('click', renderQuiz);
  renderQuiz();
}

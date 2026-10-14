/* ============================================================
   Learning Adventure — engine
   Plain JS, no build step. Progress lives in localStorage.
   ============================================================ */
(function () {
  'use strict';

  var STORE_KEY = 'help-learning-v1';
  var CHILD_NAME_KEY = 'child-name-v1';
  var YEAR_KEY = 'selected-year-v1';
  var YEARS = ['y9'];
  var YEAR_SUBJECTS = {
    'y9': ['waves.js', 'digestion.js']
  };
  var SUBJECTS = window.SUBJECTS || [];
  var app = document.getElementById('app');
  var childName = '';
  var selectedYear = 'y9';

  function loadSubjectsForYear(year) {
    window.SUBJECTS = [];
    var subjectFiles = YEAR_SUBJECTS[year] || [];
    var loaded = 0;
    var total = subjectFiles.length;

    return new Promise(function (resolve) {
      if (total === 0) {
        SUBJECTS = window.SUBJECTS;
        resolve();
        return;
      }

      subjectFiles.forEach(function (file) {
        var script = document.createElement('script');
        script.src = 'data/' + year + '/' + file;
        script.onload = function () {
          loaded++;
          if (loaded === total) {
            SUBJECTS = window.SUBJECTS;
            resolve();
          }
        };
        script.onerror = function () {
          console.error('Failed to load: data/' + year + '/' + file);
          loaded++;
          if (loaded === total) {
            SUBJECTS = window.SUBJECTS;
            resolve();
          }
        };
        document.body.appendChild(script);
      });
    });
  }

  /* ---------------- child name setup ---------------- */
  function loadChildName() {
    var saved = localStorage.getItem(CHILD_NAME_KEY);
    if (saved) {
      childName = saved;
      updatePageText();
      return true;
    }
    return false;
  }

  function updatePageText() {
    var pageTitle = document.getElementById('page-title');
    var headerTitle = document.getElementById('header-title');
    var footerText = document.getElementById('footer-text');
    if (pageTitle) pageTitle.textContent = childName + "'s Learning Adventure — " + selectedYear.toUpperCase();
    if (headerTitle) headerTitle.textContent = childName + "'s Learning Adventure";
    if (footerText) footerText.textContent = "Learning Support · " + selectedYear.toUpperCase() + " — made with ❤️ for " + childName;
  }

  function loadYear() {
    var saved = localStorage.getItem(YEAR_KEY);
    if (saved && YEARS.indexOf(saved) !== -1) {
      selectedYear = saved;
      return true;
    }
    if (YEARS.length === 1) {
      // only one year of content — no need to ask
      selectedYear = YEARS[0];
      localStorage.setItem(YEAR_KEY, selectedYear);
      return true;
    }
    return false;
  }

  function showWelcomeModal() {
    var modal = document.getElementById('welcome-modal');
    var input = document.getElementById('welcome-input');
    var btn = document.getElementById('welcome-btn');

    modal.style.display = 'flex';
    input.focus();

    function handleSubmit() {
      var name = input.value.trim();
      if (name) {
        childName = name;
        localStorage.setItem(CHILD_NAME_KEY, name);
        updatePageText();
        modal.style.display = 'none';
        route();
      }
    }

    btn.onclick = handleSubmit;
    input.onkeypress = function (e) {
      if (e.key === 'Enter') handleSubmit();
    };
  }

  function initializeAndRoute() {
    // Load all data freshly
    var nameLoaded = loadChildName();
    var yearLoaded = loadYear();
    store = loadStore();

    if (!nameLoaded) {
      showWelcomeModal();
    } else if (!yearLoaded) {
      showYearModal();
    } else {
      route();
    }
  }


  function showYearModal() {
    app.innerHTML = '';
    var modal = document.createElement('div');
    modal.id = 'year-selector-modal';
    modal.style.cssText = 'position:fixed; inset:0; background:rgba(45,53,66,0.5); display:flex; align-items:center; justify-content:center; z-index:200; padding:20px;';

    var card = document.createElement('div');
    card.style.cssText = 'background:var(--card); border-radius:var(--radius); box-shadow:0 10px 40px rgba(43,45,66,0.3); padding:40px 32px; max-width:500px; text-align:center;';

    var title = document.createElement('h1');
    title.textContent = '📅 What year are you in?';
    title.style.margin = '0 0 12px';
    card.appendChild(title);

    var desc = document.createElement('p');
    desc.textContent = 'Select your year or level';
    desc.style.cssText = 'margin:0 0 24px; color:var(--muted); font-size:1.1rem;';
    card.appendChild(desc);

    var grid = document.createElement('div');
    grid.style.cssText = 'display:grid; grid-template-columns:repeat(auto-fit, minmax(70px, 1fr)); gap:10px; margin-bottom:24px;';

    YEARS.forEach(function (year) {
      var btn = document.createElement('button');
      btn.textContent = year.toUpperCase();
      btn.style.cssText = 'padding:16px 8px; font-size:1rem; font-weight:bold; background:var(--accent); color:#fff; border:none; border-radius:12px; cursor:pointer; transition:transform 0.1s;';
      btn.onmouseover = function () { btn.style.transform = 'scale(1.05)'; };
      btn.onmouseout = function () { btn.style.transform = 'scale(1)'; };
      btn.onclick = function () {
        selectedYear = year;
        localStorage.setItem(YEAR_KEY, year);
        loadSubjectsForYear(year).then(function () {
          store = loadStore();
          updatePageText();
          modal.remove();
          route();
        });
      };
      grid.appendChild(btn);
    });

    card.appendChild(grid);
    modal.appendChild(card);
    app.appendChild(modal);
  }

  /* ---------------- progress store (per year) ---------------- */
  function defaultStore() {
    return { lessons: {}, writings: {}, checks: {}, log: [], points: 0 };
  }
  function getYearStoreKey() {
    return STORE_KEY.replace('v1', selectedYear + '-v1');
  }
  function loadStore() {
    try {
      var raw = localStorage.getItem(getYearStoreKey());
      if (!raw) return defaultStore();
      var s = JSON.parse(raw);
      return Object.assign(defaultStore(), s);
    } catch (e) {
      return defaultStore();
    }
  }
  function saveStore() {
    try { localStorage.setItem(getYearStoreKey(), JSON.stringify(store)); } catch (e) {}
  }
  var store = null;

  function lessonKey(subId, lesId) { return subId + '/' + lesId; }
  function getLessonProg(subId, lesId) { return store ? (store.lessons[lessonKey(subId, lesId)] || null) : null; }

  function recordResult(subId, lesId, pct, detail) {
    if (!store) return;
    var key = lessonKey(subId, lesId);
    var rec = store.lessons[key] || { best: 0, stars: 0, attempts: 0 };
    rec.attempts += 1;
    rec.lastPlayed = todayStr();
    if (pct > rec.best) rec.best = pct;
    var stars = starsFor(rec.best);
    if (stars > rec.stars) rec.stars = stars;
    rec.completed = rec.best >= 50;
    rec.lastPct = pct;
    // Remember the most recent attempt's question-by-question breakdown so
    // grown-ups can see exactly which questions they got wrong, and where.
    if (detail) {
      rec.lastCorrect = detail.correct;
      rec.lastTotal = detail.total;
      rec.lastWrong = detail.wrong || [];
    }
    store.lessons[key] = rec;
    store.points += Math.round(pct / 10);
    store.log.push({ d: todayStr(), l: key, s: pct });
    if (store.log.length > 500) store.log = store.log.slice(-500);
    saveStore();
    return rec;
  }

  // Short, plain-text summary of a question, for the grown-ups breakdown.
  function questionLabel(q) {
    var t = q.q || q.prompt || '';
    if (!t && q.pairs) t = 'Match up: ' + q.pairs.map(function (p) { return p[0]; }).join(', ');
    if (!t && q.items) t = 'Put the steps in order';
    t = String(t).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (t.length > 120) t = t.slice(0, 117) + '…';
    return t || 'Question';
  }

  function starsFor(pct) {
    if (pct >= 90) return 3;
    if (pct >= 70) return 2;
    if (pct >= 50) return 1;
    return 0;
  }
  function starString(n) {
    var s = '';
    for (var i = 0; i < 3; i++) s += i < n ? '⭐' : '☆';
    return s;
  }
  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function daysPlayed() {
    var set = {};
    store.log.forEach(function (e) { set[e.d] = true; });
    return Object.keys(set).length;
  }
  function streak() {
    var set = {};
    store.log.forEach(function (e) { set[e.d] = true; });
    var n = 0;
    var d = new Date();
    if (!set[todayStr()]) d.setDate(d.getDate() - 1); // streak survives until tomorrow
    for (;;) {
      var key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      if (!set[key]) break;
      n++;
      d.setDate(d.getDate() - 1);
    }
    return n;
  }

  /* ---------------- helpers ---------------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') node.className = attrs[k];
        else if (k === 'html') node.innerHTML = attrs[k];
        else if (k === 'text') node.textContent = attrs[k];
        else if (k.slice(0, 2) === 'on') node.addEventListener(k.slice(2), attrs[k]);
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function rnd(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function findSubject(id) {
    for (var i = 0; i < SUBJECTS.length; i++) if (SUBJECTS[i].id === id) return SUBJECTS[i];
    return null;
  }
  function findLesson(sub, lesId) {
    for (var i = 0; i < sub.lessons.length; i++) if (sub.lessons[i].id === lesId) return sub.lessons[i];
    return null;
  }

  function confetti() {
    var layer = document.getElementById('confetti-layer');
    var colours = ['#e63946', '#f4a261', '#2a9d8f', '#457b9d', '#ffd166', '#9b5de5'];
    for (var i = 0; i < 80; i++) {
      var c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = pick(colours);
      c.style.animationDuration = (1.8 + Math.random() * 2) + 's';
      c.style.animationDelay = (Math.random() * 0.6) + 's';
      layer.appendChild(c);
      (function (node) { setTimeout(function () { node.remove(); }, 5000); })(c);
    }
  }

  /* ---------------- speech (pronunciation) ---------------- */
  var speechOK = 'speechSynthesis' in window;
  var voiceCache = [];
  function loadVoices() {
    try { voiceCache = window.speechSynthesis.getVoices() || []; } catch (e) {}
  }
  if (speechOK) {
    try {
      loadVoices(); // voices load asynchronously in most browsers
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } catch (e) { speechOK = false; }
  }
  function say(text, lang) {
    if (!speechOK) return;
    try {
      var synth = window.speechSynthesis;
      var u = new SpeechSynthesisUtterance(text);
      var want = (lang || 'es-ES').toLowerCase();
      u.lang = lang || 'es-ES';
      u.rate = 0.85;
      u.volume = 1;
      if (!voiceCache.length) loadVoices();
      var best = null;
      for (var i = 0; i < voiceCache.length; i++) {
        var vl = (voiceCache[i].lang || '').toLowerCase().replace('_', '-');
        if (vl === want) { best = voiceCache[i]; break; }
        if (!best && vl.indexOf(want.slice(0, 2)) === 0) best = voiceCache[i];
      }
      if (best) u.voice = best;
      window.__keepUtterance = u; // WebKit GC bug: utterance must stay referenced or audio stops
      // Chrome bug: speak() immediately after cancel() can be swallowed —
      // only cancel when something is playing, and delay the new utterance.
      if (synth.speaking || synth.pending) {
        synth.cancel();
        setTimeout(function () { synth.resume(); synth.speak(u); }, 80);
      } else {
        synth.resume(); // Chrome can be stuck in a paused state
        synth.speak(u);
      }
    } catch (e) {}
  }
  function speakerBtn(text, lang) {
    return el('button', {
      class: 'say-btn', title: 'Hear it spoken', 'aria-label': 'Hear it spoken', text: '🔊',
      onclick: function (ev) { ev.stopPropagation(); say(text, lang); }
    });
  }
  function vocabBoard(les) {
    if (!les.vocab || !speechOK) return null;
    var board = el('div', { class: 'learn-card vocab-board-wrap' }, [
      el('h3', { text: '🔊 Say it out loud! Tap a word to hear it in Spanish — then copy it!' })
    ]);
    var grid = el('div', { class: 'vocab-board' });
    les.vocab.forEach(function (v) {
      grid.appendChild(el('button', {
        class: 'vocab-btn',
        html: '🔊 <b>' + esc(v.es) + '</b><span class="vocab-en">' + esc(v.en) + '</span>',
        onclick: function () { say(v.es, 'es-ES'); }
      }));
    });
    board.appendChild(grid);
    board.appendChild(el('p', { class: 'progress-label', text: 'Can\'t hear anything? Turn the volume up — and on iPads/iPhones, check the silent (mute) switch is OFF.' }));
    return board;
  }

  /* ---------------- maths generators ---------------- */
  function fmtMoney(p) {
    return '£' + Math.floor(p / 100) + '.' + String(p % 100).padStart(2, '0');
  }
  var GENERATORS = {
    tables: function () {
      var a = rnd(2, 12), b = rnd(2, 12);
      if (Math.random() < 0.3) { // missing-number style
        return { type: 'type', q: '❓ × ' + b + ' = ' + (a * b) + '   What is the missing number?', answer: [String(a)] };
      }
      return { type: 'type', q: 'What is ' + a + ' × ' + b + '?', answer: [String(a * b)] };
    },
    arith: function () {
      var kind = pick(['add', 'sub', 'mul', 'div']);
      if (kind === 'add') {
        var a = rnd(120, 880), b = rnd(45, 900);
        return { type: 'type', q: 'What is ' + a + ' + ' + b + '?', answer: [String(a + b)] };
      }
      if (kind === 'sub') {
        var x = rnd(300, 980), y = rnd(40, 280);
        return { type: 'type', q: 'What is ' + x + ' − ' + y + '?', answer: [String(x - y)] };
      }
      if (kind === 'mul') {
        var m = rnd(12, 96), n = rnd(3, 9);
        return { type: 'type', q: 'What is ' + m + ' × ' + n + '?', answer: [String(m * n)] };
      }
      var d = rnd(2, 12), q2 = rnd(3, 12);
      return { type: 'type', q: 'What is ' + (d * q2) + ' ÷ ' + d + '?', answer: [String(q2)] };
    },
    money: function () {
      if (Math.random() < 0.5) {
        var p1 = rnd(45, 450), p2 = rnd(30, 400);
        return {
          type: 'type',
          q: 'A drink costs ' + fmtMoney(p1) + ' and a snack costs ' + fmtMoney(p2) + '. How much altogether? (like £9.99)',
          answer: [fmtMoney(p1 + p2), fmtMoney(p1 + p2).replace('£', '')]
        };
      }
      var cost = rnd(120, 480);
      var paidWith = cost <= 250 ? 300 : 500;
      if (Math.random() < 0.4) paidWith = 1000;
      return {
        type: 'type',
        q: 'You buy something for ' + fmtMoney(cost) + ' and pay with ' + fmtMoney(paidWith) + '. How much change do you get? (like £9.99)',
        answer: [fmtMoney(paidWith - cost), fmtMoney(paidWith - cost).replace('£', '')]
      };
    }
  };

  /* ---------------- routing ---------------- */
  function route() {
    if (!store) return; // Wait for store to initialize
    var hash = location.hash.replace(/^#\/?/, '');
    var parts = hash.split('/').filter(Boolean);
    window.scrollTo(0, 0);
    if (parts.length === 0) return renderHome();
    if (parts[0] === 'planner') return renderPlanner();
    if (parts[0] === 'awards') return renderAwards();
    if (parts[0] === 'grownups') return renderGrownups();
    if (parts[0] === 'subject' && parts[1]) {
      var sub = findSubject(parts[1]);
      if (sub) return renderSubject(sub);
    }
    if (parts[0] === 'lesson' && parts[1] && parts[2]) {
      var s = findSubject(parts[1]);
      var l = s && findLesson(s, parts[2]);
      if (l) return renderLesson(s, l);
    }
    renderHome();
  }
  window.addEventListener('hashchange', route);

  /* ---------------- views ---------------- */
  function renderHome() {
    if (!store) return; // Wait for store to load
    app.innerHTML = '';
    var totalLessons = 0, doneLessons = 0, totalStars = 0;
    SUBJECTS.forEach(function (s) {
      s.lessons.forEach(function (l) {
        totalLessons++;
        var p = getLessonProg(s.id, l.id);
        if (p && p.completed) doneLessons++;
        if (p) totalStars += p.stars;
      });
    });

    var hero = el('div', { class: 'hero' }, [
      el('h1', { text: '👋 Hi, ' + childName + '!' }),
      el('p', { text: 'Year 9 Science revision: Waves and Digestion. Pick a section and earn your stars!' }),
      el('div', { class: 'stats' }, [
        el('div', { class: 'stat', html: '🏅 <b>' + store.points + '</b> points' }),
        el('div', { class: 'stat', html: '⭐ <b>' + totalStars + '</b> stars' }),
        el('div', { class: 'stat', html: '✅ <b>' + doneLessons + '</b>/' + totalLessons + ' quests done' }),
        el('div', { class: 'stat', html: '🔥 <b>' + streak() + '</b> day streak' })
      ])
    ]);
    app.appendChild(hero);

    var grid = el('div', { class: 'subject-grid' });
    SUBJECTS.forEach(function (s) {
      var done = 0;
      s.lessons.forEach(function (l) {
        var p = getLessonProg(s.id, l.id);
        if (p && p.completed) done++;
      });
      var pct = s.lessons.length ? Math.round(done / s.lessons.length * 100) : 0;
      var card = el('a', { class: 'subject-card', href: '#/subject/' + s.id, style: 'border-top-color:' + s.color }, [
        el('div', { class: 'icon', text: s.icon }),
        el('h2', { text: s.name }),
        el('p', { class: 'tagline', text: s.tagline }),
        el('div', { class: 'progress-bar' }, [el('div', { style: 'width:' + pct + '%' })]),
        el('span', { class: 'progress-label', text: done + ' of ' + s.lessons.length + ' quests · ' + pct + '%' })
      ]);
      grid.appendChild(card);
    });
    app.appendChild(grid);
  }

  function renderSubject(sub) {
    app.innerHTML = '';
    app.appendChild(el('a', { class: 'back-link', href: '#/', text: '← All subjects' }));
    app.appendChild(el('h1', { text: sub.icon + ' ' + sub.name }));
    app.appendChild(el('p', { class: 'subtitle', text: sub.tagline }));
    var list = el('div', { class: 'lesson-list' });
    sub.lessons.forEach(function (les, i) {
      var p = getLessonProg(sub.id, les.id);
      var desc;
      if (les.gen) desc = 'Practice game — play it as many times as you like!';
      else if (les.blocks) desc = 'Coding lab — ' + les.blocks.challenges.length + ' block-coding challenges';
      else if (les.keylab) desc = 'Detective game — identify the mystery creatures!';
      else if (les.roleplay) desc = 'Role-play game — ' + les.roleplay.steps.length + ' lines of real conversation';
      else if (les.circuit) desc = 'Building lab — ' + les.circuit.challenges.length + ' circuits to build';
      else if (les.write) desc = 'Writing quest';
      else desc = (les.questions ? les.questions.length : 0) + ' questions';
      if (p && p.best) desc += ' · best score ' + p.best + '%';
      var row = el('a', {
        class: 'lesson-row' + (p && p.completed ? ' done' : ''),
        href: '#/lesson/' + sub.id + '/' + les.id
      }, [
        el('span', { class: 'emoji', text: les.emoji || '📘' }),
        el('div', { class: 'info' }, [
          el('h3', { text: (i + 1) + '. ' + les.title }),
          el('p', { text: desc })
        ]),
        el('span', { class: 'stars', text: starString(p ? p.stars : 0) })
      ]);
      list.appendChild(row);
    });
    app.appendChild(list);
  }

  /* ---------------- lesson flow ---------------- */
  function renderLesson(sub, les) {
    app.innerHTML = '';
    app.appendChild(el('a', { class: 'back-link', href: '#/subject/' + sub.id, text: '← ' + sub.name }));
    app.appendChild(el('h1', { text: (les.emoji || '') + ' ' + les.title }));

    if (les.write) return renderWriting(sub, les);
    if (les.blocks) return renderBlocks(sub, les);
    if (les.keylab) return renderKeylab(sub, les);
    if (les.roleplay) return renderRoleplay(sub, les);
    if (les.circuit) return renderCircuit(sub, les);

    var wrap = el('div');
    app.appendChild(wrap);

    (les.learn || []).forEach(function (card) {
      wrap.appendChild(el('div', { class: 'learn-card' }, [
        card.title ? el('h3', { text: '📖 ' + card.title }) : null,
        el('div', { html: card.html })
      ]));
    });

    var vb = vocabBoard(les);
    if (vb) wrap.appendChild(vb);

    var questions = buildQuestions(les);
    var startLabel = (les.learn && les.learn.length ? 'Start the quiz! 🚀' : 'Start! 🚀');
    wrap.appendChild(el('button', {
      class: 'big-btn',
      text: startLabel,
      onclick: function () { runQuiz(sub, les, questions, wrap); }
    }));
  }

  function buildQuestions(les) {
    if (les.gen) {
      var fn = GENERATORS[les.gen];
      var n = les.target || 10;
      var qs = [];
      for (var i = 0; i < n; i++) qs.push(fn());
      return qs;
    }
    // Cap each play-through so a single session stays ~7-8 minutes. Lessons
    // with a bigger pool show a fresh random mix each replay (more variety).
    var PER_SESSION = 20;
    var qs = shuffle(les.questions || []);
    return qs.length > PER_SESSION ? qs.slice(0, PER_SESSION) : qs;
  }

  function runQuiz(sub, les, questions, wrap) {
    var idx = 0;
    var score = 0; // may be fractional for sort questions
    var fullyCorrect = 0; // questions answered perfectly
    var wrong = []; // labels of questions they got wrong (for the grown-ups breakdown)
    var peekOpen = false; // remember if the learn cards are unfolded between questions
    var padOpen = false; // remember if the Apple Pencil working-out pad is unfolded between questions
    next();

    function next() {
      if (idx >= questions.length) return finish();
      wrap.innerHTML = '';
      var q = questions[idx];
      wrap.appendChild(el('div', { class: 'quiz-head' }, [
        el('span', { class: 'quiz-progress', text: 'Question ' + (idx + 1) + ' of ' + questions.length }),
        el('div', { class: 'progress-bar', style: 'flex:1;max-width:240px' }, [
          el('div', { style: 'width:' + Math.round(idx / questions.length * 100) + '%' })
        ])
      ]));
      if (les.learn && les.learn.length) {
        var peek = el('details', { class: 'learn-peek' }, [
          el('summary', { text: '📖 Read the learning cards again (no peeking needed — but they\'re here if you want them!)' })
        ].concat(les.learn.map(function (card) {
          return el('div', { class: 'learn-card' }, [
            card.title ? el('h3', { text: '📖 ' + card.title }) : null,
            el('div', { html: card.html })
          ]);
        })));
        var pvb = vocabBoard(les);
        if (pvb) peek.appendChild(pvb);
        if (peekOpen) peek.setAttribute('open', '');
        peek.addEventListener('toggle', function () { peekOpen = peek.open; });
        wrap.appendChild(peek);
      }
      var card = el('div', { class: 'question-card' });
      wrap.appendChild(card);
      // Maths often needs jotting things down — give them a handwriting pad they
      // can scribble their working out on with the Apple Pencil (or a finger).
      if (sub.id === 'maths') {
        wrap.appendChild(workingPad(padOpen, function (open) { padOpen = open; }));
      }
      renderQuestion(q, card, function (points) {
        score += points;
        if (points >= 0.999) fullyCorrect++;
        else wrong.push(questionLabel(q));
        idx++;
        next();
      });
    }

    function finish() {
      var pct = Math.round(score / questions.length * 100);
      var rec = recordResult(sub.id, les.id, pct, {
        correct: fullyCorrect, total: questions.length, wrong: wrong
      });
      var stars = starsFor(pct);
      if (pct >= 70) confetti();
      wrap.innerHTML = '';
      var msg = pct >= 90 ? 'AMAZING work, ' + childName + '! 🎉' :
                pct >= 70 ? 'Great job, ' + childName + '! 💪' :
                pct >= 50 ? 'Good effort — keep practising!' :
                'Tricky one! Read the learn cards and try again — you can do it!';
      wrap.appendChild(el('div', { class: 'result-card' }, [
        el('div', { class: 'big-emoji', text: pct >= 70 ? '🏆' : pct >= 50 ? '😊' : '💪' }),
        el('h2', { text: msg }),
        el('div', { class: 'result-stars', text: starString(stars) }),
        el('p', { class: 'result-score', text: 'You scored ' + Math.round(score * 10) / 10 + ' out of ' + questions.length + ' (' + pct + '%)' }),
        el('p', { text: 'Best ever: ' + rec.best + '% · Points: ' + store.points + ' 🏅' }),
        el('div', { class: 'quiz-actions', style: 'justify-content:center' }, [
          el('button', { class: 'big-btn secondary', text: 'Try again 🔁', onclick: function () { renderLesson(sub, les); } }),
          el('a', { class: 'big-btn', href: '#/subject/' + sub.id, style: 'text-decoration:none', text: 'Back to ' + sub.name + ' ➡️' })
        ])
      ]));
    }
  }

  /* ---------------- Apple Pencil working-out pad ----------------
     A little squared-paper scratch canvas for jotting working out by hand.
     Built on Pointer Events so it understands the Apple Pencil: stroke width
     follows pen pressure, coalesced events keep lines smooth, and once a
     stylus has been used we ignore finger/palm touches (palm rejection). */
  function workingPad(initiallyOpen, onToggle) {
    var COLOURS = ['#1d3557', '#000000', '#e63946', '#2a9d8f'];
    var colour = COLOURS[0];
    var erasing = false;

    var canvas = el('canvas', { class: 'workpad-canvas' });
    var ctx = canvas.getContext('2d');
    var dpr = Math.max(1, window.devicePixelRatio || 1);
    var penSeen = false;  // once true we treat 'touch' pointers as palm rest
    var active = null;    // id of the pointer currently drawing
    var last = null;      // last point drawn, in CSS pixels

    function fit() {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      var prev = null;
      if (canvas.width) {
        prev = document.createElement('canvas');
        prev.width = canvas.width; prev.height = canvas.height;
        prev.getContext('2d').drawImage(canvas, 0, 0);
      }
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (prev) ctx.drawImage(prev, 0, 0, prev.width, prev.height, 0, 0, w, h);
    }

    function point(e) {
      var r = canvas.getBoundingClientRect();
      var p = (e.pressure > 0 && e.pointerType === 'pen') ? e.pressure : 0.5;
      return { x: e.clientX - r.left, y: e.clientY - r.top, p: p };
    }

    function drawSeg(a, b) {
      ctx.globalCompositeOperation = erasing ? 'destination-out' : 'source-over';
      ctx.strokeStyle = colour;
      ctx.lineWidth = erasing ? 24 : Math.max(1, 3.5 * (0.4 + b.p * 1.4));
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    canvas.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'pen') penSeen = true;
      if (penSeen && e.pointerType === 'touch') return; // palm rejection
      if (active !== null) return;
      active = e.pointerId;
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
      last = point(e);
      drawSeg(last, { x: last.x + 0.1, y: last.y, p: last.p }); // a tap leaves a dot
      e.preventDefault();
    });
    canvas.addEventListener('pointermove', function (e) {
      if (e.pointerId !== active) return;
      var evs = (e.getCoalescedEvents && e.getCoalescedEvents()) || [];
      if (!evs.length) evs = [e];
      evs.forEach(function (ev) { var p = point(ev); drawSeg(last, p); last = p; });
      e.preventDefault();
    });
    function endStroke(e) {
      if (e.pointerId !== active) return;
      active = null; last = null;
      try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
    }
    canvas.addEventListener('pointerup', endStroke);
    canvas.addEventListener('pointercancel', endStroke);

    function clear() {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    // toolbar
    var swatches = COLOURS.map(function (c) {
      var b = el('button', { class: 'workpad-swatch', type: 'button', title: 'Pen colour', style: 'background:' + c });
      if (c === colour) b.classList.add('active');
      b.addEventListener('click', function () {
        colour = c; erasing = false;
        tools.querySelectorAll('.workpad-swatch').forEach(function (s) { s.classList.remove('active'); });
        b.classList.add('active');
        rubber.classList.remove('active');
      });
      return b;
    });
    var rubber = el('button', { class: 'workpad-tool', type: 'button', text: '🧽 Rubber' });
    rubber.addEventListener('click', function () {
      erasing = true;
      tools.querySelectorAll('.workpad-swatch').forEach(function (s) { s.classList.remove('active'); });
      rubber.classList.add('active');
    });
    var clearBtn = el('button', { class: 'workpad-tool', type: 'button', text: '🗑️ Clear' });
    clearBtn.addEventListener('click', clear);

    var tools = el('div', { class: 'workpad-tools' },
      swatches.concat([rubber, clearBtn, el('span', { class: 'workpad-hint', text: '✍️ Use your Apple Pencil' })]));

    var body = el('div', { class: 'workpad-body' }, [tools, canvas]);

    // keep the canvas crisp when the iPad rotates; tidy the listener up once
    // this pad is no longer on the page (a new one is built per question).
    function onResize() {
      if (!document.body.contains(canvas)) { window.removeEventListener('resize', onResize); return; }
      if (!body.hidden) fit();
    }
    window.addEventListener('resize', onResize);

    var toggle = el('button', { class: 'workpad-toggle', type: 'button' });
    function setOpen(open) {
      body.hidden = !open;
      toggle.textContent = (open ? '✏️ Hide working out' : '✏️ Show working out');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) requestAnimationFrame(fit);
      if (onToggle) onToggle(open);
    }
    toggle.addEventListener('click', function () { setOpen(body.hidden); });

    var node = el('div', { class: 'workpad' }, [toggle, body]);
    setOpen(!!initiallyOpen);
    return node;
  }

  /* ---------------- question renderers ---------------- */
  function renderQuestion(q, card, done) {
    if (q.type === 'choice') return qChoice(q, card, done);
    if (q.type === 'type') return qType(q, card, done);
    if (q.type === 'match') return qMatch(q, card, done);
    if (q.type === 'sort') return qSort(q, card, done);
    if (q.type === 'order') return qOrder(q, card, done);
    if (q.type === 'clock') return qClock(q, card, done);
    if (q.type === 'gridpick') return qGridpick(q, card, done);
    if (q.type === 'coins') return qCoins(q, card, done);
    // unknown type: skip but count as correct so data typos never block progress
    done(1);
  }

  function feedbackAndNext(card, ok, explain, done, points) {
    var fb = el('div', { class: 'feedback ' + (ok ? 'good' : 'bad') }, [
      el('b', { text: ok ? pick(['Correct! 🎉', 'Yes! ⚡', 'Nailed it! 🛡️', 'Brilliant! 🌟']) : 'Not quite! ' }),
      explain ? el('span', { html: ' ' + explain }) : null
    ]);
    card.appendChild(fb);
    var actions = el('div', { class: 'quiz-actions' });
    var btn = el('button', { class: 'big-btn', text: 'Next ➡️', onclick: function () { done(points); } });
    actions.appendChild(btn);
    card.appendChild(actions);
    btn.focus();
  }

  function qChoice(q, card, done) {
    card.appendChild(el('p', { class: 'question-text', html: q.q }));
    qChoiceCore(q, card, done);
  }

  function qChoiceCore(q, card, done) {
    var opts = q.options.map(function (text, i) { return { text: text, correct: i === q.answer }; });
    if (q.keepOrder !== true) opts = shuffle(opts);
    var box = el('div', { class: 'options' });
    var answered = false;
    opts.forEach(function (o) {
      var b = el('button', { class: 'option-btn', html: o.text });
      b.addEventListener('click', function () {
        if (answered) return;
        answered = true;
        var buttons = box.querySelectorAll('button');
        buttons.forEach(function (bb) { bb.disabled = true; });
        opts.forEach(function (oo, j) { if (oo.correct) buttons[j].classList.add('correct'); });
        if (!o.correct) b.classList.add('wrong');
        feedbackAndNext(card, o.correct, q.explain, done, o.correct ? 1 : 0);
      });
      box.appendChild(b);
    });
    card.appendChild(box);
  }

  function normalise(s) {
    return String(s).toLowerCase().trim()
      .replace(/[£,!?.]/g, '')
      .replace(/\s+/g, ' ');
  }

  function qType(q, card, done) {
    card.appendChild(el('p', { class: 'question-text', html: q.q }));
    var input = el('input', { class: 'answer-input', type: 'text', autocomplete: 'off', autocapitalize: 'off', placeholder: 'Type your answer…' });
    card.appendChild(input);
    if (q.hint) card.appendChild(el('p', { class: 'progress-label', text: '💡 Hint: ' + q.hint }));
    var actions = el('div', { class: 'quiz-actions' });
    var answered = false;
    function check() {
      if (answered) return;
      var given = normalise(input.value);
      if (!given) return;
      answered = true;
      var answers = (Array.isArray(q.answer) ? q.answer : [q.answer]).map(normalise);
      var ok = answers.indexOf(given) !== -1;
      input.disabled = true;
      input.classList.add(ok ? 'correct' : 'wrong');
      btn.remove();
      var explain = q.explain || '';
      if (!ok) explain = 'The answer was <b>' + esc(Array.isArray(q.answer) ? q.answer[0] : q.answer) + '</b>. ' + explain;
      feedbackAndNext(card, ok, explain, done, ok ? 1 : 0);
    }
    var btn = el('button', { class: 'big-btn', text: 'Check ✔️', onclick: check });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
    actions.appendChild(btn);
    card.appendChild(actions);
    input.focus();
  }

  function qMatch(q, card, done) {
    card.appendChild(el('p', { class: 'question-text', html: q.q || 'Match the pairs! Tap one from each side.' }));
    var lefts = q.pairs.map(function (p) { return p[0]; });
    var rights = shuffle(q.pairs.map(function (p) { return p[1]; }));
    var cols = el('div', { class: 'match-cols' });
    var colL = el('div', { class: 'match-col' });
    var colR = el('div', { class: 'match-col' });
    cols.appendChild(colL); cols.appendChild(colR);
    card.appendChild(cols);

    var selected = null; // {side, value, node}
    var matched = 0, mistakes = 0;

    function correctRight(leftVal) {
      for (var i = 0; i < q.pairs.length; i++) if (q.pairs[i][0] === leftVal) return q.pairs[i][1];
      return null;
    }
    function makeItem(side, value) {
      var b = el('button', { class: 'match-item', html: value });
      b.addEventListener('click', function () {
        if (b.classList.contains('matched')) return;
        if (selected && selected.node === b) {
          b.classList.remove('selected'); selected = null; return;
        }
        if (!selected || selected.side === side) {
          if (selected) selected.node.classList.remove('selected');
          selected = { side: side, value: value, node: b };
          b.classList.add('selected');
          return;
        }
        var leftVal = side === 'L' ? value : selected.value;
        var rightVal = side === 'R' ? value : selected.value;
        var isMatch = correctRight(leftVal) === rightVal;
        var other = selected.node;
        if (isMatch) {
          b.classList.remove('selected'); other.classList.remove('selected');
          b.classList.add('matched'); other.classList.add('matched');
          matched++;
          if (matched === q.pairs.length) {
            var points = mistakes === 0 ? 1 : (mistakes <= 2 ? 0.5 : 0);
            var msg = mistakes === 0 ? 'All matched first time!' : 'All matched — ' + mistakes + ' slip' + (mistakes > 1 ? 's' : '') + ' on the way.';
            feedbackAndNext(card, mistakes === 0, (q.explain ? q.explain + ' ' : '') + msg, done, points);
          }
        } else {
          mistakes++;
          b.classList.add('shake'); other.classList.add('shake');
          setTimeout(function () {
            b.classList.remove('shake'); other.classList.remove('shake');
            other.classList.remove('selected');
          }, 380);
          selected = null;
          return;
        }
        selected = null;
      });
      return b;
    }
    lefts.forEach(function (v) { colL.appendChild(makeItem('L', v)); });
    rights.forEach(function (v) { colR.appendChild(makeItem('R', v)); });
  }

  function qSort(q, card, done) {
    card.appendChild(el('p', { class: 'question-text', html: q.q }));
    var items = shuffle(q.items);
    var i = 0, correct = 0;
    var stage = el('div');
    card.appendChild(stage);
    show();
    function show() {
      if (i >= items.length) {
        var points = correct / items.length;
        feedbackAndNext(card, correct === items.length,
          'You sorted ' + correct + ' of ' + items.length + ' correctly. ' + (q.explain || ''), done, points);
        return;
      }
      stage.innerHTML = '';
      var item = items[i];
      stage.appendChild(el('p', { class: 'progress-label', text: 'Item ' + (i + 1) + ' of ' + items.length }));
      stage.appendChild(el('div', { class: 'sort-item', html: item.text }));
      var row = el('div', { class: 'bucket-row' });
      q.buckets.forEach(function (bName, bIdx) {
        row.appendChild(el('button', {
          class: 'bucket-btn', html: bName,
          onclick: function () {
            var ok = bIdx === item.bucket;
            if (ok) correct++;
            var note = el('div', { class: 'feedback ' + (ok ? 'good' : 'bad'),
              html: ok ? '✔️ Yes!' : '✖️ It belongs in <b>' + esc(q.buckets[item.bucket]) + '</b>' + (item.why ? ' — ' + item.why : '') });
            stage.appendChild(note);
            row.querySelectorAll('button').forEach(function (bb) { bb.disabled = true; });
            setTimeout(function () { i++; show(); }, ok ? 700 : 2200);
          }
        }));
      });
      stage.appendChild(row);
    }
  }

  function qOrder(q, card, done) {
    card.appendChild(el('p', { class: 'question-text', html: q.q }));
    card.appendChild(el('p', { class: 'order-slot-label', text: 'Tap the steps in the right order — first one first!' }));
    var result = el('div', { class: 'order-result' });
    var pool = el('div', { class: 'order-pool' });
    card.appendChild(result);
    card.appendChild(pool);
    var nextIdx = 0, mistakes = 0;
    shuffle(q.items.map(function (t, i) { return { t: t, i: i }; })).forEach(function (item) {
      var chip = el('button', { class: 'order-chip', html: item.t });
      chip.addEventListener('click', function () {
        if (chip.classList.contains('placed')) return;
        if (item.i === nextIdx) {
          chip.classList.add('placed');
          chip.innerHTML = '<b>' + (nextIdx + 1) + '.</b> ' + item.t;
          result.appendChild(chip);
          nextIdx++;
          if (nextIdx === q.items.length) {
            var points = mistakes === 0 ? 1 : (mistakes <= 2 ? 0.5 : 0);
            feedbackAndNext(card, mistakes === 0,
              (q.explain ? q.explain + ' ' : '') + (mistakes ? mistakes + ' wrong tap' + (mistakes > 1 ? 's' : '') + '.' : 'Perfect order!'),
              done, points);
          }
        } else {
          mistakes++;
          chip.classList.add('shake');
          setTimeout(function () { chip.classList.remove('shake'); }, 380);
        }
      });
      pool.appendChild(chip);
    });
  }

  /* ---- analogue clock questions ---- */
  function clockSvg(h, m) {
    var hourA = (((h % 12) + m / 60) * 30) * Math.PI / 180;
    var minA = (m * 6) * Math.PI / 180;
    var s = '<svg viewBox="0 0 200 200" class="clock-face" role="img" aria-label="clock">';
    s += '<circle cx="100" cy="100" r="95" fill="#fffbe9" stroke="#1d3557" stroke-width="6"/>';
    for (var i = 1; i <= 12; i++) {
      var a = i * 30 * Math.PI / 180;
      s += '<text x="' + (100 + Math.sin(a) * 76) + '" y="' + (100 - Math.cos(a) * 76 + 7) + '" text-anchor="middle" font-size="20" font-weight="bold" fill="#1d3557">' + i + '</text>';
      s += '<line x1="' + (100 + Math.sin(a) * 87) + '" y1="' + (100 - Math.cos(a) * 87) + '" x2="' + (100 + Math.sin(a) * 93) + '" y2="' + (100 - Math.cos(a) * 93) + '" stroke="#1d3557" stroke-width="3"/>';
    }
    s += '<line x1="100" y1="100" x2="' + (100 + Math.sin(hourA) * 45) + '" y2="' + (100 - Math.cos(hourA) * 45) + '" stroke="#e63946" stroke-width="9" stroke-linecap="round"/>';
    s += '<line x1="100" y1="100" x2="' + (100 + Math.sin(minA) * 68) + '" y2="' + (100 - Math.cos(minA) * 68) + '" stroke="#1d3557" stroke-width="5" stroke-linecap="round"/>';
    s += '<circle cx="100" cy="100" r="6" fill="#1d3557"/></svg>';
    return s;
  }

  function qClock(q, card, done) {
    card.appendChild(el('p', { class: 'question-text', html: q.q }));
    card.appendChild(el('div', { class: 'clock-wrap', html: clockSvg(q.h, q.m) }));
    qChoiceCore(q, card, done);
  }

  /* ---- tap-the-coordinates questions ---- */
  function qGridpick(q, card, done) {
    card.appendChild(el('p', { class: 'question-text', html: q.q }));
    var cols = q.cols, rows = q.rows;
    var grid = el('div', { class: 'coord-wrap', style: 'grid-template-columns:30px repeat(' + cols + ', 46px)' });
    var answered = false;
    function markAt(x, y) {
      var emoji = '';
      (q.marks || []).forEach(function (mk) { if (mk.x === x && mk.y === y) emoji = mk.emoji; });
      return emoji;
    }
    for (var y = rows - 1; y >= 0; y--) {
      grid.appendChild(el('div', { class: 'coord-label', text: String(y) }));
      for (var x = 0; x < cols; x++) {
        (function (x, y) {
          var cell = el('button', { class: 'code-cell coord-cell', 'data-x': x, 'data-y': y, text: markAt(x, y) });
          cell.addEventListener('click', function () {
            if (answered) return;
            answered = true;
            var ok = x === q.target[0] && y === q.target[1];
            cell.classList.add(ok ? 'cell-good' : 'cell-bad');
            var t = grid.querySelector('[data-x="' + q.target[0] + '"][data-y="' + q.target[1] + '"]');
            if (t) { t.classList.add('cell-good'); if (!t.textContent) t.textContent = '⭐'; }
            feedbackAndNext(card, ok, (ok ? '' : 'You tapped (' + x + ', ' + y + ') — the star shows the right spot. ') + (q.explain || ''), done, ok ? 1 : 0);
          });
          grid.appendChild(cell);
        })(x, y);
      }
    }
    grid.appendChild(el('div', { class: 'coord-label', text: '' }));
    for (var x2 = 0; x2 < cols; x2++) grid.appendChild(el('div', { class: 'coord-label', text: String(x2) }));
    card.appendChild(grid);
    card.appendChild(el('p', { class: 'progress-label', text: 'Remember: along the corridor (across), THEN up the stairs!' }));
  }

  /* ---- coin till questions ---- */
  var COIN_SET = [
    { v: 200, l: '£2', c: 'coin-two' }, { v: 100, l: '£1', c: 'coin-gold' },
    { v: 50, l: '50p', c: 'coin-silver' }, { v: 20, l: '20p', c: 'coin-silver' },
    { v: 10, l: '10p', c: 'coin-silver' }, { v: 5, l: '5p', c: 'coin-silver' },
    { v: 2, l: '2p', c: 'coin-bronze' }, { v: 1, l: '1p', c: 'coin-bronze' }
  ];
  function qCoins(q, card, done) {
    card.appendChild(el('p', { class: 'question-text', html: q.q }));
    var till = [];
    var mistakes = 0;
    var finished = false;
    var tillBox = el('div', { class: 'till' });
    var totalLbl = el('p', { class: 'till-total' });
    var msg = el('div');
    function total() { return till.reduce(function (a, c) { return a + c; }, 0); }
    function redraw() {
      tillBox.innerHTML = '';
      if (!till.length) tillBox.appendChild(el('span', { class: 'progress-label', text: 'Tap coins below to put them in the till — tap a coin in the till to take it back out.' }));
      till.forEach(function (v, i) {
        var def = null;
        COIN_SET.forEach(function (c) { if (c.v === v) def = c; });
        tillBox.appendChild(el('button', {
          class: 'coin ' + def.c, text: def.l,
          onclick: function () { if (finished) return; till.splice(i, 1); redraw(); }
        }));
      });
      totalLbl.textContent = 'In the till: ' + fmtMoney(total()) + '  ·  Target: ' + fmtMoney(q.target);
    }
    card.appendChild(el('h3', { text: '🧾 The till' }));
    card.appendChild(tillBox);
    card.appendChild(totalLbl);
    card.appendChild(el('h3', { text: '🪙 Your coins' }));
    var rowC = el('div', { class: 'coin-row' });
    COIN_SET.forEach(function (c) {
      rowC.appendChild(el('button', {
        class: 'coin ' + c.c, 'data-coin': c.v, text: c.l,
        onclick: function () { if (!finished && till.length < 20) { till.push(c.v); redraw(); } }
      }));
    });
    card.appendChild(rowC);
    var payBtn = el('button', { id: 'pay-btn', class: 'big-btn', text: '💰 Pay!' });
    payBtn.addEventListener('click', function () {
      if (finished) return;
      msg.innerHTML = '';
      var t = total();
      if (t === q.target) {
        finished = true;
        var points = mistakes === 0 ? 1 : (mistakes <= 2 ? 0.5 : 0);
        feedbackAndNext(card, mistakes === 0, 'Exactly ' + fmtMoney(q.target) + '!' + (mistakes ? ' (' + mistakes + ' wrong tr' + (mistakes > 1 ? 'ies' : 'y') + ' on the way.)' : '') + ' ' + (q.explain || ''), done, points);
      } else {
        mistakes++;
        msg.appendChild(el('div', { class: 'feedback bad', html: t > q.target ? 'Too much! You have ' + fmtMoney(t) + ' — take some coins out.' : 'Not enough yet — you have ' + fmtMoney(t) + ' and need ' + fmtMoney(q.target) + '.' }));
      }
    });
    card.appendChild(el('div', { class: 'quiz-actions' }, [payBtn]));
    card.appendChild(msg);
    redraw();
  }

  /* ---------------- block coding lab ---------------- */
  var DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // N E S W
  var DIR_ARROWS = ['⬆️', '➡️', '⬇️', '⬅️'];
  var DIR_NAMES = { N: 0, E: 1, S: 2, W: 3 };

  function renderBlocks(sub, les) {
    var key = lessonKey(sub.id, les.id);
    var wrap = el('div');
    app.appendChild(wrap);

    (les.learn || []).forEach(function (card) {
      wrap.appendChild(el('div', { class: 'learn-card' }, [
        card.title ? el('h3', { text: '📖 ' + card.title }) : null,
        el('div', { html: card.html })
      ]));
    });

    var challenges = les.blocks.challenges;
    var done = store.checks[key] || {};
    var ci = 0;
    while (ci < challenges.length - 1 && done[ci]) ci++;
    var lab = el('div');
    wrap.appendChild(lab);
    show();

    function doneCount() {
      var n = 0;
      for (var i = 0; i < challenges.length; i++) if (done[i]) n++;
      return n;
    }

    function show() {
      lab.innerHTML = '';
      var ch = challenges[ci];
      var map = ch.map;
      var cols = map[0].length;
      var start = null;
      map.forEach(function (row, y) {
        var x = row.indexOf('S');
        if (x !== -1) start = { x: x, y: y };
      });
      var startDir = DIR_NAMES[ch.dir || 'E'];
      var pos = { x: start.x, y: start.y };
      var dir = startDir;
      var program = []; // tokens: {t:'F'|'L'|'R'} | {t:'REP',n} | {t:'END'}
      var running = false;
      var timer = null;

      var head = el('div', { class: 'quiz-head' }, [
        el('span', { class: 'quiz-progress', text: '🧩 Challenge ' + (ci + 1) + ' of ' + challenges.length + ': ' + ch.name + (done[ci] ? ' ✅' : '') }),
        el('span', { class: 'progress-label', text: doneCount() + ' of ' + challenges.length + ' solved' })
      ]);
      lab.appendChild(head);

      var nav = el('div', { class: 'quiz-actions', style: 'margin:0 0 10px' });
      challenges.forEach(function (c, i) {
        nav.appendChild(el('button', {
          class: 'chal-tab' + (i === ci ? ' active' : ''),
          text: (done[i] ? '✅' : (i + 1)),
          title: c.name,
          onclick: function () { if (!running) { ci = i; show(); } }
        }));
      });
      lab.appendChild(nav);

      var card = el('div', { class: 'question-card' });
      lab.appendChild(card);
      card.appendChild(el('p', { class: 'question-text', html: '🚩 <b>Mission:</b> guide the Robo-Viking to the treasure 💰. Tap blocks to build your program, then press Run!' + (ch.hint ? '<br><span class="progress-label">🌟 ' + ch.hint + '</span>' : '') }));

      // grid
      var grid = el('div', { class: 'code-grid', style: 'grid-template-columns:repeat(' + cols + ', 44px)' });
      card.appendChild(grid);
      function drawGrid() {
        grid.innerHTML = '';
        map.forEach(function (row, y) {
          for (var x = 0; x < cols; x++) {
            var c = row[x];
            var t = c === '#' ? '🪨' : c === 'G' ? '💰' : '';
            if (pos.x === x && pos.y === y) t = DIR_ARROWS[dir];
            grid.appendChild(el('div', { class: 'code-cell' + (c === '#' ? ' rock' : ''), text: t }));
          }
        });
      }
      drawGrid();

      var msg = el('div');
      card.appendChild(msg);

      // program list
      card.appendChild(el('h3', { text: '📜 My program (tap a block to remove it)' }));
      var progBox = el('div', { class: 'program-list' });
      card.appendChild(progBox);
      function blockLabel(tok) {
        if (tok.t === 'F') return '⬆️ move forward';
        if (tok.t === 'L') return '↩️ turn left';
        if (tok.t === 'R') return '↪️ turn right';
        if (tok.t === 'REP') return '🔁 repeat ×' + tok.n + ' ⤵';
        return '⤴ end repeat';
      }
      function drawProgram() {
        progBox.innerHTML = '';
        if (!program.length) {
          progBox.appendChild(el('p', { class: 'progress-label', text: 'No blocks yet — tap the coloured blocks below to add them!' }));
          return;
        }
        var depth = 0;
        program.forEach(function (tok, i) {
          if (tok.t === 'END' && depth > 0) depth--;
          var cls = 'code-block ' + (tok.t === 'F' ? 'b-move' : (tok.t === 'L' || tok.t === 'R') ? 'b-turn' : 'b-loop');
          progBox.appendChild(el('button', {
            class: cls,
            style: 'margin-left:' + (depth * 22) + 'px',
            text: blockLabel(tok),
            onclick: function () { if (!running) { program.splice(i, 1); drawProgram(); } }
          }));
          if (tok.t === 'REP') depth++;
        });
      }
      drawProgram();

      // palette
      card.appendChild(el('h3', { text: '🧱 Blocks' }));
      var repCount = el('select', { class: 'rep-count' });
      for (var n = 2; n <= 6; n++) repCount.appendChild(el('option', { value: n, text: '×' + n }));
      function add(tok) {
        if (running) return;
        if (program.length >= 30) return;
        program.push(tok);
        drawProgram();
      }
      var palette = el('div', { class: 'palette' }, [
        el('button', { class: 'code-block b-move', 'data-cmd': 'F', text: '⬆️ move forward', onclick: function () { add({ t: 'F' }); } }),
        el('button', { class: 'code-block b-turn', 'data-cmd': 'L', text: '↩️ turn left', onclick: function () { add({ t: 'L' }); } }),
        el('button', { class: 'code-block b-turn', 'data-cmd': 'R', text: '↪️ turn right', onclick: function () { add({ t: 'R' }); } }),
        el('span', { class: 'loop-group' }, [
          el('button', { class: 'code-block b-loop', text: '🔁 repeat', onclick: function () { add({ t: 'REP', n: Number(repCount.value) }); } }),
          repCount,
          el('button', { class: 'code-block b-loop', text: '⤴ end repeat', onclick: function () { add({ t: 'END' }); } })
        ])
      ]);
      card.appendChild(palette);

      var runBtn = el('button', { id: 'run-btn', class: 'big-btn', text: '▶️ Run!' });
      var clearBtn = el('button', { class: 'big-btn secondary', text: '🗑️ Clear' });
      card.appendChild(el('div', { class: 'quiz-actions' }, [runBtn, clearBtn]));
      clearBtn.addEventListener('click', function () {
        if (running) return;
        program = [];
        pos = { x: start.x, y: start.y }; dir = startDir;
        msg.innerHTML = '';
        drawProgram(); drawGrid();
      });

      function expand(tokens) {
        var out = [];
        function walk(i, into) {
          while (i < tokens.length) {
            var tok = tokens[i];
            if (tok.t === 'REP') {
              var body = [];
              i = walk(i + 1, body);
              for (var r = 0; r < tok.n; r++) body.forEach(function (b) { into.push(b); });
            } else if (tok.t === 'END') {
              return i + 1;
            } else {
              into.push(tok.t);
              i++;
            }
            if (into.length > 300) return tokens.length;
          }
          return i;
        }
        walk(0, out);
        return out.slice(0, 300);
      }

      runBtn.addEventListener('click', function () {
        if (running || !program.length) return;
        running = true;
        msg.innerHTML = '';
        pos = { x: start.x, y: start.y }; dir = startDir;
        drawGrid();
        var cmds = expand(program);
        var step = 0;
        timer = setInterval(function () {
          if (step >= cmds.length) { stop(); fail('🤖 The Robo-Viking stopped before reaching the treasure. Add more blocks and try again!'); return; }
          var c = cmds[step++];
          if (c === 'L') dir = (dir + 3) % 4;
          else if (c === 'R') dir = (dir + 1) % 4;
          else {
            var nx = pos.x + DIRS[dir][0], ny = pos.y + DIRS[dir][1];
            if (ny < 0 || ny >= map.length || nx < 0 || nx >= cols || map[ny][nx] === '#') {
              stop(); crash(); return;
            }
            pos = { x: nx, y: ny };
            if (map[ny][nx] === 'G') { drawGrid(); stop(); win(); return; }
          }
          drawGrid();
        }, 300);
      });

      function stop() { clearInterval(timer); running = false; }
      function fail(text) {
        msg.innerHTML = '';
        msg.appendChild(el('div', { class: 'feedback bad', html: text }));
      }
      function crash() {
        fail('💥 CRASH! The Robo-Viking bumped into something. Debug your program and run it again!');
        setTimeout(function () {
          pos = { x: start.x, y: start.y }; dir = startDir;
          drawGrid();
        }, 1200);
      }
      function win() {
        confetti();
        var first = !done[ci];
        done[ci] = true;
        store.checks[key] = done;
        saveStore();
        recordResult(sub.id, les.id, Math.round(doneCount() / challenges.length * 100));
        msg.innerHTML = '';
        var allDone = doneCount() === challenges.length;
        var fb = el('div', { class: 'feedback good challenge-success' }, [
          el('b', { text: allDone ? '🏆 TREASURE! You solved every challenge — you\'re a real programmer, ' + childName + '!' : '🎉 TREASURE! Challenge solved' + (first ? '' : ' (again!)') + '!' }),
          el('div', { class: 'quiz-actions' }, [
            el('button', {
              id: 'next-challenge', class: 'big-btn',
              text: allDone ? 'Back to ' + sub.name + ' ➡️' : 'Next challenge ➡️',
              onclick: function () {
                if (allDone) { location.hash = '#/subject/' + sub.id; return; }
                ci = (ci + 1) % challenges.length;
                while (done[ci] && doneCount() < challenges.length) ci = (ci + 1) % challenges.length;
                show();
              }
            })
          ])
        ]);
        msg.appendChild(fb);
      }
    }
  }

  /* ---------------- classification key lab ---------------- */
  function renderKeylab(sub, les) {
    var key = lessonKey(sub.id, les.id);
    var wrap = el('div');
    app.appendChild(wrap);
    (les.learn || []).forEach(function (card) {
      wrap.appendChild(el('div', { class: 'learn-card' }, [
        card.title ? el('h3', { text: '📖 ' + card.title }) : null,
        el('div', { html: card.html })
      ]));
    });

    var tree = les.keylab.tree;
    var leaves = [];
    (function collect(n) {
      if (n.animal) { leaves.push(n); return; }
      collect(n.yes); collect(n.no);
    })(tree);
    var done = store.checks[key] || {};
    var round = 0;
    while (round < leaves.length - 1 && done[round]) round++;
    var lab = el('div');
    wrap.appendChild(lab);
    show();

    function doneCount() {
      var n = 0;
      for (var i = 0; i < leaves.length; i++) if (done[i]) n++;
      return n;
    }
    function contains(node, animal) {
      if (node.animal) return node.animal === animal;
      return contains(node.yes, animal) || contains(node.no, animal);
    }

    function show() {
      lab.innerHTML = '';
      var target = leaves[round];
      var node = tree;
      var mistakes = 0;
      lab.appendChild(el('div', { class: 'quiz-head' }, [
        el('span', { class: 'quiz-progress', text: '🕵️ Mystery creature ' + (round + 1) + ' of ' + leaves.length + (done[round] ? ' ✅' : '') }),
        el('span', { class: 'progress-label', text: doneCount() + ' of ' + leaves.length + ' identified' })
      ]));
      var card = el('div', { class: 'question-card' });
      lab.appendChild(card);
      card.appendChild(el('p', { class: 'question-text', html: 'Use the key to identify this creature: <span id="key-target" data-animal="' + esc(target.animal) + '" style="font-size:2rem">' + target.emoji + '</span> <b>' + esc(target.animal) + '</b><br><span class="progress-label">Answer each question ABOUT the ' + esc(target.animal).toLowerCase() + ' — the key will lead you to its name!</span>' }));
      var stage = el('div');
      card.appendChild(stage);
      step();

      function step() {
        stage.innerHTML = '';
        stage.appendChild(el('div', { class: 'sort-item', html: '❓ ' + node.q }));
        var row = el('div', { class: 'bucket-row' });
        ['yes', 'no'].forEach(function (branch) {
          row.appendChild(el('button', {
            id: 'key-' + branch, class: 'bucket-btn', text: branch === 'yes' ? '✅ Yes' : '❌ No',
            onclick: function () {
              var ok = contains(node[branch], target.animal);
              if (!ok) {
                mistakes++;
                stage.appendChild(el('div', { class: 'feedback bad', html: '🔍 Look again at the ' + esc(target.animal).toLowerCase() + ' ' + target.emoji + ' — think carefully and try once more!' }));
                row.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
                setTimeout(step, 1600);
                return;
              }
              node = node[branch];
              if (node.animal) {
                var first = !done[round];
                done[round] = true;
                store.checks[key] = done;
                saveStore();
                recordResult(sub.id, les.id, Math.round(doneCount() / leaves.length * 100));
                confetti();
                var all = doneCount() === leaves.length;
                stage.innerHTML = '';
                stage.appendChild(el('div', { class: 'feedback good challenge-success' }, [
                  el('b', { text: '🎉 The key says: ' + node.emoji + ' ' + node.animal + '! ' + (mistakes === 0 ? 'Perfect detective work!' : 'You got there!') }),
                  el('div', { class: 'quiz-actions' }, [
                    el('button', {
                      id: 'next-challenge', class: 'big-btn',
                      text: all ? 'All creatures identified! Back to ' + sub.name + ' ➡️' : 'Next mystery creature ➡️',
                      onclick: function () {
                        if (all) { location.hash = '#/subject/' + sub.id; return; }
                        round = (round + 1) % leaves.length;
                        while (done[round] && doneCount() < leaves.length) round = (round + 1) % leaves.length;
                        show();
                      }
                    })
                  ])
                ]));
                void first;
              } else {
                step();
              }
            }
          }));
        });
        stage.appendChild(row);
      }
    }
  }

  /* ---------------- role-play (conversation) lab ---------------- */
  function renderRoleplay(sub, les) {
    var wrap = el('div');
    app.appendChild(wrap);
    (les.learn || []).forEach(function (card) {
      wrap.appendChild(el('div', { class: 'learn-card' }, [
        card.title ? el('h3', { text: '📖 ' + card.title }) : null,
        el('div', { html: card.html })
      ]));
    });
    var steps = les.roleplay.steps;
    var card = el('div', { class: 'question-card' });
    wrap.appendChild(card);
    var chat = el('div', { class: 'rp-chat' });
    card.appendChild(chat);
    var optsBox = el('div', { id: 'rp-options', class: 'options', style: 'margin-top:14px' });
    card.appendChild(optsBox);
    var i = 0;
    var perfect = 0;
    next();

    function bubble(side, html, sayText) {
      var b = el('div', { class: 'rp-bubble ' + side, html: html });
      if (sayText && speechOK) {
        b.appendChild(speakerBtn(sayText, 'es-ES'));
        say(sayText, 'es-ES');
      }
      chat.appendChild(b);
      chat.scrollTop = chat.scrollHeight;
    }
    function next() {
      optsBox.innerHTML = '';
      if (i >= steps.length) return finish();
      var st = steps[i];
      bubble('rp-npc', '🍦 ' + esc(st.npc) + (st.npcEn ? '<br><span class="rp-en">(' + esc(st.npcEn) + ')</span>' : ''), st.npc);
      var mistake = false;
      shuffle(st.options.map(function (t, oi) { return { t: t, ok: oi === st.answer }; })).forEach(function (o) {
        var b = el('button', { class: 'option-btn', text: o.t });
        b.addEventListener('click', function () {
          if (o.ok) {
            if (!mistake) perfect++;
            bubble('rp-me', '🧒 ' + esc(o.t), o.t);
            i++;
            next();
          } else {
            mistake = true;
            b.classList.add('wrong', 'shake');
            b.disabled = true;
            setTimeout(function () { b.classList.remove('shake'); }, 400);
            if (st.explain && !optsBox.querySelector('.feedback')) {
              optsBox.appendChild(el('div', { class: 'feedback bad', html: '💡 ' + st.explain }));
            }
          }
        });
        optsBox.appendChild(b);
      });
    }
    function finish() {
      var pct = Math.round(perfect / steps.length * 100);
      recordResult(sub.id, les.id, pct);
      if (pct >= 70) confetti();
      bubble('rp-npc', '🍦 ¡Muy bien! 👏');
      optsBox.appendChild(el('div', { class: 'feedback ' + (pct >= 50 ? 'good' : 'bad') + ' challenge-success' }, [
        el('b', { text: pct === 100 ? '🏆 ¡Perfecto! A flawless conversation, ' + childName + '!' : 'You finished the conversation — ' + perfect + ' of ' + steps.length + ' lines first try (' + pct + '%).' }),
        el('div', { class: 'quiz-actions' }, [
          el('button', { class: 'big-btn secondary', text: 'Try again 🔁', onclick: function () { renderLesson(sub, les); } }),
          el('a', { id: 'next-challenge', class: 'big-btn', style: 'text-decoration:none', href: '#/subject/' + sub.id, text: 'Back to ' + sub.name + ' ➡️' })
        ])
      ]));
    }
  }

  /* ---------------- circuit building lab ---------------- */
  var PART_DEFS = {
    battery: { l: '🔋 Battery', conducts: true },
    bulb: { l: '💡 Bulb', conducts: true },
    wire: { l: '〰️ Wire', conducts: true },
    'switch': { l: '🔘 Switch', conducts: 'toggle' },
    spoon: { l: '🥄 Plastic spoon', conducts: false },
    duck: { l: '🦆 Rubber duck', conducts: false }
  };
  function renderCircuit(sub, les) {
    var key = lessonKey(sub.id, les.id);
    var wrap = el('div');
    app.appendChild(wrap);
    (les.learn || []).forEach(function (card) {
      wrap.appendChild(el('div', { class: 'learn-card' }, [
        card.title ? el('h3', { text: '📖 ' + card.title }) : null,
        el('div', { html: card.html })
      ]));
    });
    var challenges = les.circuit.challenges;
    var done = store.checks[key] || {};
    var ci = 0;
    while (ci < challenges.length - 1 && done[ci]) ci++;
    var lab = el('div');
    wrap.appendChild(lab);
    show();

    function doneCount() {
      var n = 0;
      for (var i = 0; i < challenges.length; i++) if (done[i]) n++;
      return n;
    }

    function show() {
      lab.innerHTML = '';
      var ch = challenges[ci];
      var slots = []; // {part: name|null, closed: bool}
      for (var s = 0; s < ch.slots; s++) slots.push({ part: null, closed: false });
      var pool = ch.parts.slice(); // remaining palette part names
      var selected = null;
      var solved = false;

      lab.appendChild(el('div', { class: 'quiz-head' }, [
        el('span', { class: 'quiz-progress', text: '🔌 Circuit ' + (ci + 1) + ' of ' + challenges.length + ': ' + ch.name + (done[ci] ? ' ✅' : '') }),
        el('span', { class: 'progress-label', text: doneCount() + ' of ' + challenges.length + ' built' })
      ]));
      var card = el('div', { class: 'question-card' });
      lab.appendChild(card);
      card.appendChild(el('p', { class: 'question-text', html: '🚩 <b>Mission:</b> fill every gap in the loop so the bulb lights up!' + (ch.hint ? '<br><span class="progress-label">🌟 ' + ch.hint + '</span>' : '') }));

      var bigBulb = el('div', { class: 'big-bulb', text: '💡' });
      card.appendChild(bigBulb);
      var loop = el('div', { class: 'circuit-loop' });
      card.appendChild(loop);
      card.appendChild(el('p', { class: 'progress-label', text: 'Tap a part below, then tap a gap to place it. Tap a placed switch to flip it open/closed; tap other placed parts to take them out.' }));
      card.appendChild(el('h3', { text: '🧰 Parts box' }));
      var paletteBox = el('div', { class: 'palette' });
      card.appendChild(paletteBox);
      var msg = el('div');
      card.appendChild(msg);

      function evaluate() {
        var full = slots.every(function (s) { return s.part; });
        if (!full) return null;
        var batteries = 0, bulbs = 0, flowing = true;
        slots.forEach(function (s) {
          var def = PART_DEFS[s.part];
          if (s.part === 'battery') batteries++;
          if (s.part === 'bulb') bulbs++;
          if (def.conducts === false) flowing = false;
          if (def.conducts === 'toggle' && !s.closed) flowing = false;
        });
        if (flowing && batteries >= 1 && bulbs >= 1) return true;
        return false;
      }

      function redraw() {
        loop.innerHTML = '';
        slots.forEach(function (s, i) {
          var label = s.part ? PART_DEFS[s.part].l + (s.part === 'switch' ? (s.closed ? ' (closed ✅)' : ' (open ⛔)') : '') : '➕ gap';
          loop.appendChild(el('button', {
            class: 'slot' + (s.part ? ' filled' : '') + (s.part === 'switch' && !s.closed ? ' open-switch' : ''),
            'data-slot': i, html: label,
            onclick: function () {
              if (solved) return;
              if (!s.part && selected) {
                s.part = selected;
                s.closed = false;
                pool.splice(pool.indexOf(selected), 1);
                selected = null;
              } else if (s.part === 'switch') {
                if (s.closed) { pool.push(s.part); s.part = null; }
                else s.closed = true;
              } else if (s.part) {
                pool.push(s.part);
                s.part = null;
              }
              redraw();
            }
          }));
        });
        paletteBox.innerHTML = '';
        pool.forEach(function (p) {
          paletteBox.appendChild(el('button', {
            class: 'code-block b-part' + (selected === p && pool.indexOf(p) === pool.indexOf(selected) ? ' part-selected' : ''),
            'data-part': p, text: PART_DEFS[p].l,
            onclick: function () { if (!solved) { selected = (selected === p ? null : p); redraw(); } }
          }));
        });
        var result = evaluate();
        bigBulb.className = 'big-bulb' + (result === true ? ' lit' : '');
        msg.innerHTML = '';
        if (result === true && !solved) {
          solved = true;
          confetti();
          done[ci] = true;
          store.checks[key] = done;
          saveStore();
          recordResult(sub.id, les.id, Math.round(doneCount() / challenges.length * 100));
          var all = doneCount() === challenges.length;
          msg.appendChild(el('div', { class: 'feedback good challenge-success' }, [
            el('b', { text: '💡 IT LIGHTS UP! The circuit is complete — electricity can flow all the way round!' }),
            el('div', { class: 'quiz-actions' }, [
              el('button', {
                id: 'next-challenge', class: 'big-btn',
                text: all ? 'All circuits built! Back to ' + sub.name + ' ➡️' : 'Next circuit ➡️',
                onclick: function () {
                  if (all) { location.hash = '#/subject/' + sub.id; return; }
                  ci = (ci + 1) % challenges.length;
                  while (done[ci] && doneCount() < challenges.length) ci = (ci + 1) % challenges.length;
                  show();
                }
              })
            ])
          ]));
        } else if (result === false) {
          var reason = 'The loop is full but the bulb stays dark. ';
          var hasInsulator = slots.some(function (s) { return PART_DEFS[s.part].conducts === false; });
          var openSwitch = slots.some(function (s) { return s.part === 'switch' && !s.closed; });
          if (hasInsulator) reason += 'Something in the loop is an INSULATOR — electricity can\'t get through it!';
          else if (openSwitch) reason += 'The switch is OPEN — tap it to close the gap!';
          else if (!slots.some(function (s) { return s.part === 'battery'; })) reason += 'There\'s no battery to push the electricity!';
          else if (!slots.some(function (s) { return s.part === 'bulb'; })) reason += 'There\'s no bulb in the loop!';
          msg.appendChild(el('div', { class: 'feedback bad', html: '🔎 ' + reason }));
        }
      }
      redraw();
    }
  }

  /* ---------------- writing quests ---------------- */
  function renderWriting(sub, les) {
    var key = lessonKey(sub.id, les.id);
    var wrap = el('div');
    app.appendChild(wrap);

    (les.learn || []).forEach(function (card) {
      wrap.appendChild(el('div', { class: 'learn-card' }, [
        card.title ? el('h3', { text: '📖 ' + card.title }) : null,
        el('div', { html: card.html })
      ]));
    });

    var card = el('div', { class: 'question-card' });
    card.appendChild(el('p', { class: 'question-text', html: les.write.prompt }));
    var ta = el('textarea', { class: 'write-area', placeholder: 'Write here, ' + childName + '…' });
    ta.value = store.writings[key] || '';
    card.appendChild(ta);
    var wc = el('p', { class: 'word-count' });
    card.appendChild(wc);

    var checks = store.checks[key] || {};
    var list = el('ul', { class: 'checklist' });
    (les.write.checklist || []).forEach(function (itemText, i) {
      var cb = el('input', { type: 'checkbox' });
      cb.checked = !!checks[i];
      cb.addEventListener('change', function () {
        checks[i] = cb.checked;
        store.checks[key] = checks;
        saveStore();
        update();
      });
      list.appendChild(el('li', null, [el('label', null, [cb, el('span', { html: itemText })])]));
    });
    card.appendChild(el('h3', { text: '✅ My checklist' }));
    card.appendChild(list);

    var doneBtn = el('button', { class: 'big-btn', text: 'I finished my writing! 🎉' });
    var prog = getLessonProg(sub.id, les.id);
    if (prog && prog.completed) {
      card.appendChild(el('div', { class: 'feedback good', html: '🌟 You already finished this quest — but you can keep improving it!' }));
    }
    doneBtn.addEventListener('click', function () {
      store.writings[key] = ta.value; // flush now — don't rely on the debounced autosave
      recordResult(sub.id, les.id, 100);
      confetti();
      renderLesson(sub, les);
      window.scrollTo(0, 0);
    });
    card.appendChild(el('div', { class: 'quiz-actions' }, [doneBtn]));

    var minWords = les.write.minWords || 30;
    function countWords() {
      var t = ta.value.trim();
      return t ? t.split(/\s+/).length : 0;
    }
    function update() {
      var w = countWords();
      wc.textContent = w + ' words (aim for at least ' + minWords + ')';
      wc.className = 'word-count' + (w >= minWords ? ' met' : '');
      var allChecked = (les.write.checklist || []).every(function (_, i) { return checks[i]; });
      doneBtn.disabled = !(w >= minWords && allChecked);
    }
    var saveTimer = null;
    ta.addEventListener('blur', function () {
      store.writings[key] = ta.value;
      saveStore();
    });
    ta.addEventListener('input', function () {
      update();
      clearTimeout(saveTimer);
      saveTimer = setTimeout(function () {
        store.writings[key] = ta.value;
        saveStore();
      }, 400);
    });
    update();
    wrap.appendChild(card);
  }

  /* ---------------- planner ---------------- */
  function buildPlan() {
    // Round-robin lessons across subjects into 10 school days.
    var queues = SUBJECTS.map(function (s) {
      return s.lessons.map(function (l) { return { sub: s, les: l }; });
    });
    var ordered = [];
    var added = true;
    while (added) {
      added = false;
      queues.forEach(function (qu) {
        if (qu.length) { ordered.push(qu.shift()); added = true; }
      });
    }
    var days = [];
    var perDay = Math.ceil(ordered.length / 10);
    for (var d = 0; d < 10; d++) {
      days.push(ordered.slice(d * perDay, (d + 1) * perDay));
    }
    return days;
  }

  function renderPlanner() {
    app.innerHTML = '';
    app.appendChild(el('a', { class: 'back-link', href: '#/', text: '← Home' }));
    app.appendChild(el('h1', { text: '📅 ' + childName + '\'s Two-Week Plan' }));
    app.appendChild(el('p', { class: 'subtitle', text: 'A few quests a day keeps the brain strong! Tick them off as you go.' }));
    var days = buildPlan();
    var doneTotal = 0, total = 0;
    days.forEach(function (tasks, d) {
      var allDone = tasks.length > 0 && tasks.every(function (t) {
        var p = getLessonProg(t.sub.id, t.les.id);
        return p && p.completed;
      });
      var card = el('div', { class: 'day-card' });
      card.appendChild(el('h3', { text: (allDone ? '🏆 ' : '🗓️ ') + 'Day ' + (d + 1) + (d === 4 || d === 9 ? '  (end of week ' + (d === 4 ? 1 : 2) + '!)' : '') }));
      tasks.forEach(function (t) {
        total++;
        var p = getLessonProg(t.sub.id, t.les.id);
        var isDone = p && p.completed;
        if (isDone) doneTotal++;
        card.appendChild(el('a', {
          class: 'day-task' + (isDone ? ' done' : ''),
          href: '#/lesson/' + t.sub.id + '/' + t.les.id
        }, [
          el('span', { class: 'tick', text: isDone ? '✅' : '⬜' }),
          el('span', { text: t.sub.icon + ' ' + t.sub.name + ': ' + t.les.title }),
          el('span', { class: 'stars', style: 'margin-left:auto', text: p ? starString(p.stars) : '' })
        ]));
      });
      app.appendChild(card);
    });
    var pct = total ? Math.round(doneTotal / total * 100) : 0;
    app.insertBefore(el('div', { class: 'panel' }, [
      el('div', { class: 'progress-bar' }, [el('div', { style: 'width:' + pct + '%' })]),
      el('p', { class: 'progress-label', text: doneTotal + ' of ' + total + ' quests finished (' + pct + '%)' })
    ]), app.children[3]);
  }

  /* ---------------- awards ---------------- */
  function renderAwards() {
    app.innerHTML = '';
    app.appendChild(el('a', { class: 'back-link', href: '#/', text: '← Home' }));
    app.appendChild(el('h1', { text: '🏆 ' + childName + '\'s Trophy Cabinet' }));

    var totalStars = 0, done = 0, total = 0, subjectsDone = 0;
    SUBJECTS.forEach(function (s) {
      var sDone = 0;
      s.lessons.forEach(function (l) {
        total++;
        var p = getLessonProg(s.id, l.id);
        if (p) totalStars += p.stars;
        if (p && p.completed) { done++; sDone++; }
      });
      if (sDone === s.lessons.length && s.lessons.length) subjectsDone++;
    });

    var awards = [
      { icon: '🐣', name: 'First Steps', desc: 'Finish your first quest', got: done >= 1 },
      { icon: '⚔️', name: 'Young Viking', desc: 'Finish 5 quests', got: done >= 5 },
      { icon: '🛡️', name: 'Shield Bearer', desc: 'Finish 10 quests', got: done >= 10 },
      { icon: '🚢', name: 'Longship Captain', desc: 'Finish 20 quests', got: done >= 20 },
      { icon: '👑', name: 'Viking Chief', desc: 'Finish every quest!', got: done >= total && total > 0 },
      { icon: '⭐', name: 'Star Catcher', desc: 'Earn 15 stars', got: totalStars >= 15 },
      { icon: '🌟', name: 'Star Hoard', desc: 'Earn 50 stars', got: totalStars >= 50 },
      { icon: '🔥', name: 'On Fire!', desc: '3-day streak', got: streak() >= 3 },
      { icon: '🌋', name: 'Unstoppable', desc: '7-day streak', got: streak() >= 7 },
      { icon: '🗺️', name: 'Explorer', desc: 'Complete a whole subject', got: subjectsDone >= 1 },
      { icon: '🦉', name: 'Wise Owl', desc: 'Complete 4 whole subjects', got: subjectsDone >= 4 },
      { icon: '🏅', name: 'Point Hoarder', desc: 'Collect 500 points', got: store.points >= 500 }
    ];
    var got = awards.filter(function (a) { return a.got; }).length;
    app.appendChild(el('p', { class: 'subtitle', text: 'You have unlocked ' + got + ' of ' + awards.length + ' trophies. Keep questing!' }));
    var grid = el('div', { class: 'award-grid' });
    awards.forEach(function (a) {
      grid.appendChild(el('div', { class: 'award' + (a.got ? '' : ' locked') }, [
        el('div', { class: 'icon', text: a.icon }),
        el('b', { text: a.name }),
        el('p', { text: a.desc })
      ]));
    });
    app.appendChild(grid);
  }

  /* ---------------- grown-ups ---------------- */
  function renderGrownups() {
    app.innerHTML = '';
    app.appendChild(el('a', { class: 'back-link', href: '#/', text: '← Home' }));
    app.appendChild(el('h1', { text: '👪 Grown-ups\' corner' }));

    // recent activity
    var act = el('div', { class: 'panel' });
    act.appendChild(el('h2', { text: '📊 Recent activity' }));
    if (!store.log.length) {
      act.appendChild(el('p', { text: 'No quests played yet.' }));
    } else {
      var byDay = {};
      store.log.forEach(function (e) { (byDay[e.d] = byDay[e.d] || []).push(e); });
      Object.keys(byDay).sort().reverse().slice(0, 14).forEach(function (d) {
        var entries = byDay[d];
        var avg = Math.round(entries.reduce(function (a, e) { return a + e.s; }, 0) / entries.length);
        act.appendChild(el('p', { html: '<b>' + d + '</b> — ' + entries.length + ' quest attempt' + (entries.length > 1 ? 's' : '') + ', average score ' + avg + '%' }));
      });
    }
    app.appendChild(act);

    // breakdown by subject & topic — what they got right and wrong, and where
    var bd = el('div', { class: 'panel' });
    bd.appendChild(el('h2', { text: '🎯 Breakdown by subject & topic' }));
    bd.appendChild(el('p', { class: 'progress-label', text: 'Tap a subject to open it. Each topic shows the best score so far and the exact questions ' + childName + ' got wrong on their last go. Topics in red are below 70% — worth another try.' }));
    var anyPlayed = false;
    SUBJECTS.forEach(function (s) {
      var played = s.lessons.filter(function (l) { return store.lessons[lessonKey(s.id, l.id)]; });
      if (!played.length) return;
      anyPlayed = true;
      var bests = played.map(function (l) { return store.lessons[lessonKey(s.id, l.id)].best || 0; });
      var avgBest = Math.round(bests.reduce(function (a, b) { return a + b; }, 0) / bests.length);
      var needs = played.filter(function (l) { return (store.lessons[lessonKey(s.id, l.id)].best || 0) < 70; }).length;

      var subWrap = el('details', { class: 'gb-subject' });
      subWrap.appendChild(el('summary', {
        html: s.icon + ' <b>' + esc(s.name) + '</b> — ' + played.length + ' topic' + (played.length > 1 ? 's' : '') +
          ' tried · avg best ' + avgBest + '%' + (needs ? ' · <span class="gb-flag">' + needs + ' to practise</span>' : '')
      }));
      played.forEach(function (l) {
        var rec = store.lessons[lessonKey(s.id, l.id)];
        var weak = (rec.best || 0) < 70;
        var row = el('div', { class: 'gb-topic' + (weak ? ' weak' : '') });
        row.appendChild(el('div', {
          class: 'gb-topic-head',
          html: (l.emoji || '📘') + ' <b>' + esc(l.title) + '</b> — best ' + (rec.best || 0) + '% ' + starString(rec.stars || 0) +
            (rec.lastTotal ? ' · last go ' + (rec.lastCorrect || 0) + '/' + rec.lastTotal : '')
        }));
        if (rec.lastWrong && rec.lastWrong.length) {
          row.appendChild(el('div', { class: 'gb-wrong-label', text: 'Got these wrong last time:' }));
          var ul = el('ul', { class: 'gb-wrong' });
          rec.lastWrong.forEach(function (w) { ul.appendChild(el('li', { text: w })); });
          row.appendChild(ul);
        } else if (rec.lastTotal) {
          row.appendChild(el('p', { class: 'gb-allright', text: '✅ All correct on the last go!' }));
        }
        subWrap.appendChild(row);
      });
      bd.appendChild(subWrap);
    });
    if (!anyPlayed) bd.appendChild(el('p', { text: 'Once ' + childName + ' plays some quizzes, a topic-by-topic breakdown will appear here.' }));
    app.appendChild(bd);

    // writings
    var writes = el('div', { class: 'panel' });
    writes.appendChild(el('h2', { text: '✍️ ' + childName + '\'s writing' }));
    var anyWriting = false;
    SUBJECTS.forEach(function (s) {
      s.lessons.forEach(function (l) {
        var w = store.writings[lessonKey(s.id, l.id)];
        if (w && w.trim()) {
          anyWriting = true;
          writes.appendChild(el('h3', { text: s.icon + ' ' + l.title }));
          writes.appendChild(el('p', { style: 'white-space:pre-wrap;background:#f8f9fa;padding:12px;border-radius:10px', text: w }));
        }
      });
    });
    if (!anyWriting) writes.appendChild(el('p', { text: 'Writing quests will show up here once ' + childName + ' starts them.' }));
    app.appendChild(writes);

    // sound check
    var snd = el('div', { class: 'panel' });
    snd.appendChild(el('h2', { text: '🔊 Sound check (for Spanish pronunciation)' }));
    snd.appendChild(el('p', { html: 'Two tests: the <b>beep</b> uses normal media sound; the <b>voice</b> uses the speech engine. On iPhones/iPads the speech engine follows the <b>ringer volume and silent switch</b>, while the beep ignores them — so if you hear the beep but not the voice, flip the silent switch OFF and press the volume-up button.' }));
    var sndStatus = el('p', { style: 'font-family:monospace;font-size:0.85rem;white-space:pre-wrap;background:#f8f9fa;padding:10px;border-radius:10px', text: 'Press a test button to see results here.' });
    function speechReport() {
      if (!('speechSynthesis' in window)) return 'Speech support: NO — this browser cannot speak.';
      var synth = window.speechSynthesis;
      var vs = [];
      try { vs = synth.getVoices() || []; } catch (e) {}
      var es = vs.filter(function (v) { return (v.lang || '').toLowerCase().indexOf('es') === 0; });
      return 'Speech support: yes\nVoices loaded: ' + vs.length + ' (Spanish: ' + es.length +
        (es.length ? ' — ' + es.slice(0, 3).map(function (v) { return v.name; }).join(', ') : '') + ')\n' +
        'Engine state: ' + (synth.paused ? 'PAUSED' : synth.speaking ? 'speaking' : 'idle');
    }
    function beepDataUri() {
      var rate = 8000, n = Math.floor(rate * 0.6);
      var buf = new Uint8Array(44 + n);
      function w(o, s) { for (var i = 0; i < s.length; i++) buf[o + i] = s.charCodeAt(i); }
      function u32(o, v) { buf[o] = v & 255; buf[o + 1] = (v >> 8) & 255; buf[o + 2] = (v >> 16) & 255; buf[o + 3] = (v >> 24) & 255; }
      function u16(o, v) { buf[o] = v & 255; buf[o + 1] = (v >> 8) & 255; }
      w(0, 'RIFF'); u32(4, 36 + n); w(8, 'WAVEfmt '); u32(16, 16); u16(20, 1); u16(22, 1);
      u32(24, rate); u32(28, rate); u16(32, 1); u16(34, 8); w(36, 'data'); u32(40, n);
      for (var i = 0; i < n; i++) buf[44 + i] = 128 + Math.round(100 * Math.sin(2 * Math.PI * 440 * i / rate) * Math.min(1, (n - i) / n));
      var bin = '';
      for (var j = 0; j < buf.length; j++) bin += String.fromCharCode(buf[j]);
      return 'data:audio/wav;base64,' + btoa(bin);
    }
    snd.appendChild(el('div', { class: 'quiz-actions' }, [
      el('button', { class: 'big-btn secondary', text: '🎵 Play test beep', onclick: function () {
        try {
          var a = new Audio(beepDataUri());
          a.play().then(function () {
            sndStatus.textContent = speechReport() + '\nBeep: playing — did you hear it?';
          }).catch(function (e) {
            sndStatus.textContent = speechReport() + '\nBeep failed to play: ' + e;
          });
        } catch (e) { sndStatus.textContent = speechReport() + '\nBeep threw: ' + e.message; }
      } }),
      el('button', { class: 'big-btn', text: '🔊 Speak test (Spanish)', onclick: function () {
        if (!('speechSynthesis' in window)) { sndStatus.textContent = speechReport(); return; }
        try {
          var synth = window.speechSynthesis;
          var u = new SpeechSynthesisUtterance('¡Hola! Me gusta el helado de chocolate.');
          u.lang = 'es-ES'; u.volume = 1; u.rate = 0.85;
          window.__keepUtterance = u;
          var evs = ['requested'];
          function upd() { sndStatus.textContent = speechReport() + '\nSpeak test: ' + evs.join(' → '); }
          u.onstart = function () { evs.push('started'); upd(); };
          u.onend = function () { evs.push('finished. If you heard nothing, the device muted it — check the silent switch and press volume-up.'); upd(); };
          u.onerror = function (e) { evs.push('ERROR: ' + (e.error || 'unknown')); upd(); };
          synth.resume();
          synth.speak(u);
          upd();
        } catch (e) { sndStatus.textContent = speechReport() + '\nSpeak test threw: ' + e.message; }
      } })
    ]));
    snd.appendChild(sndStatus);
    app.appendChild(snd);

    // backup
    var backup = el('div', { class: 'panel' });
    backup.appendChild(el('h2', { text: '💾 Save & restore progress' }));
    backup.appendChild(el('p', { text: 'Progress is saved automatically in this browser. To move it to another device (or keep a backup), copy the code below and paste it on the other device, then press Restore.' }));
    var ta = el('textarea');
    ta.value = JSON.stringify(store);
    backup.appendChild(ta);
    backup.appendChild(el('div', { class: 'quiz-actions' }, [
      el('button', { class: 'big-btn secondary', text: 'Copy backup code', onclick: function () {
        ta.select();
        try { navigator.clipboard.writeText(ta.value); } catch (e) { document.execCommand('copy'); }
        alert('Backup code copied! Save it somewhere safe (email it to yourself).');
      } }),
      el('button', { class: 'big-btn', text: 'Restore from code', onclick: function () {
        try {
          var s = JSON.parse(ta.value);
          if (!s || typeof s !== 'object' || !s.lessons) throw new Error('bad');
          store = Object.assign(defaultStore(), s);
          saveStore();
          alert('Progress restored!');
          route();
        } catch (e) { alert('That code does not look right — paste the whole backup code and try again.'); }
      } })
    ]));
    app.appendChild(backup);

    // year/class manager
    var yearMgr = el('div', { class: 'panel' });
    yearMgr.appendChild(el('h2', { text: '📅 Change Year or Class' }));
    yearMgr.appendChild(el('p', { html: 'Current year: <b>' + selectedYear.toUpperCase() + '</b>' }));
    var yearGrid = el('div', { style: 'display:grid; grid-template-columns:repeat(auto-fill, minmax(80px, 1fr)); gap:8px; margin-top:12px;' });
    YEARS.forEach(function (year) {
      var isActive = year === selectedYear;
      yearGrid.appendChild(el('button', {
        text: year.toUpperCase(),
        style: 'padding:10px 8px; font-weight:' + (isActive ? 'bold' : 'normal') + '; background:' + (isActive ? 'var(--good)' : 'var(--accent)') + '; color:#fff; border:none; border-radius:8px; cursor:pointer;',
        onclick: function () {
          if (year !== selectedYear) {
            selectedYear = year;
            localStorage.setItem(YEAR_KEY, year);
            loadSubjectsForYear(year).then(function () {
              store = loadStore();
              updatePageText();
              renderGrownups();
            });
          }
        }
      }));
    });
    yearMgr.appendChild(yearGrid);
    app.appendChild(yearMgr);

    // reset
    var danger = el('div', { class: 'panel' });
    danger.appendChild(el('h2', { text: '🧨 Start again' }));
    danger.appendChild(el('button', { class: 'danger', text: 'Reset ALL progress', onclick: function () {
      if (confirm('Really delete all of ' + childName + '\'s progress, stars and writing? This cannot be undone.') &&
          confirm('Are you absolutely sure?')) {
        store = defaultStore();
        saveStore();
        localStorage.removeItem(CHILD_NAME_KEY);
        localStorage.removeItem(YEAR_KEY);
        alert('All progress has been reset. Please refresh the page.');
        location.reload();
      }
    } }));
    app.appendChild(danger);
  }

  /* ---------------- boot ----------------
     Must stay at the very end: top-level `var` initialisers above (e.g. `var store = null`)
     would otherwise run after boot and wipe state, breaking navigation until refresh. */
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initializeAndRoute);
  } else {
    initializeAndRoute();
  }
})();

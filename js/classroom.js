// Greater Light Global Consult & Academy (GLGC) - Classroom Engine
// Lead Instructor & Director: Engr. Ajibade Opeyemi Phillip

let currentCourse = null;
let currentLessonIndex = 0;
let currentModuleIndex = 0;
let completedLessons = new Set();
let isPlaying = false;
let currentTime = 142; // simulated seconds
let videoDuration = 1840; // 30 mins 40 secs
let playbackTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  loadCourseData();
  initClassroomTabs();
  initVideoControls();
  initQuiz();
  initDiscussion();
});

function loadCourseData() {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('id') || 'fmath-02';
  const courses = getStoredCourses();
  
  currentCourse = courses.find(c => c.id === courseId) || courses[0];

  document.getElementById('navCourseTitle').innerText = currentCourse.title;
  document.getElementById('activeLessonTitle').innerText = currentCourse.syllabus[0].lessons[0].title;
  document.getElementById('lessonInstructor').innerText = `Taught by ${currentCourse.instructor} (${currentCourse.instructorRole})`;

  // Render Syllabus Drawer
  renderSyllabusDrawer();
  updateProgressDisplay();
  renderLessonNotes();
}

function renderSyllabusDrawer() {
  const container = document.getElementById('drawerModulesContainer');
  if (!container || !currentCourse) return;

  container.innerHTML = currentCourse.syllabus.map((mod, mIdx) => {
    return `
      <div class="drawer-module-group">
        <div class="module-group-title">
          <span>${mod.module}</span>
          <span style="font-size: 0.72rem; color: var(--accent-cyan);">${mod.duration}</span>
        </div>
        <ul class="lesson-list-items">
          ${mod.lessons.map((lesson, lIdx) => {
            const lessonKey = `${mIdx}-${lIdx}`;
            const isCompleted = completedLessons.has(lessonKey);
            const isActive = (mIdx === currentModuleIndex && lIdx === currentLessonIndex);
            
            return `
              <li class="lesson-item ${isActive ? 'active' : ''}" onclick="selectLesson(${mIdx}, ${lIdx})">
                <span class="lesson-check-icon">
                  ${isCompleted ? 
                    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>` : 
                    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><circle cx="12" cy="12" r="9"></circle></svg>`
                  }
                </span>
                <span style="flex: 1;">${lesson.title}</span>
                <span style="font-size: 0.72rem; color: var(--text-dim);">${lesson.duration}</span>
              </li>
            `;
          }).join('')}
        </ul>
      </div>
    `;
  }).join('');
}

function selectLesson(mIdx, lIdx) {
  currentModuleIndex = mIdx;
  currentLessonIndex = lIdx;
  const lesson = currentCourse.syllabus[mIdx].lessons[lIdx];
  document.getElementById('activeLessonTitle').innerText = lesson.title;
  
  // Reset video player time
  currentTime = 0;
  updateVideoTimeDisplay();
  
  renderSyllabusDrawer();
  renderLessonNotes();
  initQuiz();
  showToast(`Switched to: ${lesson.title}`, 'info');
}

function markCurrentLessonCompleted() {
  const lessonKey = `${currentModuleIndex}-${currentLessonIndex}`;
  completedLessons.add(lessonKey);
  renderSyllabusDrawer();
  updateProgressDisplay();
  showToast('Lesson marked as completed! Progress saved.', 'success', 'Great Job!');
}

function updateProgressDisplay() {
  let totalLessons = 0;
  currentCourse.syllabus.forEach(mod => {
    totalLessons += mod.lessons.length;
  });

  const completedCount = completedLessons.size;
  const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const bar = document.getElementById('drawerProgressBar');
  const pctLabel = document.getElementById('drawerProgressPct');
  const countLabel = document.getElementById('drawerProgressCount');
  const navPill = document.getElementById('navProgressPill');

  if (bar) bar.style.width = `${Math.max(pct, 5)}%`;
  if (pctLabel) pctLabel.innerText = `${pct}% Complete`;
  if (countLabel) countLabel.innerText = `${completedCount}/${totalLessons} Completed`;
  if (navPill) navPill.innerText = `${pct}% Progress`;
}

// Classroom Tabs
function initClassroomTabs() {
  const tabs = document.querySelectorAll('.c-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.c-tab-pane').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const pane = document.getElementById(targetId);
      if (pane) pane.classList.add('active');
    });
  });
}

// Video Controls Simulator
function initVideoControls() {
  const playBtn = document.getElementById('centralPlayBtn');
  const miniPlayBtn = document.getElementById('miniPlayBtn');
  const scrubBar = document.getElementById('scrubBar');

  if (playBtn) playBtn.addEventListener('click', togglePlayVideo);
  if (miniPlayBtn) miniPlayBtn.addEventListener('click', togglePlayVideo);

  if (scrubBar) {
    scrubBar.addEventListener('click', (e) => {
      const rect = scrubBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = clickX / rect.width;
      currentTime = Math.round(pct * videoDuration);
      updateVideoTimeDisplay();
    });
  }

  const speedSelect = document.getElementById('playbackSpeed');
  if (speedSelect) {
    speedSelect.addEventListener('change', (e) => {
      showToast(`Playback speed set to ${e.target.value}x`, 'info');
    });
  }
}

function togglePlayVideo() {
  isPlaying = !isPlaying;
  const playBtn = document.getElementById('centralPlayBtn');
  const miniPlayBtn = document.getElementById('miniPlayBtn');

  if (isPlaying) {
    if (playBtn) playBtn.style.opacity = '0';
    if (miniPlayBtn) miniPlayBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
    
    playbackTimer = setInterval(() => {
      if (currentTime < videoDuration) {
        currentTime++;
        updateVideoTimeDisplay();
      } else {
        togglePlayVideo();
        markCurrentLessonCompleted();
      }
    }, 1000);
  } else {
    if (playBtn) playBtn.style.opacity = '1';
    if (miniPlayBtn) miniPlayBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    clearInterval(playbackTimer);
  }
}

function updateVideoTimeDisplay() {
  const curMins = Math.floor(currentTime / 60);
  const curSecs = currentTime % 60;
  const durMins = Math.floor(videoDuration / 60);
  const durSecs = videoDuration % 60;

  const fmt = (n) => (n < 10 ? '0' + n : n);
  const display = `${fmt(curMins)}:${fmt(curSecs)} / ${fmt(durMins)}:${fmt(durSecs)}`;

  const timeEl = document.getElementById('videoTimeDisplay');
  if (timeEl) timeEl.innerText = display;

  const fillEl = document.getElementById('videoProgressFill');
  if (fillEl) {
    const pct = (currentTime / videoDuration) * 100;
    fillEl.style.width = `${pct}%`;
  }
}

// Lesson Notes Content
function renderLessonNotes() {
  const notesContainer = document.getElementById('notesContentArea');
  if (!notesContainer || !currentCourse) return;

  const currentMod = currentCourse.syllabus[currentModuleIndex];
  const currentLes = currentMod.lessons[currentLessonIndex];

  notesContainer.innerHTML = `
    <h3 style="font-size: 1.3rem; margin-bottom: 12px; color: #ffffff;">Lecture Outline: ${currentLes.title}</h3>
    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">
      In this lecture, Engr. Ajibade breaks down the fundamental engineering and mathematical principles underlying this topic, with special emphasis on speed problem-solving and elimination of exam traps.
    </p>

    <div class="formula-highlight-box">
      <strong>Key Theorem / Principle:</strong><br>
      d/dx [f(x) · g(x)] = f'(x)g(x) + f(x)g'(x) &nbsp;|&nbsp; ∫ u dv = uv - ∫ v du<br>
      Standardized Speed Tip: Always isolate non-variable terms before applying substitution.
    </div>

    <h4 style="font-size: 1rem; color: #cbd5e1; margin: 18px 0 8px;">Key Takeaways & Core Concepts:</h4>
    <ul style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.7; padding-left: 20px;">
      <li>Identify boundary conditions immediately from the problem statement.</li>
      <li>For multiple-choice exam questions (SAT / GRE / WASSCE), test edge cases (x = 0, x = 1, or asymptotes) to eliminate false choices in under 15 seconds.</li>
      <li>Maintain structural dimensional consistency across all units.</li>
    </ul>
  `;
}

// Interactive Quiz
function initQuiz() {
  const container = document.getElementById('quizContentArea');
  if (!container || !currentCourse || !currentCourse.quiz) return;

  const q = currentCourse.quiz[0]; // Active question

  container.innerHTML = `
    <div class="quiz-question-text">${q.question}</div>
    <div class="quiz-options-list">
      ${q.options.map((opt, idx) => `
        <button class="quiz-opt-btn" onclick="checkAnswer(${idx}, ${q.correct})">
          <span style="font-weight: 700; color: var(--accent-cyan); width: 22px;">${String.fromCharCode(65 + idx)}.</span>
          <span>${opt}</span>
        </button>
      `).join('')}
    </div>
    <div id="quizFeedbackBox" class="quiz-feedback">
      <strong>Explanation:</strong> ${q.explanation}
    </div>
  `;
}

function checkAnswer(selectedIdx, correctIdx) {
  const buttons = document.querySelectorAll('.quiz-opt-btn');
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIdx) {
      btn.classList.add('correct');
    } else if (idx === selectedIdx) {
      btn.classList.add('wrong');
    }
  });

  const feedbackBox = document.getElementById('quizFeedbackBox');
  if (feedbackBox) {
    feedbackBox.style.display = 'block';
  }

  if (selectedIdx === correctIdx) {
    showToast('Correct! Outstanding work!', 'success', 'Knowledge Verified');
    markCurrentLessonCompleted();
  } else {
    showToast('Not quite. Review the explanation below.', 'warning', 'Try Again');
  }
}

// Download Resource Simulator
function downloadResource(filename) {
  showToast(`Downloading official GLGC resource: ${filename}...`, 'success', 'Download Started');
}

// Discussion Board Simulator
function initDiscussion() {
  const form = document.getElementById('questionForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('questionInput');
      const text = input.value.trim();
      if (!text) return;

      const list = document.getElementById('discussionList');
      const newPost = document.createElement('div');
      newPost.style.cssText = 'background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 18px; margin-bottom: 14px;';
      newPost.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <strong style="color: #fff; font-size: 0.9rem;">You (Student)</strong>
          <small style="color: var(--text-dim); font-size: 0.75rem;">Just now</small>
        </div>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 12px;">${text}</p>
        <div style="background: rgba(79, 70, 229, 0.1); border-left: 3px solid var(--primary-glow); padding: 10px 14px; border-radius: 4px; font-size: 0.85rem; color: #a5b4fc;">
          <strong style="display: block; color: #fff;">Instructor Response (Engr. Ajibade):</strong>
          Excellent inquiry! Notice that by substituting into the left-hand identity first, the cross terms simplify naturally. Check page 4 of the formula guide.
        </div>
      `;
      list.prepend(newPost);
      input.value = '';
      showToast('Question posted! Engr. Ajibade answered your question.', 'info');
    });
  }
}

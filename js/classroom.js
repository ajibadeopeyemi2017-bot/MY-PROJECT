// Greater Light Global Consult & Academy (GLGC) - Comprehensive Classroom Engine
// Lead Instructor & Academic Director: Engr. Ajibade Opeyemi Phillip

let currentCourse = null;
let currentLessonIndex = 0;
let currentModuleIndex = 0;
let completedLessons = new Set();
let isPlaying = false;
let isMuted = false;
let currentTime = 0;
let videoDuration = 1840; // 30 mins 40 secs
let playbackTimer = null;
let visualizerAnimationId = null;

// Quiz State
let currentQuizIndex = 0;
let quizAnswersState = {}; // { questionIdx: { selectedIdx, isCorrect } }

document.addEventListener('DOMContentLoaded', () => {
  loadCourseData();
  populateCourseSelector();
  initClassroomTabs();
  initVideoControls();
  initVisualizerCanvas();
  initDiscussion();
});

// ==========================================================================
// Course Data & Selector Loader
// ==========================================================================
function loadCourseData() {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('id') || 'fmath-02';
  const courses = getStoredCourses();
  
  currentCourse = courses.find(c => c.id === courseId) || courses[0];

  // Load saved progress for this course
  loadCourseProgress();

  // Reset lesson pointer
  currentModuleIndex = 0;
  currentLessonIndex = 0;
  currentTime = 0;
  isPlaying = false;
  if (playbackTimer) clearInterval(playbackTimer);

  // Update header titles & metadata
  const navTitle = document.getElementById('navCourseTitle');
  if (navTitle) navTitle.innerText = currentCourse.title;

  const currentMod = currentCourse.syllabus[0] || { module: 'Module 1', lessons: [{ title: 'Lesson 1' }] };
  const currentLes = currentMod.lessons[0] || { title: 'Introductory Lecture' };

  const lessonTitleEl = document.getElementById('activeLessonTitle');
  if (lessonTitleEl) lessonTitleEl.innerText = currentLes.title;

  const instEl = document.getElementById('lessonInstructor');
  if (instEl) instEl.innerText = `Taught by ${currentCourse.instructor} (${currentCourse.instructorRole || 'Lead Faculty'})`;

  // Update Poster image if available
  const posterEl = document.getElementById('videoPoster');
  if (posterEl && currentCourse.thumbnail) {
    posterEl.style.backgroundImage = `url('${currentCourse.thumbnail}')`;
  }

  // Header resource button text
  const headerResText = document.getElementById('headerResourceBtnText');
  if (headerResText) {
    headerResText.innerText = `${currentCourse.subject} Study Deck`;
  }

  // Render components
  renderSyllabusDrawer();
  updateProgressDisplay();
  renderLessonNotes();
  initQuiz();
  renderResources();
  renderDiscussions();
  updateAdjacentButtons();
  updateVideoTimeDisplay();
}

function populateCourseSelector() {
  const selector = document.getElementById('courseSelector');
  if (!selector) return;

  const courses = getStoredCourses();
  selector.innerHTML = courses.map(c => `
    <option value="${c.id}" ${c.id === currentCourse.id ? 'selected' : ''}>
      ${c.title.length > 36 ? c.title.substring(0, 36) + '...' : c.title} (${c.subject})
    </option>
  `).join('');
}

function switchCourseFromSelect(newCourseId) {
  if (newCourseId === currentCourse.id) return;
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set('id', newCourseId);
  window.history.pushState({}, '', newUrl);

  loadCourseData();
  populateCourseSelector();
  showToast(`Switched course: ${currentCourse.title}`, 'info');
}

// Progress persistence
function loadCourseProgress() {
  completedLessons.clear();
  const saved = localStorage.getItem(`glgc_progress_${currentCourse.id}`);
  if (saved) {
    try {
      const arr = JSON.parse(saved);
      arr.forEach(k => completedLessons.add(k));
    } catch(e) {
      console.error(e);
    }
  }
}

function saveCourseProgress() {
  const arr = Array.from(completedLessons);
  localStorage.setItem(`glgc_progress_${currentCourse.id}`, JSON.stringify(arr));
}

// ==========================================================================
// Syllabus Drawer & Navigation
// ==========================================================================
function renderSyllabusDrawer() {
  const container = document.getElementById('drawerModulesContainer');
  if (!container || !currentCourse) return;

  container.innerHTML = currentCourse.syllabus.map((mod, mIdx) => {
    return `
      <div class="drawer-module-group">
        <div class="module-group-title">
          <span>${mod.module}</span>
          <span style="font-size: 0.72rem; color: var(--accent-cyan); font-weight: 700;">${mod.duration}</span>
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
  
  const titleEl = document.getElementById('activeLessonTitle');
  if (titleEl) titleEl.innerText = lesson.title;
  
  // Reset video playback time
  currentTime = 0;
  updateVideoTimeDisplay();
  
  renderSyllabusDrawer();
  renderLessonNotes();
  updateAdjacentButtons();
  showToast(`Active Lesson: ${lesson.title}`, 'info');
}

function goToAdjacentLesson(direction) {
  const currentMod = currentCourse.syllabus[currentModuleIndex];
  let nextModIdx = currentModuleIndex;
  let nextLesIdx = currentLessonIndex + direction;

  if (nextLesIdx >= currentMod.lessons.length) {
    if (nextModIdx + 1 < currentCourse.syllabus.length) {
      nextModIdx++;
      nextLesIdx = 0;
    } else {
      showToast('You have reached the final lesson of this course!', 'success', 'Course Complete!');
      return;
    }
  } else if (nextLesIdx < 0) {
    if (nextModIdx - 1 >= 0) {
      nextModIdx--;
      nextLesIdx = currentCourse.syllabus[nextModIdx].lessons.length - 1;
    } else {
      showToast('You are on the first lesson.', 'info');
      return;
    }
  }

  selectLesson(nextModIdx, nextLesIdx);
}

function updateAdjacentButtons() {
  const prevBtn = document.getElementById('prevLessonBtn');
  const nextBtn = document.getElementById('nextLessonBtn');

  if (prevBtn) {
    prevBtn.disabled = (currentModuleIndex === 0 && currentLessonIndex === 0);
  }
  if (nextBtn) {
    const isLastModule = currentModuleIndex === currentCourse.syllabus.length - 1;
    const isLastLesson = currentLessonIndex === currentCourse.syllabus[currentModuleIndex].lessons.length - 1;
    nextBtn.disabled = (isLastModule && isLastLesson);
  }
}

function markCurrentLessonCompleted() {
  const lessonKey = `${currentModuleIndex}-${currentLessonIndex}`;
  completedLessons.add(lessonKey);
  saveCourseProgress();
  renderSyllabusDrawer();
  updateProgressDisplay();
  showToast('Lesson marked as completed! Progress recorded.', 'success', 'Milestone Reached');
}

function updateProgressDisplay() {
  let totalLessons = 0;
  if (currentCourse && currentCourse.syllabus) {
    currentCourse.syllabus.forEach(mod => {
      totalLessons += mod.lessons.length;
    });
  }

  const completedCount = completedLessons.size;
  const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const bar = document.getElementById('drawerProgressBar');
  const pctLabel = document.getElementById('drawerProgressPct');
  const countLabel = document.getElementById('drawerProgressCount');
  const navPill = document.getElementById('navProgressPill');
  const certClaimBtn = document.getElementById('claimCertBtn');

  if (bar) bar.style.width = `${Math.max(pct, 5)}%`;
  if (pctLabel) pctLabel.innerText = `${pct}% Complete`;
  if (countLabel) countLabel.innerText = `${completedCount}/${totalLessons} Completed`;
  if (navPill) navPill.innerText = `${pct}% Progress`;

  if (certClaimBtn) {
    if (pct === 100) {
      certClaimBtn.classList.add('ready');
      certClaimBtn.innerText = '★ Claim Verified Certificate!';
    } else {
      certClaimBtn.classList.remove('ready');
      certClaimBtn.innerText = `🎓 Claim Certificate (${pct}%)`;
    }
  }
}

// ==========================================================================
// Classroom Tabs
// ==========================================================================
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

// ==========================================================================
// Interactive Video Controls & Visualizer Canvas
// ==========================================================================
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
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
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
  const poster = document.getElementById('videoPoster');

  if (isPlaying) {
    if (playBtn) playBtn.style.opacity = '0';
    if (poster) poster.style.opacity = '0.35';
    if (miniPlayBtn) {
      miniPlayBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
    }
    
    playbackTimer = setInterval(() => {
      if (currentTime < videoDuration) {
        currentTime++;
        updateVideoTimeDisplay();
      } else {
        togglePlayVideo();
        markCurrentLessonCompleted();

        // Autoplay next lesson check
        const autoNext = document.getElementById('autoNextToggle');
        if (autoNext && autoNext.checked) {
          showToast('Lesson ended. Autoplaying next lesson in 3 seconds...', 'info');
          setTimeout(() => {
            goToAdjacentLesson(1);
            togglePlayVideo();
          }, 3000);
        }
      }
    }, 1000);
  } else {
    if (playBtn) playBtn.style.opacity = '1';
    if (poster) poster.style.opacity = '1';
    if (miniPlayBtn) {
      miniPlayBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    }
    clearInterval(playbackTimer);
  }
}

function toggleMute() {
  isMuted = !isMuted;
  const volumeBtn = document.getElementById('volumeBtn');
  if (volumeBtn) {
    if (isMuted) {
      volumeBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
      showToast('Audio Muted', 'info');
    } else {
      volumeBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
      showToast('Audio Unmuted (Volume 100%)', 'info');
    }
  }
}

function toggleFullscreen() {
  const container = document.getElementById('videoContainer');
  if (!container) return;

  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(err => {
      showToast(`Fullscreen request error: ${err.message}`, 'warning');
    });
  } else {
    document.exitFullscreen();
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

// Canvas Waveform / Audio-Visual Simulation
function initVisualizerCanvas() {
  const canvas = document.getElementById('videoVisualizerCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth || 800;
    canvas.height = canvas.parentElement.clientHeight || 450;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let step = 0;
  function renderWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isPlaying) {
      step += 0.04;
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height * 0.78;

      // Draw primary glowing sine wave
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 12;

      for (let x = 0; x < width; x += 4) {
        const y = centerY + Math.sin(x * 0.015 + step) * 18 * Math.cos(step * 0.5) + Math.sin(x * 0.03 - step) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary frequency harmonic
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.45)';
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 8;

      for (let x = 0; x < width; x += 5) {
        const y = centerY + Math.cos(x * 0.02 + step * 1.2) * 14;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Audio bars in bottom-right corner
      const barCount = 18;
      const barWidth = 4;
      const gap = 3;
      const startX = width - (barCount * (barWidth + gap)) - 25;
      const startY = height - 60;

      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.abs(Math.sin(step * 1.5 + i * 0.35)) * 26 + 4;
        ctx.fillStyle = `rgba(52, 211, 153, ${0.4 + (i / barCount) * 0.5})`;
        ctx.fillRect(startX + i * (barWidth + gap), startY - barHeight, barWidth, barHeight);
      }
    }

    visualizerAnimationId = requestAnimationFrame(renderWave);
  }

  renderWave();
}

// ==========================================================================
// Dynamic Lesson Notes Engine (Subject-Aware)
// ==========================================================================
function renderLessonNotes() {
  const notesContainer = document.getElementById('notesContentArea');
  if (!notesContainer || !currentCourse) return;

  const currentMod = currentCourse.syllabus[currentModuleIndex] || { module: 'Foundations', lessons: [{ title: 'Overview' }] };
  const currentLes = currentMod.lessons[currentLessonIndex] || { title: 'Lecture' };
  const subject = currentCourse.subject || 'STEM';

  let subjectContent = getSubjectSpecificNotes(subject, currentLes.title);

  notesContainer.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
      <span class="badge badge-purple">${currentCourse.subject} Curriculum</span>
      <span style="font-size: 0.8rem; color: var(--accent-cyan); font-family: var(--font-mono);">${currentMod.module}</span>
    </div>

    <h3 style="font-size: 1.35rem; margin-bottom: 12px; color: #ffffff;">Lecture Outline: ${currentLes.title}</h3>
    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.65; margin-bottom: 20px;">
      ${subjectContent.overview}
    </p>

    <div class="formula-highlight-box">
      <strong style="color: var(--accent-cyan); display: block; margin-bottom: 6px;">${subjectContent.formulaTitle}</strong>
      <code>${subjectContent.formulaCode}</code>
      <div style="margin-top: 10px; font-size: 0.88rem; color: #e2e8f0;">
        <strong>Director's Speed Rule:</strong> ${subjectContent.speedRule}
      </div>
    </div>

    <h4 style="font-size: 1.05rem; color: #cbd5e1; margin: 22px 0 10px;">Core Engineering & Problem-Solving Takeaways:</h4>
    <ul style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.7; padding-left: 20px;">
      ${subjectContent.takeaways.map(t => `<li style="margin-bottom: 6px;">${t}</li>`).join('')}
    </ul>

    <div style="margin-top: 22px; padding: 14px 18px; background: rgba(245, 158, 11, 0.08); border-left: 3px solid #fbbf24; border-radius: 4px;">
      <strong style="color: #fbbf24; font-size: 0.88rem;">⚠️ High-Frequency Examination Trap:</strong>
      <p style="color: var(--text-muted); font-size: 0.86rem; margin-top: 4px; line-height: 1.5;">${subjectContent.examTrap}</p>
    </div>
  `;
}

function getSubjectSpecificNotes(subject, lessonTitle) {
  const normalized = subject.toLowerCase();

  if (normalized.includes('further') || normalized.includes('calculus')) {
    return {
      overview: `In this lecture, Engr. Ajibade unpacks advanced differential operators, integration techniques, and structural mechanics, highlighting analytical shortcuts for university calculus and Olympiad problem sets.`,
      formulaTitle: `Fundamental Theorem & Operational Identities:`,
      formulaCode: `d/dx [f(x) · g(x)] = f'(x)g(x) + f(x)g'(x)  |  ∫ u dv = uv - ∫ v du  |  I(x) = e^(∫ P(x)dx)`,
      speedRule: `Always verify whether the integrand conforms to the form ∫ [f'(x) / f(x)] dx = ln|f(x)| + C before launching into tedious substitution or partial fractions.`,
      takeaways: [
        `Express composite functions explicitly as u = g(x) and compute the differential du before evaluating boundary integrals.`,
        `For second-order ODEs (ay'' + by' + cy = 0), inspect the discriminant of the auxiliary equation (b² - 4ac) to instantly classify roots as real, repeated, or complex conjugates.`,
        `Apply dimensional balance across all derived differential expressions to eliminate incorrect options in under 20 seconds.`
      ],
      examTrap: `When integrating by parts repeatedly, students commonly forget to distribute the alternating minus signs across successive integration stages.`
    };
  } else if (normalized.includes('math')) {
    return {
      overview: `Engr. Ajibade delivers rigorous mastery of polynomial theorem proofs, partial fraction decomposition, and algebraic expansions with rapid elimination techniques.`,
      formulaTitle: `Polynomial Remainder & Factor Relations:`,
      formulaCode: `f(x) = d(x) · q(x) + R  |  If (x - a) divides f(x), then f(a) = 0  |  S_inf = a / (1 - r) for |r| < 1`,
      speedRule: `Substitute x = 0 or x = 1 into both algebraic sides to solve unknown partial fraction coefficients in under 15 seconds.`,
      takeaways: [
        `Identify asymptotes and critical roots immediately from denominator singularities.`,
        `For quadratic and cubic curves, apply Vieta's formulas: sum of roots = -b/a, product of roots = c/a (or -d/a).`,
        `Ensure domain restrictions (e.g. logarithmic arguments > 0, radicands ≥ 0) are strictly checked against candidate solutions.`
      ],
      examTrap: `Dividing an inequality by a variable whose sign is unknown (which inverts the inequality sign if negative) is the #1 reason students lose points on SAT and WASSCE algebra.`
    };
  } else if (normalized.includes('physics')) {
    return {
      overview: `Engr. Ajibade connects classical Newtonian mechanics and electromagnetic wave phenomena to real-world engineering systems and standardized exam calculation hacks.`,
      formulaTitle: `Conservation of Momentum & Electromagnetic Field Equations:`,
      formulaCode: `Σ F = ma = dp/dt  |  E_k = 1/2 mv²  |  v = f · λ  |  F_B = q(v × B)  |  V = -dΦ_B/dt`,
      speedRule: `Choose your reference coordinate frame so that as many unknown reaction forces as possible pass directly through the pivot point, nullifying their torques (τ = 0).`,
      takeaways: [
        `Always sketch free-body diagrams (FBD) isolating all external forces before formulating equations of motion.`,
        `Conserve mechanical energy (E_initial = E_final) whenever friction and non-conservative forces do zero net work.`,
        `Track SI unit conversions meticulously (e.g. cm to meters, grams to kilograms) before squaring numbers in kinetic and gravitational equations.`
      ],
      examTrap: `Confusing centripetal force with an independent physical force rather than the net resultant directed toward the center of curvature.`
    };
  } else if (normalized.includes('chem')) {
    return {
      overview: `Dive into organic reaction kinetics, transition states, stereochemical inversions, and equilibrium energetics with clear structural diagrams and mechanism steps.`,
      formulaTitle: `Rate Law Kinetics & Henderson-Hasselbalch Relationship:`,
      formulaCode: `Rate = k[A]^m[B]^n  |  pH = pKa + log([A⁻]/[HA])  |  ΔG° = -RT ln(K_eq) = ΔH° - TΔS°`,
      speedRule: `Primary carbocations favor bimolecular SN2 substitution via backside attack (Walden inversion), whereas tertiary centers undergo unimolecular SN1 with carbocation intermediates.`,
      takeaways: [
        `Identify electrophilic and nucleophilic centers by analyzing electronegativity differences and formal charges.`,
        `Examine steric hindrance and solvent polarity: polar protic solvents favor SN1/E1, polar aprotic solvents favor SN2/E2.`,
        `Apply Le Chatelier's principle systematically: exothermic reactions (ΔH < 0) shift left toward reactants when temperature rises.`
      ],
      examTrap: `Forgetting to invert stereochemistry (R to S) during an SN2 concerted nucleophilic displacement.`
    };
  } else if (normalized.includes('bio')) {
    return {
      overview: `Engr. Ajibade and GLGC life science faculty break down cellular physiology, genetic inheritance mechanisms, and molecular biology pathways.`,
      formulaTitle: `Hardy-Weinberg Genetic Equilibrium & Bioenergetics:`,
      formulaCode: `p² + 2pq + q² = 1  |  p + q = 1  |  C6H12O6 + 6O2 → 6CO2 + 6H2O + ~36 ATP`,
      speedRule: `For dihybrid Mendelian crosses between heterozygous parents (AaBb × AaBb), standard phenotypic ratios always yield 9:3:3:1 without building the entire 16-square Punnett matrix.`,
      takeaways: [
        `Understand DNA polymerase directional constraints: synthesis occurs strictly in the 5' to 3' direction.`,
        `Trace the electron transport chain (ETC) across the inner mitochondrial membrane and the proton gradient driving ATP synthase.`,
        `Master negative feedback homeostatic loops: receptor → control center → effector response.`
      ],
      examTrap: `Mistaking homozygous dominant frequency (p²) for the overall dominant phenotype frequency (p² + 2pq).`
    };
  } else if (normalized.includes('sat')) {
    return {
      overview: `Engr. Ajibade's proprietary Digital SAT blueprint: utilizing built-in Desmos graphing tactics, bluebook timing pacing, and elimination of reading/writing distractors.`,
      formulaTitle: `Digital SAT High-Yield Tactics & Circle Geometry:`,
      formulaCode: `(x - h)² + (y - k)² = r²  |  Vertex form: y = a(x - h)² + k  |  Quadratic vertex x = -b / (2a)`,
      speedRule: `Enter complex polynomial or system equations directly into Desmos on the exam; read intersecting points (x, y) visually to solve questions in under 15 seconds.`,
      takeaways: [
        `Allocate strictly 75 seconds per Math question and 35 seconds per Reading/Writing passage module.`,
        `In Reading passages with paired claim questions, identify transition words (however, furthermore, consequently) to instantly deduce the logical trajectory.`,
        `When testing multiple choice answers, always start testing with choice C or B to determine whether values are too high or too low.`
      ],
      examTrap: `Falling for SAT Math trap answers that ask for the value of 2x or (x + 3) rather than x alone.`
    };
  } else if (normalized.includes('ielts')) {
    return {
      overview: `Complete IELTS Band 8.5 masterclass: visual report architecture for Academic Task 1, balanced discursive essay templates for Task 2, and fluent speaking cue cards.`,
      formulaTitle: `IELTS Task 2 High-Band Essay Structure:`,
      formulaCode: `Intro (Paraphrase + Thesis) → Body 1 (PEEL) → Body 2 (PEEL) → Conclusion (Restatement + Outlook)`,
      speedRule: `Spend exactly 5 minutes planning Task 2 before writing. An essay with crystal-clear topic sentences and high-frequency collocations scores Band 8+ consistently.`,
      takeaways: [
        `Task 1: Always include a prominent 'Overview' paragraph highlighting primary trends and outliers without citing specific figures yet.`,
        `Speaking Part 2: Structure your 2-minute cue card around Past, Present, and Future (PPF) to avoid running out of ideas.`,
        `Avoid repeating words from the question prompt; substitute with precise academic synonyms (e.g. 'significant surge' for 'big increase').`
      ],
      examTrap: `Writing under 250 words on Task 2 results in an immediate penalty on Task Achievement, regardless of vocabulary quality.`
    };
  } else {
    return {
      overview: `Engr. Ajibade and GLGC instructors break down core academic foundations, diagnostic problem sets, and practical applications for this course module.`,
      formulaTitle: `Key Principle & Diagnostic Framework:`,
      formulaCode: `Hypothesis Formulation → Structured Methodology → Data Analysis → Rigorous Validation`,
      speedRule: `Eliminate clearly contradictory or extreme options (always, never, impossible) immediately to boost multiple-choice probability to >50%.`,
      takeaways: [
        `Understand foundational definitions before memorizing complex formula derivations.`,
        `Practice timed problem sets under simulated exam conditions to master time allocation.`,
        `Review incorrect answers meticulously to identify underlying conceptual gaps.`
      ],
      examTrap: `Rushing through question stems without noting negative qualifiers (e.g. 'Which of the following is NOT true?').`
    };
  }
}

// ==========================================================================
// Multi-Question Interactive Quiz Engine
// ==========================================================================
function initQuiz() {
  const container = document.getElementById('quizContentArea');
  if (!container || !currentCourse || !currentCourse.quiz || currentCourse.quiz.length === 0) {
    if (container) {
      container.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 20px;">No checkpoint quiz configured for this course yet.</p>`;
    }
    return;
  }

  currentQuizIndex = 0;
  quizAnswersState = {};
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('quizContentArea');
  if (!container || !currentCourse || !currentCourse.quiz) return;

  const totalQuestions = currentCourse.quiz.length;
  const q = currentCourse.quiz[currentQuizIndex];
  const state = quizAnswersState[currentQuizIndex];

  let stepperHtml = currentCourse.quiz.map((_, idx) => {
    let cls = '';
    if (idx === currentQuizIndex) cls += ' active';
    if (quizAnswersState[idx]) {
      cls += quizAnswersState[idx].isCorrect ? ' correct' : ' wrong';
    }
    return `<div class="quiz-stepper-pill ${cls}" onclick="switchQuizQuestion(${idx})">${idx + 1}</div>`;
  }).join('');

  // Calculate score so far
  let answeredCount = Object.keys(quizAnswersState).length;
  let correctCount = Object.values(quizAnswersState).filter(s => s.isCorrect).length;

  container.innerHTML = `
    <div class="quiz-header-bar">
      <div>
        <span style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 700;">Question ${currentQuizIndex + 1} of ${totalQuestions}</span>
        <h4 style="font-size: 1.15rem; color: #fff; margin-top: 2px;">Lesson Diagnostic Checkpoint</h4>
      </div>
      <div style="display: flex; align-items: center; gap: 14px;">
        <span style="font-size: 0.82rem; color: var(--text-dim); font-family: var(--font-mono);">Score: ${correctCount}/${totalQuestions}</span>
        <div class="quiz-stepper-pills">${stepperHtml}</div>
      </div>
    </div>

    <div class="quiz-question-text" style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 20px; color: #f1f5f9;">
      ${q.question}
    </div>

    <div class="quiz-options-list">
      ${q.options.map((opt, idx) => {
        let btnCls = '';
        let disabledAttr = '';
        if (state) {
          disabledAttr = 'disabled';
          if (idx === q.correct) btnCls = 'correct';
          else if (idx === state.selectedIdx) btnCls = 'wrong';
        }

        return `
          <button class="quiz-opt-btn ${btnCls}" ${disabledAttr} onclick="checkAnswer(${idx})">
            <span style="font-weight: 700; color: var(--accent-cyan); width: 22px;">${String.fromCharCode(65 + idx)}.</span>
            <span>${opt}</span>
          </button>
        `;
      }).join('')}
    </div>

    <div id="quizFeedbackBox" class="quiz-feedback" style="${state ? 'display: block;' : 'display: none;'}">
      <strong style="color: ${state && state.isCorrect ? '#34d399' : '#fbbf24'}; display: block; margin-bottom: 6px;">
        ${state && state.isCorrect ? '✓ Correct! Academic Verification Confirmed.' : '✗ Needs Review — Step-by-Step Breakdown:'}
      </strong>
      ${q.explanation}
    </div>

    <div class="quiz-footer-actions">
      <button class="btn btn-outline btn-sm" onclick="switchQuizQuestion(${currentQuizIndex - 1})" ${currentQuizIndex === 0 ? 'disabled' : ''}>
        ← Previous Question
      </button>

      <div>
        ${answeredCount === totalQuestions ? `
          <button class="btn btn-emerald btn-sm" onclick="finishQuizCheckpoint()">
            Complete Checkpoint & Save Progress
          </button>
        ` : `
          <button class="btn btn-primary btn-sm" onclick="switchQuizQuestion(${currentQuizIndex + 1})" ${currentQuizIndex + 1 >= totalQuestions ? 'disabled' : ''}>
            Next Question →
          </button>
        `}
      </div>
    </div>
  `;
}

function switchQuizQuestion(idx) {
  if (idx < 0 || idx >= currentCourse.quiz.length) return;
  currentQuizIndex = idx;
  renderQuizQuestion();
}

function checkAnswer(selectedIdx) {
  const q = currentCourse.quiz[currentQuizIndex];
  const isCorrect = (selectedIdx === q.correct);

  quizAnswersState[currentQuizIndex] = {
    selectedIdx: selectedIdx,
    isCorrect: isCorrect
  };

  renderQuizQuestion();

  if (isCorrect) {
    showToast('Correct! Brilliant deduction.', 'success', 'Verified');
  } else {
    showToast('Not quite. Review the step-by-step derivation.', 'warning', 'Checkpoint Alert');
  }
}

function finishQuizCheckpoint() {
  markCurrentLessonCompleted();
  let correctCount = Object.values(quizAnswersState).filter(s => s.isCorrect).length;
  let total = currentCourse.quiz.length;
  showToast(`Checkpoint completed! Score: ${correctCount}/${total} (${Math.round((correctCount/total)*100)}%). Lesson marked complete.`, 'success', 'Checkpoint Passed');
}

// ==========================================================================
// Dynamic Downloadable Materials
// ==========================================================================
function renderResources() {
  const container = document.getElementById('resourcesContentArea');
  if (!container || !currentCourse) return;

  const subject = currentCourse.subject || 'General';
  const resourcesList = getCourseResourcesList(subject, currentCourse.title);

  container.innerHTML = resourcesList.map(res => `
    <div class="resource-download-card">
      <div>
        <strong style="display: block; font-size: 0.95rem; color: #fff;">${res.title}</strong>
        <small style="color: var(--text-muted); font-size: 0.78rem;">${res.format} • ${res.size} • Prepared by ${res.author}</small>
      </div>
      <button class="btn btn-cyan btn-sm" onclick="downloadResource('${res.file}')">Download</button>
    </div>
  `).join('');
}

function getCourseResourcesList(subject, courseTitle) {
  const norm = subject.toLowerCase();

  if (norm.includes('math') || norm.includes('further')) {
    return [
      { title: "Calculus & Algebra Formula Compendium", format: "PDF", size: "4.8 MB", author: "Engr. Ajibade", file: "Calculus_Algebra_Compendium.pdf" },
      { title: "Differential Equations & Mechanics Cheatsheet", format: "PDF", size: "3.2 MB", author: "Engr. Ajibade", file: "Differential_Equations_Mechanics.pdf" },
      { title: "Top 100 Speed Calculation Hacks for WASSCE & Exams", format: "PDF", size: "2.4 MB", author: "GLGC STEM Faculty", file: "Top_100_Math_Hacks.pdf" }
    ];
  } else if (norm.includes('sat')) {
    return [
      { title: "Digital SAT 1550+ Bluebook Desmos Playbook", format: "PDF", size: "3.5 MB", author: "Engr. Ajibade", file: "Digital_SAT_Desmos_Playbook.pdf" },
      { title: "Reading & Writing Transition & Evidence Trap Guide", format: "PDF", size: "2.8 MB", author: "GLGC Exam Team", file: "SAT_Reading_Writing_Traps.pdf" },
      { title: "Official GLGC Diagnostic SAT Mock Exam 1 & Answer Key", format: "PDF", size: "5.1 MB", author: "Engr. Ajibade", file: "GLGC_SAT_Mock_Exam_1.pdf" }
    ];
  } else if (norm.includes('ielts')) {
    return [
      { title: "IELTS Band 8.5 Task 2 Academic Essay Templates", format: "PDF", size: "2.9 MB", author: "GLGC Language Faculty", file: "IELTS_Band85_Task2_Templates.pdf" },
      { title: "Speaking Cue Card 2-Minute Mastery Blueprint (PPF)", format: "PDF", size: "1.7 MB", author: "Director Engr. Ajibade", file: "IELTS_Speaking_CueCard_Mastery.pdf" },
      { title: "Academic Task 1 Visual Report Phrase Bank", format: "PDF", size: "2.1 MB", author: "GLGC Exam Team", file: "IELTS_Task1_PhraseBank.pdf" }
    ];
  } else if (norm.includes('chem')) {
    return [
      { title: "Organic Chemistry Reaction Pathways & Reagents Map", format: "PDF", size: "4.2 MB", author: "GLGC Chemistry Lead", file: "Organic_Chemistry_Reagents_Map.pdf" },
      { title: "Stoichiometry & Reaction Kinetics Formula Reference", format: "PDF", size: "2.5 MB", author: "Engr. Ajibade", file: "Stoichiometry_Kinetics_Formulae.pdf" },
      { title: "Stereochemistry 3D Fischer & Newman Projection Notes", format: "PDF", size: "3.1 MB", author: "GLGC Academic Team", file: "Stereochemistry_Projections.pdf" }
    ];
  } else if (norm.includes('phys')) {
    return [
      { title: "Comprehensive University Physics Formula Sheet", format: "PDF", size: "4.6 MB", author: "Engr. Ajibade", file: "University_Physics_Formula_Deck.pdf" },
      { title: "Mechanics, Projectiles & Wave Motion Problem Clinics", format: "PDF", size: "3.8 MB", author: "Engr. Ajibade", file: "Mechanics_Wave_Problem_Clinics.pdf" },
      { title: "Electromagnetism & Optics Quick Derivations", format: "PDF", size: "2.9 MB", author: "GLGC STEM Faculty", file: "Electromagnetism_Optics_QuickGuide.pdf" }
    ];
  } else {
    return [
      { title: `${courseTitle} Comprehensive Study Deck`, format: "PDF", size: "3.4 MB", author: "Engr. Ajibade", file: `${subject}_Study_Deck.pdf` },
      { title: "Diagnostic Mock Assessment with Worked Solutions", format: "PDF", size: "2.8 MB", author: "GLGC Examination Bureau", file: `${subject}_Diagnostic_Mock.pdf` },
      { title: "Essential Terms & Academic Concept Glossary", format: "PDF", size: "1.9 MB", author: "GLGC Academic Team", file: `${subject}_Concept_Glossary.pdf` }
    ];
  }
}

function downloadResource(filename) {
  showToast(`Downloading official GLGC resource: ${filename}... Verified by Director Engr. Ajibade.`, 'success', 'Download Started');
}

function downloadActiveCourseResource() {
  const subject = currentCourse ? currentCourse.subject : 'Course';
  downloadResource(`${subject}_Official_Study_Deck.pdf`);
}

// ==========================================================================
// Discussion Board (Persistent with Preloaded Seed Data)
// ==========================================================================
function initDiscussion() {
  const form = document.getElementById('questionForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('questionInput');
      const text = input.value.trim();
      if (!text) return;

      const posts = getStoredDiscussions();
      const newPost = {
        id: Date.now(),
        author: "You (Student)",
        role: "Scholar",
        time: "Just now",
        question: text,
        answer: `Thank you for your question on this lesson! Notice that by applying the foundational theorem outlined on page 3, we can isolate the independent variable before evaluating boundary conditions. Keep up the high standard of academic inquiry!`
      };

      posts.unshift(newPost);
      saveDiscussions(posts);
      input.value = '';
      renderDiscussions();

      showToast('Question submitted! Instructor response received.', 'info', 'Academic Inquiry');
    });
  }
}

function getStoredDiscussions() {
  const key = `glgc_discussion_${currentCourse ? currentCourse.id : 'default'}`;
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch(e) {
      console.error(e);
    }
  }

  // Pre-seed realistic questions for this subject
  return [
    {
      id: 1,
      author: "David Adeleke",
      role: "Student",
      time: "2 hours ago",
      question: `In step 3 of the derivation, why do we apply the integrating factor or boundary condition to both sides before evaluating the integral?`,
      answer: `Great observation, David! Multiplying both sides by the integrating factor I(x) collapses the entire left-hand side into the exact derivative of a product: d/dx [y · I(x)]. That is what allows us to integrate both sides in a single clean step!`
    },
    {
      id: 2,
      author: "Blessing Okonjo",
      role: "Student",
      time: "1 day ago",
      question: `For standardized exams like SAT and WASSCE, how can we avoid time-wasting traps in the multiple-choice section?`,
      answer: `Excellent inquiry, Blessing. Always test boundary conditions and edge cases (e.g. x = 0 or 1) first. In over 60% of objective questions, testing two test values eliminates 3 out of 4 options in under 20 seconds without needing full algebraic expansion!`
    }
  ];
}

function saveDiscussions(posts) {
  const key = `glgc_discussion_${currentCourse ? currentCourse.id : 'default'}`;
  localStorage.setItem(key, JSON.stringify(posts));
}

function renderDiscussions() {
  const list = document.getElementById('discussionList');
  if (!list) return;

  const posts = getStoredDiscussions();
  list.innerHTML = posts.map(p => `
    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 18px; margin-bottom: 14px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
        <strong style="color: #fff; font-size: 0.9rem;">${p.author}</strong>
        <small style="color: var(--text-dim); font-size: 0.75rem;">${p.time}</small>
      </div>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 12px;">${p.question}</p>
      <div style="background: rgba(79, 70, 229, 0.1); border-left: 3px solid var(--primary-glow); padding: 10px 14px; border-radius: 4px; font-size: 0.85rem; color: #a5b4fc;">
        <strong style="display: block; color: #fff;">Instructor Response (Engr. Ajibade Opeyemi Phillip):</strong>
        ${p.answer}
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// Certificate of Mastery Generator & Modal
// ==========================================================================
function openCertClaimModal() {
  const modal = document.getElementById('certClaimModal');
  if (!modal || !currentCourse) return;

  // Set course title
  const courseTitleEl = document.getElementById('certCourseTitle');
  if (courseTitleEl) courseTitleEl.innerText = currentCourse.title;

  // Set formatted current date
  const dateEl = document.getElementById('certIssueDate');
  if (dateEl) {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.innerText = now.toLocaleDateString('en-US', options);
  }

  // Generate verifiable credential ID
  const credEl = document.getElementById('certCredId');
  if (credEl) {
    const hash = Math.abs(currentCourse.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 1000));
    credEl.innerText = `GLGC-2026-${hash}`;
  }

  modal.classList.add('active');
}

function closeCertModal() {
  const modal = document.getElementById('certClaimModal');
  if (modal) modal.classList.remove('active');
}

function printCertificate() {
  window.print();
}

function verifyCertOnline() {
  const credEl = document.getElementById('certCredId');
  const certId = credEl ? credEl.innerText : 'GLGC-2026-8842';
  window.location.href = `index.html#results`;
  showToast(`Verifying credential ${certId} on GLGC Academy Hub...`, 'info');
}

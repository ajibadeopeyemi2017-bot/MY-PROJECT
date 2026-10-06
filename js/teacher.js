// Greater Light Global Consult & Academy (GLGC) - Teacher Portal & Course Creation Engine
// Lead Instructor & Director: Engr. Ajibade Opeyemi Phillip

let currentStep = 1;
let dynamicLessons = [
  { title: "Introduction & Diagnostic Benchmark Assessment", duration: "45 min" },
  { title: "Core Concepts & Step-by-Step Derivation", duration: "60 min" }
];

// Immediately apply saved theme
(function() {
  const saved = localStorage.getItem('glgc_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRevenueCalculator();
  initWizardNavigation();
  initLessonBuilder();
  renderDynamicLessons();
});

// Theme Management
function initThemeToggle() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyThemeUI(current);
}

function applyThemeUI(theme) {
  const isLight = theme === 'light';
  const icon = isLight ? '☀️' : '🌙';
  const text = isLight ? 'Bright' : 'Dark';

  const deskIcon = document.getElementById('themeToggleIcon');
  const deskText = document.getElementById('themeToggleText');
  if (deskIcon) deskIcon.textContent = icon;
  if (deskText) deskText.textContent = text;

  const mobIcon = document.getElementById('mobileThemeToggleIcon');
  const mobText = document.getElementById('mobileThemeToggleText');
  if (mobIcon) mobIcon.textContent = icon;
  if (mobText) mobText.textContent = `${text} Mode`;
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const nextTheme = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('glgc_theme', nextTheme);
  applyThemeUI(nextTheme);

  if (typeof showToast === 'function') {
    showToast(`Theme switched to ${nextTheme === 'light' ? 'Bright Luminary' : 'Luminous Midnight'}`, 'info');
  }
}

// Teacher Revenue Calculator
function initRevenueCalculator() {
  const studentsSlider = document.getElementById('calcStudents');
  const priceSlider = document.getElementById('calcPrice');
  
  if (studentsSlider && priceSlider) {
    studentsSlider.addEventListener('input', updateCalculator);
    priceSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }
}

function updateCalculator() {
  const students = parseInt(document.getElementById('calcStudents').value);
  const price = parseInt(document.getElementById('calcPrice').value);

  document.getElementById('calcStudentsVal').innerText = `${students} Students`;
  document.getElementById('calcPriceVal').innerText = `$${price} / mo`;

  // 80% instructor revenue share
  const monthlyGross = students * price;
  const teacherShare = Math.round(monthlyGross * 0.80);
  const ngnEquivalent = Math.round(teacherShare * 1450); // exchange rate reference

  document.getElementById('calcEarningsUSD').innerText = `$${teacherShare.toLocaleString()} / mo`;
  document.getElementById('calcEarningsNGN').innerText = `≈ ₦${ngnEquivalent.toLocaleString()} / mo`;
}

// Wizard Multi-Step Navigation
function initWizardNavigation() {
  const nodes = document.querySelectorAll('.wizard-step-node');
  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const step = parseInt(node.getAttribute('data-step'));
      if (step < currentStep) {
        goToStep(step);
      }
    });
  });
}

function goToStep(step) {
  currentStep = step;
  
  document.querySelectorAll('.wizard-step-node').forEach(node => {
    const s = parseInt(node.getAttribute('data-step'));
    node.classList.remove('active', 'completed');
    if (s === currentStep) {
      node.classList.add('active');
    } else if (s < currentStep) {
      node.classList.add('completed');
    }
  });

  document.querySelectorAll('.wizard-form-step').forEach(pane => {
    pane.classList.remove('active');
  });

  const activePane = document.getElementById(`stepPane${currentStep}`);
  if (activePane) activePane.classList.add('active');

  window.scrollTo({ top: document.querySelector('.wizard-card').offsetTop - 90, behavior: 'smooth' });
}

function nextStep(step) {
  if (step === 1) {
    const name = document.getElementById('teacherFullName').value.trim();
    const email = document.getElementById('teacherEmail').value.trim();
    const subject = document.getElementById('teacherSubject').value;
    if (!name || !email || !subject) {
      showToast('Please complete your full name, email, and primary subject.', 'warning');
      return;
    }
  } else if (step === 2) {
    const degree = document.getElementById('teacherDegree').value.trim();
    if (!degree) {
      showToast('Please input your degree or qualifications.', 'warning');
      return;
    }
  }

  goToStep(step + 1);
}

function prevStep(step) {
  goToStep(step - 1);
}

// Lesson & Syllabus Builder inside Step 3
function initLessonBuilder() {
  const addBtn = document.getElementById('addLessonBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const titleInput = document.getElementById('newLessonTitle');
      const durInput = document.getElementById('newLessonDuration');

      const title = titleInput.value.trim();
      const dur = durInput.value.trim() || '45 min';

      if (!title) {
        showToast('Please enter a lesson title', 'warning');
        return;
      }

      dynamicLessons.push({ title, duration: dur });
      titleInput.value = '';
      durInput.value = '';
      renderDynamicLessons();
      showToast(`Lesson "${title}" added to syllabus!`, 'info');
    });
  }
}

function renderDynamicLessons() {
  const container = document.getElementById('dynamicLessonsList');
  if (!container) return;

  container.innerHTML = dynamicLessons.map((l, idx) => `
    <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 8px;">
      <span style="font-size: 0.9rem; color: #fff;">
        <strong style="color: var(--accent-cyan); margin-right: 8px;">#${idx + 1}</strong>
        ${l.title}
      </span>
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 0.8rem; color: var(--text-dim);">${l.duration}</span>
        <button type="button" onclick="removeLesson(${idx})" style="background: transparent; border: none; color: #ef4444; cursor: pointer; font-size: 1rem;">&times;</button>
      </div>
    </div>
  `).join('');
}

function removeLesson(idx) {
  dynamicLessons.splice(idx, 1);
  renderDynamicLessons();
}

// Course Publish Submission
function submitCourseForPublishing(e) {
  e.preventDefault();

  const title = document.getElementById('newCourseTitle').value.trim();
  const subject = document.getElementById('newCourseSubject').value;
  const level = document.getElementById('newCourseLevel').value;
  const priceUSD = parseInt(document.getElementById('newCoursePriceUSD').value) || 49;
  const priceNGN = parseInt(document.getElementById('newCoursePriceNGN').value) || 35000;
  const desc = document.getElementById('newCourseDesc').value.trim();
  const teacherName = document.getElementById('teacherFullName').value.trim() || 'Guest Educator';

  if (!title || !desc) {
    showToast('Please provide a course title and description.', 'warning');
    return;
  }

  const newCourseObj = {
    id: `custom-${Date.now()}`,
    title: title,
    subject: subject,
    category: ['SAT', 'IELTS', 'TOEFL', 'GRE', 'GMAT'].includes(subject) ? 'Standardized Exam' : 'STEM',
    badge: 'New Course',
    instructor: teacherName,
    instructorRole: 'Certified GLGC Educator',
    instructorImg: 'assets/images/founder-avatar.jpg',
    rating: 5.0,
    reviewsCount: 1,
    studentsCount: 1,
    duration: `${dynamicLessons.length * 1.5} Hours`,
    lessonsCount: dynamicLessons.length,
    level: level,
    priceUSD: priceUSD,
    priceNGN: priceNGN,
    thumbnail: 'assets/images/studio_analytics.jpg',
    description: desc,
    topics: dynamicLessons.map(l => l.title),
    syllabus: [
      {
        module: `Module 1: ${subject} Fundamentals & Curriculum`,
        duration: `${dynamicLessons.length} Hours`,
        lessons: dynamicLessons
      }
    ],
    quiz: [
      {
        question: `Diagnostic Assessment Question for ${title}:`,
        options: ["Concept A", "Concept B", "Concept C", "Concept D"],
        correct: 0,
        explanation: "Comprehensive foundational mastery explanation provided by instructor."
      }
    ]
  };

  // Save to localStorage
  saveCustomCourse(newCourseObj);

  // Transition to Step 4 (Instructor Dashboard Preview)
  goToStep(4);
  document.getElementById('submittedCourseName').innerText = title;
  document.getElementById('submittedSubjectBadge').innerText = subject;

  const classroomBtn = document.getElementById('dashClassroomBtn');
  if (classroomBtn) {
    classroomBtn.href = `classroom.html?id=${newCourseObj.id}`;
  }

  showToast(`Congratulations ${teacherName}! Your course "${title}" has been published to GLGC Academy!`, 'success', 'Course Published Live');
}

// File Upload Simulator
function simulateUpload(type) {
  showToast(`Simulating upload for ${type}... File uploaded and scanned successfully!`, 'success');
}

// Mobile Menu Drawer for Teacher Portal
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileNavDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  if (drawer && overlay) {
    drawer.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobileNavDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Greater Light Global Consult & Academy (GLGC) - Main Portal Logic
// Lead Instructor & Director: Engr. Ajibade Opeyemi Phillip

let currentCurrency = 'USD'; // 'USD' or 'NGN'
let currentCategory = 'all';
let currentSearch = '';
let billingCycle = 'monthly'; // 'monthly' or 'annual'

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initCategoryPills();
  initSearch();
  initCurrencyToggle();
  initBillingToggle();
  initFaqAccordion();
  initBookingCalendar();
  initCertificateVerification();
  renderCourses();
});

// Sticky Header
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile Menu Drawer
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

// Currency Switcher
function initCurrencyToggle() {
  const usdBtn = document.getElementById('curr-usd');
  const ngnBtn = document.getElementById('curr-ngn');

  if (usdBtn && ngnBtn) {
    usdBtn.addEventListener('click', () => setCurrency('USD'));
    ngnBtn.addEventListener('click', () => setCurrency('NGN'));
  }
}

function setCurrency(currency) {
  currentCurrency = currency;
  document.querySelectorAll('.curr-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById(`curr-${currency.toLowerCase()}`);
  if (activeBtn) activeBtn.classList.add('active');

  renderCourses();
  updatePricingPlans();
  showToast(`Currency updated to ${currency}`, 'info');
}

function formatPrice(usd, ngn) {
  if (currentCurrency === 'NGN') {
    return `₦${ngn.toLocaleString()}`;
  }
  return `$${usd}`;
}

// Category Pills
function initCategoryPills() {
  const pills = document.querySelectorAll('.pill-btn');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-cat') || 'all';
      renderCourses();
    });
  });
}

// Search
function initSearch() {
  const searchInput = document.getElementById('courseSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderCourses();
    });
  }
}

// Render Courses
function renderCourses() {
  const grid = document.getElementById('coursesGrid');
  if (!grid) return;

  const courses = getStoredCourses();

  const filtered = courses.filter(course => {
    const matchCat = (currentCategory === 'all') ||
      (course.subject.toLowerCase() === currentCategory.toLowerCase()) ||
      (course.category.toLowerCase() === currentCategory.toLowerCase());

    const matchSearch = !currentSearch ||
      course.title.toLowerCase().includes(currentSearch) ||
      course.subject.toLowerCase().includes(currentSearch) ||
      course.instructor.toLowerCase().includes(currentSearch) ||
      course.description.toLowerCase().includes(currentSearch) ||
      course.topics.some(t => t.toLowerCase().includes(currentSearch));

    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.02); border-radius: var(--radius-lg); border: 1px dashed var(--border-glass);">
        <p style="font-size: 1.2rem; color: var(--text-muted); margin-bottom: 12px;">No courses found matching "${currentSearch}" in ${currentCategory}.</p>
        <button class="btn btn-primary btn-sm" onclick="resetFilters()">View All Courses</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(course => {
    const priceText = formatPrice(course.priceUSD, course.priceNGN);
    const badgeHtml = course.badge ? `<span class="badge ${course.badge === 'Flagship' ? 'badge-gold' : 'badge-pulse'} course-badge-tag">${course.badge}</span>` : '';

    const levelMeter = course.level.toLowerCase().includes('advanced') ? '■■■' : '■■□';

    return `
      <div class="course-card glass-panel" data-id="${course.id}">
        <div class="course-thumb-wrap">
          <img src="${course.thumbnail}" alt="${course.title}" class="course-thumb" loading="lazy" />
          ${badgeHtml}
          <span class="course-subject-pill">${course.subject}</span>
        </div>
        <div class="course-body">
          <div class="course-header-meta">
            <span class="level-indicator">
              <span>${levelMeter}</span>
              <span>${course.level}</span>
            </span>
            <div class="course-rating">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#fbbf24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>${course.rating}</span>
              <span style="color: var(--text-dim); font-size: 0.74rem;">(${course.reviewsCount})</span>
            </div>
          </div>

          <h3 class="course-title">${course.title}</h3>
          <p class="course-desc">${course.description}</p>

          <div class="course-instructor">
            <img src="${course.instructorImg}" alt="${course.instructor}" class="inst-avatar" />
            <div class="inst-details">
              <strong>${course.instructor}</strong>
              <small>${course.instructorRole}</small>
            </div>
          </div>

          <div class="course-specs-capsules">
            <span class="spec-capsule">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              ${course.duration}
            </span>
            <span class="spec-capsule">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              ${course.lessonsCount} Lessons
            </span>
            <span class="spec-capsule" style="color: var(--accent-emerald);">
              ✓ Verified Cert
            </span>
          </div>

          <div class="course-footer">
            <div class="course-pricing">
              <span class="price-val mono-accent">${priceText}</span>
              <span class="price-sub">Included in All-Access</span>
            </div>
            <div class="course-actions">
              <button class="btn btn-outline btn-sm" onclick="openSyllabusModal('${course.id}')" title="Preview Syllabus">Syllabus</button>
              <button class="btn btn-primary btn-sm" onclick="openCheckoutModal('${course.id}')">Enroll</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function resetFilters() {
  currentCategory = 'all';
  currentSearch = '';
  const searchInput = document.getElementById('courseSearchInput');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.pill-btn').forEach(p => p.classList.remove('active'));
  const first = document.querySelector('.pill-btn[data-cat="all"]');
  if (first) first.classList.add('active');
  renderCourses();
}

// Syllabus Preview Modal
function openSyllabusModal(courseId) {
  const courses = getStoredCourses();
  const course = courses.find(c => c.id === courseId);
  if (!course) return;

  const modal = document.getElementById('syllabusModal');
  const titleEl = document.getElementById('syllabusCourseTitle');
  const bodyEl = document.getElementById('syllabusContent');
  const actionBtn = document.getElementById('syllabusEnrollBtn');

  titleEl.innerHTML = `${course.title} <br><small style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: normal;">Instructor: ${course.instructor}</small>`;

  let syllabusHtml = `
    <div style="margin-bottom: 20px;">
      <h4 style="font-size: 0.95rem; margin-bottom: 8px; color: #cbd5e1;">Curriculum Overview (${course.duration} • ${course.lessonsCount} Lessons):</h4>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px;">
        ${course.topics.map(t => `<span style="background: rgba(255,255,255,0.06); padding: 4px 10px; border-radius: 6px; font-size: 0.78rem; color: var(--text-muted);">${t}</span>`).join('')}
      </div>
    </div>
    <div class="syllabus-modules-list" style="display: flex; flex-direction: column; gap: 14px;">
  `;

  course.syllabus.forEach((mod, idx) => {
    syllabusHtml += `
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <strong style="color: #ffffff; font-size: 0.95rem;">${mod.module}</strong>
          <span style="color: var(--accent-cyan); font-size: 0.78rem; font-weight: 700;">${mod.duration}</span>
        </div>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; padding-left: 6px;">
          ${mod.lessons.map(l => `
            <li style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted);">
              <span style="display: flex; align-items: center; gap: 8px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                ${l.title}
              </span>
              <span style="font-size: 0.75rem; color: var(--text-dim);">${l.duration}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  });

  syllabusHtml += `</div>`;
  bodyEl.innerHTML = syllabusHtml;

  actionBtn.onclick = () => {
    closeModal('syllabusModal');
    openCheckoutModal(courseId);
  };

  modal.classList.add('active');
}

// Checkout & Enrollment Modal
function openCheckoutModal(courseId) {
  const modal = document.getElementById('checkoutModal');
  const detailsEl = document.getElementById('checkoutItemDetails');
  const totalEl = document.getElementById('checkoutTotalAmount');

  let itemTitle = 'GLGC All-Access Pass (STEM & Standardized Exams)';
  let priceText = currentCurrency === 'NGN' ? '₦45,000 / month' : '$69 / month';

  if (courseId && courseId !== 'all-access') {
    const courses = getStoredCourses();
    const course = courses.find(c => c.id === courseId);
    if (course) {
      itemTitle = course.title;
      priceText = formatPrice(course.priceUSD, course.priceNGN);
    }
  }

  detailsEl.innerHTML = `
    <div style="background: rgba(255,255,255,0.04); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-glass); margin-bottom: 20px;">
      <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700;">Selected Course / Pass</span>
      <h4 style="font-size: 1.15rem; color: #fff; margin: 4px 0 10px;">${itemTitle}</h4>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 10px;">
        <span style="font-size: 0.85rem; color: var(--text-muted);">Instant Access Unlocked</span>
        <strong style="color: #34d399; font-size: 1.1rem;">${priceText}</strong>
      </div>
    </div>
  `;

  totalEl.innerText = priceText;
  modal.classList.add('active');
}

function processPaymentSimulator(e) {
  e.preventDefault();
  const btn = document.getElementById('paySubmitBtn');
  btn.innerText = 'Processing Secure Authorization...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerText = 'Access Granted!';
    showToast('Payment Authorized Successfully! Redirecting to your Classroom...', 'success', 'Enrollment Confirmed');
    
    // Save enrolled state to localStorage
    localStorage.setItem('glgc_student_enrolled', 'true');

    setTimeout(() => {
      closeModal('checkoutModal');
      window.location.href = 'classroom.html';
    }, 1200);
  }, 1000);
}

// Close Modals
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// Pricing Toggle
function initBillingToggle() {
  const switchToggle = document.getElementById('billingSwitch');
  if (switchToggle) {
    switchToggle.addEventListener('click', () => {
      switchToggle.classList.toggle('active');
      billingCycle = switchToggle.classList.contains('active') ? 'annual' : 'monthly';
      updatePricingPlans();
    });
  }
}

function updatePricingPlans() {
  const discountMultiplier = billingCycle === 'annual' ? 0.8 : 1; // 20% off annual
  const periodText = billingCycle === 'annual' ? '/mo (billed annually)' : '/month';

  const singlePrice = currentCurrency === 'NGN' ? Math.round(25000 * discountMultiplier) : Math.round(35 * discountMultiplier);
  const bundlePrice = currentCurrency === 'NGN' ? Math.round(45000 * discountMultiplier) : Math.round(69 * discountMultiplier);
  const elitePrice = currentCurrency === 'NGN' ? Math.round(95000 * discountMultiplier) : Math.round(149 * discountMultiplier);

  const prefix = currentCurrency === 'NGN' ? '₦' : '$';

  const singleEl = document.getElementById('pricePlanSingle');
  const bundleEl = document.getElementById('pricePlanBundle');
  const eliteEl = document.getElementById('pricePlanElite');

  if (singleEl) singleEl.innerText = `${prefix}${singlePrice.toLocaleString()}`;
  if (bundleEl) bundleEl.innerText = `${prefix}${bundlePrice.toLocaleString()}`;
  if (eliteEl) eliteEl.innerText = `${prefix}${elitePrice.toLocaleString()}`;

  document.querySelectorAll('.plan-period').forEach(p => p.innerText = periodText);
}

// Mentorship Booking Calendar
function initBookingCalendar() {
  const dayButtons = document.querySelectorAll('.cal-day:not(.disabled)');
  dayButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dayButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const slotButtons = document.querySelectorAll('.slot-btn');
  slotButtons.forEach(slot => {
    slot.addEventListener('click', () => {
      slotButtons.forEach(s => s.classList.remove('active'));
      slot.classList.add('active');
    });
  });
}

function confirmMentorshipBooking(e) {
  e.preventDefault();
  const name = document.getElementById('mentorStudentName').value;
  const exam = document.getElementById('mentorExamType').value;
  
  showToast(`Mentorship session booked for ${name} (${exam})! Confirmation sent to your email with Zoom link.`, 'success', 'Session Confirmed');
  document.getElementById('bookingForm').reset();
}

// Certificate Verification
function initCertificateVerification() {
  const verifyBtn = document.getElementById('certVerifyBtn');
  const certInput = document.getElementById('certIdInput');

  if (verifyBtn && certInput) {
    verifyBtn.addEventListener('click', () => {
      const val = certInput.value.trim().toUpperCase();
      if (!val) {
        showToast('Please enter a Certificate ID (e.g. GLGC-2026-8842)', 'warning');
        return;
      }
      openCertModal(val);
    });
  }
}

function openCertModal(certId) {
  const modal = document.getElementById('certModal');
  const content = document.getElementById('certModalContent');

  content.innerHTML = `
    <div style="border: 2px solid var(--accent-gold); padding: 30px; border-radius: var(--radius-lg); background: radial-gradient(circle, rgba(245, 158, 11, 0.08), transparent 70%); text-align: center;">
      <span class="badge badge-gold" style="margin-bottom: 12px;">Verified Academic Credential</span>
      <h3 style="font-size: 1.6rem; color: #ffffff; margin-bottom: 6px;">Certificate of Mastery & Completion</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem;">Issued by Greater Light Global Consult & Online Academy</p>
      
      <div style="margin: 24px 0; padding: 18px; background: rgba(255,255,255,0.03); border-radius: var(--radius-md);">
        <p style="font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase;">Credential ID</p>
        <strong style="font-size: 1.25rem; color: var(--accent-cyan); font-family: monospace;">${certId}</strong>
        <p style="font-size: 0.95rem; color: #fff; margin-top: 8px;">Candidate: <strong>Oluwaseun Bakare</strong></p>
        <p style="font-size: 0.88rem; color: #a5b4fc;">Track: <strong>Digital SAT Mastery & Further Mathematics (Score: 1540 / A1)</strong></p>
      </div>

      <div style="display: flex; justify-content: space-around; align-items: center; border-top: 1px solid var(--border-glass); padding-top: 18px;">
        <div>
          <small style="color: var(--text-dim); display: block;">Authorized Signatory</small>
          <strong style="color: #ffffff; font-size: 0.85rem;">Engr. Ajibade Opeyemi Phillip</strong>
          <small style="display: block; color: var(--text-muted); font-size: 0.72rem;">Director, GLGC Academy</small>
        </div>
        <div style="background: rgba(16,185,129,0.15); color: #34d399; padding: 6px 14px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700;">
          Status: ACTIVE & AUTHENTIC
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

// FAQ Accordion
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isOpen) item.classList.add('active');
    });
  });
}

// Free Consultation Modal
function openConsultModal() {
  const modal = document.getElementById('consultModal');
  if (modal) modal.classList.add('active');
}

function submitConsultForm(e) {
  e.preventDefault();
  showToast('Study abroad consultation request received! An advisor from Ile-Ife office will reach out via WhatsApp/Email within 2 hours.', 'success', 'Request Submitted');
  closeModal('consultModal');
  e.target.reset();
}

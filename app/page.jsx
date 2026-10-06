'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import SyllabusModal from '@/components/Modals/SyllabusModal';
import CheckoutModal from '@/components/Modals/CheckoutModal';
import ConsultModal from '@/components/Modals/ConsultModal';
import CertModal from '@/components/Modals/CertModal';
import LegalModal from '@/components/Modals/LegalModal';
import { getCourses, verifyCertificate, bookMentorship } from '@/lib/api-client';
import { showNotification } from '@/components/Toast';

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [isAnnual, setIsAnnual] = useState(false);

  // Active Modals state
  const [syllabusCourse, setSyllabusCourse] = useState(null);
  const [checkoutItem, setCheckoutItem] = useState(null);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [certData, setCertData] = useState(null);
  const [legalType, setLegalType] = useState(null);

  // Cert input states
  const [certIdInput, setCertIdInput] = useState('GLGC-2026-8842');

  // Mentorship form state
  const [mentorName, setMentorName] = useState('');
  const [mentorExam, setMentorExam] = useState('SAT Strategy');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM - 10:45 AM');
  const [selectedDay, setSelectedDay] = useState(6);
  const [isBooking, setIsBooking] = useState(false);

  // FAQ open item
  const [openFaq, setOpenFaq] = useState(0);

  // Load courses
  useEffect(() => {
    async function loadData() {
      const data = await getCourses();
      setCourses(data);
      setFilteredCourses(data);
    }
    loadData();
  }, []);

  // Filter courses reactively
  useEffect(() => {
    let result = [...courses];

    if (selectedCategory !== 'all') {
      result = result.filter(c => 
        c.subject.toLowerCase() === selectedCategory.toLowerCase() ||
        c.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.topics && c.topics.some(t => t.toLowerCase().includes(q)))
      );
    }

    setFilteredCourses(result);
  }, [selectedCategory, searchQuery, courses]);

  // Handle Certificate verification
  const handleVerifyCert = async (idToVerify) => {
    const id = idToVerify || certIdInput;
    if (!id.trim()) {
      showNotification('Please enter a credential ID', 'warning');
      return;
    }
    showNotification('Verifying academic credential...', 'info', 2000);
    const res = await verifyCertificate(id.trim());
    if (res && res.certificate) {
      setCertData(res.certificate);
    }
  };

  // Handle Mentorship booking
  const handleMentorshipSubmit = async (e) => {
    e.preventDefault();
    if (!mentorName.trim()) {
      showNotification('Please enter your full name', 'warning');
      return;
    }

    setIsBooking(true);
    try {
      const res = await bookMentorship({
        name: mentorName,
        examType: mentorExam,
        slot: selectedSlot,
        date: `October ${selectedDay}, 2026`
      });
      showNotification(res.message, 'success', 6000);
      setMentorName('');
    } catch (err) {
      showNotification('Failed to book session. Please contact via WhatsApp.', 'error');
    } finally {
      setIsBooking(false);
    }
  };

  // Pricing calculations
  const priceSingle = isAnnual
    ? (currency === 'NGN' ? '₦20,000' : '$28')
    : (currency === 'NGN' ? '₦25,000' : '$35');

  const priceBundle = isAnnual
    ? (currency === 'NGN' ? '₦40,000' : '$55')
    : (currency === 'NGN' ? '₦50,000' : '$69');

  const priceElite = isAnnual
    ? (currency === 'NGN' ? '₦88,000' : '$119')
    : (currency === 'NGN' ? '₦110,000' : '$149');

  const categories = [
    { key: 'all', label: 'All Disciplines' },
    { key: 'Mathematics', label: 'Mathematics' },
    { key: 'Further Maths', label: 'Further Maths' },
    { key: 'Physics', label: 'Physics' },
    { key: 'Chemistry', label: 'Chemistry' },
    { key: 'Biology', label: 'Biology' },
    { key: 'English', label: 'English' },
    { key: 'SAT', label: 'SAT Prep' },
    { key: 'IELTS', label: 'IELTS Prep' },
    { key: 'TOEFL', label: 'TOEFL' },
    { key: 'GRE', label: 'GRE General' },
    { key: 'GMAT', label: 'GMAT Focus' },
  ];

  const faqs = [
    {
      q: 'How does the student subscription work?',
      a: 'When you subscribe to the All-Access Pass, you receive unlimited access to all courses across STEM (Maths, Further Maths, Physics, Chemistry, Biology, English) and all Standardized Exams (SAT, IELTS, TOEFL, GRE, GMAT). You can switch courses anytime, take practice quizzes, download study materials, and attend live office hours.'
    },
    {
      q: 'How can teachers register and upload courses?',
      a: 'Teachers can navigate to our Teacher Portal, submit their profile, qualifications, and curriculum outline. Once approved, instructors gain full access to our Course Creation Studio to upload video lessons, notes, and quizzes, earning an industry-leading 80% revenue share on student enrollments.'
    },
    {
      q: 'Can I apply for Study Abroad admissions through GLGC?',
      a: 'Yes! Greater Light Global Consult is an established international admissions agency based in Ile-Ife, Nigeria. We assist undergraduate and postgraduate students in securing university admissions and scholarships in the USA, UK, Canada, and Europe, even for candidates with study gaps or without standardized exam scores.'
    },
    {
      q: 'What payment methods are supported?',
      a: 'We accept all major debit/credit cards (Visa, MasterCard, Verve), direct Nigerian bank transfers, USSD, and international cards via secure encrypted authorization. You can toggle currency between USD ($) and NGN (₦) anytime.'
    }
  ];

  return (
    <>
      <Navbar activeCurrency={currency} onCurrencyChange={setCurrency} />

      <main>
        {/* Hero Section */}
        <section className="hero-section" id="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow-kicker">
                <span className="kicker-dot"></span>
                <span>Admissions Open • 2026 Academic Cohorts</span>
              </div>
              <h1 className="hero-title">
                Master <span className="gradient-text">STEM Rigor</span> & Conquer <span className="gradient-gold">Global Exams</span>.
              </h1>
              <p className="hero-subtitle">
                Accelerate your academic journey with world-class online courses in <strong>Mathematics, Further Maths, Physics, Chemistry, Biology, English</strong>, and elite test preparation for <strong>SAT, IELTS, TOEFL, GRE & GMAT</strong>.
              </p>

              <div className="hero-buttons">
                <a href="#courses" className="btn btn-primary btn-lg" id="heroEnrollBtn">
                  <span>Explore Courses & Enroll</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
                <Link href="/teacher-portal" className="btn btn-outline btn-lg" id="heroTeacherBtn">
                  <span>Register as an Educator</span>
                </Link>
              </div>

              <div className="hero-trust-bar">
                <div className="trust-item">
                  <span className="trust-number mono-accent">45,000+</span>
                  <span className="trust-label">Scholars Mentored</span>
                </div>
                <div className="trust-item">
                  <span className="trust-number mono-accent">98.4%</span>
                  <span className="trust-label">Exam Pass Rate</span>
                </div>
                <div className="trust-item">
                  <span className="trust-number mono-accent">15+ Yrs</span>
                  <span className="trust-label">Leadership Track</span>
                </div>
                <div className="trust-item">
                  <span className="trust-number mono-accent">$4.2M+</span>
                  <span className="trust-label">Scholarships Won</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Showcase */}
            <div className="hero-showcase">
              <div className="showcase-card">
                <img
                  src="/assets/images/stem_hologram.jpg"
                  alt="Interactive STEM Online Classroom"
                  className="showcase-img"
                />
                <div className="showcase-gradient-overlay"></div>

                <div className="floating-badge badge-top-left">
                  <div className="chip-icon sat">SAT</div>
                  <div className="chip-text">
                    <strong>Digital SAT Prep</strong>
                    <small className="mono-accent">+240 Average Gain</small>
                  </div>
                </div>

                <div className="floating-badge badge-bottom-right">
                  <div className="chip-icon stem">∫dx</div>
                  <div className="chip-text">
                    <strong>Further Maths & Calculus</strong>
                    <small className="mono-accent">Engineering Proofs</small>
                  </div>
                </div>

                <div className="live-indicator">
                  <span className="live-dot"></span>
                  <span>Live Interactive Classroom Active</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Founder Spotlight Section */}
        <section className="founder-section" id="founder">
          <div className="container">
            <div className="founder-card glass-panel">
              <div className="founder-photo-wrap">
                <img
                  src="/assets/images/founder-portrait.jpg"
                  alt="Engr. Ajibade Opeyemi Phillip - Founder & Director"
                  className="founder-img"
                />
                <div className="founder-exp-pill mono-accent">15+ Years Academic Leadership</div>
              </div>

              <div className="founder-content">
                <div className="eyebrow-kicker" style={{ color: 'var(--accent-gold)' }}>
                  <span className="kicker-dot" style={{ background: 'var(--accent-gold)', boxShadow: '0 0 10px var(--accent-gold)' }}></span>
                  <span>Founder & Academic Director</span>
                </div>
                <h2 className="founder-name">Engr. Ajibade Opeyemi Phillip</h2>
                <p className="founder-designation">Civil Engineer • Senior STEM Educator • International Exam Director</p>
                
                <p className="founder-bio">
                  Born and raised in Ile-Ife, Engr. Ajibade’s life story is an inspiring testament to grit, academic tenacity, and resilience. Overcoming formidable challenges through relentless dedication, he graduated as a Civil Engineer with exceptional natural prowess in calculation-based subjects, advanced mathematics, physics, and international standardized testing.
                </p>

                <div className="founder-timeline">
                  <div className="timeline-step">
                    <strong>Director & Founder — Greater Light Global Consult & Academy</strong>
                    <small>Spearheading STEM democratization, SAT/IELTS preparation, and international admissions.</small>
                  </div>
                  <div className="timeline-step">
                    <strong>Head of Mathematics & International Exams — Sought Out College (2017–2024)</strong>
                    <small>Led senior calculus, mechanics, SAT, and IELTS coaching; directed external registrations.</small>
                  </div>
                  <div className="timeline-step">
                    <strong>School Principal & Physics Lead — Divine Promotion Model College (2010–2017)</strong>
                    <small>Coordinated school-wide academic affairs and taught advanced physics & pure mathematics.</small>
                  </div>
                  <div className="timeline-step">
                    <strong>Civil Engineering Graduate</strong>
                    <small>Mastery of structural calculation, applied mechanics, and computational modeling.</small>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', marginTop: '10px', flexWrap: 'wrap' }}>
                  <a href="#courses" className="btn btn-primary btn-sm">Explore Classes</a>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsConsultOpen(true)}>
                    Book Founder Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Modern Bento Grid Architecture */}
        <section className="bento-section" id="bento-core">
          <div className="container">
            <div className="section-header">
              <div className="eyebrow-kicker">
                <span className="kicker-dot"></span>
                <span>The Platform Architecture</span>
              </div>
              <h2 className="section-title">An Intelligent Ecosystem for Global Scholars & Educators</h2>
              <p className="section-desc">
                Engineered from the ground up to replace static video lists with live problem-solving, progress tracking, educator revenue models, and study abroad pathways.
              </p>
            </div>

            <div className="bento-grid">
              {/* Card 1: Virtual Classroom */}
              <div className="bento-card bento-span-2 glass-panel">
                <div className="bento-icon-badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)' }}>💻</div>
                <h3 className="bento-title">Next-Gen Virtual Classroom & Video Player</h3>
                <p className="bento-desc">
                  Students don't just watch videos—they interact with synchronized chapter notes, download engineering formula sheets, ask instant questions, and take timed diagnostic checkpoint quizzes with real-time feedback.
                </p>

                <div className="bento-preview-widget">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="live-dot"></span>
                      <strong style={{ color: 'var(--text-main)', fontSize: '0.92rem' }}>Active Module: Further Maths Calculus</strong>
                    </div>
                    <span className="badge badge-emerald mono-accent">Progress: 68%</span>
                  </div>
                  <div style={{ background: 'rgba(125,125,125,0.12)', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
                    <div style={{ background: 'var(--secondary-gradient)', height: '100%', width: '68%' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <small style={{ color: 'var(--text-muted)' }} className="mono-accent">Lesson 4 of 6 • Integration by Parts</small>
                    <Link href="/classroom" className="btn btn-cyan btn-sm">Enter Virtual Classroom →</Link>
                  </div>
                </div>
              </div>

              {/* Card 2: 80% Teacher Revenue */}
              <div className="bento-card bento-span-1 glass-panel">
                <div className="bento-icon-badge" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)' }}>📈</div>
                <h3 className="bento-title">80% Teacher Revenue Share</h3>
                <p className="bento-desc">
                  We partner with passionate educators. Upload your courses, reach 45,000+ students, and receive automated weekly payouts directly to your bank account.
                </p>
                <div className="bento-preview-widget" style={{ textAlign: 'center' }}>
                  <small style={{ color: 'var(--text-muted)', textTransform: 'uppercase' }} className="mono-accent">150 Students @ $49/mo</small>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: '#059669', margin: '4px 0' }} className="mono-accent">
                    $5,880 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ mo</span>
                  </div>
                  <Link href="/teacher-portal" className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '10px' }}>
                    Register as a Teacher
                  </Link>
                </div>
              </div>

              {/* Card 3: Study Abroad Admissions */}
              <div className="bento-card bento-span-1 glass-panel">
                <div className="bento-icon-badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-gold)' }}>🌍</div>
                <h3 className="bento-title">Study Abroad Admissions</h3>
                <p className="bento-desc">
                  Full-cycle admissions guidance for universities in the USA, UK, Canada, and Europe. Fully & partially funded scholarships with study gap support.
                </p>
                <div className="bento-preview-widget">
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    <span className="badge badge-gold">USA</span>
                    <span className="badge badge-gold">UK</span>
                    <span className="badge badge-gold">Canada</span>
                    <span className="badge badge-gold">Europe</span>
                  </div>
                  <button type="button" className="btn btn-gold btn-sm" style={{ width: '100%' }} onClick={() => setIsConsultOpen(true)}>
                    Free Consultation →
                  </button>
                </div>
              </div>

              {/* Card 4: Certificate Verification */}
              <div className="bento-card bento-span-2 glass-panel">
                <div className="bento-icon-badge" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>📜</div>
                <h3 className="bento-title">Instant Digital Credential Verification</h3>
                <p className="bento-desc">
                  Universities, scholarship boards, and employers can verify student academic credentials and exam scores instantly using our decentralized verification engine.
                </p>

                <div className="bento-preview-widget" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    className="search-input"
                    style={{ flex: 1, minWidth: '220px', fontFamily: 'var(--font-mono)' }}
                    value={certIdInput}
                    onChange={(e) => setCertIdInput(e.target.value)}
                    placeholder="Credential ID (e.g. GLGC-2026-8842)"
                  />
                  <button type="button" className="btn btn-cyan btn-sm" onClick={() => handleVerifyCert(certIdInput)}>
                    Verify Credential
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Course Catalog Section */}
        <section className="catalog-section" id="courses">
          <div className="container">
            <div className="section-header">
              <div className="eyebrow-kicker">
                <span className="kicker-dot"></span>
                <span>Curricula & Syllabi</span>
              </div>
              <h2 className="section-title">Explore Our Premier Course Catalog</h2>
              <p className="section-desc">
                Engineered by Engr. Ajibade and verified subject specialists across STEM and Standardized Test Prep.
              </p>
            </div>

            {/* Search and Category Filters */}
            <div className="catalog-controls">
              <div className="search-and-sort">
                <div className="search-bar-wrap">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by topic, subject (e.g. Calculus, SAT, Organic Chemistry)..."
                  />
                </div>
              </div>

              <div className="category-pills">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    className={`pill-btn ${selectedCategory === cat.key ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.key)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses Grid */}
            <div className="courses-grid" id="coursesGrid">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    currency={currency}
                    onPreview={(c) => setSyllabusCourse(c)}
                    onEnroll={(c) => setCheckoutItem(c)}
                  />
                ))
              ) : (
                <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '60px 20px', color: 'var(--text-muted)' }}>
                  <h3>No courses matching "{searchQuery}"</h3>
                  <p>Try searching for Calculus, Physics, SAT, or clear your filters.</p>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} style={{ marginTop: '12px' }}>
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Study Abroad Section */}
        <section className="study-abroad-section" id="study-abroad">
          <div className="container">
            <div className="study-abroad-card glass-panel">
              <div>
                <div className="eyebrow-kicker" style={{ color: 'var(--accent-gold)' }}>
                  <span className="kicker-dot" style={{ background: 'var(--accent-gold)', boxShadow: '0 0 10px var(--accent-gold)' }}></span>
                  <span>Greater Light Global Consult (GLGC)</span>
                </div>
                <h2 style={{ fontSize: '2.3rem', margin: '12px 0', color: 'var(--text-main)' }}>
                  Dream to Study Abroad? We Make It Reality.
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.75', marginBottom: '22px' }}>
                  Beyond top exam prep, GLGC provides full-cycle international university admissions, scholarship securing, and visa processing support. Whether you have written SAT & IELTS or need waiver guidance, our advisors walk with you from application to campus arrival.
                </p>

                <div className="abroad-flag-pills">
                  <span className="flag-pill">🇺🇸 USA Universities</span>
                  <span className="flag-pill">🇬🇧 UK Universities</span>
                  <span className="flag-pill">🇨🇦 Canada Colleges</span>
                  <span className="flag-pill">🇪🇺 Europe & Others</span>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  <li>✓ <strong style={{ color: 'var(--text-main)' }}>Fully & Partially Funded Scholarships:</strong> Undergraduate and Master's degree awards.</li>
                  <li>✓ <strong style={{ color: 'var(--text-main)' }}>Study Gap Accepted:</strong> Tailored SOP and profile positioning to turn your dreams into reality.</li>
                  <li>✓ <strong style={{ color: 'var(--text-main)' }}>Flexible Payment Plans & Low Tuition:</strong> Direct partnerships with global institutions.</li>
                  <li>✓ <strong style={{ color: 'var(--text-main)' }}>Exam Coaching Included:</strong> High-scoring SAT & IELTS preparation right on this platform.</li>
                </ul>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn-gold" onClick={() => setIsConsultOpen(true)}>
                    Book Free Study Abroad Consultation
                  </button>
                  <a href="tel:08163776464" className="btn btn-outline">Call: 08163776464</a>
                </div>
              </div>

              {/* Flyers Showcase */}
              <div className="abroad-flyer-grid">
                <img src="/assets/images/sat_ielts_banner.png" alt="GLGC SAT and IELTS Classes Flyer" className="flyer-thumb" onClick={() => setIsConsultOpen(true)} />
                <img src="/assets/images/study_abroad_banner.png" alt="GLGC Study Abroad Flyer" className="flyer-thumb" onClick={() => setIsConsultOpen(true)} />
                <img src="/assets/images/admissions_banner.png" alt="International Admissions Flyer" className="flyer-thumb" onClick={() => setIsConsultOpen(true)} />
                <img src="/assets/images/studio_analytics.jpg" alt="GLGC Global Study Studio" className="flyer-thumb" onClick={() => setIsConsultOpen(true)} />
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Pricing Section */}
        <section className="pricing-section" id="pricing">
          <div className="container">
            <div className="section-header">
              <div className="eyebrow-kicker">
                <span className="kicker-dot"></span>
                <span>Simple, Transparent Pricing</span>
              </div>
              <h2 className="section-title">Invest in Your Academic Future</h2>
              <p className="section-desc">
                Subscribe for all-inclusive access to all courses, practice exams, and mentorship, or enroll in a single subject pass.
              </p>
            </div>

            {/* Billing Toggle */}
            <div className="pricing-billing-switch">
              <span>Monthly Billing</span>
              <div
                className={`switch-toggle ${isAnnual ? 'active' : ''}`}
                onClick={() => setIsAnnual(!isAnnual)}
                role="button"
                aria-label="Toggle annual billing discount"
              >
                <div className="switch-slider"></div>
              </div>
              <span>Annual Billing <strong style={{ color: 'var(--accent-emerald)', fontSize: '0.88rem' }} className="mono-accent">(Save 20%)</strong></span>
            </div>

            <div className="pricing-grid">
              {/* Single Subject Pass */}
              <div className="pricing-card glass-panel">
                <h3 className="plan-name">Single Subject Pass</h3>
                <p className="plan-target">Ideal for mastering 1 specific subject (e.g. Further Maths, Physics, or SAT)</p>
                <div className="plan-price-wrap">
                  <span className="plan-amount mono-accent">{priceSingle}</span>
                  <span className="plan-period">/month</span>
                </div>
                <ul className="plan-features-list">
                  <li><span className="plan-check">✓</span> Full curriculum & video lessons for 1 subject</li>
                  <li><span className="plan-check">✓</span> All module quizzes & practice assessments</li>
                  <li><span className="plan-check">✓</span> Downloadable formula sheets & lecture notes</li>
                  <li><span className="plan-check">✓</span> Course completion certificate</li>
                  <li><span className="plan-check">✓</span> Student discussion Q&A access</li>
                </ul>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setCheckoutItem({ id: 'single-pass', name: 'Single Subject Pass' })}
                >
                  Get Subject Pass
                </button>
              </div>

              {/* All-Access Bundle (Featured) */}
              <div className="pricing-card featured glass-panel">
                <span className="pricing-top-tag">Most Popular Plan</span>
                <h3 className="plan-name">All-Access STEM & Exam Bundle</h3>
                <p className="plan-target">Unrestricted access to all STEM disciplines + SAT, IELTS, GRE & GMAT</p>
                <div className="plan-price-wrap">
                  <span className="plan-amount mono-accent">{priceBundle}</span>
                  <span className="plan-period">/month</span>
                </div>
                <ul className="plan-features-list">
                  <li><span className="plan-check">✓</span> <strong>Unlimited access to ALL 11+ courses</strong></li>
                  <li><span className="plan-check">✓</span> Maths, Further Maths, Physics, Chemistry, Biology</li>
                  <li><span className="plan-check">✓</span> Complete SAT, IELTS, TOEFL, GRE, GMAT prep</li>
                  <li><span className="plan-check">✓</span> Weekly live doubt-clearing group office hours</li>
                  <li><span className="plan-check">✓</span> Graded diagnostic mock exams with answer keys</li>
                  <li><span className="plan-check">✓</span> Priority Q&A responses from instructors</li>
                </ul>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setCheckoutItem({ id: 'all-access', name: 'All-Access STEM & Exam Bundle' })}
                >
                  Join All-Access Now
                </button>
              </div>

              {/* Elite 1-on-1 Mentorship */}
              <div className="pricing-card glass-panel">
                <h3 className="plan-name">Elite 1-on-1 Mentorship</h3>
                <p className="plan-target">Direct private coaching with Engr. Ajibade + Study Abroad admissions</p>
                <div className="plan-price-wrap">
                  <span className="plan-amount mono-accent">{priceElite}</span>
                  <span className="plan-period">/month</span>
                </div>
                <ul className="plan-features-list">
                  <li><span className="plan-check">✓</span> Everything in All-Access Bundle included</li>
                  <li><span className="plan-check">✓</span> <strong>4 Private 1-on-1 live coaching sessions/mo</strong></li>
                  <li><span className="plan-check">✓</span> Personalized diagnostic roadmap & pacing plan</li>
                  <li><span className="plan-check">✓</span> Full Study Abroad & Scholarship application review</li>
                  <li><span className="plan-check">✓</span> Direct WhatsApp advisory line with Engr. Ajibade</li>
                </ul>
                <button
                  type="button"
                  className="btn btn-cyan"
                  onClick={() => setCheckoutItem({ id: 'elite-pass', name: 'Elite 1-on-1 Mentorship' })}
                >
                  Apply for Elite Mentorship
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Live Mentorship Section */}
        <section className="booking-section" id="mentorship">
          <div className="container">
            <div className="booking-card glass-panel">
              <div>
                <div className="eyebrow-kicker">
                  <span className="kicker-dot"></span>
                  <span>Live Diagnostic Sessions</span>
                </div>
                <h2 style={{ fontSize: '2.2rem', margin: '12px 0', color: 'var(--text-main)' }}>Book a 1-on-1 Strategy Session</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '24px' }}>
                  Schedule a dedicated 45-minute strategy call with Engr. Ajibade or a senior GLGC tutor to pinpoint your weak areas, review difficult problem sets, or formulate an exam score plan.
                </p>

                <form onSubmit={handleMentorshipSubmit}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '22px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: 600 }}>Your Full Name</label>
                      <input
                        type="text"
                        className="search-input"
                        style={{ borderRadius: 'var(--radius-md)' }}
                        placeholder="e.g. Oluwaseun Adeleke"
                        value={mentorName}
                        onChange={(e) => setMentorName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: 600 }}>Target Exam / Subject</label>
                      <select
                        className="search-input"
                        style={{ borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
                        value={mentorExam}
                        onChange={(e) => setMentorExam(e.target.value)}
                      >
                        <option value="SAT Strategy">Digital SAT Math & Verbal Strategy</option>
                        <option value="Further Maths">Further Mathematics & Advanced Calculus</option>
                        <option value="IELTS Band 8.5">IELTS Speaking & Writing Mock Drill</option>
                        <option value="GRE Quantitative">GRE Quantitative 168+ Target</option>
                        <option value="Physics/Chemistry">Physics / Chemistry Problem Clinic</option>
                        <option value="Study Abroad">Study Abroad & Scholarship Diagnostic</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: 600 }}>Available Time Slots (WAT / GMT+1)</label>
                      <div className="booking-slots-list">
                        {['10:00 AM - 10:45 AM', '01:00 PM - 01:45 PM', '04:30 PM - 05:15 PM', '07:00 PM - 07:45 PM'].map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            className={`slot-btn ${selectedSlot === slot ? 'active' : ''}`}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isBooking}>
                    {isBooking ? 'Confirming Session...' : 'Confirm & Book Live Session'}
                  </button>
                </form>
              </div>

              {/* Interactive Calendar Widget */}
              <div className="calendar-selector-wrap">
                <div className="cal-header">
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>October 2026 Session Slots</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }} className="mono-accent">Engr. Ajibade's Calendar</span>
                </div>

                <div className="cal-days-grid">
                  {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                    <div key={d} className="cal-day-name">{d}</div>
                  ))}

                  <div className="cal-day disabled">28</div>
                  <div className="cal-day disabled">29</div>
                  <div className="cal-day disabled">30</div>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map(day => (
                    <div
                      key={day}
                      className={`cal-day ${selectedDay === day ? 'active' : ''}`}
                      onClick={() => setSelectedDay(day)}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div style={{ background: 'rgba(125,125,125,0.06)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '18px', marginTop: '14px' }}>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    <strong style={{ color: 'var(--text-main)' }}>Selected Date:</strong> Tuesday, October {selectedDay}, 2026
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', marginTop: '4px' }} className="mono-accent">
                    ● 4 Openings with Engr. Ajibade
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Results & Verification Section */}
        <section className="results-section" id="results">
          <div className="container">
            <div className="section-header">
              <div className="eyebrow-kicker">
                <span className="kicker-dot"></span>
                <span>Verified Track Record</span>
              </div>
              <h2 className="section-title">Verified Student Score Improvements</h2>
              <p className="section-desc">
                Real results from scholars who transformed their exam scores and unlocked global scholarship opportunities.
              </p>
            </div>

            <div className="results-grid">
              <div className="testimonial-card glass-panel">
                <div className="testimonial-score-chip badge badge-gold mono-accent">SAT 1540 (From 1210)</div>
                <p className="testimonial-quote">
                  "Engr. Ajibade's Desmos shortcuts and Further Maths perspective completely changed how I tackled the Digital SAT Math module. I finished the test with 12 minutes to spare! Now headed to University of Michigan on scholarship."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar mono-accent">OB</div>
                  <div className="author-info">
                    <strong>Oluwaseun Bakare</strong>
                    <small>SAT Student • Class of 2026</small>
                  </div>
                </div>
              </div>

              <div className="testimonial-card glass-panel">
                <div className="testimonial-score-chip badge badge-cyan mono-accent">IELTS Band 8.5 (1st Attempt)</div>
                <p className="testimonial-quote">
                  "The GLGC IELTS masterclass gave me exact templates for Writing Task 2 and the 2-minute cue card system for Speaking. I got an overall 8.5 on my first attempt and secured my UK visa seamlessly!"
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar mono-accent" style={{ background: 'var(--secondary-gradient)' }}>AO</div>
                  <div className="author-info">
                    <strong>Amaka Okonkwo</strong>
                    <small>University of Manchester Scholar</small>
                  </div>
                </div>
              </div>

              <div className="testimonial-card glass-panel">
                <div className="testimonial-score-chip badge badge-emerald mono-accent">GRE 334 (Quant 170, Verbal 164)</div>
                <p className="testimonial-quote">
                  "As an engineering graduate applying for an MS in the US, I needed a near-perfect quant score. Engr. Ajibade's number theory and quantitative comparison drills are truly second to none."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar mono-accent" style={{ background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' }}>TE</div>
                  <div className="author-info">
                    <strong>Tunde Ejembi</strong>
                    <small>MS in Computer Science Candidate</small>
                  </div>
                </div>
              </div>

              <div className="testimonial-card glass-panel">
                <div className="testimonial-score-chip badge badge-pulse mono-accent">WASSCE A1 in Further Maths & Physics</div>
                <p className="testimonial-quote">
                  "I used to struggle with calculus and mechanics. Engr. Ajibade teaches with so much patience and engineering clarity that further mathematics became my favorite and strongest subject!"
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar mono-accent">FA</div>
                  <div className="author-info">
                    <strong>Fatima Al-Hassan</strong>
                    <small>Pre-Engineering Scholar</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Cert verification box */}
            <div className="cert-verify-box glass-panel">
              <div>
                <h4 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '6px' }}>Instant Certificate Verification Portal</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Employers, universities, and sponsors can verify authentic GLGC credentials in real time.</p>
              </div>
              <div className="cert-input-wrap">
                <input
                  type="text"
                  className="search-input"
                  style={{ borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)' }}
                  placeholder="Enter Credential ID (e.g. GLGC-2026-8842)"
                  value={certIdInput}
                  onChange={(e) => setCertIdInput(e.target.value)}
                />
                <button type="button" className="btn btn-cyan btn-sm" onClick={() => handleVerifyCert(certIdInput)}>
                  Verify Credential
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* FAQ Section */}
        <section className="faq-section" id="faq">
          <div className="container">
            <div className="section-header">
              <div className="eyebrow-kicker">
                <span className="kicker-dot"></span>
                <span>Common Inquiries</span>
              </div>
              <h2 className="section-title">Everything You Need to Know</h2>
              <p className="section-desc">Clear answers for students, parents, and educators joining GLGC Academy.</p>
            </div>

            <div className="faq-list">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`faq-item ${openFaq === idx ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-icon">{openFaq === idx ? '−' : '+'}</span>
                  </button>
                  {openFaq === idx && (
                    <div className="faq-answer">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Quick Support */}
      <a
        href="https://wa.me/2348050367351?text=Hello%20Engr.%20Ajibade,%20I%20would%20like%20to%20inquire%20about%20Greater%20Light%20Academy"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        title="Chat with Director Engr. Ajibade on WhatsApp"
        aria-label="WhatsApp Support"
      >
        <div className="floating-whatsapp-pulse"></div>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.071.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.514 0-10 4.486-10 10 0 1.761.458 3.417 1.258 4.862l-1.332 4.869 4.997-1.31c1.401.767 3.003 1.202 4.707 1.202 5.514 0 10-4.486 10-10 0-5.514-4.486-10-10-10z"/>
        </svg>
      </a>

      {/* Modals */}
      <SyllabusModal
        isOpen={!!syllabusCourse}
        course={syllabusCourse}
        onClose={() => setSyllabusCourse(null)}
        onEnroll={(c) => {
          setSyllabusCourse(null);
          setCheckoutItem(c);
        }}
      />

      <CheckoutModal
        isOpen={!!checkoutItem}
        item={checkoutItem}
        currency={currency}
        onClose={() => setCheckoutItem(null)}
      />

      <ConsultModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />

      <CertModal
        isOpen={!!certData}
        certData={certData}
        onClose={() => setCertData(null)}
      />

      <LegalModal
        isOpen={!!legalType}
        type={legalType || 'privacy'}
        onClose={() => setLegalType(null)}
      />

      <Footer onOpenLegal={(type) => setLegalType(type)} />
    </>
  );
}

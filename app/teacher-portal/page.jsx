'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createCourse } from '@/lib/api-client';
import { showNotification } from '@/components/Toast';

export default function TeacherPortalPage() {
  const [currency, setCurrency] = useState('USD');

  // Calculator State
  const [studentCount, setStudentCount] = useState(150);
  const [coursePrice, setCoursePrice] = useState(49);

  // Wizard State
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Ile-Ife',
    bio: '',
    subjects: ['Further Maths', 'SAT'],
    yearsExperience: '5-10 Years',
    qualification: "Master's Degree / B.Sc Civil Engineering",
    payoutBank: 'Guaranty Trust Bank (GTBank)',
    accountNumber: '',
    accountName: '',
    agreeTerms: true
  });
  const [isSubmittingWizard, setIsSubmittingWizard] = useState(false);
  const [wizardSuccess, setWizardSuccess] = useState(false);

  // Course Studio State
  const [studioTitle, setStudioTitle] = useState('');
  const [studioSubject, setStudioSubject] = useState('Further Maths');
  const [studioPriceUSD, setStudioPriceUSD] = useState(49);
  const [studioPriceNGN, setStudioPriceNGN] = useState(35000);
  const [studioLessons, setStudioLessons] = useState([
    { title: 'Foundational Principles & Mechanics', duration: '45 min' },
    { title: 'Advanced Exam Elimination Shortcuts', duration: '55 min' }
  ]);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [isPublishingCourse, setIsPublishingCourse] = useState(false);

  // Calculations for 80% Revenue Share
  const grossMonthly = studentCount * coursePrice;
  const teacherPayout = Math.round(grossMonthly * 0.8);
  const academyCut = Math.round(grossMonthly * 0.2);
  const annualPayout = teacherPayout * 12;

  const formatMoney = (val) => {
    return currency === 'NGN'
      ? `₦${(val * 750).toLocaleString()}`
      : `$${val.toLocaleString()}`;
  };

  const handleSubjectToggle = (subj) => {
    const list = [...wizardData.subjects];
    const idx = list.indexOf(subj);
    if (idx >= 0) list.splice(idx, 1);
    else list.push(subj);
    setWizardData({ ...wizardData, subjects: list });
  };

  const handleWizardSubmit = (e) => {
    e.preventDefault();
    if (!wizardData.fullName || !wizardData.email) {
      showNotification('Please fill in your name and email', 'warning');
      return;
    }

    setIsSubmittingWizard(true);
    setTimeout(() => {
      setIsSubmittingWizard(false);
      setWizardSuccess(true);
      showNotification('Educator application submitted! Academic committee will review within 24 hours.', 'success', 6000);
    }, 1200);
  };

  const handleAddLesson = () => {
    if (!newLessonTitle.trim()) return;
    setStudioLessons([...studioLessons, { title: newLessonTitle.trim(), duration: '45 min' }]);
    setNewLessonTitle('');
  };

  const handlePublishCourse = async (e) => {
    e.preventDefault();
    if (!studioTitle.trim()) {
      showNotification('Please enter a course title', 'warning');
      return;
    }

    setIsPublishingCourse(true);
    try {
      const res = await createCourse({
        title: studioTitle,
        subject: studioSubject,
        instructor: wizardData.fullName || 'Certified GLGC Educator',
        priceUSD: studioPriceUSD,
        priceNGN: studioPriceNGN,
        lessons: studioLessons,
        description: `Comprehensive ${studioSubject} mastery curriculum developed by faculty educator on Greater Light Studio.`
      });

      if (res && res.success) {
        showNotification(res.message || 'Course published to Greater Light Academy!', 'success', 6000);
        setStudioTitle('');
      }
    } catch (_) {
      showNotification('Failed to publish course. Please try again.', 'error');
    } finally {
      setIsPublishingCourse(false);
    }
  };

  return (
    <>
      <Navbar activeCurrency={currency} onCurrencyChange={setCurrency} />

      <main>
        {/* Teacher Hero Section */}
        <section className="teacher-hero-section">
          <div className="container teacher-hero-grid">
            <div>
              <div className="eyebrow-kicker" style={{ color: 'var(--accent-purple)' }}>
                <span className="kicker-dot" style={{ background: 'var(--accent-purple)', boxShadow: '0 0 10px var(--accent-purple)' }}></span>
                <span>Educator Partnership Hub</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 6.8vw, 2.8rem)', color: 'var(--text-main)', margin: '14px 0 18px', lineHeight: 1.18 }}>
                Teach With Greater Light. <br />
                Earn an <span className="gradient-gold">80% Revenue Share</span>.
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.75', marginBottom: '28px' }}>
                Join Director Engr. Ajibade Opeyemi Phillip in democratizing premier STEM education and international exam coaching. Publish video curricula, mentor ambitious scholars across Nigeria and worldwide, and enjoy weekly automated bank payouts.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a href="#wizard" className="btn btn-primary btn-lg">Apply as Educator</a>
                <a href="#calculator" className="btn btn-outline btn-lg">Calculate Earnings</a>
              </div>

              <div className="hero-trust-bar" style={{ marginTop: '36px' }}>
                <div className="trust-item">
                  <span className="trust-number mono-accent">80%</span>
                  <span className="trust-label">Educator Payout</span>
                </div>
                <div className="trust-item">
                  <span className="trust-number mono-accent">Weekly</span>
                  <span className="trust-label">Disbursement</span>
                </div>
                <div className="trust-item">
                  <span className="trust-number mono-accent">45k+</span>
                  <span className="trust-label">Global Scholars</span>
                </div>
              </div>
            </div>

            {/* Interactive 80% Earnings Calculator */}
            <div id="calculator" className="calculator-card">
              <div className="calc-title">
                <span style={{ fontSize: '1.6rem' }}>📈</span>
                <span>80% Educator Earnings Calculator</span>
              </div>

              <div className="calc-field-group">
                <div className="calc-label-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Active Enrolled Students:</span>
                  <strong className="mono-accent" style={{ color: 'var(--accent-cyan)' }}>{studentCount} Students</strong>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={studentCount}
                  onChange={(e) => setStudentCount(parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary-glow)' }}
                />
              </div>

              <div className="calc-field-group" style={{ marginTop: '20px' }}>
                <div className="calc-label-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Course Tuition (per student / mo):</span>
                  <strong className="mono-accent" style={{ color: '#34d399' }}>{formatMoney(coursePrice)}</strong>
                </div>
                <input
                  type="range"
                  min="15"
                  max="150"
                  step="5"
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer', accentColor: '#10b981' }}
                />
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '20px', marginTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Monthly Gross Revenue:</span>
                  <span className="mono-accent" style={{ color: '#fff' }}>{formatMoney(grossMonthly)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>GLGC Infrastructure & Hosting (20%):</span>
                  <span className="mono-accent" style={{ color: 'var(--text-dim)' }}>- {formatMoney(academyCut)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '14px' }}>
                  <div>
                    <span style={{ color: '#cbd5e1', fontSize: '0.92rem', fontWeight: 600 }}>Your 80% Payout:</span>
                    <small style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.75rem' }}>Direct Bank Transfer Every Friday</small>
                  </div>
                  <strong className="mono-accent" style={{ fontSize: '1.9rem', color: '#34d399' }}>
                    {formatMoney(teacherPayout)} <small style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/mo</small>
                  </strong>
                </div>
                <div style={{ textAlign: 'right', marginTop: '6px' }}>
                  <span className="mono-accent" style={{ fontSize: '0.85rem', color: 'var(--accent-gold)' }}>
                    {formatMoney(annualPayout)} Annual Projection
                  </span>
                </div>
              </div>

              <a href="#wizard" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                Start Teaching & Earn 80% →
              </a>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Educator Onboarding Wizard Section */}
        <section className="wizard-section" id="wizard" style={{ padding: '60px 0' }}>
          <div className="container">
            <div className="section-header">
              <div className="eyebrow-kicker">
                <span className="kicker-dot"></span>
                <span>Fast Onboarding</span>
              </div>
              <h2 className="section-title">Apply to Join GLGC Faculty</h2>
              <p className="section-desc">
                Three simple steps to publish your masterclass and start earning.
              </p>
            </div>

            <div className="wizard-card glass-panel" style={{ maxWidth: '780px', margin: '0 auto', padding: '36px', borderRadius: 'var(--radius-xl)' }}>
              {/* Step indicator */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', position: 'relative' }}>
                {[
                  { step: 1, label: '1. Bio & Contact' },
                  { step: 2, label: '2. Specialization' },
                  { step: 3, label: '3. Payout Details' }
                ].map(s => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setCurrentStep(s.step)}
                    style={{
                      background: currentStep >= s.step ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
                      color: currentStep >= s.step ? '#fff' : 'var(--text-dim)',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      padding: '8px 18px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {wizardSuccess ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <span style={{ fontSize: '3.5rem' }}>🎉</span>
                  <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: '14px 0 8px' }}>Application Received!</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 24px' }}>
                    Welcome to the GLGC Educator Network, <strong>{wizardData.fullName}</strong>. Academic Director <strong>Engr. Ajibade</strong> will review your profile within 24 hours. You can already build your course in the Studio below!
                  </p>
                  <a href="#studio" className="btn btn-primary btn-sm">Jump to Course Studio ↓</a>
                </div>
              ) : (
                <form onSubmit={handleWizardSubmit}>
                  {/* Step 1 */}
                  {currentStep === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <h4 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '6px' }}>Personal Profile & Credentials</h4>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Full Name</label>
                        <input
                          type="text"
                          className="search-input"
                          style={{ borderRadius: 'var(--radius-md)' }}
                          placeholder="e.g. Dr. Emmanuel Adeyemi"
                          value={wizardData.fullName}
                          onChange={(e) => setWizardData({ ...wizardData, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Email Address</label>
                          <input
                            type="email"
                            className="search-input"
                            style={{ borderRadius: 'var(--radius-md)' }}
                            placeholder="emmanuel@example.com"
                            value={wizardData.email}
                            onChange={(e) => setWizardData({ ...wizardData, email: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>WhatsApp Phone</label>
                          <input
                            type="tel"
                            className="search-input"
                            style={{ borderRadius: 'var(--radius-md)' }}
                            placeholder="08012345678"
                            value={wizardData.phone}
                            onChange={(e) => setWizardData({ ...wizardData, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Short Educator Bio & Teaching Philosophy</label>
                        <textarea
                          className="search-input"
                          style={{ borderRadius: 'var(--radius-md)', minHeight: '80px', fontFamily: 'inherit' }}
                          placeholder="Tell us about your teaching experience, university background, and why you love teaching calculation or exam prep..."
                          value={wizardData.bio}
                          onChange={(e) => setWizardData({ ...wizardData, bio: e.target.value })}
                        />
                      </div>
                      <button type="button" className="btn btn-primary" onClick={() => setCurrentStep(2)} style={{ alignSelf: 'flex-end', marginTop: '12px' }}>
                        Continue to Step 2 →
                      </button>
                    </div>
                  )}

                  {/* Step 2 */}
                  {currentStep === 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <h4 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '6px' }}>Subject Specialization & Teaching Experience</h4>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '8px', fontWeight: 600 }}>Subjects You Wish to Teach:</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {['Pure Mathematics', 'Further Maths', 'Physics', 'Chemistry', 'Biology', 'English', 'Digital SAT', 'IELTS', 'TOEFL', 'GRE Quant', 'GMAT Focus'].map(s => {
                            const isSel = wizardData.subjects.includes(s);
                            return (
                              <button
                                key={s}
                                type="button"
                                onClick={() => handleSubjectToggle(s)}
                                style={{
                                  background: isSel ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255,255,255,0.04)',
                                  border: `1px solid ${isSel ? 'var(--primary-glow)' : 'var(--border-glass)'}`,
                                  color: isSel ? '#fff' : 'var(--text-muted)',
                                  borderRadius: 'var(--radius-sm)',
                                  padding: '8px 14px',
                                  fontSize: '0.85rem',
                                  cursor: 'pointer'
                                }}
                              >
                                {isSel ? '✓ ' : ''}{s}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '8px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Years of Classroom / Online Experience</label>
                          <select
                            className="search-input"
                            style={{ borderRadius: 'var(--radius-md)', background: '#0c1222' }}
                            value={wizardData.yearsExperience}
                            onChange={(e) => setWizardData({ ...wizardData, yearsExperience: e.target.value })}
                          >
                            <option value="1-3 Years">1 - 3 Years</option>
                            <option value="3-5 Years">3 - 5 Years</option>
                            <option value="5-10 Years">5 - 10 Years</option>
                            <option value="10+ Years">10+ Years</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Highest Qualification</label>
                          <input
                            type="text"
                            className="search-input"
                            style={{ borderRadius: 'var(--radius-md)' }}
                            value={wizardData.qualification}
                            onChange={(e) => setWizardData({ ...wizardData, qualification: e.target.value })}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px' }}>
                        <button type="button" className="btn btn-outline" onClick={() => setCurrentStep(1)}>
                          ← Back
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => setCurrentStep(3)}>
                          Continue to Step 3 →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3 */}
                  {currentStep === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <h4 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '6px' }}>Payout Details & 80% Revenue Share Terms</h4>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Bank Name (Nigeria or International)</label>
                        <input
                          type="text"
                          className="search-input"
                          style={{ borderRadius: 'var(--radius-md)' }}
                          value={wizardData.payoutBank}
                          onChange={(e) => setWizardData({ ...wizardData, payoutBank: e.target.value })}
                          placeholder="e.g. GTBank, Zenith, Access, or PayPal / Wire"
                          required
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Account / NUBAN Number</label>
                          <input
                            type="text"
                            className="search-input mono-accent"
                            style={{ borderRadius: 'var(--radius-md)' }}
                            placeholder="0123456789"
                            value={wizardData.accountNumber}
                            onChange={(e) => setWizardData({ ...wizardData, accountNumber: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Account Name</label>
                          <input
                            type="text"
                            className="search-input"
                            style={{ borderRadius: 'var(--radius-md)' }}
                            placeholder="Account holder name"
                            value={wizardData.accountName}
                            onChange={(e) => setWizardData({ ...wizardData, accountName: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '14px', borderRadius: 'var(--radius-sm)', marginTop: '8px' }}>
                        <label style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', fontSize: '0.86rem', color: '#e2e8f0' }}>
                          <input
                            type="checkbox"
                            checked={wizardData.agreeTerms}
                            onChange={(e) => setWizardData({ ...wizardData, agreeTerms: e.target.checked })}
                            required
                          />
                          <span>I agree to the GLGC Educator 80% Revenue Share Terms and Academic Integrity Standards.</span>
                        </label>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px' }}>
                        <button type="button" className="btn btn-outline" onClick={() => setCurrentStep(2)}>
                          ← Back
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isSubmittingWizard}>
                          {isSubmittingWizard ? 'Submitting Application...' : 'Submit Faculty Application'}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Course Studio Syllabus Builder Section */}
        <section className="studio-section" id="studio" style={{ padding: '60px 0' }}>
          <div className="container">
            <div className="section-header">
              <div className="eyebrow-kicker">
                <span className="kicker-dot"></span>
                <span>Course Studio</span>
              </div>
              <h2 className="section-title">Publish Your Course to Greater Light Academy</h2>
              <p className="section-desc">
                Construct your curriculum syllabus, add lesson titles, and publish directly to our live course catalog.
              </p>
            </div>

            <div className="glass-panel" style={{ maxWidth: '820px', margin: '0 auto', padding: '36px', borderRadius: 'var(--radius-xl)' }}>
              <form onSubmit={handlePublishCourse}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Course Title</label>
                    <input
                      type="text"
                      className="search-input"
                      style={{ borderRadius: 'var(--radius-md)' }}
                      placeholder="e.g. AP Physics Mechanics: Rotational Dynamics & Energy"
                      value={studioTitle}
                      onChange={(e) => setStudioTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Subject Track</label>
                      <select
                        className="search-input"
                        style={{ borderRadius: 'var(--radius-md)', background: '#0c1222' }}
                        value={studioSubject}
                        onChange={(e) => setStudioSubject(e.target.value)}
                      >
                        <option value="Mathematics">Mathematics</option>
                        <option value="Further Maths">Further Maths</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="English">English</option>
                        <option value="SAT">SAT Prep</option>
                        <option value="IELTS">IELTS Prep</option>
                        <option value="GRE">GRE General</option>
                        <option value="GMAT">GMAT Focus</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Price in USD ($)</label>
                      <input
                        type="number"
                        className="search-input mono-accent"
                        style={{ borderRadius: 'var(--radius-md)' }}
                        value={studioPriceUSD}
                        onChange={(e) => setStudioPriceUSD(parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Price in NGN (₦)</label>
                      <input
                        type="number"
                        className="search-input mono-accent"
                        style={{ borderRadius: 'var(--radius-md)' }}
                        value={studioPriceNGN}
                        onChange={(e) => setStudioPriceNGN(parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  {/* Lessons Builder */}
                  <div style={{ marginTop: '10px' }}>
                    <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '8px', fontWeight: 600 }}>
                      Course Lessons ({studioLessons.length} Added):
                    </label>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                      {studioLessons.map((les, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--border-glass)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '10px 14px'
                          }}
                        >
                          <span style={{ fontSize: '0.88rem', color: '#e2e8f0' }}>
                            {idx + 1}. {les.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...studioLessons];
                              updated.splice(idx, 1);
                              setStudioLessons(updated);
                            }}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem' }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="text"
                        className="search-input"
                        style={{ flex: 1, borderRadius: 'var(--radius-md)' }}
                        placeholder="Add new lesson title (e.g. Center of Mass & Moment of Inertia)..."
                        value={newLessonTitle}
                        onChange={(e) => setNewLessonTitle(e.target.value)}
                      />
                      <button type="button" className="btn btn-outline btn-sm" onClick={handleAddLesson}>
                        + Add Lesson
                      </button>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px', marginTop: '14px' }}>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{ width: '100%' }}
                      disabled={isPublishingCourse}
                    >
                      {isPublishingCourse ? 'Publishing Course to Academy...' : 'Publish Course to Greater Light Academy'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar({ activeCurrency, onCurrencyChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [persona, setPersona] = useState('students');
  const [drawerTab, setDrawerTab] = useState('students');

  useEffect(() => {
    const saved = localStorage.getItem('glgc_theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);

    const savedPersona = localStorage.getItem('glgc_nav_persona') || 'students';
    setPersona(savedPersona);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('glgc_theme', next);
  };

  const handlePersonaChange = (newPersona) => {
    setPersona(newPersona);
    setDrawerTab(newPersona);
    localStorage.setItem('glgc_nav_persona', newPersona);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="site-header" id="mainHeader">
        <div className="container nav-wrap">
          <Link href="/" className="brand-logo" aria-label="GLGC Academy Homepage">
            <div className="brand-icon">GL</div>
            <div className="brand-text">
              <span className="brand-title">GREATER LIGHT <span>ACADEMY</span></span>
              <span className="brand-subtitle">Global Consult & STEM School</span>
            </div>
          </Link>

          {/* Central Dual-Persona Role Switcher */}
          <div className="role-segmented-switcher" role="tablist" aria-label="Audience Switcher">
            <button
              type="button"
              className={`role-pill-btn ${persona === 'students' ? 'active' : ''}`}
              onClick={() => handlePersonaChange('students')}
              role="tab"
              aria-selected={persona === 'students'}
            >
              <span className="role-icon">🎓</span>
              <span className="role-text">For Students</span>
            </button>
            <button
              type="button"
              className={`role-pill-btn ${persona === 'teachers' ? 'active teacher-active' : ''}`}
              onClick={() => handlePersonaChange('teachers')}
              role="tab"
              aria-selected={persona === 'teachers'}
            >
              <span className="role-icon">👨‍🏫</span>
              <span className="role-text">For Teachers</span>
              <span className="role-badge">80% Payout</span>
            </button>
          </div>

          {/* Desktop Navigation Links: Students */}
          {persona === 'students' && (
            <ul className="nav-role-group active" id="navRoleStudents">
              <li><Link href="/#courses">Explore Courses</Link></li>
              <li>
                <Link href="/classroom" style={{ color: '#34d399', fontWeight: '700' }}>
                  <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981', marginRight: '4px' }}></span>
                  Classroom
                </Link>
              </li>
              <li><Link href="/#study-abroad">Study Abroad</Link></li>
              <li><Link href="/#mentorship">Mentorship</Link></li>
              <li><Link href="/#pricing">Tuition</Link></li>
            </ul>
          )}

          {/* Desktop Navigation Links: Teachers */}
          {persona === 'teachers' && (
            <ul className="nav-role-group active" id="navRoleTeachers">
              <li><Link href="/teacher-portal#calculator">💰 80% Calculator</Link></li>
              <li><Link href="/teacher-portal#wizard">📝 Apply as Teacher</Link></li>
              <li><Link href="/teacher-portal#wizard">🛠️ Course Studio</Link></li>
              <li><Link href="/teacher-portal#benefits">🏆 Benefits</Link></li>
              <li><Link href="/classroom" style={{ color: 'var(--accent-cyan)' }}>Student Preview</Link></li>
            </ul>
          )}

          {/* Nav Actions & Currency Switcher */}
          <div className="nav-actions">
            <button
              type="button"
              id="themeToggleBtn"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle Bright / Dark Mode"
              title="Toggle Bright / Dark Mode"
            >
              <span className="theme-toggle-icon">{theme === 'light' ? '☀️' : '🌙'}</span>
              <span>{theme === 'light' ? 'Bright' : 'Dark'}</span>
            </button>

            {onCurrencyChange && (
              <div className="currency-toggle" title="Switch Currency">
                <button
                  type="button"
                  id="curr-usd"
                  className={`curr-btn ${activeCurrency === 'USD' ? 'active' : ''}`}
                  onClick={() => onCurrencyChange('USD')}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  id="curr-ngn"
                  className={`curr-btn ${activeCurrency === 'NGN' ? 'active' : ''}`}
                  onClick={() => onCurrencyChange('NGN')}
                >
                  NGN (₦)
                </button>
              </div>
            )}

            {persona === 'students' ? (
              <Link href="/classroom" className="btn btn-outline btn-sm" id="navClassroomBtn">
                Student Classroom
              </Link>
            ) : (
              <Link href="/teacher-portal#wizard" className="btn btn-primary btn-sm" id="navTeachBtn" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' }}>
                Join Faculty (80%)
              </Link>
            )}

            <button
              type="button"
              className="menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              &#9776;
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
        style={{ display: mobileMenuOpen ? 'block' : 'none' }}
      ></div>

      {/* Mobile Navigation Drawer */}
      <aside
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation Drawer"
      >
        <div className="mobile-drawer-head">
          <div className="brand-logo">
            <div className="brand-icon" style={{ width: '38px', height: '38px', fontSize: '1.1rem' }}>GL</div>
            <div className="brand-text">
              <span className="brand-title" style={{ fontSize: '1.05rem' }}>GREATER LIGHT</span>
              <span className="brand-subtitle" style={{ fontSize: '0.68rem' }}>ONLINE ACADEMY</span>
            </div>
          </div>
          <button className="mobile-drawer-close" onClick={closeMobileMenu} aria-label="Close navigation">
            &times;
          </button>
        </div>

        {/* Quick Role Action Cards */}
        <div className="drawer-quick-cards">
          <Link href="/classroom" onClick={closeMobileMenu} className="drawer-card drawer-card-student">
            <span className="drawer-card-icon">🎓</span>
            <span className="drawer-card-title">Student Portal</span>
            <span className="drawer-card-sub">Classroom & Quizzes &rarr;</span>
          </Link>
          <Link href="/teacher-portal" onClick={closeMobileMenu} className="drawer-card drawer-card-teacher">
            <span className="drawer-card-icon">💼</span>
            <span className="drawer-card-title">Teacher Portal</span>
            <span className="drawer-card-sub">Earn 80% Payout &rarr;</span>
          </Link>
        </div>

        {/* Segmented Mobile Drawer Role Tabs */}
        <div className="drawer-role-tabs">
          <button
            type="button"
            className={`drawer-tab-btn ${drawerTab === 'students' ? 'active' : ''}`}
            onClick={() => setDrawerTab('students')}
          >
            🎓 Students
          </button>
          <button
            type="button"
            className={`drawer-tab-btn ${drawerTab === 'teachers' ? 'active teacher-tab' : ''}`}
            onClick={() => setDrawerTab('teachers')}
          >
            👨‍🏫 Teachers
          </button>
          <button
            type="button"
            className={`drawer-tab-btn ${drawerTab === 'academy' ? 'active' : ''}`}
            onClick={() => setDrawerTab('academy')}
          >
            🏛️ Academy
          </button>
        </div>

        {/* Drawer Pane: Students */}
        {drawerTab === 'students' && (
          <div className="drawer-pane active">
            <Link href="/#courses" onClick={closeMobileMenu} className="drawer-nav-item">
              <div className="drawer-nav-icon">📚</div>
              <div className="drawer-nav-text">
                <span className="drawer-nav-title">All 11 Courses</span>
                <span className="drawer-nav-desc">Pure Maths, SAT, Further Maths</span>
              </div>
            </Link>
            <Link href="/classroom" onClick={closeMobileMenu} className="drawer-nav-item">
              <div className="drawer-nav-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>💻</div>
              <div className="drawer-nav-text">
                <span className="drawer-nav-title">Virtual Classroom</span>
                <span className="drawer-nav-desc">Interactive Lectures & Notes</span>
              </div>
              <span className="drawer-badge emerald">Live</span>
            </Link>
            <Link href="/#study-abroad" onClick={closeMobileMenu} className="drawer-nav-item">
              <div className="drawer-nav-icon">🌍</div>
              <div className="drawer-nav-text">
                <span className="drawer-nav-title">Study Abroad Admissions</span>
                <span className="drawer-nav-desc">US, UK, Canada & Europe</span>
              </div>
            </Link>
            <Link href="/#mentorship" onClick={closeMobileMenu} className="drawer-nav-item">
              <div className="drawer-nav-icon">📅</div>
              <div className="drawer-nav-text">
                <span className="drawer-nav-title">Live 1-on-1 Mentorship</span>
                <span className="drawer-nav-desc">Personalized sessions</span>
              </div>
            </Link>
            <Link href="/#pricing" onClick={closeMobileMenu} className="drawer-nav-item">
              <div className="drawer-nav-icon">💳</div>
              <div className="drawer-nav-text">
                <span className="drawer-nav-title">Tuition & Subscriptions</span>
                <span className="drawer-nav-desc">All-access learning passes</span>
              </div>
            </Link>
          </div>
        )}

        {/* Drawer Pane: Teachers */}
        {drawerTab === 'teachers' && (
          <div className="drawer-pane active">
            <Link href="/teacher-portal#calculator" onClick={closeMobileMenu} className="drawer-nav-item">
              <div className="drawer-nav-icon">💰</div>
              <div className="drawer-nav-text">
                <span className="drawer-nav-title">80% Revenue Calculator</span>
                <span className="drawer-nav-desc">Weekly payouts estimator</span>
              </div>
              <span className="drawer-badge purple">80%</span>
            </Link>
            <Link href="/teacher-portal#wizard" onClick={closeMobileMenu} className="drawer-nav-item">
              <div className="drawer-nav-icon">📝</div>
              <div className="drawer-nav-text">
                <span className="drawer-nav-title">Educator Wizard</span>
                <span className="drawer-nav-desc">Apply to join faculty</span>
              </div>
            </Link>
            <Link href="/teacher-portal#wizard" onClick={closeMobileMenu} className="drawer-nav-item">
              <div className="drawer-nav-icon">🛠️</div>
              <div className="drawer-nav-text">
                <span className="drawer-nav-title">Course Studio</span>
                <span className="drawer-nav-desc">Publish lessons & decks</span>
              </div>
            </Link>
            <Link href="/teacher-portal#benefits" onClick={closeMobileMenu} className="drawer-nav-item">
              <div className="drawer-nav-icon">🏆</div>
              <div className="drawer-nav-text">
                <span className="drawer-nav-title">Faculty Benefits</span>
                <span className="drawer-nav-desc">Direct bank deposits</span>
              </div>
            </Link>
          </div>
        )}

        {/* Drawer Pane: Academy */}
        {drawerTab === 'academy' && (
          <div className="drawer-pane active">
            <Link href="/#founder" onClick={closeMobileMenu} className="drawer-nav-item">
              <div className="drawer-nav-icon">👨‍💼</div>
              <div className="drawer-nav-text">
                <span className="drawer-nav-title">Director Engr. Ajibade</span>
                <span className="drawer-nav-desc">Academic leadership</span>
              </div>
            </Link>
            <Link href="/#bento-core" onClick={closeMobileMenu} className="drawer-nav-item">
              <div className="drawer-nav-icon">🌐</div>
              <div className="drawer-nav-text">
                <span className="drawer-nav-title">Platform Ecosystem</span>
                <span className="drawer-nav-desc">Pedagogy & structure</span>
              </div>
            </Link>
            <Link href="/#faq" onClick={closeMobileMenu} className="drawer-nav-item">
              <div className="drawer-nav-icon">❓</div>
              <div className="drawer-nav-text">
                <span className="drawer-nav-title">FAQs & Contact</span>
                <span className="drawer-nav-desc">Help desk</span>
              </div>
            </Link>
          </div>
        )}

        <div className="mobile-drawer-actions">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
            aria-label="Toggle Bright / Dark Mode"
          >
            <span className="theme-toggle-icon">{theme === 'light' ? '☀️' : '🌙'}</span>
            <span>{theme === 'light' ? 'Bright Theme' : 'Dark Theme'}</span>
          </button>
        </div>
      </aside>

      {/* Mobile App Bottom Navigation Dock (Sticky on Mobile & Tablets) */}
      <nav className="mobile-bottom-dock" aria-label="Mobile Navigation Dock">
        <Link href="/" className="dock-item active">
          <svg className="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span className="dock-label">Home</span>
        </Link>
        <Link href="/#courses" className="dock-item">
          <svg className="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          <span className="dock-label">Courses</span>
        </Link>
        <Link href="/classroom" className="dock-item dock-classroom">
          <div className="dock-icon-wrap">
            <svg className="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
            <span className="dock-badge-dot"></span>
          </div>
          <span className="dock-label">Classroom</span>
        </Link>
        <Link href="/teacher-portal" className="dock-item dock-teacher">
          <div className="dock-icon-wrap">
            <svg className="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span className="dock-badge-pill">80%</span>
          </div>
          <span className="dock-label">Teach</span>
        </Link>
        <button type="button" className="dock-item" onClick={toggleMobileMenu} aria-label="Open Full Navigation Menu">
          <svg className="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          <span className="dock-label">Menu</span>
        </button>
      </nav>
    </>
  );
}

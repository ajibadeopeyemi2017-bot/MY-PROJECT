'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar({ activeCurrency, onCurrencyChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('glgc_theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('glgc_theme', next);
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

          {/* Desktop Navigation Links */}
          <ul className="nav-links" id="navLinks">
            <li><Link href="/#courses">Courses</Link></li>
            <li><Link href="/#founder">Founder</Link></li>
            <li><Link href="/#bento-core">Platform</Link></li>
            <li><Link href="/#study-abroad">Study Abroad</Link></li>
            <li><Link href="/#pricing">Subscriptions</Link></li>
            <li><Link href="/#mentorship">Live Mentorship</Link></li>
            <li>
              <Link href="/teacher-portal" style={{ color: '#c084fc', fontWeight: '700' }}>
                For Teachers ★
              </Link>
            </li>
          </ul>

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

            <Link href="/classroom" className="btn btn-outline btn-sm" id="navClassroomBtn">
              Student Classroom
            </Link>
            <Link href="/teacher-portal" className="btn btn-primary btn-sm" id="navTeachBtn">
              Teach With Us
            </Link>

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

        <ul className="mobile-nav-list">
          <li><Link href="/#courses" onClick={closeMobileMenu}>Explore Courses</Link></li>
          <li><Link href="/#founder" onClick={closeMobileMenu}>About Engr. Ajibade</Link></li>
          <li><Link href="/#bento-core" onClick={closeMobileMenu}>Platform Ecosystem</Link></li>
          <li><Link href="/#study-abroad" onClick={closeMobileMenu}>Study Abroad Admissions</Link></li>
          <li><Link href="/#pricing" onClick={closeMobileMenu}>Subscriptions & Fees</Link></li>
          <li><Link href="/#mentorship" onClick={closeMobileMenu}>Live Mentorship</Link></li>
          <li>
            <Link href="/teacher-portal" onClick={closeMobileMenu} style={{ color: '#c084fc' }}>
              For Teachers (80% Payout) ★
            </Link>
          </li>
        </ul>

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
          <Link href="/classroom" className="btn btn-outline" onClick={closeMobileMenu} style={{ width: '100%' }}>
            Student Classroom
          </Link>
          <Link href="/teacher-portal" className="btn btn-primary" onClick={closeMobileMenu} style={{ width: '100%' }}>
            Teach With Us
          </Link>
        </div>
      </aside>
    </>
  );
}

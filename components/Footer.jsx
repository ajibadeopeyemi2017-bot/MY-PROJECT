'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer({ onOpenLegal }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand-logo" style={{ marginBottom: '18px' }}>
              <div className="brand-icon">GL</div>
              <div className="brand-text">
                <span className="brand-title">GREATER LIGHT <span>ACADEMY</span></span>
                <span className="brand-subtitle">Global Consult & STEM School</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '22px' }}>
              Premier online academy and international consult dedicated to academic excellence in STEM and guaranteed results in SAT, IELTS, TOEFL, GRE & GMAT.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="badge badge-emerald mono-accent">Verified Education Consult</span>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Academic Tracks</h4>
            <ul className="footer-links">
              <li><Link href="/#courses">Mathematics & Further Maths</Link></li>
              <li><Link href="/#courses">AP & University Physics</Link></li>
              <li><Link href="/#courses">Organic Chemistry</Link></li>
              <li><Link href="/#courses">Molecular Biology</Link></li>
              <li><Link href="/#courses">Digital SAT Masterclass</Link></li>
              <li><Link href="/#courses">IELTS Band 8.5 Strategy</Link></li>
              <li><Link href="/#courses">GRE & GMAT Focus</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">School Portals</h4>
            <ul className="footer-links">
              <li><Link href="/classroom">Student Learning Portal</Link></li>
              <li><Link href="/teacher-portal">Teacher Registration Hub</Link></li>
              <li><Link href="/teacher-portal#calculator">Instructor Revenue Calculator</Link></li>
              <li><Link href="/#study-abroad">Study Abroad Consultations</Link></li>
              <li><Link href="/#pricing">Subscription Plans</Link></li>
              <li><Link href="/#mentorship">Live 1-on-1 Mentorship</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Headquarters & Contact</h4>
            <div className="footer-contact-item">
              <span>📍</span>
              <span>House 3, Line 3, Owoyomi Street, Oke Ogbo, Ile-Ife, Osun State, Nigeria</span>
            </div>
            <div className="footer-contact-item">
              <span>📞</span>
              <span className="mono-accent">
                <a href="tel:08050367351" style={{ color: 'inherit', textDecoration: 'underline' }}>08050367351</a> / {' '}
                <a href="tel:08163776464" style={{ color: 'inherit', textDecoration: 'underline' }}>08163776464</a> / {' '}
                <a href="tel:09165332314" style={{ color: 'inherit', textDecoration: 'underline' }}>09165332314</a>
              </span>
            </div>
            <div className="footer-contact-item">
              <span>✉️</span>
              <span>
                <a href="mailto:ajibadeopeyemi2017@gmail.com" style={{ color: 'var(--accent-cyan)' }}>
                  ajibadeopeyemi2017@gmail.com
                </a>
              </span>
            </div>
            <div className="footer-contact-item">
              <span>🌐</span>
              <span>
                <a href="https://greaterlightglobalconsult.com" target="_blank" rel="noopener noreferrer" style={{ color: '#cbd5e1' }}>
                  greaterlightglobalconsult.com
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>&copy; 2026 Greater Light Global Consult & Online Academy. Directed by Engr. Ajibade Opeyemi Phillip.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('honor')}
              style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Academic Honor Code
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

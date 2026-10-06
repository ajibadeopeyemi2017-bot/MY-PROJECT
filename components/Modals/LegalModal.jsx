'use client';

import React from 'react';

export default function LegalModal({ isOpen, type = 'privacy', onClose }) {
  if (!isOpen) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      content: (
        <>
          <p style={{ marginBottom: '12px', color: 'var(--text-muted)' }}>
            Greater Light Global Consult & Online Academy (GLGC) respects student and instructor privacy. All personal data, study records, contact numbers, and payment details are encrypted using enterprise SSL protocols.
          </p>
          <p style={{ marginBottom: '12px', color: 'var(--text-muted)' }}>
            We do not sell, rent, or distribute candidate records to third-party marketing companies. Data collected is strictly utilized for course access, admissions processing, and certificate verification.
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            For privacy inquiries or data requests, contact: <strong>ajibadeopeyemi2017@gmail.com</strong>.
          </p>
        </>
      )
    },
    terms: {
      title: 'Terms of Service',
      content: (
        <>
          <p style={{ marginBottom: '12px', color: 'var(--text-muted)' }}>
            By enrolling in courses or registering as an instructor with Greater Light Academy, you agree to comply with our academic terms, intellectual property standards, and community guidelines.
          </p>
          <p style={{ marginBottom: '12px', color: 'var(--text-muted)' }}>
            Educators retain intellectual ownership of curriculum materials uploaded to Greater Light Studio and receive an 80% revenue share disbursed according to agreed payment schedules.
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            Course access is personal to the registered scholar. Unauthorized redistribution or screen-recording of private lectures is prohibited.
          </p>
        </>
      )
    },
    honor: {
      title: 'Academic Honor Code',
      content: (
        <>
          <p style={{ marginBottom: '12px', color: 'var(--text-muted)' }}>
            GLGC Academy is founded on absolute academic integrity and rigor. Scholars are expected to complete diagnostic checkpoint quizzes, formula derivations, and mock exams independently.
          </p>
          <p style={{ marginBottom: '12px', color: 'var(--text-muted)' }}>
            Our mission is genuine intellectual mastery in STEM and standardized exams. Certificates of completion reflect authentic problem-solving capability.
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            "Discipline and tenacity in problem-solving build true engineering leadership." — Engr. Ajibade Opeyemi Phillip
          </p>
        </>
      )
    }
  };

  const current = contentMap[type] || contentMap.privacy;

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-window">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">&times;</button>
        <h3 style={{ fontSize: '1.45rem', color: 'var(--text-main)', marginBottom: '16px' }}>{current.title}</h3>
        <div style={{ lineHeight: '1.7', fontSize: '0.92rem' }}>
          {current.content}
        </div>
        <div style={{ marginTop: '24px', textAlign: 'right', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
          <button className="btn btn-primary btn-sm" onClick={onClose}>Understood & Acknowledged</button>
        </div>
      </div>
    </div>
  );
}

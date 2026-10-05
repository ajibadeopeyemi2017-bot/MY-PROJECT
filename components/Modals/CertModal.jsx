'use client';

import React from 'react';

export default function CertModal({ isOpen, certData, onClose }) {
  if (!isOpen || !certData) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-window" style={{ maxWidth: '640px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">&times;</button>
        
        <div style={{
          border: '2px solid rgba(6, 182, 212, 0.4)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(8, 22, 40, 0.95) 0%, rgba(5, 12, 24, 0.98) 100%)',
          boxShadow: 'inset 0 0 30px rgba(6, 182, 212, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div className="brand-logo">
              <div className="brand-icon" style={{ background: 'var(--secondary-gradient)' }}>GL</div>
              <div className="brand-text">
                <span className="brand-title" style={{ fontSize: '1rem' }}>GREATER LIGHT</span>
                <span className="brand-subtitle" style={{ fontSize: '0.65rem' }}>OFFICIAL VERIFIED CREDENTIAL</span>
              </div>
            </div>
            <span className="badge badge-emerald mono-accent" style={{ padding: '6px 12px' }}>
              ✓ {certData.status || 'AUTHENTIC & VERIFIED'}
            </span>
          </div>

          <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
              This certifies that
            </p>
            <h2 style={{
              fontSize: '1.9rem',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              margin: '8px 0',
              background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {certData.candidate || 'GLGC Scholar'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              has successfully achieved curriculum mastery and demonstrated standard excellence in
            </p>
            <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1.2rem', marginTop: '8px' }}>
              {certData.courseTitle || 'STEM Disciplines & Exam Mastery Standard Track'}
            </h4>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            borderTop: '1px solid var(--border-glass)',
            paddingTop: '18px',
            marginTop: '20px',
            fontSize: '0.85rem'
          }}>
            <div>
              <span style={{ color: 'var(--text-dim)', display: 'block' }}>Credential ID:</span>
              <strong className="mono-accent" style={{ color: '#fff' }}>{certData.id}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)', display: 'block' }}>Issued Date:</span>
              <strong style={{ color: '#fff' }}>{certData.issueDate || 'October 2026'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)', display: 'block' }}>Issuing Authority:</span>
              <strong style={{ color: '#fff' }}>Greater Light Academy & Consult</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)', display: 'block' }}>Authorized Signatory:</span>
              <strong style={{ color: 'var(--accent-gold)' }}>Engr. Ajibade Opeyemi Phillip</strong>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button className="btn btn-outline btn-sm" onClick={onClose}>Close Verification</button>
        </div>
      </div>
    </div>
  );
}

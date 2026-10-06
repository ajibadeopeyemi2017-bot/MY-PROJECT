'use client';

import React from 'react';

export default function SyllabusModal({ isOpen, course, onClose, onEnroll }) {
  if (!isOpen || !course) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-window">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">&times;</button>
        <div className="eyebrow-kicker" style={{ color: 'var(--accent-cyan)' }}>
          <span className="kicker-dot" style={{ background: 'var(--accent-cyan)' }}></span>
          <span>{course.subject} • {course.level || 'Mastery Track'}</span>
        </div>
        <h3 style={{ fontSize: '1.45rem', color: 'var(--text-main)', margin: '8px 0 16px' }}>{course.title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
          {course.description}
        </p>

        <div style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '6px' }}>
          {course.syllabus && course.syllabus.map((mod, modIdx) => (
            <div
              key={modIdx}
              style={{
                background: 'rgba(125, 125, 125, 0.05)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                marginBottom: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{mod.module}</strong>
                <span className="mono-accent" style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)' }}>
                  {mod.duration || '4 Hours'}
                </span>
              </div>
              <ul style={{ listStyle: 'none', paddingLeft: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {mod.lessons && mod.lessons.map((lesson, lIdx) => (
                  <li key={lIdx} style={{ fontSize: '0.86rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>▶ {lesson.title}</span>
                    <span className="mono-accent" style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>
                      {lesson.duration || '40 min'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
          <button className="btn btn-outline btn-sm" onClick={onClose}>Close</button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              onClose();
              if (onEnroll) onEnroll(course);
            }}
          >
            Enroll in This Course
          </button>
        </div>
      </div>
    </div>
  );
}

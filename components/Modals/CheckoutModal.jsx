'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Toast';

export default function CheckoutModal({ isOpen, item, currency = 'USD', onClose }) {
  const router = useRouter();
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [payMethod, setPayMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !item) return null;

  const title = item.title || item.name || 'All-Access Pass';
  let priceStr = '$69';
  if (item.priceUSD || item.priceNGN) {
    priceStr = currency === 'NGN'
      ? `₦${(item.priceNGN || 35000).toLocaleString()}`
      : `$${item.priceUSD || 49}`;
  } else if (item.id === 'single-pass') {
    priceStr = currency === 'NGN' ? '₦25,000' : '$35';
  } else if (item.id === 'all-access') {
    priceStr = currency === 'NGN' ? '₦50,000' : '$69';
  } else if (item.id === 'elite-pass') {
    priceStr = currency === 'NGN' ? '₦110,000' : '$149';
  }

  const handleEnroll = (e) => {
    e.preventDefault();
    if (!studentName.trim() || !studentEmail.trim()) {
      showNotification('Please fill in your name and email', 'warning');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      showNotification(`🎉 Congratulations ${studentName}! Enrollment active for ${title}.`, 'success', 5000);
      
      // Save student session
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('glgc_student_name', studentName);
          localStorage.setItem('glgc_student_email', studentEmail);
          if (item.id) localStorage.setItem('glgc_active_course_id', item.id);
        } catch (_) {}
      }

      onClose();
      router.push(item.id && item.id.startsWith('custom') || (item.subject) ? `/classroom?courseId=${item.id}` : '/classroom');
    }, 1200);
  };

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-window">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">&times;</button>
        <h3 style={{ fontSize: '1.45rem', color: 'var(--text-main)', marginBottom: '6px' }}>Secure Student Enrollment</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Unlock instant access to lessons, quizzes, formula sheets & discussion boards.
        </p>

        {/* Item summary */}
        <div style={{
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ color: 'var(--text-main)', display: 'block', fontSize: '1rem' }}>{title}</strong>
              <small style={{ color: 'var(--text-muted)' }}>Instructor: {item.instructor || 'Engr. Ajibade Opeyemi'}</small>
            </div>
            <strong className="mono-accent" style={{ color: '#059669', fontSize: '1.3rem' }}>{priceStr}</strong>
          </div>
        </div>

        <form onSubmit={handleEnroll}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '22px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: '600' }}>
                Student Full Name
              </label>
              <input
                type="text"
                className="search-input"
                style={{ borderRadius: 'var(--radius-md)' }}
                placeholder="e.g. Samuel Adekunle"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: '600' }}>
                Email Address
              </label>
              <input
                type="email"
                className="search-input"
                style={{ borderRadius: 'var(--radius-md)' }}
                placeholder="samuel@example.com"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: '600' }}>
                Payment Method
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <label style={{
                  background: payMethod === 'card' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(125,125,125,0.08)',
                  padding: '14px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${payMethod === 'card' ? 'var(--primary-glow)' : 'var(--border-glass)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.88rem',
                  color: 'var(--text-main)'
                }}>
                  <input
                    type="radio"
                    name="paymethod"
                    checked={payMethod === 'card'}
                    onChange={() => setPayMethod('card')}
                  />
                  <span>Card (Visa / MC / Verve)</span>
                </label>

                <label style={{
                  background: payMethod === 'transfer' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(125,125,125,0.08)',
                  padding: '14px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${payMethod === 'transfer' ? 'var(--primary-glow)' : 'var(--border-glass)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.88rem',
                  color: 'var(--text-main)'
                }}>
                  <input
                    type="radio"
                    name="paymethod"
                    checked={payMethod === 'transfer'}
                    onChange={() => setPayMethod('transfer')}
                  />
                  <span>Bank Transfer / USSD</span>
                </label>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--border-glass)',
            paddingTop: '16px',
            marginBottom: '20px'
          }}>
            <span style={{ fontSize: '0.98rem', color: 'var(--text-muted)' }}>Amount Due:</span>
            <strong className="mono-accent" style={{ fontSize: '1.6rem', color: '#34d399' }}>{priceStr}</strong>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={isProcessing}
          >
            {isProcessing ? 'Authorizing Payment...' : 'Authorize Enrollment & Enter Classroom'}
          </button>
        </form>
      </div>
    </div>
  );
}

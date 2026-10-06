'use client';

import React, { useState } from 'react';
import { bookConsultation } from '@/lib/api-client';
import { showNotification } from '@/components/Toast';

export default function ConsultModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('USA');
  const [examStatus, setExamStatus] = useState('Need SAT/IELTS');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showNotification('Please provide your name and WhatsApp number', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await bookConsultation({ name, phone, destination, examStatus });
      showNotification(res.message || 'Consultation booked successfully!', 'success', 6000);
      setName('');
      setPhone('');
      onClose();
    } catch (err) {
      showNotification('Failed to submit consultation request. Please call directly.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-window">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">&times;</button>
        <div className="eyebrow-kicker" style={{ color: 'var(--accent-gold)' }}>
          <span className="kicker-dot" style={{ background: 'var(--accent-gold)' }}></span>
          <span>Study Abroad Advisory</span>
        </div>
        <h3 style={{ fontSize: '1.45rem', color: 'var(--text-main)', margin: '6px 0' }}>
          Book Free Study Abroad Consultation
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '22px' }}>
          Greater Light Global Consult • Admissions, Scholarships & Visa Advisory
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '22px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: '600' }}>
                Your Full Name
              </label>
              <input
                type="text"
                className="search-input"
                style={{ borderRadius: 'var(--radius-md)' }}
                placeholder="e.g. Babatunde Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: '600' }}>
                WhatsApp Phone Number
              </label>
              <input
                type="tel"
                className="search-input"
                style={{ borderRadius: 'var(--radius-md)' }}
                placeholder="e.g. 08163776464"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: '600' }}>
                Preferred Destination
              </label>
              <select
                className="search-input"
                style={{ borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="USA">United States (Undergraduate / Masters)</option>
                <option value="UK">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Europe">Europe (Germany, Finland, Poland, etc.)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: '600' }}>
                Exam & Profile Status
              </label>
              <select
                className="search-input"
                style={{ borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
                value={examStatus}
                onChange={(e) => setExamStatus(e.target.value)}
              >
                <option value="Need SAT/IELTS">Need SAT / IELTS Training at GLGC</option>
                <option value="Already Taken">Already taken exam (seeking scholarship)</option>
                <option value="Without SAT/IELTS">Seeking admissions without SAT / IELTS</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-gold"
            style={{ width: '100%' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Dispatching to Advisor...' : 'Connect with GLGC Admissions Advisor'}
          </button>
        </form>
      </div>
    </div>
  );
}

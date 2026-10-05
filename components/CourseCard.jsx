'use client';

import React from 'react';
import Link from 'next/link';

export default function CourseCard({ course, currency = 'USD', onPreview, onEnroll }) {
  const priceText = currency === 'NGN'
    ? `₦${(course.priceNGN || 35000).toLocaleString()}`
    : `$${course.priceUSD || 49}`;

  const levelMeter = course.level?.toLowerCase().includes('advanced')
    ? '■■■'
    : course.level?.toLowerCase().includes('intermediate')
      ? '■■□'
      : '■□□';

  const badgeClass = course.badge === 'Bestseller' || course.badge === 'Flagship'
    ? 'badge-gold'
    : 'badge-pulse';

  return (
    <div className="course-card glass-panel" data-id={course.id}>
      {/* Thumbnail Wrap */}
      <div className="course-thumb-wrap">
        <img
          src={course.thumbnail || '/assets/images/stem_hologram.jpg'}
          alt={course.title}
          className="course-thumb"
          loading="lazy"
        />
        {course.badge && (
          <span className={`badge ${badgeClass} course-badge-tag`}>
            {course.badge}
          </span>
        )}
        <span className="course-subject-pill">{course.subject}</span>
      </div>

      {/* Card Body */}
      <div className="course-body">
        {/* Header Meta: Level & Rating */}
        <div className="course-header-meta">
          <span className="level-indicator">
            <span>{levelMeter}</span>
            <span>{course.level || 'Mastery Track'}</span>
          </span>
          <div className="course-rating">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#fbbf24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>{course.rating || '4.95'}</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.74rem' }}>
              ({course.reviewsCount || 120})
            </span>
          </div>
        </div>

        {/* Course Title & Description */}
        <h3 className="course-title" title={course.title}>{course.title}</h3>
        <p className="course-desc">{course.description}</p>

        {/* Instructor Section */}
        <div className="course-instructor">
          <img
            src={course.instructorImg || '/assets/images/founder-avatar.jpg'}
            alt={course.instructor}
            className="inst-avatar"
          />
          <div className="inst-details">
            <strong>{course.instructor}</strong>
            <small>{course.instructorRole || 'Lead STEM Faculty'}</small>
          </div>
        </div>

        {/* Specification Capsules */}
        <div className="course-specs-capsules">
          <span className="spec-capsule">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {course.duration || '30 Hours'}
          </span>
          <span className="spec-capsule">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            {course.lessonsCount || 24} Lessons
          </span>
          <span className="spec-capsule" style={{ color: 'var(--accent-emerald)' }}>
            ✓ Verified Cert
          </span>
        </div>

        {/* Card Footer: Pricing and Actions */}
        <div className="course-footer">
          <div className="course-pricing">
            <span className="price-val mono-accent">{priceText}</span>
            <span className="price-sub">Included in All-Access</span>
          </div>

          <div className="course-actions">
            <Link
              href={`/classroom?courseId=${course.id}`}
              className="btn btn-outline btn-sm"
              title="Preview Classroom"
            >
              Classroom
            </Link>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => onPreview && onPreview(course)}
              title="View Curriculum Syllabus"
            >
              Syllabus
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => onEnroll && onEnroll(course)}
            >
              Enroll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

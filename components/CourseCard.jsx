'use client';

import React from 'react';
import Link from 'next/link';

export default function CourseCard({ course, currency = 'USD', onPreview, onEnroll }) {
  const price = currency === 'NGN'
    ? `₦${(course.priceNGN || 35000).toLocaleString()}`
    : `$${course.priceUSD || 49}`;

  return (
    <div className="course-card glass-panel" data-subject={course.subject}>
      <div className="course-thumb-wrap">
        <img
          src={course.thumbnail || '/assets/images/stem_hologram.jpg'}
          alt={course.title}
          className="course-thumb-img"
          loading="lazy"
        />
        {course.badge && (
          <span className="course-badge-pill mono-accent">{course.badge}</span>
        )}
        <div className="course-category-tag">{course.subject}</div>
      </div>

      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-desc">{course.description}</p>

        {/* Instructor Info */}
        <div className="course-instructor-row">
          <img
            src={course.instructorImg || '/assets/images/founder.jpg'}
            alt={course.instructor}
            className="instructor-avatar-sm"
          />
          <div className="instructor-text">
            <strong>{course.instructor}</strong>
            <small>{course.instructorRole || 'Lead Faculty'}</small>
          </div>
        </div>

        {/* Course Meta Info */}
        <div className="course-meta-row">
          <div className="course-rating">
            <span style={{ color: 'var(--accent-gold)' }}>★</span>
            <strong className="mono-accent">{course.rating || '4.95'}</strong>
            <small>({course.reviewsCount || 120})</small>
          </div>
          <div className="course-duration mono-accent">
            <span>⏱ {course.duration || '30 Hours'}</span>
          </div>
          <div className="course-lessons mono-accent">
            <span>📚 {course.lessonsCount || 24} Lessons</span>
          </div>
        </div>

        {/* Topics preview pills */}
        {course.topics && course.topics.length > 0 && (
          <div className="course-topics-list">
            {course.topics.slice(0, 3).map((topic, idx) => (
              <span key={idx} className="topic-pill">{topic}</span>
            ))}
            {course.topics.length > 3 && (
              <span className="topic-pill more">+{course.topics.length - 3} more</span>
            )}
          </div>
        )}

        {/* Card Footer with Price and Actions */}
        <div className="course-card-footer">
          <div className="course-price-wrap">
            <span className="price-label">Tuition</span>
            <span className="price-value mono-accent">{price}</span>
          </div>

          <div className="course-card-actions">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => onPreview && onPreview(course)}
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

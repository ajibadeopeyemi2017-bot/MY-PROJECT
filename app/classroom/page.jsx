'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getCourses, getDiscussions, postDiscussion, claimCertificate } from '@/lib/api-client';
import { showNotification } from '@/components/Toast';

export default function ClassroomPage() {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [moduleIdx, setModuleIdx] = useState(0);
  const [lessonIdx, setLessonIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());

  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(145);
  const duration = 1840; // 30 min 40 sec
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const timerRef = useRef(null);

  // Tab state
  const [activeTab, setActiveTab] = useState('notes'); // notes | formula | quiz | discussion

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({}); // { [questionIdx]: selectedOptionIdx }
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Discussion state
  const [discussions, setDiscussions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [studentName, setStudentName] = useState('Oluwaseun Adeleke');
  const [isPostingDiscussion, setIsPostingDiscussion] = useState(false);

  // Certificate Modal State
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [certRecipient, setCertRecipient] = useState('Oluwaseun Adeleke');
  const [claimedCert, setClaimedCert] = useState(null);
  const [isClaimingCert, setIsClaimingCert] = useState(false);

  // Load courses on mount
  useEffect(() => {
    async function loadData() {
      const data = await getCourses();
      setCourses(data);

      // Check query param for course ID
      let targetId = 'fmath-02';
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const qId = params.get('courseId') || params.get('id');
        if (qId) targetId = qId;
        const savedName = localStorage.getItem('glgc_student_name');
        if (savedName) {
          setStudentName(savedName);
          setCertRecipient(savedName);
        }
      }

      const match = data.find(c => c.id === targetId) || data[0];
      setCurrentCourse(match);

      // Load progress
      if (typeof window !== 'undefined' && match) {
        try {
          const saved = JSON.parse(localStorage.getItem(`glgc_progress_${match.id}`) || '[]');
          setCompletedLessons(new Set(saved));
        } catch (_) {}
      }
    }
    loadData();
  }, []);

  // Load discussions when course changes
  useEffect(() => {
    if (!currentCourse) return;
    async function loadCourseDiscussions() {
      const posts = await getDiscussions(currentCourse.id);
      setDiscussions(posts);
    }
    loadCourseDiscussions();
    setQuizAnswers({});
    setQuizSubmitted(false);
  }, [currentCourse]);

  // Video playback timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime(t => {
          if (t >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return t + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, duration]);

  if (!currentCourse) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <p className="mono-accent">Initializing Greater Light Virtual Classroom...</p>
      </div>
    );
  }

  const currentModule = currentCourse.syllabus?.[moduleIdx] || { module: 'Module 1', lessons: [] };
  const currentLesson = currentModule.lessons?.[lessonIdx] || { title: 'Lecture Overview', duration: '30 min' };

  // Calculate total lessons & progress
  let totalLessonsCount = 0;
  currentCourse.syllabus?.forEach(m => {
    totalLessonsCount += (m.lessons?.length || 0);
  });
  const progressPercent = totalLessonsCount > 0
    ? Math.round((completedLessons.size / totalLessonsCount) * 100)
    : 0;

  // Format time MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Switch course
  const handleCourseSwitch = (id) => {
    const found = courses.find(c => c.id === id);
    if (!found) return;
    setCurrentCourse(found);
    setModuleIdx(0);
    setLessonIdx(0);
    setCurrentTime(0);
    setIsPlaying(false);

    if (typeof window !== 'undefined') {
      try {
        const saved = JSON.parse(localStorage.getItem(`glgc_progress_${found.id}`) || '[]');
        setCompletedLessons(new Set(saved));
      } catch (_) {}
    }

    showNotification(`Switched to: ${found.title}`, 'info');
  };

  // Mark lesson completed
  const handleMarkComplete = () => {
    const key = `${moduleIdx}-${lessonIdx}`;
    const nextSet = new Set(completedLessons);
    nextSet.add(key);
    setCompletedLessons(nextSet);

    if (typeof window !== 'undefined') {
      localStorage.setItem(`glgc_progress_${currentCourse.id}`, JSON.stringify(Array.from(nextSet)));
    }

    showNotification(`Lesson marked as completed! Course Progress: ${Math.round((nextSet.size / totalLessonsCount) * 100)}%`, 'success');
  };

  // Select a specific lesson
  const handleSelectLesson = (mIdx, lIdx) => {
    setModuleIdx(mIdx);
    setLessonIdx(lIdx);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Quiz submission
  const handleQuizOption = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const questions = currentCourse.quiz || [];
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correctCount++;
    });
    const scorePct = Math.round((correctCount / (questions.length || 1)) * 100);
    showNotification(`Quiz Evaluated! Score: ${scorePct}% (${correctCount}/${questions.length})`, scorePct >= 70 ? 'success' : 'warning');
  };

  // Discussion submit
  const handleDiscussionSubmit = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setIsPostingDiscussion(true);
    try {
      const res = await postDiscussion({
        courseId: currentCourse.id,
        author: studentName,
        question: newQuestion
      });
      if (res && res.post) {
        setDiscussions(prev => [res.post, ...prev]);
        setNewQuestion('');
        showNotification('Question posted and answered by Instructor!', 'success');
      }
    } catch (_) {
      showNotification('Could not post question. Try again.', 'error');
    } finally {
      setIsPostingDiscussion(false);
    }
  };

  // Claim certificate
  const handleClaimCertificate = async (e) => {
    e.preventDefault();
    if (!certRecipient.trim()) return;

    setIsClaimingCert(true);
    try {
      const res = await claimCertificate({
        candidate: certRecipient,
        courseTitle: `${currentCourse.title} (${currentCourse.subject})`
      });
      if (res && res.certificate) {
        setClaimedCert(res.certificate);
        showNotification('Official verified certificate issued!', 'success');
      }
    } catch (_) {
      showNotification('Certificate issuance error.', 'error');
    } finally {
      setIsClaimingCert(false);
    }
  };

  return (
    <div className="classroom-body">
      {/* Classroom Top Bar */}
      <nav className="classroom-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/" className="classroom-back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            <span>Back to Academy</span>
          </Link>

          <div className="brand-icon" style={{ width: '32px', height: '32px', fontSize: '0.95rem' }}>GL</div>

          {/* Course Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select
              className="classroom-course-select"
              value={currentCourse.id}
              onChange={(e) => handleCourseSwitch(e.target.value)}
              aria-label="Select Enrolled Course"
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title.length > 36 ? c.title.substring(0, 36) + '...' : c.title} ({c.subject})
                </option>
              ))}
            </select>
            <span className="classroom-progress-pill mono-accent">{progressPercent}% Progress</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button type="button" className="btn btn-primary btn-sm" onClick={handleMarkComplete}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Mark Lesson Complete</span>
          </button>

          <button
            type="button"
            className="btn-cert-claim"
            onClick={() => {
              setClaimedCert(null);
              setIsCertModalOpen(true);
            }}
          >
            🎓 Claim Certificate
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid var(--border-glass)', paddingLeft: '14px' }}>
            <div className="author-avatar" style={{ width: '34px', height: '34px', fontSize: '0.85rem' }}>ST</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: '0.82rem', color: '#fff' }}>{studentName}</strong>
              <small style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)' }}>All-Access Active</small>
            </div>
          </div>
        </div>
      </nav>

      {/* Classroom Container */}
      <main className="classroom-container">
        {/* Left Side: Video Player, Tabs */}
        <section className="classroom-left-col">
          {/* Custom Video Player Simulator */}
          <div className="video-player-wrap">
            <div
              className="video-stage"
              style={{
                backgroundImage: `url(${currentCourse.thumbnail || '/assets/images/stem_hologram.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}
            >
              <div className="video-overlay-gradient"></div>

              {/* Central Play/Pause Watermark Button */}
              <button
                type="button"
                className="big-play-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause Lecture' : 'Play Lecture'}
              >
                {isPlaying ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                )}
              </button>

              {/* Floating lesson title */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10, background: 'rgba(0,0,0,0.6)', padding: '6px 14px', borderRadius: 'var(--radius-sm)', backdropFilter: 'blur(8px)' }}>
                <span className="live-dot" style={{ display: 'inline-block', marginRight: '6px' }}></span>
                <span style={{ fontSize: '0.84rem', color: '#e2e8f0', fontWeight: '600' }}>
                  {currentLesson.title} • {currentModule.module}
                </span>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="video-controls-bar">
              {/* Progress Scrubber */}
              <div
                className="scrubber-bar-container"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  setCurrentTime(Math.floor(pos * duration));
                }}
              >
                <div className="scrubber-filled" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
              </div>

              <div className="controls-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <button
                    type="button"
                    className="control-icon-btn"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>

                  <span className="time-display mono-accent">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Speed selector */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 1.25, 1.5, 2].map(speed => (
                      <button
                        key={speed}
                        type="button"
                        className={`speed-btn mono-accent ${playbackSpeed === speed ? 'active' : ''}`}
                        onClick={() => setPlaybackSpeed(speed)}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>

                  <span className="badge badge-emerald mono-accent" style={{ fontSize: '0.72rem' }}>
                    1080p HD
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Metadata Bar */}
          <div className="lesson-meta-bar glass-panel" style={{ marginTop: '16px', padding: '18px 24px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="mono-accent" style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  {currentCourse.subject} • {currentModule.module}
                </span>
                <h2 style={{ fontSize: '1.4rem', color: '#fff', margin: '4px 0 6px' }}>{currentLesson.title}</h2>
                <small style={{ color: 'var(--text-muted)' }}>
                  Taught by <strong>{currentCourse.instructor}</strong> ({currentCourse.instructorRole || 'Lead Faculty'})
                </small>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    if (lessonIdx > 0) setLessonIdx(lessonIdx - 1);
                    else if (moduleIdx > 0) {
                      setModuleIdx(moduleIdx - 1);
                      setLessonIdx(0);
                    }
                  }}
                  disabled={moduleIdx === 0 && lessonIdx === 0}
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    if (lessonIdx < currentModule.lessons.length - 1) {
                      setLessonIdx(lessonIdx + 1);
                    } else if (moduleIdx < currentCourse.syllabus.length - 1) {
                      setModuleIdx(moduleIdx + 1);
                      setLessonIdx(0);
                    } else {
                      showNotification('You have reached the final lesson of this course!', 'success');
                    }
                  }}
                >
                  Next Lesson →
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Classroom Tabs */}
          <div className="classroom-tabs-wrap" style={{ marginTop: '20px' }}>
            <div className="classroom-tab-nav">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
                onClick={() => setActiveTab('notes')}
              >
                📝 Lecture Notes & Derivations
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'formula' ? 'active' : ''}`}
                onClick={() => setActiveTab('formula')}
              >
                📐 Formula & Concept Sheet
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
                onClick={() => setActiveTab('quiz')}
              >
                🧠 Diagnostic Checkpoint Quiz
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'discussion' ? 'active' : ''}`}
                onClick={() => setActiveTab('discussion')}
              >
                💬 Student Q&A ({discussions.length})
              </button>
            </div>

            <div className="classroom-tab-content glass-panel" style={{ padding: '24px', borderRadius: '0 0 var(--radius-md) var(--radius-md)', minHeight: '340px' }}>
              {/* Tab 1: Notes */}
              {activeTab === 'notes' && (
                <div className="tab-pane-notes">
                  <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '14px' }}>
                    Core Concepts: {currentLesson.title}
                  </h4>
                  <div style={{ lineHeight: '1.75', color: '#cbd5e1', fontSize: '0.94rem' }}>
                    <p style={{ marginBottom: '14px' }}>
                      In this lecture, <strong>{currentCourse.instructor}</strong> breaks down foundational axioms and practical heuristics for mastering <em>{currentLesson.title}</em> in standard examinations.
                    </p>
                    
                    <div style={{ background: 'rgba(99, 102, 241, 0.08)', borderLeft: '4px solid var(--primary-glow)', padding: '14px 18px', borderRadius: 'var(--radius-sm)', margin: '16px 0' }}>
                      <strong style={{ color: '#fff', display: 'block', marginBottom: '6px' }}>Master Theorem & Engineering Principle:</strong>
                      <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>
                        f(x) = ∑ [ a_n · φ_n(x) ] ⟹ ∫ f(x) dx = ∑ a_n ∫ φ_n(x) dx + C
                      </p>
                    </div>

                    <h5 style={{ color: '#e2e8f0', marginTop: '18px', marginBottom: '8px' }}>Key Problem-Solving Takeaways:</h5>
                    <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li>Always identify the independent variable and test boundary conditions first.</li>
                      <li>Use dimensional analysis to eliminate 2 out of 4 multiple-choice options in under 15 seconds.</li>
                      <li>For standardized exams (SAT/GRE), check for symmetry and test plug-in values when algebra becomes cumbersome.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: Formula Sheet */}
              {activeTab === 'formula' && (
                <div className="tab-pane-formulas">
                  <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '14px' }}>
                    Rapid Reference Formula Sheet
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
                      <span className="mono-accent" style={{ color: 'var(--accent-gold)', fontSize: '0.8rem' }}>CALCULUS / ALGEBRA</span>
                      <strong style={{ display: 'block', color: '#fff', margin: '4px 0 8px' }}>Integration by Parts</strong>
                      <code className="mono-accent" style={{ color: 'var(--accent-cyan)' }}>∫ u dv = u·v - ∫ v du</code>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
                      <span className="mono-accent" style={{ color: 'var(--accent-gold)', fontSize: '0.8rem' }}>SAT DESMOS SPEED TRICK</span>
                      <strong style={{ display: 'block', color: '#fff', margin: '4px 0 8px' }}>Discriminant & Roots</strong>
                      <code className="mono-accent" style={{ color: 'var(--accent-cyan)' }}>Δ = b² - 4ac (Δ &gt; 0: 2 real, Δ = 0: 1 real)</code>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
                      <span className="mono-accent" style={{ color: 'var(--accent-gold)', fontSize: '0.8rem' }}>DIFFERENTIAL EQUATIONS</span>
                      <strong style={{ display: 'block', color: '#fff', margin: '4px 0 8px' }}>Integrating Factor</strong>
                      <code className="mono-accent" style={{ color: 'var(--accent-cyan)' }}>I(x) = exp( ∫ P(x) dx )</code>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Quiz */}
              {activeTab === 'quiz' && (
                <div className="tab-pane-quiz">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h4 style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>
                      Lesson Diagnostic Checkpoint
                    </h4>
                    <span className="badge badge-gold mono-accent">
                      {currentCourse.quiz?.length || 1} Assessment Questions
                    </span>
                  </div>

                  {currentCourse.quiz && currentCourse.quiz.map((q, qIdx) => (
                    <div
                      key={qIdx}
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: 'var(--radius-md)',
                        padding: '20px',
                        marginBottom: '16px'
                      }}
                    >
                      <p style={{ color: '#fff', fontWeight: 600, fontSize: '1rem', marginBottom: '14px' }}>
                        {qIdx + 1}. {q.question}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {q.options.map((opt, optIdx) => {
                          const isSelected = quizAnswers[qIdx] === optIdx;
                          const isCorrect = q.correct === optIdx;

                          let bg = 'rgba(255,255,255,0.04)';
                          let border = 'var(--border-glass)';
                          if (quizSubmitted) {
                            if (isCorrect) {
                              bg = 'rgba(16, 185, 129, 0.2)';
                              border = '#10b981';
                            } else if (isSelected && !isCorrect) {
                              bg = 'rgba(239, 68, 68, 0.2)';
                              border = '#ef4444';
                            }
                          } else if (isSelected) {
                            bg = 'rgba(99, 102, 241, 0.25)';
                            border = 'var(--primary-glow)';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleQuizOption(qIdx, optIdx)}
                              style={{
                                background: bg,
                                border: `1px solid ${border}`,
                                borderRadius: 'var(--radius-sm)',
                                padding: '12px 16px',
                                textAlign: 'left',
                                color: '#e2e8f0',
                                cursor: quizSubmitted ? 'default' : 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}
                            >
                              <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                              {quizSubmitted && isCorrect && <span style={{ color: '#10b981' }}>✓ Correct</span>}
                              {quizSubmitted && isSelected && !isCorrect && <span style={{ color: '#ef4444' }}>✕ Incorrect</span>}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && q.explanation && (
                        <div style={{ marginTop: '14px', padding: '12px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', color: 'var(--accent-cyan)' }}>
                          <strong>Mastery Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}

                  <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                    {!quizSubmitted ? (
                      <button type="button" className="btn btn-primary" onClick={handleQuizSubmit}>
                        Submit Answers & Verify Mastery
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => {
                          setQuizAnswers({});
                          setQuizSubmitted(false);
                        }}
                      >
                        Retry Checkpoint Quiz
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 4: Discussion */}
              {activeTab === 'discussion' && (
                <div className="tab-pane-discussion">
                  <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '14px' }}>
                    Student Inquiry & Discussion Board
                  </h4>

                  <form onSubmit={handleDiscussionSubmit} style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Ask a technical or formula question to Engr. Ajibade..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        style={{ flex: 1, borderRadius: 'var(--radius-md)' }}
                        required
                      />
                      <button type="submit" className="btn btn-cyan btn-sm" disabled={isPostingDiscussion}>
                        {isPostingDiscussion ? 'Posting...' : 'Ask Question'}
                      </button>
                    </div>
                  </form>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {discussions.map(post => (
                      <div
                        key={post.id}
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid var(--border-glass)',
                          borderRadius: 'var(--radius-md)',
                          padding: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <strong style={{ color: '#fff', fontSize: '0.92rem' }}>{post.author} ({post.role || 'Student'})</strong>
                          <span className="mono-accent" style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{post.time}</span>
                        </div>
                        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '10px' }}>{post.question}</p>
                        
                        {post.answer && (
                          <div style={{ background: 'rgba(99, 102, 241, 0.1)', borderLeft: '3px solid var(--primary-glow)', padding: '10px 14px', borderRadius: '4px', fontSize: '0.86rem', color: '#e0e7ff' }}>
                            <strong style={{ display: 'block', color: 'var(--accent-gold)', marginBottom: '4px' }}>Faculty Response:</strong>
                            {post.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Right Side: Syllabus Drawer */}
        <aside className="classroom-right-col glass-panel" style={{ borderRadius: 'var(--radius-lg)', padding: '24px' }}>
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '8px' }}>Course Syllabus</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {currentCourse.title}
            </p>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
              <span className="mono-accent" style={{ color: 'var(--accent-cyan)' }}>{completedLessons.size} of {totalLessonsCount} Completed</span>
              <span className="mono-accent" style={{ color: '#34d399' }}>{progressPercent}%</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ background: 'var(--secondary-gradient)', height: '100%', width: `${progressPercent}%`, transition: 'width 0.4s ease' }}></div>
            </div>
          </div>

          {/* Modules list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {currentCourse.syllabus?.map((mod, mIdx) => (
              <div key={mIdx} className="drawer-module-group">
                <div className="module-group-title" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ fontSize: '0.88rem', color: '#e2e8f0' }}>{mod.module}</strong>
                  <span className="mono-accent" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>{mod.duration}</span>
                </div>

                <ul className="lesson-list-items" style={{ listStyle: 'none', padding: '8px 0 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {mod.lessons?.map((les, lIdx) => {
                    const isCompleted = completedLessons.has(`${mIdx}-${lIdx}`);
                    const isActive = (mIdx === moduleIdx && lIdx === lessonIdx);

                    return (
                      <li
                        key={lIdx}
                        className={`lesson-item ${isActive ? 'active' : ''}`}
                        onClick={() => handleSelectLesson(mIdx, lIdx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          background: isActive ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                          border: `1px solid ${isActive ? 'var(--primary-glow)' : 'transparent'}`
                        }}
                      >
                        <span className="lesson-check-icon">
                          {isCompleted ? (
                            <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                          ) : (
                            <span style={{ color: '#64748b' }}>○</span>
                          )}
                        </span>
                        <span style={{ flex: 1, fontSize: '0.86rem', color: isActive ? '#fff' : '#cbd5e1' }}>
                          {les.title}
                        </span>
                        <span className="mono-accent" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                          {les.duration}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </main>

      {/* Claim Certificate Modal */}
      {isCertModalOpen && (
        <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) setIsCertModalOpen(false); }}>
          <div className="modal-window">
            <button className="modal-close-btn" onClick={() => setIsCertModalOpen(false)} aria-label="Close modal">&times;</button>
            
            {!claimedCert ? (
              <>
                <div className="eyebrow-kicker" style={{ color: 'var(--accent-gold)' }}>
                  <span className="kicker-dot" style={{ background: 'var(--accent-gold)' }}></span>
                  <span>Verified Academic Credential</span>
                </div>
                <h3 style={{ fontSize: '1.45rem', color: '#fff', margin: '6px 0 12px' }}>
                  Claim Course Completion Certificate
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                  Your certificate will be signed by <strong>Engr. Ajibade Opeyemi Phillip</strong> and verifiable by global universities and employers.
                </p>

                <form onSubmit={handleClaimCertificate}>
                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', fontSize: '0.88rem', color: '#e2e8f0', marginBottom: '6px', fontWeight: 600 }}>
                      Recipient Full Name (as it will appear on Certificate)
                    </label>
                    <input
                      type="text"
                      className="search-input"
                      style={{ borderRadius: 'var(--radius-md)' }}
                      value={certRecipient}
                      onChange={(e) => setCertRecipient(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.82rem', display: 'block' }}>Course:</span>
                    <strong style={{ color: '#fff' }}>{currentCourse.title}</strong>
                  </div>

                  <button type="submit" className="btn btn-gold" style={{ width: '100%' }} disabled={isClaimingCert}>
                    {isClaimingCert ? 'Generating Verified Credential...' : 'Issue & Verify Official Certificate'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <span className="badge badge-emerald mono-accent" style={{ padding: '6px 14px', marginBottom: '14px' }}>
                  ✓ {claimedCert.status}
                </span>
                <h3 style={{ color: '#fff', fontSize: '1.6rem', margin: '10px 0' }}>
                  {claimedCert.candidate}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                  Has successfully satisfied all academic requirements for
                </p>
                <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1.15rem', margin: '8px 0 18px' }}>
                  {claimedCert.courseTitle}
                </h4>

                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem', textAlign: 'left', marginBottom: '20px' }}>
                  <div>
                    <span style={{ color: 'var(--text-dim)' }}>Credential ID:</span>
                    <strong className="mono-accent" style={{ display: 'block', color: '#fff' }}>{claimedCert.id}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-dim)' }}>Issue Date:</span>
                    <strong style={{ display: 'block', color: '#fff' }}>{claimedCert.issueDate}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-dim)' }}>Authority:</span>
                    <strong style={{ display: 'block', color: '#fff' }}>Greater Light Academy</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-dim)' }}>Signatory:</span>
                    <strong style={{ display: 'block', color: 'var(--accent-gold)' }}>Engr. Ajibade Opeyemi</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => setIsCertModalOpen(false)}
                >
                  Close & Continue Learning
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

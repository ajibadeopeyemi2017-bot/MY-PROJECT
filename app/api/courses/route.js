import { NextResponse } from 'next/server';
import { INITIAL_COURSES } from '@/lib/courses-data';

// In-memory dynamic courses storage for server runtime
let dynamicCourses = [];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const id = searchParams.get('id');

    const allCourses = [...INITIAL_COURSES, ...dynamicCourses];

    if (id) {
      const course = allCourses.find(c => c.id === id);
      if (!course) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      }
      return NextResponse.json({ course });
    }

    let filtered = allCourses;

    if (category && category !== 'all') {
      filtered = filtered.filter(c => 
        c.subject.toLowerCase() === category.toLowerCase() ||
        c.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(s) ||
        c.subject.toLowerCase().includes(s) ||
        c.instructor.toLowerCase().includes(s) ||
        c.description.toLowerCase().includes(s) ||
        (c.topics && c.topics.some(t => t.toLowerCase().includes(s)))
      );
    }

    return NextResponse.json({
      success: true,
      total: filtered.length,
      courses: filtered
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.title || !body.subject) {
      return NextResponse.json({ error: 'Course title and subject are required' }, { status: 400 });
    }

    const newCourse = {
      id: `custom-${Date.now()}`,
      title: body.title,
      subject: body.subject,
      category: ['SAT', 'IELTS', 'TOEFL', 'GRE', 'GMAT'].includes(body.subject) ? 'Standardized Exam' : 'STEM',
      badge: 'New Course',
      instructor: body.instructor || 'Guest Faculty',
      instructorRole: 'Certified GLGC Educator',
      instructorImg: '/assets/images/founder.jpg',
      rating: 5.0,
      reviewsCount: 1,
      studentsCount: 1,
      duration: body.duration || `${(body.lessons?.length || 2) * 1.5} Hours`,
      lessonsCount: body.lessons?.length || 2,
      level: body.level || 'All Levels',
      priceUSD: parseInt(body.priceUSD) || 49,
      priceNGN: parseInt(body.priceNGN) || 35000,
      thumbnail: '/assets/images/studio_analytics.jpg',
      description: body.description || 'Comprehensive curriculum created on Greater Light Studio.',
      topics: body.topics || ['Foundations & Overview', 'Core Problem Solving'],
      syllabus: body.syllabus || [
        {
          module: `Module 1: ${body.subject} Mastery`,
          duration: '6 Hours',
          lessons: body.lessons || [
            { title: 'Introductory Concepts', duration: '45 min' },
            { title: 'Advanced Problem Analysis', duration: '60 min' }
          ]
        }
      ],
      quiz: body.quiz || [
        {
          question: `Diagnostic Assessment Question for ${body.title}:`,
          options: ["Concept A", "Concept B", "Concept C", "Concept D"],
          correct: 0,
          explanation: "Mastery explanation verified by instructor."
        }
      ]
    };

    dynamicCourses.unshift(newCourse);

    return NextResponse.json({
      success: true,
      message: 'Course published successfully to GLGC Academy',
      course: newCourse
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

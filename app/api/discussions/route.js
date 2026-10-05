import { NextResponse } from 'next/server';

let discussionThreads = {
  'math-01': [
    {
      id: 1,
      author: "David Adeleke",
      role: "Student",
      time: "2 hours ago",
      question: "In partial fractions decomposition, how do we handle repeated linear factors in the denominator?",
      answer: "Great question, David! For repeated linear factors like (x - a)², you must include separate terms for each power up to the degree: A/(x - a) + B/(x - a)². Check page 3 of the algebra deck."
    }
  ],
  'fmath-02': [
    {
      id: 2,
      author: "Blessing Okonjo",
      role: "Student",
      time: "4 hours ago",
      question: "Why do we apply the integrating factor to both sides before evaluating the integral on the right?",
      answer: "Excellent inquiry, Blessing! Multiplying both sides by I(x) collapses the entire left-hand side into the exact derivative of a product: d/dx [y · I(x)], allowing immediate integration."
    }
  ]
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId') || 'fmath-02';
    const posts = discussionThreads[courseId] || [
      {
        id: Date.now(),
        author: "Samuel Adeleke",
        role: "Scholar",
        time: "1 hour ago",
        question: "How do we identify boundary conditions immediately from the exam question stem?",
        answer: "Look for initial states like t=0, x=0, or maximum height where velocity equals zero. That gives you the constant of integration C in under 15 seconds."
      }
    ];

    return NextResponse.json({ success: true, posts });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const courseId = body.courseId || 'fmath-02';

    if (!body.question) {
      return NextResponse.json({ error: 'Question text is required' }, { status: 400 });
    }

    const newPost = {
      id: Date.now(),
      author: body.author || 'You (Student)',
      role: 'Student',
      time: 'Just now',
      question: body.question,
      answer: `Thank you for your academic inquiry! Notice that by applying the foundational theorem outlined in the lecture notes, we can isolate the independent variable before evaluating boundary conditions. Keep up the high standard of problem solving! — Engr. Ajibade Opeyemi Phillip`
    };

    if (!discussionThreads[courseId]) {
      discussionThreads[courseId] = [];
    }
    discussionThreads[courseId].unshift(newPost);

    return NextResponse.json({
      success: true,
      message: 'Question posted and answered by Instructor',
      post: newPost
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

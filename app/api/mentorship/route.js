import { NextResponse } from 'next/server';

let mentorshipBookings = [];

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.examType) {
      return NextResponse.json({ error: 'Name and Target Exam / Subject are required' }, { status: 400 });
    }

    const booking = {
      id: `session-${Date.now()}`,
      name: body.name,
      examType: body.examType,
      slot: body.slot || '10:00 AM - 10:45 AM (WAT)',
      date: body.date || 'October 6, 2026',
      mentor: 'Engr. Ajibade Opeyemi Phillip',
      zoomLink: 'https://zoom.us/j/glgc-strategy-mentorship-ajibade',
      bookedAt: new Date().toISOString()
    };

    mentorshipBookings.unshift(booking);

    return NextResponse.json({
      success: true,
      message: `1-on-1 strategy session confirmed with Engr. Ajibade for ${body.name}! Zoom invitation dispatched.`,
      booking
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

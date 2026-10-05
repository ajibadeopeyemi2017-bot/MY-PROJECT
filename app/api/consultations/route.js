import { NextResponse } from 'next/server';

let consultations = [];

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.phone) {
      return NextResponse.json({ error: 'Name and Phone number are required' }, { status: 400 });
    }

    const consultationRecord = {
      id: `consult-${Date.now()}`,
      name: body.name,
      phone: body.phone,
      destination: body.destination || 'USA',
      examStatus: body.examStatus || 'Need SAT/IELTS',
      timestamp: new Date().toISOString(),
      advisorAssigned: 'Engr. Ajibade Opeyemi Phillip (Director)',
      status: 'Advisory Consultation Scheduled'
    };

    consultations.unshift(consultationRecord);

    return NextResponse.json({
      success: true,
      message: `Study abroad consultation booked successfully for ${body.name}! An advisor from the Ile-Ife office will reach out on WhatsApp/phone.`,
      consultation: consultationRecord
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

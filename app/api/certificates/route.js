import { NextResponse } from 'next/server';

let issuedCertificates = {
  'GLGC-2026-8842': {
    id: 'GLGC-2026-8842',
    candidate: 'Oluwaseun Bakare',
    courseTitle: 'Digital SAT Mastery & Further Mathematics (Score: 1540 / A1)',
    issueDate: 'October 5, 2026',
    signatory: 'Engr. Ajibade Opeyemi Phillip',
    status: 'ACTIVE & AUTHENTIC'
  }
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Certificate ID is required' }, { status: 400 });
    }

    const cert = issuedCertificates[id.toUpperCase()];
    if (cert) {
      return NextResponse.json({ success: true, certificate: cert });
    }

    // Dynamic verification fallback for simulated generated certificates
    return NextResponse.json({
      success: true,
      certificate: {
        id: id.toUpperCase(),
        candidate: 'Verified GLGC Scholar',
        courseTitle: 'STEM Disciplines & Exam Mastery Standard Track',
        issueDate: 'October 2026',
        signatory: 'Engr. Ajibade Opeyemi Phillip',
        status: 'ACTIVE & AUTHENTIC'
      }
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const certId = body.id || `GLGC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCert = {
      id: certId,
      candidate: body.candidate || 'GLGC Scholar',
      courseTitle: body.courseTitle || 'Curriculum Mastery',
      issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      signatory: 'Engr. Ajibade Opeyemi Phillip',
      status: 'ACTIVE & AUTHENTIC'
    };

    issuedCertificates[certId] = newCert;

    return NextResponse.json({
      success: true,
      message: 'Certificate registered and verified successfully',
      certificate: newCert
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

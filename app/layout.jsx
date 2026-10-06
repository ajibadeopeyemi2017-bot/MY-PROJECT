import '@/css/style.css';
import '@/css/classroom.css';
import '@/css/teacher.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata = {
  title: 'Greater Light Global Consult & Academy | Premier STEM & Standardized Exam School',
  description: 'Premier online school for Mathematics, Further Maths, Physics, Chemistry, Biology, English, and standardized test prep: SAT, IELTS, TOEFL, GRE, GMAT. Led by Engr. Ajibade Opeyemi Phillip.',
  keywords: 'online school, STEM courses, SAT prep, IELTS classes, GRE quantitative, Further Maths, Physics, Chemistry, Biology, study abroad admissions, Ile-Ife Nigeria',
  authors: [{ name: 'Engr. Ajibade Opeyemi Phillip' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Ambient Glowing Background Mesh */}
        <div className="ambient-glow-mesh" aria-hidden="true">
          <div className="mesh-orb-1"></div>
          <div className="mesh-orb-2"></div>
          <div className="mesh-orb-3"></div>
        </div>

        {children}

        {/* Global Toast Container */}
        <div id="toast-container" className="toast-container"></div>
      </body>
    </html>
  );
}

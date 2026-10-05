// Greater Light Global Consult & Academy (GLGC) - Courses & Curricula Database
// Director & Lead STEM Educator: Engr. Ajibade Opeyemi Phillip

export const INITIAL_COURSES = [
  {
    id: "math-01",
    title: "Pure Mathematics & Advanced Algebra Mastery",
    subject: "Mathematics",
    category: "STEM",
    badge: "Bestseller",
    instructor: "Engr. Ajibade Opeyemi Phillip",
    instructorRole: "Founder & Lead STEM Educator (15+ Yrs Exp)",
    instructorImg: "/assets/images/founder.jpg",
    rating: 4.96,
    reviewsCount: 420,
    studentsCount: 2450,
    duration: "42 Hours",
    lessonsCount: 38,
    level: "Intermediate to Advanced",
    priceUSD: 49,
    priceNGN: 35000,
    thumbnail: "/assets/images/stem_hologram.jpg",
    description: "Master algebraic structures, polynomial theory, logarithmic functions, sequence & series, and analytical geometry with intuitive engineering problem-solving methods.",
    topics: ["Polynomials & Quadratic Equations", "Sequences, Series & Progression", "Trigonometric Identities", "Coordinate Geometry", "Vectors & Matrices", "Intro to Differential Calculus"],
    syllabus: [
      {
        module: "Module 1: Foundations of Advanced Algebra",
        duration: "6 Hours",
        lessons: [
          { title: "Polynomial Remainder & Factor Theorems", duration: "45 min" },
          { title: "Partial Fractions Decomposition Techniques", duration: "50 min" },
          { title: "Indeterminate Forms & Radical Equations", duration: "40 min" }
        ]
      },
      {
        module: "Module 2: Sequences, Series & Mathematical Induction",
        duration: "8 Hours",
        lessons: [
          { title: "Arithmetic & Geometric Progressions (AP/GP)", duration: "55 min" },
          { title: "Infinite Series Convergence Tests", duration: "60 min" },
          { title: "Binomial Theorem for Any Index", duration: "50 min" }
        ]
      },
      {
        module: "Module 3: Trigonometry & Analytical Geometry",
        duration: "10 Hours",
        lessons: [
          { title: "Compound Angles & Double Angle Proofs", duration: "60 min" },
          { title: "Hyperbolic Functions & Applications", duration: "45 min" },
          { title: "Conic Sections: Ellipse, Parabola, Hyperbola", duration: "75 min" }
        ]
      },
      {
        module: "Module 4: Exam-Standard Problem Drills (WASSCE, NECO, Pre-Uni)",
        duration: "8 Hours",
        lessons: [
          { title: "Top 50 High-Frequency Calculation Traps", duration: "60 min" },
          { title: "Speed-Solving Hacks for Objective Questions", duration: "50 min" },
          { title: "Full Mock Assessment & Live Walkthrough", duration: "90 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "If (x - 2) is a factor of f(x) = 2x³ - 3x² + kx - 6, find the value of k.",
        options: ["k = -1", "k = 1", "k = 2", "k = -5"],
        correct: 1,
        explanation: "By Factor Theorem, f(2) = 0 => 2(2)³ - 3(2)² + k(2) - 6 = 0 => 16 - 12 + 2k - 6 = 0 => 2k - 2 = 0 => 2k = 2 => k = 1."
      },
      {
        question: "What is the sum to infinity of the GP: 16, 8, 4, 2...?",
        options: ["24", "32", "64", "48"],
        correct: 1,
        explanation: "S_inf = a / (1 - r). Here a = 16, r = 1/2. S_inf = 16 / (1 - 0.5) = 16 / 0.5 = 32."
      }
    ]
  },
  {
    id: "fmath-02",
    title: "Further Mathematics: Comprehensive Calculus & Mechanics",
    subject: "Further Maths",
    category: "STEM",
    badge: "Flagship",
    instructor: "Engr. Ajibade Opeyemi Phillip",
    instructorRole: "Founder & Lead STEM Educator",
    instructorImg: "/assets/images/founder.jpg",
    rating: 4.99,
    reviewsCount: 512,
    studentsCount: 1890,
    duration: "56 Hours",
    lessonsCount: 46,
    level: "Advanced / Pre-University",
    priceUSD: 59,
    priceNGN: 42000,
    thumbnail: "/assets/images/founder.jpg",
    description: "The definitive Further Maths masterclass engineered by Engr. Ajibade. In-depth differentiation, integration by parts, differential equations, vectors in 3D, and rigid body statics.",
    topics: ["Calculus of Single Variable", "Integration Techniques", "First & Second Order Differential Equations", "Mechanics: Projectiles & Circular Motion", "Probability Distributions (Binomial & Poisson)", "Matrices & Linear Transformations"],
    syllabus: [
      {
        module: "Module 1: Advanced Differential Calculus",
        duration: "10 Hours",
        lessons: [
          { title: "Product, Quotient & Chain Rules from First Principles", duration: "55 min" },
          { title: "Implicit Differentiation & Parametric Curves", duration: "60 min" },
          { title: "Taylor & Maclaurin Series Expansions", duration: "65 min" }
        ]
      },
      {
        module: "Module 2: Integral Calculus & Differential Equations",
        duration: "14 Hours",
        lessons: [
          { title: "Integration by Parts & Reduction Formulas", duration: "70 min" },
          { title: "Integrating Factors for 1st Order Linear ODEs", duration: "65 min" },
          { title: "Second Order Homogeneous & Non-Homogeneous ODEs", duration: "80 min" }
        ]
      },
      {
        module: "Module 3: Theoretical & Applied Mechanics",
        duration: "12 Hours",
        lessons: [
          { title: "Projectile Motion on Horizontal & Inclined Planes", duration: "75 min" },
          { title: "Work, Energy & Power in Conservative Fields", duration: "60 min" },
          { title: "Friction, Limiting Equilibrium & Moments", duration: "70 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "Find dy/dx if y = e^(2x) · sin(3x).",
        options: [
          "e^(2x) · cos(3x)",
          "e^(2x) [2sin(3x) + 3cos(3x)]",
          "2e^(2x) + 3cos(3x)",
          "5e^(2x) · sin(3x)"
        ],
        correct: 1,
        explanation: "By Product Rule: d/dx(uv) = u'v + uv'. Here u = e^(2x), v = sin(3x). u' = 2e^(2x), v' = 3cos(3x). dy/dx = 2e^(2x)sin(3x) + 3e^(2x)cos(3x) = e^(2x)[2sin(3x) + 3cos(3x)]."
      }
    ]
  },
  {
    id: "phys-03",
    title: "AP & University Physics: Mechanics, Waves & Electromagnetism",
    subject: "Physics",
    category: "STEM",
    badge: "Rigorous",
    instructor: "Engr. Ajibade Opeyemi Phillip",
    instructorRole: "Civil Engineer & Physics Lead",
    instructorImg: "/assets/images/founder.jpg",
    rating: 4.95,
    reviewsCount: 310,
    studentsCount: 1420,
    duration: "48 Hours",
    lessonsCount: 40,
    level: "Advanced High School & Pre-Med",
    priceUSD: 49,
    priceNGN: 35000,
    thumbnail: "/assets/images/stem_hologram.jpg",
    description: "Rigorous physical science grounding: kinematics, rotational dynamics, simple harmonic motion, wave mechanics, thermodynamics, and Maxwell's electromagnetism equations.",
    topics: ["Kinematics & Dynamics in 2D", "Rotational Dynamics & Torque", "Simple Harmonic Motion & Resonance", "Thermodynamics & Heat Cycles", "Coulomb's Law, Electric Fields & Capacitance", "Magnetic Forces & Electromagnetic Induction"],
    syllabus: [
      {
        module: "Module 1: Classical Mechanics & Rotational Motion",
        duration: "12 Hours",
        lessons: [
          { title: "Newton's Laws & Conservation of Linear Momentum", duration: "60 min" },
          { title: "Moment of Inertia & Rotational Kinetic Energy", duration: "75 min" },
          { title: "Angular Momentum Conservation in Planetary Orbits", duration: "65 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "A solid sphere and a thin hoop of equal mass and radius roll down an incline without slipping. Which reaches the bottom first?",
        options: [
          "The thin hoop",
          "The solid sphere",
          "Both reach simultaneously",
          "Depends on the angle of the incline"
        ],
        correct: 1,
        explanation: "The solid sphere has a smaller moment of inertia (I = 2/5 mr²) than the thin hoop (I = mr²), meaning less potential energy is converted into rotational kinetic energy and more into translational acceleration."
      }
    ]
  },
  {
    id: "chem-04",
    title: "Organic & Physical Chemistry: Reaction Mechanisms & Stoichiometry",
    subject: "Chemistry",
    category: "STEM",
    badge: "High Yield",
    instructor: "Dr. Adebayo Ogunlesi & Engr. Ajibade",
    instructorRole: "Senior Chemistry Lecturers",
    instructorImg: "/assets/images/founder.jpg",
    rating: 4.93,
    reviewsCount: 285,
    studentsCount: 1150,
    duration: "40 Hours",
    lessonsCount: 34,
    level: "A-Levels, Pre-Med & UTME/WASSCE",
    priceUSD: 45,
    priceNGN: 32000,
    thumbnail: "/assets/images/studio_analytics.jpg",
    description: "Deep dive into electron pushing mechanisms, SN1/SN2/E1/E2 pathways, aromatic substitutions, stereochemistry, chemical equilibria, acid-base buffers, and thermochemistry.",
    topics: ["Structure & Bonding in Carbon Compounds", "Nucleophilic Substitution & Elimination Mechanisms", "Electrophilic Aromatic Substitution", "Stereochemistry: Chirality & Enantiomers", "Chemical Kinetics & Reaction Rates", "Buffer Solutions & Henderson-Hasselbalch Equation"],
    syllabus: [
      {
        module: "Module 1: Reaction Mechanisms (SN1, SN2, E1, E2)",
        duration: "10 Hours",
        lessons: [
          { title: "Nucleophiles, Electrophiles & Leaving Group Ability", duration: "50 min" },
          { title: "SN1 vs SN2: Transition States & Stereochemical Inversion", duration: "65 min" },
          { title: "Zaitsev vs Hofmann Elimination Regioselectivity", duration: "55 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "Which solvent favors an SN2 mechanism between 1-bromobutane and sodium cyanide?",
        options: ["Water (protic)", "Methanol (protic)", "Dimethyl sulfoxide - DMSO (aprotic)", "Ethanol (protic)"],
        correct: 2,
        explanation: "Polar aprotic solvents such as DMSO or acetone do not solvate anions strongly via hydrogen bonding, leaving the nucleophile free and reactive for concerted backside attack in SN2."
      }
    ]
  },
  {
    id: "bio-05",
    title: "Molecular Biology, Genetics & Cellular Physiology",
    subject: "Biology",
    category: "STEM",
    badge: "Core Science",
    instructor: "GLGC Life Sciences Faculty",
    instructorRole: "Biochemistry & Cellular Specialists",
    instructorImg: "/assets/images/founder.jpg",
    rating: 4.91,
    reviewsCount: 198,
    studentsCount: 940,
    duration: "36 Hours",
    lessonsCount: 30,
    level: "Secondary & Pre-University",
    priceUSD: 39,
    priceNGN: 28000,
    thumbnail: "/assets/images/stem_hologram.jpg",
    description: "Comprehensive preparation covering molecular cell architecture, DNA replication and protein synthesis, Mendelian and non-Mendelian genetics, physiology, and evolutionary mechanisms.",
    topics: ["Cell Structure & Organelle Functions", "DNA Replication, Transcription & Translation", "Mendelian Genetics & Pedigree Analysis", "Cellular Respiration & Glycolysis Pathways", "Human Nervous & Endocrine Systems", "Ecology & Population Dynamics"],
    syllabus: [
      {
        module: "Module 1: Molecular Genetics & Gene Expression",
        duration: "8 Hours",
        lessons: [
          { title: "DNA Semi-Conservative Replication Machinery", duration: "55 min" },
          { title: "Transcription & Post-Transcriptional RNA Modification", duration: "50 min" },
          { title: "Genetic Code & Ribosomal Translation", duration: "60 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "During which phase of meiosis do homologous chromosomes separate?",
        options: ["Metaphase I", "Anaphase I", "Anaphase II", "Telophase II"],
        correct: 1,
        explanation: "In Anaphase I, homologous chromosomes are pulled to opposite poles, reducing chromosome number from diploid to haploid. Sister chromatids separate later in Anaphase II."
      }
    ]
  },
  {
    id: "eng-06",
    title: "English Language: Academic Essay Composition & Syntax Mastery",
    subject: "English",
    category: "STEM",
    badge: "Fundamental",
    instructor: "GLGC Humanities Faculty",
    instructorRole: "Senior English Examiner",
    instructorImg: "/assets/images/founder.jpg",
    rating: 4.94,
    reviewsCount: 340,
    studentsCount: 2100,
    duration: "30 Hours",
    lessonsCount: 26,
    level: "All Candidates",
    priceUSD: 35,
    priceNGN: 25000,
    thumbnail: "/assets/images/sat_ielts_banner.png",
    description: "Sharpen critical essay composition, rhetorical argumentation, grammatical concord, vocabulary precision, and comprehension synthesis for international and regional exams.",
    topics: ["Grammatical Concord & Subject-Verb Agreement", "Essay Structure: Argumentative, Expository & Narrative", "Register, Tone & Rhetorical Devices", "Summary Writing & Precise Synthesis", "Lexis & Structure Vocabulary Expansion"],
    syllabus: [
      {
        module: "Module 1: Syntax & Concord Architecture",
        duration: "6 Hours",
        lessons: [
          { title: "Principles of Proximity & Accompaniment Concord", duration: "45 min" },
          { title: "Subjunctive Mood & Conditional Clauses", duration: "50 min" },
          { title: "Common Grammatical Fallacies & Redundancies", duration: "40 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "Choose the grammatically correct sentence:",
        options: [
          "The principal alongside the teachers are in the assembly hall.",
          "The principal alongside the teachers is in the assembly hall.",
          "The principal alongside the teachers were in the assembly hall.",
          "The principal alongside the teachers have been in the assembly hall."
        ],
        correct: 1,
        explanation: "When a singular subject ('The principal') is joined to another noun by phrases such as 'alongside', 'as well as', or 'in addition to', the parenthetical phrase does not affect the number of the verb. Thus, singular 'is' is correct."
      }
    ]
  },
  {
    id: "sat-07",
    title: "Digital SAT Masterclass (Target 1550+)",
    subject: "SAT",
    category: "Standardized Exam",
    badge: "Flagship Prep",
    instructor: "Engr. Ajibade Opeyemi Phillip",
    instructorRole: "Lead SAT Coordinator (1550+ Track)",
    instructorImg: "/assets/images/founder.jpg",
    rating: 4.99,
    reviewsCount: 640,
    studentsCount: 2890,
    duration: "52 Hours",
    lessonsCount: 44,
    level: "High School & College Candidates",
    priceUSD: 69,
    priceNGN: 48000,
    thumbnail: "/assets/images/sat_ielts_banner.png",
    description: "Accelerate your score to 1550+ with Engr. Ajibade's proprietary Desmos graphing calculator tactics, adaptive module pacing, reading synthesis methods, and vocabulary drills.",
    topics: ["Desmos Calculator Speed Shortcuts", "Advanced Math: Non-Linear Equations & Circle Geometry", "Problem Solving & Data Analysis", "Reading: Central Ideas, Evidence & Paired Claims", "Writing: Transitions, Rhetorical Synthesis & Boundaries"],
    syllabus: [
      {
        module: "Module 1: Built-In Desmos Calculator Super-Tactics",
        duration: "10 Hours",
        lessons: [
          { title: "Solving Systems of Equations in 10 Seconds via Intersections", duration: "60 min" },
          { title: "Regression Modeling (y1 ~ mx1 + b) for Mystery Constants", duration: "55 min" },
          { title: "Function Transformations & Max/Min Vertex Finding", duration: "50 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "In the xy-plane, the graph of y = 3x² - 18x + 23 has its vertex at (h, k). What is the value of k?",
        options: ["-4", "3", "5", "-5"],
        correct: 0,
        explanation: "For y = ax² + bx + c, the x-coordinate of the vertex is h = -b/(2a) = -(-18)/(2*3) = 18/6 = 3. Substituting x = 3 gives k = 3(3)² - 18(3) + 23 = 27 - 54 + 23 = -4. (Can also be seen directly in Desmos by typing the equation and clicking the minimum)."
      }
    ]
  },
  {
    id: "ielts-08",
    title: "IELTS Academic & General Masterclass (Target Band 8.5)",
    subject: "IELTS",
    category: "Standardized Exam",
    badge: "Guaranteed Band",
    instructor: "GLGC International Exam Faculty",
    instructorRole: "Certified British Council Trained Tutors",
    instructorImg: "/assets/images/founder.jpg",
    rating: 4.97,
    reviewsCount: 520,
    studentsCount: 2310,
    duration: "45 Hours",
    lessonsCount: 36,
    level: "All Candidates (Study & Emigration)",
    priceUSD: 59,
    priceNGN: 42000,
    thumbnail: "/assets/images/study_abroad_banner.png",
    description: "Attain overall Band 8.0-8.5. Task 1 visual report templates, Task 2 discursive essay structures, 2-minute speaking cue card strategies, and fast skimming listening/reading drills.",
    topics: ["Academic Writing Task 1: Graphs, Maps & Process Diagrams", "Writing Task 2: Opinion, Discussion & Problem-Solution Essays", "Speaking Part 1, 2 & 3 Fluency & Pronunciation Drills", "Reading: True/False/Not Given & Heading Matching Tricks", "Listening: Distractor Elimination & Accent Adaptation"],
    syllabus: [
      {
        module: "Module 1: Writing Task 2 Band 8.5 Architecture",
        duration: "10 Hours",
        lessons: [
          { title: "4-Paragraph High-Band Essay Template", duration: "60 min" },
          { title: "Cohesion, Coherence & Advanced Transitional Connectors", duration: "55 min" },
          { title: "Lexical Resource: Band 9 Collocations for Education & Tech", duration: "50 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "In IELTS Reading, what is the key difference between FALSE and NOT GIVEN?",
        options: [
          "FALSE means the passage says the exact opposite; NOT GIVEN means the text does not confirm or contradict it.",
          "There is no difference, both are scored equally.",
          "NOT GIVEN means the question is too difficult.",
          "FALSE applies only to numbers; NOT GIVEN applies to opinions."
        ],
        correct: 0,
        explanation: "FALSE requires direct contradiction in the passage. If the passage does not provide enough information to definitively prove or disprove the statement, the correct answer is NOT GIVEN."
      }
    ]
  },
  {
    id: "toefl-09",
    title: "TOEFL iBT Complete Preparation",
    subject: "TOEFL",
    category: "Standardized Exam",
    badge: "110+ Target",
    instructor: "GLGC Language Tutors",
    instructorRole: "ETS TOEFL Certified Instructors",
    instructorImg: "/assets/images/founder.jpg",
    rating: 4.92,
    reviewsCount: 215,
    studentsCount: 980,
    duration: "38 Hours",
    lessonsCount: 32,
    level: "University Applicants",
    priceUSD: 55,
    priceNGN: 39000,
    thumbnail: "/assets/images/admissions_banner.png",
    description: "Master academic campus dialogues, integrated speaking response templates, speed typing for academic discussion essays, and listening retention note-taking shortcuts.",
    topics: ["Integrated & Academic Discussion Writing", "Speaking Independent & Campus Dialogue Responses", "Reading Academic Passage Inference", "Listening Note-taking Abbreviations"],
    syllabus: [
      {
        module: "Module 1: Integrated Speaking & Campus Lecture Response",
        duration: "8 Hours",
        lessons: [
          { title: "Note-Taking Shorthand for Two-Speaker Dialogues", duration: "50 min" },
          { title: "Structuring 60-Second Spoken Responses with Precision", duration: "55 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "In TOEFL Writing for an Academic Discussion, how long should your response be?",
        options: ["Under 50 words", "At least 100 words (recommended 120-150 words)", "Over 500 words", "Exactly one paragraph of 30 words"],
        correct: 1,
        explanation: "ETS recommends contributing at least 100 words (typically 120-150 well-developed words) in response to the professor's prompt and other students' contributions within 10 minutes."
      }
    ]
  },
  {
    id: "gre-10",
    title: "GRE General: Quantitative 168+ & Verbal Shortcuts",
    subject: "GRE",
    category: "Standardized Exam",
    badge: "Target 330+",
    instructor: "Engr. Ajibade Opeyemi Phillip",
    instructorRole: "Lead Quantitative GRE Specialist",
    instructorImg: "/assets/images/founder.jpg",
    rating: 4.98,
    reviewsCount: 390,
    studentsCount: 1650,
    duration: "50 Hours",
    lessonsCount: 42,
    level: "Postgraduate & Masters/PhD Aspirants",
    priceUSD: 75,
    priceNGN: 52000,
    thumbnail: "/assets/images/founder.jpg",
    description: "Engineered specifically for engineering and STEM graduate applicants targeting 168+ in Quantitative reasoning. QC trap avoidance, advanced number theory, and 1,000 high-frequency vocabularies.",
    topics: ["Quantitative Comparison Elimination Strategies", "Number Theory: Primes, Divisibility & Modular Arithmetic", "Combinatorics, Permutations & Probability Trees", "Advanced Geometry & Coordinate Solid Geometry", "Verbal: Text Completion Twin-Words & Sentence Equivalence"],
    syllabus: [
      {
        module: "Module 1: Quantitative Comparison (QC) Elimination Traps",
        duration: "10 Hours",
        lessons: [
          { title: "Testing Number Sets: {-1, 0, 1, Fractions, Negatives}", duration: "60 min" },
          { title: "Simplifying Columns Simultaneously Without Cross-Multiplying Signs", duration: "55 min" },
          { title: "Geometric QC Figures: Not Drawn to Scale Pitfalls", duration: "65 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "Quantity A: (x + 1)(x - 1) | Quantity B: x² - 2. Which quantity is greater?",
        options: [
          "Quantity A is greater.",
          "Quantity B is greater.",
          "The two quantities are equal.",
          "The relationship cannot be determined from the information given."
        ],
        correct: 0,
        explanation: "Quantity A expands to x² - 1. Quantity B is x² - 2. Subtracting x² from both quantities yields: Quantity A = -1, Quantity B = -2. Since -1 > -2, Quantity A is strictly greater for ALL real values of x."
      }
    ]
  },
  {
    id: "gmat-11",
    title: "GMAT Focus Edition: Data Insights & Problem Solving",
    subject: "GMAT",
    category: "Standardized Exam",
    badge: "Top Tier",
    instructor: "Engr. Ajibade & Business Test Faculty",
    instructorRole: "Senior Analytical Faculty",
    instructorImg: "/assets/images/studio_analytics.jpg",
    rating: 4.96,
    reviewsCount: 230,
    studentsCount: 890,
    duration: "46 Hours",
    lessonsCount: 38,
    level: "MBA & Business School Candidates",
    priceUSD: 79,
    priceNGN: 55000,
    thumbnail: "/assets/images/studio_analytics.jpg",
    description: "Dominate the GMAT Focus Edition: Data Insights (Data Sufficiency, Multi-Source Reasoning, Two-Part Analysis), quantitative arithmetic rigor, and critical reasoning argumentation.",
    topics: ["Data Sufficiency Decision Matrix (AD/BCE)", "Multi-Source Reasoning & Table Sorting", "Two-Part Analysis Quantitative Optimization", "Critical Reasoning: Assumptions, Weakeners & Boldface", "Word Problems: Work-Rate, Mixtures & Overlapping Sets"],
    syllabus: [
      {
        module: "Module 1: Data Sufficiency Master Strategy",
        duration: "10 Hours",
        lessons: [
          { title: "The 12-Second AD/BCE Elimination Protocol", duration: "60 min" },
          { title: "Yes/No vs Value Questions: Avoiding Common Traps", duration: "65 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "Is x > y? (1) x + y > 0  (2) x - y > 0",
        options: [
          "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
          "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
          "BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.",
          "EACH statement ALONE is sufficient."
        ],
        correct: 1,
        explanation: "Statement (2) gives x - y > 0 => x > y directly, which answers 'Yes' definitively. Statement (1) x + y > 0 does not tell us whether x > y (e.g. x=2, y=5 gives 7>0 but x<y; x=5, y=2 gives 7>0 and x>y). Hence (2) ALONE is sufficient."
      }
    ]
  }
];

// Helper functions
export function getStoredCourses() {
  if (typeof window === 'undefined') return INITIAL_COURSES;
  const local = localStorage.getItem('glgc_custom_courses');
  if (local) {
    try {
      const parsed = JSON.parse(local);
      return [...INITIAL_COURSES, ...parsed];
    } catch(e) {
      console.error(e);
    }
  }
  return INITIAL_COURSES;
}

export function saveCustomCourse(courseData) {
  if (typeof window === 'undefined') return;
  const local = localStorage.getItem('glgc_custom_courses');
  let customList = [];
  if (local) {
    try {
      customList = JSON.parse(local);
    } catch(e) {
      customList = [];
    }
  }
  customList.unshift(courseData);
  localStorage.setItem('glgc_custom_courses', JSON.stringify(customList));
}

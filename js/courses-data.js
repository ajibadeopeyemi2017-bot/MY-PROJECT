// Greater Light Global Consult & Academy (GLGC) - Courses & Curricula Database
// Lead Instructor & Director: Engr. Ajibade Opeyemi Phillip

const INITIAL_COURSES = [
  {
    id: "math-01",
    title: "Pure Mathematics & Advanced Algebra Mastery",
    subject: "Mathematics",
    category: "STEM",
    badge: "Bestseller",
    instructor: "Engr. Ajibade Opeyemi Phillip",
    instructorRole: "Founder & Lead STEM Educator (15+ Yrs Exp)",
    instructorImg: "assets/images/founder.jpg",
    rating: 4.96,
    reviewsCount: 420,
    studentsCount: 2450,
    duration: "42 Hours",
    lessonsCount: 38,
    level: "Intermediate to Advanced",
    priceUSD: 49,
    priceNGN: 35000,
    thumbnail: "assets/images/stem_hologram.jpg",
    description: "Master algebraic structures, polynomial theory, logarithmic functions, sequence & series, and analytical geometry with intuitive engineering problem-solving methods.",
    topics: ["Polynomials & Quadratic Equations", "Sequences, Series & Progression", "Trigonometric Identities", "Coordinate Geometry", "Vectors & Matrices", "Intro to Differential Calculus"],
    syllabus: [
      {
        module: "Module 1: Foundations of Advanced Algebra",
        duration: "6 Hours",
        lessons: [
          { title: "Polynomial Remainder & Factor Theorems", duration: "45 min", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
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
        correct: 0,
        explanation: "By Factor Theorem, f(2) = 0 => 2(8) - 3(4) + 2k - 6 = 0 => 16 - 12 + 2k - 6 = 0 => 2k - 2 = 0 => k = 1. Wait, 16 - 12 - 6 = -2, so 2k = 2 => k = 1."
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
    instructorImg: "assets/images/founder.jpg",
    rating: 4.99,
    reviewsCount: 512,
    studentsCount: 1890,
    duration: "56 Hours",
    lessonsCount: 46,
    level: "Advanced / Pre-University",
    priceUSD: 59,
    priceNGN: 42000,
    thumbnail: "assets/images/founder.jpg",
    description: "The definitive Further Maths masterclass engineered by Engr. Ajibade. In-depth differentiation, integration by parts, differential equations, vectors in 3D, and rigid body statics.",
    topics: ["Calculus of Single Variable", "Integration Techniques", "First & Second Order Differential Equations", "Mechanics: Projectiles & Circular Motion", "Probability Distributions (Binomial & Poisson)", "Matrices & Linear Transformations"],
    syllabus: [
      {
        module: "Module 1: Advanced Differential Calculus",
        duration: "10 Hours",
        lessons: [
          { title: "First Principles & Chain, Product, Quotient Rules", duration: "60 min" },
          { title: "Implicit & Parametric Differentiation", duration: "65 min" },
          { title: "Maclaurin & Taylor Series Expansions", duration: "70 min" },
          { title: "Maxima, Minima & Optimization Real-World Models", duration: "55 min" }
        ]
      },
      {
        module: "Module 2: Integral Calculus & Differential Equations",
        duration: "14 Hours",
        lessons: [
          { title: "Integration by Parts & Tabular Method", duration: "60 min" },
          { title: "Trigonometric & Partial Fraction Substitutions", duration: "75 min" },
          { title: "First-Order Separable Differential Equations", duration: "65 min" },
          { title: "Integrating Factors & Linear ODEs", duration: "80 min" }
        ]
      },
      {
        module: "Module 3: Mechanics & Vector Spaces",
        duration: "12 Hours",
        lessons: [
          { title: "Vectors in 3-Dimensional Space & Dot/Cross Products", duration: "60 min" },
          { title: "Projectile Motion on Inclined Planes", duration: "70 min" },
          { title: "Equilibrium of Coplanar Forces & Moments", duration: "65 min" }
        ]
      },
      {
        module: "Module 4: Statistics & Continuous Probability",
        duration: "8 Hours",
        lessons: [
          { title: "Permutations & Combinations in Complex Scenarios", duration: "55 min" },
          { title: "Poisson & Normal Distribution Curve Analysis", duration: "65 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "Evaluate the derivative of y = ln(sec(x) + tan(x)) with respect to x.",
        options: ["sec(x)", "tan(x)", "sec²(x)", "sec(x)tan(x)"],
        correct: 0,
        explanation: "dy/dx = (sec(x)tan(x) + sec²(x)) / (sec(x) + tan(x)) = sec(x)(tan(x) + sec(x)) / (sec(x) + tan(x)) = sec(x)."
      },
      {
        question: "What is the integrating factor for the differential equation dy/dx + (2/x)y = x³?",
        options: ["x", "x²", "2ln(x)", "e^(2x)"],
        correct: 1,
        explanation: "I(x) = e^(int (2/x) dx) = e^(2 ln x) = e^(ln x²) = x²."
      }
    ]
  },
  {
    id: "phys-03",
    title: "University & AP Physics: Mechanics, Waves & Electromagnetism",
    subject: "Physics",
    category: "STEM",
    badge: "High Demand",
    instructor: "Engr. Ajibade Opeyemi Phillip",
    instructorRole: "Founder & Lead STEM Educator",
    instructorImg: "assets/images/founder.jpg",
    rating: 4.95,
    reviewsCount: 380,
    studentsCount: 2100,
    duration: "48 Hours",
    lessonsCount: 40,
    level: "Secondary to Undergraduate",
    priceUSD: 49,
    priceNGN: 35000,
    thumbnail: "assets/images/stem_hologram.jpg",
    description: "Understand the core physical laws of our universe. From Newton's laws to electromagnetism, optics, electric fields, and thermodynamics, with simulated lab demonstrations.",
    topics: ["Kinematics & Dynamics", "Work, Energy & Momentum Conservation", "Simple Harmonic Motion & Resonance", "Electric Circuits & Gauss's Law", "Magnetic Induction & AC Circuits", "Modern Physics & Radioactivity"],
    syllabus: [
      {
        module: "Module 1: Classical Mechanics & Force Vectors",
        duration: "12 Hours",
        lessons: [
          { title: "2D Motion & Projectile Trajectory Calculations", duration: "60 min" },
          { title: "Newtonian Friction, Incline Planes & Tension", duration: "55 min" },
          { title: "Elastic & Inelastic Collisions in Momentum Conservation", duration: "65 min" }
        ]
      },
      {
        module: "Module 2: Thermal Physics & Wave Phenomena",
        duration: "10 Hours",
        lessons: [
          { title: "Thermodynamics Laws, Heat Capacities & Latent Heat", duration: "60 min" },
          { title: "Wave Motion, Doppler Effect & Sound Resonance", duration: "55 min" },
          { title: "Geometrical Optics: Refraction, Lenses & Mirrors", duration: "65 min" }
        ]
      },
      {
        module: "Module 3: Electricity, Magnetism & Electronics",
        duration: "12 Hours",
        lessons: [
          { title: "Coulomb's Law, Electric Potential & Capacitors", duration: "65 min" },
          { title: "Kirchhoff's Laws & DC Circuit Networks", duration: "70 min" },
          { title: "Faraday's & Lenz's Laws of Electromagnetic Induction", duration: "60 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "A ball is launched horizontally at 15 m/s from a cliff of height 45m. How far from the base does it hit the ground? (g = 10 m/s²)",
        options: ["30 m", "45 m", "60 m", "90 m"],
        correct: 1,
        explanation: "Time of flight t = sqrt(2h/g) = sqrt(90/10) = sqrt(9) = 3s. Range = vx * t = 15 * 3 = 45 meters."
      }
    ]
  },
  {
    id: "chem-04",
    title: "General & Organic Chemistry: Mechanisms, Energetics & Stoichiometry",
    subject: "Chemistry",
    category: "STEM",
    badge: "Popular",
    instructor: "Dr. Adebayo Ogunlesi & Engr. Ajibade",
    instructorRole: "Senior Chemistry Fellow & Co-Instructor",
    instructorImg: "assets/images/studio_analytics.jpg",
    rating: 4.93,
    reviewsCount: 310,
    studentsCount: 1650,
    duration: "40 Hours",
    lessonsCount: 36,
    level: "Secondary to Pre-Med",
    priceUSD: 45,
    priceNGN: 32000,
    thumbnail: "assets/images/studio_analytics.jpg",
    description: "Deep dive into chemical bonding, reaction kinetics, chemical equilibria, redox reactions, electrochemistry, and systematic IUPAC nomenclature & reaction mechanisms.",
    topics: ["Atomic Structure & Periodic Trends", "Chemical Bonding & Hybridization", "Stoichiometry & Mole Concept", "Chemical Kinetics & Equilibrium", "Electrochemistry & Redox Reactions", "Organic Reaction Mechanisms (Alkanes to Amines)"],
    syllabus: [
      {
        module: "Module 1: Physical Chemistry & Stoichiometry",
        duration: "10 Hours",
        lessons: [
          { title: "The Mole Concept, Limiting Reagents & Gas Laws", duration: "60 min" },
          { title: "Thermochemistry: Hess's Law & Calorimetry", duration: "55 min" },
          { title: "Rate Laws, Activation Energy & Catalysis", duration: "65 min" }
        ]
      },
      {
        module: "Module 2: Inorganic Chemistry & Bonding",
        duration: "8 Hours",
        lessons: [
          { title: "VSEPR Theory & Molecular Geometry", duration: "50 min" },
          { title: "Transition Metal Complexes & Coordination Numbers", duration: "60 min" }
        ]
      },
      {
        module: "Module 3: Organic Synthesis & Spectroscopy",
        duration: "12 Hours",
        lessons: [
          { title: "Electrophilic Addition & Nucleophilic Substitution (SN1/SN2)", duration: "75 min" },
          { title: "Carbonyl Chemistry: Aldehydes, Ketones & Esters", duration: "70 min" },
          { title: "IR & NMR Spectroscopy Interpretation Basics", duration: "60 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "What is the hybridization of the central carbon atom in ethyne (acetylene, C₂H₂)?",
        options: ["sp³", "sp²", "sp", "dsp²"],
        correct: 2,
        explanation: "Ethyne has a triple bond between carbons and single C-H bonds, having 2 effective electron domains, yielding sp hybridization with 180° linear geometry."
      }
    ]
  },
  {
    id: "bio-05",
    title: "Modern Biology: Cell Physiology, Genetics & Human Anatomy",
    subject: "Biology",
    category: "STEM",
    badge: "Essential",
    instructor: "Dr. Chioma Nwachukwu (Ph.D.)",
    instructorRole: "Head of Life Sciences & Medical Prep",
    instructorImg: "assets/images/sat_ielts_banner.png",
    rating: 4.91,
    reviewsCount: 260,
    studentsCount: 1420,
    duration: "36 Hours",
    lessonsCount: 32,
    level: "Secondary to Pre-Health",
    priceUSD: 42,
    priceNGN: 30000,
    thumbnail: "assets/images/admissions_banner.png",
    description: "An engaging course covering cellular metabolism, DNA replication, Mendelian genetics, biotechnology, homeostasis, circulatory & nervous systems, and ecology.",
    topics: ["Cell Structure & Biochemical Membranes", "Cellular Respiration & Photosynthesis", "Molecular Genetics & Protein Synthesis", "Mendelian Inheritance & Pedigree Analysis", "Human Organ Systems & Homeostasis", "Ecology & Population Dynamics"],
    syllabus: [
      {
        module: "Module 1: Cellular Biology & Metabolism",
        duration: "8 Hours",
        lessons: [
          { title: "Membrane Transport: Osmosis, Diffusion & Active Pumps", duration: "50 min" },
          { title: "Glycolysis, Krebs Cycle & Oxidative Phosphorylation", duration: "65 min" }
        ]
      },
      {
        module: "Module 2: Genetics & Biotechnology",
        duration: "10 Hours",
        lessons: [
          { title: "DNA Replication & Transcription/Translation Machinery", duration: "65 min" },
          { title: "Monohybrid & Dihybrid Crosses with Epistasis", duration: "60 min" },
          { title: "CRISPR, Gel Electrophoresis & Recombinant DNA", duration: "55 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "During which phase of meiosis do homologous chromosomes cross over and recombine genetic material?",
        options: ["Metaphase I", "Prophase I", "Anaphase II", "Telophase I"],
        correct: 1,
        explanation: "Crossing over occurs specifically during Prophase I of meiosis (Pachytene stage) between non-sister chromatids of homologous chromosomes."
      }
    ]
  },
  {
    id: "eng-06",
    title: "Mastering Advanced English & Academic Writing",
    subject: "English",
    category: "Humanities & Core",
    badge: "Foundation",
    instructor: "Prof. Kenneth O. Lawson",
    instructorRole: "Linguist & Standardized English Examiner",
    instructorImg: "assets/images/sat_ielts_banner.png",
    rating: 4.94,
    reviewsCount: 340,
    studentsCount: 1780,
    duration: "30 Hours",
    lessonsCount: 28,
    level: "All Levels",
    priceUSD: 39,
    priceNGN: 28000,
    thumbnail: "assets/images/admissions_banner.png",
    description: "Elevate your vocabulary, grammar mastery, rhetorical precision, essay structure, critical reading analysis, and academic writing for top exam performance.",
    topics: ["Grammatical Concord & Syntax Rules", "Vocabulary in Context & Etymology", "Critical Reading & Tone Analysis", "Argumentative & Persuasive Essay Crafting", "Common Lexical Errors & Idiomatic Usage"],
    syllabus: [
      {
        module: "Module 1: Grammatical Precision & Structural Analysis",
        duration: "8 Hours",
        lessons: [
          { title: "Subject-Verb Concord & Complex Inversion Structures", duration: "55 min" },
          { title: "Dangling Modifiers, Parallelism & Faulty Comparisons", duration: "50 min" }
        ]
      },
      {
        module: "Module 2: High-Scoring Essay Composition",
        duration: "10 Hours",
        lessons: [
          { title: "Structuring Thesis Statements & Evidence Synthesis", duration: "60 min" },
          { title: "Cohesion, Transition Words & Flow Mastery", duration: "50 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "Identify the sentence that has correct grammatical parallelism:",
        options: [
          "She likes cooking, to jog in the park, and reading novels.",
          "She likes cooking, jogging in the park, and reading novels.",
          "She likes to cook, jogging in the park, and reads novels.",
          "She likes cook, to jog in the park, and to read."
        ],
        correct: 1,
        explanation: "Parallel structure requires consistent grammatical forms for items in a list: 'cooking, jogging, and reading' are all gerunds."
      }
    ]
  },
  {
    id: "sat-07",
    title: "Digital SAT Complete Masterclass: 1550+ Guaranteed Strategy",
    subject: "SAT",
    category: "Standardized Exam",
    badge: "Top Rated",
    instructor: "Engr. Ajibade Opeyemi Phillip",
    instructorRole: "Senior SAT / IELTS Coordinator & Lead Coach",
    instructorImg: "assets/images/founder.jpg",
    rating: 4.98,
    reviewsCount: 890,
    studentsCount: 3420,
    duration: "52 Hours",
    lessonsCount: 44,
    level: "Target 1500+ Seekers",
    priceUSD: 69,
    priceNGN: 48000,
    thumbnail: "assets/images/sat_ielts_banner.png",
    description: "Conquer the Digital SAT adaptive modules! Fast Desmos calculator shortcuts for Math, grammar pattern recognition, speed-reading strategies for complex literary & science passages.",
    topics: ["Desmos Calculator Speed Tactics", "Advanced SAT Algebra & Heart of Algebra", "Passport to Advanced Math & Geometry", "Reading Craft & Structure Passages", "Information & Ideas Inference Questions", "Standard English Conventions Rules"],
    syllabus: [
      {
        module: "Module 1: Digital SAT Math Engine & Desmos Mastery",
        duration: "14 Hours",
        lessons: [
          { title: "The Desmos Secret Weapon: Solving Complex Equations in 10s", duration: "65 min" },
          { title: "Nonlinear Functions, Parabolas & Discriminant Traps", duration: "70 min" },
          { title: "Right Triangle Trigonometry & Circle Theorems on the SAT", duration: "60 min" },
          { title: "Data Analysis, Statistics & Margin of Error Questions", duration: "60 min" }
        ]
      },
      {
        module: "Module 2: Reading & Writing Module Mastery",
        duration: "12 Hours",
        lessons: [
          { title: "Vocabulary in Context: Eliminating Distractors", duration: "50 min" },
          { title: "Command of Evidence: Quantitative & Textual Support", duration: "65 min" },
          { title: "Rhetorical Synthesis: Note-to-Paragraph Hacks", duration: "55 min" },
          { title: "Punctuation Rules: Semicolons, Colons, Em-Dashes", duration: "50 min" }
        ]
      },
      {
        module: "Module 3: Full-Length Bluebook Adaptive Simulations",
        duration: "16 Hours",
        lessons: [
          { title: "Adaptive Stage 2 Hard Module Navigation", duration: "80 min" },
          { title: "Time-Management & Pacing Drills (35s per question)", duration: "60 min" },
          { title: "Score Diagnostics & Custom Error Log System", duration: "70 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "In the xy-plane, the graph of y = 3x² - 12x + c intersects the x-axis at exactly one point. What is the value of c?",
        options: ["c = 6", "c = 12", "c = 16", "c = -12"],
        correct: 1,
        explanation: "One x-intercept means discriminant b² - 4ac = 0. (-12)² - 4(3)(c) = 0 => 144 - 12c = 0 => 12c = 144 => c = 12."
      }
    ]
  },
  {
    id: "ielts-08",
    title: "IELTS Academic & General: Band 8.5 Strategy & Live Mock Prep",
    subject: "IELTS",
    category: "Standardized Exam",
    badge: "High Pass Rate",
    instructor: "Engr. Ajibade Opeyemi Phillip & Sarah Jenkins (CELTA)",
    instructorRole: "International Admissions Director & IELTS Specialist",
    instructorImg: "assets/images/study_abroad_banner.png",
    rating: 4.97,
    reviewsCount: 740,
    studentsCount: 2950,
    duration: "44 Hours",
    lessonsCount: 38,
    level: "Target Band 7.5 - 9.0",
    priceUSD: 59,
    priceNGN: 42000,
    thumbnail: "assets/images/study_abroad_banner.png",
    description: "Engineered specifically for international university admissions and global migration. Complete mastery of Speaking Parts 1-3, Task 1 reports/letters, and Task 2 high-scoring essays.",
    topics: ["Band 9 Writing Task 2 Essay Templates", "Task 1 Visual Interpretation & Data Trends", "Listening Speed & Distractor Traps", "Reading Skimming, Scanning & T/F/NG Drills", "Speaking Fluency, Idioms & Pronunciation"],
    syllabus: [
      {
        module: "Module 1: Writing Task 2 - Band 8.5+ Architecture",
        duration: "10 Hours",
        lessons: [
          { title: "Deconstructing Prompts: Opinion vs Discussion vs Problem/Solution", duration: "60 min" },
          { title: "Cohesion & Lexical Resource: High-Band Collocations", duration: "65 min" },
          { title: "Sample 9-Band Essay Deconstructions & Live Review", duration: "70 min" }
        ]
      },
      {
        module: "Module 2: Writing Task 1 - Academic & General",
        duration: "8 Hours",
        lessons: [
          { title: "Reporting Bar, Line, Pie, and Process Charts", duration: "60 min" },
          { title: "General Training Formal & Informal Letters", duration: "55 min" }
        ]
      },
      {
        module: "Module 3: Speaking & Listening Masterclasses",
        duration: "12 Hours",
        lessons: [
          { title: "Speaking Part 2 Cue Cards: 2-Minute Monologue Formulas", duration: "50 min" },
          { title: "Speaking Part 3 Deep Analytical Responses", duration: "60 min" },
          { title: "Listening Section 4: Academic Monologue Note-Taking", duration: "55 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "In IELTS Reading, what is the key difference between FALSE and NOT GIVEN?",
        options: [
          "FALSE means the passage directly contradicts the statement; NOT GIVEN means the text does not contain enough info to confirm or deny.",
          "They mean the exact same thing.",
          "NOT GIVEN means the statement is false.",
          "FALSE means the word is misspelled."
        ],
        correct: 0,
        explanation: "A statement is FALSE if the passage states the opposite. It is NOT GIVEN if the passage never confirms or contradicts the statement."
      }
    ]
  },
  {
    id: "toefl-09",
    title: "TOEFL iBT Complete Bootcamp: 110+ Score Acceleration",
    subject: "TOEFL",
    category: "Standardized Exam",
    badge: "Official Format",
    instructor: "Sarah Jenkins & Engr. Ajibade",
    instructorRole: "Senior Language Coaches",
    instructorImg: "assets/images/sat_ielts_banner.png",
    rating: 4.92,
    reviewsCount: 290,
    studentsCount: 1310,
    duration: "38 Hours",
    lessonsCount: 30,
    level: "Target 100-115 Seekers",
    priceUSD: 55,
    priceNGN: 39000,
    thumbnail: "assets/images/admissions_banner.png",
    description: "Prepare for the streamlined TOEFL iBT format. Master Academic Discussion writing, integrated speaking tasks, campus conversation listening, and complex academic reading passages.",
    topics: ["Writing for Academic Discussion Task", "Integrated Speaking Tasks 1-4", "Academic Lecture Listening Notes", "Reading Inference & Sentence Insertion", "Speech Delivery & Intonation"],
    syllabus: [
      {
        module: "Module 1: The New TOEFL iBT Writing Section",
        duration: "8 Hours",
        lessons: [
          { title: "Academic Discussion Prompt Speed Writing in 10 Minutes", duration: "50 min" },
          { title: "Integrated Writing: Summarizing Lecture vs Reading", duration: "60 min" }
        ]
      },
      {
        module: "Module 2: Integrated Speaking & Campus Listening",
        duration: "10 Hours",
        lessons: [
          { title: "Note-Taking Shorthand for Rapid Audio Passages", duration: "55 min" },
          { title: "Speaking Tasks 2-4: Perfect 60-Second Timing", duration: "60 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "How long do you have to write your response for the TOEFL 'Writing for Academic Discussion' task?",
        options: ["10 minutes", "20 minutes", "30 minutes", "15 minutes"],
        correct: 0,
        explanation: "The streamlined TOEFL iBT Academic Discussion task allocates exactly 10 minutes to read the prompt and write a well-supported response of at least 100 words."
      }
    ]
  },
  {
    id: "gre-10",
    title: "GRE General 330+ Comprehensive: Quant & Verbal Elite Prep",
    subject: "GRE",
    category: "Standardized Exam",
    badge: "Elite Graduate",
    instructor: "Engr. Ajibade Opeyemi Phillip",
    instructorRole: "Quantitative Reasoning Specialist & Engineer",
    instructorImg: "assets/images/founder.jpg",
    rating: 4.97,
    reviewsCount: 460,
    studentsCount: 1980,
    duration: "60 Hours",
    lessonsCount: 48,
    level: "Graduate & Post-Grad Seekers",
    priceUSD: 79,
    priceNGN: 55000,
    thumbnail: "assets/images/studio_analytics.jpg",
    description: "Ace the GRE with engineering quantitative rigor. Quantitative Comparison tricks, high-frequency 1000 GRE vocabulary, text completion, sentence equivalence, and analytical writing.",
    topics: ["Quantitative Comparison Elimination Strategies", "Number Theory & Prime Factorization Shortcuts", "Data Interpretation & Normal Distributions", "1000 High-Frequency GRE Vocab in Context", "Text Completion: Two-Blank & Three-Blank Logic", "Analytical Writing Issue Essay 5.5+"],
    syllabus: [
      {
        module: "Module 1: Advanced GRE Quantitative Reasoning",
        duration: "16 Hours",
        lessons: [
          { title: "Quant Comparison: Avoid Calculation, Compare Structure", duration: "65 min" },
          { title: "Number Properties, Divisibility Rules & Remainder Math", duration: "70 min" },
          { title: "Combinatorics, Permutations & Probability on the GRE", duration: "65 min" },
          { title: "Geometry, Coordinate Systems & 3D Solids", duration: "60 min" }
        ]
      },
      {
        module: "Module 2: Verbal Reasoning & Vocabulary Architecture",
        duration: "14 Hours",
        lessons: [
          { title: "Decoding Complex Text Completion with Contrast Words", duration: "60 min" },
          { title: "Sentence Equivalence: Finding Synonym Pairs with Precision", duration: "55 min" },
          { title: "Long Reading Comprehension & Author Tone Dissection", duration: "70 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "Quantity A: The number of distinct prime factors of 120. Quantity B: The number of distinct prime factors of 210. Which is greater?",
        options: ["Quantity A is greater.", "Quantity B is greater.", "The two quantities are equal.", "The relationship cannot be determined."],
        correct: 1,
        explanation: "120 = 2³ × 3 × 5 (3 distinct primes: 2, 3, 5). 210 = 2 × 3 × 5 × 7 (4 distinct primes: 2, 3, 5, 7). Thus Quantity B (4) is greater than Quantity A (3)."
      }
    ]
  },
  {
    id: "gmat-11",
    title: "GMAT Focus Edition: Data Insights & Problem Solving Mastery",
    subject: "GMAT",
    category: "Standardized Exam",
    badge: "Top Tier",
    instructor: "Engr. Ajibade Opeyemi Phillip & MBA Advisors",
    instructorRole: "Quantitative Reasoning Director",
    instructorImg: "assets/images/founder.jpg",
    rating: 4.96,
    reviewsCount: 380,
    studentsCount: 1540,
    duration: "54 Hours",
    lessonsCount: 42,
    level: "Target 695+ / 730+ Equivalent",
    priceUSD: 85,
    priceNGN: 60000,
    thumbnail: "assets/images/studio_analytics.jpg",
    description: "Designed for the modern GMAT Focus Edition. Master Data Insights (Multi-Source Reasoning, Two-Part Analysis, Data Sufficiency), advanced Problem Solving, and Critical Reasoning.",
    topics: ["Data Insights: Multi-Source Reasoning & Table Analysis", "Data Sufficiency: The 5-Answer System", "Advanced Arithmetic, Rates, Work & Ratios", "Critical Reasoning: Assumptions, Weaken & Strengthen", "Pacing Strategies for 45-Minute Sections"],
    syllabus: [
      {
        module: "Module 1: The GMAT Data Insights Section",
        duration: "14 Hours",
        lessons: [
          { title: "Data Sufficiency: Testing Values without Full Calculation", duration: "65 min" },
          { title: "Multi-Source Reasoning: Tabbed Synthesis Under Time Pressure", duration: "70 min" },
          { title: "Graphics Interpretation & Two-Part Analysis", duration: "60 min" }
        ]
      },
      {
        module: "Module 2: Quantitative Problem Solving",
        duration: "12 Hours",
        lessons: [
          { title: "Work-Rate, Mixture & Overlapping Sets", duration: "60 min" },
          { title: "Exponents, Roots & Inequality Traps", duration: "65 min" }
        ]
      }
    ],
    quiz: [
      {
        question: "Is x > y? Statement (1): x + y > 0. Statement (2): x - y > 0. Which statements are sufficient to answer?",
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

// Helper functions for Courses Data
function getStoredCourses() {
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

function saveCustomCourse(courseData) {
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

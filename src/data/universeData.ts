import { GalaxyNode, CategoryInfo, NodeCategory } from '../types/universe';

// Helper to project spherical coordinates (polar phi, azimuthal theta, radius) into 3D Cartesian [x, y, z]
function sphereCoord(phi: number, theta: number, radius = 11.5): [number, number, number] {
  return [
    Math.round(radius * Math.sin(phi) * Math.cos(theta) * 100) / 100,
    Math.round(radius * Math.cos(phi) * 100) / 100,
    Math.round(radius * Math.sin(phi) * Math.sin(theta) * 100) / 100,
  ];
}

export const CATEGORIES: Record<NodeCategory, CategoryInfo> = {
  about: {
    id: 'about',
    label: 'Story & Philosophy',
    color: '#3b82f6', // Blue
    glowColor: 'rgba(59, 130, 246, 0.4)',
    description: 'The person behind the code: journey, curiosity, and engineering mindset.',
    iconName: 'Compass',
  },
  projects: {
    id: 'projects',
    label: 'Flagship Projects',
    color: '#06b6d4', // Cyan
    glowColor: 'rgba(6, 182, 212, 0.4)',
    description: '4 comprehensive systems: Intellex, AML Monitor, Customer Intel, DRISHTI.',
    iconName: 'Cpu',
  },
  journey: {
    id: 'journey',
    label: 'Hackathon Journey',
    color: '#f59e0b', // Amber
    glowColor: 'rgba(245, 158, 11, 0.4)',
    description: 'NemoHacks, 2 AM crashes, the 10-min what-if, and IEEE podium breakthroughs.',
    iconName: 'Trophy',
  },
  college: {
    id: 'college',
    label: 'College Life',
    color: '#f43f5e', // Rose
    glowColor: 'rgba(244, 63, 94, 0.4)',
    description: 'Four years at KJSIT: senior-junior divide vanishing, S4DS leadership & memories.',
    iconName: 'GraduationCap',
  },
  dna: {
    id: 'dna',
    label: 'Technical DNA',
    color: '#10b981', // Emerald
    glowColor: 'rgba(16, 185, 129, 0.4)',
    description: 'Interconnected skill clusters across ML, GenAI, Data Engineering, and Backend.',
    iconName: 'GitBranch',
  },
  'after-college': {
    id: 'after-college',
    label: 'After College & Horizons',
    color: '#6366f1', // Indigo
    glowColor: 'rgba(99, 102, 241, 0.4)',
    description: 'Upskilling in System Design, interview prep, ML engineering & open opportunities.',
    iconName: 'Rocket',
  },
  beyond: {
    id: 'beyond',
    label: 'Beyond Technology',
    color: '#8b5cf6', // Violet
    glowColor: 'rgba(139, 92, 246, 0.4)',
    description: 'Cardistry visual flourishes, YouTube channel ambition, and Stand-up comedy.',
    iconName: 'Sparkles',
  },
  contact: {
    id: 'contact',
    label: 'Get In Touch',
    color: '#ec4899', // Pink
    glowColor: 'rgba(236, 72, 153, 0.4)',
    description: 'Direct email, LinkedIn, GitHub, phone, and resume download.',
    iconName: 'Mail',
  },
};

export const GALAXY_NODES: GalaxyNode[] = [
  // 1. Core Identity & Journey (Center Focal Hub)
  {
    id: 'about-me',
    label: 'The Engineer & Story',
    title: 'Shreyash Gupta — The Person Behind the Code',
    subtitle: 'AI & Data Science Graduate | Mumbai, India',
    category: 'about',
    position: [0, 1.2, 0],
    size: 2.2,
    badge: 'Introduction',
    techStack: ['AI & Data Science', 'Curiosity', 'Mumbai', 'B.Tech KJSIT 2026 (8.8 CGPA)'],
    connections: ['projects', 'hackathons', 'college', 'technical-dna', 'after-college', 'passions-future', 'contact'],
    summary: 'I am an AI and Data Science graduate who enjoys understanding how things work, experimenting with ideas, and building things that solve actual problems.',
    detailedContent: `I graduated with a B.Tech in Artificial Intelligence and Data Science from K J Somaiya Institute of Technology, Mumbai (CGPA: 8.8/10). Over the years, my journey has taken me through machine learning, computer vision, retrieval-based applications, data engineering, hackathons, and a lot of late-night experimentation.

I've spent nights debugging projects, learning unfamiliar technologies, participating in competitions, working with diverse teams, and figuring things out along the way. I'm someone who enjoys exploring different domains and understanding the problems behind the technology.

I'm still learning, still experimenting, and still figuring things out. And that's probably the part I enjoy most.`,
    keyInsights: [
      'B.Tech in Artificial Intelligence & Data Science (KJSIT, Mumbai — CGPA 8.8/10)',
      'Hands-on builder: from prototype hackathons to multi-layer detection pipelines',
      'Continuous learner: moving from concepts to complete end-to-end distributed systems',
      'Belief in building things to understand them rather than simply reading docs'
    ],
  },

  // 2. Flagship Projects Hub (Cyan — Upper Right)
  {
    id: 'projects',
    label: 'Flagship Projects',
    title: 'Flagship Engineering & AI Systems',
    subtitle: 'Intellex • AML Monitor • Customer Intelligence • DRISHTI',
    category: 'projects',
    position: sphereCoord(1.1, 0.5, 11.5),
    size: 2.2,
    badge: '4 Core Systems',
    techStack: ['LLaMA 3.3', 'FAISS', 'GraphSAGE', 'XGBoost', 'OpenCV MOG2', 'Kafka', 'PySpark', 'Airflow', 'FastAPI'],
    connections: ['about-me', 'technical-dna', 'after-college'],
    customVisualizer: 'projects-hub',
    summary: 'Four dedicated deep-dive engineering platforms spanning Generative AI/RAG, Anti-Money Laundering Graph Learning, Lakehouse Data Engineering, and Edge Computer Vision.',
    detailedContent: `Explore four flagship systems built with real-world engineering constraints:
1. Intellex: Role-based document intelligence platform using LangChain, FAISS, and LLaMA 3.3 with Firebase RBAC.
2. AML Monitor: Multi-layer anti-money laundering risk detection combining deterministic rules, GraphSAGE GNN embeddings, XGBoost, and Isolation Forest.
3. Customer Intelligence Platform: End-to-end Lakehouse handling 500K+ event streams via Kafka, PySpark, Airflow, and XGBoost with SHAP explainability.
4. DRISHTI: Real-time public crowd safety system utilizing OpenCV MOG2 background subtraction, rolling Z-score risk tiers, and Flutter mobile connectivity.`,
    keyInsights: [
      'Interactive deep-dives into 4 primary production-grade systems',
      'Spans GenAI, Graph Neural Networks, Lakehouse MLOps, and Computer Vision',
      'Tested under controlled synthetic benchmarks with verifiable architecture designs',
      'Full GitHub repositories available for each system'
    ],
  },

  // 3. Hackathon Journey & NemoHacks (Amber — Mid Right)
  {
    id: 'hackathons',
    label: 'Hackathon Journey',
    title: 'The Hackathon Odyssey — Unfortunately Fortunate / NemoHacks',
    subtitle: 'From a random 48h loss to podium finishes & ICDMAI research',
    category: 'journey',
    position: sphereCoord(1.35, 1.4, 11.5),
    size: 2.0,
    badge: 'NemoHacks Crew',
    techStack: ['Keyur Mistry', 'Rahul Ganatra', 'Adrita Banerjee', 'Devansh', 'Sanyo', 'Molisha', 'Insiyah', 'Manav'],
    connections: ['about-me', 'college', 'projects'],
    customVisualizer: 'hackathon',
    summary: 'The story of 2 AM crashes, cold Red Bulls, the 10-minute what-if moment at The Idea Hackathon, Adrita\'s "one more shot" push, and IEEE/CSI podium finishes.',
    detailedContent: `Hackathons are never an individual achievement. They are forged in shared exhaustion and mutual trust.

Our team went by "Unfortunately Fortunate" and "NemoHacks". We weathered it all: late-night brainstorming sessions where half the ideas were ridiculous; backend servers crashing 10 minutes before judging; travelling by train for offline competitions; and the sting of making it to the finals only to fall short.

Key Milestones:
• SY Break: First 48h hackathon was a total loss; one month later, surprise win!
• The Idea Hackathon: Ranked 11th of 300; missed a 10-minute return callback after leaving campus — taught permanent accountability.
• The Breakthrough: 2nd Runner-up at IEEE Hack to the Future (Manipal), 2nd Runner-up at ALGOFORGE'25 (IEEE KJSIT), Finalists at UNION BANK Hackathon'25, and research paper presentation at ICDMAI.`,
    keyInsights: [
      'Team members: Keyur, Rahul, Adrita, Devansh, Sanyo, Molisha, Insiyah, Manav',
      'Learned leadership, timing, redundant testing, and pitch storytelling under pressure',
      'Pods: IEEE Manipal 2nd Runner-up, ALGOFORGE\'25 2nd Runner-up, CSI Finalist, ICDMAI Paper'
    ],
  },

  // 4. College Life at KJSIT (Rose — Mid Left)
  {
    id: 'college',
    label: 'College Life',
    title: 'Four Years at KJSIT — A Lot More Than a Degree',
    subtitle: 'Friendships, S4DS leadership, and campus nostalgia (2022–2026)',
    category: 'college',
    position: sphereCoord(1.4, 3.2, 11.5),
    size: 1.9,
    badge: 'KJSIT Mumbai',
    techStack: ['KJSIT Batch 2026', 'S4DS Chapter', 'Student Leadership', 'Workshops'],
    connections: ['about-me', 'hackathons'],
    customVisualizer: 'college',
    summary: 'Starting FY uncertain, watching the traditional senior-junior divide vanish, leading the S4DS student chapter, and carrying lifelong memories beyond graduation.',
    detailedContent: `I started my First Year at K J Somaiya Institute of Technology as someone still figuring things out. College quickly proved to be so much more than lectures and exams.

The seniors we met treated us like equals and friends rather than juniors. In turn, when we became seniors, our juniors were just our friends. That complete breakdown of traditional college hierarchy created an environment where anyone could ask dumb questions, admit doubts, and collaborate without pretense.

Beyond serving in the S4DS chapter organizing workshops and hackathons, what remains is the shared lab marathons, project hack sessions, and the people who became part of everyday life.`,
    keyInsights: [
      'Complete dissolving of the traditional senior-junior hierarchy',
      'App Development & student leadership with the S4DS KJSIT Chapter',
      'Safe harbor for technical vulnerability and rapid personal growth'
    ],
  },

  // 5. Technical DNA (Emerald — Upper Left)
  {
    id: 'technical-dna',
    label: 'Technical DNA',
    title: 'Technical DNA — Interconnected Mastery',
    subtitle: 'Machine Learning • Generative AI • Data Engineering • Systems',
    category: 'dna',
    position: sphereCoord(1.1, 4.3, 11.5),
    size: 2.1,
    badge: 'Core Competencies',
    techStack: ['Python', 'SQL', 'C++', 'Dart', 'PySpark', 'Kafka', 'Airflow', 'XGBoost', 'OpenCV', 'FAISS', 'FastAPI', 'Docker'],
    connections: ['about-me', 'projects', 'after-college'],
    customVisualizer: 'dna',
    summary: 'My technical stack represented as interconnected clusters: ML/DL, Generative AI, Data Engineering pipelines, and backend microservices without arbitrary skill bars.',
    detailedContent: `I view technology as a connected continuum:
• Data Engineering (Kafka, PySpark, Airflow) ingests and refines high-volume streaming telemetry.
• Machine Learning (XGBoost, GraphSAGE, Scikit-Learn) extracts predictive signals and topological patterns.
• Generative AI (RAG, FAISS, LangChain, LLaMA) makes vast knowledge accessible and conversational.
• Backend & Systems (FastAPI, Docker, Firebase) wrap models into observable, low-latency microservices.`,
    keyInsights: [
      'No arbitrary percentage bars — skills are shown in their real-world applied contexts',
      'Proficiency across the full ML lifecycle: ingestion -> modeling -> explainability -> API serving',
      'Strong mathematical and machine learning foundation in AI & Data Science'
    ],
  },

  // 6. After College: Upskilling & Horizons (Indigo — Center Right)
  {
    id: 'after-college',
    label: 'After College & Upskilling',
    title: 'Life After College — Focused Upskilling & Horizons',
    subtitle: 'System Design • Interview Prep • Scalable Architectures • Opportunities',
    category: 'after-college',
    position: sphereCoord(1.25, 2.2, 11.5),
    size: 2.1,
    badge: 'Current Chapter',
    techStack: ['System Design', 'Distributed Systems', 'Lakehouse Architecture', 'ML System Design', 'Full-Time Roles'],
    connections: ['about-me', 'technical-dna', 'passions-future', 'contact'],
    customVisualizer: 'after-college',
    summary: 'What I have been doing after college: diving deep into System Design, rigorous technical interview preparation, continuous ML upskilling, and seeking full-time AI/ML & Data Engineering roles.',
    detailedContent: `Since completing my degree at KJSIT (8.8 CGPA), I have treated every single day like a dedicated engineering sprint:

1. System Design Mastery:
Studying distributed systems architecture: event-driven streaming with Kafka, distributed caching (Redis), database sharding, replication patterns, Lakehouse designs (Bronze-Silver-Gold), and microservices scalability.

2. Rigorous Technical Interview Prep:
Focusing on end-to-end Machine Learning System Design and scalable architectures: designing high-throughput fraud detection pipelines, real-time vector search, and production inference workflows.

3. Active Opportunity Search:
Actively interviewing and seeking full-time opportunities in Machine Learning Engineering, Data Science, and scalable software systems.`,
    keyInsights: [
      'Dedicated full-time focus on System Design & Distributed Systems',
      'Rigorous focus on ML System Design and distributed backend architecture',
      'Actively interviewing and open for full-time engineering and AI/ML positions'
    ],
  },

  // 7. Passions: Cardistry, YouTube & Standup (Violet — Center Left)
  {
    id: 'passions-future',
    label: 'Cardistry & Ambitions',
    title: 'Beyond Technology — Cardistry, YouTube & Standup',
    subtitle: 'Kinetic card flourishes • Launching YouTube • Trying Stand-up comedy',
    category: 'beyond',
    position: sphereCoord(1.3, 5.2, 11.5),
    size: 2.0,
    badge: 'Creative Drive',
    techStack: ['Cardistry', 'Charlier Cut', 'Sybil Display', 'Card Fans', 'YouTube Channel', 'Stand-up Comedy', 'Cosmology'],
    connections: ['about-me', 'after-college'],
    customVisualizer: 'cardistry',
    summary: 'A tactile hobby of cardistry (packet cuts, flourishes, spreads), plans to launch a YouTube channel documenting the tech journey, and aspirations to try open mics and stand-up comedy.',
    detailedContent: `I don't believe in a one-dimensional life where identity begins and ends in a code editor:

• Cardistry:
Manipulating playing cards through one-handed cuts (Charlier), multi-packet geometric displays (Sybil), and radial card fans. A tactile, screen-free discipline of rhythm, patience, and manual precision.

• Starting a YouTube Channel:
Planning to launch a YouTube channel combining visual storytelling with technical rigor: explaining complex Machine Learning and System Design architectures in simple terms, while sharing cardistry routines and building logs.

• Stand-up Comedy Aspirations:
I love observing everyday ironies — 2 AM debugging existential dread, college life in Mumbai, and tech culture absurdities. I plan to try open mics and do stand-up comedy because humor, like code, is all about timing, setup, and execution.

• Science & Curiosity:
Deep fascination with cosmology, astrophysics, and how fundamental physical forces govern the universe.`,
    keyInsights: [
      'Interactive 3D playing card flourish sandbox in portfolio view',
      'Plans to start a YouTube channel sharing tech systems and cardistry',
      'Aspirations to do open mics and stand-up comedy',
      'Curiosity about astrophysics, cosmology, and multidisciplinary books'
    ],
  },

  // 8. Contact & Connect (Pink — Far Right)
  {
    id: 'contact',
    label: 'Get In Touch',
    title: 'Let\'s Connect & Build Together',
    subtitle: 'Mumbai, India | Open for full-time AI/ML & Engineering roles',
    category: 'contact',
    position: sphereCoord(1.45, 0.0, 11.0),
    size: 2.0,
    badge: 'Contact',
    repoUrl: 'https://github.com/SHREYASH1204',
    liveUrl: 'https://www.linkedin.com/in/shreyash-gupta-b3a21025b',
    techStack: ['shreyashgupta401@gmail.com', '+91 9321618045', 'LinkedIn', 'GitHub', 'Mumbai'],
    connections: ['about-me', 'after-college'],
    customVisualizer: 'contact',
    summary: 'Have something interesting to build, discuss, or explore? Reach out directly via email, phone, LinkedIn, or GitHub.',
    detailedContent: `Whether you want to discuss machine learning systems, anti-money laundering architectures, system design, cardistry, stand-up comedy, or explore full-time engineering opportunities — my inbox is always open.

• Name: Shreyash Gupta
• Location: Mumbai, Maharashtra, India
• Email: shreyashgupta401@gmail.com
• Phone: +91 9321618045
• LinkedIn: linkedin.com/in/shreyash-gupta-b3a21025b
• GitHub: github.com/SHREYASH1204`,
    keyInsights: [
      'Location: Mumbai, Maharashtra, India',
      'Email: shreyashgupta401@gmail.com',
      'LinkedIn: https://www.linkedin.com/in/shreyash-gupta-b3a21025b',
      'GitHub: https://github.com/SHREYASH1204'
    ],
  },
];

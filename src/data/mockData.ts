export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  repo: string;
  fileName: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "VH24 AI Advisor",
    category: "FINANCIAL AI",
    description: "AI financial platform providing personalized investment recommendations for stocks, bonds, and IPOs tailored to user risk profiles. Uses Gemini API and Yahoo Finance for 5-year market forecasting.",
    tech: ["Gemini AI", "Python", "React"],
    repo: "https://github.com/SHREYASH1204/VH24_NemoHacks",
    fileName: "advisor_core.js",
    gradient: "from-primary/20 to-tertiary/20"
  },
  {
    id: 2,
    title: "Intellex",
    category: "AI KNOWLEDGE HUB",
    description: "Advanced AI Knowledge Hub leveraging LLaMA 3.3 for document analysis and Q&A with context-aware retrieval. Designed for corporate intelligence.",
    tech: ["LLaMA", "Python", "Machine Learning"],
    repo: "https://github.com/SHREYASH1204/Intellex",
    fileName: "intellex_v1.0.sh",
    gradient: "from-secondary/20 to-primary/20"
  },
  {
    id: 3,
    title: "AML Monitor",
    category: "FINTECH RISK",
    description: "AI-powered transaction monitoring system that classifies financial risks into low, medium, and high categories. Features real-time risk dashboards, dynamic account blocking, and automated report generation.",
    tech: ["Python", "Machine Learning", "React"],
    repo: "https://github.com/SHREYASH1204/Codeissance-2k24",
    fileName: "aml_audit.py",
    gradient: "from-tertiary/20 to-secondary/20"
  },
  {
    id: 4,
    title: "Kavach",
    category: "LAW ENFORCEMENT",
    description: "Law Enforcement & Public Safety platform for case management and officer communication, engineered to enhance safety through predictive analysis.",
    tech: ["React Native", "FastAPI", "TensorFlow"],
    repo: "https://github.com/shreyash1204/Kavach",
    fileName: "kavach_core.py",
    gradient: "from-primary/20 to-error-container/20"
  },
  {
    id: 5,
    title: "VidAI",
    category: "VIDEO ANALYSIS",
    description: "Emotion-based highlight reel generation from video content that uses facial expression recognition to curate the most impactful moments.",
    tech: ["PyTorch", "OpenCV", "FFmpeg"],
    repo: "https://github.com/shreyash1204/VidAI",
    fileName: "vidai_render.ts",
    gradient: "from-secondary-fixed-dim/20 to-primary/20"
  },
  {
    id: 6,
    title: "DRISHTI",
    category: "CROWD ANALYTICS",
    description: "Computer vision for crowd management and stampede detection using YOLO-based object detection and real-time trajectory estimation.",
    tech: ["YOLOv8", "CUDA", "Grafana"],
    repo: "https://github.com/shreyash1204/DRISHTI",
    fileName: "drishti_eye.log",
    gradient: "from-tertiary/20 to-primary/20"
  },
  {
    id: 7,
    title: "Bart-NER",
    category: "NLP UNDERSTANDING",
    description: "Named Entity Recognition (NER) system for complex NLP understanding. Fine-tuned BART model on domain-specific datasets to extract structured entities from unstructured text.",
    tech: ["BART", "HuggingFace", "Python"],
    repo: "https://github.com/SHREYASH1204/Named-Entity-Recognition",
    fileName: "ner_engine.py",
    gradient: "from-secondary/20 to-tertiary/20"
  },
  {
    id: 8,
    title: "Sales Streamline",
    category: "BI ANALYTICS",
    description: "Real-time sales simulation and analytical dashboard. Features a Python-based data engine generating live transactions and a Power BI suite for instantaneous revenue tracking and forecasting.",
    tech: ["Python", "Power BI", "Pandas"],
    repo: "https://github.com/SHREYASH1204/Sales-Dashboard/",
    fileName: "sql.py",
    gradient: "from-primary/20 to-tertiary/20"
  }
];

export const skills = [
  { name: "Python", level: 95 },
  { name: "Machine Learning", level: 90 },
  { name: "React", level: 88 },
  { name: "Flutter", level: 85 },
  { name: "Data Analytics", level: 92 },
  { name: "NLP", level: 87 }
];

export const achievements = [
  {
    title: "Hackathon Excellence",
    details: "Winner of 3 hackathons and Finalist in 7+ hackathons including Top 10 in Idea (Union Bank Hackathon).",
    icon: "award"
  },
  {
    title: "Research Publication",
    details: 'Presented research on "An AI powered situational Awareness platform" at S4DS Kolkata Conference.',
    icon: "book"
  },
  {
    title: "Community & Leadership",
    details: "Organized a 24-hour hackathon, managing creative teams and gaining valuable experience in coordination and execution.",
    icon: "users"
  }
];

export const socialLinks = {
  github: "https://github.com/shreyash1204",
  linkedin: "http://linkedin.com/in/shreyash-gupta-b3a21025b/",
  resume: "/Resume_ShreyashG.pdf",
  email: "mailto:shreyashgupta401@gmail.com",
  freelance: "https://www.finyatrisolution.org/",
  phone: "tel:+919321618045"
};

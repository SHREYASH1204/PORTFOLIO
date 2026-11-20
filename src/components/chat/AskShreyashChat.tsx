import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Minimize2, 
  Bot, 
  User, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useUniverse } from '../../state/useUniverseStore';
import { GALAXY_NODES } from '../../data/universeData';
import { audioUniverse } from '../../data/audioSynthesizer';

interface Message {
  id: string;
  sender: 'user' | 'shreyash';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    nodeId?: string;
    url?: string;
  };
}

export const AskShreyashChat: React.FC = () => {
  const { setSelectedNode, isChatOpen, setIsChatOpen } = useUniverse();
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: Message[] = [
    {
      id: 'welcome',
      sender: 'shreyash',
      text: "Hey! I'm Shreyash's interactive AI persona. You can ask me anything about my journey—what I've been doing after college, my upskilling in system design, interview preparation, my cardistry hobby, plans for a YouTube channel & stand-up comedy, flagship projects (AML Monitor, DRISHTI, Intellex), or how to connect!",
      timestamp: 'Just now',
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const quickQuestions = [
    "What did you do after college till now?",
    "How are you preparing for system design & interviews?",
    "Tell me about your cardistry, YouTube & stand-up comedy plans!",
    "How does the AML Monitor 4-layer detection work?",
    "What is DRISHTI and how did the college fest trial go?",
    "What are your core ML and Data Engineering skills?",
    "How can I contact you or view your resume?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isChatOpen, isMinimized, isTyping]);

  // Knowledge base query resolver
  const generateResponse = (query: string): { text: string; action?: { label: string; nodeId?: string; url?: string } } => {
    const q = query.toLowerCase();

    // 1. After College & Upskilling
    if (q.includes('after college') || q.includes('till now') || q.includes('recent') || q.includes('what did you do') || q.includes('graduat')) {
      return {
        text: `After graduating from K J Somaiya Institute of Technology in 2026 with an 8.8 CGPA, I have been dedicating myself full-time to focused upskilling and career preparation:

• System Design: Diving deep into distributed systems principles—high-throughput event streaming with Kafka, caching architectures (Redis), database sharding, replication, and fault-tolerant Lakehouse pipelines.
• Rigorous Interview Prep: Focusing on Machine Learning System Design and scalable architectures (designing high-throughput fraud detection pipelines, real-time vector search, and production inference workflows).
• Full-Time Search: Actively interviewing for full-time roles in Machine Learning Engineering, AI/ML, and Data Engineering!`,
        action: {
          label: "Inspect 'After College' Node in 3D →",
          nodeId: 'after-college'
        }
      };
    }

    // 2. System Design & Interview Prep
    if (q.includes('system design') || q.includes('interview') || q.includes('prepare') || q.includes('preparing')) {
      return {
        text: `My technical interview preparation is focused on System Design and Machine Learning Architecture:

1. Distributed Systems: Architecting scalable real-world systems—designing distributed stream ingestion (Kafka + PySpark), low-latency API gateways (FastAPI + Docker), model drift monitoring (MLflow), and Lakehouse storage (Bronze-Silver-Gold).
2. ML Engineering: Production model pipelines—feature stores, vector retrieval systems (FAISS), fraud classification, and low-latency serving.

I'm ready for technical interviews and eager to join a high-impact engineering team.`,
        action: {
          label: "View Technical DNA →",
          nodeId: 'technical-dna'
        }
      };
    }

    // 3. Cardistry, YouTube & Standup Comedy
    if (q.includes('cardistry') || q.includes('youtube') || q.includes('standup') || q.includes('stand-up') || q.includes('comedy') || q.includes('hobby') || q.includes('hobbies')) {
      return {
        text: `I firmly believe in having creative outlets beyond the terminal:

• Cardistry: It started as a tactile offline hobby—learning to manipulate playing cards into visual flourishes like the Charlier cut, Sybil display, and card fans. It requires breaking down physical mechanics and practicing until friction vanishes, just like debugging code!
• YouTube Channel: I am planning to launch a YouTube channel where I'll combine visual storytelling with technical depth—explaining complex ML/System Design architectures in plain English while documenting my projects and cardistry.
• Stand-Up Comedy: I love observing life's absurdities—from the existential dread of 2 AM dependency bugs to everyday Mumbai college moments. I plan to try open mics and do stand-up comedy because humor, like code, is all about timing, setup, and execution!`,
        action: {
          label: "Open Cardistry & Ambitions Sandbox →",
          nodeId: 'passions-future'
        }
      };
    }

    // 4. AML Monitor
    if (q.includes('aml') || q.includes('money laundering') || q.includes('fraud') || q.includes('fintech') || q.includes('graphsage')) {
      return {
        text: `AML Monitor was born after our first offline hackathon. We tackled a BFSI problem statement, lost the competition, but the domain captivated me!

I researched laundering typologies and built a 4-Layer Detection Architecture:
1. Layer 1 (Rules Engine): 18+ compliance rules catching structuring, velocity spikes, and fund recycling.
2. Layer 2 (GraphSAGE): Graph neural network representation learning to uncover hidden money mule rings and cyclic fund loops.
3. Layer 3 (XGBoost): Supervised classification on rolling behavioral transaction windows.
4. Layer 4 (Isolation Forest): Unsupervised outlier forensics on novel synthetic banking population anomalies.

In synthetic unit-testing, all 5 injected circular transaction chains were detected (100% detection rate), producing an average risk score surge of ~450%!`,
        action: {
          label: "Explore AML Monitor Visualizer →",
          nodeId: 'projects'
        }
      };
    }

    // 5. DRISHTI Crowd Monitoring
    if (q.includes('drishti') || q.includes('crowd') || q.includes('stampede') || q.includes('vision') || q.includes('opencv') || q.includes('college fest')) {
      return {
        text: `DRISHTI is our crowd monitoring and stampede risk prediction platform. Following news of a tragic stampede, my teammates and I asked: Can computer vision detect hazardous congestion before panic erupts?

We bypassed heavy static detectors and built on OpenCV MOG2 background subtraction to extract real-time foreground pixel ratios, crowd velocity, and rolling Z-score anomaly spikes (triggering Yellow and Red alerts). We integrated a Flutter mobile companion with offline SQLite storage.

We even tested it live during our annual college fest! That trial taught us how real-world lighting shifts, lens distortion, and physical crowds differ from controlled laptop benchmarks.`,
        action: {
          label: "Explore DRISHTI Experience →",
          nodeId: 'projects'
        }
      };
    }

    // 6. Intellex (RAG / LLMs)
    if (q.includes('intellex') || q.includes('rag') || q.includes('langchain') || q.includes('faiss') || q.includes('llama')) {
      return {
        text: `Intellex is a role-based Retrieval-Augmented Generation (RAG) platform designed to help new joiners query voluminous technical documentation without hallucination.

It parses PDFs and slide presentations into semantic chunks, indexes them into FAISS dense vector spaces, and synthesizes grounded answers using LLaMA 3.3 with exact page citations. Firebase RBAC ensures users can only retrieve knowledge from repositories their clearance tier permits.`,
        action: {
          label: "Try Live RAG Simulator →",
          nodeId: 'projects'
        }
      };
    }

    // 7. Customer Intelligence Platform
    if (q.includes('customer') || q.includes('churn') || q.includes('kafka') || q.includes('pyspark') || q.includes('lakehouse') || q.includes('shap')) {
      return {
        text: `Customer Intelligence Platform is an end-to-end Lakehouse processing 500K+ activity and billing logs through a Bronze-Silver-Gold pattern:
• Bronze: Raw Kafka stream ingestion into append-only PostgreSQL.
• Silver: PySpark distributed cleaning and user sessionization.
• Gold: Churn feature store feeding an XGBoost classifier (~90% ROC-AUC).
• Explainability: TreeSHAP local waterfall values explain why customers are at risk.
• Orchestration: Apache Airflow DAGs automate daily ETL and retraining.`,
        action: {
          label: "View Lakehouse Architecture →",
          nodeId: 'projects'
        }
      };
    }

    // 8. Hackathon Journey & NemoHacks
    if (q.includes('hackathon') || q.includes('nemohacks') || q.includes('team') || q.includes('win') || q.includes('loss') || q.includes('what if') || q.includes('10 minute')) {
      return {
        text: `Hackathons defined our college years! We competed as 'Unfortunately Fortunate / NemoHacks' with my teammates: Keyur, Rahul, Adrita, Devansh, Sanyo, Molisha, Insiyah, and Manav.

We lived through 2 AM crashes, Red Bulls, and train journeys.
• At The Idea Hackathon, we ranked 11th out of 300. A top-10 team didn't show up, but I had already left campus and couldn't make the 10-minute return window—a defining lesson in accountability.
• Adrita pushed us for 'one more shot', leading to 2nd Runner-up at IEEE Hack to the Future (Manipal), 2nd Runner-up at ALGOFORGE'25 (IEEE KJSIT), Finalists at UNION BANK Hackathon'25, and presenting our research paper at ICDMAI!`,
        action: {
          label: "Open Hackathon Timeline →",
          nodeId: 'hackathons'
        }
      };
    }

    // 9. College Life
    if (q.includes('college') || q.includes('kjsit') || q.includes('somaiya') || q.includes('cgpa') || q.includes('gpa')) {
      return {
        text: `I graduated in 2026 with a B.Tech in Artificial Intelligence and Data Science from K J Somaiya Institute of Technology, Mumbai (CGPA: 8.8/10).

More than the degree, college dissolved the traditional senior-junior divide—seniors treated us like friends, and our juniors were just our buddies. I served in the S4DS chapter organizing workshops and developing internal mobile apps, while collaborating on hackathons and projects!`,
        action: {
          label: "View College Scrapbook →",
          nodeId: 'college'
        }
      };
    }

    // 10. Contact & Resume
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('resume') || q.includes('hire') || q.includes('linkedin') || q.includes('github')) {
      return {
        text: `I would love to connect with you!

• Email: shreyashgupta401@gmail.com
• Phone: +91 9321618045
• Location: Mumbai, Maharashtra, India
• LinkedIn: linkedin.com/in/shreyash-gupta-b3a21025b
• GitHub: github.com/SHREYASH1204
• Resume: Available to download right from the top navigation!`,
        action: {
          label: "Open Contact Card →",
          nodeId: 'contact'
        }
      };
    }

    // Default conversational response
    return {
      text: `Thanks for asking! I'm Shreyash Gupta—an AI & Data Science graduate from KJSIT, Mumbai (8.8 CGPA). I specialize in Machine Learning Engineering, Generative AI (RAG), and Data Engineering (Kafka, PySpark, Lakehouse). 

Right now, I'm dedicated to upskilling in System Design, rigorous interview prep, practicing cardistry flourishes, and preparing to launch a YouTube channel and try stand-up comedy.

Feel free to ask specifically about my projects (AML Monitor, DRISHTI, Intellex), my hackathon team NemoHacks, or my post-college upskilling!`,
      action: {
        label: "Explore Story Node →",
        nodeId: 'about-me'
      }
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    audioUniverse.playSelectSound(640);

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim(),
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate natural thinking delay
    setTimeout(() => {
      const resp = generateResponse(query);
      audioUniverse.playHoverTone(540);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'shreyash',
        text: resp.text,
        timestamp: 'Just now',
        suggestedAction: resp.action,
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  if (!isChatOpen) return null;

  return (
    <>
      {/* Main Chat Window (Opens directly when "Ask anything" is clicked) */}
      <div 
        className={`fixed right-4 md:right-8 z-50 transition-all duration-300 flex flex-col glass-panel rounded-2xl overflow-hidden border border-white/20 bg-space-900/95 shadow-2xl text-white ${
          isMinimized 
            ? 'bottom-6 w-80 h-14' 
            : 'bottom-6 w-[94vw] sm:w-[420px] md:w-[460px] h-[580px] max-h-[85vh]'
        }`}
        style={{
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(6, 182, 212, 0.15)',
        }}
      >
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 glass-panel-subtle flex items-center justify-between bg-space-950/80">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-cyan-950">
                SG
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white tracking-tight">Ask Shreyash AI</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">Interactive Persona Engine</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages(initialMessages)}
                className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Reset conversation"
              >
                <RotateCcw size={13} />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                <Minimize2 size={13} />
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Chat Body (when not minimized) */}
          {!isMinimized && (
            <>
              {/* Message History */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 no-scrollbar text-xs">
                {messages.map(msg => (
                  <div 
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      {msg.sender === 'user' ? (
                        <>
                          <span className="text-[10px] font-mono text-neutral-500">You</span>
                          <User size={11} className="text-neutral-400" />
                        </>
                      ) : (
                        <>
                          <Bot size={11} className="text-cyan-400" />
                          <span className="text-[10px] font-mono text-cyan-400">Shreyash</span>
                        </>
                      )}
                    </div>

                    <div 
                      className={`p-3 rounded-2xl max-w-[88%] leading-relaxed whitespace-pre-line font-sans ${
                        msg.sender === 'user'
                          ? 'bg-cyan-600 text-white rounded-tr-sm shadow-md'
                          : 'bg-space-950/80 border border-white/10 text-neutral-200 rounded-tl-sm shadow-md'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Action Button if linked to a node */}
                    {msg.suggestedAction && (
                      <button
                        onClick={() => {
                          if (msg.suggestedAction?.nodeId) {
                            const node = GALAXY_NODES.find(n => n.id === msg.suggestedAction?.nodeId);
                            if (node) {
                              setSelectedNode(node);
                              setIsMinimized(true);
                            }
                          }
                        }}
                        className="mt-2 text-[11px] font-mono text-cyan-300 hover:text-white bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
                      >
                        <span>{msg.suggestedAction.label}</span>
                      </button>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-space-950/60 border border-white/5 w-24">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-150"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-300"></span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions Chips */}
              <div className="px-3 py-2 border-t border-white/5 bg-black/30 overflow-x-auto no-scrollbar flex items-center gap-1.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] font-mono text-neutral-300 hover:text-white transition-all flex-shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <div className="p-3 border-t border-white/10 glass-panel-subtle flex items-center gap-2 bg-space-950/90">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Shreyash anything..."
                  className="flex-1 bg-space-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/60 font-sans"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-black transition-all flex items-center justify-center shadow-md shadow-cyan-950"
                  title="Send Message"
                >
                  <Send size={14} />
                </button>
              </div>
            </>
          )}
        </div>
    </>
  );
};

import React from 'react';
import { 
  Rocket, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Briefcase, 
  Search,
  BookOpen
} from 'lucide-react';

export const AfterCollegeVisualizer: React.FC = () => {
  const pillars = [
    {
      title: "System Design Deep-Dive",
      badge: "Distributed Systems",
      icon: Layers,
      color: "#06b6d4",
      desc: "Architecting large-scale, fault-tolerant distributed platforms. Deepening expertise in event-driven streaming (Kafka), distributed cache strategies, data partitioning, lakehouse patterns, and high-throughput microservices."
    },
    {
      title: "Rigorous Interview Preparation",
      badge: "ML Systems & Architectures",
      icon: Terminal,
      color: "#10b981",
      desc: "Deep technical preparation in Machine Learning System Design and scalable architectures: designing high-throughput fraud detection pipelines, vector retrieval platforms, low-latency microservices, and production inference workflows."
    },
    {
      title: "Continuous ML Upskilling",
      badge: "Applied AI / GenAI",
      icon: BookOpen,
      color: "#8b5cf6",
      desc: "Experimenting with advanced retrieval architectures (hybrid search, dense+sparse reranking), Graph Neural Networks, and fine-tuning open-weights foundation models for enterprise domain intelligence."
    },
    {
      title: "Full-Time Opportunities",
      badge: "Open for Hire",
      icon: Briefcase,
      color: "#f59e0b",
      desc: "Actively seeking full-time engineering roles in AI/ML Engineering, Data Science, and Scalable Backend/Data Engineering in Mumbai, Bangalore, or remote globally."
    }
  ];

  return (
    <div className="space-y-6 my-4">
      {/* Intro Narrative */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-space-900 to-space-900 border border-indigo-500/20 text-xs text-neutral-300 space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 font-mono font-semibold text-[11px] uppercase tracking-wider">
          <Rocket size={14} />
          Life After College — The Focused Upskilling Chapter
        </div>
        <p className="leading-relaxed">
          Graduating with an 8.8 CGPA from K J Somaiya Institute of Technology was the closing of one chapter and the deliberate launch of the next. Since completing my degree, I have dedicated myself entirely to rigorous technical preparation: mastering modern System Design, scalable distributed architectures, and preparing for high-impact AI/ML and Data Engineering roles.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-space-950/70 border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                    {p.badge}
                  </span>
                  <Icon size={16} style={{ color: p.color }} />
                </div>
                <div className="text-sm font-bold text-white">{p.title}</div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {p.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Routine Breakdown */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-3 text-xs">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
          <Clock size={14} />
          Current Daily Focus & Cadence
        </div>

        <div className="space-y-2 text-neutral-300">
          <div className="flex items-start gap-2">
            <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            <span><strong className="text-white">Morning</strong>: System Design breakdowns, distributed caching, database indexing, and API contract design.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0 mt-0.5" />
            <span><strong className="text-white">Afternoon</strong>: System Design breakdowns (designing Netflix-scale streaming, Uber-scale dispatch, financial transaction monitoring).</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={13} className="text-violet-400 flex-shrink-0 mt-0.5" />
            <span><strong className="text-white">Evening</strong>: Building ML prototypes, reading research papers, and offline cardistry flow state.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

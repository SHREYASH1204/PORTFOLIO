import React from 'react';
import { GraduationCap, Heart, Users, Coffee, Sparkles, BookOpen } from 'lucide-react';

export const CollegeScrapbook: React.FC = () => {
  const polaroids = [
    {
      title: "The Vanishing Divide",
      icon: Users,
      tag: "Seniors & Juniors",
      text: "When we stepped in as freshmen, our seniors welcomed us like longtime friends. When we became seniors, our juniors were just our buddies. The traditional college hierarchy completely melted away."
    },
    {
      title: "S4DS Leadership & Coding Nights",
      icon: Sparkles,
      tag: "Council & Chapters",
      text: "Organizing coding workshops, moderating hackathon logistics, and developing mobile apps for the chapter. Learning that real leadership is about helping others debug their doubts without judgment."
    },
    {
      title: "A Safe Harbor for Doubts",
      icon: Heart,
      tag: "Vulnerability & Growth",
      text: "Being able to say 'I have no clue how this works' at 1 AM without feeling small. That psychological safety is where our biggest technical leaps actually came from."
    }
  ];

  return (
    <div className="space-y-6 my-4">
      {/* Nostalgic Reflection Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/30 via-space-900 to-space-900 border border-rose-500/20 text-xs text-neutral-300 space-y-2">
        <div className="flex items-center gap-2 text-rose-400 font-mono font-semibold text-[11px] uppercase tracking-wider">
          <GraduationCap size={15} />
          K J Somaiya Institute of Technology • 2022 — 2026
        </div>
        <p className="leading-relaxed">
          Four years at KJSIT provided far more than an engineering degree in AI and Data Science. It was where strangers turned into lifelong friends, where late-night brainstorming turned into working code, and where we grew up together.
        </p>
      </div>

      {/* Polaroid / Scrapbook Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {polaroids.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx} 
              className="p-4 rounded-xl bg-space-950/70 border border-white/10 hover:border-rose-400/30 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/40 text-rose-300 border border-rose-800/40">
                    {card.tag}
                  </span>
                  <Icon size={14} className="text-neutral-500 group-hover:text-rose-400 transition-colors" />
                </div>
                <div className="text-sm font-semibold text-white">{card.title}</div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {card.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Closing Thought Quote */}
      <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center space-y-1">
        <p className="text-sm text-neutral-200 italic font-light tracking-wide">
          &ldquo;Four years gave me a degree, but the people I met along the way gave me memories I&apos;ll carry for much longer.&rdquo;
        </p>
        <span className="text-[11px] font-mono text-neutral-500">— KJSIT Batch of 2026</span>
      </div>
    </div>
  );
};

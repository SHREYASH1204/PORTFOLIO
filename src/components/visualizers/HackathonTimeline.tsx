import React, { useState } from 'react';
import { Trophy, Clock, Users, Flame, HelpCircle, ArrowRight, Award, Sparkles } from 'lucide-react';

export const HackathonTimeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  const teamMembers = [
    { name: "Keyur Mistry", role: "Co-Builder & Systems" },
    { name: "Rahul Ganatra", role: "Engineering & Logic" },
    { name: "Adrita Banerjee", role: "Strategy & Catalyst" },
    { name: "Devansh", role: "Frontend & UI" },
    { name: "Sanyo", role: "Data & Exploration" },
    { name: "Molisha", role: "Design & UX" },
    { name: "Insiyah", role: "Coordination & Flow" },
    { name: "Manav", role: "Core Code & Logistics" },
  ];

  const milestones = [
    {
      title: "The Second Year Spark",
      badge: "The Beginning",
      year: "SY Break",
      summary: "First 48-hour online hackathon: completely lost. One month later: surprise win!",
      story: "We signed up on a whim during semester-end break. We had zero idea what we were doing, scrambled through 48 sleepless hours, and lost decisively. A month later, we tried another online hackathon. Surprisingly, everything clicked and we won. We never even got the prize money, but that victory changed everything: it ceased being about cash and became about the exhilarating process of building together under pressure."
    },
    {
      title: "The Grind & Heartbreaks",
      badge: "6 Offline + 3 Online",
      year: "TY / SY",
      summary: "2 AM crashes, cold Red Bulls, presentation anxiety, and repeated losses.",
      story: "Building under pressure tests relationships and resilience. We spent nights with servers crashing 10 minutes before judging, 2 AM dependency conflicts, rushing across railway stations for offline competitions, and watching other teams take home trophies. We made the finals repeatedly, only to fall just short. Each defeat forced us to evaluate our pitch, our architecture, and our focus."
    },
    {
      title: "The 10-Minute What-If Moment",
      badge: "The Idea Hackathon",
      year: "Final Year",
      summary: "Ranked 11th out of 300 teams. A 10-minute return window we couldn't make.",
      story: "At The Idea Hackathon, we competed against 300 teams and advanced to the top 50. During round 1, our presentation narrative was slightly off. During round 2, a server API glitch broke two key features. We missed the top 10. Later, we learned we were ranked 11th, and a top-10 team hadn't shown up — giving us the slot! But I had already left the campus, and they needed us back in 10 minutes. It was impossible in Mumbai traffic. It taught me invaluable lessons about redundant testing, calmness, and staying on-site until the final whistle."
    },
    {
      title: "The Breakthrough Podiums",
      badge: "Podium Trophies & Paper",
      year: "Breakthrough",
      summary: "Adrita pushed: 'One more shot.' Then came the IEEE and CSI podium finishes.",
      story: "After repeated losses, exhaustion had set in. I was seriously thinking of taking an extended break from hackathons. That's when Adrita convinced us to give it one more shot. We regrouped, simplified our prototype, and delivered: 2nd Runner-up at IEEE Hack to the Future (Manipal University Jaipur), 2nd Runner-up at ALGOFORGE'25 (IEEE KJSIT), Finalists at UNION BANK Hackathon'25 (CSI KJSCE), and presenting our peer-reviewed research paper at the prestigious ICDMAI conference."
    }
  ];

  return (
    <div className="space-y-6 my-4">
      {/* Team Roster Grid */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              The Crew — Unfortunately Fortunate / NemoHacks
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            A Shared Journey, Never Solo
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {teamMembers.map(m => (
            <div key={m.name} className="p-2 rounded bg-black/40 border border-white/5 text-left">
              <div className="text-xs font-semibold text-white">{m.name}</div>
              <div className="text-[10px] font-mono text-neutral-400">{m.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Milestones Selector */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {milestones.map((m, idx) => {
            const isSelected = selectedMilestone === idx;
            return (
              <button
                key={m.title}
                onClick={() => setSelectedMilestone(idx)}
                className={`p-3 rounded-lg text-left transition-all border ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400/60 shadow-lg shadow-amber-950/40 text-white'
                    : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'
                }`}
              >
                <div className="text-[10px] font-mono text-amber-400 mb-1">{m.year}</div>
                <div className="text-xs font-semibold text-white leading-tight">{m.title}</div>
                <div className="text-[10px] font-mono text-neutral-400 mt-1">{m.badge}</div>
              </button>
            );
          })}
        </div>

        {/* Milestone Detail Card */}
        <div className="p-4 rounded-xl bg-space-950/80 border border-white/10 space-y-2 text-xs text-neutral-300">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white text-sm">
              {milestones[selectedMilestone].title}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40">
              {milestones[selectedMilestone].badge}
            </span>
          </div>
          <p className="leading-relaxed">
            {milestones[selectedMilestone].story}
          </p>
        </div>
      </div>

      {/* Verified Achievements List */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
          <Award size={15} />
          Podium Finishes & Research Recognitions
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-start gap-2.5">
            <Trophy size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">2nd Runner-up — Hack to the Future</div>
              <div className="text-[11px] text-neutral-400 font-mono">IEEE • Manipal University Jaipur</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-start gap-2.5">
            <Trophy size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">2nd Runner-up — ALGOFORGE&apos;25</div>
              <div className="text-[11px] text-neutral-400 font-mono">IEEE • K J Somaiya Institute of Technology</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-start gap-2.5">
            <Trophy size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Finalist — UNION BANK Hackathon&apos;25</div>
              <div className="text-[11px] text-neutral-400 font-mono">CSI • K J Somaiya College of Engineering</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-start gap-2.5">
            <Sparkles size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Research Paper Presentation</div>
              <div className="text-[11px] text-neutral-400 font-mono">ICDMAI (International AI & Data Platform)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

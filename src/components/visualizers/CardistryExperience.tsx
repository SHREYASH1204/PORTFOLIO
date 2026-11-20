import React, { useState } from 'react';
import { Sparkles, Layers, RotateCw, Play, BookOpen, Compass, Atom, Video, Mic, Flame } from 'lucide-react';

export const CardistryExperience: React.FC = () => {
  const [flourish, setFlourish] = useState<'idle' | 'charlier' | 'sybil' | 'fan'>('fan');

  return (
    <div className="space-y-6 my-4">
      {/* Intro narrative */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-violet-950/30 via-space-900 to-space-900 border border-violet-500/20 text-xs text-neutral-300">
        <div className="flex items-center gap-2 text-violet-400 font-mono font-semibold mb-1 text-[11px] uppercase tracking-wider">
          <Sparkles size={14} />
          Beyond Code — Cardistry, YouTube & Stand-up Aspirations
        </div>
        <p className="leading-relaxed">
          I don&apos;t believe in a one-dimensional life where identity begins and ends in a code editor. Offline, I find creative flow in cardistry (the physical manipulation of playing cards), and I&apos;m preparing to launch a YouTube channel and take the mic for stand-up comedy.
        </p>
      </div>

      {/* Interactive Flourish Playground */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Interactive Card Flourish Sandbox
            </div>
            <div className="text-[11px] text-neutral-400 font-mono">
              Trigger tactile cuts, packet displays, and card spreads
            </div>
          </div>

          {/* Flourish selector buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/10 overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setFlourish('fan')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all whitespace-nowrap active:scale-95 ${
                flourish === 'fan' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Card Fan
            </button>
            <button
              onClick={() => setFlourish('charlier')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all whitespace-nowrap active:scale-95 ${
                flourish === 'charlier' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Charlier Cut
            </button>
            <button
              onClick={() => setFlourish('sybil')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all whitespace-nowrap active:scale-95 ${
                flourish === 'sybil' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Sybil Display
            </button>
            <button
              onClick={() => setFlourish('idle')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all whitespace-nowrap active:scale-95 ${
                flourish === 'idle' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Square Deck
            </button>
          </div>
        </div>

        {/* 3D Playing Card Simulation Stage */}
        <div className="relative h-64 w-full flex items-center justify-center perspective-[1000px] overflow-hidden bg-space-950/80 rounded-xl border border-white/5">
          <div className="relative w-full h-full flex items-center justify-center transform scale-[0.82] sm:scale-100 transition-transform">
          {/* Deck of 7 visual cards */}
          {[
            { id: 1, label: 'A♠', color: 'text-white' },
            { id: 2, label: 'K♦', color: 'text-rose-400' },
            { id: 3, label: 'Q♣', color: 'text-cyan-300' },
            { id: 4, label: 'J♥', color: 'text-rose-400' },
            { id: 5, label: '10♠', color: 'text-white' },
            { id: 6, label: '9♦', color: 'text-rose-400' },
            { id: 7, label: '8♣', color: 'text-cyan-300' },
          ].map((card, idx) => {
            let transform = 'translate(-50%, -50%)';

            if (flourish === 'idle') {
              transform = `translate(-50%, -50%) translateY(${idx * -1.5}px)`;
            } else if (flourish === 'fan') {
              const angle = (idx - 3) * 14;
              const xOffset = (idx - 3) * 22;
              transform = `translate(-50%, -50%) translateX(${xOffset}px) rotate(${angle}deg) translateY(${Math.abs(idx - 3) * 4}px)`;
            } else if (flourish === 'charlier') {
              if (idx < 3) {
                transform = `translate(-50%, -50%) translateY(35px) rotate(-8deg)`;
              } else {
                transform = `translate(-50%, -50%) translateY(-45px) rotate(24deg) translateX(20px)`;
              }
            } else if (flourish === 'sybil') {
              const angles = [-35, -15, 10, 30, -20, 25, 45];
              const xOffsets = [-90, -45, 0, 45, 90, -30, 60];
              const yOffsets = [-30, 20, -40, 25, -20, 45, -35];
              transform = `translate(-50%, -50%) translate(${xOffsets[idx]}px, ${yOffsets[idx]}px) rotate(${angles[idx]}deg)`;
            }

            return (
              <div
                key={card.id}
                className="absolute top-1/2 left-1/2 w-28 h-40 rounded-xl bg-gradient-to-br from-space-850 via-space-900 to-space-950 border border-violet-400/40 shadow-2xl p-2.5 flex flex-col justify-between transition-all duration-700 select-none cursor-pointer hover:border-violet-300"
                style={{
                  transform,
                  zIndex: idx + 10,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                }}
              >
                <div className={`text-xs font-mono font-bold ${card.color}`}>
                  {card.label}
                </div>
                <div className="flex items-center justify-center opacity-60">
                  <div className="w-12 h-12 rounded-lg border border-violet-500/40 flex items-center justify-center rotate-45 bg-violet-950/20">
                    <div className="w-6 h-6 border border-cyan-400/30 rotate-45" />
                  </div>
                </div>
                <div className={`text-xs font-mono font-bold self-end rotate-180 ${card.color}`}>
                  {card.label}
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>

      {/* YouTube Channel & Stand-up Comedy Ambitions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-space-950/80 border border-red-500/20 space-y-2">
          <div className="flex items-center gap-2 text-red-400 font-mono font-semibold">
            <Video size={15} />
            Starting a YouTube Channel
          </div>
          <p className="text-neutral-300 leading-relaxed">
            Planning to launch a YouTube channel combining visual storytelling with technical rigor: breaking down complex Machine Learning systems and System Design in plain English, while sharing cardistry routines and behind-the-scenes building logs.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-space-950/80 border border-amber-500/20 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-mono font-semibold">
            <Mic size={15} />
            Stand-Up Comedy Aspirations
          </div>
          <p className="text-neutral-300 leading-relaxed">
            I love observing everyday ironies — the existential dread of 2 AM debugging, student life in Mumbai, and the absurdities of tech culture. I plan to try open mics and do stand-up because humor, like code, is all about timing, setup, and execution.
          </p>
        </div>
      </div>

      {/* Additional Dimensions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-space-950/60 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-mono font-semibold">
            <Atom size={15} />
            Science & Wonder
          </div>
          <p className="text-neutral-300 leading-relaxed">
            A fascination with cosmology, astrophysics, and quantum mechanics. Learning how fundamental physical forces govern reality constantly reframes how I model complex computational networks.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-space-950/60 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-mono font-semibold">
            <BookOpen size={15} />
            Reading & Mental Models
          </div>
          <p className="text-neutral-300 leading-relaxed">
            Exploring non-fiction across decision-making, technological history, and human behavior. Books allow borrowing someone else&apos;s years of trial and error in a matter of hours.
          </p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useUniverse } from '../../state/useUniverseStore';
import { MessageSquare, ArrowRight } from 'lucide-react';

export const ShimmerHero: React.FC = () => {
  const { selectedNode, setIsChatOpen } = useUniverse();

  // If a node is selected and drawer is open, keep background hero hidden
  if (selectedNode) return null;

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-6 md:p-12 z-10">
      {/* Top Subtle Watermark Typography — Quiet background ambient title */}
      <div className="w-full text-center mt-16 sm:mt-12 md:mt-4 select-none opacity-[0.07] transition-opacity duration-700 pointer-events-none">
        <h1 
          className="tracking-tighter uppercase font-black text-white/50"
          style={{
            fontSize: 'clamp(2rem, 7vw, 7.5rem)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          SHREYASH GUPTA
        </h1>
      </div>

      {/* Center-Bottom Unified "Ask Anything" Pill */}
      <div className="flex justify-center mb-28 sm:mb-24 md:mb-12 px-2">
        <div 
          onClick={() => setIsChatOpen(true)}
          className="glass-panel px-3 sm:px-4 py-2 sm:py-2.5 rounded-full flex items-center gap-2 sm:gap-3 text-xs font-mono text-neutral-300 shadow-2xl pointer-events-auto border border-cyan-500/30 hover:border-cyan-400/60 bg-space-900/85 hover:bg-space-850 cursor-pointer transition-all hover:scale-[1.02] active:scale-95 group max-w-[92vw]"
          title="Click to ask Shreyash AI anything"
        >
          <span className="flex h-2 w-2 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>

          <span className="text-neutral-300 group-hover:text-white transition-colors truncate">
            <span className="hidden sm:inline">Ask anything about Shreyash, projects, system design, cardistry...</span>
            <span className="inline sm:hidden">Ask AI about Shreyash, projects...</span>
          </span>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsChatOpen(true);
            }}
            className="ml-0.5 sm:ml-1 px-2.5 sm:px-3 py-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-200 text-[10px] sm:text-[11px] font-sans font-medium transition-all flex items-center gap-1 sm:gap-1.5 flex-shrink-0"
          >
            <span>Ask AI</span>
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useUniverse } from '../../state/useUniverseStore';
import { CATEGORIES } from '../../data/universeData';
import { NodeCategory } from '../../types/universe';
import { 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Pause, 
  Play,
  Github,
  Linkedin,
  Mail
} from 'lucide-react';

export const BottomHUD: React.FC = () => {
  const { 
    resetCamera, 
    soundMuted, 
    toggleSound, 
    isAutoExploring, 
    toggleAutoExplore,
    activeCategory,
    setActiveCategory
  } = useUniverse();

  const categories = Object.values(CATEGORIES);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 p-2.5 sm:p-4 md:p-6 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-3 pointer-events-none">
      {/* Mobile Horizontal Category Scroller */}
      <div className="flex lg:hidden items-center gap-1 glass-panel p-1 rounded-full pointer-events-auto max-w-[calc(100vw-1.5rem)] overflow-x-auto no-scrollbar order-1 md:order-none shadow-xl border border-white/10">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap transition-all active:scale-95 ${
            activeCategory === 'all'
              ? 'bg-white/20 text-white font-semibold'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as NodeCategory)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap transition-all active:scale-95 ${
              activeCategory === cat.id
                ? 'bg-white/20 text-white font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Unified HUD Dock (On mobile: single unified compact row. On desktop: split docks) */}
      <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto order-2 md:order-none">
        <div className="glass-panel p-1 sm:p-1.5 rounded-full flex items-center gap-1 sm:gap-1.5 shadow-xl border border-white/10 bg-space-900/80">
          {/* Reset View Button */}
          <button
            onClick={resetCamera}
            className="p-2 sm:px-3.5 sm:py-2 rounded-full text-xs font-mono text-neutral-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all flex items-center gap-2"
            title="Reset camera view to center"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Auto Tour Button */}
          <button
            onClick={toggleAutoExplore}
            className={`p-2 sm:px-3.5 sm:py-2 rounded-full text-xs font-mono transition-all flex items-center gap-2 active:scale-95 ${
              isAutoExploring 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                : 'text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
            title="Automated guided tour through all nodes"
          >
            {isAutoExploring ? <Pause size={14} className="text-cyan-400 animate-pulse" /> : <Play size={14} />}
            <span className="hidden sm:inline">{isAutoExploring ? 'Touring...' : 'Auto Tour'}</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 sm:px-3.5 sm:py-2 rounded-full text-xs font-mono transition-all flex items-center gap-2 active:scale-95 ${
              !soundMuted 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/10'
            }`}
            title={soundMuted ? "Turn on ambient synthesizer" : "Mute synthesizer"}
          >
            {!soundMuted ? (
              <>
                <Volume2 size={14} className="text-emerald-400" />
                <span className="hidden sm:inline">Sound ON</span>
              </>
            ) : (
              <>
                <VolumeX size={14} />
                <span className="hidden sm:inline">Sound OFF</span>
              </>
            )}
          </button>

          {/* Divider on Mobile so socials fit into same dock */}
          <div className="h-4 w-px bg-white/15 my-auto md:hidden" />

          {/* Mobile Social Icons embedded inside dock */}
          <div className="flex md:hidden items-center">
            <a
              href="https://github.com/SHREYASH1204"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-neutral-300 hover:text-white active:scale-95 transition-all"
              title="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/shreyash-gupta-b3a21025b"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-neutral-300 hover:text-white active:scale-95 transition-all"
              title="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="mailto:shreyashgupta401@gmail.com"
              className="p-2 rounded-full text-neutral-300 hover:text-white active:scale-95 transition-all"
              title="Email"
            >
              <Mail size={14} />
            </a>
          </div>
        </div>

        {/* Desktop Hint */}
        <div className="hidden xl:flex items-center gap-2 glass-panel px-3.5 py-2 rounded-full text-[11px] font-mono text-neutral-400 shadow-lg border-white/5">
          <span>Drag to orbit • Pinch to zoom • Tap star to explore</span>
        </div>
      </div>

      {/* Desktop Social Links Dock */}
      <div className="hidden md:flex items-center gap-2 pointer-events-auto">
        <div className="glass-panel p-1.5 rounded-full flex items-center gap-1 shadow-xl border border-white/10 bg-space-900/80">
          <a
            href="https://github.com/SHREYASH1204"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-all"
            title="GitHub Profile"
          >
            <Github size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/shreyash-gupta-b3a21025b"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-all"
            title="LinkedIn Profile"
          >
            <Linkedin size={15} />
          </a>
          <a
            href="mailto:shreyashgupta401@gmail.com"
            className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-all"
            title="Send an Email"
          >
            <Mail size={15} />
          </a>
        </div>
      </div>
    </div>
  );
};

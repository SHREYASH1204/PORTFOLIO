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
    <div className="fixed bottom-0 left-0 right-0 z-30 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-none">
      {/* Mobile Horizontal Category Scroller */}
      <div className="flex lg:hidden items-center gap-1.5 glass-panel p-1 rounded-full pointer-events-auto max-w-[94vw] overflow-x-auto no-scrollbar order-1 md:order-none">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap transition-all ${
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
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-white/20 text-white font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Main HUD Controls Dock (Center/Left) */}
      <div className="flex items-center gap-2 pointer-events-auto order-2 md:order-none">
        {/* Reset View Button */}
        <button
          onClick={resetCamera}
          className="glass-panel px-3.5 py-2 rounded-full text-xs font-mono text-neutral-300 hover:text-white hover:border-white/30 transition-all flex items-center gap-2 shadow-lg"
          title="Reset camera view to center"
        >
          <RotateCcw size={13} />
          <span className="hidden sm:inline">Reset View</span>
        </button>

        {/* Auto Tour / Explore All Button */}
        <button
          onClick={toggleAutoExplore}
          className={`glass-panel px-3.5 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-2 shadow-lg ${
            isAutoExploring 
              ? 'border-cyan-400/60 bg-cyan-950/40 text-cyan-300 shadow-cyan-950/50' 
              : 'text-neutral-300 hover:text-white hover:border-white/30'
          }`}
          title="Automated guided tour through all nodes"
        >
          {isAutoExploring ? <Pause size={13} className="text-cyan-400 animate-pulse" /> : <Play size={13} />}
          <span className="hidden sm:inline">{isAutoExploring ? 'Touring...' : 'Auto Tour'}</span>
        </button>

        {/* Spatial Audio Synthesizer Toggle */}
        <button
          onClick={toggleSound}
          className={`glass-panel px-3.5 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-2 shadow-lg ${
            !soundMuted 
              ? 'border-emerald-400/50 bg-emerald-950/30 text-emerald-300' 
              : 'text-neutral-400 hover:text-neutral-200 hover:border-white/20'
          }`}
          title={soundMuted ? "Turn on cosmic ambient synthesizer" : "Mute audio synthesizer"}
        >
          {!soundMuted ? (
            <>
              <Volume2 size={13} className="text-emerald-400" />
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-1.5 bg-emerald-400 animate-pulse"></span>
                <span className="w-0.5 h-3 bg-emerald-400 animate-pulse delay-75"></span>
                <span className="w-0.5 h-2 bg-emerald-400 animate-pulse delay-150"></span>
              </div>
              <span className="hidden sm:inline">Sound ON</span>
            </>
          ) : (
            <>
              <VolumeX size={13} />
              <span className="hidden sm:inline">Sound OFF</span>
            </>
          )}
        </button>

        {/* Interaction Hint Pill */}
        <div className="hidden xl:flex items-center gap-2 glass-panel px-3.5 py-2 rounded-full text-[11px] font-mono text-neutral-400 shadow-lg border-white/5">
          <span>Drag to orbit • Scroll to zoom • Click star to explore</span>
        </div>
      </div>

      {/* Bottom Right: Social Links Dock (Email, LinkedIn, GitHub placed down as requested) */}
      <div className="flex items-center gap-2 pointer-events-auto order-3 md:order-none">
        <div className="glass-panel p-1.5 rounded-full flex items-center gap-1 shadow-xl border border-white/10 bg-space-900/80">
          {/* GitHub */}
          <a
            href="https://github.com/SHREYASH1204"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-all"
            title="GitHub Profile"
          >
            <Github size={15} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/shreyash-gupta-b3a21025b"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-all"
            title="LinkedIn Profile"
          >
            <Linkedin size={15} />
          </a>

          {/* Email */}
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

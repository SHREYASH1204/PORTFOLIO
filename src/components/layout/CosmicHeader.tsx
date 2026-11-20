import React from 'react';
import { CATEGORIES } from '../../data/universeData';
import { useUniverse } from '../../state/useUniverseStore';
import { NodeCategory } from '../../types/universe';
import { 
  FileText, 
  Grid,
  Box,
  Search
} from 'lucide-react';

export const CosmicHeader: React.FC = () => {
  const { 
    activeCategory, 
    setActiveCategory, 
    viewMode, 
    setViewMode,
    resetCamera,
    setIsSearching
  } = useUniverse();

  const categories = Object.values(CATEGORIES);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 px-3 sm:px-4 md:px-8 flex items-center justify-between pointer-events-none">
      {/* Left: Identity Badge & View Toggle */}
      <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
        <button
          onClick={resetCamera}
          className="flex items-center gap-2 sm:gap-2.5 glass-panel px-2.5 sm:px-3.5 py-1.5 rounded-full hover:border-white/25 active:scale-95 transition-all group"
          title="Reset Constellation"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-[11px] sm:text-xs text-white shadow-sm shadow-cyan-500/50 group-hover:scale-105 transition-transform flex-shrink-0">
            SG
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-white tracking-tight leading-tight">Shreyash</span>
            <span className="text-[9px] sm:text-[10px] font-mono text-cyan-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="hidden xs:inline">Portfolio</span> Universe
            </span>
          </div>
        </button>

        {/* View mode toggle (3D / Grid) */}
        <button
          onClick={() => setViewMode(viewMode === '3d' ? 'list' : '3d')}
          className="glass-panel px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono text-neutral-300 hover:text-white hover:border-white/20 active:scale-95 transition-all flex items-center gap-1.5"
          title={viewMode === '3d' ? "Switch to Overview Grid" : "Switch to 3D Constellation"}
        >
          {viewMode === '3d' ? <Grid size={14} /> : <Box size={14} />}
          <span className="hidden sm:inline">{viewMode === '3d' ? 'Grid View' : '3D Orbit'}</span>
        </button>
      </div>

      {/* Center: Clean Category Filter Pills (Desktop) */}
      <nav className="hidden lg:flex items-center gap-1 glass-panel p-1 rounded-full pointer-events-auto max-w-2xl overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            activeCategory === 'all'
              ? 'bg-white/15 text-white font-semibold shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
          }`}
        >
          All Stars
        </button>
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as NodeCategory)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all ${
                isActive
                  ? 'bg-white/15 text-white font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
              }`}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full" 
                style={{ backgroundColor: cat.color }}
              />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right: Search Modal Trigger & Resume Link */}
      <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
        <button
          onClick={() => setIsSearching(true)}
          className="glass-panel p-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-mono text-neutral-300 hover:text-white border-white/10 hover:border-white/25 active:scale-95 transition-all flex items-center gap-1.5"
          title="Search Projects & Systems (Ctrl+K)"
        >
          <Search size={14} className="text-cyan-400" />
          <span className="hidden md:inline text-[11px] text-neutral-400">Search</span>
          <kbd className="hidden lg:inline text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-neutral-400">⌘K</kbd>
        </button>

        <a
          href="/ShreyashG_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyan-300 hover:text-cyan-200 border-cyan-500/30 hover:border-cyan-400/60 bg-cyan-950/30 active:scale-95 flex items-center gap-1.5 transition-all shadow-sm shadow-cyan-950"
        >
          <FileText size={13} />
          <span>Resume</span>
        </a>
      </div>
    </header>
  );
};

import React from 'react';
import { CATEGORIES } from '../../data/universeData';
import { useUniverse } from '../../state/useUniverseStore';
import { NodeCategory } from '../../types/universe';
import { 
  FileText, 
  Grid,
  Box
} from 'lucide-react';

export const CosmicHeader: React.FC = () => {
  const { 
    activeCategory, 
    setActiveCategory, 
    viewMode, 
    setViewMode,
    resetCamera 
  } = useUniverse();

  const categories = Object.values(CATEGORIES);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4 md:px-8 flex items-center justify-between pointer-events-none">
      {/* Left: Identity Badge & View Toggle */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={resetCamera}
          className="flex items-center gap-2.5 glass-panel px-3.5 py-1.5 rounded-full hover:border-white/25 transition-all group"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-xs text-white shadow-sm shadow-cyan-500/50 group-hover:scale-105 transition-transform">
            SG
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-white tracking-tight leading-tight">Shreyash Gupta</span>
            <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Portfolio Universe
            </span>
          </div>
        </button>

        {/* View mode toggle (3D / Grid) */}
        <button
          onClick={() => setViewMode(viewMode === '3d' ? 'list' : '3d')}
          className="glass-panel px-3 py-1.5 rounded-full text-xs font-mono text-neutral-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5"
          title={viewMode === '3d' ? "Switch to Overview Grid" : "Switch to 3D Constellation"}
        >
          {viewMode === '3d' ? <Grid size={14} /> : <Box size={14} />}
          <span className="hidden sm:inline">{viewMode === '3d' ? 'Grid View' : '3D Orbit'}</span>
        </button>
      </div>

      {/* Center: Clean Category Filter Pills */}
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

      {/* Right: Only Clean Resume Action (Search, Ask AI & Socials moved to simplify and declutter) */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <a
          href="/ShreyashG_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyan-300 hover:text-cyan-200 border-cyan-500/30 hover:border-cyan-400/60 bg-cyan-950/30 flex items-center gap-1.5 transition-all shadow-sm shadow-cyan-950"
        >
          <FileText size={14} />
          <span>Resume</span>
        </a>
      </div>
    </header>
  );
};

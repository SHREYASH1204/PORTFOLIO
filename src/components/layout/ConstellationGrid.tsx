import React from 'react';
import { GALAXY_NODES, CATEGORIES } from '../../data/universeData';
import { useUniverse } from '../../state/useUniverseStore';
import { NodeCategory } from '../../types/universe';
import { ArrowRight, Sparkles, Box } from 'lucide-react';

export const ConstellationGrid: React.FC = () => {
  const { activeCategory, setActiveCategory, setSelectedNode, setViewMode } = useUniverse();

  const filteredNodes = activeCategory === 'all'
    ? GALAXY_NODES
    : GALAXY_NODES.filter(n => n.category === activeCategory);

  const categories = Object.values(CATEGORIES);

  return (
    <div className="absolute inset-0 z-20 pt-16 sm:pt-20 pb-28 md:pb-24 px-3 sm:px-6 md:px-12 overflow-y-auto no-scrollbar bg-space-950/95 backdrop-blur-md animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Header title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 border-b border-white/10 pb-4 sm:pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
              <Sparkles size={14} />
              Constellation Archive
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Universe Exploration Grid
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-1">
              {filteredNodes.length} nodes cataloged across engineering, competitions, and life.
            </p>
          </div>

          <button
            onClick={() => setViewMode('3d')}
            className="self-start md:self-auto glass-panel px-3.5 py-2 rounded-full text-xs font-mono text-cyan-300 hover:text-white border-cyan-500/30 hover:border-cyan-400/60 active:scale-95 transition-all flex items-center gap-2"
          >
            <Box size={14} />
            <span>Return to 3D Orbit View</span>
          </button>
        </div>

        {/* Category switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-white/20 text-white font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            All Sectors ({GALAXY_NODES.length})
          </button>
          {categories.map(cat => {
            const count = GALAXY_NODES.filter(n => n.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as NodeCategory)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span>{cat.label} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNodes.map(node => {
            const cat = CATEGORIES[node.category];
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all flex flex-col justify-between space-y-4 cursor-pointer group shadow-xl"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                      style={{ 
                        color: cat.color, 
                        borderColor: `${cat.color}40`,
                        backgroundColor: `${cat.color}15` 
                      }}
                    >
                      {cat.label}
                    </span>
                    {node.badge && (
                      <span className="text-[10px] font-mono text-neutral-400">
                        {node.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {node.title}
                  </h3>

                  <p className="text-xs text-cyan-400/90 font-mono">
                    {node.subtitle}
                  </p>

                  <p className="text-xs text-neutral-300 leading-relaxed font-sans line-clamp-3">
                    {node.summary}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-white/5">
                  <div className="flex flex-wrap gap-1">
                    {node.techStack.slice(0, 3).map(t => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-neutral-400 border border-white/5">
                        {t}
                      </span>
                    ))}
                    {node.techStack.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-neutral-500">
                        +{node.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white pt-1">
                    <span>Explore Story & Systems</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

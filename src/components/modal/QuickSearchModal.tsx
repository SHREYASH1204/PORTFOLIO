import React, { useState, useEffect, useRef } from 'react';
import { useUniverse } from '../../state/useUniverseStore';
import { GALAXY_NODES, CATEGORIES } from '../../data/universeData';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';

export const QuickSearchModal: React.FC = () => {
  const { isSearching, setIsSearching, setSelectedNode } = useUniverse();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Cmd+K / Ctrl+K & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearching(!isSearching);
      }
      if (e.key === 'Escape' && isSearching) {
        setIsSearching(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearching, setIsSearching]);

  useEffect(() => {
    if (isSearching) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isSearching]);

  if (!isSearching) return null;

  const filteredNodes = GALAXY_NODES.filter(node => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      node.title.toLowerCase().includes(q) ||
      node.subtitle.toLowerCase().includes(q) ||
      node.label.toLowerCase().includes(q) ||
      node.summary.toLowerCase().includes(q) ||
      node.techStack.some(t => t.toLowerCase().includes(q)) ||
      node.category.toLowerCase().includes(q)
    );
  });

  const handleSelect = (node: typeof GALAXY_NODES[0]) => {
    setSelectedNode(node);
    setIsSearching(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(filteredNodes.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredNodes[selectedIndex]) {
        handleSelect(filteredNodes[selectedIndex]);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={() => setIsSearching(false)}
    >
      <div 
        className="w-full max-w-xl glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-space-900/90 text-white flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
          <Search size={18} className="text-cyan-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Search projects, technologies, hackathons, or stories..."
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none font-sans"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-neutral-400 font-mono">ESC</kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-white/5">
          {filteredNodes.length === 0 ? (
            <div className="py-12 text-center text-sm text-neutral-400 font-mono">
              No matching nodes found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredNodes.map((node, index) => {
              const cat = CATEGORIES[node.category];
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={node.id}
                  onClick={() => handleSelect(node)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between ${
                    isSelected ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-2 h-2 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: cat.color }} 
                    />
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{node.title}</span>
                        {node.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-300">
                            {node.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-neutral-400 line-clamp-1">{node.subtitle}</span>
                      
                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {node.techStack.slice(0, 4).map(tech => (
                          <span key={tech} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-neutral-400">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-neutral-400">
                    <span className="text-[11px] font-mono capitalize hidden sm:inline">{cat.label}</span>
                    <CornerDownLeft size={14} className={isSelected ? 'text-cyan-400' : 'opacity-0'} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer tip */}
        <div className="px-4 py-2 border-t border-white/5 bg-black/30 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span>Navigate with ↑ and ↓, press Enter to open</span>
          <span>{filteredNodes.length} nodes found</span>
        </div>
      </div>
    </div>
  );
};

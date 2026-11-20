import React, { useEffect, useRef } from 'react';
import { useUniverse } from '../../state/useUniverseStore';
import { CATEGORIES, GALAXY_NODES } from '../../data/universeData';
import { 
  X, 
  ExternalLink, 
  Github, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  ChevronRight,
  GitFork
} from 'lucide-react';

import { ProjectsHubVisualizer } from '../visualizers/ProjectsHubVisualizer';
import { AfterCollegeVisualizer } from '../visualizers/AfterCollegeVisualizer';
import { IntellexVisualizer } from '../visualizers/IntellexVisualizer';
import { AMLVisualizer } from '../visualizers/AMLVisualizer';
import { CustomerIntelVisualizer } from '../visualizers/CustomerIntelVisualizer';
import { DrishtiVisualizer } from '../visualizers/DrishtiVisualizer';
import { HackathonTimeline } from '../visualizers/HackathonTimeline';
import { CollegeScrapbook } from '../visualizers/CollegeScrapbook';
import { TechnicalDnaCluster } from '../visualizers/TechnicalDnaCluster';
import { CardistryExperience } from '../visualizers/CardistryExperience';
import { ContactExperience } from '../visualizers/ContactExperience';

export const NodeDetailDrawer: React.FC = () => {
  const { 
    selectedNode, 
    setSelectedNode, 
    setHighlightedNodes,
    resetCamera 
  } = useUniverse();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedNode) {
        setSelectedNode(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNode, setSelectedNode]);

  // Scroll to top of drawer when node changes
  useEffect(() => {
    if (drawerRef.current) {
      drawerRef.current.scrollTop = 0;
    }
  }, [selectedNode?.id]);

  if (!selectedNode) return null;

  const catInfo = CATEGORIES[selectedNode.category];
  const nodeMap = new Map<string, typeof GALAXY_NODES[0]>();
  GALAXY_NODES.forEach(n => nodeMap.set(n.id, n));

  // Find connected nodes
  const connectedNodes = selectedNode.connections
    .map(id => nodeMap.get(id))
    .filter(Boolean) as typeof GALAXY_NODES;

  // Filter tech stack clicks to highlight other nodes
  const handleTechClick = (tech: string) => {
    const matching = GALAXY_NODES.filter(n => 
      n.techStack.some(t => t.toLowerCase() === tech.toLowerCase())
    ).map(n => n.id);
    setHighlightedNodes(matching);
  };

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex justify-end">
      {/* Semi-transparent backdrop for mobile dismiss */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-auto md:bg-transparent"
        onClick={() => setSelectedNode(null)}
      />

      {/* Main Drawer Panel (Right slide-in on desktop, bottom sheet on mobile) */}
      <div
        ref={drawerRef}
        className="w-full md:max-w-xl lg:max-w-2xl xl:max-w-[700px] h-[90vh] md:h-full mt-[10vh] md:mt-0 glass-panel md:border-l border-t md:border-t-0 border-white/15 bg-space-900/95 text-white flex flex-col pointer-events-auto z-10 shadow-2xl overflow-y-auto no-scrollbar animate-slide-in-right"
        style={{
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 glass-panel-subtle px-6 py-4 border-b border-white/10 flex items-center justify-between bg-space-900/90 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span 
              className="w-2 h-2 rounded-full shadow-sm"
              style={{ backgroundColor: catInfo.color, boxShadow: `0 0 8px ${catInfo.color}` }}
            />
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
              {catInfo.label}
            </span>
            {selectedNode.badge && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-cyan-300 border border-white/10 ml-1">
                {selectedNode.badge}
              </span>
            )}
          </div>

          <button
            onClick={() => setSelectedNode(null)}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
            title="Close Exploration (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Title & Subtitle */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
              {selectedNode.title}
            </h2>
            <p className="text-sm font-mono text-cyan-400">
              {selectedNode.subtitle}
            </p>
          </div>

          {/* Quick Metrics (if available) */}
          {selectedNode.metrics && selectedNode.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {selectedNode.metrics.map(m => (
                <div key={m.label} className="p-3 rounded-xl bg-space-950/70 border border-white/10">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    {m.label}
                  </div>
                  <div className="text-lg font-bold text-white font-mono mt-0.5">
                    {m.value}
                  </div>
                  {m.note && (
                    <div className="text-[10px] font-mono text-cyan-400/80 mt-0.5 truncate">
                      {m.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Summary */}
          <div className="text-sm text-neutral-200 leading-relaxed font-sans bg-black/25 p-4 rounded-xl border border-white/5">
            {selectedNode.summary}
          </div>

          {/* Custom Interactive Visualizers */}
          {selectedNode.customVisualizer === 'projects-hub' && <ProjectsHubVisualizer />}
          {selectedNode.customVisualizer === 'after-college' && <AfterCollegeVisualizer />}
          {selectedNode.customVisualizer === 'intellex' && <IntellexVisualizer />}
          {selectedNode.customVisualizer === 'aml' && <AMLVisualizer />}
          {selectedNode.customVisualizer === 'customer' && <CustomerIntelVisualizer />}
          {selectedNode.customVisualizer === 'drishti' && <DrishtiVisualizer />}
          {selectedNode.customVisualizer === 'hackathon' && <HackathonTimeline />}
          {selectedNode.customVisualizer === 'college' && <CollegeScrapbook />}
          {selectedNode.customVisualizer === 'dna' && <TechnicalDnaCluster />}
          {selectedNode.customVisualizer === 'cardistry' && <CardistryExperience />}
          {selectedNode.customVisualizer === 'contact' && <ContactExperience />}

          {/* Detailed Narrative (when custom visualizer doesn't replace it completely) */}
          {!['projects-hub', 'after-college', 'intellex', 'aml', 'customer', 'drishti', 'hackathon', 'college', 'cardistry', 'contact'].includes(selectedNode.customVisualizer || '') && (
            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed font-sans whitespace-pre-line">
              {selectedNode.detailedContent}
            </div>
          )}

          {/* Key Insights & Principles */}
          {selectedNode.keyInsights && selectedNode.keyInsights.length > 0 && (
            <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                <CheckCircle2 size={14} />
                Core Dimensions & Insights
              </div>
              <ul className="space-y-2">
                {selectedNode.keyInsights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology & Concept Pills */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="uppercase tracking-wider">Associated Technologies & Ideas</span>
              <span className="text-[10px]">Click pill to highlight linked nodes</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedNode.techStack.map(tech => (
                <button
                  key={tech}
                  onClick={() => handleTechClick(tech)}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-950/30 transition-all"
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* External Repository or Live Links */}
          {(selectedNode.repoUrl || selectedNode.liveUrl) && (
            <div className="flex items-center gap-3 pt-2">
              {selectedNode.repoUrl && (
                <a
                  href={selectedNode.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 text-xs font-mono font-medium transition-all shadow-lg shadow-cyan-950/40 group"
                >
                  <Github size={15} />
                  <span>Explore Repository on GitHub</span>
                  <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              {selectedNode.liveUrl && (
                <a
                  href={selectedNode.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-white/30 text-xs font-mono transition-all"
                >
                  <span>Live Resource</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          )}

          {/* Interconnected Constellation Nodes (Spatial Navigation) */}
          {connectedNodes.length > 0 && (
            <div className="border-t border-white/10 pt-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  <GitFork size={14} className="text-cyan-400" />
                  Connected Constellation Nodes
                </div>
                <span className="text-[10px] font-mono text-neutral-500">
                  Click to fly camera
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {connectedNodes.map(cNode => {
                  const cCat = CATEGORIES[cNode.category];
                  return (
                    <button
                      key={cNode.id}
                      onClick={() => setSelectedNode(cNode)}
                      className="p-3 rounded-xl bg-space-950/60 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span 
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: cCat.color }}
                        />
                        <div className="truncate">
                          <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                            {cNode.label}
                          </div>
                          <div className="text-[10px] font-mono text-neutral-400 truncate">
                            {cCat.label}
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

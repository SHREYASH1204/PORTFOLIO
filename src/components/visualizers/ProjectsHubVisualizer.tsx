import React, { useState } from 'react';
import { IntellexVisualizer } from './IntellexVisualizer';
import { AMLVisualizer } from './AMLVisualizer';
import { CustomerIntelVisualizer } from './CustomerIntelVisualizer';
import { DrishtiVisualizer } from './DrishtiVisualizer';
import { Cpu, ShieldCheck, Database, Eye, ExternalLink, Github } from 'lucide-react';

export const ProjectsHubVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'intellex' | 'aml' | 'customer' | 'drishti'>('intellex');

  const projects = [
    {
      id: 'intellex',
      title: 'Intellex',
      badge: 'Generative AI / RAG',
      desc: 'Role-Based Doc Intelligence with FAISS & LLaMA 3.3',
      repo: 'https://github.com/SHREYASH1204/Intellex',
      icon: Cpu,
      color: '#06b6d4',
    },
    {
      id: 'aml',
      title: 'AML Monitor',
      badge: 'Graph ML / FinTech',
      desc: '4-Layer Risk Detection (GraphSAGE, Rules, XGBoost, IsoForest)',
      repo: 'https://github.com/SHREYASH1204/Anti-Money-Laundering',
      icon: ShieldCheck,
      color: '#3b82f6',
    },
    {
      id: 'customer',
      title: 'Customer Intel',
      badge: 'Data Eng / MLOps',
      desc: '500K+ Events Bronze-Silver-Gold Lakehouse & SHAP Churn',
      repo: 'https://github.com/SHREYASH1204/Customer-intelligence-platform',
      icon: Database,
      color: '#10b981',
    },
    {
      id: 'drishti',
      title: 'DRISHTI',
      badge: 'Computer Vision',
      desc: 'OpenCV MOG2 Real-Time Crowd Safety & Density Z-Score',
      repo: 'https://github.com/shreyash1204/DRISHTII',
      icon: Eye,
      color: '#f43f5e',
    },
  ];

  const current = projects.find(p => p.id === activeTab)!;

  return (
    <div className="space-y-6">
      {/* Project Switcher Navigation */}
      <div className="space-y-2">
        <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
          Select Flagship Engineering Project:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {projects.map(p => {
            const isSelected = activeTab === p.id;
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id as typeof activeTab)}
                className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-space-800/90 border-cyan-400 text-white shadow-lg shadow-cyan-950/40'
                    : 'bg-white/5 border-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Icon size={16} style={{ color: isSelected ? p.color : undefined }} />
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-300">
                    {p.badge.split('/')[0]}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">{p.title}</div>
                  <div className="text-[10px] font-mono text-neutral-400 line-clamp-1 mt-0.5">{p.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* GitHub Link Bar */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-space-950 border border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: current.color }}></span>
          <span className="text-white font-semibold">{current.title} Deep-Dive Experience</span>
        </div>
        <a
          href={current.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-cyan-300 hover:text-white transition-colors"
        >
          <Github size={13} />
          <span>View Source</span>
          <ExternalLink size={11} />
        </a>
      </div>

      {/* Render Active Project Visualizer */}
      <div className="transition-all duration-300">
        {activeTab === 'intellex' && <IntellexVisualizer />}
        {activeTab === 'aml' && <AMLVisualizer />}
        {activeTab === 'customer' && <CustomerIntelVisualizer />}
        {activeTab === 'drishti' && <DrishtiVisualizer />}
      </div>
    </div>
  );
};

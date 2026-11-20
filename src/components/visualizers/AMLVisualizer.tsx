import React, { useState } from 'react';
import { 
  Network, 
  ShieldAlert, 
  Activity, 
  Binary, 
  RotateCw, 
  Split, 
  Users, 
  AlertTriangle,
  ArrowRight,
  Flame
} from 'lucide-react';

export const AMLVisualizer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [patternType, setPatternType] = useState<'circular' | 'structuring' | 'mule'>('circular');

  const layers = [
    {
      name: "Layer 1: Deterministic Rules",
      badge: "18+ Rules Engine",
      icon: Binary,
      color: "#06b6d4",
      desc: "Evaluates immediate compliance red flags: rapid velocity pass-through, transactions just below threshold limits, and funds recycling."
    },
    {
      name: "Layer 2: GraphSAGE Network Analysis",
      badge: "Graph Representation Learning",
      icon: Network,
      color: "#3b82f6",
      desc: "Models accounts as nodes and transfers as directed edges. Learns inductive structural embeddings to expose concealed communities and money mule rings."
    },
    {
      name: "Layer 3: Behavioral XGBoost",
      badge: "Supervised Classification",
      icon: Activity,
      color: "#10b981",
      desc: "Extracts statistical feature vectors across rolling transaction windows, scoring behavioral deviations against normal historical baselines."
    },
    {
      name: "Layer 4: Isolation Forest Anomaly Detection",
      badge: "Unsupervised Forensics",
      icon: ShieldAlert,
      color: "#8b5cf6",
      desc: "Isolates multidimensional transaction outliers across the broader synthetic population to catch novel, zero-day laundering schemes."
    }
  ];

  return (
    <div className="space-y-6 my-4">
      {/* Origin Story Highlight Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-space-900 border border-amber-500/20 text-xs text-neutral-300">
        <div className="flex items-center gap-2 text-amber-400 font-mono font-semibold mb-1 text-[11px] uppercase tracking-wider">
          <Flame size={14} />
          The Origin Story — From a Hackathon Defeat to a FinTech Calling
        </div>
        <p className="leading-relaxed">
          At my first offline hackathon, our team tackled a complex BFSI fraud problem statement. We pushed through 48 exhausting hours, gave it everything, and unfortunately lost. But that loss sparked a genuine fascination: understanding how illicit syndicates conceal illicit flows, and how graph topology and machine learning can expose hidden financial crime networks. That curiosity sparked AML Monitor.
        </p>
      </div>

      {/* 4-Layer Architecture Visual Flow (Interactive, not a table) */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            The 4-Layer Detection Pipeline
          </span>
          <span className="text-[11px] font-mono text-neutral-400">Click layer to inspect</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {layers.map((layer, idx) => {
            const Icon = layer.icon;
            const isSelected = activeLayer === idx;
            return (
              <button
                key={layer.name}
                onClick={() => setActiveLayer(idx)}
                className={`p-3 rounded-lg text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-space-800/90 border-cyan-400/60 shadow-lg shadow-cyan-950/40 text-white'
                    : 'bg-white/5 border-white/5 text-neutral-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon size={16} style={{ color: layer.color }} />
                  <span className="text-[10px] font-mono text-neutral-400">L0{idx + 1}</span>
                </div>
                <div>
                  <div className="text-xs font-semibold leading-tight">{layer.name}</div>
                  <div className="text-[10px] font-mono text-neutral-400 mt-1">{layer.badge}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-neutral-300">
          <span className="font-semibold text-white">{layers[activeLayer].name}: </span>
          {layers[activeLayer].desc}
        </div>
      </div>

      {/* Interactive Financial Crime Typology Visualizer */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Interactive Laundering Typologies
            </div>
            <div className="text-[11px] text-neutral-400 font-mono">
              Simulating synthetic transaction topologies
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/5 overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setPatternType('circular')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
                patternType === 'circular' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <RotateCw size={12} />
              Circular Loop
            </button>
            <button
              onClick={() => setPatternType('structuring')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
                patternType === 'structuring' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Split size={12} />
              Structuring
            </button>
            <button
              onClick={() => setPatternType('mule')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
                patternType === 'mule' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Users size={12} />
              Mule Network
            </button>
          </div>
        </div>

        {/* Pattern Canvas Visual */}
        <div className="p-6 rounded-xl bg-space-950/80 border border-white/10 flex flex-col items-center justify-center min-h-[220px]">
          {patternType === 'circular' && (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
                {['Acc A (Origin)', 'Acc B', 'Acc C', 'Acc D', 'Acc E (Sink)'].map((acc, i) => (
                  <React.Fragment key={acc}>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full border border-cyan-400/60 bg-cyan-950/40 flex items-center justify-center text-[10px] font-mono text-cyan-300 shadow-md shadow-cyan-950">
                        N{i+1}
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 mt-1">{acc}</span>
                    </div>
                    {i < 4 && <ArrowRight size={14} className="text-cyan-400 animate-pulse" />}
                  </React.Fragment>
                ))}
              </div>
              <div className="text-[11px] font-mono text-cyan-300/80 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-800/40">
                ↺ Funds cycle back from Acc E to Acc A in closed loop — GraphSAGE identifies cyclic structural embedding
              </div>
            </div>
          )}

          {patternType === 'structuring' && (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg border border-amber-400/50 bg-amber-950/40 text-center font-mono text-xs text-amber-300">
                  <div>Source Fund</div>
                  <div className="font-bold text-amber-200">$50,000 Total</div>
                </div>
                <ArrowRight size={16} className="text-amber-400" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['$9,800', '$9,500', '$9,900', '$9,750', '$9,950'].map((amt, idx) => (
                    <div key={idx} className="px-2 py-1.5 rounded border border-white/10 bg-black/40 text-center font-mono text-[11px] text-neutral-300">
                      <div>Acc #{idx + 101}</div>
                      <div className="text-amber-300 font-semibold">{amt}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[11px] font-mono text-amber-300/80 bg-amber-950/30 px-3 py-1 rounded-full border border-amber-800/40">
                ⚡ Smurfing detection: Sub-threshold velocity filter triggers high-probability structuring alert
              </div>
            </div>
          )}

          {patternType === 'mule' && (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-center">
                <div className="flex flex-col gap-1.5">
                  <div className="px-2 py-1 rounded bg-purple-950/40 border border-purple-500/30 text-[10px] font-mono text-purple-200">Victim Account 1</div>
                  <div className="px-2 py-1 rounded bg-purple-950/40 border border-purple-500/30 text-[10px] font-mono text-purple-200">Victim Account 2</div>
                </div>
                <ArrowRight size={14} className="text-purple-400" />
                <div className="w-14 h-14 rounded-full border-2 border-purple-400 bg-purple-950/60 flex flex-col items-center justify-center text-[10px] font-mono text-white shadow-lg shadow-purple-950 text-center p-1">
                  <span className="font-bold">Mule Hub</span>
                  <span className="text-[8px] text-purple-300">High In/Out</span>
                </div>
                <ArrowRight size={14} className="text-purple-400" />
                <div className="px-3 py-2 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-neutral-300">
                  Crypto / Cash Withdrawal
                </div>
              </div>
              <div className="text-[11px] font-mono text-purple-300/80 bg-purple-950/30 px-3 py-1 rounded-full border border-purple-800/40">
                🔍 Fan-in & Fan-out topology flagged by Isolation Forest & Graph community partition
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controlled Synthetic Unit Testing Card */}
      <div className="p-4 rounded-xl bg-space-850/80 border border-cyan-500/20 text-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
          <span className="font-semibold flex items-center gap-1.5">
            <AlertTriangle size={14} className="text-amber-400" />
            Controlled Synthetic Unit-Testing Results
          </span>
          <span className="text-[10px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800/50">
            Synthetic Benchmark
          </span>
        </div>
        <p className="text-neutral-300 leading-relaxed">
          In a controlled unit-testing scenario, clean synthetic accounts were injected with fraudulent five-node circular transaction chains. All 5 injected circular chains successfully triggered automated risk alarms (producing a 100% synthetic detection rate, 5/5), with the average risk score surging by ~450% after the injected fraud initiated.
        </p>
        <p className="text-[11px] font-mono text-neutral-400 italic">
          *Note: This evaluation represents controlled synthetic unit testing on generated banking topologies, not production validation on live banking networks.
        </p>
      </div>
    </div>
  );
};

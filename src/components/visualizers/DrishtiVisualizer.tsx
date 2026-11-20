import React, { useState } from 'react';
import { 
  Eye, 
  Video, 
  AlertTriangle, 
  Smartphone, 
  Flame, 
  Activity, 
  Sliders, 
  ShieldCheck, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export const DrishtiVisualizer: React.FC = () => {
  const [densitySimulation, setDensitySimulation] = useState<'normal' | 'surge'>('normal');
  const [activeTab, setActiveTab] = useState<'vision' | 'ecosystem' | 'fest'>('vision');

  const isSurge = densitySimulation === 'surge';

  return (
    <div className="space-y-6 my-4">
      {/* Origin Story Callout */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-space-900 to-space-900 border border-cyan-500/20 text-xs text-neutral-300">
        <div className="flex items-center gap-2 text-cyan-400 font-mono font-semibold mb-1 text-[11px] uppercase tracking-wider">
          <Eye size={14} />
          The Origin Story — Asking the Urgent Question
        </div>
        <p className="leading-relaxed">
          During our final year at KJSIT, my teammates and I refused to build a generic capstone project. When news broke of a catastrophic crowd stampede, we asked ourselves: <em className="text-white">Could computer vision detect dangerous congestion dynamics before panic turns into disaster?</em> That question launched DRISHTI.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('vision')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
            activeTab === 'vision' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Activity size={13} />
          Vision Core & Risk Modeling
        </button>
        <button
          onClick={() => setActiveTab('ecosystem')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
            activeTab === 'ecosystem' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Smartphone size={13} />
          Connected Ecosystem
        </button>
        <button
          onClick={() => setActiveTab('fest')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
            activeTab === 'fest' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Sliders size={13} />
          College Fest Trial
        </button>
      </div>

      {/* TAB 1: Vision Core & Interactive Simulator */}
      {activeTab === 'vision' && (
        <div className="space-y-4">
          <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  OpenCV MOG2 Real-Time Density & Z-Score Engine
                </div>
                <div className="text-[11px] font-mono text-neutral-400">
                  Foreground pixel ratio & rolling congestion threshold simulation
                </div>
              </div>

              {/* Simulation Toggle */}
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/50 border border-white/10">
                <button
                  onClick={() => setDensitySimulation('normal')}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                    !isSurge ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-neutral-400'
                  }`}
                >
                  Normal Flow
                </button>
                <button
                  onClick={() => setDensitySimulation('surge')}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                    isSurge ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-neutral-400'
                  }`}
                >
                  Density Surge Spike
                </button>
              </div>
            </div>

            {/* Simulated Vision Camera Feed & Heatmap Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Camera Feed Visualizer */}
              <div className="p-3 rounded-lg bg-space-950 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Video size={13} className="text-cyan-400" />
                    CAM_01: Quadrangle Corridor
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    LIVE 30 FPS
                  </span>
                </div>
                
                {/* Heatmap canvas mockup */}
                <div 
                  className={`h-36 rounded-lg relative overflow-hidden transition-all duration-700 flex items-center justify-center ${
                    isSurge 
                      ? 'bg-gradient-to-tr from-rose-950 via-rose-900/60 to-amber-950/70 border border-rose-500/50' 
                      : 'bg-gradient-to-tr from-space-900 via-cyan-950/40 to-space-900 border border-white/10'
                  }`}
                >
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:12px_12px]" />
                  
                  {/* Heatmap overlay dots */}
                  <div className="relative z-10 text-center space-y-1">
                    <div className={`text-2xl font-mono font-bold ${isSurge ? 'text-rose-400' : 'text-cyan-400'}`}>
                      {isSurge ? '78.4% Density Ratio' : '23.8% Density Ratio'}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-300">
                      MOG2 Foreground Extraction • Velocity: {isSurge ? '0.12 m/s (Choke)' : '1.34 m/s (Flow)'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Predictive Risk Assessment Gauges */}
              <div className="p-3 rounded-lg bg-space-950 border border-white/10 flex flex-col justify-between space-y-3">
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  Predictive Risk Assessment & Thresholds
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-300">Z-Score Density Deviation:</span>
                    <span className={`font-mono font-bold ${isSurge ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {isSurge ? '+3.42 σ (CRITICAL)' : '+0.45 σ (NOMINAL)'}
                    </span>
                  </div>

                  <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden border border-white/10">
                    <div 
                      className={`h-full transition-all duration-500 ${isSurge ? 'w-[88%] bg-rose-500' : 'w-[25%] bg-emerald-500'}`} 
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-neutral-300">Alert Tier Status:</span>
                    <span className={`font-mono text-[11px] px-2 py-0.5 rounded font-bold uppercase ${
                      isSurge 
                        ? 'bg-rose-950 text-rose-300 border border-rose-500/60 animate-pulse' 
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {isSurge ? 'LEVEL 2: RED ALERT (IMMINENT HAZARD)' : 'LEVEL 0: CLEAR / NOMINAL'}
                    </span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-neutral-400 border-t border-white/5 pt-2">
                  {isSurge 
                    ? '⚠️ Persistence threshold exceeded (>12s sustained density). Dispatching Flutter push alert to security guards.'
                    : '✓ Steady flow rate. Rolling density buffer tracking historical corridor baseline.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Ecosystem Architecture */}
      {activeTab === 'ecosystem' && (
        <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-3 text-xs text-neutral-300">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2">
            The Full-Stack Public Safety Ecosystem
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
              <div className="font-semibold text-white">1. Multi-Threaded Vision Core</div>
              <p className="text-[11px] text-neutral-400">
                Python backend utilizing OpenCV MOG2 and background subtraction for lightweight, low-latency edge camera computation.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
              <div className="font-semibold text-white">2. Operator Web Dashboard</div>
              <p className="text-[11px] text-neutral-400">
                Live multi-camera streaming, real-time spatial density heatmaps, and threshold control configuration.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
              <div className="font-semibold text-white">3. Flutter Mobile Companion</div>
              <p className="text-[11px] text-neutral-400">
                Field security app delivering immediate push notifications, alert history, and offline SQLite resilience.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
              <div className="font-semibold text-white">4. Cloud Sync & HOG Face Search</div>
              <p className="text-[11px] text-neutral-400">
                Firebase Firestore synchronization for real-time alerts + HOG feature matching for missing person reports.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: College Fest Trial Reflection */}
      {activeTab === 'fest' && (
        <div className="p-4 rounded-xl bg-space-950/80 border border-white/10 text-xs text-neutral-300 space-y-3">
          <div className="font-semibold text-white text-sm flex items-center gap-2">
            <span>Taking DRISHTI Outside the Development Environment</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-400">
              Live Campus Trial
            </span>
          </div>

          <p className="leading-relaxed">
            Until our final semester, all DRISHTI testing occurred in controlled setups on our laptops using pre-recorded test clips. We wanted to see what would happen in the unpredictable real world. During our annual college fest, we hooked up our prototype to monitor active quadrangle transit points.
          </p>

          <p className="leading-relaxed">
            The system worked and tracked moving bodies, but its real-world performance diverged markedly from our clean laptop baselines. Shifting sunlight, sudden shadows, lens distortion from budget webcams, and people stopping to chat proved far more complex than synthetic benchmarks.
          </p>

          <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-cyan-200 text-xs font-mono">
            &ldquo;Getting code to run on a development laptop and getting it to operate reliably in an uncontrolled physical environment are two completely different engineering disciplines.&rdquo;
          </div>
        </div>
      )}
    </div>
  );
};

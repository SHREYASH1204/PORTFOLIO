import React, { useState } from 'react';
import { 
  Layers, 
  Workflow, 
  BarChart3, 
  Server, 
  Sparkles, 
  ArrowRight, 
  Check, 
  TrendingDown, 
  Database,
  Clock
} from 'lucide-react';

export const CustomerIntelVisualizer: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'bronze' | 'silver' | 'gold' | 'ml'>('gold');

  const shapFeatures = [
    { name: "Days Inactive (Last 30d)", impact: "+0.38", desc: "User has not logged in for 18 days", positive: true },
    { name: "Support Escalations", impact: "+0.29", desc: "3 unresolved billing disputes", positive: true },
    { name: "Payment Retry Count", impact: "+0.21", desc: "2 failed card renewal attempts", positive: true },
    { name: "Active Team Seats", impact: "-0.24", desc: "4 active sub-seats reduce churn probability", positive: false },
    { name: "Contract Longevity", impact: "-0.18", desc: "Customer since 2023", positive: false },
  ];

  return (
    <div className="space-y-6 my-4">
      {/* Lakehouse Bronze-Silver-Gold Interactive Progression */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Bronze-Silver-Gold Lakehouse Pipeline
          </span>
          <span className="text-[11px] font-mono text-neutral-400">
            500K+ Events Streamed
          </span>
        </div>

        {/* Stages pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { id: 'bronze', label: '1. Bronze Tier', sub: 'Kafka & PostgreSQL Raw Events', color: '#f59e0b' },
            { id: 'silver', label: '2. Silver Tier', sub: 'PySpark Cleaning & Sessions', color: '#94a3b8' },
            { id: 'gold', label: '3. Gold Tier', sub: 'Customer Feature Store', color: '#eab308' },
            { id: 'ml', label: '4. Model & Serving', sub: 'XGBoost + SHAP + FastAPI', color: '#10b981' },
          ].map(stage => {
            const isSelected = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id as typeof activeStage)}
                className={`p-3 rounded-lg text-left transition-all border ${
                  isSelected
                    ? 'bg-space-800/90 border-emerald-400/60 shadow-lg shadow-emerald-950/40 text-white'
                    : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }}></span>
                  <span className="text-xs font-semibold text-white">{stage.label}</span>
                </div>
                <div className="text-[10px] font-mono text-neutral-400 line-clamp-1">{stage.sub}</div>
              </button>
            );
          })}
        </div>

        {/* Stage Detailed Explanation */}
        <div className="p-4 rounded-xl bg-space-950/80 border border-white/10 text-xs text-neutral-300">
          {activeStage === 'bronze' && (
            <div className="space-y-2">
              <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                <Database size={14} />
                Bronze Layer: Ingestion of 500K+ Unstructured Event Streams
              </div>
              <p>
                Incoming customer telemetry (clickstreams, billing charges, support chat pings) are ingested continuously via Apache Kafka and persisted into append-only PostgreSQL Bronze tables without alteration. Preserves immutable raw audit logs.
              </p>
            </div>
          )}

          {activeStage === 'silver' && (
            <div className="space-y-2">
              <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Workflow size={14} />
                Silver Layer: Distributed PySpark Cleaning & Sessionization
              </div>
              <p>
                PySpark scheduled cluster jobs de-duplicate, validate schema compliance, drop corrupted records, and reconstruct continuous customer session timelines across multiple web and mobile touchpoints.
              </p>
            </div>
          )}

          {activeStage === 'gold' && (
            <div className="space-y-2">
              <div className="font-semibold text-yellow-300 flex items-center gap-1.5">
                <Layers size={14} />
                Gold Layer: Aggregated Churn Feature Store
              </div>
              <p>
                User-level feature vectors are compiled into optimized Gold tables: rolling 7/30-day activity slopes, payment failure counts, support escalation frequency, and product engagement velocity.
              </p>
            </div>
          )}

          {activeStage === 'ml' && (
            <div className="space-y-2">
              <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                <Server size={14} />
                ML & Serving: XGBoost, SHAP Attribution & Dockerized FastAPI
              </div>
              <p>
                An XGBoost binary classifier delivers real-time churn risk predictions (~90% ROC-AUC), with local SHAP values served alongside the risk score. Apache Airflow orchestrates nightly automated ETL, model drift monitoring, and batch retraining.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SHAP Model Explainability Feature Importance Breakdown */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 size={15} className="text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              TreeSHAP Feature Attribution (Why Churn Was Predicted)
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
            ROC-AUC: ~90%
          </span>
        </div>

        <div className="space-y-2">
          {shapFeatures.map(feat => (
            <div key={feat.name} className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-xs">
              <div className="flex flex-col">
                <span className="font-medium text-white">{feat.name}</span>
                <span className="text-[11px] text-neutral-400">{feat.desc}</span>
              </div>
              <div className={`font-mono font-bold text-xs px-2 py-1 rounded ${
                feat.positive ? 'bg-rose-950/50 text-rose-300 border border-rose-800/40' : 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/40'
              }`}>
                {feat.positive ? 'Risk ' : 'Retention '} {feat.impact}
              </div>
            </div>
          ))}
        </div>

        <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-2 pt-1">
          <Clock size={12} className="text-emerald-400" />
          <span>Airflow automatically triggers daily feature reprocessing and drift evaluations at 02:00 UTC.</span>
        </div>
      </div>
    </div>
  );
};

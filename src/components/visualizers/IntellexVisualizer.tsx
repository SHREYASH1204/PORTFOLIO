import React, { useState } from 'react';
import { Database, FileText, Cpu, ShieldCheck, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';

export const IntellexVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedPrompt, setSelectedPrompt] = useState<number>(0);

  const sampleQueries = [
    {
      query: "How are repo-specific access permissions enforced?",
      retrievedChunks: [
        { source: "Architecture_Spec.pdf", page: 14, text: "Repository authorization checks user JWT claims against Firebase Security Rules before querying FAISS index partitions." },
        { source: "Security_Model.pdf", page: 6, text: "RBAC layer enforces tenant isolation; vector namespace filtering guarantees cross-repo retrieval isolation." }
      ],
      response: "Access permissions are enforced through a two-tier mechanism: first, Firebase authentication validates the user's role and JWT claims. Second, the FAISS vector query applies namespace-partitioned filtering, ensuring semantic retrieval only considers document vectors belonging to authorized repository IDs."
    },
    {
      query: "What document formats are ingested and how is chunking performed?",
      retrievedChunks: [
        { source: "Ingestion_Pipeline.pdf", page: 3, text: "PDFs and presentation decks (PPTX) are parsed via LangChain document loaders using recursive character text splitters." },
        { source: "Ingestion_Pipeline.pdf", page: 5, text: "Chunk size is set to 800 tokens with a 150-token overlap, preserving semantic coherence across page boundaries." }
      ],
      response: "Intellex ingests technical PDFs and slide decks through a LangChain ingestion pipeline. Documents are partitioned using recursive character splitters with an 800-token window and 150-token overlap to maintain contextual continuity across sections, while caching exact page coordinates."
    }
  ];

  const steps = [
    {
      title: "Document Ingestion",
      icon: FileText,
      desc: "Parsing PDF manuals & presentations into hierarchical semantic chunks with page coordinate metadata."
    },
    {
      title: "FAISS Vector Index",
      icon: Database,
      desc: "Generating high-dimensional dense embeddings and indexing them for fast nearest-neighbor retrieval."
    },
    {
      title: "Role-Based Guardrail",
      icon: ShieldCheck,
      desc: "Firebase RBAC partitions ensure vector retrieval only queries repos the user has clearance to access."
    },
    {
      title: "LLaMA 3.3 Synthesis",
      icon: Cpu,
      desc: "LLaMA 3.3 synthesizes the response, embedding page references to provide verifiable provenance."
    }
  ];

  return (
    <div className="space-y-6 my-4">
      {/* Interactive Pipeline Architecture Flow */}
      <div className="glass-panel p-4 rounded-xl border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Interactive Architecture Flow
          </span>
          <span className="text-[11px] font-mono text-neutral-400">
            Click a stage to inspect
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={s.title}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-lg text-left transition-all flex flex-col justify-between ${
                  isCurrent 
                    ? 'bg-cyan-500/20 border border-cyan-400/50 text-white shadow-lg shadow-cyan-950/40' 
                    : 'bg-white/5 border border-white/5 text-neutral-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon size={18} className={isCurrent ? 'text-cyan-400' : 'text-neutral-400'} />
                  <span className="text-[10px] font-mono text-neutral-400">0{idx + 1}</span>
                </div>
                <div className="text-xs font-semibold">{s.title}</div>
              </button>
            );
          })}
        </div>

        <div className="mt-3 p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-neutral-300 flex items-start gap-2">
          <ChevronRight size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
          <span>{steps[activeStep].desc}</span>
        </div>
      </div>

      {/* Interactive Query & Retrieval Simulation */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Live RAG Retrieval Simulator
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
            LLaMA 3.3 + FAISS
          </span>
        </div>

        {/* Prompt selector pills */}
        <div className="flex flex-wrap gap-2">
          {sampleQueries.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPrompt(idx)}
              className={`text-xs px-3 py-1.5 rounded-lg text-left transition-all ${
                selectedPrompt === idx
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-200'
                  : 'bg-white/5 border border-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              &ldquo;{item.query}&rdquo;
            </button>
          ))}
        </div>

        {/* Retrieved Chunks Display */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Semantic Vector Chunks Retrieved from FAISS (Cosine Sim &gt; 0.84):
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleQueries[selectedPrompt].retrievedChunks.map((chunk, i) => (
              <div key={i} className="p-2.5 rounded bg-black/50 border border-cyan-500/20 text-xs text-neutral-300">
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                  <span>📄 {chunk.source}</span>
                  <span className="bg-cyan-950 px-1.5 py-0.2 rounded">Page {chunk.page}</span>
                </div>
                <p className="italic text-neutral-300 text-[11px] leading-relaxed">
                  &ldquo;{chunk.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Synthesized Response */}
        <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/30">
          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 mb-1.5">
            <CheckCircle2 size={13} className="text-cyan-400" />
            <span className="font-semibold">Synthesized Answer (Context-Grounded):</span>
          </div>
          <p className="text-xs text-neutral-200 leading-relaxed font-sans">
            {sampleQueries[selectedPrompt].response}
          </p>
        </div>
      </div>
    </div>
  );
};

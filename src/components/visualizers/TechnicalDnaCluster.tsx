import React, { useState } from 'react';
import { GitBranch, Terminal, Cpu, Database, Server, Wrench, Sparkles } from 'lucide-react';

export const TechnicalDnaCluster: React.FC = () => {
  const [activeCluster, setActiveCluster] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string | null>('Python');

  const clusters = [
    {
      id: 'languages',
      title: 'Languages',
      icon: Terminal,
      color: '#06b6d4',
      skills: [
        { name: 'Python', role: 'Primary ML, Backend & Scripting language', usedIn: ['AML Monitor', 'Intellex', 'DRISHTI', 'Customer Intel'] },
        { name: 'SQL', role: 'Advanced relational queries & window analytics', usedIn: ['Customer Intel (PostgreSQL)', 'MySQL databases'] },
        { name: 'C++', role: 'Systems programming and performance fundamentals', usedIn: ['Academic coursework', 'Performance exploration'] },
        { name: 'Dart', role: 'Cross-platform mobile UI development', usedIn: ['DRISHTI mobile app', 'S4DS campus application'] },
      ]
    },
    {
      id: 'ml_ds',
      title: 'ML & Data Science',
      icon: Cpu,
      color: '#3b82f6',
      skills: [
        { name: 'XGBoost', role: 'Supervised classification and churn scoring', usedIn: ['AML Monitor (L03)', 'Customer Intel (~90% ROC-AUC)'] },
        { name: 'OpenCV', role: 'Real-time computer vision & motion kinematics', usedIn: ['DRISHTI (MOG2 background subtraction)'] },
        { name: 'SHAP', role: 'Tree-based local and global model explainability', usedIn: ['Customer Intel platform'] },
        { name: 'PyTorch / TensorFlow', role: 'Deep learning modeling & tensor ops', usedIn: ['Research exploration', 'Graph Neural Networks'] },
        { name: 'Scikit-learn', role: 'Evaluation metrics, preprocessing & Isolation Forest', usedIn: ['AML Monitor (L04 Anomaly Detection)'] },
        { name: 'NumPy & Pandas', role: 'High-performance vector and dataframe transforms', usedIn: ['All data science workflows'] },
      ]
    },
    {
      id: 'genai',
      title: 'Generative AI',
      icon: Sparkles,
      color: '#8b5cf6',
      skills: [
        { name: 'RAG Architectures', role: 'Context-grounded retrieval systems', usedIn: ['Intellex Knowledge Platform'] },
        { name: 'LangChain', role: 'Prompt orchestration & document loaders', usedIn: ['Intellex'] },
        { name: 'FAISS', role: 'Dense semantic vector indexing & similarity lookup', usedIn: ['Intellex'] },
        { name: 'LLaMA 3.3', role: 'Open-weight foundation LLM synthesis', usedIn: ['Intellex'] },
        { name: 'Hugging Face / Transformers', role: 'Embedding models & tokenizer pipelines', usedIn: ['Vector generation', 'NLP'] },
      ]
    },
    {
      id: 'data_eng',
      title: 'Data Engineering',
      icon: Database,
      color: '#10b981',
      skills: [
        { name: 'PySpark', role: 'Distributed batch transforms & user sessionization', usedIn: ['Customer Intel (Silver & Gold Lakehouse)'] },
        { name: 'Apache Kafka', role: 'Real-time distributed event streaming', usedIn: ['Customer Intel (500K+ event ingestion)'] },
        { name: 'Apache Airflow', role: 'DAG scheduling, ETL automation & retraining', usedIn: ['Customer Intel pipeline orchestration'] },
        { name: 'MLflow', role: 'Experiment metrics, model artifacts & tracking', usedIn: ['Customer Intel'] },
        { name: 'PostgreSQL', role: 'Relational data warehouse & Bronze event sink', usedIn: ['Customer Intel'] },
      ]
    },
    {
      id: 'backend',
      title: 'Backend & Cloud',
      icon: Server,
      color: '#f59e0b',
      skills: [
        { name: 'FastAPI', role: 'Asynchronous, low-latency prediction microservices', usedIn: ['DRISHTI backend', 'Customer Intel APIs'] },
        { name: 'Firebase', role: 'Real-time database sync, Auth & Firestore', usedIn: ['Intellex RBAC', 'DRISHTI mobile sync'] },
        { name: 'MySQL', role: 'Relational database schema modeling', usedIn: ['Academic systems', 'Web applications'] },
      ]
    },
    {
      id: 'tools',
      title: 'Tools & DevOps',
      icon: Wrench,
      color: '#f43f5e',
      skills: [
        { name: 'Docker', role: 'Containerization & reproducible environments', usedIn: ['Customer Intel deployment'] },
        { name: 'Git & GitHub', role: 'Version control, multi-contributor collaboration', usedIn: ['All production repositories'] },
        { name: 'VS Code', role: 'Primary development environment', usedIn: ['Daily engineering'] },
        { name: 'Google Colab', role: 'Cloud GPU experimentation & prototyping', usedIn: ['ML model training & research'] },
      ]
    }
  ];

  const visibleClusters = activeCluster === 'all' 
    ? clusters 
    : clusters.filter(c => c.id === activeCluster);

  const selectedSkillObj = clusters
    .flatMap(c => c.skills)
    .find(s => s.name === selectedSkill);

  return (
    <div className="space-y-6 my-4">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setActiveCluster('all')}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
            activeCluster === 'all'
              ? 'bg-white/20 text-white font-semibold'
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          }`}
        >
          All Clusters
        </button>
        {clusters.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveCluster(c.id)}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeCluster === c.id
                ? 'bg-white/20 text-white font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
            <span>{c.title}</span>
          </button>
        ))}
      </div>

      {/* Cluster Nodes Grid (No percentage bars!) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {visibleClusters.map(cluster => {
          const Icon = cluster.icon;
          return (
            <div 
              key={cluster.id} 
              className="p-4 rounded-xl bg-space-950/70 border border-white/10 space-y-3"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-semibold" style={{ color: cluster.color }}>
                <Icon size={14} />
                <span className="uppercase tracking-wider">{cluster.title}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cluster.skills.map(skill => {
                  const isSelected = selectedSkill === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onClick={() => setSelectedSkill(skill.name)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all border ${
                        isSelected
                          ? 'bg-white/20 border-white/40 text-white shadow-md'
                          : 'bg-black/40 border-white/5 text-neutral-300 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Skill Drill-Down Card */}
      {selectedSkillObj && (
        <div className="p-4 rounded-xl bg-space-900 border border-cyan-500/20 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold text-sm">
              {selectedSkillObj.name}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
              Interactive Context
            </span>
          </div>

          <p className="text-neutral-300">
            {selectedSkillObj.role}
          </p>

          <div className="flex items-center gap-1.5 pt-1 text-[11px] font-mono text-neutral-400">
            <span className="text-cyan-400">Applied in:</span>
            <span>{selectedSkillObj.usedIn.join(' • ')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import { skillCategories } from '../data/mockData';
import { Code2, BrainCircuit, Globe, TerminalSquare } from 'lucide-react';

const iconMap = {
  Code2: Code2,
  BrainCircuit: BrainCircuit,
  Globe: Globe,
  TerminalSquare: TerminalSquare,
};

export const Skills: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-28 relative z-10" id="skills">
      <SectionTitle label="Expertise" title="Core Competencies" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {skillCategories.map((category, idx) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap];
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-on-surface tracking-tight">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">{skill.name}</span>
                      <span className="text-[10px] font-mono text-primary/40 group-hover:text-primary transition-colors">{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full group-hover:from-primary group-hover:to-secondary transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../data/mockData';
import { SectionTitle } from './SectionTitle';
import { Award, BookOpen, Briefcase, Users } from 'lucide-react';

const iconMap = {
  award: Award,
  book: BookOpen,
  freelance: Briefcase,
  users: Users
};

export const Achievements: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-28 relative z-10" id="achievements">
      <SectionTitle label="Milestones" title="Awards & Research" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {achievements.map((item, i) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] || Award;
          return (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-panel p-10 rounded-2xl flex flex-col gap-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:bg-primary/10"></div>
              <div className="p-4 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.details}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

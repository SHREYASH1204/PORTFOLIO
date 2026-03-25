import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import { skills } from '../data/mockData';

export const Skills: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-300, 300], [5, -5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-5, 5]), { stiffness: 100, damping: 30 });

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="max-w-7xl mx-auto px-6 py-28 relative z-10 perspective-[1000px]" 
      id="skills"
    >
      <SectionTitle label="Expertise" title="Core Competencies" />
      
      <motion.div 
        style={{ rotateX, rotateY }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12"
      >
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.name}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group/item"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-on-surface font-bold tracking-tight text-base font-inter">{skill.name}</span>
              <span className="text-primary font-mono text-xs font-bold tracking-widest">{skill.level}%</span>
            </div>
            <div className="progress-bar group">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="progress-fill shadow-[0_0_12px_rgba(75,77,216,0.3)] group-hover:brightness-125 transition-all"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

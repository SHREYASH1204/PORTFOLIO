import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';
import type { Project } from '../data/mockData';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProjectCardProps {
  project: Project;
  className?: string;
  onDemoClick?: (id: number) => void;
}

const ProjectCard: React.FC<Readonly<ProjectCardProps>> = ({ project, className, onDemoClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 30 });

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
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      transition={{ duration: 0.5 }}
      className={cn("group relative cursor-default", className)}
    >
      <div className={cn(
        "absolute -inset-1 bg-gradient-to-r rounded-xl blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200",
        project.gradient
      )} />
      
      <div className="relative glass-panel rounded-xl overflow-hidden border border-outline-variant/15 flex flex-col h-full bg-[#131b2efc]">
        {/* macOS Frame */}
        <div className="bg-surface-container-high/60 px-4 py-3 flex items-center justify-between border-b border-outline-variant/10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] opacity-80" />
          </div>
          <span className="text-[10px] text-on-surface-variant font-mono tracking-widest opacity-40 uppercase truncate max-w-[150px]">
            {project.fileName}
          </span>
        </div>

        <div className="p-7 flex flex-col h-full">
          <div className="flex items-start justify-between mb-5">
            <h3 className="text-2xl font-bold text-on-surface leading-tight">
              {project.title}
            </h3>
            <span className="bg-surface-container-highest/50 text-tertiary px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase border border-tertiary/20 shrink-0">
              {project.category}
            </span>
          </div>

          <p className="text-on-surface-variant mb-8 text-sm leading-relaxed flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tag) => (
              <span 
                key={tag}
                className="px-2.5 py-1 rounded-md bg-surface-container-low/50 text-[10px] text-on-surface-variant border border-outline-variant/10 uppercase tracking-wider font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6 mt-auto">
            <a 
              href={project.repo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-fixed-dim text-xs font-bold tracking-[0.1em] hover:text-primary transition-all group/link"
            >
              REPOSITORY 
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
            </a>

            {project.id === 8 && onDemoClick && (
              <button
                onClick={() => onDemoClick(project.id)}
                className="inline-flex items-center gap-2 text-tertiary-fixed-dim text-xs font-bold tracking-[0.1em] hover:text-tertiary transition-all group/demo animate-pulse"
              >
                LIVE DEMO
                <Activity className="w-3.5 h-3.5 group-hover/demo:scale-125 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

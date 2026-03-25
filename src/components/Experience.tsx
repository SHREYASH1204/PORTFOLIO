import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import { ExternalLink, Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { socialLinks } from '../data/mockData';

export const Experience: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-200, 200], [5, -5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-200, 200], [-5, 5]), { stiffness: 100, damping: 30 });

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
    <section className="max-w-7xl mx-auto px-6 py-28 relative z-10 overflow-hidden perspective-[1000px]" id="experience">
      <SectionTitle label="Professional" title="Work Experience" />
      
      <div className="mt-12">
        <motion.div
           onMouseMove={handleMouseMove}
           onMouseLeave={handleMouseLeave}
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           style={{ rotateX, rotateY }}
           transition={{ duration: 0.8 }}
           className="relative group h-full"
        >
          {/* Glass Card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-tertiary/30 rounded-[2rem] blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative glass-panel rounded-[2rem] p-10 md:p-14 overflow-hidden border-primary/20 flex flex-col lg:flex-row gap-16 bg-[#131b2efc]">
            {/* Left side: Role info */}
            <div className="lg:w-1/3 flex flex-col">
              <div className="p-4 bg-primary/10 rounded-2xl w-fit mb-8 animate-pulse-slow">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-black text-on-surface leading-tight tracking-tighter mb-4 text-inter">Full-Stack Freelance Developer</h3>
              <p className="text-primary font-bold tracking-widest text-xs uppercase mb-8">Finyatri Solutions</p>
              
              <div className="space-y-4 mt-auto">
                <div className="flex items-center gap-3 text-on-surface-variant text-sm font-medium">
                  <Calendar className="w-4 h-4 text-tertiary" />
                  <span>June — August 2025</span>
                </div>
                <a 
                  href={socialLinks.freelance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-fixed-dim hover:text-primary transition-all text-sm font-bold group/link"
                >
                  <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                  View Partner Site
                </a>
              </div>
            </div>

            {/* Right side: Impacts */}
            <div className="lg:w-2/3 border-l border-outline-variant/10 pl-0 lg:pl-16 mt-8 lg:mt-0">
              <p className="text-xl text-on-surface-variant font-light leading-relaxed mb-10 italic">
                "Delivering end-to-end web solutions including architecting robust backends, crafting intuitive frontends, and managing scalable production deployments."
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  "Developed responsive and dynamic frontends",
                  "Architected scalable backend systems",
                  "Managed full-cycle production deployments",
                  "Integrated complex API & database logic"
                ].map((impact, i) => (
                  <motion.div 
                    key={impact} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-tertiary shrink-0 mt-1" />
                    <span className="text-on-surface-variant text-md font-medium">{impact}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap gap-3">
                {["Frontend Systems", "Backend Architecture", "Cloud Deployment", "Full-Stack Logic"].map(tag => (
                   <span key={tag} className="px-3 py-1 bg-surface-container-highest/40 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant rounded-full border border-outline-variant/10">
                    {tag}
                   </span>
                ))}
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

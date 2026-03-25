import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { SectionTitle } from './components/SectionTitle';
import ProjectCard from './components/ProjectCard';
import { projects, socialLinks } from './data/mockData';
import { Terminal, Briefcase, Mail } from 'lucide-react';
import { SalesDashboard } from './components/SalesDashboard';
import { CustomCursor } from './components/CustomCursor';
import { MobileNav } from './components/MobileNav';

const App: React.FC = () => {
  const [selectedDemoId, setSelectedDemoId] = useState<number | null>(null);

  return (
    <div className="bg-background text-on-surface relative min-h-screen selection:bg-primary/20 cursor-none">
      <CustomCursor />
      <Header />
      <MobileNav />
      
      {/* Background Elements */}
      <div className="fixed inset-0 neural-mesh pointer-events-none opacity-40"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full pointer-events-none animate-pulse-slow"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-tertiary/10 blur-[150px] rounded-full pointer-events-none animate-pulse-slow delay-1000"></div>

      <main className="relative pt-24 pb-32 overflow-hidden">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Achievements />

        <section className="max-w-7xl mx-auto px-6 py-28 relative z-10" id="projects">
          <SectionTitle label="Showcase" title="Technical Portfolio" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
              {projects.map((project, i) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  className={i % 2 === 1 ? 'lg:mt-12' : ''}
                  onDemoClick={(id) => setSelectedDemoId(id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>

        <Contact />
      </main>

      <AnimatePresence>
        {selectedDemoId === 8 && (
          <SalesDashboard onClose={() => setSelectedDemoId(null)} />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full py-20 px-8 bg-background border-t border-outline-variant/10 relative z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 w-full max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tighter text-[#dae2fd] uppercase font-inter leading-none">SHREYASH GUPTA</span>
            </div>
            <p className="text-xs font-bold text-on-surface-variant opacity-60 tracking-widest font-inter text-center md:text-left">
              © 2024 SHREYASH GUPTA // AI DEVELOPER & DATA ENGINEER
            </p>
          </div>
          
          <div className="flex items-center gap-10">
            <SocialIcon href={socialLinks.github} icon={Terminal} label="GitHub" />
            <SocialIcon href={socialLinks.linkedin} icon={Briefcase} label="LinkedIn" />
            <SocialIcon href={socialLinks.email} icon={Mail} label="Contact" />
          </div>
        </div>
      </footer>
    </div>
  );
};

interface SocialIconProps {
  href: string;
  icon: any;
  label: string;
}

const SocialIcon = ({ href, icon: Icon, label }: Readonly<SocialIconProps>) => {
  if (!Icon) return null;
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-2"
    >
      <div className="p-3 glass-panel rounded-full group-hover:bg-primary-container/20 group-hover:text-primary transition-all duration-300 transform group-hover:-translate-y-1">
        <Icon className="w-5 h-5 transition-transform" />
      </div>
      <span className="text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-on-surface-variant">
        {label}
      </span>
    </a>
  );
};

export default App;

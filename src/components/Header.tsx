import React from 'react';
import { Terminal, Briefcase, FileText } from 'lucide-react';
import { socialLinks } from '../data/mockData';

export const Header: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0b1326c0] backdrop-blur-xl border-b border-[#4645551a] shadow-2xl">
      <div className="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 group cursor-pointer">
          <Terminal className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-lg font-black tracking-tighter text-[#dae2fd] uppercase font-inter leading-none">SHREYASH</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <a href="#" className="text-primary font-bold text-xs tracking-[0.2em] px-3 py-1 rounded transition-all">HOME</a>
          <a href="#projects" className="text-on-surface-variant hover:text-primary text-xs tracking-[0.2em] px-3 py-1 rounded transition-all">PROJECTS</a>
          <a href="#skills" className="text-on-surface-variant hover:text-primary text-xs tracking-[0.2em] px-3 py-1 rounded transition-all">SKILLS</a>
          <a href="#achievements" className="text-on-surface-variant hover:text-primary text-xs tracking-[0.2em] px-3 py-1 rounded transition-all uppercase">AWARDS</a>
          <a href="#contact" className="text-on-surface-variant hover:text-primary text-xs tracking-[0.2em] px-3 py-1 rounded transition-all uppercase">CONTACT</a>
        </div>
        <div className="flex items-center gap-3">
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 glass-panel rounded-full hover:bg-primary/20 hover:text-primary transition-all scale-90 md:scale-100">
            <Briefcase className="w-4 h-4" />
          </a>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 glass-panel rounded-full hover:bg-primary/20 hover:text-primary transition-all scale-90 md:scale-100">
            <Terminal className="w-4 h-4" />
          </a>
          <a href={socialLinks.resume} target="_blank" rel="noopener noreferrer" className="p-2 glass-panel rounded-full hover:bg-primary/20 hover:text-primary transition-all scale-90 md:scale-100">
            <FileText className="w-4 h-4" />
          </a>
        </div>
      </div>
    </nav>
  );
}

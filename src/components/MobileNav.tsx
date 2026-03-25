import React from 'react';
import { Home, Code, Brain, Mail } from 'lucide-react';

export const MobileNav: React.FC = () => {
  return (
    <nav className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-8 items-center z-50 bg-[#171f33cc] backdrop-blur-2xl rounded-full px-6 py-3 w-auto min-w-[280px] border border-[#46455533] shadow-[0px_24px_48px_rgba(11,13,38,0.5)]">
      <a className="flex items-center justify-center bg-gradient-to-tr from-primary to-secondary text-background rounded-full p-3 active:scale-90 duration-150 hue-cycle" href="#">
        <Home className="w-5 h-5" />
      </a>
      <a className="flex items-center justify-center text-[#c7c4d8] p-3 hover:text-primary transition-colors active:scale-90 duration-150" href="#projects">
        <Code className="w-5 h-5" />
      </a>
      <a className="flex items-center justify-center text-[#c7c4d8] p-3 hover:text-primary transition-colors active:scale-90 duration-150" href="#skills">
        <Brain className="w-5 h-5" />
      </a>
      <a className="flex items-center justify-center text-[#c7c4d8] p-3 hover:text-primary transition-colors active:scale-90 duration-150" href="#contact">
        <Mail className="w-5 h-5" />
      </a>
    </nav>
  );
};

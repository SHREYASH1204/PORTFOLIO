import React from 'react';

interface SectionTitleProps {
  label: string;
  title: string;
}

export const SectionTitle: React.FC<Readonly<SectionTitleProps>> = ({ label, title }) => (
  <div className="flex items-end justify-between mb-16">
    <div>
      <span className="text-[10px] text-primary tracking-[0.4em] font-bold uppercase block mb-3">{label}</span>
      <h2 className="text-3xl md:text-4xl font-bold text-on-surface tracking-tight leading-tight">{title}</h2>
    </div>
    <div className="hidden md:block h-px flex-1 bg-outline-variant/20 mx-16 mb-2"></div>
  </div>
);

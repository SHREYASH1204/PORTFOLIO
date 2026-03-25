import { Terminal, Database, Activity, Smartphone, Layers, Award, FileText, Phone } from 'lucide-react';
import { socialLinks } from '../data/mockData';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };
  return (
    <section 
      onMouseMove={handleMouseMove}
      className="max-w-7xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center relative z-10 overflow-visible perspective-[1000px]"
    >
      {/* Dynamic 3D Glow */}
      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-30 mix-blend-screen hue-cycle"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8"
      >
        <div className="w-2 h-2 bg-tertiary rounded-full animate-pulse shadow-[0_0_8px_#adc6ff]" />
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-on-surface-variant text-inter">System Status: Active</span>
      </motion.div>

      <motion.h1 
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-[1.1] text-on-surface text-inter animate-fade-in drop-shadow-2xl"
      >
        Shreyash Gupta<br />
        <span className="gradient-text drop-shadow-[0px_10px_30px_rgba(0,238,255,0.3)]">AI Developer & Data Engineer</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-xl text-base md:text-lg text-on-surface-variant leading-relaxed mb-12 font-light text-inter opacity-80"
      >
        Engineering high-dimensional data into intelligent systems. Specialist in Deep Learning, NLP, and Predictive Analytics.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <a 
          href={socialLinks.github} 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-tr from-primary to-secondary text-background px-8 py-4 rounded-xl font-bold tracking-tight shadow-xl shadow-primary-container/20 hover:shadow-primary-container/40 hover:-translate-y-1 transition-all duration-300 active:scale-95"
        >
          GitHub
        </a>
        <a 
          href={socialLinks.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel text-on-surface px-8 py-4 rounded-xl font-bold tracking-tight hover:bg-surface-variant/60 hover:-translate-y-1 transition-all duration-300 border border-outline-variant/15 flex items-center gap-2"
        >
          <FileText className="w-4 h-4 text-primary" />
          Resume
        </a>
        <a 
          href={socialLinks.phone}
          className="glass-panel text-on-surface px-8 py-4 rounded-xl font-bold tracking-tight hover:bg-surface-variant/60 hover:-translate-y-1 transition-all duration-300 border border-outline-variant/15 flex items-center gap-2"
        >
          <Phone className="w-4 h-4 text-tertiary" />
          +91 93216 18045
        </a>
      </motion.div>

      <div className="mt-28 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Terminal, title: "Neural Engineering", desc: "Building transformer-based architectures and fine-tuning LLMs.", color: "text-primary" },
          { icon: Database, title: "Data Analytics", desc: "Extracting actionable insights from high-dimension data streams.", color: "text-tertiary" },
          { icon: Activity, title: "Predictive Vision", desc: "Implementing computer vision systems for safety and monitoring.", color: "text-secondary" },
          { icon: Layers, title: "ETL Pipelines", desc: "Engineering complex data flows for high-dimensional structures.", color: "text-tertiary" },
          { icon: Smartphone, title: "Mobile Frameworks", desc: "Crafting cross-platform apps with Flutter and Dart.", color: "text-primary" },
          { icon: Award, title: "Hackathon Strategy", desc: "Rapid prototyping and team leadership in 12+ competitions.", color: "text-error" }
        ].map((item, i) => (
          <motion.div 
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + (i * 0.1) }}
            whileHover={{ y: -5 }}
            className="glass-panel p-8 rounded-xl text-left hover:border-primary/20 transition-all group"
          >
            <item.icon className={`w-8 h-8 ${item.color} mb-4 group-hover:scale-110 transition-transform`} />
            <h3 className="text-on-surface font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

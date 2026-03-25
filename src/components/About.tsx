import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionTitle } from './SectionTitle';

export const About: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-200, 200], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-200, 200], [-10, 10]), { stiffness: 100, damping: 30 });

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
    <section className="max-w-7xl mx-auto px-6 py-28 relative z-10 overflow-hidden perspective-[1200px]" id="about">
      <SectionTitle label="Profile" title="Student & Innovator" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-12">
        <motion.div
           onMouseMove={handleMouseMove}
           onMouseLeave={handleMouseLeave}
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           style={{ rotateX, rotateY }}
           transition={{ duration: 0.8 }}
           className="relative group pr-4"
        >
          <div className="absolute -inset-4 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative glass-panel rounded-3xl p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <p className="text-xl md:text-2xl font-light text-on-surface leading-normal mb-8 text-inter italic">
              "I’m a final-year B.Tech student in Artificial Intelligence and Data Science at KJ Somaiya Institute of Technology, passionate about solving real-world problems using data and technology."
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-1 bg-primary rounded-full"></div>
              <div className="w-4 h-1 bg-tertiary rounded-full"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="space-y-8"
        >
          <div className="space-y-6 text-on-surface-variant leading-relaxed text-inter text-md md:text-lg">
            <p>
              I have hands-on experience in building <span className="text-primary font-semibold">ETL pipelines</span>, data preprocessing, and <span className="text-tertiary font-semibold">machine learning models</span>, along with developing applications using <span className="text-secondary font-semibold">Flutter</span>.
            </p>
            <p>
              I’ve actively participated in <span className="text-primary font-black">12+ hackathons</span>, securing 3 wins and 7+ finalist positions, and have often led teams in high-pressure, fast-paced environments. These experiences have strengthened my problem-solving skills, leadership, and ability to deliver impactful solutions within tight deadlines.
            </p>
            <p>
              My work has also been recognized through selection at the <span className="text-on-surface font-bold underline decoration-primary underline-offset-4">S4DS Conference (Kolkata)</span> among 300+ submissions and winning a poster presentation competition. Additionally, I’ve contributed as an organizer for a 24-hour hackathon, gaining valuable experience in coordination and execution.
            </p>
            <p className="text-on-surface font-medium border-l-2 border-primary/30 pl-6">
              I enjoy working at the intersection of data, engineering, and real-world impact, and I’m continuously looking for opportunities to learn, build, and grow.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

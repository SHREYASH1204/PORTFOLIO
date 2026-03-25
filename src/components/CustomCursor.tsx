import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], .interactive-element');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Outer Circle */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovering ? 2.5 : 1,
        }}
        className="fixed w-5 h-5 border border-primary/40 rounded-full flex items-center justify-center transition-transform duration-300"
      >
        <div className="w-[1px] h-[1px] bg-primary/20 absolute rounded-full" />
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          scale: isHovering ? 0 : 1,
        }}
        className="fixed w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#c0c1ff]"
      />

      {/* Dynamic Glow */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className={`fixed -left-12 -top-12 w-32 h-32 bg-primary/10 blur-2xl rounded-full transition-opacity duration-300 ${isHovering ? 'opacity-40' : 'opacity-20'}`}
      />
    </div>
  );
};

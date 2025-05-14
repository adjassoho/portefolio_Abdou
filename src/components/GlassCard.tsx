'use client';

import React, { useState, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  blur?: string;
  border?: boolean;
  glow?: boolean;
  interactive?: boolean;
  gradientBorder?: boolean;
  width?: string;
  hoverScale?: number;
  onHover?: () => void;
  glowColor?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  blur = 'backdrop-blur-md',
  border = true,
  glow = false,
  interactive = true,
  gradientBorder = false,
  width = 'w-full',
  hoverScale = 1.02,
  onHover,
  glowColor = 'rgba(99, 102, 241, 0.5)',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle mouse move for interactive lighting effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate relative mouse position inside the card (0-1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) onHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Base classes for the card
  const baseClasses = `
    relative overflow-hidden rounded-xl
    bg-white/10 dark:bg-gray-900/20
    ${blur}
    ${width}
    ${border && !gradientBorder ? 'border border-white/20 dark:border-gray-800/50' : ''}
    transition-all duration-300 ease-out
    ${className}
  `.trim();

  return (
    <motion.div
      ref={cardRef}
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={interactive ? { scale: hoverScale } : undefined}
    >
      {/* Gradient Border */}
      {gradientBorder && (
        <div className="absolute inset-0 p-[1px] rounded-xl overflow-hidden">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 opacity-70 animate-gradient-xy"></div>
          <div className="absolute inset-[1px] rounded-[10px] bg-white dark:bg-gray-900"></div>
        </div>
      )}
      
      {/* Dynamic lighting effect */}
      {interactive && isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255, 255, 255, 0.15), transparent 80%)`,
          }}
        />
      )}
      
      {/* Glow effect */}
      {glow && isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 opacity-0 rounded-xl"
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: `0 0 40px ${glowColor}`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Bottom shine effect */}
      {interactive && isHovered && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  );
};

export default GlassCard; 
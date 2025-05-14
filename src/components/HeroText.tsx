'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useTheme } from './ThemeProvider';

interface HeroTextProps {
  title: string;
  subtitle: string;
  className?: string;
  delay?: number;
}

const HeroText: React.FC<HeroTextProps> = ({
  title,
  subtitle,
  className = '',
  delay = 0.5
}) => {
  const controls = useAnimation();
  const { isDarkMode } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  
  // Split title into characters for animation
  const titleChars = title.split('');
  
  // Animation variants for title characters
  const charVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: 90,
      filter: "blur(10px)"
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.8,
        delay: delay + i * 0.04,
        ease: [0.22, 1, 0.36, 1],
      } 
    })
  };
  
  // Animation for subtitle
  const subtitleVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: delay + titleChars.length * 0.04 + 0.3,
        ease: "easeOut"
      } 
    }
  };
  
  // Background letter effect variants
  const bgLetterVariants: Variants = {
    hidden: { 
      opacity: 0,
      scale: 2,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 0.03,
      scale: 1,
      filter: "blur(5px)",
      transition: { 
        delay: delay,
        duration: 1.2,
        ease: "easeOut"
      }
    },
    pulse: {
      opacity: [0.02, 0.04, 0.02],
      scale: [1, 1.05, 1],
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };
  
  // Start animations when component mounts
  useEffect(() => {
    setIsMounted(true);
    controls.start("visible").then(() => {
      controls.start("pulse");
    });
  }, [controls]);
  
  if (!isMounted) return null;
  
  return (
    <div className={`relative ${className}`}>
      {/* Background decorative letters */}
      <motion.div
        className="absolute -z-10 inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
        initial="hidden"
        animate={controls}
        variants={bgLetterVariants}
      >
        <span className={`text-9xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
          {title.charAt(0)}
        </span>
      </motion.div>
      
      {/* Main title with character animation */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold relative">
        {titleChars.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            custom={index}
            variants={charVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : (
              <span className="relative inline-block">
                {/* Character with gradient */}
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
                  {char}
                </span>
                
                {/* Shadow for 3D effect */}
                <span className="absolute text-glow-subtle inset-0 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 -z-10 transform translate-y-[2px] opacity-70 blur-[1px]">
                  {char}
                </span>
              </span>
            )}
          </motion.span>
        ))}
        
        {/* Animated line under title */}
        <motion.span 
          className="absolute -bottom-3 left-0 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ 
            delay: delay + titleChars.length * 0.04 + 0.1,
            duration: 0.8,
            ease: "easeOut"
          }}
        />
      </h1>
      
      {/* Subtitle with fade in animation */}
      <motion.p
        className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300"
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default HeroText; 
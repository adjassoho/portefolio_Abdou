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
  
  // Split subtitle into words for animation
  const subtitleWords = subtitle.split(' ');
  
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
    }),
    hover: {
      y: -5,
      color: "#4f46e5",
      textShadow: "0 0 8px rgba(79, 70, 229, 0.6)",
      transition: {
        duration: 0.2
      }
    }
  };
  
  // Animation for subtitle words
  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(8px)"
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.5,
        delay: delay + titleChars.length * 0.04 + 0.3 + i * 0.1,
        ease: "easeOut"
      } 
    })
  };
  
  // Background letter effect variants with improved animation
  const bgLetterVariants: Variants = {
    hidden: { 
      opacity: 0,
      scale: 2,
      filter: "blur(10px)",
      rotateY: 90
    },
    visible: { 
      opacity: 0.03,
      scale: 1,
      filter: "blur(5px)",
      rotateY: 0,
      transition: { 
        delay: delay,
        duration: 1.2,
        ease: "easeOut"
      }
    },
    pulse: {
      opacity: [0.02, 0.04, 0.02],
      scale: [1, 1.05, 1],
      rotateY: [0, 5, 0, -5, 0],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror"
      }
    }
  };
  
  // Decorative line variants
  const lineVariants: Variants = {
    hidden: {
      width: 0,
      opacity: 0
    },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        delay: delay + titleChars.length * 0.04 + 0.1,
        duration: 0.8,
        ease: "easeOut"
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
      {/* Multiple background decorative elements */}
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
      
      {/* Secondary background element */}
      <motion.div
        className="absolute -z-10 inset-0 flex items-end justify-end overflow-hidden pointer-events-none opacity-30"
        initial={{ opacity: 0, scale: 0.5, x: 20 }}
        animate={{ 
          opacity: 0.03, 
          scale: 1, 
          x: 0,
          filter: "blur(2px)"
        }}
        transition={{ 
          delay: delay + 0.5,
          duration: 1.2,
          ease: "easeOut"
        }}
      >
        <div className={`text-7xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Supply Chain
        </div>
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
            whileHover="hover"
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : (
              <span className="relative inline-block">
                {/* Character with enhanced gradient */}
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500">
                  {char}
                </span>
                
                {/* Enhanced shadow for 3D effect */}
                <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 -z-10 transform translate-y-[2px] translate-x-[1px] opacity-70 blur-[1px]">
                  {char}
                </span>
                
                {/* Extra glow layer */}
                <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 -z-20 opacity-40 blur-[4px] text-glow-subtle">
                  {char}
                </span>
              </span>
            )}
          </motion.span>
        ))}
        
        {/* Animated line under title with gradient and glow */}
        <motion.span 
          className="absolute -bottom-3 left-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 rounded-full"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          style={{
            boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)"
          }}
        />
      </h1>
      
      {/* Subtitle with word-by-word animation */}
      <div className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 overflow-hidden">
        {subtitleWords.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block mr-2"
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            {word === "BTS" || word === "Supply Chain" ? (
              <span className="relative inline-block p-1 mx-1">
                <span className="relative z-10 text-indigo-600 dark:text-indigo-400">{word}</span>
                <motion.span
                  className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-md z-0"
                  layoutId="highlight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </span>
            ) : (
              <span className="mx-1">{word}</span>
            )}
          </motion.span>
        ))}
        
        {/* Animated cursor effect */}
        <motion.span
          className="inline-block w-0.5 h-5 ml-1 bg-indigo-600 dark:bg-indigo-400 animate-blink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + titleChars.length * 0.04 + subtitleWords.length * 0.1 + 0.5 }}
        />
      </div>
      
      {/* Subtle decorative element */}
      <motion.div
        className="absolute -bottom-8 -right-8 w-16 h-16 rounded-full border border-dashed border-indigo-500/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotate: 360
        }}
        transition={{ 
          delay: delay + 1.5,
          duration: 20,
          rotate: {
            repeat: Infinity,
            duration: 20,
            ease: "linear"
          }
        }}
      />
    </div>
  );
};

export default HeroText; 
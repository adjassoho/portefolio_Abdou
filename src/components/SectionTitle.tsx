'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  underline?: boolean;
  decoration?: boolean;
  textGradient?: boolean;
  animated?: boolean;
  animationDelay?: number;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className = '',
  align = 'center',
  underline = true,
  decoration = true,
  textGradient = true,
  animated = true,
  animationDelay = 0,
}) => {
  const { isDarkMode } = useTheme();
  
  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: animationDelay
      }
    }
  };
  
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const underlineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: underline ? '100%' : 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const decorationVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0
    },
    visible: { 
      opacity: [0, 1, 0.6],
      scale: [0, 1, 0.8],
      transition: { 
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className={`relative mb-12 ${alignClasses[align]} ${className}`}
      initial={animated ? "hidden" : "visible"}
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      {/* Decorative elements */}
      {decoration && (
        <div className="absolute -z-10 inset-0 pointer-events-none">
          <motion.div 
            className={`absolute -left-10 -top-10 w-20 h-20 rounded-full ${
              isDarkMode ? 'bg-indigo-500/5' : 'bg-indigo-500/10'
            }`}
            variants={decorationVariants}
            transition={{ duration: 1 }}
          />
          <motion.div 
            className={`absolute -right-5 -bottom-5 w-10 h-10 rounded-full ${
              isDarkMode ? 'bg-blue-500/5' : 'bg-blue-500/10'
            }`}
            variants={decorationVariants}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
      )}
      
      {/* Title */}
      <motion.h2 
        className={`text-3xl font-bold ${alignClasses[align]} mb-2 relative inline-block`}
        variants={titleVariants}
      >
        <span className={textGradient 
          ? 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500' 
          : 'text-gray-900 dark:text-white'
        }>
          {title}
        </span>
      </motion.h2>
      
      {/* Underline */}
      {underline && (
        <motion.div 
          className={`h-1 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full ${
            align === 'center' 
              ? 'mx-auto' 
              : align === 'right' 
                ? 'ml-auto' 
                : ''
          }`}
          style={{ width: 100 }}
          variants={underlineVariants}
        />
      )}
      
      {/* Subtitle */}
      {subtitle && (
        <motion.p 
          className="mt-4 text-gray-600 dark:text-gray-300 max-w-lg mx-auto"
          variants={subtitleVariants}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle; 
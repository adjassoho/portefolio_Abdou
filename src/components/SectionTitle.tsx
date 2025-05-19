'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export interface SectionTitleProps {
  title: string;
  subtitle: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  description,
  centered = true,
  light = false
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div 
      className={`mb-14 ${centered ? 'text-center' : 'text-left'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <h4 className={`text-sm uppercase font-bold tracking-wider mb-2 ${light ? 'text-blue-300' : 'text-blue-600'}`}>
        {subtitle}
      </h4>
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-gray-800'}`}>
        {title}
      </h2>
      
      {description && (
        <p className={`max-w-2xl mx-auto ${light ? 'text-gray-300' : 'text-gray-600'} ${centered ? 'text-center' : 'text-left'}`}>
          {description}
        </p>
      )}
      
      <div className={`h-1 w-20 rounded bg-gradient-to-r from-blue-600 to-indigo-600 mt-4 ${centered ? 'mx-auto' : ''}`} />
    </motion.div>
  );
};

export default SectionTitle; 
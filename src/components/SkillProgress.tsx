'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type SkillLevel = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';

interface SkillProps {
  name: string;
  level: SkillLevel;
  color?: string;
  icon?: React.ReactNode;
  percentage?: number; // Optional percentage (0-100)
}

const getPercentageFromLevel = (level: SkillLevel): number => {
  switch (level) {
    case 'Débutant':
      return 25;
    case 'Intermédiaire':
      return 50;
    case 'Avancé':
      return 75;
    case 'Expert':
      return 95;
    default:
      return 0;
  }
};

const SkillProgress: React.FC<SkillProps> = ({ 
  name, 
  level, 
  color = 'indigo', 
  icon,
  percentage
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });
  
  // Use provided percentage or calculate from level
  const skillPercentage = percentage !== undefined ? percentage : getPercentageFromLevel(level);
  
  // Color mapping
  const colors = {
    indigo: {
      bg: 'bg-indigo-100 dark:bg-indigo-900/30',
      progress: 'bg-indigo-600 dark:bg-indigo-500',
      text: 'text-indigo-800 dark:text-indigo-300',
      border: 'border-indigo-200 dark:border-indigo-800/50'
    },
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      progress: 'bg-blue-600 dark:bg-blue-500',
      text: 'text-blue-800 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-800/50'
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      progress: 'bg-purple-600 dark:bg-purple-500',
      text: 'text-purple-800 dark:text-purple-300',
      border: 'border-purple-200 dark:border-purple-800/50'
    },
    // Add more colors if needed
  };
  
  const colorClasses = colors[color as keyof typeof colors] || colors.indigo;

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {icon && <span className={`mr-2 ${colorClasses.text}`}>{icon}</span>}
          <h3 className="font-medium text-gray-800 dark:text-gray-200">{name}</h3>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses.bg} ${colorClasses.text} border ${colorClasses.border}`}>
          {level}
        </div>
      </div>
      
      <div className={`h-3 w-full rounded-full overflow-hidden ${colorClasses.bg} border ${colorClasses.border}`}>
        <motion.div
          className={`h-full rounded-full ${colorClasses.progress}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skillPercentage}%` } : { width: 0 }}
          transition={{ 
            duration: 1,
            ease: "easeOut",
            delay: 0.2
          }}
        />
      </div>
      
      {/* Animated dots */}
      <div className="relative h-1 mt-1">
        {[20, 40, 60, 80].map((position) => (
          <motion.div
            key={position}
            className={`absolute top-0 w-1 h-1 rounded-full ${
              position <= skillPercentage 
                ? colorClasses.progress
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
            style={{ left: `${position}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView && position <= skillPercentage 
              ? { scale: 1, opacity: 1 } 
              : { scale: 0.5, opacity: 0.5 }}
            transition={{ 
              delay: 1 + (position / 100),
              duration: 0.3,
              type: "spring"
            }}
          />
        ))}
      </div>
    </div>
  );
};

interface SkillGroupProps {
  title: string;
  skills: SkillProps[];
  className?: string;
}

export const SkillGroup: React.FC<SkillGroupProps> = ({ title, skills, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div 
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ${className}`}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
      <div>
        {skills.map((skill, index) => (
          <SkillProgress
            key={index}
            name={skill.name}
            level={skill.level}
            color={skill.color}
            icon={skill.icon}
            percentage={skill.percentage}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SkillProgress; 
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

type TimelineItemProps = {
  title: string;
  subtitle: string;
  date: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  isLast?: boolean;
};

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  title, 
  subtitle, 
  date, 
  content, 
  icon, 
  isLast = false 
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <motion.div 
      className="relative"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Vertical Line */}
      {!isLast && (
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-indigo-500 via-indigo-600 to-indigo-400 rounded-full"></div>
      )}
      
      <div className="relative pl-8 pb-12">
        {/* Animated Circle */}
        <motion.div 
          className="absolute left-0 top-0 w-5 h-5 rounded-full bg-indigo-600 -ml-2.5 z-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 15, 
            delay: 0.2 
          }}
        >
          {/* Pulsing effect */}
          <span className="absolute inset-0 rounded-full animate-ping bg-indigo-400 opacity-75"></span>
        </motion.div>
        
        {/* Card */}
        <motion.div 
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all"
          whileHover={{ 
            scale: 1.02, 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            y: -5
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {/* Card Content */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                {icon && <span className="text-indigo-600 dark:text-indigo-400 mr-2">{icon}</span>}
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 italic">{subtitle}</p>
            </div>
            <div className="mt-2 md:mt-0">
              <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-sm">
                {date}
              </span>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {content}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

type AnimatedTimelineProps = {
  items: Array<Omit<TimelineItemProps, 'isLast'>>;
};

const AnimatedTimeline: React.FC<AnimatedTimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          {...item}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};

export default AnimatedTimeline; 
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  location?: string;
  date: string;
  content: string[];
  color?: string;
  icon?: React.ReactNode;
}

interface AnimatedTimelineProps {
  items: TimelineItem[];
}

const AnimatedTimeline: React.FC<AnimatedTimelineProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative py-10">
      {/* The vertical line */}
      <div className="absolute left-[50%] md:left-12 h-full w-0.5 bg-gray-200 transform -translate-x-1/2 md:translate-x-0">
        <motion.div 
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-600 to-indigo-600 h-0"
          style={{ height: lineHeight }}
        />
      </div>

      {/* Timeline items */}
      <div className="relative">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative mb-16 md:mb-24 ${isEven ? 'md:ml-20' : 'md:ml-20'}`}
            >
              {/* The dot on the timeline */}
              <div className="absolute left-[50%] md:left-12 w-6 h-6 bg-white border-4 border-indigo-600 rounded-full transform -translate-x-1/2 md:translate-x-0 z-10">
                <motion.div 
                  className="absolute inset-0 rounded-full bg-indigo-500 opacity-30"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                />
              </div>

              {/* Content card */}
              <div 
                className={`
                  relative mx-8 md:mx-0 md:ml-24 p-6 bg-white rounded-lg shadow-lg 
                  border-l-4 ${item.color || 'border-indigo-600'}
                  hover:shadow-xl transition-shadow duration-300
                `}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 overflow-hidden rounded-lg z-0">
                  <div className="absolute -inset-[200%] opacity-0 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 animate-shine" />
                </div>

                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center">
                      {item.icon || <FaBriefcase className="text-indigo-600 mr-2" />}
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 text-sm font-medium">
                      <FaCalendarAlt className="mr-1" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <span className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                      {item.subtitle}
                    </span>
                    
                    {item.location && (
                      <div className="flex items-center ml-3 text-gray-600 text-sm">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <ul className="mt-3 space-y-2 text-gray-600">
                    {item.content.map((point, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="flex items-start"
                      >
                        <span className="inline-block h-2 w-2 bg-indigo-600 rounded-full mt-2 mr-2" />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedTimeline; 
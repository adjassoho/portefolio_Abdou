'use client';

import React from 'react';
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaArrowDown } from "react-icons/fa";
import { useRef } from "react";
import { useTheme } from './ThemeProvider';
import Motion3DCard from './Motion3DCard';
import HeroText from './HeroText';

interface HeroSectionProps {
  onExploreClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const { isDarkMode } = useTheme();
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  
  // Social media button variants
  const socialButtonVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.8
    },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 1.2 + i * 0.15,
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }),
    hover: {
      scale: 1.2,
      rotate: 5,
      boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: {
      scale: 0.9
    }
  };
  
  // Info badge variants
  const infoBadgeVariants = {
    initial: {
      opacity: 0,
      x: -30
    },
    animate: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.4 + i * 0.2,
        duration: 0.7,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }),
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  // CTA button variants
  const ctaButtonVariants = {
    initial: {
      opacity: 0,
      y: 30
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2,
        duration: 0.7,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      y: -3,
      boxShadow: "0 15px 30px -5px rgba(79, 70, 229, 0.5)",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };
  
  const handleExploreClick = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      // Scroll to a-propos section
      const aboutSection = document.getElementById('a-propos');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="accueil" className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center relative overflow-hidden" ref={ref}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated dots grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 grid grid-cols-12 gap-4">
            {Array.from({ length: 48 }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-indigo-300' : 'bg-indigo-600'}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Orbital rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className={`w-[800px] h-[800px] rounded-full border-2 border-dashed ${isDarkMode ? 'border-indigo-500/10' : 'border-indigo-500/20'}`}
            animate={{ 
              rotate: 360,
            }}
            transition={{
              duration: 120,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className={`absolute w-[600px] h-[600px] rounded-full border border-dashed ${isDarkMode ? 'border-blue-500/10' : 'border-blue-500/20'}`}
            animate={{ 
              rotate: -360,
            }}
            transition={{
              duration: 90,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>

      <motion.div 
        className="text-center w-full max-w-6xl mx-auto z-10"
        style={{ y, opacity, scale }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-12">
          {/* Profile image section */}
          <motion.div
            className="mb-10 md:mb-0 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2, 
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          >
            <Motion3DCard
              className="w-[280px] h-[280px] md:w-[320px] md:h-[320px]"
              layers={false}
              intensity={8}
              borderGlow
              spotlight
              glowColor="rgba(99, 102, 241, 0.5)"
            >
              <div className="p-4 h-full flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-indigo-600/30 shadow-xl bg-white dark:bg-gray-800 p-2">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image 
                      src="/images/profile.jpg" 
                      alt="SAIBOU ABDOU SALAM" 
                      fill
                      className="object-cover"
                      priority
                      onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src = "https://ui-avatars.com/api/?name=SAIBOU+ABDOU+SALAM&background=4f46e5&color=fff&size=300";
                      }}
                    />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 shimmer"></div>
                    
                    {/* Glare effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </Motion3DCard>
            
            {/* Floating badge */}
            <motion.div
              className="absolute -right-5 -top-5 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: -10 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 0 }}
            >
              BTS MCO
            </motion.div>
          </motion.div>
          
          {/* Text content */}
          <div className="text-left max-w-md">
            <HeroText
              title="SAIBOU ABDOU SALAM"
              subtitle="Recherche un Stage en Formation Initiale BTS MCO"
            />
            
            {/* Info badges */}
            <div className="mt-8 space-y-3">
              <motion.div 
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full shadow-md"
                variants={infoBadgeVariants}
                initial="initial"
                animate="animate"
                custom={0}
                whileHover="hover"
              >
                <FaMapMarkerAlt className="text-indigo-600 dark:text-indigo-400" />
                <span>22 Rue saint Maur 76000 Rouen</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full shadow-md"
                variants={infoBadgeVariants}
                initial="initial"
                animate="animate"
                custom={1}
                whileHover="hover"
              >
                <FaCalendarAlt className="text-indigo-600 dark:text-indigo-400" />
                <span>Né le 18/05/2004</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full shadow-md"
                variants={infoBadgeVariants}
                initial="initial"
                animate="animate"
                custom={2}
                whileHover="hover"
              >
                <FaPhone className="text-indigo-600 dark:text-indigo-400" />
                <span>06 51 10 43 34</span>
              </motion.div>
            </div>
            
            {/* Social links */}
            <div className="mt-10 flex space-x-5">
              <motion.a 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white dark:bg-gray-800 p-3 rounded-full text-gray-800 dark:text-white transition-colors shadow-lg"
                variants={socialButtonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                custom={0}
              >
                <FaGithub size={24} />
              </motion.a>
              
              <motion.a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white dark:bg-gray-800 p-3 rounded-full text-gray-800 dark:text-white transition-colors shadow-lg"
                variants={socialButtonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                custom={1}
              >
                <FaLinkedin size={24} />
              </motion.a>
              
              <motion.a 
                href="mailto:salamsaibou2002@gmail.com" 
                className="bg-white dark:bg-gray-800 p-3 rounded-full text-gray-800 dark:text-white transition-colors shadow-lg"
                variants={socialButtonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                custom={2}
              >
                <FaEnvelope size={24} />
              </motion.a>
            </div>
          </div>
        </div>
        
        {/* Call to action button */}
        <motion.button
          className="mt-16 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-full font-medium shadow-lg inline-flex items-center space-x-3 relative overflow-hidden"
          onClick={handleExploreClick}
          variants={ctaButtonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10">Explorer mon profil</span>
          <FaArrowDown className="animate-bounce relative z-10" />
          
          {/* Animated glow effect */}
          <motion.span 
            className="absolute inset-0 -z-10 opacity-50 blur-md"
            animate={{
              background: [
                'radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.7), transparent 70%)',
                'radial-gradient(circle at 70% 50%, rgba(99, 102, 241, 0.7), transparent 70%)',
                'radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.7), transparent 70%)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection; 
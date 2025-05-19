'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FaInstagram, FaLinkedin, FaEnvelope, FaArrowDown, FaBriefcase, FaGraduationCap, FaCode } from "react-icons/fa";
import { BsChevronDoubleDown } from 'react-icons/bs';
import { useTheme } from './ThemeProvider';
import ProfileCard from './ProfileCard';
import ProfileCardEnhanced from './ProfileCardEnhanced';

interface HeroSectionProps {
  onExploreClick?: () => void;
}

const HeroSectionNew: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const { isDarkMode } = useTheme();
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
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
    <div 
      ref={ref} 
      id="accueil" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 z-0"></div>
        
        {/* Visual elements - abstract shapes */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Decorative lines */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <motion.path 
              d="M0,1000 C300,800 700,900 1000,1000 L1000,0 L0,0 Z" 
              fill="none" 
              stroke="url(#gradient1)" 
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path 
              d="M0,1000 C500,700 800,900 1000,800 L1000,0 L0,0 Z" 
              fill="none" 
              stroke="url(#gradient2)" 
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Large circle decoration */}
          <div className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-indigo-500/10 to-blue-500/5 blur-3xl"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/5 blur-3xl"></div>
        </div>
        
        {/* Glass panes */}
        <div className="hidden lg:block absolute top-0 left-0 w-1/3 h-screen bg-white/20 dark:bg-indigo-600/5 backdrop-blur-3xl skew-x-12 transform-gpu"></div>
        <div className="hidden lg:block absolute top-0 right-0 w-1/4 h-screen bg-white/10 dark:bg-blue-600/5 backdrop-blur-3xl -skew-x-12 transform-gpu"></div>
      </div>
      
      {/* Main content */}
      <motion.div 
        className="container mx-auto px-4 z-10"
        style={{ y, opacity }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left side - Text content */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-medium text-sm border border-indigo-100 dark:border-indigo-700/30">
                  Recherche d'alternance 2025-2026 • Bachelor Achats et Supply Chain
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-gray-800 dark:text-white leading-none tracking-tight">
                  <span className="block mb-1">SAIBOU</span>
                  <span className="block">ABDOU SALAM</span>
                </h1>
                <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mb-3"></div>
                <h2 className="text-2xl sm:text-3xl text-indigo-600 dark:text-indigo-400 font-semibold">
                  Co-Fondateur de Fiabilitech
                </h2>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              >
                Passionné par le digital et l'entrepreneuriat, j'associe compétences en développement web et expertise commerciale. Actuellement en alternance dans l'immobilier, je recherche de nouvelles opportunités dans les achats et la supply chain.
              </motion.p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <FaBriefcase className="text-indigo-600 dark:text-indigo-400" />
                  <span className="text-gray-700 dark:text-gray-300">Entrepreneur</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <FaCode className="text-indigo-600 dark:text-indigo-400" />
                  <span className="text-gray-700 dark:text-gray-300">Développement Web</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <FaGraduationCap className="text-indigo-600 dark:text-indigo-400" />
                  <span className="text-gray-700 dark:text-gray-300">Bachelor Supply Chain</span>
                </motion.div>
              </div>
              
              <div className="flex gap-6 mb-12">
                <motion.a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full text-gray-800 dark:text-white shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                  aria-label="Instagram"
                >
                  <FaInstagram size={22} className="text-gradient-instagram" />
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full text-gray-800 dark:text-white shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={22} />
                </motion.a>
                
                <motion.a
                  href="mailto:salamsaibou2002@gmail.com"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full text-gray-800 dark:text-white shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                  aria-label="Email"
                >
                  <FaEnvelope size={22} />
                </motion.a>
              </div>
              
              <motion.button
                onClick={handleExploreClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 30px -10px rgba(79, 70, 229, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white rounded-full font-medium shadow-lg inline-flex items-center space-x-3 relative overflow-hidden group"
              >
                <span className="z-10">Explorer mon profil</span>
                <FaArrowDown className="ml-2 z-10 group-hover:animate-bounce" />
                
                {/* Button glow effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-70 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </motion.button>
            </div>
          </div>
          
          {/* Right side - Visual element */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <ProfileCardEnhanced 
              name="SAIBOU ABDOU SALAM"
              role="Co-Fondateur de Fiabilitech"
              imageSrc="/images/profil.jpg"
              currentPosition="Alternance Immobilier"
              currentCompany="Agence de la gare"
              currentPeriod="2024-2025"
            />
          </div>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-sm text-gray-600 dark:text-gray-400 mb-2">Découvrir</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <BsChevronDoubleDown className="text-indigo-600 dark:text-indigo-400 text-xl" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSectionNew; 
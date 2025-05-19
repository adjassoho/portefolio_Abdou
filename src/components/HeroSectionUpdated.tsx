'use client';

import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FaInstagram, FaLinkedin, FaEnvelope, FaArrowDown, FaBriefcase, FaGraduationCap, FaCode } from "react-icons/fa";
import { BsChevronDoubleDown } from 'react-icons/bs';
import { useTheme } from './ThemeProvider';

interface HeroSectionProps {
  onExploreClick?: () => void;
}

const HeroSectionUpdated: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
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
          
          {/* Large circle decoration with animation */}
          <motion.div 
            className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-indigo-500/10 to-blue-500/5 blur-3xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <motion.div 
            className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/5 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          ></motion.div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-indigo-400/30 dark:bg-indigo-400/40"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute top-2/3 left-1/3 w-3 h-3 rounded-full bg-blue-400/30 dark:bg-blue-400/40"
              animate={{
                y: [0, 30, 0],
                x: [0, -15, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
            <motion.div 
              className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-purple-400/30 dark:bg-purple-400/40"
              animate={{
                y: [0, -25, 0],
                x: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 5
              }}
            />
          </div>
        </div>
        
        {/* Glass panes with subtle movements */}
        <motion.div 
          className="hidden lg:block absolute top-0 left-0 w-1/3 h-screen bg-white/20 dark:bg-indigo-600/5 backdrop-blur-3xl skew-x-12 transform-gpu"
          animate={{
            opacity: [0.7, 0.9, 0.7],
            x: [0, -5, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="hidden lg:block absolute top-0 right-0 w-1/4 h-screen bg-white/10 dark:bg-blue-600/5 backdrop-blur-3xl -skew-x-12 transform-gpu"
          animate={{
            opacity: [0.5, 0.7, 0.5],
            x: [0, 5, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        ></motion.div>
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
                  <motion.span 
                    className="block mb-1" 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    whileHover={{ x: 5, color: "#4f46e5" }}
                  >
                    SAIBOU
                  </motion.span>
                  <motion.span 
                    className="block" 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    whileHover={{ x: 5, color: "#4f46e5" }}
                  >
                    ABDOU SALAM
                  </motion.span>
                </h1>
                <motion.div 
                  className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mb-3"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "6rem", opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  whileHover={{ width: "8rem" }}
                ></motion.div>
                <motion.h2 
                  className="text-2xl sm:text-3xl text-indigo-600 dark:text-indigo-400 font-semibold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  whileHover={{ y: -5, color: "#6366f1" }}
                >
                  Co-Fondateur de Fiabilitech
                </motion.h2>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.6 }}
                  className="block relative overflow-hidden"
                >
                  <motion.span
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    Passionné par le digital et l'entrepreneuriat, j'associe compétences en développement web et expertise commerciale. Actuellement en alternance dans l'immobilier, je recherche de nouvelles opportunités dans les achats et la supply chain.
                  </motion.span>
                </motion.span>
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
                  whileHover={{ 
                    scale: 1.15, 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(219, 39, 119, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full text-gray-800 dark:text-white shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
                  aria-label="Instagram"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <FaInstagram size={22} className="text-gradient-instagram relative z-10 animate-pulse-glow" />
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(10, 102, 194, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full text-gray-800 dark:text-white shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
                  aria-label="LinkedIn"
                >
                  <motion.div
                    className="absolute inset-0 bg-[#0A66C2] opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <FaLinkedin size={22} className="relative z-10 text-[#0A66C2] dark:text-[#5DA9E9]" />
                </motion.a>
                
                <motion.a
                  href="mailto:salamsaibou2002@gmail.com"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full text-gray-800 dark:text-white shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
                  aria-label="Email"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <FaEnvelope size={22} className="relative z-10 text-indigo-600 dark:text-indigo-400" />
                </motion.a>
              </div>
              
              <motion.button
                onClick={handleExploreClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 30px -10px rgba(79, 70, 229, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white rounded-full font-medium shadow-lg inline-flex items-center space-x-3 relative overflow-hidden group"
              >
                <motion.span 
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-blue-500"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
                
                {/* Animated border effect */}
                <motion.span 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                  style={{ 
                    border: "2px solid white",
                    boxSizing: "border-box",
                  }}
                  animate={{ 
                    scale: [0.7, 1.05, 0.7],
                    opacity: [0, 0.2, 0] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <span className="z-10 font-semibold">Explorer mon profil</span>
                <motion.span
                  animate={{ 
                    y: [0, -3, 0],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    y: {
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatType: "loop",
                      ease: "easeInOut" 
                    },
                    rotate: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut"
                    }
                  }}
                  className="z-10 ml-2"
                >
                  <FaArrowDown className="group-hover:animate-bounce" />
                </motion.span>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-70 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </motion.button>
            </div>
          </div>
          
          {/* Right side - Visual element - Nouveau design de photo de profil amélioré */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative flex justify-center items-center">
              {/* Carte de profil professionnelle avec photo plus grande */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                {/* Cadre principal */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ 
                    boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.35)",
                    transform: "translateY(-10px) scale(1.02)",
                    borderColor: "rgba(99, 102, 241, 0.4)"
                  }}
                  className="relative rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 w-[320px] h-[380px] sm:w-[400px] sm:h-[480px] transition-all duration-300"
                >
                  {/* Arrière-plan décoratif amélioré */}
                  <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          "linear-gradient(120deg, rgba(79, 70, 229, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
                          "linear-gradient(120deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)",
                          "linear-gradient(120deg, rgba(147, 51, 234, 0.2) 0%, rgba(79, 70, 229, 0.2) 100%)"
                        ]
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear"
                      }}
                    />
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <motion.path 
                        d="M0,0 L100,0 L100,100 L0,100 Z" 
                        stroke="url(#profile-gradient)" 
                        strokeWidth="0.5" 
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                      <defs>
                        <linearGradient id="profile-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#4f46e5" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <motion.div 
                      className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"
                      animate={{
                        background: [
                          "radial-gradient(circle at 20% 30%, rgba(79, 70, 229, 0.15), transparent 70%)",
                          "radial-gradient(circle at 70% 60%, rgba(79, 70, 229, 0.15), transparent 70%)",
                          "radial-gradient(circle at 30% 70%, rgba(79, 70, 229, 0.15), transparent 70%)",
                          "radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.15), transparent 70%)",
                          "radial-gradient(circle at 20% 30%, rgba(79, 70, 229, 0.15), transparent 70%)"
                        ]
                      }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  {/* Photo de profil principale améliorée */}
                  <div className="relative z-10 h-full w-full flex flex-col">
                    <div className="flex-1 relative overflow-hidden">
                      <motion.div
                        initial={{ scale: 1.2, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full w-full relative"
                        whileHover={{ 
                          scale: 1.02,
                          filter: "brightness(1.05)"
                        }}
                      >
                        <Image 
                          src="/images/profil.jpg" 
                          alt="SAIBOU ABDOU SALAM" 
                          fill
                          className="object-cover object-top"
                          priority
                          sizes="(max-width: 768px) 320px, 400px"
                          onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = "https://ui-avatars.com/api/?name=SAIBOU+ABDOU+SALAM&background=4f46e5&color=fff&size=300";
                          }}
                        />
                        
                        {/* Overlay avec dégradé subtil et animation améliorée */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0.4, 0.6, 0.4] }}
                          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                        />
                        
                        {/* Effet lumineux qui se déplace amélioré */}
                        <motion.div
                          className="absolute inset-0 opacity-0"
                          animate={{ 
                            opacity: [0, 0.4, 0],
                            background: [
                              "radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.4), transparent 70%)",
                              "radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.4), transparent 70%)",
                              "radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.4), transparent 70%)"
                            ]
                          }}
                          transition={{ duration: 8, repeat: Infinity, repeatType: "loop" }}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Informations en bas de l'image */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 border-t border-gray-100 dark:border-gray-700"
                      whileHover={{ 
                        backgroundColor: isDarkMode ? "rgba(31, 41, 55, 0.98)" : "rgba(255, 255, 255, 0.98)",
                        y: -3
                      }}
                    >
                      <motion.h3 
                        className="text-lg font-bold text-gray-900 dark:text-white"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 1.1 }}
                        whileHover={{ x: 2 }}
                      >
                        SAIBOU ABDOU SALAM
                      </motion.h3>
                      <motion.p 
                        className="text-sm text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 1.2 }}
                        whileHover={{ x: 2 }}
                      >
                        Co-Fondateur de Fiabilitech
                      </motion.p>
                    </motion.div>
                  </div>

                  {/* Badge 2025 amélioré */}
                  <motion.div
                    className="absolute top-3 right-3 z-20 bg-gradient-to-br from-indigo-600 to-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg"
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ 
                      scale: 1, 
                      rotate: 0,
                      y: [0, -8, 0],
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.2,
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: "0 0 20px rgba(79, 70, 229, 0.8)",
                      background: "linear-gradient(to br, #4338ca, #3b82f6)"
                    }}
                  >
                    <motion.span 
                      className="font-bold text-sm"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >2025</motion.span>
                  </motion.div>
                </motion.div>

                                  {/* Badge Supply Chain avec animation améliorée */}
                <motion.div 
                  className="absolute"
                  style={{ 
                    top: '16%',
                    left: '8%',
                  }}
                  animate={{ 
                    y: [0, -12, 0],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                  }}
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">Supply Chain</span>
                  </div>
                </motion.div>

                {/* Badge Web avec animation améliorée */}
                <motion.div 
                  className="absolute bottom-48 -left-16 z-30 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 1.6,
                    y: {
                      duration: 3.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                    backgroundColor: isDarkMode ? "rgba(30, 64, 175, 0.2)" : "rgba(219, 234, 254, 1)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 6, repeat: Infinity, repeatType: "loop", times: [0, 0.25, 0.5, 0.75, 1] }}
                    >
                      <FaCode className="text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    <span className="font-bold text-blue-600 dark:text-blue-400">Web</span>
                  </div>
                </motion.div>

                {/* Badge d'expérience */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.8, duration: 0.7 }}
                  className="absolute top-24 -right-52 sm:top-28 sm:-right-56 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 max-w-xs z-30 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 30px -10px rgba(79, 70, 229, 0.3)",
                    y: -5
                  }}
                >
                  <div className="flex items-start gap-3">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center flex-shrink-0"
                      animate={{ 
                        boxShadow: [
                          "0 0 0px rgba(79, 70, 229, 0)",
                          "0 0 20px rgba(79, 70, 229, 0.5)",
                          "0 0 0px rgba(79, 70, 229, 0)"
                        ],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "loop",
                        rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <FaBriefcase className="text-white text-xl" />
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="font-bold text-gray-900 dark:text-white"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 2 }}
                      >
                        Alternance Immobilier
                      </motion.h3>
                      <motion.p 
                        className="text-sm text-gray-600 dark:text-gray-400"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 2.1 }}
                      >
                        Agence de la gare • 2024-2025
                      </motion.p>
                    </div>
                  </div>
                </motion.div>

                {/* Effets lumineux */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full blur-3xl"></div>
                
                {/* Nouvel effet de lumière animé sur la photo */}
                <motion.div
                  className="absolute inset-0 z-20 opacity-0 pointer-events-none"
                  animate={{
                    opacity: [0, 0.2, 0],
                    background: [
                      "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
                      "linear-gradient(45deg, rgba(255,255,255,0) 100%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 0%)"
                    ],
                    left: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    repeatDelay: 5
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Scroll indicator with enhanced animation */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.span 
          className="text-sm text-gray-600 dark:text-gray-400 mb-2"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Découvrir
        </motion.span>
        <motion.div
          animate={{ 
            y: [0, 6, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <BsChevronDoubleDown className="text-indigo-600 dark:text-indigo-400 text-xl" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSectionUpdated; 
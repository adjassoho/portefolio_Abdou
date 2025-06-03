'use client';

import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { FaInstagram, FaLinkedin, FaEnvelope, FaArrowDown, FaBriefcase, FaGraduationCap, FaCode, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { BsChevronDoubleDown } from 'react-icons/bs';
import { useTheme } from './ThemeProvider';
import Motion3DCard from './Motion3DCard';

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
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
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
        delay: 0.8 + i * 0.15,
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }),
    hover: {
      scale: 1.2,
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
  
  // Button variants
  const buttonVariants = {
    initial: {
      opacity: 0,
      y: 30
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.6,
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
  
  // Profile image animation variants
  const profileImageVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: 15
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 20px 40px rgba(79, 70, 229, 0.3)",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 10
      }
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

  // 3D effect on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Disable on mobile
      
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate normalized values from -1 to 1
      const normalizedX = (clientX - centerX) / (window.innerWidth / 2);
      const normalizedY = (clientY - centerY) / (window.innerHeight / 2);
      
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);
  
  // Spring physics for smoother 3D effect
  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [-7, 7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [7, -7]), springConfig);

  return (
    <div 
      ref={ref} 
      id="accueil" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic background with gradient and animated patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950"></div>
        
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:[mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
        
        {/* Animated blobs */}
        <motion.div 
          className="absolute top-[10%] right-[10%] w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute bottom-[15%] left-[5%] w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.4, 0.6, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute top-[40%] left-[30%] w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"
          animate={{
            scale: [0.9, 1.1, 0.9],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0],
            y: [0, 20, 0]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-screen bg-indigo-600/5 backdrop-blur-3xl -skew-x-12 transform-gpu hidden lg:block"></div>
      <div className="absolute top-0 left-0 w-1/3 h-screen bg-blue-600/5 backdrop-blur-3xl skew-x-12 transform-gpu hidden lg:block"></div>

      <motion.div 
        className="container mx-auto px-4 z-10 flex flex-col items-center justify-center"
        style={{ y, opacity, scale }}
      >
        {/* Hero content container */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 py-8">
          {/* Left side - Professional profile */}
          <div className="w-full lg:w-1/2 text-left max-w-xl order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-medium text-sm border border-indigo-100 dark:border-indigo-700/30 backdrop-blur-sm">
                Recherche d'alternance 2025-2026 • Bachelor Achats et Supply Chain
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-6xl font-bold mb-6 text-gray-800 dark:text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="block mb-1">SAIBOU</span>
              <span className="block mb-1">ABDOU SALAM</span>
              <motion.div 
                className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mb-3"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "6rem", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              ></motion.div>
              <motion.h2 
                className="text-2xl sm:text-3xl text-indigo-600 dark:text-indigo-400 font-semibold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <a href="https://fiablitech.fr/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Fondateur de FiabliTech
                </a>
              </motion.h2>
            </motion.h1>
            
            <motion.div 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <FaQuoteLeft className="absolute -left-6 -top-4 text-indigo-200 dark:text-indigo-800 opacity-50 text-xl" />
              <p className="relative z-10">
                Passionné par le digital et l'entrepreneuriat, j'associe compétences en développement web et expertise commerciale. Actuellement en alternance dans l'immobilier, je recherche de nouvelles opportunités dans les achats et la supply chain.
              </p>
              <FaQuoteRight className="absolute -right-6 -bottom-4 text-indigo-200 dark:text-indigo-800 opacity-50 text-xl" />
            </motion.div>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <motion.div 
                className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <FaBriefcase className="text-indigo-600 dark:text-indigo-400" />
                <span className="text-gray-700 dark:text-gray-300">Entrepreneur</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <FaCode className="text-indigo-600 dark:text-indigo-400" />
                <span className="text-gray-700 dark:text-gray-300">Développement Web</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <FaGraduationCap className="text-indigo-600 dark:text-indigo-400" />
                <span className="text-gray-700 dark:text-gray-300">Bachelor Supply Chain</span>
              </motion.div>
            </div>
            
            {/* Social links */}
            <div className="flex space-x-4 mb-8">
              <motion.a 
                href="https://instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full text-gray-800 dark:text-white shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                variants={socialButtonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                custom={0}
                aria-label="Instagram"
              >
                <FaInstagram size={22} className="text-gradient-instagram" />
              </motion.a>
              
              <motion.a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full text-gray-800 dark:text-white shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                variants={socialButtonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                custom={1}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={22} />
              </motion.a>
              
              <motion.a 
                href="mailto:salamsaibou2002@gmail.com" 
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full text-gray-800 dark:text-white shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                variants={socialButtonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                custom={2}
                aria-label="Email"
              >
                <FaEnvelope size={22} />
              </motion.a>
            </div>
            
            {/* Call to action button */}
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-full font-medium shadow-lg inline-flex items-center space-x-3 relative overflow-hidden group"
              onClick={handleExploreClick}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
            >
              <span className="relative z-10">Explorer mon profil</span>
              <FaArrowDown className="relative z-10 ml-2 group-hover:animate-bounce" />
              
              {/* Button glow effect */}
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-70 blur-xl group-hover:blur-2xl transition-all duration-300 -z-10"></div>
            </motion.button>
          </div>
          
          {/* Right side - Visual element */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Modern abstract design element */}
              <motion.div className="w-full aspect-square max-w-md mx-auto relative">
                {/* Central image with overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <motion.div 
                    className="w-52 h-52 sm:w-68 sm:h-68 rounded-lg bg-gradient-to-br from-indigo-400 via-blue-500 to-purple-600 p-1 shadow-xl"
                    animate={{ 
                      boxShadow: ["0 10px 35px -15px rgba(79, 70, 229, 0.4)", "0 20px 35px -10px rgba(79, 70, 229, 0.7)", "0 10px 35px -15px rgba(79, 70, 229, 0.4)"]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                  >
                    <motion.div 
                      className="w-full h-full rounded-lg overflow-hidden bg-white dark:bg-gray-800 backdrop-blur-lg relative"
                      whileHover={{ 
                        scale: 1.03, 
                        rotate: 1,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15
                        }
                      }}
                    >
                      <Image 
                        src="/images/profil.jpg" 
                        alt="SAIBOU ABDOU SALAM" 
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                        priority
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = "https://ui-avatars.com/api/?name=SAIBOU+ABDOU+SALAM&background=4f46e5&color=fff&size=300";
                        }}
                      />
                      
                      {/* Overlay gradient effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent"
                        animate={{
                          opacity: [0.3, 0.4, 0.3]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity
                        }}
                      />
                      
                      {/* Effet lumineux dynamique */}
                      <motion.div 
                        className="absolute inset-0 opacity-0 bg-gradient-to-r from-transparent via-white to-transparent"
                        animate={{
                          opacity: [0, 0.6, 0],
                          x: ['-100%', '100%', '100%'],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut"
                        }}
                        style={{
                          mixBlendMode: 'overlay'
                        }}
                      />
                      
                      {/* Effet de verre sur le bas de l'image */}
                      <div className="absolute bottom-0 left-0 right-0 h-14 bg-white/15 dark:bg-gray-900/30 backdrop-blur-md backdrop-saturate-150 border-t border-white/30 dark:border-gray-700/30">
                        <div className="flex items-center justify-between px-3 h-full">
                          <motion.div 
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                          >
                            <motion.div 
                              className="w-2.5 h-2.5 rounded-full bg-emerald-400"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "mirror"
                              }}
                            />
                            <div className="text-xs text-white/80 font-medium">En ligne</div>
                          </motion.div>
                          <div className="h-1 w-16 rounded-full bg-white/20 dark:bg-gray-700/40"></div>
                        </div>
                      </div>
                      
                      {/* Cadre décoratif sur les coins */}
                      <div className="absolute top-1.5 left-1.5 w-6 h-6">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-500"></div>
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
                      </div>
                      <div className="absolute top-1.5 right-1.5 w-6 h-6">
                        <div className="absolute top-0 right-0 w-full h-1.5 bg-indigo-500"></div>
                        <div className="absolute top-0 right-0 w-1.5 h-full bg-indigo-500"></div>
                      </div>
                      <div className="absolute bottom-1.5 left-1.5 w-6 h-6">
                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-indigo-500"></div>
                        <div className="absolute bottom-0 left-0 w-1.5 h-full bg-indigo-500"></div>
                      </div>
                      <div className="absolute bottom-1.5 right-1.5 w-6 h-6">
                        <div className="absolute bottom-0 right-0 w-full h-1.5 bg-indigo-500"></div>
                        <div className="absolute bottom-0 right-0 w-1.5 h-full bg-indigo-500"></div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Orbital rotating rings */}
                <motion.div 
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 border-2 border-dashed border-indigo-200 dark:border-indigo-900 rounded-xl backdrop-blur-sm bg-white/5 dark:bg-indigo-900/5"></div>
                </motion.div>

                <motion.div 
                  className="absolute inset-0 scale-[0.85]"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 border-2 border-dashed border-blue-200 dark:border-blue-900 rounded-xl backdrop-blur-sm bg-white/5 dark:bg-blue-900/5"></div>
                </motion.div>

                <motion.div 
                  className="absolute inset-0 scale-[0.7]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 border-2 border-dashed border-purple-200 dark:border-purple-900 rounded-xl backdrop-blur-sm bg-white/5 dark:bg-purple-900/5"></div>
                </motion.div>
                
                {/* Points lumineux sur les orbites */}
                <motion.div
                  className="absolute w-3 h-3 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50"
                  style={{ 
                    top: '50%',
                    left: '0%',
                    translateY: '-50%'
                  }}
                  animate={{
                    rotate: [0, 360], 
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <motion.div
                  className="absolute w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"
                  style={{ 
                    top: '15%',
                    left: '50%',
                    translateX: '-50%'
                  }}
                  animate={{
                    rotate: [0, -360], 
                  }}
                  transition={{ 
                    duration: 30, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <motion.div
                  className="absolute w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"
                  style={{ 
                    top: '65%',
                    right: '15%',
                  }}
                  animate={{
                    rotate: [0, 360], 
                  }}
                  transition={{ 
                    duration: 25, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Floating skill icons */}
                <motion.div 
                  className="absolute"
                  style={{ 
                    top: '15%',
                    left: '15%',
                  }}
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">Supply Chain</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute"
                  style={{ 
                    bottom: '20%',
                    left: '10%',
                  }}
                  animate={{ 
                    y: [0, 10, 0],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">Web</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute"
                  style={{ 
                    top: '25%',
                    right: '10%',
                  }}
                  animate={{ 
                    y: [0, 12, 0],
                  }}
                  transition={{ 
                    duration: 3.5, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                  }}
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">Pro</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute"
                  style={{ 
                    bottom: '15%',
                    right: '15%',
                  }}
                  animate={{ 
                    y: [0, -15, 0],
                  }}
                  transition={{ 
                    duration: 4.5, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1.5
                  }}
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg">
                    <span className="text-green-600 dark:text-green-400 font-bold">2025</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Badge with current position */}
              <div className="absolute bottom-0 right-0 sm:bottom-4 sm:right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 max-w-xs backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                    <FaBriefcase className="text-indigo-600 dark:text-indigo-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Alternance Immobilier</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Agence de la gare • 2024-2025</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
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
      </motion.div>
    </div>
  );
};

export default HeroSection; 
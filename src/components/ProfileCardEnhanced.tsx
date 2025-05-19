'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCode } from 'react-icons/fa';

interface ProfileCardEnhancedProps {
  name: string;
  role: string;
  imageSrc: string;
  currentPosition: string;
  currentCompany: string;
  currentPeriod: string;
}

const ProfileCardEnhanced: React.FC<ProfileCardEnhancedProps> = ({
  name,
  role,
  imageSrc,
  currentPosition,
  currentCompany,
  currentPeriod
}) => {
  return (
    <div className="relative flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        {/* Effets lumineux subtils */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-400/30 dark:bg-blue-600/30 rounded-full blur-3xl z-0"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-400/30 dark:bg-indigo-600/30 rounded-full blur-3xl z-0"></div>

        {/* Cadre principal amélioré */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(79,70,229,0.5)] w-[300px] h-[380px] sm:w-[380px] sm:h-[460px] z-10"
        >
          {/* Fond décoratif avec meilleure visibilité */}
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-blue-500/20"></div>
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <motion.path 
                d="M0,0 L100,0 L100,100 L0,100 Z" 
                stroke="url(#profile-gradient)" 
                strokeWidth="0.8" 
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
          </div>

          {/* Conteneur de l'image avec cadre */}
          <div className="absolute inset-0 z-10 flex items-center justify-center p-5">
            <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-2xl shadow-inner overflow-hidden border border-gray-100 dark:border-gray-700">
              {/* Image de profil */}
              <motion.div
                initial={{ scale: 1.1, y: -10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-full h-full relative"
              >
                <Image 
                  src={imageSrc} 
                  alt={name} 
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 300px, 380px"
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff&size=300`;
                  }}
                />
                
                {/* Overlay avec dégradé subtil */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 via-indigo-900/10 to-transparent"></div>
                
                {/* Effet lumineux dynamique */}
                <motion.div 
                  className="absolute inset-0 opacity-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    opacity: [0, 0.4, 0],
                    x: ['-100%', '100%', '100%'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut"
                  }}
                  style={{ mixBlendMode: 'overlay' }}
                />
              </motion.div>
              
              {/* Lignes décoratives sur les coins */}
              <div className="absolute top-3 left-3 w-8 h-8 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-500 rounded-full"></div>
                <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500 rounded-full"></div>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-1.5 bg-indigo-500 rounded-full"></div>
                <div className="absolute top-0 right-0 w-1.5 h-full bg-indigo-500 rounded-full"></div>
              </div>
              <div className="absolute bottom-3 left-3 w-8 h-8 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-indigo-500 rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-full bg-indigo-500 rounded-full"></div>
              </div>
              <div className="absolute bottom-3 right-3 w-8 h-8 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-full h-1.5 bg-indigo-500 rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-1.5 h-full bg-indigo-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Informations en bas de l'image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute left-0 right-0 bottom-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-4 border-t border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{role}</p>
          </motion.div>

          {/* Badge année */}
          <motion.div
            className="absolute top-4 right-4 z-30 bg-indigo-600 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg"
            initial={{ scale: 0, rotate: -15 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              y: [0, -6, 0],
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
          >
            <span className="font-bold text-sm">2025</span>
          </motion.div>
        </motion.div>

        {/* Badges flottants repositionnés */}
        <motion.div 
          className="absolute -top-4 -left-16 z-30 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg border border-indigo-100 dark:border-indigo-800/30"
          initial={{ opacity: 0, x: 20 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, -8, 0]
          }}
          transition={{ 
            duration: 0.7, 
            delay: 1.4,
            y: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
              <FaGraduationCap className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">Supply Chain</span>
          </div>
        </motion.div>

        <motion.div 
          className="absolute -bottom-4 -left-14 z-30 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg border border-blue-100 dark:border-blue-800/30"
          initial={{ opacity: 0, x: 20 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, 8, 0]
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
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <FaCode className="text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-bold text-blue-600 dark:text-blue-400">Web</span>
          </div>
        </motion.div>

        <motion.div 
          className="absolute top-1/3 -right-16 z-30 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg border border-purple-100 dark:border-purple-800/30"
          initial={{ opacity: 0, x: -20 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 0.7, 
            delay: 1.5,
            y: {
              duration: 4.5,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <FaCode className="text-purple-600 dark:text-purple-400" />
            </div>
            <span className="font-bold text-purple-600 dark:text-purple-400">Pro</span>
          </div>
        </motion.div>

        {/* Badge d'expérience */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          className="absolute -bottom-10 right-0 sm:-bottom-12 sm:right-0 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 max-w-xs z-30 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center flex-shrink-0">
              <FaBriefcase className="text-white text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">{currentPosition}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{currentCompany} • {currentPeriod}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileCardEnhanced; 
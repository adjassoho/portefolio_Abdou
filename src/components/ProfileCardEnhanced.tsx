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
        {/* Effets lumineux subtils - repositionnés pour petits écrans */}
        <div className="absolute -top-16 -right-16 w-32 h-32 sm:w-48 sm:h-48 bg-blue-400/30 dark:bg-blue-600/30 rounded-full blur-3xl z-0"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 sm:w-48 sm:h-48 bg-indigo-400/30 dark:bg-indigo-600/30 rounded-full blur-3xl z-0"></div>

        {/* Cadre principal amélioré - ajusté pour mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(79,70,229,0.5)] w-[280px] h-[350px] sm:w-[380px] sm:h-[460px] z-10"
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

          {/* Conteneur de l'image avec cadre - modifié pour format carré */}
          <div className="absolute inset-0 z-10 flex items-center justify-center p-5">
            <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-2xl shadow-inner overflow-hidden border border-gray-100 dark:border-gray-700">
              {/* Image de profil - transformée en carré avec coins arrondis */}
              <motion.div
                initial={{ scale: 1.1, y: -10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-full h-full relative overflow-hidden"
              >
                {/* Anneaux orbitaux décoratifs adaptés au format carré */}
                <div className="absolute inset-0 z-0">
                  <motion.div 
                    className="w-full h-full opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  >
                    <div className="absolute inset-0 border-4 border-dashed border-indigo-500/50 rounded-2xl"></div>
                  </motion.div>
                  <motion.div 
                    className="absolute inset-4 opacity-30"
                    animate={{ rotate: -360 }}
                    transition={{ 
                      duration: 25, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  >
                    <div className="absolute inset-0 border-2 border-dotted border-blue-500/50 rounded-xl"></div>
                  </motion.div>
                </div>
                
                {/* Conteneur pour l'image avec effet de bords brillants */}
                <div className="absolute inset-8 z-10 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-0.5">
                  <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
                    <Image 
                      src={imageSrc} 
                      alt={name} 
                      fill
                      className="object-cover object-top rounded-2xl"
                      priority
                      sizes="(max-width: 768px) 280px, 380px"
                      onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff&size=300`;
                      }}
                    />
                  </div>
                </div>
                
                {/* Overlay avec dégradé subtil */}
                <div className="absolute inset-8 z-20 rounded-2xl bg-gradient-to-t from-indigo-900/50 via-indigo-900/10 to-transparent"></div>
                
                {/* Effet lumineux dynamique traversant la photo */}
                <motion.div 
                  className="absolute inset-8 z-30 opacity-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-2xl"
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
              
              {/* Lignes décoratives aux coins du cadre */}
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
          
          {/* Informations en bas de l'image - avec z-index augmenté pour passer au-dessus du badge d'expérience */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute left-0 right-0 bottom-0 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-4 border-t border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{role}</p>
          </motion.div>

          {/* Badge année - rendu conditionnel pour mobile */}
          <motion.div
            className="absolute top-4 right-4 z-30 bg-indigo-600 text-white rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center shadow-lg"
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
            <span className="font-bold text-xs sm:text-sm">2025</span>
          </motion.div>
        </motion.div>

        {/* Badges flottants repositionnés - adaptés pour mobile */}
        {/* Masqués sur très petits écrans, visibles à partir de sm */}
        <motion.div 
          className="hidden sm:flex absolute -top-4 -left-10 sm:-left-16 z-30 bg-white dark:bg-gray-800 rounded-xl p-2.5 sm:p-3 shadow-lg border border-indigo-100 dark:border-indigo-800/30"
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
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
              <FaGraduationCap className="text-indigo-600 dark:text-indigo-400 text-sm sm:text-base" />
            </div>
            <span className="font-bold text-sm sm:text-base text-indigo-600 dark:text-indigo-400">BACHELOR SUPPLY CHAIN</span>
          </div>
        </motion.div>

        <motion.div 
          className="hidden sm:flex absolute -bottom-4 -left-8 sm:-left-14 z-30 bg-white dark:bg-gray-800 rounded-xl p-2.5 sm:p-3 shadow-lg border border-blue-100 dark:border-blue-800/30"
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
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <FaCode className="text-blue-600 dark:text-blue-400 text-sm sm:text-base" />
            </div>
            <span className="font-bold text-sm sm:text-base text-blue-600 dark:text-blue-400">Web</span>
          </div>
        </motion.div>

        <motion.div 
          className="hidden sm:flex absolute top-1/3 -right-10 sm:-right-16 z-30 bg-white dark:bg-gray-800 rounded-xl p-2.5 sm:p-3 shadow-lg border border-purple-100 dark:border-purple-800/30"
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
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <FaCode className="text-purple-600 dark:text-purple-400 text-sm sm:text-base" />
            </div>
            <span className="font-bold text-sm sm:text-base text-purple-600 dark:text-purple-400">Pro</span>
          </div>
        </motion.div>

        {/* Badge d'expérience repositionné pour ne plus superposer le nom et le rôle */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          className="absolute bottom-16 -right-28 sm:bottom-20 sm:-right-36 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-3 sm:p-4 max-w-[180px] sm:max-w-xs z-20 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <FaBriefcase className="text-white text-sm sm:text-base" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Actuellement</p>
              <h4 className="font-medium text-sm sm:text-base text-gray-800 dark:text-gray-100">{currentPosition}</h4>
            </div>
          </div>
          <div className="flex flex-col ml-11">
            <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">{currentCompany}</span>
            <span className="text-xs text-indigo-600 dark:text-indigo-400">{currentPeriod}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileCardEnhanced; 
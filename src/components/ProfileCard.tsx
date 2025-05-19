'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCode } from 'react-icons/fa';

interface ProfileCardProps {
  name: string;
  role: string;
  imageSrc: string;
  currentPosition: string;
  currentCompany: string;
  currentPeriod: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
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
        {/* Cadre principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 w-[320px] h-[380px] sm:w-[400px] sm:h-[480px]"
        >
          {/* Arrière-plan décoratif */}
          <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
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
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          </div>

          {/* Photo de profil principale */}
          <div className="relative z-10 h-full w-full flex flex-col">
            <div className="flex-1 relative overflow-hidden">
              <motion.div
                initial={{ scale: 1.2, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full w-full relative"
              >
                <Image 
                  src={imageSrc} 
                  alt={name} 
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 320px, 400px"
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff&size=300`;
                  }}
                />
                
                {/* Overlay avec dégradé subtil */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </motion.div>
            </div>
            
            {/* Informations en bas de l'image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 border-t border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{role}</p>
            </motion.div>
          </div>

          {/* Badge 2025 */}
          <motion.div
            className="absolute top-3 right-3 z-20 bg-indigo-600 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg"
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
          >
            <span className="font-bold text-sm">2025</span>
          </motion.div>
        </motion.div>

        {/* Badge Supply Chain */}
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

        {/* Badge Web */}
        <motion.div 
          className="absolute bottom-6 -left-16 z-30 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-100 dark:border-gray-700"
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
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <FaCode className="text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-bold text-blue-600 dark:text-blue-400">Web</span>
          </div>
        </motion.div>

        {/* Badge d'expérience */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 max-w-xs z-30 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
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

        {/* Effets lumineux */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full blur-3xl"></div>
      </motion.div>
    </div>
  );
};

export default ProfileCard; 
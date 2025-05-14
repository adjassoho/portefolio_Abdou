'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaHome, FaUser, FaGraduationCap, FaBriefcase, FaTools, FaEnvelope } from 'react-icons/fa';
import GlassCard from './GlassCard';
import AnimatedText from './AnimatedText';

export type NavigationItem = {
  title: string;
  href: string;
};

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  activeSection: string;
}

// Map navigation titles to icons
const getIconForNav = (title: string) => {
  switch (title.toLowerCase()) {
    case 'accueil': return <FaHome />;
    case 'à propos': return <FaUser />;
    case 'formation': return <FaGraduationCap />;
    case 'expérience': return <FaBriefcase />;
    case 'compétences': return <FaTools />;
    case 'contact': return <FaEnvelope />;
    default: return <FaHome />;
  }
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navigationItems, activeSection }) => {
  if (!isOpen) return null;

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        when: "beforeChildren",
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 } 
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] } 
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex"
      initial="closed"
      animate="open"
      exit="closed"
      variants={menuVariants}
    >
      {/* Backdrop with blur effect */}
      <motion.div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Mobile menu container */}
      <GlassCard
        className="absolute right-0 h-full w-full max-w-xs flex flex-col overflow-hidden rounded-l-2xl rounded-r-none"
        blur="backdrop-blur-lg"
        border={false}
        interactive={false}
        gradientBorder
      >
        {/* Close button and logo area */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100/20 dark:border-gray-800/20">
          <AnimatedText
            text="Navigation"
            as="h2" 
            className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"
            animation="gradient"
            duration={0.7}
          />
          <motion.button
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full"
            onClick={onClose}
            whileTap={{ scale: 0.9 }}
            whileHover={{ 
              scale: 1.1,
              rotate: 90,
              transition: { duration: 0.2 }
            }}
          >
            <FaTimes size={20} />
          </motion.button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-6 py-8 overflow-y-auto">
          <ul className="space-y-5">
            {navigationItems.map((item, index) => (
              <motion.li key={item.href} variants={itemVariants}>
                <a
                  href={item.href}
                  className={`group block transition-all duration-300 transform ${
                    activeSection === item.href
                      ? 'text-indigo-600 dark:text-indigo-400 translate-x-2'
                      : 'text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:translate-x-2'
                  }`}
                  onClick={() => {
                    onClose();
                  }}
                >
                  <GlassCard
                    className={`flex items-center space-x-3 px-4 py-3 transition-all duration-300 ${
                      activeSection === item.href 
                        ? 'border-l-4 border-indigo-600 dark:border-indigo-400 pl-3'
                        : ''
                    }`}
                    blur={activeSection === item.href ? 'backdrop-blur-md' : 'backdrop-blur-sm'}
                    border={false}
                    glow={activeSection === item.href}
                    glowColor="rgba(79, 70, 229, 0.3)"
                    hoverScale={1.03}
                  >
                    <span className={`text-xl ${
                      activeSection === item.href
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                    }`}>
                      {getIconForNav(item.title)}
                    </span>
                    <span className="font-medium text-lg">{item.title}</span>
                    
                    {/* Active indicator */}
                    {activeSection === item.href && (
                      <motion.div 
                        layoutId="mobileActiveIndicator"
                        className="ml-auto h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </GlassCard>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Footer with contact button */}
        <div className="px-6 py-6 border-t border-gray-100/20 dark:border-gray-800/20">
          <motion.a
            href="#contact"
            className="block w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white text-center font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            onClick={onClose}
            whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            Me contacter
          </motion.a>
          <motion.div 
            className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400"
            variants={itemVariants}
          >
            © {new Date().getFullYear()} SAIBOU ABDOU SALAM
          </motion.div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default MobileMenu;
 
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { type: 'spring', stiffness: 300, damping: 20 } 
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.5,
            transition: { duration: 0.3 } 
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 20px rgba(79, 70, 229, 0.6)",
          }}
          whileTap={{ scale: 0.9 }}
          title="Retour en haut"
        >
          <FaArrowUp className="text-lg" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white animate-pulse"></span>
          
          {/* Cercles d'effet ripple */}
          <span className="absolute inset-0 rounded-full animate-ping bg-indigo-400 opacity-25"></span>
          <motion.span 
            className="absolute inset-0 rounded-full border-2 border-white opacity-20"
            animate={{ 
              scale: [1, 1.5, 1],
            }}
            transition={{ 
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
              ease: "easeInOut" 
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 
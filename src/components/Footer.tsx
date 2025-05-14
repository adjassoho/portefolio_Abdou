'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowUp, FaHeart } from 'react-icons/fa';
import GlassCard from './GlassCard';
import AnimatedText from './AnimatedText';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-gray-200 dark:border-gray-800">
      {/* Gradient Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-400"></div>
      
      {/* Back to Top Button */}
      <motion.button
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10"
        whileHover={{ 
          y: -5,
          scale: 1.1,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.9 }}
        onClick={handleScrollToTop}
        title="Retour en haut"
      >
        <GlassCard 
          className="p-3"
          border
          glow
          glowColor="rgba(99, 102, 241, 0.5)"
        >
          <FaArrowUp size={18} className="text-indigo-600 dark:text-indigo-400" />
        </GlassCard>
      </motion.button>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={footerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About column */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6 h-full" interactive={false} blur="backdrop-blur-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                <AnimatedText
                  text="SAIBOU ABDOU SALAM"
                  as="span"
                  className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"
                  animation="gradient"
                />
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Étudiant en BTS MCO en recherche de stage, passionné par le management commercial et la relation client.
              </p>
              <div className="flex space-x-4 mt-6">
                <motion.a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub size={20} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin size={20} />
                </motion.a>
                <motion.a
                  href="mailto:salamsaibou2002@gmail.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaEnvelope size={20} />
                </motion.a>
              </div>
            </GlassCard>
          </motion.div>
          
          {/* Navigation column */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6 h-full" interactive={false} blur="backdrop-blur-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Navigation</h3>
              <ul className="space-y-2">
                {[
                  { title: 'Accueil', href: '#accueil' },
                  { title: 'À propos', href: '#a-propos' },
                  { title: 'Formation', href: '#formation' },
                  { title: 'Expérience', href: '#experience' },
                  { title: 'Compétences', href: '#competences' },
                  { title: 'Contact', href: '#contact' }
                ].map((item, index) => (
                  <motion.li 
                    key={item.href}
                    whileHover={{ x: 5 }} 
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <a 
                      href={item.href} 
                      className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {item.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
          
          {/* Contact column */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6 h-full" interactive={false} blur="backdrop-blur-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0 text-indigo-600 dark:text-indigo-400">
                    <FaMapMarkerAlt />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">22 Rue saint Maur 76000 Rouen</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 text-indigo-600 dark:text-indigo-400">
                    <FaPhone />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">06 51 10 43 34</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex-shrink-0 text-indigo-600 dark:text-indigo-400">
                    <FaEnvelope />
                  </div>
                  <a 
                    href="mailto:salamsaibou2002@gmail.com" 
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    salamsaibou2002@gmail.com
                  </a>
                </li>
              </ul>
            </GlassCard>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-200/30 dark:border-gray-800/30 text-center"
          variants={itemVariants}
        >
          <GlassCard 
            className="p-4 inline-block max-w-2xl mx-auto" 
            interactive={false} 
            border={false} 
            blur="backdrop-blur-sm"
          >
            <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center">
              © {currentYear} SAIBOU ABDOU SALAM. Tous droits réservés.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center justify-center space-x-1">
              <span>Portfolio réalisé avec</span>
              <FaHeart className="text-red-500 mx-1" size={10} />
              <span>Next.js et Tailwind CSS</span>
            </p>
          </GlassCard>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer; 
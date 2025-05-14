'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars } from 'react-icons/fa';
import MobileMenu from './MobileMenu';
import { useTheme } from './ThemeProvider';
import GlassCard from './GlassCard';
import type { NavigationItem } from './MobileMenu';

const navigationItems: NavigationItem[] = [
  { title: 'Accueil', href: '#accueil' },
  { title: 'À propos', href: '#a-propos' },
  { title: 'Formation', href: '#formation' },
  { title: 'Expérience', href: '#experience' },
  { title: 'Compétences', href: '#competences' },
  { title: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#accueil');
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Find active section by checking which section is currently in view
      const sections = document.querySelectorAll('section[id]');
      let currentSection = '#accueil';
      
      sections.forEach(section => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop - 100;
        const sectionHeight = sectionElement.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = `#${section.id}`;
        }
      });
      
      setActiveSection(currentSection);
    };

    // Set initial active section and scroll status
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navbar animations
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }
    }
  };
  
  // Menu item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 transition-all duration-300"
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
      >
        <GlassCard
          className={`mx-auto my-2 px-4 py-3 rounded-full transition-all duration-300 ${
            isScrolled ? 'shadow-lg' : ''
          }`}
          blur={isScrolled ? 'backdrop-blur-md' : 'backdrop-blur-sm'}
          border={isScrolled}
          glow={isScrolled}
          width="max-w-7xl"
          interactive={false}
        >
          <div className="flex justify-between items-center">
            <motion.a 
              href="#accueil"
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-glow-subtle">SAIBOU ABDOU SALAM</span>
              {/* Underline animation */}
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-md text-sm font-medium overflow-hidden ${
                    activeSection === item.href
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                  custom={index}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.title}
                  {activeSection === item.href && (
                    <motion.span
                      className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                      layoutId="navIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  {/* Hover animation */}
                  <motion.span 
                    className="absolute inset-0 -z-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-md opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              
              <motion.button
                onClick={toggleTheme}
                className="ml-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                title={isDarkMode ? 'Passer au mode clair' : 'Passer au mode sombre'}
                variants={itemVariants}
                custom={navigationItems.length}
              >
                {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-indigo-600" />}
              </motion.button>
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <motion.button
                onClick={toggleTheme}
                className="p-2 mr-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={isDarkMode ? 'Passer au mode clair' : 'Passer au mode sombre'}
              >
                {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-indigo-600" />}
              </motion.button>
              
              <motion.button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-full bg-indigo-100/80 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaBars size={20} />
              </motion.button>
            </div>
          </div>
        </GlassCard>
      </motion.header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu 
            navigationItems={navigationItems}
            activeSection={activeSection}
            isOpen={isMobileMenuOpen} 
            onClose={() => setIsMobileMenuOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 
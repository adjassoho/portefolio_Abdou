'use client';

import { useRef, useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaUserGraduate, FaBookReader, FaHandshake, FaBriefcase, FaTools, FaLanguage, FaLaptopCode, FaHeadset, FaNetworkWired, FaLightbulb, FaChartBar } from "react-icons/fa";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

export default function Home() {
  // Debugging log
  if (typeof window !== 'undefined') {
    console.log('Page component loaded');
  }
  
  const aboutRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smoother motion
  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  // Track mouse position for 3D effect on hero name
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!nameRef.current) return;
      
      const rect = nameRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate normalized values from -1 to 1
      const normalizedX = ((e.clientX - centerX) / (rect.width / 2)) * 0.5;
      const normalizedY = ((e.clientY - centerY) / (rect.height / 2)) * 0.5;
      
      mouseX.set(normalizedX);
      mouseY.set(normalizedY * -1); // Invert Y for natural tilt
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Update spring values when mouse values change
  useEffect(() => {
    const unsubscribeX = mouseX.onChange((latest) => {
      rotateY.set(latest * 10); // Tilt horizontally based on mouse X
    });
    
    const unsubscribeY = mouseY.onChange((latest) => {
      rotateX.set(latest * 10); // Tilt vertically based on mouse Y
    });
    
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, rotateX, rotateY]);

  // Scroll animations
  const { scrollY } = useScroll();
  const titleOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const titleY = useTransform(scrollY, [0, 200], [0, -50]);
  const imageScale = useTransform(scrollY, [0, 200], [1, 0.8]);
  const imageOpacity = useTransform(scrollY, [0, 200], [1, 0.6]);
  const imageRotate = useTransform(scrollY, [0, 200], [0, -10]);

  // Timeline items for experience section
  const experienceItems = [
    {
      title: "U Express",
      subtitle: "Stage de 8 semaines",
      date: "2023",
      content: [
        "Réception des commandes",
        "Comptabilité",
        "Étiquetage des prix"
      ]
    },
    {
      title: "Institut Les TOURELLES",
      subtitle: "Stage au CDI (bibliothèque)",
      date: "2022",
      content: [
        "Classement et rangement des documents sur l'orientation",
        "Accueil d'un fournisseur",
        "Choix de livres pour le CDI, traitement et suivi de la commande",
        "Réception, classement et mise à disposition des magazines du CDI",
        "Tableau comparatif de caisson de bureau pour le CDI"
      ]
    },
    {
      title: "Pharmacie d'Argenteuil Joliot curie",
      subtitle: "Stage",
      date: "2020",
      content: [
        "Accueil des clients",
        "Réception des commandes et vérification des produits avec le bon de commande",
        "Classement et mise en disposition des produits en rayon"
      ]
    },
    {
      title: "Bibliothèque de Oissel",
      subtitle: "Stage",
      date: "Janvier 2017",
      content: [
        "Accueil des clients",
        "Classement et rangement des documents sur l'orientation"
      ]
    }
  ];
  
  // Skill sets for skill section
  const skillSets = [
    {
      title: "Compétences Commerciales",
      skills: [
        { name: "Communication client", level: 90 },
        { name: "Vente omnicanal", level: 75 },
        { name: "Études commerciales", level: 70 },
        { name: "Gestion de la relation client", level: 85 }
      ]
    },
    {
      title: "Compétences Techniques",
      skills: [
        { name: "Outils bureautiques", level: 85 },
        { name: "Technologies de l'information", level: 70 },
        { name: "Veille informationnelle", level: 75 }
      ]
    },
    {
      title: "Compétences Linguistiques",
      skills: [
        { name: "Français", level: 100 },
        { name: "Anglais", level: 70 }
      ]
    }
  ];

  // Function to scroll to About section
  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to close mobile menu when a link is clicked
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  // Function to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="font-bold text-xl text-blue-600 flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-lg mr-3 flex items-center justify-center text-white font-bold">S</div>
            SAIBOU ABDOU SALAM
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#accueil" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Accueil</a>
            <a href="#a-propos" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">À propos</a>
            <a href="#formation" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Formation</a>
            <a href="#experience" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Expérience</a>
            <a href="#competences" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Compétences</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
          </div>
          <div className="md:hidden">
            <button 
              className="text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 shadow-lg absolute top-full left-0 right-0 z-40">
            <div className="flex flex-col space-y-4">
              <a href="#accueil" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md hover:bg-gray-50 transition-colors" onClick={handleNavClick}>Accueil</a>
              <a href="#a-propos" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md hover:bg-gray-50 transition-colors" onClick={handleNavClick}>À propos</a>
              <a href="#formation" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md hover:bg-gray-50 transition-colors" onClick={handleNavClick}>Formation</a>
              <a href="#experience" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md hover:bg-gray-50 transition-colors" onClick={handleNavClick}>Expérience</a>
              <a href="#competences" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md hover:bg-gray-50 transition-colors" onClick={handleNavClick}>Compétences</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded-md hover:bg-gray-50 transition-colors" onClick={handleNavClick}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="py-16 md:py-28 bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden" ref={heroRef}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
            <motion.div 
              className="md:w-1/2 mb-12 md:mb-0 md:pr-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ opacity: titleOpacity, y: titleY }}
            >
              <motion.div
                ref={nameRef}
                className="mb-6"
              >
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="block mb-2 text-gray-800"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    SAIBOU
                  </motion.div>
                  
                  <motion.div 
                    className="block text-blue-600"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                  >
                    <span>ABDOU</span>{' '}<span>SALAM</span>
                    
                    {/* Barre de soulignement */}
                    <motion.div 
                      className="h-1 bg-blue-600 mt-2"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    />
                  </motion.div>
                </motion.h1>
              </motion.div>
              
              <motion.div 
                className="h-1 w-24 bg-blue-600 mb-6"
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ duration: 0.8, delay: 1 }}
              ></motion.div>
              
              <motion.h2 
                className="text-xl md:text-2xl text-gray-700 font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Expert en management commercial
              </motion.h2>
              
              <motion.p 
                className="text-gray-600 text-lg mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                Étudiant passionné en BTS MCO avec une solide expérience en gestion de la relation client et techniques commerciales. Prêt à mettre en œuvre mes compétences au service de votre entreprise.
              </motion.p>
              
              <motion.div 
                className="flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <motion.button 
                  onClick={scrollToAbout}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Mon parcours
                </motion.button>
                <motion.a 
                  href="#contact" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-md transition-colors"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Me contacter
                </motion.a>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-5/12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ scale: imageScale, opacity: imageOpacity }}
            >
              <div className="relative">
                {/* Decorative elements */}
                <motion.div 
                  className="absolute top-0 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"
                  animate={{ y: [0, 15, -15, 0], scale: [1, 1.1, 0.9, 1] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                ></motion.div>
                <motion.div 
                  className="absolute top-0 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"
                  animate={{ y: [0, -20, 20, 0], scale: [1, 0.9, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                ></motion.div>
                <motion.div 
                  className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"
                  animate={{ y: [0, 20, -20, 0], scale: [1, 1.1, 0.9, 1] }}
                  transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
                ></motion.div>
                
                {/* Profile image with frame */}
                <motion.div 
                  className="relative p-5 bg-white rounded-2xl shadow-xl"
                  initial={{ rotate: -5 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  style={{ rotate: imageRotate }}
                  whileHover={{ rotate: -5, transition: { duration: 0.3 } }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl transform -rotate-2"></div>
                  <motion.div 
                    className="relative bg-white p-2 rounded-xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src="/images/profil.jpg" 
                      alt="SAIBOU ABDOU SALAM" 
                      className="w-full h-auto rounded-lg"
                    />
                    <motion.div 
                      className="absolute bottom-2 left-0 right-0 bg-gradient-to-t from-blue-600 to-transparent p-4 pt-16"
                      initial={{ y: 100 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    >
                      <div className="text-white">
                        <p className="font-bold">BTS MCO - Management Commercial Opérationnel</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="a-propos" className="py-20 bg-gradient-to-b from-white to-blue-50" ref={aboutRef}>
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center text-gray-800 mb-16 relative inline-block mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="relative z-10">À propos</span>
            <motion.span 
              className="absolute -bottom-3 left-0 right-0 h-1 bg-blue-600"
              initial={{ width: 0, left: "50%" }}
              whileInView={{ width: "100%", left: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          
          <div className="flex flex-col lg:flex-row gap-10 items-center max-w-7xl mx-auto">
            {/* Image/Design Element */}
            <motion.div 
              className="lg:w-2/5 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                {/* Blob backgrounds */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                
                {/* Abstract design element */}
                <div className="bg-white p-8 relative z-10 rounded-lg">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-square bg-blue-100 rounded-lg flex items-center justify-center">
                      <div className="text-blue-600 text-5xl font-bold">BTS</div>
                    </div>
                    <div className="aspect-square bg-blue-600 rounded-lg flex items-center justify-center">
                      <div className="text-white text-5xl font-bold">MCO</div>
                    </div>
                    <div className="col-span-2 bg-gray-100 p-4 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xl font-semibold">Ambassadeur</div>
                          <div className="text-gray-600">des autistes TSA</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
        <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">3</div>
                      <div className="text-gray-600 text-sm">Années de<br />formation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">4</div>
                      <div className="text-gray-600 text-sm">Expériences<br />professionnelles</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">10+</div>
                      <div className="text-gray-600 text-sm">Compétences<br />développées</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Text Content */}
            <motion.div 
              className="lg:w-3/5"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-600 relative">
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                
                <motion.p 
                  className="text-gray-700 mb-6 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <span className="font-semibold text-blue-600">Étudiant en BTS MCO</span> (Management Commercial Opérationnel) en formation initiale à l'Institut les Tourelles, je suis à la recherche d'un stage me permettant de mettre en pratique mes compétences commerciales et managériales.
                </motion.p>
                
                <motion.p 
                  className="text-gray-700 mb-6 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="font-semibold text-blue-600">Passionné par le management et la relation client</span>, je suis également engagé en tant qu'Ambassadeur des autistes TSA (Trouble du Spectre Autiste). Je combine esprit d'initiative et rigueur dans l'exécution de mes missions.
                </motion.p>
                
                <motion.p 
                  className="text-gray-700 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <span className="font-semibold text-blue-600">Mes expériences précédentes</span> en gestion administrative et en relation client m'ont permis de développer d'excellentes compétences en communication et en organisation.
                </motion.p>
                
                <motion.div 
                  className="mt-8 flex flex-wrap gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Management</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Vente</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Communication</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Organisation</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Relation client</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formation Section */}
      <section id="formation" className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-20 right-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            <div className="absolute bottom-0 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-40 left-10 transform -rotate-12 opacity-10">
              <div className="text-9xl font-bold text-blue-900">BTS</div>
            </div>
            <div className="absolute bottom-20 right-10 transform rotate-12 opacity-10">
              <div className="text-9xl font-bold text-blue-900">MCO</div>
            </div>
            
            {/* Lines */}
            <div className="absolute top-40 right-0 w-1/3 h-px bg-gradient-to-r from-transparent to-blue-200"></div>
            <div className="absolute bottom-40 left-0 w-1/3 h-px bg-gradient-to-l from-transparent to-blue-200"></div>
          </div>
          
          {/* Main content */}
          <motion.div 
            className="text-center mb-16 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 inline-block relative">
              Formation
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-600"
                initial={{ width: 0, left: "50%" }}
                whileInView={{ width: "100%", left: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Mon parcours académique m'a permis d'acquérir une solide formation dans le domaine du management commercial.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-blue-400 to-blue-300"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              ></motion.div>

              {/* BTS MCO */}
              <motion.div 
                className="relative mb-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="bg-white p-6 rounded-lg shadow-xl border-l-4 border-blue-600 hover:shadow-2xl transition-shadow duration-300 md:ml-auto md:mr-0 mx-auto max-w-md"
                    >
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">BTS MCO en formation initiale</h3>
                      <div className="text-blue-600 font-semibold mb-4">Management Commercial Opérationnel</div>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center justify-end">
                          <span>Institut les Tourelles | 2024-2025 (3ème année)</span>
                          <span className="ml-2 text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full">En cours</span>
                        </li>
                        <li>Institut les Tourelles | 2023-2024 (2ème année)</li>
                        <li>Institut les Tourelles | 2022-2023 (1ère année)</li>
                      </ul>
                      <div className="mt-4 flex justify-end">
                        <div className="px-4 py-2 bg-blue-100 rounded-lg text-sm text-blue-800 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Compétences acquises
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="flex justify-center">
                    <motion.div 
                      className="w-16 h-16 bg-blue-600 rounded-full border-4 border-white shadow-xl z-10 flex items-center justify-center text-white"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.4 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <FaUserGraduate className="text-2xl" />
                    </motion.div>
                  </div>
                  
                  <div className="md:w-1/2 md:pl-12 md:text-left">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-blue-600 bg-opacity-10 backdrop-blur-sm p-5 rounded-lg max-w-xs mx-auto md:ml-0 md:mr-auto"
                    >
                      <h4 className="font-semibold text-blue-800 mb-2">Compétences développées</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-white bg-opacity-60 rounded-full text-xs text-blue-700">Gestion commerciale</span>
                        <span className="px-2 py-1 bg-white bg-opacity-60 rounded-full text-xs text-blue-700">Marketing</span>
                        <span className="px-2 py-1 bg-white bg-opacity-60 rounded-full text-xs text-blue-700">Management</span>
                        <span className="px-2 py-1 bg-white bg-opacity-60 rounded-full text-xs text-blue-700">Communication</span>
                        <span className="px-2 py-1 bg-white bg-opacity-60 rounded-full text-xs text-blue-700">Analyse de marché</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Bac Pro */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0 order-1 md:order-1">
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      viewport={{ once: true }}
                      className="bg-blue-600 bg-opacity-10 backdrop-blur-sm p-5 rounded-lg max-w-xs mx-auto md:ml-auto md:mr-0"
                    >
                      <h4 className="font-semibold text-blue-800 mb-2">Compétences acquises</h4>
                      <div className="flex flex-wrap gap-2 justify-end">
                        <span className="px-2 py-1 bg-white bg-opacity-60 rounded-full text-xs text-blue-700">Administration</span>
                        <span className="px-2 py-1 bg-white bg-opacity-60 rounded-full text-xs text-blue-700">Gestion</span>
                        <span className="px-2 py-1 bg-white bg-opacity-60 rounded-full text-xs text-blue-700">Organisation</span>
                        <span className="px-2 py-1 bg-white bg-opacity-60 rounded-full text-xs text-blue-700">Communication</span>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="flex justify-center order-0 md:order-2">
                    <motion.div 
                      className="w-16 h-16 bg-blue-500 rounded-full border-4 border-white shadow-xl z-10 flex items-center justify-center text-white"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.8 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <FaUserGraduate className="text-2xl" />
                    </motion.div>
                  </div>
                  
                  <div className="md:w-1/2 md:pl-12 md:text-left order-2 md:order-3">
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      viewport={{ once: true }}
                      className="bg-white p-6 rounded-lg shadow-xl border-r-4 border-blue-500 hover:shadow-2xl transition-shadow duration-300 md:mr-auto md:ml-0 mx-auto max-w-md"
                    >
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Bac pro gestion administration</h3>
                      <div className="text-blue-600 font-semibold mb-4">Gestion Administrative</div>
                      <p className="text-gray-600">Institut les tourelles | 2021-2022</p>
                      <div className="mt-4 flex">
                        <div className="px-4 py-2 bg-blue-100 rounded-lg text-sm text-blue-800 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Diplôme obtenu
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Additional education info */}
            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-6 rounded-xl shadow-lg inline-block">
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">3+</div>
                    <div className="text-sm text-gray-600">Années<br />d'études</div>
                  </div>
                  <div className="h-12 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">2</div>
                    <div className="text-sm text-gray-600">Diplômes<br />préparés</div>
                  </div>
                  <div className="h-12 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">MCO</div>
                    <div className="text-sm text-gray-600">Spécialisation<br />actuelle</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-10 left-10 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          
          {/* Decorative icons */}
          <div className="absolute bottom-40 left-40 text-blue-200 opacity-20">
            <FaBriefcase className="text-9xl" />
          </div>
          <div className="absolute top-40 right-40 text-blue-200 opacity-20 transform rotate-12">
            <FaHandshake className="text-9xl" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 inline-block relative">
              Expériences Professionnelles
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-600"
                initial={{ width: 0, left: "50%" }}
                whileInView={{ width: "100%", left: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Mon parcours professionnel m'a permis d'acquérir des compétences variées en gestion commerciale et relation client.
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline line */}
            <motion.div 
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-blue-400 to-blue-300"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true, margin: "-100px" }}
            ></motion.div>

            {/* Experience items */}
            {experienceItems.map((item, index) => (
              <motion.div 
                key={index} 
                className={`relative mb-16 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 z-10">
                  <motion.div 
                    className="w-10 h-10 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15, 
                      delay: 0.2 + index * 0.1 
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {index % 2 === 0 ? 
                      <FaBriefcase className="text-white text-sm" /> : 
                      <FaBookReader className="text-white text-sm" />
                    }
                  </motion.div>
                </div>

                {/* Date label */}
                <div className="absolute left-20 md:left-1/2 transform md:translate-x-8 top-0 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-md">
                  {item.date}
                </div>

                {/* Content card */}
                <motion.div 
                  className={`md:w-5/12 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}
                  initial={{ 
                    x: index % 2 === 0 ? -50 : 50, 
                    opacity: 0 
                  }}
                  whileInView={{ 
                    x: 0, 
                    opacity: 1 
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3 + index * 0.1 
                  }}
                  viewport={{ once: true }}
                >
                  <div className={`bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 ${index % 2 === 0 ? 'border-blue-600' : 'border-blue-400'}`}>
                    <div className="flex items-center mb-4">
                      <div className={`bg-blue-100 p-3 rounded-full mr-4 ${index % 2 !== 0 && 'md:order-2 md:ml-4 md:mr-0'}`}>
                        {index % 2 === 0 ? 
                          <FaBriefcase className="text-blue-600 text-xl" /> : 
                          <FaBookReader className="text-blue-600 text-xl" />
                        }
                      </div>
                      <div className={`${index % 2 !== 0 && 'md:text-right md:order-1'}`}>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                        <p className="text-blue-600 font-semibold">{item.subtitle}</p>
                      </div>
                    </div>

                    <div className={`mt-4 bg-gray-50 rounded-lg p-4 border-l-2 ${index % 2 === 0 ? 'border-blue-600' : 'border-blue-400'}`}>
                      <h4 className="font-semibold text-gray-700 mb-2">Missions :</h4>
                      <ul className={`space-y-2 text-gray-600 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        {item.content.map((point, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center"
                          >
                            <div className={`h-1.5 w-1.5 rounded-full bg-blue-500 mr-2 flex-shrink-0 ${index % 2 === 0 ? 'md:order-2 md:ml-2 md:mr-0' : ''}`}></div>
                            <span>{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={`mt-4 flex ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <motion.div 
                        className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium flex items-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Compétences acquises
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Summary section */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-white p-6 rounded-xl shadow-lg">
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">4+</div>
                  <div className="text-sm text-gray-600">Expériences<br />professionnelles</div>
                </div>
                <div className="h-12 w-px bg-gray-200 mx-2"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    <FaHandshake className="inline-block" />
                  </div>
                  <div className="text-sm text-gray-600">Relation<br />client</div>
                </div>
                <div className="h-12 w-px bg-gray-200 mx-2"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    <FaTools className="inline-block" />
                  </div>
                  <div className="text-sm text-gray-600">Compétences<br />techniques</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Competences Section */}
      <section id="competences" className="py-24 bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-20 right-10 transform rotate-12 opacity-10">
            <div className="text-9xl font-bold text-blue-900">MCO</div>
              </div>
          <div className="absolute top-20 left-10 text-blue-200 opacity-20">
            <FaChartBar className="text-9xl" />
            </div>

          {/* Lines */}
          <div className="absolute top-1/4 right-0 w-1/3 h-px bg-gradient-to-r from-transparent to-blue-200"></div>
          <div className="absolute bottom-1/4 left-0 w-1/3 h-px bg-gradient-to-l from-transparent to-blue-200"></div>
          </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 inline-block relative">
              Compétences
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-600"
                initial={{ width: 0, left: "50%" }}
                whileInView={{ width: "100%", left: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Mes compétences techniques et personnelles acquises au cours de ma formation et de mes expériences professionnelles.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* Skills Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {skillSets.map((skillSet, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative"
                >
                  {/* Skill Category Card */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Skill Category Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-4 flex items-center">
                      <div className="bg-white bg-opacity-25 p-3 rounded-full mr-4">
                        {index === 0 ? (
                          <FaHandshake className="text-white text-2xl" />
                        ) : index === 1 ? (
                          <FaLaptopCode className="text-white text-2xl" />
                        ) : (
                          <FaLanguage className="text-white text-2xl" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white">{skillSet.title}</h3>
                    </div>

                    {/* Skills List */}
            <div className="p-6">
                      <div className="space-y-6">
                        {skillSet.skills.map((skill, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                            viewport={{ once: true }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                                <span className="text-gray-800 font-medium">{skill.name}</span>
              </div>
                              <span className="text-blue-600 font-semibold">{skill.level}%</span>
            </div>
                            
                            <div className="relative">
                              {/* Background bar */}
                              <div className="w-full bg-gray-100 rounded-full h-3">
                                {/* Progress bar */}
                                <motion.div 
                                  className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 relative"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  transition={{ 
                                    duration: 1.2, 
                                    delay: 0.4 + (i * 0.1),
                                    ease: "easeOut"
                                  }}
                                  viewport={{ once: true }}
                                >
                                  {/* Animated dot at the end of progress bar */}
                                  <motion.div 
                                    className="absolute -right-1.5 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border-2 border-blue-600 rounded-full"
                                    animate={{ 
                                      scale: [1, 1.2, 1],
                                      opacity: [1, 0.8, 1]
                                    }}
                                    transition={{ 
                                      repeat: Infinity, 
                                      duration: 2,
                                      delay: 1 + (i * 0.1)
                                    }}
                                  />
                                </motion.div>
                              </div>

                              {/* Level indicators */}
                              <div className="flex justify-between mt-1 px-2">
                                <span className="text-xs text-gray-500">Débutant</span>
                                <span className="text-xs text-gray-500">Intermédiaire</span>
                                <span className="text-xs text-gray-500">Expert</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills Summary */}
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-xl shadow-lg inline-block">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Domaines de compétence</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <FaHandshake className="text-blue-600 text-2xl" />
                    </div>
                    <span className="text-gray-700 font-medium">Communication</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <FaLaptopCode className="text-blue-600 text-2xl" />
                    </div>
                    <span className="text-gray-700 font-medium">Informatique</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <FaNetworkWired className="text-blue-600 text-2xl" />
                    </div>
                    <span className="text-gray-700 font-medium">Gestion</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <FaLightbulb className="text-blue-600 text-2xl" />
                    </div>
                    <span className="text-gray-700 font-medium">Innovation</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-0 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
          <div className="absolute bottom-1/4 right-0 w-1/3 h-px bg-gradient-to-l from-blue-200 to-transparent"></div>
          
          <div className="absolute -bottom-10 right-10 text-blue-100 opacity-20 transform rotate-12">
            <FaEnvelope className="text-9xl" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 inline-block relative">
              Contact
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-600"
                initial={{ width: 0, left: "50%" }}
                whileInView={{ width: "100%", left: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              N'hésitez pas à me contacter pour toute opportunité de stage ou de collaboration.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* Contact Info Section */}
                <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-400 text-white p-8 relative">
                  {/* Decorative shapes */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-tr-full"></div>
                  
                  <motion.h3 
                    className="text-2xl font-bold mb-6 border-b border-white border-opacity-20 pb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Mes Coordonnées
                  </motion.h3>
                  
                  <div className="space-y-6">
                    <motion.div 
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="bg-white bg-opacity-20 p-3 rounded-full flex-shrink-0">
                        <FaMapMarkerAlt className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white opacity-80">Adresse</p>
                        <p className="text-white text-opacity-90">22 Rue saint Maur 76000 Rouen</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="bg-white bg-opacity-20 p-3 rounded-full flex-shrink-0">
                        <FaPhone className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white opacity-80">Téléphone</p>
                        <p className="text-white text-opacity-90">06 51 10 43 34</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="bg-white bg-opacity-20 p-3 rounded-full flex-shrink-0">
                        <FaEnvelope className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white opacity-80">Email</p>
                        <p className="text-white text-opacity-90">salamsaibou2002@gmail.com</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="bg-white bg-opacity-20 p-3 rounded-full flex-shrink-0">
                        <FaUserGraduate className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white opacity-80">Formation</p>
                        <p className="text-white text-opacity-90">BTS MCO - Institut Les Tourelles</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-white text-opacity-80 mb-4">Retrouvez-moi sur les réseaux</p>
                    <div className="flex space-x-4">
                      <motion.a 
                        href="https://github.com/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-white bg-opacity-20 p-3 rounded-full text-white hover:bg-opacity-30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub size={20} />
                      </motion.a>
                      <motion.a 
                        href="https://linkedin.com/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-white bg-opacity-20 p-3 rounded-full text-white hover:bg-opacity-30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaLinkedin size={20} />
                      </motion.a>
                      <motion.a 
                        href="mailto:salamsaibou2002@gmail.com" 
                        className="bg-white bg-opacity-20 p-3 rounded-full text-white hover:bg-opacity-30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaEnvelope size={20} />
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
                
                {/* Contact Form Section */}
                <div className="lg:col-span-3 p-8">
                  <motion.h3 
                    className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Envoyez-moi un message
                  </motion.h3>
                  
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Nom complet</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <input 
                            type="text" 
                            id="name" 
                            className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="John Doe"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Adresse email</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <input 
                            type="email" 
                            id="email" 
                            className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="exemple@email.com"
                          />
                        </div>
                      </motion.div>
                    </div>

                    <motion.div 
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="subject" className="block text-gray-700 mb-2 font-medium">Sujet</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                          </svg>
                        </div>
                        <input 
                          type="text" 
                          id="subject" 
                          className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="Objet de votre message"
                        />
                      </div>
                    </motion.div>

                    <motion.div 
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Message</label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        </div>
                        <textarea 
                          id="message" 
                          rows={4} 
                          className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="Votre message ici..."
                        ></textarea>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      viewport={{ once: true }}
                      className="flex justify-end"
                    >
                      <motion.button 
                        type="submit" 
                        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Envoyer</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Map or additional contact info could go here */}
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-20"
          aria-label="Remonter en haut"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-overlay opacity-10"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-400 rounded-full mix-blend-overlay opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* Logo and description */}
            <div className="md:col-span-5">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center mb-4"
              >
                <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg mr-3 flex items-center justify-center text-white font-bold">
                  S
                </div>
                <h3 className="text-xl font-bold">SAIBOU ABDOU SALAM</h3>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-300 mb-6"
              >
                Étudiant passionné en BTS MCO avec une solide expérience en gestion de la relation client et techniques commerciales. En recherche active de stage pour mettre en pratique mes compétences.
              </motion.p>
              
              {/* Social links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex space-x-4"
              >
                <motion.a 
                  href="https://github.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gray-700 bg-opacity-50 p-3 rounded-full text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub size={18} />
                </motion.a>
                <motion.a 
                  href="https://linkedin.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gray-700 bg-opacity-50 p-3 rounded-full text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin size={18} />
                </motion.a>
                <motion.a 
                  href="mailto:salamsaibou2002@gmail.com" 
                  className="bg-gray-700 bg-opacity-50 p-3 rounded-full text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope size={18} />
                </motion.a>
              </motion.div>
            </div>
            
            {/* Quick Links */}
            <div className="md:col-span-2">
              <motion.h4 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg font-semibold mb-4 text-blue-300"
              >
                Navigation
              </motion.h4>
              <motion.ul 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <li>
                  <a href="#accueil" className="text-gray-300 hover:text-white hover:underline transition-colors">Accueil</a>
                </li>
                <li>
                  <a href="#a-propos" className="text-gray-300 hover:text-white hover:underline transition-colors">À propos</a>
                </li>
                <li>
                  <a href="#formation" className="text-gray-300 hover:text-white hover:underline transition-colors">Formation</a>
                </li>
                <li>
                  <a href="#experience" className="text-gray-300 hover:text-white hover:underline transition-colors">Expérience</a>
                </li>
                <li>
                  <a href="#competences" className="text-gray-300 hover:text-white hover:underline transition-colors">Compétences</a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-white hover:underline transition-colors">Contact</a>
                </li>
              </motion.ul>
            </div>
            
            {/* Contact Info */}
            <div className="md:col-span-3">
              <motion.h4 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg font-semibold mb-4 text-blue-300"
              >
                Contact
              </motion.h4>
              <motion.ul 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <li className="flex items-start">
                  <div className="text-blue-400 mr-3 mt-1">
                    <FaMapMarkerAlt />
                  </div>
                  <span className="text-gray-300">22 Rue saint Maur 76000 Rouen</span>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-400 mr-3 mt-1">
                    <FaPhone />
                  </div>
                  <span className="text-gray-300">06 51 10 43 34</span>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-400 mr-3 mt-1">
                    <FaEnvelope />
                  </div>
                  <span className="text-gray-300">salamsaibou2002@gmail.com</span>
                </li>
              </motion.ul>
            </div>
            
            {/* Formation */}
            <div className="md:col-span-2">
              <motion.h4 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg font-semibold mb-4 text-blue-300"
              >
                Formation
              </motion.h4>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-white font-medium">BTS MCO</p>
                <p className="text-gray-300 text-sm">Management Commercial Opérationnel</p>
                <p className="text-gray-400 text-sm mt-2">Institut Les Tourelles</p>
              </motion.div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-8"></div>
          
          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm"
            >
              © {new Date().getFullYear()} SAIBOU ABDOU SALAM - Tous droits réservés
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-4 md:mt-0"
            >
              <button 
                onClick={scrollToTop}
                className="text-gray-300 hover:text-white transition-colors flex items-center text-sm"
              >
                <span>Retour en haut</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}

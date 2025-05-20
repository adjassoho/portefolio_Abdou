'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaEnvelope, FaPhone, FaLinkedin, FaDownload, FaCode, FaLaptopCode, FaPaintBrush, FaMobileAlt, FaBuilding, FaUserTie } from 'react-icons/fa';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import SectionTitle from './SectionTitle';
import FloatingCard from './FloatingCard';

const AboutSection = () => {
  return (
    <section id="a-propos" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-100 dark:bg-indigo-900/20 rounded-bl-full opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-100 dark:bg-blue-900/20 rounded-tr-full opacity-50"></div>
      
      <motion.div
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-200 to-blue-200 dark:from-indigo-800/40 dark:to-blue-800/40 blur-3xl opacity-50"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-gradient-to-tr from-blue-200 to-indigo-200 dark:from-blue-800/40 dark:to-indigo-800/40 blur-3xl opacity-50"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          title="À Propos" 
          subtitle="Qui suis-je ?" 
          description="Découvrez mon parcours, mes objectifs et mes compétences"
        />
        
        <div className="grid md:grid-cols-12 gap-8 items-center mt-10">
          {/* Profile Image Column - Simplifié pour mobile */}
          <motion.div 
            className="md:col-span-5 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Main profile image - avec bordure améliorée */}
              <motion.div 
                className="relative h-72 w-72 sm:h-96 sm:w-96 rounded-2xl overflow-hidden border-4 border-white shadow-xl"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.25)"
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/profil.jpg"
                  alt="SAIBOU ABDOU SALAM"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 hover:scale-[1.03]"
                />
                
                {/* Overlay gradient */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                />
                
                {/* Name overlay at bottom */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-bold text-lg">SAIBOU ABDOU SALAM</h3>
                  <p className="text-sm opacity-90">Co-Fondateur de Fiabilitech</p>
                </motion.div>
              </motion.div>
              
              {/* Ajout d'un halo lumineux autour de l'image au lieu du bloc décoratif */}
              <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl blur-md -z-10 opacity-50" />
            </div>
          </motion.div>
          
          {/* Content Column */}
          <motion.div 
            className="md:col-span-7"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">SAIBOU ABDOU SALAM</h2>
                <div className="flex flex-wrap items-center gap-y-2">
                  <h3 className="text-xl text-blue-600 font-medium">Étudiant en Bachelor Supply Chain</h3>
                  <span className="mx-3 text-gray-400 hidden sm:inline">|</span>
                  <h3 className="text-xl text-indigo-600 font-medium">Co-Fondateur Fiabilitech</h3>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                Actuellement en formation Bachelor Supply Chain, je suis à la recherche d'une alternance me permettant de mettre en pratique mes compétences commerciales , managériales et logistique. Passionné par le monde du commerce et doté d'un excellent sens relationnel, je souhaite m'investir pleinement dans une entreprise dynamique pour développer mon expérience professionnelle.
              </p>
              
              {/* Fiabilitech section */}
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-indigo-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full p-2">
                    <FaCode className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">À propos de Fiabilitech</h3>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Co-fondateur de Fiabilitech, une agence de développement web et mobile spécialisée dans la création de designs graphiques et de maquettes UI/UX. Chez Fiabilitech, nous combinons expertise technique et vision commerciale pour offrir des solutions digitales complètes et innovantes.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-1.5 rounded-full">
                      <FaCode className="text-blue-600" />
                    </div>
                    <span className="text-gray-700 text-sm">Développement Web</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-100 p-1.5 rounded-full">
                      <FaCode className="text-purple-600" />
                    </div>
                    <span className="text-gray-700 text-sm">Apps Mobile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-pink-100 p-1.5 rounded-full">
                      <FaCode className="text-pink-600" />
                    </div>
                    <span className="text-gray-700 text-sm">Design UI/UX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 p-1.5 rounded-full">
                      <FaCode className="text-green-600" />
                    </div>
                    <span className="text-gray-700 text-sm">Solutions Business</span>
                  </div>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <FloatingCard 
                  className="bg-white p-5"
                  hoverScale={1.03}
                  rotateIntensity={0.5}
                  highlight={true}
                  glowColor="rgba(79, 70, 229, 0.3)"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Informations personnelles</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center text-gray-600">
                      <FaCalendarAlt className="mr-3 text-blue-600" />
                      <span>23 ans</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <FaEnvelope className="mr-3 text-blue-600" />
                      <a href="mailto:salamsaibou2002@gmail.com" className="hover:text-blue-600 transition-colors">
                        salamsaibou2002@gmail.com
                      </a>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <FaPhone className="mr-3 text-blue-600" />
                      <a href="tel:+33767438781" className="hover:text-blue-600 transition-colors">
                        +33 7 67 43 87 81
                      </a>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <FaLinkedin className="mr-3 text-blue-600" />
                      <a href="#" className="hover:text-blue-600 transition-colors">
                        linkedin.com/in/saibou-abdou-salam
                      </a>
                    </li>
                  </ul>
                </FloatingCard>
                
                <FloatingCard 
                  className="bg-white p-5"
                  hoverScale={1.03}
                  rotateIntensity={0.5}
                  highlight={true}
                  borderColor="border-blue-600"
                  glowColor="rgba(59, 130, 246, 0.3)"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Objectifs professionnels</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 bg-blue-600 rounded-full mt-2 mr-2"></span>
                      <span className="text-gray-600">Valider mon Bachelor Supply Chain avec excellence</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 bg-blue-600 rounded-full mt-2 mr-2"></span>
                      <span className="text-gray-600">Acquérir des compétences en optimisation de la politique de gestion et d'approvisionnement d'une organisation en vu de ma formation Bachelor Supply Chain </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 bg-blue-600 rounded-full mt-2 mr-2"></span>
                      <span className="text-gray-600">Développer mon réseau professionnel</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 bg-blue-600 rounded-full mt-2 mr-2"></span>
                      <span className="text-gray-600">Poursuivre vers un master professionnelle</span>
                    </li>
                  </ul>
                </FloatingCard>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-start gap-4">
                <motion.a 
                  href="#" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-full hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload />
                  Télécharger mon CV
                </motion.a>
                
                <motion.a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 font-medium rounded-full hover:bg-indigo-50 transition-all shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Me contacter
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Interests section with enhanced styling */}
        <motion.div 
          className="mt-16 bg-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Background decoration */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 dark:bg-indigo-900/20 rounded-full opacity-50"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-50"></div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center relative z-10">Centres d'intérêt</h3>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 relative z-10">
            {[
              { name: "Sport", icon: "🏃‍♂️", color: "bg-green-100 text-green-800 border-green-300" },
              { name: "Lecture", icon: "📚", color: "bg-blue-100 text-blue-800 border-blue-300" },
              { name: "Voyages", icon: "✈️", color: "bg-purple-100 text-purple-800 border-purple-300" },
              { name: "Nouvelles technologies", icon: "💻", color: "bg-gray-100 text-gray-800 border-gray-300" },
              { name: "Cuisine", icon: "🍳", color: "bg-amber-100 text-amber-800 border-amber-300" },
              { name: "Musique", icon: "🎵", color: "bg-red-100 text-red-800 border-red-300" },
              { name: "Design", icon: "🎨", color: "bg-pink-100 text-pink-800 border-pink-300" },
              { name: "Entrepreneuriat", icon: "💼", color: "bg-indigo-100 text-indigo-800 border-indigo-300" }
            ].map((interest, index) => (
              <motion.div 
                key={interest.name}
                className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border ${interest.color} flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md transition-shadow`}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                viewport={{ once: true }}
              >
                <span className="text-base sm:text-xl">{interest.icon}</span>
                <span className="font-medium text-sm sm:text-base">{interest.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Quote section */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Light effect */}
          <motion.div 
            className="absolute inset-0 bg-white opacity-0"
            animate={{ 
              opacity: [0, 0.1, 0],
              left: ["-100%", "100%"] 
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 5
            }}
          />
          
          <blockquote className="relative py-4 sm:py-6 px-4 sm:px-8 text-center z-10">
            <svg className="absolute top-0 left-0 h-12 sm:h-16 w-12 sm:w-16 text-white/10 -z-10 transform -translate-x-6 -translate-y-6" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="text-lg sm:text-xl italic leading-relaxed mb-4">
              "Je suis jeune, déterminé et motivé. Je m’intègre facilement au sein d’une équipe et suis à la recherche d’expériences enrichissantes dans un environnement stimulant, qui me permette d’élargir mes compétences et d’explorer divers domaines et secteurs d’activité."
            </p>
            <footer className="font-semibold">- SAIBOU ABDOU SALAM</footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection; 
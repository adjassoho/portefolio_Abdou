'use client';

import { motion } from 'framer-motion';
import { FaBoxes, FaDigitalTachograph, FaRocket, FaBullseye, FaPencilRuler, FaCode } from 'react-icons/fa';
import SectionTitle from './SectionTitle';
import GlassCard from './GlassCard';

const AboutSection = () => {
  const highlightStyle = "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 font-semibold";

  return (
    <section id="a-propos" className="py-20 bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-100 dark:bg-indigo-900/20 rounded-bl-full opacity-30 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-100 dark:bg-blue-900/20 rounded-tr-full opacity-50 blur-2xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          title="À Propos de Moi" 
          subtitle="Mon Projet Professionnel" 
          description="Découvrez ma vision, mes objectifs et comment je peux apporter de la valeur."
        />
        
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Main Content */}
          <motion.div 
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Introduction */}
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center">
              Étudiant en <span className={highlightStyle}>Bachelor Supply Chain</span>, je recherche une alternance pour explorer l'intersection passionnante entre <span className={highlightStyle}>logistique et digital</span>. Passionné par le <span className={highlightStyle}>développement web et mobile</span>, je souhaite mettre mes compétences techniques au service de l'<span className={highlightStyle}>innovation dans la supply chain</span>.
            </p>

            {/* Projet & Objectifs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <GlassCard
                blur="backdrop-blur-lg"
                className="p-6 h-full"
                border
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-gradient-to-br from-indigo-500 to-blue-500 p-3 rounded-lg text-white">
                    <FaPencilRuler size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Projet</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Contribuer à l'<span className="font-semibold text-gray-700 dark:text-gray-300">automatisation des processus</span>, développer des <span className="font-semibold text-gray-700 dark:text-gray-300">outils digitaux</span> (tracking, gestion de stock) ou améliorer des <span className="font-semibold text-gray-700 dark:text-gray-300">interfaces utilisateurs</span> pour les solutions logistiques.
                </p>
              </GlassCard>

              <GlassCard
                blur="backdrop-blur-lg"
                className="p-6 h-full"
                border
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-gradient-to-br from-green-500 to-teal-500 p-3 rounded-lg text-white">
                    <FaBullseye size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Objectif</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Un stage où je pourrais allier <span className="font-semibold text-gray-700 dark:text-gray-300">rigueur supply chain</span> et <span className="font-semibold text-gray-700 dark:text-gray-300">créativité tech</span> pour des projets concrets.
                </p>
              </GlassCard>
            </div>

            {/* Personal Touch */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <GlassCard
                blur="backdrop-blur-xl"
                className="p-6 text-center"
                gradientBorder
                glow
                interactive
              >
                <div className="flex justify-center items-center gap-3 text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  <FaCode className="text-indigo-400" />
                  <span>→</span>
                  <FaBoxes className="text-blue-400" />
                </div>
                <p className="text-xl text-gray-700 dark:text-gray-200 italic">
                  "Du code à la chaîne logistique, je transforme les <span className={highlightStyle}>lignes de commande</span> en <span className={highlightStyle}>solutions concrètes</span> !"
                  <span role="img" aria-label="rocket" className="ml-2">🚀</span>
                </p>
              </GlassCard>
            </motion.div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection; 
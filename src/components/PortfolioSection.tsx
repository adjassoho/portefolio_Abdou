'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCode, FaFileAlt, FaGlobe, FaShoppingCart, FaHome, FaTshirt } from 'react-icons/fa';
import FloatingCard from './FloatingCard';
import SectionTitle from './SectionTitle';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  type: 'web' | 'ecommerce' | 'immobilier';
  imageUrl?: string;
  website?: string;
}

const PortfolioSection = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "DIM",
      description: "Nous avons développé une boutique en ligne complète pour DIM, une marque emblématique de lingerie française qui souhaitait optimiser son expérience de vente en ligne. Notre approche a combiné un design élégant et moderne reflétant l'identité premium de la marque avec une expérience utilisateur soigneusement optimisée pour maximiser les conversions.",
      tags: ["E-commerce", "Responsive", "UX/UI", "Gestion de stock", "Click & Collect"],
      type: "ecommerce",
      imageUrl: "/images/DIM.png",
      website: "https://www.dim.com/"
    },
    {
      id: 2,
      title: "By G2S Immobilier",
      description: "By G2S Immobilier, une agence immobilière basée à Bondy Paris, souhaitait développer une présence en ligne reflétant son expertise et permettant de présenter son portefeuille de biens. Notre équipe a conçu un site web élégant et fonctionnel mettant en valeur les propriétés disponibles et facilitant le contact avec les clients potentiels.",
      tags: ["Immobilier", "Recherche avancée", "Galerie photo", "Responsive"],
      type: "immobilier",
      imageUrl: "/images/G2S.png",
      website: "https://www.byg2simmobilier.fr/"
    },
    {
      id: 3,
      title: "Maxi Meubles",
      description: "Maxi Meubles souhaitait lancer une boutique en ligne pour commercialiser leur gamme de mobilier design à prix abordable. Notre équipe a conçu une plateforme e-commerce complète, mettant en valeur leur catalogue de produits et optimisant l'expérience d'achat pour maximiser les conversions.",
      tags: ["E-commerce", "Mobilier", "UX/UI", "Catalogue produit", "Responsive"],
      type: "ecommerce",
      imageUrl: "/images/Maxi.png",
      website: "https://www.maxi-meubles.fr/"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'web': return <FaGlobe className="text-blue-600" />;
      case 'ecommerce': return <FaShoppingCart className="text-green-600" />;
      case 'immobilier': return <FaHome className="text-purple-600" />;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'web': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'ecommerce': return 'bg-green-100 text-green-800 border-green-300';
      case 'immobilier': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Portfolio"
          subtitle="Projets et réalisations"
          description="Découvrez les sites web développés par Fiablitech"
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map(project => (
            <motion.div key={project.id} variants={itemVariants}>
              <FloatingCard 
                highlight 
                parallaxLayers 
                hoverScale={1.03} 
                rotateIntensity={0.8}
                borderColor={
                  project.type === 'web' ? 'border-blue-600' :
                  project.type === 'ecommerce' ? 'border-green-600' :
                  'border-purple-600'
                }
                glowColor={
                  project.type === 'web' ? 'rgba(59, 130, 246, 0.2)' :
                  project.type === 'ecommerce' ? 'rgba(22, 163, 74, 0.2)' :
                  'rgba(147, 51, 234, 0.2)'
                }
                className="h-full bg-white"
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(project.type)}
                      <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getTypeColor(project.type)}`}>
                        {project.type === 'web' ? 'Site web' :
                         project.type === 'ecommerce' ? 'E-commerce' :
                         'Immobilier'}
                      </span>
                    </div>
                  </div>
                  
                  {project.imageUrl && (
                    <div className="mb-4 -mx-6 -mt-6">
                      <div 
                        className="h-48 bg-cover bg-center rounded-t-lg"
                        style={{ backgroundImage: `url(${project.imageUrl})` }}
                      />
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {project.website && (
                    <a 
                      href={project.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
                    >
                      <FaGlobe size={14} />
                      Visiter le site
                    </a>
                  )}
                </div>
              </FloatingCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection; 
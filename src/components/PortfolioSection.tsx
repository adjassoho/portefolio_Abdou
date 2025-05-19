'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCode, FaFileAlt } from 'react-icons/fa';
import FloatingCard from './FloatingCard';
import SectionTitle from './SectionTitle';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  type: 'academic' | 'professional' | 'personal' | 'certification';
  imageUrl?: string;
}

const PortfolioSection = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Études de marché - U Express",
      description: "Analyse approfondie du marché local pour identifier les opportunités et améliorer les offres commerciales",
      tags: ["Recherche", "Analyse de données", "Marketing"],
      type: "professional",
      imageUrl: "/images/supply-chain-background.jpg"
    },
    {
      id: 2,
      title: "Gestion documentaire - Les TOURELLES",
      description: "Optimisation du système de classification et de gestion documentaire de la bibliothèque",
      tags: ["Organisation", "Gestion", "Documentation"],
      type: "professional",
      imageUrl: "/images/fiablitech-background.jpg"
    },
    {
      id: 3,
      title: "Certification commerciale",
      description: "Obtention du certificat en techniques commerciales avancées",
      tags: ["Vente", "Négociation", "Certifications"],
      type: "certification",
      imageUrl: "/images/certificates/certificate-commercial.jpg"
    },
    {
      id: 4,
      title: "Projet Bachelor Supply Chain",
      description: "Développement d'une stratégie omnicanale pour une enseigne locale",
      tags: ["Stratégie", "Commerce", "Digital"],
      type: "academic"
    },
    {
      id: 5,
      title: "Certification PIX",
      description: "Validation des compétences numériques via la plateforme PIX",
      tags: ["Numérique", "Compétences", "Certifications"],
      type: "certification",
      imageUrl: "/images/certificates/certificate-pix.jpg"
    }
  ];

  const filteredProjects = filter
    ? projects.filter(project => project.type === filter)
    : projects;

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
      case 'academic': return <FaGraduationCap className="text-blue-600" />;
      case 'professional': return <FaBriefcase className="text-green-600" />;
      case 'personal': return <FaCode className="text-purple-600" />;
      case 'certification': return <FaFileAlt className="text-amber-600" />;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'professional': return 'bg-green-100 text-green-800 border-green-300';
      case 'personal': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'certification': return 'bg-amber-100 text-amber-800 border-amber-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Portfolio"
          subtitle="Projets et réalisations"
          description="Découvrez mes projets académiques, professionnels et certifications"
        />

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
              ${filter === null 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}
          >
            Tous
          </button>
          <button
            onClick={() => setFilter('academic')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
              ${filter === 'academic' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}
          >
            <FaGraduationCap /> Académiques
          </button>
          <button
            onClick={() => setFilter('professional')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
              ${filter === 'professional' 
                ? 'bg-green-600 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}
          >
            <FaBriefcase /> Professionnels
          </button>
          <button
            onClick={() => setFilter('certification')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
              ${filter === 'certification' 
                ? 'bg-amber-600 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}
          >
            <FaFileAlt /> Certifications
          </button>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filteredProjects.map(project => (
            <motion.div key={project.id} variants={itemVariants}>
              <FloatingCard 
                highlight 
                parallaxLayers 
                hoverScale={1.03} 
                rotateIntensity={0.8}
                borderColor={
                  project.type === 'academic' ? 'border-blue-600' :
                  project.type === 'professional' ? 'border-green-600' :
                  project.type === 'personal' ? 'border-purple-600' :
                  'border-amber-600'
                }
                glowColor={
                  project.type === 'academic' ? 'rgba(59, 130, 246, 0.2)' :
                  project.type === 'professional' ? 'rgba(22, 163, 74, 0.2)' :
                  project.type === 'personal' ? 'rgba(147, 51, 234, 0.2)' :
                  'rgba(217, 119, 6, 0.2)'
                }
                className="h-full bg-white"
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(project.type)}
                      <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getTypeColor(project.type)}`}>
                        {project.type === 'academic' ? 'Académique' :
                         project.type === 'professional' ? 'Professionnel' :
                         project.type === 'personal' ? 'Personnel' : 'Certification'}
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
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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
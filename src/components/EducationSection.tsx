'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaBook, FaBuilding } from 'react-icons/fa';
import SectionTitle from './SectionTitle';
import FloatingCard from './FloatingCard';

interface Education {
  id: string;
  title: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  skills: string[];
  icon: React.ReactNode;
  color: string;
  image?: string;
}

const EducationSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const educationData: Education[] = [
    {
      id: 'bts-mco',
      title: 'BTS Management Commercial Opérationnel',
      institution: 'Institut Les TOURELLES',
      location: 'Rouen',
      period: '2023 - 2025',
      description: 'Formation en gestion d\'unité commerciale, management d\'équipe, gestion de la relation client, et animation et dynamisation de l\'offre commerciale.',
      skills: [
        'Développement de la relation client',
        'Animation et dynamisation de l\'offre commerciale',
        'Management opérationnel de l\'équipe commerciale',
        'Gestion opérationnelle',
        'Communication commerciale'
      ],
      icon: <FaGraduationCap size={24} />,
      color: 'bg-blue-600',
      image: '/images/fiablitech-background.jpg'
    },
    {
      id: 'bac',
      title: 'Bac Professionnel Gestion Administrative',
      institution: 'Institut Les TOURELLES',
      location: 'Rouen',
      period: '2019 - 2022',
      description: 'Baccalauréat Sciences et Technologies du Management et de la Gestion, spécialité Ressources Humaines et Communication.',
      skills: [
        'Économie et droit',
        'Management des organisations',
        'Sciences de gestion',
        'Communication',
        'Gestion des ressources humaines'
      ],
      icon: <FaGraduationCap size={24} />,
      color: 'bg-indigo-600',
      image: '/images/supply-chain-background.jpg'
    },
    {
      id: 'cert-commercial',
      title: 'Certification Techniques Commerciales',
      institution: 'Centre de Formation Professionnelle',
      location: 'Rouen',
      period: '2023',
      description: 'Certification professionnelle sur les techniques de vente et négociation commerciale.',
      skills: [
        'Techniques de vente',
        'Négociation commerciale',
        'Gestion de la relation client',
        'Prospection commerciale'
      ],
      icon: <FaCertificate size={24} />,
      color: 'bg-green-600',
      image: '/images/certificates/certificate-commercial.jpg'
    },
    {
      id: 'cert-pix',
      title: 'Certification PIX',
      institution: 'Plateforme nationale',
      location: 'Formation en ligne',
      period: '2022',
      description: 'Certification des compétences numériques selon le référentiel européen DIGCOMP.',
      skills: [
        'Maîtrise des outils numériques',
        'Communication et collaboration',
        'Création de contenu digital',
        'Protection des données',
        'Résolution de problèmes techniques'
      ],
      icon: <FaCertificate size={24} />,
      color: 'bg-purple-600',
      image: '/images/certificates/certificate-pix.jpg'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      } 
    })
  };

  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      } 
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="formation" className="py-20 bg-white">
      <div className="container mx-auto px-4" ref={sectionRef}>
        <SectionTitle 
          title="Formation" 
          subtitle="Mon parcours académique" 
          description="Découvrez mon parcours de formation et les compétences acquises"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="h-full"
            >
              <FloatingCard 
                className="h-full bg-white"
                highlight
                borderColor={item.color.replace('bg-', 'border-')}
              >
                <div className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-2 rounded-lg ${item.color} text-white`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                      <div className="flex items-center text-gray-600">
                        <FaBuilding className="mr-1" />
                        <span className="mr-2">{item.institution}</span>
                        <span className="text-gray-400">|</span>
                        <span className="ml-2">{item.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full inline-block mb-4 w-fit">
                    <FaBook className="inline mr-1" />
                    {item.period}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4">{item.description}</p>

                  {/* Toggle button */}
                  <div className="mt-auto">
                    <button
                      onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                      className={`text-sm font-medium flex items-center gap-1 ${item.color.replace('bg-', 'text-')} hover:underline transition-all`}
                    >
                      {activeId === item.id ? 'Masquer les détails' : 'Voir les compétences'}
                      <svg
                        className={`w-4 h-4 transition-transform ${activeId === item.id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>

                    {/* Detailed skills */}
                    {activeId === item.id && (
                      <motion.div
                        variants={detailsVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-4 pt-4 border-t border-gray-100"
                      >
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Compétences acquises:</h4>
                        <ul className="space-y-2">
                          {item.skills.map((skill, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start text-sm text-gray-600"
                            >
                              <span className="inline-block h-2 w-2 bg-indigo-600 rounded-full mt-2 mr-2" />
                              <span>{skill}</span>
                            </motion.li>
                          ))}
                        </ul>

                        {item.image && (
                          <div className="mt-4 rounded-lg overflow-hidden">
                            <motion.img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-auto max-h-48 object-cover"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            />
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </FloatingCard>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-xl italic text-gray-700 relative py-6 px-8">
            <svg className="absolute top-0 left-0 h-16 w-16 text-gray-100 -z-10" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p>La formation que je suis actuellement me permet d'acquérir les compétences essentielles pour évoluer dans le secteur commercial. Je m'efforce constamment d'enrichir mes connaissances pour être prêt à relever les défis du monde professionnel.</p>
            <footer className="mt-4 font-semibold text-gray-800">- SAIBOU ABDOU SALAM</footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection; 
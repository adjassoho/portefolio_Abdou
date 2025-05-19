'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaShoppingCart, 
  FaUserTie, 
  FaChartLine, 
  FaTools, 
  FaLanguage, 
  FaLaptop,
  FaHeadset
} from 'react-icons/fa';

interface Skill {
  name: string;
  level: number;
  description: string;
  icon: React.ReactNode;
  category: 'commercial' | 'technical' | 'language';
  color: string;
}

const InteractiveSkills = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    // Compétences commerciales
    {
      name: "Communication client",
      level: 90,
      description: "Capacité à communiquer efficacement avec les clients et comprendre leurs besoins",
      icon: <FaHeadset />,
      category: 'commercial',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      name: "Vente omnicanal",
      level: 75,
      description: "Maîtrise des techniques de vente à travers différents canaux (physique, digital)",
      icon: <FaShoppingCart />,
      category: 'commercial',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      name: "Études commerciales",
      level: 70,
      description: "Analyse et exploitation des études de marché et comportements clients",
      icon: <FaChartLine />,
      category: 'commercial',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      name: "Relation client",
      level: 85,
      description: "Développement et maintien de relations durables avec la clientèle",
      icon: <FaUserTie />,
      category: 'commercial',
      color: 'from-blue-500 to-indigo-600'
    },
    
    // Compétences techniques
    {
      name: "Outils bureautiques",
      level: 85,
      description: "Maîtrise des logiciels de bureautique (Word, Excel, PowerPoint)",
      icon: <FaLaptop />,
      category: 'technical',
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: "Technologies de l'information",
      level: 70,
      description: "Utilisation des outils numériques et plateformes de gestion commerciale",
      icon: <FaTools />,
      category: 'technical',
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: "Veille informationnelle",
      level: 75,
      description: "Suivi des tendances et évolutions du secteur commercial",
      icon: <FaChartLine />,
      category: 'technical',
      color: 'from-green-500 to-emerald-600'
    },
    
    // Compétences linguistiques
    {
      name: "Français",
      level: 100,
      description: "Maîtrise parfaite de la langue à l'oral et à l'écrit",
      icon: <FaLanguage />,
      category: 'language',
      color: 'from-purple-500 to-pink-600'
    },
    {
      name: "Anglais",
      level: 70,
      description: "Niveau intermédiaire, capable de communiquer dans un contexte professionnel",
      icon: <FaLanguage />,
      category: 'language',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const filteredSkills = activeCategory 
    ? skills.filter(skill => skill.category === activeCategory)
    : skills;

  const getCategoryName = (category: string) => {
    switch(category) {
      case 'commercial': return 'Commerciales';
      case 'technical': return 'Techniques';
      case 'language': return 'Linguistiques';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'commercial': return 'bg-blue-600';
      case 'technical': return 'bg-green-600';
      case 'language': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="py-10">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveCategory(null)}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm
            ${!activeCategory 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
        >
          Toutes les compétences
        </motion.button>
        
        {Array.from(new Set(skills.map(s => s.category))).map(category => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm
              ${activeCategory === category 
                ? `${getCategoryColor(category)} text-white shadow-md` 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
          >
            Compétences {getCategoryName(category)}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full bg-gradient-to-br ${skill.color} text-white`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{skill.name}</h3>
                </div>
                <span className="text-sm font-semibold bg-gray-100 text-gray-700 py-1 px-2 rounded-full">
                  {skill.level}%
                </span>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 text-sm">{skill.description}</p>
              </div>
              
              <div className="relative h-2 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>

              {/* Hover effect */}
              {hoveredSkill === skill.name && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-900/10 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InteractiveSkills; 
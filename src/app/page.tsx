'use client';

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';

// Composants principaux
import Navbar from "../components/Navbar";
// import HeroSection from "../components/HeroSection";
import HeroSectionNew from "../components/HeroSectionNew";
import AboutSection from "../components/AboutSection";
import EducationSection from "../components/EducationSection";
import PortfolioSection from "../components/PortfolioSection";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import InteractiveSkills from "../components/InteractiveSkills";
import SectionTitle from "../components/SectionTitle";

// Import dynamique pour le fond de particules (évite les erreurs côté serveur)
const ParticlesBackground = dynamic(
  () => import('../components/ParticlesBackground'),
  { ssr: false }
);

// Import dynamique pour la timeline (évite les erreurs côté serveur)
const AnimatedTimeline = dynamic(
  () => import('../components/AnimatedTimeline'),
  { ssr: false }
);

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Timeline items pour la section expérience
  const experienceItems = [
    {
      id: "agencegare",
      title: "Agence immobilière « Agence de la gare »",
      subtitle: "Alternance Immobilier",
      location: "Rouen",
      date: "2024-2025",
      content: [
        "Accueil et orientation des clients : premier point de contact à l'entrée de l'agence",
        "Organisation de visites guidées : accompagnement des clients lors des visites de biens",
        "Estimation de biens immobiliers : participation à l'évaluation de la valeur des propriétés",
        "Gestion administrative : suivi et mise à jour des dossiers clients",
        "Communication digitale : gestion des réseaux sociaux de l'agence",
        "Prospection commerciale : recherche de nouveaux clients et prise de mandats",
        "Valorisation des biens : mise en valeur des annonces en vitrine"
      ],
      color: "border-indigo-600",
    },
    {
      id: "carrefour",
      title: "Carrefour express",
      subtitle: "Stage de 8 semaines",
      location: "Rouen",
      date: "2023-2024",
      content: [
        "Compétences en vente et relation client: Accueil et conseil client, Techniques de vente (argumentation, fidélisation), Gestion des réclamations, Mise en place d'animations commerciales",
        "Compétences en gestion de magasin: Réception et contrôle des livraisons, Mise en rayon (facing, rotation des produits), Gestion des stocks et des inventaires, Suivi des indicateurs de performance (chiffre d'affaires, marges)",
        "Compétences en caisse: Encaissement et rendu monnaie, Gestion des moyens de paiement, Ouverture et fermeture de caisse, Application des procédures de sécurité",
        "Compétences en hygiène et sécurité: Respect des normes d'hygiène (surtout pour les produits frais), Respect des consignes de sécurité alimentaire, Prévention des pertes et vols",
        "Compétences en travail d'équipe et autonomie: Collaboration avec les collègues et la hiérarchie, Capacité d'adaptation à différents postes, Prise d'initiative et autonomie progressive",
        "Compétences en gestion administrative (selon le poste): Suivi des commandes fournisseurs, Gestion des documents commerciaux, Participation à l'organisation des plannings"
      ],
      color: "border-red-600",
    },
    {
      id: "uexpress",
      title: "U Express",
      subtitle: "Stage de 8 semaines",
      location: "Rouen",
      date: "2023",
      content: [
        "Réception des commandes et vérification",
        "Comptabilité et suivi des factures",
        "Étiquetage des prix et mise en rayon",
        "Assistance à la clientèle et conseil"
      ],
      color: "border-blue-600",
    },
    {
      id: "tourelles",
      title: "Institut Les TOURELLES",
      subtitle: "Stage au CDI (bibliothèque)",
      location: "Rouen",
      date: "2022",
      content: [
        "Classement et rangement des documents sur l'orientation",
        "Accueil d'un fournisseur et gestion de la relation",
        "Choix de livres pour le CDI, traitement et suivi de la commande",
        "Réception, classement et mise à disposition des magazines",
        "Tableau comparatif de caisson de bureau pour le CDI"
      ],
      color: "border-green-600",
    },
    {
      id: "pharmacie",
      title: "Pharmacie d'Argenteuil Joliot curie",
      subtitle: "Stage",
      location: "Argenteuil",
      date: "2020",
      content: [
        "Accueil des clients et gestion des demandes",
        "Réception des commandes et vérification des produits",
        "Classement et mise en disposition des produits en rayon"
      ],
      color: "border-purple-600",
    },
    {
      id: "bibliotheque",
      title: "Bibliothèque de Oissel",
      subtitle: "Stage",
      location: "Oissel",
      date: "Janvier 2017",
      content: [
        "Accueil des clients et orientation",
        "Classement et rangement des documents"
      ],
      color: "border-amber-600",
    }
  ];

  // Gestion du bouton de retour en haut
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen relative">
      {/* Fond de particules sur toute la page */}
      <ParticlesBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Section Héro */}
      <HeroSectionNew />
      
      {/* Section À propos */}
      <AboutSection />
      
      {/* Section Formation */}
      <EducationSection />
      
      {/* Section Expérience */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Expérience"
            subtitle="Mon parcours professionnel"
            description="Découvrez mes expériences acquises lors de stages dans différents secteurs"
          />
          <div className="mt-10">
            <AnimatedTimeline items={experienceItems} />
          </div>
        </div>
      </section>

      {/* Section Portfolio */}
      <PortfolioSection />
      
      {/* Section Compétences */}
      <section id="competences" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Compétences"
            subtitle="Mes atouts professionnels"
            description="Découvrez les compétences que j'ai développées durant ma formation et mes expériences"
          />
          <div className="mt-10">
            <InteractiveSkills />
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Contact"
            subtitle="Prenons contact"
            description="N'hésitez pas à me contacter pour toute opportunité d'alternance et de stage ou question"
          />
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <Footer />
      
      {/* Bouton retour en haut */}
      {showScrollTop && <ScrollToTop />}
    </div>
  );
}

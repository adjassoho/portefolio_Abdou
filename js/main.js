// Fonction pour optimiser les animations (throttling)
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.createElement('div');
    loader.className = 'loader';
    const loaderInner = document.createElement('div');
    loaderInner.className = 'loader-inner';
    loader.appendChild(loaderInner);
    document.body.appendChild(loader);

    // Cacher le loader après le chargement complet
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
            // Animation des éléments fade-in
            animateFadeInElements();
        }, 500);
    });

    // Animation de la navbar au scroll (optimisée avec throttling)
    const header = document.querySelector('header');
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 50) {
            header.classList.add('nav-scrolled');
        } else {
            header.classList.remove('nav-scrolled');
        }
        // Animation des éléments fade-in
        animateFadeInElements();
        // Animation des barres de compétences
        animateSkillBars();
    }, 100)); // Limiter à 10 exécutions par seconde maximum

    // Animer les éléments avec la classe fade-in
    function animateFadeInElements() {
        // Utiliser requestAnimationFrame pour optimiser les animations
        requestAnimationFrame(() => {
            const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        });
    }

    // Animation des barres de compétences
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const progressBar = bar.querySelector('.skill-progress');
                const percentage = progressBar.getAttribute('data-percentage');
                if (progressBar.style.width === '') {
                    progressBar.style.width = percentage + '%';
                }
            }
        });
    }

    // Ajout de la classe hover-card aux cartes
    const cards = document.querySelectorAll('.bg-white.p-8.rounded-lg.shadow-lg');
    cards.forEach(card => {
        card.classList.add('hover-card');
    });

    // Ajout de la classe social-icon aux liens sociaux
    const socialLinks = document.querySelectorAll('footer .flex.space-x-6 a');
    socialLinks.forEach(link => {
        link.classList.add('social-icon');
    });

    // Ajout de la classe fade-in pour l'animation au défilement
    const animatedSections = document.querySelectorAll('section > div > div');
    animatedSections.forEach(section => {
        if (!section.hasAttribute('data-aos')) {
            section.classList.add('fade-in');
        }
    });

    // Ajout de la classe skill-badge aux badges de compétences
    const skillBadges = document.querySelectorAll('.flex.flex-wrap.gap-3 div');
    skillBadges.forEach(badge => {
        badge.classList.add('skill-badge');
    });

    // Ajout de la classe text-shadow aux titres
    const titles = document.querySelectorAll('h1, h2, h3');
    titles.forEach(title => {
        title.classList.add('text-shadow');
    });

    // Animation de typing pour le titre principal
    const mainTitle = document.querySelector('h1');
    if (mainTitle) {
        const nameSpan = mainTitle.querySelector('span');
        if (nameSpan) {
            nameSpan.classList.add('typing-animation');
        }
    }

    // Animation bouton contact
    const contactButton = document.querySelector('a[href="#contact"].bg-indigo-600');
    if (contactButton) {
        contactButton.classList.add('button-pulse');
    }

    // Ajout de l'effet 3D pour les cartes de projets
    const projectCards = document.querySelectorAll('#projets .bg-white.rounded-lg');
    projectCards.forEach(card => {
        card.classList.add('card-3d');
        const cardInner = card.querySelector('div');
        if (cardInner) {
            cardInner.classList.add('card-3d-inner');
        }
    });

    // Ajout de la classe portfolio-item aux projets
    const portfolioItems = document.querySelectorAll('#projets .relative');
    portfolioItems.forEach(item => {
        item.classList.add('portfolio-item');
    });

    // Ajout d'une flèche de défilement dans la section d'accueil
    const heroSection = document.querySelector('#accueil');
    if (heroSection) {
        const scrollDownIcon = document.createElement('div');
        scrollDownIcon.className = 'scroll-down';
        scrollDownIcon.innerHTML = '<i class="fas fa-chevron-down text-indigo-600 text-2xl"></i>';
        scrollDownIcon.addEventListener('click', function() {
            document.querySelector('#a-propos').scrollIntoView({ behavior: 'smooth' });
        });
        heroSection.appendChild(scrollDownIcon);
    }

    // Formulaire de contact - validation et animation
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Vérification simple des champs
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });

            if (isValid) {
                // Animation de succès
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.innerHTML = '<i class="fas fa-check mr-2"></i> Message envoyé!';
                submitButton.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
                submitButton.classList.add('bg-green-600', 'hover:bg-green-700');
                
                // Réinitialisation du formulaire après 2 secondes
                setTimeout(function() {
                    contactForm.reset();
                    submitButton.innerHTML = 'Envoyer le message';
                    submitButton.classList.remove('bg-green-600', 'hover:bg-green-700');
                    submitButton.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
                }, 2000);
            }
        });
    }

    // Effet de parallaxe
    const parallaxElements = document.createElement('div');
    parallaxElements.className = 'fixed inset-0 -z-10 pointer-events-none';
    
    // Création des éléments de fond en parallaxe
    for (let i = 0; i < 10; i++) {
        const element = document.createElement('div');
        const size = Math.random() * 100 + 50;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.borderRadius = '50%';
        element.style.background = `rgba(79, 70, 229, ${Math.random() * 0.1})`;
        element.style.position = 'absolute';
        element.style.top = `${Math.random() * 100}vh`;
        element.style.left = `${Math.random() * 100}vw`;
        element.style.transform = 'translate(-50%, -50%)';
        element.style.filter = 'blur(20px)';
        element.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite alternate`;
        parallaxElements.appendChild(element);
    }
    
    document.body.appendChild(parallaxElements);
    
    // Animation pour les éléments en parallaxe
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translate(-50%, -50%) translateY(0px) scale(1);
            }
            100% {
                transform: translate(-50%, -50%) translateY(50px) scale(1.1);
            }
        }
    `;
    document.head.appendChild(style);

    // Exécuter l'animation des éléments fade-in au chargement initial
    animateFadeInElements();
});

// Détection de l'intersection pour les animations
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Désinscrire l'élément une fois qu'il est visible (économise les ressources)
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px 50px 0px'
    });

    // Observer tous les éléments avec la classe fade-in
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    });
}

// Délégation d'événements pour les éléments de navigation
document.body.addEventListener('click', function(e) {
    // Gestion du clic sur les liens d'ancrage
    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Ferme le menu mobile si ouvert
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    }
}); 
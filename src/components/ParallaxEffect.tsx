'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Shape = 'circle' | 'square' | 'triangle' | 'hexagon' | 'blob';

interface Particle {
  id: number;
  size: number;
  initialPosition: {
    x: number;
    y: number;
  };
  depth: number;
  shape: Shape;
  rotate: number;
  color: string;
  blur: number;
  opacity: number;
}

const ParallaxEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Set initial window size
    handleResize();

    // Generate particles
    generateParticles();

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const generateParticles = () => {
    const shapes: Shape[] = ['circle', 'square', 'triangle', 'hexagon', 'blob'];
    const colors = [
      'rgba(79, 70, 229, 0.2)', // indigo
      'rgba(99, 102, 241, 0.15)', // lighter indigo
      'rgba(67, 56, 202, 0.25)', // darker indigo
      'rgba(59, 130, 246, 0.2)', // blue
      'rgba(96, 165, 250, 0.15)', // lighter blue
    ];
    
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 200 + 50,
      initialPosition: {
        x: Math.random() * 100,
        y: Math.random() * 100,
      },
      depth: Math.random() * 0.6 + 0.1,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotate: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      blur: Math.random() * 5 + 1,
      opacity: Math.random() * 0.07 + 0.03
    }));
    
    setParticles(newParticles);
  };

  const getShapePath = (shape: Shape, size: number): string => {
    switch (shape) {
      case 'circle':
        return '';  // CSS will handle circle
      case 'square': 
        return '';  // CSS will handle square
      case 'triangle':
        const half = size / 2;
        return `polygon(50% 0%, 0% 100%, 100% 100%)`;
      case 'hexagon':
        return `polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)`;
      case 'blob':
        // Random blob shape
        const r1 = 40 + Math.random() * 20;
        const r2 = 40 + Math.random() * 20;
        const r3 = 40 + Math.random() * 20;
        const r4 = 40 + Math.random() * 20;
        return `polygon(${r1}% 0%, 100% ${r2}%, ${r3}% 100%, 0% ${r4}%)`;
      default:
        return '';
    }
  };

  const getShapeClassName = (shape: Shape): string => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-md';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {particles.map((particle) => {
        const xMove = windowSize.width > 0 
          ? (mousePosition.x / windowSize.width - 0.5) * 40 * particle.depth
          : 0;
        
        const yMove = windowSize.height > 0 
          ? (mousePosition.y / windowSize.height - 0.5) * 40 * particle.depth + (scrollY * particle.depth * 0.15)
          : 0;

        return (
          <motion.div
            key={particle.id}
            className={`absolute ${getShapeClassName(particle.shape)}`}
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.initialPosition.x}%`,
              top: `${particle.initialPosition.y}%`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              filter: `blur(${particle.blur}px)`,
              clipPath: getShapePath(particle.shape, particle.size),
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              zIndex: Math.floor(particle.depth * 10) - 20,
            }}
            animate={{
              x: xMove,
              y: yMove,
              rotate: particle.rotate + (mousePosition.x * 0.02),
            }}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 30,
              mass: particle.depth * 5,
            }}
          />
        );
      })}

      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/10 dark:to-gray-900/10"
        style={{
          transform: `rotate(${mousePosition.x * 0.01}deg)`,
          transition: 'transform 1s ease-out',
        }}
      />
    </div>
  );
};

export default ParallaxEffect; 
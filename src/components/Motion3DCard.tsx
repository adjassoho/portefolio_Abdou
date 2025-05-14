'use client';

import React, { useState, useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Motion3DCardProps {
  children: ReactNode;
  className?: string;
  bgColor?: string;
  depth?: number;
  layers?: boolean;
  spotlight?: boolean;
  borderGlow?: boolean;
  glowColor?: string;
  intensity?: number;
  perspective?: number;
  damping?: number;
  stiffness?: number;
  isFlippable?: boolean;
}

const Motion3DCard: React.FC<Motion3DCardProps> = ({
  children,
  className = '',
  bgColor = 'bg-white dark:bg-gray-800',
  depth = 40,
  layers = true,
  spotlight = true,
  borderGlow = true,
  glowColor = 'rgba(99, 102, 241, 0.5)',
  intensity = 10,
  perspective = 800,
  damping = 30,
  stiffness = 300,
  isFlippable = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smoother motion
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), {
    damping,
    stiffness
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), {
    damping,
    stiffness
  });
  
  // Edge lighting effect transformations - defined outside of conditional rendering
  const topEdgeOpacity = useTransform(mouseY, [-0.5, 0.5], [0.7, 0.1]);
  const bottomEdgeOpacity = useTransform(mouseY, [-0.5, 0.5], [0.1, 0.7]);
  const leftEdgeOpacity = useTransform(mouseX, [-0.5, 0.5], [0.7, 0.1]);
  const rightEdgeOpacity = useTransform(mouseX, [-0.5, 0.5], [0.1, 0.7]);
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Convert mouse position to normalized values (-0.5 to 0.5)
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;
    
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };
  
  // Split children into front and back for flippable card
  let frontContent, backContent;
  if (isFlippable && React.Children.count(children) === 2) {
    [frontContent, backContent] = React.Children.toArray(children);
  } else {
    frontContent = children;
  }
  
  // Determine number of layers to create depth effect
  const contentArray = React.Children.toArray(layers ? frontContent : [frontContent]);
  const layerCount = Math.min(contentArray.length, 5);
  
  // For flippable cards, handle flip toggle
  const handleFlip = () => {
    if (isFlippable) {
      setIsFlipped(!isFlipped);
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl ${bgColor} ${className} perspective-${perspective} ${isFlippable ? 'cursor-pointer' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={isFlippable ? handleFlip : undefined}
      style={{
        transformStyle: 'preserve-3d',
        transformPerspective: perspective,
        rotateX: isFlipped ? 180 : rotateX,
        rotateY: isFlipped ? 180 : rotateY,
        transition: 'box-shadow 0.3s ease',
        boxShadow: isHovered && borderGlow 
          ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}30` 
          : '0 10px 30px rgba(0,0,0,0.1)'
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Front Content */}
      <motion.div
        className="relative w-full h-full"
        style={{
          backfaceVisibility: 'hidden',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: isFlipped ? 'transform 0.6s ease' : 'none',
        }}
      >
        {/* Spotlight effect */}
        {spotlight && isHovered && !isFlipped && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`,
              opacity: 0.8,
            }}
          />
        )}
        
        {/* Content Layers for 3D effect */}
        {layers 
          ? contentArray.map((layer, index) => {
              const layerDepth = index * (depth / layerCount);
              return (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  style={{
                    transform: `translateZ(${layerDepth}px)`,
                    zIndex: index,
                  }}
                >
                  {layer}
                </motion.div>
              );
            })
          : frontContent
        }
      </motion.div>
      
      {/* Back Content (for flippable cards) */}
      {isFlippable && backContent && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
            transition: isFlipped ? 'transform 0.6s ease' : 'none',
          }}
        >
          {backContent}
        </motion.div>
      )}
      
      {/* Edge lighting effect */}
      {isHovered && !isFlipped && (
        <>
          <motion.div 
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            style={{ 
              opacity: topEdgeOpacity
            }}
          />
          <motion.div 
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            style={{ 
              opacity: bottomEdgeOpacity 
            }}
          />
          <motion.div 
            className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent"
            style={{ 
              opacity: leftEdgeOpacity 
            }}
          />
          <motion.div 
            className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent"
            style={{ 
              opacity: rightEdgeOpacity 
            }}
          />
        </>
      )}
    </motion.div>
  );
};

export default Motion3DCard; 
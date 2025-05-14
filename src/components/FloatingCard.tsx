'use client';

import React, { useState, ReactNode, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

type FloatingCardProps = {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  rotateIntensity?: number;
  shadow?: boolean;
  highlight?: boolean;
  borderColor?: string;
  glowColor?: string;
  parallaxLayers?: boolean;
};

const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className = '',
  hoverScale = 1.02,
  rotateIntensity = 0.5,
  shadow = true,
  highlight = false,
  borderColor = 'border-indigo-600',
  glowColor = 'rgba(79, 70, 229, 0.2)',
  parallaxLayers = false,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(10);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Split children into layers for parallax effect if needed
  const childrenArray = React.Children.toArray(children);
  const layeredChildren = parallaxLayers && childrenArray.length > 1 
    ? childrenArray 
    : [children];
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    // Calculate rotation based on mouse position
    const rotX = ((y - centerY) / centerY) * -rotateIntensity;
    const rotY = ((x - centerX) / centerX) * rotateIntensity;
    
    // Calculate shadow position
    const shadowOffsetX = rotY * 5;
    const shadowOffsetY = rotX * 5 + 10; // Add a base offset of 10px
    
    setRotateX(rotX);
    setRotateY(rotY);
    setShadowX(shadowOffsetX);
    setShadowY(shadowOffsetY);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    // Reset rotations on mouse leave with a smoother transition
    setIsHovered(false);
    
    // Create a smoother transition when mouse leaves
    const resetSpeed = 0.05;
    let currentRotateX = rotateX;
    let currentRotateY = rotateY;
    let currentShadowX = shadowX;
    let currentShadowY = shadowY;
    let animationId: number;
    
    const resetAnimation = () => {
      // Gradually move values toward 0
      currentRotateX *= 0.85;
      currentRotateY *= 0.85;
      currentShadowX *= 0.85;
      currentShadowY = 10 + (currentShadowY - 10) * 0.85;
      
      // Update state
      setRotateX(currentRotateX);
      setRotateY(currentRotateY);
      setShadowX(currentShadowX);
      setShadowY(currentShadowY);
      
      // Stop animation when values are close enough to 0
      if (
        Math.abs(currentRotateX) < 0.01 && 
        Math.abs(currentRotateY) < 0.01 && 
        Math.abs(currentShadowX) < 0.01 &&
        Math.abs(currentShadowY - 10) < 0.01
      ) {
        setRotateX(0);
        setRotateY(0);
        setShadowX(0);
        setShadowY(10);
        cancelAnimationFrame(animationId);
        return;
      }
      
      animationId = requestAnimationFrame(resetAnimation);
    };
    
    animationId = requestAnimationFrame(resetAnimation);
    
    // Clean up the animation if component unmounts during animation
    return () => {
      cancelAnimationFrame(animationId);
    };
  };
  
  // Clean up any animations on unmount
  useEffect(() => {
    return () => {
      // This will catch any animation that might be running
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden transition-all duration-200 rounded-lg ${shadow ? 'shadow-xl' : ''} ${highlight ? `border-l-4 ${borderColor}` : ''} ${className}`}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: hoverScale }}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        boxShadow: shadow 
          ? `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05), ${isHovered ? `0 0 30px ${glowColor}` : ''}` 
          : 'none',
      }}
    >
      {highlight && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-50 dark:from-indigo-950 dark:to-transparent -z-10"
        />
      )}
      
      {/* Outer glow effect on hover */}
      {isHovered && (
        <div 
          className="absolute inset-0 rounded-lg opacity-30"
          style={{
            background: `radial-gradient(circle at ${rotateY > 0 ? '75%' : '25%'} ${rotateX > 0 ? '75%' : '25%'}, ${glowColor}, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
      )}
      
      {/* Shine effect */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)',
          opacity: isHovered ? 0.1 : 0,
          transform: `translateX(${rotateY * 10}px) translateY(${rotateX * 10}px)`,
        }}
      />
      
      {/* Parallax content layers */}
      {parallaxLayers 
        ? layeredChildren.map((child, index) => (
            <div 
              key={index}
              className="relative"
              style={{
                transform: `translateX(${rotateY * (index + 1) * -2}px) translateY(${rotateX * (index + 1) * -2}px)`,
                zIndex: index,
                transition: 'transform 0.1s ease-out',
              }}
            >
              {child}
            </div>
          ))
        : children
      }
    </motion.div>
  );
};

export default FloatingCard; 
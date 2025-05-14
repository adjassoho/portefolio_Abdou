'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

type AnimationType = 'reveal' | 'glitch' | 'gradient' | 'type' | 'bounce' | 'blur' | 'none';

interface AnimatedTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  animation?: AnimationType;
  once?: boolean;
  delay?: number;
  duration?: number;
  gradient?: string;
  glitchIntensity?: 'low' | 'medium' | 'high';
  typeSpeed?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  as = 'p',
  className = '',
  animation = 'reveal',
  once = true,
  delay = 0,
  duration = 0.5,
  gradient = 'from-indigo-600 to-blue-500',
  glitchIntensity = 'medium',
  typeSpeed = 40,
}) => {
  const controls = useAnimation();
  const [renderedText, setRenderedText] = useState(animation === 'type' ? '' : text);
  const [glitchText, setGlitchText] = useState(text);
  
  // Character animations for reveal
  const characterVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.1 } 
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        opacity: { duration: duration * 0.5 },
        y: { type: "spring", stiffness: 100, damping: 12 },
        delay: delay + i * 0.04
      } 
    })
  };
  
  // Word animations for reveal by word
  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.1 } 
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        opacity: { duration: duration * 0.5 },
        y: { type: "spring", stiffness: 100, damping: 12 },
        delay: delay + i * 0.1
      } 
    })
  };
  
  // Bounce animation
  const bounceVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({ 
      opacity: 1,
      transition: { delay: delay + i * 0.05 }
    }),
    bounce: (i: number) => ({
      y: [0, -15, 0],
      transition: {
        delay: delay + i * 0.05,
        times: [0, 0.5, 1],
        duration: 0.6,
        ease: "easeInOut"
      }
    })
  };
  
  // Blur animation
  const blurVariants: Variants = {
    hidden: { 
      opacity: 0,
      filter: "blur(10px)" 
    },
    visible: (i: number) => ({ 
      opacity: 1,
      filter: "blur(0px)",
      transition: { 
        delay: delay + i * 0.05,
        duration: duration
      } 
    })
  };
  
  // Typing effect
  useEffect(() => {
    if (animation !== 'type') return;
    
    let currentText = '';
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        currentText += text[currentIndex];
        setRenderedText(currentText);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, typeSpeed);
    
    return () => clearInterval(interval);
  }, [text, animation, typeSpeed]);
  
  // Glitch effect
  useEffect(() => {
    if (animation !== 'glitch') return;
    
    const glitchStrength = {
      low: 800,
      medium: 300,
      high: 100
    }[glitchIntensity];
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    
    let lastUpdate = 0;
    let animationFrameId: number;
    
    const updateGlitch = (timestamp: number) => {
      if (timestamp - lastUpdate > glitchStrength) {
        const originalChars = text.split('');
        const glitchedChars = [...originalChars];
        
        // Random characters to glitch
        const numGlitches = Math.max(1, Math.floor(text.length / 10));
        for (let i = 0; i < numGlitches; i++) {
          const pos = Math.floor(Math.random() * text.length);
          glitchedChars[pos] = chars[Math.floor(Math.random() * chars.length)];
        }
        
        setGlitchText(glitchedChars.join(''));
        lastUpdate = timestamp;
      }
      
      animationFrameId = requestAnimationFrame(updateGlitch);
    };
    
    animationFrameId = requestAnimationFrame(updateGlitch);
    
    const timeout = setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      setGlitchText(text);
    }, 2000);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeout);
    };
  }, [animation, glitchIntensity, text]);
  
  // Start animation
  useEffect(() => {
    controls.start("visible")
      .then(() => {
        if (animation === 'bounce') {
          controls.start("bounce");
        }
      });
  }, [controls, animation]);
  
  // Render based on animation type
  const renderAnimatedText = () => {
    const Component = as;
    
    switch (animation) {
      case 'reveal':
        return (
          <Component className={className}>
            {text.split(' ').map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-1 overflow-hidden">
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    key={`${wordIndex}-${charIndex}`}
                    custom={wordIndex}
                    variants={wordVariants}
                    initial="hidden"
                    animate={controls}
                    viewport={{ once }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </Component>
        );
      
      case 'gradient':
        return (
          <Component className={`bg-clip-text text-transparent bg-gradient-to-r ${gradient} ${className}`}>
            {text.split('').map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={characterVariants}
                initial="hidden"
                animate={controls}
                viewport={{ once }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </Component>
        );
        
      case 'glitch':
        return (
          <Component className={`relative ${className}`}>
            <span>{glitchText}</span>
            {/* Glitch effect overlays */}
            <span 
              className="absolute top-0 left-0 text-red-500 opacity-50 mix-blend-multiply"
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                transform: 'translate(-2px, 0)',
                animation: 'glitch-anim 5s infinite linear alternate-reverse'
              }}
            >
              {glitchText}
            </span>
            <span 
              className="absolute top-0 left-0 text-blue-500 opacity-50 mix-blend-multiply"
              style={{ 
                clipPath: 'polygon(0 45%, 100% 45%, 100% 100%, 0 100%)',
                transform: 'translate(2px, 0)',
                animation: 'glitch-anim-2 3s infinite linear alternate-reverse' 
              }}
            >
              {glitchText}
            </span>
          </Component>
        );
        
      case 'type':
        return (
          <Component className={className}>
            {renderedText}
            <span className="inline-block w-1 h-5 ml-1 bg-indigo-500 animate-blink" />
          </Component>
        );
        
      case 'bounce':
        return (
          <Component className={className}>
            {text.split('').map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={bounceVariants}
                initial="hidden"
                animate={controls}
                viewport={{ once }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </Component>
        );
        
      case 'blur':
        return (
          <Component className={className}>
            {text.split(' ').map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                custom={wordIndex}
                variants={blurVariants}
                initial="hidden"
                animate={controls}
                viewport={{ once }}
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            ))}
          </Component>
        );
        
      default:
        return <Component className={className}>{text}</Component>;
    }
  };
  
  return renderAnimatedText();
};

export default AnimatedText; 
'use client';

import { useEffect, useRef, useState } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  originalSize: number; // Store original size for pulsing effect
  pulseSpeed: number;
  pulseDirection: number;
  lifespan: number; // For particle regeneration
  originalAlpha: number; // Store original alpha for effects
};

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particleCountRef = useRef(0);

  // Dynamic count based on screen size
  const getParticleCount = (width: number, height: number): number => {
    const area = width * height;
    // Adjust density based on screen size
    return Math.min(Math.max(Math.floor(area / 10000), 50), 150);
  };

  // Initialize particles with enhanced properties
  const createParticles = (count: number, width: number, height: number): Particle[] => {
    const particles: Particle[] = [];
    // Extended color palette with deeper purples and blues
    const colors = [
      '#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', 
      '#3730a3', '#4338ca', '#3b82f6', '#60a5fa', '#93c5fd'
    ];
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 4 + 1;
      const alpha = Math.random() * 0.7 + 0.1;
      
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: size,
        originalSize: size,
        speedX: Math.random() * 0.6 - 0.3,
        speedY: Math.random() * 0.6 - 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: alpha,
        originalAlpha: alpha,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseDirection: Math.random() > 0.5 ? 1 : -1,
        lifespan: Math.random() * 500 + 200, // Random lifespan
      });
    }
    
    return particles;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      setDimensions({ width, height });
      
      // Update particle count when resizing
      particleCountRef.current = getParticleCount(width, height);
    };

    // Set initial size
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial particle count
    particleCountRef.current = getParticleCount(dimensions.width, dimensions.height);
    
    // Create initial particles
    let particles = createParticles(particleCountRef.current, dimensions.width, dimensions.height);
    let animationFrameId: number;

    // Mouse interaction variables
    let mouseX = dimensions.width / 2;
    let mouseY = dimensions.height / 2;
    let mouseRadius = 150;
    let isMouseActive = false;
    let mouseTimeout: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseRadius = 150; // Reset radius on mouse move
      isMouseActive = true;
      
      // Clear previous timeout and set a new one
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseActive = false;
      }, 2000);
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Animation function with enhanced effects
    const animate = () => {
      // Create a semi-transparent layer for motion blur effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      
      // Gradually reduce mouse radius when inactive
      if (!isMouseActive && mouseRadius > 0) {
        mouseRadius -= 0.5;
      }
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Decrease lifespan
        p.lifespan--;
        
        // Regenerate particle if lifespan is over
        if (p.lifespan <= 0) {
          particles[i] = {
            ...createParticles(1, dimensions.width, dimensions.height)[0],
            x: Math.random() > 0.5 ? Math.random() * dimensions.width : 
                Math.random() > 0.5 ? 0 : dimensions.width,
            y: Math.random() > 0.5 ? Math.random() * dimensions.height : 
                Math.random() > 0.5 ? 0 : dimensions.height,
          };
          continue;
        }
        
        // Pulse size effect
        p.size += p.pulseDirection * p.pulseSpeed;
        if (p.size > p.originalSize * 1.5 || p.size < p.originalSize * 0.7) {
          p.pulseDirection *= -1;
        }
        
        // Alpha fade effect near end of lifespan
        if (p.lifespan < 50) {
          p.alpha = p.originalAlpha * (p.lifespan / 50);
        }
        
        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Boundary check with smoother transition
        if (p.x > dimensions.width + 10) p.x = -10;
        else if (p.x < -10) p.x = dimensions.width + 10;
        if (p.y > dimensions.height + 10) p.y = -10;
        else if (p.y < -10) p.y = dimensions.height + 10;
        
        // Enhanced mouse interaction with magnetic effect
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRadius - distance) / mouseRadius;
          
          // Particles move away from mouse
          const pushX = Math.cos(angle) * force * 2;
          const pushY = Math.sin(angle) * force * 2;
          
          // Apply push force
          p.x -= pushX;
          p.y -= pushY;
          
          // Temporarily increase speed
          p.speedX -= pushX * 0.05;
          p.speedY -= pushY * 0.05;
          
          // Cap maximum speed
          const maxSpeed = 3;
          const currentSpeed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY);
          if (currentSpeed > maxSpeed) {
            p.speedX = (p.speedX / currentSpeed) * maxSpeed;
            p.speedY = (p.speedY / currentSpeed) * maxSpeed;
          }
          
          // Add glow effect to particles near mouse
          p.alpha = Math.min(p.originalAlpha * 1.5, 0.8);
        } else {
          // Gradually return to original speed when far from mouse
          p.speedX *= 0.99;
          p.speedY *= 0.99;
          p.alpha = p.originalAlpha;
        }
        
        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Create glow effect
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        glow.addColorStop(0, p.color);
        glow.addColorStop(1, 'rgba(255,255,255,0)');
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        
        // Find nearby particles and connect them with gradient lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            // Create gradient for the connecting line
            const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, p2.color);
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = (120 - distance) / 500 * Math.min(p.alpha, p2.alpha);
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
};

export default ParticlesBackground; 
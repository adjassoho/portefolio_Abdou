'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Sparkles, OrbitControls } from '@react-three/drei';

interface ThreeDBackgroundProps {
  isDarkMode?: boolean;
}

// Floating orbs component
const FloatingOrbs = ({ count = 12, isDarkMode = false }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Create dummy object for positioning
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = isDarkMode ? '#4f46e5' : '#6366f1';
  
  // Spring animation for pulsing effect
  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: { tension: 150, friction: 10 }
  });
  
  // Position and animate orbs
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    const time = clock.getElapsedTime();
    
    // Update each orb
    for (let i = 0; i < count; i++) {
      const idx = i;
      
      // Calculate the position based on sine waves for smooth floating
      const x = Math.sin(time * 0.2 + idx * 0.5) * 5;
      const y = Math.cos(time * 0.3 + idx * 0.5) * 5;
      const z = Math.sin(time * 0.1 + idx * 0.7) * 5;
      
      // Set position
      dummy.position.set(x, y, z);
      
      // Rotate
      dummy.rotation.x = Math.sin(time * 0.2 + idx) * Math.PI;
      dummy.rotation.z = Math.cos(time * 0.3 + idx) * Math.PI * 0.5;
      
      // Scale based on position
      const scale = Math.sin(time * 0.3 + idx) * 0.2 + 0.8;
      dummy.scale.set(scale, scale, scale);
      
      // Update the matrix
      dummy.updateMatrix();
      mesh.current.setMatrixAt(idx, dummy.matrix);
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <animated.instancedMesh
      ref={mesh}
      args={[undefined, undefined, count]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={scale}
    >
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.6}
        metalness={0.2}
        transparent
        opacity={0.7}
      />
    </animated.instancedMesh>
  );
};

// Floating rings component 
const FloatingRings = ({ count = 5, isDarkMode = false }) => {
  const group = useRef<THREE.Group>(null);
  
  // Define ring colors based on theme
  const ringColor = isDarkMode ? '#3730a3' : '#6366f1';
  
  useFrame(({ clock }) => {
    if (!group.current) return;
    
    const time = clock.getElapsedTime();
    
    // Rotate the entire group
    group.current.rotation.x = Math.sin(time * 0.2) * 0.3;
    group.current.rotation.y = Math.cos(time * 0.1) * 0.3;
    
    // Update each ring's rotation
    group.current.children.forEach((ring, i) => {
      ring.rotation.x = Math.sin(time * 0.1 + i) * Math.PI * 0.2;
      ring.rotation.y = Math.cos(time * 0.15 + i) * Math.PI * 0.2;
      
      // Pulse scale
      const scale = Math.sin(time * 0.2 + i * 0.5) * 0.1 + 1;
      ring.scale.set(scale, scale, scale);
    });
  });
  
  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2 + i * 0.8, 0.04, 16, 64]} />
          <meshStandardMaterial
            color={ringColor}
            emissive={ringColor}
            emissiveIntensity={0.3}
            transparent
            opacity={0.5 - i * 0.08}
            wireframe={i % 2 === 0}
          />
        </mesh>
      ))}
    </group>
  );
};

// Ambient light that responds to mouse movement
const AmbientLighting = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const light = useRef<THREE.PointLight>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useFrame(() => {
    if (!light.current) return;
    
    // Move the light based on mouse position
    light.current.position.x = mousePosition.x * 10;
    light.current.position.y = mousePosition.y * 5;
  });
  
  return (
    <>
      <ambientLight intensity={isDarkMode ? 0.1 : 0.3} />
      <pointLight 
        ref={light} 
        position={[0, 0, 5]} 
        intensity={isDarkMode ? 5 : 2} 
        color={isDarkMode ? '#4f46e5' : '#6366f1'} 
        distance={15}
      />
      <pointLight 
        position={[-5, -5, 5]} 
        intensity={isDarkMode ? 2 : 1} 
        color={isDarkMode ? '#818cf8' : '#a5b4fc'} 
        distance={20}
      />
    </>
  );
};

// Main 3D Background component
const ThreeDBackground: React.FC<ThreeDBackgroundProps> = ({ isDarkMode = false }) => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ 
          background: 'transparent' 
        }}
      >
        <AmbientLighting isDarkMode={isDarkMode} />
        <FloatingOrbs count={10} isDarkMode={isDarkMode} />
        <FloatingRings count={4} isDarkMode={isDarkMode} />
        <Sparkles 
          count={100} 
          scale={12} 
          size={1} 
          speed={0.3} 
          opacity={0.2} 
          color={isDarkMode ? '#818cf8' : '#6366f1'} 
        />
      </Canvas>
    </div>
  );
};

export default ThreeDBackground; 
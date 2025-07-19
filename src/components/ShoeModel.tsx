'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import NikeShoe from './NikeShoe';
import RegularShoe from './RegularShoe';
import FallbackShoeModel from './FallbackShoeModel';
import LoadingSpinner from '@/components/LoadingSpinner';

// Define available colors for the shoe
export const COLORS = [

  { name: 'White', color: '#ffffff' },
  { name: 'Black', color: '#000000' },
  { name: 'Neon Yellow', color: '#e6ff00' },
  { name: 'Blue', color: '#0066ff' },
  { name: 'Red', color: '#ff3333' },
];


export interface ShoeModelProps {
  selectedColor: string;
  autoRotate?: boolean; // Now defaults to false
  activeModel: 'nike' | 'regular';
  enableColorChange?: boolean;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function ShoeModel({ 
  selectedColor, 
  autoRotate = false, 
  activeModel = 'nike',
  enableColorChange = true,
  position,
  rotation = [0, Math.PI / 2, 0] // Default rotation to face left
}: ShoeModelProps) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  
  const springs = useSpring({
    scale: hovered ? [1.05, 1.05, 1.05] : [1, 1, 1] as [number, number, number],
    config: { mass: 1, tension: 300, friction: 30 }
  });

  // We're removing the auto-rotation to keep the model fixed
  // The OrbitControls will handle user-initiated rotation instead

  // Handle loading state
  useEffect(() => {
    // Preload both models to avoid loading issues
    const preloadModels = async () => {
      try {
        // Manually check if models are accessible before preloading
        const checkAndPreload = async (modelPath: string) => {
          console.log(`Checking accessibility of ${modelPath}`);
          try {
            const controller = new AbortController();
            const signal = controller.signal;
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const response = await fetch(modelPath, { signal });
            clearTimeout(timeoutId);
            
            if (response.ok) {
              console.log(`${modelPath} is accessible, preloading...`);
              useGLTF.preload(modelPath);
              console.log(`Successfully preloaded ${modelPath}`);
            } else {
              console.error(`Failed to access ${modelPath}: ${response.status} ${response.statusText}`);
            }
          } catch (err) {
            console.error(`Error checking/preloading ${modelPath}:`, err);
          }
        };
        
        // Only preload the model we're actually using
        await checkAndPreload('/nike_shoe.glb');
        
      } catch (err) {
        console.error('Error in preloading models:', err);
        if (err instanceof Error) {
          console.error('Error name:', err.name);
          console.error('Error message:', err.message);
          console.error('Error stack:', err.stack);
        }
      }
    };
    
    preloadModels();
    
    const loadingText = document.getElementById('loading-text');
    if (loadingText) {
      loadingText.style.display = 'none';
    }
  }, []);

  return (
    <>
      <animated.group
        ref={group}
        dispose={null}
        scale={springs.scale as unknown as [number, number, number]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, -0.8, 0]}
        rotation={[0, 0, 0]}
      >
        <Suspense fallback={<FallbackShoeModel selectedColor={selectedColor} hovered={hovered} />}>
          {activeModel === 'nike' ? (
            <NikeShoe 
              selectedColor={selectedColor} 
              hovered={hovered} 
              enableColorChange={enableColorChange}
              position={position || [0, -1, 0]}
              rotation={rotation}
            />
          ) : (
            <RegularShoe 
              selectedColor={selectedColor} 
              hovered={hovered} 
              enableColorChange={enableColorChange}
              position={position || [0, 2, 0]}
              rotation={rotation}
            />
          )}
        </Suspense>
      </animated.group>
      
      {/* Orbit controls with full 360-degree rotation enabled */}
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI} 
        minDistance={5}
        maxDistance={5}
        enableRotate={true}
        rotateSpeed={0.5}
        autoRotate={autoRotate}
        target={[0, 0, 0]}
      />
      
      {/* Environment and shadows */}
      <Environment preset="city" />
      <ContactShadows 
        position={[0, -1.8, 0]} 
        opacity={0.4} 
        scale={15} 
        blur={2.4} 
        far={5} 
      />
    </>
  );
}
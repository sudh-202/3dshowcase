'use client';

import { useRef, useState } from 'react';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { Group } from 'three';
import BaseModel from './BaseModel';

interface PantsModelProps {
  selectedColor: string;
  hovered: boolean;
  enableColorChange?: boolean;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
}

export default function PantsModel({ 
  selectedColor, 
  hovered, 
  enableColorChange = true,
  position = [0, -2, 0],
  rotation = [0, Math.PI / 2, 0], // Default rotation to face left
  autoRotate = false
}: PantsModelProps) {
  const group = useRef<Group>(null);
  const [isHovered, setIsHovered] = useState(hovered);
  
  const springs = useSpring({
    scale: isHovered ? [1.05, 1.05, 1.05] : [1, 1, 1] as [number, number, number],
    config: { mass: 1, tension: 300, friction: 30 }
  });

  return (
    <>
      <animated.group
        ref={group}
        dispose={null}
        scale={springs.scale as unknown as [number, number, number]}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        position={[0, -0.8, 0]}
        rotation={[0, 0, 0]}
      >
        <BaseModel 
          modelPath="/pants.glb"
          selectedColor={selectedColor} 
          hovered={isHovered}
          enableColorChange={enableColorChange}
          position={position}
          rotation={rotation}
          colorExclusions={['sole', 'laces']}
        />
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
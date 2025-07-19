'use client';

import { useRef, useEffect } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';

interface FallbackShoeModelProps {
  selectedColor: string;
  hovered: boolean;
}

export default function FallbackShoeModel({ selectedColor, hovered }: FallbackShoeModelProps) {
  const soleMesh = useRef<Mesh>(null);
  const upperMesh = useRef<Mesh>(null);
  const accentMesh = useRef<Mesh>(null);
  
  // Update materials when color changes
  useEffect(() => {
    if (upperMesh.current) {
      const material = upperMesh.current.material as MeshStandardMaterial;
      if (material) material.color.set(selectedColor);
    }
  }, [selectedColor]);

  return (
    <group scale={hovered ? 4.2 : 4}>
      {/* Sole */}
      {/* <mesh 
        ref={soleMesh}
        castShadow 
        receiveShadow 
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color="#333333" 
          roughness={0.6} 
          metalness={0.2} 
        />
        <boxGeometry args={[1, 1, 1]} />
      </mesh> */}
      
      {/* Upper part */}
      {/* <mesh 
        ref={upperMesh}
        castShadow 
        receiveShadow 
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color={selectedColor} 
          roughness={0.4} 
          metalness={0.1} 
        />
        <boxGeometry args={[1, 0.4, 2.3]} />
      </mesh> */}
      
      {/* Accent/laces */}
      {/* <mesh 
        ref={accentMesh}
        castShadow 
        receiveShadow 
        position={[0, 0.3, 0.2]}
      >
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.5} 
          metalness={0.1} 
        />
        <boxGeometry args={[0.8, 0.1, 1]} />
      </mesh> */}
      
      {/* Front part */}
      {/* <mesh
        castShadow
        receiveShadow
        position={[0, 0.15, 1.3]}
      >
        <meshStandardMaterial 
          color={selectedColor} 
          roughness={0.4} 
          metalness={0.1} 
        />
        <boxGeometry args={[0.9, 0.3, 0.2]} />
      </mesh> */}
      
      {/* Brand logo */}
      {/* <mesh
        castShadow
        receiveShadow
        position={[0.4, 0.35, -0.2]}
        rotation={[0, 0, Math.PI / 6]}
      >
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.2} 
          metalness={0.8} 
        />
        <boxGeometry args={[0.4, 0.05, 0.05]} />
      </mesh> */}
    </group>
  );
}
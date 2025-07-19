'use client';

import BaseModel from './BaseModel';

interface RegularShoeProps {
  selectedColor: string;
  hovered: boolean;
  enableColorChange?: boolean;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function RegularShoe({ 
  selectedColor, 
  hovered, 
  enableColorChange = true,
  position = [0, 2, 0],
  rotation = [0, Math.PI / 2, 0] // Default rotation to face left
}: RegularShoeProps) {
  return (
    <BaseModel
      modelPath="/nike.glb"
      selectedColor={selectedColor}
      hovered={hovered}
      scale={10}
      position={position}
      rotation={rotation}
      enableColorChange={enableColorChange}
      colorExclusions={['sole', 'laces']}
    />
  );
}
'use client';

import BaseModel from './BaseModel';

interface NikeShoeProps {
  selectedColor: string;
  hovered: boolean;
  enableColorChange?: boolean;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function NikeShoe({ 
  selectedColor, 
  hovered, 
  enableColorChange = true,
  position = [0, -1, 0],
  rotation = [0, Math.PI / 4, 0] // Default rotation to face left
}: NikeShoeProps) {
  return (
    <BaseModel
      modelPath="/nike_shoe.glb"
      selectedColor={selectedColor}
      hovered={hovered}
      scale={17}
      position={position}
      rotation={rotation}
      enableColorChange={enableColorChange}
      colorExclusions={['sole', 'laces']}
    />
  );
}
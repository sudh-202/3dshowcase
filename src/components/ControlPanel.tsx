'use client';

import { useState } from 'react';
import ColorSelector from './ColorSelector';

interface ControlPanelProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export default function ControlPanel({ selectedColor, onColorSelect }: ControlPanelProps) {
  // We'll keep the control panel always visible to match the design in the image
  return (
    <div className="absolute right-8 top-1/3 z-20">
      <div className="flex flex-col items-center space-y-4">
        <ColorSelector 
          selectedColor={selectedColor} 
          onColorSelect={onColorSelect} 
        />
      </div>
      
      {/* Navigation arrows */}
      {/* <div className="mt-12 flex justify-between items-center">
        <button className="text-white hover:text-yellow-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="text-white hover:text-yellow-400 transition-colors ml-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div> */}
    </div>
  );
}
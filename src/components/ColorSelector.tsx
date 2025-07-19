'use client';

import { COLORS } from './ShoeModel';

interface ColorSelectorProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export default function ColorSelector({ selectedColor, onColorSelect }: ColorSelectorProps) {
  return (
    <div className="flex flex-col space-y-3">
      {COLORS.map((colorObj) => (
        <button
          key={colorObj.name}
          className={`w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center ${selectedColor === colorObj.color ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-800' : ''}`}
          style={{ backgroundColor: colorObj.color }}
          onClick={() => onColorSelect(colorObj.color)}
          aria-label={`Select ${colorObj.name} color`}
        >
          {selectedColor === colorObj.color && (
            <span className="text-white text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
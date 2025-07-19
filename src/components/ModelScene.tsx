'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ShoeModel, { COLORS } from './ShoeModel';
import TShirtModel from './TShirtModel';
import PantsModel from './PantsModel';
import SneakersModel from './SneakersModel';
import ControlPanel from './ControlPanel';
import Image from 'next/image';

// Define the available model types
export type ModelType = 'shoes' | 'tshirt' | 'pants' | 'sneakers';

// Define background and text content for each model type
const modelConfigs = {
  shoes: {
    background: 'bg-gradient-to-b from-gray-700 to-gray-900',
    title: 'NIKE\nAIR\nRUN',
    price: '£109.95',
    description: 'Premium running shoes designed for comfort and performance.',
  },
  tshirt: {
    background: 'bg-gradient-to-b from-blue-700 to-blue-900',
    title: 'PREMIUM\nT-SHIRT',
    price: '£49.95',
    description: 'High-quality cotton t-shirt for everyday wear.',
  },
  pants: {
    background: 'bg-gradient-to-b from-green-700 to-green-900',
    title: 'STYLISH\nPANTS',
    price: '£79.95',
    description: 'Comfortable pants with modern design and perfect fit.',
  },
  sneakers: {
    background: 'bg-gradient-to-b from-red-700 to-red-900',
    title: 'URBAN\nSNEAKERS',
    price: '£89.95',
    description: 'Urban style sneakers for the modern lifestyle.',
  },
};

interface ModelSceneProps {
  initialModelType?: ModelType;
}

export default function ModelScene({ initialModelType = 'shoes' }: ModelSceneProps) {
  const [selectedColor, setSelectedColor] = useState(COLORS[0].color);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [activeModel, setActiveModel] = useState<'nike' | 'regular'>('nike');
  const [modelType, setModelType] = useState<ModelType>(initialModelType);
  const [enableColorChange, setEnableColorChange] = useState(true);
  const [modelPosition, setModelPosition] = useState<[number, number, number] | undefined>(undefined);
  const [modelRotation, setModelRotation] = useState<[number, number, number]>([0, Math.PI / 2, 0]); // Default rotation to face left
  const [autoRotate, setAutoRotate] = useState(false); // State for auto-rotation
  
  // State for different versions of each model type
  const [tshirtVersion, setTshirtVersion] = useState<'v1' | 'v2' | 'v3'>('v1');
  const [pantsVersion, setPantsVersion] = useState<'v1' | 'v2' | 'v3'>('v1');
  const [sneakersVersion, setSneakersVersion] = useState<'v1' | 'v2' | 'v3'>('v1');
  
  // Toggle auto-rotation
  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };
  
  const totalSlides = 5;
  
  // Switch model when thumbnail is clicked
  const handleModelSwitch = (model: 'nike' | 'regular') => {
    setActiveModel(model);
  };

  // Switch model type when nav item is clicked
  const handleModelTypeSwitch = (type: ModelType) => {
    setModelType(type);
    
    // Reset position for different model types
    switch (type) {
      case 'shoes':
        setModelPosition(undefined); // Use default position
        setEnableColorChange(true);
        break;
      case 'tshirt':
        setModelPosition([0, 0, 0]);
        setEnableColorChange(true);
        break;
      case 'pants':
        setModelPosition([0, -2, 0]);
        setEnableColorChange(true);
        break;
      case 'sneakers':
        setModelPosition([0, -1.5, 0]);
        setEnableColorChange(true);
        break;
    }
  };

  // Get the current model config
  const currentConfig = modelConfigs[modelType];

  return (
    <div className={`relative w-full h-screen ${currentConfig.background}`}>
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-4">
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold">3D<span className="text-yellow-400">Showcase</span> <span className="text-2xl">□</span></h1>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <button 
            className={`text-white hover:text-yellow-400 transition-colors ${modelType === 'shoes' ? 'text-yellow-400' : ''}`}
            onClick={() => handleModelTypeSwitch('shoes')}
          >
            Shoes
          </button>
          <button 
            className={`text-white hover:text-yellow-400 transition-colors ${modelType === 'tshirt' ? 'text-yellow-400' : ''}`}
            onClick={() => handleModelTypeSwitch('tshirt')}
          >
            T-Shirts
          </button>
          <button 
            className={`text-white hover:text-yellow-400 transition-colors ${modelType === 'pants' ? 'text-yellow-400' : ''}`}
            onClick={() => handleModelTypeSwitch('pants')}
          >
            Pants
          </button>
          <button 
            className={`text-white hover:text-yellow-400 transition-colors ${modelType === 'sneakers' ? 'text-yellow-400' : ''}`}
            onClick={() => handleModelTypeSwitch('sneakers')}
          >
            Sneakers
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-yellow-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="text-white hover:text-yellow-400 transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">1</span>
          </button>
        </div>
      </nav>
      
      {/* Product Info */}
      <div className="absolute top-1/4 left-8 z-10 max-w-md">
        <h2 className="text-white text-7xl font-bold leading-tight whitespace-pre-line">{currentConfig.title}</h2>
        <p className="text-yellow-400 text-3xl font-bold mt-4">{currentConfig.price}</p>
        <p className="text-white mt-2">{currentConfig.description}</p>
        <button className="mt-6 bg-yellow-400 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105">
          GET IT NOW
        </button>
      </div>
      
      {/* Circular Highlight */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 border-yellow-400 rounded-full z-0"></div>
      
      {/* Slide Indicator and Controls */}
      <div className="absolute bottom-8 left-8 z-10 flex items-center space-x-4">
        <span className="text-white text-sm">{currentSlide} / {totalSlides}</span>
        
        {/* 360 View Toggle Button */}
        <button 
          className={`px-4 py-2 rounded-full ${autoRotate ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white'} font-bold transition-colors`}
          onClick={toggleAutoRotate}
        >
          {autoRotate ? '360° ON' : '360° OFF'}
        </button>
      </div>
      
      {/* Loading overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <div className="text-white text-xl font-bold opacity-0 transition-opacity duration-500" id="loading-text">
          Loading 3D Model...
        </div>
      </div>
      
      {/* Canvas for 3D scene */}
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 100 }}
        className="bg-transparent z-10"
      >
        <fog attach="fog" args={['#111111', 5, 15]} />
        <ambientLight intensity={0.8} />
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} 
          castShadow 
          shadow-mapSize={[2048, 2048]} 
        />
        <spotLight 
          position={[-5, 5, 5]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[2048, 2048]} 
        />
        <directionalLight 
          position={[0, 5, 0]} 
          intensity={1} 
          castShadow 
        />
        <Suspense fallback={null}>
          {modelType === 'shoes' && (
            <ShoeModel 
              selectedColor={selectedColor} 
              activeModel={activeModel} 
              enableColorChange={enableColorChange}
              position={modelPosition}
              rotation={modelRotation}
              autoRotate={autoRotate} // Use the autoRotate state
            />
          )}
          {modelType === 'tshirt' && (
            <TShirtModel 
              selectedColor={selectedColor} 
              hovered={false}
              enableColorChange={enableColorChange}
              position={modelPosition}
              rotation={modelRotation}
              autoRotate={autoRotate} // Add autoRotate prop
            />
          )}
          {modelType === 'pants' && (
            <PantsModel 
              selectedColor={selectedColor} 
              hovered={false}
              enableColorChange={enableColorChange}
              position={modelPosition}
              rotation={modelRotation}
              autoRotate={autoRotate} // Add autoRotate prop
            />
          )}
          {modelType === 'sneakers' && (
            <SneakersModel 
              selectedColor={selectedColor} 
              hovered={false}
              enableColorChange={enableColorChange}
              position={modelPosition}
              rotation={modelRotation}
              autoRotate={autoRotate} // Add autoRotate prop
            />
          )}
        </Suspense>
      </Canvas>
      
      {/* Model version selector UI */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {/* Shoes model switcher */}
        {modelType === 'shoes' && (
          <>
            <div 
              className={`w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${activeModel === 'nike' ? 'border-yellow-400' : 'border-transparent'}`}
              onClick={() => handleModelSwitch('nike')}
            >
              <div className="w-full h-full bg-white flex items-center justify-center">
                <Image src="/nike1.png" alt="Nike Shoe" width={100} height={50} className="object-cover" />
              </div>
            </div>
            <div 
              className={`w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${activeModel === 'regular' ? 'border-yellow-400' : 'border-transparent'}`}
              onClick={() => handleModelSwitch('regular')}
            >
              <div className="w-full h-full bg-white flex items-center justify-center">
                <Image src="/nike2.png" alt="Regular Shoe" width={100} height={50} className="object-cover" />
              </div>
            </div>
          </>
        )}
        
        {/* T-shirt version selector */}
        {modelType === 'tshirt' && (
          <>
            <div 
              className={`w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${tshirtVersion === 'v1' ? 'border-yellow-400' : 'border-transparent'}`}
              onClick={() => setTshirtVersion('v1')}
            >
              <div className="w-full h-full bg-white flex items-center justify-center">
                <span className="text-black font-bold">V1</span>
              </div>
            </div>
            <div 
              className={`w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${tshirtVersion === 'v2' ? 'border-yellow-400' : 'border-transparent'}`}
              onClick={() => setTshirtVersion('v2')}
            >
              <div className="w-full h-full bg-white flex items-center justify-center">
                <span className="text-black font-bold">V2</span>
              </div>
            </div>
            <div 
              className={`w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${tshirtVersion === 'v3' ? 'border-yellow-400' : 'border-transparent'}`}
              onClick={() => setTshirtVersion('v3')}
            >
              <div className="w-full h-full bg-white flex items-center justify-center">
                <span className="text-black font-bold">V3</span>
              </div>
            </div>
          </>
        )}
        
        {/* Pants version selector */}
        {modelType === 'pants' && (
          <>
            <div 
              className={`w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${pantsVersion === 'v1' ? 'border-yellow-400' : 'border-transparent'}`}
              onClick={() => setPantsVersion('v1')}
            >
              <div className="w-full h-full bg-white flex items-center justify-center">
                <span className="text-black font-bold">V1</span>
              </div>
            </div>
            <div 
              className={`w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${pantsVersion === 'v2' ? 'border-yellow-400' : 'border-transparent'}`}
              onClick={() => setPantsVersion('v2')}
            >
              <div className="w-full h-full bg-white flex items-center justify-center">
                <span className="text-black font-bold">V2</span>
              </div>
            </div>
            <div 
              className={`w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${pantsVersion === 'v3' ? 'border-yellow-400' : 'border-transparent'}`}
              onClick={() => setPantsVersion('v3')}
            >
              <div className="w-full h-full bg-white flex items-center justify-center">
                <span className="text-black font-bold">V3</span>
              </div>
            </div>
          </>
        )}
        
        {/* Sneakers version selector */}
        {modelType === 'sneakers' && (
          <>
            <div 
              className={`w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${sneakersVersion === 'v1' ? 'border-yellow-400' : 'border-transparent'}`}
              onClick={() => setSneakersVersion('v1')}
            >
              <div className="w-full h-full bg-white flex items-center justify-center">
                <span className="text-black font-bold">V1</span>
              </div>
            </div>
            <div 
              className={`w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${sneakersVersion === 'v2' ? 'border-yellow-400' : 'border-transparent'}`}
              onClick={() => setSneakersVersion('v2')}
            >
              <div className="w-full h-full bg-white flex items-center justify-center">
                <span className="text-black font-bold">V2</span>
              </div>
            </div>
            <div 
              className={`w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${sneakersVersion === 'v3' ? 'border-yellow-400' : 'border-transparent'}`}
              onClick={() => setSneakersVersion('v3')}
            >
              <div className="w-full h-full bg-white flex items-center justify-center">
                <span className="text-black font-bold">V3</span>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* UI Controls - only show if color change is enabled */}
      {enableColorChange && (
        <ControlPanel 
          selectedColor={selectedColor} 
          onColorSelect={setSelectedColor} 
        />
      )}
    </div>
  );
}
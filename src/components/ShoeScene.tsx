'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import ShoeModel, { COLORS } from './ShoeModel';
import ControlPanel from './ControlPanel';
import Image from 'next/image';

export default function ShoeScene() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0].color);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [activeModel, setActiveModel] = useState<'nike' | 'regular'>('nike');
  const totalSlides = 5;
  
  // Switch model when thumbnail is clicked
  const handleModelSwitch = (model: 'nike' | 'regular') => {
    setActiveModel(model);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-700 to-gray-900">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-4">
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold">Shoe<span className="text-yellow-400">Box</span> <span className="text-2xl">□</span></h1>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <button className="text-white hover:text-yellow-400 transition-colors">Mens</button>
          <button className="text-white hover:text-yellow-400 transition-colors">Women</button>
          <button className="text-white hover:text-yellow-400 transition-colors">Kids</button>
          <button className="text-white hover:text-yellow-400 transition-colors">Customize</button>
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
        <h2 className="text-white text-7xl font-bold leading-tight">NIKE<br/>AIR<br/>RUN</h2>
        <p className="text-yellow-400 text-3xl font-bold mt-4">£109.95</p>
        <button className="mt-6 bg-yellow-400 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105">
          GET IT NOW
        </button>
      </div>
      
      {/* Circular Highlight */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 border-yellow-400 rounded-full z-0"></div>
      
      {/* Slide Indicator */}
      <div className="absolute bottom-8 left-8 z-10 flex items-center space-x-2">
        <span className="text-white text-sm">{currentSlide} / {totalSlides}</span>
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
        {/* <color attach="background" args={['rgba(0,0,0,0)']} /> */}
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
          <ShoeModel selectedColor={selectedColor} activeModel={activeModel} />
        </Suspense>
      </Canvas>
      
      {/* Model switcher UI with thumbnails */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
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
      </div>
      
      {/* UI Controls */}
      <ControlPanel 
        selectedColor={selectedColor} 
        onColorSelect={setSelectedColor} 
      />
    </div>
  );
}
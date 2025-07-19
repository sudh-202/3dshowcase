'use client';

import { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group, Mesh, MeshStandardMaterial, Object3D } from 'three';
import FallbackShoeModel from './FallbackShoeModel';
import LoadingSpinner from '@/components/LoadingSpinner';

interface BaseModelProps {
  modelPath: string;
  selectedColor?: string;
  hovered?: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  enableColorChange?: boolean;
  colorExclusions?: string[];
}

export default function BaseModel({
  modelPath,
  selectedColor = '#ffffff',
  hovered = false,
  scale = 10,
  position = [0, -1, 0],
  rotation = [0, Math.PI / 2, 0], // Default rotation to face left
  enableColorChange = true,
  colorExclusions = ['sole', 'laces']
}: BaseModelProps) {
  const materialRefs = useRef<MeshStandardMaterial[]>([]);
  const [scene, setScene] = useState<Group | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  
  // Preload models to ensure they're available
  useEffect(() => {
    try {
      // Preload the model
      useGLTF.preload(modelPath);
      console.log(`Preloaded model: ${modelPath}`);
    } catch (err) {
      console.warn(`Failed to preload model ${modelPath}:`, err);
      // Continue execution - the main loader will handle this
    }
  }, [modelPath]);

  // Load the model
  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 5; // Increased max retries
    
    const loadModel = async () => {
      try {
        console.log(`Attempting to load model from ${modelPath} (attempt ${retryCount + 1}/${maxRetries})`);
        
        // Create a new AbortController
        const controller = new AbortController();
        const signal = controller.signal;
        
        // Set a timeout to abort the fetch if it takes too long
        const timeoutId = setTimeout(() => controller.abort(), 20000); // Increased timeout further
        
        // Try different cache strategies based on retry count
        const cacheStrategy = retryCount % 2 === 0 ? 'no-store' : 'reload';
        const headers = {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        };
        
        // Add a cache-busting query parameter
        const cacheBuster = `?t=${Date.now()}`;
        const modelUrl = `${modelPath}${cacheBuster}`;
        
        // Manually fetch the model first to check if it's accessible
        console.log(`Fetching with cache strategy: ${cacheStrategy}`);
        const response = await fetch(modelUrl, { 
          signal,
          cache: cacheStrategy as RequestCache,
          headers,
          mode: 'cors',
          credentials: 'same-origin'
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch model: ${response.status} ${response.statusText}`);
        }
        
        // If fetch was successful, load with useGLTF
        // Use the original path for useGLTF to maintain proper caching
        const gltf = await new Promise((resolve, reject) => {
          try {
            const result = useGLTF(modelPath);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });

        console.log(`Model loaded successfully:`, gltf);
        
        if (isMounted) {
          setScene((gltf as any).scene);
          setError(null); // Clear any previous errors
        }
      } catch (err) {
        console.error(`Error loading model (attempt ${retryCount + 1}/${maxRetries}):`, err);
        // More detailed error logging
        if (err instanceof Error) {
          console.error('Error name:', err.name);
          console.error('Error message:', err.message);
          console.error('Error stack:', err.stack);
        }
        
        // Retry loading if we haven't exceeded max retries
        if (retryCount < maxRetries && isMounted) {
          retryCount++;
          const delay = 1000 * Math.pow(1.5, retryCount); // Exponential backoff
          console.log(`Retrying model load (${retryCount}/${maxRetries}) after ${delay}ms...`);
          setTimeout(loadModel, delay);
        } else if (isMounted) {
          console.error('Max retries exceeded, giving up on model load');
          setError(err instanceof Error ? err : new Error('Unknown error loading model'));
        }
      }
    };
    
    loadModel();
    
    return () => {
      isMounted = false;
    };
  }, [modelPath]);
  
  // Apply color to materials if color change is enabled
  useEffect(() => {
    if (enableColorChange && materialRefs.current.length > 0) {
      materialRefs.current.forEach(material => {
        if (material) {
          // Skip materials in the exclusion list
          if (!colorExclusions.includes(material.name)) {
            material.color.set(selectedColor);
          }
        }
      });
    }
  }, [selectedColor, enableColorChange, colorExclusions]);
  
  // Collect materials that can be colored
  useEffect(() => {
    if (scene) {
      const newMaterialRefs: MeshStandardMaterial[] = [];
      scene.traverse((object: Object3D) => {
        if (object instanceof Mesh && object.material) {
          // Handle both single materials and material arrays
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => {
              if (mat instanceof MeshStandardMaterial) {
                newMaterialRefs.push(mat);
              }
            });
          } else if (object.material instanceof MeshStandardMaterial) {
            newMaterialRefs.push(object.material);
          }
        }
      });
      materialRefs.current = newMaterialRefs;
    }
  }, [scene]);

  // If there was an error loading the model, return a fallback
  if (error) {
    console.error('Error in BaseModel:', error);
    return <FallbackShoeModel selectedColor={selectedColor} hovered={hovered} />;
  }
  
  // Return the 3D model if it's loaded
  return scene ? (
    <primitive 
      object={scene} 
      scale={scale}
      position={position}
      rotation={rotation}
      // dispose={null} 
    />
  ) : (
    // Return a loading indicator while the model is loading
    <LoadingSpinner />
  );
}
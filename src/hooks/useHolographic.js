import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export const useHolographic = () => {
  const holographicRef = useRef();
  const [effect, setEffect] = useState({
    rotation: { x: 0, y: 0 },
    lighting: { intensity: 1, color: '#00ff88' },
    depth: 0
  });

  useEffect(() => {
    const element = holographicRef.current;
    const scene = new THREE.Scene();
    
    const handleMouseMove = (e) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      // Advanced 3D transformations
      const rotationX = y * 25;
      const rotationY = x * 25;
      const depth = Math.sqrt(x * x + y * y) * 50;
      
      // Dynamic rainbow holographic effect
      const hue = ((x + y + 1) * 180) % 360;
      const saturation = 80 + depth;
      const lightness = 60 - depth * 0.5;
      
      setEffect({
        rotation: { x: rotationX, y: rotationY },
        lighting: {
          intensity: 1 - depth * 0.01,
          color: `hsl(${hue}, ${saturation}%, ${lightness}%)`
        },
        depth
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    return () => element.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return { holographicRef, effect };
};

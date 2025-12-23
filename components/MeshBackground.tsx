
import React, { useEffect, useRef } from 'react';

const MeshBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth);
      const y = (clientY / window.innerHeight);
      
      // Update custom properties for various layers with different intensities
      containerRef.current.style.setProperty('--m-x', `${x * 100}%`);
      containerRef.current.style.setProperty('--m-y', `${y * 100}%`);
      
      // Secondary parallax offsets
      containerRef.current.style.setProperty('--m-x-slow', `${(x * 50) + 25}%`);
      containerRef.current.style.setProperty('--m-y-slow', `${(y * 50) + 25}%`);
      
      containerRef.current.style.setProperty('--m-x-fast', `${(x * 150) - 25}%`);
      containerRef.current.style.setProperty('--m-y-fast', `${(y * 150) - 25}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]"
      style={{
        '--m-x': '50%',
        '--m-y': '50%',
        '--m-x-slow': '50%',
        '--m-y-slow': '50%',
        '--m-x-fast': '50%',
        '--m-y-fast': '50%',
      } as React.CSSProperties}
    >
      {/* Mesh Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        
        {/* Deep Purple Glow - Slow Drifting */}
        <div 
          className="absolute w-[100vw] h-[100vh] rounded-full blur-[140px] opacity-40 mix-blend-screen animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%)',
            top: 'var(--m-y-slow)',
            left: 'var(--m-x-slow)',
            transform: 'translate(-50%, -50%)',
            transition: 'top 1.5s cubic-bezier(0.1, 0, 0.2, 1), left 1.5s cubic-bezier(0.1, 0, 0.2, 1)',
            willChange: 'top, left'
          }}
        />

        {/* Electric Blue - Responsive Layer */}
        <div 
          className="absolute w-[80vw] h-[80vh] rounded-full blur-[120px] opacity-30 mix-blend-overlay"
          style={{
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.5) 0%, transparent 70%)',
            top: 'var(--m-y)',
            left: 'var(--m-x)',
            transform: 'translate(-50%, -50%)',
            transition: 'top 0.8s cubic-bezier(0.1, 0, 0.2, 1), left 0.8s cubic-bezier(0.1, 0, 0.2, 1)',
            willChange: 'top, left'
          }}
        />

        {/* Slate Depth - Static Breathing */}
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vh] bg-slate-800/20 rounded-full blur-[150px] animate-[pulse_12s_infinite]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vh] bg-blue-900/20 rounded-full blur-[130px] animate-[pulse_18s_infinite]"></div>

        {/* Sharp Electric Accent - Fast following */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.6) 0%, transparent 60%)',
            top: 'var(--m-y-fast)',
            left: 'var(--m-x-fast)',
            transform: 'translate(-50%, -50%)',
            transition: 'top 0.4s cubic-bezier(0.1, 0, 0.2, 1), left 0.4s cubic-bezier(0.1, 0, 0.2, 1)',
            willChange: 'top, left'
          }}
        />
      </div>

      {/* SVG Grain Texture Filter */}
      <svg className="hidden">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      
      {/* Texture Overlays */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ filter: 'url(#grain)' }}></div>
      
      {/* Subtle Grid dots */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{ 
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', 
          backgroundSize: '48px 48px' 
        }}
      ></div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617] opacity-80"></div>
    </div>
  );
};

export default MeshBackground;

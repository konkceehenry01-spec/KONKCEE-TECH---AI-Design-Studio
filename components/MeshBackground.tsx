
import React, { useEffect, useRef } from 'react';

const MeshBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      
      containerRef.current.style.setProperty('--mouse-x', `${x}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0a]"
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%'
      } as React.CSSProperties}
    >
      {/* Dynamic Gradients */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[var(--mouse-y)] left-[var(--mouse-x)] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/30 rounded-full blur-[120px] transition-all duration-300"></div>
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-slate-800/20 rounded-full blur-[100px] animate-[pulse_10s_infinite]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[120px] animate-[pulse_15s_infinite]"></div>
      </div>
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150"></div>
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      ></div>
    </div>
  );
};

export default MeshBackground;

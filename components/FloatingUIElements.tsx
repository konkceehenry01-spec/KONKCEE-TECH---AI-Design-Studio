
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingUIElements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
      // Floating animation
      gsap.to(card, {
        y: '+=20',
        x: '+=10',
        rotationZ: '+=2',
        rotationX: '+=5',
        duration: 3 + index,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * 0.5
      });

      // Mouse interactive tilt
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;

        gsap.to(card, {
          rotationY: moveX,
          rotationX: -moveY,
          duration: 0.5,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none perspective-2000 overflow-hidden">
      {/* Business Card Preview */}
      <div className="floating-card absolute top-[15%] left-[5%] w-64 h-36 glass rounded-xl border-white/20 p-6 hidden lg:block opacity-60">
        <div className="flex justify-between items-start mb-4">
          <div className="w-8 h-8 rounded bg-indigo-500"></div>
          <div className="text-[8px] font-bold text-slate-500 tracking-widest uppercase">Member Card</div>
        </div>
        <div className="h-4 w-3/4 bg-white/10 rounded mb-2"></div>
        <div className="h-2 w-1/2 bg-white/10 rounded"></div>
        <div className="absolute bottom-6 left-6 flex gap-2">
           <div className="w-4 h-4 rounded-full bg-slate-800 border border-white/10"></div>
           <div className="w-4 h-4 rounded-full bg-slate-800 border border-white/10"></div>
        </div>
      </div>

      {/* Ad Banner Preview */}
      <div className="floating-card absolute top-[60%] right-[10%] w-80 h-40 glass rounded-2xl border-white/10 p-2 hidden lg:block opacity-40">
        <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-900/40 to-slate-900/40 overflow-hidden relative">
          <div className="absolute top-4 left-4 space-y-2">
            <div className="h-3 w-24 bg-indigo-500/50 rounded"></div>
            <div className="h-2 w-16 bg-white/20 rounded"></div>
          </div>
          <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full border border-indigo-500/30 flex items-center justify-center">
            <div className="w-6 h-6 bg-indigo-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Mobile Design Preview */}
      <div className="floating-card absolute bottom-[10%] left-[20%] w-48 h-80 glass rounded-[32px] border-white/20 p-4 hidden lg:block opacity-50">
        <div className="w-full h-6 rounded-full bg-black/40 mb-4 flex justify-center items-center">
          <div className="w-8 h-1 bg-white/10 rounded-full"></div>
        </div>
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl bg-white/5 border border-white/5"></div>
          <div className="h-2 w-full bg-white/20 rounded"></div>
          <div className="h-2 w-2/3 bg-white/10 rounded"></div>
          <div className="h-8 w-full bg-indigo-600/30 rounded-xl mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingUIElements;

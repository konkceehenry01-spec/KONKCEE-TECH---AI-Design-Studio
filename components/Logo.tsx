
import React, { useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-48", animated = true }) => {
  const [isReady, setIsReady] = useState(!animated);

  useEffect(() => {
    if (animated) {
      // Small delay to ensure the component is mounted before starting the drawing animation
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  return (
    <svg 
      viewBox="0 0 420 60" 
      className={`${className} transition-all duration-700`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      {/* The "K" Symbol drawing */}
      <path 
        d="M20 10V50M20 30L45 10M20 30L45 50" 
        stroke="url(#logoGradient)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        filter={isReady ? "url(#neonGlow)" : ""}
        style={{
          strokeDasharray: 200,
          strokeDashoffset: isReady ? 0 : 200,
          transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: isReady ? 1 : 0.3
        }}
      />

      {/* The Text drawing animation using stroke-dashoffset */}
      <text 
        x="60" 
        y="42" 
        stroke="currentColor"
        strokeWidth="0.8"
        fill={isReady ? "currentColor" : "transparent"}
        filter={isReady ? "url(#neonGlow)" : ""}
        style={{ 
          fontFamily: 'Space Grotesk', 
          fontWeight: 800, 
          fontSize: '36px',
          letterSpacing: '2px',
          strokeDasharray: 500,
          strokeDashoffset: isReady ? 0 : 500,
          transition: 'stroke-dashoffset 2.5s ease-in-out 0.5s, fill 1s ease-out 2s, filter 1s ease-out 2s',
          paintOrder: 'stroke'
        }}
      >
        KONKCEE-TECH
      </text>

      {/* Animated accent dot */}
      <circle 
        cx="410" 
        cy="30" 
        r="4" 
        fill="#6366f1" 
        className={isReady ? 'animate-pulse' : ''}
        style={{ 
          opacity: isReady ? 1 : 0, 
          transition: 'opacity 0.5s ease-out 2.5s',
          filter: 'drop-shadow(0 0 8px #6366f1)'
        }}
      />
    </svg>
  );
};

export default Logo;

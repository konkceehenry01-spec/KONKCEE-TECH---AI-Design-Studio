
import React, { useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-48", animated = true }) => {
  const [isReady, setIsReady] = useState(!animated);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  return (
    <svg 
      viewBox="0 0 400 60" 
      className={`${className} transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M20 10V50M20 30L45 10M20 30L45 50" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{
          strokeDasharray: 200,
          strokeDashoffset: isReady ? 0 : 200,
          transition: 'stroke-dashoffset 2s ease-in-out'
        }}
      />
      <text 
        x="60" 
        y="42" 
        fill="currentColor" 
        style={{ 
          fontFamily: 'Space Grotesk', 
          fontWeight: 800, 
          fontSize: '36px',
          letterSpacing: '2px',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 1s ease-out 1s'
        }}
      >
        KONKCEE-TECH
      </text>
      <circle 
        cx="390" 
        cy="30" 
        r="4" 
        fill="#6366f1" 
        className={isReady ? 'animate-pulse' : ''}
        style={{ opacity: isReady ? 1 : 0, transition: 'opacity 0.5s ease-out 2s' }}
      />
    </svg>
  );
};

export default Logo;

import * as React from 'react';

interface HappyBearMascotProps {
  withCandy?: boolean;
  animated?: boolean;
}

export function HappyBearMascot({ withCandy = true, animated = true }: HappyBearMascotProps) {
  return (
    <div className="flex justify-center mb-8">
      <svg 
        width="140" 
        height="140" 
        viewBox="0 0 120 140" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={animated ? 'animate-bounce' : ''}
        style={animated ? { animationDuration: '2s' } : {}}
      >
        {/* Bear Body */}
        <ellipse cx="60" cy="85" rx="30" ry="28" fill="#8B6F47"/>
        
        {/* Bear Head */}
        <circle cx="60" cy="55" r="26" fill="#A0826D"/>
        
        {/* Ears */}
        <circle cx="38" cy="32" r="12" fill="#8B6F47"/>
        <circle cx="82" cy="32" r="12" fill="#8B6F47"/>
        <circle cx="38" cy="32" r="7" fill="#D4A574"/>
        <circle cx="82" cy="32" r="7" fill="#D4A574"/>
        
        {/* Eyes - Happy closed eyes */}
        <path d="M 48 52 Q 50 56 54 54" stroke="#000000" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M 66 52 Q 68 56 72 54" stroke="#000000" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        
        {/* Eye shine */}
        <circle cx="50" cy="52" r="1" fill="#FFFFFF"/>
        <circle cx="68" cy="52" r="1" fill="#FFFFFF"/>
        
        {/* Blush */}
        <ellipse cx="42" cy="58" rx="6" ry="4" fill="#FFB6C1" opacity="0.6"/>
        <ellipse cx="78" cy="58" rx="6" ry="4" fill="#FFB6C1" opacity="0.6"/>
        
        {/* Nose */}
        <ellipse cx="60" cy="62" rx="5" ry="4" fill="#000000"/>
        
        {/* Big happy smile */}
        <path d="M 50 65 Q 60 72 70 65" stroke="#000000" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        
        {/* Mouth inside - tongue */}
        <ellipse cx="60" cy="70" rx="4" ry="3" fill="#FF69B4" opacity="0.7"/>
        
        {/* Top Hat */}
        <g>
          {/* Hat band */}
          <ellipse cx="60" cy="28" rx="28" ry="6" fill="#1a1a1a"/>
          {/* Hat body */}
          <rect x="38" y="15" width="44" height="14" fill="#2a2a2a" rx="3"/>
          {/* Hat top */}
          <ellipse cx="60" cy="15" rx="20" ry="5" fill="#3a3a3a"/>
          {/* Hat band decoration - red stripe */}
          <rect x="38" y="27" width="44" height="3" fill="#DC143C"/>
        </g>
        
        {/* Arms */}
        <ellipse cx="32" cy="85" rx="10" ry="16" fill="#8B6F47" transform="rotate(-25 32 85)"/>
        <ellipse cx="88" cy="85" rx="10" ry="16" fill="#8B6F47" transform="rotate(25 88 85)"/>
        
        {/* Hands */}
        <circle cx="25" cy="98" r="7" fill="#A0826D"/>
        <circle cx="95" cy="98" r="7" fill="#A0826D"/>
        
        {/* Left hand holding candy */}
        {withCandy && (
          <g>
            {/* Candy in left hand */}
            <circle cx="18" cy="95" r="5" fill="#FF69B4"/>
            <circle cx="18" cy="95" r="3" fill="#FFB6C1"/>
          </g>
        )}
        
        {/* Right hand holding candy */}
        {withCandy && (
          <g>
            {/* Candy in right hand */}
            <circle cx="102" cy="95" r="5" fill="#FF1493"/>
            <circle cx="102" cy="95" r="3" fill="#FF69B4"/>
          </g>
        )}
        
        {/* Legs */}
        <ellipse cx="50" cy="115" rx="9" ry="15" fill="#8B6F47"/>
        <ellipse cx="70" cy="115" rx="9" ry="15" fill="#8B6F47"/>
        
        {/* Feet */}
        <ellipse cx="50" cy="132" rx="8" ry="6" fill="#6B5437"/>
        <ellipse cx="70" cy="132" rx="8" ry="6" fill="#6B5437"/>
        
        {/* Sparkles around the bear */}
        <g opacity="0.9">
          <path d="M 15 45 L 17 47 L 15 49 L 13 47 Z" fill="#FFD700"/>
          <path d="M 105 50 L 107 52 L 105 54 L 103 52 Z" fill="#FFD700"/>
          <path d="M 30 20 L 31 21 L 30 22 L 29 21 Z" fill="#FFA500"/>
          <path d="M 100 75 L 101 76 L 100 77 L 99 76 Z" fill="#FFA500"/>
          <path d="M 70 20 L 71 21 L 70 22 L 69 21 Z" fill="#FFD700"/>
        </g>
      </svg>
    </div>
  );
}

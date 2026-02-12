import * as React from 'react';

interface OwlMascotProps {
  size?: number;
  showGraduationCap?: boolean;
}

export function OwlMascot({ size = 120, showGraduationCap = true }: OwlMascotProps) {
  return (
    <div className="flex justify-center">
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="60" cy="80" rx="32" ry="28" fill="#8B7355"/>
        <ellipse cx="60" cy="80" rx="26" ry="22" fill="#DEB887"/>
        
        {/* Head */}
        <circle cx="60" cy="50" r="30" fill="#8B7355"/>
        <circle cx="60" cy="50" r="24" fill="#DEB887"/>
        
        {/* Ear tufts */}
        <path d="M 35 28 L 30 18 L 38 25 Z" fill="#8B7355"/>
        <path d="M 85 28 L 90 18 L 82 25 Z" fill="#8B7355"/>
        
        {/* Eyes (large and expressive) */}
        <circle cx="48" cy="48" r="12" fill="#FFFFFF"/>
        <circle cx="72" cy="48" r="12" fill="#FFFFFF"/>
        <circle cx="48" cy="48" r="8" fill="#000000"/>
        <circle cx="72" cy="48" r="8" fill="#000000"/>
        <circle cx="50" cy="46" r="3" fill="#FFFFFF"/>
        <circle cx="74" cy="46" r="3" fill="#FFFFFF"/>
        
        {/* Beak */}
        <path d="M 60 55 L 55 62 L 65 62 Z" fill="#FFA500"/>
        
        {/* Wings */}
        <ellipse cx="32" cy="75" rx="10" ry="18" fill="#8B7355" transform="rotate(-15 32 75)"/>
        <ellipse cx="88" cy="75" rx="10" ry="18" fill="#8B7355" transform="rotate(15 88 75)"/>
        
        {/* Feet */}
        <g>
          <path d="M 48 105 L 45 110 M 48 105 L 48 110 M 48 105 L 51 110" stroke="#FFA500" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 72 105 L 69 110 M 72 105 L 72 110 M 72 105 L 75 110" stroke="#FFA500" strokeWidth="2" strokeLinecap="round"/>
        </g>
        
        {/* Blush */}
        <ellipse cx="38" cy="58" rx="5" ry="3" fill="#FFB6C1" opacity="0.6"/>
        <ellipse cx="82" cy="58" rx="5" ry="3" fill="#FFB6C1" opacity="0.6"/>
        
        {showGraduationCap && (
          <>
            {/* Graduation Cap - Base */}
            <ellipse cx="60" cy="28" rx="28" ry="6" fill="#1a1a1a"/>
            
            {/* Graduation Cap - Top */}
            <rect x="38" y="18" width="44" height="10" fill="#000000" rx="2"/>
            
            {/* Tassel */}
            <line x1="82" y1="23" x2="90" y2="31" stroke="#FFD700" strokeWidth="2"/>
            <circle cx="90" cy="33" r="3" fill="#FFD700"/>
          </>
        )}
        
        {/* Sparkles */}
        <g opacity="0.7">
          <path d="M 18 55 L 20 57 L 18 59 L 16 57 Z" fill="#FFD700"/>
          <path d="M 102 50 L 104 52 L 102 54 L 100 52 Z" fill="#FFD700"/>
          <path d="M 25 35 L 26 36 L 25 37 L 24 36 Z" fill="#FFA500"/>
          <path d="M 95 65 L 96 66 L 95 67 L 94 66 Z" fill="#FFA500"/>
        </g>
      </svg>
    </div>
  );
}

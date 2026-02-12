import * as React from 'react';

export function GraduationMascot() {
  return (
    <div className="flex justify-center mb-4">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bear Body */}
        <ellipse cx="60" cy="75" rx="28" ry="25" fill="#FFD7A8"/>
        
        {/* Bear Head */}
        <circle cx="60" cy="50" r="24" fill="#FFE4C4"/>
        
        {/* Ears */}
        <circle cx="42" cy="35" r="10" fill="#FFD7A8"/>
        <circle cx="78" cy="35" r="10" fill="#FFD7A8"/>
        <circle cx="42" cy="35" r="6" fill="#FFB6C1"/>
        <circle cx="78" cy="35" r="6" fill="#FFB6C1"/>
        
        {/* Eyes */}
        <circle cx="52" cy="48" r="4" fill="#000000"/>
        <circle cx="68" cy="48" r="4" fill="#000000"/>
        <circle cx="53" cy="47" r="1.5" fill="#FFFFFF"/>
        <circle cx="69" cy="47" r="1.5" fill="#FFFFFF"/>
        
        {/* Blush */}
        <ellipse cx="44" cy="54" rx="5" ry="3" fill="#FFB6C1" opacity="0.5"/>
        <ellipse cx="76" cy="54" rx="5" ry="3" fill="#FFB6C1" opacity="0.5"/>
        
        {/* Nose */}
        <ellipse cx="60" cy="56" rx="4" ry="3" fill="#000000"/>
        
        {/* Smile */}
        <path d="M 52 58 Q 60 64 68 58" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round"/>
        
        {/* Graduation Cap - Base */}
        <ellipse cx="60" cy="32" rx="26" ry="6" fill="#1a1a1a"/>
        
        {/* Graduation Cap - Top */}
        <rect x="40" y="22" width="40" height="10" fill="#000000" rx="2"/>
        
        {/* Tassel */}
        <line x1="80" y1="27" x2="88" y2="35" stroke="#FFD700" strokeWidth="2"/>
        <circle cx="88" cy="37" r="3" fill="#FFD700"/>
        
        {/* Arms */}
        <ellipse cx="35" cy="78" rx="8" ry="14" fill="#FFD7A8" transform="rotate(-20 35 78)"/>
        <ellipse cx="85" cy="78" rx="8" ry="14" fill="#FFD7A8" transform="rotate(20 85 78)"/>
        
        {/* Thumbs up hand */}
        <g transform="translate(85, 65) rotate(15)">
          <ellipse cx="0" cy="0" rx="5" ry="7" fill="#FFD7A8"/>
          <rect x="-2" y="-12" width="4" height="10" fill="#FFD7A8" rx="2"/>
        </g>
        
        {/* Toga/Gown */}
        <path d="M 35 75 L 60 95 L 85 75 L 80 100 L 40 100 Z" fill="#4169E1" opacity="0.8"/>
        
        {/* Sparkles */}
        <g opacity="0.8">
          <path d="M 20 50 L 22 52 L 20 54 L 18 52 Z" fill="#FFD700"/>
          <path d="M 100 45 L 102 47 L 100 49 L 98 47 Z" fill="#FFD700"/>
          <path d="M 30 25 L 31 26 L 30 27 L 29 26 Z" fill="#FFA500"/>
          <path d="M 95 60 L 96 61 L 95 62 L 94 61 Z" fill="#FFA500"/>
        </g>
      </svg>
    </div>
  );
}

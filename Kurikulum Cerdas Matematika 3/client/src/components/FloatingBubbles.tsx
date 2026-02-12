import * as React from 'react';

export function FloatingBubbles() {
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bubble-float"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: '-100px',
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
            background: `radial-gradient(circle at 30% 30%, 
              rgba(147, 197, 253, 0.3), 
              rgba(196, 181, 253, 0.2))`,
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.3)',
          }}
        />
      ))}
    </div>
  );
}

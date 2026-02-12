import * as React from 'react';

interface MascotProps {
  isVisible: boolean;
  isCorrect: boolean;
}

export function Mascot({ isVisible, isCorrect }: MascotProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="mascot-appear">
        <div className="relative">
          {/* Cute animal mascot - happy cat */}
          <div className="text-9xl animate-bounce">
            {isCorrect ? '😺' : '🐱'}
          </div>
          
          {/* Thumbs up animation */}
          {isCorrect && (
            <div className="absolute -right-8 top-4 text-6xl thumbs-up-animation">
              👍
            </div>
          )}
          
          {/* Speech bubble with encouragement */}
          <div className={`absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap ${
            isCorrect ? 'bg-green-400' : 'bg-yellow-400'
          } text-white px-6 py-3 rounded-2xl text-xl font-bold shadow-lg speech-bubble`}>
            {isCorrect ? 'Hebat sekali! 🌟' : 'Ayo coba lagi! 💪'}
          </div>
        </div>
      </div>
    </div>
  );
}

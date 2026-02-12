import * as React from 'react';
import { OwlMascot } from '../components/OwlMascot';
import { Lesson } from '../types/language';
import { speakWord, playSuccessSound } from '../lib/audioUtils';
import { Button } from '../components/ui/button';

interface LessonDetailPageProps {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
}

export function LessonDetailPage({ lesson, onComplete, onBack }: LessonDetailPageProps) {
  const [step, setStep] = React.useState(1);
  const [showConfetti, setShowConfetti] = React.useState(false);

  function handleListen() {
    speakWord(lesson.word);
  }

  function handleRepeat() {
    // In a real app, this would use speech recognition
    setShowConfetti(true);
    playSuccessSound();
    setTimeout(() => {
      setStep(2);
      setShowConfetti(false);
    }, 2000);
  }

  function handleFinish() {
    setShowConfetti(true);
    playSuccessSound();
    setTimeout(() => {
      onComplete();
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${Math.random() * 2 + 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg active:scale-95 transition-transform"
          >
            <div className="text-3xl">←</div>
          </button>
          <OwlMascot size={80} />
          <div className="w-16"></div>
        </div>

        {step === 1 && (
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur rounded-3xl p-12 shadow-2xl mb-6">
              <div className="text-9xl mb-6">{lesson.imageUrl}</div>
              <h2 className="text-5xl font-bold text-purple-800 mb-3">{lesson.word}</h2>
              <p className="text-3xl text-gray-600">{lesson.translation}</p>
            </div>

            <button
              onClick={handleListen}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-3xl p-8 mb-4 shadow-lg active:scale-95 transition-transform"
            >
              <div className="text-5xl mb-2">🔊</div>
              <div className="text-2xl font-bold">Listen</div>
            </button>

            <button
              onClick={handleRepeat}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-3xl p-8 shadow-lg active:scale-95 transition-transform"
            >
              <div className="text-5xl mb-2">🎤</div>
              <div className="text-2xl font-bold">Repeat</div>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur rounded-3xl p-12 shadow-2xl mb-6">
              <div className="text-7xl mb-6">🎉</div>
              <h2 className="text-4xl font-bold text-green-600 mb-3">Great job!</h2>
              <p className="text-2xl text-gray-700">You learned a new word!</p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-3xl p-8 shadow-lg active:scale-95 transition-transform"
            >
              <div className="text-5xl mb-2">✨</div>
              <div className="text-2xl font-bold">Continue</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

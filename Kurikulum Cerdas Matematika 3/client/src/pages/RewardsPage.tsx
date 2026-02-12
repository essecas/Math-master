import * as React from 'react';
import { OwlMascot } from '../components/OwlMascot';

interface RewardsPageProps {
  onBack: () => void;
}

export function RewardsPage({ onBack }: RewardsPageProps) {
  const rewards = [
    { id: '1', icon: '⭐', name: 'First Word', earned: true },
    { id: '2', icon: '🌟', name: '5 Words', earned: true },
    { id: '3', icon: '✨', name: '10 Words', earned: true },
    { id: '4', icon: '🏆', name: '20 Words', earned: false },
    { id: '5', icon: '👑', name: '50 Words', earned: false },
    { id: '6', icon: '🎖️', name: '5 Day Streak', earned: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200 pb-24">
      <div className="max-w-4xl mx-auto p-6">
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

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-purple-800 mb-2">Your Rewards! 🎉</h1>
          <p className="text-2xl text-purple-600">Keep learning to earn more!</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`rounded-3xl p-8 shadow-lg transition-all ${
                reward.earned
                  ? 'bg-gradient-to-br from-yellow-300 to-orange-300 scale-100'
                  : 'bg-gray-200 opacity-50 scale-95'
              }`}
            >
              <div className={`text-7xl mb-3 ${reward.earned ? 'animate-bounce' : 'grayscale'}`}>
                {reward.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{reward.name}</h3>
              {reward.earned && (
                <div className="mt-2 text-green-600 font-bold">✓ Earned!</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t-4 border-purple-300 shadow-2xl">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-2 p-4">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-2xl p-4 shadow-lg active:scale-95 transition-transform"
          >
            <div className="text-4xl mb-1">🏠</div>
            <div className="text-sm font-bold">Home</div>
          </button>
          <button className="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-2xl p-4 shadow-lg active:scale-95 transition-transform">
            <div className="text-4xl mb-1">📚</div>
            <div className="text-sm font-bold">Lessons</div>
          </button>
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-2xl p-4 shadow-lg scale-105 border-4 border-yellow-600">
            <div className="text-4xl mb-1">🏆</div>
            <div className="text-sm font-bold">Rewards</div>
          </button>
        </div>
      </div>
    </div>
  );
}

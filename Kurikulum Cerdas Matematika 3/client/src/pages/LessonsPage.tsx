import * as React from 'react';
import { OwlMascot } from '../components/OwlMascot';
import { Lesson } from '../types/language';
import { lessons, categories } from '../lib/lessonData';
import { speakWord } from '../lib/audioUtils';

interface LessonsPageProps {
  categoryId?: string;
  onSelectLesson: (lesson: Lesson) => void;
  onBack: () => void;
}

export function LessonsPage({ categoryId, onSelectLesson, onBack }: LessonsPageProps) {
  const categoryLessons = categoryId 
    ? lessons.filter(l => l.category === categoryId)
    : lessons;
  
  const category = categories.find(c => c.id === categoryId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-green-200 to-yellow-200 pb-24">
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

        <div className="text-center mb-6">
          <div className="text-6xl mb-2">{category?.icon || '📚'}</div>
          <h1 className="text-4xl font-bold text-purple-800 mb-2">{category?.name || 'All Lessons'}</h1>
          <p className="text-xl text-purple-600">Tap to learn!</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categoryLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-lg hover:scale-105 transition-transform active:scale-95 relative cursor-pointer"
              onClick={() => onSelectLesson(lesson)}
            >
              {lesson.completed && (
                <div className="absolute top-2 right-2 text-3xl">✅</div>
              )}
              <div className="text-6xl mb-3">{lesson.imageUrl}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{lesson.word}</h3>
              <p className="text-lg text-gray-600">{lesson.translation}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakWord(lesson.word);
                }}
                className="mt-3 bg-blue-500 text-white rounded-full p-3 active:scale-90 transition-transform"
              >
                🔊
              </button>
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
          <button className="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-2xl p-4 shadow-lg scale-105 border-4 border-green-600">
            <div className="text-4xl mb-1">📚</div>
            <div className="text-sm font-bold">Lessons</div>
          </button>
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-2xl p-4 shadow-lg active:scale-95 transition-transform">
            <div className="text-4xl mb-1">🏆</div>
            <div className="text-sm font-bold">Rewards</div>
          </button>
        </div>
      </div>
    </div>
  );
}

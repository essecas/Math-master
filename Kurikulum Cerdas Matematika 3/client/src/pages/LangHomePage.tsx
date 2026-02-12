import * as React from 'react';
import { OwlMascot } from '../components/OwlMascot';
import { ChildProfile } from '../types/language';
import { categories } from '../lib/lessonData';

interface LangHomePageProps {
  profile: ChildProfile;
  onSelectCategory: (categoryId: string) => void;
  onNavigate: (page: 'lessons' | 'rewards' | 'math') => void;
}

export function LangHomePage({ profile, onSelectCategory, onNavigate }: LangHomePageProps) {
  function handleNavigateLessons() {
    onNavigate('lessons');
  }

  function handleNavigateRewards() {
    onNavigate('rewards');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-foreground pb-32">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="relative max-w-4xl mx-auto p-6 z-10">
        <div className="text-center mb-12">
          <OwlMascot size={120} />
          <h1 className="text-4xl font-bold mb-2 mt-4">Hai {profile.name}! 👋</h1>
          <p className="text-xl text-muted-foreground">Pilih topik untuk belajar</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className="glass-effect backdrop-blur rounded-3xl p-8 shadow-soft-lg hover:scale-105 hover:shadow-soft-xl transition-all active:scale-95 border border-white/20 group"
            >
              <div className="text-6xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
              <h3 className="text-2xl font-bold text-foreground">{category.name}</h3>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="glass-effect backdrop-blur rounded-3xl p-8 shadow-soft-lg border border-white/20">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">12</div>
              <div className="text-base text-muted-foreground mt-2 font-medium">Diselesaikan</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500">5</div>
              <div className="text-base text-muted-foreground mt-2 font-medium">Hari Beruntun</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500">3</div>
              <div className="text-base text-muted-foreground mt-2 font-medium">Hadiah</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border px-4 py-4 shadow-soft-xl">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-2">
          <button
            className="flex flex-col items-center justify-center py-4 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-semibold shadow-soft-lg hover:shadow-soft-xl transition-shadow"
          >
            <span className="text-3xl mb-1">🏠</span>
            <span className="text-xs font-bold">Beranda</span>
          </button>
          <button
            onClick={handleNavigateLessons}
            className="flex flex-col items-center justify-center py-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold shadow-soft-lg hover:shadow-soft-xl transition-shadow hover:scale-105"
          >
            <span className="text-3xl mb-1">📚</span>
            <span className="text-xs font-bold">Pelajaran</span>
          </button>
          <button
            onClick={handleNavigateRewards}
            className="flex flex-col items-center justify-center py-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white font-semibold shadow-soft-lg hover:shadow-soft-xl transition-shadow hover:scale-105"
          >
            <span className="text-3xl mb-1">🏆</span>
            <span className="text-xs font-bold">Hadiah</span>
          </button>
          <button
            onClick={() => onNavigate('math')}
            className="flex flex-col items-center justify-center py-4 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white font-semibold shadow-soft-lg hover:shadow-soft-xl transition-shadow hover:scale-105"
          >
            <span className="text-3xl mb-1">🎓</span>
            <span className="text-xs font-bold">Matematika</span>
          </button>
        </div>
      </div>
    </div>
  );
}

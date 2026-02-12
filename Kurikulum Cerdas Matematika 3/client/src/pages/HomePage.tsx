import * as React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { User, UserStats } from '../types';
import { Flame } from 'lucide-react';
import { generateProgressMessage } from '../lib/progressMessages';

interface HomePageProps {
  user: User | null;
  stats: UserStats | { current_grade: number; current_level: number; streak_days: number; total_correct: number; total_questions: number };
  onSelectLevel: (grade: number, level: number) => void;
  onSelectBahasa: (grade: number) => void;
  onViewReport: () => void;
  onLogout: () => void;
  onNavigateToGradeSelect: () => void;
  onNavigateToLanguage: () => void;
}

interface LevelCompletion {
  score: number;
  total: number;
  percentage: number;
}

interface OperationProgress {
  level: string;
  completed: boolean;
  score: number;
  lastCompleted?: string;
}

interface UserProgress {
  penjumlahan?: OperationProgress;
  pengurangan?: OperationProgress;
  perkalian?: OperationProgress;
  pembagian?: OperationProgress;
}

export function HomePage({ user, stats, onSelectLevel, onSelectBahasa, onViewReport, onLogout, onNavigateToGradeSelect, onNavigateToLanguage }: HomePageProps) {
  const [levelCompletions, setLevelCompletions] = React.useState<Record<string, LevelCompletion>>({});
  const [welcomeMessage, setWelcomeMessage] = React.useState('');
  const [userProgress, setUserProgress] = React.useState<UserProgress>({});
  const [nextLevel, setNextLevel] = React.useState<string | null>(null);
  const nextLevelRef = React.useRef<HTMLDivElement>(null);

  const levels = [
    { id: 1, name: 'Penjumlahan', emoji: '➕', color: 'from-green-400 to-green-500' },
    { id: 2, name: 'Pengurangan', emoji: '➖', color: 'from-blue-400 to-blue-500' },
    { id: 3, name: 'Perkalian', emoji: '✖️', color: 'from-purple-400 to-purple-500' },
    { id: 4, name: 'Pembagian', emoji: '➗', color: 'from-pink-400 to-pink-500' }
  ];

  const grades = Array.from({ length: 12 }, (_, i) => i + 1);

  React.useEffect(() => {
    if (user && user.id) {
      // Fetch progress from new API
      const token = localStorage.getItem('token');
      if (token) {
        fetch('/api/progress', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(async res => {
            if (!res.ok) {
              console.error(`Progress API error! status: ${res.status}`);
              return [];
            }
            return res.json();
          })
          .then(progressData => {
            console.log('Progress data loaded:', progressData);
            if (Array.isArray(progressData)) {
              const progressMap: UserProgress = {};
              progressData.forEach((p: OperationProgress) => {
                progressMap[p.level] = p;
              });
              setUserProgress(progressMap);

              // Find next unfinished level
              const levelOrder = ['penjumlahan', 'pengurangan', 'perkalian', 'pembagian'];
              const nextUnfinished = levelOrder.find(l => !progressMap[l]?.completed);
              setNextLevel(nextUnfinished || null);

              // Check if all completed
              const allCompleted = levelOrder.every(l => progressMap[l]?.completed);
              if (allCompleted) {
                setWelcomeMessage('🎉 Yeay! Kamu sudah selesai semua! Mau ulang level favoritmu?');
              }
            }
          })
          .catch(err => {
            console.error('Failed to load progress:', err);
          });
      }

      fetch(`/api/level-completions/${user.id}`)
        .then(async res => {
          if (!res.ok) {
            console.error(`HTTP error! status: ${res.status}`);
            return {};
          }
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            console.error('Response is not JSON');
            return {};
          }
          return res.json();
        })
        .then(data => {
          if (data && typeof data === 'object') {
            setLevelCompletions(data);
          }
        })
        .catch(err => {
          console.error('Failed to load completions:', err);
          setLevelCompletions({});
        });

      // Generate welcome message based on progress
      const accuracy = stats.total_questions > 0 
        ? Math.round((stats.total_correct / stats.total_questions) * 100)
        : 0;
      
      const message = generateProgressMessage({
        total_soal: stats.total_questions,
        benar: stats.total_correct,
        akurasi: accuracy
      });
      
      if (!welcomeMessage.includes('Yeay')) {
        setWelcomeMessage(message.pesan);
      }
    }
  }, [user, stats]);

  // Auto scroll to next level
  React.useEffect(() => {
    if (nextLevel && nextLevelRef.current) {
      setTimeout(() => {
        nextLevelRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 500);
    }
  }, [nextLevel]);

  function getGradeName(grade: number): string {
    if (grade <= 6) return `Kelas ${grade} SD`;
    if (grade <= 9) return `Kelas ${grade - 6} SMP`;
    return `Kelas ${grade - 9} SMA`;
  }

  function getButtonClassName(isEnabled: boolean): string {
    if (isEnabled) {
      return 'w-24 h-24 rounded-3xl flex items-center justify-center shadow-md transition-all duration-200 relative bg-green-400 hover:scale-105 hover:shadow-lg cursor-pointer active:scale-95';
    }
    return 'w-24 h-24 rounded-3xl flex items-center justify-center shadow-md transition-all duration-200 relative bg-green-300 opacity-50 cursor-not-allowed';
  }

  function getBlueButtonClassName(isEnabled: boolean): string {
    if (isEnabled) {
      return 'w-24 h-24 rounded-3xl flex items-center justify-center shadow-md transition-all duration-200 relative bg-blue-400 hover:scale-105 hover:shadow-lg cursor-pointer active:scale-95';
    }
    return 'w-24 h-24 rounded-3xl flex items-center justify-center shadow-md transition-all duration-200 relative bg-blue-300 opacity-50 cursor-not-allowed';
  }

  function getPurpleButtonClassName(isEnabled: boolean): string {
    if (isEnabled) {
      return 'w-24 h-24 rounded-3xl flex items-center justify-center shadow-md transition-all duration-200 relative bg-purple-400 hover:scale-105 hover:shadow-lg cursor-pointer active:scale-95';
    }
    return 'w-24 h-24 rounded-3xl flex items-center justify-center shadow-md transition-all duration-200 relative bg-purple-300 opacity-50 cursor-not-allowed';
  }

  function getPinkButtonClassName(isEnabled: boolean): string {
    if (isEnabled) {
      return 'w-24 h-24 rounded-3xl flex items-center justify-center shadow-md transition-all duration-200 relative bg-pink-400 hover:scale-105 hover:shadow-lg cursor-pointer active:scale-95';
    }
    return 'w-24 h-24 rounded-3xl flex items-center justify-center shadow-md transition-all duration-200 relative bg-pink-300 opacity-50 cursor-not-allowed';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Subtle background elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Hai, {user ? user.username : 'Tamu'}! 👋
            </h1>
            <p className="text-lg text-muted-foreground mt-2">Mari belajar matematika hari ini</p>
          </div>
          <div className="flex items-center gap-3">
            {stats.streak_days > 0 && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-3 rounded-full shadow-soft-lg text-white font-semibold">
                <Flame className="w-5 h-5" />
                <span>{stats.streak_days}</span>
              </div>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onLogout} 
              className="rounded-lg font-medium"
            >
              Keluar
            </Button>
          </div>
        </div>

        {/* Welcome Message */}
        {welcomeMessage && (
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-primary/20 rounded-2xl">
            <CardContent className="pt-6 pb-6">
              <p className="text-lg font-semibold text-foreground text-center">
                {welcomeMessage}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Stats Card */}
        <Card className="mb-8 bg-gradient-to-br from-primary via-secondary to-accent text-white border-0 shadow-soft-xl rounded-2xl overflow-hidden">
          <CardContent className="pt-8 pb-8">
            <div className="grid grid-cols-3 gap-6 text-center mb-8">
              <div>
                <div className="text-5xl font-bold">{stats.total_correct || 0}</div>
                <div className="text-sm opacity-90 mt-2 font-medium">Jawaban Benar</div>
              </div>
              <div>
                <div className="text-5xl font-bold">{stats.total_questions || 0}</div>
                <div className="text-sm opacity-90 mt-2 font-medium">Total Soal</div>
              </div>
              <div>
                <div className="text-5xl font-bold">
                  {stats.total_questions > 0 
                    ? Math.round((stats.total_correct / stats.total_questions) * 100)
                    : 0}%
                </div>
                <div className="text-sm opacity-90 mt-2 font-medium">Akurasi</div>
              </div>
            </div>
            <Button
              className="w-full bg-white text-primary hover:bg-slate-50 font-semibold text-lg py-6 rounded-lg"
              onClick={onViewReport}
            >
              📊 Lihat Laporan Mingguan
            </Button>
          </CardContent>
        </Card>

        {/* Subject Indicator */}
        <div className="mb-6 flex items-center gap-3 bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-200">
          <span className="text-3xl">🎓</span>
          <div>
            <p className="text-sm text-muted-foreground">Mata Pelajaran Aktif</p>
            <p className="text-lg font-bold text-foreground">Matematika</p>
          </div>
        </div>

        {/* Current Progress */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-8 text-foreground text-center">
            Progresses: {getGradeName(stats.current_grade)}
          </h2>
          <div className="flex justify-center gap-6 flex-wrap">
            {/* Penjumlahan */}
            <div 
              className="flex flex-col items-center"
              ref={nextLevel === 'penjumlahan' ? nextLevelRef : null}
            >
              <button
                onClick={() => onSelectLevel(stats.current_grade, 1)}
                className={`${getButtonClassName(true)} ${nextLevel === 'penjumlahan' ? 'ring-4 ring-yellow-400 ring-offset-2 animate-pulse' : ''} ${userProgress.penjumlahan?.completed ? 'bg-green-500' : ''}`}
              >
                <span className="text-5xl font-black text-black leading-none">+</span>
                {userProgress.penjumlahan?.completed && (
                  <div className="absolute -top-3 -right-3 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white shadow-md">
                    ✓
                  </div>
                )}
                {nextLevel === 'penjumlahan' && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-yellow-600">
                    Lanjutkan →
                  </div>
                )}
              </button>
              <p className="text-sm font-bold text-gray-800 mt-4">Penjumlahan</p>
            </div>

            {/* Pengurangan */}
            <div 
              className="flex flex-col items-center"
              ref={nextLevel === 'pengurangan' ? nextLevelRef : null}
            >
              <button
                onClick={() => onSelectLevel(stats.current_grade, 2)}
                className={`${getBlueButtonClassName(true)} ${nextLevel === 'pengurangan' ? 'ring-4 ring-yellow-400 ring-offset-2 animate-pulse' : ''} ${userProgress.pengurangan?.completed ? 'bg-blue-500' : ''}`}
              >
                <span className="text-5xl font-black text-gray-600 leading-none">−</span>
                {userProgress.pengurangan?.completed && (
                  <div className="absolute -top-3 -right-3 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white shadow-md">
                    ✓
                  </div>
                )}
                {nextLevel === 'pengurangan' && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-yellow-600">
                    Lanjutkan →
                  </div>
                )}
              </button>
              <p className="text-sm font-bold text-gray-800 mt-4">Pengurangan</p>
            </div>

            {/* Perkalian */}
            <div 
              className="flex flex-col items-center"
              ref={nextLevel === 'perkalian' ? nextLevelRef : null}
            >
              <button
                onClick={() => onSelectLevel(stats.current_grade, 3)}
                className={`${getPurpleButtonClassName(true)} ${nextLevel === 'perkalian' ? 'ring-4 ring-yellow-400 ring-offset-2 animate-pulse' : ''} ${userProgress.perkalian?.completed ? 'bg-purple-500' : ''}`}
              >
                <span className="text-5xl font-black text-gray-600 leading-none">×</span>
                {userProgress.perkalian?.completed && (
                  <div className="absolute -top-3 -right-3 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white shadow-md">
                    ✓
                  </div>
                )}
                {nextLevel === 'perkalian' && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-yellow-600">
                    Lanjutkan →
                  </div>
                )}
              </button>
              <p className="text-sm font-bold text-gray-800 mt-4">Perkalian</p>
            </div>

            {/* Pembagian */}
            <div 
              className="flex flex-col items-center"
              ref={nextLevel === 'pembagian' ? nextLevelRef : null}
            >
              <button
                onClick={() => onSelectLevel(stats.current_grade, 4)}
                className={`${getPinkButtonClassName(true)} ${nextLevel === 'pembagian' ? 'ring-4 ring-yellow-400 ring-offset-2 animate-pulse' : ''} ${userProgress.pembagian?.completed ? 'bg-pink-500' : ''}`}
              >
                <span className="text-5xl font-black text-gray-600 leading-none">÷</span>
                {userProgress.pembagian?.completed && (
                  <div className="absolute -top-3 -right-3 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white shadow-md">
                    ✓
                  </div>
                )}
                {nextLevel === 'pembagian' && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-yellow-600">
                    Lanjutkan →
                  </div>
                )}
              </button>
              <p className="text-sm font-bold text-gray-800 mt-4">Pembagian</p>
            </div>
          </div>
        </div>

        {/* Grade Selection */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-foreground text-center">
            🎓 Pilih Kelas & Level Berbeda
          </h2>
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 cursor-pointer hover:shadow-xl transition-all duration-200 rounded-2xl" onClick={onNavigateToGradeSelect}>
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Jelajahi Semua Kelas</h3>
              <p className="text-muted-foreground mb-4">Kelas 1 SD sampai Kelas 12 SMA tersedia!</p>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold px-8 py-3 rounded-xl">
                Lihat Semua Kelas →
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border px-4 py-4 shadow-soft-xl">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-3">
            <button
              className="flex flex-col items-center justify-center py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-soft-lg hover:shadow-soft-xl transition-shadow"
            >
              <span className="text-4xl mb-1">🎓</span>
              <span className="text-xs font-bold">Matematika</span>
            </button>
            <button
              onClick={() => onSelectBahasa(stats.current_grade)}
              className="flex flex-col items-center justify-center py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-soft-lg hover:shadow-soft-xl transition-shadow hover:scale-105"
            >
              <span className="text-4xl mb-1">📖</span>
              <span className="text-xs font-bold">Bahasa</span>
            </button>
            <button
              onClick={onNavigateToLanguage}
              className="flex flex-col items-center justify-center py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold shadow-soft-lg hover:shadow-soft-xl transition-shadow hover:scale-105"
            >
              <span className="text-4xl mb-1">🦉</span>
              <span className="text-xs font-bold">Pelajaran</span>
            </button>
          </div>
        </div>

        {/* Bottom padding */}
        <div className="h-32"></div>
      </div>
    </div>
  );
}

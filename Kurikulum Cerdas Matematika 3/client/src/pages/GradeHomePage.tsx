import * as React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { User, UserStats } from '../types';
import { getGradeConfig, getGradeName } from '../lib/gradeContent';

interface GradeHomePageProps {
  user: User | null;
  stats: UserStats;
  selectedGrade: number;
  onSelectLevel: (levelId: string) => void;
  onBack: () => void;
  onLogout: () => void;
}

interface OperationProgress {
  grade: number;
  level: string;
  completed: boolean;
  score: number;
  lastCompleted?: string;
}

export function GradeHomePage({ user, stats, selectedGrade, onSelectLevel, onBack, onLogout }: GradeHomePageProps) {
  const [userProgress, setUserProgress] = React.useState<Record<string, OperationProgress>>({});
  const [nextLevel, setNextLevel] = React.useState<string | null>(null);
  const nextLevelRef = React.useRef<HTMLDivElement>(null);

  const gradeConfig = getGradeConfig(selectedGrade);

  React.useEffect(() => {
    if (user && user.id) {
      // Fetch progress for this specific grade
      fetch(`/api/progress?grade=${selectedGrade}`)
        .then(async res => {
          if (!res.ok) {
            console.error(`Progress API error! status: ${res.status}`);
            return [];
          }
          return res.json();
        })
        .then(progressData => {
          console.log(`Progress data for grade ${selectedGrade}:`, progressData);
          if (Array.isArray(progressData)) {
            const progressMap: Record<string, OperationProgress> = {};
            progressData.forEach((p: OperationProgress) => {
              progressMap[p.level] = p;
            });
            setUserProgress(progressMap);

            // Find next unfinished level
            const levelIds = gradeConfig.levels.map(l => l.id);
            const nextUnfinished = levelIds.find(id => !progressMap[id]?.completed);
            setNextLevel(nextUnfinished || null);
          }
        })
        .catch(err => {
          console.error('Failed to load progress:', err);
        });
    }
  }, [user, selectedGrade, gradeConfig.levels]);

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

  const allCompleted = gradeConfig.levels.every(level => userProgress[level.id]?.completed);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradeConfig.uiStyle.bgColor}`}>
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <Button variant="ghost" onClick={onBack} className="text-foreground hover:bg-white/50 mb-3">
              ← Pilih Kelas Lain
            </Button>
            <h1 className="text-4xl font-bold text-foreground">
              {getGradeName(selectedGrade)} 🎓
            </h1>
            <p className="text-lg text-muted-foreground mt-2">Hai, {user ? user.username : 'Tamu'}! Ayo belajar!</p>
          </div>
          <div className="flex items-center gap-3">
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

        {/* Completion Message */}
        {allCompleted && (
          <Card className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl">
            <CardContent className="pt-6 pb-6">
              <p className="text-lg font-semibold text-foreground text-center">
                🎉 Yeay! Kamu sudah selesai semua level di kelas ini! Mau ulang level favoritmu?
              </p>
            </CardContent>
          </Card>
        )}

        {/* Progress Levels */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-8 text-foreground text-center">
            Level di {getGradeName(selectedGrade)}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {gradeConfig.levels.map((level) => {
              const isCompleted = userProgress[level.id]?.completed;
              const isNext = nextLevel === level.id;
              
              return (
                <div
                  key={level.id}
                  ref={isNext ? nextLevelRef : null}
                  className="flex flex-col items-center"
                >
                  <Card
                    className={`w-full cursor-pointer hover:shadow-xl transition-all duration-200 rounded-2xl border-2 ${isNext ? 'ring-4 ring-yellow-400 ring-offset-2 animate-pulse' : ''} ${isCompleted ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-400'}`}
                    onClick={() => onSelectLevel(level.id)}
                  >
                    <CardContent className={`p-6 text-center bg-gradient-to-br ${level.color} relative`}>
                      <div className="text-5xl mb-3">{level.emoji}</div>
                      <div className="text-lg font-bold text-white drop-shadow-lg">
                        {level.name}
                      </div>
                      <div className="text-xs text-white/90 mt-1">
                        {level.description}
                      </div>
                      
                      {isCompleted && (
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-sm font-bold text-white border-2 border-white shadow-md">
                          ✓
                        </div>
                      )}
                      
                      {isNext && !isCompleted && (
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                          Lanjutkan →
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {isCompleted && userProgress[level.id]?.score && (
                    <div className="text-xs text-muted-foreground mt-2">
                      Skor: {userProgress[level.id].score}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center space-y-2 mb-20">
          <p className="font-bold text-lg text-foreground">
            Klik level untuk mulai belajar! 💪✨
          </p>
          <p className="text-sm text-gray-600">
            Semakin banyak latihan, semakin mahir!
          </p>
        </div>
      </div>
    </div>
  );
}

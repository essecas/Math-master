import * as React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getLevelName, getGradeName } from '../lib/questions';

interface ResultPageProps {
  grade: number;
  level: number;
  score: number;
  total: number;
  passed: boolean;
  onRetry: () => void;
  onNextLevel: () => void;
  onHome: () => void;
  userId?: number;
}

export function ResultPage({ grade, level, score, total, passed, onRetry, onNextLevel, onHome, userId }: ResultPageProps) {
  const percentage = Math.round((score / total) * 100);

  async function handleSaveProgress() {
    if (!userId || percentage < 70) {
      return;
    }

    try {
      const operationNames = ['', 'penjumlahan', 'pengurangan', 'perkalian', 'pembagian'];
      const operation = operationNames[level] || `level-${level}`;
      
      console.log(`Saving progress: userId=${userId}, operation=${operation}, score=${percentage}%`);
      
      const response = await fetch('/api/progress/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: operation, score: percentage })
      });
      
      if (!response.ok) {
        console.error('Failed to save progress:', response.status);
      } else {
        console.log('Progress saved successfully');
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  function handleHomeClick() {
    handleSaveProgress();
    onHome();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <Card className="max-w-md w-full relative z-10 bg-white border-0 shadow-soft-xl rounded-3xl">
        <CardContent className="pt-8 text-center space-y-8 text-foreground">
          <div className="text-8xl mb-4">
            {passed ? '🎉' : '💪'}
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {passed ? 'Selamat!' : 'Hampir Berhasil!'}
            </h2>
            <p className="text-slate-400">
              {getLevelName(level)} - {getGradeName(grade)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary via-secondary to-accent text-white p-8 rounded-2xl shadow-soft-xl">
            <div className="text-7xl font-bold mb-4">{percentage}%</div>
            <div className="text-2xl font-bold mb-2">
              Skor Kamu
            </div>
            <div className="text-lg opacity-90 mb-4">
              {score} dari {total} soal benar
            </div>
            <div className="mt-4 pt-4 border-t border-white/30 text-sm">
              <div className="font-semibold mb-1">Rumus:</div>
              <div className="opacity-90">({score} ÷ {total}) × 100 = {percentage}%</div>
            </div>
          </div>

          {passed ? (
            <div className="space-y-3">
              <p className="text-green-600 font-bold text-lg">
                ✨ Kamu berhasil melewati level ini!
              </p>
              {level < 4 ? (
                <Button
                  onClick={onNextLevel}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-soft-lg text-white font-bold py-6 rounded-xl"
                >
                  🚀 Lanjut ke Level Berikutnya
                </Button>
              ) : (
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 p-4 rounded-xl">
                  <p className="text-amber-900 font-bold text-lg">
                    🏆 Kamu telah menyelesaikan semua level!
                  </p>
                </div>
              )}
              <Button
                onClick={onHome}
                variant="outline"
                className="w-full border-2 font-bold py-6 rounded-xl"
              >
                Kembali ke Beranda
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-orange-600 font-bold text-lg">
                Kamu perlu 80% untuk lulus. Ayo coba lagi!
              </p>
              <Button
                onClick={onRetry}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:shadow-soft-lg text-white font-bold py-6 rounded-xl"
              >
                💪 Coba Lagi dengan Petunjuk
              </Button>
              <Button
                onClick={onHome}
                variant="outline"
                className="w-full border-2 font-bold py-6 rounded-xl"
              >
                Kembali ke Beranda
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

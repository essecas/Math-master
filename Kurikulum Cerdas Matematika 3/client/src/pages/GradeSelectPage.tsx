import * as React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getGradeConfig, getGradeName } from '../lib/gradeContent';

interface GradeSelectPageProps {
  onSelectGrade: (grade: number) => void;
  onBack: () => void;
}

export function GradeSelectPage({ onSelectGrade, onBack }: GradeSelectPageProps) {
  const grades = Array.from({ length: 12 }, (_, i) => i + 1);

  function getCategoryStyle(grade: number) {
    if (grade <= 6) {
      return {
        bg: 'from-yellow-100 via-green-100 to-blue-100',
        card: 'hover:border-green-400',
        text: 'text-green-700'
      };
    } else if (grade <= 9) {
      return {
        bg: 'from-indigo-100 via-cyan-100 to-teal-100',
        card: 'hover:border-indigo-400',
        text: 'text-indigo-700'
      };
    } else {
      return {
        bg: 'from-slate-100 via-gray-100 to-zinc-100',
        card: 'hover:border-slate-400',
        text: 'text-slate-700'
      };
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="text-foreground hover:bg-white/50">
            ← Kembali
          </Button>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Pilih Kelas Kamu 🎓
          </h1>
          <p className="text-lg text-muted-foreground">
            Setiap kelas punya level dan soal yang berbeda lho!
          </p>
        </div>

        {/* SD Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
            <span className="text-3xl">🏫</span> Sekolah Dasar (SD)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {grades.slice(0, 6).map((grade) => {
              const config = getGradeConfig(grade);
              return (
                <Card
                  key={grade}
                  className="cursor-pointer hover:shadow-xl transition-all duration-200 rounded-2xl border-2 hover:border-green-400 hover:scale-105 active:scale-95"
                  onClick={() => onSelectGrade(grade)}
                >
                  <CardContent className={`p-6 text-center bg-gradient-to-br ${config.uiStyle.bgColor}`}>
                    <div className="text-5xl mb-3">📚</div>
                    <div className="text-lg font-bold text-foreground">
                      Kelas {grade}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {config.levels.length} Level
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* SMP Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
            <span className="text-3xl">🎒</span> Sekolah Menengah Pertama (SMP)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {grades.slice(6, 9).map((grade) => {
              const config = getGradeConfig(grade);
              return (
                <Card
                  key={grade}
                  className="cursor-pointer hover:shadow-xl transition-all duration-200 rounded-2xl border-2 hover:border-indigo-400 hover:scale-105 active:scale-95"
                  onClick={() => onSelectGrade(grade)}
                >
                  <CardContent className={`p-6 text-center bg-gradient-to-br ${config.uiStyle.bgColor}`}>
                    <div className="text-5xl mb-3">📐</div>
                    <div className="text-lg font-bold text-foreground">
                      Kelas {grade - 6}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {config.levels.length} Level
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* SMA Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center gap-2">
            <span className="text-3xl">🎓</span> Sekolah Menengah Atas (SMA)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {grades.slice(9, 12).map((grade) => {
              const config = getGradeConfig(grade);
              return (
                <Card
                  key={grade}
                  className="cursor-pointer hover:shadow-xl transition-all duration-200 rounded-2xl border-2 hover:border-slate-400 hover:scale-105 active:scale-95"
                  onClick={() => onSelectGrade(grade)}
                >
                  <CardContent className={`p-6 text-center bg-gradient-to-br ${config.uiStyle.bgColor}`}>
                    <div className="text-5xl mb-3">📊</div>
                    <div className="text-lg font-bold text-foreground">
                      Kelas {grade - 9}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {config.levels.length} Level
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="text-center space-y-2 mb-20">
          <p className="font-bold text-lg text-foreground">
            Pilih kelas yang sesuai dengan tingkat kamu! 🌟
          </p>
          <p className="text-sm text-gray-600">
            Kamu bisa coba level lain kapan saja
          </p>
        </div>
      </div>
    </div>
  );
}

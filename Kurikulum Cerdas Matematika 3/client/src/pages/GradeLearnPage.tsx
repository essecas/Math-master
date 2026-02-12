import * as React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { HappyBearMascot } from '../components/HappyBearMascot';
import { getGradeConfig, getLevelByOperation } from '../lib/gradeContent';

interface GradeLearnPageProps {
  grade: number;
  levelId: string;
  onStartQuiz: () => void;
  onBack: () => void;
}

export function GradeLearnPage({ grade, levelId, onStartQuiz, onBack }: GradeLearnPageProps) {
  const gradeConfig = getGradeConfig(grade);
  const level = getLevelByOperation(grade, levelId);

  if (!level) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Level tidak ditemukan</p>
      </div>
    );
  }

  const isSMP = grade >= 7 && grade <= 9;
  const isSMA = grade >= 10;

  let explanation = '';
  let example = '';

  // Generate explanation based on grade and level
  if (isSMP || isSMA) {
    // Algebra-focused explanations for SMP/SMA
    if (levelId === 'suku-sejenis') {
      explanation = 'Suku sejenis adalah suku-suku yang memiliki variabel dan pangkat yang sama.';
      example = 'Contoh:\n5x + 3x - 2x = (5 + 3 - 2)x = 6x\n\n4a + 2b - a + 3b = (4-1)a + (2+3)b = 3a + 5b\n\nJumlahkan koefisien dari variabel yang sama! ✨';
    } else if (levelId === 'plsv') {
      explanation = 'PLSV (Persamaan Linear Satu Variabel) adalah persamaan dengan satu variabel berpangkat 1.';
      example = 'Contoh:\n3x + 6 = 15\n3x = 15 - 6\n3x = 9\nx = 3\n\nPindahkan konstanta ke satu ruas! 📐';
    } else if (levelId === 'faktorisasi') {
      explanation = 'Faktorisasi adalah mengubah bentuk penjumlahan menjadi perkalian.';
      example = 'Contoh:\nx² + 5x + 6 = (x+2)(x+3)\n\nCari dua bilangan:\n• Dikali = 6 (konstanta)\n• Dijumlah = 5 (koefisien x)\n\nYaitu 2 dan 3! 🎯';
    } else if (levelId === 'selisih-kuadrat') {
      explanation = 'Selisih kuadrat menggunakan rumus a² - b² = (a-b)(a+b)';
      example = 'Contoh:\nx² - 9 = x² - 3²\n     = (x-3)(x+3)\n\n4x² - 25 = (2x)² - 5²\n        = (2x-5)(2x+5)\n\nGampang kan? 🚀';
    } else if (levelId === 'persamaan-kuadrat') {
      explanation = 'Persamaan kuadrat adalah persamaan dengan pangkat tertinggi 2.';
      example = 'Contoh:\nx² - 5x + 6 = 0\n(x-2)(x-3) = 0\nx = 2 atau x = 3\n\nFaktorkan lalu cari nilai x! ⚖️';
    } else if (levelId === 'limit') {
      explanation = 'Limit adalah nilai pendekatan fungsi saat x mendekati suatu nilai.';
      example = 'Contoh:\nlim (x→2) (x²-4)/(x-2)\n= lim (x→2) (x-2)(x+2)/(x-2)\n= lim (x→2) (x+2)\n= 4\n\nFaktorkan dulu! ∞';
    } else if (levelId === 'turunan') {
      explanation = 'Turunan mengukur laju perubahan fungsi.';
      example = 'Rumus: d/dx(xⁿ) = n·xⁿ⁻¹\n\nContoh:\nf(x) = 3x²\nf\'(x) = 2·3x¹ = 6x\n\nTurunkan pangkat! ∂';
    } else {
      explanation = level.description;
      example = 'Pelajari materi ini dengan baik sebelum mengerjakan soal! 📚';
    }
  } else {
    // Basic arithmetic explanations for SD
    if (levelId === 'penjumlahan') {
      explanation = 'Penjumlahan artinya menambah atau menggabungkan!';
      example = 'Kamu punya 2 permen, temanmu kasih 3 lagi.\nTotal jadi 2 + 3 = 5 permen!\n\n🍬🍬 + 🍬🍬🍬 = 🍬🍬🍬🍬🍬';
    } else if (levelId === 'pengurangan') {
      explanation = 'Pengurangan artinya mengurangi atau mengambil!';
      example = 'Kamu punya 5 apel, makan 2.\nSisa berapa? 5 − 2 = 3 apel!\n\n🍎🍎🍎🍎🍎 − 🍎🍎 = 🍎🍎🍎';
    } else if (levelId === 'perkalian') {
      explanation = 'Perkalian artinya menambah berulang kali!';
      example = '3 kelompok permen, tiap kelompok 2.\nTotal 3 × 2 = 6 permen!\n\n🍬🍬 × 3 = 🍬🍬🍬🍬🍬🍬';
    } else if (levelId === 'pembagian') {
      explanation = 'Pembagian artinya membagi sama rata!';
      example = '6 permen dibagi ke 2 teman.\nTiap teman dapat 6 ÷ 2 = 3 permen!\n\n🍬🍬🍬🍬🍬🍬 ÷ 2 = 🍬🍬🍬 masing-masing';
    } else if (levelId === 'pecahan') {
      explanation = 'Pecahan adalah bagian dari keseluruhan!';
      example = '1/2 + 1/4 = ?\nSamakan penyebut: 2/4 + 1/4 = 3/4\n\n🍰 Mudah kan!';
    } else {
      explanation = level.description;
      example = 'Yuk belajar bersama! 🌟';
    }
  }

  const bgColor = isSMP ? 'from-indigo-100 via-cyan-100 to-teal-100' 
                  : isSMA ? 'from-slate-100 via-gray-100 to-zinc-100'
                  : gradeConfig.uiStyle.bgColor;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} pb-8`}>
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="text-foreground hover:bg-white/50">
            ← Kembali
          </Button>
        </div>

        <Card className="border-0 shadow-xl rounded-3xl overflow-hidden mb-8">
          <div className={`bg-gradient-to-br ${level.color} p-8 text-center`}>
            <HappyBearMascot withCandy={true} animated={true} />

            <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg">
              {level.emoji} Ayo Pahami {level.name}!
            </h1>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-8 border-2 border-white/60 shadow-md">
              <p className="text-xl font-bold leading-relaxed mb-6 text-foreground">
                {explanation}
              </p>
              
              <div className="text-lg font-semibold whitespace-pre-line leading-relaxed text-foreground">
                {example}
              </div>
            </div>

            <div className="relative mb-8 flex justify-center">
              <div className="bg-white rounded-2xl px-8 py-5 border-3 shadow-md max-w-xs">
                <p className="text-lg font-bold text-center text-foreground">
                  Siap belajar? Yuk! 🚀
                </p>
              </div>
            </div>

            <Button
              onClick={onStartQuiz}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-xl py-7 px-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              🎯 Mulai Latihan Soal!
            </Button>
          </div>
        </Card>

        <div className="text-center space-y-2">
          <p className="font-bold text-lg text-foreground">
            Kamu pasti bisa! 💪✨
          </p>
          <p className="text-sm text-gray-600">
            Semakin banyak latihan, semakin mahir! 🌟
          </p>
        </div>
      </div>
    </div>
  );
}

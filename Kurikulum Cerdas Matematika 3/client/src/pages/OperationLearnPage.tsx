import * as React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { HappyBearMascot } from '../components/HappyBearMascot';

interface OperationLearnPageProps {
  grade: number;
  level: number;
  onStartQuiz: () => void;
  onBack: () => void;
}

interface ExampleProblem {
  problem: string;
  answer: string;
  emoji: string;
}

export function OperationLearnPage({ grade, level, onStartQuiz, onBack }: OperationLearnPageProps) {
  const [showAnswers, setShowAnswers] = React.useState<Record<number, boolean>>({});
  
  const operations: Record<number, { 
    title: string
    explanation: string
    example: string
    emoji: string
    bgColor: string
    textColor: string
    buttonColor: string
    videoId?: string
  }> = {
    1: {
      title: 'Ayo Pahami Penjumlahan!',
      explanation: 'Penjumlahan artinya menambah atau menggabungkan!',
      example: 'Misalnya, kamu punya 2 permen, temanmu kasih 3 lagi. Total jadi 2 + 3 = 5 permen!\n\n🍬🍬 + 🍬🍬🍬 = 🍬🍬🍬🍬🍬\n\nYeay, lebih banyak! ✨',
      emoji: '➕',
      bgColor: 'from-green-100 to-emerald-100',
      textColor: 'text-green-700',
      buttonColor: 'from-green-500 to-emerald-600',
      videoId: 'dQw4w9WgXcQ'
    },
    2: {
      title: 'Ayo Pahami Pengurangan!',
      explanation: 'Pengurangan artinya mengurangi atau mengambil!',
      example: 'Kamu punya 5 apel, makan 2. Sisa berapa? 5 − 2 = 3 apel lagi!\n\n🍎🍎🍎🍎🍎 − 🍎🍎 = 🍎🍎🍎\n\nMasih ada ya! 😊',
      emoji: '➖',
      bgColor: 'from-blue-100 to-cyan-100',
      textColor: 'text-blue-700',
      buttonColor: 'from-blue-500 to-cyan-600',
      videoId: 'dQw4w9WgXcQ'
    },
    3: {
      title: 'Ayo Pahami Perkalian!',
      explanation: 'Perkalian artinya menambah berulang kali!',
      example: 'Misalnya, 3 kelompok permen, tiap kelompok 2. Total 3 × 2 = 6 permen!\n\n🍬🍬 × 3 = 🍬🍬🍬🍬🍬🍬\n\nCepat ya hitungnya! 🚀',
      emoji: '✖️',
      bgColor: 'from-purple-100 to-violet-100',
      textColor: 'text-purple-700',
      buttonColor: 'from-purple-500 to-violet-600',
      videoId: 'dQw4w9WgXcQ'
    },
    4: {
      title: 'Ayo Pahami Pembagian!',
      explanation: 'Pembagian artinya membagi sama rata!',
      example: 'Kamu punya 6 permen, dibagi ke 2 teman. Tiap teman dapat berapa? 6 ÷ 2 = 3 permen!\n\n🍬🍬🍬🍬🍬🍬 ÷ 2 = 🍬🍬🍬 untuk masing-masing\n\nAdil dong! 👍',
      emoji: '➗',
      bgColor: 'from-pink-100 to-rose-100',
      textColor: 'text-pink-700',
      buttonColor: 'from-pink-500 to-rose-600',
      videoId: 'dQw4w9WgXcQ'
    }
  };

  const operation = operations[level] || operations[1];

  const exampleProblems: Record<number, ExampleProblem[]> = {
    1: [
      { problem: 'Kamu punya 7 permen, temanmu kasih 6 lagi. Berapa total?', answer: '13', emoji: '🍬' },
      { problem: 'Ada 5 apel di meja, ibumu letakkan 8 apel lagi. Berapa apel semuanya?', answer: '13', emoji: '🍎' },
      { problem: 'Kamu punya 9 mainan, dapat 4 mainan dari hadiah. Total berapa?', answer: '13', emoji: '🧸' },
      { problem: 'Di taman ada 6 anak, datang lagi 7 anak. Berapa anak semua?', answer: '13', emoji: '👦' },
      { problem: 'Punya 8 kelereng, temanmu kasih 5 kelereng. Berapa kelereng sekarang?', answer: '13', emoji: '🎱' }
    ],
    2: [
      { problem: 'Punya 12 permen, dimakan 5. Berapa sisa permen?', answer: '7', emoji: '🍬' },
      { problem: 'Ada 15 apel, diberikan 8 ke tetangga. Berapa apel tersisa?', answer: '7', emoji: '🍎' },
      { problem: 'Punya 14 mainan, hilang 6. Berapa mainan yang masih ada?', answer: '8', emoji: '🧸' },
      { problem: 'Ada 18 buku, dipinjam teman 9. Berapa buku di rumah?', answer: '9', emoji: '📚' },
      { problem: 'Punya 16 kelereng, kalah bermain 7. Berapa kelereng sekarang?', answer: '9', emoji: '🎱' }
    ],
    3: [
      { problem: 'Ada 3 kelompok permen, setiap kelompok 4. Berapa semua?', answer: '12', emoji: '🍬' },
      { problem: 'Punya 2 tas, tiap tas ada 5 mainan. Berapa mainan total?', answer: '10', emoji: '🧸' },
      { problem: 'Ada 4 piring, setiap piring 3 apel. Berapa apel semua?', answer: '12', emoji: '🍎' },
      { problem: '5 teman, masing-masing dapat 2 permen. Berapa permen semua?', answer: '10', emoji: '🍬' },
      { problem: 'Ada 3 kotak, tiap kotak 6 krayon. Berapa krayon total?', answer: '18', emoji: '🖍️' }
    ],
    4: [
      { problem: 'Punya 12 permen, dibagi ke 3 teman sama rata. Tiap teman dapat berapa?', answer: '4', emoji: '🍬' },
      { problem: 'Ada 10 apel, dibagi ke 2 keranjang sama rata. Tiap keranjang berapa apel?', answer: '5', emoji: '🍎' },
      { problem: 'Punya 15 mainan, dibagi ke 5 anak sama rata. Tiap anak dapat berapa?', answer: '3', emoji: '🧸' },
      { problem: 'Ada 16 buku, dibagi ke 4 rak sama rata. Tiap rak berapa buku?', answer: '4', emoji: '📚' },
      { problem: 'Punya 18 kelereng, dibagi ke 6 plastik sama rata. Tiap plastik berapa kelereng?', answer: '3', emoji: '🎱' }
    ]
  };

  const problems = exampleProblems[level] || [];

  function toggleAnswer(index: number) {
    setShowAnswers({ ...showAnswers, [index]: !showAnswers[index] });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pb-8">
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="text-foreground hover:bg-white/50">
            ← Kembali
          </Button>
        </div>

        <Card className="border-0 shadow-xl rounded-3xl overflow-hidden mb-8">
          <div className={`bg-gradient-to-br ${operation.bgColor} p-8 text-center`}>
            <HappyBearMascot withCandy={true} animated={true} />

            <h1 className={`text-4xl font-bold mb-6 ${operation.textColor}`}>
              {operation.title}
            </h1>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-8 border-2 border-white/60 shadow-md">
              <p className={`text-xl font-bold leading-relaxed mb-6 ${operation.textColor}`}>
                {operation.explanation}
              </p>
              
              <div className={`text-lg font-semibold whitespace-pre-line leading-relaxed ${operation.textColor}`}>
                {operation.example}
              </div>
            </div>

            <div className="relative mb-8 flex justify-center">
              <div className="bg-white rounded-2xl px-8 py-5 border-3 shadow-md max-w-xs" style={{ borderColor: operation.textColor.split('-')[2] }}>
                <p className={`text-lg font-bold text-center ${operation.textColor}`}>
                  Siap belajar? Yuk! 🚀
                </p>
              </div>
            </div>

            <div className="mb-8 bg-white/80 rounded-2xl p-6 border-2 border-white/60">
              <p className={`text-sm font-bold mb-4 ${operation.textColor}`}>
                📺 Tonton Video Seru!
              </p>
              <div className="relative w-full bg-gray-300 rounded-xl overflow-hidden shadow-md" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-0"
                  src={`https://www.youtube.com/embed/${operation.videoId}`}
                  title="Educational Video"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Video ini akan diganti dengan tutorial resmi segera! 🎓
              </p>
            </div>

            {problems.length > 0 && (
              <div className="mb-8 bg-white/90 rounded-2xl p-8 border-2 border-white/60 shadow-md">
                <h2 className={`text-2xl font-bold mb-6 ${operation.textColor} text-left`}>
                  ✨ Contoh Soal Lanjutan
                </h2>
                <div className="space-y-4">
                  {problems.map((prob, index) => (
                    <div
                      key={index}
                      onClick={() => toggleAnswer(index)}
                      className="bg-gradient-to-r from-slate-50 to-white p-5 rounded-xl border-2 border-slate-200 cursor-pointer hover:border-slate-400 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start gap-3 justify-between">
                        <div className="flex-1 text-left">
                          <p className="text-lg font-semibold text-foreground">
                            {prob.emoji} {prob.problem}
                          </p>
                        </div>
                        <span className={`text-2xl transition-transform ${showAnswers[index] ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </div>
                      {showAnswers[index] && (
                        <div className={`mt-4 pt-4 border-t-2 border-slate-200 text-lg font-bold ${operation.textColor}`}>
                          ✓ Jawaban: {prob.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={onStartQuiz}
              className={`w-full bg-gradient-to-r ${operation.buttonColor} text-white font-bold text-xl py-7 px-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-center`}
            >
              🎯 Mulai Latihan Soal!
            </Button>
          </div>
        </Card>

        <div className="text-center space-y-2">
          <p className={`font-bold text-lg ${operation.textColor}`}>
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

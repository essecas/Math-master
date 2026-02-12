import * as React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Question } from '../types';
import { getBahasaQuestions, getGradeName } from '../lib/bahasaQuestions';
import confetti from 'canvas-confetti';
import { FloatingBubbles } from '../components/FloatingBubbles';

interface BahasaQuizPageProps {
  grade: number;
  onComplete: (score: number, total: number, passed: boolean) => void;
  onBack: () => void;
}

export function BahasaQuizPage({ grade, onComplete, onBack }: BahasaQuizPageProps) {
  const [questions] = React.useState<Question[]>(() => getBahasaQuestions(grade));
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);
  const [shakeError, setShakeError] = React.useState(false);
  const [questionTransition, setQuestionTransition] = React.useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  function handleAnswer(answer: string) {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
  }

  function handleSubmitAnswer() {
    const userAnswer = answers[currentQuestion.id];
    const correct = userAnswer === currentQuestion.answer;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      setScore(score + 1);
      
      // Colorful confetti celebration for correct answers
      const duration = 4000;
      const animationEnd = Date.now() + duration;
      const colors = ['#FFB6C1', '#FFD700', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C'];

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const confettiInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(confettiInterval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        // Confetti from left side
        confetti({
          particleCount: Math.floor(particleCount),
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: 0, y: 0.1 },
          colors: colors,
          gravity: 0.8,
          scalar: randomInRange(0.8, 1.2),
          drift: randomInRange(-0.5, 0.5)
        });

        // Confetti from right side
        confetti({
          particleCount: Math.floor(particleCount),
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: 1, y: 0.1 },
          colors: colors,
          gravity: 0.8,
          scalar: randomInRange(0.8, 1.2),
          drift: randomInRange(-0.5, 0.5)
        });

        // Sparkle stars from top center
        confetti({
          particleCount: Math.floor(particleCount / 3),
          angle: 90,
          spread: 45,
          origin: { x: 0.5, y: 0 },
          colors: ['#FFD700', '#FFA500', '#FFFF00'],
          gravity: 1,
          scalar: 0.8,
          shapes: ['star'],
          drift: 0
        });
      }, 250);
    } else {
      // Shake animation for wrong answer
      setShakeError(true);
      setTimeout(() => setShakeError(false), 600);
    }
  }

  function handleNext() {
    setQuestionTransition(true);
    
    setTimeout(() => {
      setShowExplanation(false);
      setQuestionTransition(false);
      
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCompleted(true);
        const finalScore = score + (isCorrect ? 1 : 0);
        const passed = (finalScore / questions.length) >= 0.8;
        
        if (passed) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
        
        setTimeout(() => {
          onComplete(finalScore, questions.length, passed);
        }, 2000);
      }
    }, 300);
  }

  if (completed) {
    const finalScore = score;
    const passed = (finalScore / questions.length) >= 0.8;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">
              {passed ? '🎉' : '💪'}
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {passed ? 'Luar Biasa!' : 'Hampir Berhasil!'}
            </h2>
            <p className="text-gray-600 mb-4">
              Skor kamu: {finalScore} dari {questions.length} ({Math.round((finalScore / questions.length) * 100)}%)
            </p>
            {!passed && (
              <p className="text-sm text-gray-500 mb-4">
                Kamu perlu 80% untuk lulus. Ayo coba lagi!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <FloatingBubbles />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Bahasa - {getGradeName(grade)}
              </h1>
            </div>
            <Button variant="ghost" size="sm" onClick={onBack} className="text-foreground">
              ← Kembali
            </Button>
          </div>
          <Progress value={progress} className="h-3 rounded-full bg-muted" />
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Soal {currentIndex + 1} dari {questions.length}
          </p>
        </div>

        {/* Question Card */}
        <Card className={`mb-8 border-0 shadow-soft-lg rounded-2xl ${questionTransition ? 'opacity-0' : 'fade-in-animation'}`}>
          <CardContent className="pt-8 pb-8">
            <h2 className={`text-3xl font-bold mb-8 text-center text-foreground ${shakeError ? 'shake-animation' : ''}`}>
              {currentQuestion.question}
            </h2>

            {!showExplanation && (
              <div className="space-y-6">
                {currentQuestion.options ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className={`p-4 rounded-xl border-2 font-bold text-lg transition-all duration-200 ${
                          answers[currentQuestion.id] === option
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-white hover:border-primary/50 text-foreground'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}

                <Button
                  onClick={handleSubmitAnswer}
                  disabled={!answers[currentQuestion.id]}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg py-6 rounded-xl hover:shadow-soft-lg"
                >
                  ✓ Kirim Jawaban
                </Button>
              </div>
            )}

            {showExplanation && (
              <div className="space-y-6 fade-in-animation">
                <div className={`p-6 rounded-xl ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-orange-50 border-2 border-orange-200'}`}>
                  <p className={`text-lg font-bold flex items-center gap-3 ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
                    {isCorrect ? (
                      <>
                        <span className="text-3xl">✨</span>
                        <span>Bagus! Jawaban Benar!</span>
                      </>
                    ) : (
                      <>
                        <span className="text-3xl">💡</span>
                        <span>Hampir! Mari kita lihat caranya</span>
                      </>
                    )}
                  </p>
                  <p className="text-base mt-3 font-medium">
                    Jawaban yang benar: <strong className="text-xl">{currentQuestion.answer}</strong>
                  </p>
                </div>
                
                {!isCorrect && (
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border-2 border-amber-200 hint-bounce-animation">
                    <p className="text-amber-900 text-base flex items-center gap-2 font-medium">
                      <span className="text-2xl">🌟</span>
                      <span>Tips: Perhatikan penjelasan di bawah ya!</span>
                    </p>
                  </div>
                )}

                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <p className="font-bold text-blue-900 mb-3 text-lg">📚 Penjelasan:</p>
                  <p className="text-base text-blue-800 whitespace-pre-line leading-relaxed font-medium">
                    {currentQuestion.explanation}
                  </p>
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg py-6 rounded-xl hover:shadow-soft-lg"
                >
                  {currentIndex < questions.length - 1 ? '→ Soal Berikutnya' : '✓ Lihat Hasil'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Score indicator */}
        <div className="text-center">
          <p className="text-base font-bold text-muted-foreground">Skor: {score} / {currentIndex + (showExplanation ? 1 : 0)}</p>
        </div>
      </div>
    </div>
  );
}

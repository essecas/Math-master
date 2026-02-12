import * as React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { GradeQuestion, generateQuestionsByGrade } from '../lib/gradeQuestions';
import { getGradeConfig, getLevelByOperation } from '../lib/gradeContent';
import confetti from 'canvas-confetti';
import { FloatingBubbles } from '../components/FloatingBubbles';

interface GradeQuizPageProps {
  grade: number;
  levelId: string;
  onComplete: (score: number, total: number, passed: boolean) => void;
  onBack: () => void;
  userId?: number;
}

export function GradeQuizPage({ grade, levelId, onComplete, onBack, userId }: GradeQuizPageProps) {
  const [questions] = React.useState<GradeQuestion[]>(() => generateQuestionsByGrade(grade, levelId));
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);
  const [shakeError, setShakeError] = React.useState(false);
  const [questionTransition, setQuestionTransition] = React.useState(false);

  const gradeConfig = getGradeConfig(grade);
  const level = getLevelByOperation(grade, levelId);
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  function handleAnswer(answer: string) {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
  }

  function handleSubmitAnswer() {
    const userAnswer = answers[currentQuestion.id];
    const correct = userAnswer?.trim() === currentQuestion.answer.trim();
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      setScore(score + 1);
      
      // Confetti celebration
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const colors = ['#FFB6C1', '#FFD700', '#87CEEB', '#98FB98', '#DDA0DD'];

      const confettiInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          clearInterval(confettiInterval);
          return;
        }

        confetti({
          particleCount: 30,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });

        confetti({
          particleCount: 30,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
      }, 250);
    } else {
      setShakeError(true);
      setTimeout(() => setShakeError(false), 600);
    }
  }

  async function handleNext() {
    setQuestionTransition(true);
    
    setTimeout(async () => {
      setShowExplanation(false);
      setQuestionTransition(false);
      
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCompleted(true);
        const finalScore = score + (isCorrect ? 1 : 0);
        const passed = (finalScore / questions.length) >= 0.7;
        
        if (passed) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });

          // Save progress to backend if user logged in
          if (userId) {
            try {
              const token = localStorage.getItem('token');
              const percentage = Math.round((finalScore / questions.length) * 100);
              
              const response = await fetch('/api/progress/complete', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  grade: grade,
                  level: levelId,
                  score: percentage
                })
              });

              if (response.ok) {
                const updatedProgress = await response.json();
                console.log('Progress saved:', updatedProgress);
              }
            } catch (err) {
              console.error('Failed to save progress:', err);
            }
          }
        }
        
        setTimeout(() => {
          onComplete(finalScore, questions.length, passed);
        }, 2000);
      }
    }, 300);
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">
              {(score / questions.length) >= 0.7 ? '🎉' : '💪'}
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {(score / questions.length) >= 0.7 ? 'Luar Biasa!' : 'Hampir Berhasil!'}
            </h2>
            <p className="text-gray-600 mb-4">
              Skor kamu: {score} dari {questions.length} ({Math.round((score / questions.length) * 100)}%)
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Tidak ada soal untuk level ini</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradeConfig.uiStyle.bgColor} relative`}>
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <FloatingBubbles />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {level?.emoji} {level?.name} - Kelas {grade >= 7 && grade <= 9 ? `${grade - 6} SMP` : grade >= 10 ? `${grade - 9} SMA` : `${grade} SD`}
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

        <Card className={`mb-8 border-0 shadow-soft-lg rounded-2xl ${questionTransition ? 'opacity-0' : 'fade-in-animation'}`}>
          <CardContent className="pt-8 pb-8">
            <h2 className={`text-3xl font-bold mb-8 text-center text-foreground ${shakeError ? 'shake-animation' : ''}`}>
              {currentQuestion.question}
            </h2>

            {!showExplanation && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {currentQuestion.options?.map((option) => (
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
                        <span>Luar Biasa! Jawaban Benar!</span>
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

        <div className="text-center">
          <p className="text-base font-bold text-muted-foreground">Skor: {score} / {currentIndex + (showExplanation ? 1 : 0)}</p>
        </div>
      </div>
    </div>
  );
}

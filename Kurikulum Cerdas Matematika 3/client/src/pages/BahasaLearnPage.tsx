import * as React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { OwlMascot } from '../components/OwlMascot';
import { getLearningContent } from '../lib/learningContent';
import { getGradeName } from '../lib/bahasaQuestions';

interface BahasaLearnPageProps {
  grade: number;
  onStartQuiz: () => void;
  onBack: () => void;
}

export function BahasaLearnPage({ grade, onStartQuiz, onBack }: BahasaLearnPageProps) {
  const content = getLearningContent('bahasa', 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Bahasa - {getGradeName(grade)}
            </h1>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack} className="text-foreground">
            ← Kembali
          </Button>
        </div>

        {/* Mascot with message */}
        <Card className="mb-8 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-2xl">
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col items-center gap-6">
              <OwlMascot size={140} showGraduationCap={true} />
              <p className="text-2xl font-bold text-center text-green-900">
                {content.mascotMessage}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Learning Content Title */}
        <Card className="mb-6 border-0 shadow-soft-lg rounded-2xl">
          <CardContent className="pt-8 pb-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-6">
              📚 {content.title}
            </h2>

            {/* Tips */}
            <div className="space-y-4 mb-8">
              {content.tips.map((tip, index) => (
                <div key={index} className="flex gap-4 items-start bg-green-50 p-4 rounded-xl border-2 border-green-200">
                  <div className="text-3xl flex-shrink-0">
                    {['💡', '🎯', '✨'][index % 3]}
                  </div>
                  <p className="text-base font-medium text-green-900">
                    {tip}
                  </p>
                </div>
              ))}
            </div>

            {/* YouTube Video */}
            {content.youtubeVideoId && (
              <div className="mb-8">
                <p className="text-sm font-bold text-muted-foreground mb-3">
                  📹 Video Pembelajaran (Opsional)
                </p>
                <div className="aspect-video rounded-xl overflow-hidden shadow-soft-lg border-2 border-border">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${content.youtubeVideoId}`}
                    title={content.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Start Quiz Button */}
        <Button
          onClick={onStartQuiz}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg py-6 rounded-xl hover:shadow-soft-lg mb-8"
        >
          🚀 Mulai Quiz
        </Button>
      </div>
    </div>
  );
}

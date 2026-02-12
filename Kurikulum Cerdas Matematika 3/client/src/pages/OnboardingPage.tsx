import * as React from 'react';
import { OwlMascot } from '../components/OwlMascot';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ChildProfile } from '../types/language';

interface OnboardingPageProps {
  onComplete: (profile: ChildProfile) => void;
}

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [step, setStep] = React.useState(1);
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState(7);
  const [language, setLanguage] = React.useState<'english' | 'indonesian'>('english');

  function handleComplete() {
    const profile: ChildProfile = {
      id: Date.now().toString(),
      name,
      age,
      grade: age - 6,
      learningLanguage: language,
      nativeLanguage: language === 'english' ? 'indonesian' : 'english'
    };
    onComplete(profile);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="flex justify-center mb-12">
          <OwlMascot size={180} />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3 text-foreground">Selamat Datang! 🎉</h1>
          <p className="text-2xl text-muted-foreground">Mari mulai perjalanan belajarmu</p>
        </div>

        {step === 1 && (
          <div className="glass-effect backdrop-blur rounded-3xl p-10 shadow-soft-xl border border-white/20">
            <h2 className="text-4xl font-bold text-center mb-8 text-foreground">Siapa namamu?</h2>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ketik nama kamu..."
              className="text-2xl h-16 text-center mb-8 rounded-xl border-2"
            />
            <Button
              onClick={() => setStep(2)}
              disabled={!name.trim()}
              className="w-full h-14 text-2xl font-bold bg-gradient-to-r from-primary to-secondary hover:shadow-soft-lg rounded-xl"
            >
              Lanjut →
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="glass-effect backdrop-blur rounded-3xl p-10 shadow-soft-xl border border-white/20">
            <h2 className="text-4xl font-bold text-center mb-8 text-foreground">Berapa umurmu?</h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[6, 7, 8, 9, 10, 11].map((ageOption) => (
                <button
                  key={ageOption}
                  onClick={() => setAge(ageOption)}
                  className={`h-20 rounded-xl text-3xl font-bold transition-all duration-200 ${
                    age === ageOption
                      ? 'bg-gradient-to-r from-primary to-secondary text-white scale-110 shadow-soft-lg'
                      : 'bg-white text-foreground border-2 border-border hover:border-primary/50'
                  }`}
                >
                  {ageOption}
                </button>
              ))}
            </div>
            <Button
              onClick={() => setStep(3)}
              className="w-full h-14 text-2xl font-bold bg-gradient-to-r from-primary to-secondary hover:shadow-soft-lg rounded-xl"
            >
              Lanjut →
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="glass-effect backdrop-blur rounded-3xl p-10 shadow-soft-xl border border-white/20">
            <h2 className="text-4xl font-bold text-center mb-8 text-foreground">Mau belajar apa?</h2>
            <div className="grid grid-cols-1 gap-6 mb-8">
              <button
                onClick={() => setLanguage('english')}
                className={`p-8 rounded-2xl text-2xl font-bold transition-all duration-200 ${
                  language === 'english'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white scale-105 shadow-soft-lg'
                    : 'bg-white text-foreground border-2 border-border hover:border-cyan-400'
                }`}
              >
                <div className="text-5xl mb-2">🇬🇧</div>
                Bahasa Inggris
              </button>
              <button
                onClick={() => setLanguage('indonesian')}
                className={`p-8 rounded-2xl text-2xl font-bold transition-all duration-200 ${
                  language === 'indonesian'
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white scale-105 shadow-soft-lg'
                    : 'bg-white text-foreground border-2 border-border hover:border-red-400'
                }`}
              >
                <div className="text-5xl mb-2">🇮🇩</div>
                Bahasa Indonesia
              </button>
            </div>
            <Button
              onClick={handleComplete}
              className="w-full h-14 text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-soft-lg rounded-xl text-white"
            >
              Mulai Belajar! 🚀
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

import * as React from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { GraduationMascot } from '../components/GraduationMascot';

interface LoginPageProps {
  onLogin: (user: { id: number; username: string }) => void;
  onGuestMode: () => void;
}

export function LoginPage({ onLogin, onGuestMode }: LoginPageProps) {
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
      console.log('Submitting to:', endpoint, { username });
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Authentication failed');
      }

      const data = await response.json();
      console.log('Response data:', data);

      // Auto-fetch progress after login
      try {
        const progressResponse = await fetch('/api/progress', {
          headers: {
            'Authorization': `Bearer ${data.token}`
          }
        });
        
        if (progressResponse.ok) {
          const progressData = await progressResponse.json();
          console.log('Progress loaded:', progressData);
          // Store token for future requests
          localStorage.setItem('token', data.token);
        }
      } catch (progressErr) {
        console.error('Failed to load progress:', progressErr);
      }

      console.log('Calling onLogin with:', data.user);
      onLogin(data.user);
    } catch (err) {
      console.error('Submit error:', err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function handleGuestMode() {
    onGuestMode();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur border border-white/20 shadow-soft-xl rounded-3xl overflow-hidden">
        <CardHeader className="text-center pt-10 pb-6">
          <GraduationMascot />
          <CardTitle className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-4">
            Math Master
          </CardTitle>
          <CardDescription className="text-lg mt-3 text-foreground/70">
            Belajar dengan cara yang menyenangkan! 🎉
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-lg h-12 text-base"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg h-12 text-base"
                required
              />
            </div>
            
            {error && (
              <div className={`text-sm font-medium p-3 rounded-lg ${error.includes('berhasil') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-soft-lg text-white font-semibold py-6 rounded-lg text-base" 
              disabled={loading}
            >
              {loading ? 'Loading...' : isRegistering ? 'Daftar' : 'Masuk'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-sm font-medium text-primary hover:underline"
            >
              {isRegistering ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}
            </button>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-muted-foreground font-medium">atau</span>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full mt-6 rounded-lg h-12 font-semibold text-base border-2"
            onClick={handleGuestMode}
          >
            Lanjut Sebagai Tamu 👤
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

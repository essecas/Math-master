import * as React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { WeeklyReport } from '../types';

interface ReportPageProps {
  userId: number | null;
  onBack: () => void;
}

export function ReportPage({ userId, onBack }: ReportPageProps) {
  const [report, setReport] = React.useState<WeeklyReport | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchReport() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/report/${userId}`);
        const data = await response.json();
        setReport(data);
      } catch (error) {
        console.error('Failed to fetch report:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center text-foreground">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 -z-10"></div>
        
        <div className="container mx-auto px-4 py-6 max-w-2xl relative z-10">
          <Button variant="ghost" onClick={onBack} className="mb-4 text-foreground">
            ← Kembali
          </Button>
          <Card className="bg-white text-foreground border-0 shadow-soft-lg rounded-2xl">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground text-lg">
                Laporan hanya tersedia untuk pengguna yang login.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-foreground relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Laporan Mingguan 📊</h1>
          <Button variant="ghost" onClick={onBack} className="text-foreground">
            ← Kembali
          </Button>
        </div>

        {report && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary via-secondary to-accent text-white border-0 shadow-soft-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">Ringkasan 7 Hari Terakhir</CardTitle>
              </CardHeader>
              <CardContent className="pt-8 pb-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{report.totalAttempts}</div>
                    <div className="text-sm opacity-90 mt-2 font-medium">Total Percobaan</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">{report.passed}</div>
                    <div className="text-sm opacity-90 mt-2 font-medium">Level Lulus</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">{report.totalCorrect}</div>
                    <div className="text-sm opacity-90 mt-2 font-medium">Jawaban Benar</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">{report.accuracy}%</div>
                    <div className="text-sm opacity-90 mt-2 font-medium">Akurasi</div>
                  </div>
                  <div className="col-span-2 pt-6 mt-6 border-t border-white/30 text-sm opacity-90">
                    <div className="font-semibold mb-2">Cara Menghitung Akurasi:</div>
                    <div>({report.totalCorrect} benar ÷ {report.totalAttempts * 10} total soal) × 100 = {report.accuracy}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-soft-lg rounded-2xl">
              <CardContent className="pt-8 pb-8">
                <h3 className="font-bold text-lg mb-4 text-foreground">Badge yang Didapat 🏆</h3>
                <div className="flex gap-3 flex-wrap">
                  {report.accuracy >= 90 && (
                    <div className="bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold shadow-soft">
                      ⭐ Master Matematika
                    </div>
                  )}
                  {report.accuracy >= 80 && (
                    <div className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold shadow-soft">
                      🎯 Akurat
                    </div>
                  )}
                  {report.totalAttempts >= 10 && (
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold shadow-soft">
                      💪 Rajin Berlatih
                    </div>
                  )}
                  {report.passed >= 5 && (
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full text-sm font-bold shadow-soft">
                      🚀 Penakluk Level
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl">
              <CardContent className="pt-8 pb-8 text-center">
                <p className="text-xl italic text-amber-900 font-medium">
                  "Terus berlatih, kamu semakin hebat!" 🌟
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

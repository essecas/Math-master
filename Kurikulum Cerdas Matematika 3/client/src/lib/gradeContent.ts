// Grade-specific level configurations and question types

export interface GradeLevel {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export interface GradeConfig {
  id: number;
  name: string;
  category: 'SD' | 'SMP' | 'SMA';
  levels: GradeLevel[];
  uiStyle: {
    bgColor: string;
    primaryColor: string;
    fontStyle: 'playful' | 'neutral' | 'serious';
  };
}

export const gradeConfigs: Record<number, GradeConfig> = {
  // Kelas 1-3 SD: Basic Operations
  1: {
    id: 1,
    name: 'Kelas 1 SD',
    category: 'SD',
    levels: [
      { id: 'penjumlahan', name: 'Penjumlahan', emoji: '➕', color: 'from-green-400 to-green-500', description: 'Bilangan 1-20' },
      { id: 'pengurangan', name: 'Pengurangan', emoji: '➖', color: 'from-blue-400 to-blue-500', description: 'Bilangan 1-20' },
      { id: 'perkalian', name: 'Perkalian Sederhana', emoji: '✖️', color: 'from-purple-400 to-purple-500', description: 'Pengulangan sampai 5×5' },
      { id: 'pembagian', name: 'Pembagian Sederhana', emoji: '➗', color: 'from-pink-400 to-pink-500', description: 'Bagi rata sampai 20÷2' }
    ],
    uiStyle: {
      bgColor: 'from-yellow-100 via-green-100 to-blue-100',
      primaryColor: 'green',
      fontStyle: 'playful'
    }
  },
  2: {
    id: 2,
    name: 'Kelas 2 SD',
    category: 'SD',
    levels: [
      { id: 'penjumlahan', name: 'Penjumlahan', emoji: '➕', color: 'from-green-400 to-green-500', description: 'Bilangan 1-50' },
      { id: 'pengurangan', name: 'Pengurangan', emoji: '➖', color: 'from-blue-400 to-blue-500', description: 'Bilangan 1-50' },
      { id: 'perkalian', name: 'Perkalian', emoji: '✖️', color: 'from-purple-400 to-purple-500', description: 'Sampai 10×10' },
      { id: 'pembagian', name: 'Pembagian', emoji: '➗', color: 'from-pink-400 to-pink-500', description: 'Sampai 50÷5' }
    ],
    uiStyle: {
      bgColor: 'from-yellow-100 via-green-100 to-blue-100',
      primaryColor: 'green',
      fontStyle: 'playful'
    }
  },
  3: {
    id: 3,
    name: 'Kelas 3 SD',
    category: 'SD',
    levels: [
      { id: 'penjumlahan', name: 'Penjumlahan', emoji: '➕', color: 'from-green-400 to-green-500', description: 'Bilangan 1-100' },
      { id: 'pengurangan', name: 'Pengurangan', emoji: '➖', color: 'from-blue-400 to-blue-500', description: 'Bilangan 1-100' },
      { id: 'perkalian', name: 'Perkalian', emoji: '✖️', color: 'from-purple-400 to-purple-500', description: 'Sampai 12×12' },
      { id: 'pembagian', name: 'Pembagian', emoji: '➗', color: 'from-pink-400 to-pink-500', description: 'Sampai 100÷10' }
    ],
    uiStyle: {
      bgColor: 'from-yellow-100 via-green-100 to-blue-100',
      primaryColor: 'green',
      fontStyle: 'playful'
    }
  },
  
  // Kelas 4-6 SD: Larger Numbers & Fractions
  4: {
    id: 4,
    name: 'Kelas 4 SD',
    category: 'SD',
    levels: [
      { id: 'penjumlahan', name: 'Penjumlahan Ribuan', emoji: '➕', color: 'from-green-400 to-green-500', description: 'Bilangan ribuan' },
      { id: 'pengurangan', name: 'Pengurangan Ribuan', emoji: '➖', color: 'from-blue-400 to-blue-500', description: 'Bilangan ribuan' },
      { id: 'perkalian', name: 'Perkalian Panjang', emoji: '✖️', color: 'from-purple-400 to-purple-500', description: 'Ratusan × puluhan' },
      { id: 'pembagian', name: 'Pembagian Panjang', emoji: '➗', color: 'from-pink-400 to-pink-500', description: 'Ratusan ÷ puluhan' },
      { id: 'pecahan', name: 'Pecahan Sederhana', emoji: '🍰', color: 'from-orange-400 to-orange-500', description: 'Penjumlahan pecahan' }
    ],
    uiStyle: {
      bgColor: 'from-blue-100 via-purple-100 to-pink-100',
      primaryColor: 'blue',
      fontStyle: 'playful'
    }
  },
  5: {
    id: 5,
    name: 'Kelas 5 SD',
    category: 'SD',
    levels: [
      { id: 'penjumlahan', name: 'Penjumlahan Lanjut', emoji: '➕', color: 'from-green-400 to-green-500', description: 'Bilangan besar' },
      { id: 'pengurangan', name: 'Pengurangan Lanjut', emoji: '➖', color: 'from-blue-400 to-blue-500', description: 'Bilangan besar' },
      { id: 'perkalian', name: 'Perkalian Lanjut', emoji: '✖️', color: 'from-purple-400 to-purple-500', description: 'Perkalian kompleks' },
      { id: 'pembagian', name: 'Pembagian Lanjut', emoji: '➗', color: 'from-pink-400 to-pink-500', description: 'Pembagian kompleks' },
      { id: 'pecahan', name: 'Operasi Pecahan', emoji: '🍰', color: 'from-orange-400 to-orange-500', description: '×, ÷ pecahan' }
    ],
    uiStyle: {
      bgColor: 'from-blue-100 via-purple-100 to-pink-100',
      primaryColor: 'blue',
      fontStyle: 'playful'
    }
  },
  6: {
    id: 6,
    name: 'Kelas 6 SD',
    category: 'SD',
    levels: [
      { id: 'penjumlahan', name: 'Penjumlahan Campuran', emoji: '➕', color: 'from-green-400 to-green-500', description: 'Desimal & pecahan' },
      { id: 'pengurangan', name: 'Pengurangan Campuran', emoji: '➖', color: 'from-blue-400 to-blue-500', description: 'Desimal & pecahan' },
      { id: 'perkalian', name: 'Perkalian Campuran', emoji: '✖️', color: 'from-purple-400 to-purple-500', description: 'Semua jenis bilangan' },
      { id: 'pembagian', name: 'Pembagian Campuran', emoji: '➗', color: 'from-pink-400 to-pink-500', description: 'Semua jenis bilangan' },
      { id: 'pecahan', name: 'Pecahan Lanjut', emoji: '🍰', color: 'from-orange-400 to-orange-500', description: 'Operasi campuran' }
    ],
    uiStyle: {
      bgColor: 'from-blue-100 via-purple-100 to-pink-100',
      primaryColor: 'blue',
      fontStyle: 'playful'
    }
  },

  // Kelas 7 SMP: Algebra Introduction
  7: {
    id: 7,
    name: 'Kelas 7 SMP',
    category: 'SMP',
    levels: [
      { id: 'suku-sejenis', name: 'Suku Sejenis', emoji: '🔢', color: 'from-indigo-400 to-indigo-500', description: 'Operasi bentuk aljabar' },
      { id: 'plsv', name: 'PLSV', emoji: '⚖️', color: 'from-cyan-400 to-cyan-500', description: 'Persamaan linear satu variabel' },
      { id: 'himpunan', name: 'Himpunan', emoji: '🎯', color: 'from-teal-400 to-teal-500', description: 'Operasi himpunan' },
      { id: 'bilangan-bulat', name: 'Bilangan Bulat', emoji: '➗', color: 'from-slate-400 to-slate-500', description: 'Operasi campuran' }
    ],
    uiStyle: {
      bgColor: 'from-indigo-100 via-cyan-100 to-teal-100',
      primaryColor: 'indigo',
      fontStyle: 'neutral'
    }
  },

  // Kelas 8 SMP: Factorization
  8: {
    id: 8,
    name: 'Kelas 8 SMP',
    category: 'SMP',
    levels: [
      { id: 'faktorisasi', name: 'Faktorisasi', emoji: '📐', color: 'from-violet-400 to-violet-500', description: 'Faktorisasi bentuk aljabar' },
      { id: 'selisih-kuadrat', name: 'Selisih Kuadrat', emoji: '🎲', color: 'from-fuchsia-400 to-fuchsia-500', description: 'a² - b²' },
      { id: 'plsv-lanjut', name: 'PLSV Lanjut', emoji: '⚖️', color: 'from-cyan-400 to-cyan-500', description: 'Aplikasi PLSV' },
      { id: 'pythagoras', name: 'Teorema Pythagoras', emoji: '📏', color: 'from-emerald-400 to-emerald-500', description: 'a² + b² = c²' }
    ],
    uiStyle: {
      bgColor: 'from-violet-100 via-fuchsia-100 to-cyan-100',
      primaryColor: 'violet',
      fontStyle: 'neutral'
    }
  },

  // Kelas 9 SMP: Quadratic Equations
  9: {
    id: 9,
    name: 'Kelas 9 SMP',
    category: 'SMP',
    levels: [
      { id: 'persamaan-kuadrat', name: 'Persamaan Kuadrat', emoji: '📊', color: 'from-rose-400 to-rose-500', description: 'ax² + bx + c = 0' },
      { id: 'fungsi-kuadrat', name: 'Fungsi Kuadrat', emoji: '📈', color: 'from-amber-400 to-amber-500', description: 'y = ax² + bx + c' },
      { id: 'sistem-persamaan', name: 'Sistem Persamaan', emoji: '🔗', color: 'from-lime-400 to-lime-500', description: '2 variabel' },
      { id: 'barisan', name: 'Barisan & Deret', emoji: '🔢', color: 'from-sky-400 to-sky-500', description: 'Aritmetika & geometri' }
    ],
    uiStyle: {
      bgColor: 'from-rose-100 via-amber-100 to-lime-100',
      primaryColor: 'rose',
      fontStyle: 'neutral'
    }
  },

  // Kelas 10-12 SMA: Advanced Topics
  10: {
    id: 10,
    name: 'Kelas 10 SMA',
    category: 'SMA',
    levels: [
      { id: 'fungsi', name: 'Fungsi', emoji: '📐', color: 'from-blue-500 to-blue-600', description: 'Komposisi & invers' },
      { id: 'trigonometri', name: 'Trigonometri', emoji: '📏', color: 'from-purple-500 to-purple-600', description: 'sin, cos, tan' },
      { id: 'logaritma', name: 'Logaritma', emoji: '📊', color: 'from-indigo-500 to-indigo-600', description: 'log & ln' },
      { id: 'matriks', name: 'Matriks', emoji: '🎯', color: 'from-teal-500 to-teal-600', description: 'Operasi matriks' }
    ],
    uiStyle: {
      bgColor: 'from-slate-100 via-gray-100 to-zinc-100',
      primaryColor: 'slate',
      fontStyle: 'serious'
    }
  },
  11: {
    id: 11,
    name: 'Kelas 11 SMA',
    category: 'SMA',
    levels: [
      { id: 'limit', name: 'Limit', emoji: '∞', color: 'from-cyan-500 to-cyan-600', description: 'Limit fungsi' },
      { id: 'turunan', name: 'Turunan', emoji: '∂', color: 'from-violet-500 to-violet-600', description: 'Diferensial' },
      { id: 'integral', name: 'Integral', emoji: '∫', color: 'from-fuchsia-500 to-fuchsia-600', description: 'Integral dasar' },
      { id: 'peluang', name: 'Peluang', emoji: '🎲', color: 'from-rose-500 to-rose-600', description: 'Probabilitas' }
    ],
    uiStyle: {
      bgColor: 'from-slate-100 via-gray-100 to-zinc-100',
      primaryColor: 'slate',
      fontStyle: 'serious'
    }
  },
  12: {
    id: 12,
    name: 'Kelas 12 SMA',
    category: 'SMA',
    levels: [
      { id: 'limit-lanjut', name: 'Limit Lanjut', emoji: '∞', color: 'from-blue-600 to-blue-700', description: 'Teorema limit' },
      { id: 'turunan-lanjut', name: 'Turunan Lanjut', emoji: '∂', color: 'from-purple-600 to-purple-700', description: 'Aplikasi turunan' },
      { id: 'integral-lanjut', name: 'Integral Lanjut', emoji: '∫', color: 'from-indigo-600 to-indigo-700', description: 'Integral substitusi' },
      { id: 'statistika', name: 'Statistika', emoji: '📊', color: 'from-teal-600 to-teal-700', description: 'Mean, median, modus' }
    ],
    uiStyle: {
      bgColor: 'from-slate-100 via-gray-100 to-zinc-100',
      primaryColor: 'slate',
      fontStyle: 'serious'
    }
  }
};

export function getGradeConfig(grade: number): GradeConfig {
  return gradeConfigs[grade] || gradeConfigs[1];
}

export function getGradeName(grade: number): string {
  if (grade <= 6) return `Kelas ${grade} SD`;
  if (grade <= 9) return `Kelas ${grade - 6} SMP`;
  return `Kelas ${grade - 9} SMA`;
}

export function getLevelByOperation(grade: number, operation: string): GradeLevel | undefined {
  const config = getGradeConfig(grade);
  return config.levels.find(l => l.id === operation);
}

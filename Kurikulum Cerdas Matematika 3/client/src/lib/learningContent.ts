export interface LearningContent {
  title: string;
  tips: string[];
  youtubeVideoId?: string;
  mascotMessage: string;
}

export const learningContents: Record<string, LearningContent> = {
  'matematika-1': {
    title: 'Penjumlahan Dasar',
    tips: [
      'Penjumlahan adalah proses menggabungkan dua kelompok benda',
      'Dimulai dari angka pertama, kemudian hitung ke depan sesuai angka kedua',
      'Contoh: 2 + 3 = mulai dari 2, hitung 3 langkah ke depan: 3, 4, 5'
    ],
    youtubeVideoId: 'jF_UcfXL5X8',
    mascotMessage: 'Siap belajar penjumlahan? Yuk!'
  },
  'matematika-2': {
    title: 'Pengurangan Dasar',
    tips: [
      'Pengurangan adalah kebalikan dari penjumlahan',
      'Dimulai dari angka pertama, kemudian hitung mundur sesuai angka kedua',
      'Contoh: 5 - 2 = mulai dari 5, hitung 2 langkah mundur: 4, 3'
    ],
    youtubeVideoId: 'RFbKkX7L9x4',
    mascotMessage: 'Mari kita kurangi! Siap tidak?'
  },
  'matematika-3': {
    title: 'Perkalian Dasar',
    tips: [
      'Perkalian adalah penjumlahan berulang dari angka yang sama',
      'Contoh: 3 × 2 = 2 + 2 + 2 = 6',
      'Ingat tabel perkalian dengan cara yang menyenangkan!'
    ],
    youtubeVideoId: 'RKZyKhFn69w',
    mascotMessage: 'Siap mengganda-kan ilmu? Ayo!'
  },
  'matematika-4': {
    title: 'Pembagian Dasar',
    tips: [
      'Pembagian adalah kebalikan dari perkalian',
      'Membagi berarti memisahkan menjadi kelompok-kelompok sama besar',
      'Contoh: 6 ÷ 2 = 3 (6 dibagi menjadi 2 kelompok, setiap kelompok isi 3)'
    ],
    youtubeVideoId: 'dMP-WlHZVrw',
    mascotMessage: 'Saatnya berbagi! Mari belajar pembagian!'
  },
  'bahasa-1': {
    title: 'Ejaan dan Kata Baku',
    tips: [
      'Bahasa Indonesia memiliki tata aturan ejaan yang benar',
      'Gunakan KBBI (Kamus Besar Bahasa Indonesia) sebagai panduan',
      'Contoh kata baku: rumah (bukan rumha), sekolah (bukan sekola)'
    ],
    youtubeVideoId: 'qCaOB3WrzBo',
    mascotMessage: 'Siap belajar bahasa yang baik dan benar? Yuk!'
  }
};

export function getLearningContent(subject: 'matematika' | 'bahasa', level: number): LearningContent {
  const key = `${subject}-${level}`;
  return learningContents[key] || learningContents[`${subject}-1`];
}

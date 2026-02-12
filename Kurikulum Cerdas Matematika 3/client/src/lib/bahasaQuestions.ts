import { Question } from '../types';

export function getGradeName(grade: number): string {
  if (grade <= 6) {
    return `Kelas ${grade} SD`;
  } else if (grade <= 9) {
    return `Kelas ${grade - 6} SMP`;
  } else {
    return `Kelas ${grade - 9} SMA`;
  }
}

export const bahasaQuestions: Record<number, Question[]> = {
  1: [
    {
      id: 1,
      question: 'Mana yang merupakan kata baku?',
      options: ['Rumah', 'Rumha', 'Rmah', 'Ruma'],
      answer: 'Rumah',
      explanation: 'Rumah adalah kata baku (ejaan yang benar). Rumha dan Rmah adalah ejaan yang salah. Kita harus selalu menggunakan kata baku dalam penulisan resmi.',
      type: 'multiple-choice'
    },
    {
      id: 2,
      question: 'Susun kalimat ini dengan benar: "saya - ke - sekolah"',
      options: ['Saya ke sekolah', 'Ke saya sekolah', 'Sekolah saya ke', 'Ke sekolah saya'],
      answer: 'Saya ke sekolah',
      explanation: 'Susunan yang benar adalah subjek (Saya) + preposisi (ke) + objek (sekolah). Struktur kalimat yang tepat adalah S-P-O atau S-P-Ket.',
      type: 'multiple-choice'
    },
    {
      id: 3,
      question: 'Kata mana yang artinya alat untuk menulis?',
      options: ['Pensil', 'Meja', 'Tas', 'Buku'],
      answer: 'Pensil',
      explanation: 'Pensil adalah alat untuk menulis. Meja adalah perabotan, tas adalah wadah, buku adalah untuk dibaca. Pensil termasuk alat tulis.',
      type: 'multiple-choice'
    },
    {
      id: 4,
      question: 'Pilih kalimat yang benar:',
      options: ['Saya sudah makan nasi.', 'Saya sudah makan nasi malahan.', 'Saya sudah nasi makan.', 'Sudah makan saya nasi.'],
      answer: 'Saya sudah makan nasi.',
      explanation: 'Struktur yang benar adalah Subjek + Predikat + Objek. "Saya sudah makan nasi" mengikuti urutan yang tepat dan merupakan kalimat yang baik dan benar.',
      type: 'multiple-choice'
    },
    {
      id: 5,
      question: 'Kata yang berlawanan dengan "besar" adalah?',
      options: ['Kecil', 'Panjang', 'Tebal', 'Tinggi'],
      answer: 'Kecil',
      explanation: 'Kecil adalah lawan (antonim) dari besar. Panjang, tebal, dan tinggi adalah sifat lain yang berbeda makna. Antonim adalah dua kata yang berlawanan makna.',
      type: 'multiple-choice'
    },
    {
      id: 6,
      question: 'Mana yang merupakan gabungan kata yang benar?',
      options: ['Bermain-main', 'Main-main', 'Bermain-bermain', 'Mainnya'],
      answer: 'Bermain-main',
      explanation: 'Bermain-main adalah bentuk reduplikasi yang benar. Bentuk ini menunjukkan aktivitas bermain yang dilakukan berulang-ulang atau santai.',
      type: 'multiple-choice'
    },
    {
      id: 7,
      question: 'Bentuk mana yang merupakan kata kerja?',
      options: ['Kecepatan', 'Berlari', 'Kecil', 'Merah'],
      answer: 'Berlari',
      explanation: 'Berlari adalah kata kerja (verba) karena menunjukkan suatu tindakan atau kegiatan. Kecepatan dan kecil adalah nomina dan adjektiva, bukan verba.',
      type: 'multiple-choice'
    },
    {
      id: 8,
      question: 'Pilih penggunaan huruf kapital yang benar:',
      options: ['rani pergi ke taman.', 'Rani pergi ke taman.', 'Rani Pergi Ke Taman.', 'RANI PERGI KE TAMAN.'],
      answer: 'Rani pergi ke taman.',
      explanation: 'Huruf kapital digunakan untuk awal kalimat dan nama orang. "Rani" dengan huruf kapital karena nama orang, dan kalimat dimulai dengan huruf kapital.',
      type: 'multiple-choice'
    },
    {
      id: 9,
      question: 'Kata apa yang dimaksud dengan "kata depan"?',
      options: ['Kata yang mula-mula', 'Kata yang menghubungkan', 'Kata yang ada di depan kalimat', 'Kata yang menunjukkan tempat atau waktu'],
      answer: 'Kata yang menunjukkan tempat atau waktu',
      explanation: 'Kata depan (preposisi) menunjukkan hubungan tempat, waktu, atau cara. Contohnya: di, ke, dari, pada, antara, dengan, tanpa, dsb.',
      type: 'multiple-choice'
    },
    {
      id: 10,
      question: 'Mana yang merupakan kata sifat?',
      options: ['Merah', 'Berlari', 'Buku', 'Membaca'],
      answer: 'Merah',
      explanation: 'Merah adalah kata sifat (adjektiva) yang menggambarkan warna atau kualitas. Berlari dan membaca adalah verba, buku adalah nomina.',
      type: 'multiple-choice'
    }
  ]
};

export function getBahasaQuestions(grade: number): Question[] {
  return bahasaQuestions[grade] || bahasaQuestions[1];
}



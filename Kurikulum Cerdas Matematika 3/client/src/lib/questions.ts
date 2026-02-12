import { Question } from '../types';

export function generateQuestions(grade: number, level: number, isRetry: boolean = false): Question[] {
  const questions: Question[] = [];
  
  for (let i = 0; i < 10; i++) {
    const question = generateQuestion(grade, level, i, isRetry);
    questions.push(question);
  }
  
  return questions;
}

function generateQuestion(grade: number, level: number, index: number, isRetry: boolean): Question {
  const difficulty = Math.min(grade, 12);
  
  if (level === 1) {
    return generateAdditionQuestion(difficulty, index, isRetry);
  } else if (level === 2) {
    return generateSubtractionQuestion(difficulty, index, isRetry);
  } else if (level === 3) {
    return generateMultiplicationQuestion(difficulty, index, isRetry);
  } else {
    return generateDivisionQuestion(difficulty, index, isRetry);
  }
}

const advancedExampleProblems = {
  1: [ // Penjumlahan
    { a: 7, b: 6, story: 'Kamu punya 7 permen, temanmu kasih 6 lagi. Berapa total?' },
    { a: 5, b: 8, story: 'Ada 5 apel di meja, ibumu letakkan 8 apel lagi. Berapa apel semuanya?' },
    { a: 9, b: 4, story: 'Kamu punya 9 mainan, dapat 4 mainan dari hadiah. Total berapa?' },
    { a: 6, b: 7, story: 'Di taman ada 6 anak, datang lagi 7 anak. Berapa anak semua?' },
    { a: 8, b: 5, story: 'Punya 8 kelereng, temanmu kasih 5 kelereng. Berapa kelereng sekarang?' }
  ],
  2: [ // Pengurangan
    { a: 12, b: 5, story: 'Punya 12 permen, dimakan 5. Berapa sisa permen?' },
    { a: 15, b: 8, story: 'Ada 15 apel, diberikan 8 ke tetangga. Berapa apel tersisa?' },
    { a: 14, b: 6, story: 'Punya 14 mainan, hilang 6. Berapa mainan yang masih ada?' },
    { a: 18, b: 9, story: 'Ada 18 buku, dipinjam teman 9. Berapa buku di rumah?' },
    { a: 16, b: 7, story: 'Punya 16 kelereng, kalah bermain 7. Berapa kelereng sekarang?' }
  ],
  3: [ // Perkalian
    { a: 3, b: 4, story: 'Ada 3 kelompok permen, setiap kelompok 4. Berapa semua?' },
    { a: 2, b: 5, story: 'Punya 2 tas, tiap tas ada 5 mainan. Berapa mainan total?' },
    { a: 4, b: 3, story: 'Ada 4 piring, setiap piring 3 apel. Berapa apel semua?' },
    { a: 5, b: 2, story: '5 teman, masing-masing dapat 2 permen. Berapa permen semua?' },
    { a: 3, b: 6, story: 'Ada 3 kotak, tiap kotak 6 krayon. Berapa krayon total?' }
  ],
  4: [ // Pembagian
    { a: 12, b: 3, story: 'Punya 12 permen, dibagi ke 3 teman sama rata. Tiap teman dapat berapa?' },
    { a: 10, b: 2, story: 'Ada 10 apel, dibagi ke 2 keranjang sama rata. Tiap keranjang berapa apel?' },
    { a: 15, b: 5, story: 'Punya 15 mainan, dibagi ke 5 anak sama rata. Tiap anak dapat berapa?' },
    { a: 16, b: 4, story: 'Ada 16 buku, dibagi ke 4 rak sama rata. Tiap rak berapa buku?' },
    { a: 18, b: 6, story: 'Punya 18 kelereng, dibagi ke 6 plastik sama rata. Tiap plastik berapa kelereng?' }
  ]
};

function generateAdditionQuestion(difficulty: number, index: number, isRetry: boolean): Question {
  const advanced = advancedExampleProblems[1];
  let a: number, b: number, story = '';

  if (index < advanced.length) {
    ({ a, b, story } = advanced[index]);
  } else {
    const maxNum = 10 + (difficulty * 10);
    a = Math.floor(Math.random() * maxNum) + 1;
    b = Math.floor(Math.random() * maxNum) + 1;
  }

  const answer = a + b;
  
  const type = index % 3 === 0 ? 'fill-in' : 'multiple-choice';
  
  let explanation = `Langkah penyelesaian:\n\n`;
  explanation += `Rumus: Bilangan 1 + Bilangan 2 = Hasil\n`;
  explanation += `${a} + ${b} = ${answer}\n\n`;
  
  if (a > 10 || b > 10) {
    const aTens = Math.floor(a / 10) * 10;
    const aOnes = a % 10;
    const bTens = Math.floor(b / 10) * 10;
    const bOnes = b % 10;
    if (aTens > 0 || bTens > 0) {
      explanation += `Cara detail:\n`;
      explanation += `Puluhan: ${aTens} + ${bTens} = ${aTens + bTens}\n`;
      explanation += `Satuan: ${aOnes} + ${bOnes} = ${aOnes + bOnes}\n`;
      explanation += `Total: ${aTens + bTens} + ${aOnes + bOnes} = ${answer}\n\n`;
    }
  }
  
  if (isRetry) {
    explanation += `💡 Tips: Pisahkan angka menjadi puluhan dan satuan untuk memudahkan perhitungan!`;
  }
  
  if (type === 'multiple-choice') {
    const options = generateOptions(answer, 4);
    return {
      id: index,
      question: `${a} + ${b} = ?`,
      options,
      answer: answer.toString(),
      explanation,
      type
    };
  }
  
  return {
    id: index,
    question: `${a} + ${b} = ?`,
    answer: answer.toString(),
    explanation,
    type
  };
}

function generateSubtractionQuestion(difficulty: number, index: number, isRetry: boolean): Question {
  const advanced = advancedExampleProblems[2];
  let a: number, b: number, story = '';

  if (index < advanced.length) {
    ({ a, b, story } = advanced[index]);
  } else {
    const maxNum = 10 + (difficulty * 10);
    a = Math.floor(Math.random() * maxNum) + 10;
    b = Math.floor(Math.random() * Math.min(a, maxNum)) + 1;
  }

  const answer = a - b;
  
  const type = index % 3 === 0 ? 'fill-in' : 'multiple-choice';
  
  let explanation = `Langkah penyelesaian:\n\n`;
  explanation += `Rumus: Bilangan Awal - Bilangan Dikurangi = Hasil\n`;
  explanation += `${a} - ${b} = ${answer}\n\n`;
  
  if (a > 10 && b > 10) {
    const aTens = Math.floor(a / 10) * 10;
    const aOnes = a % 10;
    const bTens = Math.floor(b / 10) * 10;
    const bOnes = b % 10;
    if (aTens > 0 && bTens > 0) {
      explanation += `Cara detail:\n`;
      explanation += `Puluhan: ${aTens} - ${bTens} = ${aTens - bTens}\n`;
      explanation += `Satuan: ${aOnes} - ${bOnes} = ${aOnes - bOnes}\n`;
      explanation += `Total: ${aTens - bTens} + ${aOnes - bOnes} = ${answer}\n\n`;
    }
  }
  
  if (isRetry) {
    explanation += `💡 Tips: Gunakan garis bilangan atau hitung mundur untuk memudahkan!`;
  }
  
  if (type === 'multiple-choice') {
    const options = generateOptions(answer, 4);
    return {
      id: index,
      question: `${a} - ${b} = ?`,
      options,
      answer: answer.toString(),
      explanation,
      type
    };
  }
  
  return {
    id: index,
    question: `${a} - ${b} = ?`,
    answer: answer.toString(),
    explanation,
    type
  };
}

function generateMultiplicationQuestion(difficulty: number, index: number, isRetry: boolean): Question {
  const advanced = advancedExampleProblems[3];
  let a: number, b: number, story = '';

  if (index < advanced.length) {
    ({ a, b, story } = advanced[index]);
  } else {
    const maxNum = 5 + difficulty;
    a = Math.floor(Math.random() * maxNum) + 1;
    b = Math.floor(Math.random() * maxNum) + 1;
  }

  const answer = a * b;
  
  const type = index % 3 === 0 ? 'fill-in' : 'multiple-choice';
  
  let explanation = `Langkah penyelesaian:\n\n`;
  explanation += `Rumus: Bilangan 1 × Bilangan 2 = Hasil\n`;
  explanation += `${a} × ${b} = ${answer}\n\n`;
  explanation += `Cara kerja:\n`;
  explanation += `Perkalian adalah penjumlahan berulang\n`;
  explanation += `${a} × ${b} artinya ${a} dijumlahkan sebanyak ${b} kali\n`;
  explanation += `= ${a}`;
  for (let i = 1; i < b; i++) {
    explanation += ` + ${a}`;
  }
  explanation += ` = ${answer}\n\n`;
  
  if (isRetry) {
    explanation += `💡 Tips: Hafalkan perkalian dasar 1-10 untuk memudahkan!`;
  }
  
  if (type === 'multiple-choice') {
    const options = generateOptions(answer, 4);
    return {
      id: index,
      question: `${a} × ${b} = ?`,
      options,
      answer: answer.toString(),
      explanation,
      type
    };
  }
  
  return {
    id: index,
    question: `${a} × ${b} = ?`,
    answer: answer.toString(),
    explanation,
    type
  };
}

function generateDivisionQuestion(difficulty: number, index: number, isRetry: boolean): Question {
  const advanced = advancedExampleProblems[4];
  let dividend: number, divisor: number, story = '', answer: number;

  if (index < advanced.length) {
    ({ a: dividend, b: divisor, story } = advanced[index]);
    answer = Math.round(dividend / divisor);
  } else {
    const maxNum = 5 + difficulty;
    divisor = Math.floor(Math.random() * maxNum) + 2;
    const quotient = Math.floor(Math.random() * maxNum) + 1;
    dividend = divisor * quotient;
    answer = quotient;
  }
  
  const type = index % 3 === 0 ? 'fill-in' : 'multiple-choice';
  
  let explanation = `Langkah penyelesaian:\n\n`;
  explanation += `Rumus: Bilangan Dibagi ÷ Pembagi = Hasil\n`;
  explanation += `${dividend} ÷ ${divisor} = ${answer}\n\n`;
  explanation += `Cara kerja:\n`;
  explanation += `Pembagian adalah kebalikan dari perkalian\n`;
  explanation += `${dividend} dibagi ${divisor} = berapa?\n`;
  explanation += `Cari: ${divisor} × ? = ${dividend}\n`;
  explanation += `Jawab: ${divisor} × ${answer} = ${dividend}\n`;
  explanation += `Jadi ${dividend} ÷ ${divisor} = ${answer}\n\n`;
  
  if (isRetry) {
    explanation += `💡 Tips: Gunakan perkalian untuk memeriksa jawaban pembagian!`;
  }
  
  if (type === 'multiple-choice') {
    const options = generateOptions(answer, 4);
    return {
      id: index,
      question: `${dividend} ÷ ${divisor} = ?`,
      options,
      answer: answer.toString(),
      explanation,
      type
    };
  }
  
  return {
    id: index,
    question: `${dividend} ÷ ${divisor} = ?`,
    answer: answer.toString(),
    explanation,
    type
  };
}

function generateOptions(correctAnswer: number, count: number): string[] {
  const options = new Set<number>();
  options.add(correctAnswer);
  
  while (options.size < count) {
    const offset = Math.floor(Math.random() * 20) - 10;
    const option = Math.max(0, correctAnswer + offset);
    if (option !== correctAnswer) {
      options.add(option);
    }
  }
  
  return Array.from(options).sort(() => Math.random() - 0.5).map(n => n.toString());
}

export function getLevelName(level: number): string {
  const names = ['Penjumlahan', 'Pengurangan', 'Perkalian', 'Pembagian'];
  return names[level - 1] || 'Level';
}

export function getGradeName(grade: number): string {
  if (grade <= 6) {
    return `Kelas ${grade} SD`;
  } else if (grade <= 9) {
    return `Kelas ${grade - 6} SMP`;
  } else {
    return `Kelas ${grade - 9} SMA`;
  }
}

// Practice problems for different grade levels
export const practiceProblems = {
  sd1Addition: {
    soal: "6 + 4 = ?",
    jawaban: "10",
    langkah: [
      "Bilangan pertama: 6",
      "Bilangan kedua: 4",
      "6 + 4 = 10"
    ]
  },
  smp8LinearEquation: {
    soal: "Selesaikan persamaan: 3x - 7 = 11",
    jawaban: "6",
    langkah: [
      "Persamaan awal: 3x - 7 = 11",
      "Tambahkan 7 ke kedua sisi: 3x - 7 + 7 = 11 + 7",
      "Sederhanakan: 3x = 18",
      "Bagi kedua sisi dengan 3: 3x ÷ 3 = 18 ÷ 3",
      "Jawaban: x = 6"
    ]
  },
  sma11QuadraticFunction: {
    soal: "Tentukan diskriminan dan akar-akar dari f(x) = 2x² - 5x + 2",
    jawaban: "x₁ = 2, x₂ = 0,5",
    langkah: [
      "Fungsi kuadrat: f(x) = 2x² - 5x + 2, dengan a = 2, b = -5, c = 2",
      "Hitung diskriminan: D = b² - 4ac = (-5)² - 4(2)(2) = 25 - 16 = 9",
      "Diskriminan positif, terdapat 2 akar real yang berbeda",
      "Gunakan rumus: x = (-b ± √D)/(2a) = (5 ± 3)/4",
      "x₁ = (5 + 3)/4 = 8/4 = 2 dan x₂ = (5 - 3)/4 = 2/4 = 0,5"
    ]
  }
};

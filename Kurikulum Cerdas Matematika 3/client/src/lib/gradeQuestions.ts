// Grade-specific question generation

export interface GradeQuestion {
  id: number;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  type: 'multiple-choice' | 'fill-in';
}

// Kelas 1-3 SD Questions
export function generateSD13Questions(grade: number, levelId: string): GradeQuestion[] {
  const questions: GradeQuestion[] = [];
  const maxNum = grade === 1 ? 20 : grade === 2 ? 50 : 100;

  if (levelId === 'penjumlahan') {
    const storyProblems = [
      { context: 'permen', verb: 'kasih' },
      { context: 'apel', verb: 'letakkan' },
      { context: 'mainan', verb: 'dapat' },
      { context: 'kelereng', verb: 'kasih' },
      { context: 'buku', verb: 'tambah' }
    ];

    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * (maxNum / 2)) + 1;
      const b = Math.floor(Math.random() * (maxNum / 2)) + 1;
      const answer = a + b;
      const story = storyProblems[i % storyProblems.length];
      
      questions.push({
        id: i,
        question: `Kamu punya ${a} ${story.context}, teman ${story.verb} ${b} lagi. Berapa total?`,
        options: generateOptions(answer, 4),
        answer: answer.toString(),
        explanation: `${a} + ${b} = ${answer}`,
        type: 'multiple-choice'
      });
    }
  } else if (levelId === 'pengurangan') {
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * maxNum) + 10;
      const b = Math.floor(Math.random() * Math.min(a, maxNum / 2)) + 1;
      const answer = a - b;
      
      questions.push({
        id: i,
        question: `Punya ${a} permen, dimakan ${b}. Berapa sisa?`,
        options: generateOptions(answer, 4),
        answer: answer.toString(),
        explanation: `${a} - ${b} = ${answer}`,
        type: 'multiple-choice'
      });
    }
  } else if (levelId === 'perkalian') {
    const max = grade === 1 ? 5 : grade === 2 ? 10 : 12;
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * max) + 1;
      const b = Math.floor(Math.random() * max) + 1;
      const answer = a * b;
      
      questions.push({
        id: i,
        question: `Ada ${a} kelompok permen, tiap kelompok ${b}. Berapa semua?`,
        options: generateOptions(answer, 4),
        answer: answer.toString(),
        explanation: `${a} × ${b} = ${answer}`,
        type: 'multiple-choice'
      });
    }
  } else if (levelId === 'pembagian') {
    const max = grade === 1 ? 5 : grade === 2 ? 10 : 15;
    for (let i = 0; i < 10; i++) {
      const divisor = Math.floor(Math.random() * max) + 2;
      const quotient = Math.floor(Math.random() * max) + 1;
      const dividend = divisor * quotient;
      
      questions.push({
        id: i,
        question: `Punya ${dividend} permen, dibagi ke ${divisor} teman. Tiap teman dapat berapa?`,
        options: generateOptions(quotient, 4),
        answer: quotient.toString(),
        explanation: `${dividend} ÷ ${divisor} = ${quotient}`,
        type: 'multiple-choice'
      });
    }
  }

  return questions;
}

// Kelas 4-6 SD Questions (larger numbers, fractions)
export function generateSD46Questions(grade: number, levelId: string): GradeQuestion[] {
  const questions: GradeQuestion[] = [];

  if (levelId === 'pecahan') {
    const fractions = [
      { a: 1, b: 2, c: 1, d: 4 },
      { a: 3, b: 4, c: 1, d: 2 },
      { a: 2, b: 3, c: 1, d: 6 },
      { a: 1, b: 3, c: 1, d: 3 },
      { a: 3, b: 5, c: 1, d: 5 }
    ];

    for (let i = 0; i < 10; i++) {
      const frac = fractions[i % fractions.length];
      const lcm = findLCM(frac.b, frac.d);
      const result = `${(frac.a * lcm / frac.b) + (frac.c * lcm / frac.d)}/${lcm}`;
      
      questions.push({
        id: i,
        question: `Hitung: ${frac.a}/${frac.b} + ${frac.c}/${frac.d} = ?`,
        options: [result, `${frac.a + frac.c}/${frac.b}`, `${frac.a}/${frac.b + frac.d}`, `${frac.a + frac.c}/${frac.b + frac.d}`],
        answer: result,
        explanation: `Samakan penyebut ke ${lcm}, lalu jumlahkan pembilang`,
        type: 'multiple-choice'
      });
    }
  } else {
    // Regular arithmetic with larger numbers
    for (let i = 0; i < 10; i++) {
      if (levelId === 'penjumlahan') {
        const a = Math.floor(Math.random() * 900) + 100;
        const b = Math.floor(Math.random() * 900) + 100;
        const answer = a + b;
        
        questions.push({
          id: i,
          question: `${a} + ${b} = ?`,
          options: generateOptions(answer, 4),
          answer: answer.toString(),
          explanation: `${a} + ${b} = ${answer}`,
          type: 'multiple-choice'
        });
      }
    }
  }

  return questions;
}

// Kelas 7 SMP Questions (Algebra basics)
export function generateSMP7Questions(grade: number, levelId: string): GradeQuestion[] {
  const questions: GradeQuestion[] = [];

  if (levelId === 'suku-sejenis') {
    const problems = [
      { q: '4x + 7x - 2x + 5y - 3y', a: '9x + 2y', opts: ['9x + 2y', '11x + 2y', '9x + 8y', '13x - 2y'] },
      { q: '5x + 3x - 2x', a: '6x', opts: ['6x', '10x', '4x', '8x'] },
      { q: '8a - 3a + 2b + 5b - a', a: '4a + 7b', opts: ['4a + 7b', '6a + 7b', '4a + 3b', '12a + 7b'] },
      { q: '12m + 5n - 8m - 2n', a: '4m + 3n', opts: ['4m + 3n', '20m + 3n', '4m + 7n', '4m - 3n'] },
      { q: '7y - 2y + 4y', a: '9y', opts: ['9y', '3y', '13y', '5y'] },
      { q: '10a - 3a - 2a', a: '5a', opts: ['5a', '15a', '9a', '11a'] },
      { q: '6p + 4p - 3p + 2q - q', a: '7p + q', opts: ['7p + q', '13p + 3q', '7p + 3q', '3p + q'] },
      { q: '9x + 5x - 6x + 3y + 2y', a: '8x + 5y', opts: ['8x + 5y', '20x + 5y', '8x + 1y', '14x + 5y'] },
      { q: '15m - 7m + 3m - 2n + 4n', a: '11m + 2n', opts: ['11m + 2n', '5m + 6n', '11m - 6n', '25m + 2n'] },
      { q: '4k + 8k - 5k + 6j - 3j', a: '7k + 3j', opts: ['7k + 3j', '17k + 3j', '7k + 9j', '7k - 9j'] }
    ];

    for (let i = 0; i < 10; i++) {
      const prob = problems[i];
      questions.push({
        id: i,
        question: `Sederhanakan: ${prob.q}`,
        options: prob.opts,
        answer: prob.a,
        explanation: `Gabungkan suku-suku sejenis (variabel yang sama):\n${prob.q} = ${prob.a}`,
        type: 'multiple-choice'
      });
    }
  } else if (levelId === 'plsv') {
    const equations = [
      { eq: '4x - 12 = 8', ans: '5', exp: '4x = 8 + 12 → 4x = 20 → x = 5' },
      { eq: '3x + 6 = 15', ans: '3', exp: '3x = 15 - 6 → 3x = 9 → x = 3' },
      { eq: '2x - 8 = 10', ans: '9', exp: '2x = 10 + 8 → 2x = 18 → x = 9' },
      { eq: '5x + 5 = 30', ans: '5', exp: '5x = 30 - 5 → 5x = 25 → x = 5' },
      { eq: '6x - 18 = 0', ans: '3', exp: '6x = 18 → x = 3' },
      { eq: '7x + 14 = 35', ans: '3', exp: '7x = 35 - 14 → 7x = 21 → x = 3' },
      { eq: '8x - 16 = 24', ans: '5', exp: '8x = 24 + 16 → 8x = 40 → x = 5' },
      { eq: '9x + 9 = 45', ans: '4', exp: '9x = 45 - 9 → 9x = 36 → x = 4' },
      { eq: '10x - 30 = 20', ans: '5', exp: '10x = 20 + 30 → 10x = 50 → x = 5' },
      { eq: '2x + 10 = 22', ans: '6', exp: '2x = 22 - 10 → 2x = 12 → x = 6' }
    ];

    for (let i = 0; i < 10; i++) {
      const eq = equations[i];
      questions.push({
        id: i,
        question: `Tentukan nilai x: ${eq.eq}`,
        options: [eq.ans, `${parseInt(eq.ans) + 1}`, `${parseInt(eq.ans) - 1}`, `${parseInt(eq.ans) + 2}`],
        answer: eq.ans,
        explanation: eq.exp,
        type: 'multiple-choice'
      });
    }
  }

  return questions;
}

// Kelas 8 SMP Questions (Factorization & Expansion)
export function generateSMP8Questions(grade: number, levelId: string): GradeQuestion[] {
  const questions: GradeQuestion[] = [];

  if (levelId === 'faktorisasi') {
    const problems = [
      { q: 'x² + 6x + 8', a: '(x+2)(x+4)', opts: ['(x+2)(x+4)', '(x+1)(x+8)', '(x+3)(x+5)', '(x+4)(x+2)'], exp: 'Cari dua bilangan: 2 × 4 = 8 dan 2 + 4 = 6' },
      { q: 'x² + 5x + 6', a: '(x+2)(x+3)', opts: ['(x+2)(x+3)', '(x+1)(x+6)', '(x+3)(x+2)', '(x-2)(x-3)'], exp: 'Cari dua bilangan: 2 × 3 = 6 dan 2 + 3 = 5' },
      { q: 'x² + 7x + 12', a: '(x+3)(x+4)', opts: ['(x+3)(x+4)', '(x+2)(x+6)', '(x+1)(x+12)', '(x+6)(x+2)'], exp: 'Cari dua bilangan: 3 × 4 = 12 dan 3 + 4 = 7' },
      { q: 'x² + 7x + 10', a: '(x+2)(x+5)', opts: ['(x+2)(x+5)', '(x+1)(x+10)', '(x+3)(x+4)', '(x+5)(x+2)'], exp: 'Cari dua bilangan: 2 × 5 = 10 dan 2 + 5 = 7' },
      { q: 'x² + 8x + 15', a: '(x+3)(x+5)', opts: ['(x+3)(x+5)', '(x+1)(x+15)', '(x+2)(x+7)', '(x+5)(x+3)'], exp: 'Cari dua bilangan: 3 × 5 = 15 dan 3 + 5 = 8' },
      { q: 'x² + 9x + 20', a: '(x+4)(x+5)', opts: ['(x+4)(x+5)', '(x+2)(x+10)', '(x+1)(x+20)', '(x+5)(x+4)'], exp: 'Cari dua bilangan: 4 × 5 = 20 dan 4 + 5 = 9' },
      { q: 'x² - 9', a: '(x-3)(x+3)', opts: ['(x-3)(x+3)', '(x-1)(x+9)', '(x-9)(x+1)', '(x+3)(x-3)'], exp: 'Selisih kuadrat: x² - 3² = (x-3)(x+3)' },
      { q: '(x + 4)(x + 2)', a: 'x² + 6x + 8', opts: ['x² + 6x + 8', 'x² + 8x + 6', 'x² + 4x + 2', 'x² + 2x + 8'], exp: 'Kalikan: x·x + x·2 + 4·x + 4·2 = x² + 6x + 8' },
      { q: '(3x - 2)(x + 5)', a: '3x² + 13x - 10', opts: ['3x² + 13x - 10', '3x² + 15x - 10', '3x² - 13x + 10', '3x² + 3x - 10'], exp: 'Kalikan: 3x·x + 3x·5 - 2·x - 2·5 = 3x² + 13x - 10' },
      { q: '(2x + 1)(x - 3)', a: '2x² - 5x - 3', opts: ['2x² - 5x - 3', '2x² + 5x - 3', '2x² - 3x - 1', '2x² - 6x + 1'], exp: 'Kalikan: 2x·x - 2x·3 + 1·x - 1·3 = 2x² - 5x - 3' }
    ];

    for (let i = 0; i < 10; i++) {
      const prob = problems[i];
      const isFactor = prob.q.includes('x²');
      questions.push({
        id: i,
        question: isFactor ? `Faktorkan: ${prob.q}` : `Hasil dari ${prob.q} adalah?`,
        options: prob.opts,
        answer: prob.a,
        explanation: prob.exp,
        type: 'multiple-choice'
      });
    }
  } else if (levelId === 'selisih-kuadrat') {
    const problems = [
      { q: '4x² - 9', a: '(2x-3)(2x+3)', exp: '4x² = (2x)² dan 9 = 3², maka 4x² - 9 = (2x-3)(2x+3)' },
      { q: 'x² - 16', a: '(x-4)(x+4)', exp: 'x² - 16 = x² - 4² = (x-4)(x+4)' },
      { q: '9x² - 25', a: '(3x-5)(3x+5)', exp: '9x² = (3x)² dan 25 = 5², maka 9x² - 25 = (3x-5)(3x+5)' },
      { q: '16x² - 1', a: '(4x-1)(4x+1)', exp: '16x² = (4x)² dan 1 = 1², maka 16x² - 1 = (4x-1)(4x+1)' },
      { q: 'x² - 36', a: '(x-6)(x+6)', exp: 'x² - 36 = x² - 6² = (x-6)(x+6)' },
      { q: '25x² - 4', a: '(5x-2)(5x+2)', exp: '25x² = (5x)² dan 4 = 2², maka 25x² - 4 = (5x-2)(5x+2)' },
      { q: '(x - 7)(x + 7)', a: 'x² - 49', exp: 'Kalikan: x² + 7x - 7x - 49 = x² - 49' },
      { q: '(2x + y)(x - y)', a: '2x² - xy - y²', exp: 'Kalikan: 2x² - 2xy + xy - y² = 2x² - xy - y²' },
      { q: '(4p + q)(p - 3q)', a: '4p² - 11pq - 3q²', exp: 'Kalikan: 4p² - 12pq + pq - 3q² = 4p² - 11pq - 3q²' },
      { q: 'x² - 100', a: '(x-10)(x+10)', exp: 'x² - 100 = x² - 10² = (x-10)(x+10)' }
    ];

    for (let i = 0; i < 10; i++) {
      const prob = problems[i];
      const isExpand = prob.q.includes('(');
      questions.push({
        id: i,
        question: isExpand ? `Hasil dari ${prob.q} adalah?` : `Faktorkan: ${prob.q}`,
        options: isExpand 
          ? [prob.a, 'x² + 49', 'x² - 25', '2x² + y²']
          : [prob.a, '(x-2)(x+3)', '(x-1)(x+5)', '(2x-1)(x+3)'],
        answer: prob.a,
        explanation: prob.exp,
        type: 'multiple-choice'
      });
    }
  }

  return questions;
}

// Kelas 9 SMP Questions (Quadratic)
export function generateSMP9Questions(grade: number, levelId: string): GradeQuestion[] {
  const questions: GradeQuestion[] = [];

  if (levelId === 'persamaan-kuadrat') {
    const equations = [
      { eq: 'x² - 5x + 6 = 0', ans: 'x = 2 atau x = 3' },
      { eq: 'x² - 7x + 10 = 0', ans: 'x = 2 atau x = 5' },
      { eq: 'x² - 8x + 15 = 0', ans: 'x = 3 atau x = 5' },
      { eq: 'x² - 9x + 20 = 0', ans: 'x = 4 atau x = 5' },
      { eq: 'x² - 6x + 8 = 0', ans: 'x = 2 atau x = 4' }
    ];

    for (let i = 0; i < 10; i++) {
      const eq = equations[i % equations.length];
      questions.push({
        id: i,
        question: `Selesaikan: ${eq.eq}`,
        options: [eq.ans, 'x = 1 atau x = 6', 'x = 0 atau x = 5', 'x = 3 atau x = 4'],
        answer: eq.ans,
        explanation: `Faktorkan atau gunakan rumus abc`,
        type: 'multiple-choice'
      });
    }
  }

  return questions;
}

// Kelas 10-12 SMA Questions (Advanced)
export function generateSMAQuestions(grade: number, levelId: string): GradeQuestion[] {
  const questions: GradeQuestion[] = [];

  // Kelas 10 SMA
  if (levelId === 'matriks') {
    const problems = [
      { q: 'Hitung [[2, 1], [3, 4]] × [[1], [2]]', a: '[[4], [11]]', opts: ['[[4], [11]]', '[[3], [10]]', '[[5], [12]]', '[[2], [8]]'], exp: 'Hasil: baris 1: 2×1 + 1×2 = 4; baris 2: 3×1 + 4×2 = 11' },
      { q: 'Hitung [[1, 2], [3, 4]] + [[5, 6], [7, 8]]', a: '[[6, 8], [10, 12]]', opts: ['[[6, 8], [10, 12]]', '[[5, 7], [9, 11]]', '[[7, 9], [11, 13]]', '[[4, 6], [8, 10]]'], exp: 'Jumlahkan elemen yang sesuai posisi' },
      { q: 'Hitung [[1, 0], [0, 1]] × [[3, 4], [5, 6]]', a: '[[3, 4], [5, 6]]', opts: ['[[3, 4], [5, 6]]', '[[4, 5], [6, 7]]', '[[1, 0], [0, 1]]', '[[8, 10], [5, 6]]'], exp: 'Matriks identitas × A = A' },
      { q: 'Transpose dari [[1, 2, 3], [4, 5, 6]]', a: '[[1, 4], [2, 5], [3, 6]]', opts: ['[[1, 4], [2, 5], [3, 6]]', '[[1, 2, 3], [4, 5, 6]]', '[[6, 5, 4], [3, 2, 1]]', '[[1, 3], [2, 4], [5, 6]]'], exp: 'Tukar baris jadi kolom' },
      { q: 'Hitung 3 × [[1, 2], [3, 4]]', a: '[[3, 6], [9, 12]]', opts: ['[[3, 6], [9, 12]]', '[[4, 5], [6, 7]]', '[[1, 2], [3, 4]]', '[[6, 12], [18, 24]]'], exp: 'Kalikan setiap elemen dengan 3' },
      { q: 'Determinan [[2, 3], [1, 4]]', a: '5', opts: ['5', '8', '11', '2'], exp: 'det = 2×4 - 3×1 = 8 - 3 = 5' },
      { q: 'Invers [[1, 2], [3, 4]]', a: '[[-2, 1], [1.5, -0.5]]', opts: ['[[-2, 1], [1.5, -0.5]]', '[[4, -2], [-3, 1]]', '[[1, 2], [3, 4]]', '[[0, 0], [0, 0]]'], exp: 'A⁻¹ = 1/det × [[d,-b],[-c,a]]' },
      { q: 'Hitung [[1, 2], [0, 3]] × [[4, 0], [1, 2]]', a: '[[6, 4], [3, 6]]', opts: ['[[6, 4], [3, 6]]', '[[4, 2], [3, 6]]', '[[5, 2], [1, 6]]', '[[8, 4], [3, 5]]'], exp: 'Baris 1: [1×4+2×1, 1×0+2×2]=[6,4]; Baris 2: [0×4+3×1, 0×0+3×2]=[3,6]' },
      { q: '[[2, 0], [0, 3]] - [[1, 1], [1, 1]]', a: '[[1, -1], [-1, 2]]', opts: ['[[1, -1], [-1, 2]]', '[[1, 1], [1, 2]]', '[[3, -1], [-1, 4]]', '[[2, 0], [0, 3]]'], exp: 'Kurangi elemen yang sesuai' },
      { q: 'Ordo matriks [[1, 2, 3]]', a: '1×3', opts: ['1×3', '3×1', '3×3', '1×1'], exp: 'Matriks dengan 1 baris dan 3 kolom = ordo 1×3' }
    ];

    for (let i = 0; i < 10; i++) {
      const prob = problems[i];
      questions.push({
        id: i,
        question: prob.q,
        options: prob.opts,
        answer: prob.a,
        explanation: prob.exp,
        type: 'multiple-choice'
      });
    }
  } else if (levelId === 'trigonometri') {
    const problems = [
      { q: 'sin 30° = ?', a: '1/2', opts: ['1/2', '1/√2', '√3/2', '1'], exp: 'Nilai khusus: sin 30° = 1/2' },
      { q: 'cos 60° = ?', a: '1/2', opts: ['1/2', '√3/2', '1/√2', '0'], exp: 'Nilai khusus: cos 60° = 1/2' },
      { q: 'tan 45° = ?', a: '1', opts: ['1', '1/2', '√3', '0'], exp: 'tan 45° = sin 45°/cos 45° = 1' },
      { q: 'sin² θ + cos² θ = ?', a: '1', opts: ['1', '0', '2', 'θ'], exp: 'Identitas Pythagoras trigonometri' },
      { q: 'sin 90° = ?', a: '1', opts: ['1', '0', '1/2', '√3/2'], exp: 'Nilai khusus: sin 90° = 1' },
      { q: 'cos 0° = ?', a: '1', opts: ['1', '0', '1/2', '-1'], exp: 'Nilai khusus: cos 0° = 1' },
      { q: 'tan 60° = ?', a: '√3', opts: ['√3', '1', '1/√3', '1/2'], exp: 'tan 60° = sin 60°/cos 60° = √3' },
      { q: 'sin(180° - θ) = ?', a: 'sin θ', opts: ['sin θ', '-sin θ', 'cos θ', '-cos θ'], exp: 'Rumus sudut berelasi kuadran II' },
      { q: 'cos(90° - θ) = ?', a: 'sin θ', opts: ['sin θ', 'cos θ', '-sin θ', 'tan θ'], exp: 'Identitas sudut pelengkap' },
      { q: '1 + tan² θ = ?', a: 'sec² θ', opts: ['sec² θ', 'csc² θ', '1', 'cos² θ'], exp: 'Identitas trigonometri: 1 + tan² θ = sec² θ' }
    ];

    for (let i = 0; i < 10; i++) {
      const prob = problems[i];
      questions.push({
        id: i,
        question: prob.q,
        options: prob.opts,
        answer: prob.a,
        explanation: prob.exp,
        type: 'multiple-choice'
      });
    }
  } else if (levelId === 'fungsi') {
    const problems = [
      { q: 'Jika f(x) = 2x + 3, maka f(5) = ?', a: '13', opts: ['13', '10', '8', '11'], exp: 'f(5) = 2(5) + 3 = 10 + 3 = 13' },
      { q: 'f(x) = x², g(x) = x + 1. Hitung (f∘g)(2)', a: '9', opts: ['9', '5', '4', '7'], exp: '(f∘g)(2) = f(g(2)) = f(3) = 3² = 9' },
      { q: 'Invers dari f(x) = 2x - 4 adalah?', a: '(x + 4)/2', opts: ['(x + 4)/2', '(x - 4)/2', '2x + 4', 'x/2 + 4'], exp: 'y = 2x - 4 → x = 2y - 4 → 2y = x + 4 → y = (x + 4)/2' },
      { q: 'f(x) = x + 5, g(x) = 2x. Hitung (g∘f)(3)', a: '16', opts: ['16', '11', '13', '8'], exp: '(g∘f)(3) = g(f(3)) = g(8) = 2(8) = 16' },
      { q: 'Jika f(x) = 3x - 1, maka f⁻¹(8) = ?', a: '3', opts: ['3', '2', '4', '5'], exp: 'y = 3x - 1 → x = (y + 1)/3. Maka f⁻¹(8) = (8 + 1)/3 = 3' },
      { q: 'Domain f(x) = 1/(x - 2) adalah?', a: 'x ≠ 2', opts: ['x ≠ 2', 'x ≠ 0', 'x > 2', 'semua bilangan real'], exp: 'Penyebut tidak boleh 0, jadi x - 2 ≠ 0 → x ≠ 2' },
      { q: 'Range f(x) = x² untuk x ∈ ℝ adalah?', a: 'y ≥ 0', opts: ['y ≥ 0', 'y > 0', 'semua y', 'y ≤ 0'], exp: 'Kuadrat selalu ≥ 0' },
      { q: 'f(x) = |x - 3|. Hitung f(1)', a: '2', opts: ['2', '-2', '4', '1'], exp: 'f(1) = |1 - 3| = |-2| = 2' },
      { q: 'Jika f(x) = x³, maka f(-2) = ?', a: '-8', opts: ['-8', '8', '-6', '6'], exp: 'f(-2) = (-2)³ = -8' },
      { q: 'Invers dari f(x) = x/3 + 2 adalah?', a: '3(x - 2)', opts: ['3(x - 2)', '3x - 2', 'x/3 - 2', '3x + 2'], exp: 'y = x/3 + 2 → x = 3(y - 2)' }
    ];

    for (let i = 0; i < 10; i++) {
      const prob = problems[i];
      questions.push({
        id: i,
        question: prob.q,
        options: prob.opts,
        answer: prob.a,
        explanation: prob.exp,
        type: 'multiple-choice'
      });
    }
  } else if (levelId === 'logaritma') {
    const problems = [
      { q: 'log₂ 8 = ?', a: '3', opts: ['3', '2', '4', '8'], exp: '2³ = 8, jadi log₂ 8 = 3' },
      { q: 'log₁₀ 100 = ?', a: '2', opts: ['2', '10', '100', '1'], exp: '10² = 100, jadi log₁₀ 100 = 2' },
      { q: 'log₅ 25 = ?', a: '2', opts: ['2', '5', '25', '1'], exp: '5² = 25, jadi log₅ 25 = 2' },
      { q: 'log 1 = ?', a: '0', opts: ['0', '1', '-1', '10'], exp: '10⁰ = 1, jadi log 1 = 0' },
      { q: 'log₂ 16 = ?', a: '4', opts: ['4', '2', '8', '16'], exp: '2⁴ = 16, jadi log₂ 16 = 4' },
      { q: 'log a + log b = ?', a: 'log(ab)', opts: ['log(ab)', 'log(a+b)', 'log a × log b', 'log(a/b)'], exp: 'Sifat logaritma: log a + log b = log(ab)' },
      { q: 'log a - log b = ?', a: 'log(a/b)', opts: ['log(a/b)', 'log(a-b)', 'log(ab)', 'log a / log b'], exp: 'Sifat logaritma: log a - log b = log(a/b)' },
      { q: 'n × log a = ?', a: 'log(aⁿ)', opts: ['log(aⁿ)', 'log(n×a)', 'n + log a', '(log a)ⁿ'], exp: 'Sifat logaritma: n × log a = log(aⁿ)' },
      { q: 'log₃ 27 = ?', a: '3', opts: ['3', '9', '27', '2'], exp: '3³ = 27, jadi log₃ 27 = 3' },
      { q: 'log 10 = ?', a: '1', opts: ['1', '10', '0', '2'], exp: '10¹ = 10, jadi log 10 = 1' }
    ];

    for (let i = 0; i < 10; i++) {
      const prob = problems[i];
      questions.push({
        id: i,
        question: prob.q,
        options: prob.opts,
        answer: prob.a,
        explanation: prob.exp,
        type: 'multiple-choice'
      });
    }
  }

  // Kelas 11 SMA
  else if (levelId === 'limit') {
    const problems = [
      { q: 'lim (x→2) (x² - 4)/(x - 2)', a: '4', opts: ['4', '2', '0', '∞'], exp: 'Faktorkan: (x-2)(x+2)/(x-2) = x+2, substitusi x=2 → 4' },
      { q: 'lim (x→3) (x² - 9)/(x - 3)', a: '6', opts: ['6', '3', '9', '0'], exp: 'Faktorkan: (x-3)(x+3)/(x-3) = x+3, substitusi x=3 → 6' },
      { q: 'lim (x→1) (x² - 1)/(x - 1)', a: '2', opts: ['2', '1', '0', '-1'], exp: 'Faktorkan: (x-1)(x+1)/(x-1) = x+1, substitusi x=1 → 2' },
      { q: 'lim (x→0) sin x / x', a: '1', opts: ['1', '0', '∞', 'sin 0'], exp: 'Rumus khusus limit trigonometri: lim (x→0) sin x / x = 1' },
      { q: 'lim (x→∞) (3x + 2)/(x - 1)', a: '3', opts: ['3', '2', '∞', '0'], exp: 'Bagi pembilang dan penyebut dengan x: 3 + 2/x → 3 saat x→∞' },
      { q: 'lim (x→4) (x² - 16)/(x - 4)', a: '8', opts: ['8', '4', '16', '0'], exp: 'Faktorkan: (x-4)(x+4)/(x-4) = x+4, substitusi x=4 → 8' },
      { q: 'lim (x→2) (x³ - 8)/(x - 2)', a: '12', opts: ['12', '8', '6', '4'], exp: 'Faktorkan: (x-2)(x²+2x+4)/(x-2) = x²+2x+4, x=2 → 4+4+4=12' },
      { q: 'lim (x→0) (1 - cos x)/x', a: '0', opts: ['0', '1', '∞', '-1'], exp: 'Limit khusus: lim (x→0) (1 - cos x)/x = 0' },
      { q: 'lim (x→5) (x² - 25)/(x - 5)', a: '10', opts: ['10', '5', '25', '0'], exp: 'Faktorkan: (x-5)(x+5)/(x-5) = x+5, substitusi x=5 → 10' },
      { q: 'lim (x→∞) (2x² + x)/(x² - 1)', a: '2', opts: ['2', '1', '∞', '0'], exp: 'Bagi dengan x²: (2 + 1/x)/(1 - 1/x²) → 2/1 = 2' }
    ];

    for (let i = 0; i < 10; i++) {
      const prob = problems[i];
      questions.push({
        id: i,
        question: prob.q,
        options: prob.opts,
        answer: prob.a,
        explanation: prob.exp,
        type: 'multiple-choice'
      });
    }
  } else if (levelId === 'turunan') {
    const problems = [
      { q: "f(x) = 3x², maka f'(x) = ?", a: '6x', opts: ['6x', '3x', '3x²', '6x²'], exp: 'd/dx(3x²) = 3 × 2x = 6x' },
      { q: "f(x) = 5x³, maka f'(x) = ?", a: '15x²', opts: ['15x²', '5x²', '15x³', '5x'], exp: 'd/dx(5x³) = 5 × 3x² = 15x²' },
      { q: "f(x) = 2x⁴, maka f'(x) = ?", a: '8x³', opts: ['8x³', '2x³', '8x⁴', '4x³'], exp: 'd/dx(2x⁴) = 2 × 4x³ = 8x³' },
      { q: "f(x) = x³ + 2x, maka f'(x) = ?", a: '3x² + 2', opts: ['3x² + 2', 'x² + 2', '3x²', 'x² + 2x'], exp: 'd/dx(x³) + d/dx(2x) = 3x² + 2' },
      { q: "f(x) = 4x² - 3x + 1, maka f'(x) = ?", a: '8x - 3', opts: ['8x - 3', '4x - 3', '8x', '4x'], exp: 'd/dx(4x²) - d/dx(3x) + d/dx(1) = 8x - 3 + 0' },
      { q: "Turunan dari sin x adalah?", a: 'cos x', opts: ['cos x', '-cos x', 'sin x', '-sin x'], exp: 'd/dx(sin x) = cos x' },
      { q: "Turunan dari cos x adalah?", a: '-sin x', opts: ['-sin x', 'sin x', '-cos x', 'cos x'], exp: 'd/dx(cos x) = -sin x' },
      { q: "f(x) = x⁵, maka f'(x) = ?", a: '5x⁴', opts: ['5x⁴', 'x⁴', '5x⁵', 'x⁵'], exp: 'd/dx(x⁵) = 5x⁴' },
      { q: "f(x) = 1/x, maka f'(x) = ?", a: '-1/x²', opts: ['-1/x²', '1/x²', '-1/x', '1/x'], exp: 'f(x) = x⁻¹, f\'(x) = -1x⁻² = -1/x²' },
      { q: "f(x) = eˣ, maka f'(x) = ?", a: 'eˣ', opts: ['eˣ', 'xeˣ⁻¹', 'e', '1'], exp: 'Sifat khusus: turunan eˣ adalah eˣ' }
    ];

    for (let i = 0; i < 10; i++) {
      const prob = problems[i];
      questions.push({
        id: i,
        question: prob.q,
        options: prob.opts,
        answer: prob.a,
        explanation: prob.exp,
        type: 'multiple-choice'
      });
    }
  } else if (levelId === 'integral') {
    const problems = [
      { q: '∫ 2x dx = ?', a: 'x² + C', opts: ['x² + C', '2x² + C', 'x + C', '2x + C'], exp: '∫ 2x dx = 2 × x²/2 + C = x² + C' },
      { q: '∫ 3x² dx = ?', a: 'x³ + C', opts: ['x³ + C', '3x³ + C', 'x² + C', '3x² + C'], exp: '∫ 3x² dx = 3 × x³/3 + C = x³ + C' },
      { q: '∫ 4x³ dx = ?', a: 'x⁴ + C', opts: ['x⁴ + C', '4x⁴ + C', 'x³ + C', '4x³ + C'], exp: '∫ 4x³ dx = 4 × x⁴/4 + C = x⁴ + C' },
      { q: '∫ 1 dx = ?', a: 'x + C', opts: ['x + C', '1 + C', 'C', '0'], exp: '∫ 1 dx = x + C' },
      { q: '∫ (x + 1) dx = ?', a: 'x²/2 + x + C', opts: ['x²/2 + x + C', 'x² + x + C', 'x + C', '2x + C'], exp: '∫ x dx + ∫ 1 dx = x²/2 + x + C' },
      { q: '∫ 5x⁴ dx = ?', a: 'x⁵ + C', opts: ['x⁵ + C', '5x⁵ + C', 'x⁴ + C', '5x⁴ + C'], exp: '∫ 5x⁴ dx = 5 × x⁵/5 + C = x⁵ + C' },
      { q: '∫ cos x dx = ?', a: 'sin x + C', opts: ['sin x + C', '-sin x + C', 'cos x + C', '-cos x + C'], exp: 'Integral dari cos x adalah sin x + C' },
      { q: '∫ sin x dx = ?', a: '-cos x + C', opts: ['-cos x + C', 'cos x + C', '-sin x + C', 'sin x + C'], exp: 'Integral dari sin x adalah -cos x + C' },
      { q: '∫ eˣ dx = ?', a: 'eˣ + C', opts: ['eˣ + C', 'xeˣ + C', 'e + C', 'x + C'], exp: 'Integral dari eˣ adalah eˣ + C' },
      { q: '∫ 0 dx = ?', a: 'C', opts: ['C', '0', 'x', '1'], exp: 'Integral dari 0 adalah konstanta C' }
    ];

    for (let i = 0; i < 10; i++) {
      const prob = problems[i];
      questions.push({
        id: i,
        question: prob.q,
        options: prob.opts,
        answer: prob.a,
        explanation: prob.exp,
        type: 'multiple-choice'
      });
    }
  } else if (levelId === 'peluang') {
    const problems = [
      { q: 'Peluang muncul angka saat melempar koin?', a: '1/2', opts: ['1/2', '1', '1/4', '0'], exp: 'Ada 2 kemungkinan (angka/gambar), jadi P(angka) = 1/2' },
      { q: 'Peluang munculnya angka 6 pada dadu?', a: '1/6', opts: ['1/6', '1/3', '1/2', '6'], exp: 'Ada 6 sisi, jadi P(6) = 1/6' },
      { q: 'Peluang munculnya angka genap pada dadu?', a: '1/2', opts: ['1/2', '1/3', '1/6', '2/3'], exp: 'Angka genap: 2,4,6 (3 dari 6), jadi 3/6 = 1/2' },
      { q: 'Jika P(A) = 0.3, maka P(tidak A) = ?', a: '0.7', opts: ['0.7', '0.3', '1', '0'], exp: 'P(tidak A) = 1 - P(A) = 1 - 0.3 = 0.7' },
      { q: 'Banyak cara menyusun 3 orang dalam barisan?', a: '6', opts: ['6', '3', '9', '12'], exp: '3! = 3 × 2 × 1 = 6' },
      { q: 'Kombinasi 5 pilih 2: C(5,2) = ?', a: '10', opts: ['10', '20', '5', '15'], exp: 'C(5,2) = 5!/(2!×3!) = (5×4)/(2×1) = 10' },
      { q: 'Permutasi 4 pilih 2: P(4,2) = ?', a: '12', opts: ['12', '6', '8', '24'], exp: 'P(4,2) = 4!/(4-2)! = 4!/2! = 4×3 = 12' },
      { q: 'Peluang 2 koin keduanya gambar?', a: '1/4', opts: ['1/4', '1/2', '1/3', '2/3'], exp: 'P(G,G) = 1/2 × 1/2 = 1/4' },
      { q: 'Jika A dan B independen, P(A∩B) = ?', a: 'P(A) × P(B)', opts: ['P(A) × P(B)', 'P(A) + P(B)', 'P(A) - P(B)', '1'], exp: 'Untuk kejadian independen: P(A∩B) = P(A) × P(B)' },
      { q: 'Nilai maksimal probabilitas adalah?', a: '1', opts: ['1', '0', '∞', '100'], exp: 'Probabilitas bernilai 0 ≤ P ≤ 1, maksimal = 1' }
    ];

    for (let i = 0; i < 10; i++) {
      const prob = problems[i];
      questions.push({
        id: i,
        question: prob.q,
        options: prob.opts,
        answer: prob.a,
        explanation: prob.exp,
        type: 'multiple-choice'
      });
    }
  }

  // Kelas 12 SMA - Advanced versions
  else if (levelId === 'limit-lanjut') {
    return generateSMAQuestions(11, 'limit'); // Reuse with harder variations
  } else if (levelId === 'turunan-lanjut') {
    return generateSMAQuestions(11, 'turunan');
  } else if (levelId === 'integral-lanjut') {
    return generateSMAQuestions(11, 'integral');
  } else if (levelId === 'statistika') {
    const problems = [
      { q: 'Mean dari data: 2, 4, 6, 8, 10 adalah?', a: '6', opts: ['6', '5', '7', '8'], exp: 'Mean = (2+4+6+8+10)/5 = 30/5 = 6' },
      { q: 'Median dari data: 3, 1, 5, 2, 4 adalah?', a: '3', opts: ['3', '2', '4', '5'], exp: 'Urutkan: 1,2,3,4,5 → median = nilai tengah = 3' },
      { q: 'Modus dari: 2, 3, 3, 4, 5, 3, 6 adalah?', a: '3', opts: ['3', '4', '2', '5'], exp: 'Modus = nilai yang paling sering muncul = 3 (muncul 3x)' },
      { q: 'Median dari: 1, 2, 3, 4 adalah?', a: '2.5', opts: ['2.5', '2', '3', '2.25'], exp: 'Data genap, median = (2+3)/2 = 2.5' },
      { q: 'Range dari: 5, 10, 15, 20 adalah?', a: '15', opts: ['15', '20', '5', '10'], exp: 'Range = max - min = 20 - 5 = 15' },
      { q: 'Mean dari: 10, 20, 30 adalah?', a: '20', opts: ['20', '10', '30', '15'], exp: 'Mean = (10+20+30)/3 = 60/3 = 20' },
      { q: 'Jika mean = 5 dari 4 data, total = ?', a: '20', opts: ['20', '5', '4', '9'], exp: 'Total = mean × banyak data = 5 × 4 = 20' },
      { q: 'Kuartil bawah (Q1) dari: 1,2,3,4,5,6,7 adalah?', a: '2', opts: ['2', '3', '4', '1'], exp: 'Q1 = median dari data bawah (1,2,3) = 2' },
      { q: 'Kuartil atas (Q3) dari: 1,2,3,4,5,6,7 adalah?', a: '6', opts: ['6', '5', '7', '4'], exp: 'Q3 = median dari data atas (5,6,7) = 6' },
      { q: 'Varians dari: 2, 4, 6 (mean=4) adalah?', a: '8/3', opts: ['8/3', '2', '4', '3'], exp: 'Var = [(2-4)²+(4-4)²+(6-4)²]/3 = [4+0+4]/3 = 8/3' }
    ];

    for (let i = 0; i < 10; i++) {
      const prob = problems[i];
      questions.push({
        id: i,
        question: prob.q,
        options: prob.opts,
        answer: prob.a,
        explanation: prob.exp,
        type: 'multiple-choice'
      });
    }
  }

  return questions;
}

// Helper functions
function generateOptions(correct: number, count: number): string[] {
  const options = new Set<number>();
  options.add(correct);
  
  while (options.size < count) {
    const offset = Math.floor(Math.random() * 20) - 10;
    const option = Math.max(0, correct + offset);
    if (option !== correct) {
      options.add(option);
    }
  }
  
  return Array.from(options).sort(() => Math.random() - 0.5).map(n => n.toString());
}

function findLCM(a: number, b: number): number {
  const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
  return (a * b) / gcd(a, b);
}

export function generateQuestionsByGrade(grade: number, levelId: string): GradeQuestion[] {
  if (grade <= 3) {
    return generateSD13Questions(grade, levelId);
  } else if (grade <= 6) {
    return generateSD46Questions(grade, levelId);
  } else if (grade === 7) {
    return generateSMP7Questions(grade, levelId);
  } else if (grade === 8) {
    return generateSMP8Questions(grade, levelId);
  } else if (grade === 9) {
    return generateSMP9Questions(grade, levelId);
  } else {
    return generateSMAQuestions(grade, levelId);
  }
}

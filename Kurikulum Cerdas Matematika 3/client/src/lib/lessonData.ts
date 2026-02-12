import { Lesson } from '../types/language';

export const lessons: Lesson[] = [
  // Animals
  {
    id: 'animal-1',
    title: 'Cat',
    category: 'animals',
    difficulty: 1,
    imageUrl: '🐱',
    word: 'Cat',
    translation: 'Kucing',
    completed: false
  },
  {
    id: 'animal-2',
    title: 'Dog',
    category: 'animals',
    difficulty: 1,
    imageUrl: '🐶',
    word: 'Dog',
    translation: 'Anjing',
    completed: false
  },
  {
    id: 'animal-3',
    title: 'Bird',
    category: 'animals',
    difficulty: 1,
    imageUrl: '🐦',
    word: 'Bird',
    translation: 'Burung',
    completed: false
  },
  {
    id: 'animal-4',
    title: 'Fish',
    category: 'animals',
    difficulty: 1,
    imageUrl: '🐟',
    word: 'Fish',
    translation: 'Ikan',
    completed: false
  },
  {
    id: 'animal-5',
    title: 'Elephant',
    category: 'animals',
    difficulty: 2,
    imageUrl: '🐘',
    word: 'Elephant',
    translation: 'Gajah',
    completed: false
  },
  {
    id: 'animal-6',
    title: 'Lion',
    category: 'animals',
    difficulty: 2,
    imageUrl: '🦁',
    word: 'Lion',
    translation: 'Singa',
    completed: false
  },
  
  // Colors
  {
    id: 'color-1',
    title: 'Red',
    category: 'colors',
    difficulty: 1,
    imageUrl: '🔴',
    word: 'Red',
    translation: 'Merah',
    completed: false
  },
  {
    id: 'color-2',
    title: 'Blue',
    category: 'colors',
    difficulty: 1,
    imageUrl: '🔵',
    word: 'Blue',
    translation: 'Biru',
    completed: false
  },
  {
    id: 'color-3',
    title: 'Yellow',
    category: 'colors',
    difficulty: 1,
    imageUrl: '🟡',
    word: 'Yellow',
    translation: 'Kuning',
    completed: false
  },
  {
    id: 'color-4',
    title: 'Green',
    category: 'colors',
    difficulty: 1,
    imageUrl: '🟢',
    word: 'Green',
    translation: 'Hijau',
    completed: false
  },
  
  // Fruits
  {
    id: 'fruit-1',
    title: 'Apple',
    category: 'fruits',
    difficulty: 1,
    imageUrl: '🍎',
    word: 'Apple',
    translation: 'Apel',
    completed: false
  },
  {
    id: 'fruit-2',
    title: 'Banana',
    category: 'fruits',
    difficulty: 1,
    imageUrl: '🍌',
    word: 'Banana',
    translation: 'Pisang',
    completed: false
  },
  {
    id: 'fruit-3',
    title: 'Orange',
    category: 'fruits',
    difficulty: 1,
    imageUrl: '🍊',
    word: 'Orange',
    translation: 'Jeruk',
    completed: false
  },
  {
    id: 'fruit-4',
    title: 'Watermelon',
    category: 'fruits',
    difficulty: 2,
    imageUrl: '🍉',
    word: 'Watermelon',
    translation: 'Semangka',
    completed: false
  },
  
  // Numbers
  {
    id: 'number-1',
    title: 'One',
    category: 'numbers',
    difficulty: 1,
    imageUrl: '1️⃣',
    word: 'One',
    translation: 'Satu',
    completed: false
  },
  {
    id: 'number-2',
    title: 'Two',
    category: 'numbers',
    difficulty: 1,
    imageUrl: '2️⃣',
    word: 'Two',
    translation: 'Dua',
    completed: false
  },
  {
    id: 'number-3',
    title: 'Three',
    category: 'numbers',
    difficulty: 1,
    imageUrl: '3️⃣',
    word: 'Three',
    translation: 'Tiga',
    completed: false
  },
  {
    id: 'number-4',
    title: 'Four',
    category: 'numbers',
    difficulty: 1,
    imageUrl: '4️⃣',
    word: 'Four',
    translation: 'Empat',
    completed: false
  },
  {
    id: 'number-5',
    title: 'Five',
    category: 'numbers',
    difficulty: 1,
    imageUrl: '5️⃣',
    word: 'Five',
    translation: 'Lima',
    completed: false
  }
];

export const categories = [
  { id: 'animals', name: 'Animals', icon: '🐾', color: '#FFB6C1' },
  { id: 'colors', name: 'Colors', icon: '🎨', color: '#87CEEB' },
  { id: 'fruits', name: 'Fruits', icon: '🍎', color: '#98FB98' },
  { id: 'numbers', name: 'Numbers', icon: '🔢', color: '#DDA0DD' }
];

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  grade: number;
  learningLanguage: 'english' | 'indonesian';
  nativeLanguage: 'english' | 'indonesian';
  avatar?: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: string;
  difficulty: 1 | 2 | 3;
  imageUrl: string;
  audioUrl?: string;
  word: string;
  translation: string;
  completed: boolean;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score: number;
  attemptsCount: number;
  lastAttemptDate: string;
}

export interface Reward {
  id: string;
  type: 'badge' | 'trophy' | 'star';
  name: string;
  description: string;
  imageUrl: string;
  earnedDate?: string;
}

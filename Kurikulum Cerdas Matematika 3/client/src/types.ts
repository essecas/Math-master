export interface User {
  id: number;
  username: string;
}

export interface UserStats {
  id: number;
  user_id: number;
  current_grade: number;
  current_level: number;
  total_correct: number;
  total_questions: number;
  streak_days: number;
  last_activity_date: string | null;
  badges: string | null;
}

export interface Question {
  id: number;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  type: 'multiple-choice' | 'fill-in';
}

export interface LocalProgress {
  current_grade: number;
  current_level: number;
  total_correct: number;
  total_questions: number;
  streak_days: number;
  last_activity_date: string | null;
  badges: string[];
}

export interface WeeklyReport {
  totalAttempts: number;
  totalCorrect: number;
  totalQuestions: number;
  passed: number;
  accuracy: number;
}

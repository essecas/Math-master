import { LocalProgress } from '../types';

const STORAGE_KEY = 'mathapp_progress';
const USER_KEY = 'mathapp_user';

export function saveLocalProgress(progress: LocalProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getLocalProgress(): LocalProgress | null {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveUser(user: { id: number; username: string }): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): { id: number; username: string } | null {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearUser(): void {
  localStorage.removeItem(USER_KEY);
}

export function getInitialProgress(): LocalProgress {
  return {
    current_grade: 1,
    current_level: 1,
    total_correct: 0,
    total_questions: 0,
    streak_days: 0,
    last_activity_date: null,
    badges: []
  };
}

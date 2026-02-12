import { Kysely, SqliteDialect } from 'kysely';
import Database from 'better-sqlite3';
import path from 'path';

export interface DatabaseSchema {
  users: {
    id: number;
    username: string;
    password_hash: string;
    created_at: number;
  };
  progress: {
    id: number;
    user_id: number;
    grade: number;
    level: number;
    score: number;
    total_questions: number;
    passed: number;
    completed_at: number;
  };
  user_stats: {
    id: number;
    user_id: number;
    current_grade: number;
    current_level: number;
    total_correct: number;
    total_questions: number;
    streak_days: number;
    last_activity_date: string | null;
    badges: string | null;
  };
  operation_progress: {
    id: number;
    user_id: number;
    grade: number;
    operation: string;
    completed: number;
    score: number;
    last_completed: number | null;
  };
  bahasa_questions: {
    id: number;
    grade: number;
    question: string;
    type: string;
    options: string;
    correct_answer: string;
    explanation: string;
    created_at: number;
  };
}

const dataDirectory = process.env.DATA_DIRECTORY || path.join(process.cwd(), 'data');
const dbPath = path.join(dataDirectory, 'database.sqlite');

const sqliteDb = new Database(dbPath);
sqliteDb.pragma('journal_mode = DELETE');

export const db = new Kysely<DatabaseSchema>({
  dialect: new SqliteDialect({ database: sqliteDb }),
  log: ['query', 'error']
});

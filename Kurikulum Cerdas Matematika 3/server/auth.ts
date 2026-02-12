import bcrypt from 'bcryptjs';
import { db } from './db.js';

export async function registerUser(username: string, password: string) {
  console.log('Registering user:', username);
  
  // Validate inputs
  if (!username || username.trim().length === 0) {
    throw new Error('Username diperlukan');
  }
  if (!password || password.length < 6) {
    throw new Error('Password minimal 6 karakter');
  }
  
  const passwordHash = await bcrypt.hash(password, 10);
  console.log('Password hashed');
  
  try {
    // Check if user already exists
    const existingUser = await db.selectFrom('users')
      .select('id')
      .where('username', '=', username)
      .executeTakeFirst();

    if (existingUser) {
      console.log('User already exists:', username);
      throw new Error('Username sudah terdaftar');
    }

    // Insert user and get the inserted ID
    const insertResult = await db.insertInto('users')
      .values({
        username,
        password_hash: passwordHash,
        created_at: Date.now()
      })
      .execute();

    console.log('User inserted, result:', insertResult);

    // Get the newly created user to retrieve the ID
    const newUser = await db.selectFrom('users')
      .select('id')
      .where('username', '=', username)
      .executeTakeFirst();

    console.log('New user retrieved:', newUser);

    if (newUser) {
      await db.insertInto('user_stats')
        .values({
          user_id: newUser.id,
          current_grade: 1,
          current_level: 1,
          total_correct: 0,
          total_questions: 0,
          streak_days: 0,
          last_activity_date: null,
          badges: null
        })
        .execute();
      console.log('User stats created for user:', newUser.id);
    }

    return newUser;
  } catch (error) {
    console.error('Registration error:', error);
    if ((error as Error).message.includes('already exists')) {
      throw error;
    }
    throw new Error('Registration failed');
  }
}

export async function loginUser(username: string, password: string) {
  const user = await db.selectFrom('users')
    .selectAll()
    .where('username', '=', username)
    .executeTakeFirst();

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw new Error('Invalid credentials');
  }

  return {
    id: user.id,
    username: user.username
  };
}

export async function getUserStats(userId: number) {
  const stats = await db.selectFrom('user_stats')
    .selectAll()
    .where('user_id', '=', userId)
    .executeTakeFirst();

  return stats;
}

export async function updateUserStats(userId: number, updates: Partial<{
  current_grade: number;
  current_level: number;
  total_correct: number;
  total_questions: number;
  streak_days: number;
  last_activity_date: string;
  badges: string;
}>) {
  await db.updateTable('user_stats')
    .set(updates)
    .where('user_id', '=', userId)
    .execute();
}

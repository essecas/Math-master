import { db } from './db.js';

export async function saveProgress(userId: number, data: {
  grade: number;
  level: number;
  score: number;
  totalQuestions: number;
  passed: boolean;
}) {
  await db.insertInto('progress')
    .values({
      user_id: userId,
      grade: data.grade,
      level: data.level,
      score: data.score,
      total_questions: data.totalQuestions,
      passed: data.passed ? 1 : 0,
      completed_at: Date.now()
    })
    .execute();
}

export async function getProgressHistory(userId: number) {
  const history = await db.selectFrom('progress')
    .selectAll()
    .where('user_id', '=', userId)
    .orderBy('completed_at', 'desc')
    .limit(50)
    .execute();

  return history;
}

export async function getLevelCompletionStatus(userId: number) {
  const completions = await db.selectFrom('progress')
    .select(['grade', 'level', 'score', 'total_questions', 'passed'])
    .where('user_id', '=', userId)
    .where('passed', '=', 1)
    .execute();

  // Group by grade and level to get best scores
  const statusMap: Record<string, { score: number; total: number; percentage: number }> = {};
  
  for (const completion of completions) {
    const key = `${completion.grade}-${completion.level}`;
    const percentage = Math.round((completion.score / completion.total_questions) * 100);
    
    if (!statusMap[key] || percentage > statusMap[key].percentage) {
      statusMap[key] = {
        score: completion.score,
        total: completion.total_questions,
        percentage
      };
    }
  }
  
  return statusMap;
}

export async function getWeeklyReport(userId: number) {
   const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
   
   const weekProgress = await db.selectFrom('progress')
     .selectAll()
     .where('user_id', '=', userId)
     .where('completed_at', '>=', weekAgo)
     .execute();

   const totalAttempts = weekProgress.length;
   const totalCorrect = weekProgress.reduce((sum, p) => sum + p.score, 0);
   const totalQuestions = weekProgress.reduce((sum, p) => sum + p.total_questions, 0);
   const passed = weekProgress.filter(p => p.passed === 1).length;

   return {
     totalAttempts,
     totalCorrect,
     totalQuestions,
     passed,
     accuracy: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
   };
}

export async function saveOperationProgress(userId: number, operation: string, score: number, grade: number = 1) {
  console.log(`Saving operation progress: userId=${userId}, grade=${grade}, operation=${operation}, score=${score}`);
  
  try {
    const existing = await db.selectFrom('operation_progress')
      .selectAll()
      .where('user_id', '=', userId)
      .where('grade', '=', grade)
      .where('operation', '=', operation)
      .executeTakeFirst();

    if (existing) {
      // Update existing record
      await db.updateTable('operation_progress')
        .set({
          score,
          completed: 1,
          last_completed: Date.now()
        })
        .where('user_id', '=', userId)
        .where('grade', '=', grade)
        .where('operation', '=', operation)
        .execute();
      console.log(`Updated operation progress for grade ${grade}, ${operation}`);
    } else {
      // Insert new record
      await db.insertInto('operation_progress')
        .values({
          user_id: userId,
          grade,
          operation,
          score,
          completed: 1,
          last_completed: Date.now()
        })
        .execute();
      console.log(`Inserted new operation progress for grade ${grade}, ${operation}`);
    }
  } catch (error) {
    console.error(`Error saving operation progress:`, error);
    throw error;
  }
}

export async function getOperationProgress(userId: number, grade?: number) {
  console.log(`Getting operation progress for userId=${userId}, grade=${grade}`);
  
  let query = db.selectFrom('operation_progress')
    .selectAll()
    .where('user_id', '=', userId);

  if (grade !== undefined) {
    query = query.where('grade', '=', grade);
  }

  const progress = await query.execute();

  return progress;
}

export async function getOperationProgressByOperation(userId: number, operation: string, grade: number = 1) {
  const progress = await db.selectFrom('operation_progress')
    .selectAll()
    .where('user_id', '=', userId)
    .where('grade', '=', grade)
    .where('operation', '=', operation)
    .executeTakeFirst();

  return progress || null;
}

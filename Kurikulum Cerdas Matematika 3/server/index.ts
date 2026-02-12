import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import { setupStaticServing } from './static-serve.js';
import { registerUser, loginUser, getUserStats, updateUserStats } from './auth.js';
import { saveProgress, getProgressHistory, getWeeklyReport, getLevelCompletionStatus, saveOperationProgress, getOperationProgress, getOperationProgressByOperation } from './progress.js';

dotenv.config();

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'math-game-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}));

// Extend session type
declare module 'express-session' {
  interface SessionData {
    userId: number;
    username: string;
  }
}

// Auth endpoints
app.post('/api/auth/register', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    console.log('Register request:', { username: req.body.username });
    const { username, password } = req.body;
    if (!username || !password) {
      console.log('Missing credentials');
      res.status(400).json({ error: 'Username and password required' });
      return;
    }
    const user = await registerUser(username, password);
    console.log('User registered successfully:', user?.id);
    
    // Set session immediately after registration
    if (user) {
      req.session.userId = user.id;
      req.session.username = username;
      res.json({ success: true, user: { id: user.id, username } });
    } else {
      throw new Error('Failed to create user');
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(400).json({ error: (error as Error).message });
  }
});

app.post('/api/auth/login', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    console.log('Login request:', { username: req.body.username });
    const { username, password } = req.body;
    if (!username || !password) {
      console.log('Missing credentials');
      res.status(400).json({ error: 'Username and password required' });
      return;
    }
    const user = await loginUser(username, password);
    console.log('User authenticated:', user);
    
    // Set session
    req.session.userId = user.id;
    req.session.username = user.username;
    
    console.log('Session set:', { userId: req.session.userId, username: req.session.username });
    res.json({ success: true, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: (error as Error).message });
  }
});

app.get('/api/auth/me', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    if (!req.session.userId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }
    
    res.json({ 
      user: { 
        id: req.session.userId, 
        username: req.session.username 
      } 
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

app.post('/api/auth/logout', async (req: express.Request, res: express.Response): Promise<void> => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to logout' });
      return;
    }
    res.json({ success: true });
  });
});

// Stats endpoints
app.get('/api/stats/:userId', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const stats = await getUserStats(userId);
    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

app.put('/api/stats/:userId', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    await updateUserStats(userId, req.body);
    res.json({ success: true });
  } catch (error) {
    console.error('Update stats error:', error);
    res.status(500).json({ error: 'Failed to update stats' });
  }
});

// Progress endpoints
app.post('/api/progress', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { userId, grade, level, score, totalQuestions, passed } = req.body;
    await saveProgress(userId, { grade, level, score, totalQuestions, passed });
    res.json({ success: true });
  } catch (error) {
    console.error('Save progress error:', error);
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

app.get('/api/progress/:userId', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const stats = await getUserStats(userId);
    res.json(stats);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Failed to get progress' });
  }
});

app.get('/api/report/:userId', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const report = await getWeeklyReport(userId);
    res.json(report);
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({ error: 'Failed to get report' });
  }
});

app.get('/api/level-completions/:userId', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const completions = await getLevelCompletionStatus(userId);
    res.json(completions);
  } catch (error) {
    console.error('Get level completions error:', error);
    res.status(500).json({ error: 'Failed to get level completions' });
  }
});

// Operation Progress endpoints
app.post('/api/operation-progress', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { userId, operation, score } = req.body;
    if (!userId || !operation || score === undefined) {
      res.status(400).json({ error: 'Missing required fields: userId, operation, score' });
      return;
    }
    await saveOperationProgress(userId, operation, score);
    res.json({ success: true });
  } catch (error) {
    console.error('Save operation progress error:', error);
    res.status(500).json({ error: 'Failed to save operation progress' });
  }
});

app.get('/api/operation-progress/:userId', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const progress = await getOperationProgress(userId);
    res.json(progress);
  } catch (error) {
    console.error('Get operation progress error:', error);
    res.status(500).json({ error: 'Failed to get operation progress' });
  }
});

app.get('/api/operation-progress/:userId/:operation', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const operation = req.params.operation;
    const progress = await getOperationProgressByOperation(userId, operation);
    res.json(progress || { completed: false, score: 0 });
  } catch (error) {
    console.error('Get operation progress by operation error:', error);
    res.status(500).json({ error: 'Failed to get operation progress' });
  }
});

// Authenticated Progress endpoints
app.get('/api/progress', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    if (!req.session.userId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }
    
    const grade = req.query.grade ? parseInt(req.query.grade as string) : undefined;
    const progress = await getOperationProgress(req.session.userId, grade);
    
    // Transform to frontend format
    const progressData = progress.map(p => ({
      grade: p.grade,
      level: p.operation,
      completed: p.completed === 1,
      score: p.score,
      lastCompleted: p.last_completed ? new Date(p.last_completed).toISOString() : undefined
    }));
    
    res.json(progressData);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Failed to get progress' });
  }
});

app.post('/api/progress/complete', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    if (!req.session.userId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }
    
    const { level, score, grade = 1 } = req.body;
    if (!level || score === undefined) {
      res.status(400).json({ error: 'Missing required fields: level, score' });
      return;
    }
    
    console.log(`Completing level for user ${req.session.userId}: grade=${grade}, level=${level}, score=${score}`);
    
    await saveOperationProgress(req.session.userId, level, score, grade);
    
    // Fetch updated progress for this grade
    const progress = await getOperationProgress(req.session.userId, grade);
    const progressData = progress.map(p => ({
      grade: p.grade,
      level: p.operation,
      completed: p.completed === 1,
      score: p.score,
      lastCompleted: p.last_completed ? new Date(p.last_completed).toISOString() : undefined
    }));
    
    res.json({ success: true, progress: progressData });
  } catch (error) {
    console.error('Save progress error:', error);
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

// Health check endpoint
app.get('/api/health', (req: express.Request, res: express.Response) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Export a function to start the server
export async function startServer(port: number): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      if (process.env.NODE_ENV === 'production') {
        setupStaticServing(app);
      }
      const server = app.listen(port, () => {
        console.log(`API Server running on port ${port}`);
        console.log('Registered routes:');
        console.log('  POST /api/auth/register');
        console.log('  POST /api/auth/login');
        console.log('  GET  /api/auth/me');
        console.log('  POST /api/auth/logout');
        console.log('  GET  /api/stats/:userId');
        console.log('  PUT  /api/stats/:userId');
        console.log('  POST /api/progress');
        console.log('  GET  /api/progress/:userId');
        console.log('  GET  /api/progress (authenticated)');
        console.log('  POST /api/progress/complete (authenticated)');
        console.log('  GET  /api/report/:userId');
        console.log('  GET  /api/level-completions/:userId');
        console.log('  GET  /api/health');
        resolve();
      });
      
      server.on('error', (err) => {
        console.error('Failed to start server:', err);
        reject(err);
      });
    } catch (err) {
      console.error('Failed to start server:', err);
      reject(err);
    }
  });
}

// Start the server directly if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Starting server...');
  const port = Number(process.env.PORT) || 3001;
  startServer(port).catch((err) => {
    console.error('Server startup failed:', err);
    process.exit(1);
  });
}

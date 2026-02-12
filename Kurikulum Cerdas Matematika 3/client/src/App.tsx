import * as React from 'react';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { GradeSelectPage } from './pages/GradeSelectPage';
import { GradeHomePage } from './pages/GradeHomePage';
import { QuizPage } from './pages/QuizPage';
import { ResultPage } from './pages/ResultPage';
import { ReportPage } from './pages/ReportPage';
import { LangHomePage } from './pages/LangHomePage';
import { LessonsPage } from './pages/LessonsPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { RewardsPage } from './pages/RewardsPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { BahasaQuizPage } from './pages/BahasaQuizPage';
import { MatematikaLearnPage } from './pages/MatematikaLearnPage';
import { BahasaLearnPage } from './pages/BahasaLearnPage';
import { OperationLearnPage } from './pages/OperationLearnPage';
import { GradeLearnPage } from './pages/GradeLearnPage';
import { GradeQuizPage } from './pages/GradeQuizPage';
import { User, UserStats } from './types';
import { ChildProfile, Lesson } from './types/language';

type Screen = 'login' | 'home' | 'grade-select' | 'grade-home' | 'grade-learn' | 'grade-quiz' | 'quiz' | 'result' | 'report' | 'bahasa-quiz' | 'bahasa-learn' | 'matematika-learn' | 'operation-learn' | 'lang-onboarding' | 'lang-home' | 'lang-lessons' | 'lang-lesson-detail' | 'lang-rewards';

function App() {
  const [screen, setScreen] = React.useState<Screen>('login');
  const [user, setUser] = React.useState<User | null>(null);
  const [stats, setStats] = React.useState<UserStats>({
    id: 0,
    user_id: 0,
    current_grade: 1,
    current_level: 1,
    streak_days: 0,
    total_correct: 0,
    total_questions: 0,
    last_activity_date: null,
    badges: null
  });
  const [selectedGrade, setSelectedGrade] = React.useState(1);
  const [selectedLevel, setSelectedLevel] = React.useState(1);
  const [selectedLevelId, setSelectedLevelId] = React.useState('penjumlahan');
  const [quizScore, setQuizScore] = React.useState({ correct: 0, total: 0, passed: false });

  const [langProfile, setLangProfile] = React.useState<ChildProfile | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string | undefined>();
  const [selectedLesson, setSelectedLesson] = React.useState<Lesson | null>(null);

  React.useEffect(() => {
    async function loadUserData() {
      try {
        const response = await fetch('/api/auth/me');
        console.log('Auth check response:', response.status);
        if (response.ok) {
          const data = await response.json();
          console.log('User loaded:', data.user);
          setUser(data.user);
          loadStats(data.user.id);
          
          // Auto-fetch progress if token exists
          const token = localStorage.getItem('token');
          if (token) {
            try {
              const progressResponse = await fetch('/api/progress', {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              if (progressResponse.ok) {
                const progressData = await progressResponse.json();
                console.log('Progress auto-loaded:', progressData);
              }
            } catch (progressErr) {
              console.error('Failed to auto-load progress:', progressErr);
            }
          }
          
          setScreen('home');
        } else {
          console.log('No active session, showing login');
        }
      } catch (err) {
        console.error('Failed to load user:', err);
      }
    }

    loadUserData();
  }, []);

  async function loadStats(userId: number) {
    try {
      const response = await fetch(`/api/progress/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  }

  function handleLogin(loggedInUser: User) {
    console.log('User logged in:', loggedInUser);
    setUser(loggedInUser);
    loadStats(loggedInUser.id);
    setScreen('home');
  }

  function handleGuestMode() {
    setUser(null);
    setScreen('home');
  }

  function handleSelectLevel(grade: number, level: number) {
    setSelectedGrade(grade);
    setSelectedLevel(level);
    setScreen('matematika-learn');
  }

  function handleSelectGrade(grade: number) {
    setSelectedGrade(grade);
    setScreen('grade-home');
  }

  function handleSelectLevelById(levelId: string) {
    setSelectedLevelId(levelId);
    setScreen('grade-learn');
  }

  function handleSelectBahasaQuiz(grade: number) {
    setSelectedGrade(grade);
    setScreen('bahasa-learn');
  }

  function handleQuizComplete(correct: number, total: number, passed: boolean) {
    setQuizScore({ correct, total, passed });
    setScreen('result');
  }

  function handleViewReport() {
    setScreen('report');
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    }
    
    setUser(null);
    setStats({
      id: 0,
      user_id: 0,
      current_grade: 1,
      current_level: 1,
      streak_days: 0,
      total_correct: 0,
      total_questions: 0,
      last_activity_date: null,
      badges: null
    });
    setScreen('login');
  }

  function handleLangOnboardingComplete(newProfile: ChildProfile) {
    setLangProfile(newProfile);
    localStorage.setItem('childProfile', JSON.stringify(newProfile));
    setScreen('lang-home');
  }

  function handleSelectCategory(categoryId: string) {
    setSelectedCategory(categoryId);
    setScreen('lang-lessons');
  }

  function handleSelectLesson(lesson: Lesson) {
    setSelectedLesson(lesson);
    setScreen('lang-lesson-detail');
  }

  function handleLessonComplete() {
    setScreen('lang-lessons');
  }

  function handleNavigateToLangLessons() {
    setSelectedCategory(undefined);
    setScreen('lang-lessons');
  }

  function handleNavigateToLangRewards() {
    setScreen('lang-rewards');
  }

  if (screen === 'login') {
    return <LoginPage onLogin={handleLogin} onGuestMode={handleGuestMode} />;
  }

  if (screen === 'home') {
    return (
      <HomePage
        user={user}
        stats={stats}
        onSelectLevel={handleSelectLevel}
        onSelectBahasa={handleSelectBahasaQuiz}
        onViewReport={handleViewReport}
        onLogout={handleLogout}
        onNavigateToGradeSelect={() => setScreen('grade-select')}
        onNavigateToLanguage={() => {
          const savedProfile = localStorage.getItem('childProfile');
          if (savedProfile) {
            setLangProfile(JSON.parse(savedProfile));
            setScreen('lang-home');
          } else {
            setScreen('lang-onboarding');
          }
        }}
      />
    );
  }

  if (screen === 'grade-select') {
    return (
      <GradeSelectPage
        onSelectGrade={handleSelectGrade}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'grade-home') {
    return (
      <GradeHomePage
        user={user}
        stats={stats}
        selectedGrade={selectedGrade}
        onSelectLevel={handleSelectLevelById}
        onBack={() => setScreen('grade-select')}
        onLogout={handleLogout}
      />
    );
  }

  if (screen === 'matematika-learn') {
    return (
      <MatematikaLearnPage
        grade={selectedGrade}
        level={selectedLevel}
        onStartQuiz={() => setScreen('operation-learn')}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'operation-learn') {
    return (
      <OperationLearnPage
        grade={selectedGrade}
        level={selectedLevel}
        onStartQuiz={() => setScreen('quiz')}
        onBack={() => setScreen('matematika-learn')}
      />
    );
  }

  if (screen === 'grade-learn') {
    return (
      <GradeLearnPage
        grade={selectedGrade}
        levelId={selectedLevelId}
        onStartQuiz={() => setScreen('grade-quiz')}
        onBack={() => setScreen('grade-home')}
      />
    );
  }

  if (screen === 'grade-quiz') {
    return (
      <GradeQuizPage
        grade={selectedGrade}
        levelId={selectedLevelId}
        onComplete={handleQuizComplete}
        onBack={() => setScreen('grade-learn')}
        userId={user?.id}
      />
    );
  }

  if (screen === 'bahasa-learn') {
    return (
      <BahasaLearnPage
        grade={selectedGrade}
        onStartQuiz={() => setScreen('bahasa-quiz')}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'quiz') {
    return (
      <QuizPage
        grade={selectedGrade}
        level={selectedLevel}
        onComplete={handleQuizComplete}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'bahasa-quiz') {
    return (
      <BahasaQuizPage
        grade={selectedGrade}
        onComplete={handleQuizComplete}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'result') {
    return (
      <ResultPage
        grade={selectedGrade}
        level={selectedLevel}
        score={quizScore.correct}
        total={quizScore.total}
        passed={quizScore.passed}
        userId={user?.id}
        onRetry={() => setScreen(selectedLevelId ? 'grade-quiz' : 'quiz')}
        onNextLevel={() => {
          setSelectedLevel(selectedLevel + 1);
          setScreen(selectedLevelId ? 'grade-quiz' : 'quiz');
        }}
        onHome={() => {
          if (user) {
            loadStats(user.id);
          }
          setScreen(selectedGrade >= 1 ? 'grade-home' : 'home');
        }}
      />
    );
  }

  if (screen === 'report') {
    return (
      <ReportPage
        userId={user?.id || 0}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'lang-onboarding') {
    return <OnboardingPage onComplete={handleLangOnboardingComplete} />;
  }

  if (screen === 'lang-home' && langProfile) {
    return (
      <LangHomePage
        profile={langProfile}
        onSelectCategory={handleSelectCategory}
        onNavigate={(page) => {
          if (page === 'lessons') handleNavigateToLangLessons();
          else if (page === 'rewards') handleNavigateToLangRewards();
          else if (page === 'math') setScreen('home');
        }}
      />
    );
  }

  if (screen === 'lang-lessons') {
    return (
      <LessonsPage
        categoryId={selectedCategory}
        onSelectLesson={handleSelectLesson}
        onBack={() => setScreen(langProfile ? 'lang-home' : 'lang-onboarding')}
      />
    );
  }

  if (screen === 'lang-lesson-detail' && selectedLesson) {
    return (
      <LessonDetailPage
        lesson={selectedLesson}
        onComplete={handleLessonComplete}
        onBack={() => setScreen('lang-lessons')}
      />
    );
  }

  if (screen === 'lang-rewards') {
    return <RewardsPage onBack={() => setScreen(langProfile ? 'lang-home' : 'lang-onboarding')} />;
  }
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import komponen Dashboard atau Home kamu (sesuaikan path kalau beda)
import Dashboard from './pages/Dashboard';  // ganti kalau nama file/path berbeda

function App() {
  return (
    <Router>
      <Routes>
        {/* Route untuk root path (/) - tampilkan Dashboard atau halaman utama */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Route lain yang sudah ada (tambahkan kalau perlu) */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/quiz" element={<Quiz />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        
        {/* Optional: Route fallback kalau path tidak ditemukan */}
        <Route path="*" element={<div>Halaman tidak ditemukan (404)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
  return null;
}

export default App;

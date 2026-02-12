import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Sesuaikan import ini dengan nama file/page kamu yang sebenarnya
// Contoh: kalau dashboard ada di src/pages/Dashboard.tsx
import Dashboard from './pages/Dashboard'; // <-- ganti kalau path beda

// Kalau ada page lain, import juga
// import Login from './pages/Login';
// import Quiz from './pages/Quiz';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route utama untuk root / */}
        <Route path="/" element={<Dashboard />} />

        {/* Route lain yang sudah ada di project kamu */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/quiz" element={<Quiz />} /> */}

        {/* Fallback kalau path tidak ada */}
        <Route path="*" element={<div>Halaman tidak ditemukan (404)</div>} />
      </Routes>
    </Router>
  );
}

export default App;

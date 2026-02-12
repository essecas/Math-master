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

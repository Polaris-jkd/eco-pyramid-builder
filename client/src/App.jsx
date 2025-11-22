import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Builder from './pages/Builder';
import './styles/global.css';

export default function App() {
  return (
    <Router>
      <div className="app-shell" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-canvas)'
      }}>
        <Navbar />
        <main className="app-main" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minHeight: 0,
          overflow: 'hidden'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

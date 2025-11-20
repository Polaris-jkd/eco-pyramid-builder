import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme.jsx';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          🌿 Eco Pyramid Builder
        </Link>
        <div className="nav-right">
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/builder" className="nav-link">Builder</Link>
          </div>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}

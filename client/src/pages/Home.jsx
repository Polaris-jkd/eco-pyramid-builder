import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: '60px',
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      background: 'var(--bg-canvas)'
    }}>
      <div className="main-content" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: '2rem 2rem 0 2rem',
        overflow: 'auto'
      }}>
        {/* Hero Section */}
        <div className="hero" style={{
          textAlign: 'center',
          padding: '3rem 2rem 2rem 2rem'
        }}>
          <h1 className="hero-title" style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: 'var(--accent-green)'
          }}>
            Ecological Pyramid Builder & Analyzer
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem'
          }}>
            Build interactive ecological pyramids with AI-powered predictions
          </p>
          <Link 
            to="/builder" 
            className="cta-button"
            style={{
              display: 'inline-block',
              background: 'var(--accent-green)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'all var(--transition)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            Start Building →
          </Link>
        </div>

        {/* Features Grid */}
        <div className="features" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          margin: '2rem 0',
          width: '100%'
        }}>
          <div className="feature-card" style={{
            background: 'var(--bg-white)',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-light)',
            transition: 'all var(--transition)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
              color: 'var(--text-primary)'
            }}>
              🎯 Interactive Builder
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}>
              Drag and drop species to create pyramids
            </p>
          </div>

          <div className="feature-card" style={{
            background: 'var(--bg-white)',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-light)',
            transition: 'all var(--transition)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
              color: 'var(--text-primary)'
            }}>
              🤖 AI Predictions
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}>
              ML-powered biomass estimation
            </p>
          </div>

          <div className="feature-card" style={{
            background: 'var(--bg-white)',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-light)',
            transition: 'all var(--transition)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
              color: 'var(--text-primary)'
            }}>
              📊 Visualizations
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}>
              Energy, biomass, and number pyramids
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="app-footer" style={{
          width: '100%',
          background: '#1c1c1c',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          alignItems: 'center',
          padding: '1.5rem 2rem',
          fontSize: '1rem',
          fontWeight: 500,
          borderTop: '2px solid #24e073',
          marginTop: '2rem',
          flexShrink: 0
        }}>
          <span className="footer-item" style={{
            color: '#fff',
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}>
            Dhruv Saini
          </span>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-item"
            style={{
              color: '#fff',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
          >
            GitHub
          </a>
          <span className="footer-item" style={{
            color: '#fff',
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}>
            dhruvtias25@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
}

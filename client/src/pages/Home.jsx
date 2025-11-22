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
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'auto'
      }}>
        {/* Content Wrapper */}
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: '2rem 2rem 0 2rem'
        }}>
          {/* Hero Section */}
          <div className="hero" style={{
            textAlign: 'center',
            padding: '3rem 2rem 2rem 2rem'
          }}>
            <h1 style={{
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            margin: '2rem 0 3rem 0',
            width: '100%'
          }}>
            <div style={{
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

            <div style={{
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

            <div style={{
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
        </div>

        {/* Footer - FULL WIDTH, THEME AWARE */}
        <div style={{
          width: '100%',
          background: 'var(--color-surface)',
          borderTop: '2px solid var(--accent-green)',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          alignItems: 'center',
          fontSize: '1rem',
          fontWeight: 500,
          flexShrink: 0
        }}>
          <span style={{
            color: 'var(--text-primary)',
            cursor: 'default'
          }}>
            Dhruv Saini
          </span>
          <a 
            href="https://github.com/Polaris-jkd" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: 'var(--text-primary)',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--accent-teal)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
          >
            GitHub
          </a>
          <span style={{
            color: 'var(--text-primary)',
            cursor: 'default'
          }}>
            dhruvtias25@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
}

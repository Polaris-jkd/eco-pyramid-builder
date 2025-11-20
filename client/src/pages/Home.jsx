import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="main-content">
      <div className="hero">
        <h1>Ecological Pyramid Builder & Analyzer</h1>
        <p>Build interactive ecological pyramids with AI-powered predictions</p>
        <Link to="/builder" className="cta-button">Start Building →</Link>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>🎯 Interactive Builder</h3>
          <p>Drag and drop species to create pyramids</p>
        </div>

        <div className="feature-card">
          <h3>🤖 AI Predictions</h3>
          <p>ML-powered biomass estimation</p>
        </div>

        <div className="feature-card">
          <h3>📊 Visualizations</h3>
          <p>Energy, biomass, and number pyramids</p>
        </div>
      </div>
    </main>
  );
}

import React, { useState } from 'react';
import '../styles/CascadeModal.css';

export default function CascadeAnalyzer({ species }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [cascadeResult, setCascadeResult] = useState(null);

  const calculateCascadeEffect = (targetSpecies) => {
    const directPredators = species.filter(
      (s) =>
        s.trophicLevel === 'secondary_consumer' &&
        targetSpecies.trophicLevel === 'primary_consumer'
    ).concat(
      species.filter(
        (s) =>
          s.trophicLevel === 'tertiary_consumer' &&
          targetSpecies.trophicLevel === 'secondary_consumer'
      )
    );

    const indirectlyAffected = species.filter(
      (s) =>
        s !== targetSpecies &&
        !directPredators.includes(s) &&
        s.trophicLevel !== targetSpecies.trophicLevel
    );

    const winners = species.filter(
      (s) =>
        s.trophicLevel < targetSpecies.trophicLevel &&
        s !== targetSpecies
    );

    const totalBiomass = species.reduce((sum, s) => sum + (s.biomass || 0), 0);
    const targetBiomass = targetSpecies.biomass || 0;
    const biomassProportion = (targetBiomass / totalBiomass) * 100;
    const healthImpact = Math.round(biomassProportion * 0.8);

    const ecosystemHealthScore = Math.max(0, 100 - healthImpact);

    let severityColor = '#22c55e';
    if (ecosystemHealthScore < 40) severityColor = '#ef4444';
    else if (ecosystemHealthScore < 70) severityColor = '#f59e0b';

    return {
      targetSpecies: targetSpecies.name,
      directPredators,
      indirectlyAffected,
      winners,
      healthImpact,
      ecosystemHealthScore,
      severityColor,
      affectedCount: species.length - 1
    };
  };

  const handleAnalyze = (spec) => {
    const result = calculateCascadeEffect(spec);
    setCascadeResult(result);
    setSelectedSpecies(spec);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedSpecies(null);
    setCascadeResult(null);
  };

  return (
    <>
      {/* Fixed Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="cascade-toggle-btn"
        title="Open Cascade Analyzer"
      >
        🌀 Cascade Effects
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="cascade-overlay" onClick={closeModal}>
          <div
            className="cascade-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cascade-header">
              <h3>🌀 Cascade Effects Analyzer</h3>
              <button className="cascade-close-btn" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="cascade-body">
              {!cascadeResult ? (
                <>
                  <p className="cascade-instruction">
                    Click a species below to analyze what happens if it's removed:
                  </p>
                  <div className="species-selector-grid">
                    {species.map((spec) => (
                      <button
                        key={spec._id || spec.name}
                        className="species-selector-btn"
                        onClick={() => handleAnalyze(spec)}
                      >
                        <span className="selector-icon">{spec.icon}</span>
                        <span className="selector-name">{spec.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Results Header */}
                  <div className="cascade-results-header">
                    <div
                      className="species-removed-badge"
                      style={{
                        background: cascadeResult.severityColor + '30'
                      }}
                    >
                      <span className="icon">❌</span>
                      <span className="text">{cascadeResult.targetSpecies} REMOVED</span>
                    </div>
                  </div>

                  {/* Health Score */}
                  <div className="health-score-section">
                    <h4>📊 Ecosystem Health Score</h4>
                    <div className="health-score-display">
                      <div
                        className="health-circle"
                        style={{
                          background: cascadeResult.severityColor
                        }}
                      >
                        {cascadeResult.ecosystemHealthScore}%
                      </div>
                      <div className="health-text">
                        <p className="health-status">
                          {cascadeResult.ecosystemHealthScore > 70
                            ? '🟢 Stable'
                            : cascadeResult.ecosystemHealthScore > 40
                            ? '🟡 Unstable'
                            : '🔴 Critical'}
                        </p>
                        <p className="health-affected">
                          {cascadeResult.affectedCount} species affected
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Direct Predators */}
                  {cascadeResult.directPredators.length > 0 && (
                    <div className="cascade-category">
                      <h4 style={{ color: '#ef4444' }}>
                        🔴 CRITICAL: Direct Predators (Loss 60-80%)
                      </h4>
                      <div className="species-impact-list">
                        {cascadeResult.directPredators.map((spec) => (
                          <div key={spec._id || spec.name} className="impact-item critical">
                            <span className="impact-icon">{spec.icon}</span>
                            <span className="impact-name">{spec.name}</span>
                            <span className="impact-loss">hunts {cascadeResult.targetSpecies}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Indirectly Affected */}
                  {cascadeResult.indirectlyAffected.length > 0 && (
                    <div className="cascade-category">
                      <h4 style={{ color: '#f59e0b' }}>
                        🟡 INDIRECT: Ecosystem Effects (Loss 20-40%)
                      </h4>
                      <div className="species-impact-list">
                        {cascadeResult.indirectlyAffected.slice(0, 4).map((spec) => (
                          <div key={spec._id || spec.name} className="impact-item indirect">
                            <span className="impact-icon">{spec.icon}</span>
                            <span className="impact-name">{spec.name}</span>
                            <span className="impact-reason">affected indirectly</span>
                          </div>
                        ))}
                        {cascadeResult.indirectlyAffected.length > 4 && (
                          <p className="more-affected">
                            +{cascadeResult.indirectlyAffected.length - 4} more species...
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Winners */}
                  {cascadeResult.winners.length > 0 && (
                    <div className="cascade-category">
                      <h4 style={{ color: '#22c55e' }}>
                        🟢 WINNERS: Species that Benefit (+30-50% gain)
                      </h4>
                      <div className="species-impact-list">
                        {cascadeResult.winners.slice(0, 3).map((spec) => (
                          <div key={spec._id || spec.name} className="impact-item winner">
                            <span className="impact-icon">{spec.icon}</span>
                            <span className="impact-name">{spec.name}</span>
                            <span className="impact-benefit">less predation</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Analyze Another Button */}
                  <button
                    className="btn-analyze-another"
                    onClick={() => {
                      setCascadeResult(null);
                      setSelectedSpecies(null);
                    }}
                  >
                    Analyze Another
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
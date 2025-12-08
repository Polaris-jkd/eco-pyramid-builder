import React, { useState, useEffect } from 'react';

/**
 * CascadeAnalyzer Component
 * 
 * Shows how removing/reducing a species affects the entire ecosystem
 * 
 * BEGINNER GUIDE:
 * - Analyzes food chain relationships
 * - Calculates cascade effects (what dies if this species dies)
 * - Shows impact on upper and lower trophic levels
 */

export default function CascadeAnalyzer({ species }) {
  const [cascadeAnalysis, setCascadeAnalysis] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  /**
   * TROPHIC LEVEL HIERARCHY
   * 0 = Producer (base)
   * 1 = Primary Consumer (eats producers)
   * 2 = Secondary Consumer (eats primary consumers)
   * 3 = Tertiary Consumer (apex predator)
   */
  const getTrophicLevel = (trophicLevelStr) => {
    const levels = {
      'producer': 0,
      'primary_consumer': 1,
      'secondary_consumer': 2,
      'tertiary_consumer': 3
    };
    return levels[trophicLevelStr] || 0;
  };

  /**
   * BEGINNER: Find which species would be affected if this species disappears
   * 
   * EXAMPLE:
   * If Grass (producer) dies:
   * - Primary consumers (Rabbit, Grasshopper) lose food → their population drops 50-80%
   * - Secondary consumers (Frog, Snake) have less prey → drop 30-50%
   * - Apex predators (Hawk) have less food chain → drop 20-30%
   */
  const analyzeCascadeEffect = (targetSpecies) => {
    const targetLevel = getTrophicLevel(targetSpecies.trophicLevel);

    // Affected species arrays
    const directlyDependent = []; // Eat this species
    const indirectlyAffected = []; // Depend on affected species
    const beneficiary = []; // Compete with removed species

    species.forEach(s => {
      if (s.name === targetSpecies.name) return; // Skip self

      const sLevel = getTrophicLevel(s.trophicLevel);

      // RULE 1: Predators (higher level) depend on this species
      if (sLevel === targetLevel + 1) {
        directlyDependent.push({
          species: s,
          type: 'predator',
          impact: 'CRITICAL',
          loss: '60-80%',
          reason: `${s.name} hunts ${targetSpecies.name}`
        });
      }
      // RULE 2: Prey (lower level) benefits from removal
      else if (sLevel === targetLevel - 1 && targetLevel > 0) {
        beneficiary.push({
          species: s,
          type: 'prey',
          impact: 'POSITIVE',
          gain: '40-60%',
          reason: `Less competition for ${s.name}`
        });
      }
      // RULE 3: Indirect cascade (2+ levels away)
      else if (sLevel > targetLevel + 1) {
        const levelsDiff = sLevel - targetLevel;
        const impactPercent = Math.max(10, 50 - (levelsDiff * 15));
        indirectlyAffected.push({
          species: s,
          type: 'apex',
          impact: 'INDIRECT',
          loss: `${impactPercent}%`,
          reason: `Food chain disruption (${levelsDiff} levels removed)`
        });
      }
    });

    return {
      targetSpecies,
      directlyDependent,
      indirectlyAffected,
      beneficiary,
      totalSpeciesAffected: directlyDependent.length + indirectlyAffected.length,
      ecosystemHealth: calculateEcosystemHealth(directlyDependent, indirectlyAffected, beneficiary)
    };
  };

  /**
   * BEGINNER: Calculate overall ecosystem stability
   * 0% = ecosystem collapse
   * 100% = ecosystem stable
   */
  const calculateEcosystemHealth = (dependent, indirect, beneficiary) => {
    const totalAffected = dependent.length + indirect.length;
    const deathRate = (dependent.length * 0.7 + indirect.length * 0.3) / (species.length || 1);
    const healthScore = Math.max(0, 100 - (deathRate * 100));
    return Math.round(healthScore);
  };

  /**
   * BEGINNER: Get emoji indicator for severity
   */
  const getSeverityIcon = (health) => {
    if (health > 70) return '🟢'; // Stable
    if (health > 40) return '🟡'; // Unstable
    return '🔴'; // Critical
  };

  const handleAnalyzeSpecies = (sp) => {
    const analysis = analyzeCascadeEffect(sp);
    setCascadeAnalysis(analysis);
    setSelectedSpecies(sp);
    setShowAnalysis(true);
  };

  if (!showAnalysis) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '420px',
        right: '20px',
        zIndex: 500
      }}>
        <button
          onClick={() => setShowAnalysis(true)}
          style={{
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          🌀 Cascade Effects
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '420px',
      width: '420px',
      maxHeight: '650px',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      zIndex: 500,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      border: '2px solid #f5576c',
      animation: 'slideInLeft 0.3s ease'
    }}>
      {/* HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 600,
        fontSize: '1.1rem'
      }}>
        <span>🌀 Cascade Effects Analyzer</span>
        <button
          onClick={() => setShowAnalysis(false)}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>
      </div>

      {/* CONTENT */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px'
      }}>
        {!cascadeAnalysis ? (
          <div style={{ textAlign: 'center', color: '#999' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>
              📌 Select a species to analyze cascade effects
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '6px',
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              {species.map(s => (
                <button
                  key={s._id || s.name}
                  onClick={() => handleAnalyzeSpecies(s)}
                  style={{
                    padding: '10px 12px',
                    background: '#f9f9f9',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f0f0f0'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#f9f9f9'}
                >
                  {s.icon} {s.name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* TARGET SPECIES */}
            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              padding: '14px',
              borderRadius: '10px',
              marginBottom: '16px',
              fontSize: '1.1rem',
              fontWeight: 600
            }}>
              ❌ {cascadeAnalysis.targetSpecies.icon} {cascadeAnalysis.targetSpecies.name} REMOVED
            </div>

            {/* ECOSYSTEM HEALTH INDICATOR */}
            <div style={{
              background: '#f5f5f5',
              padding: '14px',
              borderRadius: '10px',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>
                📊 Ecosystem Health Score
              </div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: cascadeAnalysis.ecosystemHealth > 60 ? '#22c55e' : '#ef4444'
              }}>
                {getSeverityIcon(cascadeAnalysis.ecosystemHealth)} {cascadeAnalysis.ecosystemHealth}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '4px' }}>
                {cascadeAnalysis.totalSpeciesAffected} species affected
              </div>
            </div>

            {/* DIRECTLY DEPENDENT */}
            {cascadeAnalysis.directlyDependent.length > 0 && (
              <div style={{ marginBottom: '14px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: '#dc2626' }}>
                  🔴 CRITICAL: Direct Predators (Loss {cascadeAnalysis.directlyDependent[0]?.loss || '0%'})
                </h4>
                <div style={{ display: 'grid', gap: '6px' }}>
                  {cascadeAnalysis.directlyDependent.map((item, idx) => (
                    <div key={idx} style={{
                      background: '#fee2e2',
                      border: '1px solid #fecaca',
                      padding: '10px',
                      borderRadius: '6px',
                      fontSize: '0.8rem'
                    }}>
                      <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                        {item.species.icon} {item.species.name}
                      </div>
                      <div style={{ color: '#991b1b', fontSize: '0.75rem' }}>
                        {item.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INDIRECT EFFECTS */}
            {cascadeAnalysis.indirectlyAffected.length > 0 && (
              <div style={{ marginBottom: '14px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: '#ea580c' }}>
                  🟡 INDIRECT: Secondary Impact (Loss {cascadeAnalysis.indirectlyAffected[0]?.loss || '0%'})
                </h4>
                <div style={{ display: 'grid', gap: '6px' }}>
                  {cascadeAnalysis.indirectlyAffected.map((item, idx) => (
                    <div key={idx} style={{
                      background: '#ffedd5',
                      border: '1px solid #fed7aa',
                      padding: '10px',
                      borderRadius: '6px',
                      fontSize: '0.8rem'
                    }}>
                      <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                        {item.species.icon} {item.species.name}
                      </div>
                      <div style={{ color: '#92400e', fontSize: '0.75rem' }}>
                        {item.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BENEFICIARIES */}
            {cascadeAnalysis.beneficiary.length > 0 && (
              <div style={{ marginBottom: '14px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: '#22c55e' }}>
                  🟢 WINNERS: Species That Benefit (Gain {cascadeAnalysis.beneficiary[0]?.gain || '0%'})
                </h4>
                <div style={{ display: 'grid', gap: '6px' }}>
                  {cascadeAnalysis.beneficiary.map((item, idx) => (
                    <div key={idx} style={{
                      background: '#dcfce7',
                      border: '1px solid #bbf7d0',
                      padding: '10px',
                      borderRadius: '6px',
                      fontSize: '0.8rem'
                    }}>
                      <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                        {item.species.icon} {item.species.name}
                      </div>
                      <div style={{ color: '#166534', fontSize: '0.75rem' }}>
                        {item.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DISCLAIMER */}
            <div style={{
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              padding: '10px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              color: '#0369a1'
            }}>
              💡 This is a simplified model. Real cascades are more complex!
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{
        background: '#f9f9f9',
        padding: '12px',
        borderTop: '1px solid #eee',
        textAlign: 'center'
      }}>
        <button
          onClick={() => {
            setCascadeAnalysis(null);
            setSelectedSpecies(null);
          }}
          style={{
            width: '100%',
            padding: '10px',
            background: '#f0f0f0',
            border: '1px solid #ddd',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          {cascadeAnalysis ? 'Analyze Another' : 'Close'}
        </button>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
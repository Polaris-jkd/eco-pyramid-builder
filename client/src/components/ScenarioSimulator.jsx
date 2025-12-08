import React, { useState, useEffect } from 'react';

/**
 * ScenarioSimulator Component
 * 
 * Allows users to:
 * 1. Select a species
 * 2. Modify its parameters (population, energy, biomass)
 * 3. See real-time changes in the pyramid
 * 
 * BEGINNER GUIDE:
 * - State tracks the selected species and its modified values
 * - Sliders let users adjust values between min/max
 * - onChange triggers parent component update
 */

export default function ScenarioSimulator({ species, onSimulationChange, pyramidType = 'energy' }) {
  // Selected species for simulation
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  
  // Temporary values while adjusting
  const [simulatedValues, setSimulatedValues] = useState({
    population: 100,
    energy: 1000,
    biomass: 100
  });

  // Track original values (for comparison)
  const [originalValues, setOriginalValues] = useState({
    population: 100,
    energy: 1000,
    biomass: 100
  });

  // Show/hide the simulator panel
  const [isOpen, setIsOpen] = useState(false);

  /**
   * BEGINNER: When user clicks a species, store it and its original values
   */
  const handleSelectSpecies = (species) => {
    setSelectedSpecies(species);
    setSimulatedValues({
      population: species.population || 100,
      energy: species.energy || 1000,
      biomass: species.biomass || 100
    });
    setOriginalValues({
      population: species.population || 100,
      energy: species.energy || 1000,
      biomass: species.biomass || 100
    });
    setIsOpen(true);
  };

  /**
   * BEGINNER: When user moves slider, update simulated value
   * This doesn't change the actual pyramid YET - just shows preview
   */
  const handleSliderChange = (parameter, newValue) => {
    setSimulatedValues(prev => ({
      ...prev,
      [parameter]: newValue
    }));
  };

  /**
   * BEGINNER: Apply the changes to the actual pyramid
   * Send modified species to parent component
   */
  const handleApplyChanges = () => {
    if (!selectedSpecies) return;

    const modifiedSpecies = {
      ...selectedSpecies,
      population: simulatedValues.population,
      energy: simulatedValues.energy,
      biomass: simulatedValues.biomass
    };

    // Tell parent component about the change
    onSimulationChange(modifiedSpecies);

    // Show success message
    alert(`✅ Updated ${selectedSpecies.name}!\nPopulation: ${simulatedValues.population}\nEnergy: ${simulatedValues.energy}\nBiomass: ${simulatedValues.biomass}`);
  };

  /**
   * BEGINNER: Reset to original values
   */
  const handleResetChanges = () => {
    setSimulatedValues(originalValues);
  };

  /**
   * BEGINNER: Calculate percentage change
   * Example: If original was 100 and new is 150, change = +50%
   */
  const calculatePercentChange = (parameter) => {
    const original = originalValues[parameter];
    const simulated = simulatedValues[parameter];
    const change = ((simulated - original) / original) * 100;
    return change.toFixed(1);
  };

  /**
   * BEGINNER: Get display label for current parameter
   */
  const getDisplayLabel = (parameter, value) => {
    if (parameter === 'energy') return `${value} kcal/m²`;
    if (parameter === 'biomass') return `${value} kg/m²`;
    if (parameter === 'population') return `${value} individuals`;
    return value;
  };

  if (!isOpen) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 500
      }}>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseHover={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
        >
          🎮 Scenario Simulator
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '380px',
      maxHeight: '600px',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      zIndex: 500,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      border: '2px solid #667eea',
      animation: 'slideInRight 0.3s ease'
    }}>
      {/* HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 600,
        fontSize: '1.1rem'
      }}>
        <span>🎮 Scenario Simulator</span>
        <button
          onClick={() => setIsOpen(false)}
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
        padding: '20px'
      }}>
        {!selectedSpecies ? (
          <div style={{ textAlign: 'center', color: '#999' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>
              📌 Select a species from the pyramid to simulate changes
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '8px',
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {species.map(s => (
                <button
                  key={s._id || s.name}
                  onClick={() => handleSelectSpecies(s)}
                  style={{
                    padding: '10px 12px',
                    background: '#f0f0f0',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#e8e8e8'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#f0f0f0'}
                >
                  {s.icon} {s.name} ({s.trophicLevel.replace('_', ' ')})
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Selected Species Info */}
            <div style={{
              background: '#f5f5f5',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '16px',
              borderLeft: '4px solid #667eea'
            }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '4px' }}>
                {selectedSpecies.icon} {selectedSpecies.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>
                {selectedSpecies.trophicLevel.replace('_', ' ')} • {selectedSpecies.ecosystem}
              </div>
            </div>

            {/* PARAMETERS SLIDERS */}
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '12px', color: '#333' }}>
                ⚙️ Adjust Parameters
              </h4>

              {/* Population Slider */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 500 }}>👥 Population</label>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: 600, 
                    color: calculatePercentChange('population') >= 0 ? '#22c55e' : '#ef4444'
                  }}>
                    {getDisplayLabel('population', simulatedValues.population)}
                    {' '}
                    <span style={{ fontSize: '0.75rem', marginLeft: '4px' }}>
                      ({calculatePercentChange('population') >= 0 ? '+' : ''}{calculatePercentChange('population')}%)
                    </span>
                  </span>
                </div>
                <input
                  type="range"
                  min={originalValues.population * 0.1}
                  max={originalValues.population * 5}
                  value={simulatedValues.population}
                  onChange={(e) => handleSliderChange('population', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    background: '#ddd',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
                <div style={{ fontSize: '0.7rem', color: '#999', marginTop: '4px' }}>
                  Range: {(originalValues.population * 0.1).toFixed(0)} - {(originalValues.population * 5).toFixed(0)}
                </div>
              </div>

              {/* Energy Slider */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 500 }}>⚡ Energy</label>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: 600, 
                    color: calculatePercentChange('energy') >= 0 ? '#22c55e' : '#ef4444'
                  }}>
                    {getDisplayLabel('energy', simulatedValues.energy)}
                    {' '}
                    <span style={{ fontSize: '0.75rem', marginLeft: '4px' }}>
                      ({calculatePercentChange('energy') >= 0 ? '+' : ''}{calculatePercentChange('energy')}%)
                    </span>
                  </span>
                </div>
                <input
                  type="range"
                  min={originalValues.energy * 0.1}
                  max={originalValues.energy * 5}
                  value={simulatedValues.energy}
                  onChange={(e) => handleSliderChange('energy', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    background: '#ddd',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
                <div style={{ fontSize: '0.7rem', color: '#999', marginTop: '4px' }}>
                  Range: {(originalValues.energy * 0.1).toFixed(0)} - {(originalValues.energy * 5).toFixed(0)}
                </div>
              </div>

              {/* Biomass Slider */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 500 }}>🏔️ Biomass</label>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: 600, 
                    color: calculatePercentChange('biomass') >= 0 ? '#22c55e' : '#ef4444'
                  }}>
                    {getDisplayLabel('biomass', simulatedValues.biomass)}
                    {' '}
                    <span style={{ fontSize: '0.75rem', marginLeft: '4px' }}>
                      ({calculatePercentChange('biomass') >= 0 ? '+' : ''}{calculatePercentChange('biomass')}%)
                    </span>
                  </span>
                </div>
                <input
                  type="range"
                  min={originalValues.biomass * 0.1}
                  max={originalValues.biomass * 5}
                  value={simulatedValues.biomass}
                  onChange={(e) => handleSliderChange('biomass', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    background: '#ddd',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
                <div style={{ fontSize: '0.7rem', color: '#999', marginTop: '4px' }}>
                  Range: {(originalValues.biomass * 0.1).toFixed(0)} - {(originalValues.biomass * 5).toFixed(0)}
                </div>
              </div>
            </div>

            {/* COMPARISON SUMMARY */}
            <div style={{
              background: '#f5f5f5',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>📊 Summary</h4>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                <div>📈 Population: {calculatePercentChange('population')}%</div>
                <div>⚡ Energy: {calculatePercentChange('energy')}%</div>
                <div>🏔️ Biomass: {calculatePercentChange('biomass')}%</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER BUTTONS */}
      <div style={{
        background: '#f9f9f9',
        padding: '12px 16px',
        borderTop: '1px solid #eee',
        display: 'flex',
        gap: '8px'
      }}>
        {selectedSpecies && (
          <>
            <button
              onClick={handleResetChanges}
              style={{
                flex: 1,
                padding: '10px',
                background: '#f0f0f0',
                border: '1px solid #ddd',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '0.9rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e0e0e0'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f0f0f0'}
            >
              🔄 Reset
            </button>
            <button
              onClick={handleApplyChanges}
              style={{
                flex: 1,
                padding: '10px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              ✅ Apply Changes
            </button>
          </>
        )}
        <button
          onClick={() => {
            setSelectedSpecies(null);
            setIsOpen(false);
          }}
          style={{
            flex: selectedSpecies ? 0 : 1,
            padding: '10px 16px',
            background: '#f0f0f0',
            border: '1px solid #ddd',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '0.9rem',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#e0e0e0'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#f0f0f0'}
        >
          {selectedSpecies ? 'Back' : 'Close'}
        </button>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
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
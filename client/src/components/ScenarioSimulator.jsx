import React, { useState } from 'react';
import '../styles/SimulatorModal.css';

export default function ScenarioSimulator({ species, onSimulationChange, pyramidType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [adjustments, setAdjustments] = useState({
    population: 100,
    energy: 100,
    biomass: 100
  });

  const handleSpeciesSelect = (spec) => {
    setSelectedSpecies(spec);
    setAdjustments({
      population: 100,
      energy: 100,
      biomass: 100
    });
  };

  const handleSliderChange = (key, value) => {
    setAdjustments(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyChanges = () => {
    if (!selectedSpecies) return;

    const modifiedSpecies = {
      ...selectedSpecies,
      population: Math.round(selectedSpecies.population * (adjustments.population / 100)),
      energy: Math.round(selectedSpecies.energy * (adjustments.energy / 100) * 100) / 100,
      biomass: Math.round(selectedSpecies.biomass * (adjustments.biomass / 100) * 100) / 100
    };

    if (onSimulationChange) {
      onSimulationChange(modifiedSpecies);
    }

    setIsOpen(false);
    setSelectedSpecies(null);
  };

  const handleReset = () => {
    setAdjustments({
      population: 100,
      energy: 100,
      biomass: 100
    });
  };

  return (
    <>
      {/* Fixed Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="simulator-toggle-btn"
        title="Open Scenario Simulator"
      >
        🎮 Scenario Simulator
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="simulator-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="simulator-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="simulator-header">
              <h3>🎮 Scenario Simulator</h3>
              <button
                className="simulator-close-btn"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="simulator-body">
              {/* Species Selector */}
              <div className="simulator-section">
                <h4>Select Species to Modify</h4>
                <div className="species-grid">
                  {species.map((spec) => (
                    <button
                      key={spec._id || spec.name}
                      className={`species-option ${
                        selectedSpecies?.name === spec.name ? 'active' : ''
                      }`}
                      onClick={() => handleSpeciesSelect(spec)}
                    >
                      <span className="species-option-icon">{spec.icon}</span>
                      <span className="species-option-name">{spec.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Adjustments */}
              {selectedSpecies && (
                <div className="simulator-section">
                  <h4>Adjust Parameters</h4>
                  <div className="adjustment-group">
                    <label>
                      <span className="label-text">
                        👥 Population: {adjustments.population}%
                      </span>
                      <input
                        type="range"
                        min="10"
                        max="500"
                        value={adjustments.population}
                        onChange={(e) =>
                          handleSliderChange('population', parseInt(e.target.value))
                        }
                        className="slider"
                      />
                      <small>Original: {selectedSpecies.population}</small>
                    </label>
                  </div>

                  <div className="adjustment-group">
                    <label>
                      <span className="label-text">
                        ⚡ Energy: {adjustments.energy}%
                      </span>
                      <input
                        type="range"
                        min="10"
                        max="500"
                        value={adjustments.energy}
                        onChange={(e) =>
                          handleSliderChange('energy', parseInt(e.target.value))
                        }
                        className="slider"
                      />
                      <small>Original: {selectedSpecies.energy} kcal/m²</small>
                    </label>
                  </div>

                  <div className="adjustment-group">
                    <label>
                      <span className="label-text">
                        🏔️ Biomass: {adjustments.biomass}%
                      </span>
                      <input
                        type="range"
                        min="10"
                        max="500"
                        value={adjustments.biomass}
                        onChange={(e) =>
                          handleSliderChange('biomass', parseInt(e.target.value))
                        }
                        className="slider"
                      />
                      <small>Original: {selectedSpecies.biomass} kg/m²</small>
                    </label>
                  </div>

                  {/* Summary */}
                  <div className="adjustment-summary">
                    <p>
                      <strong>New Population:</strong>{' '}
                      {Math.round(
                        selectedSpecies.population * (adjustments.population / 100)
                      )}{' '}
                      ({adjustments.population > 100 ? '+' : ''}
                      {adjustments.population - 100}%)
                    </p>
                    <p>
                      <strong>New Energy:</strong>{' '}
                      {(selectedSpecies.energy * (adjustments.energy / 100)).toFixed(2)}{' '}
                      kcal/m²
                    </p>
                    <p>
                      <strong>New Biomass:</strong>{' '}
                      {(selectedSpecies.biomass * (adjustments.biomass / 100)).toFixed(2)}{' '}
                      kg/m²
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button
                      className="btn-apply"
                      onClick={handleApplyChanges}
                    >
                      ✅ Apply Changes
                    </button>
                    <button
                      className="btn-reset"
                      onClick={handleReset}
                    >
                      🔄 Reset
                    </button>
                  </div>
                </div>
              )}

              {!selectedSpecies && (
                <div className="simulator-empty">
                  <p>👆 Select a species to start simulating changes</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
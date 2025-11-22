import React, { useState } from 'react';

const TROPHIC_COLORS = {
  producer: '#22c55e',
  primary_consumer: '#eab308',
  secondary_consumer: '#f97316',
  tertiary_consumer: '#ef4444'
};

const TROPHIC_LABELS = {
  producer: '🌱 Producers',
  primary_consumer: '🐰 Primary Consumers',
  secondary_consumer: '🐍 Secondary Consumers',
  tertiary_consumer: '🦅 Tertiary Consumers'
};

export default function PyramidCanvas({ species, onRemoveSpecies, onAddSpecies, pyramidType = 'energy', onError }) {
  const [dragOver, setDragOver] = useState(null);

  const groupedSpecies = {
    tertiary_consumer: species.filter(s => s.trophicLevel === 'tertiary_consumer'),
    secondary_consumer: species.filter(s => s.trophicLevel === 'secondary_consumer'),
    primary_consumer: species.filter(s => s.trophicLevel === 'primary_consumer'),
    producer: species.filter(s => s.trophicLevel === 'producer')
  };

  const showError = (message) => {
    if (onError) {
      onError(message);  // Use parent's error handler
    }
  };

  const handleDragOver = (e, level) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(level);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(null);
  };

  const handleDrop = async (e, level) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(null);

    try {
      const speciesData = JSON.parse(e.dataTransfer.getData('species'));
      
      // ✅ CHECK: Wrong trophic level
      if (speciesData.trophicLevel !== level) {
        const correctLevel = TROPHIC_LABELS[speciesData.trophicLevel];
        const droppedLevel = TROPHIC_LABELS[level];
        showError(`❌ ${speciesData.name} belongs to ${correctLevel}, not ${droppedLevel}!`);
        return;
      }

      // ✅ CHECK: Duplicate species
      const exists = species.some(s => s.name === speciesData.name);
      if (exists) {
        showError(`⚠️ ${speciesData.name} is already in the pyramid!`);
        return;
      }

      await onAddSpecies(speciesData);
    } catch (error) {
      console.error('Error dropping species:', error);
      showError('Failed to add species. Please try again.');
    }
  };

  // ✅ FIX: Handle drop on EMPTY canvas (entire pyramid area)
  const handleCanvasDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const speciesData = JSON.parse(e.dataTransfer.getData('species'));
      
      // Automatically add to correct level
      const correctLevel = speciesData.trophicLevel;
      await handleDrop(e, correctLevel);
    } catch (error) {
      console.error('Error dropping on canvas:', error);
    }
  };

  const calculateTotal = (levelSpecies) => {
    return levelSpecies.reduce((sum, s) => {
      if (pyramidType === 'energy') return sum + (s.energy || 0);
      if (pyramidType === 'biomass') return sum + (s.biomass || 0);
      if (pyramidType === 'numbers') return sum + (s.population || 0);
      return sum;
    }, 0);
  };

  const getDisplayValue = (s) => {
    if (pyramidType === 'energy') return `${(s.energy || 0).toFixed(1)} kcal/m²`;
    if (pyramidType === 'biomass') return `${(s.biomass || 0).toFixed(1)} kg/m²`;
    if (pyramidType === 'numbers') return `${(s.population || 0)} individuals`;
    return '';
  };

  if (species.length === 0) {
    return (
      <div 
        className="pyramid-container"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleCanvasDrop}
      >
        <div className="pyramid-header">
          <h2>🔺 Ecological Pyramid</h2>
          <span className="pyramid-type-label">Type: {pyramidType}</span>
        </div>
        
        <div className="empty-state">
          <div className="empty-state-icon">🌍</div>
          <h3>Build Your Ecosystem</h3>
          <p>Drag species from the sidebar or click to add</p>
          <div className="hint-bubble">💡 Start with producers at the base!</div>
        </div>
      </div>
    );
  }

  const levels = ['tertiary_consumer', 'secondary_consumer', 'primary_consumer', 'producer'];

  return (
    <div className="pyramid-container">
      <div className="pyramid-header">
        <h2>🔺 Ecological Pyramid</h2>
        <span className="pyramid-type-label">Type: {pyramidType}</span>
      </div>

      {/* ✅ Error Message Banner */}
      {errorMessage && (
        <div style={{
          background: '#fee2e2',
          color: '#dc2626',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          fontSize: '0.875rem',
          fontWeight: 500,
          animation: 'slideIn 0.3s ease'
        }}>
          {errorMessage}
        </div>
      )}

      <div className="pyramid-levels">
        {levels.map(level => {
          const levelSpecies = groupedSpecies[level];
          const total = calculateTotal(levelSpecies);
          const hasSpecies = levelSpecies.length > 0;

          return (
            <div
              key={level}
              className={`pyramid-level-card ${dragOver === level ? 'drag-over' : ''} ${!hasSpecies ? 'empty-level' : ''}`}
              onDragOver={(e) => handleDragOver(e, level)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, level)}
            >
              <div className="level-header-row">
                <h3 className="level-title-text" style={{ color: TROPHIC_COLORS[level] }}>
                  {TROPHIC_LABELS[level]}
                </h3>
                <span className="level-count-badge">{levelSpecies.length} species</span>
              </div>

              {hasSpecies ? (
                <>
                  <div className="species-chips-grid">
                    {levelSpecies.map(s => (
                      <div key={s._id || s.name} className="species-chip-card">
                        <span className="species-chip-icon">{s.icon}</span>
                        <div className="species-chip-info">
                          <strong>{s.name}</strong>
                          <small>{getDisplayValue(s)}</small>
                        </div>
                        <button
                          className="remove-species-x"
                          onClick={() => onRemoveSpecies(s)}
                          title="Remove species"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="level-total-row">
                    <span>Total {pyramidType}:</span>
                    <strong>
                      {pyramidType === 'energy' && `${total.toFixed(1)} kcal/m²`}
                      {pyramidType === 'biomass' && `${total.toFixed(1)} kg/m²`}
                      {pyramidType === 'numbers' && `${total} individuals`}
                    </strong>
                  </div>
                </>
              ) : (
                <div className="empty-drop-hint">
                  Drop {TROPHIC_LABELS[level].toLowerCase()} here
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

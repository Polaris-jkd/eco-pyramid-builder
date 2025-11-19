import React, { useState } from 'react';

const TROPHIC_COLORS = {
  producer: '#22c55e',
  primary_consumer: '#eab308',
  secondary_consumer: '#f97316',
  tertiary_consumer: '#ef4444'
};

const TROPHIC_LABELS = {
  producer: 'Producers',
  primary_consumer: 'Primary Consumers',
  secondary_consumer: 'Secondary Consumers',
  tertiary_consumer: 'Tertiary Consumers'
};

export default function PyramidCanvas({ species, onRemoveSpecies, onAddSpecies, pyramidType = 'energy' }) {
  const [dragOver, setDragOver] = useState(null);

  const groupedSpecies = {
    tertiary_consumer: species.filter(s => s.trophicLevel === 'tertiary_consumer'),
    secondary_consumer: species.filter(s => s.trophicLevel === 'secondary_consumer'),
    primary_consumer: species.filter(s => s.trophicLevel === 'primary_consumer'),
    producer: species.filter(s => s.trophicLevel === 'producer')
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

  const handleDrop = (e, level) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(null);
    
    try {
      const speciesData = JSON.parse(e.dataTransfer.getData('species'));
      
      if (speciesData.trophicLevel === level) {
        onAddSpecies(speciesData);
      } else {
        alert(`❌ Cannot add ${speciesData.name} to ${TROPHIC_LABELS[level]}!\n\n${speciesData.name} is a ${TROPHIC_LABELS[speciesData.trophicLevel]}.`);
      }
    } catch (error) {
      console.error('Drop error:', error);
    }
  };

  const calculateValue = (speciesItem) => {
    switch(pyramidType) {
      case 'energy':
        return speciesItem.energy || 0;
      case 'biomass':
        return speciesItem.biomass || 0;
      case 'numbers':
        return speciesItem.population || 100;
      default:
        return speciesItem.energy || 0;
    }
  };

  const getTotalForLevel = (level) => {
    return groupedSpecies[level].reduce((sum, s) => sum + calculateValue(s), 0);
  };

  // THIS IS THE KEY FIX: Calculate proper pyramid widths
  const calculatePyramidWidth = () => {
    const levels = ['producer', 'primary_consumer', 'secondary_consumer', 'tertiary_consumer'];
    const totals = levels.map(level => getTotalForLevel(level));
    
    // Get max value for scaling
    const maxValue = Math.max(...totals, 1);
    
    // Calculate widths: each level gets width proportional to its value
    // This creates the proper pyramid shape
    const widths = {};
    levels.forEach((level, index) => {
      const value = totals[index];
      // Width in percentage: (value / maxValue) * 90 (leaving 10% margin)
      // Minimum 80px to keep visibility
      const widthPercent = (value / maxValue) * 85 + 5; // 5-90% range
      widths[level] = widthPercent;
    });
    
    return widths;
  };

  const pyramidWidths = calculatePyramidWidth();

  return (
    <div className="pyramid-canvas">
      <div className="pyramid-header">
        <h3>🏔️ Ecological Pyramid</h3>
        <div className="pyramid-type-indicator">
          Type: <strong>{pyramidType.charAt(0).toUpperCase() + pyramidType.slice(1)}</strong>
        </div>
      </div>

      {species.length === 0 ? (
        <div className="empty-pyramid">
          <div className="empty-icon">🌍</div>
          <h4>Build Your Ecosystem</h4>
          <p>Drag species from the sidebar to the correct trophic level</p>
          <p className="hint">💡 Start with producers at the base!</p>
        </div>
      ) : (
        <div className="pyramid-levels">
          {Object.entries(groupedSpecies).map(([level, levelSpecies]) => {
            const totalValue = getTotalForLevel(level);
            const widthPercent = pyramidWidths[level];
            
            return (
              <div
                key={level}
                className={`pyramid-level ${dragOver === level ? 'drag-over' : ''} ${levelSpecies.length === 0 ? 'empty-level' : ''}`}
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: TROPHIC_COLORS[level],
                  minHeight: levelSpecies.length > 0 ? 'auto' : '60px'
                }}
                onDragOver={(e) => handleDragOver(e, level)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, level)}
              >
                <div className="level-header">
                  <strong>{TROPHIC_LABELS[level]}</strong>
                  <span className="level-count">{levelSpecies.length} species</span>
                </div>
                
                {levelSpecies.length > 0 ? (
                  <>
                    <div className="level-species">
                      {levelSpecies.map((s) => (
                        <div key={s._id} className="species-chip">
                          <span>{s.icon || '🔹'} {s.name}</span>
                          <span className="species-value">
                            {calculateValue(s).toFixed(1)}
                            {pyramidType === 'numbers' ? '' : pyramidType === 'biomass' ? ' kg/m²' : ' kcal/m²'}
                          </span>
                          <button
                            className="remove-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveSpecies(s);
                            }}
                            title="Remove species"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="level-total">
                      Total: {totalValue.toFixed(1)} 
                      {pyramidType === 'numbers' ? ' organisms' : pyramidType === 'biomass' ? ' kg/m²' : ' kcal/m²'}
                    </div>
                  </>
                ) : (
                  <div className="drop-hint">
                    ⬇ Drop {TROPHIC_LABELS[level].toLowerCase()} here
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

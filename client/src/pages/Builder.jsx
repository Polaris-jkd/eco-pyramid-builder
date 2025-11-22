import React, { useState, useEffect, useRef } from 'react';
import { getAllSpecies, addSpecies, predictBiomass, deleteSpecies } from '../api/api';
import SpeciesSidebar from '../components/SpeciesSidebar';
import PyramidCanvas from '../components/PyramidCanvas';
import { BIOME_TEMPLATES } from '../data/biomes';

export default function Builder() {
  const [species, setSpecies] = useState([]);
  const [pyramidType, setPyramidType] = useState('energy');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    loadSpecies();
    
    const forceResize = () => {
      if (containerRef.current) {
        const navbarHeight = 60;
        const availableHeight = window.innerHeight - navbarHeight;
        containerRef.current.style.height = `${availableHeight}px`;
        containerRef.current.style.maxHeight = `${availableHeight}px`;
      }
    };

    forceResize();
    window.addEventListener('resize', forceResize);
    
    return () => window.removeEventListener('resize', forceResize);
  }, []);

  const loadSpecies = async () => {
    try {
      const data = await getAllSpecies();
      setSpecies(data);
    } catch (error) {
      console.error('Error loading species:', error);
    }
  };

  const handleAddSpecies = async (speciesData) => {
    try {
      const exists = species.some(s => s.name === speciesData.name);
      if (exists) {
        setError(`${speciesData.name} is already in the pyramid!`);
        setTimeout(() => setError(''), 3000);
        return;
      }

      const newSpecies = {
        name: speciesData.name,
        trophicLevel: speciesData.trophicLevel,
        biomass: parseFloat(speciesData.biomass),
        energy: parseFloat(speciesData.energy),
        population: parseFloat(speciesData.population) || 100,
        ecosystem: speciesData.ecosystem || 'grassland',
        icon: speciesData.icon || '🔹'
      };

      await addSpecies(newSpecies);
      await loadSpecies();
      setError('');
    } catch (error) {
      console.error('Error adding species:', error);
      setError('Failed to add species. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleRemoveSpecies = async (speciesToRemove) => {
    try {
      if (speciesToRemove._id) {
        await deleteSpecies(speciesToRemove._id);
      }
      await loadSpecies();
    } catch (error) {
      console.error('Error removing species:', error);
      setError('Failed to remove species');
      setTimeout(() => setError(''), 3000);
    }
  };

  const loadBiomeTemplate = async (biomeKey) => {
    if (!biomeKey) return;

    const biome = BIOME_TEMPLATES[biomeKey];
    setError(`Loading ${biome.name}...`);

    for (const s of species) {
      await handleRemoveSpecies(s);
    }

    for (const speciesData of biome.species) {
      await handleAddSpecies(speciesData);
    }

    setError('');
  };

  const handlePredict = async () => {
    if (species.length === 0) {
      setError('Add species to your pyramid first!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const result = await predictBiomass(species);
      
      const enhancedPrediction = {
        ...result,
        species: species.map((s, idx) => ({
          ...s,
          originalBiomass: s.biomass,
          predictedBiomass: result.predicted_biomass[idx],
          difference: result.predicted_biomass[idx] - s.biomass,
          percentChange: ((result.predicted_biomass[idx] - s.biomass) / s.biomass * 100).toFixed(1)
        }))
      };

      setPrediction(enhancedPrediction);
    } catch (error) {
      console.error('Error predicting:', error);
      setError('Prediction failed. Please try again.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const clearPyramid = async () => {
    for (const s of species) {
      await handleRemoveSpecies(s);
    }
    setPrediction(null);
  };

  return (
    <div 
      ref={containerRef}
      className="builder-container" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: '60px',
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        background: 'var(--bg-canvas)'
      }}
    >
      {/* ✅ PROFESSIONAL UNIFIED TOOLBAR */}
      <div className="builder-unified-toolbar" style={{
        background: 'var(--bg-white)',
        borderBottom: '1px solid var(--border-light)',
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        flexShrink: 0,
        flexWrap: 'wrap'
      }}>
        {/* LEFT: Pyramid Type Selector */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`pyramid-type-btn ${pyramidType === 'energy' ? 'active' : ''}`}
            onClick={() => setPyramidType('energy')}
          >
            ⚡ Energy
          </button>
          <button
            className={`pyramid-type-btn ${pyramidType === 'biomass' ? 'active' : ''}`}
            onClick={() => setPyramidType('biomass')}
          >
            🏔️ Biomass
          </button>
          <button
            className={`pyramid-type-btn ${pyramidType === 'numbers' ? 'active' : ''}`}
            onClick={() => setPyramidType('numbers')}
          >
            🔢 Numbers
          </button>
        </div>

        {/* DIVIDER */}
        <div style={{
          width: '1px',
          height: '30px',
          background: 'var(--border-light)'
        }}></div>

        {/* RIGHT: Controls */}
        <div style={{ display: 'flex', gap: '0.75rem', marginLeft: 'auto', flexWrap: 'wrap' }}>
          <select 
            className="biome-select-compact" 
            onChange={(e) => loadBiomeTemplate(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>Load Biome Template</option>
            <option value="grassland">🌾 Grassland</option>
            <option value="forest">🌲 Forest</option>
            <option value="aquatic">🌊 Aquatic</option>
            <option value="desert">🏜️ Desert</option>
            <option value="tundra">❄️ Tundra</option>
          </select>

          <button className="clear-btn-compact" onClick={clearPyramid}>
            🗑️ Clear All
          </button>

          <button
            className="predict-btn-compact"
            onClick={handlePredict}
            disabled={loading || species.length === 0}
          >
            {loading ? '🔮 Analyzing...' : '🤖 Predict Biomass'}
          </button>
        </div>
      </div>

      {/* Error/Status Banner */}
      {error && <div className="status-banner" style={{ flexShrink: 0 }}>{error}</div>}

      {/* Main Layout */}
      <div 
        className="builder-main-layout" 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* LEFT: Pyramid Canvas */}
        <div 
          className="canvas-area" 
          style={{
            overflowY: 'auto',
            overflowX: 'hidden',
            height: '100%',
            position: 'relative',
            background: 'var(--bg-canvas)',
            padding: '1.5rem'
          }}
        >
          <PyramidCanvas
            species={species}
            onRemoveSpecies={handleRemoveSpecies}
            onAddSpecies={handleAddSpecies}
            pyramidType={pyramidType}
          />
        </div>

        {/* RIGHT: Species Sidebar */}
        <div 
          className="sidebar-area" 
          style={{
            overflowY: 'auto',
            overflowX: 'hidden',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-white)',
            borderLeft: '1px solid var(--border-light)'
          }}
        >
          <SpeciesSidebar onAddSpecies={handleAddSpecies} />
        </div>
      </div>

      {/* Prediction Modal */}
      {prediction && (
        <div className="prediction-overlay" onClick={() => setPrediction(null)}>
          <div className="prediction-modal" onClick={(e) => e.stopPropagation()}>
            <div className="prediction-modal-header">
              <h2>🤖 AI Biomass Prediction Results</h2>
              <button className="close-modal-btn" onClick={() => setPrediction(null)}>×</button>
            </div>

            <div className="prediction-modal-body">
              <div className="prediction-meta-section">
                <div className="meta-card">
                  <span className="meta-label">Model</span>
                  <span className="meta-value">{prediction.model}</span>
                </div>
                <div className="meta-card">
                  <span className="meta-label">Confidence</span>
                  <div className="confidence-bar-container">
                    <div 
                      className="confidence-bar-fill" 
                      style={{ width: `${prediction.confidence * 100}%` }}
                    ></div>
                  </div>
                  <span className="confidence-value">{(prediction.confidence * 100).toFixed(1)}%</span>
                </div>
                <div className="meta-card">
                  <span className="meta-label">Species Analyzed</span>
                  <span className="meta-value">{prediction.species.length}</span>
                </div>
              </div>

              <div className="species-predictions">
                <h3>Species-by-Species Analysis</h3>
                {prediction.species.map((s, idx) => (
                  <div key={idx} className="species-prediction-card">
                    <div className="species-prediction-header">
                      <span className="species-icon-large">{s.icon}</span>
                      <div className="species-prediction-info">
                        <h4>{s.name}</h4>
                        <span className="trophic-badge">{s.trophicLevel.replace('_', ' ')}</span>
                      </div>
                    </div>

                    <div className="prediction-comparison">
                      <div className="comparison-item">
                        <span className="comparison-label">Original Biomass</span>
                        <span className="comparison-value original">{s.originalBiomass.toFixed(2)} kg/m²</span>
                      </div>
                      <div className="comparison-arrow">→</div>
                      <div className="comparison-item">
                        <span className="comparison-label">Predicted Biomass</span>
                        <span className="comparison-value predicted">{s.predictedBiomass.toFixed(2)} kg/m²</span>
                      </div>
                    </div>

                    <div className="prediction-change">
                      <span className={`change-badge ${s.difference >= 0 ? 'positive' : 'negative'}`}>
                        {s.difference >= 0 ? '↑' : '↓'} {Math.abs(s.difference).toFixed(2)} kg/m² 
                        ({s.difference >= 0 ? '+' : ''}{s.percentChange}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="prediction-summary">
                <p>
                  🎯 The model predicts biomass values based on trophic relationships and energy transfer efficiency. 
                  Variations indicate ecosystem balance adjustments.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

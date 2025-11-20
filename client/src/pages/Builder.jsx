import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    loadSpecies();
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

    try {
      const result = await predictBiomass(species);
      setPrediction(result);
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
  };

  return (
    <div className="builder-container">
      {/* Top Controls Bar */}
      <div className="builder-topbar">
        <div className="topbar-left">
          <h1 className="builder-title">🌿 Ecological Pyramid Builder</h1>
        </div>
        
        <div className="topbar-controls">
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
            {loading ? '🔮 Predicting...' : '🤖 Predict'}
          </button>
        </div>
      </div>

      {/* Pyramid Type Selector */}
      <div className="pyramid-type-bar">
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

      {/* Error/Status Banner */}
      {error && <div className="status-banner">{error}</div>}

      {/* Main Layout: Canvas + Sidebar */}
      <div className="builder-main-layout">
        {/* LEFT: Pyramid Canvas */}
        <div className="canvas-area">
          <PyramidCanvas
            species={species}
            onRemoveSpecies={handleRemoveSpecies}
            onAddSpecies={handleAddSpecies}
            pyramidType={pyramidType}
          />
        </div>

        {/* RIGHT: Species Sidebar */}
        <div className="sidebar-area">
          <SpeciesSidebar onAddSpecies={handleAddSpecies} />
        </div>
      </div>

      {/* Prediction Results Panel */}
      {prediction && (
        <div className="prediction-results">
          <div className="prediction-header">
            <h3>🔮 AI Prediction Results</h3>
            <button className="close-prediction" onClick={() => setPrediction(null)}>×</button>
          </div>
          <div className="prediction-body">
            <div className="prediction-meta">
              <div className="meta-item">
                <span className="meta-label">Model</span>
                <span className="meta-value">{prediction.model}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Confidence</span>
                <span className="meta-value">{Math.round(prediction.confidence * 100)}%</span>
              </div>
            </div>
            <div className="prediction-data">
              <h4>Predicted Biomass Values:</h4>
              <div className="biomass-grid">
                {prediction.predicted_biomass.map((val, idx) => (
                  <div key={idx} className="biomass-item">
                    <span className="biomass-index">Species {idx + 1}</span>
                    <span className="biomass-value">{val.toFixed(2)} kg/m²</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
  // ❌ REMOVED: const [temperature, setTemperature] = useState(20);

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

    // Clear existing species first
    for (const s of species) {
      await handleRemoveSpecies(s);
    }

    // Add biome species
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
    <div className="builder-page">
      <div className="builder-header">
        <h1>🌿 Ecological Pyramid Builder</h1>
        <p>Drag & drop species to build interactive food pyramids</p>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="builder-controls">
        <div className="control-group">
          <label>Pyramid Type:</label>
          <div className="button-group">
            <button
              className={`type-btn ${pyramidType === 'energy' ? 'active' : ''}`}
              onClick={() => setPyramidType('energy')}
            >
              ⚡ Energy
            </button>
            <button
              className={`type-btn ${pyramidType === 'biomass' ? 'active' : ''}`}
              onClick={() => setPyramidType('biomass')}
            >
              🏔️ Biomass
            </button>
            <button
              className={`type-btn ${pyramidType === 'numbers' ? 'active' : ''}`}
              onClick={() => setPyramidType('numbers')}
            >
              🔢 Numbers
            </button>
          </div>
        </div>

        <div className="control-group">
          <label>Load Biome Template:</label>
          <select className="biome-select" onChange={(e) => loadBiomeTemplate(e.target.value)}>
            <option value="">-- Choose Biome --</option>
            <option value="grassland">🌾 Grassland</option>
            <option value="forest">🌲 Forest</option>
            <option value="aquatic">🌊 Aquatic</option>
            <option value="desert">🏜️ Desert</option>
            <option value="tundra">❄️ Tundra</option>
          </select>
        </div>

        <div className="control-group">
          <button className="clear-btn" onClick={clearPyramid}>
            🗑️ Clear All
          </button>
        </div>

        <div className="control-group">
          <button
            className="predict-btn"
            onClick={handlePredict}
            disabled={loading || species.length === 0}
          >
            {loading ? '🔮 Predicting...' : '🤖 Predict Biomass'}
          </button>
        </div>
      </div>

      {/* ✅ SWAPPED LAYOUT: Canvas LEFT, Sidebar RIGHT (Infinite Craft style) */}
      <div className="builder-layout">
        {/* MAIN CANVAS - NOW FIRST (LEFT SIDE) */}
        <div className="main-canvas">
          <PyramidCanvas
            species={species}
            onRemoveSpecies={handleRemoveSpecies}
            onAddSpecies={handleAddSpecies}
            pyramidType={pyramidType}
          />
        </div>

        {/* SIDEBAR - NOW SECOND (RIGHT SIDE) */}
        <SpeciesSidebar onAddSpecies={handleAddSpecies} />
      </div>

      {/* ❌ REMOVED: Temperature Scenario Panel */}

      {prediction && (
        <div className="prediction-panel">
          <h4>🔮 Prediction Results</h4>
          <div className="prediction-stats">
            <div className="stat-item">
              <span className="stat-name">Model</span>
              <div className="stat-details">
                <span className="stat-value">{prediction.model}</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-name">Confidence</span>
              <div className="stat-details">
                <span className="stat-value">{Math.round(prediction.confidence * 100)}%</span>
              </div>
            </div>
          </div>
          <p className="prediction-info">{prediction.message}</p>
          <pre style={{ background: '#f9fafb', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
            {JSON.stringify(prediction.predicted_biomass, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

import mongoose from 'mongoose';

const speciesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  trophicLevel: {
    type: String,
    enum: ['producer', 'primary_consumer', 'secondary_consumer', 'tertiary_consumer', 'decomposer'],
    required: true
  },
  biomass: {
    type: Number,
    required: true,
    min: 0
  },
  energy: {
    type: Number,
    required: true,
    min: 0
  },
  population: {
    type: Number,
    default: 0,
    min: 0
  },
  ecosystem: {
    type: String,
    enum: ['grassland', 'forest', 'aquatic', 'desert', 'tundra'],
    default: 'grassland'
  }
}, {
  timestamps: true
});

export default mongoose.model('Species', speciesSchema);

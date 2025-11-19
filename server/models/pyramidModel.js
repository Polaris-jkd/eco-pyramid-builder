import mongoose from 'mongoose';

const pyramidSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  ecosystem: {
    type: String,
    enum: ['grassland', 'forest', 'aquatic', 'desert', 'tundra'],
    default: 'grassland'
  },
  species: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Species'
  }],
  pyramidType: {
    type: String,
    enum: ['energy', 'biomass', 'numbers'],
    default: 'energy'
  },
  totalEnergy: {
    type: Number,
    default: 0
  },
  totalBiomass: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Pyramid', pyramidSchema);

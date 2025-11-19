import express from 'express';
import Species from '../models/speciesModel.js';
import Pyramid from '../models/pyramidModel.js';

const router = express.Router();

// Get all species
router.get('/species', async (req, res) => {
  try {
    const species = await Species.find();
    res.json(species);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new species
router.post('/species', async (req, res) => {
  try {
    const species = new Species(req.body);
    await species.save();
    res.status(201).json(species);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create pyramid
router.post('/pyramids', async (req, res) => {
  try {
    const pyramid = new Pyramid(req.body);
    await pyramid.save();
    res.status(201).json(pyramid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all pyramids
router.get('/pyramids', async (req, res) => {
  try {
    const pyramids = await Pyramid.find().populate('species');
    res.json(pyramids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

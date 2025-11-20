import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import pyramidRoutes from './routes/pyramidRoutes.js';
import fetch from 'node-fetch';
import cors from 'cors'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// CORS MIDDLEWARE
// ============================================
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    // Allow localhost
    if (origin.includes('localhost')) return callback(null, true);
    
    // Allow all Vercel domains
    if (origin.includes('vercel.app')) return callback(null, true);
    
    // Allow all
    return callback(null, true);
  },
  credentials: true
}));

// ============================================
// MIDDLEWARE
// ============================================
app.use(express.json());
app.use('/api', pyramidRoutes);

// ============================================
// CONNECT TO MONGODB
// ============================================
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ============================================
// HEALTH CHECK ROUTE
// ============================================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ============================================
// ML PREDICTION ROUTE (FIXED - ONLY ONE NOW)
// ============================================
app.post('/api/predict', async (req, res) => {
  try {
    const { data } = req.body;
    
    console.log('📊 Prediction request received:', data?.length || 0, 'species');

    // Determine ML service URL based on environment
    const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';
    const mlEndpoint = `${ML_SERVICE_URL}/predict`;
    
    console.log('🤖 Calling ML service at:', mlEndpoint);

    // Call ML service (FastAPI)
    const mlResponse = await fetch(mlEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });
    
    // FIXED: Use mlResponse (not "response")
    if (!mlResponse.ok) {
      const errorText = await mlResponse.text();
      console.error('❌ ML service error:', errorText);
      throw new Error(`ML service returned ${mlResponse.status}: ${errorText}`);
    }
    
    // FIXED: Use mlResponse (not "response")
    const result = await mlResponse.json();
    console.log('✅ ML prediction result:', result);
    
    res.json(result);
    
  } catch (error) {
    console.error('❌ Prediction error:', error.message);
    res.status(500).json({ 
      message: 'Prediction failed',
      error: error.message,
      hint: 'Make sure ML service is running at http://localhost:8000 (local) or set ML_SERVICE_URL env variable (production)'
    });
  }
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => console.log(`✅ Node backend running at http://localhost:${PORT}`));

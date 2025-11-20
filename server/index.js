import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import pyramidRoutes from './routes/pyramidRoutes.js';
import fetch from 'node-fetch';
import cors from 'cors'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//CORS MIDDLEWARE
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

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api', pyramidRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Test route with database status
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Prediction route
app.post("/api/predict", async (req, res) => {
  try {
    res.status(200).send({ 
      message: "Prediction endpoint ready",
      data: req.body 
    });
  } catch (err) {
    res.status(500).send({ 
      error: "Prediction service error", 
      details: err.message 
    });
  }
});

// ML prediction route
app.post('/api/predict', async (req, res) => {
  try {
    const { data } = req.body;
    
    console.log('Prediction request received:', data.length, 'species');

    // Call ML service
    const mlResponse = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });
    
    if (!response.ok) {
      throw new Error('ML service error');
    }
    
    const result = await response.json();
    console.log('ML prediction result:', result);
    
    res.json(result);
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ 
      message: 'Prediction failed',
      error: error.message 
    });
  }
      
});

app.listen(PORT, () => console.log(`✅ Node backend running at http://localhost:${PORT}`));

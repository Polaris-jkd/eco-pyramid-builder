import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

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

app.listen(PORT, () => console.log(`✅ Node backend running at http://localhost:${PORT}`));

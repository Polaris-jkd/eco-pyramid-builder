import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Prediction route (will connect to ML service later)
app.post("/api/predict", async (req, res) => {
  try {
    // Placeholder - will connect to Python ML service later
    res.status(200).send({ 
      message: "Prediction endpoint ready",
      data: req.body 
    });
  } catch (err) {
    res.status(500).send({ error: "Prediction service error", details: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Node backend running at http://localhost:${PORT}`));

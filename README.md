# Ecological Pyramid Builder and Analyzer

An AI-powered web platform for building interactive ecological pyramids with machine learning-based predictions and real-time visualization.

## 🎯 Project Overview

This project is part of the MCA Minor Project for Academic Year 2025-26 at Tecnia Institute of Advanced Studies. It combines ecological theory with modern web technologies and AI/ML to create an interactive tool for ecosystem analysis.

## 🚀 Tech Stack

- **Frontend**: React.js + Vite
- **Backend**: Node.js + Express.js
- **ML Service**: Python + FastAPI
- **Database**: MongoDB Atlas (to be configured)
- **Visualization**: Plotly.js / D3.js
- **Deployment**: Vercel (Frontend) + Render (Backend/ML)

## 📁 Project Structure
eco-pyramid-builder/
├── client/ # React frontend
├── server/ # Node.js backend
├── ml-service/ # Python ML microservice
├── docs/ # Documentation
├── database/ # Seed data
├── deploy/ # Deployment configs
└── scripts/ # Utility scripts


## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- Git

### Frontend Setup
cd client
npm install
npm run dev

Runs on http://localhost:5173

### Backend Setup
cd server
npm install
npm run dev

Runs on http://localhost:5000

### ML Service Setup
cd ml-service
python -m venv venv
venv\Scripts\activate # Windows
pip install -r requirements.txt
uvicorn app:app --reload --port 8000

Runs on http://localhost:8000

## 📊 Features (In Development)

- [ ] Interactive drag-and-drop pyramid builder
- [ ] AI-powered biomass estimation
- [ ] Multi-type pyramid visualization (Energy, Biomass, Numbers)
- [ ] Scenario-based predictive modeling
- [ ] Pre-configured biome templates
- [ ] Export functionality (PDF, PNG)
- [ ] Educational resources and tutorials

## 🤝 Contributing

This is an academic project. Contributions, suggestions, and feedback are welcome!

## 📝 License

MIT License

## 👤 Author

Dhruv Saini  
MCA 2025-27  
Tecnia Institute of Advanced Studies

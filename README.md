# 🌿 Ecological Pyramid Builder & Analyzer

An interactive AI-powered web application for building and visualizing ecological food pyramids with real-time data management and machine learning-based predictions.

**MCA Minor Project (MCA-169) | Academic Year 2025-27**  
Guru Gobind Singh Indraprastha University, Delhi

---

## 🎯 Features

✅ **Interactive Drag & Drop** - Build pyramids by dragging species from the library  
✅ **3 Pyramid Types** - View as Energy, Biomass, or Number pyramids  
✅ **5 Biome Templates** - Pre-configured ecosystems (Grassland, Forest, Aquatic, Desert, Tundra)  
✅ **Environmental Scenarios** - Temperature slider to simulate climate effects  
✅ **Real-time Database** - MongoDB Atlas integration for data persistence  
✅ **Species Management** - Add, remove, and organize organisms by trophic level  
✅ **ML-Powered Predictions** - FastAPI-based prediction service for ecosystem analysis

---

## 🛠️ Technology Stack

### Frontend
- **React 18** with Vite
- **JavaScript ES6+**
- **CSS3** with custom design system
- **Native HTML5 Drag & Drop API**

### Backend
- **Node.js** with Express
- **MongoDB Atlas** for cloud database
- **RESTful API** architecture

### ML Service
- **Python 3.10+**
- **FastAPI** framework
- **Uvicorn** ASGI server
- **NumPy** for numerical computations

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend & ML service hosting

---

## 📁 Project Structure
```
eco-pyramid-builder/
├── client/ # React frontend (Vite)
│ ├── src/
│ │ ├── components/ # Reusable components (Sidebar, Canvas)
│ │ ├── pages/ # Page components (Home, Builder)
│ │ ├── api/ # API integration layer
│ │ ├── data/ # Biome templates & static data
│ │ └── styles/ # Global CSS & design system
│ └── package.json
├── server/ # Node.js backend (Express)
│ ├── models/ # MongoDB schemas
│ ├── routes/ # API routes
│ ├── index.js # Server entry point
│ └── package.json
└── ml-service/ # Python ML service (FastAPI)
├── app.py # FastAPI application
├── requirements.txt # Python dependencies
```
---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB Atlas account
- Git

### 1. Clone the Repository
git clone https://github.com/Polaris-jkd/eco-pyramid-builder.git
cd eco-pyramid-builder

### 2. Setup Backend
cd server
npm install

Create `.env` file:
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development

Start server:
npm run dev
✅ Runs on http://localhost:5000

### 3. Setup Frontend
cd client
npm install
npm run dev
✅ Runs on http://localhost:5173

### 4. Setup ML Service
cd ml-service
python -m venv venv

Windows
venv\Scripts\activate

Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app:app --reload --port 8000
✅ Runs on http://localhost:8000

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **ML Service**: http://localhost:8000

---

## 🎓 Educational Value

This project demonstrates key ecological concepts:

- **10% Energy Transfer Rule** - Only ~10% of energy transfers between trophic levels
- **Trophic Level Organization** - Hierarchical structure from producers to apex predators
- **Ecosystem Balance** - Understanding species interdependence and population dynamics
- **Environmental Impact** - How temperature and climate affect ecosystem stability

---

## 📊 API Endpoints

### Backend (Node.js)
- `GET /api/species` - Fetch all species
- `POST /api/species` - Add new species
- `DELETE /api/species/:id` - Remove species
- `POST /api/predict` - Get ML predictions

### ML Service (Python)
- `GET /` - Health check
- `POST /predict` - Biomass prediction endpoint

---

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set Root Directory: `client`
4. Deploy

### Backend (Render)
1. Create Web Service
2. Set Root Directory: `server`
3. Add environment variables
4. Deploy

### ML Service (Render)
1. Create Web Service
2. Set Root Directory: `ml-service`
3. Set Runtime: Python
4. Deploy

---

## 👨‍💻 Author

**Dhruv Saini**  

---

## 📝 License

MIT License

---

## 📞 Contact

For queries related to this project:
- **Email**: dhruvtias25@gmail.com

---

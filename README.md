# 🌿 Ecological Pyramid Builder & Analyzer

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://eco-pyramid-builder.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-Polaris--jkd-black?style=for-the-badge&logo=github)](https://github.com/Polaris-jkd)

An interactive, AI-powered web application for building and visualizing ecological food pyramids with real-time data management and machine learning-based biomass predictions.

**MCA Minor Project (MCA-169) | Academic Year 2024-25**  
Guru Gobind Singh Indraprastha University, Delhi

---

## 🎯 Features

✅ **Interactive Drag & Drop** - Build pyramids by dragging species from the library  
✅ **3 Pyramid Types** - Visualize as Energy, Biomass, or Number pyramids  
✅ **5 Biome Templates** - Pre-configured ecosystems (Grassland, Forest, Aquatic, Desert, Tundra)  
✅ **Environmental Scenarios** - Temperature slider to simulate climate effects  
✅ **Real-time Database** - MongoDB Atlas integration for species data persistence  
✅ **Species Management** - Add, remove, and organize organisms by trophic level  
✅ **ML-Powered Predictions** - FastAPI-based prediction service for ecosystem analysis  
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices  
✅ **Dark Mode Support** - Automatic theme switching

---

## 🛠️ Technology Stack

### **Frontend**
- **React 18** with Vite
- **JavaScript ES6+**
- **CSS3** with custom design system
- **Native HTML5 Drag & Drop API**
- **React Router** for navigation
- **Axios** for HTTP requests

### **Backend**
- **Node.js 18+** with Express.js
- **MongoDB Atlas** for cloud database
- **Mongoose** for data modeling
- **RESTful API** architecture
- **CORS** enabled

### **ML Service**
- **Python 3.10+**
- **FastAPI** framework
- **Uvicorn** ASGI server
- **NumPy** for numerical computations

### **Deployment**
- **Vercel** - Frontend hosting
- **Render** - Backend & ML service hosting
- **MongoDB Atlas** - Database hosting

---

## 📁 Project Structure
```
eco-pyramid-builder/
├── client/ # React frontend (Vite)
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ │ ├── Navbar.jsx
│ │ │ ├── Footer.jsx
│ │ │ ├── SpeciesSidebar.jsx
│ │ │ └── PyramidCanvas.jsx
│ │ ├── pages/ # Page components
│ │ │ ├── Home.jsx
│ │ │ └── Builder.jsx
│ │ ├── api/ # API integration
│ │ │ └── api.js
│ │ ├── data/ # Static biome templates
│ │ │ └── biomes.js
│ │ ├── styles/ # Global & component styles
│ │ │ ├── global.css
│ │ │ └── footer.css
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
├── server/ # Node.js backend (Express)
│ ├── index.js # Server entry point
│ ├── package.json
│ └── .env.example
│
├── ml-service/ # Python ML service (FastAPI)
│ ├── app.py # FastAPI application
│ ├── requirements.txt
│ └── .env.example
│
├── README.md
└── LICENSE
```
---

## 🚀 Local Setup

### **Prerequisites**
- Node.js 18+ ([Download](https://nodejs.org/))
- Python 3.10+ ([Download](https://www.python.org/))
- MongoDB Atlas account ([Sign up free](https://www.mongodb.com/cloud/atlas/register))
- Git

### **1. Clone the Repository**
git clone https://github.com/Polaris-jkd/eco-pyramid-builder.git
cd eco-pyramid-builder


### **2. Setup Backend (Node.js + Express)**
cd server
npm install

Create `.env` file:

MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173


Start server:
npm run dev

✅ Runs on `http://localhost:5000`

### **3. Setup Frontend (React + Vite)**
cd client
npm install


Create `.env` file:

VITE_API_URL=http://localhost:5000


Start development server:
npm run dev

✅ Runs on `http://localhost:5173`

### **4. Setup ML Service (Python + FastAPI)**
cd ml-service
python -m venv venv

Windows
venv\Scripts\activate

Mac/Linux
source venv/bin/activate

pip install -r requirements.txt


Create `.env` file (optional):
MODEL_VERSION=1.0


Start service:
uvicorn app:app --reload --port 8000


✅ Runs on `http://localhost:8000`

### **5. Access the Application**

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
- **Biomass Pyramids** - Visualizing inverted pyramids in aquatic ecosystems
- **Food Chain Dynamics** - Predator-prey relationships and energy flow

---

## 📊 API Endpoints

### **Backend (Node.js - Port 5000)**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/species` | Fetch all species |
| POST | `/api/species` | Add new species |
| DELETE | `/api/species/:id` | Remove species |
| POST | `/api/predict` | Proxy to ML prediction service |
| GET | `/api/health` | Health check |

### **ML Service (Python - Port 8000)**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/predict` | Biomass prediction endpoint |
| GET | `/docs` | Auto-generated API documentation |

---

## 🚀 Deployment Guide

### **Frontend (Vercel)**

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set **Root Directory**: `client`
4. Add environment variable:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com`
5. Deploy ✅

### **Backend (Render)**

1. Create Web Service on [Render](https://render.com)
2. Set **Root Directory**: `server`
3. Add environment variables:
   - `MONGODB_URI`
   - `NODE_ENV=production`
   - `ALLOWED_ORIGINS` = `https://your-frontend-url.vercel.app`
4. Deploy ✅

### **ML Service (Render)**

1. Create Web Service on Render
2. Set **Root Directory**: `ml-service`
3. Set **Runtime**: Python 3.10
4. Deploy ✅

---


## 👨‍💻 Author

**Dhruv Saini**  

[![GitHub](https://img.shields.io/badge/GitHub-Polaris--jkd-black?logo=github)](https://github.com/Polaris-jkd)
[![Email](https://img.shields.io/badge/Email-dhruvtias25%40gmail.com-red?logo=gmail)](mailto:dhruvtias25@gmail.com)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

For queries related to this project:
- **Email**: dhruvtias25@gmail.com
- **GitHub Issues**: [Report a bug](https://github.com/Polaris-jkd/eco-pyramid-builder/issues)

---

**Made with ❤️ for ecological education**







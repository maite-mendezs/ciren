cirén
A cycle tracking app that helps you understand how your menstrual cycle shapes your energy, mood, and mind every day.

Stack
Frontend - React + Vite, served as static files from Express
Backend - Node.js + Express
Database - SQLite via better-sqlite3
Auth - Google OAuth 2.0 + email/password via passport.js
Hosting - Railway (single service, one domain)

Project structure
ciren/
├── frontend/          React app
│   ├── public/        Static assets (logo.png)
│   └── src/
│       ├── components/
│       │   ├── AuthScreen.jsx
│       │   ├── Onboarding.jsx
│       │   ├── innovative.jsx   main app shell + all tabs
│       │   └── shared.jsx       design system + shared components
│       ├── api.js               all API calls
│       ├── main.jsx             app entry point + auth routing
│       └── index.css
└── backend/
    ├── middleware/
    │   └── requireAuth.js
    ├── routes/
    │   ├── auth.js
    │   ├── settings.js
    │   └── logs.js
    ├── db.js                    SQLite setup + migrations
    └── server.js                Express server + static file serving

Environment variables
Set these in Railway under Variables:
VariableDescriptionNODE_ENVSet to productionFRONTEND_URLhttps://ciren-production.up.railway.appGOOGLE_CLIENT_IDFrom Google Cloud ConsoleGOOGLE_CLIENT_SECRETFrom Google Cloud ConsoleGOOGLE_CALLBACK_URLhttps://ciren-production.up.railway.app/api/auth/google/callbackSESSION_SECRETA long random stringRESEND_API_KEYFor transactional emails
Running locally

Clone the repo
Create backend/.env with the variables above, pointing FRONTEND_URL to http://localhost:5173 and GOOGLE_CALLBACK_URL to http://localhost:3001/api/auth/google/callback
Start the backend: cd backend && npm install && npm run dev
Start the frontend: cd frontend && npm install && npm run dev
Open http://localhost:5173

Deployment
Hosted on Railway as a single service. On every push to main:

Railway builds the React frontend from the repo root
Express serves the built frontend as static files
All API routes and the frontend live on the same domain

Build command: cd frontend && npm install && npm run build && cd ../backend && npm install
Start command: cd backend && node server.js

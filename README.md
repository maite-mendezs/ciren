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
│       │   ├── AuthScreen.jsx   login + signup screens
│       │   ├── Onboarding.jsx   first-run onboarding flow
│       │   ├── innovative.jsx   main app shell (CirénApp), all tab components
│       │   │                    (InnoHome, InnoCalendar, InnoProfile, InnoLog,
│       │   │                    InnoLogDrawer, DayLogDrawer), cycle state logic,
│       │   │                    and personalised insight engine
│       │   └── shared.jsx       design system: tokens, BottomTabBar, ProfileTab,
│       │                        PrimaryBtn, Toast, LegalDrawer, and base log chips
│       ├── api.js               all API calls
│       ├── main.jsx             app entry point, auth check, splash screen
│       └── index.css            global layout and mobile viewport styles
└── backend/
    ├── middleware/
    │   └── requireAuth.js
    ├── routes/
    │   ├── auth.js
    │   ├── settings.js
    │   └── logs.js
    ├── db.js                    SQLite setup + migrations
    └── server.js                Express server + static file serving

Architecture decisions

Cycle state is derived from logs, not just settings
computeCycleState accepts the full logs array alongside the user's settings. It scans logged flow entries (Light, Medium, Heavy) to find the most recent consecutive period sequence and uses its start date if it is more recent than the lastPeriodStart stored in settings. If no new period has been logged and the predicted cycle length has been exceeded, the cycle day count extends rather than wrapping, so the app reflects a late period rather than silently resetting.

Personalised insights are built from per-phase log history
getPersonalizedTip looks at all historical logs, filters to entries that fell in the same phase as today (using the settings cycle anchor to approximate each day's phase), counts value frequencies per category, and returns the tip for the most common pattern. This means the Food, Mood, Mind, Move, and Sleep tips get more relevant over time as the user logs more cycles. If no history exists for a category in the current phase, it falls back to today's log, then to null so the generic phase insight shows instead.

Sessions are persisted in SQLite
Express sessions use better-sqlite3-session-store backed by the same SQLite database as the rest of the app. This means sessions survive server restarts without needing a separate Redis instance, which keeps the Railway deployment to a single service.

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

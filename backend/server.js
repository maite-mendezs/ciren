require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const session  = require('express-session');
const passport = require('passport');
const Database = require('better-sqlite3');
const SqliteStore = require('better-sqlite3-session-store')(session);
const path = require('path');

const app = express();
app.set('trust proxy', 1);
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

const sessionDb = new Database('./sessions.db');
app.use(session({
  store: new SqliteStore({ client: sessionDb }),
  secret:            process.env.SESSION_SECRET || 'ciren-dev-secret',
  resave:            false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', secure: process.env.NODE_ENV === "production", maxAge: 30 * 24 * 60 * 60 * 1000 },
}));

app.use(passport.initialize());
app.use(passport.session());

const requireAuth = require('./middleware/requireAuth');

// Auth routes (public — no requireAuth)
app.use('/api/auth', require('./routes/auth'));

// Protected routes
app.use('/api/settings', requireAuth, require('./routes/settings'));
app.use('/api/logs',     requireAuth, require('./routes/logs'));

// DEV ONLY — remove before production
const db = require('./db');
app.delete('/api/reset-onboarding', requireAuth, (req, res) => {
  db.prepare('UPDATE users SET is_onboarded = 0 WHERE id = 1').run();
  res.json({ ok: true });
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

const PORT = process.env.PORT || 3001;

// Catch-all: serve React app for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => console.log(`cirén API → http://localhost:${PORT}`));

require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const session  = require('express-session');
const passport = require('passport');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({
  secret:            process.env.SESSION_SECRET || 'ciren-dev-secret',
  resave:            false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 30 * 24 * 60 * 60 * 1000 },
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`cirén API → http://localhost:${PORT}`));

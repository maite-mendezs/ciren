const express  = require('express');
const passport = require('passport');
const bcrypt   = require('bcryptjs');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const db = require('../db');

const router = express.Router();

passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback',
}, (_accessToken, _refreshToken, profile, done) => {
  const googleId = profile.id;
  const email    = profile.emails?.[0]?.value  || '';
  const avatar   = profile.photos?.[0]?.value  || '';
  const name     = profile.displayName         || 'Me';

  let user = db.prepare('SELECT * FROM users WHERE google_id = ?').get(googleId);

  if (!user) {
    const existing = email ? db.prepare('SELECT * FROM users WHERE email = ?').get(email) : null;
    if (existing) {
      db.prepare('UPDATE users SET google_id = ?, avatar = ? WHERE id = ?').run(googleId, avatar, existing.id);
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(existing.id);
    } else {
      const result = db.prepare('INSERT INTO users (name, email, avatar, google_id) VALUES (?, ?, ?, ?)').run(name, email, avatar, googleId);
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
    }
  }

  return done(null, user || false);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  done(null, user || false);
});

router.post('/signup', async (req, res) => {
  const { email, password, name }
cat > ~/ciren/backend/routes/auth.js << 'EOF'
const express  = require('express');
const passport = require('passport');
const bcrypt   = require('bcryptjs');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const db = require('../db');

const router = express.Router();

passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback',
}, (_accessToken, _refreshToken, profile, done) => {
  const googleId = profile.id;
  const email    = profile.emails?.[0]?.value  || '';
  const avatar   = profile.photos?.[0]?.value  || '';
  const name     = profile.displayName         || 'Me';

  let user = db.prepare('SELECT * FROM users WHERE google_id = ?').get(googleId);

  if (!user) {
    const existing = email ? db.prepare('SELECT * FROM users WHERE email = ?').get(email) : null;
    if (existing) {
      db.prepare('UPDATE users SET google_id = ?, avatar = ? WHERE id = ?').run(googleId, avatar, existing.id);
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(existing.id);
    } else {
      const result = db.prepare('INSERT INTO users (name, email, avatar, google_id) VALUES (?, ?, ?, ?)').run(name, email, avatar, googleId);
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
    }
  }

  return done(null, user || false);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  done(null, user || false);
});

router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
  const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (existing) return res.status(400).json({ error: 'An account with this email already exists' });
  const hash = await bcrypt.hash(password, 10);
  const result = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)').run(name || 'Me', email, hash);
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
  req.session.userId = user.id;
  res.json({ ok: true, isOnboarded: user.is_onboarded === 1 });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !user.password_hash) return res.status(401).json({ error: 'Invalid email or password' });
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: 'Invalid email or password' });
  req.session.userId = user.id;
  res.json({ ok: true, isOnboarded: user.is_onboarded === 1 });
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/?auth=failed` }),
  (req, res) => {
    req.session.userId = req.user.id;
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
  }
);

router.get('/me', (req, res) => {
  if (!req.session?.userId) return res.status(401).json({ error: 'Unauthorized' });
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.session.userId);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  res.json({ name: user.name, email: user.email || '', avatar: user.avatar || '', isOnboarded: user.is_onboarded === 1 });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.clearCookie('connect.sid').json({ ok: true }));
});

module.exports = router;

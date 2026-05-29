const express  = require('express');
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const db = require('../db');

const router = express.Router();

// ─── Passport strategy ────────────────────────────────────────────────────────

passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  'http://localhost:3001/api/auth/google/callback',
}, (_accessToken, _refreshToken, profile, done) => {
  const googleId = profile.id;
  const email    = profile.emails?.[0]?.value  || '';
  const avatar   = profile.photos?.[0]?.value  || '';
  const name     = profile.displayName         || 'Me';

  // Try to find existing user by google_id
  let user = db.prepare('SELECT * FROM users WHERE google_id = ?').get(googleId);

  if (!user) {
    // First Google login: bind Google identity to the single user row
    db.prepare(`
      UPDATE users SET google_id = ?, email = ?, avatar = ?, name = ?
      WHERE id = 1 AND google_id IS NULL
    `).run(googleId, email, avatar, name);
    user = db.prepare('SELECT * FROM users WHERE id = 1').get();
  }

  return done(null, user || false);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  done(null, user || false);
});

// ─── Routes ───────────────────────────────────────────────────────────────────

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/?auth=failed' }),
  (req, res) => {
    req.session.userId = req.user.id;
    res.redirect('http://localhost:5173');
  }
);

router.get('/me', (req, res) => {
  if (!req.session?.userId) return res.status(401).json({ error: 'Unauthorized' });
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.session.userId);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  res.json({
    name:        user.name,
    email:       user.email    || '',
    avatar:      user.avatar   || '',
    isOnboarded: user.is_onboarded === 1,
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.clearCookie('connect.sid').json({ ok: true }));
});

module.exports = router;

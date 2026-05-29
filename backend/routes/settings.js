const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = 1').get();
  res.json({
    name: user.name,
    cycleLength: user.cycle_length,
    periodLength: user.period_length,
    lastPeriodStart: user.last_period_start,
    isOnboarded: user.is_onboarded === 1,
    isIrregular: user.is_irregular === 1,
  });
});

router.put('/', (req, res) => {
  try {
    const { name, cycleLength, periodLength, lastPeriodStart, isOnboarded, isIrregular } = req.body;
    const cols = [];
    const vals = [];
    if (name            !== undefined) { cols.push('name = ?');              vals.push(name); }
    if (cycleLength     !== undefined) { cols.push('cycle_length = ?');      vals.push(cycleLength); }
    if (periodLength    !== undefined) { cols.push('period_length = ?');     vals.push(periodLength); }
    if (lastPeriodStart !== undefined) { cols.push('last_period_start = ?'); vals.push(lastPeriodStart ?? null); }
    if (isOnboarded     !== undefined) { cols.push('is_onboarded = ?');      vals.push(isOnboarded ? 1 : 0); }
    if (isIrregular     !== undefined) { cols.push('is_irregular = ?');      vals.push(isIrregular ? 1 : 0); }
    if (cols.length === 0) return res.json({ ok: true });
    db.prepare(`UPDATE users SET ${cols.join(', ')} WHERE id = 1`).run(...vals);
    res.json({ ok: true });
  } catch (err) {
    console.error('[settings PUT]', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

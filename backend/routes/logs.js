const express = require('express');
const router = express.Router();
const db = require('../db');

const ARRAY_FIELDS = ['cravings', 'mood', 'mind', 'symptoms', 'movement'];
const STRING_FIELDS = ['flow', 'sleep'];

function parseLog(row) {
  if (!row) return null;
  const result = { date: row.date };
  for (const f of STRING_FIELDS) {
    result[f] = row[f] ?? '';
  }
  for (const f of ARRAY_FIELDS) {
    try { result[f] = JSON.parse(row[f] ?? 'null') || []; }
    catch { result[f] = []; }
  }
  return result;
}

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM logs WHERE user_id = ? ORDER BY date DESC').all(req.session.userId);
  res.json(rows.map(parseLog));
});

router.get('/:date', (req, res) => {
  const row = db.prepare('SELECT * FROM logs WHERE user_id = ? AND date = ?').get(req.session.userId, req.params.date);
  res.json(parseLog(row));
});

router.post('/:date', (req, res) => {
  const { date } = req.params;
  const b = req.body;
  db.prepare(`
    INSERT INTO logs (user_id, date, flow, cravings, mood, mind, symptoms, movement, sleep)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id, date) DO UPDATE SET
      flow      = excluded.flow,
      cravings  = excluded.cravings,
      mood      = excluded.mood,
      mind      = excluded.mind,
      symptoms  = excluded.symptoms,
      movement  = excluded.movement,
      sleep     = excluded.sleep
  `).run(
    req.session.userId,
    date,
    b.flow     ?? '',
    JSON.stringify(b.cravings  ?? []),
    JSON.stringify(b.mood      ?? []),
    JSON.stringify(b.mind      ?? []),
    JSON.stringify(b.symptoms  ?? []),
    JSON.stringify(b.movement  ?? []),
    b.sleep    ?? '',
  );
  res.json({ ok: true });
});

module.exports = router;

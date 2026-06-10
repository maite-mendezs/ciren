const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'ciren.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT    NOT NULL DEFAULT 'Me',
    cycle_length  INTEGER NOT NULL DEFAULT 28,
    period_length INTEGER NOT NULL DEFAULT 5,
    last_period_start TEXT,
    is_onboarded  INTEGER NOT NULL DEFAULT 0,
    is_irregular  INTEGER NOT NULL DEFAULT 0,
    google_id     TEXT,
    email         TEXT,
    avatar        TEXT,
    password_hash TEXT
  );

  CREATE TABLE IF NOT EXISTS logs (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id  INTEGER NOT NULL,
    date     TEXT    NOT NULL,
    flow     TEXT,
    cravings TEXT,
    mood     TEXT,
    mind     TEXT,
    symptoms TEXT,
    movement TEXT,
    sleep    TEXT,
    UNIQUE(user_id, date)
  );
`);

// Idempotent column migrations
try { db.exec(`ALTER TABLE users ADD COLUMN is_onboarded INTEGER NOT NULL DEFAULT 0`); } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN is_irregular INTEGER NOT NULL DEFAULT 0`); } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN google_id TEXT`); } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN email TEXT`); } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN avatar TEXT`); } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN password_hash TEXT`); } catch {}
try { db.exec(`ALTER TABLE logs ADD COLUMN user_id INTEGER NOT NULL DEFAULT 1`); } catch {}
try { db.exec(`ALTER TABLE logs ADD COLUMN cravings TEXT`); } catch {}
try { db.exec(`ALTER TABLE logs ADD COLUMN mind TEXT`); } catch {}
try { db.exec(`ALTER TABLE logs ADD COLUMN sleep TEXT`); } catch {}

module.exports = db;

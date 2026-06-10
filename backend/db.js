const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'ciren.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id                INTEGER PRIMARY KEY DEFAULT 1,
    name              TEXT    NOT NULL DEFAULT 'Me',
    cycle_length      INTEGER NOT NULL DEFAULT 28,
    period_length     INTEGER NOT NULL DEFAULT 5,
    last_period_start TEXT,
    is_onboarded      INTEGER NOT NULL DEFAULT 0,
    is_irregular      INTEGER NOT NULL DEFAULT 0,
    google_id         TEXT,
    email             TEXT,
    avatar            TEXT
  );

  INSERT OR IGNORE INTO users (id) VALUES (1);

  CREATE TABLE IF NOT EXISTS logs (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    date     TEXT    NOT NULL UNIQUE,
    flow     TEXT,
    cravings TEXT,
    mood     TEXT,
    mind     TEXT,
    symptoms TEXT,
    movement TEXT,
    sleep    TEXT
  );
`);

// Idempotent column migrations for databases created before onboarding was added
try { db.exec(`ALTER TABLE users ADD COLUMN is_onboarded INTEGER NOT NULL DEFAULT 0`); } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN is_irregular INTEGER NOT NULL DEFAULT 0`); } catch {}

// Google OAuth columns
try { db.exec(`ALTER TABLE users ADD COLUMN google_id TEXT`); } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN email TEXT`); } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN avatar TEXT`); } catch {}

// Idempotent column migrations for new logs schema
try { db.exec(`ALTER TABLE logs ADD COLUMN cravings TEXT`); } catch {}
try { db.exec(`ALTER TABLE logs ADD COLUMN mind TEXT`); } catch {}
try { db.exec(`ALTER TABLE logs ADD COLUMN sleep TEXT`); } catch {}

// Drop orphan columns from logs (activity, drive, lifestyle) left over from old schema
try {
  const logCols = db.prepare(`SELECT name FROM pragma_table_info('logs')`).all().map(r => r.name);
  if (['activity', 'drive', 'lifestyle'].some(c => logCols.includes(c))) {
    db.exec(`
      BEGIN;
      DROP TABLE IF EXISTS logs_old;
      ALTER TABLE logs RENAME TO logs_old;
      CREATE TABLE logs (
        id       INTEGER PRIMARY KEY AUTOINCREMENT,
        date     TEXT    NOT NULL UNIQUE,
        flow     TEXT,
        cravings TEXT,
        mood     TEXT,
        mind     TEXT,
        symptoms TEXT,
        movement TEXT,
        sleep    TEXT
      );
      INSERT INTO logs (id, date, flow, cravings, mood, mind, symptoms, movement, sleep)
        SELECT id, date, flow, cravings, mood, mind, symptoms, movement, sleep FROM logs_old;
      DROP TABLE logs_old;
      COMMIT;
    `);
    console.log('[db] removed orphan columns from logs table');
  }
} catch (e) { console.error('[db] logs cleanup error:', e.message); }

// Remove NOT NULL constraint from last_period_start so it can be null (skipped onboarding)
// SQLite requires a full table recreation to drop a column constraint
try {
  const col = db.prepare(`SELECT "notnull" FROM pragma_table_info('users') WHERE name = 'last_period_start'`).get();
  if (col && col.notnull === 1) {
    db.exec(`
      BEGIN;
      DROP TABLE IF EXISTS users_old;
      ALTER TABLE users RENAME TO users_old;
      CREATE TABLE users (
        id                INTEGER PRIMARY KEY DEFAULT 1,
        name              TEXT    NOT NULL DEFAULT 'Me',
        cycle_length      INTEGER NOT NULL DEFAULT 28,
        period_length     INTEGER NOT NULL DEFAULT 5,
        last_period_start TEXT,
        is_onboarded      INTEGER NOT NULL DEFAULT 0,
        is_irregular      INTEGER NOT NULL DEFAULT 0,
        google_id         TEXT,
        email             TEXT,
        avatar            TEXT
      );
      INSERT INTO users
        SELECT id, name, cycle_length, period_length, last_period_start,
               is_onboarded, is_irregular, google_id, email, avatar
        FROM users_old;
      DROP TABLE users_old;
      COMMIT;
    `);
    console.log('[db] migrated last_period_start to nullable');
  }
} catch (e) { console.error('[db] migration error:', e.message); }

// Mark any user who already customised their name as having completed onboarding
db.prepare(`UPDATE users SET is_onboarded = 1 WHERE id = 1 AND name != 'Me'`).run();

module.exports = db;

// Email/password auth column
try { db.exec(`ALTER TABLE users ADD COLUMN password_hash TEXT`); } catch {}

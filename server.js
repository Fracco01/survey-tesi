/**
 * BACKEND — Social Media & Adolescenti
 * Stack: Node.js + Express + SQLite
 * 
 * INSTALLAZIONE:
 *   npm install
 *   node server.js
 * 
 * ENDPOINTS:
 *   POST /api/response        → salva risposta
 *   GET  /api/stats           → dati aggregati per grafici
 *   GET  /api/export/csv      → esporta CSV completo
 *   GET  /api/health          → status server
 */

const express    = require('express');
const Database   = require('better-sqlite3');
const cors       = require('cors');
const path       = require('path');
const fs         = require('fs');

const app  = express();
const PORT = process.env.PORT || 3001;

// ─── MIDDLEWARE ────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, '../frontend')));

// ─── DATABASE ─────────────────────────────────
const db = new Database(path.join(__dirname, 'survey.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS responses (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id  TEXT NOT NULL,
    profile     TEXT NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Pagina 2: dati demografici
    age         INTEGER,
    socials     TEXT,   -- JSON array ["instagram","tiktok",...]

    -- Risposte domande (JSON per flessibilità)
    answers     TEXT,   -- JSON { "q1": "A", "q2": "B", ... }

    -- Domanda aperta
    open_answer TEXT
  );

  CREATE TABLE IF NOT EXISTS partial_responses (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id  TEXT UNIQUE NOT NULL,
    profile     TEXT,
    data        TEXT,   -- JSON parziale, aggiornato step by step
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// ─── DOMANDE (specchio del frontend) ──────────
const QUESTIONS = require('./questions.js');

// ─── ROUTES ───────────────────────────────────

// Salvataggio parziale (auto-save step by step)
app.post('/api/partial', (req, res) => {
  const { session_id, profile, data } = req.body;
  if (!session_id) return res.status(400).json({ error: 'session_id required' });

  const stmt = db.prepare(`
    INSERT INTO partial_responses (session_id, profile, data, updated_at)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(session_id) DO UPDATE SET
      profile    = excluded.profile,
      data       = excluded.data,
      updated_at = excluded.updated_at
  `);
  stmt.run(session_id, profile, JSON.stringify(data));
  res.json({ ok: true });
});

// Recupera dati parziali (resume survey)
app.get('/api/partial/:session_id', (req, res) => {
  const row = db.prepare(
    'SELECT * FROM partial_responses WHERE session_id = ?'
  ).get(req.params.session_id);
  if (!row) return res.json({ found: false });
  res.json({ found: true, profile: row.profile, data: JSON.parse(row.data) });
});

// Salvataggio finale
app.post('/api/response', (req, res) => {
  const { session_id, profile, age, socials, answers, open_answer } = req.body;

  if (!session_id || !profile) {
    return res.status(400).json({ error: 'Campi obbligatori mancanti' });
  }

  // Verifica duplicati
  const exists = db.prepare(
    'SELECT id FROM responses WHERE session_id = ?'
  ).get(session_id);
  if (exists) {
    return res.json({ ok: true, duplicate: true, id: exists.id });
  }

  const stmt = db.prepare(`
    INSERT INTO responses (session_id, profile, age, socials, answers, open_answer)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    session_id,
    profile,
    age || null,
    JSON.stringify(socials || []),
    JSON.stringify(answers || {}),
    open_answer || null
  );

  // Elimina parziale
  db.prepare('DELETE FROM partial_responses WHERE session_id = ?').run(session_id);

  res.json({ ok: true, id: result.lastInsertRowid });
});

// Stats aggregate per grafici
app.get('/api/stats', (req, res) => {
  const rows = db.prepare('SELECT * FROM responses').all();

  const stats = {
    total:    rows.length,
    profiles: {},
    ages:     {},
    socials:  {},
    questions: {},
    open_answers: []
  };

  rows.forEach(row => {
    // Profili
    stats.profiles[row.profile] = (stats.profiles[row.profile] || 0) + 1;

    // Età
    if (row.age) {
      const bucket = row.age < 18 ? '<18' :
                     row.age < 25 ? '18-24' :
                     row.age < 35 ? '25-34' :
                     row.age < 50 ? '35-49' : '50+';
      stats.ages[bucket] = (stats.ages[bucket] || 0) + 1;
    }

    // Social usati
    const socials = JSON.parse(row.socials || '[]');
    socials.forEach(s => {
      stats.socials[s] = (stats.socials[s] || 0) + 1;
    });

    // Risposte per domanda
    const answers = JSON.parse(row.answers || '{}');
    Object.entries(answers).forEach(([qid, answer]) => {
      if (!stats.questions[qid]) stats.questions[qid] = {};
      const key = `${row.profile}__${answer}`;
      stats.questions[qid][key] = (stats.questions[qid][key] || 0) + 1;
    });

    // Risposte aperte
    if (row.open_answer) {
      stats.open_answers.push({
        profile: row.profile,
        text: row.open_answer,
        date: row.created_at
      });
    }
  });

  res.json(stats);
});

// Export CSV
app.get('/api/export/csv', (req, res) => {
  const rows = db.prepare('SELECT * FROM responses ORDER BY created_at').all();

  const headers = ['id','session_id','profile','age','socials','answers','open_answer','created_at'];
  const csv = [
    headers.join(','),
    ...rows.map(r => headers.map(h => {
      const val = r[h] ?? '';
      return `"${String(val).replace(/"/g,'""')}"`;
    }).join(','))
  ].join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="survey_data.csv"');
  res.send('\uFEFF' + csv); // BOM per Excel
});

// Health check
app.get('/api/health', (req, res) => {
  const count = db.prepare('SELECT COUNT(*) as n FROM responses').get();
  res.json({ status: 'ok', responses: count.n, timestamp: new Date().toISOString() });
});

// Serve frontend per qualsiasi altra route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ─── START ────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  ┌─────────────────────────────────────┐`);
  console.log(`  │  Survey Server attivo               │`);
  console.log(`  │  http://localhost:${PORT}              │`);
  console.log(`  │  API: http://localhost:${PORT}/api     │`);
  console.log(`  └─────────────────────────────────────┘\n`);
});

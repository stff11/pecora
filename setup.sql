-- Run this in your Neon SQL editor to create the announcements table

CREATE TABLE IF NOT EXISTS announcements (
  id         SERIAL PRIMARY KEY,
  message    TEXT NOT NULL,
  created_at DATE DEFAULT CURRENT_DATE,
  active     BOOLEAN DEFAULT true,
  "from"     TEXT
);

-- Optional: seed with initial announcements
INSERT INTO announcements (message, "from", active) VALUES
  ('Martedì & Giovedì – Danza Sudamericana con Max & Angelika', 'Admin', true),
  ('Mercoledì – Torneo di Boccette con Davide & Gianluca',       'Admin', true),
  ('Sabato – Scacchi con Sarah & Fabio',                          'Admin', true),
  ('Porto Torres · Via Lussu · Circolo La Pecora Nera',           'Admin', true);

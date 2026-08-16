CREATE TABLE IF NOT EXISTS client_requests (
  id TEXT PRIMARY KEY,
  service TEXT NOT NULL,
  description TEXT NOT NULL,
  desired_date DATE,
  has_material BOOLEAN NOT NULL DEFAULT FALSE,
  material_notes TEXT,
  wants_content BOOLEAN NOT NULL DEFAULT FALSE,
  urgency TEXT NOT NULL DEFAULT 'normal',
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_whatsapp TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'novo',
  confirmed_due_date DATE,
  revisions_used INTEGER NOT NULL DEFAULT 0,
  consented_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS client_requests_email_idx ON client_requests (LOWER(client_email));
CREATE INDEX IF NOT EXISTS client_requests_status_idx ON client_requests (status);

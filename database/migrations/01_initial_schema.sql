-- IBD Client Portal 2026 — Initial Schema Migration
-- Author: IBD Engineering
-- Description: Core tables for Aquisição (prospects), Relacionamento (clients) and Execução (projects).

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  auth_user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'client')),
  display_name TEXT NOT NULL,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. PROSPECTS (Aquisição)
CREATE TABLE IF NOT EXISTS prospects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  service TEXT NOT NULL,
  need_description TEXT NOT NULL,
  desired_deadline DATE,
  stage TEXT NOT NULL DEFAULT 'novo_lead' CHECK (
    stage IN (
      'novo_lead',
      'manual_enviado',
      'briefing_em_andamento',
      'briefing_concluido',
      'proposta_em_preparo',
      'proposta_enviada',
      'negociacao',
      'contrato_fechado',
      'convertido',
      'descartado'
    )
  ),
  consent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  converted_client_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PROSPECT BRIEFINGS
CREATE TABLE IF NOT EXISTS prospect_briefings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id TEXT NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  version INT NOT NULL DEFAULT 1,
  responses JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'em_andamento' CHECK (status IN ('em_andamento', 'concluido')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PROPOSALS
CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id TEXT NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  version INT NOT NULL DEFAULT 1,
  title TEXT NOT NULL,
  scope TEXT NOT NULL,
  price NUMERIC(12, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'BRL',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  valid_until DATE,
  sent_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  rejected_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CONTRACTS
CREATE TABLE IF NOT EXISTS contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id TEXT NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'signed', 'cancelled')),
  signed_at TIMESTAMPTZ,
  start_date DATE,
  file_path TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. CLIENTS (Relacionamento)
CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  prospect_id TEXT REFERENCES prospects(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  whatsapp TEXT NOT NULL,
  company_name TEXT,
  status TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'arquivado')),
  portal_enabled BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. PROJECTS (Execução)
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  service TEXT NOT NULL,
  scope_description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'solicitacao_recebida' CHECK (
    status IN (
      'solicitacao_recebida',
      'briefing_em_andamento',
      'briefing_aprovado',
      'aguardando_material',
      'aguardando_inicio',
      'em_producao',
      'versao_enviada',
      'aguardando_retorno',
      'revisao_em_andamento',
      'pausado',
      'concluido',
      'cancelado'
    )
  ),
  desired_deadline DATE,
  estimated_deadline DATE,
  confirmed_deadline DATE,
  deadline_confirmed_at TIMESTAMPTZ,
  revisions_count INT NOT NULL DEFAULT 0,
  revisions_limit INT NOT NULL DEFAULT 2,
  paused_at TIMESTAMPTZ,
  last_return_request_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. PROJECT MATERIALS
CREATE TABLE IF NOT EXISTS project_materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  required BOOLEAN NOT NULL DEFAULT true,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'recebido', 'aprovado', 'dispensado')),
  storage_path TEXT,
  original_filename TEXT,
  mime_type TEXT,
  file_size BIGINT,
  uploaded_by TEXT,
  uploaded_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. PROJECT REVISIONS
CREATE TABLE IF NOT EXISTS project_revisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  round_number INT NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'aberta' CHECK (status IN ('aberta', 'aguardando_cliente', 'em_execucao', 'concluida')),
  version_sent_at TIMESTAMPTZ,
  feedback_received_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. PROJECT MESSAGES
CREATE TABLE IF NOT EXISTS project_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  direction TEXT NOT NULL CHECK (direction IN ('studio_para_cliente', 'cliente_para_studio', 'sistema')),
  message_type TEXT NOT NULL CHECK (
    message_type IN ('comment', 'system', 'status_change', 'revision_feedback', 'email', 'whatsapp', 'notification')
  ),
  channel TEXT NOT NULL DEFAULT 'portal' CHECK (channel IN ('portal', 'email', 'whatsapp', 'system')),
  message TEXT NOT NULL,
  created_by TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. ACTIVITY LOG
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id TEXT,
  actor_type TEXT NOT NULL CHECK (actor_type IN ('user', 'system', 'admin', 'client')),
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  event TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_prospects_stage ON prospects(stage);
CREATE INDEX IF NOT EXISTS idx_clients_auth ON clients(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_materials_project ON project_materials(project_id);
CREATE INDEX IF NOT EXISTS idx_revisions_project ON project_revisions(project_id);
CREATE INDEX IF NOT EXISTS idx_messages_project ON project_messages(project_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_entity ON activity_log(entity_type, entity_id);

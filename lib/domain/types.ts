export type UserRole = "admin" | "client";

export type LeadStage =
  | "novo_lead"
  | "manual_enviado"
  | "briefing_em_andamento"
  | "briefing_concluido"
  | "proposta_em_preparo"
  | "proposta_enviada"
  | "negociacao"
  | "contrato_fechado"
  | "convertido"
  | "descartado";

export type ClientStatus = "ativo" | "inativo" | "arquivado";

export type ProjectStatus =
  | "solicitacao_recebida"
  | "briefing_em_andamento"
  | "briefing_aprovado"
  | "aguardando_material"
  | "aguardando_inicio"
  | "em_producao"
  | "versao_enviada"
  | "aguardando_retorno"
  | "revisao_em_andamento"
  | "pausado"
  | "concluido"
  | "cancelado";

export type ProposalStatus = "draft" | "sent" | "accepted" | "rejected" | "expired";

export type ContractStatus = "draft" | "sent" | "signed" | "cancelled";

export type MaterialStatus = "pendente" | "recebido" | "aprovado" | "dispensado";

export type RevisionStatus = "aberta" | "aguardando_cliente" | "em_execucao" | "concluida";

export type MessageDirection = "studio_para_cliente" | "cliente_para_studio" | "sistema";

export type MessageType =
  | "comment"
  | "system"
  | "status_change"
  | "revision_feedback"
  | "email"
  | "whatsapp"
  | "notification";

export type MessageChannel = "portal" | "email" | "whatsapp" | "system";

export interface Profile {
  auth_user_id: string;
  role: UserRole;
  display_name: string;
  email?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Prospect {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  service: string;
  need_description: string;
  desired_deadline?: string | null;
  stage: LeadStage;
  consent_at: string;
  converted_client_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProspectBriefing {
  id: string;
  prospect_id: string;
  version: number;
  responses: Record<string, unknown>;
  status: "em_andamento" | "concluido";
  started_at: string;
  completed_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  prospect_id: string;
  version: number;
  title: string;
  scope: string;
  price: number;
  currency: string;
  status: ProposalStatus;
  valid_until?: string | null;
  sent_at?: string | null;
  accepted_at?: string | null;
  rejected_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Contract {
  id: string;
  prospect_id: string;
  proposal_id?: string | null;
  status: ContractStatus;
  signed_at?: string | null;
  start_date?: string | null;
  file_path?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  auth_user_id?: string | null;
  prospect_id?: string | null;
  name: string;
  email: string;
  whatsapp: string;
  company_name?: string | null;
  status: ClientStatus;
  portal_enabled: boolean;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  title: string;
  service: string;
  scope_description: string;
  status: ProjectStatus;
  desired_deadline?: string | null;
  estimated_deadline?: string | null;
  confirmed_deadline?: string | null;
  deadline_confirmed_at?: string | null;
  revisions_count: number;
  revisions_limit: number;
  paused_at?: string | null;
  last_return_request_at?: string | null;
  completed_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectMaterial {
  id: string;
  project_id: string;
  name: string;
  description?: string | null;
  required: boolean;
  status: MaterialStatus;
  storage_path?: string | null;
  original_filename?: string | null;
  mime_type?: string | null;
  file_size?: number | null;
  uploaded_by?: string | null;
  uploaded_at?: string | null;
  approved_at?: string | null;
  created_at: string;
}

export interface ProjectRevision {
  id: string;
  project_id: string;
  round_number: number;
  status: RevisionStatus;
  version_sent_at?: string | null;
  feedback_received_at?: string | null;
  completed_at?: string | null;
  notes?: string | null;
  created_at: string;
}

export interface ProjectMessage {
  id: string;
  project_id: string;
  direction: MessageDirection;
  message_type: MessageType;
  channel: MessageChannel;
  message: string;
  created_by?: string | null;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  actor_id?: string | null;
  actor_type: "user" | "system" | "admin" | "client";
  entity_type: string;
  entity_id: string;
  event: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface ProjectNextAction {
  owner: "client" | "ibd" | "none";
  title: string;
  description: string;
  action?: string;
  actionUrl?: string;
}

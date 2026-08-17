import {
  Profile,
  Prospect,
  ProspectBriefing,
  Proposal,
  Contract,
  Client,
  Project,
  ProjectMaterial,
  ProjectRevision,
  ProjectMessage,
  ActivityLog,
  LeadStage,
  ProjectStatus,
  ProposalStatus,
  ContractStatus,
  MaterialStatus,
  RevisionStatus,
} from "@/lib/domain/types";
import { DatabaseService } from "./types";

declare global {
  // eslint-disable-next-line no-var
  var __ibd_mock_db: {
    profiles: Profile[];
    prospects: Prospect[];
    briefings: ProspectBriefing[];
    proposals: Proposal[];
    contracts: Contract[];
    clients: Client[];
    projects: Project[];
    materials: ProjectMaterial[];
    revisions: ProjectRevision[];
    messages: ProjectMessage[];
    activityLogs: ActivityLog[];
  } | undefined;
}

function initMockStore() {
  if (global.__ibd_mock_db) return global.__ibd_mock_db;

  const now = new Date().toISOString();

  // Initial Demo Data
  const demoProfileAdmin: Profile = {
    auth_user_id: "admin-user-id",
    role: "admin",
    display_name: "Ícaro Braga",
    email: "icaro@icarobraga.com",
    created_at: now,
    updated_at: now,
  };

  const demoProfileClient: Profile = {
    auth_user_id: "client-user-id-demo",
    role: "client",
    display_name: "Studio Vértice",
    email: "contato@studiovertice.com",
    created_at: now,
    updated_at: now,
  };

  const demoClient: Client = {
    id: "CLI-DEMO01",
    auth_user_id: "client-user-id-demo",
    prospect_id: "PROSP-DEMO01",
    name: "Studio Vértice",
    email: "contato@studiovertice.com",
    whatsapp: "+5585999990000",
    company_name: "Vértice Arquitetura",
    status: "ativo",
    portal_enabled: true,
    notes: "Cliente prioritário com identidade visual em andamento.",
    created_at: now,
    updated_at: now,
  };

  const demoProject1: Project = {
    id: "PRJ-DEMO01",
    client_id: "CLI-DEMO01",
    title: "Identidade Visual & Diretrizes 2026",
    service: "Identidade Visual",
    scope_description: "Redesenho de marca, sistema visual, paleta cromática e manual de aplicação.",
    status: "em_producao",
    desired_deadline: "2026-08-25",
    estimated_deadline: "2026-08-28",
    confirmed_deadline: "2026-08-28",
    deadline_confirmed_at: now,
    revisions_count: 0,
    revisions_limit: 2,
    created_at: now,
    updated_at: now,
  };

  const demoProject2: Project = {
    id: "PRJ-DEMO02",
    client_id: "CLI-DEMO01",
    title: "Landing Page Editorial",
    service: "Landing Page",
    scope_description: "Design de página de alta conversão para lançamento de coleção de arquitetura.",
    status: "aguardando_material",
    desired_deadline: "2026-09-10",
    estimated_deadline: "2026-09-15",
    confirmed_deadline: null,
    deadline_confirmed_at: null,
    revisions_count: 0,
    revisions_limit: 2,
    created_at: now,
    updated_at: now,
  };

  const demoMaterials: ProjectMaterial[] = [
    {
      id: "mat-1",
      project_id: "PRJ-DEMO02",
      name: "Textos e títulos da página",
      description: "Documento com copy validado",
      required: true,
      status: "recebido",
      storage_path: "clients/CLI-DEMO01/projects/PRJ-DEMO02/copy-final.docx",
      original_filename: "copy-final.docx",
      mime_type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      file_size: 24500,
      uploaded_by: "Studio Vértice",
      uploaded_at: now,
      approved_at: null,
      created_at: now,
    },
    {
      id: "mat-2",
      project_id: "PRJ-DEMO02",
      name: "Fotografias em alta resolução",
      description: "Fotos dos projetos de arquitetura em alta qualidade",
      required: true,
      status: "pendente",
      storage_path: null,
      original_filename: null,
      mime_type: null,
      file_size: null,
      uploaded_by: null,
      uploaded_at: null,
      approved_at: null,
      created_at: now,
    },
  ];

  const demoProspect: Prospect = {
    id: "PROSP-NOVO01",
    name: "Mariana Albuquerque",
    email: "mariana@novodireito.adv.br",
    whatsapp: "+5585988887777",
    service: "Identidade Visual & Portal",
    need_description: "Modernização completa do escritório de advocacia para posicionamento premium nacional.",
    desired_deadline: "2026-09-20",
    stage: "proposta_enviada",
    consent_at: now,
    created_at: now,
    updated_at: now,
  };

  const demoProposal: Proposal = {
    id: "prop-demo-1",
    prospect_id: "PROSP-NOVO01",
    version: 1,
    title: "Identidade Visual & Posicionamento Editorial",
    scope: "Design de identidade visual, papelaria premium, guia de tom e portal institucional.",
    price: 18500,
    currency: "BRL",
    status: "sent",
    valid_until: "2026-08-30",
    sent_at: now,
    created_at: now,
    updated_at: now,
  };

  const demoContract: Contract = {
    id: "cont-demo-1",
    prospect_id: "PROSP-NOVO01",
    proposal_id: "prop-demo-1",
    status: "signed",
    signed_at: now,
    start_date: "2026-09-01",
    file_path: "contracts/PROSP-NOVO01/contrato_assinado.pdf",
    notes: "Assinado via DocuSign pelo cliente.",
    created_at: now,
    updated_at: now,
  };

  global.__ibd_mock_db = {
    profiles: [demoProfileAdmin, demoProfileClient],
    prospects: [demoProspect],
    briefings: [],
    proposals: [demoProposal],
    contracts: [demoContract],
    clients: [demoClient],
    projects: [demoProject1, demoProject2],
    materials: demoMaterials,
    revisions: [],
    messages: [],
    activityLogs: [
      {
        id: "act-1",
        actor_id: "admin-user-id",
        actor_type: "admin",
        entity_type: "project",
        entity_id: "PRJ-DEMO01",
        event: "project.status_changed",
        metadata: { from: "briefing_aprovado", to: "em_producao" },
        created_at: now,
      },
    ],
  };

  return global.__ibd_mock_db;
}

export class MockDatabaseService implements DatabaseService {
  private get store() {
    return initMockStore();
  }

  // Profiles
  async getProfile(authUserId: string): Promise<Profile | null> {
    return this.store.profiles.find((p) => p.auth_user_id === authUserId) || null;
  }

  async upsertProfile(profile: Partial<Profile> & { auth_user_id: string }): Promise<Profile> {
    const existingIndex = this.store.profiles.findIndex((p) => p.auth_user_id === profile.auth_user_id);
    const now = new Date().toISOString();
    if (existingIndex >= 0) {
      const updated = {
        ...this.store.profiles[existingIndex],
        ...profile,
        updated_at: now,
      };
      this.store.profiles[existingIndex] = updated;
      return updated;
    }
    const created: Profile = {
      auth_user_id: profile.auth_user_id,
      role: profile.role || "client",
      display_name: profile.display_name || "Usuário",
      email: profile.email,
      avatar_url: profile.avatar_url,
      created_at: now,
      updated_at: now,
    };
    this.store.profiles.push(created);
    return created;
  }

  // Prospects
  async createProspect(data: Omit<Prospect, "id" | "stage" | "created_at" | "updated_at">): Promise<Prospect> {
    const now = new Date().toISOString();
    const id = `PROSP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const prospect: Prospect = {
      ...data,
      id,
      stage: "novo_lead",
      created_at: now,
      updated_at: now,
    };
    this.store.prospects.push(prospect);
    return prospect;
  }

  async getProspect(id: string): Promise<Prospect | null> {
    return this.store.prospects.find((p) => p.id === id) || null;
  }

  async listProspects(): Promise<Prospect[]> {
    return [...this.store.prospects].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  async updateProspectStage(id: string, stage: LeadStage, convertedClientId?: string): Promise<Prospect> {
    const prospect = await this.getProspect(id);
    if (!prospect) throw new Error(`Prospect not found: ${id}`);
    prospect.stage = stage;
    if (convertedClientId) prospect.converted_client_id = convertedClientId;
    prospect.updated_at = new Date().toISOString();
    return prospect;
  }

  async updateProspect(id: string, updates: Partial<Prospect>): Promise<Prospect> {
    const prospect = await this.getProspect(id);
    if (!prospect) throw new Error(`Prospect not found: ${id}`);
    Object.assign(prospect, updates, { updated_at: new Date().toISOString() });
    return prospect;
  }

  // Briefings
  async getBriefingByProspectId(prospectId: string): Promise<ProspectBriefing | null> {
    return this.store.briefings.find((b) => b.prospect_id === prospectId) || null;
  }

  async saveBriefingResponses(
    prospectId: string,
    responses: Record<string, unknown>,
    completed = false
  ): Promise<ProspectBriefing> {
    const now = new Date().toISOString();
    const existing = await this.getBriefingByProspectId(prospectId);
    if (existing) {
      existing.responses = { ...existing.responses, ...responses };
      if (completed) {
        existing.status = "concluido";
        existing.completed_at = now;
      }
      existing.updated_at = now;
      return existing;
    }
    const created: ProspectBriefing = {
      id: `brf-${Math.random().toString(36).substring(2, 9)}`,
      prospect_id: prospectId,
      version: 1,
      responses,
      status: completed ? "concluido" : "em_andamento",
      started_at: now,
      completed_at: completed ? now : null,
      created_at: now,
      updated_at: now,
    };
    this.store.briefings.push(created);
    return created;
  }

  // Proposals
  async createProposal(data: Omit<Proposal, "id" | "version" | "created_at" | "updated_at">): Promise<Proposal> {
    const now = new Date().toISOString();
    const existing = this.store.proposals.filter((p) => p.prospect_id === data.prospect_id);
    const version = existing.length + 1;
    const proposal: Proposal = {
      ...data,
      id: `prop-${Math.random().toString(36).substring(2, 9)}`,
      version,
      created_at: now,
      updated_at: now,
    };
    this.store.proposals.push(proposal);
    return proposal;
  }

  async getProposal(id: string): Promise<Proposal | null> {
    return this.store.proposals.find((p) => p.id === id) || null;
  }

  async listProposalsByProspect(prospectId: string): Promise<Proposal[]> {
    return this.store.proposals
      .filter((p) => p.prospect_id === prospectId)
      .sort((a, b) => b.version - a.version);
  }

  async listAllProposals(): Promise<Proposal[]> {
    return [...this.store.proposals].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  async updateProposalStatus(id: string, status: ProposalStatus): Promise<Proposal> {
    const proposal = await this.getProposal(id);
    if (!proposal) throw new Error(`Proposal not found: ${id}`);
    proposal.status = status;
    proposal.updated_at = new Date().toISOString();
    return proposal;
  }

  // Contracts
  async createContract(data: Omit<Contract, "id" | "created_at" | "updated_at">): Promise<Contract> {
    const now = new Date().toISOString();
    const contract: Contract = {
      ...data,
      id: `cont-${Math.random().toString(36).substring(2, 9)}`,
      created_at: now,
      updated_at: now,
    };
    this.store.contracts.push(contract);
    return contract;
  }

  async getContract(id: string): Promise<Contract | null> {
    return this.store.contracts.find((c) => c.id === id) || null;
  }

  async getContractByProspect(prospectId: string): Promise<Contract | null> {
    return this.store.contracts.find((c) => c.prospect_id === prospectId) || null;
  }

  async listAllContracts(): Promise<Contract[]> {
    return [...this.store.contracts].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  async updateContractStatus(id: string, status: ContractStatus, signedAt?: string): Promise<Contract> {
    const contract = await this.getContract(id);
    if (!contract) throw new Error(`Contract not found: ${id}`);
    contract.status = status;
    if (signedAt) contract.signed_at = signedAt;
    contract.updated_at = new Date().toISOString();
    return contract;
  }

  // Clients
  async createClient(data: Omit<Client, "id" | "created_at" | "updated_at">): Promise<Client> {
    const now = new Date().toISOString();
    const id = `CLI-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const client: Client = {
      ...data,
      id,
      created_at: now,
      updated_at: now,
    };
    this.store.clients.push(client);
    return client;
  }

  async getClient(id: string): Promise<Client | null> {
    return this.store.clients.find((c) => c.id === id) || null;
  }

  async getClientByAuthUserId(authUserId: string): Promise<Client | null> {
    return this.store.clients.find((c) => c.auth_user_id === authUserId) || null;
  }

  async getClientByEmail(email: string): Promise<Client | null> {
    return this.store.clients.find((c) => c.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async listClients(): Promise<Client[]> {
    return [...this.store.clients].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  async updateClient(id: string, updates: Partial<Client>): Promise<Client> {
    const client = await this.getClient(id);
    if (!client) throw new Error(`Client not found: ${id}`);
    Object.assign(client, updates, { updated_at: new Date().toISOString() });
    return client;
  }

  // Projects
  async createProject(
    data: Omit<Project, "id" | "revisions_count" | "revisions_limit" | "created_at" | "updated_at">
  ): Promise<Project> {
    const now = new Date().toISOString();
    const id = `PRJ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const project: Project = {
      ...data,
      id,
      revisions_count: 0,
      revisions_limit: 2,
      created_at: now,
      updated_at: now,
    };
    this.store.projects.push(project);
    return project;
  }

  async getProject(id: string): Promise<Project | null> {
    return this.store.projects.find((p) => p.id === id) || null;
  }

  async listProjectsByClient(clientId: string): Promise<Project[]> {
    return this.store.projects
      .filter((p) => p.client_id === clientId)
      .sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  async listAllProjects(): Promise<Project[]> {
    return [...this.store.projects].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  async updateProjectStatus(id: string, status: ProjectStatus): Promise<Project> {
    const project = await this.getProject(id);
    if (!project) throw new Error(`Project not found: ${id}`);
    project.status = status;
    project.updated_at = new Date().toISOString();
    return project;
  }

  async confirmProjectDeadline(id: string, confirmedDeadline: string): Promise<Project> {
    const project = await this.getProject(id);
    if (!project) throw new Error(`Project not found: ${id}`);
    const now = new Date().toISOString();
    project.confirmed_deadline = confirmedDeadline;
    project.deadline_confirmed_at = now;
    project.updated_at = now;
    return project;
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const project = await this.getProject(id);
    if (!project) throw new Error(`Project not found: ${id}`);
    Object.assign(project, updates, { updated_at: new Date().toISOString() });
    return project;
  }

  // Materials
  async createProjectMaterial(
    data: Omit<ProjectMaterial, "id" | "status" | "created_at">
  ): Promise<ProjectMaterial> {
    const now = new Date().toISOString();
    const material: ProjectMaterial = {
      ...data,
      id: `mat-${Math.random().toString(36).substring(2, 9)}`,
      status: "pendente",
      created_at: now,
    };
    this.store.materials.push(material);
    return material;
  }

  async listMaterialsByProject(projectId: string): Promise<ProjectMaterial[]> {
    return this.store.materials.filter((m) => m.project_id === projectId);
  }

  async updateMaterialStatus(
    id: string,
    status: MaterialStatus,
    approvedAt?: string
  ): Promise<ProjectMaterial> {
    const mat = this.store.materials.find((m) => m.id === id);
    if (!mat) throw new Error(`Material not found: ${id}`);
    mat.status = status;
    if (approvedAt) mat.approved_at = approvedAt;
    return mat;
  }

  // Revisions
  async createProjectRevision(data: Omit<ProjectRevision, "id" | "created_at">): Promise<ProjectRevision> {
    const now = new Date().toISOString();
    const revision: ProjectRevision = {
      ...data,
      id: `rev-${Math.random().toString(36).substring(2, 9)}`,
      created_at: now,
    };
    this.store.revisions.push(revision);
    return revision;
  }

  async listRevisionsByProject(projectId: string): Promise<ProjectRevision[]> {
    return this.store.revisions
      .filter((r) => r.project_id === projectId)
      .sort((a, b) => a.round_number - b.round_number);
  }

  async updateRevisionStatus(id: string, status: RevisionStatus, notes?: string): Promise<ProjectRevision> {
    const rev = this.store.revisions.find((r) => r.id === id);
    if (!rev) throw new Error(`Revision not found: ${id}`);
    rev.status = status;
    if (notes) rev.notes = notes;
    return rev;
  }

  // Messages
  async createProjectMessage(data: Omit<ProjectMessage, "id" | "created_at">): Promise<ProjectMessage> {
    const now = new Date().toISOString();
    const message: ProjectMessage = {
      ...data,
      id: `msg-${Math.random().toString(36).substring(2, 9)}`,
      created_at: now,
    };
    this.store.messages.push(message);
    return message;
  }

  async listMessagesByProject(projectId: string): Promise<ProjectMessage[]> {
    return this.store.messages
      .filter((m) => m.project_id === projectId)
      .sort((a, b) => a.created_at.localeCompare(b.created_at));
  }

  // Activity Log
  async createActivityLog(data: Omit<ActivityLog, "id" | "created_at">): Promise<ActivityLog> {
    const now = new Date().toISOString();
    const log: ActivityLog = {
      ...data,
      id: `act-${Math.random().toString(36).substring(2, 9)}`,
      created_at: now,
    };
    this.store.activityLogs.push(log);
    return log;
  }

  async listActivityLogs(entityType?: string, entityId?: string, limit = 50): Promise<ActivityLog[]> {
    let logs = [...this.store.activityLogs];
    if (entityType) {
      logs = logs.filter((l) => l.entity_type === entityType);
    }
    if (entityId) {
      logs = logs.filter((l) => l.entity_id === entityId);
    }
    return logs.sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, limit);
  }
}

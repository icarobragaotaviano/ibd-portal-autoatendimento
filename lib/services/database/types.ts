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

export interface DatabaseService {
  // Profiles
  getProfile(authUserId: string): Promise<Profile | null>;
  upsertProfile(profile: Partial<Profile> & { auth_user_id: string }): Promise<Profile>;

  // Prospects
  createProspect(data: Omit<Prospect, "id" | "stage" | "created_at" | "updated_at">): Promise<Prospect>;
  getProspect(id: string): Promise<Prospect | null>;
  listProspects(): Promise<Prospect[]>;
  updateProspectStage(id: string, stage: LeadStage, convertedClientId?: string): Promise<Prospect>;
  updateProspect(id: string, updates: Partial<Prospect>): Promise<Prospect>;

  // Prospect Briefings
  getBriefingByProspectId(prospectId: string): Promise<ProspectBriefing | null>;
  saveBriefingResponses(
    prospectId: string,
    responses: Record<string, unknown>,
    completed?: boolean
  ): Promise<ProspectBriefing>;

  // Proposals
  createProposal(data: Omit<Proposal, "id" | "version" | "created_at" | "updated_at">): Promise<Proposal>;
  getProposal(id: string): Promise<Proposal | null>;
  listProposalsByProspect(prospectId: string): Promise<Proposal[]>;
  listAllProposals(): Promise<Proposal[]>;
  updateProposalStatus(id: string, status: ProposalStatus): Promise<Proposal>;

  // Contracts
  createContract(data: Omit<Contract, "id" | "created_at" | "updated_at">): Promise<Contract>;
  getContract(id: string): Promise<Contract | null>;
  getContractByProspect(prospectId: string): Promise<Contract | null>;
  listAllContracts(): Promise<Contract[]>;
  updateContractStatus(id: string, status: ContractStatus, signedAt?: string): Promise<Contract>;

  // Clients
  createClient(data: Omit<Client, "id" | "created_at" | "updated_at">): Promise<Client>;
  getClient(id: string): Promise<Client | null>;
  getClientByAuthUserId(authUserId: string): Promise<Client | null>;
  getClientByEmail(email: string): Promise<Client | null>;
  listClients(): Promise<Client[]>;
  updateClient(id: string, updates: Partial<Client>): Promise<Client>;

  // Projects
  createProject(data: Omit<Project, "id" | "revisions_count" | "revisions_limit" | "created_at" | "updated_at">): Promise<Project>;
  getProject(id: string): Promise<Project | null>;
  listProjectsByClient(clientId: string): Promise<Project[]>;
  listAllProjects(): Promise<Project[]>;
  updateProjectStatus(id: string, status: ProjectStatus, metadata?: Record<string, unknown>): Promise<Project>;
  confirmProjectDeadline(id: string, confirmedDeadline: string): Promise<Project>;
  updateProject(id: string, updates: Partial<Project>): Promise<Project>;

  // Project Materials
  createProjectMaterial(data: Omit<ProjectMaterial, "id" | "status" | "created_at">): Promise<ProjectMaterial>;
  listMaterialsByProject(projectId: string): Promise<ProjectMaterial[]>;
  updateMaterialStatus(id: string, status: MaterialStatus, approvedAt?: string): Promise<ProjectMaterial>;

  // Project Revisions
  createProjectRevision(data: Omit<ProjectRevision, "id" | "created_at">): Promise<ProjectRevision>;
  listRevisionsByProject(projectId: string): Promise<ProjectRevision[]>;
  updateRevisionStatus(id: string, status: RevisionStatus, notes?: string): Promise<ProjectRevision>;

  // Project Messages
  createProjectMessage(data: Omit<ProjectMessage, "id" | "created_at">): Promise<ProjectMessage>;
  listMessagesByProject(projectId: string): Promise<ProjectMessage[]>;

  // Activity Log
  createActivityLog(data: Omit<ActivityLog, "id" | "created_at">): Promise<ActivityLog>;
  listActivityLogs(entityType?: string, entityId?: string, limit?: number): Promise<ActivityLog[]>;
}

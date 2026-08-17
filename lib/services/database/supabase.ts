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
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export class SupabaseDatabaseService implements DatabaseService {
  private get client() {
    return getSupabaseAdminClient();
  }

  // Profiles
  async getProfile(authUserId: string): Promise<Profile | null> {
    const { data, error } = await this.client
      .from("profiles")
      .select("*")
      .eq("auth_user_id", authUserId)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return data as Profile | null;
  }

  async upsertProfile(profile: Partial<Profile> & { auth_user_id: string }): Promise<Profile> {
    const { data, error } = await this.client
      .from("profiles")
      .upsert(profile)
      .select()
      .single();
    if (error) throw error;
    return data as Profile;
  }

  // Prospects
  async createProspect(data: Omit<Prospect, "id" | "stage" | "created_at" | "updated_at">): Promise<Prospect> {
    const id = `PROSP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const { data: prospect, error } = await this.client
      .from("prospects")
      .insert({ ...data, id, stage: "novo_lead" })
      .select()
      .single();
    if (error) throw error;
    return prospect as Prospect;
  }

  async getProspect(id: string): Promise<Prospect | null> {
    const { data, error } = await this.client
      .from("prospects")
      .select("*")
      .eq("id", id)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return data as Prospect | null;
  }

  async listProspects(): Promise<Prospect[]> {
    const { data, error } = await this.client
      .from("prospects")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Prospect[];
  }

  async updateProspectStage(id: string, stage: LeadStage, convertedClientId?: string): Promise<Prospect> {
    const updates: Record<string, unknown> = { stage, updated_at: new Date().toISOString() };
    if (convertedClientId) updates.converted_client_id = convertedClientId;

    const { data, error } = await this.client
      .from("prospects")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Prospect;
  }

  async updateProspect(id: string, updates: Partial<Prospect>): Promise<Prospect> {
    const { data, error } = await this.client
      .from("prospects")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Prospect;
  }

  // Briefings
  async getBriefingByProspectId(prospectId: string): Promise<ProspectBriefing | null> {
    const { data, error } = await this.client
      .from("prospect_briefings")
      .select("*")
      .eq("prospect_id", prospectId)
      .order("version", { ascending: false })
      .limit(1)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return data as ProspectBriefing | null;
  }

  async saveBriefingResponses(
    prospectId: string,
    responses: Record<string, unknown>,
    completed = false
  ): Promise<ProspectBriefing> {
    const existing = await this.getBriefingByProspectId(prospectId);
    const now = new Date().toISOString();

    if (existing) {
      const merged = { ...existing.responses, ...responses };
      const updates: Record<string, unknown> = {
        responses: merged,
        updated_at: now,
      };
      if (completed) {
        updates.status = "concluido";
        updates.completed_at = now;
      }
      const { data, error } = await this.client
        .from("prospect_briefings")
        .update(updates)
        .eq("id", existing.id)
        .select()
        .single();
      if (error) throw error;
      return data as ProspectBriefing;
    }

    const { data, error } = await this.client
      .from("prospect_briefings")
      .insert({
        prospect_id: prospectId,
        version: 1,
        responses,
        status: completed ? "concluido" : "em_andamento",
        started_at: now,
        completed_at: completed ? now : null,
      })
      .select()
      .single();
    if (error) throw error;
    return data as ProspectBriefing;
  }

  // Proposals
  async createProposal(data: Omit<Proposal, "id" | "version" | "created_at" | "updated_at">): Promise<Proposal> {
    const { data: existing } = await this.client
      .from("proposals")
      .select("version")
      .eq("prospect_id", data.prospect_id);

    const version = (existing?.length || 0) + 1;

    const { data: proposal, error } = await this.client
      .from("proposals")
      .insert({ ...data, version })
      .select()
      .single();
    if (error) throw error;
    return proposal as Proposal;
  }

  async getProposal(id: string): Promise<Proposal | null> {
    const { data, error } = await this.client
      .from("proposals")
      .select("*")
      .eq("id", id)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return data as Proposal | null;
  }

  async listProposalsByProspect(prospectId: string): Promise<Proposal[]> {
    const { data, error } = await this.client
      .from("proposals")
      .select("*")
      .eq("prospect_id", prospectId)
      .order("version", { ascending: false });
    if (error) throw error;
    return data as Proposal[];
  }

  async listAllProposals(): Promise<Proposal[]> {
    const { data, error } = await this.client
      .from("proposals")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Proposal[];
  }

  async updateProposalStatus(id: string, status: ProposalStatus): Promise<Proposal> {
    const { data, error } = await this.client
      .from("proposals")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Proposal;
  }

  // Contracts
  async createContract(data: Omit<Contract, "id" | "created_at" | "updated_at">): Promise<Contract> {
    const { data: contract, error } = await this.client
      .from("contracts")
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return contract as Contract;
  }

  async getContract(id: string): Promise<Contract | null> {
    const { data, error } = await this.client
      .from("contracts")
      .select("*")
      .eq("id", id)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return data as Contract | null;
  }

  async getContractByProspect(prospectId: string): Promise<Contract | null> {
    const { data, error } = await this.client
      .from("contracts")
      .select("*")
      .eq("prospect_id", prospectId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return data as Contract | null;
  }

  async listAllContracts(): Promise<Contract[]> {
    const { data, error } = await this.client
      .from("contracts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Contract[];
  }

  async updateContractStatus(id: string, status: ContractStatus, signedAt?: string): Promise<Contract> {
    const updates: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (signedAt) updates.signed_at = signedAt;

    const { data, error } = await this.client
      .from("contracts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Contract;
  }

  // Clients
  async createClient(data: Omit<Client, "id" | "created_at" | "updated_at">): Promise<Client> {
    const id = `CLI-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const { data: client, error } = await this.client
      .from("clients")
      .insert({ ...data, id })
      .select()
      .single();
    if (error) throw error;
    return client as Client;
  }

  async getClient(id: string): Promise<Client | null> {
    const { data, error } = await this.client
      .from("clients")
      .select("*")
      .eq("id", id)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return data as Client | null;
  }

  async getClientByAuthUserId(authUserId: string): Promise<Client | null> {
    const { data, error } = await this.client
      .from("clients")
      .select("*")
      .eq("auth_user_id", authUserId)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return data as Client | null;
  }

  async getClientByEmail(email: string): Promise<Client | null> {
    const { data, error } = await this.client
      .from("clients")
      .select("*")
      .ilike("email", email)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return data as Client | null;
  }

  async listClients(): Promise<Client[]> {
    const { data, error } = await this.client
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Client[];
  }

  async updateClient(id: string, updates: Partial<Client>): Promise<Client> {
    const { data, error } = await this.client
      .from("clients")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Client;
  }

  // Projects
  async createProject(
    data: Omit<Project, "id" | "revisions_count" | "revisions_limit" | "created_at" | "updated_at">
  ): Promise<Project> {
    const id = `PRJ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const { data: project, error } = await this.client
      .from("projects")
      .insert({ ...data, id, revisions_count: 0, revisions_limit: 2 })
      .select()
      .single();
    if (error) throw error;
    return project as Project;
  }

  async getProject(id: string): Promise<Project | null> {
    const { data, error } = await this.client
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return data as Project | null;
  }

  async listProjectsByClient(clientId: string): Promise<Project[]> {
    const { data, error } = await this.client
      .from("projects")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Project[];
  }

  async listAllProjects(): Promise<Project[]> {
    const { data, error } = await this.client
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Project[];
  }

  async updateProjectStatus(id: string, status: ProjectStatus): Promise<Project> {
    const { data, error } = await this.client
      .from("projects")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Project;
  }

  async confirmProjectDeadline(id: string, confirmedDeadline: string): Promise<Project> {
    const now = new Date().toISOString();
    const { data, error } = await this.client
      .from("projects")
      .update({
        confirmed_deadline: confirmedDeadline,
        deadline_confirmed_at: now,
        updated_at: now,
      })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Project;
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const { data, error } = await this.client
      .from("projects")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Project;
  }

  // Materials
  async createProjectMaterial(
    data: Omit<ProjectMaterial, "id" | "status" | "created_at">
  ): Promise<ProjectMaterial> {
    const { data: material, error } = await this.client
      .from("project_materials")
      .insert({ ...data, status: "pendente" })
      .select()
      .single();
    if (error) throw error;
    return material as ProjectMaterial;
  }

  async listMaterialsByProject(projectId: string): Promise<ProjectMaterial[]> {
    const { data, error } = await this.client
      .from("project_materials")
      .select("*")
      .eq("project_id", projectId);
    if (error) throw error;
    return data as ProjectMaterial[];
  }

  async updateMaterialStatus(
    id: string,
    status: MaterialStatus,
    approvedAt?: string
  ): Promise<ProjectMaterial> {
    const updates: Record<string, unknown> = { status };
    if (approvedAt) updates.approved_at = approvedAt;

    const { data, error } = await this.client
      .from("project_materials")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as ProjectMaterial;
  }

  // Revisions
  async createProjectRevision(data: Omit<ProjectRevision, "id" | "created_at">): Promise<ProjectRevision> {
    const { data: revision, error } = await this.client
      .from("project_revisions")
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return revision as ProjectRevision;
  }

  async listRevisionsByProject(projectId: string): Promise<ProjectRevision[]> {
    const { data, error } = await this.client
      .from("project_revisions")
      .select("*")
      .eq("project_id", projectId)
      .order("round_number", { ascending: true });
    if (error) throw error;
    return data as ProjectRevision[];
  }

  async updateRevisionStatus(id: string, status: RevisionStatus, notes?: string): Promise<ProjectRevision> {
    const updates: Record<string, unknown> = { status };
    if (notes) updates.notes = notes;

    const { data, error } = await this.client
      .from("project_revisions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as ProjectRevision;
  }

  // Messages
  async createProjectMessage(data: Omit<ProjectMessage, "id" | "created_at">): Promise<ProjectMessage> {
    const { data: message, error } = await this.client
      .from("project_messages")
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return message as ProjectMessage;
  }

  async listMessagesByProject(projectId: string): Promise<ProjectMessage[]> {
    const { data, error } = await this.client
      .from("project_messages")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data as ProjectMessage[];
  }

  // Activity Log
  async createActivityLog(data: Omit<ActivityLog, "id" | "created_at">): Promise<ActivityLog> {
    const { data: log, error } = await this.client
      .from("activity_log")
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return log as ActivityLog;
  }

  async listActivityLogs(entityType?: string, entityId?: string, limit = 50): Promise<ActivityLog[]> {
    let query = this.client.from("activity_log").select("*");
    if (entityType) query = query.eq("entity_type", entityType);
    if (entityId) query = query.eq("entity_id", entityId);

    const { data, error } = await query
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data as ActivityLog[];
  }
}

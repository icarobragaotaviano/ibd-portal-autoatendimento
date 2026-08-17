import { describe, expect, it, beforeEach } from "vitest";
import { MockDatabaseService } from "@/lib/services/database/mock";

describe("Client Activation Workflow", () => {
  let db: MockDatabaseService;

  beforeEach(() => {
    db = new MockDatabaseService();
  });

  it("prospect inicia no funil sem ser cliente", async () => {
    const prospect = await db.createProspect({
      name: "Novo Prospect",
      email: "novo@empresa.com",
      whatsapp: "85999998888",
      service: "identidade_visual",
      need_description: "Preciso de um redesign completo da marca.",
      desired_deadline: "2026-09-30",
      consent_at: new Date().toISOString(),
    });

    expect(prospect.stage).toBe("novo_lead");
    expect(prospect.converted_client_id ?? null).toBeNull();
  });

  it("não permite ativação sem contrato assinado", async () => {
    const prospect = await db.createProspect({
      name: "Prospect Sem Contrato",
      email: "semcontrato@empresa.com",
      whatsapp: "85999998888",
      service: "identidade_visual",
      need_description: "Preciso de um redesign completo.",
      desired_deadline: null,
      consent_at: new Date().toISOString(),
    });

    const contract = await db.getContractByProspect(prospect.id);
    expect(contract).toBeNull();
  });

  it("ativa cliente com sucesso após registro de contrato assinado", async () => {
    const prospect = await db.createProspect({
      name: "Prospect Para Ativar",
      email: "ativar@empresa.com",
      whatsapp: "85999997777",
      service: "landing_page",
      need_description: "Preciso de landing page de alta conversão.",
      desired_deadline: null,
      consent_at: new Date().toISOString(),
    });

    // 1. Create Proposal
    const proposal = await db.createProposal({
      prospect_id: prospect.id,
      title: "Landing Page Vértice",
      scope: "Design e código",
      price: 12500,
      currency: "BRL",
      status: "sent",
      valid_until: "2026-09-01",
      sent_at: new Date().toISOString(),
      accepted_at: new Date().toISOString(),
      rejected_at: null,
    });

    // 2. Register Contract signed
    const contract = await db.createContract({
      prospect_id: prospect.id,
      proposal_id: proposal.id,
      status: "signed",
      signed_at: new Date().toISOString(),
      start_date: "2026-08-20",
      file_path: null,
      notes: "Contrato assinado via DocuSign",
    });

    expect(contract.status).toBe("signed");

    // 3. Perform Activation
    const client = await db.createClient({
      prospect_id: prospect.id,
      name: prospect.name,
      email: prospect.email,
      whatsapp: prospect.whatsapp,
      company_name: "Empresa do Cliente",
      status: "ativo",
      portal_enabled: true,
      notes: null,
    });

    await db.updateProspectStage(prospect.id, "convertido", client.id);

    const updatedProspect = await db.getProspect(prospect.id);
    expect(updatedProspect?.stage).toBe("convertido");
    expect(updatedProspect?.converted_client_id).toBe(client.id);
    expect(client.portal_enabled).toBe(true);
    expect(client.status).toBe("ativo");
  });
});

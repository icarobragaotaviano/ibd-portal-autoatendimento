import { describe, it, expect } from "vitest";
import { canTransitionLeadStage, leadMessages } from "@/lib/domain/lead-stage";
import {
  canTransitionProjectStatus,
  canConfirmDeadline,
  projectMessages,
} from "@/lib/domain/project-status";
import { getProjectNextAction } from "@/lib/domain/next-action";
import { Project } from "@/lib/domain/types";

describe("Domain Rules: LeadStage Transitions", () => {
  it("allows valid transitions for leads", () => {
    expect(canTransitionLeadStage("novo_lead", "manual_enviado")).toBe(true);
    expect(canTransitionLeadStage("novo_lead", "briefing_em_andamento")).toBe(true);
    expect(canTransitionLeadStage("briefing_em_andamento", "briefing_concluido")).toBe(true);
    expect(canTransitionLeadStage("briefing_concluido", "proposta_em_preparo")).toBe(true);
    expect(canTransitionLeadStage("proposta_enviada", "contrato_fechado")).toBe(true);
    expect(canTransitionLeadStage("contrato_fechado", "convertido")).toBe(true);
  });

  it("blocks invalid backward or arbitrary transitions", () => {
    expect(canTransitionLeadStage("novo_lead", "convertido")).toBe(false);
    expect(canTransitionLeadStage("convertido", "novo_lead")).toBe(false);
  });

  it("has message configured for all stages", () => {
    expect(leadMessages.novo_lead).toBeDefined();
    expect(leadMessages.briefing_concluido).toBeDefined();
    expect(leadMessages.contrato_fechado).toBeDefined();
    expect(leadMessages.convertido).toBeDefined();
  });
});

describe("Domain Rules: ProjectStatus Transitions", () => {
  it("allows progressive project flow", () => {
    expect(canTransitionProjectStatus("solicitacao_recebida", "briefing_em_andamento")).toBe(true);
    expect(canTransitionProjectStatus("briefing_aprovado", "aguardando_material")).toBe(true);
    expect(canTransitionProjectStatus("aguardando_material", "em_producao")).toBe(true);
    expect(canTransitionProjectStatus("em_producao", "versao_enviada")).toBe(true);
    expect(canTransitionProjectStatus("versao_enviada", "aguardando_retorno")).toBe(true);
    expect(canTransitionProjectStatus("aguardando_retorno", "revisao_em_andamento")).toBe(true);
    expect(canTransitionProjectStatus("aguardando_retorno", "pausado")).toBe(true);
    expect(canTransitionProjectStatus("aguardando_retorno", "concluido")).toBe(true);
  });

  it("does not allow transitions from terminal states", () => {
    expect(canTransitionProjectStatus("concluido", "em_producao")).toBe(false);
    expect(canTransitionProjectStatus("cancelado", "solicitacao_recebida")).toBe(false);
  });

  it("has messages defined for all statuses", () => {
    expect(projectMessages.solicitacao_recebida).toBeDefined();
    expect(projectMessages.aguardando_material).toBeDefined();
    expect(projectMessages.em_producao).toBeDefined();
    expect(projectMessages.pausado).toBeDefined();
  });
});

describe("Domain Rules: Deadline Confirmation", () => {
  it("blocks deadline confirmation if briefing is not approved", () => {
    const result = canConfirmDeadline({
      briefingApproved: false,
      requiredMaterialsReceived: true,
    });
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain("briefing");
  });

  it("blocks deadline confirmation if materials are missing", () => {
    const result = canConfirmDeadline({
      briefingApproved: true,
      requiredMaterialsReceived: false,
    });
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain("materiais");
  });

  it("allows deadline confirmation when briefing is approved and materials received", () => {
    const result = canConfirmDeadline({
      briefingApproved: true,
      requiredMaterialsReceived: true,
    });
    expect(result.allowed).toBe(true);
  });
});

describe("Domain Rules: getProjectNextAction", () => {
  const baseProject: Project = {
    id: "PRJ-TEST",
    client_id: "CLI-TEST",
    title: "Branding Teste",
    service: "Identidade Visual",
    scope_description: "Teste",
    status: "aguardando_material",
    desired_deadline: "2026-09-01",
    estimated_deadline: "2026-09-10",
    confirmed_deadline: null,
    deadline_confirmed_at: null,
    revisions_count: 0,
    revisions_limit: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  it("assigns owner = client when waiting for materials", () => {
    const nextAction = getProjectNextAction({
      ...baseProject,
      status: "aguardando_material",
    });
    expect(nextAction.owner).toBe("client");
    expect(nextAction.title).toContain("Enviar materiais");
  });

  it("assigns owner = ibd when in production", () => {
    const nextAction = getProjectNextAction({
      ...baseProject,
      status: "em_producao",
      confirmed_deadline: "2026-09-05",
    });
    expect(nextAction.owner).toBe("ibd");
    expect(nextAction.title).toContain("Produção");
  });

  it("assigns owner = client when project is paused", () => {
    const nextAction = getProjectNextAction({
      ...baseProject,
      status: "pausado",
    });
    expect(nextAction.owner).toBe("client");
    expect(nextAction.title).toContain("Solicitar retomada");
  });
});

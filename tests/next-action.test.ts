import { describe, expect, it } from "vitest";
import { getProjectNextAction } from "@/lib/domain/next-action";
import { Project } from "@/lib/domain/types";

describe("Centralized getProjectNextAction", () => {
  const baseProject: Project = {
    id: "PRJ-TEST01",
    client_id: "CLI-DEMO01",
    title: "Identidade Visual Vértice",
    service: "identidade_visual",
    scope_description: "Redesign completo da marca",
    status: "solicitacao_recebida",
    desired_deadline: "2026-08-20",
    estimated_deadline: null,
    confirmed_deadline: null,
    deadline_confirmed_at: null,
    revisions_count: 0,
    revisions_limit: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  it("retorna ação para solicitacao_recebida", () => {
    const action = getProjectNextAction({ ...baseProject, status: "solicitacao_recebida" });
    expect(action.owner).toBe("ibd");
    expect(action.action).toBe("Aguardar análise");
  });

  it("retorna ação para briefing_em_andamento", () => {
    const action = getProjectNextAction({ ...baseProject, status: "briefing_em_andamento" });
    expect(action.owner).toBe("client");
    expect(action.action).toBe("Responder briefing");
  });

  it("retorna ação para aguardando_material", () => {
    const action = getProjectNextAction({ ...baseProject, status: "aguardando_material" });
    expect(action.owner).toBe("client");
    expect(action.action).toBe("Enviar materiais");
  });

  it("retorna ação para em_producao", () => {
    const action = getProjectNextAction({ ...baseProject, status: "em_producao" });
    expect(action.owner).toBe("ibd");
    expect(action.action).toBe("Aguardar versão");
  });

  it("retorna ação para versao_enviada", () => {
    const action = getProjectNextAction({ ...baseProject, status: "versao_enviada" });
    expect(action.owner).toBe("client");
    expect(action.action).toBe("Avaliar versão");
  });

  it("retorna ação para aguardando_retorno", () => {
    const action = getProjectNextAction({ ...baseProject, status: "aguardando_retorno" });
    expect(action.owner).toBe("client");
    expect(action.action).toBe("Avaliar versão");
  });

  it("retorna ação para revisao_em_andamento", () => {
    const action = getProjectNextAction({ ...baseProject, status: "revisao_em_andamento" });
    expect(action.owner).toBe("ibd");
    expect(action.action).toBe("Aguardar nova versão");
  });

  it("retorna ação para pausado", () => {
    const action = getProjectNextAction({ ...baseProject, status: "pausado" });
    expect(action.owner).toBe("client");
    expect(action.action).toBe("Retomar projeto");
  });

  it("retorna ação para concluido", () => {
    const action = getProjectNextAction({ ...baseProject, status: "concluido" });
    expect(action.owner).toBe("none");
    expect(action.action).toBe("Ver arquivos");
  });
});

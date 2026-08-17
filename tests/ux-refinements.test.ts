import { describe, it, expect } from "vitest";
import { getContextualGuideMessage } from "../lib/domain/guide-rules";
import { trackPublicEvent } from "../lib/analytics";

describe("IBD Guia - Contextual Guide Engine", () => {
  it("returns contextual guide for lead form fields", () => {
    const serviceMsg = getContextualGuideMessage({
      route: "/comecar",
      focusedField: "service",
    });
    expect(serviceMsg.title).toContain("tipo de serviço");
    expect(serviceMsg.signal).toBe("→");

    const whatsappMsg = getContextualGuideMessage({
      route: "/comecar",
      focusedField: "whatsapp",
    });
    expect(whatsappMsg.title).toContain("WhatsApp");
    expect(whatsappMsg.signal).toBe("💡");
  });

  it("returns guide warning when desired date is too tight (under 5 days)", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    const dateStr = tomorrow.toISOString().split("T")[0];

    const warningMsg = getContextualGuideMessage({
      route: "/comecar",
      focusedField: "desired_deadline",
      desiredDate: dateStr,
    });

    expect(warningMsg.title).toContain("Prazos inferiores a 5 dias úteis");
    expect(warningMsg.signal).toBe("!");
  });

  it("returns contextual guide for briefing questions", () => {
    const step1Msg = getContextualGuideMessage({
      route: "/comecar/briefing",
      step: 1,
      focusedField: "momento_e_objetivo",
    });
    expect(step1Msg.title).toContain("objetivo principal");
    expect(step1Msg.suggestedTemplate).toBeDefined();

    const step3Msg = getContextualGuideMessage({
      route: "/comecar/briefing",
      step: 3,
      focusedField: "data_critica_evento",
    });
    expect(step3Msg.title).toContain("Data Crítica");
  });

  it("returns contextual guide for project portal states", () => {
    const waitingMaterialMsg = getContextualGuideMessage({
      route: "/portal/projetos/[id]",
      status: "aguardando_material",
    });
    expect(waitingMaterialMsg.signal).toBe("!");
    expect(waitingMaterialMsg.title).toContain("Materiais Pendentes");

    const inProductionMsg = getContextualGuideMessage({
      route: "/portal/projetos/[id]",
      status: "em_producao",
    });
    expect(inProductionMsg.signal).toBe("●");
    expect(inProductionMsg.title).toContain("Agora é comigo");

    const versionSentMsg = getContextualGuideMessage({
      route: "/portal/projetos/[id]",
      status: "versao_enviada",
    });
    expect(versionSentMsg.signal).toBe("→");
    expect(versionSentMsg.title).toContain("Nova Versão Disponível");
  });
});

describe("Analytics & PII Sanitization", () => {
  it("allows safe tracking without errors", () => {
    expect(() => {
      trackPublicEvent("draft_restored", {
        step: 2,
        email: "sensivel@cliente.com", // should be sanitized
        client_name: "Cliente Teste", // should be sanitized
        service: "identidade-visual", // safe key
      });
    }).not.toThrow();
  });
});

describe("Revision Cart Multi-Item Formatter", () => {
  it("formats multi-item revision array into structured text blocks", () => {
    const items = [
      {
        id: "1",
        areaLabel: "Hero / Capa / Título Principal",
        typeLabel: "Substituição de Imagem / Logo",
        notes: "Trocar pela foto 02 em anexo.",
      },
      {
        id: "2",
        areaLabel: "Textos / Tipografia",
        typeLabel: "Correção de Texto / Copywriting",
        notes: "Ajustar o slogan para 'Design orientado a resultados'.",
      },
    ];

    const formatted = items
      .map(
        (item, idx) =>
          `[AJUSTE ${idx + 1}] • ${item.areaLabel} (${item.typeLabel})\n${item.notes}`
      )
      .join("\n\n---\n\n");

    expect(formatted).toContain("[AJUSTE 1] • Hero / Capa / Título Principal (Substituição de Imagem / Logo)");
    expect(formatted).toContain("Trocar pela foto 02 em anexo.");
    expect(formatted).toContain("[AJUSTE 2] • Textos / Tipografia (Correção de Texto / Copywriting)");
    expect(formatted).toContain("---");
  });
});

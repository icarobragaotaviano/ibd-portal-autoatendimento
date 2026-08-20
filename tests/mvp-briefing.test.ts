import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { MvpBriefingInputSchema } from "@/lib/validation/briefing";
import { createLeadProtocol } from "@/lib/ids";
import { POST } from "@/app/api/briefing/route";
import { NextRequest } from "next/server";

describe("MVP Briefing Validation & API", () => {
  describe("MvpBriefingInputSchema", () => {
    const validData = {
      name: "Maria Silva",
      whatsapp: "(85) 98888-7777",
      service: "identidade-visual",
      projectSummary: "Preciso renovar a identidade visual da minha clínica médica para lançamento no próximo mês.",
      consent: true,
      website: "",
    };

    it("valida payload completo com sucesso e normaliza o WhatsApp", () => {
      const result = MvpBriefingInputSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("Maria Silva");
        expect(result.data.whatsapp).toBe("85988887777");
        expect(result.data.service).toBe("identidade-visual");
        expect(result.data.consent).toBe(true);
      }
    });

    it("rejeita nome com menos de 2 caracteres", () => {
      const result = MvpBriefingInputSchema.safeParse({
        ...validData,
        name: "M",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.name).toBeDefined();
      }
    });

    it("rejeita WhatsApp com dígitos insuficientes", () => {
      const result = MvpBriefingInputSchema.safeParse({
        ...validData,
        whatsapp: "1234",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.whatsapp).toBeDefined();
      }
    });

    it("rejeita serviço inexistente", () => {
      const result = MvpBriefingInputSchema.safeParse({
        ...validData,
        service: "servico-invalido-xyz",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.service).toBeDefined();
      }
    });

    it("rejeita resumo do projeto com menos de 20 caracteres", () => {
      const result = MvpBriefingInputSchema.safeParse({
        ...validData,
        projectSummary: "Muito curto",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.projectSummary).toBeDefined();
      }
    });

    it("rejeita consentimento LGPD falso ou não marcado", () => {
      const result = MvpBriefingInputSchema.safeParse({
        ...validData,
        consent: false,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.consent).toBeDefined();
      }
    });

    it("aceita campo honeypot website sem falhar a validação do schema", () => {
      const result = MvpBriefingInputSchema.safeParse({
        ...validData,
        website: "http://spambot.example.com",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("createLeadProtocol", () => {
    it("gera protocolo no formato legível IBD-2026-XXXXXX", () => {
      const protocol = createLeadProtocol("IBD", "2026");
      expect(protocol).toMatch(/^IBD-2026-[A-Z0-9]{6}$/);
    });

    it("gera identificadores distintos a cada chamada", () => {
      const proto1 = createLeadProtocol("IBD", "2026");
      const proto2 = createLeadProtocol("IBD", "2026");
      expect(proto1).not.toBe(proto2);
    });
  });

  describe("POST /api/briefing route handler", () => {
    const originalEnv = process.env;

    beforeEach(() => {
      vi.resetAllMocks();
      process.env = { ...originalEnv };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it("rejeita requisição inválida com status 400 e erro INVALID_REQUEST", async () => {
      const req = new NextRequest("http://localhost:3000/api/briefing", {
        method: "POST",
        body: JSON.stringify({ name: "A" }),
      });

      const response = await POST(req);
      expect(response.status).toBe(400);

      const json = await response.json();
      expect(json.ok).toBe(false);
      expect(json.error).toBe("INVALID_REQUEST");
      expect(json.errors).toBeDefined();
    });

    it("descarta silenciosamente envio com honeypot preenchido", async () => {
      const fetchSpy = vi.spyOn(global, "fetch");

      const req = new NextRequest("http://localhost:3000/api/briefing", {
        method: "POST",
        body: JSON.stringify({
          name: "Bot Spammer",
          whatsapp: "85999999999",
          service: "landing-page",
          projectSummary: "This is a spam request generated automatically by a robot.",
          consent: true,
          website: "https://spam.com",
        }),
      });

      const response = await POST(req);
      expect(response.status).toBe(200);

      const json = await response.json();
      expect(json.ok).toBe(true);
      expect(json.leadId).toBeDefined();
      // Verifies fetch to n8n was NEVER called
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("em modo desenvolvimento (sem N8N_WEBHOOK_URL), responde sucesso com leadId gerado", async () => {
      delete process.env.N8N_WEBHOOK_URL;

      const req = new NextRequest("http://localhost:3000/api/briefing", {
        method: "POST",
        body: JSON.stringify({
          name: "Carlos Eduardo",
          whatsapp: "(85) 99123-4567",
          service: "landing-page",
          projectSummary: "Criação de landing page responsiva para captação de clientes da minha consultoria.",
          consent: true,
        }),
      });

      const response = await POST(req);
      expect(response.status).toBe(200);

      const json = await response.json();
      expect(json.ok).toBe(true);
      expect(json.leadId).toMatch(/^IBD-2026-[A-Z0-9]{6}$/);
    });

    it("quando N8N_WEBHOOK_URL está configurado, envia payload com header secreto", async () => {
      process.env.N8N_WEBHOOK_URL = "https://automacao.exemplo.com/webhook/novo-briefing";
      process.env.N8N_WEBHOOK_SECRET = "segredo-super-privado";

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ status: "received" }),
      });
      vi.stubGlobal("fetch", mockFetch);

      const req = new NextRequest("http://localhost:3000/api/briefing", {
        method: "POST",
        body: JSON.stringify({
          name: "Fernanda Costa",
          whatsapp: "85998765432",
          service: "social-media",
          projectSummary: "Desenvolvimento de pacote visual mensal para perfis corporativos no Instagram e LinkedIn.",
          consent: true,
        }),
      });

      const response = await POST(req);
      expect(response.status).toBe(200);

      const json = await response.json();
      expect(json.ok).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(1);

      const [calledUrl, calledOptions] = mockFetch.mock.calls[0];
      expect(calledUrl).toBe("https://automacao.exemplo.com/webhook/novo-briefing");
      expect(calledOptions.headers["X-IBD-Webhook-Secret"]).toBe("segredo-super-privado");
      expect(calledOptions.headers["Content-Type"]).toBe("application/json");

      const sentBody = JSON.parse(calledOptions.body);
      expect(sentBody.name).toBe("Fernanda Costa");
      expect(sentBody.source).toBe("mvp-home");
      expect(sentBody.leadId).toBeDefined();
    });

    it("retorna status 502 amigável quando o n8n responde com erro", async () => {
      process.env.N8N_WEBHOOK_URL = "https://automacao.exemplo.com/webhook/novo-briefing";

      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });
      vi.stubGlobal("fetch", mockFetch);

      const req = new NextRequest("http://localhost:3000/api/briefing", {
        method: "POST",
        body: JSON.stringify({
          name: "Fernanda Costa",
          whatsapp: "85998765432",
          service: "editorial",
          projectSummary: "Diagramação de relatório institucional anual com infográficos e tabelas financeiras.",
          consent: true,
        }),
      });

      const response = await POST(req);
      expect(response.status).toBe(502);

      const json = await response.json();
      expect(json.ok).toBe(false);
      expect(json.error).toBe("SUBMISSION_FAILED");
    });
  });
});

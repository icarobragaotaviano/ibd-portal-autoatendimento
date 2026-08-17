import { describe, it, expect } from "vitest";
import { MockDatabaseService } from "@/lib/services/database/mock";
import { MockStorageService } from "@/lib/services/storage/mock";
import { createWhatsAppLink, whatsAppTemplates } from "@/lib/services/notifications/whatsapp";

describe("MockDatabaseService & Entities", () => {
  const db = new MockDatabaseService();

  it("creates and retrieves a prospect", async () => {
    const prospect = await db.createProspect({
      name: "Carlos Eduardo",
      email: "carlos@startup.com",
      whatsapp: "85999998888",
      service: "Landing Page",
      need_description: "Nova landing page para produto SaaS.",
      desired_deadline: "2026-09-01",
      consent_at: new Date().toISOString(),
    });

    expect(prospect.id).toBeDefined();
    expect(prospect.stage).toBe("novo_lead");

    const found = await db.getProspect(prospect.id);
    expect(found?.name).toBe("Carlos Eduardo");
  });

  it("saves briefing responses progressively", async () => {
    const prospect = await db.createProspect({
      name: "Ana Clara",
      email: "ana@estudio.com",
      whatsapp: "85999991111",
      service: "Identidade Visual",
      need_description: "Branding completo.",
      consent_at: new Date().toISOString(),
    });

    const step1 = await db.saveBriefingResponses(prospect.id, {
      publico_alvo: "Empreendedores B2B",
      diferenciais: "Atendimento ágil",
    });
    expect(step1.status).toBe("em_andamento");
    expect(step1.responses.publico_alvo).toBe("Empreendedores B2B");

    const step2 = await db.saveBriefingResponses(
      prospect.id,
      { entregaveis_desejados: ["Logo", "Manual"] },
      true
    );
    expect(step2.status).toBe("concluido");
    expect(step2.responses.publico_alvo).toBe("Empreendedores B2B");
  });

  it("handles client creation and project association", async () => {
    const client = await db.createClient({
      name: "Tech Solutions",
      email: "contato@techsol.com",
      whatsapp: "85988882222",
      company_name: "Tech Solutions Inc",
      status: "ativo",
      portal_enabled: true,
    });

    const project = await db.createProject({
      client_id: client.id,
      title: "Design System",
      service: "Design System",
      scope_description: "Tokens e componentes",
      status: "aguardando_material",
    });

    const projects = await db.listProjectsByClient(client.id);
    expect(projects.length).toBeGreaterThanOrEqual(1);
    expect(projects[0].title).toBe("Design System");
  });
});

describe("MockStorageService", () => {
  const storage = new MockStorageService();

  it("generates signed URLs for uploads", async () => {
    const { storagePath } = await storage.uploadFile({
      clientId: "CLI-01",
      projectId: "PRJ-01",
      fileName: "manual_marca.pdf",
      fileBuffer: Buffer.from("dummy pdf content"),
      contentType: "application/pdf",
    });

    expect(storagePath).toContain("clients/CLI-01/projects/PRJ-01/manual_marca.pdf");

    const signedUrl = await storage.getSignedUrl(storagePath, 3600);
    expect(signedUrl).toContain("mock-storage");
    expect(signedUrl).toContain("token=");
  });
});

describe("WhatsApp Notification Helpers", () => {
  it("formats wa.me link with country code and encoded message", () => {
    const link = createWhatsAppLink("85999998888", "Olá! Como vai?");
    expect(link).toBe("https://wa.me/5585999998888?text=Ol%C3%A1!%20Como%20vai%3F");
  });

  it("generates direct template messages", () => {
    const msg = whatsAppTemplates.leadWelcome("Beatriz");
    expect(msg).toContain("Olá, Beatriz.");
    expect(msg).toContain("Portal IBD");
  });
});

import { describe, expect, it } from "vitest";
import {
  getServices,
  getFeaturedServices,
  getServiceBySlug,
  resolvePublicServiceSelection,
  formatServicePricing,
  formatServiceDeadline,
} from "@/data/services";
import { getPublishedCases, getPublicCaseBySlug } from "@/data/cases";

describe("Public Data Layer & Business Rules", () => {
  describe("Services Data & Resolvers", () => {
    it("retorna somente serviços ativos e ordenados por order", () => {
      const activeServices = getServices();
      expect(activeServices.length).toBeGreaterThan(0);
      expect(activeServices.every((s) => s.active)).toBe(true);

      for (let i = 0; i < activeServices.length - 1; i++) {
        expect(activeServices[i].order).toBeLessThanOrEqual(activeServices[i + 1].order);
      }
    });

    it("retorna no máximo 4 serviços destacados", () => {
      const featured = getFeaturedServices(4);
      expect(featured.length).toBeLessThanOrEqual(4);
      expect(featured.every((s) => s.featured && s.active)).toBe(true);
    });

    it("resolve seleção pública de serviço ativo por slug válido", () => {
      const service = resolvePublicServiceSelection("identidade-visual");
      expect(service).not.toBeNull();
      expect(service?.name).toBe("Identidade Visual");
    });

    it("retorna null para serviço inexistente ou query desconhecida", () => {
      const service = resolvePublicServiceSelection("servico-inexistente-xyz");
      expect(service).toBeNull();
    });

    it("retorna null para valor undefined ou vazio", () => {
      expect(resolvePublicServiceSelection(undefined)).toBeNull();
      expect(resolvePublicServiceSelection("")).toBeNull();
    });

    it("formata precificação 'sob consulta' sem inventar números", () => {
      const service = getServiceBySlug("identidade-visual");
      expect(service).not.toBeNull();
      const formatted = formatServicePricing(service!.pricing);
      expect(formatted).toBe("Valor sob consulta");
    });

    it("formata prazo 'definido após briefing' sem números fictícios", () => {
      const service = getServiceBySlug("identidade-visual");
      expect(service).not.toBeNull();
      const formatted = formatServiceDeadline(service!.deadline);
      expect(formatted).toBe("Prazo definido após briefing");
    });
  });

  describe("Portfolio Cases & Publication Security", () => {
    it("getPublishedCases retorna apenas cases onde published = true E usageAuthorized = true", () => {
      const published = getPublishedCases();
      expect(published.length).toBeGreaterThan(0);
      expect(published.every((c) => c.published && c.usageAuthorized)).toBe(true);

      const confidential = published.find((c) => c.slug === "projeto-confidencial");
      expect(confidential).toBeUndefined();
    });

    it("getPublicCaseBySlug bloqueia acesso direto a projetos confidenciais ou não autorizados", () => {
      const result = getPublicCaseBySlug("projeto-confidencial");
      expect(result).toBeNull();
    });

    it("getPublicCaseBySlug retorna case autorizado com sucesso", () => {
      const result = getPublicCaseBySlug("wine-gourmet");
      expect(result).not.toBeNull();
      expect(result?.client).toBe("Wine Gourmet");
      expect(result?.challenge).toBeDefined();
      expect(result?.delivery).toBeDefined();
      expect(result?.result).toBeDefined();
    });
  });

  describe("IBD Link Hub Data (/links)", () => {
    it("garante que siteConfig possui dados institucionais e status preenchidos", async () => {
      const { siteConfig, getWhatsAppLink } = await import("@/data/site");
      expect(siteConfig.name).toBe("Ícaro Braga");
      expect(siteConfig.studioName).toContain("IBD");
      expect(siteConfig.status.available).toBe(true);
      expect(siteConfig.status.label).toBe("Disponível para novos projetos");

      const waLink = getWhatsAppLink();
      expect(waLink).toContain("text=");
      expect(decodeURIComponent(waLink)).toContain("Olá, Ícaro!");
    });

    it("garante que socialLinks possui os canais oficiais configurados", async () => {
      const { socialLinks } = await import("@/data/social-links");
      expect(socialLinks.length).toBeGreaterThanOrEqual(4);
      expect(socialLinks.some((s) => s.id === "instagram")).toBe(true);
      expect(socialLinks.some((s) => s.id === "linkedin")).toBe(true);
      expect(socialLinks.some((s) => s.id === "email")).toBe(true);
    });
  });
});

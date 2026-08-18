import { describe, expect, it } from "vitest";
import { ClientRequestSchema } from "@/lib/validation";

describe("validation", () => {
  it("aceita solicitação mínima válida", () => {
    const result = ClientRequestSchema.safeParse({
      service: "landing_page",
      description: "Preciso de uma landing page para um novo produto.",
      desiredDate: "",
      hasMaterial: false,
      materialNotes: "Ainda vou reunir fotos e textos.",
      wantsContent: true,
      urgency: "normal",
      clientName: "Cliente",
      clientEmail: "cliente@example.com",
      clientWhatsapp: "+55 85 99999-9999",
      consent: true,
    });
    expect(result.success).toBe(true);
  });
});

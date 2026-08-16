import { describe, expect, it } from "vitest";
import { BookingSchema, ClientRequestSchema } from "@/lib/validation";

describe("validation", () => {
  it("exige consentimento no agendamento", () => {
    const result = BookingSchema.safeParse({
      service: "conversa_inicial",
      start: "2026-08-18T10:00:00-03:00",
      name: "Cliente",
      email: "cliente@example.com",
      whatsapp: "+55 85 99999-9999",
      notes: "Quero conversar sobre uma landing page.",
      consent: false,
    });
    expect(result.success).toBe(false);
  });

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

import type { EmailProvider } from "@/lib/services/email/types";

export const mockEmailProvider: EmailProvider = {
  async sendEmail(payload) {
    console.log("[EMAIL MOCK] Enviando e-mail:", {
      to: payload.to,
      subject: payload.subject,
      htmlLength: payload.html.length,
    });
    return { success: true, id: `mock-email-${Date.now()}` };
  },
};

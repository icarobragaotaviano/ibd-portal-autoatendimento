import type { EmailProvider } from "@/lib/services/email/types";

export const resendEmailProvider: EmailProvider = {
  async sendEmail(payload) {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM || "onboarding@resend.dev";

    if (!apiKey) {
      console.warn("RESEND_API_KEY não configurada. Operação cancelada.");
      return { success: false, error: "RESEND_API_KEY missing" };
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from,
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        return { success: false, error: data.message || "Falha ao enviar e-mail." };
      }

      return { success: true, id: data.id };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  },
};

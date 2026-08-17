export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export interface EmailProvider {
  sendEmail(payload: EmailPayload): Promise<{ success: boolean; id?: string; error?: string }>;
}

export type EmailService = EmailProvider;

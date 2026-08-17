import { mockEmailProvider } from "@/lib/services/email/mock";
import { resendEmailProvider } from "@/lib/services/email/resend";
import { EmailService } from "@/lib/services/email/types";

export function getEmailProvider(): EmailService {
  return process.env.EMAIL_PROVIDER === "resend" ? resendEmailProvider : mockEmailProvider;
}

export const emailProvider = getEmailProvider();
export * from "./types";

import { mockEmailProvider } from "@/lib/services/email/mock";
import { resendEmailProvider } from "@/lib/services/email/resend";

export function getEmailProvider() {
  return process.env.EMAIL_PROVIDER === "resend" ? resendEmailProvider : mockEmailProvider;
}

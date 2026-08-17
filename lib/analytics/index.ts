export type PublicAnalyticsEvent =
  | "public_home_viewed"
  | "services_viewed"
  | "service_selected"
  | "portfolio_viewed"
  | "portfolio_case_opened"
  | "start_briefing_clicked"
  | "lead_started"
  | "lead_completed"
  | "briefing_started"
  | "briefing_completed"
  | "draft_restored"
  | "draft_cleared"
  | "guide_opened"
  | "guide_dismissed"
  | "dont_know_selected"
  | "revision_started"
  | "revision_completed"
  | "project_approved"
  | "login_clicked";

const SENSITIVE_KEYS = [
  "name",
  "clientname",
  "client_name",
  "email",
  "clientemail",
  "client_email",
  "whatsapp",
  "phone",
  "telefone",
  "cpf",
  "cnpj",
  "password",
  "token",
  "secret",
  "responses",
  "briefing",
  "notes",
  "description",
  "need_description",
];

function sanitizeProperties(properties?: Record<string, unknown>): Record<string, unknown> {
  if (!properties) return {};
  const sanitized: Record<string, unknown> = {};

  for (const [key, val] of Object.entries(properties)) {
    const lowerKey = key.toLowerCase();
    const isSensitive = SENSITIVE_KEYS.some((sensitive) => lowerKey.includes(sensitive));

    if (!isSensitive && typeof val !== "function") {
      sanitized[key] = val;
    }
  }

  return sanitized;
}

export function trackPublicEvent(event: PublicAnalyticsEvent, properties?: Record<string, unknown>) {
  const _sanitized = sanitizeProperties(properties);

  if (process.env.NODE_ENV === "development") {
    // console.log(`[Public Analytics] ${event}`, _sanitized);
  }

  // Em produção com PostHog:
  // if (typeof window !== "undefined" && (window as any).posthog) {
  //   (window as any).posthog.capture(event, _sanitized);
  // }
}

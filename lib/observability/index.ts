export type AnalyticsEvent =
  | "lead.started"
  | "briefing.step_completed"
  | "briefing.completed"
  | "proposal.viewed"
  | "proposal.accepted"
  | "contract.signed"
  | "client.activated"
  | "project.created"
  | "material.uploaded"
  | "version.downloaded"
  | "revision.requested"
  | "project.approved"
  | "project.paused"
  | "project.resumed"
  | "booking.completed";

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, unknown>) {
  // Sanitize properties to prevent sensitive leakage
  const sanitized: Record<string, unknown> = {};
  if (properties) {
    for (const [key, val] of Object.entries(properties)) {
      if (
        key.toLowerCase().includes("password") ||
        key.toLowerCase().includes("token") ||
        key.toLowerCase().includes("cpf") ||
        key.toLowerCase().includes("cnpj") ||
        key.toLowerCase().includes("secret")
      ) {
        continue;
      }
      sanitized[key] = val;
    }
  }

  if (process.env.NODE_ENV === "development") {
    // console.log(`[Analytics] ${event}`, sanitized);
  }

  // In production with PostHog configured:
  // if (typeof window !== "undefined" && (window as any).posthog) {
  //   (window as any).posthog.capture(event, sanitized);
  // }
}

export function captureError(error: Error | unknown, context?: Record<string, unknown>) {
  console.error("[Error Captured]", error, context);
  // In production with Sentry configured:
  // Sentry.captureException(error, { extra: context });
}

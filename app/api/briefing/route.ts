import { NextRequest, NextResponse } from "next/server";
import { MvpBriefingInputSchema, type MvpBriefingPayload } from "@/lib/validation/briefing";
import { createLeadProtocol } from "@/lib/ids";

export async function POST(req: NextRequest) {
  let leadId = createLeadProtocol("IBD", "2026");

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "INVALID_REQUEST", message: "Payload JSON inválido." },
        { status: 400 }
      );
    }

    const parsed = MvpBriefingInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "INVALID_REQUEST",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      name,
      whatsapp,
      service,
      projectSummary,
      website,
      utmSource,
      utmMedium,
      utmCampaign,
    } = parsed.data;

    // Honeypot check: If the hidden website field is filled by a bot, simulate success silently
    if (website && website.trim().length > 0) {
      return NextResponse.json({ ok: true, leadId }, { status: 200 });
    }

    leadId = createLeadProtocol("IBD", "2026");

    const payload: MvpBriefingPayload = {
      leadId,
      source: "mvp-home",
      name,
      whatsapp,
      service,
      projectSummary,
      consent: true,
      submittedAt: new Date().toISOString(),
      utmSource: utmSource ?? null,
      utmMedium: utmMedium ?? null,
      utmCampaign: utmCampaign ?? null,
    };

    const webhookUrl = process.env.N8N_WEBHOOK_URL?.trim();
    const webhookSecret = process.env.N8N_WEBHOOK_SECRET?.trim();

    // If no webhook URL is configured (e.g. local development or mock mode)
    if (!webhookUrl) {
      return NextResponse.json({ ok: true, leadId }, { status: 200 });
    }

    // Forward to n8n with timeout (8 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (webhookSecret) {
        headers["X-IBD-Webhook-Secret"] = webhookSecret;
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Sanitize log: log only HTTP status and leadId, NO PII
        console.error(`[Briefing] n8n webhook returned status ${response.status} for lead ${leadId}`);
        return NextResponse.json(
          { ok: false, error: "SUBMISSION_FAILED" },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true, leadId }, { status: 200 });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      const isTimeout =
        fetchError instanceof Error &&
        (fetchError.name === "AbortError" || fetchError.name === "TimeoutError");
      console.error(
        `[Briefing] n8n dispatch error for lead ${leadId}:`,
        isTimeout ? "Timeout (8s)" : "Network error"
      );
      return NextResponse.json(
        { ok: false, error: "SUBMISSION_FAILED" },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

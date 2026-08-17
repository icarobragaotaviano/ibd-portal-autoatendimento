import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { ProposalInputSchema } from "@/lib/validation";
import { emailProvider } from "@/lib/services/email";
import { proposalSentTemplate } from "@/lib/services/email/templates";
import { ProposalStatus } from "@/lib/domain/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ProposalInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { prospect_id, title, scope, price, currency, valid_until } = parsed.data;

    const proposal = await db.createProposal({
      prospect_id,
      title,
      scope,
      price,
      currency: currency || "BRL",
      status: "draft",
      valid_until: valid_until || null,
      sent_at: null,
      accepted_at: null,
      rejected_at: null,
    });

    await db.updateProspectStage(prospect_id, "proposta_em_preparo");

    await db.createActivityLog({
      actor_type: "admin",
      entity_type: "proposal",
      entity_id: proposal.id,
      event: "proposal.created",
      metadata: { title, version: proposal.version, price },
    });

    return NextResponse.json({ success: true, proposal }, { status: 201 });
  } catch (error) {
    console.error("Error creating proposal:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao criar proposta." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body as { id: string; status: ProposalStatus };

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID e novo status são obrigatórios." },
        { status: 400 }
      );
    }

    const proposal = await db.updateProposalStatus(id, status);
    const prospect = await db.getProspect(proposal.prospect_id);

    if (status === "sent" && prospect) {
      await db.updateProspectStage(prospect.id, "proposta_enviada");
      await db.createActivityLog({
        actor_type: "admin",
        entity_type: "proposal",
        entity_id: proposal.id,
        event: "proposal.sent",
        metadata: { version: proposal.version },
      });

      // Send email
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const proposalUrl = `${appUrl}/guia`;
      const html = proposalSentTemplate({
        clientName: prospect.name,
        proposalTitle: proposal.title,
        proposalUrl,
      });

      await emailProvider.sendEmail({
        to: prospect.email,
        subject: `Proposta comercial IBD: ${proposal.title}`,
        html,
      });
    }

    return NextResponse.json({ success: true, proposal });
  } catch (error) {
    console.error("Error updating proposal:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao atualizar proposta." },
      { status: 500 }
    );
  }
}

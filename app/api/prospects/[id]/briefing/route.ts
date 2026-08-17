import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { BriefingResponsesSchema } from "@/lib/validation";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const briefing = await db.getBriefingByProspectId(id);
    return NextResponse.json({ success: true, briefing });
  } catch (error) {
    console.error("Error fetching briefing:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao buscar briefing." },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const prospect = await db.getProspect(id);

    if (!prospect) {
      return NextResponse.json(
        { success: false, error: "Prospect não encontrado." },
        { status: 404 }
      );
    }

    const body = await req.json();
    const parsed = BriefingResponsesSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { responses, completed } = parsed.data;

    const briefing = await db.saveBriefingResponses(id, responses, completed);

    // Update prospect stage
    if (completed) {
      await db.updateProspectStage(id, "briefing_concluido");
      await db.createActivityLog({
        actor_type: "user",
        entity_type: "prospect",
        entity_id: id,
        event: "briefing.completed",
        metadata: { version: briefing.version },
      });
    } else {
      if (prospect.stage === "novo_lead" || prospect.stage === "manual_enviado") {
        await db.updateProspectStage(id, "briefing_em_andamento");
      }
    }

    return NextResponse.json({ success: true, briefing });
  } catch (error) {
    console.error("Error saving briefing responses:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao salvar respostas do briefing." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { getCurrentClient } from "@/lib/auth/session";
import { RevisionFeedbackSchema } from "@/lib/validation";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let client = await getCurrentClient();
    if (!client) client = await db.getClient("CLI-DEMO01");

    if (!client || !client.portal_enabled) {
      return NextResponse.json({ success: false, error: "Não autorizado." }, { status: 401 });
    }

    const project = await db.getProject(id);
    if (!project || project.client_id !== client.id) {
      return NextResponse.json({ success: false, error: "Projeto não encontrado." }, { status: 404 });
    }

    const body = await req.json();
    const parsed = RevisionFeedbackSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { notes } = parsed.data;

    // Check revision limit
    if (project.revisions_count >= project.revisions_limit) {
      return NextResponse.json(
        {
          success: false,
          error: `O limite de ${project.revisions_limit} rodadas de revisão previstas foi atingido. Ajustes adicionais serão tratados como novo escopo.`,
        },
        { status: 400 }
      );
    }

    const nextRound = project.revisions_count + 1;

    const revision = await db.createProjectRevision({
      project_id: project.id,
      round_number: nextRound,
      status: "em_execucao",
      feedback_received_at: new Date().toISOString(),
      notes,
    });

    // Update project state
    await db.updateProject(project.id, {
      status: "revisao_em_andamento",
      revisions_count: nextRound,
    });

    await db.createActivityLog({
      actor_type: "client",
      actor_id: client.id,
      entity_type: "project",
      entity_id: project.id,
      event: "revision.created",
      metadata: { round: nextRound, notes },
    });

    return NextResponse.json({ success: true, revision }, { status: 201 });
  } catch (error) {
    console.error("Error creating revision request:", error);
    return NextResponse.json({ success: false, error: "Falha ao enviar revisão." }, { status: 500 });
  }
}

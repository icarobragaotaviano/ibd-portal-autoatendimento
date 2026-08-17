import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { getCurrentClient } from "@/lib/auth/session";

export async function POST(
  _req: NextRequest,
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

    if (project.status !== "pausado") {
      return NextResponse.json(
        { success: false, error: "O projeto não está em estado pausado." },
        { status: 400 }
      );
    }

    // Unpause project and set back to production/review
    const updatedStatus = project.revisions_count > 0 ? "revisao_em_andamento" : "em_producao";
    await db.updateProjectStatus(project.id, updatedStatus);

    await db.createActivityLog({
      actor_type: "client",
      actor_id: client.id,
      entity_type: "project",
      entity_id: project.id,
      event: "project.resumed",
      metadata: { previous_status: "pausado", new_status: updatedStatus },
    });

    const updated = await db.getProject(project.id);
    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    console.error("Error resuming project:", error);
    return NextResponse.json({ success: false, error: "Falha ao retomar projeto." }, { status: 500 });
  }
}

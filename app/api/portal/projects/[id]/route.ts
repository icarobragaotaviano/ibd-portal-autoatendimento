import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { getCurrentClient } from "@/lib/auth/session";
import { getProjectNextAction } from "@/lib/domain/next-action";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let client = await getCurrentClient();
    if (!client) {
      client = await db.getClient("CLI-DEMO01");
    }

    if (!client || !client.portal_enabled) {
      return NextResponse.json(
        { success: false, error: "Acesso não autorizado." },
        { status: 401 }
      );
    }

    const project = await db.getProject(id);
    if (!project || project.client_id !== client.id) {
      return NextResponse.json(
        { success: false, error: "Projeto não encontrado para este cliente." },
        { status: 404 }
      );
    }

    const materials = await db.listMaterialsByProject(id);
    const revisions = await db.listRevisionsByProject(id);
    const messages = await db.listMessagesByProject(id);
    const activityLogs = await db.listActivityLogs("project", id);
    const nextAction = getProjectNextAction(project);

    return NextResponse.json({
      success: true,
      project,
      client,
      materials,
      revisions,
      messages,
      activityLogs,
      nextAction,
    });
  } catch (error) {
    console.error("Error fetching portal project:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao buscar projeto." },
      { status: 500 }
    );
  }
}

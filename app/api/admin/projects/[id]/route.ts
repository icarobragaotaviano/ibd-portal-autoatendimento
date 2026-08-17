import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { ProjectStatus } from "@/lib/domain/types";
import { canConfirmDeadline } from "@/lib/domain/project-status";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await db.getProject(id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Projeto não encontrado." },
        { status: 404 }
      );
    }

    const client = await db.getClient(project.client_id);
    const materials = await db.listMaterialsByProject(id);
    const revisions = await db.listRevisionsByProject(id);
    const messages = await db.listMessagesByProject(id);
    const activityLogs = await db.listActivityLogs("project", id);

    return NextResponse.json({
      success: true,
      project,
      client,
      materials,
      revisions,
      messages,
      activityLogs,
    });
  } catch (error) {
    console.error("Error fetching project details:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao buscar detalhes do projeto." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await db.getProject(id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Projeto não encontrado." },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { status, confirmed_deadline, revisions_count, revisions_limit } = body as {
      status?: ProjectStatus;
      confirmed_deadline?: string | null;
      revisions_count?: number;
      revisions_limit?: number;
    };

    // 1. Deadline Confirmation Rule Check
    if (confirmed_deadline && confirmed_deadline !== project.confirmed_deadline) {
      const materials = await db.listMaterialsByProject(id);
      const requiredMaterials = materials.filter((m) => m.required);
      const allRequiredReceived =
        requiredMaterials.length > 0 &&
        requiredMaterials.every((m) => m.status === "recebido" || m.status === "aprovado");

      const isBriefingApproved =
        project.status !== "solicitacao_recebida" && project.status !== "briefing_em_andamento";

      const deadlineCheck = canConfirmDeadline({
        briefingApproved: isBriefingApproved,
        requiredMaterialsReceived: allRequiredReceived,
      });

      if (!deadlineCheck.allowed) {
        return NextResponse.json(
          { success: false, error: deadlineCheck.reason },
          { status: 400 }
        );
      }

      await db.confirmProjectDeadline(id, confirmed_deadline);
      await db.createActivityLog({
        actor_type: "admin",
        entity_type: "project",
        entity_id: id,
        event: "deadline.confirmed",
        metadata: { deadline: confirmed_deadline },
      });
    }

    // 2. Status Updates
    if (status && status !== project.status) {
      await db.updateProjectStatus(id, status);
      await db.createActivityLog({
        actor_type: "admin",
        entity_type: "project",
        entity_id: id,
        event: "project.status_changed",
        metadata: { from: project.status, to: status },
      });
    }

    // 3. Revisions updates
    if (revisions_count !== undefined || revisions_limit !== undefined) {
      await db.updateProject(id, {
        revisions_count: revisions_count ?? project.revisions_count,
        revisions_limit: revisions_limit ?? project.revisions_limit,
      });
    }

    const updated = await db.getProject(id);
    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao atualizar projeto." },
      { status: 500 }
    );
  }
}

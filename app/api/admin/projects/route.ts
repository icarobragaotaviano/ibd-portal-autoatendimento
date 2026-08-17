import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { ProjectStatus } from "@/lib/domain/types";
import { canConfirmDeadline } from "@/lib/domain/project-status";

export async function GET() {
  try {
    const projects = await db.listAllProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("Error listing projects:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao listar projetos." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { client_id, title, service, scope_description, desired_deadline, estimated_deadline } = body;

    if (!client_id || !title || !service || !scope_description) {
      return NextResponse.json(
        { success: false, error: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    const project = await db.createProject({
      client_id,
      title,
      service,
      scope_description,
      status: "solicitacao_recebida",
      desired_deadline: desired_deadline || null,
      estimated_deadline: estimated_deadline || null,
      confirmed_deadline: null,
      deadline_confirmed_at: null,
    });

    await db.createActivityLog({
      actor_type: "admin",
      entity_type: "project",
      entity_id: project.id,
      event: "project.created",
      metadata: { title, client_id },
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao criar projeto." },
      { status: 500 }
    );
  }
}

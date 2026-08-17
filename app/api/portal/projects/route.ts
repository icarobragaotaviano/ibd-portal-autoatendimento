import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { getCurrentClient } from "@/lib/auth/session";
import { ProjectRequestSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
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

    const body = await req.json();
    const parsed = ProjectRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { service, title, scope_description, desired_deadline } = parsed.data;

    // Active client creates new project in status 'solicitacao_recebida'
    const project = await db.createProject({
      client_id: client.id,
      title,
      service,
      scope_description,
      status: "solicitacao_recebida",
      desired_deadline: desired_deadline || null,
      estimated_deadline: null,
      confirmed_deadline: null,
      deadline_confirmed_at: null,
    });

    await db.createActivityLog({
      actor_type: "client",
      actor_id: client.id,
      entity_type: "project",
      entity_id: project.id,
      event: "project.created",
      metadata: { title, service, client_name: client.name },
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project request:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao criar nova solicitação." },
      { status: 500 }
    );
  }
}

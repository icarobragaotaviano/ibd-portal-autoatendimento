import { NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { getCurrentClient } from "@/lib/auth/session";
import { getProjectNextAction } from "@/lib/domain/next-action";

export async function GET() {
  try {
    // 1. Resolve client server-side
    let client = await getCurrentClient();

    // Fallback in mock development mode if not logged in: use demo client
    if (!client) {
      client = await db.getClient("CLI-DEMO01");
    }

    if (!client || !client.portal_enabled) {
      return NextResponse.json(
        { success: false, error: "Acesso ao portal não autorizado." },
        { status: 401 }
      );
    }

    const projects = await db.listProjectsByClient(client.id);

    // Compute next actions for each project
    const projectsWithNextAction = projects.map((prj) => ({
      ...prj,
      nextAction: getProjectNextAction(prj),
    }));

    // Find the most urgent priority project (where owner === "client")
    const priorityProject =
      projectsWithNextAction.find((p) => p.nextAction.owner === "client") ||
      projectsWithNextAction[0] ||
      null;

    const activeProjects = projectsWithNextAction.filter(
      (p) => p.status !== "concluido" && p.status !== "cancelado"
    );
    const waitingClientProjects = projectsWithNextAction.filter(
      (p) => p.nextAction.owner === "client"
    );
    const completedProjects = projectsWithNextAction.filter((p) => p.status === "concluido");

    return NextResponse.json({
      success: true,
      client,
      priorityProject,
      activeProjects,
      waitingClientProjects,
      completedProjects,
      allProjects: projectsWithNextAction,
    });
  } catch (error) {
    console.error("Error fetching portal overview:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao carregar dados do portal." },
      { status: 500 }
    );
  }
}

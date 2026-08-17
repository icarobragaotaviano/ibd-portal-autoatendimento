import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { emailProvider } from "@/lib/services/email";
import { followUpDay3Template, projectPausedTemplate } from "@/lib/services/email/templates";
import { checkReturnThresholds } from "@/lib/domain/business-days";

export async function GET(req: NextRequest) {
  try {
    // 1. Validate Cron Secret Header if configured
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: "Acesso não autorizado para o Cron Job." },
        { status: 401 }
      );
    }

    const projects = await db.listAllProjects();
    const results = {
      evaluated: 0,
      day3FollowupsSent: 0,
      day6Paused: 0,
    };

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    for (const prj of projects) {
      if (prj.status === "versao_enviada" || prj.status === "aguardando_retorno") {
        results.evaluated++;

        const thresholds = checkReturnThresholds(prj.updated_at);
        const client = await db.getClient(prj.client_id);
        const clientEmail = client?.email;
        const clientName = client?.name || "Cliente";

        // Check Day 6 Pause Rule
        if (thresholds.isDay6Due) {
          await db.updateProjectStatus(prj.id, "pausado");
          await db.createActivityLog({
            actor_type: "system",
            entity_type: "project",
            entity_id: prj.id,
            event: "project.paused_day6",
            metadata: {
              days_elapsed: thresholds.businessDaysPassed,
              reason: "6 dias úteis sem retorno após envio de versão",
            },
          });

          if (clientEmail) {
            const html = projectPausedTemplate({
              clientName,
              projectTitle: prj.title,
              projectUrl: `${appUrl}/portal/projetos/${prj.id}`,
            });

            await emailProvider.sendEmail({
              to: clientEmail,
              subject: `Projeto pausado: ${prj.title} — IBD`,
              html,
            });
          }

          results.day6Paused++;
        }
        // Check Day 3 Follow-up Rule
        else if (thresholds.isDay3Due && prj.status === "versao_enviada") {
          await db.updateProjectStatus(prj.id, "aguardando_retorno");
          await db.createActivityLog({
            actor_type: "system",
            entity_type: "project",
            entity_id: prj.id,
            event: "project.followup_day3",
            metadata: {
              days_elapsed: thresholds.businessDaysPassed,
            },
          });

          if (clientEmail) {
            const html = followUpDay3Template({
              clientName,
              projectTitle: prj.title,
              projectUrl: `${appUrl}/portal/projetos/${prj.id}`,
            });

            await emailProvider.sendEmail({
              to: clientEmail,
              subject: `Versão aguardando seu retorno: ${prj.title} — IBD`,
              html,
            });
          }

          results.day3FollowupsSent++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
    });
  } catch (error) {
    console.error("Error executing cron project status check:", error);
    return NextResponse.json(
      { success: false, error: "Falha na execução do Cron Job." },
      { status: 500 }
    );
  }
}

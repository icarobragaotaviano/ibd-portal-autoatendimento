import { NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { DateTime } from "luxon";
import { checkReturnThresholds, TIMEZONE } from "@/lib/domain/business-days";

export async function GET() {
  try {
    const prospects = await db.listProspects();
    const proposals = await db.listAllProposals();
    const projects = await db.listAllProjects();
    const clients = await db.listClients();

    const newLeads = prospects.filter((p) => p.stage === "novo_lead" || p.stage === "briefing_em_andamento");
    const pendingProposals = proposals.filter((p) => p.status === "draft" || p.status === "sent");
    const inProductionProjects = projects.filter((p) => p.status === "em_producao");
    const waitingClientProjects = projects.filter(
      (p) =>
        p.status === "aguardando_retorno" ||
        p.status === "versao_enviada" ||
        p.status === "aguardando_material"
    );

    const now = DateTime.now().setZone(TIMEZONE);

    // Deadlines within next 3 days
    const upcomingDeadlines = projects.filter((p) => {
      if (!p.confirmed_deadline || p.status === "concluido" || p.status === "cancelado") return false;
      const deadline = DateTime.fromISO(p.confirmed_deadline).setZone(TIMEZONE);
      const diffDays = deadline.diff(now, "days").days;
      return diffDays >= 0 && diffDays <= 3;
    });

    // Attention alerts
    const attentionItems: Array<{
      id: string;
      type: "return_delay" | "pending_material" | "imminent_deadline" | "new_lead";
      title: string;
      description: string;
      actionUrl: string;
      severity: "warning" | "danger" | "info";
    }> = [];

    // 1. Projects waiting for return (Day 3+ or Day 6+)
    for (const prj of projects) {
      if (prj.status === "aguardando_retorno" || prj.status === "versao_enviada") {
        const check = checkReturnThresholds(prj.updated_at, now.toISO() || undefined);
        if (check.isDay6Due) {
          const client = await db.getClient(prj.client_id);
          attentionItems.push({
            id: `att-pause-${prj.id}`,
            type: "return_delay",
            title: `${client?.name || "Cliente"}: 6+ dias sem retorno`,
            description: `Projeto "${prj.title}" atingiu o limite de espera e deve ser pausado.`,
            actionUrl: `/admin/projects/${prj.id}`,
            severity: "danger",
          });
        } else if (check.isDay3Due) {
          const client = await db.getClient(prj.client_id);
          attentionItems.push({
            id: `att-follow-${prj.id}`,
            type: "return_delay",
            title: `${client?.name || "Cliente"}: 3 dias sem retorno`,
            description: `Versão de "${prj.title}" aguardando resposta para follow-up.`,
            actionUrl: `/admin/projects/${prj.id}`,
            severity: "warning",
          });
        }
      }

      // 2. Pending Materials
      if (prj.status === "aguardando_material") {
        const client = await db.getClient(prj.client_id);
        attentionItems.push({
          id: `att-mat-${prj.id}`,
          type: "pending_material",
          title: `${client?.name || "Cliente"}: Materiais pendentes`,
          description: `Projeto "${prj.title}" não pode iniciar produção antes dos materiais.`,
          actionUrl: `/admin/projects/${prj.id}`,
          severity: "warning",
        });
      }

      // 3. Imminent Deadline (Tomorrow or Today)
      if (prj.confirmed_deadline && (prj.status === "em_producao" || prj.status === "revisao_em_andamento")) {
        const deadline = DateTime.fromISO(prj.confirmed_deadline).setZone(TIMEZONE);
        const diffDays = Math.ceil(deadline.diff(now, "days").days);
        if (diffDays <= 1) {
          const client = await db.getClient(prj.client_id);
          attentionItems.push({
            id: `att-dead-${prj.id}`,
            type: "imminent_deadline",
            title: `${client?.name || "Cliente"}: Prazo ${diffDays === 0 ? "Hoje" : "Amanhã"}`,
            description: `Entrega de "${prj.title}" programada para ${prj.confirmed_deadline}.`,
            actionUrl: `/admin/projects/${prj.id}`,
            severity: "danger",
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      stats: {
        newLeadsCount: newLeads.length,
        pendingProposalsCount: pendingProposals.length,
        inProductionCount: inProductionProjects.length,
        waitingClientCount: waitingClientProjects.length,
        upcomingDeadlinesCount: upcomingDeadlines.length,
        totalClientsCount: clients.length,
      },
      attentionItems,
      recentProspects: prospects.slice(0, 5),
      recentProjects: projects.slice(0, 5),
    });
  } catch (error) {
    console.error("Error generating admin overview:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao gerar visão geral do admin." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getRequestRepository } from "@/lib/services/database";
import { getEmailProvider } from "@/lib/services/email";
import { getProjectPausedEmailHTML } from "@/lib/services/email/templates";
import { getBusinessDaysDifference } from "@/lib/business-days";

export async function GET(request: NextRequest) {
  try {
    // 1. Validação de segurança
    const authHeader = request.headers.get("Authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
    }

    const repo = getRequestRepository();
    const emailProvider = getEmailProvider();
    const allRequests = await repo.listAll();

    const nowISO = new Date().toISOString();
    const processed: string[] = [];

    // 2. Filtra solicitações aguardando retorno do cliente
    const pendingRequests = allRequests.filter((req) => req.status === "aguardando_retorno");

    for (const req of pendingRequests) {
      // Calcula a quantidade de dias úteis desde a última alteração (updatedAt)
      const businessDaysElapsed = getBusinessDaysDifference(req.updatedAt, nowISO);

      if (businessDaysElapsed === 3) {
        // Dia 3: Enviar lembrete sutil por e-mail
        const subject = `[Lembrete] Aguardamos seu retorno — Protocolo ${req.id}`;
        const html = `
          <h1>Aguardamos seu retorno para continuar.</h1>
          <p>Olá, <strong>${req.clientName}</strong>,</p>
          <p>Enviamos uma atualização sobre a demanda <strong>${req.id}</strong> há 3 dias úteis e estamos aguardando seu feedback ou material adicional para prosseguir.</p>
          <p><strong>Atenção:</strong> De acordo com as nossas políticas, projetos parados sem retorno por mais de 6 dias úteis são pausados automaticamente para manter o cronograma de entregas justo para todos os clientes.</p>
          <a href="https://ibd-portal.vercel.app/status" style="display: inline-block; background-color: #ffd400; color: #050505; padding: 14px 28px; border-radius: 999px; font-weight: bold; text-decoration: none; margin-top: 20px;" target="_blank">Acessar Portal</a>
        `;
        
        await emailProvider.sendEmail({
          to: req.clientEmail,
          subject,
          html,
        });

        processed.push(`${req.id} (Lembrete enviado)`);
      } else if (businessDaysElapsed >= 6) {
        // Dia 6+: Pausa automática do projeto
        await repo.update(req.id, {
          status: "pausado",
        });

        const subject = `Projeto pausado temporariamente — Protocolo ${req.id}`;
        const html = getProjectPausedEmailHTML(
          req.clientName,
          req.id,
          "Ausência de retorno/feedback sobre o projeto por mais de 6 dias úteis."
        );

        await emailProvider.sendEmail({
          to: req.clientEmail,
          subject,
          html,
        });

        processed.push(`${req.id} (Pausado automaticamente)`);
      }
    }

    return NextResponse.json({
      ok: true,
      processedCount: processed.length,
      actions: processed,
    });
  } catch (error) {
    console.error("cron_error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { error: "Erro ao executar rotina de controle de status." },
      { status: 500 }
    );
  }
}

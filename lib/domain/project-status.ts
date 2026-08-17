import { ProjectStatus } from "./types";

export const projectMessages: Record<ProjectStatus, string> = {
  solicitacao_recebida:
    "Solicitação recebida. Vou revisar as informações antes de confirmar o escopo.",

  briefing_em_andamento:
    "Briefing em andamento. As próximas perguntas ajudam a definir exatamente o que será produzido.",

  briefing_aprovado:
    "Briefing aprovado. O próximo passo é conferir os materiais necessários.",

  aguardando_material:
    "Você pode enviar os materiais aqui. O prazo de produção começa quando os itens obrigatórios forem recebidos.",

  aguardando_inicio:
    "Tudo pronto para começar. O projeto está aguardando a data programada de início.",

  em_producao:
    "Produção em andamento. O prazo confirmado aparece nos detalhes do projeto.",

  versao_enviada:
    "Versão enviada. Você pode aprovar ou solicitar ajustes dentro das rodadas de revisão previstas.",

  aguardando_retorno:
    "A versão está aguardando seu retorno. Você pode aprovar ou enviar os ajustes pelo portal.",

  revisao_em_andamento:
    "Revisão em andamento. Os ajustes recebidos estão sendo aplicados.",

  pausado:
    "O projeto está pausado por ausência de retorno. Responda para solicitar a retomada.",

  concluido:
    "Projeto concluído. Os registros permanecem disponíveis no portal.",

  cancelado:
    "Este projeto foi cancelado.",
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  solicitacao_recebida: "Solicitação Recebida",
  briefing_em_andamento: "Briefing em Andamento",
  briefing_aprovado: "Briefing Aprovado",
  aguardando_material: "Aguardando Material",
  aguardando_inicio: "Aguardando Início",
  em_producao: "Em Produção",
  versao_enviada: "Versão Enviada",
  aguardando_retorno: "Aguardando Retorno",
  revisao_em_andamento: "Revisão em Andamento",
  pausado: "Pausado",
  concluido: "Concluído",
  cancelado: "Cancelado",
};

export function canTransitionProjectStatus(
  current: ProjectStatus,
  next: ProjectStatus
): boolean {
  if (current === next) return true;
  if (current === "concluido" || current === "cancelado") return false;
  if (next === "cancelado") return true;

  const allowedTransitions: Record<ProjectStatus, ProjectStatus[]> = {
    solicitacao_recebida: ["briefing_em_andamento", "briefing_aprovado", "cancelado"],
    briefing_em_andamento: ["briefing_aprovado", "cancelado"],
    briefing_aprovado: ["aguardando_material", "aguardando_inicio", "em_producao", "cancelado"],
    aguardando_material: ["aguardando_inicio", "em_producao", "cancelado"],
    aguardando_inicio: ["em_producao", "cancelado"],
    em_producao: ["versao_enviada", "aguardando_retorno", "cancelado"],
    versao_enviada: ["aguardando_retorno", "revisao_em_andamento", "concluido", "pausado", "cancelado"],
    aguardando_retorno: ["revisao_em_andamento", "concluido", "pausado", "cancelado"],
    revisao_em_andamento: ["versao_enviada", "aguardando_retorno", "concluido", "cancelado"],
    pausado: ["aguardando_inicio", "em_producao", "revisao_em_andamento", "cancelado"],
    concluido: [],
    cancelado: [],
  };

  return allowedTransitions[current]?.includes(next) ?? false;
}

export function canConfirmDeadline(params: {
  briefingApproved: boolean;
  requiredMaterialsReceived: boolean;
}): { allowed: boolean; reason?: string } {
  if (!params.briefingApproved) {
    return {
      allowed: false,
      reason: "O prazo só pode ser confirmado após o briefing estar aprovado.",
    };
  }

  if (!params.requiredMaterialsReceived) {
    return {
      allowed: false,
      reason: "O prazo só pode ser confirmado após todos os materiais obrigatórios serem recebidos.",
    };
  }

  return { allowed: true };
}

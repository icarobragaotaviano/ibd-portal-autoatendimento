import { Project, ProjectNextAction } from "./types";

export function getProjectNextAction(project: Project): ProjectNextAction {
  switch (project.status) {
    case "solicitacao_recebida":
      return {
        owner: "ibd",
        title: "Análise inicial da solicitação",
        description: "O IBD está analisando os detalhes e escopo para direcionar os próximos passos.",
        action: "Aguardar análise",
      };

    case "briefing_em_andamento":
      return {
        owner: "client",
        title: "Responder perguntas do briefing",
        description: "Complete as etapas do briefing para alinharmos os objetivos e entregáveis.",
        action: "Responder briefing",
        actionUrl: `/portal/projetos/${project.id}/briefing`,
      };

    case "briefing_aprovado":
      return {
        owner: "ibd",
        title: "Definição de materiais e início",
        description: "Briefing aprovado. O IBD está listando os materiais necessários para a produção.",
        action: "Aguardar checklist",
      };

    case "aguardando_material":
      return {
        owner: "client",
        title: "Enviar materiais pendentes",
        description: "Para iniciar a produção e confirmar o prazo, envie os textos, referências e arquivos obrigatórios.",
        action: "Enviar materiais",
        actionUrl: `/portal/projetos/${project.id}#materiais`,
      };

    case "aguardando_inicio":
      return {
        owner: "ibd",
        title: "Aguardando data programada",
        description: "Tudo pronto. O projeto iniciará na data de agendamento confirmada.",
        action: "Aguardar início",
      };

    case "em_producao":
      return {
        owner: "ibd",
        title: "Produção em andamento",
        description: project.confirmed_deadline
          ? `O IBD está desenvolvendo o projeto com entrega prevista para ${project.confirmed_deadline}.`
          : "O IBD está desenvolvendo o projeto.",
        action: "Aguardar versão",
      };

    case "versao_enviada":
    case "aguardando_retorno":
      return {
        owner: "client",
        title: "Avaliar versão enviada",
        description: "Uma nova versão foi disponibilizada. Aprove a entrega ou envie apontamentos de ajuste.",
        action: "Avaliar versão",
        actionUrl: `/portal/projetos/${project.id}#revisoes`,
      };

    case "revisao_em_andamento":
      return {
        owner: "ibd",
        title: "Execução dos ajustes",
        description: `O IBD está aplicando as alterações solicitadas na rodada ${project.revisions_count} de ${project.revisions_limit}.`,
        action: "Aguardar nova versão",
      };

    case "pausado":
      return {
        owner: "client",
        title: "Solicitar retomada",
        description: "O projeto foi pausado por ausência de retorno. Responda para reabrirmos a agenda e definirmos novo prazo.",
        action: "Retomar projeto",
        actionUrl: `/portal/projetos/${project.id}#retomada`,
      };

    case "concluido":
      return {
        owner: "none",
        title: "Projeto concluído",
        description: "Todos os arquivos e marcos aprovados permanecem disponíveis no portal.",
        action: "Ver arquivos",
        actionUrl: `/portal/projetos/${project.id}`,
      };

    case "cancelado":
      return {
        owner: "none",
        title: "Projeto cancelado",
        description: "Este projeto foi encerrado.",
      };

    default:
      return {
        owner: "none",
        title: "Sem ações pendentes",
        description: "Nenhuma ação imediata necessária.",
      };
  }
}

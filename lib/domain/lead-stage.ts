import { LeadStage } from "./types";

export const leadMessages: Record<LeadStage, string> = {
  novo_lead:
    "Recebi sua solicitação. O próximo passo é entender melhor o projeto.",

  manual_enviado:
    "Antes do briefing, veja como funciona o processo. A leitura leva poucos minutos.",

  briefing_em_andamento:
    "Para entender bem o projeto, vou fazer até 3 perguntas por etapa.",

  briefing_concluido:
    "Briefing recebido. Agora vou analisar as informações e preparar o próximo passo.",

  proposta_em_preparo:
    "Seu projeto está em análise para definição de escopo, prazo e investimento.",

  proposta_enviada:
    "Proposta enviada. Depois da aprovação seguimos para formalização do projeto.",

  negociacao:
    "Estamos alinhando os detalhes finais da proposta.",

  contrato_fechado:
    "Contrato registrado. O acesso ao portal será ativado pelo IBD.",

  convertido:
    "Seu acesso ao Portal do Cliente foi ativado.",

  descartado:
    "Esta solicitação foi arquivada ou descartada.",
};

export const leadStageLabels: Record<LeadStage, string> = {
  novo_lead: "Novo Lead",
  manual_enviado: "Manual Enviado",
  briefing_em_andamento: "Briefing em Andamento",
  briefing_concluido: "Briefing Concluído",
  proposta_em_preparo: "Proposta em Preparo",
  proposta_enviada: "Proposta Enviada",
  negociacao: "Em Negociação",
  contrato_fechado: "Contrato Fechado",
  convertido: "Convertido em Cliente",
  descartado: "Descartado",
};

export function canTransitionLeadStage(current: LeadStage, next: LeadStage): boolean {
  if (current === next) return true;
  if (current === "convertido") return false; // Converted is terminal for prospect
  if (next === "descartado") return true; // Can discard from any stage except converted

  const allowedTransitions: Record<LeadStage, LeadStage[]> = {
    novo_lead: ["manual_enviado", "briefing_em_andamento", "descartado"],
    manual_enviado: ["briefing_em_andamento", "descartado"],
    briefing_em_andamento: ["briefing_concluido", "descartado"],
    briefing_concluido: ["proposta_em_preparo", "proposta_enviada", "descartado"],
    proposta_em_preparo: ["proposta_enviada", "descartado"],
    proposta_enviada: ["negociacao", "contrato_fechado", "descartado"],
    negociacao: ["contrato_fechado", "proposta_enviada", "descartado"],
    contrato_fechado: ["convertido", "descartado"],
    convertido: [],
    descartado: ["novo_lead"],
  };

  return allowedTransitions[current]?.includes(next) ?? false;
}

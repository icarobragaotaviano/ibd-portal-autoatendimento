import type { RequestStatus } from "@/lib/types";

export const orientacoes = {
  novoContato: {
    titulo: "Começar solicitação",
    texto: "Me conta o que você precisa. Pode ser direto: tipo de peça, objetivo e prazo desejado.",
  },
  manual: {
    titulo: "Como funciona o processo",
    texto: "Antes de começar, leia o guia do cliente. Ele explica briefing, prazo, revisões e retorno.",
  },
  briefing: {
    titulo: "Briefing",
    texto: "Para entender o projeto, vou te fazer algumas perguntas. São até 3 perguntas por vez.",
  },
  materialPendente: {
    titulo: "Material pendente",
    texto: "Você pode enviar os materiais agora ou depois. O prazo de produção começa quando eles chegarem.",
  },
  prazoEstimado: {
    titulo: "Data estimada",
    texto: "A data informada ainda é uma estimativa. Ela será confirmada após briefing aprovado e material recebido.",
  },
  prazoConfirmado: {
    titulo: "Prazo confirmado",
    texto: "Briefing aprovado e material em mãos. A entrega está prevista para a data confirmada por escrito.",
  },
  revisao: {
    titulo: "Revisão",
    texto: "Este projeto inclui 2 rodadas de revisão dentro do que foi combinado no briefing.",
  },
  foraDeEscopo: {
    titulo: "Pedido fora do escopo",
    texto: "Boa ideia. Como isso está fora do briefing, posso orçar separadamente ou incluir como próximo job.",
  },
  statusDia3: {
    titulo: "Aguardando retorno",
    texto: "Te enviei a versão no dia combinado. Precisa de algum ajuste ou posso seguir?",
  },
  pausaDia6: {
    titulo: "Projeto pausado",
    texto: "Como não tive retorno, o projeto ficou pausado. Quando você responder, retomo e passo a nova data.",
  },
  retornoAposPausa: {
    titulo: "Retorno do projeto",
    texto: "Bem-vindo de volta. Vou verificar a agenda e te passo a nova data de entrega a partir de hoje.",
  },
} as const;

export const statusMessages: Record<RequestStatus, string> = {
  novo: "Solicitação recebida. Próximo passo: entender o projeto por meio do briefing.",
  briefing_em_andamento: "Briefing em andamento. Responda às perguntas para eu confirmar o escopo.",
  briefing_aprovado: "Briefing aprovado. Agora preciso receber os materiais para iniciar a produção.",
  aguardando_material: "Aguardando material. O prazo de produção começa quando os arquivos chegarem.",
  em_producao: "Produção em andamento. A data de entrega confirmada será mostrada aqui.",
  versao_enviada: "Versão enviada. Você pode pedir ajustes dentro das 2 rodadas de revisão inclusas.",
  aguardando_retorno: "Aguardando seu retorno. Se passarem 3 dias úteis, eu te mando uma mensagem de status.",
  pausado: "Projeto pausado por falta de retorno. Responda para retomarmos.",
  revisao_em_andamento: "Revisão em andamento. Estou aplicando os ajustes solicitados.",
  concluido: "Projeto concluído. Fico à disposição para próximas demandas.",
};

export const statusLabels: Record<RequestStatus, string> = {
  novo: "Novo",
  briefing_em_andamento: "Briefing em andamento",
  briefing_aprovado: "Briefing aprovado",
  aguardando_material: "Aguardando material",
  em_producao: "Em produção",
  versao_enviada: "Versão enviada",
  aguardando_retorno: "Aguardando retorno",
  pausado: "Pausado",
  revisao_em_andamento: "Revisão em andamento",
  concluido: "Concluído",
};

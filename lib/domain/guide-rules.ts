export type CompanionState = "neutral" | "attention" | "success" | "action";

export interface CompanionMessage {
  id: string;
  type: "explain" | "assist" | "warn" | "confirm";
  state: CompanionState;
  title: string;
  content: string;
  exampleTemplate?: string;
  guideLink?: {
    label: string;
    href: string;
  };
}

export interface RuleContext {
  route?: string;
  step?: number;
  focusedField?: string | null;
  service?: string;
  hasMaterials?: boolean | string;
  desiredDate?: string;
  revisionsUsed?: number;
  status?: string;
}

/**
 * Catálogo e Motor de Regras Determinístico do IBD Guia.
 * 100% Previsível, Auditável, Rápido e Sem IA em Runtime.
 */
export function getContextualGuideMessage(ctx: RuleContext): CompanionMessage {
  const field = ctx.focusedField;
  const service = ctx.service;

  // 1. Regras por Campo Focado
  if (field === "need_description" || field === "objective" || field === "momento_e_objetivo") {
    return {
      id: "objective_help",
      type: "assist",
      state: "action",
      title: "O que colocar aqui?",
      content:
        "Em vez de apenas descrever o formato, me diga o que essa peça precisa alcançar. Ex: 'Divulgar as inscrições do evento e levar as pessoas para o WhatsApp.'",
      exampleTemplate: "Preciso de um(a) [tipo de peça] para [objetivo principal] direcionando para [WhatsApp/Site/Hotmart].",
      guideLink: {
        label: "Ver Guia de Briefing",
        href: "/guia/manual",
      },
    };
  }

  if (field === "desired_deadline" || field === "desired_date" || field === "data_critica_evento") {
    return {
      id: "deadline_explanation",
      type: "explain",
      state: "attention",
      title: "Sobre a data informada",
      content:
        "Essa data me ajuda a planejar a agenda, mas ainda é uma estimativa. O prazo oficial de entrega é confirmado bilateralmente depois que o briefing e os materiais estiverem 100% completos.",
      guideLink: {
        label: "Entenda a Regra de Prazos",
        href: "/guia/prazos",
      },
    };
  }

  if (field === "has_material" || field === "materiais_disponiveis") {
    if (ctx.hasMaterials === false || ctx.hasMaterials === "nao" || ctx.hasMaterials === "pendente") {
      return {
        id: "material_missing",
        type: "assist",
        state: "neutral",
        title: "Tudo bem, você pode continuar",
        content:
          "Vou registrar quais arquivos ainda faltam (logos, fotos, textos). O prazo de produção inicia quando os itens necessários forem recebidos.",
        guideLink: {
          label: "Guia de Preparação de Materiais",
          href: "/guia/material",
        },
      };
    }
    return {
      id: "material_guidance",
      type: "explain",
      state: "neutral",
      title: "Formatos recomendados",
      content:
        "Para marcas, envie sempre em SVG, AI ou PDF vetorizado. Para fotos, prefira arquivos originais (evite fotos baixadas do WhatsApp).",
      guideLink: {
        label: "Ver padrões de envio",
        href: "/guia/material",
      },
    };
  }

  if (field === "revisions" || field === "ajustes") {
    return {
      id: "revisions_help",
      type: "warn",
      state: "attention",
      title: "Rodadas de Revisão (2 inclusas)",
      content:
        "Você tem 2 rodadas completas inclusas no projeto para refinar textos, cores, imagens e diagramação dentro do escopo combinado no briefing.",
      guideLink: {
        label: "Como funcionam as revisões",
        href: "/guia/revisoes",
      },
    };
  }

  // 2. Regras por Serviço Selecionado
  if (service === "landing-page" || service === "landing_page") {
    return {
      id: "service_landing_page",
      type: "explain",
      state: "neutral",
      title: "Landing Page de Alta Conversão",
      content:
        "Focamos na hierarquia visual, clareza da proposta de valor e velocidade no mobile. Vamos precisar definir o destino principal do botão (ex: WhatsApp ou Checkout).",
    };
  }

  if (service === "identidade-visual" || service === "branding") {
    return {
      id: "service_branding",
      type: "explain",
      state: "neutral",
      title: "Identidade Visual & Marca",
      content:
        "Construímos uma presença consistente: tipografia, paleta e aplicações no mundo real. O briefing guiará o posicionamento antes dos primeiros rascunhos.",
    };
  }

  if (service === "redes-sociais" || service === "social-media") {
    return {
      id: "service_social",
      type: "explain",
      state: "neutral",
      title: "Peças para Redes Sociais",
      content:
        "Desenvolvemos templates e layouts com contraste editorial que se destacam no feed sem poluição visual.",
    };
  }

  // 3. Regras por Status do Projeto no Portal
  if (ctx.status === "em_revisao") {
    return {
      id: "status_em_revisao",
      type: "assist",
      state: "action",
      title: "Sua avaliação é o próximo passo",
      content:
        "A primeira versão já está disponível. Você tem até 3 dias úteis para aprovar ou solicitar ajustes estruturados dentro das 2 rodadas inclusas.",
      guideLink: {
        label: "Guia de Revisões",
        href: "/guia/revisoes",
      },
    };
  }

  if (ctx.status === "pausado") {
    return {
      id: "status_pausado",
      type: "explain",
      state: "attention",
      title: "Que bom ter você de volta",
      content:
        "Como ficamos sem retorno nos últimos 6 dias úteis, o projeto foi pausado para proteger a agenda. Basta enviar seus comentários e reabriremos com uma nova data confirmada.",
      guideLink: {
        label: "Regra de Retorno e Pausa",
        href: "/guia/retorno-e-pausa",
      },
    };
  }

  // 4. Mensagem Padrão Acolhedora
  return {
    id: "default_guide",
    type: "explain",
    state: "neutral",
    title: "IBD Guia",
    content:
      "Estou aqui para orientar cada etapa da sua solicitação. Sem termos técnicos difíceis: preencha no seu ritmo e eu te ajudo.",
  };
}

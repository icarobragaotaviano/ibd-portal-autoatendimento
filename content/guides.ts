export type GuideSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  numbered?: string[];
  callout?: string;
};

export type Guide = {
  slug: string;
  title: string;
  summary: string;
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: "manual",
    title: "Manual do Cliente",
    summary: "O fluxo completo, do primeiro contato à entrega final aprovada.",
    sections: [
      {
        heading: "Visão Geral do Processo",
        paragraphs: [
          "Todo projeto começa com briefing. O briefing alinha exatamente o que será entregue, quais são os objetivos de negócio e quem é o público-alvo.",
        ],
        numbered: [
          "Você envia a solicitação inicial e responde ao briefing guiado.",
          "O IBD analisa as informações e apresenta a proposta comercial detalhada.",
          "Com o contrato assinado, o acesso ao Portal do Cliente é ativado.",
          "Você envia os materiais obrigatórios pelo portal.",
          "O prazo de produção é confirmado e o desenvolvimento tem início.",
          "Você recebe as versões para aprovação ou rodadas de revisão.",
          "Após a aprovação final, os arquivos são disponibilizados no portal.",
        ],
        callout: "O portal centraliza todos os arquivos, prazos e marcos do seu projeto em tempo real.",
      },
    ],
  },
  {
    slug: "prazos",
    title: "Prazos e Estimativas",
    summary: "A diferença fundamental entre data desejada, estimativa e prazo confirmado.",
    sections: [
      {
        heading: "Os Três Conceitos de Data",
        paragraphs: ["No IBD, trabalhamos com distinção rigorosa de prazos para garantir previsibilidade:"],
        bullets: [
          "Data Desejada: Data ideal informada por você no início do contato.",
          "Estimativa: Projeção de cronograma baseada na análise preliminar de escopo e agenda.",
          "Prazo Confirmado: Compromisso oficial de entrega assumido após o cumprimento dos pré-requisitos.",
        ],
        callout: "O prazo de produção só se torna compromisso após duas condições atendidas: 1. Briefing aprovado; 2. Materiais obrigatórios recebidos.",
      },
      {
        heading: "O que acontece se faltar material?",
        paragraphs: ["Sem os materiais obrigatórios (textos, logos vetoriais ou fotos), o projeto permanece aguardando. O prazo oficial só começa a contar quando os itens forem enviados."],
      },
    ],
  },
  {
    slug: "revisoes",
    title: "Rodadas de Revisão",
    summary: "Como funcionam as 2 rodadas inclusas e o que constitui novo escopo.",
    sections: [
      {
        heading: "2 Rodadas Estruturadas Inclusas",
        paragraphs: ["Cada projeto inclui 2 rodadas de revisão completas dentro do escopo definido no briefing aprovado."],
        bullets: [
          "Ajustes de cores, tipografia e hierarquia visual.",
          "Correções ortográficas e refinamentos de diagramação.",
          "Ajuste de posição, proporção e equilíbrio de elementos gráficos.",
          "Alinhamento de detalhes que divergiram do briefing aprovado.",
        ],
        callout: "Mudanças estruturais de direção criativa, troca completa de conceito ou adição de novos itens não contam como revisão comum; são orçadas como novo escopo.",
      },
    ],
  },
  {
    slug: "materiais",
    title: "Envio de Materiais",
    summary: "Guia de formatos, resoluções e arquivos necessários para iniciar a produção.",
    sections: [
      {
        heading: "Checklist de Materiais Recomendados",
        paragraphs: ["Para garantir o máximo de qualidade técnica e agilidade no desenvolvimento, envie:"],
        bullets: [
          "Logo vetorial: Formatos .AI, .SVG ou .EPS.",
          "Imagens: Fotografias em alta resolução (mínimo 300 DPI para impressão ou 2000px para web).",
          "Textos: Documento editável com copy final revisada e aprovada.",
          "Manual de Marca: Paleta de cores (CMYK/RGB/HEX) e fontes institucionais, se existirem.",
        ],
        callout: "Todos os materiais são enviados com segurança pelo Portal do Cliente e protegidos por links temporários assinados.",
      },
    ],
  },
  {
    slug: "retorno-e-pausa",
    title: "Retorno e Pausa (Regras Dia 3 e Dia 6)",
    summary: "Como mantemos a agenda previsível quando uma versão aguarda resposta.",
    sections: [
      {
        heading: "Acompanhamento Ativo",
        paragraphs: ["Quando uma versão é enviada, precisamos da sua avaliação para avançar ou aplicar ajustes."],
        bullets: [
          "Regra Dia 3: Após 3 dias úteis sem resposta, enviamos uma mensagem de follow-up para verificar se há dúvidas.",
          "Regra Dia 6: Após 6 dias úteis sem retorno, o projeto entra em pausa programada para liberar a fila de produção.",
        ],
        callout: "A pausa não é punição. Na retomada, o projeto é reaberto e uma nova estimativa de data é calculada conforme a disponibilidade operacional do estúdio no momento.",
      },
    ],
  },
  {
    slug: "escopo",
    title: "Limites de Escopo",
    summary: "Como novas ideias são integradas sem comprometer prazo e orçamento.",
    sections: [
      {
        heading: "Gestão Transparente de Escopo",
        paragraphs: [
          "O escopo é exatamente o conjunto de entregáveis acordado na proposta e contrato.",
          "Se durante o projeto você desejar adicionar peças ou novas páginas, apresentamos uma proposta adicional de forma clara antes de executar.",
        ],
        callout: "Nenhum trabalho extra é iniciado ou cobrado sem sua aprovação prévia expressa.",
      },
    ],
  },
  {
    slug: "faq",
    title: "Perguntas Frequentes",
    summary: "Respostas diretas sobre contratação, comunicação, revisões e portal.",
    sections: [
      {
        heading: "Como tenho acesso ao Portal do Cliente?",
        paragraphs: ["O acesso é exclusivo para clientes com contrato fechado. O administrador ativa seu acesso e você recebe um convite direto por e-mail."],
      },
      {
        heading: "Preciso marcar uma reunião para começar?",
        paragraphs: ["Não. O canal oficial de entrada é o briefing guiado em /comecar. Você envia contexto, objetivo e informações do projeto de forma estruturada; a partir disso, o IBD analisa a demanda e prepara os próximos passos, proposta e contrato sem depender de reunião inicial."],
      },
      {
        heading: "Como funciona a comunicação durante o projeto?",
        paragraphs: ["O processo é assíncrono e estruturado. Briefing, materiais, status, revisões, aprovações e próximos passos ficam registrados no fluxo do projeto, reduzindo mensagens soltas e garantindo contexto para cada decisão."],
      },
      {
        heading: "O que acontece se eu precisar de mais de 2 rodadas de revisão?",
        paragraphs: ["Caso todas as 2 rodadas sejam utilizadas e ainda haja necessidade de refinamentos adicionais, podemos emitir uma taxa pontual de revisão adicional conforme a complexidade."],
      },
      {
        heading: "Os arquivos ficam salvos para sempre no portal?",
        paragraphs: ["Os arquivos finais e o histórico do projeto permanecem disponíveis conforme a política de retenção e armazenamento definida pelo IBD."],
      },
    ],
  },
];

export function getGuide(slug: string) {
  if (slug === "material") slug = "materiais";
  return guides.find((g) => g.slug === slug);
}

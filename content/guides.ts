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
    summary: "O fluxo completo, do primeiro contato ao início da produção.",
    sections: [
      {
        heading: "Como funciona",
        paragraphs: [
          "Todo projeto começa com um briefing. Ele serve para eu entender o que você precisa antes de começar a produzir.",
        ],
        numbered: [
          "Você me conta o que precisa.",
          "Eu organizo as informações e confirmo o briefing com você.",
          "Você envia os materiais necessários.",
          "Eu confirmo o prazo e começo a produção.",
        ],
        callout: "Não precisa chegar com tudo pronto. Se faltar alguma informação, a gente organiza junto.",
      },
    ],
  },
  {
    slug: "prazos",
    title: "Prazos e entrega",
    summary: "Quando uma data é estimativa e quando passa a ser compromisso.",
    sections: [
      {
        paragraphs: ["O prazo de produção começa quando duas coisas acontecem:"],
        numbered: ["O briefing está aprovado por você.", "Os materiais necessários foram recebidos."],
        callout: "Antes disso, qualquer data é apenas estimativa.",
      },
      {
        paragraphs: [
          "Se faltar material, o projeto não entra em produção. Quando o material chegar, eu te passo uma nova data.",
        ],
      },
    ],
  },
  {
    slug: "material",
    title: "Materiais necessários",
    summary: "O que enviar para evitar perda de qualidade ou atraso no início.",
    sections: [
      {
        paragraphs: ["Dependendo do projeto, você pode precisar enviar:"],
        bullets: [
          "Logo, de preferência em vetor: AI, SVG ou EPS.",
          "Se não tiver vetor, PNG em boa resolução.",
          "Fotos na maior resolução disponível.",
          "Textos finais que entrarão na peça.",
          "Cores e fontes, se você já tiver identidade visual definida.",
        ],
        callout: "Se não tiver algum material, me avise. A gente verifica se o item será criado separadamente ou se o projeto começa sem ele.",
      },
    ],
  },
  {
    slug: "revisoes",
    title: "Revisões",
    summary: "O que está incluído nas 2 rodadas e o que vira novo escopo.",
    sections: [
      {
        paragraphs: ["Todo projeto inclui 2 rodadas de revisão dentro do que foi combinado no briefing."],
        bullets: [
          "Ajustes de cor.",
          "Correções ou ajustes de texto.",
          "Tamanho e posição de elementos.",
          "Correção de algo que ficou diferente do combinado.",
        ],
        callout: "Mudanças de direção criativa ou itens novos fora do briefing são orçados separadamente.",
      },
    ],
  },
  {
    slug: "retorno-e-pausa",
    title: "Retorno e pausa",
    summary: "Como o projeto se comporta quando uma aprovação fica sem resposta.",
    sections: [
      {
        paragraphs: [
          "Quando eu te enviar uma versão, preciso do seu retorno.",
          "Quando você responder, o projeto retoma. A nova data de entrega será calculada a partir da retomada, conforme a agenda disponível.",
        ],
        bullets: [
          "Após 3 dias úteis sem retorno, eu te mando uma mensagem de status.",
          "Após 6 dias úteis sem retorno, o projeto entra em pausa.",
        ],
        callout: "Isso não é punição. É a forma de manter a agenda organizada para todos os projetos.",
      },
    ],
  },
  {
    slug: "escopo",
    title: "Escopo",
    summary: "Como novas ideias são tratadas sem bagunçar prazo e orçamento.",
    sections: [
      {
        paragraphs: [
          "O escopo é aquilo que combinamos no briefing aprovado.",
          "Se durante o projeto surgir algo novo, eu registro e te mostro o impacto em prazo e valor. Você decide se entra no projeto atual ou se vira uma próxima demanda.",
        ],
        callout: "Nenhuma alteração é adicionada em silêncio.",
      },
    ],
  },
  {
    slug: "faq",
    title: "Perguntas frequentes",
    summary: "Respostas rápidas antes de agendar ou enviar uma demanda.",
    sections: [
      {
        heading: "Preciso ter todo o material antes de entrar em contato?",
        paragraphs: ["Não. Você pode iniciar a conversa e informar o que ainda falta. O início da produção, porém, depende dos materiais necessários."],
      },
      {
        heading: "A data que eu desejo já fica garantida?",
        paragraphs: ["Não. Antes de briefing aprovado e material recebido, a data é uma referência. O prazo é confirmado por escrito depois dessas duas condições."],
      },
      {
        heading: "Posso pedir mudanças?",
        paragraphs: ["Sim. Há 2 rodadas de revisão para ajustes dentro do briefing. Mudanças de direção ou novos itens são tratados como novo escopo."],
      },
      {
        heading: "O que acontece se eu demorar a responder?",
        paragraphs: ["Após 3 dias úteis há uma mensagem de status. Após 6 dias úteis, o projeto é pausado e recebe nova data quando for retomado."],
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

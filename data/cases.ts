export type PortfolioCase = {
  id: string;
  slug: string;
  client: string;
  title: string;
  challenge: string;
  delivery: string;
  result: string;
  services: string[];
  cover: string;
  gallery: string[];
  order: number;
  published: boolean;
  usageAuthorized: boolean;
};

export const cases: PortfolioCase[] = [
  {
    id: "case-wine-gourmet",
    slug: "wine-gourmet",
    client: "Wine Gourmet",
    title: "Sistema Visual Contínuo & Materiais Promocionais",
    challenge:
      "Volume alto de demandas simultâneas para eventos, rótulos e mídias sociais com identidade inconsistente e retrabalho na produção.",
    delivery:
      "Desenvolvimento de guia de estilo visual, biblioteca de templates para redes sociais, padronização de materiais promocionais e sinalização de loja.",
    result:
      "Padronização visual em todos os pontos de contato e maior agilidade na criação das peças semanais.",
    services: ["Identidade Visual", "Peças para Redes Sociais", "Material Editorial"],
    cover: "/images/placeholders/portfolio-wine-cover.jpg",
    gallery: [
      "/images/placeholders/portfolio-wine-01.jpg",
      "/images/placeholders/portfolio-wine-02.jpg",
      "/images/placeholders/portfolio-wine-03.jpg",
    ],
    order: 10,
    published: true,
    usageAuthorized: true,
  },
  {
    id: "case-vinho-portugues-sem-frescura",
    slug: "vinho-portugues-sem-frescura",
    client: "Vinho Português Sem Frescura",
    title: "Projeto Editorial 82p & Lançamento Digital",
    challenge:
      "Necessidade de transformar um conteúdo técnico denso sobre vinhos portugueses em uma publicação atraente, agradável de ler e com apelo comercial para venda digital.",
    delivery:
      "Projeto gráfico completo de 82 páginas, sistema de grid modular, tratamento tipográfico avançado, infográficos e páginas promocionais para campanha.",
    result:
      "Publicação com leitura fluida e identidade marcante, pronta para distribuição digital e materiais de suporte a lançamento.",
    services: ["Material Editorial", "Landing Page", "Peças para Redes Sociais"],
    cover: "/images/placeholders/portfolio-vinho-portugues-cover.jpg",
    gallery: [
      "/images/placeholders/portfolio-vinho-01.jpg",
      "/images/placeholders/portfolio-vinho-02.jpg",
    ],
    order: 20,
    published: true,
    usageAuthorized: true,
  },
  {
    id: "case-endoafetos",
    slug: "endoafetos",
    client: "EndoAfetos",
    title: "Identidade Acolhedora, Campanhas & Social Media",
    challenge:
      "Comunicação na área da saúde feminina sobre endometriose que demandava acolhimento, rigor informativo e estética empática sem cair no tom excessivamente clínico.",
    delivery:
      "Sistema de identidade visual acolhedor, paleta sensível, templates editoriais para redes sociais e peças de campanha informativa.",
    result:
      "Presença visual empática e consistente, facilitando a transmissão de informações médicas complexas com acolhimento.",
    services: ["Identidade Visual", "Peças para Redes Sociais"],
    cover: "/images/placeholders/portfolio-endoafetos-cover.jpg",
    gallery: [
      "/images/placeholders/portfolio-endoafetos-01.jpg",
      "/images/placeholders/portfolio-endoafetos-02.jpg",
    ],
    order: 30,
    published: true,
    usageAuthorized: true,
  },
  {
    id: "case-confidencial-demo",
    slug: "projeto-confidencial",
    client: "Cliente Confidencial",
    title: "Projeto em Desenvolvimento",
    challenge: "Desafio interno sob acordo de não divulgação.",
    delivery: "Entregáveis em validação.",
    result: "Em andamento.",
    services: ["Identidade Visual"],
    cover: "/images/placeholders/portfolio-confidential.jpg",
    gallery: [],
    order: 99,
    published: false,
    usageAuthorized: false,
  },
];

/**
 * Retorna somente cases autorizados e publicados.
 */
export function getPublishedCases(): PortfolioCase[] {
  return cases
    .filter((c) => c.published && c.usageAuthorized)
    .sort((a, b) => a.order - b.order);
}

/**
 * Busca um case público específico por slug.
 * Retorna null se o case não existir, não estiver publicado ou não tiver uso autorizado.
 */
export function getPublicCaseBySlug(slug: string | undefined | null): PortfolioCase | null {
  if (!slug) return null;
  const normalized = slug.trim().toLowerCase();
  const found = cases.find((c) => c.slug.toLowerCase() === normalized);
  if (found && found.published && found.usageAuthorized) {
    return found;
  }
  return null;
}

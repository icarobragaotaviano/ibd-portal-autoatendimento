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
    title: "Sistema Visual para Comunicação Contínua",
    challenge: "Volume alto de demandas simultâneas para eventos, rótulos e mídias sociais com identidade inconsistente e retrabalho na produção.",
    delivery: "Desenvolvimento de guia de estilo visual, biblioteca de templates para redes sociais, padronização de materiais promocionais e sinalização de loja.",
    result: "Padronização visual em todos os pontos de contato e maior agilidade na criação das peças semanais.",
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
    id: "case-vertice-consultoria",
    slug: "vertice-consultoria",
    client: "Vértice Gestão",
    title: "Reposicionamento e Materiais de Autoridade",
    challenge: "Consultoria corporativa estabelecida no mercado porém com apresentação visual defasada que não refletia a senioridade dos projetos.",
    delivery: "Redesenho de marca institucional, deck de apresentação comercial para clientes enterprise e templates de relatórios diagnósticos.",
    result: "Alinhamento entre o valor percebido na proposta comercial e o nível técnico dos serviços prestados.",
    services: ["Identidade Visual", "Apresentação Comercial", "Material Editorial"],
    cover: "/images/placeholders/portfolio-vertice-cover.jpg",
    gallery: [
      "/images/placeholders/portfolio-vertice-01.jpg",
      "/images/placeholders/portfolio-vertice-02.jpg",
    ],
    order: 20,
    published: true,
    usageAuthorized: true,
  },
  {
    id: "case-aurora-studio",
    slug: "aurora-studio",
    client: "Aurora Studio",
    title: "Landing Page de Lançamento de Produto Digital",
    challenge: "Necessidade de estruturar uma página com proposta de valor clara, hierarquia visual refinada e carregamento rápido para campanha de tráfego.",
    delivery: "Design de wireframe estratégico, interface UI responsiva com foco em conversão e especificações de design system.",
    result: "Estrutura visual fluida, comunicação direta dos diferenciais e facilidade de leitura tanto no mobile quanto no desktop.",
    services: ["Landing Page", "Design System"],
    cover: "/images/placeholders/portfolio-aurora-cover.jpg",
    gallery: [
      "/images/placeholders/portfolio-aurora-01.jpg",
      "/images/placeholders/portfolio-aurora-02.jpg",
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

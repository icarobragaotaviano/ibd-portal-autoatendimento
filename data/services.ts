export type PricingConfig = {
  mode: "starting_at" | "quote";
  startingPrice: number | null;
  currency?: string;
};

export type DeadlineConfig = {
  mode: "estimated_range" | "after_briefing";
  minBusinessDays: number | null;
  maxBusinessDays: number | null;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  shortPromise: string;
  description: string;
  includes: string[];
  pricing: PricingConfig;
  deadline: DeadlineConfig;
  mockup: string;
  order: number;
  featured: boolean;
  active: boolean;
};

export const services: Service[] = [
  {
    id: "identidade-visual",
    slug: "identidade-visual",
    name: "Identidade Visual",
    shortPromise: "Para o seu negócio ter presença reconhecível e consistente.",
    description: "Logo e variações, paleta institucional, manual tipográfico, diretrizes de uso e pacote de elementos gráficos.",
    includes: [
      "Logo e variações",
      "Paleta institucional",
      "Manual tipográfico",
      "Diretrizes de uso",
      "Pacote de elementos gráficos",
    ],
    pricing: {
      mode: "quote",
      startingPrice: null,
      currency: "BRL",
    },
    deadline: {
      mode: "after_briefing",
      minBusinessDays: null,
      maxBusinessDays: null,
    },
    mockup: "/images/placeholders/service-identidade.jpg",
    order: 10,
    featured: true,
    active: true,
  },
  {
    id: "social-media",
    slug: "social-media",
    name: "Peças para Redes Sociais",
    shortPromise: "Linhas visuais e templates pensados para leitura rápida e engajamento.",
    description: "Modelos editáveis para carrosséis, capas de reels, stories destacados e guia de diagramação para feed.",
    includes: [
      "Modelos editáveis para carrosséis",
      "Capas de reels e stories destacados",
      "Guia de diagramação para feed",
      "Diretrizes de contraste e tipografia",
    ],
    pricing: {
      mode: "quote",
      startingPrice: null,
      currency: "BRL",
    },
    deadline: {
      mode: "after_briefing",
      minBusinessDays: null,
      maxBusinessDays: null,
    },
    mockup: "/images/placeholders/service-social.jpg",
    order: 20,
    featured: true,
    active: true,
  },
  {
    id: "landing-page",
    slug: "landing-page",
    name: "Landing Page & Páginas de Vendas",
    shortPromise: "Estruturas digitais desenhadas para clareza de proposta e conversão.",
    description: "Wireframe estratégico, design UI responsivo (desktop/mobile) e especificações para desenvolvimento.",
    includes: [
      "Wireframe estratégico",
      "Design UI responsivo (desktop e mobile)",
      "Especificações para desenvolvimento",
      "Otimização de contraste e legibilidade",
    ],
    pricing: {
      mode: "quote",
      startingPrice: null,
      currency: "BRL",
    },
    deadline: {
      mode: "after_briefing",
      minBusinessDays: null,
      maxBusinessDays: null,
    },
    mockup: "/images/placeholders/service-landing.jpg",
    order: 30,
    featured: true,
    active: true,
  },
  {
    id: "editorial",
    slug: "editorial",
    name: "Material Editorial & E-books",
    shortPromise: "Diagramação que organiza conteúdos extensos e valoriza a leitura.",
    description: "Projeto gráfico de páginas, tratamento tipográfico, infográficos, tabelas e fechamento para impressão/PDF interativo.",
    includes: [
      "Projeto gráfico de páginas",
      "Tratamento tipográfico",
      "Diagramação de tabelas e infográficos",
      "Fechamento para impressão e PDF interativo",
    ],
    pricing: {
      mode: "quote",
      startingPrice: null,
      currency: "BRL",
    },
    deadline: {
      mode: "after_briefing",
      minBusinessDays: null,
      maxBusinessDays: null,
    },
    mockup: "/images/placeholders/service-editorial.jpg",
    order: 40,
    featured: true,
    active: true,
  },
  {
    id: "apresentacao",
    slug: "apresentacao",
    name: "Apresentação Comercial & Pitch",
    shortPromise: "Decks visuais que organizam argumentos e defendem ideias com clareza.",
    description: "Estruturação de slides, visualização de dados, templates modulares e arquivos prontos para projeção ou envio em PDF.",
    includes: [
      "Estruturação de slides",
      "Visualização de dados e gráficos",
      "Templates modulares reutilizáveis",
      "Arquivos prontos para projeção ou envio em PDF",
    ],
    pricing: {
      mode: "quote",
      startingPrice: null,
      currency: "BRL",
    },
    deadline: {
      mode: "after_briefing",
      minBusinessDays: null,
      maxBusinessDays: null,
    },
    mockup: "/images/placeholders/service-apresentacao.jpg",
    order: 50,
    featured: false,
    active: true,
  },
  {
    id: "outro",
    slug: "outro",
    name: "Projeto Sob Medida",
    shortPromise: "Soluções visuais para desafios gráficos específicos ou escopos mistos.",
    description: "Diagnóstico da demanda, definição conjunta de entregáveis e execução com acompanhamento direto.",
    includes: [
      "Diagnóstico da demanda",
      "Definição conjunta de entregáveis",
      "Execução com acompanhamento direto",
    ],
    pricing: {
      mode: "quote",
      startingPrice: null,
      currency: "BRL",
    },
    deadline: {
      mode: "after_briefing",
      minBusinessDays: null,
      maxBusinessDays: null,
    },
    mockup: "/images/placeholders/service-outro.jpg",
    order: 60,
    featured: false,
    active: true,
  },
];

export function getServices(): Service[] {
  return services.filter((s) => s.active).sort((a, b) => a.order - b.order);
}

export function getFeaturedServices(limit = 4): Service[] {
  return services
    .filter((s) => s.active && s.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, limit);
}

export function getServiceBySlug(slug: string): Service | null {
  return services.find((s) => s.slug === slug) || null;
}

export function resolvePublicServiceSelection(slug: string | undefined | null): Service | null {
  if (!slug) return null;
  const normalized = slug.trim().toLowerCase();
  const service = services.find((s) => s.slug === normalized || s.id === normalized);
  if (service && service.active) {
    return service;
  }
  return null;
}

export function getServiceOptions() {
  return getServices().map((s) => ({
    value: s.slug,
    label: s.name,
  }));
}

export function formatServicePricing(pricing: PricingConfig): string {
  if (pricing.mode === "starting_at" && pricing.startingPrice !== null) {
    return `A partir de R$ ${pricing.startingPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  }
  return "Valor sob consulta";
}

export function formatServiceDeadline(deadline: DeadlineConfig): string {
  if (deadline.mode === "estimated_range" && deadline.minBusinessDays !== null && deadline.maxBusinessDays !== null) {
    return `Prazo estimado: ${deadline.minBusinessDays}–${deadline.maxBusinessDays} dias úteis`;
  }
  return "Prazo definido após briefing";
}

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
    shortPromise: "Para o negócio parecer o que é.",
    description: "Construção completa de marca para negócios em fase de lançamento ou reposicionamento de mercado.",
    includes: ["Logo e variações", "Paleta de cores institucional", "Sistema tipográfico", "Manual de aplicação da marca", "Elementos gráficos de apoio"],
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
    shortPromise: "Consistência visual para sua comunicação diária.",
    description: "Linhas editoriais, templates e peças estratégicas para redes sociais com alto impacto visual.",
    includes: ["Templates editáveis", "Capas e stories destacados", "Guia de estilo visual", "Diretrizes de diagramação"],
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
    shortPromise: "Design com foco em conversão e clareza de proposta.",
    description: "Páginas responsivas de alta performance para produtos, lançamentos ou serviços profissionais.",
    includes: ["Estrutura de wireframe e copy", "Design UI de alta conversão", "Versão desktop e mobile", "Exportação pronta para implementação"],
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
    shortPromise: "Publicações estruturadas para leitura refinada.",
    description: "Projetos de diagramação editorial para relatórios, catálogos, apresentações corporativas e e-books.",
    includes: ["Grade de diagramação personalizada", "Tratamento tipográfico avançado", "Design de tabelas e infográficos", "Arquivos digitais e fechamento para impressão"],
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
    shortPromise: "Slides que defendem sua proposta com autoridade.",
    description: "Decks estratégicos para captação de clientes, investidores ou apresentações de liderança.",
    includes: ["Hierarquia de informação", "Visualização de dados e gráficos", "Templates reutilizáveis", "Arquivos em PDF e editáveis"],
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
    name: "Outro Projeto Sob Medida",
    shortPromise: "Soluções visuais para demandas personalizadas.",
    description: "Para projetos com escopo misto ou necessidades gráficas específicas.",
    includes: ["Diagnóstico inicial", "Definição sob medida de entregáveis", "Acompanhamento direto"],
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

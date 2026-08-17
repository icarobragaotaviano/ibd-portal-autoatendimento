# 14. CAMADA PÚBLICA COMERCIAL & SITE INSTITUCIONAL

## 1. Visão Geral
A camada pública comercial do estúdio **IBD — Ícaro Braga Designer** atua como a porta de entrada para o pipeline comercial de clientes.
O site institucional é construído no mesmo App Router Next.js, compartilhando design system, fontes de dados, validações e observabilidade com a área administrativa e o portal privado.

---

## 2. Fluxo Comercial Oficial
```txt
Visitante
   ↓
Site Público (Home, Serviços, Metodologia, Portfólio)
   ↓
Começar Briefing (/comecar?service=slug)
   ↓
Prospect (LeadInput validado + aceite LGPD)
   ↓
Manual do Cliente (Aceite obrigatório das 6 regras de atendimento)
   ↓
Briefing Guiado (/comecar/briefing?prospectId=xyz)
   ↓
Proposta Comercial (Admin)
   ↓
Contrato Formalizado
   ↓
Ativação Atômica pelo Admin (/api/admin/activate-client)
   ↓
Client Ativo & Projeto Criado
   ↓
Portal Privado (/portal)
```

---

## 3. Fontes Únicas de Dados

### 3.1 Serviços (`data/services.ts`)
- Modelagem explícita com:
  - `pricing`: `{ mode: "starting_at" | "quote", startingPrice: number | null }`
  - `deadline`: `{ mode: "estimated_range" | "after_briefing", minBusinessDays: number | null, maxBusinessDays: number | null }`
  - `order`: Ordenação numérica controlada.
  - `active`: Serviços desativados não são listados nem aceitos em query parameters.
  - `resolvePublicServiceSelection(slug)`: Validação server-side que rejeita serviços inexistentes ou inativos.

### 3.2 Portfólio (`data/cases.ts`)
- Estrutura obrigatória de mini-cases:
  - `challenge`: O desafio real enfrentado pelo cliente.
  - `delivery`: A solução visual e os entregáveis desenvolvidos.
  - `result`: O resultado concreto sem inventar métricas fictícias.
- Regra de publicação: Apenas cases com `published === true && usageAuthorized === true` são retornados por `getPublishedCases()` e `getPublicCaseBySlug()`.

---

## 4. Arquitetura de Layouts e Isolamento (Route Groups)
- `app/layout.tsx`: Root Layout puro com carregamento de fontes (Space Grotesk, Inter, IBM Plex Mono) e tokens globais.
- `app/(public)/layout.tsx`: Renderiza exclusivamente `PublicHeader` e `PublicFooter` para páginas públicas.
- `app/admin/layout.tsx`: Shell administrativo executivo com links de gestão e tag `noindex`.
- `app/portal/layout.tsx`: Shell do cliente focado em Próxima Ação, Projetos e tag `noindex`.
- `app/login/layout.tsx`: Shell de autenticação limpo com tag `noindex`.

---

## 5. SEO & Segurança
- `app/robots.ts`: Bloqueia indexação de `/admin`, `/portal`, `/login`, `/comecar/briefing` e `/api`.
- `app/sitemap.ts`: Gera sitemap XML dinâmico com todas as rotas públicas canônicas e slugs de cases/guias autorizados.
- `lib/analytics/index.ts`: Analytics encapsulado com sanitização contra vazamento de PII e briefings.

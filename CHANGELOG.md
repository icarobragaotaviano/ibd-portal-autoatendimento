# CHANGELOG — IBD Client Portal 2026

Todas as modificações e fases de entrega do **IBD Client Portal 2026**.

---

## [2.1.0] — 2026-08-17

### FASE 10 — Camada Comercial & Site Público
- **Fontes Únicas de Dados**:
  - Implementado `data/services.ts` com o tipo `Service`, precificação explícita (`pricing.mode: "quote"`), prazos sob consulta (`deadline.mode: "after_briefing"`), ordenação com `order` e validador `resolvePublicServiceSelection(slug)` rejeitando serviços inativos.
  - Implementado `data/cases.ts` com o tipo `PortfolioCase`, mini-cases estruturados (Desafio, Entrega, Resultado sem métricas fictícias) e filtro de publicação estrito (`published === true && usageAuthorized === true`).
- **Arquitetura de Layouts & Route Groups**:
  - Root Layout (`app/layout.tsx`) limpo sem cabeçalhos globais.
  - Route Group `app/(public)/layout.tsx` encapsulando exclusivamente `PublicHeader` e `PublicFooter`.
  - Shells isolados com proteção `noindex` para `app/admin/layout.tsx`, `app/portal/layout.tsx`, `app/login/layout.tsx` e `app/(public)/comecar/briefing/layout.tsx`.
- **Componentes Públicos (`components/public/*`)**:
  - `PublicHeader` com menu institucional, link discreto para Área do Cliente e CTA `[COMEÇAR UM PROJETO]`.
  - `PublicFooter` com atendimento de Seg-Sex 09:00 às 18:00 (Fortaleza) e navegação.
  - `Hero` institucional com copy oficial e placeholder `TODO_ASSET_ICARO_HERO`.
  - `OnboardingMedia` com controle expansível de transcrição `[VER TRANSCRIÇÃO]` e placeholder técnico.
  - `ServiceCard` e `FeaturedServices` com suporte a query parameters `/comecar?service={slug}`.
  - `PublicPipeline` (Jornada comercial em 6 passos) e `MethodologySteps` (Execução em 5 etapas) estritamente diferenciados.
  - `WorkingTogetherSummary` (7 combinados do processo).
  - `PortfolioCard` e `PortfolioGrid` exibindo cases autorizados.
  - `AboutPreview` com narrativa em 1ª pessoa do designer Ícaro Braga.
  - `FinalCTA` para conversão direta no fechamento das páginas.
  - `MediaPlaceholder` para renderização visual sem requisições HTTP 404 quebradas.
- **Páginas Institucionais**:
  - Home (`app/(public)/page.tsx`) com as 9 seções na hierarquia canônica.
  - Catálogo de Serviços (`app/(public)/servicos/page.tsx`) com nota obrigatória de prazos e sinal de entrada.
  - Quem Faz o IBD (`app/(public)/quem-sou/page.tsx`) com posicionamento solo do estúdio.
  - Metodologia IBD (`app/(public)/como-eu-trabalho/page.tsx`).
  - Combinados Comerciais (`app/(public)/como-trabalhamos/page.tsx`).
  - Portfólio (`app/(public)/portfolio/page.tsx` e `/portfolio/[slug]`) com `notFound()` para cases confidenciais.
  - `/solicitar` com redirecionamento preservando query parameters para `/comecar`.
  - `/comecar` como Server Component resolvendo `searchParams` no servidor e passando initialService para o formulário.
  - `/comecar/obrigado` com a mensagem oficial de revisão de briefing e próximos passos.
- **SEO, Indexação & Analytics Encapsulado**:
  - `app/robots.ts` e `app/sitemap.ts` com URLs canônicas indexáveis.
  - `lib/analytics/index.ts` com `trackPublicEvent` e sanitização estrita de PII.
  - Suíte de 50 testes unitários automatizados cobrindo regras de negócio, dados e segurança.

---

## [2.0.0] — 2026-08-17

### Fases 1 a 9 — Fundação, Portal & Painel Administrativo
- Domínio, migrações SQL com RLS, provedores duais de banco/storage/email/calendar.
- Pipeline de aquisição de leads e briefing progressivo.
- Painel Administrativo com HOJE, ATENÇÃO, propostas, contratos e fluxo de Ativar Cliente.
- Portal Privado com Próxima Ação, Projetos, Upload de Materiais, Motor de Revisões (limite 2) e Linha do Tempo.
- Automação cron (Dia 3 / Dia 6) e módulo de observabilidade.

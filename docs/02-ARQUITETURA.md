# Arquitetura

## Visão geral

```text
Browser
  │
  ├── Site público
  │     └── /comecar
  │           └── /api/prospects
  │                 └── Supabase/Postgres
  │
  ├── Briefing guiado
  │     └── /api/prospects/[id]/briefing
  │
  ├── Portal do Cliente
  │     ├── projetos
  │     ├── materiais ───────── Supabase Storage
  │     ├── revisões
  │     └── aprovações
  │
  ├── Admin
  │     ├── prospects
  │     ├── propostas
  │     ├── contratos
  │     └── ativação de clientes
  │
  └── E-mails transacionais ─── Resend

Vercel
  ├── Next.js / Route Handlers
  └── Cron de regras 3/6 dias úteis
```

## Camadas

### `app/`
Rotas públicas, portal, admin e Route Handlers do Next.js App Router.

### `components/`
UI reutilizável, formulários e componentes de próxima ação/status.

### `lib/domain/`
Regras puras de estados, prazos, revisões e dias úteis.

### `lib/services/database/`
Persistência e acesso ao Supabase/Postgres.

### `lib/services/storage/`
Uploads e URLs seguras via Supabase Storage.

### `lib/services/email/`
E-mails transacionais via Resend.

### `content/`
Guias e mensagens de orientação editáveis.

## APIs principais

- `POST /api/prospects` — cria novo prospect a partir de `/comecar`.
- `POST /api/prospects/[id]/briefing` — salva briefing modular.
- `POST /api/admin/activate-client` — converte prospect formalizado em cliente/projeto.
- `GET /api/portal/projects` — lista projetos do cliente autenticado.
- `GET /api/portal/projects/[id]` — detalhes e próxima ação.
- `POST /api/portal/projects/[id]/materials` — envia materiais.
- `POST /api/portal/projects/[id]/revisions` — solicita revisão estruturada.
- `POST /api/cron/project-status` — aplica regras automáticas de acompanhamento/pausa.
- `GET /api/health` — diagnóstico básico, sem segredos.

## Integrações externas

A aplicação depende somente de:

- **Supabase** — Database, Auth e Storage.
- **Resend** — e-mails transacionais.
- **Vercel** — hospedagem e cron.

Não há Calendar Provider, rota de disponibilidade ou criação de eventos.

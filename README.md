# IBD — Portal de Autoatendimento para Clientes

Base completa para finalizar no Antigravity e publicar na Vercel.

O produto combina duas jornadas:

1. **Agendar conversa inicial** — mostra apenas horários livres e cria evento no Google Calendar.
2. **Solicitar projeto de design** — recebe a demanda em etapas, apresenta orientações e gera protocolo de acompanhamento.

Também inclui uma **Central de Guias** com regras de briefing, prazo, materiais, revisões, retorno/pausa, escopo e FAQ.

## Stack

- Next.js 16.3.1 + React 19.2.8
- TypeScript
- Tailwind CSS 4.3.3
- Google Calendar API via `googleapis`
- Zod
- Luxon (`America/Fortaleza` por padrão)
- Neon Postgres opcional
- Vitest

## Começar em 2 minutos — modo mock

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra `http://localhost:3000`.

No modo padrão, **não é necessário configurar Google nem banco**. A UI, a disponibilidade simulada, o agendamento e o fluxo de solicitação funcionam para desenvolvimento.

## Ativar Google Calendar real

1. Siga `docs/03-GOOGLE-CALENDAR.md`.
2. Preencha no `.env.local`:

```env
CALENDAR_MODE="google"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GOOGLE_REFRESH_TOKEN="..."
GOOGLE_CALENDAR_ID="primary"
GOOGLE_MEET_ENABLED="true"
```

3. Reinicie `npm run dev`.

## Ativar persistência Neon

1. Crie um banco Postgres no Neon.
2. Execute `database/schema.sql`.
3. Configure:

```env
DATA_MODE="neon"
DATABASE_URL="postgresql://..."
```

Sem Neon, `DATA_MODE=mock` usa memória e serve apenas para prototipação/desenvolvimento.

## Deploy Vercel

Leia `docs/04-VERCEL.md`.

## Rotas principais

| Rota | Função |
|---|---|
| `/` | Home e escolha da jornada |
| `/agendar` | Agenda e confirmação |
| `/solicitar` | Wizard de nova demanda |
| `/guia` | Central de guias |
| `/guia/[slug]` | Conteúdo de cada guia |
| `/status` | Consulta por protocolo + e-mail |
| `/confirmacao` | Pós-agendamento/pós-solicitação |
| `/api/availability` | Horários livres |
| `/api/book` | Cria agendamento |
| `/api/requests` | Cria solicitação |
| `/api/status` | Consulta solicitação |
| `/api/health` | Diagnóstico básico |

## Para continuar no Antigravity

Abra a pasta do projeto e use `docs/06-PROMPT-ANTIGRAVITY.md` como prompt inicial. O arquivo `AGENTS.md` contém as regras que o agente deve preservar.

## Origem das regras

As decisões de produto e conteúdo foram consolidadas a partir do briefing fornecido em `docs/referencia/chat-Vibe-Coding-App-com-Google-Agenda.txt`. Decisões adicionais de engenharia estão marcadas em `docs/01-PRODUTO-E-REGRAS.md`.

# IBD — Portal de Autoatendimento para Clientes

Portal full-stack para aquisição, onboarding e gestão de projetos do **IBD — Ícaro Braga Designer**, com jornada assíncrona e estruturada.

## Jornada oficial

```text
Visitante
  → Site público
  → /comecar
  → Solicitação + Briefing Guiado
  → Proposta
  → Contrato
  → Ativação do cliente
  → Portal do Cliente
```

Não existe etapa pública de agendamento de reunião. O briefing guiado é o canal oficial de entrada e registra contexto suficiente para análise, proposta e próximos passos sem depender de sincronização de agenda.

## Stack

- Next.js 16.3.1 + React 19.2.8
- TypeScript
- Tailwind CSS 4.3.3
- Supabase: PostgreSQL, Auth e Storage
- Resend: e-mails transacionais
- Vercel: hospedagem e cron
- Zod
- Luxon (`America/Fortaleza` para regras operacionais)
- Vitest

## Começar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra `http://localhost:3000`.

Para desenvolvimento, os providers podem permanecer em modo `mock`. Em produção, configure Supabase e Resend conforme `.env.example`.

## Serviços externos necessários

1. **Supabase** — banco, autenticação e armazenamento de arquivos.
2. **Resend** — e-mails transacionais.
3. **Vercel** — deploy, funções serverless e cron.

Não é necessário criar projeto, OAuth ou credenciais no Google Cloud/Google Calendar.

## Rotas principais

| Rota | Função |
|---|---|
| `/` | Site público |
| `/servicos` | Catálogo de serviços |
| `/portfolio` | Portfólio autorizado |
| `/comecar` | Entrada oficial de novos projetos |
| `/comecar/briefing` | Briefing guiado |
| `/guia` | Central de guias |
| `/status` | Consulta de solicitações legadas por protocolo + e-mail |
| `/login` | Acesso ao portal |
| `/portal` | Área do cliente |
| `/admin` | Cockpit administrativo |
| `/api/prospects` | Cria prospect |
| `/api/portal/*` | Operações do portal autenticado |
| `/api/admin/*` | Operações administrativas |
| `/api/cron/project-status` | Regras automáticas de 3/6 dias úteis |
| `/api/health` | Diagnóstico básico |

## Verificação

```bash
npm test
npm run lint
npm run build
```

## Documentação

Comece por `docs/00-INDICE.md`, `docs/01-PRODUTO-E-REGRAS.md`, `docs/02-ARQUITETURA.md` e `docs/14-SITE-PUBLICO.md`.

O briefing histórico que originou o projeto continua preservado em `docs/referencia/`, mas não representa necessariamente a arquitetura vigente. A documentação canônica é a pasta `docs/` atualizada.

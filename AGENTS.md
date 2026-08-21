# IBD Client Portal 2026 — AGENTS.md

Instruções para agentes de inteligência artificial e engenheiros que operarem neste repositório.

---

## Regras Absolutas

1. **Nunca quebre o modo Mock**:
   - Serviços críticos de banco, storage e e-mail possuem implementação mock e implementação real.
   - O modo mock permite executar testes e desenvolvimento local sem dependências externas.
2. **Entrada pública única em `/comecar`**:
   - Não recrie `/agendar`, Calendar Provider, Booking API ou integração Google Calendar/Meet.
   - O onboarding é assíncrono: solicitação → briefing guiado → proposta → contrato → ativação → portal.
3. **O cliente nunca cria o próprio portal**:
   - Visitantes são cadastrados na tabela `prospects`.
   - A conversão de um prospect em cliente ativo (`clients`) é uma ação administrativa explícita (**ATIVAR CLIENTE**) e exige contrato com status `signed`.
4. **Cálculo Centralizado de Próxima Ação**:
   - Nunca calcule ações no cliente ou de forma ad-hoc.
   - Sempre utilize `getProjectNextAction(project)` de `@/lib/domain/next-action`.
5. **Regras de Prazos e Materiais**:
   - Prazos só podem ser confirmados (`canConfirmDeadline`) após briefing aprovado e todos os materiais obrigatórios recebidos.
   - Limite de revisão é estritamente de 2 rodadas dentro do briefing acordado.
6. **Dias Úteis e Fuso Horário**:
   - Todos os cálculos de retorno (Regra Dia 3 e Regra Dia 6) utilizam o timezone `America/Fortaleza` via `lib/domain/business-days.ts`.
   - `APP_TIMEZONE` não é configuração de agendamento; ele continua necessário para regras operacionais.
7. **Autenticação e RLS**:
   - A resolução de clientes é feita server-side (`getCurrentClient()`), associando `auth.uid()` à coluna `clients.auth_user_id`.
   - Nunca aceite `client_id` enviado sem validação da sessão do usuário.
8. **Infraestrutura externa oficial**:
   - Supabase: Database, Auth e Storage.
   - Resend: e-mails transacionais.
   - Vercel: hospedagem, serverless e cron.
   - Não introduza Google Cloud como dependência sem nova decisão explícita de produto.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

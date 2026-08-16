# AGENTS.md — IBD Portal do Cliente

## Missão
Manter e evoluir um portal de autoatendimento para clientes do estúdio IBD. O app deve reduzir atrito, explicar o processo e sincronizar conversas iniciais com Google Calendar.

## Regras de produto que NÃO podem ser alteradas silenciosamente
1. Todo projeto começa com briefing.
2. O prazo de produção só começa após briefing aprovado + materiais recebidos.
3. Antes disso, qualquer data é estimativa.
4. Todo projeto inclui 2 rodadas de revisão dentro do briefing.
5. Mudança de direção criativa ou item novo = novo escopo/orçamento.
6. 3 dias úteis sem retorno = mensagem de status.
7. 6 dias úteis sem retorno = projeto pausado.
8. Retomada = novo prazo conforme agenda disponível.
9. Agendamentos: segunda a sexta, 09:00–18:00, 50 min + 10 min de respiro, mínimo 24h de antecedência.
10. Tom: direto, humano, ativo, claro e profissional. Evitar desculpas, promessas vagas, excesso de justificativas e excesso de emojis.

## Stack
- Next.js 16 App Router + TypeScript
- Tailwind CSS 4
- Google Calendar API
- Neon Postgres opcional em produção
- Zod para validação
- Luxon para timezone
- Vitest para regras de agenda

## Modos locais
- `CALENDAR_MODE=mock`: agenda simulada.
- `DATA_MODE=mock`: solicitações em memória; não é persistência de produção.

## Antes de alterar código
1. Leia `README.md`.
2. Leia `docs/01-PRODUTO-E-REGRAS.md`.
3. Leia `docs/02-ARQUITETURA.md`.
4. Preserve acessibilidade, mobile-first e LGPD mínima.
5. Rode `npm test`, `npm run lint` e `npm run build`.

## Segurança
- Nunca expor `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN` ou `DATABASE_URL` ao browser.
- Variáveis sem prefixo `NEXT_PUBLIC_` são server-only.
- Não registrar em logs conteúdo de briefing, telefone ou e-mail completos.
- Status de solicitação exige protocolo + e-mail.

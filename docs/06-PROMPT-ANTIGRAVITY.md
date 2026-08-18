# Prompt de continuidade para Antigravity

Atue como Engenheiro Full-Stack Sênior, Product Designer e revisor de segurança. Você recebeu um projeto Next.js funcional chamado **IBD — Portal do Cliente**.

Antes de alterar qualquer arquivo:
1. Leia `AGENTS.md`.
2. Leia `README.md`.
3. Leia toda a pasta `docs/`, especialmente `01-PRODUTO-E-REGRAS.md` e `14-SITE-PUBLICO.md`.
4. Rode `npm install`, `npm test`, `npm run lint` e `npm run build`.

OBJETIVO:
Finalizar o portal de autoatendimento mantendo a jornada pública **100% assíncrona e estruturada**.

FLUXO OFICIAL:
`Site Público → /comecar → Prospect → Manual do Cliente → Briefing Guiado → Proposta → Contrato → Ativação → Portal Privado`.

PRIORIDADES DE FINALIZAÇÃO:
- Refinar identidade visual do IBD sem comprometer legibilidade e mobile-first.
- Testar a jornada `/comecar` e o briefing guiado ponta a ponta.
- Testar persistência Supabase, autenticação, RLS e Storage.
- Validar e-mails transacionais via Resend.
- Testar portal do cliente, admin e ativação de prospect.
- Criar estados de loading, erro e vazio consistentes.
- Melhorar acessibilidade: foco, labels, aria-live, contraste e teclado.
- Revisar política de privacidade e termos antes de produção.
- Validar Cron e regras de 3/6 dias úteis.

REGRAS NÃO NEGOCIÁVEIS:
- Não recriar `/agendar`, Calendar Provider, endpoints de disponibilidade/reserva ou integração Google Calendar/Meet.
- Briefing antes da produção.
- Prazo confirmado somente após briefing aprovado + materiais recebidos.
- 2 rodadas de revisão.
- Escopo novo é tratado separadamente.
- Tom direto, humano, ativo, claro e profissional.
- Não expor segredos no browser.
- Supabase, Resend e Vercel são as integrações externas oficiais.
- `APP_TIMEZONE=America/Fortaleza` permanece para regras operacionais e cálculo de dias úteis.

Ao terminar cada alteração, rode testes, lint e build. Documente decisões relevantes no README ou em `docs/`.

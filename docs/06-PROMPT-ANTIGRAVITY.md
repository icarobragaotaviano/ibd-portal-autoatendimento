# Prompt de continuidade para Antigravity

Atue como Engenheiro Full-Stack Sênior, Product Designer e revisor de segurança. Você recebeu um projeto Next.js 16 funcional chamado **IBD — Portal do Cliente**.

Antes de alterar qualquer arquivo:
1. Leia `AGENTS.md`.
2. Leia `README.md`.
3. Leia toda a pasta `docs/`, especialmente `01-PRODUTO-E-REGRAS.md`.
4. Rode `npm install`, `npm test`, `npm run lint` e `npm run build`.

OBJETIVO:
Finalizar o portal de autoatendimento mantendo as regras de processo já consolidadas. Não simplifique ou remova mensagens de orientação que protegem briefing, prazo, materiais, revisões, escopo e pausa.

PRIORIDADES DE FINALIZAÇÃO:
- Refinar identidade visual do IBD sem comprometer legibilidade e mobile-first.
- Testar toda a jornada `/agendar` em mock e Google real.
- Testar `/solicitar`, persistência Neon e `/status`.
- Criar estados de loading, erro e vazio consistentes.
- Melhorar acessibilidade: foco, labels, aria-live, contraste e teclado.
- Criar política de privacidade e termos reais antes de produção.
- Preparar painel administrativo ou workflow seguro para mudança de status.
- Implementar cron futuro para regras de 3 e 6 dias úteis, somente depois de definir o canal de mensagem.

REGRAS NÃO NEGOCIÁVEIS:
- Briefing antes da produção.
- Prazo confirmado somente após briefing aprovado + materiais recebidos.
- 2 rodadas de revisão.
- Escopo novo é tratado separadamente.
- Tom direto, humano, ativo, claro e profissional.
- Não expor segredos no browser.
- Não trocar `DATA_MODE=neon` por armazenamento não persistente em produção.

Ao terminar cada alteração, rode testes, lint e build. Documente decisões relevantes no README ou em `docs/`.

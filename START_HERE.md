# Comece aqui — Antigravity

Este repositório foi preparado para abrir diretamente no Antigravity.

## 1. Primeiro boot

```bash
npm install
cp .env.example .env.local
npm run dev
```

Com o `.env.example` copiado sem alterações, o projeto inicia em:

- `CALENDAR_MODE=mock`
- `DATA_MODE=mock`

Assim você consegue trabalhar em UI/UX e fluxo sem criar eventos reais.

## 2. Leitura obrigatória do agente

Peça ao Antigravity para ler, nesta ordem:

1. `AGENTS.md`
2. `README.md`
3. `docs/00-INDICE.md`
4. `docs/01-PRODUTO-E-REGRAS.md`
5. `docs/06-PROMPT-ANTIGRAVITY.md`

Depois cole o conteúdo de `docs/06-PROMPT-ANTIGRAVITY.md` como instrução inicial.

## 3. Teste rápido

- Home: `/`
- Agenda: `/agendar`
- Solicitação: `/solicitar`
- Guias: `/guia`
- Status: `/status`
- Status demo: `IBD-DEMO01` + `cliente@exemplo.com`
- Health: `/api/health`

## 4. Antes de colocar em produção

1. Conectar Google Calendar: `docs/03-GOOGLE-CALENDAR.md`.
2. Conectar Neon: `database/schema.sql` + `DATA_MODE=neon`.
3. Revisar Vercel: `docs/04-VERCEL.md`.
4. Substituir a página provisória de privacidade por versão válida para a operação real.
5. Rodar:

```bash
npm test
npm run lint
npm run build
```

## 5. Importante

O ambiente que gerou este pacote não tinha acesso DNS ao npm registry; por isso não há `package-lock.json` inventado. O lockfile deve ser gerado no primeiro `npm install` em ambiente com internet e então versionado.

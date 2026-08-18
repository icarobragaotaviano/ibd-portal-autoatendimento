# Validação do projeto

## Decisão de arquitetura vigente

A jornada pública de agendamento e a integração com Google Calendar foram removidas. O fluxo oficial é:

`Site Público → /comecar → Briefing Guiado → Proposta → Contrato → Ativação → Portal do Cliente`.

## Verificações estruturais esperadas

- `/agendar` inexistente.
- `/api/availability`, `/api/book`, `/api/calendar/availability` e `/api/calendar/book` inexistentes.
- `lib/calendar/`, `lib/services/calendar/` e `lib/scheduling.ts` inexistentes.
- `BookingSchema` inexistente.
- `googleapis` ausente das dependências diretas.
- `.env.example` sem `CALENDAR_*`, `GOOGLE_*` ou `BOOKING_*`.
- `/api/health` sem `calendarMode` ou `scheduling`.
- Navegação pública direciona novos projetos para `/comecar`.
- `APP_TIMEZONE=America/Fortaleza` permanece para regras de dias úteis e operação.

## Validação automatizada obrigatória antes do merge

```bash
npm install
npm test
npm run lint
npm run build
```

Também execute uma busca global por termos legados:

```bash
rg -n "(/agendar|googleapis|Google Calendar|BookingSchema|CALENDAR_|GOOGLE_|BOOKING_|api/availability|api/book)" \
  --glob '!docs/referencia/**' \
  --glob '!package-lock.json'
```

O resultado esperado no código e documentação canônica é vazio, exceto por menções explícitas que expliquem que a integração foi removida.

## Observação sobre `package-lock.json`

Após remover `googleapis` de `package.json`, regenere o lockfile com `npm install` ou `npm install --package-lock-only` e confirme que pacotes exclusivos do Google não permanecem como dependências órfãs.

## Histórico

Validações anteriores que cobriam geração de slots, antecedência de 24h, buffer e conflitos de agenda são históricas e não fazem mais parte da suíte atual.

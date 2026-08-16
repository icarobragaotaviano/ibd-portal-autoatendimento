# Arquitetura

## Visão geral

```text
Browser
  │
  ├── /agendar ────────────────┐
  │                            ├── /api/availability ── Calendar Provider
  │                            └── /api/book ───────────┬─ Google Calendar
  │                                                     └─ mock
  │
  ├── /solicitar ─────────────── /api/requests ──────── Data Provider
  │                                                     ├─ Neon Postgres
  │                                                     └─ mock memory
  │
  └── /status ────────────────── /api/status ─────────── Data Provider
```

## Camadas

### `app/`
Rotas e Route Handlers do Next.js App Router.

### `components/`
UI reutilizável e componentes client-side de interação.

### `lib/calendar/`
Provider de disponibilidade e criação de evento. Nenhuma credencial Google chega ao browser.

### `lib/data/`
Provider de persistência. Em produção, use Neon. O mock serve somente para desenvolvimento.

### `lib/scheduling.ts`
Regras puras de agenda: dias úteis, horário comercial, duração, buffer, antecedência e conflito.

### `content/`
Guias e mensagens de orientação em TypeScript, fáceis de editar e renderizar.

## APIs

### `GET /api/availability?date=YYYY-MM-DD`
Retorna horários livres para um dia.

### `POST /api/book`
Valida dados do cliente, revalida disponibilidade e cria evento.

### `POST /api/requests`
Cria uma demanda e devolve protocolo.

### `POST /api/status`
Recebe `{ id, email }` e devolve status se ambos coincidirem.

### `GET /api/health`
Mostra modo de Calendar e dados, sem revelar segredos.

## Estratégia de concorrência

`POST /api/book` consulta novamente a disponibilidade antes de inserir o evento. Ainda existe uma pequena janela de corrida entre consulta e inserção, inerente a uma implementação simples de Calendar. Para volume alto, evoluir para lock/transação externa ou calendário dedicado por slot.

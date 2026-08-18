# Contrato de API

Este documento registra as rotas canônicas após a remoção do módulo de agendamento.

## GET `/api/health`

Resposta exemplo:

```json
{
  "ok": true,
  "app": "ibd-portal-autoatendimento",
  "dataMode": "mock",
  "timestamp": "2026-08-18T03:00:00.000Z"
}
```

Não retorna credenciais nem informações de agenda.

---

## POST `/api/prospects`

Registra um novo prospect vindo de `/comecar`.

Payload conceitual:

```json
{
  "name": "Nome do Cliente",
  "email": "cliente@example.com",
  "whatsapp": "+55 85 99999-9999",
  "service": "landing_page",
  "need_description": "Preciso de uma landing page para lançamento.",
  "desired_deadline": "2026-09-10",
  "consent": true
}
```

A data desejada não representa prazo confirmado.

---

## POST `/api/prospects/[id]/briefing`

Salva respostas do briefing modular e seu progresso.

Regras:
- máximo de 3 perguntas apresentadas por etapa na interface;
- conclusão do briefing não confirma automaticamente prazo;
- escopo e materiais ainda precisam ser avaliados conforme as regras de produto.

---

## POST `/api/admin/activate-client`

Transforma um prospect elegível em cliente ativo e cria/associa a estrutura necessária do portal.

A ativação é administrativa e depende da formalização contratual definida pelo domínio.

---

## Portal do Cliente

Rotas principais:

- `GET /api/portal/projects`
- `GET /api/portal/projects/[id]`
- `POST /api/portal/projects/[id]/materials`
- `POST /api/portal/projects/[id]/revisions`

A sessão autenticada determina o cliente. Nunca confie em `client_id` arbitrário enviado pelo browser.

---

## POST `/api/cron/project-status`

Executa as regras operacionais de acompanhamento, incluindo marcos de 3 e 6 dias úteis, usando o fuso `America/Fortaleza`.

A rota deve ser protegida por `CRON_SECRET`.

---

## Rotas removidas

Não fazem parte do contrato vigente:

- `GET /api/availability`
- `POST /api/book`
- `GET /api/calendar/availability`
- `POST /api/calendar/book`

Não existe contrato de API para disponibilidade ou reserva de reuniões.

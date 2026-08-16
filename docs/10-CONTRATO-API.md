# Contrato de API

## GET `/api/health`

Resposta exemplo:

```json
{
  "ok": true,
  "app": "ibd-portal-autoatendimento",
  "calendarMode": "mock",
  "dataMode": "mock",
  "scheduling": {},
  "timestamp": "2026-08-16T15:00:00.000Z"
}
```

Não retorna credenciais.

---

## GET `/api/availability?date=2026-08-18`

Resposta:

```json
{
  "date": "2026-08-18",
  "slots": [
    {
      "start": "2026-08-18T09:00:00.000-03:00",
      "end": "2026-08-18T09:50:00.000-03:00",
      "label": "09:00",
      "dateLabel": "terça-feira, 18 de agosto"
    }
  ]
}
```

A API nunca retorna título/descrição dos eventos ocupados.

---

## POST `/api/book`

Payload:

```json
{
  "service": "conversa_inicial",
  "start": "2026-08-18T10:00:00-03:00",
  "name": "Nome do Cliente",
  "email": "cliente@example.com",
  "whatsapp": "+55 85 99999-9999",
  "notes": "Quero conversar sobre uma landing page.",
  "consent": true
}
```

Respostas relevantes:

- `201`: agendamento criado.
- `400`: payload inválido.
- `409`: horário ficou indisponível antes da confirmação.
- `500`: falha de integração.

---

## POST `/api/requests`

Payload:

```json
{
  "service": "landing_page",
  "description": "Preciso de uma landing page para lançamento.",
  "desiredDate": "2026-09-10",
  "hasMaterial": true,
  "materialNotes": "Tenho logo e fotos.",
  "wantsContent": true,
  "urgency": "normal",
  "clientName": "Nome do Cliente",
  "clientEmail": "cliente@example.com",
  "clientWhatsapp": "+55 85 99999-9999",
  "consent": true
}
```

Resposta `201`:

```json
{
  "ok": true,
  "request": {
    "id": "IBD-ABC12345",
    "status": "novo",
    "createdAt": "2026-08-16T15:00:00.000Z"
  }
}
```

---

## POST `/api/status`

Payload:

```json
{
  "id": "IBD-ABC12345",
  "email": "cliente@example.com"
}
```

O endpoint exige a combinação de protocolo + e-mail e devolve somente informações necessárias ao acompanhamento.

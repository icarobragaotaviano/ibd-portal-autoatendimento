# Modelo de dados

## Solicitação de cliente

```ts
type RequestStatus =
  | "novo"
  | "briefing_em_andamento"
  | "briefing_aprovado"
  | "aguardando_material"
  | "em_producao"
  | "versao_enviada"
  | "aguardando_retorno"
  | "pausado"
  | "revisao_em_andamento"
  | "concluido";
```

Campos persistidos no Neon:

| Campo | Tipo | Função |
|---|---|---|
| `id` | text | Protocolo público |
| `service` | text | Tipo de serviço |
| `description` | text | Necessidade inicial |
| `desired_date` | date nullable | Data desejada, ainda não confirmada |
| `has_material` | boolean | Cliente informou ter materiais |
| `material_notes` | text nullable | Observações sobre materiais |
| `wants_content` | boolean | Precisa de criação de conteúdo |
| `urgency` | text | `normal` ou `urgente` |
| `client_name` | text | Nome |
| `client_email` | text | E-mail usado também no lookup |
| `client_whatsapp` | text | Contato |
| `status` | text | Estado atual |
| `confirmed_due_date` | date nullable | Só preencher após briefing + material |
| `revisions_used` | integer | 0–2 no escopo normal |
| `consented_at` | timestamptz | Registro técnico do consentimento |
| `created_at` | timestamptz | Criação |
| `updated_at` | timestamptz | Última atualização |

## Regra de integridade de produto

`desired_date` e `confirmed_due_date` são conceitos diferentes. A UI nunca deve transformar automaticamente a data desejada pelo cliente em prazo confirmado.

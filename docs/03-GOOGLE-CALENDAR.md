# Google Calendar — configuração

## Objetivo

O app usa dois tipos de acesso:

- disponibilidade (`freeBusy`);
- criação de eventos (`events.insert`).

O usuário final **não autentica no Google**. O servidor usa um refresh token da conta proprietária do calendário.

## 1. Criar projeto no Google Cloud

1. Crie/abra um projeto no Google Cloud Console.
2. Ative **Google Calendar API**.
3. Configure a tela de consentimento OAuth.
4. Crie uma credencial OAuth 2.0 do tipo **Desktop app** ou **Web application** para o fluxo local.
5. Adicione como redirect URI local:

```text
http://localhost:53682/oauth2callback
```

Se alterar a porta, ajuste `GOOGLE_OAUTH_LOCAL_PORT`.

## 2. Obter refresh token com o script incluído

Preencha temporariamente:

```env
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GOOGLE_OAUTH_LOCAL_PORT="53682"
```

Instale dependências e execute:

```bash
npm install
npm run google:auth
```

O script imprimirá uma URL. Abra, autorize a conta do calendário e volte ao terminal. O callback local exibirá o refresh token.

Salve o token em `.env.local`:

```env
GOOGLE_REFRESH_TOKEN="..."
```

Nunca faça commit desse valor.

## 3. Escopos usados

O script solicita:

```text
https://www.googleapis.com/auth/calendar.freebusy
https://www.googleapis.com/auth/calendar.events.owned
```

A escolha busca o menor privilégio compatível com leitura de disponibilidade e criação/edição de eventos em calendários próprios.

## 4. Configuração final

```env
CALENDAR_MODE="google"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GOOGLE_REFRESH_TOKEN="..."
GOOGLE_CALENDAR_ID="primary"
GOOGLE_MEET_ENABLED="true"
```

## 5. O que vai para o evento

- Título: `[IBD] <serviço> — <cliente>`
- Descrição com necessidade, WhatsApp, próximo passo e link do Guia do Cliente.
- Participante: e-mail do cliente.
- Fuso: configurado pelo app.
- Meet: opcional, via `conferenceData`.
- Notificação: `sendUpdates=all`.

## 6. Segurança

`GOOGLE_CLIENT_SECRET` e `GOOGLE_REFRESH_TOKEN` são server-only. Nunca os prefixe com `NEXT_PUBLIC_`.

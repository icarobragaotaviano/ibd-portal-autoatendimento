# Deploy na Vercel

## Pré-requisitos

- Repositório GitHub.
- Projeto Vercel conectado ao repositório.
- Node 20.9+.

## Passos

1. Faça push do projeto para um repositório privado.
2. Importe o repositório na Vercel.
3. Framework: Next.js (detecção automática).
4. Cadastre as variáveis do `.env.example` em **Project Settings → Environment Variables**.
5. Rode o primeiro deploy em `CALENDAR_MODE=mock` e `DATA_MODE=mock`.
6. Verifique `/api/health`.
7. Configure Google Calendar e altere `CALENDAR_MODE=google`.
8. Configure Neon e altere `DATA_MODE=neon` antes de usar acompanhamento real em produção.

## Variáveis públicas

Somente dados que podem aparecer no browser:

- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_WHATSAPP_URL`

Todo segredo deve permanecer sem `NEXT_PUBLIC_`.

## Recomendação de ambientes

- Preview: `CALENDAR_MODE=mock`, `DATA_MODE=mock`.
- Production: `CALENDAR_MODE=google`, `DATA_MODE=neon`.

Isso evita que branches de teste criem reuniões reais.

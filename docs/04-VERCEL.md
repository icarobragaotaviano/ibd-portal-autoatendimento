# Deploy na Vercel

## Pré-requisitos

- Repositório GitHub.
- Projeto Vercel conectado ao repositório.
- Node 20.x.
- Projeto Supabase para produção.
- Conta/domínio configurado no Resend para e-mails transacionais.

## Passos

1. Importe o repositório na Vercel.
2. Framework: Next.js (detecção automática).
3. Cadastre as variáveis do `.env.example` em **Project Settings → Environment Variables**.
4. Em Preview, use providers `mock` quando quiser isolar testes de infraestrutura.
5. Verifique `/api/health`.
6. Configure Supabase para Database/Auth/Storage.
7. Configure Resend para e-mails transacionais.
8. Configure `CRON_SECRET` para proteger a rotina de status de projetos.
9. Faça o deploy de produção e valide `/comecar`, login, portal e admin.

## Serviços externos

A aplicação não requer Google Cloud nem Google Calendar. Os serviços externos operacionais são:

- Supabase;
- Resend;
- Vercel.

## Variáveis públicas

Somente dados que podem aparecer no browser:

- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Todo segredo deve permanecer sem `NEXT_PUBLIC_`.

## Ambientes

- **Preview:** providers mock ou projeto Supabase de teste.
- **Production:** Supabase + Resend reais e `CRON_SECRET` forte.

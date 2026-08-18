# IBD Client Portal 2026 — START HERE

Bem-vindo ao **IBD Client Portal 2026**, a plataforma de apresentação comercial, relacionamento, atendimento e acompanhamento de projetos do estúdio **IBD — Ícaro Braga Designer**.

---

## 1. Visão Geral e Princípios Fundamentais

O portal unifica a presença institucional pública e a operação interna sob 3 domínios claros:

1. **Aquisição & Site Comercial (`prospects`)**: visitantes conhecem o estúdio nas rotas públicas e iniciam exclusivamente em `/comecar?service=slug`, aceitam o Manual do Cliente e preenchem o briefing progressivo.
2. **Relacionamento (`clients`)**: o cliente nunca cria o próprio portal. Apenas a ação administrativa **ATIVAR CLIENTE**, após contrato formalizado, converte um prospect em cliente ativo.
3. **Execução (`projects`)**: gestão de projetos com Próxima Ação centralizada, distinção entre Data Desejada, Estimativa e Prazo Confirmado, 2 rodadas de revisão e automação diária via Cron.

A jornada é **100% assíncrona e estruturada**. Não há rota pública de agendamento nem integração com Google Calendar.

---

## 2. Stack Tecnológica Definitiva

- **Framework**: Next.js App Router
- **Linguagem**: TypeScript 5.9+
- **Estilização**: Tailwind CSS + tokens IBD 2026
- **Ícones**: `lucide-react`
- **Banco de Dados**: Supabase Postgres com RLS + provider mock
- **Armazenamento**: Supabase Storage com Signed URLs + mock
- **E-mails**: Resend + mock
- **Automação**: Vercel Cron (`/api/cron/project-status`)
- **Fuso operacional**: `America/Fortaleza`
- **Testes**: Vitest

Serviços externos necessários em produção: **Supabase, Resend e Vercel**.

---

## 3. Estrutura de Diretórios

```txt
├── app/
│   ├── (public)/               # Site institucional, guias e /comecar
│   ├── login/                  # Autenticação Cliente/Admin
│   ├── portal/                 # Portal do Cliente
│   ├── admin/                  # Cockpit comercial e operacional
│   └── api/                    # Admin, Portal, Prospects, Cron e Health
├── components/
│   ├── public/                 # Camada comercial
│   └── ui/                     # Design System
├── data/
│   ├── services.ts             # Serviços canônicos
│   └── cases.ts                # Portfólio autorizado
├── database/
│   └── migrations/             # Schemas e RLS
├── lib/
│   ├── domain/                 # Regras, estados, prazos e próxima ação
│   ├── services/               # Database, Storage e Email
│   ├── analytics/
│   └── observability/
└── tests/                      # Testes automatizados
```

Não devem existir `lib/calendar`, `lib/services/calendar`, `/api/book`, `/api/availability` ou `/agendar`.

---

## 4. Como Executar Localmente

```bash
npm install
cp .env.example .env.local
npm test
npm run dev
```

Abra `http://localhost:3000`.

---

## 5. Jornada Oficial

```text
Site Público
  → /comecar
  → Prospect
  → Manual do Cliente
  → Briefing Guiado
  → Proposta
  → Contrato
  → Ativação do Cliente
  → Portal Privado
```

---

## 6. Documentação Adicional

- `docs/14-SITE-PUBLICO.md`: camada pública comercial.
- `docs/01-PRODUTO-E-REGRAS.md`: regras de negócio canônicas.
- `docs/02-ARQUITETURA.md`: arquitetura em camadas.
- `docs/04-VERCEL.md`: deploy e variáveis.
- `docs/05-SEGURANCA-LGPD.md`: segurança, RLS e LGPD.
- `docs/10-CONTRATO-API.md`: APIs vigentes.

O conteúdo em `docs/referencia/` é histórico e pode registrar decisões substituídas pela arquitetura atual.

# IBD Client Portal 2026 — START HERE

Bem-vindo ao **IBD Client Portal 2026**, a plataforma completa de apresentação comercial, relacionamento, atendimento e acompanhamento de projetos do estúdio **IBD — Ícaro Braga Designer**.

---

## 1. Visão Geral e Princípios Fundamentais

O portal unifica a presença institucional pública e a operação interna sob 3 domínios claros de negócio:
1. **Aquisição & Site Comercial (`prospects`)**: Visitantes conhecem o estúdio em rotas públicas (`/`, `/servicos`, `/quem-sou`, `/como-eu-trabalho`, `/como-trabalhamos`, `/portfolio`), iniciam em `/comecar?service=slug`, aceitam o Manual do Cliente e preenchem o briefing progressivo (máximo 3 perguntas por etapa).
2. **Relacionamento (`clients`)**: O cliente nunca cria o próprio portal. Apenas uma ação administrativa explícita (**ATIVAR CLIENTE**) após assinatura de contrato formaliza a conversão de um prospect em cliente ativo.
3. **Execução (`projects`)**: Gestão de projetos com cálculo centralizado de **PRÓXIMA AÇÃO** (`getProjectNextAction`), distinção clara entre 3 conceitos de data (Desejada, Estimativa e Prazo Confirmado), limite de 2 rodadas de revisão e automação diária via Cron.

---

## 2. Stack Tecnológica Definitiva

- **Framework**: Next.js (App Router, Turbopack, React Server Components)
- **Linguagem**: TypeScript 5.9+ com modo estrito (`strict: true`)
- **Estilização**: Tailwind CSS com Tokens Semânticos IBD 2026 (`globals.css`)
- **Ícones**: `lucide-react`
- **Banco de Dados**: Supabase Postgres com RLS + Provedor Mock em memória
- **Armazenamento**: Supabase Storage com Signed URLs + Mock Storage
- **E-mails**: Resend com templates HTML dark de alto contraste + Mock
- **Calendário**: Google Calendar API (dual calendar: reuniões + prazos transparentes) + Mock
- **Automação**: Vercel Cron (`/api/cron/project-status` às 09:00 Fortaleza)
- **Testes**: Vitest (50 testes automatizados cobrindo regras de negócio, dados, dias úteis e segurança de publicação)

---

## 3. Estrutura de Diretórios

```txt
├── app/
│   ├── layout.tsx              # Root Layout puro (fontes, globals, meta)
│   ├── (public)/               # Route Group Público com PublicHeader e PublicFooter
│   │   ├── layout.tsx          # Shell do site institucional
│   │   ├── page.tsx            # Home de Onboarding do Estúdio
│   │   ├── servicos/           # Catálogo editorial de serviços
│   │   ├── quem-sou/           # Posicionamento Ícaro Braga (1ª pessoa)
│   │   ├── como-eu-trabalho/   # Metodologia IBD (5 etapas de execução)
│   │   ├── como-trabalhamos/   # 7 Combinados do Processo
│   │   ├── portfolio/          # Cases autorizados e publicados (/portfolio/[slug])
│   │   ├── guia/               # Central de Guias (/guia/[slug])
│   │   ├── comecar/            # Entrada do lead com pré-seleção server-side
│   │   └── agendar/            # Agendamento integrado com Google Calendar
│   ├── login/                  # Autenticação segura isolada (Cliente / Admin)
│   ├── portal/                 # Portal do Cliente ativo (Próxima Ação, Projetos, Revisões)
│   ├── admin/                  # Painel Comercial e Operacional (HOJE, Atenção, Ativar Cliente)
│   ├── robots.ts               # Proteção de indexação (noindex em admin/portal/login)
│   ├── sitemap.ts              # URLs canônicas públicas
│   └── api/                    # API Routes (Admin, Portal, Prospects, Calendar, Cron)
├── components/
│   ├── public/                 # Componentes da camada comercial institucional
│   └── ui/                     # 19 Componentes primitivos do Design System IBD 2026
├── data/
│   ├── services.ts             # Fonte única de serviços, precificação e prazos
│   └── cases.ts                # Fonte única de portfólio com filtro de publicação
├── database/
│   └── migrations/             # Schemas Postgres (01_initial_schema, 02_rls_policies)
├── lib/
│   ├── domain/                 # Entidades de domínio, types, LeadStage, ProjectStatus, NextAction
│   ├── services/               # Provedores Duais (Database, Storage, Email, Calendar)
│   ├── analytics/              # Tracking público encapsulado e sanitizado
│   └── observability/          # Sentry e PostHog
└── tests/                      # 50 Testes automatizados (Vitest)
```

---

## 4. Como Executar Localmente

### Pré-requisitos
- Node.js 20+
- npm

### Passo 1: Instalar dependências
```bash
npm install
```

### Passo 2: Executar testes automatizados
```bash
npm test
```

### Passo 3: Iniciar servidor de desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Credenciais de Demonstração (Modo Mock)
- **Admin**: Acesso em `/login` (selecionar *Acesso Admin*) com a senha padrão `ibd2026admin`.
- **Cliente**: Acesso em `/login` com qualquer e-mail contendo `vertice` (ex: `contato@vertice.com`).

---

## 5. Documentação Adicional
- `docs/14-SITE-PUBLICO.md`: Arquitetura da camada pública comercial.
- `docs/01-PRODUTO-E-REGRAS.md`: Regras de negócio canônicas.
- `docs/02-ARQUITETURA.md`: Arquitetura em camadas e isolamento.
- `docs/03-GOOGLE-CALENDAR.md`: Configuração do Google Calendar.
- `docs/04-VERCEL.md`: Deploy no Vercel e Cron jobs.
- `docs/05-SEGURANCA-LGPD.md`: RLS, segurança e consentimento LGPD.

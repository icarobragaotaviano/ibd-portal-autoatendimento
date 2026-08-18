# IBD Client Portal 2026 — Guia de Implantação e Operação

Este documento orienta a configuração dos serviços externos (**Supabase**, **Resend** e **Vercel**), detalha a jornada operacional assíncrona e descreve como colocar o portal em produção.

---

## 1. Visão Geral do Fluxo Operacional (100% Assíncrono)

O portal elimina agendamentos e reuniões manuais, operando em um pipeline contínuo e rastreável:

```text
[1. Entrada do Lead]
    ↓  (/comecar) — Formulário inicial com nome, e-mail, WhatsApp e demanda.
[2. Briefing Guiado]
    ↓  (/comecar/briefing) — Respostas estruturadas e salvas progressivamente.
[3. Análise & Proposta]
    ↓  (/admin/prospects/[id]) — Cockpit administrativo com histórico e criação de proposta.
[4. Contrato & Formalização]
    ↓  Registro do contrato assinado no admin.
[5. Ativação do Cliente]
    ↓  Ação "ATIVAR CLIENTE" cria perfil, habilita acesso e dispara convite por e-mail.
[6. Execução no Portal]
       (/portal) — Envio de materiais, acompanhamento de prazos, aprovações e revisões.
```

---

## 2. Passo a Passo de Configuração dos Serviços

### Passo 1: Supabase (Banco de Dados, Autenticação e Storage)

1. Crie uma conta ou acesse um projeto existente no [Supabase](https://supabase.com/).
2. **Executar Migrations de Banco de Dados**:
   - No menu lateral esquerdo, acesse **SQL Editor**.
   - Crie uma **New Query**, cole o conteúdo de `database/migrations/01_initial_schema.sql` e execute (**Run**).
   - Crie uma segunda query, cole o conteúdo de `database/migrations/02_rls_policies.sql` e execute (**Run**).
3. **Criar Bucket de Arquivos (Storage)**:
   - Acesse o menu **Storage**.
   - Crie um novo bucket com o nome: `project-files`.
   - Mantenha o bucket com acesso **Privado** (o acesso é feito através de Signed URLs temporárias).
4. **Obter as Chaves de Acesso**:
   - Acesse **Project Settings > API**.
   - Copie os valores:
     - `Project URL` → para `NEXT_PUBLIC_SUPABASE_URL`
     - `anon / public` key → para `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `service_role` key → para `SUPABASE_SERVICE_ROLE_KEY`

---

### Passo 2: Resend (Envio de E-mails Transacionais)

1. Crie uma conta no [Resend](https://resend.com/).
2. **Gerar Chave de API**:
   - Acesse o menu **API Keys**.
   - Clique em **Create API Key**, defina permissão total de envio e copie a chave gerada (`re_...`).
3. **Configurar Domínio Próprio (Produção)**:
   - Acesse **Domains > Add Domain** e informe o domínio (ex.: `icarobraga.com`).
   - Insira os registros DNS fornecidos (SPF, DKIM e MX) na zona DNS do seu domínio.
   - *Nota:* Para testes em ambiente local de desenvolvimento, é possível utilizar o remetente de teste padrão do Resend (`onboarding@resend.dev`).

---

### Passo 3: Configurar Variáveis de Ambiente

Crie ou atualize o arquivo `.env.local` na raiz do projeto para desenvolvimento local, e configure as mesmas variáveis na **Vercel** para produção:

```bash
# =========================================================
# IBD CLIENT PORTAL 2026 — CONFIGURAÇÃO DE PRODUÇÃO
# =========================================================

# Informações da Aplicação
NEXT_PUBLIC_APP_NAME="IBD — Ícaro Braga Designer"
NEXT_PUBLIC_APP_URL="https://seu-dominio.com"  # Em dev: http://localhost:3000
APP_TIMEZONE="America/Fortaleza"

# Provedores Ativos (supabase | resend)
DATABASE_PROVIDER="supabase"
STORAGE_PROVIDER="supabase"
EMAIL_PROVIDER="resend"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://seu-projeto.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."

# Resend
RESEND_API_KEY="re_..."
EMAIL_FROM="IBD Studio <atendimento@icarobraga.com>"

# Vercel Cron Secret (para proteção de /api/cron/project-status)
CRON_SECRET="gere-uma-string-segura-e-aleatoria"

# Contato & Atendimento
NEXT_PUBLIC_CONTACT_EMAIL="atendimento@icarobraga.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="5585999999999"

# Observabilidade (Opcional)
NEXT_PUBLIC_SENTRY_DSN=""
NEXT_PUBLIC_POSTHOG_KEY=""
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"
```

---

### Passo 4: Deploy e Cron Jobs na Vercel

1. Importe o repositório na [Vercel](https://vercel.com/).
2. No painel do projeto na Vercel, acesse **Settings > Environment Variables** e adicione todas as variáveis listadas no Passo 3.
3. Realize o Deploy inicial da branch `main`.
4. **Cron Job Automático**:
   - O arquivo `vercel.json` na raiz já está configurado para disparar a rota `/api/cron/project-status` diariamente às 08:00 (Fortaleza / UTC-3).
   - O cron monitora automaticamente os prazos, regras de inatividade (Dia 3 / Dia 6) e status de projetos.

---

## 3. Validação e Testes

Antes e depois de subir para produção, você pode validar a integridade da aplicação com os comandos:

```bash
# Executar suíte de testes unitários (Vitest)
npm run test

# Testar build de produção do Next.js
npm run build

# Iniciar servidor local
npm run dev
```

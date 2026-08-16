# docs/12-AVALIACAO-SERVICOS.md — Avaliação de Serviços Gratuitos (Neon vs Supabase)

Este documento compara os recursos do Neon Postgres (utilizado inicialmente) com o ecossistema Supabase para guiar a migração e expansão do portal do cliente IBD 2026.

---

## 1. Comparativo Geral: Neon vs Supabase

| Recurso | Neon Postgres | Supabase (Postgres Managed) |
|---|---|---|
| **Banco de Dados** | Serverless Postgres puro. Excelente escalabilidade e cold starts rápidos. | Postgres gerenciado completo. Excelente performance. |
| **Limites Free Tier** | 1 projeto, 0.5 GiB de armazenamento, branch única (desativa após inatividade). | 2 projetos ativos, 500 MB de banco de dados, 1 GB de banda mensal. |
| **Recurso de Branching** | Excelente suporte nativo (cria clones instantâneos por git branch). | Pago ou complexo de configurar no free tier. |
| **Storage de Arquivos** | Não possui nativamente (exige AWS S3, Cloudinary ou similar). | Nativo (Supabase Storage com 1 GB de armazenamento grátis). |
| **Autenticação (Auth)** | Não possui (exige Auth0, Clerk ou NextAuth customizado). | Nativo (Supabase Auth: e-mail/senha, redes sociais, grátis até 50 mil MAU). |
| **Facilidade de Uso** | Requer ORM ou queries nativas sem painel administrativo rico. | Painel administrativo web completo com gerenciador de tabelas e logs. |

---

## 2. Adoção do Supabase no IBD Portal

Para o MVP e a evolução de longo prazo do IBD Portal, o **Supabase é a escolha superior** devido ao empacotamento completo de serviços que mantém o custo em **zero real**.

### 2.1. Responsabilidades Assumidas pelo Supabase

1. **Database:**
   - Substituição transparente do Neon. Armazenamento de solicitações (`client_requests`), logs de alteração de status e agendas.
2. **Storage (Envio de Arquivos):**
   - Permitirá que o cliente faça upload de materiais, logos, referências e briefings em PDF diretamente pelo portal, gerando URLs de download seguras e temporárias.
3. **Autenticação (Auth):**
   - Controle de acesso para a área `/admin` do designer e, no futuro, permitindo que cada cliente tenha seu próprio painel autenticado para visualizar solicitações e aprovar rodadas de revisão.

---

## 3. Modelo de Dados Supabase (DDL Inicial)

```sql
-- Habilita extensão de UUIDs se necessário
create extension if not exists "uuid-ossp";

-- 1. Tabela de solicitações (client_requests)
create table public.client_requests (
  id varchar(30) primary key, -- Ex: IBD-2026-XXXX
  service varchar(50) not null,
  description text not null,
  desired_date date,
  has_material boolean default false,
  material_notes text,
  wants_content boolean default false,
  urgency varchar(20) default 'normal',
  client_name varchar(255) not null,
  client_email varchar(255) not null,
  client_whatsapp varchar(50) not null,
  status varchar(50) default 'novo',
  confirmed_due_date date,
  revisions_used integer default 0,
  consented_at timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indices para otimização
create index idx_requests_email on public.client_requests(client_email);
create index idx_requests_status on public.client_requests(status);

-- 2. Tabela de arquivos anexados (request_files)
create table public.request_files (
  id uuid primary key default uuid_generate_v4(),
  request_id varchar(30) references public.client_requests(id) on delete cascade,
  file_name varchar(255) not null,
  file_path text not null, -- Caminho do bucket Supabase Storage
  file_size integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

---

## 4. Integração de E-mail (Resend) & Cron (Vercel)

- **Resend:** Utilizado para e-mails transacionais utilizando o domínio verificado do estúdio.
- **Vercel Cron:** Execução diária via rotina automatizada (`CRON_SECRET`) para verificar solicitações paradas em `aguardando_retorno` por 3 dias úteis (dispara lembrete) ou 6 dias úteis (altera status para `pausado`).

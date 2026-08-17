# 🏛️ IBD — Portal de Autoatendimento & Estúdio Criativo
## Documentação Oficial de Engenharia, Produto e Design System (Nível Enterprise / Studio Master)

---

## 📑 Sumário Geral

1. [Visão Executiva & Proposta de Valor](#1-visão-executiva--proposta-de-valor)
2. [Arquitetura de Experiência (UX) & Design System (UI)](#2-arquitetura-de-experiência-ux--design-system-ui)
3. [Jornadas dos Usuários (Ponta a Ponta)](#3-jornadas-dos-usuários-ponta-a-ponta)
4. [Regras de Negócio & Máquina de Estados (Domain Rules)](#4-regras-de-negócio--máquina-de-estados-domain-rules)
5. [Arquitetura de Engenharia & Stack Tecnológica](#5-arquitetura-de-engenharia--stack-tecnológica)
6. [Módulos de Integração Externa](#6-módulos-de-integração-externa)
7. [Contrato de Dados & Especificação de APIs](#7-contrato-de-dados--especificação-de-apis)
8. [Segurança, Governança & LGPD](#8-segurança-governança--lgpd)
9. [Guia de Operação, Testes & Manutenção](#9-guia-de-operação-testes--manutenção)

---

## 1. Visão Executiva & Proposta de Valor

### 1.1 O Desafio de Negócio
No mercado de design e criação digital de alto padrão, estúdios e designers independentes enfrentam gargalos crônicos:
* **Fricção no Primeiro Contato:** Trocas infinitas de e-mails/WhatsApp para tentar casar agendas ou explicar orçamentos.
* **Assimetria de Expectativas de Prazo:** Clientes esperando entregas imediatas sem terem enviado briefing ou materiais de apoio.
* **Ruído e Ansiedade no Acompanhamento:** O cliente não sabe com clareza em qual etapa o projeto está e de quem é a responsabilidade pela próxima ação.
* **Desgaste em Revisões & Escopo:** Pedidos que extrapolam o combinado sem formalização transparente.

### 1.2 A Solução: IBD Portal de Autoatendimento
O **IBD Portal** é uma plataforma full-stack de autoatendimento e governança de projetos, desenhada para transformar a relação cliente-estúdio em uma experiência transparente, automatizada e de altíssima confiança.

```
       ┌─────────────────────────────────────────────────────────────┐
       │                VISITANTE / CLIENTE EM POTENCIAL              │
       └──────────────┬───────────────────────────────┬──────────────┘
                      │                               │
           [Solicitar Projeto / Briefing]     [Agendar Conversa]
                      │                               │
                      ▼                               ▼
       ┌──────────────────────────────┐ ┌─────────────────────────────┐
       │     Briefing Progressivo     │ │  Sincronização Google Cal   │
       │    (Até 3 perguntas/etapa)   │ │  (Cálculo de slots reais)   │
       └──────────────┬───────────────┘ └─────────────┬───────────────┘
                      │                               │
                      └───────────────┬───────────────┘
                                      ▼
                      ┌───────────────────────────────┐
                      │    CENTRAL DE GOVERNANÇA      │
                      │  - Regra dos 3 e 6 dias úteis │
                      │  - Trava de 2 revisões        │
                      │  - Componente NextActionCard  │
                      └───────────────┬───────────────┘
                                      │
                      ┌───────────────┴───────────────┐
                      ▼                               ▼
       ┌──────────────────────────────┐ ┌─────────────────────────────┐
       │       PORTAL DO CLIENTE      │ │     COCKPIT ADMIN (IBD)     │
       │  Status, Materiais, Aprovação│ │  Gestão, Leads, Faturamento │
       └──────────────────────────────┘ └─────────────────────────────┘
```

---

## 2. Arquitetura de Experiência (UX) & Design System (UI)

### 2.1 Princípios de Design
1. **Dark Mode Editorial:** Atmosfera sofisticada, imersiva e focada no trabalho criativo, utilizando contrastes precisos entre superfícies.
2. **Destaque Amarelo IBD (`#ffd400`):** Usado com intencionalidade cirúrgica para pontos de atenção, chamadas para ação prioritárias e próximos passos.
3. **Clareza Imediata (Zero Ansiedade):** Toda tela responde em menos de 2 segundos às 5 perguntas essenciais:
   * *Onde estou?*
   * *Qual é o status atual?*
   * *Quem é o responsável por agir agora (Cliente ou IBD)?*
   * *Qual é a ação necessária?*
   * *Existe prazo limite em contagem regressiva?*

### 2.2 Tokens de Design (Design Tokens)

| Token CSS | Valor Hex | Finalidade / Semântica |
| :--- | :--- | :--- |
| `--background` | `#050505` | Fundo absoluto da aplicação |
| `--surface` | `#111111` | Fundo de cartões, formulários e seções |
| `--surface-elevated` | `#161616` | Modais, caixas de diálogo e menus suspensos |
| `--surface-strong` | `#1c1c1c` | Cabeçalhos de tabelas e áreas de destaque |
| `--border` | `rgba(255, 255, 255, 0.08)` | Divisórias e bordas padrão de baixo ruído |
| `--border-hover` | `rgba(255, 255, 255, 0.18)` | Estados de foco e hover interativo |
| `--accent` | `#ffd400` | Amarelo ouro de ação e foco IBD |
| `--accent-hover` | `#ffdf33` | Variação iluminada de hover no destaque |
| `--text-primary` | `#ffffff` | Títulos, cabeçalhos e textos de alto contraste |
| `--text-secondary` | `#d4d4d4` | Corpo de leitura, descrições e parágrafos |
| `--text-muted` | `#8a8a8a` | Metadados, protocolos, datas e labels secundárias |
| `--success` | `#10b981` | Conclusões, briefings aprovados e status positivos |
| `--warning` | `#f59e0b` | Ações pendentes do cliente, revisões em uso |
| `--danger` | `#ef4444` | Projetos pausados, prazos críticos e cancelamentos |

### 2.3 Tipografia
* **Display / Títulos:** `Space Grotesk` — Personalidade geométrica moderna com `tracking-tight`.
* **Corpo / Leitura:** `Inter` — Legibilidade impecável para formulários e guias.
* **Metadados / Protocolos:** `IBM Plex Mono` — Usada para identificadores (`PRJ-2026-001`, `CLI-001`), contadores de revisão (`1/2`) e carimbos de data/hora.

### 2.4 Componentes Chave da Interface
* **`NextActionCard`:** O componente mais estratégico da UI. Ele resume de forma destacada quem detém a bola no momento (`owner: "client" | "ibd" | "none"`), a mensagem de instrução e o botão de ação imediata.
* **`StatusBadge`:** Identificador visual com cores semânticas e labels oficiais em português para todos os estados de projeto e estágios de lead.
* **`ConfirmationDialog`:** Modal de confirmação para ações de alto impacto (aprovação de projeto, solicitação de revisão, ativação de cliente).
* **`Progress`:** Barra de progresso para a jornada de briefing modular.

---

## 3. Jornadas dos Usuários (Ponta a Ponta)

```mermaid
journey
    title Jornada do Cliente no IBD Portal
    section Descoberta
      Visita à Home e Portfólio: 5: Visitante
      Consulta às Guias e Processos: 5: Visitante
    section Entrada
      Preenchimento de Briefing / Agendamento: 4: Lead
      Recebimento de Confirmação e Protocolo: 5: Lead
    section Produção
      Acompanhamento no Portal: 5: Cliente
      Envio de Materiais Pendentes: 4: Cliente
      Recebimento da Primeira Versão: 5: Cliente
    section Conclusão
      Aprovação com 1 Clique: 5: Cliente
      Recebimento dos Arquivos Finais: 5: Cliente
```

### 3.1 Jornada 1: Descoberta & Conversão (Visitante ➔ Lead)
1. **Home (`/`):** Apresentação do posicionamento do estúdio, pilares de atuação e chamada rápida.
2. **Serviços (`/servicos`):** Catálogo transparente de soluções (Identidade Visual, Peças para Redes, Landing Pages, Materiais Gráficos).
3. **Como Trabalho (`/como-eu-trabalho`):** Manifesto do método IBD (Briefing antes de tudo, 2 revisões, prazos só após materiais).
4. **Central de Guias (`/guia`):** Acervo público com 7 manuais explicativos (Manual do Cliente, Prazos, Revisões, Materiais, Retorno e Pausa, Escopo e FAQ).

### 3.2 Jornada 2: Onboarding & Briefing Progressivo (`/comecar`)
* O cliente inicia sua solicitação sem sobrecarga cognitiva:
  * **Etapa 1:** Identificação do cliente (Nome, E-mail, WhatsApp).
  * **Etapa 2:** Tipo de demanda e escopo desejado.
  * **Etapa 3:** Perguntas contextuais de briefing (máximo 3 perguntas por rodada).
  * **Etapa 4:** Envio de links/arquivos de referência ou declaração de material pendente.
* Ao finalizar, é gerado o protocolo do lead (`PRP-XXXX`) e redirecionamento para `/comecar/obrigado`.

### 3.3 Jornada 3: Agendamento Inteligente (`/agendar`)
* Consulta em tempo real à API do Google Calendar (`freeBusy`).
* Regras estritas: segunda a sexta, 09h às 18h, sessões de 50 min, intervalo de 10 min e bloqueio de agendamento com menos de 24h de antecedência.
* Criação de evento com link de Google Meet automático e envio de convite.

### 3.4 Jornada 4: Gestão do Projeto no Portal (`/portal/projetos/[id]`)
* O cliente acessa seu painel seguro para:
  1. Acompanhar a barra de progresso do status atual.
  2. Enviar arquivos complementares (`/api/portal/projects/[id]/materials`).
  3. Solicitar rodada de revisão estruturada (com trava automática ao atingir 2 rodadas).
  4. Aprovar a entrega final com 1 clique.

### 3.5 Jornada 5: Cockpit Administrativo (`/admin`)
* Painel exclusivo do designer para controle operacional total:
  * **Kanban / Lista de Prospects:** Visualização do funil de vendas.
  * **Gestão de Projetos:** Transições de status, definição de data de entrega bilateral e envio de links de entrega.
  * **Ativação de Clientes:** Conversão de lead em cliente com credenciais geradas.

---

## 4. Regras de Negócio & Máquina de Estados (Domain Rules)

### 4.1 Máquina de Estados dos Projetos (10 Status Oficiais)

```
 [NOVO] ──► [BRIEFING_PENDENTE] ──► [AGUARDANDO_MATERIAL] ──► [EM_PRODUCAO]
                                                                   │
                                                                   ▼
 [CONCLUIDO] ◄── [APROVADO] ◄── [REVISAO_SOLICITADA] ◄── [EM_REVISAO]
       ▲
       │
 [PAUSADO] (Caso fique 6 dias úteis sem resposta)
 [CANCELADO]
```

| Status | Label na Interface | Responsável pela Ação | Regra de Negócio Associada |
| :--- | :--- | :--- | :--- |
| `novo` | Novo | IBD | Solicitação recém-chegada. Requer triagem. |
| `briefing_pendente` | Briefing Pendente | Cliente | Designer enviou perguntas de briefing. |
| `aguardando_material` | Aguardando Material | Cliente | Briefing aprovado, mas faltam assets (logos, textos, fotos). |
| `em_producao` | Em Produção | IBD | Materiais recebidos. Cronômetro de entrega ativado. |
| `em_revisao` | Primeira Versão Enviada | Cliente | Versão enviada. Cliente tem até 3 dias para feedback. |
| `revisao_solicitada` | Revisão em Andamento | IBD | Ajustes solicitados dentro das 2 rodadas inclusas. |
| `aprovado` | Aprovado | IBD | Cliente aprovou a versão. Preparando arquivos finais. |
| `concluido` | Concluído | Nenhum | Arquivos finais entregues. |
| `pausado` | Pausado | Cliente | 6 dias úteis sem resposta. Prazo resetado. |
| `cancelado` | Cancelado | Nenhum | Projeto descontinuado. |

### 4.2 Regras Críticas de Operação

#### ⏱️ A. Regra do Prazo Bilateral
> **"Nenhum prazo de entrega final é compromisso antes do briefing aprovado e dos materiais em mãos."**  
Qualquer data escolhida antes disso é tratada como "Previsão Desejada" e só é confirmada após a transição para `em_producao`.

#### 📅 B. Regra dos 3 e 6 Dias Úteis
* **3 Dias Úteis sem Retorno:** Disparo de notificação suave de acompanhamento (*"Te enviei a versão no dia X. Precisa de ajuste ou posso seguir?"*).
* **6 Dias Úteis sem Retorno:** Transição automática para `pausado` (*"Projeto pausado por falta de retorno. Quando responder, reagendamos nova data de entrega"*). O cálculo ignora finais de semana e feriados.

#### 🔄 C. Governança de 2 Rodadas de Revisão
* Todo projeto inclui exatamente **2 rodadas de revisão** estruturadas.
* O sistema contabiliza `revisions_used / revisions_total`.
* Ao atingir `2/2`, a interface desabilita o formulário de revisão comum e orienta a solicitação de aditivo de escopo ou aprovação da versão final.

---

## 5. Arquitetura de Engenharia & Stack Tecnológica

### 5.1 Stack de Produção

```
┌──────────────────────────────────────────────────────────────┐
│                       NEXT.JS 16.3.1                         │
│               App Router · React 19 · Turbopack              │
├──────────────────────────────┬───────────────────────────────┤
│           UI & UX            │           BACKEND             │
│  - Tailwind CSS 4.3          │  - Next.js Serverless Routes  │
│  - Lucide React (Ícones)     │  - Zod 4.4.3 (Validação)      │
│  - Design Tokens CSS         │  - Luxon 3.7.2 (Timezones)    │
├──────────────────────────────┼───────────────────────────────┤
│          PERSISTÊNCIA        │         SERVIÇOS EXTERNOS     │
│  - Supabase / PostgreSQL     │  - Google Calendar API v3     │
│  - Neon Serverless Postgres  │  - Resend (E-mails)           │
│  - Storage (Uploads)         │  - Supabase Storage           │
└──────────────────────────────┴───────────────────────────────┘
```

### 5.2 Estrutura do Repositório

```
ibd-portal-autoatendimento/
├── app/
│   ├── (public)/                 # Rotas públicas do estúdio (Home, Serviços, Portfólio, Guias)
│   ├── admin/                    # Cockpit administrativo fechado
│   ├── portal/                   # Portal do cliente logado
│   ├── api/                      # Endpoints de API REST / Serverless
│   ├── layout.tsx                # Layout raiz com fontes e metadados OpenGraph
│   └── globals.css               # Design tokens e variáveis de cores
├── components/
│   ├── ui/                       # Componentes primitivos atômicos (Button, Card, Badge, etc.)
│   ├── shared/                   # Componentes compartilhados (Header, Footer, NextActionCard)
│   ├── forms/                    # Formulários estruturados com validação
│   └── admin/                    # Tabelas e cartões específicos do painel admin
├── lib/
│   ├── domain/                   # Lógica pura de negócio (regras, prazos, estados, types)
│   ├── services/                 # Adaptadores de infra (Database, Calendar, Storage, Email)
│   └── validation.ts             # Schemas Zod universais
├── content/                      # Conteúdos estáticos e acervo de guias markdown
├── database/                     # Migrações SQL e scripts de banco de dados
└── tests/                        # Bateria de testes unitários com Vitest
```

---

## 6. Módulos de Integração Externa

### 6.1 Integração Google Calendar API v3
* **Arquivo Responsável:** `lib/services/calendar/google-calendar.ts`
* **Autenticação:** OAuth 2.0 via `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` e `GOOGLE_REFRESH_TOKEN`.
* **Script de Obtenção:** `npm run google:auth` (executa `scripts/google-auth.mjs`).
* **Operações:**
  1. `getAvailableSlots(dateString)`: Consulta `freeBusy` no fuso `America/Sao_Paulo` e gera janelas de 50 minutos.
  2. `createBooking(bookingData)`: Cria o evento com `conferenceDataVersion: 1` para gerar o link do Google Meet e dispara convites por e-mail (`sendUpdates: "all"`).

### 6.2 Notificações Transacionais com Resend
* **Arquivo Responsável:** `lib/services/email/resend.ts`
* Disparo de e-mails formatados para:
  * Confirmação de novo lead/briefing.
  * Confirmação de reunião com link do Meet.
  * Notificação de versão entregue para revisão.
  * Alerta de 3 dias úteis de espera.

### 6.3 Armazenamento de Arquivos com Supabase Storage
* **Arquivo Responsável:** `lib/services/storage/supabase.ts`
* Bucket seguro `project-materials` para upload de assets, briefings em PDF, imagens de referência e logos com URLs assinadas ou públicas.

---

## 7. Contrato de Dados & Especificação de APIs

### 7.1 Principais Endpoints

| Método | Rota | Finalidade |
| :--- | :--- | :--- |
| `GET` | `/api/calendar/availability?date=YYYY-MM-DD` | Retorna lista de horários livres para agendamento |
| `POST` | `/api/calendar/book` | Agenda reunião e dispara evento no Google Calendar |
| `POST` | `/api/prospects` | Registra novo lead vindo do fluxo inicial |
| `POST` | `/api/prospects/[id]/briefing` | Salva as respostas do briefing modular |
| `GET` | `/api/portal/projects` | Lista projetos do cliente autenticado |
| `GET` | `/api/portal/projects/[id]` | Retorna detalhes, status, materiais e revisões do projeto |
| `POST` | `/api/portal/projects/[id]/revisions` | Submete nova rodada de revisão |
| `POST` | `/api/portal/projects/[id]/materials` | Faz upload ou anexa materiais do cliente |
| `GET` | `/api/admin/overview` | Métricas gerais do estúdio (leads ativos, projetos em andamento) |
| `POST` | `/api/admin/activate-client` | Transforma um prospect em cliente oficial do estúdio |
| `POST` | `/api/cron/project-status` | Cron diário que avalia prazos e aplica regras de 3 e 6 dias |

---

## 8. Segurança, Governança & LGPD

### 8.1 Cabeçalhos de Segurança HTTP (Hardening Vercel)
Configurados nativamente no `next.config.ts`:
* `Strict-Transport-Security` (HSTS)
* `X-Content-Type-Options: nosniff`
* `X-Frame-Options: SAMEORIGIN`
* `X-XSS-Protection: 1; mode=block`
* `Referrer-Policy: strict-origin-when-cross-origin`
* `Permissions-Policy`

### 8.2 Conformidade com LGPD
* **Coleta Mínima:** Apenas Nome, E-mail e WhatsApp estritamente necessários para o atendimento.
* **Consentimento Registrado:** Todo formulário exige aceite explícito registrado com timestamp (`consented_at`).
* **Direito ao Esquecimento:** Rota administrativa e política de privacidade transparente em `/privacidade`.

---

## 9. Guia de Operação, Testes & Manutenção

### 9.1 Executando o Projeto Localmente

```bash
# 1. Entre na pasta do projeto
cd ibd-portal-autoatendimento

# 2. Instale as dependências
npm install

# 3. Configure as variáveis em .env.local
cp .env.example .env.local

# 4. Inicie o servidor de desenvolvimento
npm run dev

# 5. Execute a bateria de testes automatizados
npm test
```

### 9.2 Variáveis de Ambiente Essenciais (`.env.local`)

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google Calendar (Opcional - caso ausente, roda em modo Mock inteligente)
GOOGLE_CLIENT_ID=seu_client_id
GOOGLE_CLIENT_SECRET=seu_client_secret
GOOGLE_REFRESH_TOKEN=seu_refresh_token
GOOGLE_CALENDAR_ID=primary

# Banco de Dados (Supabase ou Neon)
DATABASE_URL=postgresql://user:password@host/db
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key

# E-mails (Resend)
RESEND_API_KEY=re_123456789
```

---
*Documentação mantida sob padrão de excelência técnica para o estúdio **IBD — Ícaro Braga Designer**.*

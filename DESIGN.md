# IBD Design System 2026 — DESIGN.md

Documento de referência visual e diretrizes estéticas para o estúdio **IBD — Ícaro Braga Designer**.

---

## 1. Princípios Estéticos

- **Dark Mode Premium**: Fundo absoluto profundo (`#050505`) com superfícies em camadas (`#111111`, `#161616`, `#1c1c1c`).
- **Alto Contraste Editorial**: Tipografia refinada com hierarquia marcante, sem poluição de cores genéricas.
- **Destaque Amarelo IBD (`#ffd400`)**: Usado com extrema intencionalidade para foco, próxima ação, badges prioritárias e protocolo.
- **Clareza Informacional**: Toda tela responde imediatamente:
  1. *Onde estou?*
  2. *Qual é o status?*
  3. *Quem precisa agir agora?*
  4. *Qual é a próxima ação?*
  5. *Existe algum prazo?*

---

## 2. Tokens de Cor (CSS Variables)

| Token | Hex / Valor | Descrição |
| :--- | :--- | :--- |
| `--background` | `#050505` | Fundo principal da aplicação |
| `--surface` | `#111111` | Superfície base para cards e containers |
| `--surface-elevated` | `#161616` | Superfície elevada para modais e inputs |
| `--surface-strong` | `#1c1c1c` | Superfície de destaque e cabeçalhos de tabela |
| `--border` | `rgba(255, 255, 255, 0.08)` | Bordas sutis de baixo contraste |
| `--border-hover` | `rgba(255, 255, 255, 0.18)` | Bordas em estado hover ou foco |
| `--accent` | `#ffd400` | Amarelo ouro de alta visibilidade IBD |
| `--accent-hover` | `#ffdf33` | Hover do amarelo de destaque |
| `--text-primary` | `#ffffff` | Texto principal e títulos |
| `--text-secondary` | `#d4d4d4` | Texto de leitura e subtítulos |
| `--text-muted` | `#8a8a8a` | Labels, timestamps e metadados |
| `--success` | `#10b981` | Conclusões e aprovações |
| `--warning` | `#f59e0b` | Ações pendentes do cliente / Atenção |
| `--danger` | `#ef4444` | Prazos críticos, pausas e erros |

---

## 3. Tipografia

- **Display & Headings**: Inter / Outfit / Sans-serif moderno com tracking negativo (`tracking-tight`), peso bold/extrabold.
- **Mono / Códigos / Metadados**: Font-mono para protocolos (`PRJ-XXXX`, `CLI-XXXX`), datas e contadores de revisão.
- **Eyebrow / Subtítulos**: Font-mono, uppercase, `text-xs`, tracking alargado (`tracking-wider`), cor `--accent`.

---

## 4. Componentes Primitivos (`components/ui/*`)

1. `Button`: Variantes `primary` (amarelo), `secondary` (dark surface com borda), `ghost`, `danger`.
2. `Card`: Suporte a `hoverable`, `header`, `title`, `description`, `content` e `footer`.
3. `NextActionCard`: O componente mais importante da aplicação. Destaque para `owner: "client" | "ibd" | "none"` com botão de ação rápida.
4. `StatusBadge`: Cores semânticas automáticas para cada um dos 10 estados de projeto e 10 estágios de lead.
5. `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`: Form controls acessíveis com estados de erro e helper text.
6. `ConfirmationDialog`: Diálogo modal acessível com suporte a estado de loading assíncrono.
7. `Progress`: Barra de progresso com animação suave para o briefing progressivo.
8. `Alert`, `LoadingState`, `ErrorState`, `EmptyState`: Estados de feedback claros e consistentes.

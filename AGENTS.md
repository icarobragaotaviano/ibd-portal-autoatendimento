# IBD Client Portal 2026 — AGENTS.md

Instruções para agentes de inteligência artificial e engenheiros que operarem neste repositório.

---

## Regras Absolutas

1. **Nunca quebre o modo Mock**:
   - Todo serviço crítico (`DatabaseService`, `StorageService`, `EmailService`, `CalendarService`) possui uma implementação mock e uma implementação real.
   - O modo mock permite executar a suíte de testes e o desenvolvimento local com zero dependências externas.
2. **O cliente nunca cria o próprio portal**:
   - Visitantes são cadastrados na tabela `prospects`.
   - A conversão de um prospect em cliente ativo (`clients`) é uma ação administrativa explícita (**ATIVAR CLIENTE**) e exige contrato com status `signed`.
3. **Cálculo Centralizado de Próxima Ação**:
   - Nunca calcule ações no cliente ou de forma ad-hoc.
   - Sempre utilize `getProjectNextAction(project)` de `@/lib/domain/next-action`.
4. **Regras de Prazos e Materiais**:
   - Prazos só podem ser confirmados (`canConfirmDeadline`) após briefing aprovado e todos os materiais obrigatórios recebidos.
   - Limite de revisão é estritamente de 2 rodadas dentro do briefing acordado.
5. **Dias Úteis e Fuso Horário**:
   - Todos os cálculos de retorno (Regra Dia 3 e Regra Dia 6) utilizam o timezone `America/Fortaleza` via `lib/domain/business-days.ts`.
6. **Autenticação e RLS**:
   - A resolução de clientes é feita server-side (`getCurrentClient()`), associando `auth.uid()` à coluna `clients.auth_user_id`.
   - Nunca aceite `client_id` enviado sem validação da sessão do usuário.

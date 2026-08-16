# Produto e regras de negócio

## 1. Visão

O portal não é apenas um calendário. É um **autoatendimento orientado**: o cliente entende o próximo passo, envia uma solicitação com contexto suficiente e consulta as regras do processo sem depender de troca manual de mensagens.

## 2. Jornadas obrigatórias — derivadas do briefing

### A. Conversa inicial / diagnóstico
- Cliente escolhe serviço.
- Visualiza horários livres do Google Calendar, sem ver detalhes de eventos pessoais.
- Informa nome, e-mail, WhatsApp e uma breve necessidade.
- Evento é criado no calendário.
- Cliente recebe convite do Calendar.
- Quando habilitado, o evento recebe Google Meet.

### B. Projeto / demanda de design
- Cliente descreve serviço, objetivo, prazo desejado e materiais.
- O sistema apresenta orientação em cada etapa.
- O prazo desejado é apenas referência até briefing aprovado + material recebido.
- A solicitação gera protocolo para acompanhamento.

## 3. Regras obrigatórias — derivadas do briefing

- Atendimento: segunda a sexta, 09:00–18:00.
- Conversa: 50 minutos.
- Respiro: 10 minutos.
- Antecedência mínima: 24 horas.
- Todo projeto começa com briefing.
- Máximo de 3 perguntas por rodada/tela de briefing.
- Briefing aprovado trava o escopo.
- Prazo de produção só começa após briefing aprovado e materiais recebidos.
- Antes disso, toda data é estimativa.
- 2 rodadas de revisão inclusas.
- Mudança de direção criativa ou item novo é novo escopo.
- 3 dias úteis sem retorno: mensagem de status.
- 6 dias úteis sem retorno: pausa.
- Retomada: novo prazo conforme agenda disponível.

## 4. Tom obrigatório — derivado do briefing

**Usar:** direto, humano, ativo, claro, confiante e profissional.

**Evitar:** “desculpe incomodar”, “assim que possível”, “qualquer hora”, justificativas longas, linguagem passiva, muitas perguntas na mesma tela e excesso de emoji.

## 5. Decisões adicionadas de engenharia

Estas decisões não estavam especificadas no briefing; foram incluídas para tornar o projeto executável:

- `APP_TIMEZONE=America/Fortaleza` como padrão configurável.
- Horizonte padrão de 60 dias para novas reservas (`BOOKING_HORIZON_DAYS`).
- Dois providers de Calendar: `mock` e `google`.
- Dois providers de dados: `mock` e `neon`.
- Zod para validação de payloads.
- Luxon para cálculos de timezone.
- Consulta de status protegida por **protocolo + e-mail**.
- Endpoint `/api/health` para diagnóstico de implantação.
- Google Meet configurável.

## 6. Fora do escopo atual

- Pagamento antecipado.
- WhatsApp API automatizado.
- Upload/armazenamento de arquivos de materiais.
- Autenticação completa de clientes.
- Painel administrativo completo.
- Automação de mensagens de 3/6 dias por cron.

A arquitetura foi preparada para essas evoluções sem exigir reescrita do núcleo.

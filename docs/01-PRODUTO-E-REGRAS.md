# Produto e regras de negócio

## 1. Visão

O IBD Portal é um **autoatendimento orientado e assíncrono**. O cliente entende o próximo passo, envia contexto suficiente por um briefing guiado e acompanha projeto, materiais, revisões e aprovações sem depender de reuniões para iniciar o trabalho.

## 2. Jornada oficial de aquisição

```text
Visitante
  → Site Público
  → /comecar
  → Prospect + aceite LGPD
  → Manual do Cliente
  → Briefing Guiado
  → Proposta Comercial
  → Contrato Formalizado
  → Ativação do Cliente
  → Portal Privado
```

O canal público oficial para novos clientes é `/comecar`.

## 3. Regras obrigatórias

- Todo projeto começa com briefing.
- O briefing guiado apresenta no máximo 3 perguntas por rodada/tela.
- Briefing aprovado define o escopo de referência.
- Prazo de produção só vira compromisso após briefing aprovado e materiais necessários recebidos.
- Antes disso, qualquer data informada é data desejada ou estimativa.
- Todo projeto inclui 2 rodadas de revisão dentro do escopo contratado.
- Mudança de direção criativa ou item novo é novo escopo.
- 3 dias úteis sem retorno: mensagem de acompanhamento.
- 6 dias úteis sem retorno: projeto pausado.
- Na retomada, uma nova data é calculada conforme a disponibilidade operacional do estúdio.
- Registros importantes de briefing, materiais, status, revisões e aprovações devem permanecer estruturados no portal.

## 4. Comunicação assíncrona

A ausência de agendamento não significa ausência de contato. O sistema deve reduzir mensagens soltas e concentrar decisões no contexto correto:

- solicitação inicial e briefing;
- proposta e contrato;
- envio de materiais;
- próximas ações;
- revisão estruturada;
- aprovação final;
- e-mails transacionais quando houver mudança relevante.

## 5. Tom obrigatório

**Usar:** direto, humano, ativo, claro, confiante e profissional.

**Evitar:** promessas vagas, justificativas longas, linguagem passiva, excesso de perguntas na mesma tela e excesso de emoji.

## 6. Decisões de engenharia

- `APP_TIMEZONE=America/Fortaleza` permanece como padrão das regras operacionais e cálculos de dias úteis.
- Supabase concentra banco, autenticação e storage.
- Resend envia e-mails transacionais.
- Vercel hospeda a aplicação e executa rotinas cron.
- Zod valida payloads.
- A arquitetura não possui Calendar Provider nem Booking Provider.
- Não são necessárias credenciais Google Cloud ou Google Calendar.

## 7. Fora do escopo atual

- Agendamento público de reuniões.
- Integração com Google Calendar/Google Meet.
- Pagamento antecipado automático.
- WhatsApp API automatizado.

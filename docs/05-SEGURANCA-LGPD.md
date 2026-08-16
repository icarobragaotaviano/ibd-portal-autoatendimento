# Segurança e LGPD — mínimo operacional

## Dados coletados

### Agendamento
- nome;
- e-mail;
- WhatsApp;
- necessidade resumida;
- serviço;
- data/horário;
- consentimento.

### Solicitação
- nome;
- e-mail;
- WhatsApp;
- descrição da demanda;
- prazo desejado;
- informações sobre materiais/conteúdo/urgência;
- consentimento.

## Princípios aplicados

- Minimização: não solicitar documento, endereço ou dado sensível sem necessidade.
- Finalidade explícita: consentimento informa uso para agendamento/gestão da solicitação.
- Segredos apenas no servidor.
- Status exige protocolo + e-mail.
- A API não devolve detalhes de eventos ocupados do Google; apenas slots livres.

## Antes de produção

- Definir política de privacidade pública.
- Definir prazo de retenção de solicitações concluídas.
- Definir canal para acesso/correção/exclusão de dados.
- Configurar logs sem conteúdo pessoal desnecessário.
- Verificar DPA/termos dos fornecedores usados (Vercel, Google, Neon).
- Se o portal vier a processar dados de saúde, revisar base legal, minimização e controles adicionais antes de coletá-los.

## Observação

Este documento é orientação técnica de implementação e não substitui revisão jurídica da operação.

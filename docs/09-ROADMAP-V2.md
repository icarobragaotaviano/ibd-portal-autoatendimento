# Roadmap V2

Itens que apareceram como evolução futura no briefing ou que são consequências naturais do MVP.

## V2 — briefing original

- Pagamento antecipado para reduzir no-show.
- Lembretes automáticos via WhatsApp/API.
- Formulário de anamnese/briefing prévio integrado quando fizer sentido ao serviço.

## V2 — engenharia recomendada

### 1. Painel administrativo
- autenticação segura do responsável;
- lista de solicitações;
- alteração de status;
- confirmação de prazo;
- contador de revisões;
- registro de histórico de mudanças.

### 2. Automação dos 3/6 dias úteis
- cron diário;
- cálculo de dias úteis;
- mensagem de status no 3º dia útil;
- pausa automática no 6º dia útil;
- canal de envio definido (e-mail ou WhatsApp);
- trilha de auditoria.

### 3. Upload de materiais
- storage privado;
- links temporários/assinados;
- limites de tipo e tamanho;
- antivírus/validação;
- política de retenção.

### 4. Pagamentos
- criar checkout somente para serviços em que preço e política estejam definidos;
- webhook idempotente;
- confirmar pagamento antes de liberar determinado fluxo, se essa for a regra de produto.

### 5. Observabilidade
- erros estruturados sem PII desnecessária;
- métricas de conversão por etapa;
- taxa de horários consultados → agendados;
- taxa de solicitações incompletas;
- alertas de integração Google/DB.

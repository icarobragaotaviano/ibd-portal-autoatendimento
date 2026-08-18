# Roadmap V2

Evoluções futuras do IBD Portal após consolidação da jornada assíncrona.

## 1. Painel administrativo
- visão executiva de prospects, clientes e projetos;
- filtros por etapa e próxima ação;
- alteração segura de status;
- confirmação de prazo;
- contador de revisões;
- histórico auditável de mudanças.

## 2. Automação dos 3/6 dias úteis
- cron diário;
- cálculo de dias úteis em `America/Fortaleza`;
- mensagem de acompanhamento no 3º dia útil;
- pausa automática no 6º dia útil;
- trilha de auditoria;
- retomada com nova estimativa conforme disponibilidade operacional.

## 3. Upload e gestão de materiais
- Supabase Storage privado;
- links temporários/assinados;
- limites de tipo e tamanho;
- validação de arquivos;
- política de retenção;
- histórico de versões quando necessário.

## 4. Pagamentos
- checkout somente para serviços com preço e política definidos;
- webhook idempotente;
- associação segura ao prospect/projeto;
- confirmação de pagamento antes de liberar etapas quando essa for a regra de produto.

## 5. Comunicação assíncrona avançada
- central de notificações no portal;
- templates de e-mail por próxima ação;
- lembretes de materiais e revisões;
- preferências de comunicação do cliente;
- futura integração oficial de WhatsApp somente se houver necessidade operacional e base legal adequadas.

## 6. Observabilidade e produto
- erros estruturados sem PII desnecessária;
- métricas de conversão por etapa do funil;
- taxa de conclusão do briefing;
- tempo médio entre briefing e proposta;
- taxa de prospects ativados como clientes;
- projetos aguardando materiais ou retorno;
- uso de rodadas de revisão;
- alertas de Supabase, Resend e Cron.

## Fora do roadmap por decisão atual

Agendamento público e integração com Google Calendar/Google Meet não fazem parte da arquitetura atual. Uma eventual reintrodução exigiria nova decisão explícita de produto e não deve ser tratada como dependência prevista.

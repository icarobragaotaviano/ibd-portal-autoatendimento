# Checklist de finalização

## Produto
- [ ] Revisar nome oficial do estúdio e domínio.
- [ ] Revisar lista real de serviços.
- [ ] Confirmar horários de atendimento.
- [ ] Confirmar textos dos guias.
- [ ] Adicionar política de privacidade e termos.

## Google Calendar
- [ ] Projeto Google Cloud criado.
- [ ] Calendar API ativada.
- [ ] OAuth consent configurado.
- [ ] Refresh token gerado.
- [ ] `CALENDAR_MODE=google` testado.
- [ ] Convite chega ao cliente.
- [ ] Meet é criado quando habilitado.
- [ ] Eventos privados nunca têm detalhes expostos na UI.

## Persistência
- [ ] Neon criado.
- [ ] `database/schema.sql` executado.
- [ ] `DATA_MODE=neon` configurado.
- [ ] Solicitação persiste após novo deploy/cold start.
- [ ] Consulta por protocolo + e-mail funciona.

## Qualidade
- [ ] `npm test` passa.
- [ ] `npm run lint` passa.
- [ ] `npm run build` passa.
- [ ] Mobile 360 px testado.
- [ ] Desktop testado.
- [ ] Navegação por teclado testada.
- [ ] Mensagens de erro revisadas.

## Produção
- [ ] Preview usa mock para evitar reuniões acidentais.
- [ ] Production usa Google + Neon.
- [ ] Domínio configurado.
- [ ] Analytics somente após revisar consentimento/privacidade.
- [ ] Backup/retention do banco definido.

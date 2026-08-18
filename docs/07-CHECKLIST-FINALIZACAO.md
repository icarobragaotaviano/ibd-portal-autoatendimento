# Checklist de finalização

## Produto
- [ ] Revisar nome oficial do estúdio e domínio.
- [ ] Revisar lista real de serviços.
- [ ] Confirmar textos dos guias.
- [ ] Adicionar/revisar política de privacidade e termos.
- [ ] Confirmar que `/comecar` é o único canal público de entrada de novos projetos.
- [ ] Confirmar que não existem links, CTAs ou mensagens oferecendo agendamento público.

## Jornada assíncrona
- [ ] `/comecar` cria prospect com consentimento LGPD.
- [ ] Manual do Cliente é apresentado no onboarding.
- [ ] Briefing guiado funciona com até 3 perguntas por etapa.
- [ ] Proposta e contrato ficam vinculados ao prospect.
- [ ] Ativação administrativa só ocorre após contrato formalizado.
- [ ] Portal mostra próxima ação, materiais, revisões e aprovações.
- [ ] Confirmação pós-envio não contém Google Meet, evento ou referência de agenda.

## Supabase
- [ ] Projeto Supabase criado.
- [ ] Migrações executadas.
- [ ] RLS revisada e testada.
- [ ] Auth configurado para admin e clientes.
- [ ] Storage privado configurado.
- [ ] URLs assinadas testadas.
- [ ] Persistência sobrevive a novo deploy/cold start.

## Resend
- [ ] Domínio/remetente verificado.
- [ ] `RESEND_API_KEY` configurada somente no servidor.
- [ ] E-mails transacionais essenciais chegam corretamente.
- [ ] Conteúdo dos e-mails não expõe PII além do necessário.

## Automação
- [ ] `CRON_SECRET` configurado.
- [ ] Regra de 3 dias úteis testada.
- [ ] Regra de 6 dias úteis testada.
- [ ] Retomada recalcula prazo conforme disponibilidade operacional.
- [ ] `APP_TIMEZONE=America/Fortaleza` validado.

## Qualidade
- [ ] `npm test` passa.
- [ ] `npm run lint` passa.
- [ ] `npm run build` passa.
- [ ] Mobile 360 px testado.
- [ ] Desktop testado.
- [ ] Navegação por teclado testada.
- [ ] Mensagens de erro revisadas.
- [ ] Busca global confirma ausência de `/agendar`, `googleapis`, `BookingSchema`, `CALENDAR_*`, `GOOGLE_*` e `BOOKING_*` no código vigente.

## Produção
- [ ] Supabase configurado para produção.
- [ ] Resend configurado para produção.
- [ ] Vercel configurada com variáveis corretas.
- [ ] Domínio configurado.
- [ ] Analytics somente após revisar consentimento/privacidade.
- [ ] Backup e política de retenção definidos.

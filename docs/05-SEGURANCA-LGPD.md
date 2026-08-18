# Segurança e LGPD — mínimo operacional

## Dados coletados

### Solicitação / Prospect
- nome;
- e-mail;
- WhatsApp;
- serviço de interesse;
- descrição da necessidade;
- prazo desejado, quando informado;
- consentimento.

### Briefing e Projeto
- respostas de briefing;
- materiais enviados;
- registros de revisão e aprovação;
- histórico de status e próximas ações.

## Princípios aplicados

- Minimização: coletar somente dados necessários ao atendimento e execução do projeto.
- Finalidade explícita: consentimento informa uso para análise da solicitação, proposta, contratação e gestão do projeto.
- Segredos apenas no servidor.
- Supabase RLS e autenticação protegem dados do portal.
- Storage privado e URLs assinadas para materiais quando aplicável.
- Logs evitam conteúdo pessoal desnecessário.
- Não existe integração com Google Calendar nem coleta de dados para agendamento.

## Antes de produção

- Definir política de privacidade pública.
- Definir prazo de retenção de prospects, projetos e arquivos concluídos.
- Definir canal para acesso, correção e exclusão de dados.
- Revisar RLS de todas as tabelas privadas.
- Revisar permissões dos buckets do Supabase Storage.
- Verificar DPA/termos dos fornecedores usados: Vercel, Supabase e Resend.
- Garantir que e-mails transacionais não exponham informações sensíveis além do necessário.

## Observação

Este documento é orientação técnica de implementação e não substitui revisão jurídica da operação.

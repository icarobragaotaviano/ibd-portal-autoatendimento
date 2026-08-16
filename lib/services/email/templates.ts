/**
 * Templates HTML de e-mails transacionais para o Portal IBD 2026.
 * Todos os templates usam design de alto contraste dark com detalhes em amarelo (#ffd400).
 */

function baseLayout(title: string, contentHtml: string): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #050505;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #111111;
          border: 1px solid #1c1c1c;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .header {
          padding: 30px;
          border-b: 1px solid #1c1c1c;
          text-align: center;
          background-color: #050505;
        }
        .logo {
          display: inline-block;
          width: 50px;
          height: 50px;
          line-height: 50px;
          border-radius: 50%;
          background-color: #ffd400;
          color: #050505;
          font-weight: 900;
          font-size: 18px;
          text-decoration: none;
        }
        .content {
          padding: 40px 30px;
          line-height: 1.6;
        }
        h1 {
          font-size: 28px;
          margin-top: 0;
          color: #ffffff;
        }
        p {
          color: #d4d4d4;
          font-size: 16px;
        }
        .highlight-box {
          background-color: #1c1c1c;
          border: 1px solid #333333;
          border-radius: 12px;
          padding: 20px;
          margin: 25px 0;
        }
        .protocol-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8a8a8a;
          font-weight: bold;
        }
        .protocol-value {
          font-family: monospace;
          font-size: 24px;
          color: #ffd400;
          font-weight: bold;
          margin-top: 5px;
        }
        .btn {
          display: inline-block;
          background-color: #ffd400;
          color: #050505 !important;
          padding: 14px 28px;
          border-radius: 999px;
          font-weight: bold;
          text-decoration: none;
          margin-top: 20px;
          font-size: 15px;
        }
        .footer {
          padding: 30px;
          text-align: center;
          font-size: 13px;
          color: #8a8a8a;
          border-t: 1px solid #1c1c1c;
          background-color: #050505;
        }
        a {
          color: #ffd400;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">IBD</div>
        </div>
        <div class="content">
          ${contentHtml}
        </div>
        <div class="footer">
          IBD — Portal do Cliente · Processo claro. Próximo passo visível.<br>
          <span style="font-size: 11px; margin-top: 10px; display: block;">Esta é uma mensagem automática de acompanhamento.</span>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function getRequestReceivedEmailHTML(clientName: string, protocol: string, serviceLabel: string): string {
  const content = `
    <h1>Solicitação recebida com sucesso.</h1>
    <p>Olá, <strong>${clientName}</strong>,</p>
    <p>Sua nova solicitação de <strong>${serviceLabel}</strong> foi registrada no estúdio e já está na fila de triagem.</p>
    
    <div class="highlight-box">
      <div class="protocol-label">Código de Acompanhamento</div>
      <div class="protocol-value">${protocol}</div>
    </div>

    <p><strong>Próximo passo:</strong> O estúdio revisará as informações fornecidas para validar o escopo. Caso falte algum material ou referência, entraremos em contato.</p>
    <p>Você pode usar seu protocolo a qualquer momento no portal para acompanhar as atualizações de status.</p>
    
    <a href="https://ibd-portal.vercel.app/status" class="btn" target="_blank">Acompanhar Projeto</a>
  `;
  return baseLayout("Solicitação Recebida — IBD", content);
}

export function getAppointmentConfirmedEmailHTML(
  clientName: string,
  dateLabel: string,
  timeLabel: string,
  meetLink?: string
): string {
  const meetHtml = meetLink
    ? `<p><strong>Link de videoconferência:</strong> <a href="${meetLink}">${meetLink}</a></p>`
    : "";

  const content = `
    <h1>Conversa confirmada na agenda.</h1>
    <p>Olá, <strong>${clientName}</strong>,</p>
    <p>Seu encontro inicial com o estúdio foi agendado com sucesso.</p>
    
    <div class="highlight-box">
      <p style="margin: 0; color: #ffffff;"><strong>Data:</strong> ${dateLabel}</p>
      <p style="margin: 5px 0 0 0; color: #ffffff;"><strong>Horário:</strong> ${timeLabel} (Duração: 50 minutos)</p>
    </div>

    ${meetHtml}
    
    <p><strong>Importante:</strong> Esta conversa inicial serve para alinharmos sua necessidade e escopo de trabalho. O prazo de entrega só é validado após a aprovação formal do briefing e entrega de todos os materiais do projeto.</p>
  `;
  return baseLayout("Conversa Agendada — IBD", content);
}

export function getDeadlineConfirmedEmailHTML(clientName: string, protocol: string, dueDate: string): string {
  const content = `
    <h1>Prazo final de entrega confirmado.</h1>
    <p>Olá, <strong>${clientName}</strong>,</p>
    <p>Após alinhamento de escopo e aprovação dos materiais, o prazo final de entrega do seu projeto foi definido.</p>
    
    <div class="highlight-box">
      <div class="protocol-label">Prazo de Entrega Confirmado</div>
      <div class="protocol-value" style="font-size: 20px; font-family: inherit;">${dueDate}</div>
    </div>

    <p>Toda a produção já está em andamento. Faremos contato assim que uma versão de visualização estiver disponível.</p>
    
    <a href="https://ibd-portal.vercel.app/status" class="btn" target="_blank">Ver Status no Portal</a>
  `;
  return baseLayout("Prazo Confirmado — IBD", content);
}

export function getProjectPausedEmailHTML(clientName: string, protocol: string, reason: string): string {
  const content = `
    <h1>Projeto pausado temporariamente.</h1>
    <p>Olá, <strong>${clientName}</strong>,</p>
    <p>Identificamos que seu projeto está pendente de retorno ou aprovação por parte de sua equipe e, para manter a agenda do estúdio previsível, alteramos o status para pausado.</p>
    
    <div class="highlight-box">
      <p style="margin: 0; color: #ffd400;"><strong>Motivo:</strong> ${reason}</p>
    </div>

    <p><strong>Como retomar:</strong> Assim que enviar as respostas ou materiais pendentes, o projeto será reinserido na fila de produção, e uma nova estimativa de prazo final será gerada.</p>
    
    <a href="https://ibd-portal.vercel.app/status" class="btn" target="_blank">Acessar Portal</a>
  `;
  return baseLayout("Projeto Pausado — IBD", content);
}

export function getProjectCompletedEmailHTML(clientName: string, protocol: string): string {
  const content = `
    <h1>Projeto concluído! 🎉</h1>
    <p>Olá, <strong>${clientName}</strong>,</p>
    <p>Temos o prazer de informar que a produção do seu projeto foi finalizada com sucesso!</p>
    
    <div class="highlight-box" style="text-align: center;">
      <p style="margin: 0; font-size: 18px; color: #ffffff;">Seu projeto sob protocolo <strong>${protocol}</strong> está pronto para entrega final.</p>
    </div>

    <p>Agradecemos a parceria durante todo o processo. Todos os arquivos de entrega final estão prontos para envio.</p>
    
    <a href="https://ibd-portal.vercel.app/status" class="btn" target="_blank">Visualizar Conclusão</a>
  `;
  return baseLayout("Projeto Concluído — IBD", content);
}

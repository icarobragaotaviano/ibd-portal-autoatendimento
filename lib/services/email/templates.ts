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
          border-bottom: 1px solid #1c1c1c;
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
          font-size: 26px;
          margin-top: 0;
          color: #ffffff;
        }
        p {
          color: #d4d4d4;
          font-size: 15px;
        }
        .highlight-box {
          background-color: #1c1c1c;
          border: 1px solid #333333;
          border-radius: 12px;
          padding: 20px;
          margin: 25px 0;
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
          border-top: 1px solid #1c1c1c;
          background-color: #050505;
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
          IBD — Ícaro Braga Designer · Processo claro. Próximo passo visível.<br>
          <span style="font-size: 11px; margin-top: 10px; display: block;">Mensagem automática gerada pelo sistema do estúdio.</span>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function clientInviteTemplate(params: { clientName: string; loginUrl: string }): string {
  const content = `
    <h1>Seu acesso ao Portal IBD foi ativado.</h1>
    <p>Olá, <strong>${params.clientName}</strong>,</p>
    <p>Seu cadastro como cliente do estúdio IBD está confirmado e seu portal já está habilitado.</p>
    <p>No portal você poderá acompanhar status de projetos, enviar materiais, solicitar revisões e visualizar prazos acordados.</p>
    <a href="${params.loginUrl}" class="btn" target="_blank">Acessar Meu Portal</a>
  `;
  return baseLayout("Acesso Ativado — IBD", content);
}

export function proposalSentTemplate(params: { clientName: string; proposalTitle: string; proposalUrl: string }): string {
  const content = `
    <h1>Nova Proposta Comercial Disponibilizada</h1>
    <p>Olá, <strong>${params.clientName}</strong>,</p>
    <p>Preparamos a proposta comercial para o seu projeto: <strong>${params.proposalTitle}</strong>.</p>
    <p>Acesse o link abaixo para visualizar os detalhes do escopo, valores e condições acordadas.</p>
    <a href="${params.proposalUrl}" class="btn" target="_blank">Visualizar Proposta</a>
  `;
  return baseLayout("Proposta Comercial — IBD", content);
}

export function followUpDay3Template(params: { clientName: string; projectTitle: string; projectUrl: string }): string {
  const content = `
    <h1>Versão aguardando seu retorno</h1>
    <p>Olá, <strong>${params.clientName}</strong>,</p>
    <p>Enviamos recentemente uma versão para o projeto <strong>${params.projectTitle}</strong> e estamos aguardando suas considerações há 3 dias úteis.</p>
    <p>Para mantermos o cronograma previsto sem atrasos ou pausas automáticas, envie seus apontamentos ou aprovação no portal.</p>
    <a href="${params.projectUrl}" class="btn" target="_blank">Acessar e Responder</a>
  `;
  return baseLayout("Aguardando Retorno — IBD", content);
}

export function projectPausedTemplate(params: { clientName: string; projectTitle: string; projectUrl: string }): string {
  const content = `
    <h1>Projeto pausado temporariamente</h1>
    <p>Olá, <strong>${params.clientName}</strong>,</p>
    <p>O projeto <strong>${params.projectTitle}</strong> atingiu 6 dias úteis sem retorno após a entrega da última versão e foi automaticamente pausado para reorganização de agenda.</p>
    <p>Assim que estiver pronto, basta acessar o portal e solicitar a retomada. Um novo prazo estimado será definido com base na agenda vigente.</p>
    <a href="${params.projectUrl}" class="btn" target="_blank">Retomar Projeto</a>
  `;
  return baseLayout("Projeto Pausado — IBD", content);
}

export function getRequestReceivedEmailHTML(clientName: string, protocol: string, serviceLabel: string): string {
  const content = `
    <h1>Solicitação recebida com sucesso.</h1>
    <p>Olá, <strong>${clientName}</strong>,</p>
    <p>Sua nova solicitação de <strong>${serviceLabel}</strong> foi registrada no estúdio sob protocolo <strong>${protocol}</strong>.</p>
  `;
  return baseLayout("Solicitação Recebida — IBD", content);
}

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacidade e Termos" };

export default function PrivacyPage() {
  return (
    <section className="section text-white">
      <div className="container-shell max-w-3xl">
        <div className="eyebrow">Políticas da Operação</div>
        <h1 className="display text-5xl md:text-7xl mt-4">Privacidade e Termos</h1>
        <div className="card p-6 md:p-9 prose-guide mt-8">
          <div className="callout">
            <strong>Compromisso IBD:</strong> Nós coletamos e processamos seus dados estritamente para viabilizar o agendamento de reuniões e organizar as demandas de design enviadas ao estúdio, em total respeito à Lei Geral de Proteção de Dados (LGPD).
          </div>

          <h2>1. Finalidade do Tratamento de Dados</h2>
          <p>
            Ao preencher os formulários de agendamento de conversa ou envio de novas solicitações de projeto, coletamos seus dados para as seguintes finalidades exclusivas:
          </p>
          <ul>
            <li>Criar e gerenciar compromissos em nossa agenda (Google Calendar) com links de reuniões online.</li>
            <li>Identificar o solicitante e associar as demandas enviadas ao seu respectivo e-mail para permitir o acompanhamento do status do projeto.</li>
            <li>Entrar em contato via e-mail ou WhatsApp para alinhar briefings, esclarecer dúvidas de escopo ou dar feedbacks de produção.</li>
          </ul>

          <h2>2. Quais Dados Coletamos</h2>
          <p>
            Coletamos apenas as informações estritamente necessárias para a prestação do serviço:
          </p>
          <ul>
            <li><strong>Nome Completo:</strong> Para identificação do cliente nos convites de reuniões e fichas de projeto.</li>
            <li><strong>E-mail:</strong> Usado para envio do convite do calendário e como chave de segurança para consulta de status da demanda.</li>
            <li><strong>WhatsApp (Telefone):</strong> Para contato rápido e alinhamento ágil.</li>
            <li><strong>Informações do Job:</strong> Descrições, prazos sugeridos e notas sobre materiais do projeto enviados voluntariamente por você.</li>
          </ul>

          <h2>3. Segurança e Retenção dos Dados</h2>
          <p>
            Seus dados são armazenados de forma segura e não são compartilhados com terceiros para fins comerciais. Quando a persistência em banco de dados real (Neon) está ativa, utilizamos conexões seguras SSL. Os tokens de autenticação da agenda Google Calendar ficam armazenados no servidor e nunca são expostos ao navegador.
          </p>
          <p>
            Mantemos os dados das solicitações ativos em nosso sistema durante o período de prestação do serviço e desenvolvimento do projeto. Após a conclusão, os dados de contato permanecem salvos em nosso histórico de clientes, podendo ser removidos mediante solicitação expressa.
          </p>

          <h2>4. Seus Direitos (LGPD)</h2>
          <p>
            Como titular dos dados, você pode solicitar a qualquer momento:
          </p>
          <ol>
            <li>A confirmação da existência de tratamento e o acesso aos seus dados salvos.</li>
            <li>A correção de dados incompletos, inexatos ou desatualizados.</li>
            <li>A eliminação dos dados pessoais tratados com o seu consentimento, exceto nos casos de guarda obrigatória por obrigações legais ou de prestação de serviços ativa.</li>
          </ol>
          <p>
            Para exercer seus direitos ou tirar dúvidas sobre nossa política, entre em contato diretamente através do e-mail do estúdio.
          </p>
        </div>
      </div>
    </section>
  );
}

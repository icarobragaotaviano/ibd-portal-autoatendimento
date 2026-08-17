/**
 * Cria um link direto para o WhatsApp com número e mensagem pré-preenchida.
 * Formato oficial: https://wa.me/{numero}?text={mensagem}
 * Respeita a regra de no máximo 1 emoji por mensagem e tom direto e profissional.
 */
export function createWhatsAppLink(phone: string, text: string): string {
  let cleanPhone = phone.replace(/\D/g, "");
  // Se não tiver DDI 55 e for número BR (10 ou 11 dígitos), adiciona 55
  if ((cleanPhone.length === 10 || cleanPhone.length === 11) && !cleanPhone.startsWith("55")) {
    cleanPhone = `55${cleanPhone}`;
  }
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export const whatsAppTemplates = {
  leadWelcome: (name: string) =>
    `Olá, ${name}. Recebi sua solicitação no Portal IBD e vou analisar as informações para direcionarmos o projeto.`,

  proposalSent: (name: string, proposalTitle: string) =>
    `Olá, ${name}. Sua proposta para ${proposalTitle} foi enviada e está disponível para análise.`,

  clientActivated: (name: string, loginUrl: string) =>
    `Olá, ${name}. Seu acesso ao Portal do Cliente IBD foi ativado. Você pode acessar seus projetos aqui: ${loginUrl}`,

  day3FollowUp: (name: string, projectTitle: string) =>
    `Olá, ${name}. Te enviei a versão de ${projectTitle} no dia combinado. Precisa de algum ajuste ou posso seguir?`,

  day6Paused: (name: string, projectTitle: string) =>
    `Olá, ${name}. Como não tive retorno em ${projectTitle}, o projeto ficou pausado. Quando você responder, retomo o projeto e confirmo uma nova data conforme a agenda disponível.`,
};

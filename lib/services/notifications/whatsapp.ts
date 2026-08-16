/**
 * Cria um link direto para o WhatsApp com número e mensagem pré-preenchida.
 */
export function createWhatsAppLink(phone: string, text: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

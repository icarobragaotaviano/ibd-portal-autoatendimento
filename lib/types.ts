export type RequestStatus =
  | "novo"
  | "briefing_em_andamento"
  | "briefing_aprovado"
  | "aguardando_material"
  | "em_producao"
  | "versao_enviada"
  | "aguardando_retorno"
  | "pausado"
  | "revisao_em_andamento"
  | "concluido";

export type Urgency = "normal" | "urgente";

export interface ClientRequestInput {
  service: string;
  description: string;
  desiredDate?: string;
  hasMaterial: boolean;
  materialNotes?: string;
  wantsContent: boolean;
  urgency: Urgency;
  clientName: string;
  clientEmail: string;
  clientWhatsapp: string;
  consent: true;
}

export interface ClientRequestRecord extends ClientRequestInput {
  id: string;
  status: RequestStatus;
  confirmedDueDate?: string | null;
  revisionsUsed: number;
  consentedAt: string;
  createdAt: string;
  updatedAt: string;
}

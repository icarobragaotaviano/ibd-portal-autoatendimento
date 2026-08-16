import type { ClientRequestRecord } from "@/lib/types";
import type { RequestRepository } from "@/lib/services/database/types";
import { createProtocol } from "@/lib/ids";

declare global {
  // eslint-disable-next-line no-var
  var __ibdMockRequests: Map<string, ClientRequestRecord> | undefined;
}

const store = globalThis.__ibdMockRequests ?? new Map<string, ClientRequestRecord>();
globalThis.__ibdMockRequests = store;

if (!store.has("IBD-DEMO01")) {
  const now = new Date().toISOString();
  store.set("IBD-DEMO01", {
    id: "IBD-DEMO01",
    service: "landing_page",
    description: "Landing page de demonstração para testar a área de acompanhamento.",
    desiredDate: undefined,
    hasMaterial: true,
    materialNotes: "Materiais principais já organizados.",
    wantsContent: false,
    urgency: "normal",
    clientName: "Cliente de demonstração",
    clientEmail: "cliente@exemplo.com",
    clientWhatsapp: "+55 85 99999-9999",
    consent: true,
    status: "briefing_em_andamento",
    confirmedDueDate: null,
    revisionsUsed: 0,
    consentedAt: now,
    createdAt: now,
    updatedAt: now,
  });
}

export const mockRequestRepository: RequestRepository = {
  async create(input) {
    const now = new Date().toISOString();
    const record: ClientRequestRecord = {
      ...input,
      id: createProtocol(),
      status: "novo",
      confirmedDueDate: null,
      revisionsUsed: 0,
      consentedAt: now,
      createdAt: now,
      updatedAt: now,
    };
    store.set(record.id, record);
    return record;
  },

  async findByProtocolAndEmail(id, email) {
    const record = store.get(id.toUpperCase());
    if (!record || record.clientEmail.toLowerCase() !== email.toLowerCase()) return null;
    return record;
  },

  async listAll() {
    return Array.from(store.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async update(id, updates) {
    const record = store.get(id.toUpperCase());
    if (!record) throw new Error("Solicitação não encontrada.");
    const updated: ClientRequestRecord = {
      ...record,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    store.set(id.toUpperCase(), updated);
    return updated;
  },
};

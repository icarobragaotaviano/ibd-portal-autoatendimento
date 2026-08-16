import type { RequestRepository } from "@/lib/services/database/types";

export const supabaseRequestRepository: RequestRepository = {
  async create() {
    throw new Error("Provedor Supabase não implementado. Por favor, utilize DATABASE_PROVIDER=mock ou neon.");
  },
  async findByProtocolAndEmail() {
    throw new Error("Provedor Supabase não implementado. Por favor, utilize DATABASE_PROVIDER=mock ou neon.");
  },
  async listAll() {
    throw new Error("Provedor Supabase não implementado. Por favor, utilize DATABASE_PROVIDER=mock ou neon.");
  },
  async update() {
    throw new Error("Provedor Supabase não implementado. Por favor, utilize DATABASE_PROVIDER=mock ou neon.");
  },
};

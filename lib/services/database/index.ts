import { dataMode } from "@/lib/config";
import { mockRequestRepository } from "@/lib/services/database/mock";
import { neonRequestRepository } from "@/lib/services/database/neon";
import { supabaseRequestRepository } from "@/lib/services/database/supabase";

export function getRequestRepository() {
  const provider = process.env.DATABASE_PROVIDER;
  if (provider === "supabase") return supabaseRequestRepository;
  if (provider === "neon" || dataMode() === "neon") return neonRequestRepository;
  return mockRequestRepository;
}

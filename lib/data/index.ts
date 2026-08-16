import { dataMode } from "@/lib/config";
import { mockRequestRepository } from "@/lib/data/mock";
import { neonRequestRepository } from "@/lib/data/neon";

export function getRequestRepository() {
  return dataMode() === "neon" ? neonRequestRepository : mockRequestRepository;
}

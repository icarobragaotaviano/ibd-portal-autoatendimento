import { StorageService } from "./types";
import { MockStorageService } from "./mock";
import { SupabaseStorageService } from "./supabase";

let instance: StorageService | null = null;

export function getStorageService(): StorageService {
  if (instance) return instance;

  const provider = process.env.STORAGE_PROVIDER?.toLowerCase();

  if (provider === "supabase") {
    instance = new SupabaseStorageService();
  } else {
    instance = new MockStorageService();
  }

  return instance;
}

export const storage = getStorageService();
export * from "./types";

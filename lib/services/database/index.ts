import { DatabaseService } from "./types";
import { MockDatabaseService } from "./mock";
import { SupabaseDatabaseService } from "./supabase";

let instance: DatabaseService | null = null;

export function getDatabaseService(): DatabaseService {
  if (instance) return instance;

  const provider = process.env.DATABASE_PROVIDER?.toLowerCase();

  if (provider === "supabase") {
    instance = new SupabaseDatabaseService();
  } else {
    instance = new MockDatabaseService();
  }

  return instance;
}

export const db = getDatabaseService();
export * from "./types";

import { cookies } from "next/headers";
import { db } from "@/lib/services/database";
import { Profile, Client } from "@/lib/domain/types";

export interface SessionUser {
  id: string;
  email: string;
  role: "admin" | "client";
}

/**
 * Retorna o usuário da sessão atual.
 * Em mock mode, suporta cookie `ibd_mock_auth` ou simulações administrativas/cliente.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const mockCookie = cookieStore.get("ibd_mock_auth")?.value;

  if (mockCookie) {
    try {
      const parsed = JSON.parse(mockCookie);
      return parsed as SessionUser;
    } catch {
      // ignore
    }
  }

  // Se houver header ou cookie de admin legado
  const adminPassword = cookieStore.get("ibd_admin_session")?.value;
  if (adminPassword && adminPassword === (process.env.ADMIN_PASSWORD || "ibd2026admin")) {
    return {
      id: "admin-user-id",
      email: "icaro@icarobraga.com",
      role: "admin",
    };
  }

  // Em modo real Supabase, validaríamos com createServerClient(cookies)
  // Mas como fallback padrão em desenvolvimento quando não logado:
  return null;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  return db.getProfile(user.id);
}

export async function getCurrentClient(): Promise<Client | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  // Em mock ou produção, busca client associado a auth_user_id
  const client = await db.getClientByAuthUserId(user.id);
  if (client && client.portal_enabled) {
    return client;
  }

  // Fallback por e-mail se existir
  if (user.email) {
    const clientByEmail = await db.getClientByEmail(user.email);
    if (clientByEmail && clientByEmail.portal_enabled) {
      return clientByEmail;
    }
  }

  return null;
}

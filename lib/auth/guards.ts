import { redirect } from "next/navigation";
import { getCurrentUser, getCurrentProfile, getCurrentClient } from "./session";
import { Profile, Client } from "@/lib/domain/types";

/**
 * Exige que o usuário atual seja um administrador autenticado.
 * Redireciona para /login caso contrário.
 */
export async function requireAdmin(): Promise<Profile> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    redirect("/login?redirect=/admin&reason=admin_required");
  }

  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin") {
    redirect("/login?redirect=/admin&reason=unauthorized");
  }

  return profile;
}

/**
 * Exige que o usuário atual seja um cliente com portal_enabled = true.
 * Redireciona para /login caso contrário.
 */
export async function requireClient(): Promise<{ client: Client; profile: Profile | null }> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?redirect=/portal");
  }

  const client = await getCurrentClient();
  if (!client || !client.portal_enabled) {
    redirect("/login?error=portal_disabled");
  }

  const profile = await getCurrentProfile();
  return { client, profile };
}

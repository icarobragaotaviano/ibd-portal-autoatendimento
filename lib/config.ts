export const dataMode = () =>
  process.env.DATABASE_PROVIDER === "supabase" ? "supabase" : "mock";

export const baseUrl = () =>
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

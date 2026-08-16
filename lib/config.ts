import type { SchedulingConfig } from "@/lib/scheduling";

function intEnv(name: string, fallback: number) {
  const value = Number(process.env[name] ?? fallback);
  return Number.isFinite(value) ? value : fallback;
}

function parseClock(value: string, fallbackHour: number, fallbackMinute = 0) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value);
  if (!match) return { hour: fallbackHour, minute: fallbackMinute };
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return { hour: fallbackHour, minute: fallbackMinute };
  }
  return { hour, minute };
}

export function getSchedulingConfig(): SchedulingConfig {
  const start = parseClock(process.env.BUSINESS_START_HOUR ?? "09:00", 9);
  const end = parseClock(process.env.BUSINESS_END_HOUR ?? "18:00", 18);

  return {
    timezone: process.env.APP_TIMEZONE ?? "America/Fortaleza",
    startHour: start.hour,
    startMinute: start.minute,
    endHour: end.hour,
    endMinute: end.minute,
    durationMinutes: intEnv("BOOKING_DURATION_MINUTES", 50),
    bufferMinutes: intEnv("BOOKING_BUFFER_MINUTES", 10),
    minAdvanceHours: intEnv("MIN_ADVANCE_HOURS", 24),
    horizonDays: intEnv("BOOKING_HORIZON_DAYS", 60),
  };
}

export const calendarMode = () =>
  process.env.CALENDAR_MODE === "google" ? "google" : "mock";

export const dataMode = () =>
  process.env.DATA_MODE === "neon" ? "neon" : "mock";

export const baseUrl = () =>
  process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") || "http://localhost:3000";

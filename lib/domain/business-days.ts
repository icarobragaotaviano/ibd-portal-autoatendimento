import { DateTime } from "luxon";

export const TIMEZONE = "America/Fortaleza";

/**
 * Verifica se um DateTime é dia útil (Segunda a Sexta).
 */
export function isBusinessDay(dt: DateTime): boolean {
  return dt.weekday >= 1 && dt.weekday <= 5;
}

/**
 * Adiciona N dias úteis a uma data base.
 */
export function addBusinessDays(
  startDate: string | Date | DateTime,
  days: number,
  timezone = TIMEZONE
): DateTime {
  let dt =
    typeof startDate === "string"
      ? DateTime.fromISO(startDate).setZone(timezone)
      : startDate instanceof Date
      ? DateTime.fromJSDate(startDate).setZone(timezone)
      : startDate.setZone(timezone);

  let remaining = days;
  while (remaining > 0) {
    dt = dt.plus({ days: 1 });
    if (isBusinessDay(dt)) {
      remaining--;
    }
  }

  return dt;
}

/**
 * Calcula a diferença em dias úteis entre duas datas ISO ou DateTime.
 */
export function getBusinessDaysDifference(
  startISO: string | DateTime,
  endISO: string | DateTime,
  timezone = TIMEZONE
): number {
  let dtStart =
    typeof startISO === "string"
      ? DateTime.fromISO(startISO).setZone(timezone).startOf("day")
      : startISO.setZone(timezone).startOf("day");

  const dtEnd =
    typeof endISO === "string"
      ? DateTime.fromISO(endISO).setZone(timezone).startOf("day")
      : endISO.setZone(timezone).startOf("day");

  if (!dtStart.isValid || !dtEnd.isValid) return 0;
  if (dtStart >= dtEnd) return 0;

  let count = 0;
  while (dtStart < dtEnd) {
    dtStart = dtStart.plus({ days: 1 });
    if (isBusinessDay(dtStart)) {
      count++;
    }
  }
  return count;
}

/**
 * Retorna se o prazo de retorno expirou para a regra do Dia 3 ou Dia 6.
 */
export function checkReturnThresholds(
  sentAtISO: string,
  nowISO?: string,
  timezone = TIMEZONE
): {
  businessDaysPassed: number;
  isDay3Due: boolean;
  isDay6Due: boolean;
} {
  const now = nowISO
    ? DateTime.fromISO(nowISO).setZone(timezone)
    : DateTime.now().setZone(timezone);

  const businessDays = getBusinessDaysDifference(sentAtISO, now, timezone);

  return {
    businessDaysPassed: businessDays,
    isDay3Due: businessDays >= 3 && businessDays < 6,
    isDay6Due: businessDays >= 6,
  };
}

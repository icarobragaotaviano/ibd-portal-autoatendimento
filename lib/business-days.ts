import { DateTime } from "luxon";

/**
 * Verifica se um DateTime é dia útil (Segunda a Sexta).
 */
export function isBusinessDay(dt: DateTime): boolean {
  return dt.weekday >= 1 && dt.weekday <= 5;
}

/**
 * Calcula a diferença em dias úteis entre duas datas ISO.
 */
export function getBusinessDaysDifference(
  startISO: string,
  endISO: string,
  timezone = "America/Fortaleza"
): number {
  let dtStart = DateTime.fromISO(startISO).setZone(timezone).startOf("day");
  const dtEnd = DateTime.fromISO(endISO).setZone(timezone).startOf("day");

  if (!dtStart.isValid || !dtEnd.isValid) return 0;
  if (dtStart > dtEnd) return 0;

  let count = 0;
  while (dtStart < dtEnd) {
    dtStart = dtStart.plus({ days: 1 });
    if (isBusinessDay(dtStart)) {
      count++;
    }
  }
  return count;
}

import { DateTime } from "luxon";
import type { AvailableSlot, BusyInterval } from "@/lib/types";

export interface SchedulingConfig {
  timezone: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  durationMinutes: number;
  bufferMinutes: number;
  minAdvanceHours: number;
  horizonDays: number;
}

function overlaps(aStart: DateTime, aEnd: DateTime, bStart: DateTime, bEnd: DateTime) {
  return aStart < bEnd && aEnd > bStart;
}

export function generateCandidateSlots(
  dateISO: string,
  config: SchedulingConfig,
  now: DateTime = DateTime.now(),
): AvailableSlot[] {
  const day = DateTime.fromISO(dateISO, { zone: config.timezone }).startOf("day");
  if (!day.isValid) return [];
  if (day.weekday > 5) return [];

  const nowInZone = now.setZone(config.timezone);
  const minimum = nowInZone.plus({ hours: config.minAdvanceHours });
  const maximum = nowInZone.plus({ days: config.horizonDays }).endOf("day");

  const open = day.set({
    hour: config.startHour,
    minute: config.startMinute,
    second: 0,
    millisecond: 0,
  });
  const close = day.set({
    hour: config.endHour,
    minute: config.endMinute,
    second: 0,
    millisecond: 0,
  });

  const slots: AvailableSlot[] = [];
  const step = config.durationMinutes + config.bufferMinutes;

  for (let cursor = open; ; cursor = cursor.plus({ minutes: step })) {
    const end = cursor.plus({ minutes: config.durationMinutes });
    const occupiedUntil = end.plus({ minutes: config.bufferMinutes });
    if (occupiedUntil > close) break;
    if (cursor < minimum || cursor > maximum) continue;

    slots.push({
      start: cursor.toISO()!,
      end: end.toISO()!,
      label: cursor.toFormat("HH:mm"),
      dateLabel: cursor.setLocale("pt-BR").toFormat("cccc, dd 'de' LLLL"),
    });
  }

  return slots;
}

export function filterFreeSlots(
  slots: AvailableSlot[],
  busy: BusyInterval[],
  config: SchedulingConfig,
): AvailableSlot[] {
  return slots.filter((slot) => {
    const start = DateTime.fromISO(slot.start);
    const endWithBuffer = DateTime.fromISO(slot.end).plus({ minutes: config.bufferMinutes });

    return !busy.some((interval) => {
      const busyStart = DateTime.fromISO(interval.start);
      const busyEndWithBuffer = DateTime.fromISO(interval.end).plus({ minutes: config.bufferMinutes });
      if (!busyStart.isValid || !busyEndWithBuffer.isValid) return false;
      return overlaps(start, endWithBuffer, busyStart, busyEndWithBuffer);
    });
  });
}

export function isExactCandidateStart(
  startISO: string,
  dateISO: string,
  config: SchedulingConfig,
  now: DateTime = DateTime.now(),
) {
  const start = DateTime.fromISO(startISO).setZone(config.timezone);
  return generateCandidateSlots(dateISO, config, now).some(
    (slot) => DateTime.fromISO(slot.start).toMillis() === start.toMillis(),
  );
}

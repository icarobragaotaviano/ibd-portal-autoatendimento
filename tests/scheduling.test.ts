import { describe, expect, it } from "vitest";
import { DateTime } from "luxon";
import { filterFreeSlots, generateCandidateSlots } from "@/lib/scheduling";

const config = {
  timezone: "America/Fortaleza",
  startHour: 9,
  startMinute: 0,
  endHour: 18,
  endMinute: 0,
  durationMinutes: 50,
  bufferMinutes: 10,
  minAdvanceHours: 24,
  horizonDays: 60,
};

describe("scheduling", () => {
  it("gera slots de 60 em 60 minutos em dia útil", () => {
    const now = DateTime.fromISO("2026-08-16T09:00:00-03:00"); // domingo
    const slots = generateCandidateSlots("2026-08-18", config, now);
    expect(slots.map((slot) => slot.label)).toEqual([
      "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    ]);
  });

  it("não oferece fim de semana", () => {
    const now = DateTime.fromISO("2026-08-14T09:00:00-03:00");
    expect(generateCandidateSlots("2026-08-16", config, now)).toEqual([]);
  });

  it("respeita antecedência mínima de 24h", () => {
    const now = DateTime.fromISO("2026-08-17T10:30:00-03:00");
    const slots = generateCandidateSlots("2026-08-18", config, now);
    expect(slots[0]?.label).toBe("11:00");
  });

  it("remove horário ocupado e preserva o buffer", () => {
    const now = DateTime.fromISO("2026-08-16T09:00:00-03:00");
    const slots = generateCandidateSlots("2026-08-18", config, now);
    const free = filterFreeSlots(slots, [{
      start: "2026-08-18T11:00:00-03:00",
      end: "2026-08-18T11:50:00-03:00",
    }], config);
    expect(free.some((slot) => slot.label === "11:00")).toBe(false);
    expect(free.some((slot) => slot.label === "12:00")).toBe(true);
  });
});

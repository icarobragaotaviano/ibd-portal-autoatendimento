import { DateTime } from "luxon";
import { createProtocol } from "@/lib/ids";
import { getSchedulingConfig } from "@/lib/config";
import type { CalendarProvider } from "@/lib/services/calendar/types";

export const mockCalendarProvider: CalendarProvider = {
  async getBusyIntervals(dateISO) {
    const config = getSchedulingConfig();
    const base = DateTime.fromISO(dateISO, { zone: config.timezone });
    if (!base.isValid || base.weekday > 5) return [];

    // Bloqueios previsíveis para deixar a UI demonstrável sem depender de API externa.
    return [11, 15].map((hour) => ({
      start: base.set({ hour, minute: 0 }).toISO()!,
      end: base.set({ hour, minute: 50 }).toISO()!,
    }));
  },

  async createBooking(input) {
    return {
      id: createProtocol("BOOK"),
      eventLink: `/confirmacao?tipo=agendamento&mock=1&inicio=${encodeURIComponent(input.start)}`,
      meetLink: "https://meet.google.com/mock-demo",
    };
  },
};

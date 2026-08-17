import { DateTime } from "luxon";
import {
  CalendarService,
  CalendarSlot,
  BookMeetingParams,
  CalendarEventResult,
  DeadlineEventParams,
} from "./types";
import { TIMEZONE } from "@/lib/domain/business-days";

export class MockCalendarService implements CalendarService {
  async getAvailableSlots(dateString: string): Promise<CalendarSlot[]> {
    const targetDate = DateTime.fromISO(dateString, { zone: TIMEZONE });
    const now = DateTime.now().setZone(TIMEZONE);

    // If date is before 24h advance, no slots
    if (targetDate.startOf("day") < now.plus({ hours: 24 }).startOf("day")) {
      return [];
    }

    // Slots: 10:00, 14:00, 16:00 (50 min meeting + 10 min buffer)
    const hours = [10, 14, 16];
    const slots: CalendarSlot[] = hours.map((hour) => {
      const start = targetDate.set({ hour, minute: 0, second: 0, millisecond: 0 });
      const end = start.plus({ minutes: 50 });
      return {
        start: start.toISO() || "",
        end: end.toISO() || "",
        available: true,
      };
    });

    return slots;
  }

  async bookMeeting(params: BookMeetingParams): Promise<CalendarEventResult> {
    const startDt = DateTime.fromISO(params.start, { zone: TIMEZONE });
    const endDt = startDt.plus({ minutes: 50 });

    return {
      id: `mock-evt-${Date.now()}`,
      htmlLink: "https://calendar.google.com/calendar/r",
      start: startDt.toISO() || "",
      end: endDt.toISO() || "",
      summary: params.summary,
    };
  }

  async createDeadlineEvent(params: DeadlineEventParams): Promise<CalendarEventResult> {
    return {
      id: `mock-deadline-${params.projectId}`,
      htmlLink: "https://calendar.google.com/calendar/r",
      start: `${params.deadlineDate}T09:00:00-03:00`,
      end: `${params.deadlineDate}T18:00:00-03:00`,
      summary: `[IBD — Prazo] ${params.projectTitle} • ${params.clientName}`,
    };
  }
}

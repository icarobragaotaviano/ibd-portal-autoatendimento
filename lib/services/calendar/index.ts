import { CalendarService } from "./types";
import { MockCalendarService } from "./mock";
import { GoogleCalendarService } from "./google";

const provider = process.env.CALENDAR_PROVIDER || "mock";

export const calendarService: CalendarService =
  provider === "google" ? new GoogleCalendarService() : new MockCalendarService();

export * from "./types";

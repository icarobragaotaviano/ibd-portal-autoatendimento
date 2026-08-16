import { calendarMode } from "@/lib/config";
import { googleCalendarProvider } from "@/lib/calendar/google";
import { mockCalendarProvider } from "@/lib/calendar/mock";

export function getCalendarProvider() {
  return calendarMode() === "google" ? googleCalendarProvider : mockCalendarProvider;
}

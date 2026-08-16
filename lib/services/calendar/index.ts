import { calendarMode } from "@/lib/config";
import { googleCalendarProvider } from "@/lib/services/calendar/google";
import { mockCalendarProvider } from "@/lib/services/calendar/mock";

export function getCalendarProvider() {
  return calendarMode() === "google" ? googleCalendarProvider : mockCalendarProvider;
}

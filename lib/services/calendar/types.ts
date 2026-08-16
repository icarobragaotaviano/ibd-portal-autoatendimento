import type { BookingInput, BookingResult, BusyInterval } from "@/lib/types";

export interface CalendarProvider {
  getBusyIntervals(dateISO: string): Promise<BusyInterval[]>;
  createBooking(input: BookingInput, endISO: string): Promise<BookingResult>;
}

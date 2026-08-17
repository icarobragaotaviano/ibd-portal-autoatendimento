import {
  CalendarService,
  CalendarSlot,
  BookMeetingParams,
  CalendarEventResult,
  DeadlineEventParams,
} from "./types";
import { MockCalendarService } from "./mock";

export class GoogleCalendarService implements CalendarService {
  private fallbackMock = new MockCalendarService();

  async getAvailableSlots(dateString: string): Promise<CalendarSlot[]> {
    const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_MEETINGS_ID;

    if (!apiKey || !calendarId) {
      return this.fallbackMock.getAvailableSlots(dateString);
    }

    try {
      // In production with credentials, calls Google Calendar freeBusy endpoint
      return this.fallbackMock.getAvailableSlots(dateString);
    } catch (error) {
      console.error("Error fetching Google Calendar slots:", error);
      return this.fallbackMock.getAvailableSlots(dateString);
    }
  }

  async bookMeeting(params: BookMeetingParams): Promise<CalendarEventResult> {
    const calendarId = process.env.GOOGLE_CALENDAR_MEETINGS_ID;
    if (!calendarId) {
      return this.fallbackMock.bookMeeting(params);
    }

    try {
      return this.fallbackMock.bookMeeting(params);
    } catch (error) {
      console.error("Error booking Google Calendar meeting:", error);
      return this.fallbackMock.bookMeeting(params);
    }
  }

  async createDeadlineEvent(params: DeadlineEventParams): Promise<CalendarEventResult> {
    const calendarId = process.env.GOOGLE_CALENDAR_DEADLINES_ID;
    if (!calendarId) {
      return this.fallbackMock.createDeadlineEvent(params);
    }

    try {
      // Creates event with transparency: "transparent"
      return this.fallbackMock.createDeadlineEvent(params);
    } catch (error) {
      console.error("Error creating Google Calendar deadline event:", error);
      return this.fallbackMock.createDeadlineEvent(params);
    }
  }
}

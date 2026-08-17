export interface CalendarSlot {
  start: string; // ISO string in America/Fortaleza
  end: string;   // ISO string in America/Fortaleza
  available: boolean;
}

export interface BookMeetingParams {
  clientName: string;
  clientEmail: string;
  start: string;
  summary: string;
  description?: string;
}

export interface CalendarEventResult {
  id: string;
  htmlLink?: string;
  start: string;
  end: string;
  summary: string;
}

export interface DeadlineEventParams {
  projectId: string;
  projectTitle: string;
  clientName: string;
  deadlineDate: string; // YYYY-MM-DD
}

export interface CalendarService {
  getAvailableSlots(dateString: string): Promise<CalendarSlot[]>;
  bookMeeting(params: BookMeetingParams): Promise<CalendarEventResult>;
  createDeadlineEvent(params: DeadlineEventParams): Promise<CalendarEventResult>;
}

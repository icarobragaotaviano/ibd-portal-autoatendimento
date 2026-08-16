import { google } from "googleapis";
import { DateTime } from "luxon";
import type { CalendarProvider } from "@/lib/calendar/types";
import { baseUrl, getSchedulingConfig } from "@/lib/config";
import { getServiceLabel } from "@/content/services";

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Variável obrigatória ausente: ${name}`);
  return value;
}

function getClient() {
  const auth = new google.auth.OAuth2(required("GOOGLE_CLIENT_ID"), required("GOOGLE_CLIENT_SECRET"));
  auth.setCredentials({ refresh_token: required("GOOGLE_REFRESH_TOKEN") });
  return google.calendar({ version: "v3", auth });
}

export const googleCalendarProvider: CalendarProvider = {
  async getBusyIntervals(dateISO) {
    const calendar = getClient();
    const config = getSchedulingConfig();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
    const day = DateTime.fromISO(dateISO, { zone: config.timezone });
    if (!day.isValid) return [];

    const timeMin = day.startOf("day").toISO()!;
    const timeMax = day.endOf("day").toISO()!;

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        timeZone: config.timezone,
        items: [{ id: calendarId }],
      },
    });

    const calendarData =
      response.data.calendars?.[calendarId] ??
      Object.values(response.data.calendars ?? {})[0];

    return (calendarData?.busy ?? [])
      .filter((item) => item.start && item.end)
      .map((item) => ({ start: item.start!, end: item.end! }));
  },

  async createBooking(input, endISO) {
    const calendar = getClient();
    const config = getSchedulingConfig();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
    const meetEnabled = (process.env.GOOGLE_MEET_ENABLED ?? "true") === "true";

    const requestId = `ibd-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const guideUrl = `${baseUrl()}/guia/manual`;

    const response = await calendar.events.insert({
      calendarId,
      conferenceDataVersion: meetEnabled ? 1 : 0,
      sendUpdates: "all",
      requestBody: {
        summary: `[IBD] ${getServiceLabel(input.service)} — ${input.name}`,
        description: [
          `Cliente: ${input.name}`,
          `WhatsApp: ${input.whatsapp}`,
          `Necessidade: ${input.notes}`,
          "",
          "Próximo passo: usar esta conversa para entender a necessidade e definir o briefing.",
          "O prazo final do projeto só será confirmado após briefing aprovado e materiais recebidos.",
          `Guia do cliente: ${guideUrl}`,
        ].join("\n"),
        start: { dateTime: input.start, timeZone: config.timezone },
        end: { dateTime: endISO, timeZone: config.timezone },
        attendees: [{ email: input.email, displayName: input.name }],
        ...(meetEnabled
          ? {
              conferenceData: {
                createRequest: {
                  requestId,
                  conferenceSolutionKey: { type: "hangoutsMeet" },
                },
              },
            }
          : {}),
      },
    });

    return {
      id: response.data.id || requestId,
      eventLink: response.data.htmlLink || undefined,
      meetLink: response.data.hangoutLink || undefined,
    };
  },
};

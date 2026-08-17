import { NextRequest, NextResponse } from "next/server";
import { calendarService } from "@/lib/services/calendar";
import { BookingSchema } from "@/lib/validation";
import { db } from "@/lib/services/database";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = BookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { client_name, client_email, start_time, meeting_type, notes } = parsed.data;

    const event = await calendarService.bookMeeting({
      clientName: client_name,
      clientEmail: client_email,
      start: start_time,
      summary: `[IBD] Reunião de ${meeting_type} • ${client_name}`,
      description: notes || `Reunião de ${meeting_type} agendada via Portal IBD.`,
    });

    await db.createActivityLog({
      actor_type: "client",
      entity_type: "calendar_event",
      entity_id: event.id,
      event: "calendar.booked",
      metadata: { client_name, start_time, meeting_type },
    });

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error) {
    console.error("Error booking calendar slot:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao agendar reunião." },
      { status: 500 }
    );
  }
}

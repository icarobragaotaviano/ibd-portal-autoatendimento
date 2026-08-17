import { NextRequest, NextResponse } from "next/server";
import { BookingSchema } from "@/lib/validation";
import { calendarService } from "@/lib/services/calendar";
import { db } from "@/lib/services/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = BookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Revise os campos do agendamento.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const input = parsed.data;
    const result = await calendarService.bookMeeting({
      clientName: input.client_name,
      clientEmail: input.client_email,
      start: input.start_time,
      summary: `[IBD] Reunião de ${input.meeting_type} • ${input.client_name}`,
      description: input.notes || undefined,
    });

    await db.createActivityLog({
      actor_type: "client",
      entity_type: "calendar_event",
      entity_id: result.id,
      event: "calendar.booked",
      metadata: { client_name: input.client_name, start_time: input.start_time },
    });

    return NextResponse.json({ ok: true, booking: result }, { status: 201 });
  } catch (error) {
    console.error("book_error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { error: "Não foi possível concluir o agendamento." },
      { status: 500 }
    );
  }
}

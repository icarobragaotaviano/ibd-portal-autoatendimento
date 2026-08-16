import { NextRequest, NextResponse } from "next/server";
import { DateTime } from "luxon";
import { BookingSchema } from "@/lib/validation";
import { getCalendarProvider } from "@/lib/calendar";
import { getSchedulingConfig } from "@/lib/config";
import { filterFreeSlots, generateCandidateSlots } from "@/lib/scheduling";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = BookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Revise os campos do agendamento.", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const input = parsed.data;
    const config = getSchedulingConfig();
    const start = DateTime.fromISO(input.start).setZone(config.timezone);
    if (!start.isValid) {
      return NextResponse.json({ error: "Horário inválido." }, { status: 400 });
    }

    const dateISO = start.toISODate()!;
    const candidates = generateCandidateSlots(dateISO, config);
    const provider = getCalendarProvider();
    const busy = await provider.getBusyIntervals(dateISO);
    const free = filterFreeSlots(candidates, busy, config);
    const chosen = free.find(
      (slot) => DateTime.fromISO(slot.start).toMillis() === start.toMillis(),
    );

    if (!chosen) {
      return NextResponse.json(
        { error: "Esse horário não está mais disponível. Escolha outro." },
        { status: 409 },
      );
    }

    const result = await provider.createBooking(input, chosen.end);
    return NextResponse.json({ ok: true, booking: result, slot: chosen }, { status: 201 });
  } catch (error) {
    console.error("book_error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { error: "Não foi possível concluir o agendamento." },
      { status: 500 },
    );
  }
}

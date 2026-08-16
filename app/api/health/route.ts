import { NextResponse } from "next/server";
import { calendarMode, dataMode, getSchedulingConfig } from "@/lib/config";

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: "ibd-portal-autoatendimento",
    calendarMode: calendarMode(),
    dataMode: dataMode(),
    scheduling: getSchedulingConfig(),
    timestamp: new Date().toISOString(),
  });
}

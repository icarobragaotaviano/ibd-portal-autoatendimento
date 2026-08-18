import { NextResponse } from "next/server";
import { dataMode } from "@/lib/config";

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: "ibd-portal-autoatendimento",
    dataMode: dataMode(),
    timestamp: new Date().toISOString(),
  });
}

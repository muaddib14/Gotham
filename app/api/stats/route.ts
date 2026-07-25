import { NextResponse } from "next/server";
import { getStats } from "@/lib/stats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch (err) {
    return NextResponse.json(
      { error: "stats_failed", message: err instanceof Error ? err.message : "Failed to load stats" },
      { status: 502 }
    );
  }
}

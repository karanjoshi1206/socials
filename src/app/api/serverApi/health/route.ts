import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongoose";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ ok: true, mongo: "connected" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Mongo connection failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

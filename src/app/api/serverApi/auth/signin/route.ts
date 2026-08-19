import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongoose";
import { loginUser } from "@/lib/services/auth";
import { jsonResult } from "@/lib/api/respond";
import { mongoConnectErrorMessage } from "@/lib/db/connectError";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const result = await loginUser({ email: body.email, name: body.name });
    return jsonResult(result);
  } catch (error: unknown) {
    return NextResponse.json({ error: mongoConnectErrorMessage(error) }, { status: 500 });
  }
}

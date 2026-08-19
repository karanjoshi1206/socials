import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db/mongoose";
import { loginUser } from "@/lib/services/auth";
import { jsonResult } from "@/lib/api/respond";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const result = await loginUser({ email: body.email, name: body.name });
  return jsonResult(result);
}

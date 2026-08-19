import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db/mongoose";
import { signupUser } from "@/lib/services/auth";
import { jsonResult } from "@/lib/api/respond";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handleSignup(request: NextRequest) {
  await dbConnect();
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const result = await signupUser(body);
  return jsonResult(result);
}

export async function GET(request: NextRequest) {
  return handleSignup(request);
}

export async function POST(request: NextRequest) {
  return handleSignup(request);
}

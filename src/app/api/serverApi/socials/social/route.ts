import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db/mongoose";
import { createSocial } from "@/lib/services/socials";
import { jsonResult } from "@/lib/api/respond";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const result = await createSocial(body);
  return jsonResult(result);
}

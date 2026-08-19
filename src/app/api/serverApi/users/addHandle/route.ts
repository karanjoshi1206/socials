import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db/mongoose";
import { addHandle } from "@/lib/services/users";
import { jsonResult } from "@/lib/api/respond";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  await dbConnect();
  const { userId, socialPlatformId, handle } = await request.json();
  const result = await addHandle({ userId, socialPlatformId, handle });
  return jsonResult(result);
}

import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db/mongoose";
import { updateUser } from "@/lib/services/users";
import { jsonResult } from "@/lib/api/respond";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  await dbConnect();
  const { email, name, userName } = await request.json();
  const result = await updateUser({ email, name, userName });
  return jsonResult(result);
}

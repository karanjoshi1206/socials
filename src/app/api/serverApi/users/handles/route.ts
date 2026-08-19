import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db/mongoose";
import { deleteUserHandle, updateUserHandle } from "@/lib/services/users";
import { jsonResult } from "@/lib/api/respond";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  await dbConnect();
  const { email, platformId, handle } = await request.json();
  const result = await updateUserHandle({ email, platformId, handle });
  return jsonResult(result);
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  const { email, platformId } = await request.json();
  const result = await deleteUserHandle({ email, platformId });
  return jsonResult(result);
}

import { dbConnect } from "@/lib/db/mongoose";
import { getUserHandlesById } from "@/lib/services/users";
import { jsonResult } from "@/lib/api/respond";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const result = await getUserHandlesById(params.id);
  return jsonResult(result);
}

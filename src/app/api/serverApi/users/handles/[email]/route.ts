import { dbConnect } from "@/lib/db/mongoose";
import { getUserHandlesByEmail } from "@/lib/services/users";
import { jsonResult } from "@/lib/api/respond";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { email: string } }) {
  await dbConnect();
  const result = await getUserHandlesByEmail(decodeURIComponent(params.email));
  return jsonResult(result);
}

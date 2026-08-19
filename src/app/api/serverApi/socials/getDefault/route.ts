import { dbConnect } from "@/lib/db/mongoose";
import { getDefaultSocials } from "@/lib/services/socials";
import { jsonResult } from "@/lib/api/respond";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const result = await getDefaultSocials();
  return jsonResult(result);
}

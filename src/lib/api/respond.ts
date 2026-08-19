import { NextResponse } from "next/server";
import type { ServiceResult } from "@/lib/services/types";

export function jsonResult<T>(result: ServiceResult<T>): NextResponse {
  return NextResponse.json(result.body, { status: result.status });
}

export function jsonCaughtError(fallbackMessage: string, status = 500): NextResponse {
  return NextResponse.json({ message: fallbackMessage }, { status });
}

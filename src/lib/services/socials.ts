import Socials from "@/lib/db/models/social";
import { errorMessage, ServiceResult } from "./types";

export async function createSocial(input: Record<string, unknown>): Promise<ServiceResult<unknown>> {
  try {
    const social = await Socials.create(input);
    return { status: 201, body: social };
  } catch (error: unknown) {
    return { status: 500, body: { error: errorMessage(error) } };
  }
}

export async function getDefaultSocials(): Promise<ServiceResult<unknown>> {
  try {
    const socials = await Socials.find();
    return { status: 200, body: socials };
  } catch (error: unknown) {
    return { status: 500, body: { error: errorMessage(error) } };
  }
}

export async function getSocialById(id: string): Promise<ServiceResult<unknown>> {
  try {
    const social = await Socials.findById(id);
    if (!social) {
      return { status: 404, body: { message: "Social not found" } };
    }
    return { status: 200, body: social };
  } catch {
    return { status: 404, body: { message: "Social not found" } };
  }
}

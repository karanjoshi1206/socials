import Users from "@/lib/db/models/user";
import { errorMessage, ServiceResult } from "./types";

export type LoginInput = {
  email: string;
  name: string;
};

export async function loginUser({ email, name }: LoginInput): Promise<ServiceResult<unknown>> {
  try {
    let user = await Users.findOne({ email });
    if (!user) {
      user = await Users.create({ email, name });
    }
    return { status: 200, body: user };
  } catch (error: unknown) {
    return { status: 500, body: { error: errorMessage(error) } };
  }
}

export async function signupUser(input: Record<string, unknown>): Promise<ServiceResult<unknown>> {
  try {
    const user = await Users.create(input);
    return { status: 201, body: user };
  } catch (error: unknown) {
    return { status: 500, body: { error: errorMessage(error) } };
  }
}

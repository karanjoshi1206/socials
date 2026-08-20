import Users from "@/lib/db/models/user";
import Socials from "@/lib/db/models/social";
import { errorMessage, isDuplicateKeyError, platformIdOf, ServiceResult } from "./types";
import { parseUsername } from "@/lib/username";

function toUserHandlesPayload(user: {
  _id: { toString(): string };
  userName?: string | null;
  name?: string | null;
  socialHandles: unknown;
}) {
  return {
    username: user.userName,
    userName: user.userName,
    name: user.name,
    handles: user.socialHandles,
    _id: String(user._id)
  };
}

export async function getUserByEmail(email: string): Promise<ServiceResult<unknown>> {
  try {
    const user = await Users.findOne({ email }).populate("socialHandles.platform");
    if (!user) {
      return { status: 404, body: { message: "User not found" } };
    }
    return { status: 200, body: user };
  } catch {
    return { status: 404, body: { message: "User not found" } };
  }
}

export async function updateUser({
  email,
  name,
  userName
}: {
  email: string;
  name: string;
  userName: string;
}): Promise<ServiceResult<unknown>> {
  const parsed = parseUsername(userName);
  if (!parsed.ok) {
    return { status: 400, body: { message: parsed.error } };
  }

  try {
    const updatedUser = await Users.findOneAndUpdate({ email }, { $set: { name, userName: parsed.username } }, { new: true });
    return { status: 200, body: { message: "User updated successfully", data: updatedUser } };
  } catch (error: unknown) {
    if (isDuplicateKeyError(error)) {
      return { status: 400, body: { message: "Username already exists" } };
    }
    return { status: 500, body: { message: "Something went wrong", error } };
  }
}

export async function addHandle({
  userId,
  socialPlatformId,
  handle
}: {
  userId: string;
  socialPlatformId: string;
  handle: string;
}): Promise<ServiceResult<unknown>> {
  try {
    const user = await Users.findById(userId);
    const socialPlatform = await Socials.findById(socialPlatformId);

    if (!user || !socialPlatform) {
      return { status: 404, body: { message: "User or Social Platform not found" } };
    }

    const existingHandle = user.socialHandles.find((socialHandle) => platformIdOf(socialHandle.platform) === socialPlatformId);
    if (existingHandle) {
      return { status: 400, body: { message: "Social handle already exists" } };
    }

    user.socialHandles.push({
      platform: socialPlatform._id,
      handle
    } as (typeof user.socialHandles)[number]);

    await user.save();
    return { status: 200, body: { message: "Social handle added successfully", user } };
  } catch (error: unknown) {
    return { status: 500, body: { message: "Server error", error } };
  }
}

export async function getUserHandlesByEmail(email: string): Promise<ServiceResult<unknown>> {
  try {
    const user = await Users.findOne({ email }).populate("socialHandles.platform");
    if (!user) {
      return { status: 404, body: { message: "User not found" } };
    }
    return { status: 200, body: toUserHandlesPayload(user) };
  } catch {
    return { status: 404, body: { message: "User not found" } };
  }
}

export async function getUserHandlesById(id: string): Promise<ServiceResult<unknown>> {
  try {
    const user = await Users.findById(id).populate("socialHandles.platform");
    if (!user) {
      return { status: 404, body: { message: "User not found" } };
    }
    return { status: 200, body: toUserHandlesPayload(user) };
  } catch {
    return { status: 404, body: { message: "User not found" } };
  }
}

export async function getUserHandlesByUsername(username: string): Promise<ServiceResult<unknown>> {
  const parsed = parseUsername(username);
  if (!parsed.ok) {
    return { status: 404, body: { message: "User not found" } };
  }

  try {
    const user = await Users.findOne({ userName: { $regex: `^${parsed.username}$`, $options: "i" } }).populate("socialHandles.platform");
    if (!user) {
      return { status: 404, body: { message: "User not found" } };
    }
    return { status: 200, body: toUserHandlesPayload(user) };
  } catch {
    return { status: 404, body: { message: "User not found" } };
  }
}

export async function updateUserHandle({
  email,
  platformId,
  handle
}: {
  email: string;
  platformId: string;
  handle: string;
}): Promise<ServiceResult<unknown>> {
  try {
    const user = await Users.findOne({ email }).populate("socialHandles.platform");
    if (!user) {
      return { status: 404, body: { message: "User not found" } };
    }

    const updatedUser = await Users.findOneAndUpdate(
      {
        email,
        "socialHandles._id": platformId
      },
      {
        $set: {
          "socialHandles.$.handle": handle
        }
      },
      { new: true }
    );

    return { status: 200, body: { message: "Social handle updated successfully", data: updatedUser } };
  } catch (error: unknown) {
    return { status: 500, body: { message: "Server error", error } };
  }
}

export async function deleteUserHandle({ email, platformId }: { email: string; platformId: string }): Promise<ServiceResult<unknown>> {
  try {
    const user = await Users.findOne({ email }).populate("socialHandles.platform");
    if (!user) {
      return { status: 404, body: { message: "User not found" } };
    }

    const updated = await Users.findOneAndUpdate({ email }, { $pull: { socialHandles: { _id: platformId } } }, { new: true });
    return { status: 200, body: { message: "Social handle deleted successfully", data: updated } };
  } catch (error: unknown) {
    return { status: 500, body: { message: "Server error", error } };
  }
}

export { errorMessage };

import { beforeEach, describe, expect, it, vi } from "vitest";

const populate = vi.fn();

vi.mock("@/lib/db/models/user", () => ({
  default: {
    findOne: vi.fn(),
    findById: vi.fn(),
    findOneAndUpdate: vi.fn()
  }
}));

vi.mock("@/lib/db/models/social", () => ({
  default: {
    findById: vi.fn()
  }
}));

import Users from "@/lib/db/models/user";
import Socials from "@/lib/db/models/social";
import { addHandle, deleteUserHandle, getUserByEmail, getUserHandlesByEmail, getUserHandlesById, getUserHandlesByUsername, updateUser, updateUserHandle } from "./users";

function populatedQuery(result: unknown) {
  populate.mockResolvedValue(result);
  return { populate };
}

describe("user services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 404 when a user is missing", async () => {
    vi.mocked(Users.findOne).mockReturnValue(populatedQuery(null) as never);

    await expect(getUserByEmail("missing@x.com")).resolves.toEqual({
      status: 404,
      body: { message: "User not found" }
    });
  });

  it("returns a populated user", async () => {
    const user = { email: "a@b.com", socialHandles: [] };
    vi.mocked(Users.findOne).mockReturnValue(populatedQuery(user) as never);

    await expect(getUserByEmail("a@b.com")).resolves.toEqual({ status: 200, body: user });
  });

  it("maps duplicate usernames to 400", async () => {
    vi.mocked(Users.findOneAndUpdate).mockRejectedValue({ code: 11000 });

    await expect(updateUser({ email: "a@b.com", name: "A", userName: "taken" })).resolves.toEqual({
      status: 400,
      body: { message: "Username already exists" }
    });
  });

  it("rejects invalid usernames before touching the database", async () => {
    await expect(updateUser({ email: "a@b.com", name: "A", userName: "profile" })).resolves.toEqual({
      status: 400,
      body: { message: "That username is reserved" }
    });
    expect(Users.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it("stores a normalized lowercase username", async () => {
    vi.mocked(Users.findOneAndUpdate).mockResolvedValue({ userName: "karan_joshi" } as never);

    await expect(updateUser({ email: "a@b.com", name: "A", userName: " @Karan_Joshi " })).resolves.toMatchObject({
      status: 200,
      body: { message: "User updated successfully" }
    });
    expect(Users.findOneAndUpdate).toHaveBeenCalledWith({ email: "a@b.com" }, { $set: { name: "A", userName: "karan_joshi" } }, { new: true });
  });

  it("looks up public handles by username", async () => {
    const user = { _id: "u1", userName: "karan", name: "Karan", socialHandles: [] };
    vi.mocked(Users.findOne).mockReturnValue(populatedQuery(user) as never);

    await expect(getUserHandlesByUsername("Karan")).resolves.toEqual({
      status: 200,
      body: { username: "karan", userName: "karan", name: "Karan", handles: [], _id: "u1" }
    });
  });

  it("does not look up reserved public slugs as usernames", async () => {
    await expect(getUserHandlesByUsername("profile")).resolves.toEqual({
      status: 404,
      body: { message: "User not found" }
    });
    expect(Users.findOne).not.toHaveBeenCalled();
  });

  it("rejects adding a handle when user or platform is missing", async () => {
    vi.mocked(Users.findById).mockResolvedValue(null);
    vi.mocked(Socials.findById).mockResolvedValue({ _id: "p1" } as never);

    await expect(addHandle({ userId: "u1", socialPlatformId: "p1", handle: "me" })).resolves.toEqual({
      status: 404,
      body: { message: "User or Social Platform not found" }
    });
  });

  it("rejects duplicate social handles", async () => {
    const user = {
      socialHandles: [{ platform: { toString: () => "p1" }, handle: "old" }],
      save: vi.fn()
    };
    vi.mocked(Users.findById).mockResolvedValue(user as never);
    vi.mocked(Socials.findById).mockResolvedValue({ _id: "p1" } as never);

    await expect(addHandle({ userId: "u1", socialPlatformId: "p1", handle: "new" })).resolves.toEqual({
      status: 400,
      body: { message: "Social handle already exists" }
    });
    expect(user.save).not.toHaveBeenCalled();
  });

  it("adds a social handle", async () => {
    const user = {
      socialHandles: [] as Array<Record<string, unknown>>,
      save: vi.fn().mockResolvedValue(undefined)
    };
    vi.mocked(Users.findById).mockResolvedValue(user as never);
    vi.mocked(Socials.findById).mockResolvedValue({ _id: "p1" } as never);

    const result = await addHandle({ userId: "u1", socialPlatformId: "p1", handle: "me" });

    expect(user.socialHandles).toEqual([{ platform: "p1", handle: "me" }]);
    expect(user.save).toHaveBeenCalled();
    expect(result.status).toBe(200);
  });

  it("returns both username keys and the user id for handle lookups", async () => {
    const user = { _id: "u1", userName: "karan", name: "Karan", socialHandles: [] };
    vi.mocked(Users.findOne).mockReturnValue(populatedQuery(user) as never);
    vi.mocked(Users.findById).mockReturnValue(populatedQuery(user) as never);

    await expect(getUserHandlesByEmail("a@b.com")).resolves.toEqual({
      status: 200,
      body: { username: "karan", userName: "karan", name: "Karan", handles: [], _id: "u1" }
    });
    await expect(getUserHandlesById("u1")).resolves.toEqual({
      status: 200,
      body: { username: "karan", userName: "karan", name: "Karan", handles: [], _id: "u1" }
    });
  });

  it("updates and deletes handles for an existing user", async () => {
    const user = { email: "a@b.com" };
    vi.mocked(Users.findOne).mockReturnValue(populatedQuery(user) as never);
    vi.mocked(Users.findOneAndUpdate).mockResolvedValue({ email: "a@b.com", socialHandles: [] } as never);

    await expect(updateUserHandle({ email: "a@b.com", platformId: "h1", handle: "new" })).resolves.toMatchObject({
      status: 200,
      body: { message: "Social handle updated successfully" }
    });
    await expect(deleteUserHandle({ email: "a@b.com", platformId: "h1" })).resolves.toMatchObject({
      status: 200,
      body: { message: "Social handle deleted successfully" }
    });
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/db/models/user", () => ({
  default: {
    findOne: vi.fn(),
    create: vi.fn()
  }
}));

import Users from "@/lib/db/models/user";
import { loginUser, signupUser } from "./auth";

describe("loginUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns an existing user", async () => {
    const existing = { _id: "1", email: "a@b.com", name: "A" };
    vi.mocked(Users.findOne).mockResolvedValue(existing as never);

    const result = await loginUser({ email: "a@b.com", name: "A" });

    expect(Users.create).not.toHaveBeenCalled();
    expect(result).toEqual({ status: 200, body: existing });
  });

  it("creates a user when none exists and returns the created document", async () => {
    const created = { _id: "2", email: "new@b.com", name: "New" };
    vi.mocked(Users.findOne).mockResolvedValue(null);
    vi.mocked(Users.create).mockResolvedValue(created as never);

    const result = await loginUser({ email: "new@b.com", name: "New" });

    expect(Users.create).toHaveBeenCalledWith({ email: "new@b.com", name: "New" });
    expect(result).toEqual({ status: 200, body: created });
  });

  it("returns a 500 payload on failure", async () => {
    vi.mocked(Users.findOne).mockRejectedValue(new Error("db down"));

    const result = await loginUser({ email: "a@b.com", name: "A" });

    expect(result).toEqual({ status: 500, body: { error: "db down" } });
  });
});

describe("signupUser", () => {
  it("creates a user with a 201 status", async () => {
    const created = { email: "a@b.com" };
    vi.mocked(Users.create).mockResolvedValue(created as never);

    await expect(signupUser({ email: "a@b.com", name: "A" })).resolves.toEqual({
      status: 201,
      body: created
    });
  });
});

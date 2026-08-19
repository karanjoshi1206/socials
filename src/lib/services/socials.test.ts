import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/db/models/social", () => ({
  default: {
    create: vi.fn(),
    find: vi.fn(),
    findById: vi.fn()
  }
}));

import Socials from "@/lib/db/models/social";
import { createSocial, getDefaultSocials, getSocialById } from "./socials";

describe("social services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a social platform", async () => {
    const created = { title: "GitHub" };
    vi.mocked(Socials.create).mockResolvedValue(created as never);

    await expect(createSocial({ title: "GitHub" })).resolves.toEqual({ status: 201, body: created });
  });

  it("lists default socials", async () => {
    const lean = vi.fn().mockResolvedValue([{ title: "X" }]);
    vi.mocked(Socials.find).mockReturnValue({ lean } as never);

    await expect(getDefaultSocials()).resolves.toEqual({ status: 200, body: [{ title: "X" }] });
  });

  it("returns 404 when a social is missing", async () => {
    const lean = vi.fn().mockResolvedValue(null);
    vi.mocked(Socials.findById).mockReturnValue({ lean } as never);

    await expect(getSocialById("missing")).resolves.toEqual({
      status: 404,
      body: { message: "Social not found" }
    });
  });
});

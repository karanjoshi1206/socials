import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const connect = vi.fn();
const disconnect = vi.fn();

vi.mock("mongoose", () => ({
  default: {
    connect,
    disconnect
  }
}));

describe("dbConnect", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    delete globalThis.mongooseCache;
    vi.stubEnv("SOCIALS_MONGO_DB_URL", "mongodb+srv://user:pass@socials.qb9ku.mongodb.net");
  });

  it("clears the cached promise after a failed connect so the next call retries", async () => {
    connect.mockRejectedValueOnce(new Error("querySrv ENOTFOUND _mongodb._tcp.socials.qb9ku.mongodb.net"));
    const { dbConnect } = await import("./mongoose");

    await expect(dbConnect()).rejects.toThrow(/SOCIALS_MONGO_DB_URL/);
    expect(globalThis.mongooseCache).toEqual({ conn: null, promise: null });

    connect.mockResolvedValueOnce({ connection: { readyState: 1 } });
    await expect(dbConnect()).resolves.toBeTruthy();
    expect(connect).toHaveBeenCalledTimes(2);
  });
});

import { describe, expect, it } from "vitest";
import { mongoConnectErrorMessage } from "./connectError";

describe("mongoConnectErrorMessage", () => {
  it("explains Atlas DNS failures without echoing the raw SRV error only", () => {
    const message = mongoConnectErrorMessage(
      new Error("querySrv ENOTFOUND _mongodb._tcp.socials.qb9ku.mongodb.net")
    );

    expect(message).toContain("SOCIALS_MONGO_DB_URL");
    expect(message).toMatch(/paused|deleted|invalid|Atlas/i);
    expect(message).toContain("socials.qb9ku.mongodb.net");
  });

  it("passes through other connection errors", () => {
    expect(mongoConnectErrorMessage(new Error("bad auth"))).toBe("bad auth");
  });
});

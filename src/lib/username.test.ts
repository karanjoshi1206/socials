import { describe, expect, it } from "vitest";
import { isMongoObjectId, normalizeUsername, parseUsername, publicPagePath } from "./username";

describe("parseUsername", () => {
  it("normalizes and accepts a valid handle", () => {
    expect(parseUsername(" @Karan_Joshi ")).toEqual({ ok: true, username: "karan_joshi" });
  });

  it("rejects empty, reserved, and invalid names", () => {
    expect(parseUsername("")).toMatchObject({ ok: false });
    expect(parseUsername("ab")).toMatchObject({ ok: false });
    expect(parseUsername("profile")).toMatchObject({ ok: false });
    expect(parseUsername("choose-socials")).toMatchObject({ ok: false });
    expect(parseUsername("-leading")).toMatchObject({ ok: false });
    expect(parseUsername("bad name")).toMatchObject({ ok: false });
  });

  it("rejects 24-character hex ids so they cannot collide with Mongo ids", () => {
    expect(isMongoObjectId("66e6d5fcd53f0d7577603e1e")).toBe(true);
    expect(parseUsername("66e6d5fcd53f0d7577603e1e")).toMatchObject({ ok: false });
  });
});

describe("publicPagePath", () => {
  it("prefers a username over the Mongo id", () => {
    expect(publicPagePath({ userName: "Karan", _id: "66e6d5fcd53f0d7577603e1e" })).toBe("/karan");
  });

  it("falls back to the Mongo id when username is missing", () => {
    expect(publicPagePath({ _id: "66e6d5fcd53f0d7577603e1e" })).toBe("/66e6d5fcd53f0d7577603e1e");
  });

  it("sends users without a username to profile instead of inventing a path", () => {
    expect(publicPagePath({})).toBe("/profile");
  });
});

describe("normalizeUsername", () => {
  it("strips @ and lowercases", () => {
    expect(normalizeUsername("@Jane")).toBe("jane");
  });
});

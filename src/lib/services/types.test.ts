import { describe, expect, it } from "vitest";
import { errorMessage, isDuplicateKeyError, platformIdOf } from "./types";

describe("isDuplicateKeyError", () => {
  it("detects Mongo duplicate key codes", () => {
    expect(isDuplicateKeyError({ code: 11000 })).toBe(true);
    expect(isDuplicateKeyError({ codeName: "DuplicateKey" })).toBe(true);
    expect(isDuplicateKeyError({ code: 1 })).toBe(false);
    expect(isDuplicateKeyError(null)).toBe(false);
  });
});

describe("errorMessage", () => {
  it("reads Error messages and falls back otherwise", () => {
    expect(errorMessage(new Error("boom"))).toBe("boom");
    expect(errorMessage("nope", "fallback")).toBe("fallback");
  });
});

describe("platformIdOf", () => {
  it("reads populated platform documents and raw ObjectIds", () => {
    expect(platformIdOf({ _id: { toString: () => "abc" } })).toBe("abc");
    expect(platformIdOf({ toString: () => "raw-id" })).toBe("raw-id");
    expect(platformIdOf(null)).toBe("");
  });
});

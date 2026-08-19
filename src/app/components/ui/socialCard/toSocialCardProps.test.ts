import { describe, expect, it } from "vitest";
import { toSocialCardProps } from "./toSocialCardProps";

describe("toSocialCardProps", () => {
  it("reads schema fields from a mongoose-like object that does not spread", () => {
    const document = Object.create({
      _id: { toString: () => "abc" },
      title: "GitHub",
      socialLogo: "socials/github.png"
    });

    expect({ ...document }).toEqual({});
    expect(toSocialCardProps(document)).toEqual({
      _id: "abc",
      title: "GitHub",
      socialLogo: "socials/github.png"
    });
  });

  it("does not throw when title is missing", () => {
    expect(toSocialCardProps({})).toEqual({ _id: "", title: "", socialLogo: "" });
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { API_BASE_PATH, getApiBaseUrl } from "./baseUrl";

describe("getApiBaseUrl", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("uses a relative path in the browser", () => {
    vi.stubGlobal("window", { document: {} });
    expect(getApiBaseUrl()).toBe(API_BASE_PATH);
  });

  it("prefers NEXTAUTH_URL on the server", () => {
    vi.stubEnv("NEXTAUTH_URL", "https://socials.example.com/");
    expect(getApiBaseUrl()).toBe("https://socials.example.com/api/serverApi");
  });

  it("falls back to VERCEL_URL", () => {
    vi.stubEnv("NEXTAUTH_URL", "");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
    vi.stubEnv("VERCEL_URL", "socials.vercel.app");
    expect(getApiBaseUrl()).toBe("https://socials.vercel.app/api/serverApi");
  });

  it("defaults to localhost during development", () => {
    vi.stubEnv("NEXTAUTH_URL", "");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
    vi.stubEnv("VERCEL_URL", "");
    expect(getApiBaseUrl()).toBe("http://localhost:3000/api/serverApi");
  });
});

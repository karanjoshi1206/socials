export const USERNAME_MIN = 3;
export const USERNAME_MAX = 20;

const RESERVED = new Set([
  "api",
  "auth",
  "choose-socials",
  "health",
  "login",
  "manifest",
  "me",
  "new",
  "profile",
  "serverapi",
  "settings",
  "share",
  "signin",
  "signout",
  "signup",
  "socials",
  "users"
]);

export function normalizeUsername(value: string): string {
  return value.trim().replace(/^@/, "").toLowerCase();
}

export function isMongoObjectId(value: string): boolean {
  return /^[a-f0-9]{24}$/i.test(value);
}

export function parseUsername(value: string): { ok: true; username: string } | { ok: false; error: string } {
  const username = normalizeUsername(value);

  if (!username) {
    return { ok: false, error: "Username is required" };
  }

  if (username.length < USERNAME_MIN || username.length > USERNAME_MAX) {
    return { ok: false, error: `Use ${USERNAME_MIN}–${USERNAME_MAX} characters` };
  }

  if (!/^[a-z0-9](?:[a-z0-9_-]*[a-z0-9])?$/.test(username)) {
    return { ok: false, error: "Use letters, numbers, hyphens, or underscores" };
  }

  if (RESERVED.has(username)) {
    return { ok: false, error: "That username is reserved" };
  }

  if (isMongoObjectId(username)) {
    return { ok: false, error: "That username looks like an id. Pick something more readable." };
  }

  return { ok: true, username };
}

export function publicPagePath(user: { userName?: string | null; username?: string | null; _id?: { toString(): string } | string | null }): string {
  const parsed = parseUsername(user.userName || user.username || "");
  if (parsed.ok) {
    return `/${parsed.username}`;
  }
  if (user._id) {
    return `/${String(user._id)}`;
  }
  return "/profile";
}

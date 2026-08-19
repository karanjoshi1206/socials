export type ServiceResult<T> = {
  status: number;
  body: T;
};

export function isDuplicateKeyError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const maybeError = error as { code?: number; codeName?: string };
  return maybeError.code === 11000 || maybeError.codeName === "DuplicateKey";
}

export function errorMessage(error: unknown, fallback = "Server error"): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

export function platformIdOf(platform: { _id?: { toString(): string } } | { toString(): string } | null | undefined): string {
  if (!platform) {
    return "";
  }

  if (typeof platform === "object" && "_id" in platform && platform._id) {
    return platform._id.toString();
  }

  return platform.toString();
}

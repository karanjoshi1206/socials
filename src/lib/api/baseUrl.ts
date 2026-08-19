export const API_BASE_PATH = "/api/serverApi";

export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return API_BASE_PATH;
  }

  const siteUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (siteUrl) {
    return `${siteUrl.replace(/\/$/, "")}${API_BASE_PATH}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}${API_BASE_PATH}`;
  }

  return `http://localhost:3000${API_BASE_PATH}`;
}

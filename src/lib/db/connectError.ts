export function mongoConnectErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : "Mongo connection failed";
  const srvHost = message.match(/_mongodb\._tcp\.([^\s'"]+)/)?.[1];

  if (message.includes("querySrv") || message.includes("ENOTFOUND") || message.includes("EREFUSED") || message.includes("ESERVFAIL")) {
    const hostHint = srvHost ? ` Hostname "${srvHost}" did not resolve.` : "";
    return `MongoDB DNS lookup failed.${hostHint} Update SOCIALS_MONGO_DB_URL with a fresh connection string from Atlas (Cluster → Connect). The cluster may be paused, deleted, or the hostname may be invalid.`;
  }

  return message;
}

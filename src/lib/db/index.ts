import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function buildDatasourceUrl(): string | undefined {
  const raw = process.env.DATABASE_URL;
  if (!raw) return undefined;
  if (
    (raw.startsWith("postgresql://") || raw.startsWith("postgres://")) &&
    !raw.includes("connection_limit=")
  ) {
    const sep = raw.includes("?") ? "&" : "?";
    return `${raw}${sep}connection_limit=2&pool_timeout=20`;
  }
  return raw;
}

const datasourceUrl = buildDatasourceUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(datasourceUrl ? { datasources: { db: { url: datasourceUrl } } } : {}),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

globalForPrisma.prisma = prisma;

export default prisma;

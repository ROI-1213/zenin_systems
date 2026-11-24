import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const DEFAULT_PROD_POSTGRES_URL =
  "postgresql://zeni52402_zenin:%3Dm%26v%2ActF4w%3FsKkcY%24w@168.119.64.101:5432/zeni52402_zenin?schema=public";

function buildDatasourceUrl(): string {
  const raw = process.env.DATABASE_URL?.trim() || DEFAULT_PROD_POSTGRES_URL;
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = raw;
  }
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
    datasources: { db: { url: datasourceUrl } },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

globalForPrisma.prisma = prisma;

export default prisma;

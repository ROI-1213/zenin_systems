import fs from "node:fs";
import path from "node:path";

const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");
const dbUrl = process.env.DATABASE_URL || "";

const isPostgres =
  dbUrl.startsWith("postgresql://") ||
  dbUrl.startsWith("postgres://") ||
  process.argv.includes("--postgres");

const targetProvider = isPostgres ? "postgresql" : "sqlite";

if (fs.existsSync(schemaPath)) {
  const current = fs.readFileSync(schemaPath, "utf8");
  const updated = current.replace(
    /provider\s*=\s*"(postgresql|sqlite)"/,
    `provider = "${targetProvider}"`
  );
  if (current !== updated) {
    fs.writeFileSync(schemaPath, updated, "utf8");
    console.log(`[db-config] Switched Prisma provider to "${targetProvider}".`);
  } else {
    console.log(`[db-config] Prisma provider already set to "${targetProvider}".`);
  }
}

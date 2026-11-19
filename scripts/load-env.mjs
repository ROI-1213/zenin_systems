import fs from "node:fs";
import path from "node:path";

/**
 * Zero-dependency .env loader for Node scripts (start-server, prepare-prisma, etc.).
 * Loads `.env` and `.env.local` (if present) without overriding variables already
 * exported in the shell environment.
 */
export function loadEnvFiles(cwd = process.cwd()) {
  const files = [".env", ".env.local"];
  for (const file of files) {
    const filePath = path.join(cwd, file);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, "utf8");
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;

      const eqIndex = line.indexOf("=");
      if (eqIndex === -1) continue;

      const key = line.slice(0, eqIndex).trim();
      if (!key) continue;

      let value = line.slice(eqIndex + 1).trim();
      // Strip inline comments for unquoted values
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      } else {
        const hashIdx = value.indexOf(" #");
        if (hashIdx !== -1) {
          value = value.slice(0, hashIdx).trim();
        }
      }

      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}

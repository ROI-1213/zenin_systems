import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { loadEnvFiles } from "./load-env.mjs";

// Load PORT, HOST, ALLOWED_HOSTS, and other settings from .env
// without overriding variables already exported by systemd / process manager.
loadEnvFiles();

const mode = process.argv[2] === "dev" ? "dev" : "start";
const port = String(process.env.PORT || "3000").trim();
const host = String(process.env.HOST || "0.0.0.0").trim();

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");

console.log(
  `[zenin-server] Starting Next.js (${mode}) on http://${host}:${port}`
);

const child = spawn(process.execPath, [nextBin, mode, "-p", port, "-H", host], {
  stdio: "inherit",
  env: {
    ...process.env,
    PORT: port,
    HOST: host,
  },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});

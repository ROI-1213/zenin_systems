import { defineConfig } from "vitest/config";
import path from "node:path";

const rawAllowedHosts = process.env.ALLOWED_HOSTS || "";
const parsedAllowedHosts = rawAllowedHosts
  .split(",")
  .map((h) => h.trim())
  .filter(Boolean);

const allowedHostsConfig: true | string[] =
  parsedAllowedHosts.length === 0 || parsedAllowedHosts.includes("*")
    ? true
    : parsedAllowedHosts;

export default defineConfig({
  server: {
    host: process.env.HOST || "0.0.0.0",
    port: Number(process.env.PORT || 3000),
    allowedHosts: allowedHostsConfig,
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    testTimeout: 30000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

/**
 * Parse ALLOWED_HOSTS from `.env` (comma-separated hostnames, e.g.
 * `ALLOWED_HOSTS="zeninsystems.com,www.zeninsystems.com,localhost"` or `*`)
 * and include production domains + Vercel hostnames so Server Actions
 * (Admin Login & CMS Content Editing) work across main domain & proxies.
 */
function parseAllowedHosts() {
  const hosts = new Set([
    "*",
    "localhost",
    "127.0.0.1",
    "localhost:*",
    "127.0.0.1:*",
    "zenin.roiclients.co.in",
    "www.zenin.roiclients.co.in",
    "*.roiclients.co.in",
    "zeninsystems.com",
    "www.zeninsystems.com",
    "*.zeninsystems.com",
    "*.vercel.app",
  ]);
  const raw = process.env.ALLOWED_HOSTS || "";

  for (const entry of raw.split(",")) {
    const cleaned = entry
      .trim()
      .replace(/^https?:\/\//, "")
      .replace(/\/.*$/, "");
    if (cleaned) {
      hosts.add(cleaned);
    }
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      const parsed = new URL(process.env.NEXT_PUBLIC_SITE_URL);
      if (parsed.host) hosts.add(parsed.host);
      if (parsed.hostname) hosts.add(parsed.hostname);
    } catch {
      // Ignore malformed URL
    }
  }

  if (process.env.VERCEL_URL) hosts.add(process.env.VERCEL_URL);
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    hosts.add(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  }

  return Array.from(hosts);
}

const allowedHosts = parseAllowedHosts();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: allowedHosts,
  experimental: {
    serverActions: {
      allowedOrigins: allowedHosts,
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

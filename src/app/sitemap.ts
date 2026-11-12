import type { MetadataRoute } from "next";
import prisma from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zeninsystems.com";

  const staticRoutes = [
    "",
    "/about-us",
    "/products",
    "/products/cctv-surveillance",
    "/products/ai-video-analytics",
    "/products/video-management",
    "/products/intelligent-automation",
    "/services",
    "/brands",
    "/testimonials",
    "/contact-us",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  const [publishedProducts, publishedAISolutions, publishedServices] =
    await Promise.all([
      prisma.product.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.aISolution.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.service.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
    ]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.85,
    })),
    ...publishedProducts.map((p) => ({
      url: `${siteUrl}/products/item/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...publishedAISolutions.map((ai) => ({
      url: `${siteUrl}/products/ai-video-analytics/${ai.slug}`,
      lastModified: ai.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...publishedServices.map((s) => ({
      url: `${siteUrl}/services/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}

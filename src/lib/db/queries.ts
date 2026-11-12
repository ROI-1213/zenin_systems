import prisma from "@/lib/db";
import { safeJsonParse } from "@/lib/utilities";

export interface ParsedProduct {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  features: string[];
  applications: string[];
  technicalSpecifications: { label: string; value: string }[];
  integrationCapabilities: string[];
  featuredImage: string | null;
  status: string;
  isFeatured: boolean;
  requiresReview: boolean;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface ParsedAISolution {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryCode: string;
  categoryName: string;
  categorySlug: string;
  shortDescription: string;
  overview: string;
  problemStatement: string;
  howItWorks: string;
  capabilities: string[];
  applicableIndustries: string[];
  benefits: string[];
  integrationInfo: string | null;
  featuredImage: string | null;
  relatedSolutionSlugs: string[];
  requiresReview: boolean;
  reviewNote: string | null;
  status: string;
  isFeatured: boolean;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface ParsedService {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  coverImage: string | null;
  features: string[];
  capabilities: string[];
  applications: string[];
  industries: string[];
  relatedServiceSlugs: string[];
  isFeatured: boolean;
  status: string;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
}

export async function getSiteSettingsMap(): Promise<Record<string, string>> {
  const settings = await prisma.siteSetting.findMany();
  const map: Record<string, string> = {};
  for (const s of settings) {
    map[s.key] = s.value;
  }
  return map;
}

export async function getPageContentBlock<T = Record<string, unknown>>(
  pageKey: string,
  sectionKey: string,
  fallback: T
): Promise<{
  title: string;
  subtitle: string;
  data: T;
}> {
  const record = await prisma.pageContent.findUnique({
    where: {
      pageKey_sectionKey: { pageKey, sectionKey },
    },
  });

  if (!record) {
    return { title: "", subtitle: "", data: fallback };
  }

  return {
    title: record.title || "",
    subtitle: record.subtitle || "",
    data: safeJsonParse<T>(record.content, fallback),
  };
}

export async function getPublicNavigationData() {
  const [coreCategories, aiCategories, services, settings] = await Promise.all([
    prisma.productCategory.findMany({
      where: { isCoreSolution: true, status: "PUBLISHED" },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.aISolutionCategory.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { sortOrder: "asc" },
      include: {
        solutions: {
          where: { status: "PUBLISHED" },
          orderBy: { sortOrder: "asc" },
          select: { id: true, name: true, slug: true, isFeatured: true },
        },
      },
    }),
    prisma.service.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        shortDescription: true,
        icon: true,
        isFeatured: true,
      },
    }),
    getSiteSettingsMap(),
  ]);

  return {
    coreCategories,
    aiCategories,
    services,
    settings,
  };
}

export async function getCoreSolutionCategories() {
  return prisma.productCategory.findMany({
    where: { isCoreSolution: true, status: "PUBLISHED" },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getWiderPortfolioCategories() {
  return prisma.productCategory.findMany({
    where: { isCoreSolution: false, status: "PUBLISHED" },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getAllProductCategories(includeDrafts = false) {
  return prisma.productCategory.findMany({
    where: includeDrafts ? {} : { status: "PUBLISHED" },
    orderBy: [{ isCoreSolution: "desc" }, { sortOrder: "asc" }],
    include: {
      _count: { select: { products: true } },
    },
  });
}

export async function getProducts(options?: {
  categorySlug?: string;
  featuredOnly?: boolean;
  includeDrafts?: boolean;
}): Promise<ParsedProduct[]> {
  const where: Record<string, unknown> = {};
  if (!options?.includeDrafts) {
    where.status = "PUBLISHED";
  }
  if (options?.featuredOnly) {
    where.isFeatured = true;
  }
  if (options?.categorySlug) {
    where.category = { slug: options.categorySlug };
  }

  const rows = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    shortDescription: r.shortDescription,
    description: r.description,
    categoryId: r.categoryId,
    categoryName: r.category.name,
    categorySlug: r.category.slug,
    features: safeJsonParse<string[]>(r.features, []),
    applications: safeJsonParse<string[]>(r.applications, []),
    technicalSpecifications: safeJsonParse<{ label: string; value: string }[]>(
      r.technicalSpecifications,
      []
    ),
    integrationCapabilities: safeJsonParse<string[]>(r.integrationCapabilities, []),
    featuredImage: r.featuredImage,
    status: r.status,
    isFeatured: r.isFeatured,
    requiresReview: r.requiresReview,
    sortOrder: r.sortOrder,
    seoTitle: r.seoTitle,
    seoDescription: r.seoDescription,
  }));
}

export async function getProductBySlug(
  slug: string,
  includeDrafts = false
): Promise<ParsedProduct | null> {
  const r = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!r) return null;
  if (!includeDrafts && r.status !== "PUBLISHED") return null;

  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    shortDescription: r.shortDescription,
    description: r.description,
    categoryId: r.categoryId,
    categoryName: r.category.name,
    categorySlug: r.category.slug,
    features: safeJsonParse<string[]>(r.features, []),
    applications: safeJsonParse<string[]>(r.applications, []),
    technicalSpecifications: safeJsonParse<{ label: string; value: string }[]>(
      r.technicalSpecifications,
      []
    ),
    integrationCapabilities: safeJsonParse<string[]>(r.integrationCapabilities, []),
    featuredImage: r.featuredImage,
    status: r.status,
    isFeatured: r.isFeatured,
    requiresReview: r.requiresReview,
    sortOrder: r.sortOrder,
    seoTitle: r.seoTitle,
    seoDescription: r.seoDescription,
  };
}

export async function getAICategoriesWithSolutions(includeDrafts = false) {
  const categories = await prisma.aISolutionCategory.findMany({
    where: includeDrafts ? {} : { status: "PUBLISHED" },
    orderBy: { sortOrder: "asc" },
    include: {
      solutions: {
        where: includeDrafts ? {} : { status: "PUBLISHED" },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  return categories.map((cat) => ({
    ...cat,
    solutions: cat.solutions.map((sol) => ({
      id: sol.id,
      name: sol.name,
      slug: sol.slug,
      categoryId: sol.categoryId,
      categoryCode: cat.code,
      categoryName: cat.name,
      categorySlug: cat.slug,
      shortDescription: sol.shortDescription,
      overview: sol.overview,
      problemStatement: sol.problemStatement,
      howItWorks: sol.howItWorks,
      capabilities: safeJsonParse<string[]>(sol.capabilities, []),
      applicableIndustries: safeJsonParse<string[]>(sol.applicableIndustries, []),
      benefits: safeJsonParse<string[]>(sol.benefits, []),
      integrationInfo: sol.integrationInfo,
      featuredImage: sol.featuredImage,
      relatedSolutionSlugs: safeJsonParse<string[]>(sol.relatedSolutionSlugs, []),
      requiresReview: sol.requiresReview,
      reviewNote: sol.reviewNote,
      status: sol.status,
      isFeatured: sol.isFeatured,
      sortOrder: sol.sortOrder,
      seoTitle: sol.seoTitle,
      seoDescription: sol.seoDescription,
    })),
  }));
}

export async function getFeaturedAISolutions(limit = 6): Promise<ParsedAISolution[]> {
  const rows = await prisma.aISolution.findMany({
    where: { status: "PUBLISHED", isFeatured: true },
    include: { category: true },
    orderBy: { sortOrder: "asc" },
    take: limit,
  });

  return rows.map((sol) => ({
    id: sol.id,
    name: sol.name,
    slug: sol.slug,
    categoryId: sol.categoryId,
    categoryCode: sol.category.code,
    categoryName: sol.category.name,
    categorySlug: sol.category.slug,
    shortDescription: sol.shortDescription,
    overview: sol.overview,
    problemStatement: sol.problemStatement,
    howItWorks: sol.howItWorks,
    capabilities: safeJsonParse<string[]>(sol.capabilities, []),
    applicableIndustries: safeJsonParse<string[]>(sol.applicableIndustries, []),
    benefits: safeJsonParse<string[]>(sol.benefits, []),
    integrationInfo: sol.integrationInfo,
    featuredImage: sol.featuredImage,
    relatedSolutionSlugs: safeJsonParse<string[]>(sol.relatedSolutionSlugs, []),
    requiresReview: sol.requiresReview,
    reviewNote: sol.reviewNote,
    status: sol.status,
    isFeatured: sol.isFeatured,
    sortOrder: sol.sortOrder,
    seoTitle: sol.seoTitle,
    seoDescription: sol.seoDescription,
  }));
}

export async function getAISolutionBySlug(
  slug: string,
  includeDrafts = false
): Promise<ParsedAISolution | null> {
  const sol = await prisma.aISolution.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!sol) return null;
  if (!includeDrafts && sol.status !== "PUBLISHED") return null;

  return {
    id: sol.id,
    name: sol.name,
    slug: sol.slug,
    categoryId: sol.categoryId,
    categoryCode: sol.category.code,
    categoryName: sol.category.name,
    categorySlug: sol.category.slug,
    shortDescription: sol.shortDescription,
    overview: sol.overview,
    problemStatement: sol.problemStatement,
    howItWorks: sol.howItWorks,
    capabilities: safeJsonParse<string[]>(sol.capabilities, []),
    applicableIndustries: safeJsonParse<string[]>(sol.applicableIndustries, []),
    benefits: safeJsonParse<string[]>(sol.benefits, []),
    integrationInfo: sol.integrationInfo,
    featuredImage: sol.featuredImage,
    relatedSolutionSlugs: safeJsonParse<string[]>(sol.relatedSolutionSlugs, []),
    requiresReview: sol.requiresReview,
    reviewNote: sol.reviewNote,
    status: sol.status,
    isFeatured: sol.isFeatured,
    sortOrder: sol.sortOrder,
    seoTitle: sol.seoTitle,
    seoDescription: sol.seoDescription,
  };
}

export async function getServices(options?: {
  featuredOnly?: boolean;
  includeDrafts?: boolean;
  limit?: number;
}): Promise<ParsedService[]> {
  const where: Record<string, unknown> = {};
  if (!options?.includeDrafts) {
    where.status = "PUBLISHED";
  }
  if (options?.featuredOnly) {
    where.isFeatured = true;
  }

  const rows = await prisma.service.findMany({
    where,
    orderBy: { sortOrder: "asc" },
    ...(options?.limit ? { take: options.limit } : {}),
  });

  return rows.map((s) => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    shortDescription: s.shortDescription,
    longDescription: s.longDescription,
    icon: s.icon,
    coverImage: s.coverImage,
    features: safeJsonParse<string[]>(s.features, []),
    capabilities: safeJsonParse<string[]>(s.capabilities, []),
    applications: safeJsonParse<string[]>(s.applications, []),
    industries: safeJsonParse<string[]>(s.industries, []),
    relatedServiceSlugs: safeJsonParse<string[]>(s.relatedServiceSlugs, []),
    isFeatured: s.isFeatured,
    status: s.status,
    sortOrder: s.sortOrder,
    seoTitle: s.seoTitle,
    seoDescription: s.seoDescription,
  }));
}

export async function getServiceBySlug(
  slug: string,
  includeDrafts = false
): Promise<ParsedService | null> {
  const s = await prisma.service.findUnique({ where: { slug } });
  if (!s) return null;
  if (!includeDrafts && s.status !== "PUBLISHED") return null;

  return {
    id: s.id,
    name: s.name,
    slug: s.slug,
    shortDescription: s.shortDescription,
    longDescription: s.longDescription,
    icon: s.icon,
    coverImage: s.coverImage,
    features: safeJsonParse<string[]>(s.features, []),
    capabilities: safeJsonParse<string[]>(s.capabilities, []),
    applications: safeJsonParse<string[]>(s.applications, []),
    industries: safeJsonParse<string[]>(s.industries, []),
    relatedServiceSlugs: safeJsonParse<string[]>(s.relatedServiceSlugs, []),
    isFeatured: s.isFeatured,
    status: s.status,
    sortOrder: s.sortOrder,
    seoTitle: s.seoTitle,
    seoDescription: s.seoDescription,
  };
}

export async function getPublishedIndustries() {
  const rows = await prisma.industry.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { sortOrder: "asc" },
  });
  return rows.map((ind) => ({
    ...ind,
    applications: safeJsonParse<string[]>(ind.applications, []),
  }));
}

export async function getPublishedProjects() {
  const rows = await prisma.project.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { sortOrder: "asc" },
  });
  return rows.map((proj) => ({
    ...proj,
    solutionsImplemented: safeJsonParse<string[]>(proj.solutionsImplemented, []),
  }));
}

export async function getPublishedTestimonials() {
  return prisma.testimonial.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPublishedBrands() {
  return prisma.brand.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getAdminDashboardStats() {
  const [
    totalProducts,
    publishedProducts,
    totalAICategories,
    totalAISolutions,
    publishedAISolutions,
    totalServices,
    publishedServices,
    newEnquiries,
    totalEnquiries,
    publishedTestimonials,
    publishedBrands,
    recentEnquiries,
    enquiryGroups,
    recentAuditLogs,
  ] = await Promise.all([
    prisma.product.count({ where: { status: { not: "ARCHIVED" } } }),
    prisma.product.count({ where: { status: "PUBLISHED" } }),
    prisma.aISolutionCategory.count(),
    prisma.aISolution.count({ where: { status: { not: "ARCHIVED" } } }),
    prisma.aISolution.count({ where: { status: "PUBLISHED" } }),
    prisma.service.count({ where: { status: { not: "ARCHIVED" } } }),
    prisma.service.count({ where: { status: "PUBLISHED" } }),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.enquiry.count(),
    prisma.testimonial.count({ where: { status: "PUBLISHED" } }),
    prisma.brand.count({ where: { status: "PUBLISHED" } }),
    prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        product: { select: { name: true, slug: true } },
        aiSolution: { select: { name: true, slug: true } },
        service: { select: { name: true, slug: true } },
      },
    }),
    prisma.enquiry.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  const statusBreakdown: Record<string, number> = {
    NEW: 0,
    CONTACTED: 0,
    IN_PROGRESS: 0,
    QUOTED: 0,
    CLOSED: 0,
    SPAM: 0,
  };
  for (const g of enquiryGroups) {
    statusBreakdown[g.status] = g._count.status;
  }

  return {
    totalProducts,
    publishedProducts,
    totalAICategories,
    totalAISolutions,
    publishedAISolutions,
    totalServices,
    publishedServices,
    newEnquiries,
    totalEnquiries,
    publishedTestimonials,
    publishedBrands,
    recentEnquiries,
    statusBreakdown,
    recentAuditLogs,
  };
}

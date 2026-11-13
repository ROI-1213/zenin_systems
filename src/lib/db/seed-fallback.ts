import {
  CORE_SOLUTION_CATEGORIES,
  WIDER_PORTFOLIO_CATEGORIES,
  INITIAL_PRODUCTS,
  AI_SOLUTION_CATEGORIES,
  AI_SOLUTIONS_SEED,
  INITIAL_SERVICES,
  INITIAL_INDUSTRIES,
  INITIAL_SITE_SETTINGS,
  INITIAL_PAGE_CONTENTS,
} from "./seed-data";
import type { ParsedAISolution, ParsedProduct, ParsedService } from "./queries";
import { safeJsonParse } from "@/lib/utilities";

const now = new Date("2026-01-01T00:00:00Z");

export function getFallbackSiteSettingsMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const s of INITIAL_SITE_SETTINGS) {
    map[s.key] = s.value;
  }
  return map;
}

export function getFallbackPageContentBlock<T>(
  pageKey: string,
  sectionKey: string,
  fallback: T
): { title: string; subtitle: string; data: T } {
  const rec = INITIAL_PAGE_CONTENTS.find(
    (c) => c.pageKey === pageKey && c.sectionKey === sectionKey
  );
  if (!rec) {
    return { title: "", subtitle: "", data: fallback };
  }
  return {
    title: rec.title || "",
    subtitle: rec.subtitle || "",
    data: safeJsonParse<T>(rec.content, fallback),
  };
}

export function getFallbackProductCategories(filter?: {
  isCoreSolution?: boolean;
}) {
  const all = [...CORE_SOLUTION_CATEGORIES, ...WIDER_PORTFOLIO_CATEGORIES].map(
    (cat) => ({
      id: `seed-cat-${cat.slug}`,
      name: cat.name,
      slug: cat.slug,
      shortDescription: cat.shortDescription,
      description: cat.description,
      icon: cat.icon,
      coverImage: cat.coverImage,
      isCoreSolution: cat.isCoreSolution,
      dedicatedRoute: cat.dedicatedRoute ?? null,
      isFeatured: cat.isFeatured,
      sortOrder: cat.sortOrder,
      status: "PUBLISHED",
      seoTitle: `${cat.name} | Zenin Systems Solutions LLP`,
      seoDescription: cat.shortDescription,
      createdAt: now,
      updatedAt: now,
    })
  );

  if (typeof filter?.isCoreSolution === "boolean") {
    return all.filter((c) => c.isCoreSolution === filter.isCoreSolution);
  }
  return all;
}

export function getFallbackProducts(options?: {
  categorySlug?: string;
  featuredOnly?: boolean;
}): ParsedProduct[] {
  const allCats = [...CORE_SOLUTION_CATEGORIES, ...WIDER_PORTFOLIO_CATEGORIES];
  return INITIAL_PRODUCTS.filter((p) => {
    if (options?.featuredOnly && !p.isFeatured) return false;
    if (options?.categorySlug && p.categorySlug !== options.categorySlug) {
      return false;
    }
    return true;
  }).map((p) => {
    const cat = allCats.find((c) => c.slug === p.categorySlug);
    return {
      id: `seed-prod-${p.slug}`,
      name: p.name,
      slug: p.slug,
      shortDescription: p.shortDescription,
      description: p.description,
      categoryId: `seed-cat-${p.categorySlug}`,
      categoryName: cat?.name || p.categorySlug,
      categorySlug: p.categorySlug,
      features: p.features,
      applications: p.applications,
      technicalSpecifications: p.technicalSpecifications,
      integrationCapabilities: p.integrationCapabilities,
      featuredImage: p.featuredImage,
      status: "PUBLISHED",
      isFeatured: p.isFeatured,
      requiresReview: false,
      sortOrder: p.sortOrder,
      seoTitle: `${p.name} | Zenin Systems Solutions LLP`,
      seoDescription: p.shortDescription,
    };
  });
}

export function getFallbackAICategoriesWithSolutions() {
  return AI_SOLUTION_CATEGORIES.map((cat) => {
    const solutions: ParsedAISolution[] = AI_SOLUTIONS_SEED.filter(
      (s) => s.categoryCode === cat.code
    ).map((sol) => ({
      id: `seed-ai-${sol.slug}`,
      name: sol.name,
      slug: sol.slug,
      categoryId: `seed-ai-cat-${cat.slug}`,
      categoryCode: cat.code,
      categoryName: cat.name,
      categorySlug: cat.slug,
      shortDescription: sol.shortDescription,
      overview: sol.overview,
      problemStatement: sol.problemStatement,
      howItWorks: sol.howItWorks,
      capabilities: sol.capabilities,
      applicableIndustries: sol.applicableIndustries,
      benefits: sol.benefits,
      integrationInfo: sol.integrationInfo,
      featuredImage: sol.featuredImage,
      relatedSolutionSlugs: sol.relatedSolutionSlugs,
      requiresReview: sol.requiresReview ?? false,
      reviewNote: sol.reviewNote ?? null,
      status: "PUBLISHED",
      isFeatured: sol.isFeatured,
      sortOrder: sol.sortOrder,
      seoTitle: `${sol.name} | AI Video Analytics | Zenin Systems`,
      seoDescription: sol.shortDescription,
    }));

    return {
      id: `seed-ai-cat-${cat.slug}`,
      code: cat.code,
      name: cat.name,
      slug: cat.slug,
      shortDescription: cat.shortDescription,
      description: cat.description,
      icon: cat.icon,
      sortOrder: cat.sortOrder,
      status: "PUBLISHED",
      createdAt: now,
      updatedAt: now,
      solutions,
    };
  });
}

export function getFallbackFeaturedAISolutions(limit = 6): ParsedAISolution[] {
  const all = getFallbackAICategoriesWithSolutions().flatMap((c) => c.solutions);
  return all.filter((s) => s.isFeatured).slice(0, limit);
}

export function getFallbackAISolutionBySlug(
  slug: string
): ParsedAISolution | null {
  const all = getFallbackAICategoriesWithSolutions().flatMap((c) => c.solutions);
  return all.find((s) => s.slug === slug) ?? null;
}

export function getFallbackServices(options?: {
  featuredOnly?: boolean;
  limit?: number;
}): ParsedService[] {
  let list = INITIAL_SERVICES.filter((s) =>
    options?.featuredOnly ? s.isFeatured : true
  ).map((s) => ({
    id: `seed-svc-${s.slug}`,
    name: s.name,
    slug: s.slug,
    shortDescription: s.shortDescription,
    longDescription: s.longDescription,
    icon: s.icon,
    coverImage: s.coverImage,
    features: s.features,
    capabilities: s.capabilities,
    applications: s.applications,
    industries: s.industries,
    relatedServiceSlugs: s.relatedServiceSlugs,
    isFeatured: s.isFeatured,
    status: "PUBLISHED",
    sortOrder: s.sortOrder,
    seoTitle: `${s.name} | Zenin Systems Solutions LLP`,
    seoDescription: s.shortDescription,
  }));

  if (options?.limit) {
    list = list.slice(0, options.limit);
  }
  return list;
}

export function getFallbackServiceBySlug(slug: string): ParsedService | null {
  return getFallbackServices().find((s) => s.slug === slug) ?? null;
}

export function getFallbackIndustries() {
  return INITIAL_INDUSTRIES.map((ind) => ({
    id: `seed-ind-${ind.slug}`,
    name: ind.name,
    slug: ind.slug,
    shortDescription: ind.shortDescription,
    icon: ind.icon,
    coverImage: ind.coverImage ?? null,
    applications: ind.applications,
    sortOrder: ind.sortOrder,
    status: "PUBLISHED",
    createdAt: now,
    updatedAt: now,
  }));
}

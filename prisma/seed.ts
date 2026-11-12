import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  CORE_SOLUTION_CATEGORIES,
  WIDER_PORTFOLIO_CATEGORIES,
  INITIAL_PRODUCTS,
  AI_SOLUTION_CATEGORIES,
  AI_SOLUTIONS_SEED,
  INITIAL_SERVICES,
  INITIAL_INDUSTRIES,
  INITIAL_PAGE_CONTENTS,
  INITIAL_SITE_SETTINGS,
} from "../src/lib/db/seed-data";

const prisma = new PrismaClient();

export async function runSeed() {
  console.log("🌱 Starting Zenin Systems Solutions LLP database seed...");

  // 1. Seed Product Categories (4 Core + 15 Wider Portfolio)
  const allProductCategories = [...CORE_SOLUTION_CATEGORIES, ...WIDER_PORTFOLIO_CATEGORIES];
  const categoryMap = new Map<string, string>();

  for (const cat of allProductCategories) {
    const upserted = await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        shortDescription: cat.shortDescription,
        description: cat.description,
        icon: cat.icon,
        coverImage: cat.coverImage,
        isCoreSolution: cat.isCoreSolution,
        dedicatedRoute: cat.dedicatedRoute ?? null,
        isFeatured: cat.isFeatured,
        sortOrder: cat.sortOrder,
        status: "PUBLISHED",
      },
      create: {
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
      },
    });
    categoryMap.set(cat.slug, upserted.id);
  }
  console.log(`✅ Seeded ${allProductCategories.length} product & solution categories.`);

  // 2. Seed Initial Products
  for (const prod of INITIAL_PRODUCTS) {
    const categoryId = categoryMap.get(prod.categorySlug);
    if (!categoryId) continue;

    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        shortDescription: prod.shortDescription,
        description: prod.description,
        categoryId,
        features: JSON.stringify(prod.features),
        applications: JSON.stringify(prod.applications),
        technicalSpecifications: JSON.stringify(prod.technicalSpecifications),
        integrationCapabilities: JSON.stringify(prod.integrationCapabilities),
        featuredImage: prod.featuredImage,
        isFeatured: prod.isFeatured,
        requiresReview: prod.requiresReview,
        sortOrder: prod.sortOrder,
        status: "PUBLISHED",
      },
      create: {
        name: prod.name,
        slug: prod.slug,
        shortDescription: prod.shortDescription,
        description: prod.description,
        categoryId,
        features: JSON.stringify(prod.features),
        applications: JSON.stringify(prod.applications),
        technicalSpecifications: JSON.stringify(prod.technicalSpecifications),
        integrationCapabilities: JSON.stringify(prod.integrationCapabilities),
        featuredImage: prod.featuredImage,
        isFeatured: prod.isFeatured,
        requiresReview: prod.requiresReview,
        sortOrder: prod.sortOrder,
        status: "PUBLISHED",
        seoTitle: `${prod.name} | Zenin Systems Solutions LLP`,
        seoDescription: prod.shortDescription,
      },
    });
  }
  console.log(`✅ Seeded ${INITIAL_PRODUCTS.length} initial B2B products.`);

  // 3. Seed 5 AI Solution Categories
  const aiCategoryMap = new Map<string, string>();
  for (const aiCat of AI_SOLUTION_CATEGORIES) {
    const upserted = await prisma.aISolutionCategory.upsert({
      where: { code: aiCat.code },
      update: {
        name: aiCat.name,
        slug: aiCat.slug,
        shortDescription: aiCat.shortDescription,
        description: aiCat.description,
        icon: aiCat.icon,
        sortOrder: aiCat.sortOrder,
        status: "PUBLISHED",
      },
      create: {
        code: aiCat.code,
        name: aiCat.name,
        slug: aiCat.slug,
        shortDescription: aiCat.shortDescription,
        description: aiCat.description,
        icon: aiCat.icon,
        sortOrder: aiCat.sortOrder,
        status: "PUBLISHED",
        seoTitle: `${aiCat.name} — AI Video Analytics | Zenin Systems`,
        seoDescription: aiCat.shortDescription,
      },
    });
    aiCategoryMap.set(aiCat.code, upserted.id);
  }
  console.log(`✅ Seeded ${AI_SOLUTION_CATEGORIES.length} AI video analytics categories.`);

  // 4. Seed All 21 AI Video Analytics Applications
  for (const sol of AI_SOLUTIONS_SEED) {
    const categoryId = aiCategoryMap.get(sol.categoryCode);
    if (!categoryId) continue;

    await prisma.aISolution.upsert({
      where: { slug: sol.slug },
      update: {
        name: sol.name,
        categoryId,
        shortDescription: sol.shortDescription,
        overview: sol.overview,
        problemStatement: sol.problemStatement,
        howItWorks: sol.howItWorks,
        capabilities: JSON.stringify(sol.capabilities),
        applicableIndustries: JSON.stringify(sol.applicableIndustries),
        benefits: JSON.stringify(sol.benefits),
        integrationInfo: sol.integrationInfo,
        featuredImage: sol.featuredImage,
        relatedSolutionSlugs: JSON.stringify(sol.relatedSolutionSlugs),
        requiresReview: sol.requiresReview ?? false,
        reviewNote: sol.reviewNote ?? null,
        isFeatured: sol.isFeatured,
        sortOrder: sol.sortOrder,
        status: "PUBLISHED",
      },
      create: {
        name: sol.name,
        slug: sol.slug,
        categoryId,
        shortDescription: sol.shortDescription,
        overview: sol.overview,
        problemStatement: sol.problemStatement,
        howItWorks: sol.howItWorks,
        capabilities: JSON.stringify(sol.capabilities),
        applicableIndustries: JSON.stringify(sol.applicableIndustries),
        benefits: JSON.stringify(sol.benefits),
        integrationInfo: sol.integrationInfo,
        featuredImage: sol.featuredImage,
        relatedSolutionSlugs: JSON.stringify(sol.relatedSolutionSlugs),
        requiresReview: sol.requiresReview ?? false,
        reviewNote: sol.reviewNote ?? null,
        isFeatured: sol.isFeatured,
        sortOrder: sol.sortOrder,
        status: "PUBLISHED",
        seoTitle: `${sol.name} — AI Video Analytics | Zenin Systems Solutions LLP`,
        seoDescription: sol.shortDescription,
      },
    });
  }
  console.log(`✅ Seeded ${AI_SOLUTIONS_SEED.length} AI video analytics applications.`);

  // 5. Seed All 12 Service Categories
  for (const svc of INITIAL_SERVICES) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {
        name: svc.name,
        shortDescription: svc.shortDescription,
        longDescription: svc.longDescription,
        icon: svc.icon,
        coverImage: svc.coverImage,
        features: JSON.stringify(svc.features),
        capabilities: JSON.stringify(svc.capabilities),
        applications: JSON.stringify(svc.applications),
        industries: JSON.stringify(svc.industries),
        relatedServiceSlugs: JSON.stringify(svc.relatedServiceSlugs),
        isFeatured: svc.isFeatured,
        sortOrder: svc.sortOrder,
        status: "PUBLISHED",
      },
      create: {
        name: svc.name,
        slug: svc.slug,
        shortDescription: svc.shortDescription,
        longDescription: svc.longDescription,
        icon: svc.icon,
        coverImage: svc.coverImage,
        features: JSON.stringify(svc.features),
        capabilities: JSON.stringify(svc.capabilities),
        applications: JSON.stringify(svc.applications),
        industries: JSON.stringify(svc.industries),
        relatedServiceSlugs: JSON.stringify(svc.relatedServiceSlugs),
        isFeatured: svc.isFeatured,
        sortOrder: svc.sortOrder,
        status: "PUBLISHED",
        seoTitle: `${svc.name} | Zenin Systems Solutions LLP`,
        seoDescription: svc.shortDescription,
      },
    });
  }
  console.log(`✅ Seeded ${INITIAL_SERVICES.length} engineering service categories.`);

  // 6. Seed 6 Industries Served
  for (const ind of INITIAL_INDUSTRIES) {
    await prisma.industry.upsert({
      where: { slug: ind.slug },
      update: {
        name: ind.name,
        shortDescription: ind.shortDescription,
        applications: JSON.stringify(ind.applications),
        icon: ind.icon,
        coverImage: ind.coverImage,
        sortOrder: ind.sortOrder,
        status: "PUBLISHED",
      },
      create: {
        name: ind.name,
        slug: ind.slug,
        shortDescription: ind.shortDescription,
        applications: JSON.stringify(ind.applications),
        icon: ind.icon,
        coverImage: ind.coverImage,
        sortOrder: ind.sortOrder,
        status: "PUBLISHED",
      },
    });
  }
  console.log(`✅ Seeded ${INITIAL_INDUSTRIES.length} industrial verticals.`);

  // 7. Seed Page Content
  for (const block of INITIAL_PAGE_CONTENTS) {
    await prisma.pageContent.upsert({
      where: {
        pageKey_sectionKey: {
          pageKey: block.pageKey,
          sectionKey: block.sectionKey,
        },
      },
      update: {
        title: block.title,
        subtitle: block.subtitle,
        content: block.content,
      },
      create: {
        pageKey: block.pageKey,
        sectionKey: block.sectionKey,
        title: block.title,
        subtitle: block.subtitle,
        content: block.content,
      },
    });
  }
  console.log(`✅ Seeded ${INITIAL_PAGE_CONTENTS.length} CMS page content blocks.`);

  // 8. Seed Site Settings
  for (const setting of INITIAL_SITE_SETTINGS) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {
        value: setting.value,
        group: setting.group,
        description: setting.description,
      },
      create: {
        key: setting.key,
        value: setting.value,
        group: setting.group,
        description: setting.description,
      },
    });
  }
  console.log(`✅ Seeded ${INITIAL_SITE_SETTINGS.length} site settings.`);

  // 9. Bootstrap Initial SUPER_ADMIN User from environment variables
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD?.trim();
  const adminName = process.env.INITIAL_ADMIN_NAME?.trim() || "Super Administrator";

  if (adminEmail && adminPassword && adminPassword.length >= 8) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        name: adminName,
        role: "SUPER_ADMIN",
        isActive: true,
      },
      create: {
        email: adminEmail,
        name: adminName,
        passwordHash,
        role: "SUPER_ADMIN",
        isActive: true,
      },
    });
    console.log(`✅ Bootstrapped SUPER_ADMIN account for ${adminEmail}.`);
  } else {
    console.log(
      "ℹ️ INITIAL_ADMIN_EMAIL / INITIAL_ADMIN_PASSWORD not set or < 8 chars; skipping admin user bootstrap."
    );
  }

  console.log("🎉 Zenin Systems database seed complete!");
}

if (require.main === module) {
  runSeed()
    .catch((err) => {
      console.error("❌ Seed error:", err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import {
  checkRateLimit,
  createAdminSession,
  destroyAdminSession,
  getAdminSession,
  hashPassword,
  logAuditEvent,
  requireAdmin,
  requireSuperAdmin,
  verifyPassword,
} from "@/lib/auth";
import {
  aiSolutionSchema,
  brandSchema,
  createAdminUserSchema,
  enquiryStatusUpdateSchema,
  industrySchema,
  loginSchema,
  passwordChangeSchema,
  productCategorySchema,
  productSchema,
  projectSchema,
  serviceSchema,
  testimonialSchema,
} from "@/lib/validations";
import { sanitizePlainText, slugify } from "@/lib/utilities";

function safeRevalidate(paths: string[]) {
  try {
    for (const p of paths) {
      revalidatePath(p);
    }
  } catch {
    // Safe outside Next.js request context (e.g., during automated tests)
  }
}

export async function loginAdminAction(rawInput: {
  email: string;
  password: string;
}): Promise<{ success: boolean; error?: string }> {
  const parsed = loginSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { success: false, error: "Invalid email or password format." };
  }

  const email = parsed.data.email.toLowerCase();
  const rate = checkRateLimit(`login:${email}`, 6, 60_000);
  if (!rate.allowed) {
    return {
      success: false,
      error: `Too many login attempts. Please wait ${rate.retryAfterSeconds} seconds.`,
    };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive) {
    await logAuditEvent({
      user: null,
      action: "LOGIN_FAILED",
      entityType: "User",
      details: `Failed login attempt for ${email}`,
    });
    return { success: false, error: "Invalid administrator credentials." };
  }

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) {
    await logAuditEvent({
      user: null,
      action: "LOGIN_FAILED",
      entityType: "User",
      entityId: user.id,
      details: `Invalid password for ${email}`,
    });
    return { success: false, error: "Invalid administrator credentials." };
  }

  const sessionUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: (user.role as "SUPER_ADMIN" | "EDITOR") || "EDITOR",
  };

  await createAdminSession(sessionUser);
  await logAuditEvent({
    user: sessionUser,
    action: "LOGIN_SUCCESS",
    entityType: "User",
    entityId: user.id,
  });

  return { success: true };
}

export async function logoutAdminAction() {
  const user = await getAdminSession();
  if (user) {
    await logAuditEvent({
      user,
      action: "LOGOUT",
      entityType: "User",
      entityId: user.id,
    });
  }
  await destroyAdminSession();
  return { success: true };
}

export async function changeAdminPasswordAction(rawInput: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const sessionUser = await requireAdmin();
  const parsed = passwordChangeSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid password input.",
    };
  }

  const dbUser = await prisma.user.findUnique({ where: { id: sessionUser.id } });
  if (!dbUser) {
    return { success: false, error: "User record not found." };
  }

  const matches = await verifyPassword(parsed.data.currentPassword, dbUser.passwordHash);
  if (!matches) {
    return { success: false, error: "Current password is incorrect." };
  }

  const newHash = await hashPassword(parsed.data.newPassword);
  await prisma.user.update({
    where: { id: sessionUser.id },
    data: { passwordHash: newHash },
  });

  await logAuditEvent({
    user: sessionUser,
    action: "PASSWORD_CHANGE",
    entityType: "User",
    entityId: sessionUser.id,
  });

  return { success: true };
}

export async function createAdminUserAction(rawInput: {
  name: string;
  email: string;
  password: string;
  role: "SUPER_ADMIN" | "EDITOR";
}) {
  const superAdmin = await requireSuperAdmin();
  const parsed = createAdminUserSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid user fields.",
    };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: "An administrator with this email already exists." };
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const created = await prisma.user.create({
    data: {
      name: sanitizePlainText(parsed.data.name),
      email,
      passwordHash,
      role: parsed.data.role,
      isActive: true,
    },
  });

  await logAuditEvent({
    user: superAdmin,
    action: "CREATE_ADMIN_USER",
    entityType: "User",
    entityId: created.id,
    details: `Created ${created.role} account for ${created.email}`,
  });

  safeRevalidate(["/admin/profile"]);
  return { success: true, userId: created.id };
}

// ============================================================================
// PRODUCT & CATEGORY CRUD
// ============================================================================

export async function saveProductCategoryAction(rawInput: unknown) {
  const admin = await requireAdmin();
  const parsed = productCategorySchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid category fields.",
    };
  }

  const d = parsed.data;
  const slug = slugify(d.slug || d.name);

  if (d.id) {
    const updated = await prisma.productCategory.update({
      where: { id: d.id },
      data: {
        name: sanitizePlainText(d.name),
        slug,
        shortDescription: sanitizePlainText(d.shortDescription),
        description: sanitizePlainText(d.description),
        icon: d.icon || "Shield",
        coverImage: d.coverImage || null,
        isCoreSolution: d.isCoreSolution,
        dedicatedRoute: d.dedicatedRoute || null,
        status: d.status,
        isFeatured: d.isFeatured,
        sortOrder: d.sortOrder,
        seoTitle: d.seoTitle || null,
        seoDescription: d.seoDescription || null,
      },
    });
    await logAuditEvent({
      user: admin,
      action: "UPDATE_PRODUCT_CATEGORY",
      entityType: "ProductCategory",
      entityId: updated.id,
      details: updated.name,
    });
    safeRevalidate(["/", "/products", "/admin/categories", "/admin/products"]);
    return { success: true, category: updated };
  }

  const created = await prisma.productCategory.create({
    data: {
      name: sanitizePlainText(d.name),
      slug,
      shortDescription: sanitizePlainText(d.shortDescription),
      description: sanitizePlainText(d.description),
      icon: d.icon || "Shield",
      coverImage: d.coverImage || null,
      isCoreSolution: d.isCoreSolution,
      dedicatedRoute: d.dedicatedRoute || null,
      status: d.status,
      isFeatured: d.isFeatured,
      sortOrder: d.sortOrder,
      seoTitle: d.seoTitle || null,
      seoDescription: d.seoDescription || null,
    },
  });

  await logAuditEvent({
    user: admin,
    action: "CREATE_PRODUCT_CATEGORY",
    entityType: "ProductCategory",
    entityId: created.id,
    details: created.name,
  });

  safeRevalidate(["/", "/products", "/admin/categories", "/admin/products"]);
  return { success: true, category: created };
}

export async function saveProductAction(rawInput: unknown) {
  const admin = await requireAdmin();
  const parsed = productSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid product fields.",
    };
  }

  const d = parsed.data;
  const slug = slugify(d.slug || d.name);

  // Check unique slug collision
  const existingSlug = await prisma.product.findUnique({ where: { slug } });
  if (existingSlug && existingSlug.id !== d.id) {
    return {
      success: false,
      error: `Another product already uses the slug "${slug}". Please choose a unique slug.`,
    };
  }

  const payload = {
    name: sanitizePlainText(d.name),
    slug,
    shortDescription: sanitizePlainText(d.shortDescription),
    description: sanitizePlainText(d.description),
    categoryId: d.categoryId,
    subcategoryId: d.subcategoryId || null,
    features: JSON.stringify(d.features.map(sanitizePlainText)),
    applications: JSON.stringify(d.applications.map(sanitizePlainText)),
    technicalSpecifications: JSON.stringify(d.technicalSpecifications),
    integrationCapabilities: JSON.stringify(
      d.integrationCapabilities.map(sanitizePlainText)
    ),
    featuredImage: d.featuredImage || null,
    status: d.status,
    isFeatured: d.isFeatured,
    requiresReview: d.requiresReview,
    sortOrder: d.sortOrder,
    seoTitle: d.seoTitle ? sanitizePlainText(d.seoTitle) : null,
    seoDescription: d.seoDescription ? sanitizePlainText(d.seoDescription) : null,
  };

  if (d.id) {
    const updated = await prisma.product.update({
      where: { id: d.id },
      data: payload,
    });
    await logAuditEvent({
      user: admin,
      action: "UPDATE_PRODUCT",
      entityType: "Product",
      entityId: updated.id,
      details: `${updated.name} (${updated.status})`,
    });
    safeRevalidate([
      "/",
      "/products",
      `/products/${updated.slug}`,
      "/products/cctv-surveillance",
      "/products/video-management",
      "/products/intelligent-automation",
      "/admin/products",
      "/admin/dashboard",
    ]);
    return { success: true, product: updated };
  }

  const created = await prisma.product.create({ data: payload });
  await logAuditEvent({
    user: admin,
    action: "CREATE_PRODUCT",
    entityType: "Product",
    entityId: created.id,
    details: `${created.name} (${created.status})`,
  });

  safeRevalidate([
    "/",
    "/products",
    `/products/${created.slug}`,
    "/products/cctv-surveillance",
    "/products/video-management",
    "/products/intelligent-automation",
    "/admin/products",
    "/admin/dashboard",
  ]);
  return { success: true, product: created };
}

export async function deleteOrArchiveProductAction(productId: string) {
  const admin = await requireAdmin();
  const enquiryCount = await prisma.enquiry.count({ where: { productId } });

  if (enquiryCount > 0) {
    // Soft-archive if referenced by existing enquiries per Phase 19
    const archived = await prisma.product.update({
      where: { id: productId },
      data: { status: "ARCHIVED", isFeatured: false },
    });
    await logAuditEvent({
      user: admin,
      action: "ARCHIVE_PRODUCT",
      entityType: "Product",
      entityId: productId,
      details: `Archived "${archived.name}" (referenced by ${enquiryCount} enquiries)`,
    });
    safeRevalidate(["/products", "/admin/products", "/admin/dashboard"]);
    return { success: true, mode: "ARCHIVED" as const };
  }

  const deleted = await prisma.product.delete({ where: { id: productId } });
  await logAuditEvent({
    user: admin,
    action: "DELETE_PRODUCT",
    entityType: "Product",
    entityId: productId,
    details: `Deleted "${deleted.name}"`,
  });
  safeRevalidate(["/products", "/admin/products", "/admin/dashboard"]);
  return { success: true, mode: "DELETED" as const };
}

// ============================================================================
// AI SOLUTIONS CRUD
// ============================================================================

export async function saveAISolutionAction(rawInput: unknown) {
  const admin = await requireAdmin();
  const parsed = aiSolutionSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid AI solution fields.",
    };
  }

  const d = parsed.data;
  const slug = slugify(d.slug || d.name);

  const existingSlug = await prisma.aISolution.findUnique({ where: { slug } });
  if (existingSlug && existingSlug.id !== d.id) {
    return {
      success: false,
      error: `Another AI solution already uses the slug "${slug}".`,
    };
  }

  const payload = {
    name: sanitizePlainText(d.name),
    slug,
    categoryId: d.categoryId,
    shortDescription: sanitizePlainText(d.shortDescription),
    overview: sanitizePlainText(d.overview),
    problemStatement: sanitizePlainText(d.problemStatement),
    howItWorks: sanitizePlainText(d.howItWorks),
    capabilities: JSON.stringify(d.capabilities.map(sanitizePlainText)),
    applicableIndustries: JSON.stringify(
      d.applicableIndustries.map(sanitizePlainText)
    ),
    benefits: JSON.stringify(d.benefits.map(sanitizePlainText)),
    integrationInfo: d.integrationInfo ? sanitizePlainText(d.integrationInfo) : null,
    featuredImage: d.featuredImage || null,
    relatedSolutionSlugs: JSON.stringify(d.relatedSolutionSlugs),
    requiresReview: d.requiresReview,
    reviewNote: d.reviewNote ? sanitizePlainText(d.reviewNote) : null,
    status: d.status,
    isFeatured: d.isFeatured,
    sortOrder: d.sortOrder,
    seoTitle: d.seoTitle ? sanitizePlainText(d.seoTitle) : null,
    seoDescription: d.seoDescription ? sanitizePlainText(d.seoDescription) : null,
  };

  if (d.id) {
    const updated = await prisma.aISolution.update({
      where: { id: d.id },
      data: payload,
    });
    await logAuditEvent({
      user: admin,
      action: "UPDATE_AI_SOLUTION",
      entityType: "AISolution",
      entityId: updated.id,
      details: `${updated.name} (${updated.status})`,
    });
    safeRevalidate([
      "/",
      "/products/ai-video-analytics",
      `/products/ai-video-analytics/${updated.slug}`,
      "/admin/ai-solutions",
    ]);
    return { success: true, solution: updated };
  }

  const created = await prisma.aISolution.create({ data: payload });
  await logAuditEvent({
    user: admin,
    action: "CREATE_AI_SOLUTION",
    entityType: "AISolution",
    entityId: created.id,
    details: `${created.name} (${created.status})`,
  });
  safeRevalidate([
    "/",
    "/products/ai-video-analytics",
    `/products/ai-video-analytics/${created.slug}`,
    "/admin/ai-solutions",
  ]);
  return { success: true, solution: created };
}

// ============================================================================
// SERVICES CRUD
// ============================================================================

export async function saveServiceAction(rawInput: unknown) {
  const admin = await requireAdmin();
  const parsed = serviceSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid service fields.",
    };
  }

  const d = parsed.data;
  const slug = slugify(d.slug || d.name);

  const existingSlug = await prisma.service.findUnique({ where: { slug } });
  if (existingSlug && existingSlug.id !== d.id) {
    return {
      success: false,
      error: `Another service already uses the slug "${slug}".`,
    };
  }

  const payload = {
    name: sanitizePlainText(d.name),
    slug,
    shortDescription: sanitizePlainText(d.shortDescription),
    longDescription: sanitizePlainText(d.longDescription),
    icon: d.icon || "Wrench",
    coverImage: d.coverImage || null,
    features: JSON.stringify(d.features.map(sanitizePlainText)),
    capabilities: JSON.stringify(d.capabilities.map(sanitizePlainText)),
    applications: JSON.stringify(d.applications.map(sanitizePlainText)),
    industries: JSON.stringify(d.industries.map(sanitizePlainText)),
    relatedServiceSlugs: JSON.stringify(d.relatedServiceSlugs),
    isFeatured: d.isFeatured,
    status: d.status,
    sortOrder: d.sortOrder,
    seoTitle: d.seoTitle ? sanitizePlainText(d.seoTitle) : null,
    seoDescription: d.seoDescription ? sanitizePlainText(d.seoDescription) : null,
  };

  if (d.id) {
    const updated = await prisma.service.update({
      where: { id: d.id },
      data: payload,
    });
    await logAuditEvent({
      user: admin,
      action: "UPDATE_SERVICE",
      entityType: "Service",
      entityId: updated.id,
      details: `${updated.name} (${updated.status})`,
    });
    safeRevalidate([
      "/",
      "/services",
      `/services/${updated.slug}`,
      "/admin/services",
      "/admin/dashboard",
    ]);
    return { success: true, service: updated };
  }

  const created = await prisma.service.create({ data: payload });
  await logAuditEvent({
    user: admin,
    action: "CREATE_SERVICE",
    entityType: "Service",
    entityId: created.id,
    details: `${created.name} (${created.status})`,
  });
  safeRevalidate([
    "/",
    "/services",
    `/services/${created.slug}`,
    "/admin/services",
    "/admin/dashboard",
  ]);
  return { success: true, service: created };
}

export async function deleteOrArchiveServiceAction(serviceId: string) {
  const admin = await requireAdmin();
  const enquiryCount = await prisma.enquiry.count({ where: { serviceId } });

  if (enquiryCount > 0) {
    const archived = await prisma.service.update({
      where: { id: serviceId },
      data: { status: "ARCHIVED", isFeatured: false },
    });
    await logAuditEvent({
      user: admin,
      action: "ARCHIVE_SERVICE",
      entityType: "Service",
      entityId: serviceId,
      details: `Archived "${archived.name}"`,
    });
    safeRevalidate(["/", "/services", "/admin/services"]);
    return { success: true, mode: "ARCHIVED" as const };
  }

  const deleted = await prisma.service.delete({ where: { id: serviceId } });
  await logAuditEvent({
    user: admin,
    action: "DELETE_SERVICE",
    entityType: "Service",
    entityId: serviceId,
    details: `Deleted "${deleted.name}"`,
  });
  safeRevalidate(["/", "/services", "/admin/services"]);
  return { success: true, mode: "DELETED" as const };
}

// ============================================================================
// ENQUIRY STATUS & NOTES MANAGEMENT
// ============================================================================

export async function updateEnquiryStatusAction(rawInput: {
  enquiryId: string;
  status: "NEW" | "CONTACTED" | "IN_PROGRESS" | "QUOTED" | "CLOSED" | "SPAM";
  note?: string;
}) {
  const admin = await requireAdmin();
  const parsed = enquiryStatusUpdateSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid status update payload.",
    };
  }

  const { enquiryId, status, note } = parsed.data;

  const updated = await prisma.enquiry.update({
    where: { id: enquiryId },
    data: { status },
  });

  if (note && note.trim().length > 0) {
    await prisma.enquiryNote.create({
      data: {
        enquiryId,
        authorId: admin.id,
        authorName: admin.name,
        note: sanitizePlainText(note),
      },
    });
  }

  await logAuditEvent({
    user: admin,
    action: "UPDATE_ENQUIRY_STATUS",
    entityType: "Enquiry",
    entityId: enquiryId,
    details: `Updated ${updated.referenceCode} to ${status}`,
  });

  safeRevalidate(["/admin/enquiries", "/admin/dashboard"]);
  return { success: true, enquiry: updated };
}

// ============================================================================
// TESTIMONIALS, BRANDS, INDUSTRIES & PROJECTS CRUD
// ============================================================================

export async function saveTestimonialAction(rawInput: unknown) {
  const admin = await requireAdmin();
  const parsed = testimonialSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid testimonial data.",
    };
  }

  const d = parsed.data;
  const payload = {
    clientName: sanitizePlainText(d.clientName),
    companyName: sanitizePlainText(d.companyName),
    designation: d.designation ? sanitizePlainText(d.designation) : null,
    feedback: sanitizePlainText(d.feedback),
    clientImage: d.clientImage || null,
    companyLogo: d.companyLogo || null,
    isFeatured: d.isFeatured,
    status: d.status,
    sortOrder: d.sortOrder,
  };

  const record = d.id
    ? await prisma.testimonial.update({ where: { id: d.id }, data: payload })
    : await prisma.testimonial.create({ data: payload });

  await logAuditEvent({
    user: admin,
    action: d.id ? "UPDATE_TESTIMONIAL" : "CREATE_TESTIMONIAL",
    entityType: "Testimonial",
    entityId: record.id,
    details: `${record.clientName} - ${record.companyName} (${record.status})`,
  });

  safeRevalidate(["/", "/testimonials", "/admin/testimonials", "/admin/dashboard"]);
  return { success: true, testimonial: record };
}

export async function deleteTestimonialAction(id: string) {
  const admin = await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  await logAuditEvent({
    user: admin,
    action: "DELETE_TESTIMONIAL",
    entityType: "Testimonial",
    entityId: id,
  });
  safeRevalidate(["/", "/testimonials", "/admin/testimonials", "/admin/dashboard"]);
  return { success: true };
}

export async function saveBrandAction(rawInput: unknown) {
  const admin = await requireAdmin();
  const parsed = brandSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid brand fields.",
    };
  }

  const d = parsed.data;
  const slug = slugify(d.slug || d.name);

  const payload = {
    name: sanitizePlainText(d.name),
    slug,
    logoUrl: d.logoUrl || null,
    shortDescription: d.shortDescription ? sanitizePlainText(d.shortDescription) : null,
    websiteUrl: d.websiteUrl || null,
    isFeatured: d.isFeatured,
    status: d.status,
    sortOrder: d.sortOrder,
  };

  const record = d.id
    ? await prisma.brand.update({ where: { id: d.id }, data: payload })
    : await prisma.brand.create({ data: payload });

  await logAuditEvent({
    user: admin,
    action: d.id ? "UPDATE_BRAND" : "CREATE_BRAND",
    entityType: "Brand",
    entityId: record.id,
    details: `${record.name} (${record.status})`,
  });

  safeRevalidate(["/", "/brands", "/admin/brands", "/admin/dashboard"]);
  return { success: true, brand: record };
}

export async function deleteBrandAction(id: string) {
  const admin = await requireAdmin();
  await prisma.brand.delete({ where: { id } });
  await logAuditEvent({
    user: admin,
    action: "DELETE_BRAND",
    entityType: "Brand",
    entityId: id,
  });
  safeRevalidate(["/", "/brands", "/admin/brands", "/admin/dashboard"]);
  return { success: true };
}

export async function saveIndustryAction(rawInput: unknown) {
  const admin = await requireAdmin();
  const parsed = industrySchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid industry fields.",
    };
  }

  const d = parsed.data;
  const slug = slugify(d.slug || d.name);
  const payload = {
    name: sanitizePlainText(d.name),
    slug,
    shortDescription: sanitizePlainText(d.shortDescription),
    applications: JSON.stringify(d.applications.map(sanitizePlainText)),
    icon: d.icon || "Factory",
    coverImage: d.coverImage || null,
    status: d.status,
    sortOrder: d.sortOrder,
  };

  const record = d.id
    ? await prisma.industry.update({ where: { id: d.id }, data: payload })
    : await prisma.industry.create({ data: payload });

  await logAuditEvent({
    user: admin,
    action: d.id ? "UPDATE_INDUSTRY" : "CREATE_INDUSTRY",
    entityType: "Industry",
    entityId: record.id,
    details: record.name,
  });

  safeRevalidate(["/", "/about-us", "/admin/industries"]);
  return { success: true, industry: record };
}

export async function saveProjectAction(rawInput: unknown) {
  const admin = await requireAdmin();
  const parsed = projectSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid project fields.",
    };
  }

  const d = parsed.data;
  const slug = slugify(d.slug || d.name);
  const payload = {
    name: sanitizePlainText(d.name),
    slug,
    industry: sanitizePlainText(d.industry),
    shortDescription: sanitizePlainText(d.shortDescription),
    description: sanitizePlainText(d.description),
    solutionsImplemented: JSON.stringify(d.solutionsImplemented.map(sanitizePlainText)),
    coverImage: d.coverImage || null,
    status: d.status,
    isFeatured: d.isFeatured,
    sortOrder: d.sortOrder,
  };

  const record = d.id
    ? await prisma.project.update({ where: { id: d.id }, data: payload })
    : await prisma.project.create({ data: payload });

  await logAuditEvent({
    user: admin,
    action: d.id ? "UPDATE_PROJECT" : "CREATE_PROJECT",
    entityType: "Project",
    entityId: record.id,
    details: `${record.name} (${record.status})`,
  });

  safeRevalidate(["/", "/admin/projects"]);
  return { success: true, project: record };
}

// ============================================================================
// CMS PAGE CONTENT & SITE SETTINGS
// ============================================================================

export async function savePageContentAction(input: {
  pageKey: string;
  sectionKey: string;
  title: string;
  subtitle: string;
  contentObj: Record<string, unknown>;
}) {
  const admin = await requireAdmin();
  const safeTitle = sanitizePlainText(input.title);
  const safeSubtitle = sanitizePlainText(input.subtitle);

  const updated = await prisma.pageContent.upsert({
    where: {
      pageKey_sectionKey: {
        pageKey: input.pageKey,
        sectionKey: input.sectionKey,
      },
    },
    update: {
      title: safeTitle,
      subtitle: safeSubtitle,
      content: JSON.stringify(input.contentObj),
      updatedBy: admin.email,
    },
    create: {
      pageKey: input.pageKey,
      sectionKey: input.sectionKey,
      title: safeTitle,
      subtitle: safeSubtitle,
      content: JSON.stringify(input.contentObj),
      updatedBy: admin.email,
    },
  });

  await logAuditEvent({
    user: admin,
    action: "UPDATE_PAGE_CONTENT",
    entityType: "PageContent",
    entityId: updated.id,
    details: `${input.pageKey}.${input.sectionKey}`,
  });

  safeRevalidate(["/", "/about-us", "/contact-us", "/privacy-policy", "/terms-and-conditions", "/admin/content"]);
  return { success: true, block: updated };
}

export async function saveSiteSettingsAction(settings: Record<string, string>) {
  const admin = await requireSuperAdmin();

  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: sanitizePlainText(value) },
      create: {
        key,
        value: sanitizePlainText(value),
        group: "general",
      },
    });
  }

  await logAuditEvent({
    user: admin,
    action: "UPDATE_SITE_SETTINGS",
    entityType: "SiteSetting",
    details: `Updated ${Object.keys(settings).length} site settings`,
  });

  safeRevalidate(["/", "/about-us", "/contact-us", "/brands", "/testimonials", "/admin/settings"]);
  return { success: true };
}

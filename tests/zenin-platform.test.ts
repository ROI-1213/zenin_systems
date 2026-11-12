import { describe, it, expect } from "vitest";
import prisma from "@/lib/db";
import {
  getAICategoriesWithSolutions,
  getAISolutionBySlug,
  getAllProductCategories,
  getCoreSolutionCategories,
  getPublicNavigationData,
  getServiceBySlug,
  getServices,
  getWiderPortfolioCategories,
} from "@/lib/db/queries";
import { submitEnquiryAction } from "@/lib/actions/enquiry-actions";
import { enquirySchema, productSchema, serviceSchema } from "@/lib/validations";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { validateMediaUpload } from "@/lib/storage";

const EXPECTED_AI_SLUGS = [
  "ppe-detection",
  "fire-smoke-detection",
  "danger-zone-monitoring",
  "work-at-height-monitoring",
  "sop-compliance-monitoring",
  "intrusion-detection",
  "perimeter-monitoring",
  "people-vehicle-counting",
  "vehicle-speed-detection",
  "anpr",
  "process-quality-monitoring",
  "visual-quality-inspection",
  "conveyor-belt-monitoring",
  "industrial-process-monitoring",
  "steel-sheet-defect-monitoring",
  "hdri-wheel-inspection",
  "thermal-monitoring",
  "electrical-panel-monitoring",
  "chimney-smoke-monitoring",
  "custom-ai-video-analytics",
  "industrial-ai-vision-applications",
];

const EXPECTED_SERVICE_SLUGS = [
  "fire-detection-alarm-systems",
  "integrated-building-management",
  "lighting-management",
  "energy-management",
  "ivr-solutions",
  "public-address-systems",
  "audio-visual-video-conferencing",
  "hvac-solutions",
  "intelligent-fencing",
  "access-control-systems",
  "iot-solutions",
  "parking-management",
];

describe("Zenin Systems Solutions LLP — Platform Architecture & QA Suite", () => {
  it("1. Public navigation loads 4 Core Solution Pillars, 5 AI Categories, and 12 Services", async () => {
    const nav = await getPublicNavigationData();
    expect(nav.coreCategories.length).toBe(4);
    expect(nav.aiCategories.length).toBe(5);
    expect(nav.services.length).toBeGreaterThanOrEqual(12);
  });

  it("2. Product catalog preserves both 4 Core Solution Groups and 15 Wider Portfolio Categories", async () => {
    const [core, wider, all] = await Promise.all([
      getCoreSolutionCategories(),
      getWiderPortfolioCategories(),
      getAllProductCategories(false),
    ]);

    expect(core.length).toBe(4);
    expect(wider.length).toBe(15);
    expect(all.length).toBe(19);
  });

  it("3. All 5 AI categories and all 21 named AI applications resolve without 404s", async () => {
    const categories = await getAICategoriesWithSolutions(false);
    expect(categories.length).toBe(5);

    const allSolutions = categories.flatMap((c) => c.solutions);
    expect(allSolutions.length).toBe(21);

    for (const slug of EXPECTED_AI_SLUGS) {
      const detail = await getAISolutionBySlug(slug);
      expect(detail, `Expected AI solution ${slug} to resolve`).not.toBeNull();
      expect(detail?.slug).toBe(slug);
      expect(detail?.capabilities.length).toBeGreaterThan(0);
    }

    // Verify HDRI Wheel Inspection is preserved and flagged for admin review
    const hdri = await getAISolutionBySlug("hdri-wheel-inspection");
    expect(hdri?.name).toBe("HDRI Wheel Inspection");
    expect(hdri?.requiresReview).toBe(true);
  });

  it("4. All 12 service categories resolve with detail page content", async () => {
    const services = await getServices();
    expect(services.length).toBeGreaterThanOrEqual(12);

    for (const slug of EXPECTED_SERVICE_SLUGS) {
      const svc = await getServiceBySlug(slug);
      expect(svc, `Expected service ${slug} to resolve`).not.toBeNull();
      expect(svc?.slug).toBe(slug);
      expect(svc?.features.length).toBeGreaterThan(0);
    }
  });

  it("5. Contact & Quote validation rejects invalid and malicious inputs", () => {
    const invalid = enquirySchema.safeParse({
      fullName: "A",
      companyName: "",
      email: "not-an-email",
      phone: "abc-invalid",
      message: "short",
    });
    expect(invalid.success).toBe(false);

    const spam = enquirySchema.safeParse({
      fullName: "Bot User",
      companyName: "Spam Corp",
      email: "bot@spam.com",
      phone: "+91 9876543210",
      message: "Automated spam submission message.",
      honeypot: "filled-by-bot",
    });
    expect(spam.success).toBe(false);
  });

  it("6. Quote request from /products/ai-video-analytics/ppe-detection automatically attributes PPE Detection", async () => {
    const result = await submitEnquiryAction(
      {
        fullName: "Vikram Deshmukh",
        companyName: "Pune Heavy Engineering Pvt Ltd",
        email: "v.deshmukh@puneheavy.example.com",
        phone: "+91 98220 11223",
        enquiryType: "QUOTE_REQUEST",
        interestedTopic: "",
        productId: "",
        productSlug: "",
        aiSolutionId: "",
        aiSolutionSlug: "ppe-detection",
        serviceId: "",
        serviceSlug: "",
        projectLocation: "Chakan MIDC, Pune",
        message:
          "We need PPE helmet and vest detection across 16 shop-floor IP cameras.",
        sourcePage: "/products/ai-video-analytics/ppe-detection",
        honeypot: "",
      },
      "test-client-1"
    );

    expect(result.success).toBe(true);
    expect(result.referenceCode).toMatch(/^ZSS-\d{8}-[A-Z0-9]+$/);
    expect(result.resolvedTopic).toBe("PPE Detection");

    const saved = await prisma.enquiry.findUnique({
      where: { referenceCode: result.referenceCode },
      include: { aiSolution: true },
    });

    expect(saved).not.toBeNull();
    expect(saved?.aiSolution?.slug).toBe("ppe-detection");
    expect(saved?.interestedTopic).toBe("PPE Detection");
    expect(saved?.status).toBe("NEW");

    // Test admin status update & note persistence
    const updated = await prisma.enquiry.update({
      where: { id: saved!.id },
      data: {
        status: "CONTACTED",
        notes: {
          create: {
            authorName: "QA Super Admin",
            note: "Initial technical call completed.",
          },
        },
      },
      include: { notes: true },
    });

    expect(updated.status).toBe("CONTACTED");
    expect(updated.notes.length).toBe(1);

    // Cleanup test enquiry
    await prisma.enquiry.delete({ where: { id: saved!.id } });
  });

  it("7. Admin password hashing and verification work securely", async () => {
    const raw = "ZeninTest!Pass2026";
    const hash = await hashPassword(raw);
    expect(hash).not.toBe(raw);
    expect(await verifyPassword(raw, hash)).toBe(true);
    expect(await verifyPassword("WrongPassword123", hash)).toBe(false);
  });

  it("8. Product, Service, and Testimonial CRUD operations persist and clean up accurately", async () => {
    const coreCat = await prisma.productCategory.findUnique({
      where: { slug: "cctv-surveillance" },
    });
    expect(coreCat).not.toBeNull();

    const parsedProd = productSchema.parse({
      name: "QA Test Explosion-Proof IP Camera",
      slug: "qa-test-explosion-proof-camera",
      categoryId: coreCat!.id,
      shortDescription: "Explosion-protected camera housing for hazardous Zone 1 areas.",
      description:
        "Engineered stainless-steel enclosure camera system for chemical and refinery zones.",
      features: ["316L Stainless Steel Housing", "IP68 Weatherproof"],
      applications: ["Refineries", "Chemical Storage"],
      status: "DRAFT",
      isFeatured: false,
    });

    const createdProd = await prisma.product.create({
      data: {
        name: parsedProd.name,
        slug: parsedProd.slug,
        categoryId: parsedProd.categoryId,
        shortDescription: parsedProd.shortDescription,
        description: parsedProd.description,
        features: JSON.stringify(parsedProd.features),
        applications: JSON.stringify(parsedProd.applications),
        status: parsedProd.status,
      },
    });
    expect(createdProd.slug).toBe("qa-test-explosion-proof-camera");

    await prisma.product.delete({ where: { id: createdProd.id } });

    // Service validation test
    const validSvc = serviceSchema.safeParse({
      name: "Test Engineering Service",
      slug: "test-engineering-service",
      shortDescription: "Short service summary for testing validation.",
      longDescription: "Comprehensive long engineering service description for testing.",
    });
    expect(validSvc.success).toBe(true);

    // Testimonial publication lifecycle test
    const testReview = await prisma.testimonial.create({
      data: {
        clientName: "QA Test Director",
        companyName: "QA Industrial Systems",
        feedback: "Reliable engineering execution.",
        status: "PUBLISHED",
      },
    });
    expect(testReview.status).toBe("PUBLISHED");
    await prisma.testimonial.delete({ where: { id: testReview.id } });
  });

  it("9. Media upload validation enforces allowed image MIME types and 5MB size limit", () => {
    expect(() => validateMediaUpload("image/webp", 250_000)).not.toThrow();
    expect(() => validateMediaUpload("application/x-msdownload", 1024)).toThrow();
    expect(() => validateMediaUpload("image/png", 10 * 1024 * 1024)).toThrow();
  });
});

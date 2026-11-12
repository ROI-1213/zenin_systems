"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { enquirySchema, type EnquiryInput } from "@/lib/validations";
import { checkRateLimit } from "@/lib/auth";
import { generateReferenceCode, sanitizePlainText } from "@/lib/utilities";
import { sendEnquiryNotificationEmail } from "@/lib/email";

export interface SubmitEnquiryResult {
  success: boolean;
  referenceCode?: string;
  resolvedTopic?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function submitEnquiryAction(
  rawInput: EnquiryInput,
  clientIdentifier = "public-visitor"
): Promise<SubmitEnquiryResult> {
  // 1. Check anti-spam honeypot
  if (rawInput.honeypot && rawInput.honeypot.trim().length > 0) {
    return {
      success: false,
      error: "Submission rejected by spam protection.",
    };
  }

  // 2. Check rate limit (max 10 submissions per minute per client key)
  const rateCheck = checkRateLimit(`enquiry:${clientIdentifier}`, 10, 60_000);
  if (!rateCheck.allowed) {
    return {
      success: false,
      error: `Too many requests. Please wait ${rateCheck.retryAfterSeconds} seconds before trying again.`,
    };
  }

  // 3. Validate with Zod
  const parsed = enquirySchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the highlighted form fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  // 4. Server-side resolution of Product, AI Solution, or Service ID & Canonical Name
  let resolvedProductId: string | null = null;
  let resolvedAISolutionId: string | null = null;
  let resolvedServiceId: string | null = null;
  let resolvedTopic = data.interestedTopic ? sanitizePlainText(data.interestedTopic) : "";

  if (data.productId || data.productSlug) {
    const product = await prisma.product.findFirst({
      where: data.productId ? { id: data.productId } : { slug: data.productSlug },
      select: { id: true, name: true },
    });
    if (product) {
      resolvedProductId = product.id;
      resolvedTopic = product.name;
    }
  }

  if (data.aiSolutionId || data.aiSolutionSlug) {
    const aiSolution = await prisma.aISolution.findFirst({
      where: data.aiSolutionId
        ? { id: data.aiSolutionId }
        : { slug: data.aiSolutionSlug },
      select: { id: true, name: true },
    });
    if (aiSolution) {
      resolvedAISolutionId = aiSolution.id;
      resolvedTopic = aiSolution.name;
    }
  }

  if (data.serviceId || data.serviceSlug) {
    const service = await prisma.service.findFirst({
      where: data.serviceId ? { id: data.serviceId } : { slug: data.serviceSlug },
      select: { id: true, name: true },
    });
    if (service) {
      resolvedServiceId = service.id;
      resolvedTopic = service.name;
    }
  }

  // Also check if sourcePage matches an AI solution or service slug when explicit IDs were omitted
  if (!resolvedProductId && !resolvedAISolutionId && !resolvedServiceId && data.sourcePage) {
    const aiMatch = data.sourcePage.match(/^\/products\/ai-video-analytics\/([a-z0-9-]+)$/i);
    if (aiMatch) {
      const aiSol = await prisma.aISolution.findUnique({
        where: { slug: aiMatch[1] },
        select: { id: true, name: true },
      });
      if (aiSol) {
        resolvedAISolutionId = aiSol.id;
        resolvedTopic = aiSol.name;
      }
    }

    const svcMatch = data.sourcePage.match(/^\/services\/([a-z0-9-]+)$/i);
    if (svcMatch) {
      const svc = await prisma.service.findUnique({
        where: { slug: svcMatch[1] },
        select: { id: true, name: true },
      });
      if (svc) {
        resolvedServiceId = svc.id;
        resolvedTopic = svc.name;
      }
    }
  }

  const referenceCode = generateReferenceCode("ZSS");

  // 5. Persist enquiry in database
  const created = await prisma.enquiry.create({
    data: {
      referenceCode,
      fullName: sanitizePlainText(data.fullName),
      companyName: sanitizePlainText(data.companyName),
      email: data.email.toLowerCase(),
      phone: sanitizePlainText(data.phone),
      enquiryType: data.enquiryType,
      interestedTopic: resolvedTopic || "General Industrial Solutions Enquiry",
      productId: resolvedProductId,
      aiSolutionId: resolvedAISolutionId,
      serviceId: resolvedServiceId,
      projectLocation: data.projectLocation ? sanitizePlainText(data.projectLocation) : null,
      message: sanitizePlainText(data.message),
      sourcePage: sanitizePlainText(data.sourcePage || "/"),
      status: "NEW",
    },
  });

  // 6. Attempt notification email (failure must never erase saved enquiry)
  await sendEnquiryNotificationEmail({
    referenceCode: created.referenceCode,
    fullName: created.fullName,
    companyName: created.companyName,
    email: created.email,
    phone: created.phone,
    enquiryType: created.enquiryType,
    interestedTopic: created.interestedTopic,
    projectLocation: created.projectLocation,
    message: created.message,
    sourcePage: created.sourcePage,
  }).catch(() => null);

  try {
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/enquiries");
  } catch {
    // Safe outside Next request context (e.g. unit tests)
  }

  return {
    success: true,
    referenceCode: created.referenceCode,
    resolvedTopic: created.interestedTopic || undefined,
  };
}

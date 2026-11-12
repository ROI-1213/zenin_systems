import { z } from "zod";

export const ENQUIRY_TYPES = [
  "QUOTE_REQUEST",
  "GENERAL_INQUIRY",
  "TECHNICAL_CONSULTATION",
  "SERVICE_REQUEST",
] as const;

export const ENQUIRY_STATUSES = [
  "NEW",
  "CONTACTED",
  "IN_PROGRESS",
  "QUOTED",
  "CLOSED",
  "SPAM",
] as const;

export const PUBLICATION_STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

export const ADMIN_ROLES = ["SUPER_ADMIN", "EDITOR"] as const;

export const enquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(120, "Full name is too long"),
  companyName: z
    .string()
    .trim()
    .min(2, "Company name is required")
    .max(150, "Company name is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid business email address")
    .max(160, "Email is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid contact phone number")
    .max(30, "Phone number is too long")
    .regex(/^[0-9+\-() ]+$/, "Phone number contains invalid characters"),
  enquiryType: z.enum(ENQUIRY_TYPES).default("QUOTE_REQUEST"),
  interestedTopic: z.string().trim().max(200).optional().or(z.literal("")),
  productId: z.string().trim().optional().or(z.literal("")),
  productSlug: z.string().trim().optional().or(z.literal("")),
  aiSolutionId: z.string().trim().optional().or(z.literal("")),
  aiSolutionSlug: z.string().trim().optional().or(z.literal("")),
  serviceId: z.string().trim().optional().or(z.literal("")),
  serviceSlug: z.string().trim().optional().or(z.literal("")),
  projectLocation: z.string().trim().max(150).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters describing your requirement")
    .max(4000, "Message must be under 4000 characters"),
  sourcePage: z.string().trim().max(300).default("/"),
  honeypot: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid administrator email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(10, "New password must be at least 10 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const createAdminUserSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  password: z.string().min(10, "Password must be at least 10 characters"),
  role: z.enum(ADMIN_ROLES).default("EDITOR"),
});

export const productCategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2, "Category name is required").max(140),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(140)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  shortDescription: z.string().trim().min(10).max(500),
  description: z.string().trim().min(10).max(5000),
  icon: z.string().trim().default("Shield"),
  coverImage: z.string().trim().optional().or(z.literal("")),
  isCoreSolution: z.boolean().default(false),
  dedicatedRoute: z.string().trim().optional().or(z.literal("")),
  status: z.enum(PUBLICATION_STATUSES).default("PUBLISHED"),
  isFeatured: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
  seoTitle: z.string().trim().max(160).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(320).optional().or(z.literal("")),
});

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2, "Product name is required").max(160),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  shortDescription: z.string().trim().min(10, "Short description is required").max(600),
  description: z.string().trim().min(20, "Full description is required").max(10000),
  categoryId: z.string().trim().min(1, "Category is required"),
  subcategoryId: z.string().trim().optional().or(z.literal("")),
  features: z.array(z.string().trim().min(1)).default([]),
  applications: z.array(z.string().trim().min(1)).default([]),
  technicalSpecifications: z
    .array(
      z.object({
        label: z.string().trim().min(1),
        value: z.string().trim().min(1),
      })
    )
    .default([]),
  integrationCapabilities: z.array(z.string().trim().min(1)).default([]),
  featuredImage: z.string().trim().optional().or(z.literal("")),
  status: z.enum(PUBLICATION_STATUSES).default("PUBLISHED"),
  isFeatured: z.boolean().default(false),
  requiresReview: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
  seoTitle: z.string().trim().max(160).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(320).optional().or(z.literal("")),
});

export const aiSolutionSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2, "Solution name is required").max(160),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  categoryId: z.string().trim().min(1, "AI Category is required"),
  shortDescription: z.string().trim().min(10).max(600),
  overview: z.string().trim().min(20).max(8000),
  problemStatement: z.string().trim().min(10).max(4000),
  howItWorks: z.string().trim().min(10).max(4000),
  capabilities: z.array(z.string().trim().min(1)).default([]),
  applicableIndustries: z.array(z.string().trim().min(1)).default([]),
  benefits: z.array(z.string().trim().min(1)).default([]),
  integrationInfo: z.string().trim().max(2000).optional().or(z.literal("")),
  featuredImage: z.string().trim().optional().or(z.literal("")),
  relatedSolutionSlugs: z.array(z.string().trim()).default([]),
  requiresReview: z.boolean().default(false),
  reviewNote: z.string().trim().max(1000).optional().or(z.literal("")),
  status: z.enum(PUBLICATION_STATUSES).default("PUBLISHED"),
  isFeatured: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
  seoTitle: z.string().trim().max(160).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(320).optional().or(z.literal("")),
});

export const serviceSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2, "Service name is required").max(160),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  shortDescription: z.string().trim().min(10).max(600),
  longDescription: z.string().trim().min(20).max(10000),
  icon: z.string().trim().default("Wrench"),
  coverImage: z.string().trim().optional().or(z.literal("")),
  features: z.array(z.string().trim().min(1)).default([]),
  capabilities: z.array(z.string().trim().min(1)).default([]),
  applications: z.array(z.string().trim().min(1)).default([]),
  industries: z.array(z.string().trim().min(1)).default([]),
  relatedServiceSlugs: z.array(z.string().trim()).default([]),
  isFeatured: z.boolean().default(false),
  status: z.enum(PUBLICATION_STATUSES).default("PUBLISHED"),
  sortOrder: z.coerce.number().int().default(0),
  seoTitle: z.string().trim().max(160).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(320).optional().or(z.literal("")),
});

export const testimonialSchema = z.object({
  id: z.string().optional(),
  clientName: z.string().trim().min(2, "Client name is required").max(120),
  companyName: z.string().trim().min(2, "Company name is required").max(150),
  designation: z.string().trim().max(120).optional().or(z.literal("")),
  feedback: z.string().trim().min(10, "Feedback text is required").max(2500),
  clientImage: z.string().trim().optional().or(z.literal("")),
  companyLogo: z.string().trim().optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
  status: z.enum(PUBLICATION_STATUSES).default("DRAFT"),
  sortOrder: z.coerce.number().int().default(0),
});

export const brandSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2, "Brand name is required").max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Invalid slug"),
  logoUrl: z.string().trim().optional().or(z.literal("")),
  shortDescription: z.string().trim().max(500).optional().or(z.literal("")),
  websiteUrl: z.string().trim().url("Must be a valid URL").optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
  status: z.enum(PUBLICATION_STATUSES).default("DRAFT"),
  sortOrder: z.coerce.number().int().default(0),
});

export const industrySchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2).max(120),
  slug: z.string().trim().min(2).max(120),
  shortDescription: z.string().trim().min(10).max(500),
  applications: z.array(z.string().trim().min(1)).default([]),
  icon: z.string().trim().default("Factory"),
  coverImage: z.string().trim().optional().or(z.literal("")),
  status: z.enum(PUBLICATION_STATUSES).default("PUBLISHED"),
  sortOrder: z.coerce.number().int().default(0),
});

export const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2).max(160),
  slug: z.string().trim().min(2).max(160),
  industry: z.string().trim().min(2).max(120),
  shortDescription: z.string().trim().min(10).max(600),
  description: z.string().trim().min(20).max(8000),
  solutionsImplemented: z.array(z.string().trim().min(1)).default([]),
  coverImage: z.string().trim().optional().or(z.literal("")),
  status: z.enum(PUBLICATION_STATUSES).default("DRAFT"),
  isFeatured: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
});

export const enquiryStatusUpdateSchema = z.object({
  enquiryId: z.string().min(1),
  status: z.enum(ENQUIRY_STATUSES),
  note: z.string().trim().max(2000).optional().or(z.literal("")),
});

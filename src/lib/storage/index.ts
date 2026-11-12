import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import prisma from "@/lib/db";

const ALLOWED_IMAGE_MIMES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/svg+xml",
]);

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export interface UploadMediaInput {
  fileBuffer: Buffer;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  altText?: string;
  uploadedById?: string;
}

export function validateMediaUpload(mimeType: string, sizeBytes: number) {
  if (!ALLOWED_IMAGE_MIMES.has(mimeType)) {
    throw new Error(
      `Unsupported image format "${mimeType}". Allowed formats: JPEG, PNG, WebP, AVIF, SVG.`
    );
  }
  if (sizeBytes <= 0 || sizeBytes > MAX_FILE_SIZE_BYTES) {
    throw new Error("File size must be between 1 byte and 5 MB.");
  }
}

export async function storeMediaAsset(input: UploadMediaInput) {
  validateMediaUpload(input.mimeType, input.sizeBytes);

  const ext = path.extname(input.originalName).toLowerCase() || ".webp";
  const safeBase = path
    .basename(input.originalName, ext)
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .slice(0, 48);

  const uniqueSuffix = crypto.randomBytes(6).toString("hex");
  const fileName = `${safeBase || "asset"}-${Date.now()}-${uniqueSuffix}${ext}`;
  const storageKey = `uploads/${fileName}`;
  const publicUrl = `/uploads/${fileName}`;

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  await fs.writeFile(path.join(uploadsDir, fileName), input.fileBuffer);

  const asset = await prisma.mediaAsset.create({
    data: {
      fileName,
      originalName: input.originalName,
      mimeType: input.mimeType,
      sizeBytes: input.sizeBytes,
      url: publicUrl,
      storageKey,
      altText: input.altText?.trim() || safeBase,
      uploadedById: input.uploadedById ?? null,
    },
  });

  return asset;
}

export async function deleteMediaAssetSafely(assetId: string) {
  const asset = await prisma.mediaAsset.findUnique({ where: { id: assetId } });
  if (!asset) {
    throw new Error("Media asset not found.");
  }

  // Reference protection check across Products, AI Solutions, Services, and Brands
  const [productRefs, aiRefs, serviceRefs, brandRefs] = await Promise.all([
    prisma.product.count({ where: { featuredImage: asset.url } }),
    prisma.aISolution.count({ where: { featuredImage: asset.url } }),
    prisma.service.count({ where: { coverImage: asset.url } }),
    prisma.brand.count({ where: { logoUrl: asset.url } }),
  ]);

  const totalRefs = productRefs + aiRefs + serviceRefs + brandRefs;
  if (totalRefs > 0) {
    throw new Error(
      `Cannot delete media asset "${asset.originalName}" because it is currently referenced by ${totalRefs} published/draft record(s).`
    );
  }

  if (asset.url.startsWith("/uploads/")) {
    const localFilePath = path.join(process.cwd(), "public", asset.storageKey);
    await fs.unlink(localFilePath).catch(() => null);
  }

  await prisma.mediaAsset.delete({ where: { id: assetId } });
  return { deleted: true };
}

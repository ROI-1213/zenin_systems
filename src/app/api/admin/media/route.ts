import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getAdminSession, logAuditEvent } from "@/lib/auth";
import { deleteMediaAssetSafely, storeMediaAsset } from "@/lib/storage";

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ assets });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const altText = (formData.get("altText") as string | null) || "";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const asset = await storeMediaAsset({
      fileBuffer: buffer,
      originalName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
      altText,
      uploadedById: admin.id,
    });

    await logAuditEvent({
      user: admin,
      action: "UPLOAD_MEDIA",
      entityType: "MediaAsset",
      entityId: asset.id,
      details: `${asset.originalName} (${asset.mimeType})`,
    });

    return NextResponse.json({ success: true, asset });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing media asset id." }, { status: 400 });
    }

    await deleteMediaAssetSafely(id);
    await logAuditEvent({
      user: admin,
      action: "DELETE_MEDIA",
      entityType: "MediaAsset",
      entityId: id,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete media asset.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

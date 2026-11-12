import React from "react";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { MediaManager } from "@/components/admin/media-manager";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const user = await requireAdmin();
  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell
      user={user}
      title="Media Library & Asset Manager"
      subtitle="Upload, preview, manage alt-text, and safely delete media assets with reference protection."
    >
      <MediaManager
        initialAssets={assets.map((a) => ({
          id: a.id,
          fileName: a.fileName,
          originalName: a.originalName,
          mimeType: a.mimeType,
          sizeBytes: a.sizeBytes,
          url: a.url,
          altText: a.altText,
          createdAt: a.createdAt.toISOString(),
        }))}
      />
    </AdminShell>
  );
}

import React from "react";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { safeJsonParse } from "@/lib/utilities";
import { AdminShell } from "@/components/admin/admin-shell";
import { ContentManager } from "@/components/admin/content-manager";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const user = await requireAdmin();
  const blocks = await prisma.pageContent.findMany({
    orderBy: [{ pageKey: "asc" }, { sectionKey: "asc" }],
  });

  return (
    <AdminShell
      user={user}
      title="Website Content Management System (CMS)"
      subtitle="Update homepage hero copy, about overview, mission/vision, contact details, and legal sections."
    >
      <ContentManager
        blocks={blocks.map((b) => ({
          id: b.id,
          pageKey: b.pageKey,
          sectionKey: b.sectionKey,
          title: b.title,
          subtitle: b.subtitle,
          content: safeJsonParse<Record<string, unknown>>(b.content, {}),
        }))}
      />
    </AdminShell>
  );
}

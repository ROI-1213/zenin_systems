import React from "react";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { safeJsonParse } from "@/lib/utilities";
import { SERVICES_PAGE_DEFAULTS } from "@/lib/services-page-defaults";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  ServicesPageEditor,
  type ServicesSectionEntry,
  type ServicesSectionKey,
} from "@/components/admin/services-page-editor";

export const dynamic = "force-dynamic";

export default async function AdminServicesPageEditorPage() {
  const user = await requireAdmin();

  const existingBlocks = await prisma.pageContent.findMany({
    where: { pageKey: "services" },
  });

  const blockMap = new Map(existingBlocks.map((b) => [b.sectionKey, b]));
  const initialSections = {} as Record<ServicesSectionKey, ServicesSectionEntry>;

  (Object.keys(SERVICES_PAGE_DEFAULTS) as ServicesSectionKey[]).forEach((key) => {
    const def = SERVICES_PAGE_DEFAULTS[key];
    const saved = blockMap.get(key);
    const parsedData = saved
      ? safeJsonParse<Record<string, unknown>>(saved.content, {})
      : {};

    initialSections[key] = {
      sectionKey: key,
      title: saved?.title || def.title,
      subtitle: saved?.subtitle || def.subtitle,
      data: { ...def.data, ...parsedData },
    };
  });

  return (
    <AdminShell
      user={user}
      title="Services Page Editor"
      subtitle="Edit every section of /services and the shared labels on all 13 service detail pages, with visibility toggles and instant publishing."
    >
      <ServicesPageEditor initialSections={initialSections} />
    </AdminShell>
  );
}

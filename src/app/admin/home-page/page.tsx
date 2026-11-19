import React from "react";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { safeJsonParse } from "@/lib/utilities";
import { HOME_SECTION_DEFAULTS } from "@/lib/home-defaults";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  HomePageEditor,
  type HomeSectionEntry,
  type HomeSectionKey,
} from "@/components/admin/home-page-editor";

export const dynamic = "force-dynamic";

export default async function AdminHomePageEditorPage() {
  const user = await requireAdmin();

  const existingBlocks = await prisma.pageContent.findMany({
    where: { pageKey: "home" },
  });

  const blockMap = new Map(existingBlocks.map((b) => [b.sectionKey, b]));

  const initialSections = {} as Record<HomeSectionKey, HomeSectionEntry>;

  (Object.keys(HOME_SECTION_DEFAULTS) as HomeSectionKey[]).forEach((key) => {
    const def = HOME_SECTION_DEFAULTS[key];
    const saved = blockMap.get(key);
    const parsedData = saved
      ? safeJsonParse<Record<string, unknown>>(saved.content, {})
      : {};

    initialSections[key] = {
      sectionKey: key,
      title: saved?.title || def.title,
      subtitle: saved?.subtitle || def.subtitle,
      data: {
        ...def.data,
        ...parsedData,
      },
    };
  });

  return (
    <AdminShell
      user={user}
      title="Home Page Editor"
      subtitle="Edit every section of your Home Page with dedicated section controls, live visibility toggles, and instant publishing."
    >
      <HomePageEditor initialSections={initialSections} />
    </AdminShell>
  );
}

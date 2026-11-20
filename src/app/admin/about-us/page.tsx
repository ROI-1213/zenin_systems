import React from "react";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { safeJsonParse } from "@/lib/utilities";
import { ABOUT_SECTION_DEFAULTS } from "@/lib/about-defaults";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  AboutPageEditor,
  type AboutSectionEntry,
  type AboutSectionKey,
} from "@/components/admin/about-page-editor";

export const dynamic = "force-dynamic";

export default async function AdminAboutUsEditorPage() {
  const user = await requireAdmin();

  const existingBlocks = await prisma.pageContent.findMany({
    where: { pageKey: "about" },
  });

  const blockMap = new Map(existingBlocks.map((b) => [b.sectionKey, b]));
  const initialSections = {} as Record<AboutSectionKey, AboutSectionEntry>;

  (Object.keys(ABOUT_SECTION_DEFAULTS) as AboutSectionKey[]).forEach((key) => {
    const def = ABOUT_SECTION_DEFAULTS[key];
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
      title="About Us Page Editor"
      subtitle="Edit every section of your About Us page with dedicated section controls, dynamic cards, visibility toggles, and instant publishing."
    >
      <AboutPageEditor initialSections={initialSections} />
    </AdminShell>
  );
}

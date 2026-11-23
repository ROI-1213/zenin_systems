import React from "react";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { safeJsonParse } from "@/lib/utilities";
import { CONTACT_PAGE_DEFAULTS } from "@/lib/contact-page-defaults";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  ContactPageEditor,
  type ContactSectionEntry,
  type ContactSectionKey,
} from "@/components/admin/contact-page-editor";

export const dynamic = "force-dynamic";

export default async function AdminContactPageEditorPage() {
  const user = await requireAdmin();

  const existingBlocks = await prisma.pageContent.findMany({
    where: { pageKey: "contact" },
  });

  const blockMap = new Map(existingBlocks.map((b) => [b.sectionKey, b]));
  const initialSections = {} as Record<ContactSectionKey, ContactSectionEntry>;

  (Object.keys(CONTACT_PAGE_DEFAULTS) as ContactSectionKey[]).forEach((key) => {
    const def = CONTACT_PAGE_DEFAULTS[key];
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
      title="Contact Us Page Editor"
      subtitle="Edit every section of /contact-us — hero banner, office contact cards, Google Maps embed, enquiry form headings, and section visibility."
    >
      <ContactPageEditor initialSections={initialSections} />
    </AdminShell>
  );
}

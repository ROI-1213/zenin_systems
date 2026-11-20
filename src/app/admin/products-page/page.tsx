import React from "react";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { safeJsonParse } from "@/lib/utilities";
import { PRODUCTS_PAGE_DEFAULTS } from "@/lib/products-page-defaults";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  ProductsPageEditor,
  type ProductsSectionEntry,
  type ProductsSectionKey,
} from "@/components/admin/products-page-editor";

export const dynamic = "force-dynamic";

export default async function AdminProductsPageEditorPage() {
  const user = await requireAdmin();

  const existingBlocks = await prisma.pageContent.findMany({
    where: { pageKey: "products" },
  });

  const blockMap = new Map(existingBlocks.map((b) => [b.sectionKey, b]));
  const initialSections = {} as Record<ProductsSectionKey, ProductsSectionEntry>;

  (Object.keys(PRODUCTS_PAGE_DEFAULTS) as ProductsSectionKey[]).forEach(
    (key) => {
      const def = PRODUCTS_PAGE_DEFAULTS[key];
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
    }
  );

  return (
    <AdminShell
      user={user}
      title="Products & Solutions Page Editor"
      subtitle="Edit every section banner, heading, button label, and visibility toggle across /products and all 4 Core Solution Hubs."
    >
      <ProductsPageEditor initialSections={initialSections} />
    </AdminShell>
  );
}

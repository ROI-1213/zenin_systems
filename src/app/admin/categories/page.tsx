import React from "react";
import { requireAdmin } from "@/lib/auth";
import { getAllProductCategories } from "@/lib/db/queries";
import { AdminShell } from "@/components/admin/admin-shell";
import { CategoriesManager } from "@/components/admin/categories-manager";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const user = await requireAdmin();
  const categories = await getAllProductCategories(true);

  return (
    <AdminShell
      user={user}
      title="Product & Solution Categories"
      subtitle="Manage the 4 Core Solution Pillars and 15 Wider Industrial Portfolio Categories."
    >
      <CategoriesManager
        categories={categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          shortDescription: c.shortDescription,
          description: c.description,
          icon: c.icon,
          coverImage: c.coverImage,
          isCoreSolution: c.isCoreSolution,
          dedicatedRoute: c.dedicatedRoute,
          status: c.status,
          isFeatured: c.isFeatured,
          sortOrder: c.sortOrder,
          productCount: c._count.products,
        }))}
      />
    </AdminShell>
  );
}

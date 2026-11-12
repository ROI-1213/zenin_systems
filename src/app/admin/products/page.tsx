import React from "react";
import { requireAdmin } from "@/lib/auth";
import { getAllProductCategories, getProducts } from "@/lib/db/queries";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProductsManager } from "@/components/admin/products-manager";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const user = await requireAdmin();
  const [products, categories] = await Promise.all([
    getProducts({ includeDrafts: true }),
    getAllProductCategories(true),
  ]);

  return (
    <AdminShell
      user={user}
      title="Product & System Catalog Management"
      subtitle="Create, edit, publish, unpublish, and manage technical specifications for B2B products."
    >
      <ProductsManager
        initialProducts={products}
        categories={categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
        }))}
      />
    </AdminShell>
  );
}

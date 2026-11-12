import React from "react";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { BrandsManager } from "@/components/admin/brands-manager";

export const dynamic = "force-dynamic";

export default async function AdminBrandsPage() {
  const user = await requireAdmin();
  const brands = await prisma.brand.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminShell
      user={user}
      title="Brands & OEM Partners Management"
      subtitle="Manage verified technology brand records and publication visibility."
    >
      <BrandsManager brands={brands} />
    </AdminShell>
  );
}

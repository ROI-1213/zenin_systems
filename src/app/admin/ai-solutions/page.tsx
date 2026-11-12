import React from "react";
import { requireAdmin } from "@/lib/auth";
import { getAICategoriesWithSolutions } from "@/lib/db/queries";
import { AdminShell } from "@/components/admin/admin-shell";
import { AISolutionsManager } from "@/components/admin/ai-solutions-manager";

export const dynamic = "force-dynamic";

export default async function AdminAISolutionsPage() {
  const user = await requireAdmin();
  const categories = await getAICategoriesWithSolutions(true);
  const allSolutions = categories.flatMap((c) => c.solutions);

  return (
    <AdminShell
      user={user}
      title="AI Video Analytics & Vision Applications CMS"
      subtitle="Manage the 5 AI application categories and all 21 specialized computer vision solutions."
    >
      <AISolutionsManager
        categories={categories.map((c) => ({
          id: c.id,
          code: c.code,
          name: c.name,
          slug: c.slug,
        }))}
        solutions={allSolutions}
      />
    </AdminShell>
  );
}

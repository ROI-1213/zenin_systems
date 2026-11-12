import React from "react";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { safeJsonParse } from "@/lib/utilities";
import { AdminShell } from "@/components/admin/admin-shell";
import { IndustriesProjectsManager } from "@/components/admin/industries-projects-manager";

export const dynamic = "force-dynamic";

export default async function AdminIndustriesPage() {
  const user = await requireAdmin();
  const [industries, projects] = await Promise.all([
    prisma.industry.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.project.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <AdminShell
      user={user}
      title="Industries Served & Featured Projects"
      subtitle="Manage target industrial verticals and verified project implementations."
    >
      <IndustriesProjectsManager
        industries={industries.map((i) => ({
          id: i.id,
          name: i.name,
          slug: i.slug,
          shortDescription: i.shortDescription,
          applications: safeJsonParse<string[]>(i.applications, []),
          icon: i.icon,
          status: i.status,
          sortOrder: i.sortOrder,
        }))}
        projects={projects.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          industry: p.industry,
          shortDescription: p.shortDescription,
          description: p.description,
          solutionsImplemented: safeJsonParse<string[]>(p.solutionsImplemented, []),
          status: p.status,
          isFeatured: p.isFeatured,
          sortOrder: p.sortOrder,
        }))}
      />
    </AdminShell>
  );
}

import React from "react";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { SettingsManager } from "@/components/admin/settings-manager";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const user = await requireAdmin();
  const settings = await prisma.siteSetting.findMany({
    orderBy: [{ group: "asc" }, { key: "asc" }],
  });

  return (
    <AdminShell
      user={user}
      title="Site Settings & Global Configuration"
      subtitle="Manage contact details, announcement bar, navigation links, and default SEO settings."
    >
      <SettingsManager
        initialSettings={settings}
        isSuperAdmin={user.role === "SUPER_ADMIN"}
      />
    </AdminShell>
  );
}

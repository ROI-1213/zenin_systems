import React from "react";
import { requireAdmin } from "@/lib/auth";
import { getServices } from "@/lib/db/queries";
import { AdminShell } from "@/components/admin/admin-shell";
import { ServicesManager } from "@/components/admin/services-manager";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const user = await requireAdmin();
  const services = await getServices({ includeDrafts: true });

  return (
    <AdminShell
      user={user}
      title="Engineering Services Management (12 Verticals)"
      subtitle="Manage service descriptions, capabilities, applications, and homepage featured flags."
    >
      <ServicesManager services={services} />
    </AdminShell>
  );
}

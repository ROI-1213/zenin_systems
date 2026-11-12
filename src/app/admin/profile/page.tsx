import React from "react";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProfileManager } from "@/components/admin/profile-manager";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const user = await requireAdmin();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      lastLoginAt: true,
    },
  });

  return (
    <AdminShell
      user={user}
      title="Administrator Profile & Access Control"
      subtitle="Manage your password and provision role-based administrator accounts."
    >
      <ProfileManager
        currentUser={user}
        adminUsers={users.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          isActive: u.isActive,
          lastLoginAt: u.lastLoginAt ? u.lastLoginAt.toISOString() : null,
        }))}
      />
    </AdminShell>
  );
}

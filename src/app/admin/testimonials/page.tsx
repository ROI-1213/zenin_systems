import React from "react";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const user = await requireAdmin();
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminShell
      user={user}
      title="Testimonials Management"
      subtitle="Create, approve, publish, unpublish, and reorder verified client testimonials."
    >
      <TestimonialsManager testimonials={testimonials} />
    </AdminShell>
  );
}

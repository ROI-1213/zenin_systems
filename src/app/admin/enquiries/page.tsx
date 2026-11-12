import React from "react";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { EnquiriesManager } from "@/components/admin/enquiries-manager";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const user = await requireAdmin();
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      product: { select: { name: true } },
      aiSolution: { select: { name: true } },
      service: { select: { name: true } },
      notes: { orderBy: { createdAt: "desc" } },
    },
  });

  const serialized = enquiries.map((e) => ({
    id: e.id,
    referenceCode: e.referenceCode,
    fullName: e.fullName,
    companyName: e.companyName,
    email: e.email,
    phone: e.phone,
    enquiryType: e.enquiryType,
    interestedTopic: e.interestedTopic,
    projectLocation: e.projectLocation,
    message: e.message,
    sourcePage: e.sourcePage,
    status: e.status,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
    productName: e.product?.name ?? null,
    aiSolutionName: e.aiSolution?.name ?? null,
    serviceName: e.service?.name ?? null,
    notes: e.notes.map((n) => ({
      id: n.id,
      authorName: n.authorName,
      note: n.note,
      createdAt: n.createdAt.toISOString(),
    })),
  }));

  return (
    <AdminShell
      user={user}
      title="Enquiry & Lead Management"
      subtitle="View, filter, update status, add internal notes, and export B2B enquiries."
    >
      <EnquiriesManager initialEnquiries={serialized} />
    </AdminShell>
  );
}

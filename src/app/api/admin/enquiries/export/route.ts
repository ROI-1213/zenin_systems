import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getAdminSession, logAuditEvent } from "@/lib/auth";

function escapeCsvCell(val: string | null | undefined): string {
  if (!val) return '""';
  const cleaned = String(val).replace(/"/g, '""');
  return `"${cleaned}"`;
}

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      product: { select: { name: true } },
      aiSolution: { select: { name: true } },
      service: { select: { name: true } },
    },
  });

  await logAuditEvent({
    user: admin,
    action: "EXPORT_ENQUIRIES_CSV",
    entityType: "Enquiry",
    details: `Exported ${enquiries.length} enquiry records`,
  });

  const headers = [
    "Reference ID",
    "Full Name",
    "Company",
    "Email",
    "Phone",
    "Enquiry Type",
    "Interested Solution / Service",
    "Project Location",
    "Source Page",
    "Status",
    "Message",
    "Submitted At",
  ];

  const rows = enquiries.map((e) => [
    escapeCsvCell(e.referenceCode),
    escapeCsvCell(e.fullName),
    escapeCsvCell(e.companyName),
    escapeCsvCell(e.email),
    escapeCsvCell(e.phone),
    escapeCsvCell(e.enquiryType),
    escapeCsvCell(
      e.aiSolution?.name || e.product?.name || e.service?.name || e.interestedTopic
    ),
    escapeCsvCell(e.projectLocation),
    escapeCsvCell(e.sourcePage),
    escapeCsvCell(e.status),
    escapeCsvCell(e.message),
    escapeCsvCell(e.createdAt.toISOString()),
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="zenin-enquiries-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}

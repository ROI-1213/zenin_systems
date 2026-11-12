import React from "react";
import Link from "next/link";
import {
  Package,
  Wrench,
  Inbox,
  MessageSquareQuote,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { getAdminDashboardStats } from "@/lib/db/queries";
import { AdminShell } from "@/components/admin/admin-shell";
import { formatDateTime } from "@/lib/utilities";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const user = await requireAdmin();
  const stats = await getAdminDashboardStats();

  const kpiCards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      sub: `${stats.publishedProducts} Published`,
      href: "/admin/products",
      icon: Package,
      color: "bg-[#1877F2]/10 text-[#1877F2]",
    },
    {
      label: "AI Vision Solutions",
      value: stats.totalAISolutions,
      sub: `${stats.publishedAISolutions} Published across ${stats.totalAICategories} Categories`,
      href: "/admin/ai-solutions",
      icon: Sparkles,
      color: "bg-[#00B8D9]/15 text-[#0095B0]",
    },
    {
      label: "Total Services",
      value: stats.totalServices,
      sub: `${stats.publishedServices} Published Verticals`,
      href: "/admin/services",
      icon: Wrench,
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      label: "New Enquiries",
      value: stats.newEnquiries,
      sub: `${stats.totalEnquiries} Total Leads Logged`,
      href: "/admin/enquiries",
      icon: Inbox,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Published Testimonials",
      value: stats.publishedTestimonials,
      sub: "Publicly visible reviews",
      href: "/admin/testimonials",
      icon: MessageSquareQuote,
      color: "bg-amber-100 text-amber-700",
    },
    {
      label: "Published Brands",
      value: stats.publishedBrands,
      sub: "Approved OEM records",
      href: "/admin/brands",
      icon: Award,
      color: "bg-slate-200 text-[#0B1730]",
    },
  ];

  const statusOrder = ["NEW", "CONTACTED", "IN_PROGRESS", "QUOTED", "CLOSED", "SPAM"];

  return (
    <AdminShell
      user={user}
      title="Enterprise Content & Lead Dashboard"
      subtitle="Live database metrics across products, AI solutions, engineering services, and B2B enquiries."
    >
      {/* KPI WIDGETS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group flex items-start justify-between rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs transition hover:border-[#1877F2] hover:shadow-md"
            >
              <div>
                <span className="text-xs font-bold tracking-wider text-[#64748B] uppercase">
                  {card.label}
                </span>
                <div className="mt-2 text-3xl font-extrabold text-[#0B1730]">
                  {card.value}
                </div>
                <div className="mt-1 text-xs font-medium text-[#64748B]">
                  {card.sub}
                </div>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ENQUIRY STATUS BREAKDOWN & QUICK ACTIONS */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 lg:col-span-7">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0B1730]">
              Enquiry Pipeline Status Breakdown
            </h2>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-[#1877F2] hover:underline"
            >
              Manage Leads →
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {statusOrder.map((st) => {
              const count = stats.statusBreakdown[st] || 0;
              return (
                <div
                  key={st}
                  className="rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-4"
                >
                  <div className="text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
                    {st.replace("_", " ")}
                  </div>
                  <div className="mt-1 text-2xl font-extrabold text-[#0B1730]">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 lg:col-span-5">
          <h2 className="text-base font-bold text-[#0B1730]">Quick CMS Actions</h2>
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {[
              { label: "Manage Products", href: "/admin/products" },
              { label: "Manage 21 AI Solutions", href: "/admin/ai-solutions" },
              { label: "Manage 12 Services", href: "/admin/services" },
              { label: "Edit Page Content", href: "/admin/content" },
              { label: "Publish Testimonials", href: "/admin/testimonials" },
              { label: "Update Site Settings", href: "/admin/settings" },
            ].map((act) => (
              <Link
                key={act.href}
                href={act.href}
                className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-3 text-xs font-semibold text-[#0B1730] transition hover:border-[#1877F2] hover:bg-white hover:text-[#1877F2]"
              >
                <span>{act.label}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT ENQUIRIES TABLE & AUDIT ACTIVITY */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 lg:col-span-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0B1730]">
              Recent Quote & Contact Enquiries
            </h2>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-[#1877F2] hover:underline"
            >
              View All ({stats.totalEnquiries}) →
            </Link>
          </div>

          {stats.recentEnquiries.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#E2E8F0] p-8 text-center text-xs text-[#64748B]">
              No enquiries have been submitted yet. Submit a quote request on the
              public website to see it appear here in real time.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
                    <th className="pb-3 pr-4">Ref ID</th>
                    <th className="pb-3 pr-4">Client / Company</th>
                    <th className="pb-3 pr-4">Interested Solution</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {stats.recentEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-[#F5F8FC]">
                      <td className="py-3 pr-4 font-mono font-bold text-[#1877F2]">
                        {enq.referenceCode}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="font-bold text-[#0B1730]">{enq.fullName}</div>
                        <div className="text-[11px] text-[#64748B]">
                          {enq.companyName}
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-medium text-[#172033]">
                        {enq.aiSolution?.name ||
                          enq.product?.name ||
                          enq.service?.name ||
                          enq.interestedTopic}
                      </td>
                      <td className="py-3 pr-4">
                        <span className="rounded-full bg-[#1877F2]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#1877F2] uppercase">
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3 text-[11px] text-[#64748B]">
                        {formatDateTime(enq.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* RECENT AUDIT LOG */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 lg:col-span-4">
          <h2 className="mb-4 text-base font-bold text-[#0B1730]">
            Recent Admin Activity Log
          </h2>
          {stats.recentAuditLogs.length === 0 ? (
            <p className="text-xs text-[#64748B]">No recent audit events recorded.</p>
          ) : (
            <ul className="space-y-3">
              {stats.recentAuditLogs.map((log) => (
                <li
                  key={log.id}
                  className="rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-xs"
                >
                  <div className="flex items-center justify-between font-bold text-[#0B1730]">
                    <span>{log.action}</span>
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  {log.details && (
                    <div className="mt-1 truncate text-[11px] text-[#64748B]">
                      {log.details}
                    </div>
                  )}
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{log.userEmail}</span>
                    <span>{formatDateTime(log.createdAt)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
